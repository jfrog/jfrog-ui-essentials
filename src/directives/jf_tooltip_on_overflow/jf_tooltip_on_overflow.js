/*
 USAGE EXAMPLE:

 <jf-grid-filter
 filter-grid="gridOptions"  //the name of the grid (grid options)
 filter-field="fieldName"        //the name of the field that should be filtered
 filter-on-change>          //optional - don't use a button for filtering, filter on every change
 </jf-grid-filter>

 */

export function jfTooltipOnOverflow() {

    return {
        restrict: 'A',
        scope: {
        },
        link: ($scope, $element) => {
            $($element).on('mouseenter',(e)=>{
                let target = $(e.target);
                let targetContent = target.text().trim();

                if (target[0].scrollWidth > target.innerWidth()) {
                    if (!target.hasClass('tooltipstered')) {
                        target.tooltipster({
                            animation: 'fade',
                            trigger: 'hover',
                            onlyOne: 'true',
                            interactive: 'true',
                            position: 'bottom',
                            theme: 'tooltipster-default bottom',
                            content: targetContent
                        });
                        target.tooltipster('show');
                    }
                    else {
                        target.tooltipster('enable');

                        if (target.tooltipster('content') != targetContent)
                            target.tooltipster('content', targetContent);
                    }
                }
                else if (target.hasClass('tooltipstered'))
                    target.tooltipster('disable');
            });
            $scope.$on('$destroy', () => {
                $($element).off('mouseenter');
                $($element).off('mouseleave');
            });


        }
    };
}
