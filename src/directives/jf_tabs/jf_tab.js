export function jfTab() {
    return {
        scope: {
            name: '@'
        },
        require:'^jfTabs',
        templateUrl: 'directives/jf_tabs/jf_tab.html',
        transclude: true,
        link: function(scope, element, attrs, ctrl) {
            scope.getCurrentTabName = () => ctrl.currentTab && ctrl.currentTab.name;
        }
    }
}
