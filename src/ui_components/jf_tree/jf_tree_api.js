export function JFTreeApi($q, $timeout, AdvancedStringMatch) {
	'ngInject';
	class JFTreeApiClass {
		/* @ngInject */
        constructor(appScope) {
            this.$root = [];
            this.$openedNodes = [];
            this.$flatItems = [];
            this.actions = [];
            this.listeners = {};
            this.supportedEvents = ['ready', 'pagination.change', 'item.clicked', 'item.selected', 'keydown'];
            this.appScope = appScope;
            this._setDefaults();
        }

        setNodeTemplate(nodeTemplate) {
            this.nodeTemplate = nodeTemplate;
            return this;
        }

        setTreeData(rootData) {
            this.$root = rootData;
            this._buildFlatItems();
            if (!this.$isReady) {
                this.$isReady = true;
                this.fire('ready');
            }
        }

        selectFirst() {
            if (this.$flatItems.length) this._setSelected(this.$flatItems[0])
        }

        setSortingFunction(sortingFunction) {
            this.sortingFunction = sortingFunction;
            return this;
        }

        setChildrenGetter(childrenGetter) {
            this.childrenGetter = childrenGetter;
            this._getRoot();
            return this;
        }

        setParentGetter(parentGetter) {
            this.parentGetter = parentGetter;
            return this;
        }

        setNodeByIdGetter(nodeByIdGetter) {
            this.nodeByIdGetter = nodeByIdGetter;
            return this;
        }

        _getRoot() {
            let defer = $q.defer();
            this.getChildren(null).then(rootData => {
                if (rootData && rootData.length) {
                    this.setTreeData(rootData)
                    defer.resolve();
                }
            })
            return defer.promise;
        }

        setTextGetter(textGetter) {
            this.textGetter = textGetter;
            return this;
        }

        setUniqueIdGetter(uniqueIdGetter) {
            this.uniqueIdGetter = uniqueIdGetter;
            return this;
        }

        setChildrenChecker(childrenChecker) {
            this.childrenChecker = childrenChecker;
            return this;
        }

        setFilterCallback(filterCallback) {
            this.filterCallbcak = filterCallback;
            return this;
        }

        quickFind(quickFindTerm) {
            this.quickFindTerm = quickFindTerm;
            this.quickFindMatches = this.getQuickFindMatches();
            delete this.quickFindIndex;
            return this;
        }

        update() {
            this.refreshFilter();
            if (this.dirCtrl) {
                this.dirCtrl.refresh();
            }
        }

        refreshTree() {
            let mainDefer = $q.defer();

            let recursiveOpenRestore = (node) => {
                let defer = $q.defer();

                let id = this.uniqueIdGetter(node);
                let opened = _.find(this.$openedNodes, n => this.uniqueIdGetter(n) === id);
                if (opened) {
                    _.remove(this.$openedNodes, n => n === opened);
                    this.openNode(node).then(() => {
                        let children = node.$childrenCache;
                        if (!children.length) defer.resolve();
                        else {
                            let pendingPromises = children.length;
                            children.forEach(child => {
                                recursiveOpenRestore(child, defer).then(() => {
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
            };

            this._freeze();
            delete this.$rootCache;
            this._getRoot().then(() => {
                if (this.uniqueIdGetter) {
                    let resolveCount = 0;
                    let itemsCount = this.$flatItems.length;
                    this.$flatItems.forEach((fi, ind) => {
                        recursiveOpenRestore(fi.data).then(() => {
                            resolveCount++;
                            if (resolveCount === itemsCount) {
                                let selectedId = this.uniqueIdGetter(this.$selectedNode);
                                let newSelected = _.find(this.$flatItems, fi => this.uniqueIdGetter(fi.data) === selectedId);
                                if (newSelected) {
                                    this._setSelected(newSelected);
                                    this._unFreeze();
                                    mainDefer.resolve();
                                }
                                else {
                                    this.nodeByIdGetter(selectedId).then(node => {
                                        this._unFreeze();
                                        this.openDeepNode(node).then(() => {
                                            mainDefer.resolve();
                                        })
                                    }).catch(() => {
                                        this.selectFirst();
                                        this._unFreeze();
                                        mainDefer.resolve();
                                    })
                                }
                            }
                        })
                    })
                }
            })

            return mainDefer.promise;
        }

        isNodeOpen(node) {
            return (this.$freezedOpened && _.includes(this.$freezedOpened, node)) || (!this.$freezedOpened && _.includes(this.$openedNodes, node));
        }

        getQuickFindMatches() {
            if (!this.quickFindTerm) return [];
            else {
                let matches = _.filter(this.$flatItems, (fi, ind) => {
                    let text = this.textGetter(fi);
                    let matched = AdvancedStringMatch.match(text, this.quickFindTerm).matched;
                    if (matched) fi.$$index = ind;
                    return matched;
                })

                if (this.$selectedNode) {
                    let selectedIndex = _.findIndex(this.$flatItems, fi => fi.data === this.$selectedNode);
                    let matchesAfterSelection = _.filter(matches, match => {
                       return match.$$index >= selectedIndex;
                    });
                    let matchesBeforeSelection = _.difference(matches, matchesAfterSelection);

                    matches = matchesAfterSelection.concat(matchesBeforeSelection);
                }

                return matches;
            }
        }

        findNode(findFunction) {
            let item = _.find(this.$flatItems, fi => {
                return findFunction(fi.data);
            })
            if (item) return item.data;
        }

        selectNode(node) {
            this._setSelected(this._flatFromNode(node));
        }

        centerOnNode(node) {
            this.centerOnItem(this._flatFromNode(node));
        }

        centerOnItem(item) {
            let index = this.$flatItems.indexOf(item);
            let halfPage = Math.floor(this.itemsPerPage / 2);
            if (index - halfPage < 0) {
                this.dirCtrl.virtualScrollIndex = 0;
            }
            else if (index + (this.itemsPerPage - halfPage) > this.$flatItems.length) {
                this.dirCtrl.virtualScrollIndex = this.$flatItems.length - this.itemsPerPage;
            }
            else {
                this.dirCtrl.virtualScrollIndex = index - halfPage;
            }

            this.dirCtrl.syncFakeScroller(false);
            this._setSelected(item);
        }

        focus() {
            $(this.dirCtrl.$element).find('.jf-tree').focus();
        }

        _onArrowKey(down) {
            let items = this._getFilteredData();
            if (!items.length) return;

            if (this.quickFindTerm) {
                if (down) this._selectNextSearchResult();
                else this._selectPreviousSearchResult();
            }
            else {
                let selectedItem;

                if (this.$selectedNode === undefined) {
                    selectedItem = items[down ? 0 : items.length - 1];
                }
                else {
                    let currIndex = _.findIndex(items, fi => fi.data === this.$selectedNode);
                    if (down && items[currIndex + 1] || !down && currIndex - 1 >= 0) {
                        selectedItem = items[currIndex + (down ? 1 : -1)];
                    }
                    else {
                        selectedItem = items[down ? 0 : items.length - 1];
                    }
                }
                this._setSelected(selectedItem);
                this.centerOnItem(selectedItem);
            }

        }

        _selectNextSearchResult() {
            if (this.quickFindIndex === undefined && this.quickFindMatches.length) {
                this.quickFindIndex = 0;
            }
            else if (this.quickFindIndex + 1 < this.quickFindMatches.length) {
                this.quickFindIndex++;
            }
            else if (this.quickFindIndex + 1 === this.quickFindMatches.length) {
                this.quickFindIndex = 0;
            }
            this._gotoCurrentSearchResult();
        }

        _selectPreviousSearchResult() {
            if (this.quickFindIndex === undefined && this.quickFindMatches.length) {
                this.quickFindIndex = this.quickFindMatches.length - 1;
            }
            else if (this.quickFindIndex - 1 >= 0) {
                this.quickFindIndex--;
            }
            else if (this.quickFindIndex - 1 === -1) {
                this.quickFindIndex = this.quickFindMatches.length - 1;
            }
            this._gotoCurrentSearchResult();
        }

        _gotoCurrentSearchResult() {
            if (this.quickFindIndex !== undefined && this.quickFindMatches[this.quickFindIndex]) {
                this.centerOnItem(this.quickFindMatches[this.quickFindIndex]);
            }
        }


        handleKeyEvent(e) {
            if (_.includes(['ArrowDown', 'ArrowUp'], e.key)) {
                let keydown = $.Event('keydown', {
                    keyCode: e.keyCode,
                    which: e.which,
                    key: e.key
                });
                $(this.dirCtrl.$element).find('.jf-tree').trigger(keydown);
                e.preventDefault();
            }
        }

        _flatFromNode(node) {
            return _.find(this.$flatItems, flat => flat.data === node);
        }

        openSelected() {
            this.openNode(this.$selectedNode);
        }

        closeSelected() {
            this.closeNode(this.$selectedNode);
        }

        toggleSelected() {
            if (this.isNodeOpen(this.$selectedNode)) {
                this.closeSelected();
            }
            else {
                this.openSelected();
            }
        }

        openNode(node) {

            let defer = $q.defer();

            let flat = this._flatFromNode(node);

            if (flat.hasChildren && !flat.data.$noChildren && !flat.$pending) {
                if (!_.includes(this.$openedNodes, node)) {
                    this.$openedNodes.push(node);
                    flat.$pending = true;
                    this.getChildren(node).then(children => {
                        if (!children.length) node.$noChildren = true;
                        this._addChildren(children, flat.level + 1, flat);
                        defer.resolve();
                        flat.$pending = false;
                    })
                }
                else {
                    defer.resolve();
                }
            }
            else defer.resolve();

            return defer.promise;
        }

        closeNode(node) {
            if (_.includes(this.$openedNodes, node)) {
                _.remove(this.$openedNodes, n => n === node);
                let flat = this._flatFromNode(node);
                this._removeChildren(flat)
            }
        }

        openDeepNode(node) {

            let defer = $q.defer();

            let nodesToOpen = [];

            let curr = node;
            while (curr) {
                nodesToOpen.push(curr);
                curr = this.parentGetter(curr);
            }

            nodesToOpen.reverse();

            let index = 0;
            let handleNext = () => {
                if (index + 1 < nodesToOpen.length) {
                    let idToOpen = this.uniqueIdGetter(nodesToOpen[index]);
                    let nodeToOpen = this.findNode(n => this.uniqueIdGetter(n) === idToOpen);
                    this.openNode(nodeToOpen).then(() => {
                        index++;
                        handleNext();
                    })
                }
                else {
                    let idToSelect = this.uniqueIdGetter(nodesToOpen[index]);
                    let nodeToSelect = this.findNode(n => this.uniqueIdGetter(n) === idToSelect);
                    $timeout(() => {
                        if (nodeToSelect) {
                            this.centerOnNode(nodeToSelect);
                            //                        this.treeApi.openNode(nodeToSelect)
                        }
                        else {
                            this.selectFirst();
                        }
                        defer.resolve();
                    });
                }
            }

            handleNext();

            return defer.promise;

        }

        getChildren(node) {
            let defer = $q.defer();
            if (node && node.$childrenCache) {
                defer.resolve(node.$childrenCache);
            }
            else if (!node && this.$rootCache) {
                defer.resolve(node.$rootCache);
            }
            else {
                let childrenOrPromise = this.childrenGetter(node);
                if (childrenOrPromise && childrenOrPromise.then) {
                    childrenOrPromise.then(children => {
                        if (this.sortingFunction) {
                            children = children.sort(this.sortingFunction);
                        }
                        if (node) node.$childrenCache = children;
                        else this.$rootCache = children;
                        defer.resolve(children);
                    })
                }
                else {
                    if (this.sortingFunction) {
                        childrenOrPromise = childrenOrPromise.sort(this.sortingFunction);
                    }
                    if (node) node.$childrenCache = childrenOrPromise;
                    else this.$rootCache = childrenOrPromise;

                    defer.resolve(childrenOrPromise || []);
                }
            }
            return defer.promise;
        }

        _createFlatItem(node, level = 0, parent = null) {
            let flat = {
                data: node,
                level,
                parent,
                hasChildren: undefined
            }

            if (this.childrenChecker) {
                let check = this.childrenChecker(node);
                if (check && check.then) {
                    check.then((_check) => {
                        flat.hasChildren = _check;
                    })
                }
                else flat.hasChildren = check;
            }
            else {
                this.getChildren(node).then(children => {
                    flat.hasChildren = !!(children && children.length);
                });
            }

            return flat;
        }

        _addChildren(children, level = 0, parent = null) {
            let parentIndex = this.$flatItems.indexOf(parent);
            let added = [];
            children.forEach((node, i) => {
                let flatItem = this._createFlatItem(node, level, parent);
//                this.$flatItems.splice(parentIndex + 1 + i, 0, flatItem);
                added.push(flatItem);
                if (this.isNodeOpen(node)) {
                    this.getChildren(node).then(_children => {
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

        _buildFlatItems() {
            this.$flatItems = [];
            this._addChildren(this.$root);
        }

        _setDefaults() {
            this.objectName = 'Item';
            this.itemHeight = '50px';
            this.itemsPerPage = 25;
        }

        _setSelected(item) {
            this.$selectedNode = item.data;
            this.fire('item.selected', item.data);
        }

        _isSelected(item) {
            return this.$selectedNode === item.data;
        }

        getSelectedNode() {
            return this.$selectedNode;
        }

        on(event, listener) {
            if (!_.includes(this.supportedEvents, event)) {
                console.error('jf-tree: Unsupported Event: ' + event);
                return;
            }
            if (!this.listeners[event]) this.listeners[event] = [];
            this.listeners[event].push(listener);
            return this;
        }

        off(event, listener) {
            if (!_.includes(this.supportedEvents, event)) {
                console.error('jf-tree: Unsupported Event: ' + event);
                return;
            }
            if (this.listeners[event]) {
                if (listener) {
                    _.remove(this.listeners[event],l=>l===listener);
                }
                else {
                    this.listeners[event] = [];
                }
            }
        }

        fire(event, ...params) {
            if (this.listeners[event]) {
                this.listeners[event].forEach(listener=>listener(...params))
            }
        }

        setItemsPerPage(rpp) {
            this.itemsPerPage = rpp;
            return this;
        }

        setObjectName(objectName, useAn = false) {
            this.objectName = objectName;
            this.useAnWithObjectName = useAn;
            return this;
        }

        setItemHeight(height) {
            this.itemHeight = height;
            return this;
        }

        sortBy() {
            return this;
        }

        setActions(actions) {
            this.actions = actions;
            return this;
        }

        _setDirectiveController(ctrl) {
            this.dirCtrl = ctrl;
            if (this.itemsPerPage === 'auto') {
                this.autoHeight = true;
                this._setAutoItemsPerPage();
            }
        }

        _setAutoItemsPerPage() {
            $timeout(() => {
                let containerHeight = $(this.dirCtrl.$element).parent().height();
                this.setItemsPerPage(Math.floor(containerHeight / parseFloat(this.itemHeight)));
            })
        }

        setEmptyTreeText(text) {
            this.emptyTreeText = text;
            return this;
        }

        _getPageData() {
            return this._getPrePagedData().slice(this.dirCtrl.virtualScrollIndex,
                this.dirCtrl.virtualScrollIndex + this.itemsPerPage);
        }

        _getPrePagedData() {
            return this._getSortedData(this._getFilteredData(this._getRawData()));
        }

        _getSortedData(sourceData) {
            return sourceData;
        }

        _getFilteredData(sourceData) {
            sourceData = sourceData || this._getRawData();
            if (this.filterCallbcak && sourceData.length) {
                if (!this.filterCache) {
                    this.filterCache = _.filter(sourceData, item => {
                        let parentIsFilteredOut = false;
                        let curr = item.parent;
                        while (curr && !parentIsFilteredOut) {
                            if (!this.filterCallbcak(curr.data)) {
                                parentIsFilteredOut = true;
                            }
                            curr = curr.parent;
                        }

                        return !parentIsFilteredOut && this.filterCallbcak(item.data);
                    })
                }
                return this.filterCache;
            }
            else {
                return sourceData;
            }
        }

        refreshFilter() {
            delete this.filterCache;
        }

        _getRawData() {

            return this.$freezedItems || this.$flatItems || [];
        }

        _freeze() {
            this.$freezedItems = [].concat(this.$flatItems);
            this.$freezedOpened = [].concat(this.$openedNodes);
        }

        _unFreeze() {
            delete this.$freezedItems;
            delete this.$freezedOpened;
        }

	}
	return JFTreeApiClass;

}



