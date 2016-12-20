import {passrank} from './passrank';
class jfPasswordStrengthController {

    constructor($scope) {
        $scope.$watch('jfPS.password',(pass)=>{
            this.rank = passrank(pass);
        })
    }


    getClass() {
        if (this.rank < 20) {
            return 'bad';
        }
        else if (this.rank < 40) {
            return 'weak';
        }
        else if (this.rank < 60) {
            return 'medium';
        }
        else if (this.rank < 80) {
            return 'good';
        }
        else {
            return 'perfect';
        }
    }
}

export function jfPasswordStrength() {

    return {
        restrict: 'E',
        scope: {
            password: '=',
            rank: '='
        },
        controller: jfPasswordStrengthController,
        controllerAs: 'jfPS',
        templateUrl: 'directives/jf_password_strength/jf_password_strength.html',
        bindToController: true
    };

}
