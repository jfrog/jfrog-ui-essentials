<template>

    <div>
        <div :class="{'sticky-errors': dontPushDownErrors}" class="jf-field">
            <div :class="{'input-label': animated}">
                <validation-provider :rules="inferredRules" :events="['input', 'focus']" :name="validationDomain">
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

    import { ValidationProvider } from 'vee-validate';

    export default {
        name: 'jf-field',
        components: {
            ValidationProvider
        },
        'jf@inject': [
            'JFrogEventBus',
            'JFrogUILibConfig',
            '$timeout',
            '$rootScope',
            '$scope'
        ],
        props: [
            'animated',
            'validations',
            'validationRules',
            'customValidations',
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
                focused: false,
                inferredRules: '',
                formField: null,
                inputElement: null,
                inputName: '',
                validationDomain: this.validations || 'common'
            };
        },
        mounted() {

            this.inputElement = this.$element.find('input');
            if (!this.inputElement.length) {
                this.inputElement = this.$element.find('textarea');
            }

            if (this.inputElement.length) {
                this.inputName = this.inputElement[0].attributes['name'] ? this.inputElement[0].attributes['name'].value : '';
                this.formField = this.$element.parents('form')[0].attributes['name']
                                    ? window[this.$element.parents('form')[0].attributes['name'].value][this.inputName]
                                    : null

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
                    if (this.formField) this.formField.showErrors = true;
                } else {
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

                if (this.formField && this.formField.isAutoFocused) {
                    if (!this.formField.isAutoFocusedFlag) {
                        this.formField.isAutoFocused = false;
                        this.formField.showErrors = true;
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
                let rules = {};
                let attrs = this.inputElement[0].attributes;
                if (attrs.required) rules.required = true;
                if (attrs.type) {
                    if (attrs.type.value === 'email') rules.email = true;
                    else if (attrs.type.value === 'url') rules.url = true;
                    else if (attrs.type.value === 'number') rules.decimal = true;
                    else if (attrs.type.value === 'date') rules.date_format= 'YYYY-MM-DD';
                    else if (attrs.type.value === 'datetime-local') rules.date_format = 'YYYY-MM-DDThh:mm';
                    else if (attrs.type.value === 'time') rules.date_format = 'YYYY-Www';
                    else if (attrs.type.value === 'week') rules.date_format = 'hh:mm';
                    else if (attrs.type.value === 'month') rules.date_format = 'YYYY-MM';
                }
                if (attrs.min) rules.min_value = attrs.min.value;
                if (attrs.max) rules.max_value = attrs.max.value;
                if (attrs.pattern) rules.regex = attrs.pattern.value;

                if (this.customValidations) {
                    rules.customValidations = this.customValidations;
                    Object.keys(this.customValidations).forEach(key => {
                        rules[key] = true;
                    })
                }

                if (this.validationRules) {
                    if (_.isObject(this.validationRules)) {
                        _.extend(rules,this.validationRules)
                    }
                    else {
                        if (_.isString(this.validationRules)) {
                            let strParts = this.validationRules.split('|').map(p => _.trim(p));
                            strParts.forEach(part => {
                                let key = part.split(':')[0];
                                let val = part.substr(key.length);
                                rules[key] = val;
                            })
                        }
                    }
                }


                this.inferredRules = rules;
            }
        }
    }

</script>

<style scoped lang="less">

    @import "../../assets/stylesheets/variables.less";

    .jf-field {
        label {
            font-weight: 400;
            margin-bottom: 3px;
        }
        &.sticky-errors {
            position: relative;
        }
    }

    label.mandatory {
        &::after {
            content: "*";
            margin-left: 4px;
        }
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
