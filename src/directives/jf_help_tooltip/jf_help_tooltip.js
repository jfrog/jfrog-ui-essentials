export function jfHelpTooltip() {
    return {
        scope: {
            placement: '@?',
            text: '@?',
            html: '='
        },
        restrict: 'E',
        templateUrl: 'directives/jf_help_tooltip/jf_help_tooltip.html',
        transclude: true,
        link: function ($scope, $element, $attrs, ctrl, $transclude) {
            let content = $scope.text || $scope.html || $transclude().html();
            if (!content) return;

            content = content.replace(/\n/g, '<br>');

            $($element).find('.jf-tooltipster').tooltipster({
                animation: 'fade',
                contentAsHTML : 'true',
                trigger: 'hover',
                onlyOne: 'true',
                interactive: 'true',
                interactiveTolerance: 500,
                position: $element.placement,
                theme: "tooltipster-default " + $element.placement,
                content: content,
                functionReady: function() {
                    $($element).find('.jf-tooltipster').addClass('active');
                },
                functionAfter: function() {
                    $($element).find('.jf-tooltipster').removeClass('active');
                }
            });
        }
    }
}