export function jfDynamicTemplate($compile) {
	return {
		restrict: 'A',
		replace: true,
		link: ($scope, ele, attrs) => {
			$scope.$watch(attrs.jfDynamicTemplate, function (html) {
				ele.html(html);
				$compile(ele.contents())($scope);
			});
		}
	};
}