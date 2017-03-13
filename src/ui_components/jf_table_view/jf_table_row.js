class jfTableRowController {
    constructor() {
    }
    getField(field) {
        return _.get(this.data,field);
    }
    kebab(str) {
        return _.kebabCase(str);
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