
export default class JfDivider {
	constructor() {
		this.templateUrl = 'ui_components/jf_divider/jf.divider.view.html';
		this.controller = JfDividerController;
		this.bindings = {
			text: '@'
		};
	}
}

class JfDividerController {
	constructor() {}
}
