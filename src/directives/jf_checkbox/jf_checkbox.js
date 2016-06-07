class jfCheckboxController {
    constructor($element, $transclude, $timeout) {
        $transclude(function(clone) {
            // (Adam) TODO: Find out why checkbox appears only when grid appears in jf_properties
            $timeout(function() {
                $element.find('label').prepend(clone);
            }, 0, false);
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
        templateUrl: 'directives/jf_checkbox/jf_checkbox.html'
    }
}