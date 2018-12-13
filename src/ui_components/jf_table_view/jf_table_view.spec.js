'use strict';
describe('unit test: jf_table_view directive & JFTableViewOptions service', function () {

    var $scope;
    var $rootScope;
    var testAppScope;
    var $q;
    var $timeout;
    var JFrogTableViewOptions;
    let elem;
    var options;

    var emptyTablePlaceholder;
    var newEntityButton;
    var headers;
    var headersCells;
    var dataRows;
    var groupHeaders;
    var dataCells;
    var filter;
    var filterInput;
    var pagination;
    var actionButtons;
    var selectionButtons;
    var selectedSelectionButtons;
    var unselectedSelectionButtons;
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

    function getElements(elem = $(document)) {
        emptyTablePlaceholder = elem.find('.empty-table-placeholder')
        newEntityButton = elem.find('.new-entity')
        headers = elem.find('.jf-table-row.headers')
        headersCells = elem.find('.jf-table-cell.header');
        dataCells = elem.find('.jf-table-cell:not(.header)');
        dataRows = elem.find('.jf-table-row:not(.headers):not(.group-header)');
        groupHeaders = elem.find('.jf-table-row.group-header');
        filter = elem.find('.jf-table-filter');
        filterInput = elem.find('.jf-table-filter > input');
        pagination = elem.find('.pagination-controls');
        actionButtons = elem.find('.action-button > .action-icon');
        selectionButtons = elem.find('.selection-icon');
        selectedSelectionButtons = elem.find('.selection-icon.selected');
        unselectedSelectionButtons = elem.find('.selection-icon:not(.selected)');
        compiledCellTemplate = elem.find('.compiled-cell-template');
        customColumns = elem.find('.columns-customization-wrap');
        rowExpanders = elem.find('.row-expander:not(.placeholder):not(.sub-row-expander)');
        rowExpanderPlaceholders = elem.find('.row-expander.placeholder');
        openedExpanders = elem.find('.row-expander .action-icon.expanded');
        closedExpanders = elem.find('.row-expander .action-icon:not(.expanded)');
        subRows = elem.find('.jf-table-row.sub-row:not(.headers)');
    }

    function flushAndApply(elem) {
        try {
            $timeout.flush();
        }
        catch (e) {
        }

        $scope.$apply();
        getElements(elem);
    }

    function compileDirective(attr) {
        // $scope = window.compileDirective('jf-table-view', attr);
        // elem = $('jf-table-view');
        // $scope= $rootScope.$new(testAppScope)
        const compileResult = window.compileDirectiveAndGetElement('jf-table-view', attr);
        $scope = compileResult.$scope;
        elem = $(compileResult.$elem);
        $scope.$apply();

        flushAndApply(elem);
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

    beforeEach(angular.mock.module('jfrog.ui.essentials'));
    beforeEach(inject(setup));

    beforeEach(() => {
        testAppScope = $rootScope.$new();
        options = new JFrogTableViewOptions(testAppScope);
        options.setColumns(columns);

        compileDirective({
            options,
            '@objectName': 'Test Entity'
        });
    });

    it('should compile', function () {
        expect(elem.html()).toMatchSnapshot();
    });

    it('should show only empty table placeholder', () => {
        options = new JFrogTableViewOptions($scope);
        options.setId('empty-table')
            .setEmptyTableText('This table is empty')
            .setData([])
            .showHeaders(false);

        compileDirective({
            options,
            '@objectName': 'Test Entity'
        });
        expect(emptyTablePlaceholder.length).toEqual(1);
        expect(newEntityButton.length).toEqual(0);
        expect(headers.length).toEqual(0);
        expect(headersCells.length).toEqual(0);
        expect(dataRows.length).toEqual(0);
        expect(dataCells.length).toEqual(0);
        expect(filter.length).toEqual(1);
        expect(filter.find('input').attr('disabled')).not.toBeUndefined(); // filter should be disabled, when no there is no data.
        expect(pagination.children().children().length).toEqual(0);
        expect(selectionButtons.length).toEqual(0);

    });
    it('should show add entity button', (done) => {
        options.setNewEntityAction(() => {
        });
        compileDirective({
            options,
            '@objectName': 'Test Entity'
        });
        expect(newEntityButton.length).toEqual(1);
        expect(newEntityButton[0].textContent.trim()).toEqual('Add a Test Entity');
        done();
    });
    it('should call callback when pressing add entity button', (done) => {

        const newEntitHandler = jest.fn(() => {});
        options.setNewEntityAction(newEntitHandler);

        flushAndApply(elem);

        const addBtn = elem.find('.new-entity');
        angular.element(addBtn).triggerHandler('click');

        setTimeout(()=>{
            expect(newEntitHandler.mock.calls.length).toBe(1);
            done();
        });
    });
    it('should show headers', () => {
        options.showHeaders();
        flushAndApply(elem);
        expect(headers.length).toEqual(1);
        expect(headersCells.length).toEqual(4);
        expect(customColumns.length).toEqual(0);
    });
    it('should toggle columns visibility', () => {
        delete localStorage.jfTableViewSettings;
        options.setId('test-table');
        options.allowColumnsCustomization();
        options.showHeaders();

        flushAndApply(elem);
        expect(customColumns.length).toEqual(1);
        expect(headersCells.length).toEqual(4);

        expect(options.visibleFields).toEqual(["userName", "email", "subscription", "number"])
    });
    it('should update columns properties', function () {
        delete localStorage.jfTableViewSettings;

        options.setId('test-table');
        options.allowColumnsCustomization();
        options.showHeaders();

        let emailSelect = _.find(options.availableColumns, {id: 'email'});
        let subscriptionSelect = _.find(options.availableColumns, {id: 'subscription'});
        emailSelect.isSelected = false;
        subscriptionSelect.isSelected = false;

        options.updateCustomizedColumns();

        flushAndApply(elem);
        expect(headersCells.length).toEqual(2);

        expect(options.visibleFields).toEqual(["userName", "number"])
        expect(localStorage.jfTableViewSettings).toEqual('{"test-table":["userName","number"]}')

    });

    it('should show data rows, pagination and filter', () => {
        var testData = [
            {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
            {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium', number: 1},
        ];

        options.setSortable(false);
        options.setData(testData);
        flushAndApply(elem);
        expect(selectionButtons.length).toEqual(0);

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

        flushAndApply(elem);

        expectSorted();

        options.setSortable(true); //sort by user name (defaults to first column)

        flushAndApply(elem);

        expectSorted(true); //reversed

        $(headersCells[2]).click(); //sort by subscription

        flushAndApply(elem);

        expectSorted();

        $(headersCells[3]).click(); //sort by number

        flushAndApply(elem);

        expectSorted(true)

        $(headersCells[3]).click(); //sort by number - desc

        flushAndApply(elem);

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

        flushAndApply(elem);

        expect(actionButtons.length).toEqual(4);

        $(actionButtons[0]).click();

    });

    xit('should call appScope methods', (done) => {
        var testData = createTestData(76);
        options.setRowsPerPage(10);
        options.setSortable(false); // we want to preserve original order
        options.setData(testData);

        flushAndApply(elem);

        testAppScope.testAppScopeMethod = (row) => {
            expect(row.userName).toEqual('Some User (#0)');
            expect(row.email).toEqual('someuser0@lam.biz');
            expect(row.subscription).toEqual('Free');
            expect(row.number).toEqual(100);

            setTimeout(() => {
                $(pagination.find('a')[1]).click(); //move to next page
                // flushAndApply(elem);
                testAppScope.testAppScopeMethod = (row) => {
                    expect(row.userName).toEqual('Some User (#10)');
                    expect(row.email).toEqual('someuser10@lam.biz');
                    expect(row.subscription).toEqual('Free');
                    expect(row.number).toEqual(100);
                    done();
                }
                angular.element(compiledCellTemplate[0]).triggerHandler('click');
            }, 0)

        }

        angular.element(compiledCellTemplate[0]).triggerHandler('click');

    });

    xit('should filter results', () => {

        var testData = [
            {userName: 'Shlomo Azar', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
            {userName: 'Reuven Azar', email: 'reu@lam.biz', subscription: 'Premium', number: 1},
        ]

        options.setData(testData);

        flushAndApply(elem);

        expect(dataRows.length).toEqual(2);

        filterInput.val('Shlo');
        filterInput.triggerHandler('input');

        flushAndApply(elem);

        expect(dataRows.length).toEqual(1);
        expect(dataCells[0].textContent.trim()).toEqual('Shlomo Azar');

        filterInput.val('Reu');
        filterInput.triggerHandler('input');

        flushAndApply(elem);

        expect(dataRows.length).toEqual(1);
        expect(dataCells[0].textContent.trim()).toEqual('Reuven Azar');

        filterInput.val('Azar');
        filterInput.triggerHandler('input');

        flushAndApply(elem);

        expect(dataRows.length).toEqual(2);

        filterInput.val('lam.biz');
        filterInput.triggerHandler('input');

        flushAndApply(elem);

        expect(dataRows.length).toEqual(2);

        filterInput.val('blablabla');
        filterInput.triggerHandler('input');

        flushAndApply(elem);

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

    xit('should display pagination status and paginate correctly', () => {

        var testData = createTestData(76);

        options.setRowsPerPage(10);

        options.setData(testData);

        flushAndApply(elem);

        var expectPaginationState = (current, total) => {
            let textContent = pagination.text().replace(/[\ \n]/g, '');
            expect(textContent.trim()).toEqual(`outof${total}		‹		›`);
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

        flushAndApply(elem)

        expect(dataRows.length).toEqual(10);
        expectPaginationState(2, 8);

        setPage(8);

        flushAndApply(elem)

        expect(dataRows.length).toEqual(6);
        expectPaginationState(8, 8);

        prevPage();

        flushAndApply(elem)

        expect(dataRows.length).toEqual(10);
        expectPaginationState(7, 8);

    });

    xdescribe('external pagination', function () {

        var testData = createTestData(76);

        options.setRowsPerPage(10);

        let expectedPagingData = [
            ,
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
        ];

        it('should go to next page', function () {
            options.setPaginationMode(options.EXTERNAL_PAGINATION, function (pagingData) {
                return $q((res, rej) => {
                    expect(pagingData).toEqual({
                        pageNum: 0,
                        numOfRows: 10,
                        direction: 'asc',
                        orderBy: 'userName',
                        filter: null,
                        filterBy: ['userName', 'email']
                    });

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
                })

            });
            flushAndApply(elem);

        });
    });

    xit('should work with external pagination', (done) => {

        var testData = createTestData(76);

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
                flushAndApply(elem);
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

        flushAndApply(elem);

        var expectPaginationState = (current, total) => {
            let textContent = pagination.text().replace(/[\ \n]/g, '');
            expect(textContent.trim()).toEqual(`outof${total}		‹		›`);
            expect(pagination.find('.grid-page-box').val()).toEqual(current.toString())
        }

        var nextPage = () => {
            angular.element(pagination.find('a')[1]).triggerHandler('click');
        }
        var prevPage = () => {
            angular.element(pagination.find('a')[0]).triggerHandler('click');
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


        flushAndApply(elem);

        expect(selectionButtons.length).toEqual(25);
        expect(unselectedSelectionButtons.length).toEqual(25);
        expect(selectedSelectionButtons.length).toEqual(0);
        expect(options.getSelectedCount()).toEqual(0);

        $(selectionButtons[5]).click();

        flushAndApply(elem);

        expect(selectionButtons.length).toEqual(25);
        expect(unselectedSelectionButtons.length).toEqual(24);
        expect(selectedSelectionButtons.length).toEqual(1);
        expect(options.getSelectedCount()).toEqual(1);
        expect(testData[5].$selected).toEqual(true);

        $(selectionButtons[8]).click();

        flushAndApply(elem);

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

        flushAndApply(elem);

        expect(selectionButtons.length).toEqual(26);
        expect(unselectedSelectionButtons.length).toEqual(26);
        expect(selectedSelectionButtons.length).toEqual(0);
        expect(options.getSelectedCount()).toEqual(0);

        $(selectionButtons[6]).click();

        flushAndApply(elem);

        expect(selectionButtons.length).toEqual(26);
        expect(unselectedSelectionButtons.length).toEqual(25);
        expect(selectedSelectionButtons.length).toEqual(1);
        expect(options.getSelectedCount()).toEqual(1);
        expect(testData[5].$selected).toEqual(true);

        $(selectionButtons[9]).click();

        flushAndApply(elem);

        expect(selectionButtons.length).toEqual(26);
        expect(unselectedSelectionButtons.length).toEqual(24);
        expect(selectedSelectionButtons.length).toEqual(2);
        expect(options.getSelectedCount()).toEqual(2);
        expect(testData[5].$selected).toEqual(true);
        expect(testData[8].$selected).toEqual(true);

        $(selectionButtons[0]).click(); // header selection - should select all

        flushAndApply(elem);

        expect(selectionButtons.length).toEqual(26);
        expect(unselectedSelectionButtons.length).toEqual(0);
        expect(selectedSelectionButtons.length).toEqual(26);
        expect(options.getSelectedCount()).toEqual(25);

        $(selectionButtons[0]).click(); // second click on header selection - should deselect all

        flushAndApply(elem);

        expect(selectionButtons.length).toEqual(26);
        expect(unselectedSelectionButtons.length).toEqual(26);
        expect(selectedSelectionButtons.length).toEqual(0);
        expect(options.getSelectedCount()).toEqual(0);

    });

    it('should support grouping and expanding group headers', () => {
        var testData = createTestData(100);
        options.setRowsPerPage(101)
        options.setData(testData);
        options.groupBy('number');

        flushAndApply(elem);

        expect(dataRows.length).toEqual(0);
        expect(groupHeaders.length).toEqual(1);

        $(groupHeaders[0]).click();

        flushAndApply(elem);

        expect(dataRows.length).toEqual(100);
        expect(groupHeaders.length).toEqual(1);

        $(groupHeaders[0]).click();

        flushAndApply(elem);

        expect(dataRows.length).toEqual(0);
        expect(groupHeaders.length).toEqual(1);

    })

    xit('should support sub rows', () => {
        var testData = createTestData(15);
        var subRows1 = createTestData(5);
        var subRows2 = createTestData(3);
        var subRows3 = createTestData(4);

        testData[5].$subRows = subRojws1;
        testData[8].$subRows = subRows2;
        testData[12].$subRows = subRows3;

        options.enableSubRows()
            .showHeaders()
            .setRowsPerPage(30)
            .setSortable(false);

        options.setData(testData);

        flushAndApply(elem);

        expect(dataRows.length).toEqual(15);
        expect(subRows.length).toEqual(0);
        expect(rowExpanders.length).toEqual(3)
        expect(rowExpanderPlaceholders.length).toEqual(13); // 15 data rows + 1 header row - 3 real expanders
        expect(openedExpanders.length).toEqual(0);
        expect(closedExpanders.length).toEqual(3);

        rowExpanders[0].click();

        flushAndApply(elem);

        expect(dataRows.length).toEqual(20);
        expect(subRows.length).toEqual(5);
        expect(rowExpanders.length).toEqual(3);
        expect(rowExpanderPlaceholders.length).toEqual(13);
        expect(openedExpanders.length).toEqual(1);
        expect(closedExpanders.length).toEqual(2);

        rowExpanders[1].click();

        flushAndApply(elem);

        expect(dataRows.length).toEqual(23);
        expect(subRows.length).toEqual(8);
        expect(rowExpanders.length).toEqual(3);
        expect(rowExpanderPlaceholders.length).toEqual(13);
        expect(openedExpanders.length).toEqual(2);
        expect(closedExpanders.length).toEqual(1);

        rowExpanders[2].click();

        flushAndApply(elem);

        expect(dataRows.length).toEqual(27);
        expect(subRows.length).toEqual(12);
        expect(rowExpanders.length).toEqual(3);
        expect(rowExpanderPlaceholders.length).toEqual(13);
        expect(openedExpanders.length).toEqual(3);
        expect(closedExpanders.length).toEqual(0);

        rowExpanders[0].click();
        flushAndApply(elem);
        rowExpanders[1].click();
        flushAndApply(elem);
        rowExpanders[2].click();
        flushAndApply(elem);


        expect(dataRows.length).toEqual(15);
        expect(subRows.length).toEqual(0);
        expect(rowExpanders.length).toEqual(3)
        expect(rowExpanderPlaceholders.length).toEqual(13);
        expect(openedExpanders.length).toEqual(0);
        expect(closedExpanders.length).toEqual(3);

    });

})