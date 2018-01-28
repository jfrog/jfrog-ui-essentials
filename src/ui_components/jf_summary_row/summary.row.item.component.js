export default class JfSummaryRowItem {
	constructor() {
		this.template = `<div></div>`;
		this.controller = JfSummaryRowItemController;
		this.bindings = {
			colTemplate: '<',
			colScope: '<',
			noWrap: '<',
		};
	}
}

class JfSummaryRowItemController {
	constructor($element,$compile){
		this.$element = $element;
		this.$compile = $compile;
	}

	$onInit() {
		let placeholder = this.$element.find('div');
		let col = $(this.noWrap ? `${this.colTemplate}` : `<span>${this.colTemplate}</span>`);
		let e = this.$compile(col)(this.colScope);
		placeholder.after(e);
		placeholder.remove();
	}
}