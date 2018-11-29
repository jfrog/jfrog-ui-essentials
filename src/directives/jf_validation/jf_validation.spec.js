/**
 * Created by matang & yonatana on 25/2/18.
 */
'use strict';
describe('unit test:jf_validation directive text test', function () {

	var $scope;
	var strenghLabel;
	var directiveCtrl;
	var directive;
	var $timeout;
	var ngModelController;
	var input;
	var myModel;
	var inputType;
	var errorMsg;

	function setup(_$timeout_) {
		$timeout = _$timeout_;
	}

	function getElements() {
		strenghLabel = $('label.password-strength-label');
		directive = $('jf-validation');
		input = $('input');

		input.val("someInvalidMail");
		directiveCtrl = angular.element(directive).controller('jfValidation');
		ngModelController = angular.element(input).controller('ngModel');


	}

	function compileDirective(attr, type, inputAttrs = "") {
		let attributes = '';
		for (let key in attr) {
			let kebab = _.kebabCase(key);
			attributes += ` ${kebab}="data.${key}"`;
		}

		myModel = "tetette";
		$scope = compileHtml(`<form> <input ${inputAttrs}   ng-model="${myModel}" type="${type}"/> <jf-validation></jf-validation> 
</form>`, {data: attr});

		$scope.$digest();

		getElements();
	}


	beforeEach(angular.mock.module('jfrog.ui.essentials'));
	beforeEach(inject(setup));
	//beforeEach(compileDirective);

	it('should indicate error in invalid mail input', () => {
		compileDirective({}, "email")
		expect(directiveCtrl).toBeDefined()
		console.log(input)
		let text = 'matanGotlieb';
		ngModelController.$setViewValue(text);
		expect(ngModelController.$error.email).toBe(true)
		expect(directiveCtrl.messages[_.keys(ngModelController.$error)[0]]).toBe('Please enter a valid email')

		text = 'yonatana@jfrog.com';
		ngModelController.$setViewValue(text);
		expect(ngModelController.$error.email).toBe(undefined);

		text = 'yonatana@jfrog.com';
		ngModelController.$setViewValue(text);
	});

	it('should indicate error in required input', () => {
		compileDirective({}, "text", "required='required'");
		expect(directiveCtrl).toBeDefined();
		let text = 'some text input';
		ngModelController.$setViewValue(text);
		expect(ngModelController.$error.required).toBe(undefined);

		text = '';
		ngModelController.$setViewValue(text);
		expect(ngModelController.$error.required).toBeDefined();
		expect(directiveCtrl.messages[_.keys(ngModelController.$error)[0]]).toBe('You must fill in this field');
	});

	it('should indicate error in url input', () => {
		compileDirective({}, "url", "required='required'");
		expect(directiveCtrl).toBeDefined();
		let invalidUrls = ['www.noDomain', 'nowww.com', 'www.com.com', 'http://', 'https://', 'someLie'];
		for (var i = 0; i < invalidUrls.length; i++) {
			ngModelController.$setViewValue(invalidUrls[i]);
			expect(ngModelController.$error.url).not.toBe(undefined);
			expect(directiveCtrl.messages[_.keys(ngModelController.$error)[0]]).toBe('Please enter a valid url');
		}
		ngModelController.$setViewValue("http://www.jfrog.com");
		expect(ngModelController.$error.url).toBe(undefined);

	});

	it('should indicate number input', () => {
		compileDirective({}, "number", "required='required'");
		expect(directiveCtrl).toBeDefined();

		ngModelController.$setViewValue("dsds");
		expect(ngModelController.$error.number).not.toBe(undefined);
		expect(directiveCtrl.messages[_.keys(ngModelController.$error)[0]]).toBe('Please enter an Integer');
		ngModelController.$setViewValue("1.2");
		expect(ngModelController.$error.number).toBe(undefined);
	});

	it('should indicate min - max number input', () => {
		console.log(errorMsg)
		compileDirective({}, "number", "max='10' min='0'");
		expect(directiveCtrl).toBeDefined();
		ngModelController.$setViewValue("11");
		expect(ngModelController.$error.max).not.toBe(undefined);
		expect(ngModelController.$error.min).toBe(undefined);
		expect(directiveCtrl.messages[_.keys(ngModelController.$error)[0]]).toBe('Value too high');
		ngModelController.$setViewValue("-1");
		expect(ngModelController.$error.min).not.toBe(undefined);
		expect(ngModelController.$error.max).toBe(undefined);
		errorMsg = _.keys(ngModelController.$error)[0];
		expect(directiveCtrl.messages[errorMsg]).toBe('Value too low');

	});

	it('should indicate min - max length input', () => {
		console.log(errorMsg)
		compileDirective({}, "text", "maxLength='10' minLength='3'");

		expect(directiveCtrl).toBeDefined();
		ngModelController.$setViewValue("mockData");
		errorMsg = _.keys(ngModelController.$error)[0];

		/* No Issues Scenario */
		expect(ngModelController.$error.maxlength).toBe(undefined);
		expect(ngModelController.$error.minlength).toBe(undefined);

		/* too Short Value  */
		ngModelController.$setViewValue("me");
		errorMsg = _.keys(ngModelController.$error)[0];
		expect(directiveCtrl.messages[errorMsg]).toBe('Value too short');
		expect(ngModelController.$error.minlength).not.toBe(undefined);
		expect(ngModelController.$error.maxlength).toBe(undefined);

		/* too Long Value */
		ngModelController.$setViewValue("someVeryLongTextWhichIsMoreThanTenCharacters");
		errorMsg = _.keys(ngModelController.$error)[0];
		expect(directiveCtrl.messages[errorMsg]).toBe('Value too long');
		expect(ngModelController.$error.minlength).toBe(undefined);
		expect(ngModelController.$error.maxlength).not.toBe(undefined);
	});

});
