class jfListSelectionController {
	constructor($timeout, $filter, $element) {
		this.paginationApi = new PaginationApi(this);
		this.currentPage = 1;

		this.filter = $filter('filter');

		this.$timeout = $timeout;
		this.$element = $element;
		this.setItemsPerPage();
	}

	setItemsPerPage() {
		this.$timeout(() => {
			let containerHeight = this.$element.find('.group-list-wrapper').innerHeight();
			let itemHeight = this.$element.find('.group-list-item').outerHeight();
			this.itemsPerPage = Math.floor(containerHeight / itemHeight);
		});
	}

	getPageItems() {
		if (!this.usePagination) {
			return this.filter(this.items, this.filterList);
		}

		let start = (this.currentPage - 1) * this.itemsPerPage;
		let slice = this.filter(this.items, this.filterList).slice(start, start + this.itemsPerPage);
		return slice;
	}

	onFilterChange() {
		this.paginationApi.setPage(1);
		this.paginationApi.update();
	}

	onItemSelection(item) {
		if(this.highlightSelected && !item.highlighted) {
			let lastHiglighted = _.find(this.items,i => i.highlighted);
			if(lastHiglighted) {
				lastHiglighted.highlighted = false;
			}
			item.highlighted = true;
		}
		this.onItemClick(item);
	}

	onItemClick(item) {
		if(this.onSelect && typeof this.onSelect === 'function') {
			this.onSelect({item: item});
			this.paginationApi.update();
		}
	}
}

export function jfListSelection() {
	return {
		restrict: 'E',
		scope: {
			items: '=',
			onSelect: '&',
			usePagination: '=?',
			highlightSelected: '<',
			allowSingleClick: '<?'
		},
		controller: jfListSelectionController,
		controllerAs: 'jfListSelection',
		bindToController: true,
		templateUrl: 'directives/jf_list_selection/jf_list_selection.html'
	};
}

class PaginationApi {
	constructor(ctrl) {
		this.ctrl = ctrl;
	}

	getTotalPages() {
		if (!this.ctrl.usePagination) {
			return 0;
		}
		return Math.ceil(this.ctrl.filter(this.ctrl.items, this.ctrl.filterList).length / this.ctrl.itemsPerPage);
	}

	getCurrentPage() {
		if (this.ctrl.currentPage > this.getTotalPages()) {
			this.ctrl.currentPage = this.getTotalPages();
		}
		if (this.ctrl.currentPage < 1) {
			this.ctrl.currentPage = 1;
		}
		return this.ctrl.currentPage;
	}

	nextPage() {
		if (this.ctrl.currentPage < this.getTotalPages()) {
			this.ctrl.currentPage++;
		}
	}

	prevPage() {
		if (this.ctrl.currentPage > 1) {
			this.ctrl.currentPage--;
		}
	}

	setPage(pageNum) {
		if (pageNum >= 1 && pageNum <= this.getTotalPages()) {
			this.ctrl.currentPage = pageNum;
		}
	}

	update() {
		this.ctrl.$timeout(() => {
			if (this.getCurrentPage() > this.getTotalPages()) {
				this.setPage(this.getTotalPages());
			}
			if (this.listener) {
				this.listener(this.getCurrentPage());
			}
		});
	}

	registerChangeListener(listener) {
		this.listener = listener;
	}
}