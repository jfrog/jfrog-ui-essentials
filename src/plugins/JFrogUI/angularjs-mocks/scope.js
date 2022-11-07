import extend from 'lodash/extend';
import {VueFactory} from "@/services/VueFactory";
export class AngularScopeServiceMock {
    constructor(vueComp) {
        if (vueComp.$options.ng1_legacy && vueComp.$options.ng1_legacy['controllerAs']) {
            extend(this, {
                [vueComp.$options.ng1_legacy['controllerAs']]: vueComp
            });
        }
        else {
            extend(this, vueComp.$data);
        }
        this.$comp = vueComp;
        this.$on = (msg, callback) => {
            switch (msg) {
                case '$destroy': {
                    vueComp.$$onDestroy = callback;
                    break;
                }
            }
        }
        this.$watch = (expr, callback, deep = false) => {
            vueComp.$watch(expr, callback, {deep, immediate: true});
        }

        this.$destroy = () => {
            vueComp.$destroy();
        };

        this.$new = (data = {}) => {
            const { Vue } = VueFactory.getInstance();
            let v = new Vue({data() { return extend({}, data, vueComp.$data); }});
            return new AngularScopeServiceMock(v);
        }

        Object.defineProperty(this, '$parent', {
            get() {
                return vueComp.$parent ? new AngularScopeServiceMock(vueComp.$parent) : null
            }
        })
    }
}
