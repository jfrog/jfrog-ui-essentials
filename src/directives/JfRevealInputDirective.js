const Vue = window.Vue;
import {Ng1AttributeDirectiveAdapter} from '@/plugins/JFrogUI/Ng1AttributeDirectiveAdapter';

Vue.directive('jf-tooltip-on-overflow', {
    bind: function (el, binding, vnode) {
        let patchedLinkFn = Ng1AttributeDirectiveAdapter.patchLinkFunction(ng1LinkFunction, null);
        patchedLinkFn(el, binding, vnode);
    }
})

function ng1LinkFunction($scope, $element, $attrs) {
    this.$elementIcon = $element.find('i');
    this.tooltipText = 'Show ' + $attrs.objectName;

}
