
export default class JfDivider {
	constructor() {
		this.template = require('./jf.divider.view.html');
		this.controller = JfDividerController;
		this.bindings = {
			text: '@'
		};
	}
}

class JfDividerController {
	constructor() {}
}
