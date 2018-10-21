class jfGridPaginationController {
	/* @ngInject */
    constructor($scope, $timeout, JFrogEventBus) {

        this.$scope = $scope;
        this.$timeout = $timeout;
	    this.pageViewModel = this.currentPage = 1;


        JFrogEventBus.registerOnScope($scope, JFrogEventBus.getEventsDefinition().RESET_GRID_PAGINATION, () => this.resetPagination());

    }

    $onInit() {
        this.gridApi = this.$scope.gridApi;
        this.$timeout(()=>{
            if (this.gridApi.pagination) {
                this.gridApi.pagination.on.paginationChanged(this.$scope, (pageNum)=> {
                    this.currentPage = pageNum;
                    this.pageViewModel = this.currentPage;
                });
            }
        });
    }

    onBlur() {
	    this.pageViewModel = parseInt(this.pageViewModel);
	    if(!this.pageViewModel) this.pageViewModel = this.currentPage;
    }

    pageChanged() {
	    this.pageViewModel = parseInt(this.pageViewModel);
	    if(this.pageViewModel!== 0 && !this.pageViewModel) return;

        this.currentPage = this.pageViewModel;
        if (this.currentPage < 1) this.currentPage = 1;
        if (this.currentPage > this.gridApi.pagination.getTotalPages()) this.currentPage = this.gridApi.pagination.getTotalPages();
        this.pageViewModel =  this.currentPage;
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