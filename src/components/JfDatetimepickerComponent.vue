<template>

    <div>
        <div class="input-group" :id=" attrId " datetimepicker="" options="dpOpitons" on-change="onUpdate()" v-model="model">
            <input class="input-text" @focus="onFocus()" @blur="onBlur()" :required="isRequired" :disabled="isEnabled">
            <span class="input-group-addon calendar">
            <span class="glyphicon glyphicon-calendar"></span>
            </span>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-datetimepicker',
        props: [
            'isDatepickerOpen',
            'isRequired',
            'model',
            'options',
            'attrId',
            'isEnabled'
        ],
        'jf@inject': ['$timeout'],
        data() {
            return {
                dpOpitons: {
                    allowInputToggle: true,
                    toolbarPlacement: 'top'
                }
            };
        },
        mounted() {
            this.setDatepickerOptions();
        },
        ng1_legacy: { 'controllerAs': 'jfDatetimepicker' },
        methods: {
            setDatepickerOptions() {
                if (this.options) {
                    this.dpOpitons = _.assign({}, this.options, this.dpOpitons);
                }
            },
            onUpdate() {
                this.$timeout(() => {

                    /* Todo: check the following condition. It may contain some undefined references: this.onChange */
                    if (typeof this.onChange === 'function') {
                        this.$emit('on-change');
                    }
                    this.setDatepickerOptions();
                }, 100);
            },
            onBlur() {
                this.isDatepickerOpen = false;
            },
            onFocus() {
                this.isDatepickerOpen = true;
            }
        }
    }

</script>

<style scoped lang="less">



</style>
