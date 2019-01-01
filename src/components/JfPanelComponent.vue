<template>

    <div>
        <div>
            <span class="panel-heading" v-if="jfPanelHeading">
            {{jfPanelHeading}} <jf-help-tooltip :html="jfPanelHelpTooltip" v-if="jfPanelHelpTooltip"></jf-help-tooltip>
        </span>
            <div class="panel-body">
                <div class="panel panel-default clearfix">
                    <slot></slot>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    export default {
        name: 'jf-panel',
        props: [
            'jfPanelHeading',
            'jfPanelHelpTooltip',
            'jfPanelClasses',
            'bordered'
        ],
        'jf@inject': ['$element'],
        data() {
            return {};
        },
        ng1_legacy: { 'controllerAs': '$ctrl' },
        methods: {
            hasNestedJfPanel() {
                return this.$element.has('jf-panel').length > 0;
            }
        }
    }

</script>

<style scoped lang="less">



</style>
