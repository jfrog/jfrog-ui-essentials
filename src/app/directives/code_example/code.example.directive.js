class CodeExampleController {

	$onInit() {



		if (!this.tabWidth) this.tabWidth = 100;

		this.tabs = [];

		if (this.html) this.tabs.push({"name":"htmlTab"});
		if (this.javascript) this.tabs.push({"name":"javascriptTab"});


		this.dict = {
			htmlTab: "HTML",
			javascriptTab: "Javascript"
		}



	}
}

export default function codeExample() {
	return {
		restrict: 'E',
		template: require('./code.example.html'),
		scope: {
			html: "@",
			javascript: "@",
			tabWidth: '@'
		},
		controller: CodeExampleController,
		controllerAs: '$ctrl',
		bindToController: true
	};
}


codeExample.META = {
	name: 'codeExample',
};