import {VALIDATION_ERRORS} from "../../constants/validation-error-messages.constants";
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {lodash} from "../../../third-parties";

@Component({
    selector: 'jfrog-field',
    template: require('./jfrog-field.component.html'),
    styles: [require('./jfrog-field.component.lessc')]
})
export class JFrogFieldComponent implements OnInit {
    @Input() public form:FormGroup;
    @Input() public label:string;
    @Input() public field:string;
    @Input() public validations:string;
    @Input() public type:string;

    public validationErrors;
    public focused = false;

    constructor() {
    }

    ngOnInit() {
        this.validationErrors = lodash.cloneDeep(VALIDATION_ERRORS.common);
        if (this.validations) lodash.extend(this.validationErrors,VALIDATION_ERRORS[this.validations]);
    }

}
