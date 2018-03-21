export default function jfWizardElement() {

    return {
        restrict: 'E',
        scope: {
            title: '@',
        },
        templateUrl: 'directives/jf_wizard/jf_wizard_element/jf.wizard.element.view.html',
        require: '^jfWizard',
        transclude: true,
        link: ($scope, element, attrs, jfWizardCtl) => {
            jfWizardCtl.registerTab(attrs.title);

            $scope.$ctrl.jfWizardCtl=jfWizardCtl;
            $scope.$ctrl.title=attrs.title;
        },
        controller: jfWizardElementController,
        bindToController: true,
        controllerAs: '$ctrl'
    }
}

class jfWizardElementController {
    constructor($scope) {}
}
