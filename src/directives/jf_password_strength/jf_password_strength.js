import {passrank} from './passrank';
class jfPasswordStrengthController {

    constructor($scope) {
        $scope.$watch('jfPS.password',(pass)=>{
            this.passLength = pass ? pass.length : 0;
            this.rank = passrank(pass);
        })
    }

    getStrength(){
        if (this.rank === 0 && this.passLength === 0) {
            return {label:'',class:'blank',sections:0};
        }
        else if (this.rank < 20) {
            return {label:'Too short',class:'short',sections:1};
        }
        else if (this.rank < 40) {
            return {label:'Weak',class:'week',sections:2};
        }
        else if (this.rank < 60) {
            return {label:'Medium',class:'medium',sections:3};
        }
        else if (this.rank < 80) {
            return {label:'Good',class:'good',sections:4};
        }
        else {
            return {label:'Strong',class:'strong',sections:5};
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
