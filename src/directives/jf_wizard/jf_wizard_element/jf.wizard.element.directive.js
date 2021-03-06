export default function jfWizardElement() {

    return {
        restrict: 'E',
        scope: {
            title: '@',
            isVisibleTab: '&?',
	        isSelectedTab: '<?',
            isDisabledTab: '='
        },
        templateUrl: 'directives/jf_wizard/jf_wizard_element/jf.wizard.element.view.html',
        require: '^jfWizard',
        transclude: true,
        link: ($scope, element, attrs, jfWizardCtl) => {
            jfWizardCtl.registerTab({
	            title: attrs.title,
	            isSelectedTab: $scope.$ctrl.isSelectedTab,
	            isVisibleTab: $scope.$ctrl.isVisibleTab,
                isDisabledTab: $scope.$ctrl.isDisabledTab
            });
            $scope.$ctrl.jfWizardCtl = jfWizardCtl;
            $scope.$ctrl.title = attrs.title;
            $scope.$ctrl.config = $scope.$ctrl.jfWizardCtl.config;
        },
        controller: jfWizardElementController,
        bindToController: true,
        controllerAs: '$ctrl'
    }
}

class jfWizardElementController {
    constructor($scope) {}
}

