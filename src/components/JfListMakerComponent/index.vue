<template>
    <div class="jf-list-maker" >
        <div class="list-new-value" :class="{dropdown: predefinedValues}" v-if="!hideAddNewFields">
            <form>
                <jf-field validations="common" :dont-push-down-errors="true" :delayed-init="true">
                    <label v-if="label">{{label}}</label>
                    <jf-help-tooltip v-if="helpTooltip" :html="helpTooltip"></jf-help-tooltip>
                    <input v-if="!predefinedValues" :type="inputType || 'text'" class="input-text" :placeholder="derivedPlaceHolder" v-model="newValue" :id="'newValueField-' + int_listId" name="newValueField" jf-enter-press="addValue()" @input="errorMessage=null" :disabled="ngDisabled">
                    <jf-ui-select v-if="predefinedValues" v-model="newValue" :jf-select-placeholder="derivedPlaceHolder" :jf-select-disabled="ngDisabled" :jf-select-options="predefinedValues"></jf-ui-select>

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
                int_listId: this.listId,
                int_noSort: this.noSort || false,
                int_minLength: this.minLength || 0
            };
        },
        watch: {
            listId(changedValue) {
                this.int_listId = changedValue;
            },
            noSort(changedValue) {
                this.int_noSort = changedValue;
            }
        },
        computed:{
            int_values: function() {
                let int_values = this.value || [];
                this.int_noSort = this.noSort || this.$attrs.hasOwnProperty('noSort');
                if (int_values && !this.int_noSort) {
                    int_values = _.sortBy(int_values);
                }
                return int_values;
            }
        },
        mounted() {
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
                let returnValue = this.int_values;
                if (!this.int_noSort) {
                    returnValue = _.sortBy(returnValue);
                }
                this.$emit('input', returnValue);
            },
            removeValue(index) {
                let copyOfValues = [...this.int_values];
                copyOfValues.splice(index, 1);
                this.$emit('input', copyOfValues);
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
<style scoped lang="less">
@import "../../assets/stylesheets/variables.less";
.jf-list-maker {

    /deep/

    div.jf-validation {
        height: 22px;
        line-height: 22px;
        padding-left: 3px;
    }

    .icon {
        line-height: 42px;
        font-size: 26px;
        color: #999;

        &[disabled] {
        color: #ddd;
        cursor: default;
        }
        &:not([disabled]):hover {
        color: @greenFontHeader;
        cursor: pointer;
        }
    }


  .list-new-value {
    width: 100% !important;
    margin-right: 10px;
    position: relative;

    input {
      padding: 0 40px 0 10px;
    }

    &.dropdown {
        /deep/ div.multiselect{
            width:94%;
        }
        /deep/ .ui-select-container {
        .caret {
          margin-right: 30px;
        }
      }
    }


    .jf-field {
      position: relative;
    }
    .list-new-value-button {
      margin-top: 0;
      position: absolute;
      right: 15px;
      bottom: -3px;

      i {
        font-size: 16px;
      }
    }
    .card .row & , .modal-body & {
      @media screen and (min-width: 1900px) {
        //width: 315px !important;
      }

      @media screen and (min-width: 1680px) and (max-width: 1900px) {
        //width: 235px !important;
      }
    }
  }

  .list-maker-list {
    border-bottom: 1px solid #e4e4e4;
    box-sizing: content-box;
    max-height: 200px;
    overflow: auto;

    .list-maker-list-row {
      border-top: 1px solid #e4e4e4;
      position: relative;
      display: flex !important;
      width: 100%;
      height: 40px;
      line-height: 40px;

      div {
        display: inline-block;
        white-space: nowrap;
        width: 100%;

        &:first-child {
          padding-left: 10px;
          width: 340px;
        }

        &.list-maker-row-value {
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          padding-right: 45px;
        }

        &.list-maker-list-buttons {
          text-align: right;
          height: 40px;
          padding-right: 10px;
          position: absolute;
          right: 0;
          width: 45px;
          top: -2px;

          a {
            color: @grayFontLighter;
            font-size: 16px;
            position: relative;
            top: 2px;
            &:hover {
              color: darken(@grayFontLighter, 20%);
            }
            &:hover, &:focus, &:active {
              text-decoration: none;
            }
            &[disabled]:hover {
              color: @grayFontLighter;
              cursor: default;
            }
          }
        }
      }
    }
  }
}


</style>
