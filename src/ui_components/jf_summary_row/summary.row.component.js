export default class JfSummaryRow {
	constructor() {
		this.templateUrl = 'ui_components/jf_summary_row/summary.row.template.html';
		this.controller = JfSummaryRowController;
		this.bindings = {
			columns: '<',
			parentScope: '<'
		};
	}
}

class JfSummaryRowController {
	$onInit() {
		this.columnsToShow = _.filter(this.columns, (col) => {
			return col.isActive;
		});
		this.inlineStyle = {
			gridTemplateColumns: `repeat(${this.columnsToShow.length}, 1fr)`
		};
	}
}