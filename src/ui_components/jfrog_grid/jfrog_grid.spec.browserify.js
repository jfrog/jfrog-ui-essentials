const TEMPLATES_FOLDER = "ui_components/jfrog_grid/templates/";
import GridApiMock from '../../../mocks/grid_api_mock.browserify'
describe('unit test: jfrog_grid ui component', () => {
  let gridOptions;
  let gridApi;
  let result;
  let timeout;
  let q;
  let rootScope;
  let data = [{name: 'moshe', role: 'admin'}, {name: 'avi', role: 'user'}];
  function setup(JFrogGridFactory, $rootScope, $timeout, $q) {
    gridOptions = JFrogGridFactory.getGridInstance($rootScope);
    gridApi = GridApiMock(gridOptions);
    timeout = $timeout;
    q = $q;
    rootScope = $rootScope;
  }

  beforeEach(module('jfrog.ui.essentials'));
  beforeEach(inject(setup));

  describe('initial state', () => {
    it('should start with empty data', () => {
      expect(gridOptions.data).toBeFalsy();
    });
    it('should start with empty columns', () => {
      expect(gridOptions.columnDefs).toBeFalsy();
    });
  });

  describe('setGridData', () => {
    it('should return the gridOptions', () => {
      expect(gridOptions.setGridData(data)).toBe(gridOptions);
    });
    it('should allow to set data', () => {
      gridOptions.setGridData(data);
      expect(gridOptions.data).toBe(data);
    });
    it('should seed a stub row for empty data', () => {
      gridOptions.setGridData([]);
      expect(gridOptions.data).toEqual([{_emptyRow: true}]);
      expect(gridOptions.enableSelectAll).toEqual(false);
    });
  });

  describe('setColumns', () => {
    let downloadCallback = angular.noop;
    let deleteCallback = angular.noop;
    let customCallback = angular.noop;
    let customAction = {callback: customCallback};
    let columns;
    beforeEach(() => {
      columns = [{
        field: 'name',
        actions: {
          download: downloadCallback,
          delete: {callback: deleteCallback, visibleWhen: angular.noop}
        },
        customActions: [customAction]
      }];
      result = gridOptions.setColumns(columns);
    });
    it('should return the gridOptions', () => {
      expect(result).toBe(gridOptions);
    });    
    it('should allow to set columns', () => {
      expect(gridOptions.columnDefs).toEqual(columns);
    });
    it('should set default headerCellTemplate', () => {
      expect(gridOptions.columnDefs[0].headerCellTemplate).toBeDefined();
    });
    it('should set default enableCellEdit', () => {
      expect(gridOptions.columnDefs[0].enableCellEdit).toBe(false);
    });
    it('should set actions', () => {
      expect(gridOptions.columnDefs[0].customActions).toEqual([
        customAction,
        {
            icon: 'icon icon-download',
            href: gridOptions.columnDefs[0].customActions[1].href,
            tooltip: 'Download',
            callback: downloadCallback,
        },
        {
            icon: 'icon icon-clear',
            tooltip: 'Delete',
            callback: deleteCallback,
            visibleWhen: angular.noop
        }
      ]);
    });
  });

  describe('afterRegister', () => {
    let callback;
    beforeEach(() => {
      callback = jest.fn();
      gridOptions.afterRegister(callback);
      gridOptions.onSelectionChangeBatch = angular.noop;
      gridOptions.onSelectionChange = angular.noop;
      gridOptions.onRegisterApi(gridApi);
    });
    it('should call the callback after register', () => {
      expect(callback).toHaveBeenCalledWith(gridApi);
    });
    it('should set the grid api listeners', () => {
      expect(gridApi.selection.on.rowSelectionChanged).toHaveBeenCalled();
      expect(gridApi.selection.on.rowSelectionChangedBatch).toHaveBeenCalled();
      expect(gridApi.core.on.rowsRendered).toHaveBeenCalled();
    });
  });
  describe('setDraggable', () => {
    let draggableCallback = angular.noop;
    beforeEach(() => {
      result = gridOptions.setDraggable(draggableCallback);
    });
    it('should return the gridOptions', () => {
      expect(result).toBe(gridOptions);
    });
    it('should allow to setDraggable', () => {
      expect(gridOptions.draggablefunc).toBe(draggableCallback);
    });
    it('should set the row template', () => {
      expect(gridOptions.rowTemplate).toEqual(TEMPLATES_FOLDER + 'drag_rows.html');
    });
    it('should set the drop listener', () => {
      gridOptions.onRegisterApi(gridApi);

      expect(gridApi.draggableRows.on.rowDropped).toHaveBeenCalled();
    });
  });
  describe('setRowTemplate', () => {
    it('should return itself', () => {
      expect(gridOptions.setRowTemplate('test')).toBe(gridOptions);
    });
    it('should fix the row template', () => {
      gridOptions.setRowTemplate('test');
      expect(gridOptions.rowTemplate).toEqual(TEMPLATES_FOLDER + 'test.html');
    });
  });
  describe('setMultiSelect', () => {
    it('should return itself', () => {
      expect(gridOptions.setMultiSelect()).toBe(gridOptions);
    });
    it('should set multiSelect to true', () => {
      gridOptions.setMultiSelect();
      expect(gridOptions.multiSelect).toBe(true);
    });
  });
  describe('setSingleSelect', () => {
    it('should return itself', () => {
      expect(gridOptions.setSingleSelect()).toBe(gridOptions);
    });
    it('should set multiSelect to false', () => {
      gridOptions.setSingleSelect();
      expect(gridOptions.multiSelect).toBe(false);
    });
  });
  describe('selectItem', () => {
    it('should call selectItem after timeout', () => {
      gridOptions.onRegisterApi(gridApi);
      gridOptions.selectItem();
      expect(gridOptions.api.selection.selectRow).not.toHaveBeenCalled();
      timeout.flush();
      expect(gridOptions.api.selection.selectRow).toHaveBeenCalled();
    });
  });
  describe('setBatchActions', () => {
    let batchActions = [];
    beforeEach(() => {
      result = gridOptions.setBatchActions(batchActions);
    })
    it('should return itself', () => {
      expect(result).toBe(gridOptions);
    });
    it('should set batchActions', () => {
      expect(gridOptions.batchActions).toBe(batchActions);
    });
    it('should set multiSelect to true', () => {
      expect(gridOptions.multiSelect).toBe(true);
    });
  });
  describe('external pagination', () => {
    let whenPagingComplete;
    let paginationCallback;
    beforeEach(() => {
      jest.spyOn(gridOptions, 'setGridData');
      jest.spyOn(gridOptions, 'getPage');
      whenPagingComplete = q.when({total_count: 10, data: data});
      paginationCallback = jest.fn().and.returnValue(whenPagingComplete);
      gridOptions.setColumns([{field: 'name'}]);
      result = gridOptions.setExternalPagination(paginationCallback);
      gridOptions.onRegisterApi(gridApi);
    });

    it('should return itself', () => {
      expect(result).toBe(gridOptions);
    });

    it('should set the correct fields for ui-grid', () => {
        expect(gridOptions.useExternalPagination).toBe(true);
        expect(gridOptions.useExternalSorting).toBe(true);
    });

    it('should set the listeners on gridApi', () => {
      expect(gridApi.pagination.on.paginationChanged).toHaveBeenCalled();
      expect(gridApi.core.on.sortChanged).toHaveBeenCalled();
    });

    it('should set the listeners on gridApi', () => {
      expect(gridOptions.getPage).toHaveBeenCalled();
    });

    describe('getPage', () => {
      beforeEach(() => {
        gridOptions.getPage();
      });
      it('should call the pagination callback', () => {
        expect(paginationCallback).toHaveBeenCalledWith({
          page_num: 1,
          num_of_rows: 25,
          direction: 'asc',
          order_by: 'name'
        });
      });
      it('should set the data and total items', (done) => {
        whenPagingComplete.then(() => {
          expect(gridOptions.totalItems).toEqual(10);
          expect(gridOptions.setGridData).toHaveBeenCalledWith(data);
          done();
        });
        rootScope.$digest();
      });
    });
  });
});
