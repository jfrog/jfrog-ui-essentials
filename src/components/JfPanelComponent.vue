<template>

    <div :class="containerClass">
        <span class="panel-heading" v-if="jfPanelHeading">
            {{jfPanelHeading}} <jf-help-tooltip :html="jfPanelHelpTooltip" v-if="jfPanelHelpTooltip"></jf-help-tooltip>
        </span>
        <div class="panel-body">
            <div class="panel panel-default clearfix">
                <slot></slot>
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
            return {
                todo: false,
                hasNested: false
            };
        },
        computed: {
            containerClass() {
                return `panel-container${this.jfPanelClasses ? ' ' + this.jfPanelClasses : '' } ${this.bordered || this.hasNested ? 'bordered' : ''}`;
            }
        },
        methods: {
            hasNestedJfPanel() {
                if (!this.$element) {
                    return false;
                }
                return this.$element[0].getElementsByClassName('panel-body').length > 1;
            }
        },
        mounted() {
            this.hasNested = this.hasNestedJfPanel();
        },
        ng1_legacy: {'controllerAs': '$ctrl'}
    };

</script>

<style scoped lang="less">
    .jf-help-tooltip {
        display: inline-block;
    }

</style>
