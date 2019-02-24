import {mount, createLocalVue} from '@vue/test-utils';
import JfTableViewComponent from './index.vue';
import {testsBootstrap} from '@/testsBootstrap';

const localVue = createLocalVue();
testsBootstrap(localVue);

let testAppScope;

function getElements(wrapper) {
    let elems = {};

    elems.emptyTablePlaceholder = wrapper.findAll('.empty-table-placeholder')
    elems.newEntityButton = wrapper.findAll('.new-entity')
    elems.headers = wrapper.findAll('.jf-table-row.headers')
    elems.headersCells = wrapper.findAll('.jf-table-cell.header');
    elems.dataCells = wrapper.findAll('.jf-table-cell:not(.header)');
    elems.dataRows = wrapper.findAll('.jf-table-row:not(.headers):not(.group-header)');
    elems.groupHeaders = wrapper.findAll('.jf-table-row.group-header');
    elems.filter = wrapper.findAll('.jf-table-filter');
    elems.filterInput = wrapper.findAll('.jf-table-filter > input');
    elems.pagination = wrapper.findAll('.pagination-controls');
    elems.actionButtons = wrapper.findAll('.action-button > .action-icon');
    elems.selectionButtons = wrapper.findAll('.selection-icon');
    elems.allRows = wrapper.findAll('.jf-table-row');
    elems.selectedSelectionButtons = wrapper.findAll('.selection-icon.selected');
    elems.unselectedSelectionButtons = wrapper.findAll('.selection-icon:not(.selected)');
    elems.compiledCellTemplate = wrapper.findAll('.compiled-cell-template');
    elems.customColumns = wrapper.findAll('.columns-customization-wrap');
    elems.rowExpanders = wrapper.findAll('.row-expander:not(.placeholder):not(.sub-row-expander)');
    elems.rowExpanderPlaceholders = wrapper.findAll('.row-expander.placeholder');
    elems.openedExpanders = wrapper.findAll('.row-expander .action-icon.expanded');
    elems.closedExpanders = wrapper.findAll('.row-expander .action-icon:not(.expanded)');
    elems.subRows = wrapper.findAll('.jf-table-row.sub-row:not(.headers)');

    return elems;
}

let JFrogTableViewOptions = $jfrog.get('JFrogTableViewOptions');
let rootScope = $jfrog.get('$rootScope');

let columns = [
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
        cellTemplate: '<div class="compiled-cell-template" @click="appScope.testAppScopeMethod(row.entity)">{{row.entity.number * 3}}</div>',
        width: "25%"
    }
]

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

function setup(operations = () => {}) {
    testAppScope = rootScope.$new();
    let options = new JFrogTableViewOptions(testAppScope);
    options.setColumns(columns);
    operations(options);
    const wrapper = mount(JfTableViewComponent, {
        localVue,
        propsData: {
            options,
            objectName: 'Test Entity'
        }
    });

    let elems = getElements(wrapper);

    return {wrapper, elems, options};
}

describe('JfTableViewComponent', () => {

    test('should show only empty table placeholder', () => {

        let {elems} = setup((options) => {
            options.setData([]);
            options.showHeaders(false);
        })

        expect(elems.emptyTablePlaceholder.length).toEqual(1);
        expect(elems.newEntityButton.length).toEqual(0);
        expect(elems.headers.length).toEqual(0);
        expect(elems.headersCells.length).toEqual(0);
        expect(elems.dataRows.length).toEqual(0);
        expect(elems.dataCells.length).toEqual(0);
        expect(elems.filter.length).toEqual(1);
        expect(elems.filter.at(0).find('input').attributes('disabled')).toBeTruthy(); // filter should be disabled, when no there is no data.
        expect($(elems.pagination.at(0).element).children().children().length).toEqual(0);
        expect(elems.selectionButtons.length).toEqual(0);

    });

    test('should show add entity button', () => {
        let {elems} = setup((options) => {
            options.setNewEntityAction(() => {
            });
        })
        expect(elems.newEntityButton.length).toEqual(1);
        expect(elems.newEntityButton.at(0).element.textContent.trim()).toEqual('Add a Test Entity');
    });

    test('should call callback when pressing add entity button', (done) => {
        let {elems} = setup((options) => {
            options.setNewEntityAction(() => {
                done();
            });
        })
        expect(elems.newEntityButton.length).toEqual(1);
        elems.newEntityButton.trigger('click');
    });

    test('should show headers', () => {
        let {elems} = setup((options) => {
            options.showHeaders();
        })
        expect(elems.headers.length).toEqual(1);
        expect(elems.headersCells.length).toEqual(4);
        expect(elems.customColumns.length).toEqual(0);
    });

    test('should toggle columns visibility', () => {
        delete localStorage.jfTableViewSettings;

        let {elems, wrapper, options} = setup((options) => {
            options.setId('test-table');
            options.allowColumnsCustomization();
            options.showHeaders();
        })


        expect(elems.customColumns.length).toEqual(1);
        expect(elems.headersCells.length).toEqual(4);

        expect(options.visibleFields).toEqual(["userName", "email", "subscription", "number"])

        let emailSelect = _.find(options.availableColumns, {id: 'email'});
        let subscriptionSelect = _.find(options.availableColumns, {id: 'subscription'});
        emailSelect.isSelected = false;
        subscriptionSelect.isSelected = false;

        options.updateCustomizedColumns();

        wrapper.vm.$forceUpdate();
        elems = getElements(wrapper);
        expect(elems.headersCells.length).toEqual(2);

        expect(options.visibleFields).toEqual(["number", "userName"])
        expect(localStorage.jfTableViewSettings).toEqual('{"test-table":["number","userName"]}')

    });

    test('should show data rows, pagination and filter', () => {
        var testData = [
            {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
            {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium', number: 1},
        ];

        let {elems} = setup((options) => {
            options.setSortable(false);
            options.setData(testData);
        })

        expect(elems.selectionButtons.length).toEqual(0);

        expect(elems.emptyTablePlaceholder.length).toEqual(0);
        expect(elems.dataRows.length).toEqual(2);
        expect(elems.dataCells.length).toEqual(8);

        expect($(elems.filter.at(0).element).css('display')).toEqual('block');
        expect($(elems.pagination.at(0).element).children().children().length).toEqual(1)

        expect(elems.dataCells.at(0).element.textContent.trim()).toEqual(testData[0].userName);
        expect(elems.dataCells.at(1).element.textContent.trim()).toEqual(testData[0].email);
        expect(elems.dataCells.at(2).element.textContent.trim()).toEqual(testData[0].subscription);
        expect(elems.dataCells.at(3).element.textContent.trim()).toEqual((testData[0].number * 3).toString());
        expect(elems.dataCells.at(4).element.textContent.trim()).toEqual(testData[1].userName);
        expect(elems.dataCells.at(5).element.textContent.trim()).toEqual(testData[1].email);
        expect(elems.dataCells.at(6).element.textContent.trim()).toEqual(testData[1].subscription);
        expect(elems.dataCells.at(7).element.textContent.trim()).toEqual((testData[1].number * 3).toString());
    });

    test('should sort when clicking header', () => {
        let testData = [
            {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
            {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium', number: 1},
        ]
        let origData = _.cloneDeep(testData);

        let {elems, options} = setup((options) => {
            options.setSortable(false); //first we check the original order
            options.setData(testData);
            options.showHeaders();
        })

        let expectSorted = (rev = false) => {
            expect(elems.dataCells.at(0).element.textContent.trim()).toEqual(origData[rev ? 1 : 0].userName);
            expect(elems.dataCells.at(1).element.textContent.trim()).toEqual(origData[rev ? 1 : 0].email);
            expect(elems.dataCells.at(2).element.textContent.trim()).toEqual(origData[rev ? 1 : 0].subscription);
            expect(elems.dataCells.at(3).element.textContent.trim()).toEqual((origData[rev ? 1 : 0].number * 3).toString());
            expect(elems.dataCells.at(4).element.textContent.trim()).toEqual(origData[rev ? 0 : 1].userName);
            expect(elems.dataCells.at(5).element.textContent.trim()).toEqual(origData[rev ? 0 : 1].email);
            expect(elems.dataCells.at(6).element.textContent.trim()).toEqual(origData[rev ? 0 : 1].subscription);
            expect(elems.dataCells.at(7).element.textContent.trim()).toEqual((origData[rev ? 0 : 1].number * 3).toString());
        }

        expectSorted();

        options.setSortable(true); //sort by user name (defaults to first column)

        expectSorted(true); //reversed

        $(elems.headersCells.at(2).element).click(); //sort by subscription

        expectSorted();

        $(elems.headersCells.at(3).element).click(); //sort by number

        expectSorted(true);

        $(elems.headersCells.at(2).element).click();

        expectSorted();

    });

    test('should display action buttons & call action callback when action button clicked', (done) => {
        let testData = [
            {userName: 'Shlomo', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
            {userName: 'Reuven', email: 'reu@ven.buzz', subscription: 'Premium', number: 1},
        ]

        let {elems} = setup((options) => {
            options.setSortable(false); // we want to preserve original order
            options.setData(testData);
            options.setActions([
                {
                    icon: 'icon icon-clear',
                    tooltip: 'Delete',
                    callback: (row) => {
                        expect(row.userName).toEqual('Shlomo');
                        setTimeout(() => {
                            $(elems.actionButtons.at(3).element).click();
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
        })


        expect(elems.actionButtons.length).toEqual(4);

        $(elems.actionButtons.at(0).element).click();

    });

    test('should call appScope methods', (done) => {
        let testData = createTestData(76);

        let {elems, wrapper} = setup((options) => {
            options.setRowsPerPage(10);
            options.setSortable(false); // we want to preserve original order
            options.setData(testData);
        })

        testAppScope.testAppScopeMethod = (row) => {
            expect(row.userName).toEqual('Some User (#0)');
            expect(row.email).toEqual('someuser0@lam.biz');
            expect(row.subscription).toEqual('Free');
            expect(row.number).toEqual(100);
            setTimeout(() => {
                elems.pagination.at(0).findAll('a').at(1).trigger('click'); //move to next page
                elems = getElements(wrapper);
                testAppScope.testAppScopeMethod = (row) => {
                    expect(row.userName).toEqual('Some User (#10)');
                    expect(row.email).toEqual('someuser10@lam.biz');
                    expect(row.subscription).toEqual('Free');
                    expect(row.number).toEqual(100);
                    done();
                }
                $(elems.compiledCellTemplate.at(0).element).click();
            }, 0)

        }

        $(elems.compiledCellTemplate.at(0).element).click();

    });

    test('should filter results', () => {

        let testData = [
            {userName: 'Shlomo Azar', email: 'shlomo@lam.biz', subscription: 'Free', number: 4},
            {userName: 'Reuven Azar', email: 'reu@lam.biz', subscription: 'Premium', number: 1},
        ]

        let {elems, wrapper} = setup((options) => {
            options.setData(testData);
        })


        expect(elems.dataRows.length).toEqual(2);

        $(elems.filterInput.at(0).element).val('Shlo');
        elems.filterInput.at(0).trigger('input');

        elems = getElements(wrapper);

        expect(elems.dataRows.length).toEqual(1);
        expect(elems.dataCells.at(0).element.textContent.trim()).toEqual('Shlomo Azar');

        $(elems.filterInput.at(0).element).val('Reu');
        elems.filterInput.at(0).trigger('input');

        elems = getElements(wrapper);

        expect(elems.dataRows.length).toEqual(1);
        expect(elems.dataCells.at(0).element.textContent.trim()).toEqual('Reuven Azar');

        $(elems.filterInput.at(0).element).val('Azar');
        elems.filterInput.at(0).trigger('input');

        elems = getElements(wrapper);

        expect(elems.dataRows.length).toEqual(2);

        $(elems.filterInput.at(0).element).val('lam.biz');
        elems.filterInput.at(0).trigger('input');

        elems = getElements(wrapper);

        expect(elems.dataRows.length).toEqual(2);

        $(elems.filterInput.at(0).element).val('blablabla');
        elems.filterInput.at(0).trigger('input');

        elems = getElements(wrapper);

        expect(elems.dataRows.length).toEqual(0);

    });

    test('should display pagination status and paginate correctly', () => {

        let testData = createTestData(76);

        let {elems, wrapper} = setup((options) => {
            options.setRowsPerPage(10);
            options.setData(testData);
        })

        let expectPaginationState = (current, total) => {
            let textContent = elems.pagination.at(0).text().replace(/[\ \n]/g, '');
            expect(textContent.trim()).toEqual(`outof${total}‹›`);
            expect($(elems.pagination.at(0).find('.grid-page-box').element).val()).toEqual(current.toString())
        }

        let nextPage = () => {
            elems.pagination.at(0).findAll('a').at(1).trigger('click');
        }
        let prevPage = () => {
            elems.pagination.at(0).findAll('a').at(0).trigger('click');
        }
        let setPage = (page) => {
            $(elems.pagination.at(0).find('.grid-page-box').element).val(page.toString());
            elems.pagination.at(0).find('.grid-page-box').trigger('input');
        }

        expect(elems.dataRows.length).toEqual(10);
        expectPaginationState(1, 8);

        nextPage();

        elems = getElements(wrapper);

        expect(elems.dataRows.length).toEqual(10);
        expectPaginationState(2, 8);

        setPage(8);

        elems = getElements(wrapper);

        expect(elems.dataRows.length).toEqual(6);
        expectPaginationState(8, 8);

        prevPage();

        elems = getElements(wrapper);

        expect(elems.dataRows.length).toEqual(10);
        expectPaginationState(7, 8);

    });

    test('should work with external pagination', (done) => {

        let testData = createTestData(76);

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

        let currTest = 0;
        let tests = [
            function () {
                expect(elems.dataRows.length).toEqual(10);
                expectPaginationState(1, 8);

                nextPage();
            },
            function () {
                expect(elems.dataRows.length).toEqual(10);
                expectPaginationState(2, 8);

                setPage(8);
            },
            function () {
                expect(elems.dataRows.length).toEqual(6);
                expectPaginationState(8, 8);

                prevPage();
            },
            function () {
                expect(elems.dataRows.length).toEqual(10);
                expectPaginationState(7, 8);
            },

        ]
        let doNextTest = function () {
            setTimeout(function () {
                wrapper.vm.$refs.top.$refs.pagination.$forceUpdate();
                elems = getElements(wrapper);
                if (tests[currTest]) tests[currTest]();
                currTest++;
                if (currTest === tests.length) {
                    done();
                }
            }, 0)
        }


        let expectedIndex = 0;
        let checkPagingData = function (pagingData) {
            expect(pagingData).toEqual(expectedPagingData[expectedIndex]);
            expectedIndex++;
        }

        let expectPaginationState = (current, total) => {
            let textContent = elems.pagination.at(0).text().replace(/[\ \n]/g, '');
            expect(textContent.trim()).toEqual(`outof${total}‹›`);
            expect($(elems.pagination.at(0).find('.grid-page-box').element).val()).toEqual(current.toString())
        }

        let nextPage = () => {
            elems.pagination.at(0).findAll('a').at(1).trigger('click');
        }
        let prevPage = () => {
            elems.pagination.at(0).findAll('a').at(0).trigger('click');
        }
        let setPage = (page) => {
            $(elems.pagination.at(0).find('.grid-page-box').element).val(page.toString());
            elems.pagination.at(0).find('.grid-page-box').trigger('input');
        }

        let {elems, options, wrapper} = setup((options) => {
            options.setRowsPerPage(10);
            options.setPaginationMode(options.EXTERNAL_PAGINATION, function (pagingData) {

                checkPagingData(pagingData)

                let defer = $jfrog.get('$q').defer();

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

                    doNextTest();
                });

                return defer.promise;

            });

        })

    });

    test('should allow single selection', (done) => {
        let testData = createTestData(25);

        let {elems, wrapper, options} = setup((options) => {
            options.setSortable(false);
            options.setSelection(options.SINGLE_SELECTION);
            options.setData(testData);
        })

        expect(elems.selectionButtons.length).toEqual(25);
        expect(elems.unselectedSelectionButtons.length).toEqual(25);
        expect(elems.selectedSelectionButtons.length).toEqual(0);
        expect(options.getSelectedCount()).toEqual(0);

        elems.selectionButtons.at(5).trigger('click');

        setTimeout(() => {
            elems = getElements(wrapper);

            expect(elems.selectionButtons.length).toEqual(25);
            expect(elems.unselectedSelectionButtons.length).toEqual(24);
            expect(elems.selectedSelectionButtons.length).toEqual(1);
            expect(options.getSelectedCount()).toEqual(1);
            expect(testData[5].$selected).toEqual(true);

            elems.selectionButtons.at(8).trigger('click');

            setTimeout(() => {
                elems = getElements(wrapper);

                expect(elems.selectionButtons.length).toEqual(25);
                expect(elems.unselectedSelectionButtons.length).toEqual(24);
                expect(elems.selectedSelectionButtons.length).toEqual(1);
                expect(options.getSelectedCount()).toEqual(1);
                expect(testData[5].$selected).toBeUndefined();
                expect(testData[8].$selected).toEqual(true);

                done();
            })
        })


    });

    test('should allow multi selection', (done) => {
        let testData = createTestData(25);

        let {elems, wrapper, options} = setup((options) => {
            options.setSortable(false);
            options.setSelection(options.MULTI_SELECTION);
            options.showHeaders();
            options.setData(testData);
        })

        expect(elems.selectionButtons.length).toEqual(26);
        expect(elems.unselectedSelectionButtons.length).toEqual(26);
        expect(elems.selectedSelectionButtons.length).toEqual(0);
        expect(options.getSelectedCount()).toEqual(0);

        elems.selectionButtons.at(6).trigger('click');
        $(elems.allRows.at(6).element).prop('comp').$forceUpdate();

        setTimeout(() => {
            elems = getElements(wrapper);

            expect(elems.selectionButtons.length).toEqual(26);
            expect(elems.unselectedSelectionButtons.length).toEqual(25);
            expect(elems.selectedSelectionButtons.length).toEqual(1);
            expect(options.getSelectedCount()).toEqual(1);
            expect(testData[5].$selected).toEqual(true);

            elems.selectionButtons.at(9).trigger('click');
            $(elems.allRows.at(9).element).prop('comp').$forceUpdate();

            setTimeout(() => {
                elems = getElements(wrapper);

                expect(elems.selectionButtons.length).toEqual(26);
                expect(elems.unselectedSelectionButtons.length).toEqual(24);
                expect(elems.selectedSelectionButtons.length).toEqual(2);
                expect(options.getSelectedCount()).toEqual(2);
                expect(testData[5].$selected).toEqual(true);
                expect(testData[8].$selected).toEqual(true);

                elems.selectionButtons.at(0).trigger('click'); // header selection - should select all
                elems.allRows.wrappers.forEach(w => $(w.element).prop('comp').$forceUpdate())

                setTimeout(() => {
                    elems = getElements(wrapper);

                    expect(elems.selectionButtons.length).toEqual(26);
                    expect(elems.unselectedSelectionButtons.length).toEqual(0);
                    expect(elems.selectedSelectionButtons.length).toEqual(26);
                    expect(options.getSelectedCount()).toEqual(25);

                    elems.selectionButtons.at(0).trigger('click'); // second click on header selection - should deselect all
                    elems.allRows.wrappers.forEach(w => $(w.element).prop('comp').$forceUpdate())

                    setTimeout(() => {
                        elems = getElements(wrapper);

                        expect(elems.selectionButtons.length).toEqual(26);
                        expect(elems.unselectedSelectionButtons.length).toEqual(26);
                        expect(elems.selectedSelectionButtons.length).toEqual(0);
                        expect(options.getSelectedCount()).toEqual(0);
                        done();
                    })

                })

            })

        })

    });

    test('should support grouping and expanding group headers', () => {
        let testData = createTestData(100);

        let {elems, wrapper} = setup((options) => {
            options.setRowsPerPage(101)
            options.setData(testData);
            options.groupBy('number');
        })

        expect(elems.dataRows.length).toEqual(0);
        expect(elems.groupHeaders.length).toEqual(1);

        elems.groupHeaders.at(0).trigger('click');

        elems = getElements(wrapper);

        expect(elems.dataRows.length).toEqual(100);
        expect(elems.groupHeaders.length).toEqual(1);

        elems.groupHeaders.at(0).trigger('click');

        elems = getElements(wrapper);

        expect(elems.dataRows.length).toEqual(0);
        expect(elems.groupHeaders.length).toEqual(1);

    })

    test('should support sub rows', (done) => {
        let testData = createTestData(15);
        let subRows1 = createTestData(5);
        let subRows2 = createTestData(3);
        let subRows3 = createTestData(4);

        testData[5].$subRows = subRows1;
        testData[8].$subRows = subRows2;
        testData[12].$subRows = subRows3;

        let {elems, wrapper} = setup((options) => {
            options.enableSubRows()
                   .showHeaders()
                   .setRowsPerPage(30)
                   .setSortable(false);
            options.setData(testData);
        })

        expect(elems.dataRows.length).toEqual(15);
        expect(elems.subRows.length).toEqual(0);
        expect(elems.rowExpanders.length).toEqual(3)
        expect(elems.rowExpanderPlaceholders.length).toEqual(13); // 15 data rows + 1 header row - 3 real expanders
        expect(elems.openedExpanders.length).toEqual(0);
        expect(elems.closedExpanders.length).toEqual(3);

        elems.rowExpanders.at(0).trigger('click');

        setTimeout(() => {
            elems = getElements(wrapper);

            expect(elems.dataRows.length).toEqual(20);
            expect(elems.subRows.length).toEqual(5);
            expect(elems.rowExpanders.length).toEqual(3);
            expect(elems.rowExpanderPlaceholders.length).toEqual(18);
            expect(elems.openedExpanders.length).toEqual(1);
            expect(elems.closedExpanders.length).toEqual(2);

            elems.rowExpanders.at(1).trigger('click');

            setTimeout(() => {
                elems = getElements(wrapper);

                expect(elems.dataRows.length).toEqual(23);
                expect(elems.subRows.length).toEqual(8);
                expect(elems.rowExpanders.length).toEqual(3);
                expect(elems.rowExpanderPlaceholders.length).toEqual(21);
                expect(elems.openedExpanders.length).toEqual(2);
                expect(elems.closedExpanders.length).toEqual(1);

                elems.rowExpanders.at(2).trigger('click');

                setTimeout(() => {
                    elems = getElements(wrapper);

                    expect(elems.dataRows.length).toEqual(27);
                    expect(elems.subRows.length).toEqual(12);
                    expect(elems.rowExpanders.length).toEqual(3);
                    expect(elems.rowExpanderPlaceholders.length).toEqual(25);
                    expect(elems.openedExpanders.length).toEqual(3);
                    expect(elems.closedExpanders.length).toEqual(0);

                    elems.rowExpanders.at(0).trigger('click');
                    elems = getElements(wrapper);
                    elems.rowExpanders.at(1).trigger('click');
                    elems = getElements(wrapper);
                    elems.rowExpanders.at(2).trigger('click');

                    setTimeout(() => {
                        elems = getElements(wrapper);

                        expect(elems.dataRows.length).toEqual(15);
                        expect(elems.subRows.length).toEqual(0);
                        expect(elems.rowExpanders.length).toEqual(3)
                        expect(elems.rowExpanderPlaceholders.length).toEqual(13);
                        expect(elems.openedExpanders.length).toEqual(0);
                        expect(elems.closedExpanders.length).toEqual(3);

                        done();
                    })
                })
            })
        })

    });

});
