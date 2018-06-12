// config object description
// enableNgShow - (default false) enable tab switch with ngShow

export default function jfWizard() {

	return {
		restrict: 'E',
		scope: {
			onTabSwitch: '&?',
			config : '<'
		},
		templateUrl: 'directives/jf_wizard/jf.wizard.view.html',
		controller: jfWizardController,
		controllerAs: '$ctrl',
		transclude: true,
		link: ($scope, element, attrs) => {

		}
	};
}

class jfWizardController {
	constructor($scope, JFrogEventBus, $element) {
		JFrogEventBus.registerOnScope($scope, JFrogEventBus.getEventsDefinition().WIZARD_TAB_CHANGE, tab => {
			this.switch(tab)
		});
		this.$scope = $scope;
		this.$element = $element;
		this.onTabSwitch = $scope.onTabSwitch;
        this.config = $scope.config;
		this.init = true;
		this.tabs = [];
	}

	registerTab(item) {
		if (this.init) {
			this.active = item;
			this.init = false;
		}
		this.tabs.push(item);
	}

	switch(tab) {
		this.$element.find('.wizard-content').scrollTop(0);
		this.active = tab;
		if (this.onTabSwitch) {
			this.onTabSwitch({tab: tab});
		}
	}
}