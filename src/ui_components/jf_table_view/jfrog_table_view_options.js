export function JFrogTableViewOptions($timeout) {
    return class JFrogTableViewOptions {
        constructor() {
            this.rowHeight = '80px';
        }

        setColumns(columns) {
            this.columns = columns;
            this._normalizeWidths();
        }

        setRowHeight(height) {
            this.rowHeight = height;
        }

        setDirectiveController(ctrl) {
            this.dirCtrl = ctrl;
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
                let containerWidth = $(this.dirCtrl.$element.find('.jf-table-view-container')).width() - 4;
                let percSpace = containerWidth - totalAbs;
                let absPerc = (totalAbs/containerWidth)*100;
                let normalizer = (100/totalPerc);
                this.columns.forEach(col=>{
                    let width = col.width;
                    if (width.trim().endsWith('%')) {
                        let origVal = parseFloat(width);
                        let newVal = normalizer*origVal*(percSpace-absPerc)/100;
                        col.width = newVal + 'px';
                    }
                    else if (width.trim().endsWith('px')) {
/*
                        let origVal = parseFloat(width);
                        let newVal = (origVal/percSpace)*100;
                        col.width = newVal + 'px';
*/
                    }
                })
            })
        }
    }

}