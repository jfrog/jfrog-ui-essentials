export default function GridApiMock(gridOptions) {
  let elementMock = {
    css: jasmine.createSpy('css')
  };
  elementMock.find = jasmine.createSpy('find').and.returnValue(elementMock);
  
  return {
    grid: {
      id: '1234',
      element: elementMock,
      options: gridOptions
    },
    core: {
      getVisibleRows: jasmine.createSpy('rowsRendered').and.returnValue([]),
      on: {
        rowsRendered: jasmine.createSpy('rowsRendered'),
        sortChanged: jasmine.createSpy('sortChanged')
      }
    },
    selection: {
      on: {
        rowSelectionChanged: jasmine.createSpy('rowSelectionChanged'),
        rowSelectionChangedBatch: jasmine.createSpy('rowSelectionChangedBatch')
      },
      selectRow: jasmine.createSpy('selectRow')
    },
    draggableRows: {
      on: {
        rowDropped: jasmine.createSpy('rowDropped')
      }
    },
    pagination: {
      on: {
        paginationChanged: jasmine.createSpy('paginationChanged')
      }
    },
    colResizable: {
      on: {
        columnSizeChanged: jasmine.createSpy('columnSizeChanged')
      }
    }
  }
}