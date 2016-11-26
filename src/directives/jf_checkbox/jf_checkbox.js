class jfCheckboxController {
    constructor($element, $transclude, $timeout) {
        $transclude(function(clone) {
            $timeout(function() {
                if (clone && clone[0] && clone[0].nodeName === 'NG-TRANSCLUDE') {
                    $element.find('label').prepend(clone.find('input'));
                }
                else {
                    $element.find('label').prepend(clone);
                }
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