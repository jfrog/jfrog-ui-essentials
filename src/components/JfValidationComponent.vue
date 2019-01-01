<template>

    <div>
        <ng-messages for="field.$error" class="jf-validation" :style="{position: dontPushDown ? 'absolute' : 'relative'}">
            <div v-for="(key, value) in messages">
                <div ng-message-exp="key" id="validation-label">{{ applyParams(value) }}</div>
            </div>
        </ng-messages>
    </div>

</template>

<script>

    export default {
        name: 'jf-validation',
        props: [
            'field',
            'dictionary',
            'validationsParams',
            'dontPushDown'
        ],
        'jf@inject': ['JFrogUILibConfig'],
        data() {
            return { messages: null };
        },
        created() {
            return {
                scope: {
                    field: '=',
                    dictionary: '@',
                    validationsParams: '=',
                    dontPushDown: '='
                },
                controller: jfValidation,
                controllerAs: 'jfValidation',
                bindToController: true,
                templateUrl: 'directives/jf_validation/jf_validation.html'
            };
        },
        ng1_legacy: { 'controllerAs': 'jfValidation' }
    }

</script>

<style scoped lang="less">

    

</style>
