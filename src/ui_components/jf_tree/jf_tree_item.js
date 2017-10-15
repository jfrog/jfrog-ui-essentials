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
        this.tree.api._setSelected(this.data);
        this.tree.api.fire('item.clicked', this.data.data);
    }

    isExpanded() {
        return this.tree.api.isNodeOpen(this.data.data);
    }

    toggleExpansion() {
        if (this.isExpanded()) {
            this.tree.api.closeNode(this.data.data);
        }
        else {
            let node = this.data;
            node.$pending = true;
            this.tree.api.openNode(node.data).then(() => {
                node.$pending = false;
            });
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