export function jfPanel() {
    return {
        scope: {
            jfPanelHeading: '@',
            jfPanelHelpTooltip: '@',
            jfPanelClasses: '@',
            borderless: '=?'
        },
        templateUrl: 'directives/jf_panel/jf_panel.html',
        transclude: true
    }
}