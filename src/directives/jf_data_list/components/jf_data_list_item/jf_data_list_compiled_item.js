export default function jfDataListCompiledItem() {
	const linkFn = (scope, element, attrs) => {
		let placeholder = element.find('div');
		let itemTemplate = `<div class="compiled-list-item">${scope.$ctrl.item.template}</div>`;
		let newScope = scope.$ctrl.$rootScope.$new();
		let itemScope = _.extend(newScope, {appScope: scope.$ctrl.item.scope});
		delete scope.$ctrl.item.scope; // Remove pointer to scope inside item
		itemScope.row = {};
		itemScope.row.entity = scope.$ctrl.item;
		let compiledElement = scope.$ctrl.$compile(itemTemplate)(itemScope);
		placeholder.after(compiledElement);
		placeholder.remove();
	};
	return {
		restrict: 'E',
		scope: {
			item: '='
		},
		controller: jfDataListCompiledItemController,
		controllerAs: '$ctrl',
		bindToController: true,
		template: `<div></div>`,
		link: linkFn
	};

}

class jfDataListCompiledItemController {
	constructor($element, $compile, $rootScope) {
		this.$element = $element;
		this.$compile = $compile;
		this.$rootScope = $rootScope;
	}
}

