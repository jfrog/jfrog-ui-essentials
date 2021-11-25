import {AngularScopeServiceMock} from './scope';
import {VueFactory} from "@/services/VueFactory";
export class AngularRootScopeServiceMock {
    constructor() {
    }


    $on(event, callback) {
        if (event === '$stateChangeStart') {
            this.$router.beforeEach((to, from, next) => {
                let preventDefault = false
                let event = {
                    preventDefault: () => preventDefault = true
                };
                let toState = to;
                let fromState = to;
                let toParams = to.params;
                let fromParams = from.params;
                callback(event, toState, toParams, fromState, fromParams);
                if (!preventDefault) next();
            })
        }
    }
    $new(data = {}) {
        const { Vue } = VueFactory.getInstance();
        let v = new Vue({data() { return data; }});
        return new AngularScopeServiceMock(v);
    }
}
