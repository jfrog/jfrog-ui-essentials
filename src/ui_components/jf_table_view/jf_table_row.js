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
                if (!this.data.$selected) {
                    this.tableView.allSelected = false;
                    if (this.tableView.options.groupedBy) {
                        let groupHeader = _.find(this.tableView.options.getData(),{$groupHeader:{value: _.get(this.data,this.tableView.options.groupedBy)}})
                        if (groupHeader) groupHeader.$selected = false;
                    }
                }
                if (this.data.$groupHeader) this.tableView.groupSelection(this.data);
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

    toggleGroupExpansion() {
        this.data.$groupHeader.$expanded = !this.data.$groupHeader.$expanded;
        this.tableView.options.updateGroupExpansionState(this.data);
    }

    fireAction(action) {
        action.callback(this.data);
        this.tableView.onUpdateFilter()
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