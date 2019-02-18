<template>

    <div>
        <div class="jf-table-top clearfix">

            <div class="counter-and-filter-wrapper">
                <div v-if="tableView.options && !tableView.options.noCount" class="table-counter">{{ totalRecords }}<span v-if="tableView.getSelectedRecords()"> ({{tableView.getSelectedRecords()}} Selected)</span></div>
                <div class="jf-table-filter">
                    <input class="input-text" v-if="tableView.options && tableView.options.filterVisible" :disabled="isFilterDisabled()" v-model="tableView.tableFilter" ng-model-options="{debounce: { 'default': 500 } }" @input="tableView.onUpdateFilter()" :class="{'no-results': tableView.noFilterResults}" placeholder="Filter" v-init="tableView.initFilter()" v-jf-tooltip.bind="filterTooltip">
                </div>
            </div>

                <div class="batch-actions-wrapper" v-if="tableView.options">
                <jf-table-view-batch-actions
                    :table-options="tableView.options"
                    :actions="tableView.options.batchActions">
                </jf-table-view-batch-actions>
            </div>

            <div class="pagination-controls" v-if="tableView.options">
                <jf-drag-drop-pagination ref="pagination" :pagination-api="tableView.paginationApi" v-if="tableView.paginationApi && tableView.options.paginationVisible">
                </jf-drag-drop-pagination>
            </div>

        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-table-top',
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
