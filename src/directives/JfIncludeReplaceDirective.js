const Vue = window.Vue;
import {Ng1AttributeDirectiveAdapter} from '@/plugins/JFrogUI/Ng1AttributeDirectiveAdapter';

Vue.directive('jf-include-replace', {
    bind: function (el, binding, vnode) {
        let patchedLinkFn = Ng1AttributeDirectiveAdapter.patchLinkFunction(ng1LinkFunction, null);
        patchedLinkFn(el, binding, vnode);
    }
})

function ng1LinkFunction(scope, el, attrs) {
    el.replaceWith(el.children());
}
