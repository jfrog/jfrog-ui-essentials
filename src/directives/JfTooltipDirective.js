import {Ng1AttributeDirectiveAdapter} from '@/plugins/JFrogUI/Ng1AttributeDirectiveAdapter';
import sanitizeMixin from '../mixins/Sanitize';
import {VueFactory} from '../services/VueFactory';

export const install = () => {
    const { $sanitize } = sanitizeMixin.methods;
    const { Vue } = VueFactory.getInstance();

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
}
