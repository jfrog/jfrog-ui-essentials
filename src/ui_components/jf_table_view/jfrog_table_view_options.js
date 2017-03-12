export function JFrogTableViewOptions($timeout) {
    return class JFrogTableViewOptions {
        constructor() {
            this.rowHeight = '60px';

            this.data = [];
        }

        setData(data) {
            this.data = data;
            if (this.dirCtrl) this.dirCtrl.data = data;
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