class jfClearErrorsController {
	/* @ngInject */
    constructor($scope, $element, $attrs, JFrogEventBus) {

        this.JFrogEventBus = JFrogEventBus;
        this.EVENTS = JFrogEventBus.getEventsDefinition();

        angular.element($element).on("mousedown",()=>{
            this.clearFieldValidations();
        })
    }

    clearFieldValidations() {
        this.JFrogEventBus.dispatch(this.EVENTS.FORM_CLEAR_FIELD_VALIDATION, true);
    }

}

export function jfClearErrors() {

    return {
        restrict: 'A',
        controller: jfClearErrorsController
    };
}
