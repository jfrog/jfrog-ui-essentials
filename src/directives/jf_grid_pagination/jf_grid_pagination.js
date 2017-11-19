class jfGridPaginationController {

    constructor($scope, $timeout, JFrogEventBus) {

        this.$scope = $scope;
        this.gridApi = $scope.gridApi;

        this.currentPage = 1;

        $timeout(()=>{
            if (this.gridApi.pagination) {
                this.gridApi.pagination.on.paginationChanged($scope, (pageNum)=> {
                    this.currentPage = pageNum;
                });
            }
        });

        JFrogEventBus.registerOnScope($scope, JFrogEventBus.getEventsDefinition().RESET_GRID_PAGINATION, () => this.resetPagination());

    }


    pageChanged() {

        this.currentPage = parseInt(this.currentPage);

        if (!this.currentPage) this.currentPage = 1;
        if (this.currentPage < 1) this.currentPage = 1;
        if (this.currentPage > this.gridApi.pagination.getTotalPages()) this.currentPage = this.gridApi.pagination.getTotalPages();
        this.gridApi.pagination.seek(this.currentPage);
    }

    nextPage() {
        if (this.currentPage === this.gridApi.pagination.getTotalPages()) return;
        this.gridApi.pagination.nextPage();
        this.currentPage = this.gridApi.pagination.getPage();
    }
    prevPage() {
        this.gridApi.pagination.previousPage();
        this.currentPage = this.gridApi.pagination.getPage();
    }
    getTotalPages() {
        this.gridApi.pagination.seek(this.currentPage);
        return this.gridApi.pagination.getTotalPages();
    }

    resetPagination() {
        this.gridApi.pagination.seek(1);
        this.currentPage = 1;
    }
}




export function jfGridPagination() {
    return {
        scope: {
            gridApi: '='
        },
        controller: jfGridPaginationController,
        controllerAs: 'jfGridPagination',
        bindToController: true,
        templateUrl: 'directives/jf_grid_pagination/jf_grid_pagination.html'
    }
}