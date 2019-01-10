import VALIDATION_ERRORS from '../constants/validation.constants';
import { Validator } from 'vee-validate';
export const jfrogUiEssentialsConfig = () => {
    let injections = $jfrog.get(['$qProvider', 'JFrogUILibConfigProvider']);
    injections.$qProvider.errorOnUnhandledRejections(false);

    let customMessages = injections.JFrogUILibConfigProvider.getConfig().customValidationMessages;

    console.log('essentials config !!!');
    console.log('??????', customMessages);
    const dict = {
        messages: {
            ...VALIDATION_ERRORS
        },
        custom: {
            ...customMessages
        }
    };

    Validator.localize('en', dict);
/*
    this.validationErrors = VALIDATION_ERRORS(this.validationDomain, this.JFrogUILibConfig);
    if (this.validationDomain) _.extend(this.validationErrors, VALIDATION_ERRORS[this.validationDomain]);
*/


}
