'use strict';
describe('unit test: jf-tabular-dnd directive', function () {

    var $scope;
    var $rootScope;
    var $timeout;
    var $q;

    var availableItems;
    var selectedItems;
    var columns;

    var events = {onChange: () => {}};

    var container;
    var availableRowElements;
    var selectedRowElements;

    var excludeAllButton;
    var includeAllButton;
    var excludeSelectedButton;
    var includeSelectedButton;

    var availableSelectionButtons;
    var selectedSelectionButtons;

    var availableFilterInput;
    var selectedFilterInput;

    function setup(_$timeout_, _$q_, _$rootScope_) {
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $q = _$q_;
    }

    function getElements() {
        container = $('.jf-tabular-dnd');
        availableRowElements = $('.available-table .jf-table-row:not(.headers)');
        selectedRowElements = $('.selected-table .jf-table-row:not(.headers)');

        excludeAllButton = $('.dnd-actions span.dnd-exclude-all');
        includeAllButton = $('.dnd-actions span.dnd-include-all');
        excludeSelectedButton = $('.dnd-actions span.dnd-exclude-selected');
        includeSelectedButton = $('.dnd-actions span.dnd-include-selected');

        availableSelectionButtons = $('.available-table .selection-button');
        selectedSelectionButtons = $('.selected-table .selection-button');

        availableFilterInput = $('.available-table .jf-table-filter input');
        selectedFilterInput = $('.selected-table .jf-table-filter input');
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

        $scope = window.compileDirective('jf-tabular-dnd', attr);

        $timeout.flush();

        getElements();
    }

    beforeEach(m('jfrog.ui.essentials'));
    beforeEach(inject(setup));

    beforeEach(() => {
        availableItems = [];
        selectedItems = [];
        for (var i = 0; i < 4; i++) {
            availableItems.push({
                name: 'Item ' + (i+1),
                numeric: Math.round(100*Math.random()),
                active: Math.random() < .4
            })
        }
        columns = [
            {
                header: "Name",
                field: "name",
                width: "50%",
            },
            {
                header: "Number",
                field: "numeric",
                width: "50%",
            }
        ]
    })

    beforeEach(() => {
        compileDirective({
            availableItems: _.cloneDeep(availableItems),
            selectedItems: _.cloneDeep(selectedItems),
            '&onChange': (params) => events.onChange(params),
            '@entityName': 'Something',
            columns
        });

    })

    it('should show the element in its initialized state', () => {
        expect(container.length).toEqual(1);
        expect(availableRowElements.length).toEqual(4);
        expect(selectedRowElements.length).toEqual(0);
    });

    it('should move all items to the selected table', () => {
        includeAllButton.click();
        flushAndApply();
        getElements();
        expect(availableRowElements.length).toEqual(0);
        expect(selectedRowElements.length).toEqual(4);
    });

    it('should move all items to the selected table and back again', () => {
        includeAllButton.click();
        flushAndApply();
        getElements();
        expect(availableRowElements.length).toEqual(0);
        expect(selectedRowElements.length).toEqual(4);

        excludeAllButton.click();
        flushAndApply();
        getElements();
        expect(availableRowElements.length).toEqual(4);
        expect(selectedRowElements.length).toEqual(0);

    });

    it('should move selected items to the selected table and back again', () => {

        $(availableSelectionButtons[2]).click();
        $(availableSelectionButtons[4]).click();
        includeSelectedButton.click();
        flushAndApply();
        getElements();
        expect(availableRowElements.length).toEqual(2);
        expect(selectedRowElements.length).toEqual(2);

        expect($(availableRowElements[0]).prop('ctrl').data).toEqual(availableItems[0]);
        expect($(availableRowElements[1]).prop('ctrl').data).toEqual(availableItems[2]);
        expect($(selectedRowElements[0]).prop('ctrl').data).toEqual(availableItems[1]);
        expect($(selectedRowElements[1]).prop('ctrl').data).toEqual(availableItems[3]);

        $(selectedSelectionButtons[1]).click();
        $(selectedSelectionButtons[2]).click();
        excludeSelectedButton.click();
        flushAndApply();
        getElements();
        expect(availableRowElements.length).toEqual(4);
        expect(selectedRowElements.length).toEqual(0);

    });


    it('should filter and move all filtered items to selected', () => {

        availableFilterInput.val('Item 1');
        angular.element(availableFilterInput).triggerHandler('input');
        flushAndApply();
        includeAllButton.click();
        flushAndApply();
        availableFilterInput.val(null);
        angular.element(availableFilterInput).triggerHandler('input');
        flushAndApply();
        getElements();
        expect(availableRowElements.length).toEqual(3);
        expect(selectedRowElements.length).toEqual(1);
    });

    it('should fire change event', () => {

        jest.spyOn(events, 'onChange').mockImplementation(() => {});

        includeAllButton.click();
        flushAndApply();
        getElements();

        expect(events.onChange).toHaveBeenCalled();
    })

})