export class JFrogSubRouter {
    constructor($state, $location, $rootScope, $timeout) {
        this.$masterScope = $rootScope.$new();
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$timeout = $timeout;
        this.$location = $location;
        this.$listeners = {};

        this.supportedEvents = ['state.change', 'params.change']

    }

    createLocalRouter(config) {

        this._watchStateChanges();
        this._watchLocationChanges();

        if (this.$config) {
            this._exitState();
        }

        this.$config = _.cloneDeep(config);
        this.$config.parentScope = config.parentScope;

        this.$config.baseStateName = this.$state.current.name;
        this.$config.basePath = _.trim(this._sharedStartOfString([this.$state.current.url, this.$location.path()]),'/');
        if (this.$state.current.url.indexOf('JFrogSubRouterPath') === -1) {
            console.warn('In order for JFrogSubRouter to work properly, you must define the sub path in your ui-router state, as being of type \'JFrogSubRouterPath\'. In your ui-router state definition, set the \'url\' field as \'/YOUR/BASE/PATH/{anySubRouteParamName:JFrogSubRouterPath}\' ')
        }

        this._initParams();

        this._mapPathToParams();

        this._createScope();

        this._createApiOnConfig();

        this.$config.parentScope.$on('$destroy', () => {
            this._exitState();
            this.unwatchUIRouterState();
            this.unwatchUrl();
        })

        return this.$config.$api;
    }

    getActiveRouter() {
        return this.$config.$api;
    }

    _createApiOnConfig() {
        let THIS = this;

        this.$config.$api = {
            get params() {
                return THIS.$config.$params;
            },
            set params(params) {
                THIS.$config.$params = params;
                THIS._mapParamsToPath();
            },
            get state() {
                return THIS._getCurrentState();
            },
            get config() {
                return THIS.$config;
            },
            updateUrl() {
                if (THIS.$config.hotSyncUrl) return;
                else THIS._mapParamsToPath();
            },
            goto(stateName, params) {
                THIS._gotoState(stateName, params);
            },
            listenForChanges(watchedParams, states, listener, scope = undefined) {
                watchedParams = !_.isArray(watchedParams) ? [watchedParams] : watchedParams;
                states = !_.isArray(states) ? (states ? [states] : []) : states;
                this.on('params.change', (oldParams, newParams) => {
                    if (!states.length || _.includes(states, this.state)) {
                        let match = watchedParams.reduce((acc, curr) => {
                            return acc || oldParams[curr] !== newParams[curr];
                        }, false);
                        if (match) listener(oldParams, newParams, this.state);
                    }
                }, scope)
            },
            on(event, listener, scope) {
                if (!_.includes(THIS.supportedEvents, event)) {
                    console.error('JFrogSubRouter: Unsupported Event: ' + event);
                    return;
                }
                if (!THIS.$listeners[event]) THIS.$listeners[event] = [];
                THIS.$listeners[event].push(listener);
                if (scope) {
                    scope.$on('$destroy', () => {
                        this.off(event, listener);
                    })
                }
            },
            off(event, listener) {
                if (!_.includes(THIS.supportedEvents, event)) {
                    console.error('jf-table-view: Unsupported Event: ' + event);
                    return;
                }
                if (THIS.$listeners[event]) {
                    if (listener) {
                        _.remove(THIS.$listeners[event],l=>l===listener);
                    }
                    else {
                        THIS.$listeners[event] = [];
                    }
                }
            },
            fire(event, ...params) {
                if (THIS.$listeners[event]) {
                    THIS.$listeners[event].forEach(listener=>listener(...params))
                }
            }

        }
    }
    _sharedStartOfString(array){
        let A= array.concat().sort(),
            a1= A[0], a2= A[A.length-1], L= a1.length, i= 0;
        while(i<L && a1.charAt(i)=== a2.charAt(i)) i++;
        return a1.substring(0, i);
    }

    _createScope() {
        this.$config.$scope = this.$rootScope.$new();
        this.$config.$scope.config = this.$config;

        this.$config.$scope.unwatchParams = this.$config.$scope.$watch('config.$params', (newVal, oldVal) => {
            if (!this.$config.$params || this.$config.baseStateName !== this.$state.current.name || (_.isEqual(newVal, oldVal) && _.isEqual(this._getPathAsParams(), this.$config.$params))) {
                return;
            }
            if (this.$config.hotSyncUrl) this._mapParamsToPath();
        }, true);
        this.$config.$scope.unwatchState = this.$config.$scope.$watch('config.$api.state', (newVal, oldVal) => {
            if (newVal !== oldVal) {
                if (newVal === null) {
                    if (this.$config.onInvalidState) {
                        this.$config.onInvalidState(oldVal, this.$config.$params);
                    }
                }
                else {
                    if (this.$config.onStateChange) {
                        this.$config.onStateChange(oldVal, newVal);
                        if (this.$config) this.$config.$api.fire('state.change', oldVal, newVal)
                    }
                }
            }
        });

    }

    _destroyScope() {
        this.$config.$scope.unwatchParams();
        this.$config.$scope.unwatchState();
        this.$config.$scope.$destroy();
    }

    _exitState() {
        this.$config.$destroyed = true;
        this._destroyScope();
        this.$config = null;
    }


    _getCurrentState() {
        let state = null;
        if (this.$config.states && this.$config.$initialized) {
            for (let i = 0; i < this.$config.states.length; i++) {
                let stateDef = this.$config.states[i];

                let mandatoriesCheck = stateDef.params.mandatory ? stateDef.params.mandatory.reduce((acc, curr) => acc && !!this.$config.$params[curr], true) : true;
                let nullifiedCheck  = stateDef.params.nullify ? stateDef.params.nullify.reduce((acc, curr) => acc && this.$config.$params[curr] === null, true) : true;

                if (mandatoriesCheck && nullifiedCheck) {
                    state = stateDef.name;
                    break;
                }
            }
        }
        return state;
    }

    _gotoState(stateName, params) {
        if (!this.$config.states) {
            console.error(`Trying to go to state ${stateName}, but no states were defined`);
        }
        else {
            let stateDef = _.find(this.$config.states, {name: stateName});
            if (!stateDef) {
                console.error(`Trying to go to state ${stateName}, but no such state were defined`);
            }
            else {

                if (params) _.extend(this.$config.$params, params);

                if (stateDef.params.mandatory) {
                    stateDef.params.mandatory.forEach(mandatoryParam => {
                        if (!this.$config.$params[mandatoryParam]) {
                            console.error(`State change error: Missing mandatory param: ${mandatoryParam}`);
                        }
                    })
                }
                if (stateDef.params.nullify) {
                    stateDef.params.nullify.forEach(nullifiedParam => {
                        if (params && params[nullifiedParam]) {
                            console.error(`State change error: Unsupported param: ${nullifiedParam}`);
                        }
                        this.$config.$params[nullifiedParam] = null
                    });
                }
                if (stateDef.params.defaults) {
                    for (let key in stateDef.params.defaults) {
                        let value = stateDef.params.defaults[key];
                        if (this.$config.$params[key] === null) {
                            this.$config.$params[key] = value;
                        }
                    }
                }

            }
        }
    }

    _watchLocationChanges() {
        if (!this.$masterScope.$location) this.$masterScope.$location = this.$location;
        this.unwatchUrl = this.$masterScope.$watch('$location.absUrl()', (newVal, oldVal) => {
            if (this.$config) {
                let beforeParams = _.cloneDeep(this.$config.$params);
                this._mapPathToParams();
                if (!this.$config.$initialized) {
                    this.$config.$initialized = true;
                    if (this.$config.onInit) {
                        this.$config.onInit();
                        beforeParams = _.cloneDeep(this.$config.$params);
                    }
                }
                if (!_.isEqual(beforeParams, this.$config.$params)) {
                    if (this.$config.onChangeFromUrl) this.$config.onChangeFromUrl(beforeParams, this.$config.$params)
                    if (this.$config) this.$config.$api.fire('params.change', beforeParams, this.$config.$params)
                }
            }
        })
    }

    _watchStateChanges() {
        let onStateChange = (e, toState, toParams, fromState, fromParams) => {
            if (this.$config) {
                if (toState.name === this.$config.baseStateName && fromState.name === this.$config.baseStateName) {
                    let search = this.$location.search();
                    this.$state.go(toState.name, toParams, {notify: false, reload: false, location: 'replace', inherit: true});
                    this.unwatchUrl();
                    this.$timeout(() => {
                        this.$location.search(search).replace();
                        this._watchLocationChanges();
                    });
                    e.preventDefault();
                }
            }
        }
        this.unwatchUIRouterState = this.$rootScope.$on('$stateChangeStart', onStateChange);
    }

    _getParametersFromConfig() {
        let urlStructure = this.$config.urlStructure;
        let [pathParams, searchParams] = urlStructure.split('?');
        pathParams = _.without(pathParams.split('/'), '');
        searchParams = searchParams.split('&');
        pathParams = _.map(pathParams, param => param.substr(1));
        searchParams = _.map(searchParams, param => param.substr(1));
        return {
            path: pathParams,
            search: searchParams,
            all: pathParams.concat(searchParams)
        }
    }

    _getPathAsParams() {

        let params = {};
        let configParams = this._getParametersFromConfig();

        let path = this.$location.path();
        let search = this._decodeSearchParams(this.$location.search());

        let basePathParts = this.$config.basePath.split('/');
        let pathParts = _.filter(path.split('/'), part => part !== '' && !_.includes(basePathParts, part));

        configParams.all.forEach(param => {
            if (params[param]) {
                params[param] = null;
            }
        });

        pathParts.forEach((part, index) => {
            let param = configParams.path[index];
            if (param) params[param] = decodeURIComponent(part);
        });

        configParams.search.forEach(searchParam => {
            if (search[searchParam]) {
                params[searchParam] = search[searchParam];
            }
        })

        return params;

    }

    _initParams() {
        this.$config.$params = {};
        let configParams = this._getParametersFromConfig();
        configParams.all.forEach(param => {
            this.$config.$params[param] = null;
        });

    }

    _mapPathToParams() {
        if (!this.$config) return;

        let currentUrlParams = this._getPathAsParams();

        _.extend(this.$config.$params, currentUrlParams);

        let configParams = this._getParametersFromConfig();
        let remove = false;
        configParams.path.forEach(pathParam => {
            if (!currentUrlParams[pathParam]) remove = true;
            if (remove) this.$config.$params[pathParam] = null;
        })
        let search = this._decodeSearchParams(this.$location.search());

        configParams.search.forEach(queryParam => {
            if (!search[queryParam]) {
                this.$config.$params[queryParam] = null;
            }
        })

    }

    _mapParamsToPath() {
        if (!this.$config) return;

        let configParams = this._getParametersFromConfig();

        let pathParts = [''].concat(this.$config.basePath.split('/'));
        let stop = false;
        configParams.path.forEach(param => {
            if (!stop) {
                let val = this.$config.$params[param];
                if (val === null) {
                    stop = true;
                }
                else {
                    pathParts.push(encodeURIComponent(val));
                }
            }
        })

        let searchParams = {};
        configParams.search.forEach(param => {
            let val = this.$config.$params[param];
            if (val !== null) {
                searchParams[param] = val;
            }
        })

        this.$location.search(this._encodeSearchParams(searchParams));
        this.$location.path(pathParts.join('/') + '/');
    }

    _encodeSearchParams(searchParams) {

        let isEmptyObject = obj => Object.keys(obj).reduce((acc, curr) => acc && (obj[curr] === null || obj[curr] === undefined), true)

        if (this.$config.encodeSearchParamsAsBase64 === true) {
            return isEmptyObject(searchParams) ? {} : {state: btoa(JSON.stringify(searchParams))}
        }
        else if (_.isString(this.$config.encodeSearchParamsAsBase64)) {
            return isEmptyObject(searchParams) ? {} : {[this.$config.encodeSearchParamsAsBase64]: btoa(JSON.stringify(searchParams))}
        }
        else if (_.isObject(this.$config.encodeSearchParamsAsBase64)) {
            let result = _.cloneDeep(searchParams);
            for (let key in this.$config.encodeSearchParamsAsBase64) {
                let params = this.$config.encodeSearchParamsAsBase64[key];
                let toEncode = {};
                params.forEach(param => {
                    delete result[param];
                    toEncode[param] = searchParams[param];
                })
                if (!isEmptyObject(toEncode)) result[key] = btoa(JSON.stringify(toEncode))
            }
            return result;
        }
        else {
            return searchParams;
        }
    }

    _decodeSearchParams(searchParams) {
        if (this.$config.encodeSearchParamsAsBase64 === true) {
            return searchParams.state ? JSON.parse(atob(decodeURIComponent(searchParams.state))) : {};
        }
        else if (_.isString(this.$config.encodeSearchParamsAsBase64)) {
            return searchParams[this.$config.encodeSearchParamsAsBase64] ? JSON.parse(atob(decodeURIComponent(searchParams[this.$config.encodeSearchParamsAsBase64]))) : {};
        }
        else if (_.isObject(this.$config.encodeSearchParamsAsBase64)) {
            let result = _.cloneDeep(searchParams);
            for (let key in this.$config.encodeSearchParamsAsBase64) {
                if (result[key]) {
                    let decoded = JSON.parse(atob(decodeURIComponent(result[key])))
                    delete result[key];
                    _.extend(result, decoded)
                }
            }
            return result;
        }
        else {
            return searchParams;
        }
    }

}

