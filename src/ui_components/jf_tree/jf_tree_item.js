class jfTreeItemController {
	/* @ngInject */
    constructor($scope, $element, $timeout) {
        this.$element = $element;
        this.$timeout = $timeout;

        $(this.$element).prop('ctrl', this);
    }

    _getTreeContainer() {
        return $(this.tree.$element).find('.jf-tree-container');
    }

    onItemClick() {

    }

    isExpanded() {
        return this.tree.api.isNodeOpen(this.data.data);
    }

    toggleExpansion() {
        if (this.isExpanded()) {
            this.tree.api.closeNode(this.data.data);
        }
        else {
            this.tree.api.openNode(this.data.data);
        }
    }
}

export function jfTreeItem() {
    return {
        controller: jfTreeItemController,
        controllerAs: 'jfTreeItem',
        bindToController: true,
        replace: true,
        scope: {
            data: '=',
            itemId: '=',
            tree: '='
        },
        templateUrl: 'ui_components/jf_tree/jf_tree_item.html'
    }
}