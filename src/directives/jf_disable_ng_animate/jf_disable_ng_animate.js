class jfDisableNgAnimateController {
	constructor($element, $animate) {
		$animate.enabled($element,false);
	}
}

export function jfDisableNgAnimate() {
	return {
		restrict: 'A',
		scope: false,
		controller: jfDisableNgAnimateController
	}
}
