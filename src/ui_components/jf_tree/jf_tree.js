export function jfTree() {
    return {
        controller: jfTreeController,
        controllerAs: 'jfTree',
        bindToController: true,
        scope: {
            api: '=',
            viewPaneName: '@?'
        },
        templateUrl: 'ui_components/jf_tree/jf_tree.html'
    }
}


class jfTreeController {
	/* @ngInject */
    constructor($scope, $element, $timeout, $compile, $rootScope) {
        this.viewPaneName = this.viewPaneName || 'default';
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

                this.paginationApi.registerChangeListener(() => {
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
            if (this.viewPane.autoHeight) this.viewPane._setAutoItemsPerPage();
        });

        $(this.$element).find('.jf-tree').keydown(e => {
            this.$timeout(() => {
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        this.api._onArrowKey(true, this.viewPane);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.api._onArrowKey(false, this.viewPane);
                        break;
                    case 'Enter':
                        e.preventDefault();
                        if (this.api.getSelectedNode() === this.api.GO_UP_NODE) {
                            this.api.drillUp();
                        }
                        else this.api.toggleSelected();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.api.openSelected();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.api.closeNode(this.api.getSelectedNode());
                        break;
                    default:
                        if (!e.ctrlKey && !e.shiftKey && ! e.metaKey && e.key.toLowerCase() === String.fromCharCode(e.which).toLowerCase()) {
                            this.api.fire('keydown', e);
                        }
                }
            })
        })

    }


    clearFilter() {
        this.treeFilter = '';
        this.onUpdateFilter();
    }


    compileTemplate(elem, itemId) {
        let node = this.viewPane._getPageData()[itemId];

        if (!node) return;

        let existingScope = _.find(this.cellScopes, s => s.node === node);

        let itemScope;
        if (!existingScope) {
            itemScope = this.$rootScope.$new();

            this.cellScopes.push(itemScope);

            _.extend(itemScope, {
                node: node.data,
                appScope: this.api.appScope,
                tree: {
                    api: this.api
                }
            });
        }
        else itemScope = existingScope;

        let template = _.isFunction(this.api.nodeTemplate) ? this.api.nodeTemplate(node.data) : this.api.nodeTemplate;

        let templateElem = $(template);
	    this.$compile(templateElem)(itemScope);
        elem.empty();
        elem.append(templateElem);
    }

    onMouseWheel($event, $delta, $deltaX, $deltaY) {
        let scrollAbount = .05 * Math.abs($deltaY);
        let tempVSI = this.virtualScrollIndex;
        if ($deltaY<0) { // scrollUp
            if (this.virtualScrollIndex + this.viewPane.itemsPerPage < this.viewPane._getPrePagedData().length - scrollAbount) {
                this.virtualScrollIndex += scrollAbount;
            }
            else {
                this.virtualScrollIndex = this.viewPane._getPrePagedData().length > this.viewPane.itemsPerPage ? this.viewPane._getPrePagedData().length - this.viewPane.itemsPerPage : 0;
            }
        }
        else if ($deltaY>0) { // scrollDown
            if (this.virtualScrollIndex > scrollAbount) {
                this.virtualScrollIndex -= scrollAbount;
            }
            else {
                this.virtualScrollIndex = 0;
            }
        }

        if (tempVSI !== this.virtualScrollIndex) $event.preventDefault();

        this.currentPage = Math.floor((this.virtualScrollIndex + this.viewPane.itemsPerPage - 1) / this.viewPane.itemsPerPage);
//        this.api.update(true,true);
        this.virtScrollDisplacement = this.virtualScrollIndex - Math.floor(this.virtualScrollIndex);
        this.syncFakeScroller(false);

    }

    resetScroll() {
        this.virtualScrollIndex = 0;
        this.virtScrollDisplacement = 0;
        this.currentPage = 1;
        this.syncFakeScroller(false);
    }

    getTotalScrollHeight() {
        return this.viewPane._getPrePagedData().length * parseFloat(this.viewPane.itemHeight);
    }

    getPageHeight() {
        let len = this.viewPane._getPrePagedData().length;
        if (len < this.viewPane.itemsPerPage) return len * parseFloat(this.viewPane.itemHeight);
        else return this.viewPane.itemsPerPage * parseFloat(this.viewPane.itemHeight);
    }

    initScrollFaker() {
        let scrollParent = $(this.$element).find('.scroll-faker-container');
        scrollParent.on('scroll',(e) => {
            if (this.$$settingScroll) {
                delete this.$$settingScroll;
                return;
            }
            this.$scope.$apply(()=>{
                let len = this.viewPane._getPrePagedData().length;
                if (len) {
                    let maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
                    let relativePosition = scrollParent.scrollTop() / maxScrollTop;
                    if (_.isNaN(relativePosition)) {
                        console.error('scroll -> relativePosition is NaN !');
                        relativePosition = 1;
                    }
                    this.virtualScrollIndex = relativePosition * (len - this.viewPane.itemsPerPage);
                    if (this.virtualScrollIndex < 0) this.virtualScrollIndex = 0;
                    this.virtScrollDisplacement = this.virtualScrollIndex - Math.floor(this.virtualScrollIndex);
                    this.currentPage = Math.floor((this.virtualScrollIndex + this.viewPane.itemsPerPage - 1) / this.viewPane.itemsPerPage);
                }
                else {
                    this.virtualScrollIndex = 0;
                    this.currentPage = 0;
                }
                this.api.fire('pagination.change', this.paginationApi.getCurrentPage());
            })
        })

    }

    getTranslate() {
        if (!this.virtScrollDisplacement) {
            return 0;
        }
        else {
            let pixels = this.virtScrollDisplacement * parseFloat(this.viewPane.itemHeight);
            return pixels;
        }
    }

    syncFakeScroller(delay = true) {
        let len = this.viewPane._getPrePagedData().length;
        let scrollParent = $(this.$element).find('.scroll-faker-container');
        let relativePosition = this.virtualScrollIndex / (len - this.viewPane.itemsPerPage);

        let sync = () => {
            let maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
            let scrollTop = Math.floor(maxScrollTop * relativePosition);
            this.$$settingScroll = true;
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

    isEmpty() {
        return !!(this.api.dataWasSet && !this.viewPane._getRawData().length && !this.viewPane.$freezed);
    }

}

jfTreeController.$inject = ['$scope','$element', '$timeout', '$compile', '$rootScope'];

class PaginationApi {
    constructor(treeCtrl) {
        this.treeCtrl = treeCtrl;
    }
    getTotalPages() {
        return Math.ceil(this.treeCtrl.viewPane.getTotalLengthOfData() / this.treeCtrl.viewPane.itemsPerPage);
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
        this.treeCtrl.virtualScrollIndex = this.treeCtrl.currentPage*this.treeCtrl.viewPane.itemsPerPage;
        this.treeCtrl.syncFakeScroller();
    }

}