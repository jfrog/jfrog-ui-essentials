class jfTableCompiledCellController {
    constructor($element,$timeout,$scope) {
        this.$element = $element;
        this.$timeout = $timeout;

        $scope.$watch('compiledCell.tableRow.data',()=>{
            this.compile()
        });
    }

    compile() {
        let elem = $(this.$element).find(`.compile-this`);
        this.tableRow.tableView.compileTemplate(elem,this.field,this.rowId);
    }
}

export function jfTableCompiledCell() {
    return {
        controller: jfTableCompiledCellController,
        controllerAs: 'compiledCell',
        bindToController: true,
        scope: {
            field: '=',
            rowId: '=',
            tableRow: '=',
        },
        template: `<div class="compile-this"></div>`
    }
}