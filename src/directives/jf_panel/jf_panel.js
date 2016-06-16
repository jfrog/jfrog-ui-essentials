export function jfPanel() {
    return {
        scope: {
            jfPanelHeading: '@',
            jfPanelHelpTooltip: '@',
            jfPanelClasses: '@',
        },
        templateUrl: 'directives/jf_panel/jf_panel.html',
        transclude: true
    }
}