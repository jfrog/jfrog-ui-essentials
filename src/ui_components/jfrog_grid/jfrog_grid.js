const TEMPLATES_FOLDER = "ui_components/jfrog_grid/templates/",
        MIN_COLUMN_WIDTH = 50;
let headerCellTemplate = require("raw!./templates/headerCellDefaultTemplate.html");
let groupHeaderCellTemplate = require("raw!./templates/headerCellTemplate.html");
let $timeout, $window, $state, $modal, $rootScope, download;

const COMMON_ACTIONS = {
    delete: {
        icon: 'icon icon-clear',
        tooltip: 'Delete'
    },
    download: {
        icon: 'icon icon-download',
        href: row => {return row.downloadLink},
        tooltip: 'Download'
    }
};

class JFrogGrid {

    constructor(scope, uiGridConstants) {
        this.scope = scope;

        if (scope) {
            this.appScopeProvider = scope;
        }
        this.enableRowSelection = true;
        this.enableRowHeaderSelection = false;
        this.modifierKeysToMultiSelect = false;
        this.multiSelect = false;
        this.noUnselect = false;
        this.enableColumnMenus = false;
        this.rowHeight = 40;
        this.headerRowHeight = 41;
        this.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
        this.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        this.groupingShowCounts = false;
        this._afterRegister = [];

        // pagination
        this.paginationCallback = null;
        this.enablePagination = true;
        this.enablePaginationControls = false;
        this.paginationPageSize = 25;
        this.resetPagination();
        this._handleColumnResize();

        this.scope.$on('$destroy', () => this.onDestroy());
    }

    resetPagination() {
        this.paginationCurrentPage = 1;
    }

    getPagination() {
        let pagination = {
            page_num: this.paginationCurrentPage,
            num_of_rows: this.paginationPageSize
        };
        let sortColumn = this.getSortColumn();
        if (sortColumn) {
            pagination.direction = sortColumn.sort.direction;
            pagination.order_by = sortColumn.field || sortColumn.name;
        }
        else {
            pagination.direction = 'asc';
            pagination.order_by = this.columnDefs[0].field;
        }
        return pagination;
    }

    getSortColumn() {
        if (_.isEmpty(this.api.grid.columns)) {
            return _.findWhere(this.columnDefs, {sort: {}});
        }
        else {
            return this.api.grid.getColumnSorting()[0];
        }
    }

    setExternalPagination(callback) {
        // set external pagination params
        this.useExternalPagination = true;
        this.useExternalSorting = true;
        this.paginationCallback = callback;
        // register on sort and on page change callbacks
        this.afterRegister((gridApi) => {
            gridApi.core.on.sortChanged(this.scope, (grid, sortColumns) => {
                this.getPage();
            });
            gridApi.pagination.on.paginationChanged(this.scope, (pageNumber, pageSize) => {
                this.getPage();
            });
            // get initial page
            this.getPage();
        });
        return this;
    }

    getPage() {
        if (!this.paginationCallback) {
            return;
        }
        this.paginationCallback(this.getPagination())
                .then((pagedResponse) => {
                    this.totalItems = pagedResponse.total_count;
                    this.setGridData(pagedResponse.data);
                });
    }

    afterRegister(callback) {
        // If api is already registered - invoke the callback
        if (this.api) {
            callback(this.api);
        }


        // Add it to array anyway (for cases when grid element is removed and added to DOM with ng-if)
        this._afterRegister.push(callback);
    }

    fixGroupingUndefinedValues() {
        if (this.api.grouping) {
            let origFunc = this.api.grouping.groupColumn;
            this.api.grouping.groupColumn = (columnName) => {
                let column = _.findWhere(this.api.grid.columns,{displayName: columnName});
                let field = column.field;
                this.api.grid.rows.forEach((row)=>{
                    if (row.entity[field] === undefined) {
                        row.entity[field] = '';
                    }
                });
                origFunc(columnName);
            }
        }
    }

    setColumns(columnDefs) {
        this.columnDefs = columnDefs;

        this.columnDefs.forEach((item, index) => {
            if (!item.headerCellTemplate) {
                if (item.allowGrouping) item.headerCellTemplate = groupHeaderCellTemplate;
                else item.headerCellTemplate = headerCellTemplate;
            }

            if (this.subRowsEnabled) {
                if (item.sortingAlgorithm) {
                    item.customSortingAlgorithm = item.sortingAlgorithm;
                }
                item.sortingAlgorithm = this._defaultSortingAlgorithm.bind(this,item);
                if (!item.cellTemplate) item.cellTemplate = `<div class="ui-grid-cell-contents">{{row.entity.${item.field}.$value}}</div>`
            }

            // enableCellEdit is by default true. If not defined - we want it to be false
            if (!item.enableCellEdit) {
                item.enableCellEdit = false;
            }
            // If given default actions, fetch their data from the default actions dictionary and add to the actions array
            if (item.actions) {
                item.customActions = item.customActions || [];
                _.forEach(item.actions, (callback, key) => {
                    let action;
                    if (callback.visibleWhen) {
                        action = this._getCommonAction(key, callback.callback, callback.visibleWhen);
                    } else {
                        action = this._getCommonAction(key, callback.callback || callback);
                    }
                    item.customActions.push(action);
                });
            }
            if (!item.minWidth)
                item.minWidth = MIN_COLUMN_WIDTH;
        });
        return this;
    }

    // Get default action by key and append the callback
    _getCommonAction(key, callback, visibleWhen) {
        let action = COMMON_ACTIONS[key];
        action = angular.extend({callback: callback}, action);
        if (visibleWhen) {
            action = angular.extend({visibleWhen: visibleWhen}, action);
        }
        return action;
    }

    _isElementVisible(e) {
        if(!e.length || e.css('display') === 'none') return false;
        else if (e.parent()[0] !== document) {
            return this._isElementVisible(e.parent());
        }
        else {
            return true;
        }
    }

    // Recalculates and sets the width of every column when the window resizes
    _calculateColumnsWidthByPercent(gridApi) {
        if(!this._isElementVisible($(gridApi.grid.element[0]))) return;

        let gridSize = $(gridApi.grid.element[0]).width(),
                resizedColumns = [],
                fieldColumnCounter = 0,
                columnWidthCounter = 0;

        // Resize the columns with percentage width
        gridApi.grid.columns.forEach((item, index) => {
            if (item.visible) {
                if (item.colDef.field) {
                    if (item.originalWidth && item.originalWidth.indexOf && item.originalWidth.indexOf('%') != -1) {
                        let newColSize = Math.floor(gridSize * (item.originalWidth.replace('%', '') / 100));

                        if (gridApi.grid.columns[index].colDef.minWidth && parseInt(gridApi.grid.columns[index].colDef.minWidth) > newColSize)
                            newColSize = parseInt(gridApi.grid.columns[index].colDef.minWidth);

                        gridApi.grid.columns[index].width = gridApi.grid.columns[index].colDef.width = newColSize;

                        columnWidthCounter = columnWidthCounter + gridApi.grid.columns[index].width;
                        resizedColumns.push(index);
                    }

                    fieldColumnCounter++;
                }
                else
                    gridSize = gridSize - item.width;
            }
        });

        // Resize the columns that weren't set with percentage width with the remaining space
        if (resizedColumns.length < fieldColumnCounter) {
            let columnWidthDiff = Math.floor((gridSize - columnWidthCounter) / (fieldColumnCounter - resizedColumns.length));

            gridApi.grid.columns.forEach((item, index) => {
                if (item.visible && item.colDef.field && resizedColumns.indexOf(index) == -1)
                    gridApi.grid.columns[index].width = gridApi.grid.columns[index].colDef.width = columnWidthDiff;
            });
        }
        else if (columnWidthCounter > gridSize) {
            let columnWidthDiff = columnWidthCounter - gridSize,
                indexIterate = 0;

            while (columnWidthDiff > 0) {
                if (indexIterate == gridApi.grid.columns.length)
                    indexIterate = 0;

                if (gridApi.grid.columns[indexIterate].visible && gridApi.grid.columns[indexIterate].colDef.field) {
                    gridApi.grid.columns[indexIterate].width = gridApi.grid.columns[indexIterate].colDef.width = gridApi.grid.columns[indexIterate].width - 1;
                    columnWidthDiff = columnWidthDiff - 1;
                }

                indexIterate++;
            }
        }

        gridApi.grid.refreshCanvas(true);
    }

    // Set the columns width to a fixed pixel size, only on load, so the ui-grid itself won't resize them on window resize
    _fixColumnsWidthFromPercentToPixel(gridApi) {
        if (!this.firstRenderedIteration) {
            let firstRun = false;

            gridApi.grid.columns.forEach((item) => {
                if (item.colDef.field && item.drawnWidth) {
                    item.originalWidth = item.colDef.width;
                    item.colDef.width = item.width;

                    firstRun = true;
                }
            });

            if (firstRun) {
                this._calculateColumnsWidthByPercent(gridApi);
                this.firstRenderedIteration = true;
            }
        }
    }

    // Resize the columns based on one column that is resized
    _calculateColumnsWidthOnResize(gridApi, colDef, deltaChange) {
        let indexChanged = -1,
                indexIterate,
                pixelsToDivide,
                totalColumnWidth = 0;

        // Check what column was actually resized
        gridApi.grid.columns.forEach((item, index) => {
            if (item.colDef === colDef)
                indexChanged = index;

            if (item.visible)
                totalColumnWidth = totalColumnWidth + item.width;
        });

        indexIterate = indexChanged + 1;
        pixelsToDivide = $(gridApi.grid.element[0]).width() - totalColumnWidth;
        gridApi.grid.columns[indexChanged].colDef.width = gridApi.grid.columns[indexChanged].width;

        // Resize the columns that follow the resized column
        while (pixelsToDivide != 0 && indexIterate < gridApi.grid.columns.length) {
            if (indexIterate == gridApi.grid.columns.length)
                indexIterate = 0;
            while (!gridApi.grid.columns[indexIterate].colDef.field)
                indexIterate++;

            if (gridApi.grid.columns[indexIterate].width + pixelsToDivide < MIN_COLUMN_WIDTH) {
                pixelsToDivide = pixelsToDivide + (gridApi.grid.columns[indexIterate].width - MIN_COLUMN_WIDTH);
                gridApi.grid.columns[indexIterate].width = gridApi.grid.columns[indexIterate].colDef.width = MIN_COLUMN_WIDTH;
            }
            else {
                gridApi.grid.columns[indexIterate].width = gridApi.grid.columns[indexIterate].colDef.width = gridApi.grid.columns[indexIterate].width + pixelsToDivide;
                pixelsToDivide = 0;
            }

            indexIterate++;
        }

        // If the column was resized too much, shorten it so the grid won't overflow
        if (pixelsToDivide != 0)
            gridApi.grid.columns[indexChanged].width = gridApi.grid.columns[indexChanged].colDef.width = gridApi.grid.columns[indexChanged].width + pixelsToDivide;

        gridApi.grid.refreshCanvas(true);
    }

    _handleColumnResize() {
        this.afterRegister((gridApi) => {
            this.calculateFn = () => this._calculateColumnsWidthByPercent(gridApi);

            $($window).resize(this.calculateFn);
            gridApi.core.on.rowsRendered(this.scope, () => this._fixColumnsWidthFromPercentToPixel(gridApi));
            if (gridApi.colResizable)
                gridApi.colResizable.on.columnSizeChanged(this.scope, (colDef, deltaChange) => this._calculateColumnsWidthOnResize(gridApi, colDef, deltaChange));
        });
    }

    setButtons(buttons) {
        if (!this.scope) {
            throw 'Must set scope to use buttons';
        }
        this.buttons = buttons;
        return this;
    }

    setBatchActions(batchActions) {
        this.batchActions = batchActions;
        this.setMultiSelect();
        return this;
    }

    setGridData(data,transform = true, autoExpand = true) {

        if (transform && this.subRowsEnabled) {
            this.data = this._transformDataForSubRowsSupport(data, autoExpand);
        }
        else {
            this.data = data;
        }

        this.afterRegister((gridApi) => {
            gridApi.grid.element.css('visibility', 'visible');
            this.fixGroupingUndefinedValues()
        });

        if (!this.data || !this.data.length) {
            // if the grid is empty push an empty object
            this.data = [{_emptyRow: true}];
            // Also disable select all in header
            this.enableSelectAll = false;
        }
        else {
            // In case select all was chosen, re-enable it after data was added
            this.enableSelectAll = this._allowMultiSelect;
        }

        this._resize();

        return this;
    }

    setKey(key) {
        if (typeof key === 'function') {
            this.keyFn = (row) => {
                return key(this._complex2Simple(row));
            }
        }
        else {
            this.keyFn = (row) => {
                return row[key] && row[key].$value ? row[key].$value : row[key];
            }
        }
        return this;
    }

    _complex2Simple(row,changeObject = false) {
        let simple = {};
        for (let key in row) {
            if (!key.startsWith('$') && !key.startsWith('_')) {
                if (!changeObject) simple[key] = row[key] && row[key].$value !== undefined ? row[key].$value : row[key];
                else row[key] = row[key] && row[key].$value !== undefined ? row[key].$value : row[key];
            }
            else {
                if (!changeObject) simple[key] = row[key];
            }
        }
        return changeObject ? row : simple;
    }
    _simple2Complex(row,changeObject = false) {
        let complex = {};
        for (let key in row) {
            if (!key.startsWith('$') && !key.startsWith('_')) {
                if (!changeObject) complex[key] = {$value: row[key] && row[key].$value !== undefined ? row[key].$value : row[key], $row: complex};
                else row[key] = {$value: row[key] && row[key].$value !== undefined ? row[key].$value : row[key], $row: row};
            }
            else {
                if (!changeObject) complex[key] = row[key];
            }
        }
        return changeObject ? row : complex;
    }

    updateGridData(data) {
        if (!this.data || !this.data.length || !this.api) {
            return this.setGridData(data);
        }
        else if (!this.keyFn) throw new Error('Cannot update data, no key was defined. (use setKey(key|keyFn))');
        else {
            data.forEach((row) => {
                let exists = _.find(this.api.grid.rows, (r)=>{
                    return this.keyFn(r.entity) === this.keyFn(row);
                });
                if (exists) {
                    for (let key in exists.entity) {
                        if (!key.startsWith('$')) {
                            if (exists.entity[key] && exists.entity[key].$row) exists.entity[key].$value = row[key];
                            else exists.entity[key] = row[key]
                        }
                    }
                    if (row.$subRows) {
                        row.$subRows.forEach((subRow)=>{
                            let existsSub = _.find(exists.entity.$subRows, (r)=>{
                                return this.keyFn(r) === this.keyFn(subRow);
                            });
                            if (existsSub) {
                                for (let subKey in existsSub) {
                                    if (!subKey.startsWith('$')) {
                                        if (existsSub[subKey] && existsSub[subKey].$row) existsSub[subKey].$value = subRow[subKey];
                                        else existsSub[subKey] = subRow[subKey];
                                    }
                                }
                            }

                        });
                    }
                }
            });
        }
    }

    setRowsPerPage(rowsPerPage) {
        this.paginationPageSize = rowsPerPage;
        return this;
    }

    enableSubRows() {
        this.subRowsEnabled = true;
        return this;
    }

    _resize() {
        let dataLen = this.api ? this.api.core.getVisibleRows().length : this.data.length;
        // at least 1 row
        this.minRowsToShow = Math.max(1, dataLen);

        // if grid is already displayed - recalculate its height. ui-grid doesn't have an API call for this
        if (this.api) {
            let grid = this.api.grid;
            let height = this.minRowsToShow * grid.options.rowHeight + grid.options.headerRowHeight;

            // (Adam) This is instead of ui-grid-auto-resize which has a 250ms interval that causes the grid to flicker
            grid.element.css('height', height + 'px');
            grid.element.find('.ui-grid-viewport').css('height', height - this.headerRowHeight + 'px');
            grid.gridHeight = height;
        }
    }

    onRegisterApi(gridApi) {
        this.api = gridApi;

        if (this.scope === undefined) {
            this.scope = null;
        }

        this.api.core.on.rowsRendered(this.scope, () => {
            this._resize();
        });

        if (this.onSelectionChange && this.api.selection) {
            this.api.selection.on.rowSelectionChanged(this.scope, this.onSelectionChange);
        }
        if (this.onSelectionChangeBatch && this.api.selection) {
            this.api.selection.on.rowSelectionChangedBatch(this.scope, this.onSelectionChangeBatch);
        }


        if (this.scope) {
            if (!this.scope.grids) {
                this.scope.grids = {};
            }
            this.scope.grids[gridApi.grid.id] = {buttons: this.buttons};
        }

        this._afterRegister.forEach((callback) => {
            callback(gridApi);
        });
        return this;
    }

    setRowTemplate(fileName) {
        if (fileName) {
            this.rowTemplate = TEMPLATES_FOLDER + fileName + '.html';
        }
        return this;
    }

    setDraggable(callbackFunc) {
        this.setRowTemplate('drag_rows');
        this.draggablefunc = callbackFunc;
        this.afterRegister((gridApi) => {
            gridApi.draggableRows.on.rowDropped(this.scope, (info, dropTarget) => {
                this.draggablefunc(info, dropTarget);
            });
        });
        return this;
    }

    setMultiSelect() {
        this.enableRowHeaderSelection = true;

        this.multiSelect = true;
        this.enableSelectAll = true;
        this._allowMultiSelect = true;
        this.selectionRowHeaderWidth = 40;
        return this;
    }

    setSingleSelect() {
        this.enableRowHeaderSelection = true;
        this.multiSelect = false;
        this.enableSelectAll = true;
        this._allowMultiSelect = false;
        this.selectionRowHeaderWidth = 40;

        return this;
    }

    setMinRowsToShow(number) {
        this.minRowsToShow = number;
        return this;
    }

    selectItem(item) {
        $timeout(() => this.api.selection.selectRow(item));
    }

    onDestroy() {
        $($window).off('resize', this.calculateFn);
    }


    isOverflowing(cellId) {

        let elem = $('#'+cellId);
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
            elem.addClass('overflow')
            return true;
        }
        else {
            elem.removeClass('overflow')
//            elem.css('padding-right','5px');
            return false;
        }

    }

    /**
     * htmlIsOverflowing(cellId)
     * Get al the cell's children.
     * Then sum all the children's box model width (includes padding and margin) in a loop
     * If the child already has the overflowing class => remove it
     * When the sum gets > then the container's width => add the overflowing class to him
     * After exiting the loop return the overflowing flag
     * **/
    htmlIsOverflowing(cellId) {
        let elem = $('#'+cellId);
        let children = elem.children('.item');
        let maxWidth = elem.outerWidth() - 65;
        let totalChildrenWidth = 0;
        children.each((i,child) => {
            let childElem = $(child);
            totalChildrenWidth += childElem.outerWidth()
                + parseInt(childElem.css('margin-left'))
                + parseInt(childElem.css('margin-right'));

            if(totalChildrenWidth < maxWidth){
                childElem.removeClass('overflowing-child');
            }
            if(totalChildrenWidth >= maxWidth && !childElem.is('.overflowing-child')){
                childElem.addClass('overflowing-child');
            }

        });
        return elem.children('.item.overflowing-child').length>0;
    }

    lastHtmlElementOverflowing(cellId){
        return ($('#'+cellId).children('.item:not(.overflowing-child)').length == 0);
    }

    showAll(model,rowName,col) {

        let objectName = _.startCase(this.gridObjectName.indexOf('/')>=0 ? this.gridObjectName.split('/')[0] : this.gridObjectName);

        let modalScope = $rootScope.$new();

        modalScope.items = model;
        modalScope.colName = col.displayName || col.name;
        modalScope.rowName = rowName;
        modalScope.objectName = objectName;

        modalScope.filter = {};
        modalScope.filterItem = (item) => {
            if (modalScope.filter.text) {
                let regex = new RegExp('.*' + modalScope.filter.text.split('*').join('.*') + '.*', "i");
                return regex.test(item);
            }
            else return true;
        };

        modalScope.noResults = () => {
            let filteredResults = _.filter(modalScope.items, (item)=>{
                return modalScope.filterItem(item);
            });
            return filteredResults.length === 0;
        };

        $modal.open({
            scope: modalScope,
            templateUrl: 'ui_components/jfrog_grid/show_all_modal.html',
            backdrop: true,
            size: 'sm'
        });
    }

    _transformDataForSubRowsSupport(data, autoExpand) {
        let transformed = [];

        data.forEach((row)=>{
            let complexRow = this._simple2Complex(row);
            transformed.push(complexRow);
            if (row.$subRows && row.$subRows.length) {
                complexRow.$subRows = [];
                complexRow.$expandable = true;
                row.$subRows.forEach((sub)=>{
                    let complexSub = this._simple2Complex(sub);
                    complexSub.$parentRow = complexRow;
                    if (autoExpand && row.$expanded) {
                        transformed.push(complexSub);
                    }
                    complexRow.$subRows.push(complexSub);
                });
            }
        });

        return transformed;
    }

    callActionCallback(action,row) {
        if (this.subRowsEnabled) {
            let simpleRow = this._complex2Simple(row.entity,true);
            action.callback(simpleRow,row);
            row.entity = this._simple2Complex(simpleRow,true);
        }
        else {
            action.callback(row.entity,row);
        }
    }

    checkVisibleWhen(action,row) {
        if (this.subRowsEnabled) {
            let simpleRow = this._complex2Simple(row.entity);
            return action.visibleWhen(simpleRow);
        }
        else {
            return action.visibleWhen(row.entity);
        }
    }

    getActionHref(action,row) {
        if (!action.href) return;
        if (this.subRowsEnabled) {
            let simpleRow = this._complex2Simple(row.entity);
            return action.href(simpleRow);
        }
        else {
            return action.href(row.entity);
        }
    }

    refreshGridAfterFiltering(gridFilter) {

        gridFilter.column.name += ' ';
        if (gridFilter.column2) gridFilter.column2.name += ' ';
        var data = [];
        if (this.data.length) {
            data[0] = _.cloneDeep(this.data[0]);
            data = data.concat(this.data.slice(1));
        }

        this.setGridData(data,false);
        $timeout(()=>{
            if (this.api.grid.getVisibleRows().length === 0) {
                this.setGridData(data.concat([{_emptyRow:true}]),false);
                gridFilter.noMatches=true;
            }
            else if (this.api.grid.getVisibleRows().length > 1) {
                this.setGridData(_.filter(data,(row)=>{
                    return !row._emptyRow;
                }),false);
                gridFilter.noMatches=false;
            }
            $timeout(()=> {
                this.api.core.refresh();
            });
        });

    }

    toggleExpansion(row) {
        if (row.$expandable) {
            row.$expanded = !row.$expanded;
            if (row.$expanded) this._addSubRows(row);
            else this._removeSubRows(row);
        }
        else if (row.$parentRow) {
            this.toggleExpansion(row.$parentRow);
        }
    }

    _addSubRows(row) {
        let rows = _.pluck(this.api.grid.rows,'entity');
        let index = _.indexOf(rows,row) + 1;
        let newSubRows = _.filter(row.$subRows,(subRow)=>{
            return this.data.indexOf(subRow) === -1;
        });
        Array.prototype.splice.apply(this.data, [index, 0].concat(newSubRows));
    }

    _removeSubRows(row) {
        this.data = _.without.apply(_,[this.data].concat(row.$subRows))
    }


    resyncSubRows() {

//        let parents = _.filter(this.api.grid.rows, (row) => row.entity.$subRows && )

    }

    _defaultSortingAlgorithm(colRef, a,b) {

        let dir = _.findWhere(this.api.grid.columns, {field: colRef.field}).sort.direction;

        if (a.$row.$parentRow && a.$row.$parentRow === b.$row) {
            return dir === 'asc' ? 1 : -1;
        }
        else if (b.$row.$parentRow && b.$row.$parentRow === a.$row) {
            return dir === 'asc' ? -1 : 1;
        }
        else if (a.$row.$parentRow && !b.$row.$parentRow) {
            return this._defaultSortingAlgorithm(colRef, a.$row.$parentRow[colRef.field], b);
        }
        else if (b.$row.$parentRow && !a.$row.$parentRow) {
            return this._defaultSortingAlgorithm(colRef, a, b.$row.$parentRow[colRef.field]);
        }
        else if (a.$row.$parentRow && b.$row.$parentRow && a.$row.$parentRow !== b.$row.$parentRow) {
            return this._defaultSortingAlgorithm(colRef, a.$row.$parentRow[colRef.field], b.$row.$parentRow[colRef.field]);
        }
        else {
            if (a.$value>b.$value) return 1;
            else if (b.$value>a.$value) return -1;
            else return 0;
        }
    }

    isRowExpanded(row) {
        if (!this.keyFn) throw new Error('No key was defined. (use setKey(key|keyFn))');
        let key = this.keyFn(row);
        let found = _.find(this.data,(r) => this.keyFn(r) === key);
        if (found) {
            return found.$expanded === true;
        }
        else return false;
    }
}


export class JFrogGridFactory {
    constructor(uiGridConstants, _$timeout_, _$window_, _$state_, _$modal_,_$rootScope_, _JFrogDownload_) {
        $timeout = _$timeout_;
        $window = _$window_;
        $state = _$state_;
        $modal = _$modal_;
        download = _JFrogDownload_;
        $rootScope = _$rootScope_;

        this.uiGridConstants = uiGridConstants;
        this._createContextMenu();

   }

    getGridInstance(scope) {
        return new JFrogGrid(scope, this.uiGridConstants);
    }

    getDefaultCellTemplate() {
        return headerCellTemplate;
    }

    _createContextMenu() {
        $.contextMenu({
            selector: '.ui-grid-cell-contents, .grid-cell-checkbox',
            build: ($trigger,e) => {

                let row = angular.element($trigger[0]).scope().row;
                let grid = angular.element($trigger[0]).controller('uiGrid').grid;
                let rowActions = grid.appScope.grids[grid.id].buttons;
                let customActionsRaw = _.pluck(grid.columns,'colDef.customActions');
                let allActions = [];
                if (customActionsRaw) {
                    customActionsRaw.forEach((acts)=>{
                        if (acts) {
                            acts.forEach((act)=>{
                                allActions.push(act);
                            })
                        }
                    });
                }
                if (rowActions) {
                    rowActions.forEach((act)=>{
                        allActions.push(act);
                    });
                }

                allActions = _.filter(allActions,(act)=>{
                    return row && (!act.visibleWhen || grid.options.checkVisibleWhen(act,row));
                });

                let editAction = this._getEditAction($trigger,row,grid);
                let additionalActions = this._getAdditionalActions($trigger,row,grid);

                if ((!allActions.length && !editAction && additionalActions.length === 0) || !row) {
                    return false;
                }
                else {
                    let cmItems = {};

                    if (editAction) {
                        cmItems['*edit*'] = {
                            name: 'Edit',
                            icon: 'artifactory-edit'
                        }
                    }

                    let getIconName = (classdef) => {
                        let iconName;
                        let classes = classdef.split(' ');
                        classes.forEach((cls)=>{
                            if (cls.startsWith('icon-')) {
                                iconName = cls.substr(5);
                            }
                        });
                        return iconName;
                    };

                    if (additionalActions) {
                        for (let i in additionalActions) {
                            let action = additionalActions[i];
                            cmItems['@'+action.name] = {
                                name: action.name,
                                icon: getIconName(action.icon)
                            }
                        }
                    }

                    for (let actI in allActions) {
                        let act = allActions[actI];
                        act.key = act.tooltip.split(' ').join('').toLowerCase();
                        cmItems[act.key] = {
                            name: act.tooltip,
                            icon: getIconName(act.icon)
                        }
                    }

                    $timeout(()=>{
                        $('.context-menu-item').on('click',(e)=>{
                            if (this.actionToDo) {
                                $(e.target).trigger('contextmenu:hide');
                                $timeout(()=>{
                                    this.actionToDo();
                                    delete this.actionToDo;
                                },100);
                            }
                        });
                    });

                    return {
                        callback: (key, options) => {
                            this.actionToDo = () => {
                                if (key === '*edit*') {
                                    editAction.do();
                                }
                                else if (key.startsWith('@')) {
                                    let actionName = key.substr(1);
                                    let action = _.findWhere(additionalActions, {name: actionName});
                                    action.do();
                                }
                                else {
                                    let act = _.findWhere(allActions,{key: key});
                                    grid.options.callActionCallback(act,row);
                                    if (act.href) {
                                        let url = grid.options.getActionHref(act,row);
                                        if (url) download(url);
                                    }
                                }
                            };
                            return false;
                        },
                        items: cmItems
                    }

                }

            }
        });
    }

    _getEditAction($trigger,row,grid) {
        let objScope = {row:row,grid:grid};
        let editState = $trigger.parent().parent().find('[ui-sref]:not(.no-cm-action)').length ? $trigger.parent().parent().find('[ui-sref]:not(.no-cm-action)')[0].attributes['ui-sref'].textContent : null;
        if (editState) {
            let parenthesesOpenIndex = editState.indexOf('(');
            let state = editState.substr(0,parenthesesOpenIndex);
            let paramsString = editState.substr(parenthesesOpenIndex);
            let openBraceIndex = paramsString.indexOf('{');
            let closeBraceIndex = paramsString.lastIndexOf('}');
            paramsString = paramsString.substr(openBraceIndex+1,closeBraceIndex-openBraceIndex-1);

            let paramsObj = {};

            let paramsSplit = paramsString.split(',');

            paramsSplit.forEach((param)=>{
                let keyVal = param.split(':');
                let key = keyVal[0].trim();
                let val = keyVal[1].trim();
                if (val.startsWith('row.') || val.startsWith('grid.')) val = _.get(objScope,val);
                else if (val.startsWith('!row.') || val.startsWith('!grid.')) val = !_.get(objScope,val);

                else if (val.startsWith("'")) val = val.split("'").join('');
                else if (val.startsWith('"')) val = val.split('"').join('');
                paramsObj[key]=val;
            });

            return {
                do: ()=>{
                    $state.go(state,paramsObj);
                }
            }
        }
        else {
            let ngClicks = $trigger.parent().parent().find('[ng-click]:not(.no-cm-action)');
            let clickCommand;
            for (let i in ngClicks) {
                let ngClick = ngClicks[i];
                if (ngClick.attributes && ngClick.attributes['ng-click'] && ngClick.attributes['ng-click'].textContent.startsWith('grid.appScope')) {
                    clickCommand = ngClick.attributes['ng-click'].textContent;
                    break;
                }
            }

            if (clickCommand) {
                let parenthesesOpenIndex = clickCommand.indexOf('(');
                let funcName = clickCommand.substr(0,parenthesesOpenIndex);
                let paramsString = clickCommand.substr(parenthesesOpenIndex).split('(').join('').split(')').join('').trim();
                let param = _.get(objScope,paramsString);

                let funcThis = _.get(objScope,funcName.substr(0,funcName.lastIndexOf('.')));
                let func = _.get(objScope,funcName).bind(funcThis);

                return {
                    do: () => {
                        func(param);
                    }
                }
            }
            else return null;

        }
    }

    _getAdditionalActions($trigger,row,grid) {
        let objScope = {row:row,grid:grid};
        let additionalCommands = [];
        let additionalElems = $trigger.parent().parent().find('[cm-aditional-action]');
        for (let i = 0; i<additionalElems.length; i++) {
            let elem = additionalElems[i];
            let clickCommand = elem.attributes['ng-click'].textContent;
            let icon = elem.attributes['class'].textContent;
            let commandName = elem.attributes['cm-aditional-action'].textContent;

            if (clickCommand) {
                let parenthesesOpenIndex = clickCommand.indexOf('(');
                let funcName = clickCommand.substr(0,parenthesesOpenIndex);
                let paramsString = clickCommand.substr(parenthesesOpenIndex).split('(').join('').split(')').join('').trim();
                let param = _.get(objScope,paramsString);

                let funcThis = _.get(objScope,funcName.substr(0,funcName.lastIndexOf('.')));
                let func = _.get(objScope,funcName).bind(funcThis);

                additionalCommands.push({
                    name: commandName,
                    icon: icon,
                    do: () => {
                        func(param);
                    }
                });
            }
        }

        return additionalCommands;
    }
}