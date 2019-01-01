<template>

    <div>
        <div class="grid-container" v-if="gridOptions.data" :class="{'single-select':gridOptions.allowSingleSelect}" :style="{overflow: gridOptions.moreActionsController.isDropdownOpen ? 'visible' : 'hidden'}">
            <div class="columns-customization pull-right" v-if="gridOptions.columnsCustomization">
                <jf-multi-dropdown title="Columns" filter-placeholder="Filter Columns" :items="gridOptions.availableColumns" on-change="gridOptions.updateCustomizedColumns()"></jf-multi-dropdown>
            </div>
            <div class="wrapper-grid-actions" ng-show="!noPagination || !noCount || gridOptions.batchActions.length || filterField">
    
                <div class="counter-and-filter">
                    <div v-if="!noCount" class="grid-counter">{{ getTotalRecords() }}<span v-if="getSelectedRecords()"> ({{getSelectedRecords()}} Selected)</span></div>
    
                    <div v-if="filterField" class="filter-group">
                        <jf-grid-filter :auto-focus="autoFocus" filter-grid="gridOptions" :filter-field=" filterField " :filter-field2=" filterField2 " :filter-on-change=" filterOnChange ">
                        </jf-grid-filter>
                    </div>
                </div>
    
                <jf-grid-pagination ng-show="!noPagination" :grid-api="gridOptions.api" class="pull-right">
                </jf-grid-pagination>
    
                <jf-grid-batch-actions :grid-options="gridOptions" :grid-api="gridOptions.api" :actions="gridOptions.batchActions">
                </jf-grid-batch-actions>
            </div>
            <div ui-grid="gridOptions" v-ui-grid-draggable-rows="''" ui-grid-selection="" ui-grid-pagination="" ui-grid-grouping="" ui-grid-edit="" ui-grid-resize-columns="" :style="{visibility: gridOptions.columnDefs.length ? 'visible' : 'hidden'}" class="grid"></div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-grid',
        props: [
            'gridOptions',
            'filterField',
            'filterField2',
            'filterOnChange',
            'autoFocus',
            'objectName'
        ],
        data() {
            return {};
        }
    }

</script>

<style scoped lang="less">

    

</style>
