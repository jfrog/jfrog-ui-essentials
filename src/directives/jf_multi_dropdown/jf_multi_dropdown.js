class jfMultiDropdownController {
	/* @ngInject */
	constructor($scope, $filter, $element) {

		this.$scope = $scope;
		this.$element = $element;

		this.filter = $filter('filter');
		this.opened = false;

		this.singleSelectionIndex = -1;

		this.handleOutsideClick();

		this.$scope.$watch('jfMultiDropdown.items', (newVal, oldVal) => {
			if (newVal) {
				this.sortItems();
				if (this.singleSelection) {
					this.items.forEach((item, index) => item.$id = index);
					let disabled = _.filter(this.items, item => item.disabled);
					disabled.forEach(item => item.isSelected = false);
					let selected = _.filter(this.items, item => item.isSelected);
					if (selected.length > 1) {
						selected.slice(1).forEach(item => item.isSelected = false);
					}
					if (selected.length) {
						this.singleSelectionIndex = selected[0].$id;
					}
				}
			}
		});
		this.$scope.$watch('jfMultiDropdown.dropdownOpened', (val) => {
			if (val === true) {
				if (!this.items) {
					return;
				}
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

		this.isAllSelected = false;
		this.showSelectAllCheckbox = this.items && this.items.length && this.enableSelectAllCheckbox && !this.singleSelection;

	}

	sendOpenStateChange() {
		if (this.onOpenStateChange) {
			this.onOpenStateChange({opened: this.opened});
		}
	}

	handleOutsideClick() {
		let handler = (e) => {
			let outside = !$(e.target).parents('.jf-multi-dropdown').length || $(e.target).parents(
				'.jf-multi-dropdown')[0] !== $(this.$element).find('.jf-multi-dropdown')[0];
			if (outside) {
				this.opened = false;
				this.sendOpenStateChange();
				this.sortItems();
			}
			this.$scope.$apply();
		};
		$(document).on('click', handler);
		this.$scope.$on('$destroy', () => {
			$(document).off('click', handler);
		});
	}

	getSelectedForTitle() {
		let selected = _.filter(this.items, (item) => item.isSelected);
		selected = _.map(selected, s => s.selectedText || s.text);
		return selected.join(', ');
	}

	onClick() {
		if (this.disabled !== true) {
			if (!this.items) {
				return;
			}
			this.opened = !this.opened;
			this.sendOpenStateChange();
			if (!this.opened) {
				this.sortItems();
			}
			this.filterText = '';

		}

	}

	onSelection(toggleAll) {
		this.applyChanges();
		if (toggleAll) {
			if (this.isAllSelected) {
				this.selectAll();
			} else {
				this.unSelectAll();
			}
		} else {
			this.isAllSelected = false;
		}
	}

	onSingleSelection() {
		this.items.forEach((item) => {
			if (!item.disabled) {
				item.isSelected = false;
			}
		});
		let selected = _.find(this.items, item => item.$id == this.singleSelectionIndex);
		selected.isSelected = true;
		if (this.onChange) {
			this.onChange();
		}
	}

	getSelectedCount() {
		let selected = _.filter(this.items, (item) => item.isSelected && !item.isAllToggleCheckbox);
		return selected.length;
	}

	applyChanges() {
		if (this.onChange) {
			this.onChange();
		}
	}

	selectedItems() {
		let selected = _.filter(this.items, (item) => item.isSelected);
		selected = _.map(selected, 'text');
		return selected;
	}

	sortItems() {
		if (this.noSelectedFirst) {
			return;
		}
		if (!this.items) {
			return;
		}
		let selected = this.noSort ? _.filter(this.items, (item) => item.isSelected) : _.sortBy(
			_.filter(this.items, (item) => item.isSelected), 'text');
		let unSelected = this.noSort ? _.filter(this.items, (item) => !item.isSelected) : _.sortBy(
			_.filter(this.items, (item) => !item.isSelected), 'text');
		this.lastSelectedIndex = selected.length - 1;
		let combined = selected.concat(unSelected);
		this.items.splice.apply(this.items, [0, this.items.length].concat(combined));
	}

	selectAll() {
		this.filter(this.items, this.filterText).forEach((item) => {
			if (!item.disabled) {
				item.isSelected = true;
			}
		});
		this.applyChanges();
	}

	unSelectAll() {
		this.filter(this.items, this.filterText).forEach((item) => {
			if (!item.disabled) {
				item.isSelected = false;
			}
		});
		this.applyChanges();
		this.singleSelectionIndex = -1;
	}

	clearSelection() {
		if (this.textInputs) {
			_.forEach(this.items, (item) => {
				item.inputTextValue = '';
			});
		}
		this.unSelectAll();
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
			noSort: '=?',
			onOpenStateChange: '&?',
			dropdownOpened: '=',
			showSelected: '@',
			showLabelCounter: '@',
			noFilter: '=?',
			noSelectedFirst: '=?',
			singleSelection: '=?',
			textInputs: '<?',
			enableSelectAllCheckbox: '<?',
			borderless: '<?'
		},
		templateUrl: 'directives/jf_multi_dropdown/jf_multi_dropdown.html'
	};
}