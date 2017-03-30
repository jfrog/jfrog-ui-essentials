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
            if (this.options && !this.options.dirCtrl) {
                this.options._setDirectiveController(this);
            }
            if (this.options && ! this.paginationApi) {
                this.paginationApi = new PaginationApi(this);

                this.paginationApi.registerChangeListener(()=>{
                    this.$timeout(()=>this.refresh(false));
                })

                this.currentPage = 0;
                this.virtualScrollIndex = 0;
            }
        })

        this.$timeout(()=>this.compileTemplates());

        let on_resize = () => this.$timeout(()=>this.options._normalizeWidths());
        
        $(window).on('resize',on_resize);
        $scope.$on('$destroy', ()=>{
            this.rowScopes.forEach(s=>s.$destroy())
            $(window).off('resize',on_resize);
        })

    }

    getFilteredData() {
        if (!this.tableFilter) {
            this.noFilterResults = false;
            return this.options.getData() || [];
        }
        if (!this.filterCache) this.filterCache = _.filter(this.options.getData(),(row=>{
            for (let i in this.options.columns) {
                let col = this.options.columns[i];
                if (_.get(row,col.field) && _.contains(_.get(row,col.field).toString().toLowerCase(), this.tableFilter.toLowerCase())) return true;
            }
            return false;
        }))
        this.noFilterResults = !!(!this.filterCache.length && this.options.getData().length);
        return this.filterCache;
    }

    clearFilter() {
        this.tableFilter = '';
        this.onUpdateFilter();
    }

    getPageData() {
        if (this.options.paginationMode === this.options.PAGINATION) {
            return this.getFilteredData().slice(this.currentPage * this.options.rowsPerPage, this.currentPage * this.options.rowsPerPage + this.options.rowsPerPage)
        }
        else if (this.options.paginationMode === this.options.VIRTUAL_SCROLL) {
            return this.getFilteredData().slice(this.virtualScrollIndex,this.virtualScrollIndex + this.options.rowsPerPage)
        }
    }

    compileTemplates() {
        let elems = $(this.$element).find('.compile-this');
        for (let i = 0; i < elems.length; i++) {
            let elem = $(elems[i]);
            let column = $(elem).attr('data-column');
            let row = $(elem).attr('data-row');
            let columnObj = _.find(this.options.columns,{field:column});
            let rowObj = this.getPageData()[row];

            if (rowObj.$groupHeader) {
                let groupRowObj = {};
                _.set(groupRowObj,rowObj.$groupHeader.field,rowObj.$groupHeader.value);
                rowObj = groupRowObj;
            }
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

    }

    onUpdateFilter() {
        delete this.filterCache;
        this.refresh();
        this.paginationApi.update();
    }
    refresh(updatePagination = true) {
        this.rowScopes.forEach(s=>s.$destroy())
        this.rowScopes = [];
        this.compileTemplates();
        if (this.paginationApi && updatePagination) this.paginationApi.update();
    }
    clearSelection() {
        this.options.getData().forEach(row=>delete row.$selected)
        this.allSelected = false;
    }
    toggleSelectAll() {
        this.allSelected = !this.allSelected;
        this.options.getData().forEach(row=>row.$selected = this.allSelected);
    }
    onMouseWheel($event, $delta, $deltaX, $deltaY) {
        if (this.options.paginationMode === this.options.VIRTUAL_SCROLL) {
            $event.preventDefault();
            if ($deltaY<0) { // scrollUp
                if (this.virtualScrollIndex + this.options.rowsPerPage < this.getFilteredData().length) this.virtualScrollIndex++;
            }
            else if ($deltaY>0) { // scrollDown
                if (this.virtualScrollIndex > 0) this.virtualScrollIndex--;
            }
            this.currentPage = Math.floor((this.virtualScrollIndex + this.options.rowsPerPage - 1) / this.options.rowsPerPage);
            this.options.update();
            this.syncFakeScroller();
        }
    }

    getTotalScrollHeight() {
        return this.options.getData() ? ((this.filterCache || this.options.getData()).length * parseInt(this.options.rowHeight)) + 'px' : '0';
    }

    initScrollFaker() {
        if (this.options.paginationMode === this.options.VIRTUAL_SCROLL) {
            let scrollParent = this.$element.find('.scroll-faker-container');
            scrollParent.on('scroll',(e)=>{
                this.$scope.$apply(()=>{
                    let len = (this.filterCache || this.options.getData()).length;
                    if (len) {
                        let relativePosition = scrollParent.scrollTop()/(len * parseInt(this.options.rowHeight))
                        this.virtualScrollIndex = Math.floor(relativePosition*len);
                        this.currentPage = Math.floor((this.virtualScrollIndex + this.options.rowsPerPage - 1) / this.options.rowsPerPage);
                    }
                    else {
                        this.virtualScrollIndex = 0;
                        this.currentPage = 0;
                    }
                    this.options.update();
                })
            })
        }
    }
    syncFakeScroller() {
        if (this.options.paginationMode === this.options.VIRTUAL_SCROLL) {
            let len = (this.filterCache || this.options.getData()).length;
            let scrollParent = this.$element.find('.scroll-faker-container');
            let relativePosition = this.virtualScrollIndex / len;
            let scrollTop = relativePosition * len * parseInt(this.options.rowHeight);
            scrollParent.scrollTop(scrollTop);
        }
    }

    getScrollWidth() {
        let el = this.$element.find('.scroll-faker-container')[0];
        if (!this.scrollWidthCache) {
            this.scrollWidthCache = (el.offsetWidth - el.clientWidth);
        }
        else {
            this.$timeout(()=>{
                this.scrollWidthCache = (el.offsetWidth - el.clientWidth);
            })
        }
        return this.scrollWidthCache;
    }

    createNewEntity() {
        this.options.newEntityCallback();
        this.$timeout(()=>this.onUpdateFilter());
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
        this.syncVirtualScroll()
        this.update();
    }
    prevPage() {
        if (this.getCurrentPage() === 1) return;
        this.tableCtrl.currentPage--;
        this.syncVirtualScroll()
        this.update();
    }
    setPage(pageNum) {
        if (pageNum < 1 || pageNum > this.getTotalPages()) return;

        this.tableCtrl.currentPage = pageNum - 1;

        this.syncVirtualScroll()
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

    syncVirtualScroll() {
        if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.VIRTUAL_SCROLL) {
            this.tableCtrl.virtualScrollIndex = this.tableCtrl.currentPage*this.tableCtrl.options.rowsPerPage;
            this.tableCtrl.syncFakeScroller();
        }
    }

}