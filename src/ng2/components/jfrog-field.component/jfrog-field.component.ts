import {Component, OnInit, Input, Inject} from '@angular/core';
import { FormGroup } from '@angular/forms';

let lodash = (window as any)._;

@Component({
    selector: 'jfrog-field',
    template: require('./jfrog-field.component.html'),
    styles: [require('text-loader!less-loader!./jfrog-field.component.lessc')]
})
export class JFrogFieldComponent implements OnInit {
    @Input() public form:FormGroup;
    @Input() public label:string;
    @Input() public field:string;
    @Input() public validations:string;
    @Input() public type:string;

    public validationErrors;
    public focused = false;

    public VALIDATION_ERRORS = this.libConfig.getConfig().DEFAULT_VALIDATION_MESSAGES;

    constructor(@Inject('JFrogUILibConfig') private libConfig) {
        console.log(this.VALIDATION_ERRORS);
    }

    ngOnInit() {
        this.validationErrors = lodash.cloneDeep(this.VALIDATION_ERRORS.common);
        if (this.validations) lodash.extend(this.validationErrors,this.VALIDATION_ERRORS[this.validations]);
    }

}
