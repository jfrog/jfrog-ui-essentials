import { pick, extend } from 'lodash';
import {VueFactory} from "../../../services/VueFactory";

export function AngularCompileServiceMock(element) {
    const { Vue } = VueFactory.getInstance();

    return function(scope) {
        let template = element.outerHTML;
        let controllerAs = scope.$comp.$options.ng1_legacy && scope.$comp.$options.ng1_legacy['controllerAs'];
        if (controllerAs) {
            template = template.replace(new RegExp(controllerAs.replace(/\$/g, '\\$') + '.' ,'g'), '')
        }
/*
        let el = document.createElement('div');
        element.parentNode.replaceChild(el, element);
*/
        let props = {};
        if (scope.$comp.$options.props) Object.keys(scope.$comp.$options.props).forEach(prop => {
            props[prop] = scope.$comp[prop];
        })
        let options = extend({}, pick(scope.$comp.$options, 'methods', 'components'), {
//            el,
            template,
            router: $jfrog.router,
            data() {
                return extend({}, props, scope.$comp.$data);
            }
        });

        let parent = scope.$comp.$parent;
        while (parent) {
            extend(options.components, parent.$options.components);
            parent = parent.$parent;
        }

        let v = new Vue(options);
        v.$mount();
        element.parentNode.replaceChild(v.$el, element);

        return v;

    }
}
