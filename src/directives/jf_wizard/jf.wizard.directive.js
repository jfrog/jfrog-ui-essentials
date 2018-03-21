export default function jfWizard() {

    return {
        restrict: 'E',
        scope: {},
	    templateUrl: 'directives/jf_wizard/jf.wizard.view.html',
        controller: jfWizardController,
        controllerAs: '$ctrl',
        transclude: true,
        link: ($scope, element, attrs) => {
            $scope.$ctrl.active=$scope.$ctrl.tabs[0];
        }
    }
}

class jfWizardController {
    constructor() {
        this.tabs=[];
    }

    registerTab(item){
        this.tabs.push(item);
    }

    switch(tab){
        this.active = tab;
    }
}