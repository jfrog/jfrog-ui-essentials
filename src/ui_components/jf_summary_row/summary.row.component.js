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
		this.filterOutUnactiveColumns();
		this.setColumnsLayout();
	}

	filterOutUnactiveColumns() {
		this.columnsToShow = _.filter(this.columns, (col) => {
			return col.isActive;
		});
	}

	setColumnsLayout() {
		let layout = '';
		_.forEach(this.columnsToShow, (col) => {
			if (!col.width) {
				col.width = '1fr';
			}
			layout += `${col.width} `;
		});
		this.inlineStyle = {
			gridTemplateColumns: layout
		};
	}
}