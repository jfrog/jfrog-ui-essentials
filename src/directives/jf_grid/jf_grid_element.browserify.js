export class JFGridElement {
	constructor(element) {
		this.element = element;
	}

	getCell(index) {
		return $('.ui-grid-render-container-body .ui-grid-cell').eq(index);
	}

	getCellData(index) {
		return this.getCell(index).find('.ui-grid-cell-contents').text();
	}

	getActions(index) {
		return this.getCell(index)
			.find('.grid-action-bar .btn-action');
	}

	getGridPagination() {
		return $('.grid-pagination');
	}
	getCounter() {
		return $('.grid-counter');
	}

	applyFilter(text) {
		let input = $('jf-grid-filter input[type=text]');
		input.val(text);
		let ngModelController = angular.element(input).controller('ngModel');
  		ngModelController.$setViewValue(text);
	}
}