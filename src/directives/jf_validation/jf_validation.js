import VALIDATION_MESSAGES from '../../constants/validation.constants.js';

export function jfValidation() {
    return {
        scope: {
            field: '=',
            dictionary: '@',
            validationsParams: '=',
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

    applyParams(msg) {

        if (!this.validationsParams) return msg;

        let regex = /\@\{(.*?)\}/g;

        let matches = msg.match(regex);

        for (let i=0; matches && i<matches.length; i++) {
            let match = matches[i];
            let exec = regex.exec(match);
            let param = exec[1];
            let value = this.validationsParams[param];
            if (value) msg = msg.replace(match,value);
        }

        return msg;

    }
}
