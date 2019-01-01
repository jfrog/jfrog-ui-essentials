import _ from 'lodash';
import rootAxios from 'axios';
let $jfrog;
let $q;
let $http;
export function AngularResourceServiceMock(url, paramDefaults, actions, options) {
    $q = this.$jfrog.get('$q');
    $http = this.$jfrog.get('$http');
    $jfrog = this.$jfrog;

    return createResourceClass({url, paramDefaults, actions, options});
}

function setupInterceptors(interceptorsArray = null, axios = null) {
    let interceptorAdapter = (ng1Interceptor) => {
        if (!ng1Interceptor) {
            return () => {};
        }
        else {
            return function(config) {
                if (config.config && config.config.method) config.config.method = config.config.method.toUpperCase();
                if (config.config) config.config.data = config.config.data ? JSON.parse(config.config.data) : null;
                let ret = ng1Interceptor(config);
                if (config.config) ret.config.data = ret.config.data ? JSON.stringify(config.config.data) : null;
                return ret;
            }
        }
    }

    interceptorsArray.forEach(interceptor => {
        if (interceptor.request || interceptor.requestError) {
            axios.interceptors.request.use(interceptorAdapter(interceptor.request), interceptorAdapter(interceptor.requestError));
        }
        if (interceptor.response || interceptor.responseError) {
            axios.interceptors.response.use(interceptorAdapter(interceptor.response), interceptorAdapter(interceptor.responseError));
        }
    })
}

function createResourceClass(resourceParams) {
    const defaultActions = {
        'get': { method: 'GET' },
        'save': { method: 'POST' },
        'query': { method: 'GET', isArray: true },
        'remove': { method: 'DELETE' },
        'delete': { method: 'DELETE' }
    };
    let actions = _.extend({}, defaultActions, resourceParams.actions);

    class Resource {
        constructor(data = {}) {
            _.extend(this, data);
            Object.keys(actions).forEach(actionKey => {
                let action = actions[actionKey];
                this.constructor.prototype['$' + actionKey] = (...params) => doAction.bind(this)(action, params);
            })
        }
    }

    function doAction(action, callParams) {

        let axios;
        if (this && this.axios) {
            axios = this.axios;
        }
        else {
            axios = rootAxios.create();
            if (this) this.axios = axios;
            setupInterceptors($http.interceptors.map(i => $jfrog.get(i)), axios);
            if (action.interceptor) setupInterceptors([action.interceptor], axios);
        }


        let compilation = compilePath(action.url || resourceParams.url, _.extend({}, resourceParams.paramDefaults, action.params), _.extend({}, action.params, (action.method === 'GET' ? callParams[0] : {}) || {}));

        let compiledPath = compilation.compiledPath;

        let requestHasPayload = !_.includes(['GET'], action.method);

        let ownPayload = this && requestHasPayload ? _.pick(this, _.filter(Object.keys(this), k => !k.startsWith('$'))) : {};

        let payload = requestHasPayload ? _.merge({}, ownPayload, callParams.length === 2 ? callParams[1] : callParams[0]) : undefined;

        let axiosPromise = axios({
            method: action.method,
            url: compiledPath,
            params: action.method === 'GET' ? compilation.unusedReplacers : {},
            data: payload
        })

        let ret = action.isArray ? [] : {};
        let defer = $q.defer();

        axiosPromise.then(response => {
            let data = !action.interceptor ? response.data : response;

            if (action.isArray && !_.isArray(data)) {
                defer.reject('Expected response to be array. Url = ', compiledPath);
            }
            else if (action.isArray) {
                data = _.map(data, d => {
                    let i = new Resource();
                    _.extend(i, d);
                    return i;
                });
                defer.resolve(data);
                ret.splice(0,0,...data);
            }
            else {
                let i = new Resource();
                _.extend(i, data);
                if (action.interceptor) i.resource = response.data;
                defer.resolve(i);
                _.extend(ret, data);
                if (this) _.extend(this, data);
            }
        })

        if (!this) {
            ret.$promise = defer.promise
        }
        else {
            ret = defer.promise;
        }

        return ret;

    }


    Resource.prototype.resourceParams = resourceParams;
    Object.keys(actions).forEach(actionKey => {
        let action = actions[actionKey];
        Resource[actionKey] = (...params) => doAction(action, params);
    })

    return Resource;
}


function compilePath(pathLayout, pathParams, paramReplacers = {}) {
    let compiled = pathLayout;
    let replacersUsed = [];
    for (let key in pathParams) {
        let replacer = pathParams[key] || '';
        if (_.isString(replacer) && replacer.startsWith('@')) {
            replacer = paramReplacers[replacer.substr(1)] || '';
            replacersUsed.push(replacer.substr(1));
        }
        compiled = compiled.split(`:${key}`).join(replacer);
    }
    let emptyParams = compiled.match(/:([0-9|a-z|A-Z]*)/g);
    if (emptyParams) {
        emptyParams.forEach(param => {
            if (param.substr(1)) {
                compiled = compiled.split(`/${param}`).join('');
            }
        })
    }

    return {
        compiledPath: _.trimEnd(compiled, '/'),
        unusedReplacers: _.pick(paramReplacers, ...(_.filter(Object.keys(paramReplacers), k => !_.includes(replacersUsed, k))))
    }
}
