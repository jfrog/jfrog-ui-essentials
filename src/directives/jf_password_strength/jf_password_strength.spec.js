/**
 * Created by matang & yonatana on 25/2/18.
 */
'use strict';
describe('unit test:jf_password_strength directive', function () {

	var $scope;
	var strenghLabel;
	var directiveCtrl;
	var directive;
	var $timeout;
	var rank;

	function setup(_$timeout_) {
		$timeout = _$timeout_;
	}

	function getElements() {
		strenghLabel = $('label.password-strength-label');
		directive = $('jf-password-strength');
		directiveCtrl = angular.element(directive).controller('jfPasswordStrength');
	}

	function compileDirective(attr) {
		let attributes = '';
		for (let key in attr) {
			let kebab = _.kebabCase(key);
			attributes += ` ${kebab}="data.${key}"`;
		}
		$scope = compileHtml(`<jf-password-strength ${attributes}></jf-password-strength>`, {data: attr});

		$scope.$digest();

		getElements();
	}

	function setPassword(password, rank) {
		compileDirective({
			password,
			rank
		});
	}

	beforeEach(angular.mock.module('jfrog.ui.essentials'));
	beforeEach(inject(setup));
	//  beforeEach(compileDirective);

	it('should show relevant value of strength', () => {
		setPassword("", rank);
		expect(directiveCtrl).toBeDefined();

		expect(directiveCtrl.rank).toBe(0);

		setPassword("123", rank);
		expect(directiveCtrl.rank).toBeWithinRange(0, 20);

		setPassword("12345", rank);
		expect(directiveCtrl.rank).toBeWithinRange(20, 40);

		setPassword("1234567890", rank);
		expect(directiveCtrl.rank).toBeWithinRange(40, 60);

		setPassword("MatanYonatanw", rank);
		expect(directiveCtrl.rank).toBeWithinRange(60, 80);

		setPassword("MatanYonatan!", rank);
		expect(directiveCtrl.rank).toBeWithinRange(80, 100);

	});


	it('should validate password strength label', () => {

		setPassword("123", rank);
		expect(strenghLabel).toBeDefined();
		expect(strenghLabel[0].textContent).toBe(`Too short`);

		setPassword("12345", rank);
		expect(strenghLabel[0].textContent).toBe(`Weak`);

		setPassword("1234567890", rank);
		expect(strenghLabel[0].textContent).toBe(`Medium`);

		setPassword("MatanYonatanw", rank);
		expect(strenghLabel[0].textContent).toBe(`Good`);

		setPassword("MatanYonatan!", rank);
		expect(strenghLabel[0].textContent).toBe(`Strong`);
	})

});
