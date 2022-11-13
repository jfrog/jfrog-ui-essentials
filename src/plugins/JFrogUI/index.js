import {AngularCompileCompServiceMock} from './angularjs-mocks/compileComp';
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
import filter from 'lodash/filter';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import values from 'lodash/values';
import forEach from 'lodash/forEach';
import entries from 'lodash/toPairs';
import get from 'lodash/get';
import has from 'lodash/has';
import camelCase from 'lodash/camelCase';
import trim from 'lodash/trim';
import kebabCase from 'lodash/kebabCase';
import isFunction from 'lodash/isFunction';
import $ from 'jquery';
import {AngularTranscludeServiceMock} from './angularjs-mocks/transclude';
import {DependencyInjectionManager} from './DependencyInjectionManager';
import {VueFactory} from "@/services/VueFactory";
let $jfrog;
let dim = new DependencyInjectionManager();
const JFrogUI = {
    async install(Vue, options) {
        VueFactory.getInstance().register(Vue);
        let plugin = this;

        this.dim = dim;
        this.dim.setRouter(options.router);

        Vue.use(VeeValidate, {
            fieldsBagName: 'veeFields',
            validity: true
        });

        const routersCache = window.$jfrog && window.$jfrog.routersCache ? window.$jfrog.routersCache : {};

        Vue.prototype.$jfrog = window.$jfrog = $jfrog = {
            apiRoot: plugin.$apiRoot,
            get: injectable => this.dim.get(injectable),
            getProvider: injectable => this.dim.getProvider(injectable),
            injectOn: (obj, ...injections) => this.dim.injectOn(obj, ...injections),
            routersCache,
            router: JFrogUI.dim.router
        }

        Vue.prototype.$filterArray = (array, filterBy) => {
            return filter(array, item => {
                if (isString(filterBy) && isString(item)) {
                    return item.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1;
                }
                else if (isString(filterBy) && isObject(item)) {
                    let match = false;
                    forEach(values(item), val => {
                        if (isString(val) && val.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1) {
                            match = true;
                            return false;
                        }
                    });
                    return match;
                }
                else if (isObject(filterBy) && isObject(item)) {

                    let recursiveMatchFinder = (obj, filterObj) => {
                        let match = true;
                        forEach(entries(obj), ([key, val]) => {
                            if (filterObj[key]) {
                                if (!isObject(filterObj[key]) && !isObject(val)) {
                                    if ((val + '').toLowerCase().indexOf(filterObj[key].toLowerCase()) === -1) {
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
                            entries(obj).forEach(entry => {
                                Object.defineProperty(attrs, camelCase(entry[0]), {
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
                            entries(obj).forEach(entry => {
                                Object.defineProperty(attrs, camelCase(entry[0]), {
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
                let clean = trim(require, '^');
                let kebab = kebabCase(clean);
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

            if (isString(require)) {
                linkCtrlParam = perString(require) || this;
            }
            else if (isArray(require)) {
                linkCtrlParam = [];
                require.forEach(r => linkCtrlParam.push(perString(r)));
            }
            else if (isObject(require)) {
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
            let tElem = $(`<div>${trim(this.$options.template)}</div>`);

            if (this.$parent && this.$parent.$options.template) {
                let tParent = $(`<div>${trim(this.$parent.$options.template)}</div>`);

                let selfs = tParent.find(this.$options.name);
                let thisInstanceIndex = filter(this.$parent.$children, {$options: {name: this.$options.name}}).indexOf(this);
                forEach(selfs[thisInstanceIndex].attributes, attr => {
                    let THIS = this;
                    let propName = camelCase(trim(attr.name,':@'));
                    Object.defineProperty(attrs, propName, {
                        get() {
                            return attr.value;
                        },
                        set(newExpression) {
                            Object.defineProperty(THIS, propName, {
                                get() {
                                    return get(THIS.$parent, newExpression);
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

            if (isFunction(response)) {
                this.$options.ng1_legacy = this.$options.ng1_legacy || {};
                this.$options.ng1_legacy.ng1postLinkFn = response;
            }
            else if (isObject(response)) {
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
            plugin.dim.registerFunction('$compileComp', AngularCompileCompServiceMock);
            plugin.dim.registerFunction('$timeout', AngularTimeoutServiceMock);
            plugin.dim.registerFunction('$interval', AngularIntervalServiceMock);
            plugin.dim.registerFunction('$filter', AngularFilterServiceMock);
            plugin.dim.registerFunction('$sanitize', AngularSanitizeServiceMock);
        }


        if (plugin.angularjsMockMode) {
            Vue.directive('init', {
                bind: function (el, binding, vnode) {
                    let functionName = binding.expression.split('(')[0].trim();
                    if (!has(vnode.context, functionName) && !get(vnode.context, functionName)) {
                        console.error('v-init: Method does not exist: ' + functionName)
                    }
                    else {
                        get(vnode.context, functionName)()
                    }
                }
            })
        }
    },

    // Main plugin object interface
    registerServices(services) {
        entries(services).forEach(entry => {
            dim.registerService(entry[0], entry[1]);
        })
    },
    registerConstructors(constructors) {
        entries(constructors).forEach(entry => {
            dim.registerConstructor(entry[0], entry[1]);
        })
    },
    registerAutoConstructors(autoConstructors) {
        entries(autoConstructors).forEach(entry => {
            dim.registerAutoConstructor(entry[0], entry[1]);
        })
    },
    registerFactories(factories) {
        entries(factories).forEach(entry => {
            dim.registerFactory(entry[0], entry[1]);
        })
    },
    registerConfigs(configs) {
        entries(configs).forEach(entry => {
            dim.registerConfig(entry[0], entry[1]);
        })
    },
    registerRunBlocks(runs) {
        entries(runs).forEach(entry => {
            dim.registerRunBlock(entry[0], entry[1]);
        })
    },
    registerProviders(providers) {
        entries(providers).forEach(entry => {
            dim.registerProvider(entry[0], entry[1]);
        })
    },
    registerFunctions(functions) {
        entries(functions).forEach(entry => {
            dim.registerFunction(entry[0], entry[1]);
        })
    },
    registerConstants(constants) {
        entries(constants).forEach(entry => {
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
