import {Component, OnInit, Input, Inject} from '@angular/core';
import {FormGroup, AbstractControl} from '@angular/forms';

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

    public focused = false;

    public validationErrors;

    constructor(@Inject('JFrogUILibConfig') private libConfig) {
    }

    ngOnInit() {
        this.validationErrors = this.libConfig.getConfig().DEFAULT_VALIDATION_MESSAGES_FUNC((this.validations || 'common'),this.libConfig);
    }

    isRequired() {
        let emptyValidState:any = this.form.controls[this.field].validator(({value:''} as AbstractControl));
        return emptyValidState && emptyValidState.required;
    }

}
