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
        this.vsApi = {};

        $scope.$watch('jfTree.api',(api) => {
            if (this.api) {
                this.api._setDirectiveController(this);
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
                    case 'Down':
                    case 'ArrowDown':
                        e.preventDefault();
                        this.api._onArrowKey(true, this.viewPane);
                        break;
                    case 'Up':
                    case 'ArrowUp':
                        e.preventDefault();
                        this.api._onArrowKey(false, this.viewPane);
                        break;
                    case 'Enter':
                        e.preventDefault();
                        if (this.api.getPreSelectedNode() === this.api.GO_UP_NODE) {
                            this.api.drillUp();
                        }
                        else {
                            this.api.selectPreSelected();
                            this.api.toggleSelected(true);
                        }
                        break;
                    case 'Right':
                    case 'ArrowRight': {
                        e.preventDefault();
                        let relevant = this.api.getPreSelectedNode() || this.api.getSelectedNode();
                        if (relevant) {
                            if (!this.api.isNodeOpen(relevant)) this.api.openNode(relevant, true);
                            else {
                                if (relevant.$childrenCache && relevant.$childrenCache.length) {
                                    this.api.preSelectNode(relevant.$childrenCache[0]);
                                }
                            }
                        }
                        break;
                    }
                    case 'Left':
                    case 'ArrowLeft': {
                        e.preventDefault();
                        let relevant = this.api.getPreSelectedNode() || this.api.getSelectedNode();
                        if (relevant) {
                            if (this.api.isNodeOpen(relevant)) this.api.closeNode(relevant);
                            else {
                                let parent = this.api.getParentNode(relevant);
                                if (parent) this.api.preSelectNode(parent);
                            }
                        }
                        break;
                    }
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

    _normalizeWheelEvent(event) {
        var PIXEL_STEP  = 10;
        var LINE_HEIGHT = 40;
        var PAGE_HEIGHT = 800;

        var sX = 0, sY = 0,
            pX = 0, pY = 0;

        if ('detail'      in event) { sY = event.detail; }
        if ('wheelDelta'  in event) { sY = -event.wheelDelta / 120; }
        if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120; }
        if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120; }

        // side scrolling on FF with DOMMouseScroll
        if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
            sX = sY;
            sY = 0;
        }

        pX = sX * PIXEL_STEP;
        pY = sY * PIXEL_STEP;

        if ('deltaY' in event) { pY = event.deltaY; }
        if ('deltaX' in event) { pX = event.deltaX; }

        if ((pX || pY) && event.deltaMode) {
            if (event.deltaMode == 1) {          // delta in LINE units
                pX *= LINE_HEIGHT;
                pY *= LINE_HEIGHT;
            } else {                             // delta in PAGE units
                pX *= PAGE_HEIGHT;
                pY *= PAGE_HEIGHT;
            }
        }

        if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
        if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

        return { spinX  : sX,
            spinY  : sY,
            pixelX : pX,
            pixelY : pY };
    }


    getTotalScrollHeight() {
        return this.viewPane._getPrePagedData().length * parseFloat(this.viewPane.itemHeight);
    }

    getPageHeight() {

        if (this.viewPane.containerHeight) {
            return this.viewPane.containerHeight;
        }
        else {
            let len = this.viewPane._getPrePagedData().length;
            if (len < this.viewPane.itemsPerPage) return len * parseFloat(this.viewPane.itemHeight);
            else return this.viewPane.itemsPerPage * parseFloat(this.viewPane.itemHeight);
        }
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
