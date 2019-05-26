import cellTemplateGenerators from '@/ui_components/jf_table_view/cell_template_generators';
import { JfDataListModal } from "@/components/JfDataListModal/index.js";
const COMMON_ACTIONS = {
	delete: {
		icon: 'icon icon-clear',
		tooltip: 'Delete'
	},
	download: {
		icon: 'icon icon-download',
		href: row => {
			return row.downloadLink;
		},
		tooltip: 'Download'
	}
};
let defaultAppOptions;
export function JFrogTableViewOptions() {
    let injections = $jfrog.get(['$timeout', '$rootScope', '$modal', '$state', 'JFrogDownload', 'JFrogModal', 'JFrogUIUtils']);
    createContextMenu();
    class JFrogTableViewOptionsClass {
        constructor(appScope) {
            _.extend(this, injections);
            this.data = [];
            this.actions = [];
            this.columns = [];
            this.listeners = {};
            this.supportedEvents = [
                'pagination.change',
                'selection.change',
                'row.clicked',
                'row.dragged',
                'row.in.view'
            ];
            this.appScope = appScope;

            // selection types
            this.NO_SELECTION = 0;
            this.SINGLE_SELECTION = 1;
            this.MULTI_SELECTION = 2;

            // pagination mode
            this.PAGINATION = 0;
            this.VIRTUAL_SCROLL = 1;
            this.EXTERNAL_PAGINATION = 2;
            this.INFINITE_SCROLL = 3;
            this.INFINITE_VIRTUAL_SCROLL = 4;

            this._setDefaults();
        }

        _setDefaults() {

            if (defaultAppOptions) {
                this.objectName = defaultAppOptions.objectName;
                this.emptyTableText = defaultAppOptions.emptyTableText;
                this.rowHeight = defaultAppOptions.rowHeight;
                this.headerRowHeight = defaultAppOptions.headerRowHeight;
                this.rowsPerPage = defaultAppOptions.rowsPerPage;
                this.sortable = defaultAppOptions.sortable;
                this.selectionMode = defaultAppOptions.selectionMode;
                this.paginationMode = defaultAppOptions.paginationMode;
                this.actionButtonSize = defaultAppOptions.actionButtonSize;
                this.selectionColumnWidth = defaultAppOptions.selectionColumnWidth;
                this.resizableColumns = defaultAppOptions.resizableColumns;
                this.defaultFilterByAll = defaultAppOptions.defaultFilterByAll;
                this.columnsCustomization = defaultAppOptions.columnsCustomization;
                this.headersVisible = defaultAppOptions.headersVisible;
                this.filterVisible = defaultAppOptions.filterVisible;
                this.paginationVisible = defaultAppOptions.paginationVisible;
                this.autoFocusFilter = defaultAppOptions.autoFocusFilter;
                this.noCount = defaultAppOptions.noCount;
                this.tooltipFilterDisabled = defaultAppOptions.tooltipFilterDisabled;
                this.subRowsEnabled = defaultAppOptions.subRowsEnabled;
                this.draggableRows = defaultAppOptions.draggableRows;
                this.rowInViewDebounceTime = defaultAppOptions.rowInViewDebounceTime;
            } else {
                this.objectName = 'Item';
                this.rowHeight = '50px';
                this.headerRowHeight = '50px';
                this.rowsPerPage = 25;
                this.sortable = true;
                this.selectionMode = this.NO_SELECTION;
                this.paginationMode = this.PAGINATION;
                this.actionButtonSize = 50;
                //px
                this.selectionColumnWidth = 50;
                //px
                this.resizableColumns = true;
                this.defaultFilterByAll = true;
                this.columnsCustomization = false;
                this.headersVisible = true;
                this.filterVisible = true;
                this.paginationVisible = true;
                this.autoFocusFilter = false;
                this.noCount = false;
                this.draggableRows = false;
                this.rowInViewDebounceTime = 500;
                this.externalSearchFields = null;
            }
        }

        on(event, listener) {
            if (!_.includes(this.supportedEvents, event)) {
                console.error('jf-table-view: Unsupported Event: ' + event);
                return;
            }
            if (!this.listeners[event])
                this.listeners[event] = [];
            this.listeners[event].push(listener);
        }

        off(event, listener) {
            if (!_.includes(this.supportedEvents, event)) {
                console.error('jf-table-view: Unsupported Event: ' + event);
                return;
            }
            if (this.listeners[event]) {
                if (listener) {
                    _.remove(this.listeners[event], l => l === listener);
                } else {
                    this.listeners[event] = [];
                }
            }
        }

        hasListenersFor(event) {
            return !!this.listeners[event];
        }

        fire(event, ...params) {
            if (this.listeners[event]) {
                this.listeners[event].forEach(listener => listener(...params));
            }

            // This is for backward compatibility with old grid
            if (event === 'selection.change') {
                if (this.onSelectionChange)
                    this.onSelectionChange();
                if (this.onSelectionChangeBatch)
                    this.onSelectionChangeBatch();
            }
        }

        setData(data, internalCall) {

            let rnd = Math.floor(10000*Math.random());
            while (rnd === this.rnd) {
                rnd = Math.floor(10000*Math.random());
            }
            this.rnd = rnd;

            let idPrefix = this.rnd + (this.registeredTabularDnd ? this.registeredTabularDnd.dndRole : '');
            if (this.paginationMode === this.VIRTUAL_SCROLL) {
                data.forEach((item, i) => {
                    item.$$$id = idPrefix + i +'';
                })
            }


            if (this.paginationMode === this.EXTERNAL_PAGINATION && internalCall !== '$$internal$$') {
                console.error('When using external pagination, you should not call setData directly !');
            }
            else if (this.paginationMode === this.INFINITE_SCROLL && internalCall !== '$$internal$$') {
                console.error('When using infinite scroll, you should not call setData directly !');
            }
            else {
                this.origData = _.sortBy(data, '');
                if (this.subRowsEnabled) {
                    this.data = this._transformDataForSubRowsSupport(data, true);
                } else {
                    this.data = data;
                }
                if (!this.data)
                    this.data = [];
                this.update();
            }

            this.dataWasSet = true;

            if (this.paginationMode === this.VIRTUAL_SCROLL && this.dirCtrl) {
                this.dirCtrl.vsApi.reset();
            }
            if (this.dirCtrl) {
                this.dirCtrl._fireDebouncedRowsInView();
            }

            if (this.registeredTabularDnd && this.registeredTabularDnd.dndCtrl) {
                Vue.nextTick(() => this.registeredTabularDnd.dndCtrl.$forceUpdate());
            }

            return this;
        }

        _transformDataForSubRowsSupport(data, autoExpand) {
            let rowsToExpand = [];
            data.forEach(row => {
                if (row.$subRows) {
                    row.$expandable = true;
                    if (_.isArray(row.$subRows)) {
                        row.$subRows.forEach(sub => {
                            sub.$parentRow = row;
                        });
                        if (row.$expanded) {
                            rowsToExpand.push(row);
                        }
                    }
                    else if (_.isFunction(row.$subRows)) {
                        let origFunc = row.$subRows;
                        row.$subRows = () => {
                            let promise = origFunc();
                            row.$pendingSubRows = true;
                            promise.then(subRows => {
                                subRows.forEach(sub => {
                                    sub.$parentRow = row;
                                });
                                row.$subRows = subRows;
                                delete row.$pendingSubRows;
                            });
                            return promise;
                        };
                        if (row.$expanded) {
                            row.$subRows().then(() => this._addSubRows(row, data));
                        }
                    }
                }
            });

            if (autoExpand)
                rowsToExpand.forEach(row => this._addSubRows(row, data));

            return data;
        }

        toggleExpansion(row) {
            if (_.isFunction(row.$subRows)) {
                row.$subRows().then(() => this.toggleExpansion(row));
            } else {
                if (row.$expandable) {
                    Vue.set(row, '$expanded', !row.$expanded);
                    if (row.$expanded) {
                        this._addSubRows(row);
                    } else {
                        this._removeSubRows(row);
                    }
                } else if (row.$parentRow) {
                    this.toggleExpansion(row.$parentRow);
                }
            }
        }

        _addSubRows(row, addTo = null) {
            addTo = addTo || this.data;
            let index = _.indexOf(addTo, row) + 1;
            let newSubRows = _.filter(row.$subRows, subRow => {
                return addTo.indexOf(subRow) === -1;
            });
            newSubRows.forEach((sr, i) => {
                sr.$$$id = row.$$$id + '.' + i;
            })
            addTo.splice(index, 0, ...newSubRows)
            if (addTo === this.data) {
                this.refreshFilter();
                this.update();
            }
        }

        _removeSubRows(row) {
            if (row.$subRows) {
                row.$subRows.forEach(subRow => {
                    let index = this.data.indexOf(subRow);
                    if (index >= 0) {
                        this.data.splice(index, 1);
                    }
                });
            }
            this.refreshFilter();
            this.update();
        }

        showCounter(show = true) {
            this.noCount = !show;
            return this;
        }

        showFilter(show = true) {
            this.filterVisible = show;
            return this;
        }

        showPagination(show = true) {
            this.paginationVisible = show;
            return this;
        }

        setRowsPerPage(rpp) {
            this.rowsPerPage = rpp;
            return this;
        }

        enableColumnsResize(enabled = true) {
            this.resizableColumns = enabled;
            return this;
        }

        enableSubRows() {
            this.subRowsEnabled = true;
            return this;
        }

        update(noSort = false, noGrouping = false) {
            //            console.log('update',noSort,noGrouping)
            if (this.dirCtrl) {
                if (!noGrouping) {
                    this.refreshGrouping();
                }
                this.origData = _.sortBy(this.data, '');
                if (!noSort) {
                    this.sortBy(this.sortByField, true);
                } else {
                    if (this.dirCtrl) this.dirCtrl.refresh();
                }
                this._normalizeWidths();

                //This is for updating header cell templates
                let temp = _.cloneDeep(this.headersRow);
                this.headersRow = temp;

                this.refreshFilter(true);
            }
        }

        setObjectName(objectName, useAn = false) {
            this.objectName = objectName;
            this.useAnWithObjectName = useAn;
            return this;
        }

        setRowClassAttr(rowClassAttr) {
            this.rowClassAttr = rowClassAttr;
            return this;
        }

        setRowInViewDebounceTime(debounceTime) {
            this.rowInViewDebounceTime = debounceTime;
            return this;
        }

        setNewEntityAction(newEntityCallback) {
            this.newEntityCallback = newEntityCallback;
            return this;
        }

        filterColumns(columns) {
            return _.filter(columns, col => {
                return (!col.isVisible || col.isVisible()) && (!this.visibleFields || this.visibleFields.indexOf(col.field) !== -1);
            });
        }

        setNoFilterResultsMessage(message) {
            this.noFilterResultsText = message;
        }

        setColumns(columns) {

            this.defaultFilterByAll = !_.filter(columns, c => c.filterable === true).length;

            if (!this.origColumnDefs) {
                this.origColumnDefs = _.cloneDeep(columns);
            }
            if (this.columnsCustomization && !this.availableColumns) {
                this.loadCustomizedColumnsState();
                this.createAvailableColumnsArray();
                this.updateCustomizedColumns(false);
            }
            columns = this.filterColumns(columns);

            this.columns = columns;
            let actions = [];
            this.columns.forEach(col => {
                if (col.actions) {
                    col.customActions = col.customActions || [];
                    _.forEach(col.actions, (callback, key) => {
                        let action;
                        if (callback.visibleWhen) {
                            action = this._getCommonAction(key, callback.callback, callback.visibleWhen);
                        } else {
                            action = this._getCommonAction(key, callback.callback || callback);
                        }
                        col.customActions.push(action);
                    });
                }
                if (col.customActions && col.customActions.length) {
                    actions = actions.concat(col.customActions);
                }
                if (col.sortable === undefined)
                    col.sortable = true;
            });
            if (actions.length) {
                if (!this.actionsAggregated) {
                    this.actionsAggregated = true;
                    this.origActions = this.actions;
                }
                this.setActions(this.origActions.length ? this.origActions.concat(actions) : actions);
            }
            this._sortableFields = _.map(_.filter(this.columns, c => !_.isUndefined(c.header)), 'field');
            if (this.sortable && !this.sortByField) {
                this.sortByField = this._sortableFields ? this._sortableFields[0] : undefined;
            }
            this._normalizeWidths();

            this._checkGroupingSupport();

            this.showHeaders(this.headersVisible);

            return this;
        }

        _checkGroupingSupport() {
            let groupables = _.filter(this.columns, c => !!c.allowGrouping);
            if (this.subRowsEnabled && groupables.length) {
                console.error('jf-table-view: Grouping is not supported with sub rows !');
                groupables.forEach(c => c.allowGrouping = false);
            } else if (this.paginationMode === this.INFINITE_SCROLL && groupables.length) {
                console.error('jf-table-view: Grouping is not supported with infinite scroll !');
                groupables.forEach(c => c.allowGrouping = false);
            }
        }

        setRowHeight(height, headerHeight) {
            this.rowHeight = height;
            this.headerRowHeight = headerHeight || height;
            return this;
        }

        showHeaders(show = true) {
            this.headersVisible = show;
            this.headersRow = {};
            this.columns.forEach(column => {
                if (column.header) {
                    _.set(this.headersRow, column.field, column.header);
                }
            });
            return this;
        }

        setSelection(selectionMode) {
            this.selectionMode = selectionMode;
            this._normalizeWidths();
            return this;
        }

        setPaginationMode(pagiMode, paginationCallback) {
            this.paginationMode = pagiMode;
            if (this.paginationMode === this.EXTERNAL_PAGINATION) {
                if (!paginationCallback || typeof paginationCallback !== 'function') {
                    console.error('Setting pagination mode to EXTERNAL_PAGINATION require pagination callback function as the second parameter of setPaginationMode');
                    this.paginationMode = this.PAGINATION;
                } else {
                    this.externalPaginationCallback = paginationCallback;
                    this.pendingExternalPaging = true;
                    if (this.dirCtrl && !this.initialExternalPaginationSent) {
                        this.$timeout(() => this.sendExternalPageRequest());
                    }
                }
            } else if (this.paginationMode === this.INFINITE_SCROLL || this.paginationMode === this.INFINITE_VIRTUAL_SCROLL) {
                if (!paginationCallback || typeof paginationCallback !== 'function') {
                    console.error('Setting pagination mode to INFINITE_SCROLL require pagination callback function as the second parameter of setPaginationMode');
                    this.paginationMode = this.PAGINATION;
                } else {
                    this.infiniteScrollCallback = paginationCallback;
                    this.showPagination(false);
                    this.showCounter(false);
                    this.showFilter(false);
                    this.setSortable(false);
                    this.infiniteScrollOffset = 0;
                    if (this.dirCtrl && !this.initialInfiniteScrollRequestSent) {
                        if (!this.infiniteScrollChunkSize && this.rowsPerPage)
                            this.infiniteScrollChunkSize = this.rowsPerPage;
                        this.$timeout(() => this.sendInfiniteScrollRequest());
                    }
                }
            }

            this._checkGroupingSupport();

            return this;
        }

        hasSelection() {
            return _.includes([
                this.SINGLE_SELECTION,
                this.MULTI_SELECTION
            ], this.selectionMode);
        }

        getSelected() {
            return _.filter(this.data, { $selected: true });
        }

        getSelectedCount() {
            return this.getSelected().length;
        }

        sortBy(field, resort = false) {

            let sendExternal = false;

            if (!resort && this.sortByField === field) {
                this.revSort = !this.revSort;
                sendExternal = true;
            } else if (!resort) {
                this.revSort = false;
            }

            if (this.sortByField !== field) {
                sendExternal = true;
            }

            this.sortByField = field;

            if (this.externalSortCallback && sendExternal) {
                this.externalSortCallback(field, this.revSort ? 'desc' : 'asc');
                return;
            }

            if (this.paginationMode === this.EXTERNAL_PAGINATION && sendExternal) {
                this.sendExternalPageRequest();
            }

            this.refreshSorting();

            return this;
        }

        reverseSortingDir() {
            this.sortBy(this.sortByField);
            return this;
        }

        setSortable(sortable = true) {
            if (sortable && this.draggableRows && !this.registeredTabularDnd)
                return;
            this.sortable = sortable;
            if (sortable && !this.sortByField) {
                this.sortBy(this._sortableFields ? this._sortableFields[0] : undefined);
            } else if (!sortable) {
                this.sortBy(undefined);
            }
            return this;
        }

        setDraggable(callback) {
            this.draggableRows = true;
            this.setSortable(false);
            if (callback)
                this.on('row.dragged', callback);
            return this;
        }

        setActions(actions) {
            this.actions = actions;
            this._normalizeWidths();
            return this;
        }

        setAutoFocusFilter(autoFocus = true) {
            this.autoFocusFilter = autoFocus;
            return this;
        }

        setBatchActions(batchActions) {
            this.batchActions = batchActions;
            this.setSelection(this.MULTI_SELECTION);
            return this;
        }

        _setDirectiveController(ctrl) {
            this.dirCtrl = ctrl;
            this.update();
            if (this.paginationMode === this.EXTERNAL_PAGINATION) {
                this.$timeout(() => this.sendExternalPageRequest());
                this.initialExternalPaginationSent = true;
            } else if (this.paginationMode === this.INFINITE_SCROLL || this.paginationMode === this.INFINITE_VIRTUAL_SCROLL) {
                this.$timeout(() => {
                    this._initInfiniteScroll();
                    if (!this.infiniteScrollChunkSize && this.rowsPerPage)
                        this.infiniteScrollChunkSize = this.rowsPerPage;
                    this.sendInfiniteScrollRequest();
                    this.initialInfiniteScrollRequestSent = true;
                });
            }

            this.dirCtrl._fireDebouncedRowsInView();

        }

        _initInfiniteScroll() {
            const EDGE = 50;
            if (this.paginationMode === this.INFINITE_SCROLL) {
                let scrollParent = window.$(this.dirCtrl.$element).scrollParent();

                scrollParent.on('scroll', e => {
                    if (!this.infiniteScrollHasMore || this.pendingInfiniteScroll) return;
                    let bottomReached = false;
                    if (scrollParent[0] === document) {
                        if (window.$(window).scrollTop() + window.$(window).height() >= window.$(document).height() - EDGE) {
                            bottomReached = true;
                        }
                    } else {
                        if (scrollParent[0].scrollHeight - scrollParent.scrollTop() <= scrollParent[0].clientHeight + EDGE) {
                            bottomReached = true;
                        }
                    }
                    if (bottomReached) {
                        e.preventDefault();
                        this.infiniteScrollOffset += this.infiniteScrollChunkSize;
                        this.rowsPerPage += this.infiniteScrollChunkSize;
                        this.sendInfiniteScrollRequest();
                    }
                });
            }
            else if (this.paginationMode === this.INFINITE_VIRTUAL_SCROLL) {
                this.dirCtrl.vsApi.registerBottomReachedListener(() => {
                    if (!this.infiniteScrollHasMore || this.pendingInfiniteScroll) return;
                    this.infiniteScrollOffset = this.getRawData().length;
                    this.sendInfiniteScrollRequest()
                })
            }
        }

        getActionsContainerWidthInPixels() {
            return this.actionButtonSize * (this.actions.length <= 3 || this.isRowActionGroupingDisabled ? this.actions.length : 1);
        }

        _normalizeWidths(delay = true, recurse = false) {
            if (!this.dirCtrl) {
                return;
            }

            let actionsWidth = 0;
            let selectionWidth = 0;
            if (this.actions) {
                actionsWidth = this.getActionsContainerWidthInPixels();
            }
            if (this.hasSelection()) {
                selectionWidth = this.selectionColumnWidth;
            }

            let totalAbs = actionsWidth + selectionWidth;
            let totalPerc = 0;
            let percsOfUnderThresholdColumns = 0;
            this.columns.forEach(col => {
                if (col.origWidth === undefined) {
                    col.origWidth = col.width;
                }
                let width = col.origWidth;
                if (width && width.trim().endsWith('%')) {
                    if (col.underWidthThresholde) {
                        percsOfUnderThresholdColumns += parseFloat(width);
                    } else {
                        totalPerc += parseFloat(width);
                    }
                } else if (width && width.trim().endsWith('px')) {
                    totalAbs += parseFloat(width);
                } else if (width === undefined) {
                    col.origWidth = col.width = 100 / this.columns.length + '%';
                    totalPerc += parseFloat(col.width);
                }
            });

            let setNormalWidths = () => {
                let containerWidth;
                if (this.data.length) {
                    containerWidth = $(this.dirCtrl.$element).find('.jf-table-row').innerWidth();
                } else {
                    containerWidth = $(this.dirCtrl.$element).find('.jf-table-view-container').width();
                }

                let percSpace = containerWidth - totalAbs;
                //                let absPerc = (totalAbs/containerWidth)*100;
                let normalizer = 100 / totalPerc;
                let totalFinalPerc = (actionsWidth + selectionWidth) / containerWidth * 100;
                let shouldReCalc = false;
                this.columns.forEach(col => {
                    let width = col.origWidth;
                    if (width && width.trim().endsWith('%')) {
                        let origVal = parseFloat(width);
                        let newVal = normalizer * origVal * percSpace / 100;
                        let normalizerIgnoringThreshold = 100 / (totalPerc + (col.underWidthThresholde ? origVal : 0));
                        let newValIgnoringThreshold = normalizerIgnoringThreshold * origVal * percSpace / 100;
                        if (!col.underWidthThresholde && col.pixelWidthThreshold && newVal < col.pixelWidthThreshold) {
                            shouldReCalc = true;
                            col.underWidthThresholde = true;
                        } else if (col.underWidthThresholde && newValIgnoringThreshold >= col.pixelWidthThreshold) {
                            shouldReCalc = true;
                            delete col.underWidthThresholde;
                        } else if (!col.underWidthThresholde) {
                            let newPerc = newVal / containerWidth * 100;
                            col.width = newPerc + '%';
                            totalFinalPerc += newPerc;
                        } else if (col.underWidthThresholde && col.pixelWidthThreshold && newValIgnoringThreshold < col.pixelWidthThreshold) {
                            col.width = 0;
                        }
                    } else if (width) {
                        totalFinalPerc += 100 * parseFloat(width) / containerWidth;
                    }
                });
                //                console.log(totalFinalPerc);
                if (shouldReCalc && !recurse) {
                    this._normalizeWidths(false, true);
                } else {
                    Vue.set(this, 'ready', true);
                }

            };

            if (delay)
                this.$timeout(() => setNormalWidths());
            else
                setNormalWidths();
        }

        getDisplayNameForField(field) {
            let col = _.find(this.columns, { field });
            if (col) {
                return col.header;
            }
        }

        setEmptyTableText(text) {
            this.emptyTableText = text;
            return this;
        }

        setEmptyTableAction(cb) {
            this.emptyTableAction = cb;
            return this;
        }

        setEmptyTableCallToAction(text) {
            this.emptyTableCallActionText = text;
            return this;
        }

        disableFilterTooltip() {
            this.tooltipFilterDisabled = true;
            return this;
        }

        getSelectedRows() {
            return _.filter(this.data, { $selected: true });
        }

        clearSelection() {
            if (this.dirCtrl)
                this.dirCtrl.clearSelection();
        }

        groupBy(field) {
            this.groupedBy = this.groupedBy === field ? null : field;
            if (this.groupedBy) {
                this.setFirstColumn(field);
            } else {
                this.restoreColumnOrder();
            }
            this.openedGroupHeaders = [];
            this.groupedData = null;
            this.refreshGrouping();
            return this;
        }

        refreshGrouping() {
            if (this.groupedData) {
                this.openedGroupHeaders = _.filter(this.groupedData, { $groupHeader: { $expanded: true } });
            }
            delete this.groupedData;
            this.refreshSorting();
        }

        refreshFilter(noGroupsRefresh = false) {
            delete this.filterCache;
            if (this.paginationMode === this.EXTERNAL_PAGINATION) {
                this.sendExternalPageRequest();
            }
            if (!noGroupsRefresh)
                this.refreshGrouping();
        }

        refreshSorting() {
            delete this.sortedData;
            if (this.dirCtrl) this.dirCtrl.refresh(false);
        }

        refresh() {
            this.refreshFilter();
        }

        updateGroupExpansionState(groupHeaderRow, doUpdate = true) {
            let field = groupHeaderRow.$groupHeader.field;
            let value = groupHeaderRow.$groupHeader.value;
            let toRemove = _.filter(this.groupedData, row => {
                return !row.$groupHeader && _.get(row, field) == value;
            });
            this.groupedData = _.difference(this.groupedData, toRemove);

            if (groupHeaderRow.$groupHeader.$expanded) {
                let index = _.indexOf(this.groupedData, groupHeaderRow);
                this.groupedData.splice(index + 1, 0, ...this.fullGroupedData[value]);
            }
            if (doUpdate) this.update(false, true);
        }

        setFirstColumn(field) {
            this.restoreColumnOrder();
            let column = _.find(this.columns, { field });
            if (column) {
                let index = this.columns.indexOf(column);
                column.$originalIndex = index;
                this.columns.splice(index, 1);
                this.columns.splice(0, 0, column);
            }
        }


        restoreColumnOrder() {
            let originalIndex = this.columns[0] && this.columns[0].$originalIndex;
            if (originalIndex) {
                let temp = this.columns[0];
                this.columns.splice(0, 1);
                this.columns.splice(originalIndex, 0, temp);
            }
        }


        getPageData() {
            if (this.paginationMode === this.PAGINATION) {
                return this.dirCtrl ? this.getPrePagedData().slice(this.dirCtrl.currentPage * this.rowsPerPage, this.dirCtrl.currentPage * this.rowsPerPage + this.rowsPerPage) : [];
            } else if (this.paginationMode === this.VIRTUAL_SCROLL || this.paginationMode === this.INFINITE_VIRTUAL_SCROLL) {
                return this.dirCtrl && this.dirCtrl.vsApi && this.dirCtrl.vsApi.getPageData ? this.dirCtrl.vsApi.getPageData() : [];
            } else if (this.paginationMode === this.EXTERNAL_PAGINATION || this.paginationMode === this.INFINITE_SCROLL) {
                return this.getRawData();
            }
        }

        sendExternalPageRequest() {
            if (!this.dirCtrl || _.isUndefined(this.dirCtrl.currentPage)) {
                return;
            }
            let paginationParams = {
                pageNum: this.dirCtrl.currentPage,
                numOfRows: this.rowsPerPage,
                direction: !this.sortByField ? null : this.revSort ? 'desc' : 'asc',
                orderBy: this.sortByField,
                filter: !_.isNull(this.externalSearchFields) ? null : (this.dirCtrl.tableFilter || null),
                filterBy: !_.isNull(this.externalSearchFields) ? null : _.map(this.getFilterables(), 'field'),
                externalSearchFields: this.externalSearchFields || null
            };
            if (_.isEqual(this.lastPaginationParams, paginationParams)) {
                return;
            }
            this.lastPaginationParams = paginationParams;

            let promise = this.externalPaginationCallback(paginationParams);
            if (!promise || !promise.then) {
                console.error('External pagination callback should return promise');
            } else {
                this.pendingExternalPaging = true;
                promise.then(pagedData => {
                    this.setData(pagedData.data, '$$internal$$');
                    Vue.set(this, 'externalTotalCount', {
                        total: pagedData.totalCount,
                        filtered: pagedData.filteredCount
                    })
                    this.pendingExternalPaging = false;
                    this.dirCtrl.noFilterResults = this.externalTotalCount.filtered === 0 && this.externalTotalCount.total > 0;
                    this.dirCtrl.paginationApi.update();
                });
            }
        }

        sendInfiniteScrollRequest(resetData = false, recurse = 0) {
            if (!this.dirCtrl || this.pendingInfiniteScroll) {
                return;
            }
            let wholePageHeight = this.dirCtrl.getActualPageHeight(true);
            if (wholePageHeight < parseInt(this.rowHeight) && recurse < 20) {
                setTimeout(() => {
                    this.sendInfiniteScrollRequest(resetData, ++recurse);
                }, 100)
                return;
            }

            let endlessScrollParams = {
                offset: this.infiniteScrollOffset,
                numOfRows: this.infiniteScrollChunkSize !== 'auto' ? this.infiniteScrollChunkSize : 2 + Math.floor(wholePageHeight / parseInt(this.rowHeight)) //vsApi.getItemsPerPage()
            };
            if (this.externalSearchFields) {
                endlessScrollParams = Object.assign({}, {
                    externalSearchFields: this.externalSearchFields
                });
            }
            let promise = this.infiniteScrollCallback(endlessScrollParams);
            if (!promise || !promise.then) {
                console.error('Infinite scroll callback should return promise');
            } else {
                Vue.set(this, 'pendingInfiniteScroll', true);
                return promise.then(moreData => {
                    if (resetData) {
                        this.setData(moreData.data, '$$internal$$');
                    } else {
                        this.setData(this.data.concat(moreData.data), '$$internal$$');
                    }
                    this.infiniteScrollHasMore = moreData.hasMore;
                    Vue.set(this, 'pendingInfiniteScroll', false);
                });
            }
        }

        getTotalLengthOfData() {
            if (this.paginationMode === this.EXTERNAL_PAGINATION) {
                return this.externalTotalCount ? this.externalTotalCount.filtered || 0 : 0;
            } else {
                return this.getPrePagedData().length;
            }
        }

        getFilterables() {
            let filterables;
            if (this.defaultFilterByAll) {
                filterables = _.filter(this.columns, col => col.filterable !== false);
            } else {
                filterables = _.filter(this.columns, col => col.filterable === true);
            }
            return filterables;
        }

        getFilterTooltip() {
            if (!this.columns || !this.columns.length) {
                return '';
            } else {
                let filterables = this.getFilterables();
                if (filterables.length === this.columns.length && this.columns.length > 1) {
                    return 'Filter by any column';
                } else {
                    return 'Filter by ' + _.map(filterables, c => c.header || _.startCase(c.field)).join(', ');
                }

            }
        }

        _reorderStickies(data) {
            let stickies = _.filter(data, i => i.$sticky);
            stickies.forEach(sticky => {
                data.splice(data.indexOf(sticky), 1);
            });

            data.splice(0, 0, ...stickies);
            Array.prototype.splice.apply(data, [
                0,
                0
            ].concat(stickies));
        }

        _saveAndRemoveSubRows(data) {
            if (!this.subRowsEnabled) {
                return data;
            }
            this.savedSubRowsParents = _.filter(data, d => d.$subRows && d.$expanded);
            return _.filter(data, d => !d.$parentRow);
        }

        _reInsertSubRows(data) {

            if (!this.subRowsEnabled) {
                return data;
            }
            let newData = [].concat(data);
            if (this.savedSubRowsParents) {
                this.savedSubRowsParents.forEach(parent => {
                    this._addSubRows(parent, newData);
                });
            }
            return newData;
        }

        getPrePagedData() {
            return this.getSortedData(this.getGroupedData(this.getFilteredData(this.getRawData())));
        }

        getSortedData(sourceData) {

            if (this.paginationMode === this.EXTERNAL_PAGINATION || this.externalSortCallback || !this.sortByField) {
                return sourceData;
            }
            else {
                if (!this.sortedData) {
                    sourceData = this._saveAndRemoveSubRows(sourceData);
                    let colObj = _.find(this.columns, { field: this.sortByField });
                    if (colObj) {
                        if (colObj.sortingAlgorithm) {
                            if (this.groupedData) {
                                if (this.groupedBy === this.sortByField) {
                                    this.sortedData = sourceData.sort((a, b) => {
                                        if (a.$groupHeader && !b.$groupHeader && a.$groupHeader.field === this.sortByField && a.$groupHeader.value === _.get(b, this.sortByField)) {
                                            return -1;
                                        } else if (!a.$groupHeader && b.$groupHeader && b.$groupHeader.field === this.sortByField && b.$groupHeader.value === _.get(a, this.sortByField)) {
                                            return 1;
                                        } else {
                                            let valA = a.$groupHeader ? a.$groupHeader.value : _.get(a, this.sortByField);
                                            let valB = b.$groupHeader ? b.$groupHeader.value : _.get(b, this.sortByField);
                                            return (this.revSort ? -1 : 1) * colObj.sortingAlgorithm(valA, valB, a, b, colObj);
                                        }
                                    });
                                } else {
                                    for (let key in this.fullGroupedData) {
                                        let groupData = this.fullGroupedData[key];
                                        groupData.sort((a, b) => {
                                            let valA = _.get(a, this.sortByField);
                                            let valB = _.get(b, this.sortByField);
                                            return (this.revSort ? -1 : 1) * colObj.sortingAlgorithm(valA, valB, a, b, colObj);
                                        });
                                    }
                                    this.groupedData.forEach(row => {
                                        if (row.$groupHeader) {
                                            this.updateGroupExpansionState(row, false);
                                        }
                                    });
                                    this.sortedData = sourceData;
                                }

                            } else {
                                this.sortedData = sourceData.sort((a, b) => {
                                    return (this.revSort ? -1 : 1) * colObj.sortingAlgorithm(_.get(a, this.sortByField), _.get(b, this.sortByField), a, b, colObj);
                                });
                            }
                        } else {
                            if (colObj.sortBy) {
                                if (this.groupedData) {
                                    if (this.groupedBy === this.sortByField) {
                                        this.sortedData = _.sortBy(sourceData, row => {
                                            return (this.revSort ? -1 : 1) * colObj.sortBy(row.$groupHeader.value, row);
                                        });
                                    } else {
                                        for (let key in this.fullGroupedData) {
                                            this.fullGroupedData[key] = _.sortBy(this.fullGroupedData[key], row => {
                                                return (this.revSort ? -1 : 1) * colObj.sortBy(_.get(row, this.sortByField), row);
                                            });
                                        }
                                        this.groupedData.forEach(row => {
                                            if (row.$groupHeader) {
                                                this.updateGroupExpansionState(row, false);
                                            }
                                        });
                                        this.sortedData = sourceData;
                                    }
                                } else {
                                    this.sortedData = _.sortBy(sourceData, row => {
                                        return (this.revSort ? -1 : 1) * colObj.sortBy(_.get(row, this.sortByField), row);
                                    });
                                }
                            } else {
                                if (this.groupedData) {
                                    if (this.groupedBy === this.sortByField) {
                                        this.sortedData = sourceData.sort((a, b) => {
                                            if (a.$groupHeader && !b.$groupHeader && a.$groupHeader.field === this.sortByField && a.$groupHeader.value === _.get(b, this.sortByField)) {
                                                return -1;
                                            } else if (!a.$groupHeader && b.$groupHeader && b.$groupHeader.field === this.sortByField && b.$groupHeader.value === _.get(a, this.sortByField)) {
                                                return 1;
                                            } else {
                                                let valA = a.$groupHeader ? a.$groupHeader.value : _.get(a, this.sortByField);
                                                let valB = b.$groupHeader ? b.$groupHeader.value : _.get(b, this.sortByField);
                                                return (this.revSort ? -1 : 1) * (valA > valB ? 1 : valA < valB ? -1 : 0);
                                            }
                                        });
                                    } else {
                                        for (let key in this.fullGroupedData) {
                                            let groupData = this.fullGroupedData[key];
                                            groupData.sort((a, b) => {
                                                let valA = _.get(a, this.sortByField);
                                                let valB = _.get(b, this.sortByField);
                                                return (this.revSort ? -1 : 1) * (valA > valB ? 1 : valA < valB ? -1 : 0);
                                            });
                                        }
                                        this.groupedData.forEach(row => {
                                            if (row.$groupHeader) {
                                                this.updateGroupExpansionState(row, false);
                                            }
                                        });
                                        this.sortedData = sourceData;
                                    }
                                } else {
                                    let temp = _.sortBy(sourceData, item => {
                                        let val = _.get(item, this.sortByField);
                                        return _.isString(val) ? val.toLowerCase() : _.isArray(val) ? val.length : val;
                                    });
                                    if (this.revSort) this.sortedData = temp.reverse();
                                    else this.sortedData = temp;
                                }
                            }
                        }
                        this.sortedData = this._reInsertSubRows(this.sortedData);
                        this._reorderStickies(this.sortedData);
                    } else {
                        this.sortedData = [].concat(sourceData);
                    }
                }
                return this.sortedData;
            }
        }

        getGroupedData(sourceData) {
            if (this.paginationMode === this.EXTERNAL_PAGINATION || !this.groupedBy) {
                return sourceData;
            } else {
                if (!this.groupedData) {
                    this.setFirstColumn(this.groupedBy);
                    this.fullGroupedData = _.groupBy(sourceData, this.groupedBy);
                    let tempData = [];
                    let column = _.find(this.columns, { field: this.groupedBy });
                    for (let key in this.fullGroupedData) {
                        let data = this.fullGroupedData[key];
                        tempData.push({
                            $groupHeader: {
                                field: this.groupedBy,
                                value: _.get(data[0], this.groupedBy),
                                col: column,
                                count: data.length
                            }
                        });
                    }
                    this.groupedData = tempData;

                    // reopen previously opened group headers
                    this.openedGroupHeaders.forEach(wasOpened => {
                        let toBeOpened = _.find(this.groupedData, { $groupHeader: { value: wasOpened.$groupHeader.value } });
                        if (toBeOpened) {
                            toBeOpened.$groupHeader.$expanded = true;
                            this.updateGroupExpansionState(toBeOpened, false);
                        }
                    });
                }
                return this.groupedData;
            }
        }

        getFilteredData(sourceData) {

            sourceData = sourceData || this.getRawData();

            if (this.paginationMode === this.EXTERNAL_PAGINATION) {
                return sourceData || [];
            }

            if (this.dirCtrl && !this.dirCtrl.tableFilter) {
                Vue.set(this.dirCtrl, 'noFilterResults', false);
                return sourceData || [];
            }
            if (!this.filterCache) {
                this.filterCache = _.filter(sourceData, row => {
                    for (let i in this.columns) {
                        let col = this.columns[i];
                        if (this.defaultFilterByAll && col.filterable !== false || !this.defaultFilterByAll && col.filterable === true) {
                            if (row.$sticky && !row.$stickyFilterable || this._isSubVisible(row, col) || row.$groupHeader || _.get(row, col.field) && _.includes(_.get(row, col.field).toString().toLowerCase(), this.dirCtrl.tableFilter.toLowerCase())) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
            }
            if (this.dirCtrl) {
                Vue.set(this.dirCtrl, 'noFilterResults', !!(!this.filterCache.length && sourceData.length));
            }
            return this.filterCache;
        }

        _isSubVisible(row, col) {
            if (!this.subRowsEnabled) {
                return false;
            }
            let subsVisible = false;
            if (row.$expandable) {
                for (let i = 0; i < row.$subRows.length; i++) {
                    let subRow = row.$subRows[i];
                    if (this.defaultFilterByAll && col.filterable !== false || !this.defaultFilterByAll && col.filterable === true) {
                        if (_.get(subRow, col.field) && _.includes(_.get(subRow, col.field).toString().toLowerCase(), this.dirCtrl.tableFilter.toLowerCase())) {
                            subsVisible = true;
                            break;
                        }
                    }
                }
            }
            return subsVisible;
        }

        getRawData() {
            return this.data || [];
        }

        allowColumnsCustomization() {
            this.columnsCustomization = true;
            this.loadCustomizedColumnsState();
            this.createAvailableColumnsArray();
            this.updateCustomizedColumns();
            return this;
        }

        createAvailableColumnsArray() {
            if (!this.origColumnDefs) {
                return;
            }
            this.availableColumns = [];
            this.origColumnDefs.forEach(colDef => {
                let item = {
                    id: colDef.field,
                    text: colDef.header || _.startCase(colDef.field),
                    isSelected: !this.visibleFields && !colDef.optional || this.visibleFields && this.visibleFields.indexOf(colDef.field) !== -1
                };
                this.availableColumns.push(item);
            });
        }

        refreshColumns() {
            if (this.origColumnDefs) {
                this.setColumns(_.cloneDeep(this.origColumnDefs));
            }
        }

        updateCustomizedColumns(refresh = true) {
            if (!this.availableColumns) {
                return;
            }
            this.visibleFields = _.map(_.filter(this.availableColumns, col => col.isSelected), 'id');
            this.saveCustomizedColumnsState();
            if (refresh) {
                this.refreshColumns();
            }
        }

        setId(id) {
            this.tableId = id;
            return this;
        }

        saveCustomizedColumnsState() {
            if (!this.tableId) {
                return;
            }
            if (!localStorage.jfTableViewSettings) {
                localStorage.jfTableViewSettings = JSON.stringify({ [this.tableId]: this.visibleFields });
            } else {
                let settings = JSON.parse(localStorage.jfTableViewSettings);
                settings[this.tableId] = this.visibleFields;
                localStorage.jfTableViewSettings = JSON.stringify(settings);
            }
        }

        loadCustomizedColumnsState() {
            if (!this.tableId) {
                return;
            }
            let settings = localStorage.jfTableViewSettings;
            if (settings) {
                settings = JSON.parse(settings);
                let mySetting = settings[this.tableId];
                this.visibleFields = mySetting;
            }
        }

        setKey(key) {
            if (typeof key === 'function') {
                this.keyFn = row => {
                    return key(row);
                };
            } else {
                this.keyFn = row => {
                    return row[key];
                };
            }
            return this;
        }

        updateData(data, removeIfMissing = false, maxRowsLen) {
            if (!this.data || !this.data.length) {
                this.setData(data);
            } else if (!this.keyFn) {
                throw new Error('Cannot update data, no key was defined. (use setKey(key|keyFn))');
            } else {
                let existingRows = [];
                let doUpdate = false;
                data.forEach(row => {
                    let exists = _.find(this.data, r => {
                        return this.keyFn(r) === this.keyFn(row);
                    });
                    if (exists) {
                        existingRows.push(exists);
                        for (let key in exists) {
                            if (!key.startsWith('$')) {
                                exists[key] = row[key];
                            }
                        }
                        if (row.$subRows) {
                            let subRowsToSave = [];
                            row.$subRows.forEach(subRow => {
                                let existsSub = _.find(exists.$subRows, r => {
                                    return this.keyFn(r) === this.keyFn(subRow);
                                });
                                if (existsSub) {
                                    subRowsToSave.push(existsSub);
                                    for (let subKey in existsSub) {
                                        if (!subKey.startsWith('$')) {
                                            existsSub[subKey] = subRow[subKey];
                                        }
                                    }
                                } else {
                                    subRow.$parentRow = exists;
                                    if (!exists.$subRows) {
                                        exists.$subRows = [];
                                        exists.$expandable = true;
                                    }
                                    exists.$subRows.push(subRow);
                                    exists.$subRows.reverse();
                                    subRowsToSave.push(subRow);
                                    doUpdate = true;
                                }
                            });
                            if (removeIfMissing) {
                                let removed = _.difference(exists.$subRows, subRowsToSave);
                                if (removed.length) {
                                    doUpdate = true;
                                    _.remove(exists.$subRows, sr => _.includes(removed, sr));
                                }
                            }
                        }
                    } else {
                        this.data.push(row);
                        existingRows.push(row);
                        doUpdate = true;
                    }
                });
                if (removeIfMissing) {
                    let removed = _.difference(this.data, existingRows);
                    if (removed.length) {
                        doUpdate = true;
                        _.remove(this.data, row => _.includes(removed, row));
                    }
                }
                if (doUpdate)
                    this.update();
            }
        }

        isOverflowing(cellId) {
            let elem = $(this.dirCtrl.$element).find('#' + cellId);
            let text = elem.children('.gridcell-content-text');
            let showAll = elem.children('.gridcell-showall');
            let cellItemContent = elem.text().trim();
            let width = 0;
            if (showAll.length) {
                width = showAll.outerWidth();
            }
            //        showAll.css('background-color',elem.parent().css('background-color'));
            if (cellItemContent.length > 0 && elem[0].scrollWidth > elem.innerWidth()) {
                //            elem.css('padding-right',width+'px');
                elem.addClass('overflow');
                elem.find('.gridcell-showall').show();
                return true;
            } else {
                elem.removeClass('overflow');
                elem.find('.gridcell-showall').hide();
                //            elem.css('padding-right','5px');
                return false;
            }

        }

        handleListableColumnOverflow(cellId, showAsyncData, externalCountModel ,listModelLength) {
            let elem = $(this.dirCtrl.$element).find('#' + cellId);
            let cellItemContent = elem.text().trim();
            if (cellItemContent.length > 0 && elem[0].scrollWidth > elem.innerWidth() ||
                (showAsyncData && externalCountModel > listModelLength)) {
                elem.addClass('overflow');
                elem.find('.gridcell-showall').show();
                return true;
            } else {
                elem.removeClass('overflow');
                elem.find('.gridcell-showall').hide();
                return false;
            }
        }

        showAll(model, rowName, col) {
            let objectName = _.startCase(this.objectName.indexOf('/') >= 0 ? this.objectName.split('/')[0] : this.objectName);

            let modalScope = {
                items: model,
                colName: col.header,
                rowName: rowName,
                objectName: objectName,
                filter: {}
            };
            this.JFrogModal.launchModal(
                JfDataListModal,
                modalScope,
                'sm',
                false,
                {
                    dontRejectOnClose: true,
                    class: "show-all-modal"
                }
            )
        }

        asyncShowAll(rowName, col) {
            if (col && col.asyncDataCallback) {
                col.asyncDataCallback(rowName).then(dataList => {
                    this.showAll(dataList, rowName, col);
                });
            }
        }

        _getCommonAction(key, callback, visibleWhen) {
            let action = COMMON_ACTIONS[key];
            action = _.extend({ callback: callback }, action);
            if (visibleWhen) {
                action = _.extend({ visibleWhen: visibleWhen }, action);
            }
            return action;
        }

        toggleColumnsCustomizationDropdown() {
            let opened = $(this.dirCtrl.$element).find('.drop-down-container').length;
            if (!opened)
                this.$timeout(() => {
                    $(this.dirCtrl.$element).find('.main-box').click();
                });
        }

        hasVisibleActionsFor(rowData) {
            let visible = _.filter(this.actions, act => !act.visibleWhen || act.visibleWhen(rowData));
            return !!visible.length;
        }

        dragRow(row) {
            if (this.registeredTabularDnd && this.getSelectedCount()) {
                row.$selected = true;
                this.startMultiDrag();
                return;
            }

            this.draggedRow = row;
            this.draggedIndex = _.findIndex(this.data, r => r === row);
            _.remove(this.data, r => r === row);
            this.update();
            this.refreshFilter();
        }

        startMultiDrag() {
            let selected = this.getSelectedRows();
            let filtered = this.getFilteredData();
            selected = _.filter(selected, item => _.includes(filtered, item));

            this.draggedRows = _.map(selected, selectedRow => {
                return {
                    row: selectedRow,
                    index: _.findIndex(this.data, r => r === selectedRow)
                };
            });
            _.remove(this.data, r => _.includes(selected, r));
            this.update();
            this.refreshFilter();
        }

        dropDraggedRow(targetRow, draggedRow = null, tabularDndDrag = false) {
            if (this.registeredTabularDnd && (this.draggedRows || _.isArray(draggedRow))) {
                this.dropDraggedRows(targetRow, draggedRow, tabularDndDrag);
                return;
            }

            if (this.markedDropTarget) {
                this.markedDropTarget.removeClass('drop-target-mark');
            }

            let targetIndex;
            if (!targetRow) {
                targetIndex = tabularDndDrag ? this.data.length : this.draggedIndex;
            } else {
                targetIndex = _.findIndex(this.data, r => r === targetRow);
                if (targetIndex === -1)
                    targetIndex = this.draggedIndex;
            }

            this.data.splice(targetIndex, 0, draggedRow || this.draggedRow);
            this.draggedRow = null;
            this.update();
            this.refreshFilter();

            this.fire('row.dragged', this.data);
            this.dirCtrl.vsApi.refresh();
        }

        dropDraggedRows(targetRow, draggedRows = null, tabularDndDrag = false) {
            if (this.markedDropTarget) {
                this.markedDropTarget.removeClass('drop-target-mark');
            }

            (draggedRows || this.draggedRows).forEach((draggedRow, i) => {
                let targetIndex;
                if (!targetRow) {
                    targetIndex = tabularDndDrag ? this.data.length : draggedRow.index;
                } else {
                    targetIndex = _.findIndex(this.data, r => r === targetRow);
                    if (targetIndex === -1)
                        targetIndex = draggedRow.index;
                }

                this.data.splice(targetIndex, 0, draggedRow.row);
            });
            this.draggedRows = null;
            this.update();
            this.refreshFilter();

            this.fire('row.dragged', this.data);

            this.dirCtrl.vsApi.refresh();

        }

        markDropTarget(rowElem) {
            if (this.markedDropTarget) {
                this.markedDropTarget.removeClass('drop-target-mark');
            }
            if (rowElem && !rowElem.is('.headers')) {
                rowElem.addClass('drop-target-mark');
                this.markedDropTarget = rowElem;
            }
        }

        _registerTabularDnd(tabularDndController, role, otherTableOptions, emptyTableStyle = {}) {
            this.registeredTabularDnd = {
                dndCtrl: tabularDndController,
                dndRole: role,
                dndOther: otherTableOptions,
                emptyTableStyle
            };
        }

        useExternalSortCallback(externalSortCallback) {
            this.externalSortCallback = externalSortCallback;
            return this;
        }

        alwaysShowSortingArrows() {
            this.showSortingArrowsAlways = true;
            return this;
        }

        disableFilterWhen(isFilterDisabledCallback) {
            this.isFilterDisabledCallback = isFilterDisabledCallback;
            return this;
        }

        disableRowActionGrouping() {
            this.isRowActionGroupingDisabled = true;
            return this;
        }

    }


    JFrogTableViewOptionsClass.cellTemplateGenerators = cellTemplateGenerators;

    JFrogTableViewOptionsClass.setAppDefaults = defaultsSetter => {
        defaultAppOptions = new JFrogTableViewOptionsClass();
        defaultsSetter(defaultAppOptions);
    };

    return JFrogTableViewOptionsClass;



    function createContextMenu() {
        window.$.contextMenu({
            selector: '.jf-table-view .jf-table-row:not(.headers)',
            build: ($trigger, e) => {

                let rowCtrl = $($trigger[0]).prop('comp');
                let tableOptions = rowCtrl.tableView.options;
                let row = rowCtrl.data;

                let allActions = _.filter(tableOptions.actions, act => {
                    return row && (!act.visibleWhen || act.visibleWhen(row));
                });
                let editAction = getEditAction($trigger, row, tableOptions);
                let additionalActions = getAdditionalActions($trigger, row, tableOptions);

                if (!allActions.length && !editAction && additionalActions.length === 0 || !row) {
                    return false;
                } else {
                    let cmItems = {};

                    if (editAction) {
                        cmItems['*edit*'] = {
                            name: 'Edit',
                            icon: 'artifactory-edit'
                        };
                    }

                    let getIconName = classdef => {
                        if (classdef === undefined)
                            return '';
                        let iconName;
                        let classes = classdef.split(' ');
                        classes.forEach(cls => {
                            if (cls.startsWith('icon-')) {
                                iconName = cls.substr(5);
                            }
                        });
                        return iconName;
                    };

                    if (additionalActions) {
                        for (let i in additionalActions) {
                            let action = additionalActions[i];
                            cmItems['@' + action.name] = {
                                name: action.name,
                                icon: getIconName(action.icon)
                            };
                        }
                    }

                    for (let actI in allActions) {
                        let act = allActions[actI];
                        act.key = act.tooltip.split(' ').join('').toLowerCase();
                        cmItems[act.key] = {
                            name: act.tooltip,
                            icon: getIconName(act.icon)
                        };
                    }

                    injections.$timeout(() => {
                        $('.context-menu-item').on('click', e => {
                            if (tableOptions.actionToDo) {
                                $(e.target).trigger('contextmenu:hide');
                                injections.$timeout(() => {
                                    tableOptions.actionToDo();
                                    delete tableOptions.actionToDo;
                                }, 100);
                            }
                        });
                    });

                    return {
                        callback: (key, options) => {
                            tableOptions.actionToDo = () => {
                                if (key === '*edit*') {
                                    editAction.do();
                                } else if (key.startsWith('@')) {
                                    let actionName = key.substr(1);
                                    let action = _.find(additionalActions, { name: actionName });
                                    action.do();
                                } else {
                                    let act = _.find(allActions, { key: key });
                                    act.callback(row);
                                    if (act.href) {
                                        let url = grid.options.getActionHref(act, row);
                                        if (url) {
                                            this.JFrogDownload(url);
                                        }
                                    }
                                }
                            };
                            return false;
                        },
                        items: cmItems
                    };

                }


            }
        });
    }

    function getEditAction($trigger, row, tableOptions) {
        let objScope = {
            row: { entity: row },
            grid: tableOptions,
            appScope: tableOptions.appScope
        };
        let editState = $trigger.find('[ui-sref]:not(.no-cm-action):not([cm-additional-action])').length ? $trigger.parent().parent().find('[ui-sref]:not(.no-cm-action):not([cm-additional-action])')[0].attributes['ui-sref'].textContent : null;
        if (editState) {
            let stateAndParams = _getStateAndParamsFromUISrefString(editState, objScope);

            return {
                do: () => {
                    this.$state.go(stateAndParams.state, stateAndParams.stateParams);
                }
            };
        } else {
            let ngClicks = $trigger.find('[ng-click]:not(.no-cm-action):not([cm-additional-action])');
            let clickCommand;
            for (let i in ngClicks) {
                let ngClick = ngClicks[i];
                if (ngClick.attributes && ngClick.attributes['ng-click'] && (ngClick.attributes['ng-click'].textContent.startsWith('grid.appScope.') || ngClick.attributes['ng-click'].textContent.startsWith('appScope.'))) {
                    clickCommand = ngClick.attributes['ng-click'].textContent;
                    break;
                }
            }

            if (clickCommand) {
                let parenthesesOpenIndex = clickCommand.indexOf('(');
                let funcName = clickCommand.substr(0, parenthesesOpenIndex);
                let paramsString = clickCommand.substr(parenthesesOpenIndex).split('(').join('').split(')').join('').trim();

                let params = _.map(paramsString.split(','), paramString => _.get(objScope, _.trim(paramString)));

                let funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf('.')));
                let func = _.get(objScope, funcName).bind(funcThis);

                return {
                    do: () => {
                        func.apply(null, params);
                    }
                };
            } else
                return null;

        }
    }

    function getAdditionalActions($trigger, row, tableOptions) {
        let objScope = {
            row: { entity: row },
            grid: tableOptions,
            appScope: tableOptions.appScope
        };
        let additionalCommands = [];
        let additionalElems = $trigger.find('[cm-additional-action]');

        for (let i = 0; i < additionalElems.length; i++) {
            let elem = additionalElems[i];
            let clickCommand = elem.attributes['ng-click'] ? elem.attributes['ng-click'].textContent : undefined;
            let srefLink = elem.attributes['ui-sref'] ? elem.attributes['ui-sref'].textContent : undefined;
            let icon = elem.attributes['cm-additional-action-icon'] ? elem.attributes['cm-additional-action-icon'].textContent : undefined;
            let commandName = elem.attributes['cm-additional-action'].textContent;

            if (commandName && clickCommand) {
                let parenthesesOpenIndex = clickCommand.indexOf('(');
                let funcName = clickCommand.substr(0, parenthesesOpenIndex);
                let paramsString = clickCommand.substr(parenthesesOpenIndex).split('(').join('').split(')').join('').trim();

                let params = _.map(paramsString.split(','), paramString => _.get(objScope, _.trim(paramString)));

                let funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf('.')));
                let func = _.get(objScope, funcName).bind(funcThis);

                additionalCommands.push({
                    name: commandName,
                    icon: icon,
                    do: () => {
                        func.apply(null, params);
                    }
                });
            } else if (commandName && srefLink) {
                let stateAndParams = _getStateAndParamsFromUISrefString(srefLink, objScope);
                let func = () => {
                    this.$state.go(stateAndParams.state, stateAndParams.stateParams);
                };
                additionalCommands.push({
                    name: commandName,
                    icon: icon,
                    do: () => {
                        func();
                    }
                });
            }
        }

        return additionalCommands;
    }

    function _getStateAndParamsFromUISrefString(uiSrefContent, objScope) {
        let parenthesesOpenIndex = uiSrefContent.indexOf('(');
        let state = uiSrefContent.substr(0, parenthesesOpenIndex !== -1 ? parenthesesOpenIndex : undefined);
        let paramsString = uiSrefContent.substr(parenthesesOpenIndex);
        let openBraceIndex = paramsString.indexOf('{');
        let closeBraceIndex = paramsString.lastIndexOf('}');

        let paramsObj = {};

        if (openBraceIndex !== -1 && closeBraceIndex !== -1) {

            paramsString = paramsString.substr(openBraceIndex + 1, closeBraceIndex - openBraceIndex - 1);

            let paramsSplit = paramsString.split(',');

            paramsSplit.forEach(param => {
                let keyVal = param.split(':');
                let key = keyVal[0].trim();
                let val = keyVal[1].trim();
                if (val.startsWith('row.') || val.startsWith('grid.'))
                    val = _.get(objScope, val);
                else if (val.startsWith('!row.') || val.startsWith('grid.'))
                    val = !_.get(objScope, val);

                else if (val.startsWith('\''))
                    val = val.split('\'').join('');
                else if (val.startsWith('"'))
                    val = val.split('"').join('');
                paramsObj[key] = val;
            });
        }
        return {
            state,
            stateParams: paramsObj
        }
;
    }

}



