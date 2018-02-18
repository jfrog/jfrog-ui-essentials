export function jfTabularDnD() {

    return {
        restrict: 'E',
        scope: {
            availableItems: '=',
            selectedItems: '=',
            columns: '=',
            availableItemsColumns: '=?',
            selectedItemsColumns: '=?',
        },
        templateUrl: 'directives/jf_tabular_dnd/jf_tabular_dnd.html',
        controller: jfTabularDnDController,
        controllerAs: 'jfTabularDnD',
        bindToController: true,
    }
}

class jfTabularDnDController {
	/* @ngInject */
    constructor($scope, JFrogTableViewOptions) {
        this.$scope = $scope;
        this.JFrogTableViewOptions = JFrogTableViewOptions;

        if (this.columns) {
            this.availableItemsColumns = this.columns;
            this.selectedItemsColumns = this.columns;
        }

        this.createTables();
    }

    createTables() {
        this.availableItemsTableOptions = new this.JFrogTableViewOptions(this.$scope);
        this.selectedItemsTableOptions = new this.JFrogTableViewOptions(this.$scope);


        this.availableItemsTableOptions.setColumns(this.availableItemsColumns)
            .setSelection(this.availableItemsTableOptions.MULTI_SELECTION)
            .setRowsPerPage(8)
        this.selectedItemsTableOptions.setColumns(this.selectedItemsColumns)
            .setSelection(this.selectedItemsTableOptions.MULTI_SELECTION)
            .setRowsPerPage(8)


        this.availableItemsTableOptions.setData(this.availableItems);
        this.selectedItemsTableOptions.setData(this.selectedItems);
    }


}



