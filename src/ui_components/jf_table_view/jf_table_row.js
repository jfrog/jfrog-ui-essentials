class jfTableRowController {
    constructor() {
    }
    getField(field) {
        return _.get(this.data,field);
    }
    kebab(str) {
        return _.kebabCase(str);
    }
    toggleSelection(all) {
        if (!all) {
            if (this.tableView.options.selectionMode === this.tableView.options.MULTI_SELECTION) {
                this.data.$selected = !this.data.$selected;
                if (!this.data.$selected) this.tableView.allSelected = false;
            }
            else if (this.tableView.options.selectionMode === this.tableView.options.SINGLE_SELECTION) {
                this.tableView.clearSelection();
                this.data.$selected = true;
            }
        }
        else {
            this.tableView.toggleSelectAll();
        }
    }
}

export function jfTableRow() {
    return {
        controller: jfTableRowController,
        controllerAs: 'jfTableRow',
        bindToController: true,
        replace: true,
        scope: {
            data: '=',
            rowId: '=',
            tableView: '='
        },
        templateUrl: 'ui_components/jf_table_view/jf_table_row.html'
    }
}