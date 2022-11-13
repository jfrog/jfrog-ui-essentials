class VueSingleton {
    constructor() {
        this.Vue = null;
    }

    register(Vue) {
        if (this.Vue === null) {
            this.Vue = Vue;
        }
    }
}

export const VueFactory = (() => {
    let instance;
    return {
        getInstance: () => {
            if (instance == null) {
                instance = new VueSingleton();
                // Hide the constructor so the returned object can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
    };
})();

export default VueFactory;
