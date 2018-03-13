class jfDataListController {
	constructor($scope) {
		this.$scope = $scope;

		this.$scope.$watch('jfDataList.items', items => {
			if (items) {
				this.formattedItems = _.filter(items, (item) => {
					return item.value != '';
				});
			}
		})
	}
}


export function jfDataList() {
	return {
		restrict: 'E',
		scope: {
			items: '='
		},
		controller: jfDataListController,
		controllerAs: 'jfDataList',
		bindToController: true,
		templateUrl: 'directives/jf_data_list/jf_data_list.html'
	}
}