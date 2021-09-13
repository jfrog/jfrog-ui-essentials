<template>

    <div>
        <div class="v-scroll-container">
            <div class="v-scroll-inner-container" :style="{transform: 'translate(0, ' + (-getTranslate()) + 'px)', height: containerHeight + 'px', opacity: ready ? 1 : 0}">
                <div class="scroll-faker-container" :style="{transform: 'translate(0, ' + (getTranslate()) + 'px)', right: 0, height: getPageHeight() + 'px'}">
                    <div class="scroll-faker" v-init="initScrollFaker()" :style="{height: (getTotalScrollHeight() > maxFakeScrollHeight ? maxFakeScrollHeight : getTotalScrollHeight()) + 'px'}">
                    </div>
                </div>
                <div class="h-scroll-wrapper" :style="{height: (getPageHeight() + getTranslate()) + 'px'}" @wheel="onMouseWheel">
                    <div class="h-scroll-content">
                        <jf-vscroll-element v-for="(item, $index) in getPage()" :key="$index" :vscroll="jfVScroll" :data="item" :index="$index" :template="childComponent" :variable="withEach" :last="$index === getPage().length - 1"></jf-vscroll-element>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-vscroll',
        props: [
            'withEach',
            'api',
            'in',
            'preventDefaultScroll'
        ],
        'jf@inject': [
            '$scope',
            '$timeout',
            '$compileComp',
            '$element',
            '$q'
        ],
        data() {
            return {
                ready: false,
                maxFakeScrollHeight: 1000000,
                transcludedContent: null,
                containerHeight: 0,
                scrollTimeout: undefined,
                virtualScrollIndex: 0,
                virtScrollDisplacement: 0,
                settingScroll: false,
                itemHeight: undefined,
                itemsPerPage: 1,
                childComponent: null
            };
        },
        watch: {
            in() {
                this.refresh();
            }
        },
        created() {

            let whenReadyDefer = this.$q.defer();
            this.whenReady = whenReadyDefer.promise;
            this.$scope.$watch('jfVScroll.ready', () => {
                if (this.ready) {
                    this.refresh();
                    whenReadyDefer.resolve();
                }
            });
        },
        mounted() {
            this.childComponent = this.$compileComp(this.transcludedContent, this.$parent.$data, this.$parent);
            this.childComponent.props = [this.withEach, 'v_index', 'is_last'];
            this.containerHeight = $(this.$element).parent().height() + 1;
            this._setAutoItemsPerPage();
            this._initApi();
        },
        ng1_legacy: {
            ng1compileFn(element, attrs, transcludeFn) {
                return {
                    post(scope, element, attrs, directiveCtrl) {
                        transcludeFn(clone => {
                            let html = '';
                            for (let i = 0; i < clone.length; i++) {
                                html += clone[i].outerHTML || '';
                            }
                            html = html.replace('v-pre', '');
                            directiveCtrl.transcludedContent = html;
                        });
                    }
                }
            },
            'controllerAs': 'jfVScroll'
        },
        computed: {
/*
            containerHeight() {
                return $(this.$element).parent().height();
            }
*/

        },
        methods: {
            setItemHeight(itemHeight) {
                if (this.itemHeight !== undefined && this.itemHeight !== itemHeight && !this.inequalHeightsWarned) {
                    this.inequalHeightsWarned = true;
                    console.error('Virtual scroll will not work correctly if items are not all the same height');
                }
                if (this.itemHeight === undefined) {
                    this.itemHeight = itemHeight;
                    this._setAutoItemsPerPage();
                    this.ready = true;
                    if (this.api.onInit)
                        this.api.onInit();

                }
            },
            _setAutoItemsPerPage() {
                if (!this.itemHeight)
                    return;
                this.itemsPerPage = Math.floor(this.containerHeight / this.itemHeight);
            },
            getItemsPerPage() {
                return this.itemsPerPage;
            },
            initScrollFaker() {
                let scrollParent = $(this.$element).find('.scroll-faker-container');
                scrollParent.on('scroll', e => {
                    if (this.settingScroll) {
                        this.settingScroll = false;
                        return;
                    }
                    if (this.autoScrolling) {
                        return;
                    }
                    if (this.scrollTimeout) {
                        this.$timeout.cancel(this.scrollTimeout);
                        delete this.scrollTimeout;
                    }
                    let len = this.in.length;
                    if (len) {
                        let maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
                        let relativePosition = scrollParent.scrollTop() / maxScrollTop;
                        if (_.isNaN(relativePosition)) {
                            relativePosition = 1;
                        }
                        let newScrollIndex = relativePosition * (len - this.itemsPerPage);
                        if (newScrollIndex < 0)
                            newScrollIndex = 0;
                        this.virtualScrollIndex = Math.floor(newScrollIndex);
                        this.virtScrollDisplacement = newScrollIndex - this.virtualScrollIndex;

                        if (this.virtualScrollIndex + this.itemsPerPage >= this.in.length - 2) {
                            if (this.bottomReachedListener) {
                                this.bottomReachedListener();
                            }
                        }

                    } else {
                        this.virtualScrollIndex = 0;
                        this.virtScrollDisplacement = 0;
                    }
                });
            },
            syncFakeScroller(delay = true) {
                let len = this.in.length;
                let scrollParent = $(this.$element).find('.scroll-faker-container');
                let relativePosition = this._getCurrentScrollPos() / (len - this.itemsPerPage);

                let sync = () => {
                    let maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
                    let scrollTop = Math.floor(maxScrollTop * relativePosition);
                    this.settingScroll = true;
                    scrollParent.scrollTop(scrollTop);
                };
                if (delay)
                    this.$timeout(sync);
                else
                    sync();
            },
            getPage() {
                let vScrollIndex = this.virtualScrollIndex;
                let additionals = vScrollIndex + this.itemsPerPage + 2 <= this.in.length ? 2 : vScrollIndex + this.itemsPerPage + 1 <= this.in.length ? 1 : 0;
                return this.in.slice(vScrollIndex, vScrollIndex + this.itemsPerPage + additionals);
            },
            getTranslate() {
                let displacement = this.virtScrollDisplacement;
                if (!displacement) {
                    return 0;
                } else {
                    let pixels = displacement * this.itemHeight;
                    return pixels;
                }
            },
            getPageHeight() {
                if (this.containerHeight) {
                    return this.containerHeight;
                } else {
                    let len = this.in.length;
                    if (len < this.itemsPerPage)
                        return len * this.itemHeight;
                    else
                        return this.itemsPerPage * this.itemHeight;
                }
            },
            getTotalScrollHeight() {
                return this.in.length * this.itemHeight;
            },
            onMouseWheel($event) {
                if (this.scrollTimeout) {
                    this.$timeout.cancel(this.scrollTimeout);
                    this.scrollTimeout = undefined;
                }

                let normalDelta = this._normalizeWheelEvent($event).pixelY;
                let xDelta = this._normalizeWheelEvent($event).pixelX;

                if (Math.abs(normalDelta) < Math.abs(xDelta)) {
                    $event.stopPropagation();
                    return;
                }

                let scrollAmount = 0.02 * Math.abs(normalDelta);
                let scrollPosBefore = this._getCurrentScrollPos();
                if ($event.deltaY > 0) {
                    // scrollUp
                    this._scrollTo(scrollPosBefore + scrollAmount);
                } else if ($event.deltaY < 0) {
                    // scrollDown
                    this._scrollTo(scrollPosBefore - scrollAmount);
                }

                if (scrollPosBefore !== this._getCurrentScrollPos() || this.preventDefaultScroll) {
                    $event.preventDefault();    //        this.syncFakeScroller(false);
                }
            },
            _getCurrentScrollPos() {
                return this.virtualScrollIndex + this.virtScrollDisplacement;
            },
            scrollTo(scrollPos, duration = 500) {
                let dist = scrollPos - this._getCurrentScrollPos();
                this.scroll(dist, duration);
            },
            _scrollTo(scrollPos) {
                let dist = scrollPos - this._getCurrentScrollPos();
                this._scroll(dist);
            },
            scroll(numOfRows, duration = 500) {
                if (duration === 0) {
                    this._scroll(numOfRows);
                    return;
                }

                if (this.scrollTimeout) {
                    this.$timeout.cancel(this.scrollTimeout);
                    this.scrollTimeout = undefined;
                }
                let quadraticEase = k => k * (2 - k);

                let interval = 40;
                let currentScrollPos = this._getCurrentScrollPos();

                let steps = Math.ceil(duration / interval);
                let currentStep = 1;

                let cycle = () => {
                    let progress = currentStep / steps;
                    this._scrollTo(currentScrollPos + quadraticEase(progress) * numOfRows);
                    currentStep++;
                    if (currentStep <= steps) {
                        this.scrollTimeout = this.$timeout(() => cycle(), interval);
                    }
                    else {
                        this.scrollTimeout = undefined;
                        this.autoScrolling = false;
                    }
                };
                this.autoScrolling = true;
                cycle();

            },
            _scroll(numOfRows) {
                if (!numOfRows)
                    return;

                let abs = Math.abs(numOfRows);
                let sign = numOfRows / abs;
                let full = Math.floor(abs);
                this.virtualScrollIndex += sign * full;
                this.virtScrollDisplacement += sign * (abs - full);
                if (this.virtScrollDisplacement >= 1) {
                    this.virtualScrollIndex += 1;
                    this.virtScrollDisplacement -= 1;
                }
                if (this.virtScrollDisplacement < 0) {
                    this.virtualScrollIndex -= 1;
                    this.virtScrollDisplacement = 1 - Math.abs(this.virtScrollDisplacement);
                }
                if (this.virtualScrollIndex < 0) {
                    this.virtualScrollIndex = 0;
                    this.virtScrollDisplacement = 0;
                }
                if (this.virtualScrollIndex + this.itemsPerPage >= this.in.length) {
                    this.virtualScrollIndex = this.in.length - this.itemsPerPage;
                    this.virtScrollDisplacement = 0;
                    if (this.bottomReachedListener) {
                        this.bottomReachedListener();
                    }
                }

                if (this.virtualScrollIndex + this.itemsPerPage >= this.in.length - 2) {
                    if (this.bottomReachedListener) {
                        this.bottomReachedListener();
                    }
                }

                if (this.virtualScrollIndex < 0)
                    this.virtualScrollIndex = 0;

                this.syncFakeScroller(false);
            },
            _normalizeWheelEvent(event) {
                var PIXEL_STEP = 10;
                var LINE_HEIGHT = 40;
                var PAGE_HEIGHT = 800;

                var sX = 0, sY = 0, pX = 0, pY = 0;

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
            resetScroll() {
                this.virtualScrollIndex = 0;
                this.virtScrollDisplacement = 0;
                this.syncFakeScroller(false);
            },
            centerOnItem(item) {
                if (!this.ready) {
                    this.whenReady.then(() => {
                        this.centerOnItem(item);
                    });
                    return;
                }

                let prePaged = this.in;
                let index = prePaged.indexOf(item);

                let halfPage = Math.floor(this.itemsPerPage / 2);
                if (prePaged.length <= this.itemsPerPage || index - halfPage < 0) {
                    this.virtualScrollIndex = 0;
                } else if (index + (this.itemsPerPage - halfPage) > prePaged.length) {
                    this.virtualScrollIndex = prePaged.length - this.itemsPerPage;
                } else {
                    this.virtualScrollIndex = index - halfPage;
                }

                this.syncFakeScroller(false);
            },
            bringItemToView(item, jump = true) {
                let prePaged = this.in;
                let index = prePaged.indexOf(item);
                if (index - 1 < this.virtualScrollIndex) {
                    this.scrollTo(index, jump ? 0 : undefined);
                } else if (index + 1 > this.virtualScrollIndex + this.itemsPerPage) {
                    let fullItems = this.containerHeight ? Math.floor(this.containerHeight / this.itemHeight) : this.itemsPerPage;
                    let scrollIndex = index - fullItems >= 0 ? index - fullItems : 0;
                    let displace = this.containerHeight ? 1 - (this.containerHeight / this.itemHeight - fullItems) : 1;
                    let hScrollFactor = 0;
                    if (this._hasHorizontalScrollbar()) {
                        let pixelFactor = this._getHorizontalScrollbarHeight();
                        hScrollFactor = pixelFactor / this.itemHeight;
                    }
                    this.scrollTo(scrollIndex + displace + hScrollFactor, jump ? 0 : undefined);
                }
                this.syncFakeScroller(false);

            },
            _hasHorizontalScrollbar() {
                let hScrollWrapper = $(this.$element).find('.h-scroll-wrapper');
                return hScrollWrapper[0].scrollWidth > hScrollWrapper.width();
            },
            _getHorizontalScrollbarHeight() {
                let hScrollWrapper = $(this.$element).find('.h-scroll-wrapper');
                return hScrollWrapper.height() - hScrollWrapper[0].clientHeight;
            },
            _freezeVScroll() {
                this.$freezedVScrollIndex = this.virtualScrollIndex;
                this.$freezedVScrollDisplacement = this.virtScrollDisplacement;
            },
            _unFreezeVScroll() {
                delete this.$freezedVScrollIndex;
                delete this.$freezedVScrollDisplacement;
            },
            registerScrollListener(listener) {
                if (!this.scrollListener) {
                    this.scrollListener = listener;
                    this.$scope.$watch(() => this.virtualScrollIndex + this.virtScrollDisplacement, () => {
                        this.scrollListener(this._getCurrentScrollPos());
                    });
                }
            },
            registerBottomReachedListener(listener) {
                this.bottomReachedListener = listener;
            },
            refresh() {
                Vue.nextTick(() => {
                    this.containerHeight = $(this.$element).parent().height() + 1;
                    this._setAutoItemsPerPage();
                })
            },
            _initApi() {
                if (this.api) {
                    this.api.getPageData = () => this.getPage();
                    this.api.reset = item => this.resetScroll();
                    this.api.refresh = () => this.refresh();
                    this.api.centerOnItem = item => this.centerOnItem(item);
                    this.api.bringItemToView = (item, jump = true) => this.bringItemToView(item, jump);
                    this.api.freezeScroll = () => this._freezeVScroll();
                    this.api.unFreezeScroll = () => this._unFreezeVScroll();
                    this.api.sync = () => this.syncFakeScroller(false);
                    this.api.scroll = (numOfRows, duration = 500) => this.scroll(numOfRows, duration);
                    this.api.scrollTo = (scrollPos, duration = 500) => this.scrollTo(scrollPos, duration);
                    this.api.registerScrollListener = listener => this.registerScrollListener(listener);
                    this.api.registerBottomReachedListener = listener => this.registerBottomReachedListener(listener);
                    this.api.getItemsPerPage = () => this.getItemsPerPage();
                    this.api.whenReady = () => this.whenReady;

                }
            }

        }
    }

</script>

<style scoped lang="less">

    /deep/ .v-scroll-container {
        overflow: hidden;
        position: relative;
        .scroll-faker-container {
            position: absolute;
            width: 16px;
            overflow: auto;
            overflow-x: hidden;
            z-index: 1000;
            .scroll-faker {
            }
        }
        .h-scroll-wrapper {
            overflow-x: auto;
            overflow-y: hidden;
            .h-scroll-content {
                display: inline-block;
                min-width: 100%;

            }
        }
    }


</style>
