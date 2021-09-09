<template>
  <div :class="containerClass">
    <span
      v-if="jfPanelHeading"
      class="panel-heading"
    >
      {{ jfPanelHeading }} <jf-help-tooltip
        v-if="jfPanelHelpTooltip"
        :html="jfPanelHelpTooltip"
      />
    </span>
    <div class="panel-body">
      <div class="panel panel-default clearfix">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfPanel',
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
        mounted() {
            this.hasNested = this.hasNestedJfPanel();
        },
        methods: {
            hasNestedJfPanel() {
                if (!this.$element) {
                    return false;
                }
                return this.$element[0].getElementsByClassName('panel-body').length > 1;
            }
        },
        ng1_legacy: {'controllerAs': '$ctrl'}
    };

</script>

<style scoped lang="less">
    .jf-help-tooltip {
        display: inline-block;
    }

</style>
