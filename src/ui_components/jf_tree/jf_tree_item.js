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

    hasChildren() {
        let children = this.tree.api.childrenGetter(this.data.data);
        return !!(children && children.length);
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