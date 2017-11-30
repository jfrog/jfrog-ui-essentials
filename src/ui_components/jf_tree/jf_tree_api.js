import {TreeViewPane} from './tree_view_pane';
export function JFTreeApi($q, $timeout, AdvancedStringMatch, ContextMenuService) {
	'ngInject';
	class JFTreeApiClass {
		/* @ngInject */
        constructor(appScope) {
            this.$timeout = $timeout;
            this.$q = $q;
            this.AdvancedStringMatch = AdvancedStringMatch;
            this.$root = [];
            this.$viewPanes = [];
            this.$openedNodes = [];
            this.ContextMenuService = ContextMenuService;
            this.actions = [];
            this.listeners = {};
            this.supportedEvents = ['ready', 'pagination.change', 'item.clicked', 'item.dblClicked', 'item.selected', 'item.before.open', 'keydown'];
            this.appScope = appScope;
            this.objectName = 'Item';
            this.GO_UP_NODE = {$specialNode: 'GO_UP'};


            this.paneSelector = () => 'default';
        }

        setNodeTemplate(nodeTemplate) {
            this.nodeTemplate = nodeTemplate;
            return this;
        }

        setTreeData(rootData) {
            this.dataWasSet = true;
            this.$root = rootData;
            this.$viewPanes.forEach(vp => vp._buildFlatItems())
            if (!this.$isReady) {
                this.$isReady = true;
                this.$timeout(() => this.fire('ready'));
            }
        }

        setDrillDownMode(drillDownMode = true) {
            this.$drillDownMode = drillDownMode;
            return this;
        }

        setSortingFunction(sortingFunction) {
            this.sortingFunction = sortingFunction;
            return this;
        }

        setDataGetters(dataGetters) {

            this.dataGettersSet = true;

            if (dataGetters.uniqueId) {
                this.uniqueIdGetter = dataGetters.uniqueId;
            }

            if (dataGetters.nodeById) {
                this.nodeByIdGetter = dataGetters.nodeById;
            }

            if (dataGetters.text) {
                this.textGetter = dataGetters.text;
            }

            if (dataGetters.childrenChecker) {
                this.childrenChecker = dataGetters.childrenChecker;
            }

            if (dataGetters.children) {
                this.childrenGetter = dataGetters.children;
            }

            if (dataGetters.parent) {
                this.parentGetter = dataGetters.parent;
            }

            if (dataGetters.classes) {
                this.classGetter = dataGetters.classes;
            }

            if (dataGetters.pane) {
                this.paneSelector = dataGetters.pane;
            }

            if (dataGetters.contextMenuItems) {
                this.contextMenuItemsGetter = dataGetters.contextMenuItems;
                this._createContextMenu();
            }

            this._getRoot();

            return this;
        }

        _getRoot() {
            let defer = $q.defer();
            this.getChildren(null).then(rootData => {
                if (rootData && _.isArray(rootData)) {
                    this.setTreeData(rootData)
                    defer.resolve();
                }
            })
            return defer.promise;
        }

        setFilterCallback(filterCallback) {
            this.filterCallbcak = filterCallback;
            return this;
        }

        quickFind(quickFindTerm) {
            this.quickFindTerm = quickFindTerm;
            this.quickFindMatches = this._getQuickFindFlatMatches();
            delete this.quickFindIndex;
            return this;
        }

        _getQuickFindFlatMatches() {
            let matches = [];
            this.$viewPanes.forEach(vp => matches = matches.concat(vp.getQuickFindMatches()));
            return matches;
        }

        getQuickFindMatches() {
            return _.map(this._getQuickFindFlatMatches(), 'data');
        }

        _getViewPaneForNode(node) {
            let viewPane = _.find(this.$viewPanes, vp => {
                return vp.findNode(n => n === node);
            })
            return viewPane;
        }

        centerOnNode(node) {
            let viewPane = this._getViewPaneForNode(node);
            if (viewPane) viewPane.centerOnNode(node);
        }

        refreshNode(node) {
            let viewPane = this._getViewPaneForNode(node);
            if (viewPane) return viewPane.refreshNode(node);
            else return this.$q.when();
        }

        freeze() {
            this.$viewPanes.forEach(vp => vp._freeze());
            this.$userFreeze = true;
        }

        unFreeze() {
            this.$userFreeze = false;
            this.$viewPanes.forEach(vp => vp._unFreeze());
        }

        refreshNodeContextMenu(node) {
            let viewPane = this._getViewPaneForNode(node);
            if (viewPane) viewPane.refreshNodeContextMenu(node);
        }

        refreshTree(deleteCache = true, resetOpenedNodes = true) {
            let defer = $q.defer();
            if (deleteCache) delete this.$rootCache;
            if (resetOpenedNodes) this.$openedNodes = [];
            let pendingPromises = this.$viewPanes.length;
            this.$viewPanes.forEach(vp => {
                vp.refreshView(deleteCache).then(() => {
                    pendingPromises--;
                    if (!pendingPromises) {
                        defer.resolve();
                    }
                })
            });

            this.$openedNodes = _.filter(this.$openedNodes, node => {
                let fi = this._flatFromNode(node);
                return !!fi;
            });
            return defer.promise;
        }

        isNodeOpen(node) {
            return !!_.find(this.$viewPanes, vp => vp.isNodeOpen(node))
        }

        findNode(findFunction) {
            let viewPane = _.find(this.$viewPanes, vp => {
                return !!vp.findNode(findFunction);
            })

            if (viewPane) {
                return viewPane.findNode(findFunction);
            }
        }

        findNodeByUniqueId(uniqueId) {
            let viewPane = _.find(this.$viewPanes, vp => {
                return !!vp.findNodeByUniqueId(uniqueId);
            })

            if (viewPane) {
                return viewPane.findNodeByUniqueId(uniqueId);
            }
        }

        selectNode(node, fireEvent = true) {
            this._setSelected(this._flatFromNode(node), fireEvent);
        }

        _onArrowKey(down, viewPane) {
            let items = viewPane._getFilteredData();
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
                    if ((down && items[currIndex + 1]) || (!down && currIndex - 1 >= 0)) {
                        selectedItem = items[currIndex + (down ? 1 : -1)];
                    }
                    else {
                        selectedItem = items[down ? 0 : items.length - 1];
                    }
                }
                this._setSelected(selectedItem);
                viewPane.centerOnItem(selectedItem);
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
                let item = this.quickFindMatches[this.quickFindIndex];
                item.pane.centerOnItem(item);
            }
        }


        handleKeyEvent(e) {
            if (_.includes(['ArrowDown', 'ArrowUp'], e.key)) {
                let keydown = $.Event('keydown', {
                    keyCode: e.keyCode,
                    which: e.which,
                    key: e.key
                });
                let dirCtrl = this.$viewPanes[0].dirCtrl;
                $(dirCtrl.$element).find('.jf-tree').trigger(keydown);
                e.preventDefault();
            }
        }

        _flatFromNode(node) {
            let pane = _.find(this.$viewPanes, vp => !!vp._flatFromNode(node));
            if (pane) return pane._flatFromNode(node);
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
            if (this.fire('item.before.open', node) === false) return $q.when();

            let defer = $q.defer();

            let flat = this._flatFromNode(node);

            if (flat && flat.hasChildren && !flat.data.$noChildren && !flat.$pending) {
                if (!_.includes(this.$openedNodes, node)) {
                    this.$openedNodes.push(node);
                    flat.$pending = true;
                    this.getChildren(node).then(children => {
                        if (!children.length) node.$noChildren = true;
                        if (this.$drillDownMode) {
                            this.drillDown(flat);
                        }
                        else {
                            flat.pane._addChildren(children, flat.level + 1, flat);
                        }
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
                flat.pane._removeChildren(flat)
            }
        }

        drillUp() {
            if (!this.$drillDownMode) return;

            this.closeNode(this.$currParentFlat.$origFlat.data);
            let parent = this.$currParentFlat.$origFlat.parent;
            if (parent && parent.data !== this.GO_UP_NODE) {
                this.drillDown(parent);
            }
            else {
                this.drillUpToRoot();
            }
        }

        drillDown(flatItem) {
            let goUpFlat = flatItem.pane._createFlatItem(this.GO_UP_NODE);
            this.$currParentFlat = flatItem.pane._createFlatItem(flatItem.data, 1, goUpFlat);
            let orig = flatItem;
            while (orig.$origFlat) {
                orig = orig.$origFlat;
            }
            this.$currParentFlat.$origFlat = orig;
            if (flatItem.pane.dirCtrl) flatItem.pane.dirCtrl.resetScroll();
            flatItem.pane.$flatItems = [goUpFlat, this.$currParentFlat];
            flatItem.pane._addChildren(flatItem.data.$childrenCache, 2, this.$currParentFlat);
            this.selectNode(this.$currParentFlat.data);
        }

        drillUpToRoot() {
            if (!this.$currParentFlat) return;
            this.$openedNodes = [];
            this.$currParentFlat.$origFlat.pane.dirCtrl.resetScroll();
            this.setTreeData(this.$rootCache);
        }

        openDeepNode(node) {

            if (this.$drillDownMode) {
                this.drillUpToRoot();
            }

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
                let nextId = this.uniqueIdGetter(nodesToOpen[index]);
                let nextNode = this.findNode(n => this.uniqueIdGetter(n) === nextId);

                if (index + 1 < nodesToOpen.length) {
                    if (nextNode) this.openNode(nextNode).then(() => {
                        index++;
                        handleNext();
                    })
                    else {
                        defer.resolve();
                    }
                }
                else {
                    $timeout(() => {
                        if (nextNode) {
                            let flat = this._flatFromNode(nextNode);
                            if (flat) flat.pane.centerOnNode(nextNode);
                            else {
                                this.selectFirst();
                            }
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

            if (this.childrenGetter) {
                if (node && node.$childrenCache) {
                    defer.resolve(node.$childrenCache);
                }
                else if (!node && this.$rootCache) {
                    defer.resolve(this.$rootCache);
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
            }
            else {
                defer.resolve([]);
            }

            return defer.promise;
        }


        _setSelected(item, fireEvent = true) {
            if (fireEvent && item.data !== this.GO_UP_NODE) {
                let entityChange = !this.uniqueIdGetter || (item.data && this.$selectedNode && this.uniqueIdGetter(item.data) !== this.uniqueIdGetter(this.$selectedNode)) || (!this.$selectedNode && item.data) || (this.$selectedNode && !item.data);
                this.$selectedNode = item.data;
                if (entityChange) {
                    this.fire('item.selected', item.data);
                }
            }
            else {
                this.$selectedNode = item.data;
            }
        }

        _isSelected(item) {
            return this.$selectedNode === item.data;
        }

        selectFirst() {
            this.$viewPanes[0].selectFirst();
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
            let stopped = false;
            if (this.listeners[event]) {
                this.listeners[event].forEach(listener => {
                    if (stopped) return;
                    if (listener(...params) === false) stopped = true;
                })
            }
            return !stopped;
        }

        setObjectName(objectName, useAn = false) {
            this.objectName = objectName;
            this.useAnWithObjectName = useAn;
            return this;
        }

        sortBy() {
            return this;
        }

        setActions(actions) {
            this.actions = actions;
            return this;
        }

        createViewPane(viewPaneName) {
            viewPaneName = viewPaneName || 'default';
            let exists = this.getViewPane(viewPaneName);
            if (exists) return exists;
            else {
                let viewPane = new TreeViewPane(viewPaneName, this);
                this.$viewPanes.push(viewPane);
                return viewPane;
            }
        }

        getViewPane(viewPaneName) {
            viewPaneName = viewPaneName || 'default';
            return _.find(this.$viewPanes, vp => vp.viewPaneName === viewPaneName);
        }

        _setDirectiveController(ctrl) {
            let pane = this.getViewPane(ctrl.viewPaneName);
            if (!pane) console.error(`Missing view pane '${ctrl.viewPaneName}'. Forgot to create it?`);
            else pane._setDirectiveController(ctrl);
        }

        setEmptyTreeText(text) {
            this.emptyTreeText = text;
            return this;
        }

        refreshFilter() {
            this.$viewPanes.forEach(vp => vp.refreshFilter());
        }

        focus() {
            this.$viewPanes[0].focus();
        }

        onViewUpdate(originView) {
            this.$viewPanes.forEach(vp => {
                if (vp !== originView) vp.update(false);
            });
        }

        refreshPaneSelection() {
            this.$viewPanes.forEach(vp => vp._buildFlatItems());
        }

        getParentNode(node) {
            let flat = this._flatFromNode(node);
            let parent = flat.parent;
            if (parent) return parent.data;
        }

        _createContextMenu() {
            this.ContextMenuService.contextMenu({
                selector: '.jf-tree .jf-tree-item',
                build: ($trigger) => {
                    let defer = this.$q.defer();
                    let rowCtrl = angular.element($trigger[0]).controller('jfTreeItem');
                    let items = rowCtrl.data.data.$cachedCMItems;
                    if (items) {
                        defer.resolve(items);
                    }
                    else {
                        this.contextMenuItemsGetter(rowCtrl.data.data, (items) => {
                            rowCtrl.data.data.$cachedCMItems = items;
                            defer.resolve(items);
                        })
                    }
                    return defer.promise;
                }
            })
        }

        getNodesCount() {
            let count = 0;
            this.$viewPanes.forEach(vp => {
                count += vp.getNodesCount();
            })
            return count;
        }

        getFilteredNodesCount() {
            let count = 0;
            this.$viewPanes.forEach(vp => {
                count += vp.getFilteredNodesCount();
            })
            return count;
        }

	}
	return JFTreeApiClass;

}



