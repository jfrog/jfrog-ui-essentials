class jfTableViewController {
    constructor($scope,$element, $timeout, $compile, $rootScope) {
        this.$element = $element;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.rowScopes = [];
        $scope.$watch('jfTableView.options',(options) => {
            if (this.options) {
                this.options.setDirectiveController(this);
            }
        })
        this.compileTemplates();

        $scope.$on('$destroy', ()=>{
            this.rowScopes.forEach(s=>s.$destroy())
        })

        this.paginationApi = new PaginationApi(this);

        this.paginationApi.registerChangeListener(()=>{
            this.rowScopes.forEach(s=>s.$destroy())
            this.rowScopes = [];
            this.compileTemplates();
        })

        this.currentPage = 0;
    }

    getPageData() {
        return this.data.slice(this.currentPage * this.options.rowsPerPage, this.currentPage * this.options.rowsPerPage + this.options.rowsPerPage)
    }

    compileTemplates() {
        this.$timeout(()=>{
            let elems = $(this.$element).find('.compile-this');
            for (let i = 0; i < elems.length; i++) {
                let elem = $(elems[i]);
                let column = $(elem).attr('data-column');
                let row = $(elem).attr('data-row');
                let columnObj = _.find(this.options.columns,{field:column});
                let rowObj = this.getPageData()[row];

                let rowScope = this.$rootScope.$new();

                this.rowScopes.push(rowScope);

                _.extend(rowScope,{
                    row: { entity: rowObj },
                    appScope: this.options.appScope
                });

                let template = columnObj.cellTemplate;
                let templateElem = $(template);
                this.$compile(templateElem)(rowScope);
                elem.empty();
                elem.append(templateElem);
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


class PaginationApi {
    constructor(tableCtrl) {
        this.tableCtrl = tableCtrl;
    }
    getTotalPages() {
        return Math.ceil(this.tableCtrl.data.length / this.tableCtrl.options.rowsPerPage);
    }
    getCurrentPage() {
        return this.tableCtrl.currentPage + 1;
    }
    nextPage() {
        if (this.getCurrentPage() === this.getTotalPages()) return;
        this.tableCtrl.currentPage++;
        this.update();
    }
    prevPage() {
        if (this.getCurrentPage() === 1) return;
        this.tableCtrl.currentPage--;
        this.update();
    }
    setPage(pageNum) {
        if (pageNum < 1 || pageNum > this.getTotalPages()) return;

        this.tableCtrl.currentPage = pageNum - 1;
        this.update();
    }
    update() {
        if (this.getCurrentPage() > this.getTotalPages()) {
            this.setPage(this.getTotalPages());
        }

        if (this.listeners) this.listeners.forEach(listener=>listener(this.getCurrentPage()));
    }

    registerChangeListener(listener) {
        if (!this.listeners) this.listeners = []
        this.listeners.push(listener);
    }
}