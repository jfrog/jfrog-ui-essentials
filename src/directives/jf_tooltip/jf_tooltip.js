export function jfTooltip($sanitize) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
	        let content = ($attrs.jfTooltip === '' ? null : $sanitize($attrs.jfTooltip));
            $($element).tooltipster({
                animation: 'fade',
                contentAsHTML : !$attrs.disableJfTooltipHtml,
                trigger: 'hover',
                onlyOne: 'true',
                interactive: 'true',
                position: 'bottom',
                theme: 'tooltipster-default bottom',
                content: content
            });

            $attrs.$observe('jfTooltip', (val) => {
	            val = (val === '' ? null : $sanitize(val));
                $($element).tooltipster('content',val);
            });
        }
    }
}
