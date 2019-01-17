<template>

    <div>
        <div class="jf-switch" :class="jfSwitchClass" >
            <span v-if="jfSwitchTitle" class="jf-switch-title">{{jfSwitchTitle}}</span>
            <jf-help-tooltip v-if="helpTooltip" :html="helpTooltip"></jf-help-tooltip>
            <ul class="jf-switch-options">
                <li v-for="option in optionObjects">
                    <a class="jf-switch-option" href="" @click.prevent="selectOption(option)" :class="{active: isSelected(option), disabled: disabled}">{{option.text}}</a>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-switch',
        props: [
            'jfSwitchTitle',
            'options',
            'value',
            'disabled',
            'helpTooltip',
            'jfSwitchClass'
        ],
        data() {
            return { optionObjects: null };
        },
        mounted() {
            if (!this.options)
                throw 'Must supply options';
            // Supports 2 methods of options:
            // array of strings
            // array of objects of type {'value': ..., 'text': ...}
            // The model is assigned the value, and the text is displayed

            this.updateOptionObjects();

            if (_.isEmpty(this.value))
                this.$emit('input', this.optionObjects[0].value);
        },
        ng1_legacy: {
            'controllerAs': 'jfSwitch'
        },
        methods: {
            updateOptionObjects() {
                this.optionObjects = this.options.map(option => {
                    if (typeof option === 'string')
                        return {
                            value: option,
                            text: option
                        };
                    else
                        return option;
                });
            },
            selectOption(option) {
                if (this.disabled)
                    return;
                this.$emit('input', option.value);
            },
            isSelected(option) {
                return this.value === option.value;
            }
        }
    }

</script>

<style scoped lang="less">



</style>
