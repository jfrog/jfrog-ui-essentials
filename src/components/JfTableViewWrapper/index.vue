<template>

    <jf-table-view :options="tableOptions" ref="tableView">
        <slot name="external-filters" slot="external-filters"></slot>
    </jf-table-view>

</template>

<script>

    import JfTableView from '../JfTableViewComponent/index';
    export default {
        name: 'jf-table-view-wrapper',
        components: {JfTableView},
        props: [
            'options',
            'objectName',
            'tableId',
            'data',
            'columns',
            'actions',
            'batchActions',
            'scope',
            'rowsPerPage',
            'emptyTableText',
            'useVirtualScroll',
            'enableSubrows',
            'sortBy',
            'sortDir',
            'groupBy',
            'showFilter',
            'showPagination',
            'showCounter',
            'sortable',
            'disableFilterTooltip',
            'externalSearchFields',
            'newEntityCustomText',
            'disableNewEntity',
            'emptyTableCallToAction',
            'emptyTableAction',
            'externalSortCallback',
            'keyField',
            'hideSelectAll',
            'singleRowSelection',
            'rowClassAttr',
        ],
        'jf@inject': [
            'JFrogTableViewOptions',
            '$q',
            '$scope'
        ],
        data() {
            return {
                tableOptions: null,
                columnsSet: false
            };
        },
        watch: {
            data: {
                deep: true,
                handler: function(val) {
                    if (val && val !== this.tableOptions.data) this.setData();
                }
            },
            externalSearchFields(newVal) {
                this.tableOptions.externalSearchFields = newVal;
                if (this.tableOptions.paginationMode ===  this.tableOptions.INFINITE_SCROLL
                || this.tableOptions.paginationMode ===  this.tableOptions.INFINITE_VIRTUAL_SCROLL) {
                    this.tableOptions.sendInfiniteScrollRequest(true);
                }
                if (this.tableOptions.paginationMode ===  this.tableOptions.EXTERNAL_PAGINATION) {
                    this.tableOptions.sendExternalPageRequest();
                }
            }
        },
        created() {

            this.tableOptions = this.options || new this.JFrogTableViewOptions(this.scope || this.$scope);
            if (!_.isUndefined(this.enableSubrows)) {
                this.tableOptions.enableSubRows();
            }
            if (!_.isUndefined(this.hideSelectAll)) {
                this.tableOptions.hideSelectAll();
            }
            if (this.tableId) {
                this.tableOptions.setId(this.tableId);
            }
            if (this.objectName) {
                this.tableOptions.setObjectName(this.objectName);
            }
            if (this.rowsPerPage) {
                if (_.isString(this.rowsPerPage) && this.rowsPerPage !== 'auto') {
                    console.error('Error: rows-per-page should be a number, or the string \'auto\'.')
                }
                this.tableOptions.setRowsPerPage(this.rowsPerPage);
            }

            this.$watch(() => this.getActualColumns(), () => {
                if (this.columns/* && !this.columnsSet*/) {
                    this.tableOptions.setColumns(this.getActualColumns());
                    this.columnsSet = true;
                };
            }, {immediate: true})

            /*
                        if (this.columns) {
                            this.tableOptions.setColumns(this.getActualColumns());
                            this.columnsSet = true;
                        }
            */
            if (this.actions) {
                this.tableOptions.setActions(this.actions);
            }
            if (this.batchActions) {
                this.tableOptions.setBatchActions(this.batchActions);
            }
            if (this.emptyTableText) {
                this.tableOptions.setEmptyTableText(this.emptyTableText)
            }
            if (this.emptyTableCallToAction) {
                this.tableOptions.setEmptyTableCallToAction(this.emptyTableCallToAction)
            }
            if (this.emptyTableAction) {
                this.tableOptions.setEmptyTableAction(this.emptyTableAction)
            }
            if (this.groupBy) {
                this.tableOptions.groupBy(this.groupBy)
            }
            if (this.sortBy) {
                this.tableOptions.sortBy(this.sortBy)
            }
            if (this.sortDir && this.sortDir === 'desc') {
                this.tableOptions.reverseSortingDir();
            }
            if (this.keyField) {
                this.tableOptions.setKey(this.keyField);
            }
            if (this.singleRowSelection) {
                this.tableOptions.setSelection(this.tableOptions.SINGLE_SELECTION);
            }
            if (!_.isUndefined(this.showFilter)) {
                this.tableOptions.showFilter(this.showFilter)
            }
            if (!_.isUndefined(this.showPagination)) {
                this.tableOptions.showPagination(this.showPagination)
            }
            if (!_.isUndefined(this.showCounter)) {
                this.tableOptions.showCounter(this.showCounter)
            }
            if (!_.isUndefined(this.sortable)) {
                this.tableOptions.setSortable(this.sortable)
            }
            if (!_.isUndefined(this.useVirtualScroll) && !this.$listeners['load-more']) {
                this.tableOptions.setPaginationMode(this.tableOptions.VIRTUAL_SCROLL)
            }
            if (!_.isUndefined(this.disableFilterTooltip)) {
                this.tableOptions.disableFilterTooltip()
            }
            if (!_.isUndefined(this.externalSearchFields)) {
                this.tableOptions.externalSearchFields = this.externalSearchFields;
            }
            if (!_.isUndefined(this.newEntityCustomText)) {
                this.tableOptions.newEntityCustomText = this.newEntityCustomText;
            }
            if (!_.isUndefined(this.rowClassAttr)) {
                this.tableOptions.setRowClassAttr(this.rowClassAttr);
            }
            if (!this.options) {
                this.$emit('init', {
                    tableOptions: this.tableOptions,
                    cellTemplateGenerators: this.JFrogTableViewOptions.cellTemplateGenerators
                })
            }
            if ((_.isUndefined(this.disableNewEntity) || !this.disableNewEntity)
                && this.$listeners['new-entity']) {
                this.tableOptions.setNewEntityAction(() => {
                    this.$emit('new-entity');
                })
            }
            if (this.$listeners['row-clicked']) {
                this.tableOptions.on('row.clicked', (eventData) => {
                    this.$emit('row-clicked', {eventData});
                })
            }
            if (this.$listeners['selection-change']) {
                this.tableOptions.on('selection.change', (eventData) => {
                    this.$emit('selection-change', {eventData});
                })
            }
            if (this.$listeners['external-sort']) {
                this.tableOptions.useExternalSortCallback((field, dir) => {
                    this.$emit('external-sort', {field, dir});
                })
            }
            if (this.$listeners['load-more']) {
                this.tableOptions.setPaginationMode(!_.isUndefined(this.useVirtualScroll) ? this.tableOptions.INFINITE_VIRTUAL_SCROLL : this.tableOptions.INFINITE_SCROLL, (params) => {
                    let defer = this.$q.defer();
                    this.$emit('load-more', params);
                    this.pageResolver = defer.resolve;
                    return defer.promise;
                })
                if (this.sortable) this.tableOptions.setSortable(true);
            }

            window.store.subscribeAction(({type, payload}) => {
                if (type === 'CHANGE_TABLE_PAGINATION') {
                    const {tableId, toPage = 1} = payload;
                    if (this.$refs.tableView && tableId === this.$refs.tableView.options.tableId) {
                        if (!this.$refs.tableView.$refs.top.$refs.pagination) {
                            this.$refs.tableView.currentPage = 0;
                        } else {
                            this.$refs.tableView.$refs.top.$refs.pagination.paginationApi.setPage(toPage);
                        }
                    }
                }
            })
        },
        mounted() {
            if (this.data) this.setData(true);
            if (this.$listeners['page-needed']) {
                this.tableOptions.setPaginationMode(this.tableOptions.EXTERNAL_PAGINATION, pagingData => {
                    let defer = this.$q.defer();
                    this.$emit('page-needed', pagingData);
                    this.pageResolver = defer.resolve;
                    return defer.promise;
                });
            }
        },
        methods: {
            setData(initialSet) {
                if (!this.$listeners['page-needed'] && !this.$listeners['load-more'] && this.tableOptions.paginationMode !== this.tableOptions.EXTERNAL_PAGINATION) {
                    if (this.data && !_.isUndefined(this.data.isUpdate) && this.data.data) {
                        if (this.data.isUpdate) {
                            this.tableOptions.updateData(this.data.data, this.data.removeIfMissing);
                        } else {
                            this.tableOptions.setData(this.data.data);
                        }
                    } else {
                        this.tableOptions.setData(this.data);
                        this.tableOptions.refreshFilter();
                    }
                }
                else if (!initialSet && this.$listeners['load-more'] && !this.pageResolver) {
                    this.tableOptions.setData(this.data.data, '$$internal$$');
                }
                else if (this.pageResolver) {
                    this.pageResolver(this.data);
                    this.pageResolver = null;
                }
            },
            getActualColumns() {
                if (_.isFunction(this.columns)) {
                    if (this.JFrogTableViewOptions) {
                        return this.columns({cellTemplateGenerators: this.JFrogTableViewOptions.cellTemplateGenerators});
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return this.columns;
                }
            }

        }
    }
</script>

<style scoped lang="less">

</style>
