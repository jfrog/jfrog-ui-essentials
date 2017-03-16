export function JFrogTableViewOptions($timeout) {
    return class JFrogTableViewOptions {
        constructor(appScope) {
            this._setDefaults();
            this.data = [];
            this.actions = [];
            this.columns = [];
            this.appScope = appScope;

            this.NO_SELECTION = 0;
            this.SINGLE_SELECTION = 1;
            this.MULTI_SELECTION = 2;
        }

        _setDefaults() {
            this.rowHeight = '60px';
            this.rowsPerPage = 25;
            this.sortable = true;
            this.selectionMode = this.NO_SELECTION;
            this.actionButtonSize = 60; //px
            this.selectionColumnWidth = 60; //px
        }

        setData(data) {
            this.data = data;
            this.origData = _.sortBy(data,'');
            this.update();
        }

        setRowsPerPage(rpp) {
            this.rowsPerPage = rpp;
        }

        update(noSort=false) {
            if (this.dirCtrl) {
                this.dirCtrl.data = this.data;
                this.origData = _.sortBy(data,'');
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

        setSelection(selectionMode) {
            this.selectionMode = selectionMode;
            this._normalizeWidths();
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
            if (field) {
                let temp = this.data;
                temp = _.sortBy(temp,(row)=>this.revSort ? -_.get(row,field) : _.get(row,field));
                Array.prototype.splice.apply(this.data, [0,this.data.length].concat(temp));
            }
            else {
                Array.prototype.splice.apply(this.data, [0,this.data.length].concat(this.origData));
            }
            if (!resort && this.dirCtrl) delete this.dirCtrl.filterCache;
            this.update(true);
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

    }

}