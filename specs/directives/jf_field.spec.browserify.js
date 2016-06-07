'use strict';
describe('unit test:jf_field directive', function () {
  var element,
    inputElement,
    getErrorElement,
    buttonElement,
    $timeout,
    $scope,
    JFrogEventBus;

  function setup(_JFrogEventBus_, _$timeout_) {
    JFrogEventBus = _JFrogEventBus_;
      $timeout = _$timeout_;
  }

  function compileDirective() {
    $scope = compileHtml('<form novalidate><jf-field validations="test"><input required name="name" minlength="0" ng-model="name"/></jf-field><button></button></form>');
    $scope.$digest();
    element = $(document.body).find('jf-field');
    inputElement = element.find('input');
    buttonElement = $(document.body).find('form');
    getErrorElement = () => $(document.body).find('[ng-message-exp]');
  }

  beforeEach(m('jfrog.ui.essentials'));
  beforeEach(inject(setup));
  beforeEach(compileDirective);

  it('should show elements', function() {
    expect(element.length).not.toEqual(0);
    expect(buttonElement.length).not.toEqual(0);
    expect(inputElement.length).not.toEqual(0);
  });

  it('should not show error', function() {
    expect(getErrorElement().length).toEqual(0);
  });

  it('should show error after submitting', function() {
    $(inputElement).trigger('blur');
    $scope.$digest();
    $timeout.flush();
    expect(getErrorElement().length).not.toEqual(0);
  });
});
