export function JFrogTableViewOptions($timeout) {
    return class JFrogTableViewOptions {
        constructor(appScope) {
            this._setDefaults();
            this.data = [];
            this.appScope = appScope;
        }

        _setDefaults() {
            this.rowHeight = '60px';
            this.rowsPerPage = 25;
        }

        setData(data) {
            this.data = data;
            if (this.dirCtrl) {
                this.dirCtrl.data = data;
                this.dirCtrl.refresh();
            }
        }

        setRowsPerPage(rpp) {
            this.rowsPerPage = rpp;
        }

        update() {
            if (this.dirCtrl) {
                this.dirCtrl.data = this.data;
                this.dirCtrl.refresh();
            }
        }

        setNewEntityAction(newEntityCallback) {
            this.newEntityCallback = newEntityCallback;
        }

        setColumns(columns) {
            this.columns = columns;
            this.numTemplates = _.filter(this.columns,col=>col.cellTemplate  !== undefined).length;
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

        _setDirectiveController(ctrl) {
            this.dirCtrl = ctrl;
            ctrl.data = this.data;
        }

        _normalizeWidths() {
            let totalAbs = 0;
            let totalPerc = 0;
            this.columns.forEach(col=>{
                let width = col.width;
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
                let absPerc = (totalAbs/containerWidth)*100;
                let normalizer = (100/totalPerc);
                this.columns.forEach(col=>{
                    let width = col.width;
                    if (width.trim().endsWith('%')) {
                        let origVal = parseFloat(width);
                        let newVal = normalizer*origVal*(percSpace-absPerc)/100;
                        let newPerc = Math.floor((newVal/containerWidth)*100);
                        col.width = newPerc + '%';
                    }
                })
                this.ready = true;
            })
        }
    }

}