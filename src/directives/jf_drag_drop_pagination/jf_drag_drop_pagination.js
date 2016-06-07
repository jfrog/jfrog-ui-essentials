class jfDragDropPaginationController {

    constructor() {

        this.currentPage = 0;

        if (this.paginationApi) {
            this.currentPage = this.paginationApi.getCurrentPage();

            this.paginationApi.registerChangeListener((pageNum)=>{
                this.currentPage = pageNum;
            });
        }

    }


    pageChanged() {

        this.currentPage = parseInt(this.currentPage);

        if (!this.currentPage) this.currentPage = 1;
        if (this.currentPage < 1) this.currentPage = 1;
        if (this.currentPage > this.paginationApi.getTotalPages()) this.currentPage = this.paginationApi.getTotalPages();
        this.paginationApi.setPage(this.currentPage);
    }

    nextPage() {
        this.paginationApi.nextPage();
        this.currentPage = this.paginationApi.getCurrentPage();
    }
    prevPage() {
        this.paginationApi.prevPage();
        this.currentPage = this.paginationApi.getCurrentPage();
    }
}




export function jfDragDropPagination() {
    return {
        scope: {
            paginationApi: '='
        },
        controller: jfDragDropPaginationController,
        controllerAs: 'jfDragDropPagination',
        bindToController: true,
        templateUrl: 'directives/jf_drag_drop_pagination/jf_drag_drop_pagination.html'
    }
}