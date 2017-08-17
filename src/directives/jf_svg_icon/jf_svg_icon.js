class jfSvgIconController {
	constructor() {

	}
}

export function jfSvgIcon() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@',
			iconClass: '@?'
		},
		controller: jfSvgIconController,
		templateUrl: 'directives/jf_svg_icon/jf_svg_icon.html'
	}
}