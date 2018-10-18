class jfDragDropPaginationController {
	/* @ngInject */
    constructor() {
    }

    $onInit() {
	    this.currentPage = 0;
	    this.pageViewModel = 1;

	    if (this.paginationApi) {
            this.currentPage = this.paginationApi.getCurrentPage();
	        this.pageViewModel = this.currentPage;

            this.paginationApi.registerChangeListener((pageNum)=>{
                this.currentPage = pageNum;
	            this.pageViewModel = this.currentPage;
            });
        }
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
        if (this.currentPage > this.paginationApi.getTotalPages()) this.currentPage = this.paginationApi.getTotalPages();
	    this.pageViewModel =  this.currentPage;
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