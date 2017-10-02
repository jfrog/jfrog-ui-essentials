class jfTreeCompiledCellController {
	/* @ngInject */
    constructor($element,$timeout,$scope) {
        this.$element = $element;
        this.$timeout = $timeout;

        $scope.$watch('compiledCell.treeItem.data',() => {
            this.compile()
        });
    }

    compile() {
        let elem = $(this.$element).find(`.compile-this`);
        this.treeItem.tree.compileTemplate(elem, this.itemId);
    }
}

export function jfTreeCompiledCell() {
    return {
        controller: jfTreeCompiledCellController,
        controllerAs: 'compiledCell',
        bindToController: true,
        scope: {
            itemId: '=',
            treeItem: '=',
        },
        template: `<div class="compile-this"></div>`
    }
}