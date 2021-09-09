import {Ng1AttributeDirectiveAdapter} from '@/plugins/JFrogUI/Ng1AttributeDirectiveAdapter';
import sanitizeMixin from '../mixins/Sanitize';
const Vue = window.Vue;

const { $sanitize } = sanitizeMixin.methods;

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
    $($element).tooltipster('content', $attrs.jfTooltip === '' ? null : $sanitize($attrs.jfTooltip));

    $attrs.$observe('jfTooltip', val => {
        $($element).tooltipster('content', val === '' ? null : $sanitize(val));
    });
}
