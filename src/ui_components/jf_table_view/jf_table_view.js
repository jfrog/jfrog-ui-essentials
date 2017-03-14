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
                this.options._setDirectiveController(this);
            }
        })
        this.compileTemplates();

        $scope.$on('$destroy', ()=>{
            this.rowScopes.forEach(s=>s.$destroy())
        })

        this.paginationApi = new PaginationApi(this);

        this.paginationApi.registerChangeListener(()=>{
            this.refresh();
        })

        this.currentPage = 0;
    }

    getFilteredData() {
        if (!this.tableFilter) return this.data;
        if (!this.filterCache) this.filterCache = _.filter(this.data,(row=>{
            for (let i in this.options.columns) {
                let col = this.options.columns[i];
                if (_.get(row,col.field) && _.contains(_.get(row,col.field).toString().toLowerCase(), this.tableFilter.toLowerCase())) return true;
            }
            return false;
        }))
        return this.filterCache;
    }

    getPageData() {
        return this.getFilteredData().slice(this.currentPage * this.options.rowsPerPage, this.currentPage * this.options.rowsPerPage + this.options.rowsPerPage)
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

    onUpdateFilter() {
        delete this.filterCache;
        this.refresh();
        this.paginationApi.update();
    }
    refresh() {
        this.rowScopes.forEach(s=>s.$destroy())
        this.rowScopes = [];
        this.compileTemplates();
    }

}



class PaginationApi {
    constructor(tableCtrl) {
        this.tableCtrl = tableCtrl;
    }
    getTotalPages() {
        return Math.ceil(this.tableCtrl.getFilteredData().length / this.tableCtrl.options.rowsPerPage);
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