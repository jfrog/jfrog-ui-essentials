class jfTreeItemController {
	/* @ngInject */
    constructor($scope, $element, $timeout, AdvancedStringMatch) {
        this.$element = $element;
        this.$timeout = $timeout;
        this.asm = AdvancedStringMatch;

        $(this.$element).prop('ctrl', this);
    }

    _getTreeContainer() {
        return $(this.tree.$element).find('.jf-tree-container');
    }

    onItemClick() {
        if (this.data.data === this.tree.api.GO_UP_NODE) {
            this.tree.api.drillUp();
        }
        else {
            this.tree.api._setSelected(this.data);
            this.tree.api.fire('item.clicked', this.data.data);
        }
    }

    onItemDoubleClick() {
        this.tree.api.fire('item.dblClicked', this.data.data);
    }

    isExpanded() {
        return this.tree.viewPane.isNodeOpen(this.data.data);
    }

    toggleExpansion() {

        if (this.isExpanded()) {
            this.tree.api.closeNode(this.data.data);
        }
        else {
            let node = this.data;
            this.tree.api.openNode(node.data);
        }
    }

    isQuickFindMatch() {
        let elem = $(this.$element).find('.jf-tree-item-content .node-text');
        if (elem.length) {
            let text = elem.text();
            elem.unhighlight();
            if (text && this.tree.api.quickFindTerm) {
                let asmResponse = this.asm.match(text, this.tree.api.quickFindTerm);
                if (asmResponse.matched) {
                    this.asm.highlight(elem, asmResponse.segments);
                }
                return asmResponse.matched;
            }
            else return false;
        }
    }

    getCustomClasses() {
        if (this.data.data === this.tree.api.GO_UP_NODE || !this.tree.api.classGetter) return [];
        else {
            let classes = this.tree.api.classGetter(this.data.data);
            if (!classes) classes = [];
            else if (!_.isArray(classes)) classes = [classes];
            return classes;
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