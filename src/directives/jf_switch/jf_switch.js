class jfSwitchController {
    constructor() {
        if (!this.options) throw 'Must supply options';
        // Supports 2 methods of options:
        // array of strings
        // array of objects of type {'value': ..., 'text': ...}
        // The model is assigned the value, and the text is displayed

        this.controller = this;

        this.updateOptionObjects();

        if (_.isEmpty(this.ngModel))
            this.ngModel = this.optionObjects[0].value;
    }

    updateOptionObjects() {
        this.optionObjects = this.options.map((option) => {
            if (typeof(option) === 'string')
                return {value: option, text: option};
            else
                return option;
        });
    }

    selectOption(option) {
        if (this.disabled) return;
        this.ngModelCtrl.$setViewValue(option.value);
    }

    isSelected(option) {
        return this.ngModel === option.value;
    }
}

export function jfSwitch() {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            jfSwitchTitle: '@',
            options: '=',
            ngModel: '=',
            controller: '=',
            disabled: '=ngDisabled',
            helpTooltip: '='
        },
        link: ($scope, attrs, $element, ngModelCtrl) => {
            $scope.jfSwitch.ngModelCtrl = ngModelCtrl;
        },
        controller: jfSwitchController,
        controllerAs: 'jfSwitch',
        bindToController: true,
        templateUrl: 'directives/jf_switch/jf_switch.html'
    }
}