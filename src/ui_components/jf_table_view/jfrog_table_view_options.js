import cellTemplateGenerators from './cell_template_generators';

export function JFrogTableViewOptions($timeout, $rootScope, $modal) {
	'ngInject';
    return class JFrogTableViewOptions {
	    /* @ngInject */
        constructor(appScope) {
            this.data = [];
            this.actions = [];
            this.columns = [];
            this.appScope = appScope;

            // selection types
            this.NO_SELECTION = 0;
            this.SINGLE_SELECTION = 1;
            this.MULTI_SELECTION = 2;

            // pagination mode
            this.PAGINATION = 0;
            this.VIRTUAL_SCROLL = 1;
            this.EXTERNAL_PAGINATION = 2;

            // Themes
            this.DEFAULT_THEME = 0;
            this.OLD_GRID_THEME = 1;

            this.cellTemplateGenerators = cellTemplateGenerators;

            this._setDefaults();
        }

        _setDefaults() {
            this.objectName = 'Item';
            this.rowHeight = '60px';
            this.headerRowHeight = '60px';
            this.rowsPerPage = 25;
            this.sortable = true;
            this.selectionMode = this.NO_SELECTION;
            this.paginationMode = this.PAGINATION;
            this.actionButtonSize = 60; //px
            this.selectionColumnWidth = 60; //px
            this.theme = this.DEFAULT_THEME;
            this.sortDropDownVisible = true;
            this.resizableColumns = true;
            this.defaultFilterByAll = true;
            this.columnsCustomization = false;
            this.headersVisible = true;
        }

        setData(data, internalCall) {

            if (this.paginationMode === this.EXTERNAL_PAGINATION && internalCall !== '$$internal$$') {
                console.error('When using external pagination, you should not call setData directly !')
            }
            else {
                this.origData = _.sortBy(data,'');
                if (this.subRowsEnabled) {
                    this.data = this._transformDataForSubRowsSupport(data, false);
                }
                else {
                    this.data = data;
                }
                this.update();
            }
            this.dataWasSet = true;
        }

        _transformDataForSubRowsSupport(data, autoExpand) {
            data.forEach((row)=>{
                if (row.$subRows && row.$subRows.length) {
                    row.$expandable = true;
                    row.$subRows.forEach((sub)=>{
                        sub.$parentRow = row;
                        if (autoExpand && row.$expanded) {
                            data.push(sub);
                        }
                    });
                }
            });

            return data;
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

        _addSubRows(row, addTo = null) {
            addTo = addTo || this.data;
            let index = _.indexOf(addTo ,row) + 1;
            let newSubRows = _.filter(row.$subRows,(subRow)=>{
                return addTo.indexOf(subRow) === -1;
            });
            Array.prototype.splice.apply(addTo, [index, 0].concat(newSubRows));
            this.refreshFilter();
            this.update();
        }

        _removeSubRows(row) {
            if (row.$subRows) {
                row.$subRows.forEach(subRow => {
                    let index = this.data.indexOf(subRow);
                    if (index >= 0) this.data.splice(index,1);
                })
            }
            this.refreshFilter();
            this.update();
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

        update(noSort=false, noGrouping=false) {
//            console.log('update',noSort,noGrouping)
            if (this.dirCtrl) {
                if (!noGrouping) this.refreshGrouping();
                this.origData = _.sortBy(this.data,'');
                if (!noSort) this.sortBy(this.sortByField,true);
                else this.dirCtrl.refresh();
                this._normalizeWidths();
            }
        }

        setObjectName(objectName, useAn = false) {
            this.objectName = objectName;
            this.useAnWithObjectName = useAn;
            return this;
        }

        setNewEntityAction(newEntityCallback) {
            this.newEntityCallback = newEntityCallback;
            return this;
        }
        filterColumns(columns) {
            return _.filter(columns,col => {
                return (!col.isVisible || col.isVisible()) && (!this.visibleFields || this.visibleFields.indexOf(col.field) !== -1)
            });
        }

        setColumns(columns) {
            if (!this.origColumnDefs) this.origColumnDefs = _.cloneDeep(columns);
            if (this.columnsCustomization && !this.availableColumns) {
                this.loadCustomizedColumnsState();
                this.createAvailableColumnsArray();
                this.updateCustomizedColumns(false);
            }
            columns = this.filterColumns(columns);

            this.columns = columns;
            this._sortableFields = _.map(_.filter(this.columns,c=>(angular.isDefined(c.header))),'field');
            if (this.sortable && !this.sortByField) this.sortByField = this._sortableFields ? this._sortableFields[0] : undefined;
            this._normalizeWidths();

            let groupables = _.filter(this.columns, c => !!c.allowGrouping)
            if (this.subRowsEnabled && groupables.length) {
                console.error('jf-table-view: Grouping is not supported with sub rows !')
                groupables.forEach(c => c.allowGrouping = false);
            }

            this.showHeaders(this.headersVisible);

            return this;
        }

        setRowHeight(height, headerHeight) {
            this.rowHeight = height;
            this.headerRowHeight = headerHeight || height;
            return this;
        }

        showHeaders(show=true) {
            this.headersVisible = show;
            this.headersRow = {}
            this.columns.forEach(column=>{
                if (column.header) this.headersRow[column.field] = column.header;
            })
            return this;
        }

        showSortDropdown(show=true) {
            this.sortDropDownVisible = show;
            return this;
        }

        setSelection(selectionMode) {
            this.selectionMode = selectionMode;
            this._normalizeWidths();
            return this;
        }

        setPaginationMode(pagiMode, externalPaginationCallback) {
            this.paginationMode = pagiMode;
            if (this.paginationMode === this.EXTERNAL_PAGINATION) {
                if (!externalPaginationCallback || typeof externalPaginationCallback !== 'function') {
                    console.error('Setting pagination mode to EXTERNAL_PAGINATION require pagination callback function as the second parameter of setPaginationMode')
                    this.paginationMode = this.PAGINATION;
                }
                this.externalPaginationCallback = externalPaginationCallback;
                this.pendingExternalPaging = true;
                if (this.dirCtrl && !this.initialExternalPaginationSent) {
                    $timeout(()=>this.sendExternalPageRequest());
                }
            }
            return this;
        }

        hasSelection() {
            return _.includes([this.SINGLE_SELECTION,this.MULTI_SELECTION],this.selectionMode);
        }

        getSelected() {
            return _.filter(this.data,{$selected: true});
        }

        getSelectedCount() {
            return this.getSelected().length;
        }

        sortBy(field,resort = false) {

            let sendExternal = false;

            if (!resort && this.sortByField === field) {
                this.revSort = !this.revSort;
                sendExternal = true;
            }
            else if (!resort) {
                this.revSort = false;
            }

            if (this.sortByField !== field) {
                sendExternal = true;
            }

            this.sortByField = field;

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

        setSortable(sortable=true) {
            this.sortable = sortable;
            if (sortable && !this.sortByField) {
                this.sortBy(this._sortableFields ? this._sortableFields[0] : undefined)
            }
            else if (!sortable) this.sortBy(undefined);
            return this;
        }

        setDefaultFilterByAll(filterByAll) {
            this.defaultFilterByAll = filterByAll;
            return this;
        }

        setActions(actions) {
            this.actions = actions;
            this._normalizeWidths();
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
                $timeout(()=>this.sendExternalPageRequest());
                this.initialExternalPaginationSent = true;
            }

        }

        _normalizeWidths() {
            
            if (!this.dirCtrl) return;
            
            let actionsWidth = 0;
            let selectionWidth = 0;
            if (this.actions) {
                actionsWidth = this.actionButtonSize * this.actions.length;
            }
            if (this.hasSelection()) {
                selectionWidth = this.selectionColumnWidth;
            }

            let totalAbs = actionsWidth + selectionWidth;
            let totalPerc = 0;
            this.columns.forEach(col=>{
                if (col.origWidth === undefined) col.origWidth = col.width;
                let width = col.origWidth;
                if (width && width.trim().endsWith('%')) {
                    totalPerc += parseFloat(width);
                }
                else if (width && width.trim().endsWith('px')) {
                    totalAbs += parseFloat(width);
                }
                else if (width === undefined) {
                    col.origWidth = col.width = 100/this.columns.length + '%';
                    totalPerc += parseFloat(col.width);
                }
            })


            $timeout(()=>{
                let containerWidth;
                if (this.data.length) {
                    containerWidth = $(this.dirCtrl.$element).find('.jf-table-row').innerWidth();
                }
                else {
                    containerWidth = $(this.dirCtrl.$element).find('.jf-table-view-container').width();
                }

                let percSpace = containerWidth - totalAbs;
//                let absPerc = (totalAbs/containerWidth)*100;
                let normalizer = (100/totalPerc);
                let totalFinalPerc = ((actionsWidth + selectionWidth)/containerWidth)*100;
                this.columns.forEach(col=>{
                    let width = col.origWidth;
                    if (width && width.trim().endsWith('%')) {
                        let origVal = parseFloat(width);
                        let newVal = normalizer*origVal*percSpace/100;
                        let newPerc = (newVal/containerWidth)*100;
                        col.width = newPerc +  '%';
                        totalFinalPerc += newPerc
                    }
                    else if (width) {
                        totalFinalPerc += 100*parseFloat(width)/containerWidth;
                    }
                })
//                console.log(totalFinalPerc);
                this.ready = true;
            })
        }

        getDisplayNameForField(field) {
            let col = _.find(this.columns,{field});
            if (col) return col.header;
        }

        setEmptyTableText(text) {
            this.emptyTableText = text;
            return this;
        }

        disableFilterTooltip() {
            this.tooltipFilterDisabled = true;
            return this;
        }

        setTheme(theme) {
            this.theme = theme;
            if (this.theme === this.OLD_GRID_THEME) {
                this.rowHeight = '40px';
                this.actionButtonSize = 40;
                this.selectionColumnWidth = 40;
            }
            this._normalizeWidths();
            return this;
        }

        getSelectedRows() {
            return _.filter(this.data,{$selected: true});
        }

        clearSelection() {
            this.dirCtrl.clearSelection();
        }

        groupBy(field) {
            this.groupedBy = this.groupedBy === field ? null : field;
            if (this.groupedBy) {
                this.setFirstColumn(field);
            }
            else {
                this.restoreColumnOrder();
            }
            this.openedGroupHeaders = [];
            this.groupedData = null;
            this.refreshGrouping();
            return this;
        }

        refreshGrouping() {
            if (this.groupedData) {
                this.openedGroupHeaders = _.filter(this.groupedData,{$groupHeader:{$expanded: true}});
            }
            delete this.groupedData;
            this.refreshSorting();
        }

        refreshFilter() {
            delete this.filterCache;
            if (this.paginationMode === this.EXTERNAL_PAGINATION) {
                this.sendExternalPageRequest();
            }
            this.refreshGrouping();
        }

        refreshSorting() {
            delete this.sortedData;
        }

        refresh() {
            this.refreshFilter();
        }

        updateGroupExpansionState(groupHeaderRow) {
            let field = groupHeaderRow.$groupHeader.field;
            let value = groupHeaderRow.$groupHeader.value;
            let toRemove = _.filter(this.groupedData,row=>{
                return !row.$groupHeader && _.get(row,field) == value
            });
            this.groupedData = _.difference(this.groupedData,toRemove);

            if (groupHeaderRow.$groupHeader.$expanded) {
                let index = _.indexOf(this.groupedData,groupHeaderRow);
                Array.prototype.splice.apply(this.groupedData, [index+1, 0].concat(this.fullGroupedData[value]));
            }
            this.update(false,true);
        }

        setFirstColumn(field) {
            this.restoreColumnOrder();
            let column = _.find(this.columns,{field});
            let index = this.columns.indexOf(column);
            column.$originalIndex = index;
            this.columns.splice(index,1);
            this.columns.splice(0,0,column);
        }



        restoreColumnOrder() {
            let originalIndex = this.columns[0] && this.columns[0].$originalIndex;
            if (originalIndex) {
                let temp = this.columns[0];
                this.columns.splice(0,1);
                this.columns.splice(originalIndex,0 , temp);
            }
        }


        getPageData() {
            if (this.paginationMode === this.PAGINATION) {
                return this.getPrePagedData().slice(this.dirCtrl.currentPage * this.rowsPerPage, this.dirCtrl.currentPage * this.rowsPerPage + this.rowsPerPage)
            }
            else if (this.paginationMode === this.VIRTUAL_SCROLL) {
                return this.getPrePagedData().slice(this.dirCtrl.virtualScrollIndex,this.dirCtrl.virtualScrollIndex + this.rowsPerPage)
            }
            else if (this.paginationMode === this.EXTERNAL_PAGINATION) {
                return this.getRawData();
            }
        }

        sendExternalPageRequest() {
            if (!this.dirCtrl || _.isUndefined(this.dirCtrl.currentPage)) return;
            let promise = this.externalPaginationCallback({
                pageNum: this.dirCtrl.currentPage,
                numOfRows: this.rowsPerPage,
                direction: !this.sortByField ? null : this.revSort ? 'desc' : 'asc',
                orderBy: this.sortByField,
                filter: this.dirCtrl.tableFilter || null,
                filterBy: _.map(this.getFilterables(),'field')
            })
            if (!promise || !promise.then) {
                console.error('External pagination callback should return promise')
            }
            else {
                this.pendingExternalPaging = true;
                promise.then(pagedData => {
                    this.setData(pagedData.data, '$$internal$$');
                    this.externalTotalCount = {total: pagedData.totalCount, filtered: pagedData.filteredCount};
                    this.pendingExternalPaging = false;
                    this.dirCtrl.noFilterResults = this.externalTotalCount.filtered === 0 && this.externalTotalCount.total > 0
                })
            }
        }

        getTotalLengthOfData() {
            if (this.paginationMode === this.EXTERNAL_PAGINATION) {
                return this.externalTotalCount ? this.externalTotalCount.filtered || 0 : 0;
            }
            else return this.getPrePagedData().length
        }

        getFilterables() {
            let filterables;
            if (this.defaultFilterByAll) {
                filterables = _.filter(this.columns, col=>col.filterable !== false);
            }
            else {
                filterables = _.filter(this.columns, col=>col.filterable === true);
            }
            return filterables;
        }

        getFilterTooltip() {
            if (!this.columns || !this.columns.length) return '';
            else {
                let filterables = this.getFilterables();
                if (filterables.length === this.columns.length) {
                    return 'Filter by any column'
                }
                else {
                    return 'Filter by ' + _.map(filterables,c=>c.header || _.startCase(c.field)).join(', ');
                }

            }
        }

        _reorderStickies(data) {
            let stickies = _.filter(data, i => i.$sticky);
            stickies.forEach(sticky => {
                data.splice(data.indexOf(sticky), 1);
            })
            Array.prototype.splice.apply(data, [0, 0].concat(stickies));
        }

        _saveAndRemoveSubRows(data) {
            if (!this.subRowsEnabled) return data;
            this.savedSubRowsParents = _.filter(data, d => d.$subRows && d.$expanded)
            return _.filter(data, d => !d.$parentRow)
        }

        _reInsertSubRows(data) {
            if (!this.subRowsEnabled) return data;
            let newData = [].concat(data);
            if (this.savedSubRowsParents) {
                this.savedSubRowsParents.forEach(parent => {
                    this._addSubRows(parent, newData)
                })
            }
            return newData;
        }

        getPrePagedData() {
            return this.getSortedData(this.getGroupedData(this.getFilteredData(this.getRawData())));
        }

        getSortedData(sourceData) {

            if (this.paginationMode === this.EXTERNAL_PAGINATION || !this.sortByField) {
                return sourceData;
            }
            else {
                if (!this.sortedData) {
                    sourceData = this._saveAndRemoveSubRows(sourceData);
                    let colObj = _.find(this.columns,{field: this.sortByField});
                    if (colObj.sortingAlgorithm) {
                        if (this.groupedData) {
                            if (this.groupedBy === this.sortByField) {
                                this.sortedData = sourceData.sort((a,b) => {
                                    if (a.$groupHeader && !b.$groupHeader && a.$groupHeader.field === this.sortByField && a.$groupHeader.value === _.get(b,this.sortByField)) return -1;
                                    else if (!a.$groupHeader && b.$groupHeader && b.$groupHeader.field === this.sortByField && b.$groupHeader.value === _.get(a,this.sortByField)) return 1;
                                    else {
                                        let valA = a.$groupHeader ? a.$groupHeader.value : _.get(a,this.sortByField);
                                        let valB = b.$groupHeader ? b.$groupHeader.value : _.get(b,this.sortByField);
                                        return (this.revSort ? -1 : 1)*colObj.sortingAlgorithm(valA,valB,a,b,colObj);
                                    }
                                });
                            }
                            else {
                                for (let key in this.fullGroupedData) {
                                    let groupData = this.fullGroupedData[key];
                                    groupData.sort((a,b)=>{
                                        let valA = _.get(a,this.sortByField);
                                        let valB = _.get(b,this.sortByField);
                                        return (this.revSort ? -1 : 1)*colObj.sortingAlgorithm(valA,valB,a,b,colObj);
                                    });
                                }
                                this.groupedData.forEach(row=>{
                                    if (row.$groupHeader) this.updateGroupExpansionState(row);
                                });
                                this.sortedData = sourceData;
                            }

                        }
                        else {
                            this.sortedData = sourceData.sort((a,b) => {
                                return (this.revSort ? -1 : 1)*colObj.sortingAlgorithm(_.get(a,this.sortByField),_.get(b,this.sortByField),a,b,colObj);
                            });
                        }
                    }
                    else {
                        if (colObj.sortBy) {
                            if (this.groupedData) {
                                if (this.groupedBy === this.sortByField) {
                                    this.sortedData = _.sortBy(sourceData, (row) => {
                                        return (this.revSort ? -1 : 1) * colObj.sortBy(row.$groupHeader.value, row);
                                    });
                                }
                                else {
                                    for (let key in this.fullGroupedData) {
                                        this.fullGroupedData[key] = _.sortBy(this.fullGroupedData[key], (row) => {
                                            return (this.revSort ? -1 : 1) * colObj.sortBy(_.get(row,this.sortByField), row);
                                        });
                                    }
                                    this.groupedData.forEach(row=>{
                                        if (row.$groupHeader) this.updateGroupExpansionState(row);
                                    });
                                    this.sortedData = sourceData;
                                }
                            }
                            else {
                                this.sortedData = _.sortBy(sourceData, (row) => {
                                    return (this.revSort ? -1 : 1) * colObj.sortBy(_.get(row,this.sortByField), row);
                                });
                            }
                        }
                        else {
                            if (this.groupedData) {
                                if (this.groupedBy === this.sortByField) {
                                    this.sortedData = sourceData.sort((a,b)=>{
                                        if (a.$groupHeader && !b.$groupHeader && a.$groupHeader.field === this.sortByField && a.$groupHeader.value === _.get(b,this.sortByField)) return -1;
                                        else if (!a.$groupHeader && b.$groupHeader && b.$groupHeader.field === this.sortByField && b.$groupHeader.value === _.get(a,this.sortByField)) return 1;
                                        else {
                                            let valA = a.$groupHeader ? a.$groupHeader.value : _.get(a,this.sortByField);
                                            let valB= b.$groupHeader ? b.$groupHeader.value : _.get(b,this.sortByField);
                                            return (this.revSort ? -1 : 1)*(valA>valB?1:(valA<valB?-1:0));
                                        }
                                    });
                                }
                                else {
                                    for (let key in this.fullGroupedData) {
                                        let groupData = this.fullGroupedData[key];
                                        groupData.sort((a,b)=>{
                                            let valA = _.get(a,this.sortByField);
                                            let valB = _.get(b,this.sortByField);
                                            return (this.revSort ? -1 : 1)*(valA>valB?1:(valA<valB?-1:0));
                                        });
                                    }
                                    this.groupedData.forEach(row=>{
                                        if (row.$groupHeader) this.updateGroupExpansionState(row);
                                    });
                                    this.sortedData = sourceData;
                                }
                            }
                            else {
                                this.sortedData = _.sortByOrder(sourceData, item => {
                                    let val = _.get(item, this.sortByField);
                                    return val;
                                }, !this.revSort);
                            }
                        }
                    }
                    this.sortedData = this._reInsertSubRows(this.sortedData);
                    this._reorderStickies(this.sortedData);
                }
                return this.sortedData;
            }
        }

        getGroupedData(sourceData) {
            if (this.paginationMode === this.EXTERNAL_PAGINATION || !this.groupedBy) {
                return sourceData;
            }
            else {
                if (!this.groupedData) {
                    this.setFirstColumn(this.groupedBy);
                    this.fullGroupedData = _.groupBy(sourceData,this.groupedBy);
                    let tempData = [];
                    let column = _.find(this.columns,{field: this.groupedBy});
                    for (let key in this.fullGroupedData) {
                        let data = this.fullGroupedData[key];
                        tempData.push({$groupHeader : {field: this.groupedBy, value: _.get(data[0],this.groupedBy), col: column, count: data.length}})
                    }
                    this.groupedData = tempData;

                    // reopen previously opened group headers
                    this.openedGroupHeaders.forEach(wasOpened => {
                        let toBeOpened = _.find(this.groupedData,{$groupHeader:{value: wasOpened.$groupHeader.value}});
                        if (toBeOpened) {
                            toBeOpened.$groupHeader.$expanded = true;
                            this.updateGroupExpansionState(toBeOpened);
                        }
                    })
                }
                return this.groupedData;
            }
        }

        getFilteredData(sourceData) {

            sourceData = sourceData || this.getRawData();

            if (this.paginationMode === this.EXTERNAL_PAGINATION) {
                return sourceData || [];
            }

            if (!this.dirCtrl.tableFilter) {
                this.dirCtrl.noFilterResults = false;
                return sourceData || [];
            }
            if (!this.filterCache) this.filterCache = _.filter(sourceData,(row=>{
                for (let i in this.columns) {
                    let col = this.columns[i];
                    if ((this.defaultFilterByAll && col.filterable !== false) || (!this.defaultFilterByAll && col.filterable === true)) {
                        if (row.$sticky || this._isSubVisible(row, col) || row.$groupHeader || (_.get(row,col.field) && _.contains(_.get(row,col.field).toString().toLowerCase(), this.dirCtrl.tableFilter.toLowerCase()))) {
                            return true;
                        }
                    }
                }
                return false;
            }))
            this.dirCtrl.noFilterResults = !!(!this.filterCache.length && sourceData.length);
            return this.filterCache;
        }

        _isSubVisible(row, col) {
            if (!this.subRowsEnabled) return false;
            let subsVisible = false;
            if (row.$expandable) {
                for (let i = 0; i < row.$subRows.length; i++) {
                    let subRow = row.$subRows[i];
                    if ((this.defaultFilterByAll && col.filterable !== false) || (!this.defaultFilterByAll && col.filterable === true)) {
                        if ((_.get(subRow,col.field) && _.contains(_.get(subRow,col.field).toString().toLowerCase(), this.dirCtrl.tableFilter.toLowerCase()))) {
                            subsVisible = true;
                            break;
                        }
                    }
                }
            }
            return subsVisible;
        }

        getRawData() {
            return this.data;
        }
        
        allowColumnsCustomization() {
            this.columnsCustomization = true;
            this.loadCustomizedColumnsState();
            this.createAvailableColumnsArray();
            this.updateCustomizedColumns();
            return this;
        }

        createAvailableColumnsArray() {
            if (!this.origColumnDefs) return;
            this.availableColumns = [];
            this.origColumnDefs.forEach(colDef=>{
                let item = {
                    id: colDef.field,
                    text: colDef.header || _.startCase(colDef.field),
                    isSelected: ((!this.visibleFields && !colDef.optional) || (this.visibleFields && this.visibleFields.indexOf(colDef.field) !== -1))
                };
                this.availableColumns.push(item);
            })
        }

        refreshColumns() {
            if (this.origColumnDefs) {
                this.setColumns(_.cloneDeep(this.origColumnDefs))
            }
        }

        updateCustomizedColumns(refresh = true) {
            if (!this.availableColumns) return;
            this.visibleFields = _.map(_.filter(this.availableColumns, col=>col.isSelected),'id');
            this.saveCustomizedColumnsState();
            if (refresh) this.refreshColumns();
        }

        setId(id) {
            this.tableId = id;
            return this;
        }

        saveCustomizedColumnsState() {
            if (!this.tableId) return;
            if (!localStorage.jfTableViewSettings) {
                localStorage.jfTableViewSettings = JSON.stringify({
                    [this.tableId]: this.visibleFields
                })
            }
            else {
                let settings = JSON.parse(localStorage.jfTableViewSettings);
                settings[this.tableId] = this.visibleFields;
                localStorage.jfTableViewSettings = JSON.stringify(settings);
            }
        }

        loadCustomizedColumnsState() {
            if (!this.tableId) return;
            let settings = localStorage.jfTableViewSettings;
            if (settings) {
                settings = JSON.parse(settings);
                let mySetting = settings[this.tableId];
                this.visibleFields = mySetting;
            }
        }

        setKey(key) {
            if (typeof key === 'function') {
                this.keyFn = (row) => {
                    return key(row);
                }
            }
            else {
                this.keyFn = (row) => {
                    return row[key];
                }
            }
            return this;
        }

        updateData(data) {
            if (!this.data || !this.data.length) {
                this.setData(data);
            }
            else if (!this.keyFn) throw new Error('Cannot update data, no key was defined. (use setKey(key|keyFn))');
            else {
                data.forEach((row) => {
                    let exists = _.find(this.data, (r)=>{
                        return this.keyFn(r) === this.keyFn(row);
                    });
                    if (exists) {
                        for (let key in exists) {
                            if (!key.startsWith('$')) {
                                exists[key] = row[key];
                            }
                        }
                        if (row.$subRows) {
                            row.$subRows.forEach((subRow)=>{
                                let existsSub = _.find(exists.$subRows, (r)=>{
                                    return this.keyFn(r) === this.keyFn(subRow);
                                });
                                if (existsSub) {
                                    for (let subKey in existsSub) {
                                        if (!subKey.startsWith('$')) {
                                            existsSub[subKey] = subRow[subKey];
                                        }
                                    }
                                }

                            });
                        }
                    }
                });
//                this.update();
            }
        }

        isOverflowing(cellId) {

            let elem = $(this.dirCtrl.$element).find('#'+cellId);
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

        showAll(model,rowName,col) {
            let objectName = _.startCase(this.objectName.indexOf('/')>=0 ? this.objectName.split('/')[0] : this.objectName);

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

    };
}