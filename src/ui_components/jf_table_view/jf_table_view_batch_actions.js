class jfTableViewBatchActionsController {
    perform(action) {
        if (this.anySelected() && (!action.disabledWhen || !action.disabledWhen())) {
            action.callback && action.callback(this.tableOptions.getSelectedRows());
        }
    }
    anySelected() {
        return this.tableOptions && this.tableOptions.getSelectedRows().length > 0;
    }
}
export function jfTableViewBatchActions() {
    return {
        scope: {
            actions: '=',
            tableOptions: '='
        },
        templateUrl: 'ui_components/jf_table_view/jf_table_view_batch_actions.html',
        controller: jfTableViewBatchActionsController,
        controllerAs: 'jfTableViewBatchActions',
        bindToController: true
    }
}