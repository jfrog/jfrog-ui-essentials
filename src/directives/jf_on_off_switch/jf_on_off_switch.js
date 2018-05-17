class jfOnOffSwitchController {
	constructor() {
		if (!this.options) throw 'Must supply options';
		this.on = this.options[0];
		this.off = this.options[1];
		if (_.isEmpty(this.selected)) {
			this.selected = this.on;
		}
		this.isOn = this.selected === this.on;
	}

	toggleSelection() {
		this.selected = (this.selected === this.on ? this.off : this.on);
	}
}

export default function jfOnOffSwitch() {
	return {
		restrict: 'E',
		scope: {
			selected: '=',
			options: '<',
		},
		controller: jfOnOffSwitchController,
		controllerAs: '$ctrl',
		bindToController: true,
		templateUrl: 'directives/jf_on_off_switch/jf_on_off_switch.html'
	}
}