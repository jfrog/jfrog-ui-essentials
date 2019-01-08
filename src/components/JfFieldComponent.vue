<template>
    <div class="jfrog-field">
        <slot></slot>
<!--
        <label :for="field">{{label}}</label>
        <input :name="field"
               v-model="value"
               @input="onInput($event)"
               v-validate="validationRules"
               :placeholder="placeholder"
               @focus="onFocus()"
               @blur="onBlur()"
               :class="{'text-input': true, error: errors.errors && errors.errors.length && !focused}"
               :autofocus="autofocus">
-->
        <div class="field-validation-error"
             v-if="errors.errors && !focused">
            <div v-for="error in errors.errors">
                {{validationErrors[error.rule] || 'MISSING VALIDATION MESSAGE'}}
            </div>
        </div>
    </div>
</template>

<script>
    import VALIDATION_ERRORS from '../constants/validation.constants';

    export default {
        name: 'jf-field',
        props: {
            label: '',
            field: '',
            placeholder: '',
            modelBase: null,
            validationMessages: '',
            validationRules: '',
            type: '',
            autofocus: false
        },
        data () {
            return {
                validationErrors: null,
                focused: false
            }
        },
        computed: {
            value() {
                return _.get(this.modelBase, this.field);
            }
        },
        methods: {
            onFocus() {
                this.focused = true;
            },
            onBlur() {
                setTimeout(() => {
                    this.focused = false;
                }, 100)
            },
            onInput(e) {
                _.set(this.modelBase, this.field, e.target.value);
                setTimeout(() => {
                    this.modelBase.$isValid = !(this.errors && this.errors.errors && this.errors.errors.length);
                })
            }
        },
        mounted() {
            this.validationErrors = _.cloneDeep(VALIDATION_ERRORS.common);
            if (this.validationMessages) _.extend(this.validationErrors, VALIDATION_ERRORS[this.validationMessages]);
            Object.keys(this.validationErrors).forEach(key => {
                this.validationErrors[key] = this.validationErrors[key].replace('@fieldName', _.startCase(this.field))
            })
            if (this.autofocus) {
                setTimeout(() => {
                    this.$el.querySelector('input').focus()
                });
            }

            this.modelBase.getData = () => {
                let data = _.cloneDeep(this.modelBase);
                delete data.$isValid;
                return data;
            }


            this.$set(this.modelBase, '$isValid', undefined);


            this.$el.querySelector('input').type = this.type || 'text';
        }
    }
</script>

<style lang="less" scoped>
    label,
    input {
        display: block;
    }
    .text-input {
        width: 200px;
        height: 20px;
        border: 1px solid black;
        transition: border-color .5s;
        outline: none;

        &.error {
            border: 1px solid red;
        }
    }
    .field-validation-error {
        color: red;
        margin-top: -2px;
        font-size: 12px;
        width: 200px;
    }
</style>
