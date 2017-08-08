class jfRadioButtonController {
    constructor($element, $transclude, $timeout) {
        $transclude(function(clone) {
            $timeout(function() {
                $element.find('label').prepend(clone);
            }, 0, false);
        });
    }
}

export function jfRadioButton() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            text: '@?',
            helper: '@?'
        },
        controller: jfRadioButtonController,
        templateUrl: 'directives/jf_radio_button/jf_radio_button.html'
    }
}