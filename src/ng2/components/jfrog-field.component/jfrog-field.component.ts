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

    public validationErrors = this.libConfig.getConfig().DEFAULT_VALIDATION_MESSAGES_FUNC(this.validations,this.libConfig);

    constructor(@Inject('JFrogUILibConfig') private libConfig) {
    }

    ngOnInit() {
/*
        this.validationErrors = lodash.cloneDeep(this.VALIDATION_ERRORS.common);
        if (this.validations) lodash.extend(this.validationErrors,this.VALIDATION_ERRORS[this.validations]);
*/
    }

}
