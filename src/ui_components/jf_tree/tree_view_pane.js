export class TreeViewPane {
    constructor(viewPaneName, treeApi) {
        this.viewPaneName = viewPaneName;
        this.treeApi = treeApi;
        this.$flatItems = [];

        this.itemHeight = '50px';
        this.itemsPerPage = 25;

        this._renderLinesBackgrounds();
    }

    setItemsPerPage(ipp) {
        this.itemsPerPage = ipp;
        this._renderLinesBackgrounds();
        return this;
    }

    setItemHeight(height) {
        this.itemHeight = height;
        return this;
    }

    update(notifyTree = true) {
        this.refreshFilter();
        if (this.dirCtrl) {
            this.dirCtrl.refresh();
        }

        if (this.autoHeight) this._setAutoItemsPerPage();
        if (notifyTree) this.treeApi.onViewUpdate(this);
    }

    _getCurrentScrollPos() {
        return this.dirCtrl.virtualScrollIndex + this.dirCtrl.virtScrollDisplacement;
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

        let $timeout = this.treeApi.$timeout;
        if (this.scrollTimeout) {
            $timeout.cancel(this.scrollTimeout);
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
                this.scrollTimeout = $timeout(() => cycle(), interval);
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
        this.dirCtrl.virtualScrollIndex += sign*full;
        this.dirCtrl.virtScrollDisplacement += sign*(abs - full);
        if (this.dirCtrl.virtScrollDisplacement >= 1) {
            this.dirCtrl.virtualScrollIndex += 1;
            this.dirCtrl.virtScrollDisplacement -= 1;
        }
        if (this.dirCtrl.virtScrollDisplacement < 0) {
            this.dirCtrl.virtualScrollIndex -= 1;
            this.dirCtrl.virtScrollDisplacement = 1 - Math.abs(this.dirCtrl.virtScrollDisplacement);
        }
        if (this.dirCtrl.virtualScrollIndex < 0) {
            this.dirCtrl.virtualScrollIndex = 0;
            this.dirCtrl.virtScrollDisplacement = 0;
        }
        if (this.dirCtrl.virtualScrollIndex + this.itemsPerPage >= this._getPrePagedData().length) {
            this.dirCtrl.virtualScrollIndex = this._getPrePagedData().length - this.itemsPerPage;
            this.dirCtrl.virtScrollDisplacement = 0;
        }

        this.dirCtrl.syncFakeScroller(false);
    }

    _setDirectiveController(directiveController) {
        this.dirCtrl = directiveController;
        this.dirCtrl.viewPane = this;

        if (this.itemsPerPage === 'auto') {
            this.autoHeight = true;
            this._setAutoItemsPerPage();
        }

    }

    _setAutoItemsPerPage() {
        this.treeApi.$timeout(() => {
            let containerHeight = $(this.dirCtrl.$element).parent().height();
            this.containerHeight = containerHeight;
            this.setItemsPerPage(Math.floor(containerHeight / parseFloat(this.itemHeight)));
        })
    }

    _hasHorizontalScrollbar() {
        let hScrollWrapper = $(this.dirCtrl.$element).find('.h-scroll-wrapper');
        return hScrollWrapper[0].scrollWidth > hScrollWrapper.width();
    }

    _getHorizontalScrollbarHeight() {
        let hScrollWrapper = $(this.dirCtrl.$element).find('.h-scroll-wrapper');
        return hScrollWrapper.height() - hScrollWrapper[0].clientHeight;
    }

    _getPageData() {
        let prePage = this._getPrePagedData();
        let vScrollIndex = this.dirCtrl.$freezedVScrollIndex !== undefined ? this.dirCtrl.$freezedVScrollIndex : this.dirCtrl.virtualScrollIndex;
        return prePage.slice(vScrollIndex, vScrollIndex + this.itemsPerPage + 2);
    }

    _getPrePagedData(ignoreFreeze = false) {
        return this._getSortedData(this._getFilteredData(this._getRawData(ignoreFreeze), ignoreFreeze));
    }

    _getSortedData(sourceData) {
        return sourceData;
    }

    _getFilteredData(sourceData, ignoreCache = false) {
        sourceData = sourceData || this._getRawData(ignoreCache);
        if (this.treeApi.filterCallback && sourceData.length) {
            let filterCache;
            if (!this.filterCache || ignoreCache) {
                filterCache = _.filter(sourceData, item => {
                    let parentIsFilteredOut = false;
                    let curr = item;
                    while (curr.parent) {
                        curr = curr.parent;
                    }
                    if (curr.data !== this.treeApi.GO_UP_NODE && !this.treeApi.filterCallback(curr.data)) {
                        parentIsFilteredOut = true;
                    }

                    return item.data === this.treeApi.GO_UP_NODE || !parentIsFilteredOut && this.treeApi.filterCallback(item.data);
                })
            }
            if (ignoreCache) {
                return filterCache || [];
            }
            else if (filterCache) {
                this.filterCache = filterCache;
                return this.filterCache;
            }
            else {
                return this.filterCache;
            }
        }
        else {
            return sourceData;
        }
    }

    refreshFilter(full = false) {
        if (full) this.$flatItems.forEach(fi => {
            if (fi.data && fi.data.$$$filterResultCache !== undefined) {
                delete fi.data.$$$filterResultCache;
            }
        });
        delete this.filterCache;
    }

    _getRawData(ignoreFreeze = false) {
        return (!ignoreFreeze ? this.$freezedItems : null) || this.$flatItems || [];
    }

    _freeze() {
        if (this.treeApi.$masterFreeze) return;
        this.$freezedItems = [].concat(this.$flatItems);
        this.$freezedOpened = [].concat(this.treeApi.$openedNodes);
        this.treeApi._freezeSelected();
        if (this.dirCtrl) this.dirCtrl._freezeVScroll();
        this.$freezed = true;
    }

    _unFreeze() {
        if (this.treeApi.$masterFreeze) return;

        delete this.$freezedItems;
        delete this.$freezedOpened;
        this.treeApi._unFreezeSelected();
        if (this.dirCtrl) this.dirCtrl._unFreezeVScroll();
        this.$freezed = false;

        this.refreshFilter();
        this.dirCtrl.syncFakeScroller();
    }

    _addChildren(children, level = 0, parent = null) {
        let parentIndex = this.$flatItems.indexOf(parent);
        let added = [];
        children.forEach((node) => {
            let flatItem = this._createFlatItem(node, level, parent);
            added.push(flatItem);
            if (this.treeApi.isNodeOpen(node, true)) {
                this.treeApi.getChildren(node).then(_children => {
                    if (_children && _children.length) {
                        this._addChildren(_children, level + 1, flatItem);
                    }
                })
            }
        })
        let before = this.$flatItems.slice(0, parentIndex + 1);
        let after = this.$flatItems.slice(parentIndex + 1);
        this.$flatItems = before.concat(added).concat(after);
        this.update();
        return added;
    }

    _removeChildren(parent) {
        this.$flatItems = _.filter(this.$flatItems, flat => {
            let remove = false;
            let _parent = flat.parent;
            while (_parent) {
                if (_parent  === parent) {
                    remove = true;
                    break;
                }
                _parent = _parent.parent;
            }
            return !remove;
        })
        this.update();

    }

    _deleteItem(item) {
        let index = this.$flatItems.indexOf(item);
        if (index > 0) {
            delete this.$flatItems[index-1].$isLastChild;
            delete this.$flatItems[index-1].data.$indentation;
        }
        _.remove(this.$flatItems, fi => fi === item);
        _.remove(item.parent.data.$childrenCache, node => node === item.data);
        this._removeChildren(item);
    }

    _buildFlatItems() {
        this.$flatItems = [];
        let paneRoot = _.filter(this.treeApi.$root, node => {
            return this.treeApi.paneSelector(node) === this.viewPaneName;
        })
        this._addChildren(paneRoot);
    }

    _createFlatItem(node, level = 0, parent = null) {
        let flat = {
            pane: this,
            data: node,
            level,
            parent,
            hasChildren: undefined
        }

        if (this.treeApi.childrenChecker) {
            let check = this.treeApi.childrenChecker(node);
            if (check && check.then) {
                check.then((_check) => {
                    flat.hasChildren = _check;
                })
            }
            else flat.hasChildren = check;
        }
        else {
            this.treeApi.getChildren(node).then(children => {
                flat.hasChildren = !!(children && children.length);
            });
        }

        return flat;
    }

    _recursiveOpenRestore(node) {
        let defer = this.treeApi.$q.defer();

        let id = this.treeApi.uniqueIdGetter(node);
        let opened = _.find(this.treeApi.$openedNodes, n => this.treeApi.uniqueIdGetter(n) === id);
        if (opened) {
            _.remove(this.treeApi.$openedNodes, n => n === opened);
            this.treeApi.openNode(node).then(() => {
                let children = node.$childrenCache;
                if (!children || !children.length) defer.resolve();
                else {
                    let pendingPromises = children.length;
                    children.forEach(child => {
                        this._recursiveOpenRestore(child).then(() => {
                            pendingPromises--;
                            if (pendingPromises === 0) {
                                defer.resolve();
                            }
                        })
                    })
                }
            })
        }
        else {
            defer.resolve();
        }

        return defer.promise;
    }

    refreshNode(node) {
        let defer = this.treeApi.$q.defer();
        let flat = this._flatFromNode(node);
        if (flat) {
            this._freeze();
            this._removeChildren(flat);
            delete flat.data.$childrenCache;
            this.refreshNodeContextMenu(flat.data);
            this._recursiveOpenRestore(flat.data).then(() => {
                this._unFreeze();
                defer.resolve();
            });
        }
        return defer.promise;
    }

    refreshNodeContextMenu(node) {
        delete node.$cachedCMItems;
    }

    refreshView() {
        let mainDefer = this.treeApi.$q.defer();

        this._freeze();
        this.treeApi._getRoot().then(() => {
            if (this.treeApi.uniqueIdGetter) {
                let resolveCount = 0;
                let itemsCount = this.$flatItems.length;
                if (!this.$flatItems.length) mainDefer.resolve();
                this.$flatItems.forEach((fi, ind) => {
                    this._recursiveOpenRestore(fi.data).then(() => {
                        resolveCount++;
                        if (resolveCount === itemsCount) {
                            let selectedId = this.treeApi.$selectedNode && this.treeApi.$selectedNode !== this.treeApi.GO_UP_NODE ? this.treeApi.uniqueIdGetter(this.treeApi.$selectedNode) : null;
                            let newSelected = selectedId !== null ? _.find(this.$flatItems, fi => fi.data !== this.treeApi.GO_UP_NODE && this.treeApi.uniqueIdGetter(fi.data) === selectedId) : null;
                            if (this.treeApi.$selectedNode === this.treeApi.GO_UP_NODE) newSelected = _.find(this.$flatItems, fi => fi.data === this.treeApi.GO_UP_NODE);
                            if (newSelected) {
                                this.treeApi._setSelected(newSelected);
                                this._unFreeze();
                                mainDefer.resolve();
                            }
                            else if (selectedId) {
                                this.treeApi.nodeByIdGetter(selectedId).then(node => {
                                    this._unFreeze();
                                    this.treeApi.openDeepNode(node).then(() => {
                                        mainDefer.resolve();
                                    })
                                }).catch(() => {
                                    this.selectFirst();
                                    this._unFreeze();
                                    mainDefer.resolve();
                                })
                            }
                            else {
                                this._unFreeze();
                                mainDefer.resolve();
                            }
                        }
                    })
                })
            }
        })

        return mainDefer.promise;
    }

    selectFirst() {
        if (this._getPrePagedData().length) this.treeApi._setSelected(this._getPrePagedData()[0])
    }

    getQuickFindMatches() {
        if (!this.treeApi.quickFindTerm) return [];
        else {
            let matches = _.filter(this.$flatItems, (fi, ind) => {
                let text = this.treeApi.textGetter(fi.data);
                let matchObj = this.treeApi.AdvancedStringMatch.match(text, this.treeApi.quickFindTerm);
                let matched = matchObj ? matchObj.matched : null;
                if (matched) fi.$$index = ind;
                return matched;
            })

            if (this.treeApi.$selectedNode) {
                let selectedIndex = _.findIndex(this.$flatItems, fi => fi.data === this.treeApi.$selectedNode);
                let matchesAfterSelection = _.filter(matches, match => {
                    return match.$$index >= selectedIndex;
                });
                let matchesBeforeSelection = _.difference(matches, matchesAfterSelection);

                matches = matchesAfterSelection.concat(matchesBeforeSelection);
            }

            return matches;
        }
    }

    centerOnNode(node) {
        let flat = this._flatFromNode(node);
        if (flat) this.centerOnItem(flat);
    }

    _flatFromNode(node) {
        if (node === this.treeApi.GO_UP_NODE) return _.find(this.$flatItems, {$specialNode: "GO_UP"});

        let refMatch = _.find(this.$flatItems, flat => flat.data === node);
        if (!refMatch) {
            let nodeId = this.treeApi.uniqueIdGetter(node);
            let idMatch = _.find(this.$flatItems, flat => {
                if (flat.data === this.treeApi.GO_UP_NODE) return false;
                else {
                    let flatId = this.treeApi.uniqueIdGetter(flat.data);
                    return  flatId === nodeId;
                }
            });
            return idMatch;
        }
        return refMatch;
    }

    bringItemToView(item, jump = true) {
        let prePaged = this._getPrePagedData(true);
        let index = prePaged.indexOf(item);

        if (index - 1 < this.dirCtrl.virtualScrollIndex) {
            this.scrollTo(index, jump ? 0 : undefined);
        }
        else if (index + 1 > this.dirCtrl.virtualScrollIndex + this.itemsPerPage) {
            let fullItems = this.containerHeight ? Math.floor(this.containerHeight/parseFloat(this.itemHeight)) : this.itemsPerPage;
            let scrollIndex = index - fullItems >= 0 ? index - fullItems : 0;
            let displace = this.containerHeight ? 1-(this.containerHeight/parseFloat(this.itemHeight) - fullItems) : 1;
            let hScrollFactor = 0;
            if (this._hasHorizontalScrollbar()) {
                let pixelFactor = this._getHorizontalScrollbarHeight();
                hScrollFactor = pixelFactor / parseFloat(this.itemHeight);
            }
            this.scrollTo(scrollIndex + displace + hScrollFactor, jump ? 0 : undefined);
        }
        this.dirCtrl.syncFakeScroller(false);

    }

    centerOnItem(item) {
        let prePaged = this._getPrePagedData(true);
        let index = prePaged.indexOf(item);
        let halfPage = Math.floor(this.itemsPerPage / 2);
        if (prePaged.length <= this.itemsPerPage || index - halfPage < 0) {
            this.dirCtrl.virtualScrollIndex = 0;
        }
        else if (index + (this.itemsPerPage - halfPage) > prePaged.length) {
            this.dirCtrl.virtualScrollIndex = prePaged.length - this.itemsPerPage;
        }
        else {
            this.dirCtrl.virtualScrollIndex = index - halfPage;
        }

        this.dirCtrl.syncFakeScroller(false);
        this.treeApi._setSelected(item);
    }

    focus() {
        if (this.dirCtrl) $(this.dirCtrl.$element).find('.jf-tree').focus();
    }

    findNode(findFunction) {
        let item = _.find(this.$flatItems, fi => {
            return fi.data !== this.treeApi.GO_UP_NODE && findFunction(fi.data);
        })
        if (item) return item.data;
    }

    findNodeByUniqueId(uniqueId) {
        let item = _.find(this.$flatItems, fi => {
            return fi.data !== this.treeApi.GO_UP_NODE && this.treeApi.uniqueIdGetter(fi.data) === uniqueId;
        })
        if (item) return item.data;
    }

    isNodeOpen(node, ignoreFreeze = false) {
        return (!ignoreFreeze && this.$freezedOpened && _.includes(this.$freezedOpened, node)) || (!this.$freezedOpened && _.includes(this.treeApi.$openedNodes, node));
    }

    getNodesCount() {
        return this._getRawData(true).length;
    }

    getFilteredNodesCount() {
        return _.filter(this._getFilteredData(null, true), fi => fi.data !== this.treeApi.GO_UP_NODE).length;
    }

    _refreshIndentations() {
        this.$flatItems.forEach(fi => {
            if (fi.data.$indentation) delete fi.data.$indentation;
            if (fi.data.$childrenCache) {
                fi.data.$childrenCache.forEach(node => {
                    if (node.$indentation) delete node.$indentation;
                })
            }
        })
    }

    _renderLinesBackgrounds() {
        let height = parseFloat(this.itemHeight);
        let canvas = $(`<canvas width="26" height="${height}"></canvas>`)[0];
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#aaaaaa';

        ctx.beginPath();
        ctx.moveTo(13,0);
        ctx.lineTo(13,height);
        ctx.stroke();
        let verticalLine = canvas.toDataURL('image/png', 1.0);

        ctx.clearRect(0,0,26,height);
        ctx.beginPath();
        ctx.moveTo(0,height/2);
        ctx.lineTo(26,height/2);
        ctx.stroke();
        let horizontalLine = canvas.toDataURL('image/png', 1.0);

        ctx.clearRect(0,0,26,height);
        ctx.beginPath();
        ctx.moveTo(13,0);
        ctx.lineTo(13,height);
        ctx.moveTo(13,height/2);
        ctx.lineTo(26,height/2);
        ctx.stroke();
        let connectionPoint = canvas.toDataURL('image/png', 1.0);

        ctx.clearRect(0,0,26,height);
        ctx.beginPath();
        ctx.moveTo(13,0);
        ctx.lineTo(13,height/2);
        ctx.lineTo(26,height/2);
        ctx.stroke();
        let lastConnectionPoint = canvas.toDataURL('image/png', 1.0);


        this.linesBackgrounds = {
            'vertical-line': verticalLine,
            'horizontal-line': horizontalLine,
            'connection-point': connectionPoint,
            'last-connection-point': lastConnectionPoint
        }
    }

}