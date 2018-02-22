export function jfVScroll($timeout, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            itemVariableName: '@withEach',
            origArray: '&in',
            api: '='
        },
        templateUrl: 'directives/jf_vscroll/jf_vscroll.html',
        controller: jfVScrollController,
        controllerAs: 'jfVScroll',
        bindToController: true,
        transclude: true,
        link: function(scope, element, attrs, directiveCtrl, transcludeFn ) {
            transcludeFn(clone => {
                let html = "";
                for (let i=0; i<clone.length; i++) {
                    html += clone[i].outerHTML||'';
                }
                html = html.replace('ng-non-bindable=""', '');
                directiveCtrl.transcludedContent = html;
            })
        }
    }
}

class jfVScrollController {
    constructor($scope, $timeout, $element, $q) {
        this.$timeout = $timeout;
        this.$scope = $scope;
        this.$element = $element;
        this.maxFakeScrollHeight = 1000000;

        this.virtualScrollIndex = 0;
        this.virtScrollDisplacement = 0;
        this.scrollTimeout = undefined;

        this.itemsPerPage = 1;
        this.itemHeight = undefined;

        this.ready = false;
        let whenReadyDefer = $q.defer();
        this.whenReady = whenReadyDefer.promise;
        $scope.$watch('jfVScroll.ready', () => {
            if (this.ready) whenReadyDefer.resolve();
        })


        this._initApi();


        $scope.$watch('jfVScroll.containerHeight', () => {
            this._setAutoItemsPerPage();
        })
    }

    get containerHeight() {
        return $(this.$element).parent().height();
    }

    setItemHeight(itemHeight) {
        if (this.itemHeight !== undefined && this.itemHeight !== itemHeight && !this.inequalHeightsWarned) {
            this.inequalHeightsWarned = true;
            console.error('Virtual scroll will not work correctly if items are not all the same height');
        }
        if (this.itemHeight === undefined) {
            this.itemHeight = itemHeight;
            this._setAutoItemsPerPage();
            this.ready = true;
        }
    }

    _setAutoItemsPerPage() {
        if (!this.itemHeight) return;
        this.itemsPerPage = Math.floor(this.containerHeight / this.itemHeight);
    }

    initScrollFaker() {
        let scrollParent = $(this.$element).find('.scroll-faker-container');
        scrollParent.on('scroll',(e) => {
            this.$scope.$apply(()=>{
                if (this.$$settingScroll) {
                    delete this.$$settingScroll;
                    return;
                }
                if (this.scrollTimeout) {
                    this.$timeout.cancel(this.scrollTimeout);
                    delete this.scrollTimeout;
                }
                let len = this.origArray().length;
                if (len) {
                    let maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
                    let relativePosition = scrollParent.scrollTop() / maxScrollTop;
                    if (_.isNaN(relativePosition)) {
                        relativePosition = 1;
                    }
                    let newScrollIndex = relativePosition * (len - this.itemsPerPage);
                    if (newScrollIndex < 0) newScrollIndex = 0;
                    this.virtualScrollIndex = Math.floor(newScrollIndex);
                    this.virtScrollDisplacement = newScrollIndex - this.virtualScrollIndex;
                }
                else {
                    this.virtualScrollIndex = 0;
                    this.virtScrollDisplacement = 0;
                }
            })
        })
    }

    syncFakeScroller(delay = true) {
        let len = this.origArray().length;
        let scrollParent = $(this.$element).find('.scroll-faker-container');
        let relativePosition = this._getCurrentScrollPos() / (len - this.itemsPerPage);

        let sync = () => {
            let maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
            let scrollTop = Math.floor(maxScrollTop * relativePosition);
            this.$$settingScroll = true;
            scrollParent.scrollTop(scrollTop);
        }
        if (delay) this.$timeout(sync);
        else sync();
    }

    getPage() {
        let vScrollIndex = this.virtualScrollIndex;
        let additionals = vScrollIndex + this.itemsPerPage + 2 <= this.origArray().length ? 2 : vScrollIndex + this.itemsPerPage + 1 <= this.origArray().length ? 1 : 0;
        return this.origArray().slice(vScrollIndex, vScrollIndex + this.itemsPerPage + additionals);
    }

    getTranslate() {
        let displacement = this.virtScrollDisplacement;
        if (!displacement) {
            return 0;
        }
        else {
            let pixels = displacement * this.itemHeight;
            return pixels;
        }
    }

    getPageHeight() {
        if (this.containerHeight) {
            return this.containerHeight;
        }
        else {
            let len = this.origArray().length;
            if (len < this.itemsPerPage) return len * this.itemHeight;
            else return this.itemsPerPage * this.itemHeight;
        }
    }

    getTotalScrollHeight() {
        return this.origArray().length * this.itemHeight;
    }

    onMouseWheel($event, $delta, $deltaX, $deltaY) {
        if (this.scrollTimeout) {
            this.$timeout.cancel(this.scrollTimeout);
            delete this.scrollTimeout;
        }

        let normalDelta = this._normalizeWheelEvent($event.originalEvent).pixelY;
        let xDelta = this._normalizeWheelEvent($event.originalEvent).pixelX;

        if (Math.abs(normalDelta) < Math.abs(xDelta)) {
            $event.stopPropagation();
            return;
        }

        let scrollAmount = 0.02 * Math.abs(normalDelta);
        let scrollPosBefore = this._getCurrentScrollPos();
        if ($deltaY<0) { // scrollUp
            this._scrollTo(scrollPosBefore + scrollAmount);
        }
        else if ($deltaY>0) { // scrollDown
            this._scrollTo(scrollPosBefore - scrollAmount);
        }

        if (scrollPosBefore !== this._getCurrentScrollPos()) $event.preventDefault();
//        this.syncFakeScroller(false);
    }

    _getCurrentScrollPos() {
        return this.virtualScrollIndex + this.virtScrollDisplacement;
    }

    scrollTo(scrollPos, duration = 500) {
        let dist = scrollPos - this._getCurrentScrollPos();
        this.scroll(dist, duration);
    }

    _scrollTo(scrollPos) {
        let dist = scrollPos - this._getCurrentScrollPos();
        this._scroll(dist);
    }

    scroll(numOfRows, duration = 500) {
        if (duration === 0) {
            this._scroll(numOfRows);
            return;
        }

        if (this.scrollTimeout) {
            this.$timeout.cancel(this.scrollTimeout);
            delete this.scrollTimeout;
        }
        let quadraticEase = (k) => k * (2 - k);

        let interval = 40;
        let currentScrollPos = this._getCurrentScrollPos();

        let steps = Math.ceil(duration/interval);
        let currentStep = 1;

        let cycle = () => {
            let progress = currentStep/steps;
            this._scrollTo(currentScrollPos + quadraticEase(progress)*numOfRows);
            currentStep++;
            if (currentStep <= steps) {
                this.scrollTimeout = this.$timeout(() => cycle(), interval);
            }
            else delete this.scrollTimeout;
        }
        cycle();

    }

    _scroll(numOfRows) {
        if (!numOfRows) return;

        let abs = Math.abs(numOfRows);
        let sign = numOfRows/abs;
        let full = Math.floor(abs);
        this.virtualScrollIndex += sign*full;
        this.virtScrollDisplacement += sign*(abs - full);
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
        if (this.virtualScrollIndex + this.itemsPerPage >= this.origArray().length) {
            this.virtualScrollIndex = this.origArray().length - this.itemsPerPage;
            this.virtScrollDisplacement = 0;
        }

        if (this.virtualScrollIndex < 0) this.virtualScrollIndex = 0;

        this.syncFakeScroller(false);
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

    resetScroll() {
        this.virtualScrollIndex = 0;
        this.virtScrollDisplacement = 0;
        this.syncFakeScroller(false);
    }

    centerOnItem(item) {
        if (!this.ready) {
            this.whenReady.then(() => {
                this.centerOnItem(item)
            });
            return;
        }

        let prePaged = this.origArray();
        let index = prePaged.indexOf(item);

        let halfPage = Math.floor(this.itemsPerPage / 2);
        if (prePaged.length <= this.itemsPerPage || index - halfPage < 0) {
            this.virtualScrollIndex = 0;
        }
        else if (index + (this.itemsPerPage - halfPage) > prePaged.length) {
            this.virtualScrollIndex = prePaged.length - this.itemsPerPage;
        }
        else {
            this.virtualScrollIndex = index - halfPage;
        }

        this.syncFakeScroller(false);
    }

    bringItemToView(item, jump = true) {
        let prePaged = this.origArray();
        let index = prePaged.indexOf(item);
        if (index - 1 < this.virtualScrollIndex) {
            this.scrollTo(index, jump ? 0 : undefined);
        }
        else if (index + 1 > this.virtualScrollIndex + this.itemsPerPage) {
            let fullItems = this.containerHeight ? Math.floor(this.containerHeight/this.itemHeight) : this.itemsPerPage;
            let scrollIndex = index - fullItems >= 0 ? index - fullItems : 0;
            let displace = this.containerHeight ? 1-(this.containerHeight/this.itemHeight - fullItems) : 1;
            let hScrollFactor = 0;
            if (this._hasHorizontalScrollbar()) {
                let pixelFactor = this._getHorizontalScrollbarHeight();
                hScrollFactor = pixelFactor / this.itemHeight;
            }
            this.scrollTo(scrollIndex + displace + hScrollFactor, jump ? 0 : undefined);
        }
        this.syncFakeScroller(false);

    }

    _hasHorizontalScrollbar() {
        let hScrollWrapper = $(this.$element).find('.h-scroll-wrapper');
        return hScrollWrapper[0].scrollWidth > hScrollWrapper.width();
    }

    _getHorizontalScrollbarHeight() {
        let hScrollWrapper = $(this.$element).find('.h-scroll-wrapper');
        return hScrollWrapper.height() - hScrollWrapper[0].clientHeight;
    }

    _freezeVScroll() {
        this.$freezedVScrollIndex = this.virtualScrollIndex;
        this.$freezedVScrollDisplacement = this.virtScrollDisplacement;
    }

    _unFreezeVScroll() {
        delete this.$freezedVScrollIndex;
        delete this.$freezedVScrollDisplacement;
    }

    _initApi() {
        if (this.api) {
            this.api.getPageData = () => this.getPage();
            this.api.reset = item => this.resetScroll();
            this.api.centerOnItem = item => this.centerOnItem(item);
            this.api.bringItemToView = (item, jump = true) => this.bringItemToView(item, jump);
            this.api.freezeScroll = () => this._freezeVScroll();
            this.api.unFreezeScroll = () => this._unFreezeVScroll();
            this.api.sync = () => this.syncFakeScroller(false);
            this.api.scroll = (numOfRows, duration = 500) => this.scroll(numOfRows, duration);
            this.api.scrollTo = (scrollPos, duration = 500) => this.scrollTo(scrollPos, duration);
        }
    }

}
