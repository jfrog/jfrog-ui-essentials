class jfTogglerController {
	constructor() {
		this.isToggledToLeft = !!this.isToggledToLeft;
	}
	toggleSelection() {
		this.isToggledToLeft = !this.isToggledToLeft;
		if(this.onToggle && typeof this.onToggle === 'function') {
			this.onToggle();
		}
	}
}

export default function jfToggler() {
	return {
		restrict: 'E',
		scope: {
			isToggledToLeft: '=',
			onToggle: '&?'
		},
		controller: jfTogglerController,
		controllerAs: '$ctrl',
		bindToController: true,
		templateUrl: 'directives/jf_toggler/jf_toggler.html'
	}
}