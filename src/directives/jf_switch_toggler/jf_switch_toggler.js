class jfSwitchTogglerController {
    constructor() {
	    if (!this.options) throw 'Must supply options';
	    this.leftOption = this.options[0];
	    this.rightOption = this.options[1];
    	if (_.isEmpty(this.selected)) {
		    this.selected = this.leftOption;
	    }
	    this.isLeftOptionOn = this.selected === this.leftOption;
    }

	toggleSelection() {
		this.selected = (this.selected === this.leftOption ? this.rightOption : this.leftOption);
    }
}

export default function jfSwitchToggler() {
    return {
        restrict: 'E',
        scope: {
        	selected: '=',
        	options: '<',
        },
        controller: jfSwitchTogglerController,
        controllerAs: '$ctrl',
	    bindToController: true,
        templateUrl: 'directives/jf_switch_toggler/jf_switch_toggler.html'
    }
}