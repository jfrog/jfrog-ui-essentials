class jfRadioButtonController {
    constructor($element, $transclude, $timeout, $scope) {
        $transclude(function(clone) {
            $timeout(function() {
                $element.find('label').prepend(clone);
            }, 0, false);
        });

        $scope.onClickTemplate = () => {
            $timeout(()=>{
	            $($element).parent().find('input[type=radio]').prop( "checked", false );
	            $($element).find('input[type=radio]').prop( "checked", true )
            })
        }
    }

}

export function jfRadioButton() {
    return {
        restrict: 'E',
        transclude: {
            template: '?radioTemplate'
        },
        scope: {
            text: '@?',
            helper: '@?'
        },
        controller: jfRadioButtonController,
        templateUrl: 'directives/jf_radio_button/jf_radio_button.html'
    }
}