export function jfTree() {
    return {
        controller: jfTreeController,
        controllerAs: 'jfTree',
        bindToController: true,
        scope: {
            api: '='
        },
        templateUrl: 'ui_components/jf_tree/jf_tree.html'
    }
}


class jfTreeController {
	/* @ngInject */
    constructor($scope, $element, $timeout, $compile, $rootScope) {
        this.$element = $element;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.$scope = $scope;
	    this.$rootScope = $rootScope;
        this.cellScopes = [];
        this.maxFakeScrollHeight = 1000000;
        $scope.$watch('jfTree.api',(api) => {
            if (this.api) {
                this.api._setDirectiveController(this);
            }
            if (this.api && !this.paginationApi) {
                this.paginationApi = new PaginationApi(this);

                this.paginationApi.registerChangeListener(()=>{
                    this.$timeout(()=>this.refresh(false));
                })

                this.currentPage = 0;
                this.virtualScrollIndex = 0;
            }
        })

        $scope.$on('$destroy', ()=>{
            this.cellScopes.forEach(s=>s.$destroy());
        })

        $(window).on('resize', () => {
            if (this.api.autoHeight) this.api._setAutoItemsPerPage();
        });

        $(this.$element).find('.jf-tree').keydown(e => {
            this.$scope.$apply(() => {
                switch (e.key) {
                    case 'ArrowDown':
                        this.api._onArrowKey(true);
                        break;
                    case 'ArrowUp':
                        this.api._onArrowKey(false);
                        break;
                    case 'ArrowRight':
                        this.api.openNode(this.api.getSelectedNode());
                        break;
                    case 'ArrowLeft':
                        this.api.closeNode(this.api.getSelectedNode());
                        break;
                }
            })
        })

    }


    clearFilter() {
        this.treeFilter = '';
        this.onUpdateFilter();
    }


    compileTemplate(elem, itemId) {
        let node = this.api._getPageData()[itemId];

        if (!node) return;

        let existingScope = _.find(this.cellScopes, s => s.node === node);

        let itemScope;
        if (!existingScope) {
            itemScope = this.$rootScope.$new();

            this.cellScopes.push(itemScope);

            _.extend(itemScope, {
                node,
                appScope: this.api.appScope,
                tree: {
                    api: this.api
                }
            });
        }
        else itemScope = existingScope;

        let template = _.isFunction(this.api.nodeTemplate) ? this.api.nodeTemplate(node) : this.api.nodeTemplate;

        let templateElem = $(template);
	    this.$compile(templateElem)(itemScope);
        elem.empty();
        elem.append(templateElem);
    }

    onMouseWheel($event, $delta, $deltaX, $deltaY) {
        if ($deltaY<0) { // scrollUp
            if (this.virtualScrollIndex + this.api.itemsPerPage < this.api._getPrePagedData().length) {
                $event.preventDefault();
                this.virtualScrollIndex++;
            }
        }
        else if ($deltaY>0) { // scrollDown
            if (this.virtualScrollIndex > 0) {
                $event.preventDefault();
                this.virtualScrollIndex--;
            }
        }
        this.currentPage = Math.floor((this.virtualScrollIndex + this.api.itemsPerPage - 1) / this.api.itemsPerPage);
//        this.api.update(true,true);
        this.syncFakeScroller(false);
    }

    getTotalScrollHeight() {
        return this.api._getPrePagedData().length * parseFloat(this.api.itemHeight);
    }

    initScrollFaker() {
        let scrollParent = $(this.$element).find('.scroll-faker-container');
        scrollParent.on('scroll',(e) => {
            this.$scope.$apply(()=>{
                let len = this.api._getPrePagedData().length;
                if (len) {
                    let maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
                    let relativePosition = scrollParent.scrollTop() / maxScrollTop;
                    this.virtualScrollIndex = Math.round(relativePosition * (len - this.api.itemsPerPage));
                    this.currentPage = Math.floor((this.virtualScrollIndex + this.api.itemsPerPage - 1) / this.api.itemsPerPage);
                }
                else {
                    this.virtualScrollIndex = 0;
                    this.currentPage = 0;
                }
//                this.api.update(true,true);
                this.api.fire('pagination.change', this.paginationApi.getCurrentPage());
            })
        })

    }

    syncFakeScroller(delay = true) {
        let len = this.api._getPrePagedData().length;
        let scrollParent = $(this.$element).find('.scroll-faker-container');
        let relativePosition = this.virtualScrollIndex / (len - this.api.itemsPerPage);

        let sync = () => {
            let maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
            let scrollTop = Math.floor(maxScrollTop * relativePosition);
            scrollParent.scrollTop(scrollTop);
        }
        if (delay) this.$timeout(sync);
        else sync();
    }

    getScrollWidth() {
        let el = $(this.$element).find('.scroll-faker-container')[0];
        return el.offsetWidth - el.clientWidth;
    }

    refresh() {
        /*
                let unusedScopes = _.filter(this.cellScopes, scope => this.api._getPageData().indexOf(scope.node) === -1);
                unusedScopes.forEach(s => {
                    this.cellScopes.splice(this.cellScopes.indexOf(s),1);
                    s.$destroy()
                });
                if (this.paginationApi && updatePagination) this.paginationApi.update();
        */
    }


}

jfTreeController.$inject = ['$scope','$element', '$timeout', '$compile', '$rootScope'];

class PaginationApi {
    constructor(treeCtrl) {
        this.treeCtrl = treeCtrl;
    }
    getTotalPages() {
        return Math.ceil(this.treeCtrl.api.getTotalLengthOfData() / this.treeCtrl.api.itemsPerPage);
    }
    getCurrentPage() {
        return this.treeCtrl.currentPage + 1;
    }
    nextPage() {
        if (this.getCurrentPage() === this.getTotalPages()) return;
        this.treeCtrl.currentPage++;
        this.syncVirtualScroll();
        this.update();
	    this.treeCtrl.api.fire('pagination.change', this.getCurrentPage());
    }

    prevPage() {
        if (this.getCurrentPage() === 1) return;
        this.treeCtrl.currentPage--;
        this.syncVirtualScroll();
        this.update();
	    this.treeCtrl.api.fire('pagination.change', this.getCurrentPage());
    }

    setPage(pageNum) {
	    if (pageNum < 1 || pageNum > this.getTotalPages()) return;

	    this.treeCtrl.currentPage = pageNum - 1;

	    this.syncVirtualScroll()
	    this.update();
	    this.treeCtrl.api.fire('pagination.change', this.getCurrentPage());
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
        this.treeCtrl.virtualScrollIndex = this.treeCtrl.currentPage*this.treeCtrl.api.itemsPerPage;
        this.treeCtrl.syncFakeScroller();
    }

}