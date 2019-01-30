<template>
    <div class="jf-datetimepicker">
        <div class="input-group"
             :class="{disabled: !isEnabled, error: error}"
             ref="pickerElement">
            <date-picker v-model="datetime"
                         :config="dpOpitons"
                         :wrap="wrap"></date-picker>
            <span class="input-group-addon calendar">
                <span class="glyphicon glyphicon-calendar"></span>
            </span>
        </div>
        <div class="field-validation-error" v-if="error">
            <div class="jf-validation">
                this field is required
            </div>
        </div>
    </div>
</template>

<script>
    import datePicker from 'vue-bootstrap-datetimepicker';

    export default {
        name: 'jf-datetimepicker',
        components: {
            datePicker
        },
        props: {
            isDatepickerOpen: {
                default: false,
                type: Boolean
            },
            isRequired: {
                default: false,
                type: Boolean
            },
            model: {
                default: {}
            },
            options: null,
            attrId: {
                default: null
            },
            isEnabled: {
                default: true,
                type: Boolean
            }
        },
        data() {
            return {
                wrap: true,
                dpOpitons: {
                    allowInputToggle: true,
                    toolbarPlacement: 'top'
                }
            };
        },
        computed: {
            uniqId() {
                return this.attrId || this._uid;
            },
            datetime: {
                get() {
                    if (!this.model) {
                        return;
                    }
                    return window.moment(this.model);
                },
                set(val) {
                    this.$emit('update:model', val);
                    this.$emit('on-change', val);
                }
            },
            error() {
                return this.isRequired && !this.model
            }
        },
        created() {
            this.setDatepickerOptions();
        },
        mounted() {
            let pickerElement = this.$refs.pickerElement;

            // apply essentials css to inner component
            pickerElement.firstChild.classList.add('input-text');

            this.dateTimePickerObj = window.$(pickerElement).datetimepicker();
            if (this.isDatepickerOpen) {
                this.show();
            }
        },
        methods: {
            setDatepickerOptions() {
                if (this.options) {
                    this.dpOpitons = _.assign({}, this.options, this.dpOpitons);
                }
            },
            show() {
                this.dateTimePickerObj.data('DateTimePicker').show();
            }
        },
        watch: {
            isDatepickerOpen(val) {
                if (val) {
                    this.show();
                } else {
                    this.$emit('update:isDatepickerOpen', val);
                }
            }
        }
    };

</script>

<style lang="less">
    @import '../assets/stylesheets/main';

    .jf-datetimepicker {
        .disabled {
            pointer-events: none;
            input {
                background: #f5f5f5;
            }
        }
        .error {
            input {
                border-color: @redError;
            }
        }

        .input-group-addon.calendar {
            border: 1px solid #e9e9e9;
            border-radius: 0;
        }

        .bootstrap-datetimepicker-widget {
            list-style: none;
            &.dropdown-menu {
                width: 25em;
            }
            table td {
                span {
                    line-height: inherit;
                    height: inherit;
                    &.active {
                        background: @greenFontHeader;
                    }
                    &.disabled,
                    &.disabled:hover {
                        color: @textNumbergGray;
                    }
                }
                &.active,
                &.active:hover {
                    background: @greenFontHeader;
                }
                &.today:before {
                    border-bottom-color: @greenFontHeader;
                }
                .btn.btn-primary {
                    min-width: 50px;
                    margin-right: 20px;
                }

                &.disabled,
                &.disabled:hover {
                    color: @textNumbergGray;
                }
            }
            a[data-action] {
                padding: 0;
            }
        }

        .input-group-addon.calendar {
            border: 1px solid #e9e9e9;
            border-radius: 0;
        }

        .datepicker table tr td.old,
        .datepicker table tr td.new {
            color: lightgray;
        }
    }
</style>
