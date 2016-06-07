// TODO: (Adam) improve performence by listening to the batch selection change on gridApi, other than using ng-class
class jfGridBatchActionsController {
    perform(action) {
        if (this.anySelected() && (!action.disabledWhen || !action.disabledWhen())) {
            action.callback && action.callback(this.gridApi.selection.getSelectedRows());
        }
    }
    anySelected() {
        return this.gridApi && this.gridApi.selection.getSelectedRows().length > 0;
    }
}
export function jfGridBatchActions() {
    return {
        scope: {
            actions: '=',
            gridApi: '='
        },
        templateUrl: 'directives/jf_grid_batch_actions/jf_grid_batch_actions.html',
        controller: jfGridBatchActionsController,
        controllerAs: 'jfBatchActions',
        bindToController: true
    }
}