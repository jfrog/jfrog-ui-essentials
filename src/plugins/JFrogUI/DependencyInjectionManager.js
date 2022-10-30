import { filter, remove, isString, includes, values, isArray } from 'lodash';
import {VueFactory} from "../../services/VueFactory";

export class DependencyInjectionManager {

    constructor() {
        this.injectables = {};
        this.registeredInjectables = [];
        this.servicesClientsMap = {};

        this.configs = {};

        this.InjectableTypes = {
            SERVICE: 'service',
            CONSTRUCTOR: 'constructor',
            AUTO_CONSTRUCTOR: 'autoConstructor',
            FACTORY: 'factory',
            PROVIDER: 'provider',
            FUNCTION: 'function',
            DATA: 'data',
            CONSTANT: 'constant'
        }
    }

    setRouter(router) {
        this.router = router;
    }

    registerService(name, _class) {
        this.registerInjectable({
            type: this.InjectableTypes.SERVICE,
            name,
            class: _class
        })
    }

    registerConstructor(name, _class) {
        this.registerInjectable({
            type: this.InjectableTypes.CONSTRUCTOR,
            name,
            class: _class
        })
    }

    registerAutoConstructor(name, _class) {
        this.registerInjectable({
            type: this.InjectableTypes.AUTO_CONSTRUCTOR,
            name,
            class: _class
        })
    }

    registerFactory(name, func) {
        this.registerInjectable({
            type: this.InjectableTypes.FACTORY,
            name,
            function: func
        })
    }

    registerConfig(name, func) {
        let thisObj = {
            $inject: (...injections) => {
                this.injectProvidersOn(thisObj, ...injections);
            }
        }
        this.configs[name] = func.bind(thisObj);
    }

    registerRunBlock(name, func) {
        let thisObj = {
            $inject: (...injections) => {
                this.injectOn(thisObj, ...injections);
            }
        }
        this.configs[name] = func.bind(thisObj);
    }

    registerProvider(name, func) {
        this.registerInjectable({
            type: this.InjectableTypes.PROVIDER,
            name,
            function: func
        })
    }

    registerFunction(name, func) {
        this.registerInjectable({
            type: this.InjectableTypes.FUNCTION,
            name,
            function: func
        })
    }

    registerData(name, data) {
        this.registerInjectable({
            type: this.InjectableTypes.DATA,
            name,
            data
        })
    }

    registerConstant(name, constant) {
        this.registerInjectable({
            type: this.InjectableTypes.CONSTANT,
            name,
            constant
        })
    }

    registerInjectable(descriptor) {
        if (!descriptor.type || !includes(values(this.InjectableTypes), descriptor.type)) {
            console.error('DI: Wrong or missing injectable type', descriptor.type);
            return;
        }
        if (!descriptor.name) {
            console.error('DI: Missing name for injectable');
            return;
        }
        if (this.injectables[descriptor.name]) {
            console.error('DI: Already registered injectable with name: ', descriptor.name);
            return;
        }
        this.registeredInjectables.push(descriptor);
    }

    get(injectable) {
        if (isArray(injectable)) {
            let injections = {}
            injectable.forEach(injectable => {
                injections[injectable] = this.get(injectable)
            })
            return injections;
        }
        else {
            if (injectable.endsWith('Provider')) return this.getProvider(injectable);
        }

        let injection = null;
        if (this.injectables[injectable]) {
            if (this.injectables[injectable].$new) {
                injection = this.injectables[injectable].$new();
            }
            if (this.injectables[injectable].$get) {
                injection = this.injectables[injectable].$get();
            }
            else if (this.injectables[injectable].$init) {
                this.injectables[injectable].$init();
                injection = this.injectables[injectable];
            }
            else if (this.injectables[injectable].$factoryFunc) {
                let thisObj = {
                    $inject: (...injections) => {
                        this.injectOn(thisObj, ...injections);
                    }
                }
                let f = this.injectables[injectable].$factoryFunc.bind(thisObj);
                injection = f();
            }
            else if (this.injectables[injectable].$provider) {
                let inst = new this.injectables[injectable].$provider();
                this.injectables[injectable] = {
                    $get: inst.$get.bind(inst),
                    $provider: inst,
                }

                injection = this.injectables[injectable].$get();
            }
            else {
                injection = this.injectables[injectable];
            }
        }
        return injection;
    }

    getProvider(injectable) {
        if (!injectable.endsWith('Provider')) {
            console.error('Provider injections should end with "Provider"')
        }
        else {
            injectable = injectable.substr(0, injectable.length - 'Provider'.length);
            let injection = null;
            if (this.injectables[injectable]) {
                if (this.injectables[injectable].$provider && this.injectables[injectable].$provider.prototype) {
                    this._injectDefaultInjections(this.injectables[injectable].$provider.prototype);
                    let inst = new this.injectables[injectable].$provider();
                    this._makeInjectableReactive(inst, injectable);
                    this.injectables[injectable] = {
                        $get: inst.$get.bind(inst),
                        $provider: inst,
                    }
                    injection = this.injectables[injectable].$provider;
                }
                if (this.injectables[injectable].$get) {
                    injection = this.injectables[injectable].$provider;
                }
                else {
                    console.error('Injectable is not legal in config blocks: ' + injectable + 'Provider')
                }
            }
            else {
                console.error('Unknown Provider Injection: ' + injectable + 'Provider');
            }
            return injection;
        }
    }

    injectServicesToComponent(component) {
        if (component.$options['jf@inject']) {
            let injections = component.$options['jf@inject'];
            if (isString(injections)) injections = injections.split(',');
            injections.forEach(injection => {
                injection = injection.trim();
                if (this.injectables[injection]) {
                    if (component.$store && !this.injectables[injection].$store && injection !== '$stateParams') {
                        this.injectables[injection].$store = component.$store;
                    }

                    if (injection !== '$stateParams') {
                        let injectee = this.injectables[injection];
                        if (injectee.$provider && injectee.$provider.prototype) injectee = injectee.$provider.prototype;
                        if (!injectee) console.log(injection)
                        if (!injectee.$jfrog) {
                            const { Vue } = VueFactory.getInstance();
                            injectee.$jfrog = Vue.prototype.$jfrog;
                            let router = this.router;
                            injectee.$router = router;
                            Object.defineProperty(injectee, '$route', {
                                get() {
                                    return router.currentRoute;
                                }
                            })
                        }
                    }

                    if (injection === '$scope') {
                        component[injection] = this.injectables[injection].$new(component);
                    }
                    else if (injection === '$transclude') {
                        let $transclude = this.get(injection);
                        $transclude.$comp = component;
                        component[injection] = (...args) => {
                            $transclude(component, ...args);
                        }
                        Object.keys($transclude).forEach(key => component[injection][key] = $transclude[key]);
                    }
                    else {
                        component[injection] = this.get(injection);
                    }

                    if (!this.servicesClientsMap[injection]) this.servicesClientsMap[injection] = [];
                    if (!includes(this.servicesClientsMap[injection], component)) {
                        this.servicesClientsMap[injection].push(component);
                    }
                }
                else {
                    if (injection !== '$element') {
                        console.error('Unknown Injection: ' + injection)
                    }
                }
            })
        }
    }



    injectOn(obj, ...injections) {
        if (injections.length === 1) {
            injections = injections[0]
        }
        if (isString(injections)) injections = injections.split(',');

        injections.forEach(injection => {
            obj[injection] = this.get(injection);
        })
    }

    injectProvidersOn(obj, ...injections) {
        if (injections.length === 1) {
            injections = injections[0]
        }
        if (isString(injections)) injections = injections.split(',');

        injections.forEach(injection => {
            obj[injection] = this.getProvider(injection);
        })
    }

    prepareInjectables() {
        let dim = this;

        let services = filter(this.registeredInjectables, {type: this.InjectableTypes.SERVICE});
        services.forEach(serviceDescriptor => {
            if (serviceDescriptor.name === '$stateParams') {
                this.injectables[serviceDescriptor.name] = {};
            }
            else {
                this.injectables[serviceDescriptor.name] = {
                    $init: () => {
                        let Class = serviceDescriptor.class;

                        this._injectDefaultInjections(Class.prototype);

                        let serviceInstance = new Class();

                        this._makeInjectableReactive(serviceInstance, serviceDescriptor.name);

                        this.injectables[serviceDescriptor.name] = serviceInstance;


                    }
                }
            }
        })


        let constructors = filter(this.registeredInjectables, {type: this.InjectableTypes.CONSTRUCTOR});
        constructors.forEach(constructorDescriptor => {
            this.injectables[constructorDescriptor.name] = constructorDescriptor.class;
        })

        let autoConstructors = filter(this.registeredInjectables, {type: this.InjectableTypes.AUTO_CONSTRUCTOR});
        autoConstructors.forEach(autoConstructorDescriptor => {
            let AutoConstructor = autoConstructorDescriptor.class;
            this.injectables[autoConstructorDescriptor.name] = {
                $new: (...params) => new AutoConstructor(...params)
            };
        })

        let factories = filter(this.registeredInjectables, {type: this.InjectableTypes.FACTORY});
        factories.forEach(factoryDescriptor => {
            this.injectables[factoryDescriptor.name] = {
                $factoryFunc: factoryDescriptor.function
            }
        })

        let providers = filter(this.registeredInjectables, {type: this.InjectableTypes.PROVIDER});
        providers.forEach(providerDescriptor => {
            this.injectables[providerDescriptor.name] = {
                $provider: providerDescriptor.function
            }
        })

        let functions = filter(this.registeredInjectables, {type: this.InjectableTypes.FUNCTION});
        functions.forEach(functionDescriptor => {
            this.injectables[functionDescriptor.name] = functionDescriptor.function;
        })

        let constants = filter(this.registeredInjectables, {type: this.InjectableTypes.CONSTANT});
        constants.forEach(constantDescriptor => {
            this.injectables[constantDescriptor.name] = constantDescriptor.constant;
        })
    }

    onComponentDestruction(comp) {
        Object.keys(this.servicesClientsMap).forEach(injectable => {
            let comps = this.servicesClientsMap[injectable];
            remove(comps, c => c === comp);
        })
    }

    runConfigs() {
        values(this.configs).forEach(func => {
            func();
        })
    }

    _injectDefaultInjections(injectee) {
        let dim = this;
        if (!injectee.$jfrog) {
            const { Vue } = VueFactory.getInstance();
            injectee.$jfrog = Vue.prototype.$jfrog;
            injectee.$inject = function(...injections) {
                dim.injectOn(this, ...injections);
            };

            let router = this.router;
            injectee.$router = router;
            Object.defineProperty(injectee, '$route', {
                get() {
                    return router.currentRoute;
                }
            })
            injectee.$set = Vue.set.bind(Vue);
            injectee.$delete = Vue.delete.bind(Vue);
        }

    }

    _makeInjectableReactive(serviceInstance, serviceName) {
        if (!serviceInstance.$reactive) return;

        let dim = this;
        const { Vue } = VueFactory.getInstance();
        let vue = new Vue({
            data() {
                return {
                    serviceInstance
                };
            },
            watch: {
                serviceInstance: {
                    handler: function(n,o) {
                        let clients = dim.servicesClientsMap[serviceName];
                        if (clients) clients.forEach(cl => {
                            cl.$forceUpdate()
                        });
                    },
                    deep: true
                }
            }

        })
        serviceInstance.$reactive = true;

    }

}
