<template>

    <div>
        <div class="jf-tabular-dnd" tabindex="0" :disabled="disabled">
            <div class="tabular-dnd-table-container available-table"
                 :class="{'no-data': !availableItems.length && (!availableItemsTableOptions || (!availableItemsTableOptions.draggedRow && !availableItemsTableOptions.draggedRows)) && !selectedItems.length && (!selectedItemsTableOptions || (!selectedItemsTableOptions.draggedRow && !selectedItemsTableOptions.draggedRows))}">
                <jf-table-view-wrapper :options="availableItemsTableOptions"
                                       :data="availableItems">
                </jf-table-view-wrapper>
            </div>

            <div class="dnd-actions-wrap">
                <ul class="dnd-actions">
                    <li>
                        <span @click="excludeAll()" class="dnd-exclude-all"
                              :disabled="isIncludeListEmpty() || areAllRowsDisabled(selectedItemsTableOptions.getFilteredData()) || disabled">«
                    </span>
                    </li>
                    <li>
                        <span @click="excludeSelected()" class="dnd-exclude-selected"
                              :disabled="!isIncludeListItemSelected() || disabled">‹
                    </span>
                    </li>
                    <li>
                        <span @click="includeSelected()" class="dnd-include-selected"
                              :disabled="!isExcludeListItemSelected() || disabled">›
                    </span>
                    </li>
                    <li>
                        <span @click="includeAll()" class="dnd-include-all"
                              :disabled="isExcludeListEmpty() || areAllRowsDisabled(availableItemsTableOptions.getFilteredData()) || disabled">»
                    </span>
                    </li>
                </ul>
            </div>

            <div class="tabular-dnd-table-container selected-table">
                <jf-table-view-wrapper :options="selectedItemsTableOptions"
                                       :data="selectedItems">
                </jf-table-view-wrapper>
            </div>
        </div>
    </div>

</template>

<script>

    import JfTableViewWrapper from '../JfTableViewWrapper/index';
    export default {
        name: 'jf-tabular-dnd',
        components: {JfTableViewWrapper},
        props: [
            'availableItems',
            'selectedItems',
            'itemClassAttr',
            'itemDraggableAttr',
            'columns',
            'numberOfRows',
            'availableItemsColumns',
            'selectedItemsColumns',
            'entityName',
            'appScope',
            'disableWholeRowSelection',
            'disabled'
        ],
        'jf@inject': [
            '$element',
            '$scope',
            'JFrogTableViewOptions'
        ],
        data() {
            return {
                availableItemsTableOptions: null,
                selectedItemsTableOptions: null,
                availableItemsColumnsVar: this.availableItemsColumns,
                selectedItemsColumnsVar: this.selectedItemsColumns,
                currNumberOfRows: this.numberOfRows || 8
            };
        },
        created() {
            if (this.columns) {
                this.availableItemsColumnsVar = _.cloneDeep(this.columns);
                this.selectedItemsColumnsVar = _.cloneDeep(this.columns);
            }

            this.createTables();
        },
        watch: {
            availableItems: val => {
                return this && this.watchListChanges && this.watchListChanges(val);
            },
            selectedItems: val => {
                return this && this.watchListChanges && this.watchListChanges(val);
            }
        },
        ng1_legacy: {'controllerAs': 'jfTabularDnD'},
        methods: {
            watchListChanges(val) {
                this._refreshBothTables();
                this._fireOnChange();
            },
            createAutoColumns() {
                ['availableItemsColumnsVar', 'selectedItemsColumnsVar'].forEach(columnsArrayName => {
                    let newColumnsArray = _.map(this[columnsArrayName], column => {
                        if (_.isObject(column)) {
                            return column;
                        } else if (_.isString(column)) {
                            return {field: column};
                        }
                    });
                    // Replacing the content of the array without changing the reference to it, to support setting Array literals on templates.
                    this[columnsArrayName].splice(0, this[columnsArrayName].length, ...newColumnsArray);
                });
            },
            createTables() {

                this.createAutoColumns();

                this.availableItemsTableOptions = new this.JFrogTableViewOptions(this.appScope || this.$scope);
                this.selectedItemsTableOptions = new this.JFrogTableViewOptions(this.appScope || this.$scope);

                let emptyPlaceholdersStyle = {
                    height: 50 * this.currNumberOfRows + 'px',
                    'line-height': 50 * this.currNumberOfRows + 'px'
                };

                this.availableItemsTableOptions._registerTabularDnd(this, 'available', this.selectedItemsTableOptions,
                    emptyPlaceholdersStyle);
                this.selectedItemsTableOptions._registerTabularDnd(this, 'selected', this.availableItemsTableOptions,
                    emptyPlaceholdersStyle);

                let {availableObjectName, selectedObjectName} = this._getObjectNames();
                this.availableItemsTableOptions
                    .setColumns(this.availableItemsColumnsVar)
                    .setSelection(this.availableItemsTableOptions.MULTI_SELECTION)
                    .setPaginationMode(this.availableItemsTableOptions.VIRTUAL_SCROLL)
                    .showPagination(false)
                    .setDraggable()
                    .setRowsPerPage(parseInt(this.currNumberOfRows))
                    .setObjectName(availableObjectName)
                    .setRowClassAttr(this.itemClassAttr)
                    .disableFilterWhen(() => this.disabled)
                    .setEmptyTableText(!this.availableItems.length && !this.selectedItems.length ? 'No data found' : 'Drag row here');

                this.selectedItemsTableOptions
                    .setColumns(this.selectedItemsColumnsVar)
                    .setSelection(this.selectedItemsTableOptions.MULTI_SELECTION)
                    .setPaginationMode(this.selectedItemsTableOptions.VIRTUAL_SCROLL)
                    .showPagination(false)
                    .setDraggable()
                    .setRowsPerPage(parseInt(this.currNumberOfRows))
                    .setObjectName(selectedObjectName)
                    .setRowClassAttr(this.itemClassAttr)
                    .disableFilterWhen(() => this.disabled)
                    .setEmptyTableText('Drag row here');

                this.$set(this.selectedItemsTableOptions, 'isRowSelectable',
                    this.$set(this.availableItemsTableOptions, 'isRowSelectable',
                        row => this._isItemDraggable(row.entity)));


                if (!this.disableWholeRowSelection) {
                    let toggleSelection = row => {
                        if (this.disabled || (this.itemDraggableAttr && row.entity[this.itemDraggableAttr] === false)) {
                            return;
                        }
                        this.$set(row.entity, '$selected', !row.entity.$selected);
                    };
                    this.availableItemsTableOptions.on('row.clicked', toggleSelection);
                    this.selectedItemsTableOptions.on('row.clicked', toggleSelection);
                }
                this.availableItemsTableOptions.on('row.clicked', row => this.$emit('on-row-click', {
                    row: row.entity,
                    list: 'available'
                }));
                this.selectedItemsTableOptions.on('row.clicked', row => this.$emit('on-row-click', {
                    row: row.entity,
                    list: 'selected'
                }));

                this.availableItemsTableOptions.on('selection.change', () => {
                    if (this.disabled) {
                        this.availableItemsTableOptions.clearSelection();
                    }
                });
                this.selectedItemsTableOptions.on('selection.change', () => {
                    if (this.disabled) {
                        this.selectedItemsTableOptions.clearSelection();
                    }
                });

                this.$scope.$watch('jfTabularDnD.disabled', () => {
                    if (this.disabled) {
                        this.selectedItemsTableOptions.clearSelection();
                        this.availableItemsTableOptions.clearSelection();
                    }
                });
            },
            _getObjectNames() {

                let availableObjectName, selectedObjectName;

                if (this.entityName) {
                    if (this.entityName.indexOf('/') !== -1) {
                        let [single, plural] = this.entityName.split('/');
                        availableObjectName = 'Available ' + single + '/' + 'Available ' + plural;
                        selectedObjectName = 'Included ' + single + '/' + 'Included ' + plural;
                    } else {
                        availableObjectName = 'Available ' + this.entityName;
                        selectedObjectName = 'Included ' + this.entityName;
                    }
                } else {
                    availableObjectName = 'Available Item';
                    selectedObjectName = 'Included Item';
                }

                return {
                    availableObjectName,
                    selectedObjectName
                };
            },
            areAllRowsDisabled(itemsList) {
                if (!this.itemDraggableAttr || !itemsList) {
                    return false;
                }
                let filtered = _.filter(itemsList, item => item.hasOwnProperty(`${ this.itemDraggableAttr }`) && item[this.itemDraggableAttr] === false);
                return filtered.length === itemsList.length;
            },
            isIncludeListEmpty() {
                if (!this.selectedItemsTableOptions || !this.selectedItemsTableOptions.dirCtrl) {
                    return true;
                }
                return !this.selectedItemsTableOptions.getFilteredData().length;
            },
            isExcludeListEmpty() {
                if (!this.availableItemsTableOptions || !this.availableItemsTableOptions.dirCtrl) {
                    return true;
                }
                return !this.availableItemsTableOptions.getFilteredData().length;
            },
            isIncludeListItemSelected() {
                if (!this.selectedItemsTableOptions || !this.selectedItemsTableOptions.dirCtrl) {
                    return false;
                }
                let selected = this.selectedItemsTableOptions.getSelected();
                let filtered = this.selectedItemsTableOptions.getFilteredData();
                return !!selected.length;
                selected = _.filter(selected, item => _.includes(filtered, item));
            },
            isExcludeListItemSelected() {
                if (!this.availableItemsTableOptions || !this.availableItemsTableOptions.dirCtrl) {
                    return false;
                }
                let selected = this.availableItemsTableOptions.getSelected();
                let filtered = this.availableItemsTableOptions.getFilteredData();
                selected = _.filter(selected, item => _.includes(filtered, item));
                return !!selected.length;
            },
            excludeAll() {
                if (this.isIncludeListEmpty() || this.disabled) {
                    return;
                }

                let selected = this.selectedItemsTableOptions.getSelected();
                selected.forEach(s => delete s.$selected);
                this.$set(this.selectedItemsTableOptions.dirCtrl, 'allSelected', false);
                let filtered = this.selectedItemsTableOptions.getFilteredData();
                filtered = this._getOnlyDraggables(filtered);
                this.availableItems.splice(this.availableItems.length, 0, ...filtered);
                _.remove(this.selectedItems, i => _.includes(filtered, i));
                this._refreshBothTables();
                this._fireOnChange();
            },
            includeAll() {
                if (this.isExcludeListEmpty() || this.disabled) {
                    return;
                }

                let selected = this.availableItemsTableOptions.getSelected();
                selected.forEach(s => delete s.$selected);
                this.$set(this.availableItemsTableOptions.dirCtrl, 'allSelected', false);
                let filtered = this.availableItemsTableOptions.getFilteredData();
                filtered = this._getOnlyDraggables(filtered);
                this.selectedItems.splice(this.selectedItems.length, 0, ...filtered);
                _.remove(this.availableItems, i => _.includes(filtered, i));
                this._refreshBothTables();
                this._fireOnChange();
            },
            excludeSelected() {
                if (!this.isIncludeListItemSelected() || this.disabled) {
                    return;
                }

                let selected = this.selectedItemsTableOptions.getSelected();
                selected.forEach(s => delete s.$selected);
                this.$set(this.selectedItemsTableOptions.dirCtrl, 'allSelected', false);
                let filtered = this.selectedItemsTableOptions.getFilteredData();
                _.remove(selected, i => !_.includes(filtered, i));
                selected = this._getOnlyDraggables(selected);
                this.availableItems.splice(this.availableItems.length, 0, ...selected);
                _.remove(this.selectedItems, item => _.includes(selected, item));
                this._refreshBothTables();
                this._fireOnChange();
            },
            includeSelected() {
                if (!this.isExcludeListItemSelected() || this.disabled) {
                    return;
                }

                let selected = this.availableItemsTableOptions.getSelected();
                selected.forEach(s => delete s.$selected);
                this.$set(this.availableItemsTableOptions.dirCtrl, 'allSelected', false);
                let filtered = this.availableItemsTableOptions.getFilteredData();
                _.remove(selected, i => !_.includes(filtered, i));
                selected = this._getOnlyDraggables(selected);
                this.selectedItems.splice(this.selectedItems.length, 0, ...selected);
                _.remove(this.availableItems, item => _.includes(selected, item));
                this._refreshBothTables();
                this._fireOnChange();
            },
            _getOnlyDraggables(array) {
                if (this.itemDraggableAttr) {
                    return _.filter(array, item => this._isItemDraggable(item));
                } else {
                    return array;
                }
            },
            _isItemDraggable(item) {
                if (this.itemDraggableAttr) {
                    return _.isUndefined(item[this.itemDraggableAttr]) || item[this.itemDraggableAttr];
                } else {
                    return true;
                }
            },
            _refreshBothTables() {
                [
                    this.availableItemsTableOptions,
                    this.selectedItemsTableOptions
                ].forEach(tableOptions => {
                    tableOptions.update();
                    tableOptions.refreshFilter();
                    tableOptions.dirCtrl.vsApi.refresh();
                });
            },
            onDragTransfer(draggedRows, originTableOptions) {
                draggedRows.forEach(draggedRow => delete draggedRow.$selected);
                originTableOptions.dirCtrl.allSelected = false;
                this._fireOnChange();
            },
            _fireOnChange() {
                this.$emit('on-change',{available: this.availableItems, selected: this.selectedItems});
            }
        }
    };

</script>

<style scoped lang="less">

    @import "../../assets/stylesheets/variables.less";

    /deep/ .jf-tabular-dnd {
        display: flex;
        flex-direction: row;
        width: 100%;
        outline: none;
        padding: 0;
        margin: 0;
        border: none;

        .tabular-dnd-table-container {
            width: 42%;
            display: flex;
            flex-direction: column;
            .jf-table-row {
                &:not(.headers) {
                    &.selected {
                        background-color: @grayBGLight;
                    }
                    &:hover,
                    &.selected {
                        cursor: grab;
                    }
                }
            }
            .jf-table-view .jf-table-top .counter-and-filter-wrapper .jf-table-filter input {
                width: 280px;
            }
            .jf-table-view {
                margin: 0;
                .jf-table-top {
                    margin-top: 0;
                }
                .jf-table-view-container {
                    .jf-table-top .counter-and-filter-wrapper .table-counter {
                        height: 22px;
                    }
                    .empty-table-placeholder{
                        &.filter-no-results{
                            flex-direction: column;
                        }
                    }
                    .empty-table-placeholder:not(.filter-no-results) {
                        margin-top: 2px;
                        padding: 0;
                        color: @grayBGDark;
                        background-color: white;
                        white-space: nowrap;
                        overflow: hidden;
                        font-size: 26px;
                        border: 2px dashed;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &.drop-target-mark {
                            background-color: @grayBGLight;
                            cursor: grabbing !important;
                        }
                    }
                }
            }
            &.no-data {
                .jf-table-view {
                    .jf-table-view-container {
                        .empty-table-placeholder:not(.filter-no-results) {
                            background-color: @grayBGLighter;
                        }
                    }
                }
            }
        }

        .dnd-actions-wrap {
            width: 16%;
            .dnd-actions {
                margin-top: 130px;
                padding: 0;
                text-align: center;

                li {
                    display: block;
                    padding: 1px;
                    text-align: center;

                    span {
                        display: inline-block;
                        font-size: 24px;
                        font-weight: 100;
                        background-color: @greenFontHeader;
                        color: white;
                        line-height: 19px;
                        width: 24px;
                        height: 24px;
                        cursor: pointer;
                        overflow: hidden;
                        padding-right: 1px;
                        border-radius: 50%;
                        &.dnd-exclude-selected {
                            padding-right: 2px;
                        }
                        &.dnd-include-selected {
                            padding-left: 2px;
                        }
                        &.dnd-exclude-all {
                            padding-left: 0px;
                        }
                        &.dnd-include-all {
                            padding-left: 2px;
                        }
                        &[disabled] {
                            background-color: @grayBGDarker;
                            cursor: default;
                        }
                    }
                }
            }
        }
        &[disabled="disabled"] {
            opacity: 0.45;
            .jf-table-view .jf-table-view-container .jf-table-row {
                &:not(.headers):last-child {
                    background: transparent;
                }
            }
            .dnd-actions-wrap .dnd-actions li span,
            .jf-table-view .jf-table-view-container .jf-table-row .jf-table-cell .jf-table-cell-content {
                &, .selection-icon, .selection-button {
                    cursor: default;
                }
            }
        }

        &:not([disabled="disabled"]) {
            .jf-table-view .jf-table-view-container .jf-table-row:not(.drag-mark):not(.headers) {
                &:last-child {
                    background: transparent;
                    opacity: 0.45 !important;
                    .jf-table-cell {
                        &, .selection-icon, .selection-button {
                            cursor: default;
                        }
                    }
                }
            }
        }

    }

    body.grabbing {
        cursor: grabbing !important;
    }


</style>
