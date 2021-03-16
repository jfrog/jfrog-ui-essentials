const Vue = window.Vue;
import {Ng1AttributeDirectiveAdapter} from '@/plugins/JFrogUI/Ng1AttributeDirectiveAdapter';
import sanitizeMixin from '../mixins/Sanitize';

const { $sanitize } = sanitizeMixin.methods;

Vue.directive('jf-tooltip-on-overflow', {
    bind: function (el, binding, vnode) {
        const opts = {
            shouldSanitize: !binding.modifiers.html
        }
        let patchedLinkFn = Ng1AttributeDirectiveAdapter.patchLinkFunction(ng1LinkFunction.bind(this,opts), null);
        patchedLinkFn(el, binding, vnode);
    }
});

function ng1LinkFunction({ shouldSanitize } ,$scope, $element, $attrs) {

    $($element).on('mouseenter', (e) => {
        let targets = [$($element), $(e.target)];
        let tooltipShown = false;
        let isNoTooltip = (cell) => {
            return (cell[0] && cell[0].classList && cell[0].classList.contains('no-tooltip'));
        };

        for (let i = 0; !tooltipShown && i < targets.length; i++) {
            let target = targets[i];

            let targetContent = target.children(':not(:visible)').length ? target.children(':visible')
                .text()
                .trim() : target.text().trim();
            targetContent = (targetContent === '' ? null : targetContent);
            targetContent = $sanitize(targetContent);
            if (!isNoTooltip(target) && target[0].scrollWidth > Math.round(target.innerWidth())) {
                if (!!targetContent && !target.hasClass('tooltipstered')) {
                    let options = {
                        animation: 'fade',
                        contentAsHTML: 'true',
                        trigger: 'hover',
                        onlyOne: 'true',
                        interactive: 'true',
                        position: 'bottom',
                        theme: 'tooltipster-default bottom',
                        content: targetContent
                    };
                    if ($scope.trustTooltipText) {
                        options.contentAsHTML = 'true';
                    }
                    target.tooltipster(options);
                    target.tooltipster('show');
                } else if (!!targetContent) {
                    target.tooltipster('enable');

                    if (target.tooltipster('content') != targetContent) {
                        target.tooltipster('content', targetContent);
                    }
                }
            } else if (target.hasClass('tooltipstered')) {
                target.tooltipster('disable');
            }
        }
    });
    /*
		$scope.$on('$destroy', () => {
			$($element).off('mouseenter');
			$($element).off('mouseleave');
		});
	*/
}
