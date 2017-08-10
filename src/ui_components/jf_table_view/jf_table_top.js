class jfTableTopController {
	/* @ngInject */
	constructor() {
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