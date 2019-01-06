const Vue = window.Vue;
import {Ng1AttributeDirectiveAdapter} from '@/plugins/JFrogUI/Ng1AttributeDirectiveAdapter';

Vue.directive('jf-tooltip-on-overflow', {
    bind: function (el, binding, vnode) {
        let patchedLinkFn = Ng1AttributeDirectiveAdapter.patchLinkFunction(ng1LinkFunction, null);
        patchedLinkFn(el, binding, vnode);
    }
})

function ng1LinkFunction($scope, $element, $attrs) {
    $($element).on('mouseenter',(e)=>{
        let targets = [$($element), $(e.target)];
        let tooltipShown = false;
        let isNoTooltip = (cell) => {
            return (cell[0] && cell[0].classList && cell[0].classList.contains('no-tooltip'));
        };

        for (let i = 0; !tooltipShown && i < targets.length; i++) {
            let target = targets[i];

            let targetContent = target.children(':not(:visible)').length ? target.children(':visible').text().trim() : target.text().trim();
            targetContent = (targetContent === '' ? null : targetContent/*$sanitize(targetContent)*/);
            if (!isNoTooltip(target) && target[0].scrollWidth > Math.round(target.innerWidth())) {
                if (!!targetContent && !target.hasClass('tooltipstered')) {
                    let options = {
                        animation: 'fade',
                        contentAsHTML : 'true',
                        trigger: 'hover',
                        onlyOne: 'true',
                        interactive: 'true',
                        position: 'bottom',
                        theme: 'tooltipster-default bottom',
                        content: targetContent
                    };
                    if($scope.trustTooltipText) {
                        options.contentAsHTML = 'true';
                    }
                    target.tooltipster(options);
                    target.tooltipster('show');
                }
                else if (!!targetContent) {
                    target.tooltipster('enable');

                    if (target.tooltipster('content') != targetContent)
                        target.tooltipster('content', targetContent);
                }
            }
            else if (target.hasClass('tooltipstered'))
                target.tooltipster('disable');
        }
    });
/*
    $scope.$on('$destroy', () => {
        $($element).off('mouseenter');
        $($element).off('mouseleave');
    });
*/
}
