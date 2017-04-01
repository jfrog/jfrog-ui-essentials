export function JFrogTableViewOptions($timeout) {
    return class JFrogTableViewOptions {
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

            // Themes
            this.DEFAULT_THEME = 0;
            this.OLD_GRID_THEME = 1;

            this._setDefaults();
        }

        _setDefaults() {
            this.rowHeight = '60px';
            this.rowsPerPage = 25;
            this.sortable = true;
            this.selectionMode = this.NO_SELECTION;
            this.paginationMode = this.PAGINATION;
            this.actionButtonSize = 60; //px
            this.selectionColumnWidth = 60; //px
            this.theme = this.DEFAULT_THEME;
            this.sortDropDownVisible = true;
        }

        setData(data) {
            this.data = data;
            this.origData = _.sortBy(data,'');
            this.update();
        }
        

        setRowsPerPage(rpp) {
            this.rowsPerPage = rpp;
        }

        update(noSort=false, noGrouping=false) {
//            console.log('update',noSort,noGrouping)
            if (this.dirCtrl) {
                if (!noGrouping) this.refreshGrouping();
                this.origData = _.sortBy(this.data,'');
                if (!noSort) this.sortBy(this.sortByField,true);
                else this.dirCtrl.refresh();
            }
        }

        setNewEntityAction(newEntityCallback) {
            this.newEntityCallback = newEntityCallback;
        }

        setColumns(columns) {
            this.columns = columns;
            this._sortableFields = _.map(_.filter(this.columns,c=>(angular.isDefined(c.header))),'field');
            if (this.sortable && !this.sortByField) this.sortByField = this._sortableFields ? this._sortableFields[0] : undefined;
            this._normalizeWidths();
        }

        setRowHeight(height) {
            this.rowHeight = height;
        }

        showHeaders(show=true) {
            this.headersVisible = show;
            this.headersRow = {}
            this.columns.forEach(column=>{
                if (column.header) this.headersRow[column.field] = column.header;
            })
        }

        showSortDropdown(show=true) {
            this.sortDropDownVisible = show;
        }

        setSelection(selectionMode) {
            this.selectionMode = selectionMode;
            this._normalizeWidths();
        }

        setPaginationMode(pagiMode) {
            this.paginationMode = pagiMode;
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
            if (!resort && this.sortByField === field) {
                this.revSort = !this.revSort;
            }
            else if (!resort) {
                this.revSort = false;
            }
            this.sortByField = field;

            this.refreshSorting();
        }

        reverseSortingDir() {
            this.sortBy(this.sortByField);
        }

        setSortable(sortable=true) {
            this.sortable = sortable;
            if (sortable && !this.sortByField) {
                this.sortBy(this._sortableFields ? this._sortableFields[0] : undefined)
            }
            else if (!sortable) this.sortBy(undefined);
        }

        setActions(actions) {
            this.actions = actions;
            this._normalizeWidths();
        }

        setBatchActions(batchActions) {
            this.batchActions = batchActions;
            this.setSelection(this.MULTI_SELECTION);
        }

        _setDirectiveController(ctrl) {
            this.dirCtrl = ctrl;
            this.update();
        }

        _normalizeWidths() {

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
                if (width.trim().endsWith('%')) {
                    totalPerc += parseFloat(width);
                }
                else if (width.trim().endsWith('px')) {
                    totalAbs += parseFloat(width);
                }
            })


            $timeout(()=>{
                let containerWidth;
                if (this.data.length) {
                    containerWidth = $(this.dirCtrl.$element.find('.jf-table-row')).innerWidth();
                }
                else {
                    containerWidth = $(this.dirCtrl.$element.find('.jf-table-view-container')).width();
                }

                let percSpace = containerWidth - totalAbs;
//                let absPerc = (totalAbs/containerWidth)*100;
                let normalizer = (100/totalPerc);
                let totalFinalPerc = ((actionsWidth + selectionWidth)/containerWidth)*100;
                this.columns.forEach(col=>{
                    let width = col.origWidth;
                    if (width.trim().endsWith('%')) {
                        let origVal = parseFloat(width);
                        let newVal = normalizer*origVal*percSpace/100;
                        let newPerc = (newVal/containerWidth)*100;
                        col.width = newPerc +  '%';
                        totalFinalPerc += newPerc
                    }
                    else {
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
        }

        setTheme(theme) {
            this.theme = theme;
            if (this.theme === this.OLD_GRID_THEME) {
                this.rowHeight = '40px';
                this.actionButtonSize = 40;
                this.selectionColumnWidth = 40;
            }
            this._normalizeWidths();
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
        }

        getPrePagedData() {
            return this.getSortedData(this.getGroupedData(this.getFilteredData(this.getRawData())));
        }

        getSortedData(sourceData) {

            if (!this.sortByField) {
                return sourceData;
            }
            else {
                if (!this.sortedData) {
                    let colObj = _.find(this.columns,{field: this.sortByField});
                    if (colObj.sortingAlgorithm) {
                        this.sortedData = this.data.sort((a,b) => {
                            return (this.revSort ? -1 : 1)*colObj.sortingAlgorithm(_.get(a,this.sortByField),_.get(b,this.sortByField),a,b,colObj);
                        });
                    }
                    else {
                        if (colObj.sortBy) {
                            this.sortedData = _.sortBy(sourceData,(row)=>(this.revSort ? -1 : 1)*colObj.sortBy(_.get(row,this.sortByField),row));
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
                                this.sortedData = sourceData.sort((a,b)=>{
                                    let valA = _.get(a,this.sortByField);
                                    let valB = _.get(b,this.sortByField);
                                    return (this.revSort ? -1 : 1)*(valA>valB?1:(valA<valB?-1:0));
                                });
                            }
                        }
                    }
                }
                return this.sortedData;
            }
        }

        getGroupedData(sourceData) {
            if (!this.groupedBy) {
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
            if (!this.dirCtrl.tableFilter) {
                this.dirCtrl.noFilterResults = false;
                return sourceData || [];
            }
            if (!this.filterCache) this.filterCache = _.filter(sourceData,(row=>{
                for (let i in this.columns) {
                    let col = this.columns[i];
                    if (row.$groupHeader || (_.get(row,col.field) && _.contains(_.get(row,col.field).toString().toLowerCase(), this.dirCtrl.tableFilter.toLowerCase()))) return true;
                }
                return false;
            }))
            this.dirCtrl.noFilterResults = !!(!this.filterCache.length && sourceData.length);
            return this.filterCache;
        }

        getRawData() {
            return this.data;
        }




    }

}