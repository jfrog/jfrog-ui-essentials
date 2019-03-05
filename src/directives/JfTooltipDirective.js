const Vue = window.Vue;
import {Ng1AttributeDirectiveAdapter} from '@/plugins/JFrogUI/Ng1AttributeDirectiveAdapter';

Vue.directive('jf-tooltip', {
    bind: function (el, binding, vnode) {
        let patchedLinkFn = Ng1AttributeDirectiveAdapter.patchLinkFunction(ng1LinkFunction, null);
        patchedLinkFn(el, binding, vnode);
    }
})

function ng1LinkFunction($scope, $element, $attrs) {
    $($element).tooltipster({
        animation: 'fade',
        contentAsHTML: 'true',
        trigger: 'hover',
        onlyOne: 'true',
        interactive: 'true',
        position: 'bottom',
        theme: 'tooltipster-default bottom',
    });
    $($element).tooltipster('content', $attrs.jfTooltip === '' ? null : $attrs.jfTooltip);

    $attrs.$observe('jfTooltip', val => {
        val = val === '' ? null : val /*this.$sanitize(val)*/;
        $($element).tooltipster('content', val);
    });
}
