'use strict';
describe('unit test: jf_table_view directive & JFTableViewOptions service', function () {

  var $scope;
  var $timeout;
  var JFrogTableViewOptions;
  var options;

  var emptyTablePlaceholder;
  var newEntityButton;
  var headers;
  var headersCells;
  var dataRows;
  var dataCells;
  var filterInput;
  var pagination;

  function setup(_$timeout_, _JFrogTableViewOptions_) {
    $timeout = _$timeout_;
    JFrogTableViewOptions = _JFrogTableViewOptions_;
  }

  function getElements() {
    emptyTablePlaceholder = $('.empty-table-placeholder')
    newEntityButton = $('.new-entity > div')
    headers = $('.jf-table-row.headers')
    headersCells = $('.jf-table-cell.header')
    dataCells = $('.jf-table-cell:not(.header)');
    dataRows = $('.jf-table-row:not(.headers)');
    filterInput = $('.jf-table-filter > input');
    pagination = $('.pagination-controls');
  }

  function compileDirective(attr) {
    let attributes = '';
    for (let key in attr) {
      let kebab = _.kebabCase(key);
      if (key.startsWith('@')) {
        attributes += ` ${kebab}="{{ data['${key}'] }}"`;
      }
      else {
        attributes += ` ${kebab}="data.${key}"`;
      }
    }
    $scope = compileHtml(`<jf-table-view ${attributes}></jf-table-view>`,{data: attr});
    $scope.$digest();

    getElements();
  }

  beforeEach(m('jfrog.ui.essentials'));
  beforeEach(inject(setup));

  beforeEach(()=>{
    options = new JFrogTableViewOptions();
    options.setColumns([
      {
        header: "User Name",
        field: "userName",
        width: "33%",
      },
      {
        header: "Email",
        field: "email",
        width: "33%"
      },
      {
        header: "Subscription",
        field: "subscription",
        width: "33%"
      }
    ]);

    compileDirective({
      options,
      '@objectName': 'Test Entity'
    });
  })

  it('should show only empty table placeholder and', () => {
    expect(emptyTablePlaceholder.length).toEqual(1);
    expect(newEntityButton.length).toEqual(0);
    expect(headers.length).toEqual(0);
    expect(headersCells.length).toEqual(0);
    expect(dataRows.length).toEqual(0);
    expect(dataCells.length).toEqual(0);
    expect($(filterInput[0]).css('display')).toEqual('none');
    expect(pagination.children().children().length).toEqual(0)
  });
  it('should show add entity button', () => {
    options.setNewEntityAction(()=>{});
    $scope.$apply();
    getElements();
    expect(newEntityButton.length).toEqual(1);
    expect(newEntityButton[0].textContent.trim()).toEqual('Add Test Entity');
  });
  it('should call callback when pressing add entity button', (done) => {
    options.setNewEntityAction(()=>{
      done();
    });
    $scope.$apply();
    getElements();
    expect(newEntityButton.length).toEqual(1);
    newEntityButton.click();
  });
  it('should show headers', () => {
    options.showHeaders();
    $scope.$apply();
    getElements();
    expect(headers.length).toEqual(1);
    expect(headersCells.length).toEqual(3);
  });
  it('should show data rows, pagination and filter', () => {
    var testData = [
      {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free'},
      {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium'},
    ]

    options.setData(testData);
    $scope.$apply();
    getElements();
    expect(emptyTablePlaceholder.length).toEqual(0);
    expect(dataRows.length).toEqual(2);
    expect(dataCells.length).toEqual(6);

    expect($(filterInput[0]).css('display')).toEqual('inline-block');
    expect(pagination.children().children().length).toEqual(1)

    expect(dataCells[0].textContent.trim()).toEqual(testData[0].userName);
    expect(dataCells[1].textContent.trim()).toEqual(testData[0].email);
    expect(dataCells[2].textContent.trim()).toEqual(testData[0].subscription);
    expect(dataCells[3].textContent.trim()).toEqual(testData[1].userName);
    expect(dataCells[4].textContent.trim()).toEqual(testData[1].email);
    expect(dataCells[5].textContent.trim()).toEqual(testData[1].subscription);
  });


});
