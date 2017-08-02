'use strict';
describe('unit test: jf_table_view directive & JFTableViewOptions service', function () {

    var $scope;
    var $rootScope;
    var testAppScope;
    var $q;
    var $timeout;
    var JFrogTableViewOptions;
    var options;

    var emptyTablePlaceholder;
    var newEntityButton;
    var headers;
    var headersCells;
    var dataRows;
    var dataCells;
    var filter;
    var filterInput;
    var pagination;
    var actionButtons;
    var selectionButtons;
    var selectedSelectionButtons;
    var unselectedSelectionButtons;
    var sortController;
    var compiledCellTemplate;
    var customColumns;
    var rowExpanders;
    var rowExpanderPlaceholders;
    var openedExpanders;
    var closedExpanders;
    var subRows;

    var columns = [
        {
            header: "User Name",
            field: "userName",
            width: "25%",
            filterable: true
        },
        {
            header: "Email",
            field: "email",
            width: "25%",
            filterable: true
        },
        {
            header: "Subscription",
            field: "subscription",
            width: "25%"
        },
        {
            header: "Some Number",
            field: "number",
            cellTemplate: '<div class="compiled-cell-template" ng-click="appScope.testAppScopeMethod(row.entity)">{{row.entity.number * 3}}</div>',
            width: "25%"
        }
    ]

    function setup(_$timeout_, _JFrogTableViewOptions_, _$q_, _$rootScope_) {
        $timeout = _$timeout_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        JFrogTableViewOptions = _JFrogTableViewOptions_;
    }

    function getElements() {
        emptyTablePlaceholder = $('.empty-table-placeholder')
        newEntityButton = $('.new-entity')
        headers = $('.jf-table-row.headers')
        headersCells = $('.jf-table-cell.header');
        dataCells = $('.jf-table-cell:not(.header)');
        dataRows = $('.jf-table-row:not(.headers)');
        filter = $('.jf-table-filter > .input-search-wrapper');
        filterInput = $('.jf-table-filter > .input-search-wrapper > input');
        pagination = $('.pagination-controls');
        actionButtons = $('.action-button > .action-icon');
        selectionButtons = $('.selection-icon');
        selectedSelectionButtons = $('.selection-icon.selected');
        unselectedSelectionButtons = $('.selection-icon:not(.selected)');
        sortController = $('.sort-controller');
        compiledCellTemplate = $('.compiled-cell-template');
        customColumns = $('.columns-customization-wrap');
        rowExpanders = $('.row-expander:not(.placeholder):not(.sub-row-expander)');
        rowExpanderPlaceholders = $('.row-expander.placeholder');
        openedExpanders = $('.row-expander .action-icon.expanded');
        closedExpanders = $('.row-expander .action-icon:not(.expanded)');
        subRows = $('.jf-table-row.sub-row:not(.headers)');
    }

    function flushAndApply() {
        try {
            $timeout.flush();
        }
        catch (e) {
        }

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
        $scope = compileHtml(`<jf-table-view ${attributes}></jf-table-view>`, {data: attr});
        $scope.$digest();

        getElements();
    }

    beforeEach(function () {
        jasmine.addMatchers({
            toDeepEqual: function (util, customEqualityTesters) {
                return {
                    compare: function (actual, expected) {
                        var result = {};
                        result.pass = _.isEqual(actual, expected);
                        return result;
                    }
                }
            }
        });
    });

    beforeEach(m('jfrog.ui.essentials'));
    beforeEach(inject(setup));

    beforeEach(() => {
        testAppScope = $rootScope.$new();
        options = new JFrogTableViewOptions(testAppScope);
        options.setColumns(columns);

        compileDirective({
            options,
            '@objectName': 'Test Entity'
        });
    })

    it('should show only empty table placeholder', () => {
        options.setData([]);
        options.showHeaders(false);
        flushAndApply();
        expect(emptyTablePlaceholder.length).toEqual(1);
        expect(newEntityButton.length).toEqual(0);
        expect(headers.length).toEqual(0);
        expect(headersCells.length).toEqual(0);
        expect(dataRows.length).toEqual(0);
        expect(dataCells.length).toEqual(0);
        expect(filter.length).toEqual(0);
        expect(pagination.children().children().length).toEqual(0);
        expect(selectionButtons.length).toEqual(0);
        expect(sortController.length).toEqual(0);

    });
    it('should show add entity button', () => {
        options.setNewEntityAction(() => {
        });
        flushAndApply();
        expect(newEntityButton.length).toEqual(1);
        expect(sortController.length).toEqual(0);
        expect(newEntityButton[0].textContent.trim()).toEqual('Add a Test Entity');
    });
    it('should call callback when pressing add entity button', (done) => {
        options.setNewEntityAction(() => {
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
        expect(sortController.length).toEqual(0);
        expect(customColumns.length).toEqual(0);
    });
    it('should toggle columns visibility', () => {
        delete localStorage.jfTableViewSettings;
        options.setId('test-table');
        options.allowColumnsCustomization();
        options.showHeaders();

        flushAndApply();
        expect(customColumns.length).toEqual(1);
        expect(headersCells.length).toEqual(4);

        expect(options.visibleFields).toEqual(["userName", "email", "subscription", "number"])

        let emailSelect = _.find(options.availableColumns, {id: 'email'});
        let subscriptionSelect = _.find(options.availableColumns, {id: 'subscription'});
        emailSelect.isSelected = false;
        subscriptionSelect.isSelected = false;

        options.updateCustomizedColumns();

        flushAndApply();
        expect(headersCells.length).toEqual(2);

        expect(options.visibleFields).toEqual(["number", "userName"])
        expect(localStorage.jfTableViewSettings).toEqual('{"test-table":["number","userName"]}')

    });

    it('should show data rows, pagination and filter', () => {
        var testData = [
            {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
            {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium', number: 1},
        ];

        options.setSortable(false);
        options.setData(testData);
        flushAndApply();
        expect(selectionButtons.length).toEqual(0);
        expect(sortController.length).toEqual(0);

        expect(emptyTablePlaceholder.length).toEqual(0);
        expect(dataRows.length).toEqual(2);
        expect(dataCells.length).toEqual(8);

        expect($(filter[0]).css('display')).toEqual('block');
        expect(pagination.children().children().length).toEqual(1)

        expect(dataCells[0].textContent.trim()).toEqual(testData[0].userName);
        expect(dataCells[1].textContent.trim()).toEqual(testData[0].email);
        expect(dataCells[2].textContent.trim()).toEqual(testData[0].subscription);
        expect(dataCells[3].textContent.trim()).toEqual((testData[0].number * 3).toString());
        expect(dataCells[4].textContent.trim()).toEqual(testData[1].userName);
        expect(dataCells[5].textContent.trim()).toEqual(testData[1].email);
        expect(dataCells[6].textContent.trim()).toEqual(testData[1].subscription);
        expect(dataCells[7].textContent.trim()).toEqual((testData[1].number * 3).toString());
    });

    it('should sort when clicking header', () => {
        var testData = [
            {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
            {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium', number: 1},
        ]
        var origData = _.cloneDeep(testData);

        var expectSorted = (rev = false) => {
            expect(dataCells[0].textContent.trim()).toEqual(origData[rev ? 1 : 0].userName);
            expect(dataCells[1].textContent.trim()).toEqual(origData[rev ? 1 : 0].email);
            expect(dataCells[2].textContent.trim()).toEqual(origData[rev ? 1 : 0].subscription);
            expect(dataCells[3].textContent.trim()).toEqual((origData[rev ? 1 : 0].number * 3).toString());
            expect(dataCells[4].textContent.trim()).toEqual(origData[rev ? 0 : 1].userName);
            expect(dataCells[5].textContent.trim()).toEqual(origData[rev ? 0 : 1].email);
            expect(dataCells[6].textContent.trim()).toEqual(origData[rev ? 0 : 1].subscription);
            expect(dataCells[7].textContent.trim()).toEqual((origData[rev ? 0 : 1].number * 3).toString());
        }


        options.setSortable(false); //first we check the original order
        options.setData(testData);
        options.showHeaders();

        flushAndApply();

        expect(sortController.length).toEqual(0);

        expectSorted();

        options.setSortable(true); //sort by user name (defaults to first column)

        flushAndApply();

        expect(sortController.length).toEqual(1);

        expectSorted(true); //reversed

        $(headersCells[2]).click(); //sort by subscription

        flushAndApply();

        expectSorted();

        $(headersCells[3]).click(); //sort by number

        flushAndApply();

        expectSorted(true)

        $(headersCells[3]).click(); //sort by number - desc

        flushAndApply();

        expectSorted();

    });

    it('should display action buttons & call action callback when action button clicked', (done) => {
        var testData = [
            {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
            {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium', number: 1},
        ]
        options.setSortable(false); // we want to preserve original order
        options.setData(testData);
        options.setActions([
            {
                icon: 'icon icon-clear',
                tooltip: 'Delete',
                callback: (row) => {
                    expect(row.userName).toEqual('Shlomo');
                    setTimeout(() => {
                        $(actionButtons[3]).click();
                    }, 0)
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

    it('should call appScope methods', (done) => {
        var testData = createTestData(76);
        options.setRowsPerPage(10);
        options.setSortable(false); // we want to preserve original order
        options.setData(testData);

        flushAndApply();

        testAppScope.testAppScopeMethod = (row) => {
            expect(row.userName).toEqual('Some User (#0)');
            expect(row.email).toEqual('someuser0@lam.biz');
            expect(row.subscription).toEqual('Free');
            expect(row.number).toEqual(100);

            setTimeout(() => {
                $(pagination.find('a')[1]).click(); //move to next page
                flushAndApply();
                testAppScope.testAppScopeMethod = (row) => {
                    expect(row.userName).toEqual('Some User (#10)');
                    expect(row.email).toEqual('someuser10@lam.biz');
                    expect(row.subscription).toEqual('Free');
                    expect(row.number).toEqual(100);
                    done();
                }
                $(compiledCellTemplate[0]).click();
            }, 0)

        }

        $(compiledCellTemplate[0]).click();

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

    function createTestData(numItems) {
        let testData = [];
        for (let i = 0; i < numItems; i++) {
            testData.push({
                userName: `Some User (#${i})`,
                email: `someuser${i}@lam.biz`,
                subscription: 'Free',
                number: 100
            })
        }
        return testData;
    }

    it('should display pagination status and paginate correctly', () => {

        var testData = createTestData(76);

        options.setRowsPerPage(10);

        options.setData(testData);

        flushAndApply();

        var expectPaginationState = (current, total) => {
            let textContent = pagination.text().replace(/[\ \n]/g, '');
            expect(textContent).toEqual(`‹Pageof${total}›`);
            expect(pagination.find('.grid-page-box').val()).toEqual(current.toString())
        }

        var nextPage = () => {
            $(pagination.find('a')[1]).click();
        }
        var prevPage = () => {
            $(pagination.find('a')[0]).click();
        }
        var setPage = (page) => {
            pagination.find('.grid-page-box').val(page.toString());
            pagination.find('.grid-page-box').triggerHandler('input');
        }

        expect(dataRows.length).toEqual(10);
        expectPaginationState(1, 8);

        nextPage();

        flushAndApply()

        expect(dataRows.length).toEqual(10);
        expectPaginationState(2, 8);

        setPage(8);

        flushAndApply()

        expect(dataRows.length).toEqual(6);
        expectPaginationState(8, 8);

        prevPage();

        flushAndApply()

        expect(dataRows.length).toEqual(10);
        expectPaginationState(7, 8);

    });

    it('should work with external pagination', (done) => {

        var testData = createTestData(76);

        options.setDefaultFilterByAll(false);
        options.setRowsPerPage(10);

        var currTest = 0;
        var tests = [
            function () {
                expect(dataRows.length).toEqual(10);
                expectPaginationState(1, 8);

                nextPage();
            },
            function () {
                expect(dataRows.length).toEqual(10);
                expectPaginationState(2, 8);

                setPage(8);
            },
            function () {
                expect(dataRows.length).toEqual(6);
                expectPaginationState(8, 8);

                prevPage();
            },
            function () {
                expect(dataRows.length).toEqual(10);
                expectPaginationState(7, 8);
            },

        ]
        var doNextTest = function () {
            setTimeout(function () {
                flushAndApply();
                if (tests[currTest]) tests[currTest]();
                currTest++;
                if (currTest === tests.length) {
                    done();
                }
            }, 0)
        }

        let expectedPagingData = [
            {
                pageNum: 0,
                numOfRows: 10,
                direction: 'asc',
                orderBy: 'userName',
                filter: null,
                filterBy: ['userName', 'email']
            },
            {
                pageNum: 1,
                numOfRows: 10,
                direction: 'asc',
                orderBy: 'userName',
                filter: null,
                filterBy: ['userName', 'email']
            },
            {
                pageNum: 7,
                numOfRows: 10,
                direction: 'asc',
                orderBy: 'userName',
                filter: null,
                filterBy: ['userName', 'email']
            },
            {
                pageNum: 6,
                numOfRows: 10,
                direction: 'asc',
                orderBy: 'userName',
                filter: null,
                filterBy: ['userName', 'email']
            }
        ]
        let expectedIndex = 0;
        var checkPagingData = function (pagingData) {
            expect(pagingData).toDeepEqual(expectedPagingData[expectedIndex]);
            expectedIndex++;
        }


        options.setPaginationMode(options.EXTERNAL_PAGINATION, function (pagingData) {

            checkPagingData(pagingData)

            let defer = $q.defer();

            setTimeout(function () {

                let sortedData = testData.sort((a, b) => {
                    let field = pagingData.orderBy || _.find(columns, c => !!c.header).field;
                    let valA = _.get(a, field);
                    let valB = _.get(b, field);
                    return (pagingData.direction === 'desc' ? -1 : 1) * (valA > valB ? 1 : (valA < valB ? -1 : 0));
                });

                let filteredData = _.filter(sortedData, row => {
                    if (!pagingData.filter) return true;
                    let columns = columns;
                    for (let i in columns) {
                        let col = columns[i];
                        if (row.$groupHeader || (_.get(row, col.field) && _.contains(_.get(row, col.field).toString().toLowerCase(), pagingData.filter.toLowerCase()))) return true;
                    }
                    return false;
                })

                defer.resolve({
                    data: filteredData.slice(pagingData.pageNum * pagingData.numOfRows, pagingData.pageNum * pagingData.numOfRows + pagingData.numOfRows),
                    totalCount: testData.length,
                    filteredCount: filteredData.length
                });
            });

            doNextTest();

            return defer.promise;

        });

        flushAndApply();

        var expectPaginationState = (current, total) => {
            let textContent = pagination.text().replace(/[\ \n]/g, '');
            expect(textContent).toEqual(`‹Pageof${total}›`);
            expect(pagination.find('.grid-page-box').val()).toEqual(current.toString())
        }

        var nextPage = () => {
            $(pagination.find('a')[1]).click();
        }
        var prevPage = () => {
            $(pagination.find('a')[0]).click();
        }
        var setPage = (page) => {
            pagination.find('.grid-page-box').val(page.toString());
            pagination.find('.grid-page-box').triggerHandler('input');
        }

    });

    it('should allow single selection', () => {
        var testData = createTestData(25);

        options.setSortable(false);
        options.setSelection(options.SINGLE_SELECTION);
        options.setData(testData);


        flushAndApply();

        expect(selectionButtons.length).toEqual(25);
        expect(unselectedSelectionButtons.length).toEqual(25);
        expect(selectedSelectionButtons.length).toEqual(0);
        expect(options.getSelectedCount()).toEqual(0);

        $(selectionButtons[5]).click();

        flushAndApply();

        expect(selectionButtons.length).toEqual(25);
        expect(unselectedSelectionButtons.length).toEqual(24);
        expect(selectedSelectionButtons.length).toEqual(1);
        expect(options.getSelectedCount()).toEqual(1);
        expect(testData[5].$selected).toEqual(true);

        $(selectionButtons[8]).click();

        flushAndApply();

        expect(selectionButtons.length).toEqual(25);
        expect(unselectedSelectionButtons.length).toEqual(24);
        expect(selectedSelectionButtons.length).toEqual(1);
        expect(options.getSelectedCount()).toEqual(1);
        expect(testData[5].$selected).toBeUndefined();
        expect(testData[8].$selected).toEqual(true);

    });

    it('should allow multi selection', () => {
        var testData = createTestData(25);

        options.setSortable(false);
        options.setSelection(options.MULTI_SELECTION);
        options.showHeaders();
        options.setData(testData);

        flushAndApply();

        expect(selectionButtons.length).toEqual(26);
        expect(unselectedSelectionButtons.length).toEqual(26);
        expect(selectedSelectionButtons.length).toEqual(0);
        expect(options.getSelectedCount()).toEqual(0);

        $(selectionButtons[6]).click();

        flushAndApply();

        expect(selectionButtons.length).toEqual(26);
        expect(unselectedSelectionButtons.length).toEqual(25);
        expect(selectedSelectionButtons.length).toEqual(1);
        expect(options.getSelectedCount()).toEqual(1);
        expect(testData[5].$selected).toEqual(true);

        $(selectionButtons[9]).click();

        flushAndApply();

        expect(selectionButtons.length).toEqual(26);
        expect(unselectedSelectionButtons.length).toEqual(24);
        expect(selectedSelectionButtons.length).toEqual(2);
        expect(options.getSelectedCount()).toEqual(2);
        expect(testData[5].$selected).toEqual(true);
        expect(testData[8].$selected).toEqual(true);

        $(selectionButtons[0]).click(); // header selection - should select all

        flushAndApply();

        expect(selectionButtons.length).toEqual(26);
        expect(unselectedSelectionButtons.length).toEqual(0);
        expect(selectedSelectionButtons.length).toEqual(26);
        expect(options.getSelectedCount()).toEqual(25);

        $(selectionButtons[0]).click(); // second click on header selection - should deselect all

        flushAndApply();

        expect(selectionButtons.length).toEqual(26);
        expect(unselectedSelectionButtons.length).toEqual(26);
        expect(selectedSelectionButtons.length).toEqual(0);
        expect(options.getSelectedCount()).toEqual(0);

    });

    it('should support sub rows', () => {
        var testData = createTestData(15);
        var subRows1 = createTestData(5);
        var subRows2 = createTestData(3);
        var subRows3 = createTestData(4);

        testData[5].$subRows = subRows1;
        testData[8].$subRows = subRows2;
        testData[12].$subRows = subRows3;

        options.enableSubRows()
            .showHeaders()
            .setRowsPerPage(30)
            .setSortable(false);

        options.setData(testData);

        flushAndApply();

        expect(dataRows.length).toEqual(15);
        expect(subRows.length).toEqual(0);
        expect(rowExpanders.length).toEqual(3)
        expect(rowExpanderPlaceholders.length).toEqual(13); // 15 data rows + 1 header row - 3 real expanders
        expect(openedExpanders.length).toEqual(0);
        expect(closedExpanders.length).toEqual(3);

        rowExpanders[0].click();

        flushAndApply();

        expect(dataRows.length).toEqual(20);
        expect(subRows.length).toEqual(5);
        expect(rowExpanders.length).toEqual(3);
        expect(rowExpanderPlaceholders.length).toEqual(13);
        expect(openedExpanders.length).toEqual(1);
        expect(closedExpanders.length).toEqual(2);

        rowExpanders[1].click();

        flushAndApply();

        expect(dataRows.length).toEqual(23);
        expect(subRows.length).toEqual(8);
        expect(rowExpanders.length).toEqual(3);
        expect(rowExpanderPlaceholders.length).toEqual(13);
        expect(openedExpanders.length).toEqual(2);
        expect(closedExpanders.length).toEqual(1);

        rowExpanders[2].click();

        flushAndApply();

        expect(dataRows.length).toEqual(27);
        expect(subRows.length).toEqual(12);
        expect(rowExpanders.length).toEqual(3);
        expect(rowExpanderPlaceholders.length).toEqual(13);
        expect(openedExpanders.length).toEqual(3);
        expect(closedExpanders.length).toEqual(0);

        rowExpanders[0].click();
        flushAndApply();
        rowExpanders[1].click();
        flushAndApply();
        rowExpanders[2].click();
        flushAndApply();


        expect(dataRows.length).toEqual(15);
        expect(subRows.length).toEqual(0);
        expect(rowExpanders.length).toEqual(3)
        expect(rowExpanderPlaceholders.length).toEqual(13);
        expect(openedExpanders.length).toEqual(0);
        expect(closedExpanders.length).toEqual(3);

    });

})