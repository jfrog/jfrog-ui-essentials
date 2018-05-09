class jfTableTopController {
	/* @ngInject */
	constructor() {
	}
	isFilterDisabled() {
		return !(this.tableView.options &&
				(this.tableView.options.getRawData().length ||
					(this.tableView.options.externalTotalCount && this.tableView.options.externalTotalCount.total > 0))) ||
			(this.tableView.options.isFilterDisabledCallback && this.tableView.options.isFilterDisabledCallback());
	}
}

export function jfTableTop() {
	return {
		controller: jfTableTopController,
		controllerAs: 'jfTableTop',
		bindToController: true,
		scope: {
			tableView: '='
		},
		templateUrl: 'ui_components/jf_table_view/jf_table_top.html'
	}
}