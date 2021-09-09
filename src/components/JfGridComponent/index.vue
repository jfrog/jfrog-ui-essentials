<template>
  <div>
    <div
      v-if="gridOptions.data"
      class="grid-container"
      :class="{'single-select':gridOptions.allowSingleSelect}"
      :style="{overflow: gridOptions.moreActionsController.isDropdownOpen ? 'visible' : 'hidden'}"
    >
      <div
        v-if="gridOptions.columnsCustomization"
        class="columns-customization pull-right"
      >
        <jf-multi-dropdown
          title="Columns"
          filter-placeholder="Filter Columns"
          :items="gridOptions.availableColumns"
          on-change="gridOptions.updateCustomizedColumns()"
        />
      </div>
      <div
        v-show="!noPagination || !noCount || gridOptions.batchActions.length || filterField"
        class="wrapper-grid-actions"
      >
        <div class="counter-and-filter">
          <div
            v-if="!noCount"
            class="grid-counter"
          >
            {{ getTotalRecords() }}<span v-if="getSelectedRecords()"> ({{ getSelectedRecords() }} Selected)</span>
          </div>

          <div
            v-if="filterField"
            class="filter-group"
          >
            <jf-grid-filter
              :auto-focus="autoFocus"
              filter-grid="gridOptions"
              :filter-field=" filterField "
              :filter-field2=" filterField2 "
              :filter-on-change=" filterOnChange "
            />
          </div>
        </div>

        <jf-grid-pagination
          v-show="!noPagination"
          :grid-api="gridOptions.api"
          class="pull-right"
        />

        <jf-grid-batch-actions
          :grid-options="gridOptions"
          :grid-api="gridOptions.api"
          :actions="gridOptions.batchActions"
        />
      </div>
      <div
        v-ui-grid-draggable-rows="''"
        ui-grid="gridOptions"
        ui-grid-selection=""
        ui-grid-pagination=""
        ui-grid-grouping=""
        ui-grid-edit=""
        ui-grid-resize-columns=""
        :style="{visibility: gridOptions.columnDefs.length ? 'visible' : 'hidden'}"
        class="grid"
      />
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfGrid',
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
