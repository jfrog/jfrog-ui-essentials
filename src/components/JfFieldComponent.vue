<template>

    <div>
        <div :class="{'sticky-errors': dontPushDownErrors}">
            <div :class="{'input-label': animated}" class="jf-field">
                <validation-provider :rules="inferredRules" :events="['input', 'focus']" :name="inputName">
                    <div slot-scope="{ errors }">
                        <div :class="{invalid: errors.length}">
                            <slot></slot>
                        </div>
                        <div class="field-validation-error"
                             v-if="errors.length && !focused">
                            <div v-for="error in errors" class="jf-validation">
                                {{ error }}
                            </div>
                        </div>
                    </div>
                </validation-provider>
            </div>

            <!--
                        <jf-validation v-if="(formField.showErrors || alwaysShowErrors || (formField.initialValue && !formField.$error.required)) && !formField.isAutoFocused" :field="formField" :validations-params="validationsParams" :dont-push-down="dontPushDownErrors" :dictionary="validations">
                        </jf-validation>
            -->
        </div>
    </div>

</template>

<script>

    import VALIDATION_ERRORS from '../constants/validation.constants';

    import { ValidationProvider } from 'vee-validate';

    export default {
        name: 'jf-field',
        components: {
            ValidationProvider
        },
        'jf@inject': [
            'JFrogEventBus',
            '$timeout',
            '$rootScope',
            '$scope'
        ],
        props: [
            'animated',
            'validations',
            'validationsParams',
            'autofocus',
            'invalidateOnSubmit',
            'alwaysShowErrors',
            'dontValidateDisabled',
            'delayedInit',
            'dontPushDownErrors'
        ],
        data() {
            return {
                inferredRules: '',
                focused: false,
                formField: null,
                inputElement: null,
                inputName: '',
                validationDomain: this.validations || 'common'
            };
        },
        mounted() {
            this.validationErrors = _.cloneDeep(VALIDATION_ERRORS.common);
            if (this.validationDomain) _.extend(this.validationErrors, VALIDATION_ERRORS[this.validationDomain]);

            this.inputElement = this.$element.find('input');
            if (!this.inputElement.length) {
                this.inputElement = this.$element.find('textarea');
            }

            if (this.inputElement.length) {
                this.inputName = this.inputElement[0].attributes['name'] ? this.inputElement[0].attributes['name'].value : '';
                this.formField = window[this.$element.parents('form')[0].attributes['name'].value][this.inputName];

                this.inferRules();
                this.init();
            }
        },
        methods: {
            init() {

                let EVENTS = this.JFrogEventBus.getEventsDefinition();

                let init = ()=>{
                    if (this.formField) this.formField.initialValue = true;
                    this.$scope.$watch(()=>this.autofocus, () => this.focusInput());
                    this.JFrogEventBus.registerOnScope(this.$scope, EVENTS.FORM_SUBMITTED, this._onFormSubmitted);
                    this.JFrogEventBus.registerOnScope(this.$scope, EVENTS.FORM_CLEAR_FIELD_VALIDATION, force => {
                        this._onBlur(force);
                        if (this.formField) this.formField.preventShowErrors = true;
                    });

                    this.$scope.$on('$destroy', () => {
                        this.inputElement.off('blur');
                        this.inputElement.off('keyup');
                        this.inputElement.off('keydown');
                        this.inputElement.off('focus');
                    });

                    this.inputElement.on('keydown', () => this._onKeyDown());

                    if (!this.invalidateOnSubmit && this.validationDomain) {
                        this.inputElement.on('blur', () => this._onBlur());
                        this.inputElement.on('keyup', () => this._onKeyUp());
                    }
                    if (this.invalidateOnSubmit || this.validationDomain) {
                        this.inputElement.on('focus', () => this._onFocus());
                    }

                    if (this.dontValidateDisabled) {
                        this.$rootScope.$watch(() => this.inputElement[0].disabled, () => this._onDisabledChanged(this.inputElement[0].disabled));
                    }
                    this.focusInput();
                };

                if (this.delayedInit) {
                    this.$timeout(()=>init());
                }
                else {
                    init();
                }

            },
            focusInput() {
                if (this.autofocus && this.autofocus != 'false') {
                    if (this.formField) {
                        this.formField.isAutoFocused = true;
                        this.formField.isAutoFocusedFlag = true;
                    }
                    this.$timeout(() => {
                        if (this.inputElement.scrollParent && this.inputElement.scrollParent()) {
                            var y = this.inputElement.scrollParent().scrollTop();
                            this.inputElement.focus();
                            this.inputElement.scrollParent().scrollTop(y);
                        }
                        else {
                            this.inputElement.focus();
                        }
                    });
                }
            },
            _onDisabledChanged(disabled) {
                if (disabled) {
                    this.formField.showErrors = false;
                }
                else {
                    this.formField.showErrors = true;
                }
            },
            _onFormSubmitted(formName) {
                if (!formName || (this.form.$name === formName && !this.formField.$valid)) {
                    this.inputElement.addClass('invalid');
                    if (this.formField) this.formField.showErrors = true;
                } else {
                    this.inputElement.removeClass('invalid');
                    if (this.formField) this.formField.showErrors = false;
                }
            },
            _onBlur(force) {
                this.focused = false;
                this.$timeout(function () {
                    if (this.formField) {
                        if (force) {
                            this.formField.showErrors = false;
                        } else if (!this.formField.preventShowErrors){
                            this.formField.showErrors = true;
                        }
                    }
                });

                if (force || (this.formField && this.formField.$valid) || (this.formField && this.formField.preventShowErrors)) {
                    this.inputElement.removeClass('invalid');
                } else {
                    if (this.formField && !this.formField.isAutoFocused) this.inputElement.addClass('invalid');
                }


                if (this.formField && this.formField.isAutoFocused) {
                    if (!this.formField.isAutoFocusedFlag) {
                        this.formField.isAutoFocused = false;
                        this.formField.showErrors = true;
                        if (!this.formField.isAutoFocused) this.inputElement.addClass('invalid');
                    } else {
                        this.formField.isAutoFocusedFlag = false;
                    }
                }
            },
            _onFocus() {
                this.focused = true;
                this.$timeout(function () {
                    if (this.formField) {
                        this.formField.showErrors = false;
                        this.formField.preventShowErrors = false;
                        this.inputElement.removeClass('invalid');
                    }
                });
            },
            _onKeyDown() {
                if (this.formField) {
                    this.formField.initialValue = false;
                    this.formField.isAutoFocusedFlag = false;
                }
            },
            _onKeyUp() {
                let value = this.inputElement.val();
                if (value !== null && value !== undefined && value !== '') {
                    this.inputElement.addClass('hascontent');
                } else {
                    this.inputElement.removeClass('hascontent');
                }
            },

            inferRules() {
                let rules = [];
                let attrs = this.inputElement[0].attributes;
                if (attrs.required) rules.push('required')
                if (attrs.type) {
                    if (attrs.type.value === 'email') rules.push('email')
                    else if (attrs.type.value === 'url') rules.push('url')
                    else if (attrs.type.value === 'number') rules.push('decimal')
                    else if (attrs.type.value === 'date') rules.push('date_format:YYYY-MM-DD')
                    else if (attrs.type.value === 'datetime-local') rules.push('date_format: YYYY-MM-DDThh:mm')
                    else if (attrs.type.value === 'time') rules.push('date_format:YYYY-Www')
                    else if (attrs.type.value === 'week') rules.push('date_format:hh:mm')
                    else if (attrs.type.value === 'month') rules.push('date_format:YYYY-MM')
                    if (attrs.min) rules.push('min_value:' + attrs.min.value)
                    if (attrs.max) rules.push('max_value:' + attrs.max.value)
                    if (attrs.pattern) rules.push('regex:' + attrs.pattern.value)
                }
                this.inferredRules = rules.join('|');
            }
        }
    }

</script>

<style scoped lang="less">

    @import "../../src/assets/stylesheets/variables.less";

    .jf-field {
        label {
            font-weight: 400;
            margin-bottom: 3px;
        }
    }

    label.mandatory {
        &::after {
            content: "*";
            margin-left: 4px;
        }
    }

    .sticky-errors {
        position: relative;
    }

    .jf-validation {
        color: @redError;
    }

    /deep/ .invalid {
        input:not([disabled]) {
            border-color: @redError;
            box-shadow: none;
        }
    }

</style>
