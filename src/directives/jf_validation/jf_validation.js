import VALIDATION_MESSAGES from '../../constants/validation.constants.js';

export function jfValidation() {
    return {
        scope: {
            field: '=',
            dictionary: '@',
            dontPushDown: '='
        },
        controller: jfValidation,
        controllerAs: 'jfValidation',
        bindToController: true,
        templateUrl: 'directives/jf_validation/jf_validation.html'
    }
}

class jfValidation {
    constructor(JFrogUILibConfig) {
        this.messages = VALIDATION_MESSAGES(this.dictionary,JFrogUILibConfig);
    }
}
