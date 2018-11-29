import {JFGridElement} from './jf_grid_element.browserify';

let jfrogGrid, $scope, timeout, element, jfGridElement, actionMock;

describe('jf_grid', () => {
    function setup(JFrogGridFactory, $rootScope, $timeout) {
        jfrogGrid = JFrogGridFactory;
        $scope = $rootScope.$new();
        timeout = $timeout;
    }

    function compileDirective() {
        actionMock = jest.fn();
        let data = [{name: 'user', role: 'admin'},{name: 'another user', role: 'worker'}];
        let columns = [
            {
                field: 'name',
                displayName: 'Name'
            },
            {
                field: 'role',
                displayName: 'Role',
                actions: {
                    delete:  actionMock
                }
            }
        ];
        window.options = jfrogGrid.getGridInstance($scope)
            .setGridData(data)
            .setColumns(columns)
            .setRowTemplate('default')
            .setMultiSelect();

        $scope = compileHtml('<jf-grid filter-field="name" grid-options="options"></jf-grid>', {options: options});
        jfGridElement = new JFGridElement($('jf-grid'));
    }

    beforeEach(angular.mock.module('jfrog.ui.essentials'));
    beforeEach(inject(setup));

    beforeEach(compileDirective);

    it ('should display data', () => {
        expect(jfGridElement.getCellData(0)).toEqual('user');
        expect(jfGridElement.getCellData(1)).toEqual('admin');
    });

    it ('should display counter with number of records', () => {
        let counterElement = jfGridElement.getCounter();
        expect(counterElement).toBeDefined();
        expect(counterElement.text()).toEqual('2 Records');
    });

    it ('should display pagination', () =>{
        expect(jfGridElement.getGridPagination().length).toEqual(1);
    });

    it ('should display actions', () => {
        expect(jfGridElement.getActions(0).length).toEqual(0);
        expect(jfGridElement.getActions(1).length).toEqual(1);
    });

    describe('filter', () => {
        it ('should filter matching data', () => {
            jfGridElement.applyFilter('se');
            timeout.flush();
            expect(options.api.grid.getVisibleRows().length).toEqual(2);
            expect(jfGridElement.getCellData(0)).toEqual('user');
            expect(jfGridElement.getCellData(1)).toEqual('admin');
        });

        it ('should filter out non matching data', () => {
            jfGridElement.applyFilter('noth');
            timeout.flush();
            expect(options.api.grid.getVisibleRows().length).toEqual(1);
            expect(jfGridElement.getCellData(0)).toEqual('another user');
            expect(jfGridElement.getCellData(1)).toEqual('worker');

            jfGridElement.applyFilter('asdfasdf');
            timeout.flush();
            expect(options.api.grid.getVisibleRows().length).toEqual(1);
            expect(options.api.grid.getVisibleRows()[0].entity).toEqual(jasmine.objectContaining({_emptyRow: true}));

            expect(jfGridElement.getCellData(0)).toEqual('');
            expect(jfGridElement.getCellData(1)).toEqual('');
        });
    });

    it ('should call the actions on click', () => {
        jfGridElement.getActions(1)[0].click();
        expect(actionMock).toHaveBeenCalled();
    });

});