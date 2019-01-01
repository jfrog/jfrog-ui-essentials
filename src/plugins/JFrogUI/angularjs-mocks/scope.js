import _ from 'lodash';
export class AngularScopeServiceMock {
    constructor(vueComp) {
        if (vueComp.$options.ng1_legacy && vueComp.$options.ng1_legacy['controllerAs']) {
            _.extend(this, {
                [vueComp.$options.ng1_legacy['controllerAs']]: vueComp
            });
        }
        else {
            _.extend(this, vueComp.$data);
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
        this.$watch = (expr, callback) => {
            vueComp.$watch(expr, callback);
            callback(_.get(vueComp, expr));
        }

        this.$destroy = () => {
            vueComp.$destroy();
        };

        this.$parent = () => new AngularScopeServiceMock(this.$comp.$parent);

        this.$new = (data = {}) => {
            let v = new Vue({data() { return _.extend({}, data, vueComp.$data); }});
            return new AngularScopeServiceMock(v);
        }

        Object.defineProperty(this, '$parent', {
            get() {
                return new AngularScopeServiceMock(vueComp.$parent);
            }
        })
    }
}
