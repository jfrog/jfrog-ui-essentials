class jfTableViewController {
    constructor($scope,$element) {
        this.$element = $element;
        $scope.$watch('jfTableView.options',(options) => {
            if (this.options) {
                this.options.setDirectiveController(this);
            }
        })

    }
}

export function jfTableView() {
    return {
        controller: jfTableViewController,
        controllerAs: 'jfTableView',
        bindToController: true,
        scope: {
            options: '=',
            objectName: '@'
        },
        templateUrl: 'ui_components/jf_table_view/jf_table_view.html'
    }
}