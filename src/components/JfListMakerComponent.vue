<template>
    <div>
        <div class="jf-list-maker" >
            <div class="list-new-value" :class="{dropdown: predefinedValues}" v-if="!hideAddNewFields">
                <form>
                    <jf-field validations="common" :dont-push-down-errors="true" :delayed-init="true">
                        <label>{{label}}</label>
                        <jf-help-tooltip v-if="helpTooltip" :html="helpTooltip"></jf-help-tooltip>
                        <input v-if="!predefinedValues" :type="inputType || 'text'" class="input-text" :placeholder="derivedPlaceHolder" v-model="newValue" :id="'newValueField-' + int_listId" name="newValueField" jf-enter-press="addValue()" @input="errorMessage=null" :disabled="ngDisabled">
                        <jf-ui-select v-if="predefinedValues" :jf-select-model="newValue" :jf-select-placeholder="derivedPlaceHolder" :jf-select-disabled="ngDisabled" :jf-select-options="predefinedValues"></jf-ui-select>

                    </jf-field>
                </form>
                <div class="list-new-value-button">
                    <i class="icon icon-new" @click="!(ngDisabled || !newValue.length) && addValue()" :disabled="ngDisabled || !newValue.length"></i>
                </div>
            </div>
            <div class="jf-validation" v-if="errorMessage">{{errorMessage}}</div>

            <div :id="int_listId" class="list-maker-list" v-if="int_values.length">
                <div class="list-maker-list-row" v-for="(value, index) in int_values" :key="index">
                    <div class="list-maker-row-value" v-jf-tooltip-on-overflow>{{value}}</div>
                    <div class="list-maker-list-buttons">
                        <a href="" class="icon icon-close" @click.prevent="removeValue(index)" v-if="int_values.length > int_minLength" :disabled="ngDisabled"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from "lodash";
    export default {
        name: 'jf-list-maker',
        props: [
            'value',
            'label',
            'helpTooltip',
            'objectName',
            'ngDisabled',
            'noSort',
            'minLength',
            'inputType',
            'predefinedValues',
            'placeholder',
            'listId',
            'hideAddNewFields',
            'validationRegex',
            'validationRegexMessage',
            'caseInsensitive'
        ],
        data() {
            return {
                newValue: "",
                errorMessage: null,
                derivedPlaceHolder: this.placeholder || `New ${this.objectName || "Value"}`,
                // The three variables below are being added to avoid mutating the prop
                int_values: this.value || [],
                int_listId: this.listId,
                int_noSort: this.noSort,
                int_minLength: this.minLength || 0
            };
        },
        watch: {
            value(changedValue) {
                this.int_values = changedValue;
            },
            listId(changedValue) {
                this.int_listId = changedValue;
            },
            noSort(changedValue) {
                this.int_noSort = changedValue;
            }
        },
        mounted() {
            this.int_noSort = this.noSort || this.$attrs.hasOwnProperty('noSort');
            if (this.int_values && !this.int_noSort) {
                this.int_values = _.sortBy(this.int_values);
            }
            if (!this.int_listId) {
                let randomId = Math.floor(1000000000 * Math.random());
                this.int_listId = 'list-id-' + randomId;
            }
        },
        methods: {
            addValue() {
                this.errorMessage = null;

                if (_.isEmpty(this.newValue.trim())) {
                    this.errorMessage = 'Must input value';
                } else if (!this._isValueUnique(this.newValue)) {
                    this.errorMessage = 'Value already exists';
                } else if (!_.isEmpty(this.validationRegex) && !new RegExp(this.validationRegex).test(this.newValue)) {
                    this.errorMessage = _.isEmpty(this.validationRegexMessage) ? 'Value not valid' : this.validationRegexMessage;
                }
                else {
                    this.$emit('on-add-value', { newValue: this.newValue });
                    this.int_values.push(this.newValue);
                    this.newValue = "";
                    this.$emit('on-after-add-value');
                }
                if (!this.int_noSort) {
                    this.int_values = _.sortBy(this.int_values);
                }
                this.$emit('input', this.int_values);
            },
            removeValue(index) {
                this.int_values.splice(index, 1);
                this.$emit('input', this.int_values);
                this.$emit('on-after-delete-value');
            },
            _isValueUnique(text) {
                if (this.caseInsensitive) {
                    return !this.int_values || !_.find(this.int_values, val => val.toLowerCase() === text.toLowerCase());
                }
                return !this.int_values || this.int_values.indexOf(text) == -1;
            }
        }
    };

</script>
