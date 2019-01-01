<template>

    <div>
        <div :class="{'sticky-errors': dontPushDownErrors}">
            <div :class="{'input-label': animated}" class="jf-field">
                <slot></slot>
            </div>
            <jf-validation v-if="(formField.showErrors || alwaysShowErrors || (formField.initialValue && !formField.$error.required)) && !formField.isAutoFocused" :field="formField" :validations-params="validationsParams" :dont-push-down="dontPushDownErrors" :dictionary="validations">
            </jf-validation>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-field',
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
            return {};
        },
        ng1_legacy: { require: '^form' }
    }

</script>

<style scoped lang="less">

    

</style>
