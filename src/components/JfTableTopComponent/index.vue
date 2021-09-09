<template>
  <div>
    <div class="jf-table-top clearfix">
      <div
        v-if="!tableView.options.getRawData().length || hasExternalFilter || tableView.options.filterVisible"
        class="counter-and-filter-wrapper"
      >
        <div
          v-if="tableView.options && !tableView.options.noCount"
          class="table-counter"
        >
          {{ totalRecords }}<span v-if="tableView.getSelectedRecords()"> ({{ tableView.getSelectedRecords() }} Selected)</span>
        </div>
        <div class="external-filters">
          <slot name="external-filters" />
        </div>
        <div
          v-if="!hasExternalFilter"
          class="jf-table-filter"
        >
          <input
            v-if="tableView.options && tableView.options.filterVisible"
            v-model="tableView.tableFilter"
            v-init="tableView.initFilter()"
            v-jf-tooltip.bind="filterTooltip"
            class="input-text"
            :disabled="isFilterDisabled()"
            ng-model-options="{debounce: { 'default': 500 } }"
            :class="{'no-results': tableView.noFilterResults}"
            placeholder="Filter"
            @input="tableView.onUpdateFilter()"
          >
        </div>
      </div>

      <div
        v-if="tableView.options && tableView.options.batchActions && tableView.options.batchActions.length"
        class="batch-actions-wrapper"
      >
        <jf-table-view-batch-actions
          :table-options="tableView.options"
          :actions="tableView.options.batchActions"
        />
      </div>

      <div
        v-if="tableView.options && tableView.paginationApi.getTotalPages() > 1"
        class="pagination-controls"
      >
        <jf-drag-drop-pagination
          v-if="tableView.paginationApi && tableView.options.paginationVisible"
          ref="pagination"
          :pagination-api="tableView.paginationApi"
        />
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfTableTop',
        props: [
            'tableView',
            'totalRecords'
        ],
        data() {
            return {};
        },
        computed: {
            filterTooltip() {
                return !this.tableView.options.tooltipFilterDisabled ? this.tableView.options.getFilterTooltip() : ''
            },
            hasExternalFilter () {
                return !!this.$slots['external-filters'] || !!this.$scopedSlots['external-filters'];
            }
        },
        ng1_legacy: { 'controllerAs': 'jfTableTop' },
        methods: {
            isFilterDisabled() {
                return !(this.tableView.options && (this.tableView.options.getRawData().length || this.tableView.options.externalTotalCount && this.tableView.options.externalTotalCount.total > 0)) || this.tableView.options.isFilterDisabledCallback && this.tableView.options.isFilterDisabledCallback();
            }
        }
    }

</script>

<style scoped lang="less">



</style>
