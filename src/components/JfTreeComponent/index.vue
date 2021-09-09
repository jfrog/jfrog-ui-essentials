<template>
  <div>
    <div
      class="jf-tree"
      :class="viewPaneName + '-pane'"
      tabindex="0"
      style="clear: both"
    >
      <div
        v-if="viewPane"
        class="jf-tree-container"
        :style="{height: getPageHeight() + 'px', overflow: isEmpty() || !api.dataGettersSet ? 'visible' : 'hidden'}"
      >
        <div
          class="tree-items-container"
          :style="{transform: 'translate(0, ' + (-getTranslate()) + 'px)'}"
        >
          <div
            class="scroll-faker-container"
            :style="{transform: 'translate(0, ' + (getTranslate()) + 'px)', right: 0, height: getPageHeight() + 'px'}"
          >
            <div
              v-init="initScrollFaker()"
              class="scroll-faker"
              :style="{height: (getTotalScrollHeight() > maxFakeScrollHeight ? maxFakeScrollHeight : getTotalScrollHeight()) + 'px'}"
            />
          </div>
          <div
            class="h-scroll-wrapper"
            :style="{height: (getPageHeight() + getTranslate()) + 'px'}"
            @mousewheel.prevent="onMouseWheel"
          >
            <div class="h-scroll-content">
              <jf-tree-item
                v-for="(item, $index) in viewPane._getPageData()"
                :key="$index"
                :tree="jfTree"
                :item-id="$index"
                :data="item"
              />
            </div>
          </div>
        </div>

        <div
          v-if="!api.dataGettersSet"
          class="missing-data-setters"
        >
          {{ 'jf-tree: Data getters was not set (call setDataDriver())' }}
        </div>
        <div
          v-if="isEmpty()"
          class="empty-tree-placeholder"
        >
          {{ api.emptyTreeText || 'This tree is empty !' }}
        </div>
        <div
          v-if="noFilterResults"
          class="empty-tree-placeholder filter-no-results"
        >
          Current filter has no results. <a
            href=""
            @click.prevent="clearFilter()"
          >Clear filter</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfTree',
        props: {
            api: {},
            viewPaneName: { default: 'default'}
        },
        'jf@inject': [
            '$scope',
            '$element',
            '$timeout',
            '$compile',
            '$rootScope'
        ],
        data() {
            return {
                viewPane: null,
                maxFakeScrollHeight: 1000000,
                noFilterResults: null,
                virtualScrollIndex: 0,
                virtScrollDisplacement: 0,
                currentPage: 0,
                refreshHack: {count: 1}
            };
        },
        created() {
            this.cellScopes = [];

            this.$scope.$watch('jfTree.api', api => {
                if (this.api) {
                    this.api._setDirectiveController(this);
                }
                if (this.api && !this.paginationApi) {
                    this.paginationApi = new PaginationApi(this);

                    this.paginationApi.registerChangeListener(() => {
                        this.refresh(false);
                    });

                }
            });

            this.$scope.$on('$destroy', () => {
                this.cellScopes.forEach(s => s.$destroy());
            });

            $(window).on('resize', () => {
                if (this.viewPane.autoHeight)
                    this.viewPane._setAutoItemsPerPage();
            });
        },
        mounted() {

            $(this.$element).find('.jf-tree').keydown(e => {
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
                    } else {
                        this.api.selectPreSelected();
                        this.api.toggleSelected(true);
                    }
                    break;
                case 'Right':
                case 'ArrowRight': {
                        e.preventDefault();
                        let relevant = this.api.getPreSelectedNode() || this.api.getSelectedNode();
                        if (relevant) {
                            if (!this.api.isNodeOpen(relevant))
                                this.api.openNode(relevant, true);
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
                            if (this.api.isNodeOpen(relevant))
                                this.api.closeNode(relevant);
                            else {
                                let parent = this.api.getParentNode(relevant);
                                if (parent)
                                    this.api.preSelectNode(parent);
                            }
                        }
                        break;
                    }
                default:
                    if (!e.ctrlKey && !e.shiftKey && !e.metaKey && e.key.toLowerCase() === String.fromCharCode(e.which).toLowerCase()) {
                        this.api.fire('keydown', e);
                    }
                }
            })
    ;
        },
        ng1_legacy: { 'controllerAs': 'jfTree' },
        methods: {
            clearFilter() {
                this.treeFilter = '';
                this.onUpdateFilter();
            },
            compileTemplate(elem, itemId) {
                let node = this.viewPane._getPageData()[itemId];

                if (!node)
                    return;

                let existingScope = _.find(this.cellScopes, s => s.node === node.data);
                let itemScope;
                if (!existingScope) {
                    itemScope = this.$rootScope.$new({
                        node: node.data,
                        appScope: this.api.appScope,
                        tree: { api: this.api }
                    });

                    this.cellScopes.push(itemScope);

                } else
                    itemScope = existingScope;

                let template = _.isFunction(this.api.nodeTemplate) ? this.api.nodeTemplate(node.data) : this.api.nodeTemplate;

                let templateElem = $('<div>' + template + '</div>');
                this.$compile(templateElem.children()[0])(itemScope);
                elem.empty();
                elem.append(templateElem.children()[0]);
            },
            _normalizeWheelEvent(event) {
                let PIXEL_STEP = 10;
                let LINE_HEIGHT = 40;
                let PAGE_HEIGHT = 800;

                let sX = 0, sY = 0, pX = 0, pY = 0;

                if ('detail' in event) {
                    sY = event.detail;
                }
                if ('wheelDelta' in event) {
                    sY = -event.wheelDelta / 120;
                }
                if ('wheelDeltaY' in event) {
                    sY = -event.wheelDeltaY / 120;
                }
                if ('wheelDeltaX' in event) {
                    sX = -event.wheelDeltaX / 120;
                }

                // side scrolling on FF with DOMMouseScroll
                if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
                    sX = sY;
                    sY = 0;
                }

                pX = sX * PIXEL_STEP;
                pY = sY * PIXEL_STEP;

                if ('deltaY' in event) {
                    pY = event.deltaY;
                }
                if ('deltaX' in event) {
                    pX = event.deltaX;
                }

                if ((pX || pY) && event.deltaMode) {
                    if (event.deltaMode == 1) {
                        // delta in LINE units
                        pX *= LINE_HEIGHT;
                        pY *= LINE_HEIGHT;
                    } else {
                        // delta in PAGE units
                        pX *= PAGE_HEIGHT;
                        pY *= PAGE_HEIGHT;
                    }
                }

                if (pX && !sX) {
                    sX = pX < 1 ? -1 : 1;
                }
                if (pY && !sY) {
                    sY = pY < 1 ? -1 : 1;
                }

                return {
                    spinX: sX,
                    spinY: sY,
                    pixelX: pX,
                    pixelY: pY
                };
            },
            onMouseWheel($event, $delta, $deltaX, $deltaY) {

                if (this.viewPane.scrollTimeout) {
                    this.$timeout.cancel(this.viewPane.scrollTimeout);
                    delete this.viewPane.scrollTimeout;
                }
                let normalDelta = this._normalizeWheelEvent($event).pixelY;
                let xDelta = this._normalizeWheelEvent($event).pixelX;

                if (Math.abs(normalDelta) < Math.abs(xDelta)) {
                    $event.stopPropagation();
                    return;
                }

                let scrollAmount = 0.02 * Math.abs(normalDelta);
                let scrollPosBefore = this.viewPane._getCurrentScrollPos();
                if ($event.deltaY > 0) {
                    // scrollUp
                    this.viewPane._scrollTo(scrollPosBefore + scrollAmount);
                } else if ($event.deltaY < 0) {
                    // scrollDown
                    this.viewPane._scrollTo(scrollPosBefore - scrollAmount);
                }


                this.currentPage = Math.floor((this.virtualScrollIndex + this.viewPane.itemsPerPage - 1) / this.viewPane.itemsPerPage);
                if (scrollPosBefore !== this.viewPane._getCurrentScrollPos())
                    $event.preventDefault();
                this.syncFakeScroller(false);

                this.viewPane.focus();
            },
            resetScroll() {

                this.virtualScrollIndex = 0;
                this.virtScrollDisplacement = 0;
                this.currentPage = 1;
                this.syncFakeScroller(false);
            },
            getTotalScrollHeight() {
                return this.viewPane._getPrePagedData().length * parseFloat(this.viewPane.itemHeight);
            },
            getPageHeight() {

                if (this.viewPane.containerHeight) {
                    return this.viewPane.containerHeight;
                } else {
                    let len = this.viewPane._getPrePagedData().length;
                    if (len < this.viewPane.itemsPerPage)
                        return len * parseFloat(this.viewPane.itemHeight);
                    else
                        return this.viewPane.itemsPerPage * parseFloat(this.viewPane.itemHeight);
                }
            },
            initScrollFaker() {
                let scrollParent = $(this.$element).find('.scroll-faker-container');
                scrollParent.on('scroll', e => {
                    if (this.$settingScroll) {
                        delete this.$settingScroll;
                        return;
                    }
                    if (this.viewPane.scrollTimeout) {
                        this.$timeout.cancel(this.viewPane.scrollTimeout);
                        delete this.viewPane.scrollTimeout;
                    }
                    let len = this.viewPane._getPrePagedData().length;
                    if (len) {
                        let maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
                        let relativePosition = scrollParent.scrollTop() / maxScrollTop;
                        if (_.isNaN(relativePosition)) {
                            relativePosition = 1;
                        }
                        let newScrollIndex = relativePosition * (len - this.viewPane.itemsPerPage);
                        if (newScrollIndex < 0)
                            newScrollIndex = 0;
                        this.virtualScrollIndex = Math.floor(newScrollIndex);
                        this.virtScrollDisplacement = newScrollIndex - this.virtualScrollIndex;
                        this.currentPage = Math.floor((this.virtualScrollIndex + this.viewPane.itemsPerPage - 1) / this.viewPane.itemsPerPage);
                    } else {
                        this.virtualScrollIndex = 0;
                        this.virtScrollDisplacement = 0;
                        this.currentPage = 0;
                    }
                    this.api.fire('pagination.change', this.paginationApi.getCurrentPage());
                });
            },
            getTranslate() {
                let displacement = this.$freezedVScrollDisplacement !== undefined ? this.$freezedVScrollDisplacement : this.virtScrollDisplacement;
                if (!displacement) {
                    return 0;
                } else {
                    let pixels = displacement * parseFloat(this.viewPane.itemHeight);
                    return pixels;
                }
            },
            syncFakeScroller(delay = true) {

                let len = this.viewPane._getPrePagedData(true).length;
                let scrollParent = $(this.$element).find('.scroll-faker-container');
                let relativePosition = this.viewPane._getCurrentScrollPos() / (len - this.viewPane.itemsPerPage);

                let sync = () => {
                    let maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
                    let scrollTop = Math.floor(maxScrollTop * relativePosition);
                    this.$settingScroll = true;
                    scrollParent.scrollTop(scrollTop);
                };
                if (delay)
                    this.$timeout(sync);
                else
                    sync();
            },
            getScrollWidth() {
                let el = $(this.$element).find('.scroll-faker-container')[0];
                return el.offsetWidth - el.clientWidth;
            },
            refresh() {
                setTimeout(() => this.refreshHack.count++);
            },
            isEmpty() {
                return !!(this.api.dataWasSet && !this.viewPane._getRawData().length && !this.viewPane.$freezed);
            },
            _freezeVScroll() {
                this.$freezedVScrollIndex = this.virtualScrollIndex;
                this.$freezedVScrollDisplacement = this.virtScrollDisplacement;
            },
            _unFreezeVScroll() {
                delete this.$freezedVScrollIndex;
                delete this.$freezedVScrollDisplacement;
            }
        }
    }

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

            if (this.listeners) this.listeners.forEach(listener => listener(this.getCurrentPage()));
        }

        registerChangeListener(listener) {
            if (!this.listeners) this.listeners = []
            this.listeners.push(listener);
        }

        syncVirtualScroll() {
            this.treeCtrl.virtualScrollIndex = this.treeCtrl.currentPage * this.treeCtrl.viewPane.itemsPerPage;
            this.treeCtrl.syncFakeScroller();
        }

    }

</script>

<style scoped lang="less">
    @import "../../assets/stylesheets/variables.less";
    @import "../../assets/stylesheets/mixins.less";

    /deep/ .jf-tree {
        width: 100%;
        outline: none;
        position: relative;
        .jf-tree-container {
            width: 100%;
            overflow: visible;
            .tree-items-container {
                position: relative;
                .scroll-faker-container {
                    position: absolute;
                    width: 30px;
                    //        height: 100%;
                    overflow: auto;
                    overflow-x: hidden;
                    z-index: 1;
                    .scroll-faker {
                    }
                }
                .h-scroll-wrapper {
                    overflow-x: auto;
                    overflow-y: hidden;
                    .h-scroll-content {
                        display: inline-block;
                        min-width: 100%;

                        .jf-tree-item-vue {
                            cursor: pointer;
                            position: relative;
                            .user-select(none);

                            &:before {
                                content: '';
                                height: inherit;
                                width: 100%;
                                left: 0;
                                right: 0;
                                opacity: .1;
                                position: absolute;
                            }

                            &.quick-find-match {
                                .node-text {
                                    font-weight: 900;
                                }
                            }
                            &:hover {
                                .jf-tree-item-content {
                                    color: @blackBGLight;
                                }
                            }
                            &.selected {
                                &:before {
                                    background: #2291B2;
                                    //              background-color: #e9f4f7;
                                }
                                .jf-tree-item-content {
                                    color: @blackBGLight;
                                }
                            }
                            &.pre-selected:not(.selected) {
                                &:before {
                                    background: #919191;
                                    //              background-color: #f4f4f4;
                                }
                            }
                            //        border: 1px red solid;
                            .jf-tree-item-container {
                                display: flex;
                                flex-direction: row;
                                white-space: nowrap;
                                .jf-tree-indentation {
                                    .indentation-wrap {
                                        display: inline-block;
                                        .indentation-flex-wrap {
                                            position: absolute;
                                            top:0;
                                            left:0;
                                            bottom: 0;
                                            display: flex;
                                            flex-direction: row;
                                            .indentation-unit {
                                                width: 26px;
                                                background-size: 100% 100%;
                                                opacity: .3;
                                            }
                                        }
                                    }
                                }
                                .no-children-line-extension {
                                    //              position: absolute;
                                    opacity: .3;
                                    min-width: 15px;
                                    display: inline-block;
                                    margin-right: 11px;
                                }

                                .node-expander {
                                    min-width: 26px;
                                    position: relative;
                                    display: inline-block;
                                    cursor: pointer;
                                    color: #aaaaaa;
                                    &:hover {
                                        color: @greenBGDark;
                                    }
                                    .icon-addons-arrow-right {
                                        transform: rotate(0deg) translate(8px, 0px) scale(.8,.8);
                                        display: inline-block;
                                    }
                                    &.expanded {
                                        .icon-addons-arrow-right {
                                            transform: rotate(90deg) translate(0px, -9px) scale(.8,.8);
                                        }
                                    }
                                    .spinner-msg-local {
                                        position: absolute;
                                        top: ~"calc(50% - 10px)";
                                        left: ~"calc(50% - 10px)";
                                    }
                                }
                                .jf-tree-item-content {
                                    display: inline-block;
                                    margin-left: 2px;
                                    padding-right: 30px;
                                    .highlight {
                                        color: #222;
                                        background-color: yellow;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>
