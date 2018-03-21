export default function jfWizard() {

    return {
        restrict: 'E',
        scope: {},
	    templateUrl: 'directives/jf_wizard/jf.wizard.view.html',
        controller: jfWizardController,
        controllerAs: '$ctrl',
        transclude: true,
        link: ($scope, element, attrs) => {
        }
    }
}

class jfWizardController {
    constructor() {
        this.init=true;
        this.tabs=[];
    }

    registerTab(item){
        if(this.init){
            this.active=item;
            this.init=false;
        }
        this.tabs.push(item);
    }

    switch(tab){
        this.active = tab;
    }
}