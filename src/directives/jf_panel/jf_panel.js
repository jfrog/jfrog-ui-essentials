class jfPanelController {
    constructor($element) {
    	this.$element = $element;
    }
    hasNestedJfPanel() {
        return this.$element.has('jf-panel').length > 0;
    }
}

export function jfPanel() {
    return {
        scope: {
            jfPanelHeading: '@',
            jfPanelHelpTooltip: '@',
            jfPanelClasses: '@',
	        bordered: '=?'
        },
        templateUrl: 'directives/jf_panel/jf_panel.html',
        transclude: true,
	    controller: jfPanelController,
	    controllerAs: '$ctrl',
    }
}