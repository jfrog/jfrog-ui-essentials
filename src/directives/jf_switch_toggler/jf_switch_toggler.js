class jfSwitchTogglerController {
    constructor() {
	    if (!this.options) throw 'Must supply options';
	    // Supports 2 methods of options:
	    // array of strings
	    // array of objects of type {'value': ..., 'text': ...}
	    // The model is assigned the value, and the text is displayed

	    this.setOptionObjects();
    	if (_.isEmpty(this.model)) {
		    this.model = this.leftOption.value;
	    }
	    this.isLeftOptionOn = this.model === this.leftOption.value;
    }

	toggleSelection() {
		this.model = (this.model === this.leftOption.value ? this.rightOption.value : this.leftOption.value);
    }

	setOptionObjects() {
		let optionObjects = this.options.map((option) => {
			if (typeof(option) === 'string')
				return {value: option, text: option};
			else {
				return option;
			}
		});

		this.leftOption = optionObjects[0];
		this.rightOption = optionObjects[1];
	}
}

export default function jfSwitchToggler() {
    return {
        restrict: 'E',
        scope: {
        	model: '=',
        	options: '<',
        },
        controller: jfSwitchTogglerController,
        controllerAs: '$ctrl',
	    bindToController: true,
        templateUrl: 'directives/jf_switch_toggler/jf_switch_toggler.html'
    }
}