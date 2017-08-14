class jfMultiDropdownController {
	/* @ngInject */
    constructor($scope, $filter, $element) {

        this.$scope = $scope;
        this.$element = $element;

        this.filter = $filter('filter');
        this.opened = false;

        this.handleOutsideClick();

        this.$scope.$watch('jfMultiDropdown.items', (newVal, oldVal) => {
            if (newVal) {
                this.sortItems();
            }
        });
        this.$scope.$watch('jfMultiDropdown.dropdownOpened', (val) => {
            if (val === true) {
                if (!this.items) return;
                this.opened = true;
                this.filterText = '';
            }
            else if (val === false) {
                this.opened = false;
                this.filterText = '';
            }
            else {

            }
        });

    }

    sendOpenStateChange() {
        if (this.onOpenStateChange) this.onOpenStateChange({opened:this.opened});
    }

    handleOutsideClick() {
        let handler = (e) => {
            let outside = !$(e.target).parents('.jf-multi-dropdown').length || $(e.target).parents('.jf-multi-dropdown')[0] !== $(this.$element).find('.jf-multi-dropdown')[0];
            if (outside) {
                this.opened = false;
                this.sendOpenStateChange();
                this.sortItems();
            }
            this.$scope.$apply();
        };
        $(document).on('click',handler);
        this.$scope.$on('$destroy',() => {
            $(document).off('click', handler)
        })
    }

    onClick() {
        if (this.disabled !== true) {
            if (!this.items) return;
            this.opened = !this.opened;
            this.sendOpenStateChange();
            if (!this.opened) this.sortItems();
            this.filterText = '';

        }

    }
    onSelection() {
        if (this.onChange) this.onChange();
    }
    getSelectedCount() {
        let selected = _.filter(this.items, (item) => item.isSelected);
        return selected.length;
    }

    selectedItems() {
        let selected = _.filter(this.items, (item) => item.isSelected);
        selected = _.map(selected, 'text');
        return selected;
    }

    sortItems() {
        if (!this.items) return;
        let selected = _.sortBy(_.filter(this.items, (item) => item.isSelected), 'text');
        let unSelected = _.sortBy(_.filter(this.items, (item) => !item.isSelected), 'text');
        this.lastSelectedIndex = selected.length-1;
        let combined = selected.concat(unSelected);
        this.items.splice.apply(this.items, [0,this.items.length].concat(combined));
    }
    selectAll() {
        this.filter(this.items, this.filterText).forEach((item)=>{item.isSelected = true;});
        this.onSelection();
    }
    unSelectAll() {
        this.filter(this.items, this.filterText).forEach((item)=>{item.isSelected = false;})
	    this.onSelection();
    }

}

export function jfMultiDropdown() {
    return {
        controller: jfMultiDropdownController,
        controllerAs: 'jfMultiDropdown',
        bindToController: true,
        scope: {
            title: '@',
	        label: '@',
            filterPlaceholder: '@',
            noItemsMessage: '@',
            items: '=',
            disabled: '=?',
            onChange: '&?',
            onOpenStateChange: '&?',
            dropdownOpened: '=',
            showSelected: '@',
	        showLabelCounter: '@',
            noFilter: '=?'
        },
        templateUrl: 'directives/jf_multi_dropdown/jf_multi_dropdown.html'
    }
}