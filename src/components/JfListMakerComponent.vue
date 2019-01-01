<script>

    const TEMPLATE = `
    <div>
        <div class="jf-list-maker" v-jf-disable-ng-animate="''">
            <div class="list-new-value" :class="{dropdown: predefinedValues}" v-if="!hideAddNewFields">
                <form>
                    <jf-field validations="common" :dont-push-down-errors="true" :delayed-init="true">
                        <label>{{label}}</label>
                        <jf-help-tooltip v-if="helpTooltip" :html="helpTooltip"></jf-help-tooltip>
                        <input v-if="!predefinedValues" :type="inputType || 'text'" class="input-text" v-model="newValue" :placeholder="placeholder || 'New ' + (objectName || 'Value')" :id="'newValueField-' + listId" name="newValueField" jf-enter-press="addValue()" @input="errorMessage=null" :disabled="ngDisabled">
                        <jf-ui-select v-if="predefinedValues" :jf-select-model="newValue" :jf-select-placeholder="placeholder || 'New ' + (objectName || 'Value')" :jf-select-disabled="ngDisabled" :jf-select-options="predefinedValues"></jf-ui-select>
    
                    </jf-field>
                </form>
                <div class="list-new-value-button">
                    <i class="icon icon-new" @click="!(ngDisabled || !newValue.length) && addValue()" :disabled="ngDisabled || !newValue.length"></i>
                </div>
            </div>
            <div class="jf-validation">{{errorMessage}}</div>
    
            <div :id="listId" class="list-maker-list" v-if="values.length">
                <div class="list-maker-list-row" v-for="(value, $index) in values">
                    <div class="list-maker-row-value" v-jf-tooltip-on-overflow="''">{{value}}</div>
                    <div class="list-maker-list-buttons">
                        <a href="" class="icon icon-close" @click.prevent="removeValue($index)" v-if="values.length > minLength" :disabled="ngDisabled"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    export default {
        template: TEMPLATE,
        name: 'jf-list-maker',
        props: [
            'values',
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
        'jf@inject': ['$attrs'],
        data() {
            return {
                newValue: { length: null },
                errorMessage: null
            };
        },
        mounted() {
            this.noSort = this.noSort || this.$attrs.hasOwnProperty('noSort');
            if (this.values && !this.noSort)
                this.values = _.sortBy(this.values);
            this.minLength = this.minLength || 0;
    
            let randomId = Math.floor(1000000000 * Math.random());
            if (!this.listId)
                this.listId = 'list-id-' + randomId;
        },
        ng1_legacy: { 'controllerAs': 'jfListMaker' },
        methods: {
            addValue() {
    
                if (!this.values)
                    this.values = [];
    
                this.errorMessage = null;
    
    
    
                if (_.isEmpty(this.newValue)) {
                    this.errorMessage = 'Must input value';
                } else if (!this._isValueUnique(this.newValue)) {
                    this.errorMessage = 'Value already exists';
                } else if (!_.isEmpty(this.validationRegex) && !new RegExp(this.validationRegex).test(this.newValue)) {
                    this.errorMessage = _.isEmpty(this.validationRegexMessage) ? 'Value not valid' : this.validationRegexMessage;
                }   
     else {
                    this.newValue = this.$emit('on-add-value', { newValue: this.newValue });
                    this.values.push(this.newValue);
                    this.newValue = null;
                    this.$emit('on-after-add-value');
                }
                if (!this.noSort) {
                    this.values = _.sortBy(this.values);
                }
            },
            removeValue(index) {
                this.values.splice(index, 1);
    
                /* Todo: check the following condition. It may contain some undefined references: this.onAfterDeleteValue */
    
                if (typeof this.onAfterDeleteValue === 'function') {
                    this.$emit('on-after-delete-value');
                }
            },
            _isValueUnique(text) {
                if (this.caseInsensitive) {
                    return !this.values || !_.find(this.values, val => {
                        return val.toLowerCase() === text.toLowerCase();
                    });
                }
                return !this.values || this.values.indexOf(text) == -1;
            }
        }
    };

</script>

<style scoped lang="less">

    

</style>
