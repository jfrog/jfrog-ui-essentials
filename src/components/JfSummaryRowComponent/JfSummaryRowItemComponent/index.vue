<template>
  <div
    v-if="summaryItemIsActive"
    class="summery-labeled-item"
  >
    <div class="summary-item-label">
      {{ summaryItemLabel }}
    </div>
    <div class="jf-summary-row-item">
      <span
        v-if="!summaryItemUnwrap"
        class="summary-item-wrapper"
      >
        <slot />
      </span>
      <slot v-if="summaryItemUnwrap" />
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfSummaryRowItem',
        props: [
            'summaryItemLabel',
            'summaryItemUnwrap',
            'summaryItemIsActive',
        ],
        data () {
            return {};
        },
        mounted() {},
    }

</script>

<style scoped lang="less">
    .jf-summary-row-item > span:not(.no-ellipsis) {
        width: 100% !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        a {
            max-width: 100% !important;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>
