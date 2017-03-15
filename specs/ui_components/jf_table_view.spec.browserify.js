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
  var actionButtons;

  function setup(_$timeout_, _JFrogTableViewOptions_) {
    $timeout = _$timeout_;
    JFrogTableViewOptions = _JFrogTableViewOptions_;
  }

  function getElements() {
    emptyTablePlaceholder = $('.empty-table-placeholder')
    newEntityButton = $('.new-entity > div')
    headers = $('.jf-table-row.headers')
    headersCells = $('.jf-table-cell.header');
    dataCells = $('.jf-table-cell:not(.header)');
    dataRows = $('.jf-table-row:not(.headers)');
    filterInput = $('.jf-table-filter > input');
    pagination = $('.pagination-controls');
    actionButtons = $('.action-button > .action-icon');
  }

  function flushAndApply() {
    try {
      $timeout.flush();
    }
    catch(e) {}

    $scope.$apply();
    getElements();
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
        width: "25%",
      },
      {
        header: "Email",
        field: "email",
        width: "25%"
      },
      {
        header: "Subscription",
        field: "subscription",
        width: "25%"
      },
      {
        header: "Some Number",
        field: "number",
        width: "25%"
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
    flushAndApply();
    expect(newEntityButton.length).toEqual(1);
    expect(newEntityButton[0].textContent.trim()).toEqual('Add Test Entity');
  });
  it('should call callback when pressing add entity button', (done) => {
    options.setNewEntityAction(()=>{
      done();
    });
    flushAndApply();
    expect(newEntityButton.length).toEqual(1);
    newEntityButton.click();
  });
  it('should show headers', () => {
    options.showHeaders();
    flushAndApply();
    expect(headers.length).toEqual(1);
    expect(headersCells.length).toEqual(4);
  });
  it('should show data rows, pagination and filter', () => {
    var testData = [
      {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
      {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium', number: 1},
    ]

    options.setData(testData);
    flushAndApply();
    expect(emptyTablePlaceholder.length).toEqual(0);
    expect(dataRows.length).toEqual(2);
    expect(dataCells.length).toEqual(8);

    expect($(filterInput[0]).css('display')).toEqual('inline-block');
    expect(pagination.children().children().length).toEqual(1)

    expect(dataCells[0].textContent.trim()).toEqual(testData[0].userName);
    expect(dataCells[1].textContent.trim()).toEqual(testData[0].email);
    expect(dataCells[2].textContent.trim()).toEqual(testData[0].subscription);
    expect(dataCells[3].textContent.trim()).toEqual(testData[0].number.toString());
    expect(dataCells[4].textContent.trim()).toEqual(testData[1].userName);
    expect(dataCells[5].textContent.trim()).toEqual(testData[1].email);
    expect(dataCells[6].textContent.trim()).toEqual(testData[1].subscription);
    expect(dataCells[7].textContent.trim()).toEqual(testData[1].number.toString());
  });
  it('should sort when clicking header', () => {
    var testData = [
      {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
      {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium', number: 1},
    ]
    var origData = _.cloneDeep(testData);

    var expectSorted = (rev=false) => {
      expect(dataCells[0].textContent.trim()).toEqual(origData[rev?1:0].userName);
      expect(dataCells[1].textContent.trim()).toEqual(origData[rev?1:0].email);
      expect(dataCells[2].textContent.trim()).toEqual(origData[rev?1:0].subscription);
      expect(dataCells[3].textContent.trim()).toEqual(origData[rev?1:0].number.toString());
      expect(dataCells[4].textContent.trim()).toEqual(origData[rev?0:1].userName);
      expect(dataCells[5].textContent.trim()).toEqual(origData[rev?0:1].email);
      expect(dataCells[6].textContent.trim()).toEqual(origData[rev?0:1].subscription);
      expect(dataCells[7].textContent.trim()).toEqual(origData[rev?0:1].number.toString());
    }


    options.setData(testData);
    options.showHeaders();

    flushAndApply();

    expectSorted();

    $(headersCells[0]).click(); //sort by user name

    flushAndApply();

    expectSorted(true); //reversed

    expect(testData[0]).toEqual(origData[1]);
    expect(testData[1]).toEqual(origData[0]);

    $(headersCells[2]).click(); //sort by subscription

    flushAndApply();

    expectSorted();

    expect(testData[0]).toEqual(origData[0]);
    expect(testData[1]).toEqual(origData[1]);

    $(headersCells[3]).click(); //sort by number

    flushAndApply();

    expectSorted(true)

    expect(testData[0]).toEqual(origData[1]);
    expect(testData[1]).toEqual(origData[0]);

    $(headersCells[3]).click(); //sort by number - desc

    flushAndApply();

    expectSorted();

    expect(testData[0]).toEqual(origData[0]);
    expect(testData[1]).toEqual(origData[1]);

  });

  it('should display action buttons & call action callback when action button clicked', (done) => {
    var testData = [
      {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
      {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium', number: 1},
    ]
    options.setData(testData);
    options.setActions([
      {
        icon: 'icon icon-clear',
        tooltip: 'Delete',
        callback: (row) => {
          expect(row.userName).toEqual('Shlomo');
          setTimeout(()=>{
            $(actionButtons[3]).click();
          },0)
        },
      },
      {
        icon: 'icon icon-artifactory-edit',
        tooltip: 'Edit',
        callback: (row) => {
          expect(row.userName).toEqual('Reuven');
          done();
        }
      }
    ]);

    flushAndApply();

    expect(actionButtons.length).toEqual(4);

    $(actionButtons[0]).click();

  });

  it('should filter results', () => {

    var testData = [
      {userName: 'Shlomo Azar', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
      {userName: 'Reuven Azar', email: 'reu@lam.biz', subscription: 'Premium', number: 1},
    ]

    options.setData(testData);

    flushAndApply();

    expect(dataRows.length).toEqual(2);

    filterInput.val('Shlo');
    filterInput.triggerHandler('input');

    flushAndApply();

    expect(dataRows.length).toEqual(1);
    expect(dataCells[0].textContent.trim()).toEqual('Shlomo Azar');

    filterInput.val('Reu');
    filterInput.triggerHandler('input');

    flushAndApply();

    expect(dataRows.length).toEqual(1);
    expect(dataCells[0].textContent.trim()).toEqual('Reuven Azar');

    filterInput.val('Azar');
    filterInput.triggerHandler('input');

    flushAndApply();

    expect(dataRows.length).toEqual(2);

    filterInput.val('lam.biz');
    filterInput.triggerHandler('input');

    flushAndApply();

    expect(dataRows.length).toEqual(2);

    filterInput.val('blablabla');
    filterInput.triggerHandler('input');

    flushAndApply();

    expect(dataRows.length).toEqual(0);

  });

  it('should display pagination status and paginate correctly', () => {

    var testData = [];
    let createTestData = function(numItems) {
      for (let i = 0; i < numItems; i++) {
        testData.push({
          userName: `Some User (#${i})`,
          email: `someuser${i}@lam.biz`,
          subscription: 'Free',
          number: 100
        })
      }
    }

    createTestData(76)

    options.setRowsPerPage(10);

    options.setData(testData);

    flushAndApply();

    var expectPaginationState = (current,total) => {
      let textContent = pagination.text().replace(/[\ \n]/g,'');
      expect(textContent).toEqual(`‹Pageof${total}›`);
      expect(pagination.find('.grid-page-box').val()).toEqual(current.toString())
    }

    var nextPage = () =>{
      $(pagination.find('a')[1]).click();
    }
    var prevPage = () =>{
      $(pagination.find('a')[0]).click();
    }
    var setPage = (page) => {
      pagination.find('.grid-page-box').val(page.toString());
      pagination.find('.grid-page-box').triggerHandler('input');
    }

    expect(dataRows.length).toEqual(10);
    expectPaginationState(1,8);

    nextPage();

    flushAndApply()

    expect(dataRows.length).toEqual(10);
    expectPaginationState(2,8);

    setPage(8);

    flushAndApply()

    expect(dataRows.length).toEqual(6);
    expectPaginationState(8,8);

    prevPage();

    flushAndApply()

    expect(dataRows.length).toEqual(10);
    expectPaginationState(7,8);

  });


});
