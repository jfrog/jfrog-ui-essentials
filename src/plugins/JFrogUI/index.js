import {AngularFilterServiceMock} from './angularjs-mocks/filter';
import {AngularSanitizeServiceMock} from './angularjs-mocks/sanitize';
import {AngularHttpProviderMock} from './angularjs-mocks/http';
import {AngularInjectorServiceMock} from './angularjs-mocks/injector';
import {AngularLocationProviderMock} from './angularjs-mocks/location';
import {AngularResourceServiceMock} from './angularjs-mocks/resource';
import {AngularRootScopeServiceMock} from './angularjs-mocks/rootScope';
import VeeValidate from 'vee-validate';
import { AngularQServiceMock } from './angularjs-mocks/q'
import { AngularTimeoutServiceMock, AngularIntervalServiceMock } from './angularjs-mocks/timeout_and_interval'
import { AngularScopeServiceMock } from './angularjs-mocks/scope'
import { AngularStateServiceMock } from './angularjs-mocks/state'
import {AngularUrlMatcherFactoryMock} from './angularjs-mocks/urlMatcherFactory';
import { AngularCompileServiceMock } from './angularjs-mocks/compile'
import _ from 'lodash';
import $ from 'jquery';
import {AngularTranscludeServiceMock} from './angularjs-mocks/transclude';
import {DependencyInjectionManager} from './DependencyInjectionManager';
let $jfrog;
let dim = new DependencyInjectionManager();
const JFrogUI = {
    install(Vue, options) {
        let plugin = this;

        this.dim = dim;
        this.dim.setRouter(options.router);

        Vue.use(VeeValidate, { validity: true });

        Vue.prototype.$jfrog = window.$jfrog = $jfrog = {
            apiRoot: plugin.$apiRoot,
            get: injectable => this.dim.get(injectable),
            getProvider: injectable => this.dim.getProvider(injectable),
            injectOn: (obj, ...injections) => this.dim.injectOn(obj, ...injections)
        }

        Vue.prototype.$filterArray = (array, filterBy) => {
            return _.filter(array, item => {
                if (_.isString(filterBy) && _.isString(item)) {
                    return item.indexOf(filterBy) !== -1;
                }
                else if (_.isString(filterBy) && _.isObject(item)) {
                    let match = false;
                    _.forEach(_.values(item), val => {
                        if (_.isString(val) && val.indexOf(filterBy) !== -1) {
                            match = true;
                            return false;
                        }
                    });
                    return match;
                }
                else if (_.isObject(filterBy) && _.isObject(item)) {

                    let recursiveMatchFinder = (obj, filterObj) => {
                        let match = true;
                        _.forEach(_.entries(obj), ([key, val]) => {
                            if (filterObj[key]) {
                                if (!_.isObject(filterObj[key]) && !_.isObject(val)) {
                                    if ((val + '').indexOf(filterObj[key]) === -1) {
                                        match = false;
                                        return false;
                                    }
                                }
                                else {
                                    match = recursiveMatchFinder(val, filterObj[key]);
                                    if (!match) return false;
                                }
                            }
                        });
                        return match;
                    }

                    return recursiveMatchFinder(item, filterBy);
                }
            });
        }

        createInjectables();

        Vue.mixin({
            beforeCreate() {
//                this.$options.appMountedMethods = this.$options.mounted.slice(1);
//                this.$options.mounted = [this.$options.mounted[0]];
                if (plugin.angularjsMockMode) {
                    if (this.$options.ng1_legacy && this.$options.ng1_legacy['ng1compileFn']) {
                        handleCompileFunction.bind(this)();
                    }

                    if (this.$options.ng1_legacy && this.$options.ng1_legacy['controllerAs']) {
                        this[this.$options.ng1_legacy['controllerAs']] = this;
                    }
                }
            },
            created() {
                plugin.dim.injectServicesToComponent(this);
            },
            beforeMount() {
                if (plugin.angularjsMockMode) {
                    if (this.$options.ng1_legacy && this.$options.ng1_legacy.ng1preLinkFn) {
                        let attrs = {};
                        [this.$props, this.$listeners].forEach(obj => {
                            _.entries(obj).forEach(entry => {
                                Object.defineProperty(attrs, _.camelCase(entry[0]), {
                                    get() {
                                        return entry[1];
                                    }
                                })
                            });
                        })
                        this.$options.ng1_legacy.ng1preLinkFn(this.$scope || (new AngularScopeServiceMock(this)), $(this.$el), attrs, this);
                    }
                }
            },
            mounted() {
                if (plugin.angularjsMockMode) {
                    this.$element = $(this.$el);

                    let linkCtrlParam = this;

                    if (this.$options.ng1_legacy && this.$options.ng1_legacy.require) {
                        linkCtrlParam = handleNg1Require.bind(this)();
                    }

                    if (this.$options.appMountedMethods) {
                        this.$options.appMountedMethods.forEach(method => method.bind(this)());
                    }

                    if (this.$options.ng1_legacy && this.$options.ng1_legacy.ng1postLinkFn) {
                        let attrs = {};
                        [this.$props, this.$listeners].forEach(obj => {
                            _.entries(obj).forEach(entry => {
                                Object.defineProperty(attrs, _.camelCase(entry[0]), {
                                    get() {
                                        return entry[1];
                                    }
                                })
                            });
                        })
                        this.$options.ng1_legacy.ng1postLinkFn(this.$scope || (new AngularScopeServiceMock(this)), $(this.$el), attrs, linkCtrlParam);
                    }
                }
            },
            beforeDestroy() {
                plugin.dim.onComponentDestruction();
                if (this.$$onDestroy) this.$$onDestroy();
            }
        })

        function handleNg1Require() {
            let require = this.$options.ng1_legacy.require;
            let linkCtrlParam = this;

            let perString = require => {
                let clean = _.trim(require, '^');
                let kebab = _.kebabCase(clean);
                let ret;
                if (require.startsWith('^^')) {
                    if (kebab !== this.$parent.$options.name) {
                        console.error(`Component '${kebab}', required by component '${this.$options.name}', can't be found!`);
                    }
                    else {
                        ret = this.$parent;
                    }
                }
                else if (require.startsWith('^')) {
                    if (kebab !== this.$parent.$options.name && kebab !== this.$options.name) {
                        console.error(`Component '${kebab}', required by component '${this.$options.name}', can't be found!`);
                    }
                    else {
                        ret = kebab === this.$options.name ? this : this.$parent;
                    }
                }
                else {
                    if (kebab !== this.$options.name) {
                        console.error(`Component '${kebab}', required by component '${this.$options.name}', can't be found!`);
                    }
                    else {
                        ret = this;
                    }
                }
                return ret;
            }

            if (_.isString(require)) {
                linkCtrlParam = perString(require) || this;
            }
            else if (_.isArray(require)) {
                linkCtrlParam = [];
                require.forEach(r => linkCtrlParam.push(perString(r)));
            }
            else if (_.isObject(require)) {
                linkCtrlParam = {};
                Object.keys(require).forEach(k => {
                    let ctrl = perString(require[k]);
                    linkCtrlParam[k] = ctrl;
                    this[k] = ctrl;
                });
            }

            return linkCtrlParam;
        }

        function handleCompileFunction() {
            let ngCompile = this.$options.ng1_legacy['ng1compileFn'];
            let attrs = {};
            let tElem = $(`<div>${_.trim(this.$options.template)}</div>`);

            if (this.$parent && this.$parent.$options.template) {
                let tParent = $(`<div>${_.trim(this.$parent.$options.template)}</div>`);

                let selfs = tParent.find(this.$options.name);
                let thisInstanceIndex = _.filter(this.$parent.$children, {$options: {name: this.$options.name}}).indexOf(this);
                _.forEach(selfs[thisInstanceIndex].attributes, attr => {
                    let THIS = this;
                    let propName = _.camelCase(_.trim(attr.name,':@'));
                    Object.defineProperty(attrs, propName, {
                        get() {
                            return attr.value;
                        },
                        set(newExpression) {
                            Object.defineProperty(THIS, propName, {
                                get() {
                                    return _.get(THIS.$parent, newExpression);
                                }
                            })
                        }
                    })
                })
            }

            let transcludeFn = dim.get('$transclude');

            let response = ngCompile(tElem, attrs, (...args) => {
                transcludeFn(this, ...args);
            });

            if (_.isFunction(response)) {
                this.$options.ng1_legacy = this.$options.ng1_legacy || {};
                this.$options.ng1_legacy.ng1postLinkFn = response;
            }
            else if (_.isObject(response)) {
                this.$options.ng1_legacy = this.$options.ng1_legacy || {};
                this.$options.ng1_legacy.ng1preLinkFn = response.pre;
                this.$options.ng1_legacy.ng1postLinkFn = response.post;
            }

            this.$options.template = tElem[0].innerHTML;
        }

        function createInjectables() {
            if (plugin.angularjsMockMode) {
                registerAngularjsMocks();
            }
            plugin.dim.prepareInjectables();
            plugin.dim.runConfigs();
        }

        function registerAngularjsMocks() {
            plugin.dim.registerProvider('$location', AngularLocationProviderMock);
            plugin.dim.registerProvider('$http', AngularHttpProviderMock);
            plugin.dim.registerProvider('$transclude', AngularTranscludeServiceMock);
            plugin.dim.registerProvider('$q', AngularQServiceMock);
            plugin.dim.registerProvider('$urlMatcherFactory', AngularUrlMatcherFactoryMock);

            plugin.dim.registerService('$rootScope', AngularRootScopeServiceMock);
            plugin.dim.registerService('$state', AngularStateServiceMock);
            plugin.dim.registerService('$injector', AngularInjectorServiceMock);
            plugin.dim.registerService('$stateParams', {});

            plugin.dim.registerAutoConstructor('$scope', AngularScopeServiceMock);

            plugin.dim.registerFunction('$resource', AngularResourceServiceMock);
            plugin.dim.registerFunction('$compile', AngularCompileServiceMock);
            plugin.dim.registerFunction('$timeout', AngularTimeoutServiceMock);
            plugin.dim.registerFunction('$interval', AngularIntervalServiceMock);
            plugin.dim.registerFunction('$filter', AngularFilterServiceMock);
            plugin.dim.registerFunction('$sanitize', AngularSanitizeServiceMock);
        }


        if (plugin.angularjsMockMode) {
            Vue.directive('init', {
                bind: function (el, binding, vnode) {
                    let functionName = binding.expression.split('(')[0].trim();
                    if (!_.has(vnode.context, functionName) && !_.get(vnode.context, functionName)) {
                        console.error('v-init: Method does not exist: ' + functionName)
                    }
                    else {
                        _.get(vnode.context, functionName)()
                    }
                }
            })
        }
    },

    // Main plugin object interface
    registerServices(services) {
        _.entries(services).forEach(entry => {
            dim.registerService(entry[0], entry[1]);
        })
    },
    registerConstructors(constructors) {
        _.entries(constructors).forEach(entry => {
            dim.registerConstructor(entry[0], entry[1]);
        })
    },
    registerAutoConstructors(autoConstructors) {
        _.entries(autoConstructors).forEach(entry => {
            dim.registerAutoConstructor(entry[0], entry[1]);
        })
    },
    registerFactories(factories) {
        _.entries(factories).forEach(entry => {
            dim.registerFactory(entry[0], entry[1]);
        })
    },
    registerConfigs(configs) {
        _.entries(configs).forEach(entry => {
            dim.registerConfig(entry[0], entry[1]);
        })
    },
    registerRunBlocks(runs) {
        _.entries(runs).forEach(entry => {
            dim.registerRunBlock(entry[0], entry[1]);
        })
    },
    registerProviders(providers) {
        _.entries(providers).forEach(entry => {
            dim.registerProvider(entry[0], entry[1]);
        })
    },
    registerFunctions(functions) {
        _.entries(functions).forEach(entry => {
            dim.registerFunction(entry[0], entry[1]);
        })
    },
    registerConstants(constants) {
        _.entries(constants).forEach(entry => {
            dim.registerConstant(entry[0], entry[1]);
        })
    },
    mockAngularJS() {
        this.angularjsMockMode = true;
    },
    setAPIRoot(apiRoot) {
        this.$apiRoot = apiRoot;
    }
    // End of main plugin object interface
};

export default JFrogUI;
export {$jfrog};
