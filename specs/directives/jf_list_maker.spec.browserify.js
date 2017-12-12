'use strict';
describe('unit test:jf_list_maker directive', function () {

  var $scope;
  var listRows;
  var removeButtons;
  var newButton;
  var newValueInput;
  var errElement;
  var $timeout;

  function setup(_$timeout_) {
    $timeout = _$timeout_;
  }

  function getElements() {
    listRows = $('.list-maker-list-row>div:first-child');
    removeButtons = $('.list-maker-list-row>div:nth-child(2)>a');
    newButton = $('.icon-new');
    newValueInput = $('input.input-text');
    errElement = $('.jf-validation');
  }

  function compileDirective(attr) {
    let attributes = '';
    for (let key in attr) {
      let kebab = _.kebabCase(key);
      attributes += ` ${kebab}="data.${key}"`;
    }
    $scope = compileHtml(`<jf-list-maker ${attributes}></jf-list-maker>`,{data: attr});
    $scope.$digest();

    getElements();
  }

  beforeEach(m('jfrog.ui.essentials'));
  beforeEach(inject(setup));
//  beforeEach(compileDirective);

  it('should show predefined values', () => {
    compileDirective({
      values: ['momo','albert']
    });
    expect(listRows).toBeDefined();
    expect(listRows.length).toBe(2);
    // values should be sorted:
    expect(listRows[0].textContent).toBe('albert');
    expect(listRows[1].textContent).toBe('momo');
  });

  it ('should not sort with no-sort attribute', () => {
    compileDirective({
      values: ['momo','albert'],
      noSort: true
    });
    expect(listRows[0].textContent).toBe('momo');
    expect(listRows[1].textContent).toBe('albert');
  })

  it ('should remove items', () => {
    compileDirective({
      values: ['momo','albert']
    });

    $(removeButtons[0]).click(); //should remove albert

    getElements();
    expect(listRows.length).toBe(1);
    expect(listRows[0].textContent).toBe('momo');
  })

  it ('should add items', () => {
    compileDirective({
      values: []
    });

    let triggerinput = () => angular.element(newValueInput).triggerHandler('input');

    newValueInput.val('value 1');
    triggerinput();
    newButton.click();
    newValueInput.val('value 2');
    triggerinput();
    newButton.click();
    newValueInput.val('another value');
    triggerinput();
    newButton.click();

    getElements();
    expect(listRows).toBeDefined();
    expect(listRows.length).toBe(3);
    // values should be sorted:
    expect(listRows[0].textContent).toBe('another value');
    expect(listRows[1].textContent).toBe('value 1');
    expect(listRows[2].textContent).toBe('value 2');
  })
  it ('should not add already existing values', () => {
    compileDirective({
      values: ['existing value']
    });

    let triggerinput = () => angular.element(newValueInput).triggerHandler('input');

    newValueInput.val('new value');
    triggerinput();
    newButton.click();
    newValueInput.val('existing value');
    triggerinput();
    newButton.click();

    getElements();
    expect(listRows).toBeDefined();
    expect(listRows.length).toBe(2);
    // values should be sorted:
    expect(listRows[0].textContent).toBe('existing value');
    expect(listRows[1].textContent).toBe('new value');
    expect(errElement[0].textContent).toBe('Value already exists')
  })
});
