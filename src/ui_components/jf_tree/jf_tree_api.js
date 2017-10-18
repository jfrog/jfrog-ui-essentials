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
            this.supportedEvents = ['pagination.change', 'item.clicked'];
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
        }

        setSortingFunction(sortingFunction) {
            this.sortingFunction = sortingFunction;
            return this;
        }

        setChildrenGetter(childrenGetter) {
            this.childrenGetter = childrenGetter;
            this.getChildren(null).then(rootData => {
                if (rootData && rootData.length) this.setTreeData(rootData)
            })
            return this;
        }

        setTextGetter(textGetter) {
            this.textGetter = textGetter;
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
            return this;
        }

        update() {
            this.refreshFilter();
            if (this.dirCtrl) {
                this.dirCtrl.refresh();
            }
        }

        isNodeOpen(node) {
            return _.includes(this.$openedNodes, node);
        }

        getQuickFindMatches() {
            if (!this.quickFindTerm) return [];
            else {
                let matches = _.filter(this.$flatItems, fi => {
                    let text = this.textGetter(fi);
                    return AdvancedStringMatch.match(text, this.quickFindTerm).matched;
                })

                if (this.$selectedNode) {
                    let selectedIndex = _.findIndex(this.$flatItems, fi => fi.data === this.$selectedNode);
                    let matchesAfterSelection = _.filter(matches, match => {
                       return this.$flatItems.indexOf(match) >= selectedIndex;
                    });
                    let matchesBeforeSelection = _.difference(matches, matchesAfterSelection);

                    matches = matchesAfterSelection.concat(matchesBeforeSelection);
                }

                return matches;
            }
        }

        centerOnItem(item) {
            let index = this.$flatItems.indexOf(item);
            let pageMiddle = Math.floor(this.itemsPerPage / 2);
            if (index - pageMiddle < 0) {
                this.dirCtrl.virtualScrollIndex = 0;
            }
            else if (index + (this.itemsPerPage - pageMiddle) > this.$flatItems.length) {
                this.dirCtrl.virtualScrollIndex = this.$flatItems.length - this.itemsPerPage;
            }
            else this.dirCtrl.virtualScrollIndex = index - pageMiddle;

            this._setSelected(item);
            this.dirCtrl.syncFakeScroller();
        }

        _flatFromNode(node) {
            return _.find(this.$flatItems, flat => flat.data === node);
        }

        openNode(node) {
            let defer = $q.defer();
            if (!_.includes(this.$openedNodes, node)) {
                this.$openedNodes.push(node);
                let flat = this._flatFromNode(node);
                this.getChildren(node).then(children => {
                    if (!children.length) node.$noChildren = true;
                    this._addChildren(children, flat.level + 1, flat);
                    defer.resolve();
                })
            }
            return defer.promise;
        }

        closeNode(node) {
            if (_.includes(this.$openedNodes, node)) {
                _.remove(this.$openedNodes, n => n === node);
                let flat = this._flatFromNode(node);
                this._removeChildren(flat)
            }
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
            return this.$flatItems || [];
        }

	}
	return JFTreeApiClass;

}



