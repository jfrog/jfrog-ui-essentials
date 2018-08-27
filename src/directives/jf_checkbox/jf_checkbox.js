class jfCheckboxController {
	/* @ngInject */
    constructor($element, $transclude) {
        this.$element = $element;
        this.$transclude = $transclude;
    }

    $postLink() {
        this.$transclude(clone => {
            this.$element.find('label').prepend(clone);
        });
    }
}

export function jfCheckbox() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            text: '@?'
        },
        controller: jfCheckboxController,
        controllerAs: 'jfCheckbox',
        bindToController: true,
        templateUrl: 'directives/jf_checkbox/jf_checkbox.html'
    }
}