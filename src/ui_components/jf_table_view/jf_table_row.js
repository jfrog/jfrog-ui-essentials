class jfTableRowController {
    constructor($compile, $scope, $element, $rootScope, $timeout) {
        this.$compile = $compile;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$rootScope = $rootScope;
        this.$element = $element;
        this.rowScope = this.$rootScope.$new();
        this.rowScope.row = {
            entity: this.data
        };
        $scope.$on('$destroy',()=>{
            this.rowScope.$destroy();
        })
    }
    compileTemplates() {
        this.$timeout(()=>{
            this.$compile($(this.$element).find('.compile-this').children())(this.rowScope);
        })
    }
    kebab(str) {
        return _.kebabCase(str);
    }
}

export function jfTableRow() {
    return {
        controller: jfTableRowController,
        controllerAs: 'jfTableRow',
        bindToController: true,
        replace: true,
        scope: {
            data: '=',
            tableView: '='
        },
        templateUrl: 'ui_components/jf_table_view/jf_table_row.html'
    }
}