<template>

    <div class="jf-table-row"
         v-if="data"
         @mousemove="rowId === 'headers' && tableView.options.resizableColumns && onMouseMove($event)"
         @mousedown="rowId === 'headers' && tableView.options.resizableColumns && onMouseDown($event)"
         @mouseup="rowId === 'headers' && tableView.options.resizableColumns && onMouseUp($event)"
         @mouseleave="rowId === 'headers' && tableView.options.resizableColumns && onMouseUp($event)"
         @click="onRowClick($event)"
         :class="{headers: rowId === 'headers', 'group-header': data && data.$groupHeader, 'expanded': data && data.$groupHeader && data.$groupHeader.$expanded, 'sub-row': data && data.$parentRow, sticky: data && data.$sticky, selected: data && data.$selected, 'drag-mark': rowId !== 'headers' && tableView.options.draggableRows && !(tableView.options.registeredTabularDnd && tableView.options.registeredTabularDnd.dndCtrl.disabled) && isRowDraggable(), [data[tableView.options.rowClassAttr]]: tableView.options.rowClassAttr && data[tableView.options.rowClassAttr]}"
         :style="{height: rowId === 'headers' ? '' : tableView.options.rowHeight, opacity: tableView.options.ready ? 1 : 0}">

        <div class="jf-table-cell selection" :class="{'single-selection' : tableView.options.selectionMode === tableView.options.SINGLE_SELECTION}" :style="{height: tableView.options.rowHeight, width: tableView.options.selectionColumnWidth + 'px'}" v-if="tableView.options.hasSelection()">
            <div class="jf-table-cell-content">
                <div class="selection-button" v-if="(!data.$groupHeader && rowId !== 'headers') || (tableView.options.selectionMode === tableView.options.MULTI_SELECTION && tableView.options.getRawData().length)" :style="{height: tableView.options.rowHeight, width: tableView.options.selectionColumnWidth +'px'}">
                    <div class="selection-icon icon icon-datagrid-v" :class="{selected: data.$selected || (rowId === 'headers' && tableView.allSelected)}" @click="toggleSelection(rowId === 'headers');$event.stopPropagation();">
                    </div>
                </div>
            </div>
        </div>


        <!-- GROUP HEADER -->
        <div class="jf-table-cell group-header"
             v-if="data.$groupHeader"
             :style="{height: rowId === 'headers' ? '' : tableView.options.rowHeight,
                      lineHeight: rowId === 'headers' ? '' : tableView.options.rowHeight}">


            <i class="icon icon-small-arrow-down"
               :class="{'expanded': data.$groupHeader.$expanded}"></i>
            <span class="jf-table-cell-content group-header" v-if="data.$groupHeader.col && !data.$groupHeader.col.cellTemplate">
                {{data.$groupHeader.value}}
            </span>

            <!--<i class="action-icon icon icon-small-arrow-down"
                 ng-class="{'expanded': data.$groupHeader.$expanded}"></i>
            <span class="jf-table-cell-content group-header"
                 ng-if="!data.$groupHeader.col.cellTemplate">
                {{data.$groupHeader.value}}
            </span>-->

            <div class="jf-table-cell-content group-header" v-if="data.$groupHeader.col && data.$groupHeader.col.cellTemplate">
                <jf-table-compiled-cell :field="data.$groupHeader.field" :row-id="rowId" :table-row="jfTableRow">
                </jf-table-compiled-cell>
            </div>
            <div class="group-header-count">({{data.$groupHeader.count}})</div>





        </div>

        <div class="jf-table-cell"
             v-if="!data.$groupHeader"
             :class="{header: rowId === 'headers' && col.header, sortable: rowId === 'headers' && tableView.options.sortable && tableView.options.getRawData().length && col.sortable && !hoveringResize, 'column-resizer': hoveringResize, ['drag-right']: col.$dragRightBorder, ['drag-left']: col.$dragLeftBorder, ['field-id-' + kebab(col.field)]: true, ['row-expander-cell']: $index === 0 && tableView.options.subRowsEnabled}"
             @click="onClickCell(col,$event)"
             :style="{height: rowId === 'headers' ? tableView.options.headerRowHeight : tableView.options.rowHeight, width: col.width}"
             v-for="(col, $index) in tableView.options.columns">
            <div class="row-expander"  :class="{placeholder: (!data.$subRows && !data.$parentRow) || (data.$subRows && data.$subRows.length === 0) || (data.$parentRow)}" v-if="$index === 0 && tableView.options.subRowsEnabled" :style="{height: tableView.options.rowHeight}" @click="toggleExpansion($event)">
                <i v-if="data.$subRows && data.$subRows.length && !data.$parentRow && !data.$pendingSubRows" class="action-icon icon icon-small-arrow-down" :class="{'expanded': data.$expanded}"></i>
                <div class="spinner-msg-local" v-if="data.$pendingSubRows">
                    <div class="icon-hourglass-local"></div>
                </div>
            </div>
            <div class="jf-table-cell-content"
                 v-jf-tooltip-on-overflow
                 :class="{'row-expander-content': $index === 0 && tableView.options.subRowsEnabled,
                            'sortable-aligned-center' : col.sortable && col.textAlign === 'center'}" :style="{'text-align': col.textAlign || 'auto'}" v-if="(!col.cellTemplate && rowId !== 'headers') || (!col.headerCellTemplate && rowId === 'headers')">
                {{getField(col.field)}}
                <i class="icon sorting-icon icon-small-arrow-down" :class="{'rotate180': !tableView.options.revSort || (tableView.options.sortByField !== col.field && tableView.options.showSortingArrowsAlways),
                              active: tableView.options.sortByField === col.field,
                              'invisible' : !(rowId === 'headers' && tableView.options.sortable && (tableView.options.sortByField === col.field || tableView.options.showSortingArrowsAlways) && col.sortable && tableView.options.getRawData().length && (col.header || col.headerCellTemplate))}"></i>



                <div class="group-button-wrapper" v-if="rowId === 'headers' && col.allowGrouping">
                    <div class="group-button icon-grouping-off" :class="{'icon-grouping-on': tableView.options.groupedBy === col.field}" @click="tableView.options.groupBy(col.field); $event.stopPropagation();"></div>
                </div>
            </div>
            <div class="jf-table-cell-content" :class="{'drag-mark': $index === 0 && rowId !== 'headers' && tableView.options.draggableRows}" :style="{'text-align': col.textAlign || 'auto'}" v-if="(col.cellTemplate && rowId !== 'headers') || (col.headerCellTemplate && rowId === 'headers')">
                <jf-table-compiled-cell :key="rowId" :field="col.field" :row-id="rowId" :table-row="jfTableRow">
                </jf-table-compiled-cell>
                <i v-if="rowId === 'headers' && tableView.options.sortable && (tableView.options.sortByField === col.field || tableView.options.showSortingArrowsAlways) && col.sortable && tableView.options.getRawData().length && (col.header || col.headerCellTemplate)" class="icon sorting-icon" :class="{'icon-down-arrow': tableView.options.revSort && tableView.options.sortByField === col.field, 'icon-up-arrow': !tableView.options.revSort || (tableView.options.sortByField !== col.field && tableView.options.showSortingArrowsAlways), active: tableView.options.sortByField === col.field}"></i>
                <div class="group-button-wrapper" v-if="rowId === 'headers' && col.allowGrouping">
                    <div class="group-button icon-grouping-off" :class="{'icon-grouping-on': tableView.options.groupedBy === col.field}" @click="tableView.options.groupBy(col.field); $event.stopPropagation();"></div>
                </div>
            </div>
        </div>

        <div class="jf-table-cell actions"
             :style="{height: rowId === 'headers' ? '' : tableView.options.rowHeight, width: _getRowActionsWidth()}"
             v-if="rowId !== 'headers' && tableView.options.actions.length && !data.$groupHeader">
            <div class="jf-table-cell-content">
                <div class="action-button"
                     :style="{height: tableView.options.rowHeight, width: tableView.options.actionButtonSize + 'px', visibility: !action.visibleWhen || action.visibleWhen(data) ? 'visible' : 'hidden'}"
                     v-if="tableView.options.actions.length <= 3 || tableView.options.isRowActionGroupingDisabled"
                     v-for="action in tableView.options.actions">
                    <row-action :action="action"
                                :data="data"
                                :on-action-click="fireAction">
                    </row-action>
                </div>
                <div class="action-button" :style="{height: tableView.options.rowHeight, width: tableView.options.actionButtonSize + 'px', visibility: tableView.options.hasVisibleActionsFor(data) ? 'visible' : 'hidden'}" v-if="tableView.options && !tableView.options.isRowActionGroupingDisabled && tableView.options.actions.length > 3 ">
                    <div class="action-icon icon-more" @click="toggleActionsDropdown($event)" v-jf-tooltip.bind="actionsTooltip"></div>
                </div>
            </div>
        </div>

        <div class="columns-customization-icon" @click="tableView.options.toggleColumnsCustomizationDropdown()" v-if="rowId === 'headers' && tableView.options.columnsCustomization">
            <i class="icon-menu-arrow"></i>
        </div>

        <div class="jf-table-row-actions-dropdown" v-if="actionsDropdownOpen">
            <div v-for="action in tableView.options.actions" v-if="!action.visibleWhen || action.visibleWhen(data)" @click="fireAction(action);$event.stopPropagation();actionsDropdownOpen=false;" class="action-item" :icon-name="action.icon || ''">
                <i class="action-icon" :class="action.icon"></i>
                <span v-if="!action.href">{{action.tooltip}}</span>
                <a v-if="action.href" :href="action.href(data)" :download="data.name">{{action.tooltip}}</a>
            </div>
        </div>

    </div>

</template>

<script>
    import RowAction from './components/RowAction';
    export default {
        components: {
            RowAction
        },
        name: 'jf-table-row',
        props: [
            'data',
            'rowId',
            'tableView'
        ],
        'jf@inject': [
            '$scope',
            '$element',
            '$timeout',
            'JFrogEventBus'
        ],
        data() {
            return {
                hoveringResize: null,
                actionsDropdownOpen: null
            };
        },
        computed: {
            actionsTooltip() {
                return this.actionsDropdownOpen ? '' : 'Actions';
            }
        },
        created() {
            this.EVENTS = this.JFrogEventBus.getEventsDefinition();
        },
        mounted() {
            $(this.$el).prop('comp', this);
            this.templatesCount = _.filter(this.tableView.options.columns, col => !!col.cellTemplate).length;

            this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, tableView => {
                if (tableView === this.tableView)
                    this.actionsDropdownOpen = false;
            });
            if (this.tableView.options.draggableRows)
                this.$timeout(() => this.initDragAndDrop());

            $(this.$element).prop('ctrl', this);

        },
        ng1_legacy: { 'controllerAs': 'jfTableRow' },
        methods: {
            getField(field) {
                return _.get(this.data, field);
            },
            kebab(str) {
                return _.kebabCase(str);
            },
            toggleSelection(all) {
                if (this.tableView.options.isRowSelectable && !this.tableView.options.isRowSelectable({ entity: this.data }))
                    return;

                if (!all) {
                    if (this.tableView.options.selectionMode === this.tableView.options.MULTI_SELECTION) {
                        this.$set(this.data, '$selected', !this.data.$selected);
                        if (!this.data.$selected) {
                            this.$set(this.tableView, 'allSelected', false);
                            if (this.tableView.options.groupedBy) {
                                let groupHeader = _.find(this.tableView.options.getPrePagedData(), { $groupHeader: { value: _.get(this.data, this.tableView.options.groupedBy) } });
                                if (groupHeader)
                                    groupHeader.$selected = false;
                            }
                        }
                        if (this.data.$groupHeader)
                            this.tableView.groupSelection(this.data);
                    } else if (this.tableView.options.selectionMode === this.tableView.options.SINGLE_SELECTION) {
                        this.tableView.clearSelection();
                        this.$set(this.data, '$selected', true);
                    }
                } else {
                    this.tableView.toggleSelectAll();
                }
                this.tableView.options.fire('selection.change', this.tableView.options.getSelectedRows());

            },
            toggleGroupExpansion() {
                this.$set(this.data.$groupHeader, '$expanded', !this.data.$groupHeader.$expanded);
                this.tableView.options.updateGroupExpansionState(this.data);
                this.$forceUpdate();
            },
            fireAction(action) {
                if (action.callback) action.callback(this.data);
                this.tableView.onUpdateFilter(false);
            },
            onMouseMove(e) {
                if (!this.resizingColumns) {
                    if (this.hoveringResize && this.hoveringResize.left)
                        delete this.hoveringResize.left.$dragRightBorder;
                    if (this.hoveringResize && this.hoveringResize.right)
                        delete this.hoveringResize.right.$dragLeftBorder;
                    this.hoveringResize = this._getHoveringResizePoint(e);
                } else {
                    this.dragColumnResize(e);
                }
            },
            dragColumnResize(e) {
                let MIN_WIDTH = 5;
                //percent
                let container = this._getTableContainer();
                let containerWidth = container.innerWidth();
                let mouseX = e.pageX - container.offset().left;
                let mouseXPerc = Math.round(mouseX / containerWidth * 100);
                let offset = mouseXPerc - this.resizeDragStart;

                let newLeftWidth, newRightWidth;
                if (_.isString(this.hoveringResize.origLeftWidth) && this.hoveringResize.origLeftWidth.endsWith('%')) {
                    newLeftWidth = parseFloat(this.hoveringResize.origLeftWidth) + offset + '%';
                } else if (_.isString(this.hoveringResize.origLeftWidth) && this.hoveringResize.origLeftWidth.endsWith('px')) {
                    let perc = parseFloat(this.hoveringResize.origLeftWidth) / containerWidth * 100;
                    newLeftWidth = perc + offset + '%';
                }
                if (this.hoveringResize.right) {
                    if (_.isString(this.hoveringResize.origRightWidth) && this.hoveringResize.origRightWidth.endsWith('%')) {
                        newRightWidth = parseFloat(this.hoveringResize.origRightWidth) - offset + '%';
                    } else if (_.isString(this.hoveringResize.origRightWidth) && this.hoveringResize.origRightWidth.endsWith('px')) {
                        let perc = parseFloat(this.hoveringResize.origRightWidth) / containerWidth * 100;
                        newRightWidth = perc - offset + '%';
                    }
                }

                if (parseFloat(newLeftWidth) > MIN_WIDTH && (!newRightWidth || parseFloat(newRightWidth) > MIN_WIDTH)) {
                    this.$set(this.hoveringResize.left, 'width', this.$set(this.hoveringResize.left, 'origWidth', newLeftWidth));
                    if (this.hoveringResize.right)
                        this.$set(this.hoveringResize.right, 'width', this.$set(this.hoveringResize.right, 'origWidth', newRightWidth));
                }
            },
            onMouseDown(e) {
                if (this.hoveringResize) {
                    let container = this._getTableContainer();
                    let containerWidth = container.innerWidth();
                    let mouseX = e.pageX - container.offset().left;
                    let mouseXPerc = Math.round(mouseX / containerWidth * 100);

                    this.resizingColumns = true;
                    this.resizeDragStart = mouseXPerc;

                    this.$set(this.hoveringResize.left, '$dragRightBorder', true);
                    if (this.hoveringResize.right)
                        this.$set(this.hoveringResize.right, '$dragLeftBorder', true);
                }
            },
            onMouseUp(e) {
                if (this.hoveringResize && this.hoveringResize.left)
                    delete this.hoveringResize.left.$dragRightBorder;
                if (this.hoveringResize && this.hoveringResize.right)
                    delete this.hoveringResize.right.$dragLeftBorder;
                this.resizingColumns = false;
                delete this.resizeDragStart;
            },
            _getHoveringResizePoint(e) {
                let columns = this.tableView.options.columns;

                let container = this._getTableContainer();
                let containerWidth = container.innerWidth();
                let mouseX = e.pageX - container.offset().left;
                let mouseXPerc = Math.round(mouseX / containerWidth * 100);

                let percCount = this.tableView.options.hasSelection() ? this.tableView.options.selectionColumnWidth / containerWidth * 100 : 0;

                let hovering = false;

                for (let colI = 0; colI < columns.length; colI++) {
                    let col = columns[colI];
                    if (_.isString(col.width) && col.width.endsWith('%')) {
                        percCount += parseFloat(col.width);
                    } else if (_.isString(col.width) && col.width.endsWith('px')) {
                        let perc = parseFloat(col.width) / containerWidth * 100;
                        percCount += perc;
                    }
                    if (Math.abs(percCount - mouseXPerc) <= 0.5) {
                        hovering = {
                            left: col,
                            right: columns[colI + 1],
                            origLeftWidth: col.width,
                            origRightWidth: columns[colI + 1] ? columns[colI + 1].width : undefined
                        };
                        break;
                    }
                }

                return hovering;
            },
            _getTableContainer() {
                return $(this.tableView.$element).find('.jf-table-view-container');
            },
            onClickCell(col, event) {
                //        event.stopPropagation();
                if (this.rowId === 'headers' && col.header && this.tableView.options.sortable && !this.hoveringResize && col.sortable) {
                    this.tableView.options.sortBy(col.field);
                    this.$forceUpdate();
                }
            },
            onRowClick($event) {
                if (this.data.$groupHeader) {
                    this.toggleGroupExpansion();
                } else {
                    if (this.rowId !== 'headers')
                        this.tableView.options.fire('row.clicked', {
                            entity: this.data,
                            event: $event
                        });
                }
            },
            toggleExpansion($event) {
                $event.stopPropagation();
                this.tableView.options.toggleExpansion(this.data);
            },
            toggleActionsDropdown(e) {
                e.stopPropagation();
                let origState = this.actionsDropdownOpen;
                this.JFrogEventBus.dispatch(this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, this.tableView);
                this.actionsDropdownOpen = !origState;
            },
            initDragAndDrop() {
                if (this.rowId === 'headers')
                    return;

                window.$(this.$element).draggable({
                    helper: 'clone',
                    scroll: true,
                    distance: 10,
                    appendTo: $(this.tableView.$element).find('.jf-table-view-container'),
                    start: (event, ui) => this.dragStart(event, ui),
                    stop: (event, ui) => this.dragStop(event, ui),
                    drag: (event, ui) => this.dragMove(event, ui)
                });
                $(this.$element).addClass('drag-enabled');
            },
            dragStart(event, ui) {
                if (this.tableView.options.registeredTabularDnd && this.tableView.options.registeredTabularDnd.dndCtrl.disabled) {
                    event.preventDefault();
                    return;
                }

                if (!this.isRowDraggable()) {

                    event.preventDefault();
                    return;
                }

                $('body').addClass('grabbing');
                this.tableView.options.dragRow(this.data);
                this.initDragHelper(ui.helper);
            },
            isRowDraggable() {
                if (this.tableView.options.registeredTabularDnd && this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr && !_.isUndefined(this.data[this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr]) && !this.data[this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr]) {

                    return false;
                } else
                    return true;
            },
            initDragHelper(helper) {
                helper.addClass('row-drag-helper');
                if (this.tableView.options.registeredTabularDnd) {
                    let numOfDraggedRows = this.tableView.options.draggedRows ? this.tableView.options.draggedRows.length : 1;
                    if (numOfDraggedRows > 1) {
                        helper.addClass('multiple').html(`<span>≡</span>` + numOfDraggedRows + ' ' + this.tableView.getObjectNameByCount(numOfDraggedRows, this.tableView.options.registeredTabularDnd.dndCtrl.entityName || 'Item'));
                    }
                }
            },
            dragStop(event, ui) {
                let draggedRowsArrayForDndEvent = this.tableView.options.draggedRow ? [this.tableView.options.draggedRow] : _.map(this.tableView.options.draggedRows, 'row');
                let target = $(event.originalEvent.target);
                target = target.is('.jf-table-row') ? target[0] : target.parents('.jf-table-row')[0];

                $('body').removeClass('grabbing');

                let handleForeignDrop = targetRow => {
                    this.tableView.options.registeredTabularDnd.dndOther.dropDraggedRow(targetRow, this.tableView.options.draggedRow || this.tableView.options.draggedRows, true);
                    this.tableView.options.markDropTarget(null);
                    this.tableView.options.registeredTabularDnd.dndCtrl.onDragTransfer(draggedRowsArrayForDndEvent, this.tableView.options);
                    delete this.tableView.options.draggedRow;
                    delete this.tableView.options.draggedRows;
                };
                if (target) {
                    if (this.isForeignDrop(target)) {
                        handleForeignDrop($(target).prop('ctrl').data);
                    } else {
                        this.tableView.options.dropDraggedRow($(target).prop('ctrl').data);
                    }
                } else {
                    if (this.tableView.options.registeredTabularDnd) {
                        if ($(event.originalEvent.target).is('.empty-table-placeholder') && $(event.originalEvent.target).parents('.jf-table-view')[0] !== $(this.tableView.$element).find('.jf-table-view')[0]) {

                            handleForeignDrop(null);

                        } else {
                            let container = $(event.originalEvent.target).is('.tabular-dnd-table-container') ? $(event.originalEvent.target) : $(event.originalEvent.target).parents('.tabular-dnd-table-container');
                            let myRole = this.tableView.options.registeredTabularDnd.dndRole;

                            if (container && (container.is('.available-table') && myRole === 'selected' || container.is('.selected-table') && myRole === 'available')) {
                                handleForeignDrop(null);
                            } else {
                                this.tableView.options.dropDraggedRow();
                            }

                        }
                    } else {
                        this.tableView.options.dropDraggedRow();
                    }
                }
            },
            handleScrollOnDrag(target, event) {
                if (this.tableView.options.paginationMode === this.tableView.options.VIRTUAL_SCROLL) {

                    let tableView;

                    if (this.tableView.options.registeredTabularDnd && target) {
                        let rowCtrl = $(target).prop('ctrl');
                        tableView = rowCtrl.tableView;
                    }
                    else if (!this.tableView.options.registeredTabularDnd) {
                        tableView = this.tableView;
                    }

                    if (!tableView) return;


                    let container = $(tableView.$element).find('.table-rows-container');
                    let containerY = container[0].getClientRects()[0].y;
                    let relativeY = event.clientY - containerY;
                    let containerHeight = container.height();

                    let vsApi = tableView.vsApi;

                    if (relativeY < 50) {
                        vsApi.scroll(-0.1 * (50 - relativeY));
                    } else if (relativeY > containerHeight - 50) {
                        vsApi.scroll(0.1 * (50 - (containerHeight - relativeY)));
                    }
                }

            },
            dragMove(event, ui) {

                let target = $(event.originalEvent.target);
                target = target.is('.jf-table-row') ? target[0] : target.parents('.jf-table-row')[0];

                this.handleScrollOnDrag(target, event);

                if (!target && $(event.originalEvent.target).is('.empty-table-placeholder'))
                    target = event.originalEvent.target;

                if (target) {
                    this.tableView.options.markDropTarget($(target));
                } else {
                    this.tableView.options.markDropTarget(null);
                }
            },
            isForeignDrop(dropTarget) {
                if (!this.tableView.options.registeredTabularDnd)
                    return false;
                else {
                    let targetTableView = $(dropTarget).prop('ctrl') ? $(dropTarget).prop('ctrl').tableView : null;
                    if (targetTableView && targetTableView.options === this.tableView.options.registeredTabularDnd.dndOther)
                        return true;
                    else
                        return false;
                }
            },
            _getRowActionsWidth() {
                return this.tableView.options.getActionsContainerWidthInPixels() + 'px';
            }
        }
    }

</script>

<style scoped lang="less">



</style>
