import {TreeViewPane} from '@/ui_components/jf_tree/tree_view_pane';
export function JFTreeApi() {
    let injections = $jfrog.get(['$q', '$timeout', 'AdvancedStringMatch', 'ContextMenuService', 'JFrogEventBus']);
    class JFTreeApiClass {
        constructor(appScope) {
            _.extend(this, injections);
            this.dataWasSet = false;
            this.$root = [];
            this.$viewPanes = [];
            this.$openedNodes = [];
            this.actions = [];
            this.listeners = {};
            this.supportedEvents = [
                'ready',
                'pagination.change',
                'item.clicked',
                'item.dblClicked',
                'item.selected',
                'item.before.open',
                'keydown'
            ];
            this.appScope = appScope;
            this.objectName = 'Item';
            this.GO_UP_NODE = { $specialNode: 'GO_UP' };

            this.paneSelector = () => 'default';
        }

        setNodeTemplate(nodeTemplate) {
            this.nodeTemplate = nodeTemplate;
            return this;
        }

        setTreeData(rootData) {
            this.dataWasSet = true;
            this.$root = rootData;
            this.$viewPanes.forEach(vp => vp._buildFlatItems());
            if (!this.$isReady) {
                this.$isReady = true;
                this.fire('ready');
            }
        }

        setDrillDownMode(drillDownMode = true) {
            let defer = this.$q.defer();
            let oldVal = this.$drillDownMode;
            this.$drillDownMode = drillDownMode;
            if (!!oldVal !== !!drillDownMode) {
                this._freeze();
                this.refreshTree(false).then(() => {
                    this._refreshIndentations();
                    this.centerOnSelected();
                    this._unFreeze();

                    defer.resolve();
                });
            } else {
                defer.resolve();
            }

            return defer.promise;
        }

        _refreshIndentations() {
            this.$viewPanes.forEach(vp => vp._refreshIndentations());
        }

        setSortingFunction(sortingFunction) {
            this.sortingFunction = sortingFunction;
            return this;
        }

        setDataDriver(dataDriver) {

            this.dataGettersSet = true;

            if (dataDriver.uniqueId) {
                this.uniqueIdGetter = dataDriver.uniqueId;
            }

            if (dataDriver.nodeById) {
                this.nodeByIdGetter = dataDriver.nodeById;
            }

            if (dataDriver.text) {
                this.textGetter = dataDriver.text;
            }

            if (dataDriver.childrenChecker) {
                this.childrenChecker = dataDriver.childrenChecker;
            }

            if (dataDriver.children) {
                this.childrenGetter = dataDriver.children;
            }

            if (dataDriver.parent) {
                this.parentGetter = dataDriver.parent;
            }

            if (dataDriver.classes) {
                this.classGetter = dataDriver.classes;
            }

            if (dataDriver.pane) {
                this.paneSelector = dataDriver.pane;
            }

            if (dataDriver.contextMenuItems) {
                this.contextMenuItemsGetter = dataDriver.contextMenuItems;
                this._createContextMenu();
            }

            this._getRoot();

            return this;
        }

        _getRoot() {
            let defer = this.$q.defer();
            this.getChildren(null).then(rootData => {
                if (rootData && _.isArray(rootData)) {
                    this.setTreeData(rootData);
                    defer.resolve();
                }
            });
            return defer.promise;
        }

        setFilterCallback(filterCallback) {
            this.filterCallback = node => {
                if (node === this.GO_UP_NODE)
                    return true;
                if (node.$$$filterResultCache !== undefined) {
                    return node.$$$filterResultCache;
                } else {
                    let cbResult = filterCallback(node);
                    node.$$$filterResultCache = cbResult;
                    return cbResult;
                }
            };
            return this;
        }

        isNodeFiltered(node) {
            return this.filterCallback ? this.filterCallback(node) : true;
        }

        quickFind(quickFindTerm) {
            this.quickFindTerm = quickFindTerm;
            this.quickFindMatches = this._getQuickFindFlatMatches();
            delete this.quickFindIndex;
            this._selectNextSearchResult();
            return this;
        }

        _getQuickFindFlatMatches() {
            let matches = [];
            this.$viewPanes.forEach(vp => {
                matches = matches.concat(vp.getQuickFindMatches())
                if (vp.dirCtrl) vp.dirCtrl.refreshHack.count++;
            });
            return matches;
        }

        getQuickFindMatches() {
            return _.map(this._getQuickFindFlatMatches(), 'data');
        }

        _getViewPaneForNode(node) {
            let viewPane = _.find(this.$viewPanes, vp => {
                return vp.findNode(n => n === node);
            });
            return viewPane;
        }

        centerOnNode(node) {
            let viewPane = this._getViewPaneForNode(node);
            if (viewPane)
                viewPane.centerOnNode(node);
        }

        centerOnSelected() {
            let selected = this.getSelectedNode(true);
            if (selected) {
                let flat = this._flatFromNode(selected);
                if (flat)
                    flat.pane.centerOnItem(flat);
            }
        }

        refreshNode(node) {
            let viewPane = this._getViewPaneForNode(node);
            if (viewPane)
                return viewPane.refreshNode(node);
            else
                return this.$q.when();
        }

        _freeze() {
            this.$viewPanes.forEach(vp => vp._freeze());
        }

        _unFreeze() {
            this.$viewPanes.forEach(vp => vp._unFreeze());
        }

        freeze() {
            if (this.$masterFreeze)
                return;
            this._freeze();
            this.$masterFreeze = true;
        }

        unFreeze() {
            if (!this.$masterFreeze)
                return;
            this.$masterFreeze = false;
            this._unFreeze();
        }

        refreshNodeContextMenu(node) {
            let viewPane = this._getViewPaneForNode(node);
            if (viewPane)
                viewPane.refreshNodeContextMenu(node);
        }

        refreshTree(deleteCache = true, resetOpenedNodes = true) {
            let defer = this.$q.defer();
            if (deleteCache)
                delete this.$rootCache;
            if (resetOpenedNodes)
                this.$openedNodes = [];
            let pendingPromises = this.$viewPanes.length;
            this.$viewPanes.forEach(vp => {
                vp.refreshView().then(() => {
                    pendingPromises--;
                    if (!pendingPromises) {
                        defer.resolve();
                    }
                });
            });

            this.$openedNodes = _.filter(this.$openedNodes, node => {
                let fi = this._flatFromNode(node);
                return !!fi;
            });
            return defer.promise;
        }

        isNodeOpen(node, ignoreFreeze = false) {
            return !!_.find(this.$viewPanes, vp => vp.isNodeOpen(node, ignoreFreeze));
        }

        findNode(findFunction) {
            let viewPane = _.find(this.$viewPanes, vp => {
                return !!vp.findNode(findFunction);
            });

            if (viewPane) {
                return viewPane.findNode(findFunction);
            }
        }

        findNodeByUniqueId(uniqueId) {
            let viewPane = _.find(this.$viewPanes, vp => {
                return !!vp.findNodeByUniqueId(uniqueId);
            });

            if (viewPane) {
                return viewPane.findNodeByUniqueId(uniqueId);
            }
        }

        selectNode(node, fireEvent = true) {
            let flat = this._flatFromNode(node);
            if (flat)
                this._setSelected(flat, fireEvent);
        }

        preSelectNode(node) {
            let flat = this._flatFromNode(node);
            if (flat)
                this._preSelect(flat);
        }

        _onArrowKey(down, viewPane) {
            let items = viewPane._getFilteredData();
            if (!items.length)
                return;

            if (!this.$preSelectedNode)
                Vue.set(this, '$preSelectedNode', this.$selectedNode);

            if (this.quickFindTerm) {
                if (down)
                    this._selectNextSearchResult();
                else
                    this._selectPreviousSearchResult();
            } else {
                let selectedItem;

                if (this.$preSelectedNode === undefined) {
                    selectedItem = items[down ? 0 : items.length - 1];
                } else {
                    let currIndex = _.findIndex(items, fi => fi.data === this.$preSelectedNode);
                    if (down && items[currIndex + 1] || !down && currIndex - 1 >= 0) {
                        selectedItem = items[currIndex + (down ? 1 : -1)];
                    } else {
                        selectedItem = items[down ? 0 : items.length - 1];
                    }
                }
                //                this._setSelected(selectedItem);
                //                viewPane.centerOnItem(selectedItem);
                this._preSelect(selectedItem);
            }

        }

        _selectNextSearchResult() {
            if (this.quickFindIndex === undefined && this.quickFindMatches.length) {
                this.quickFindIndex = 0;
            } else if (this.quickFindIndex + 1 < this.quickFindMatches.length) {
                this.quickFindIndex++;
            } else if (this.quickFindIndex + 1 === this.quickFindMatches.length) {
                this.quickFindIndex = 0;
            }
            this._gotoCurrentSearchResult();
        }

        _selectPreviousSearchResult() {
            if (this.quickFindIndex === undefined && this.quickFindMatches.length) {
                this.quickFindIndex = this.quickFindMatches.length - 1;
            } else if (this.quickFindIndex - 1 >= 0) {
                this.quickFindIndex--;
            } else if (this.quickFindIndex - 1 === -1) {
                this.quickFindIndex = this.quickFindMatches.length - 1;
            }
            this._gotoCurrentSearchResult();
        }

        _gotoCurrentSearchResult() {
            if (this.quickFindIndex !== undefined && this.quickFindMatches[this.quickFindIndex]) {
                let item = this.quickFindMatches[this.quickFindIndex];
                //                item.pane.centerOnItem(item);
                this._preSelect(item);
            }
        }


        handleKeyEvent(e) {
            if (_.includes([
                    'ArrowDown',
                    'Down',
                    'ArrowUp',
                    'Up'
                ], e.key)) {
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
            if (pane)
                return pane._flatFromNode(node);
        }

        openSelected(scrollUpIfNeeded = false) {
            this.openNode(this.$selectedNode, scrollUpIfNeeded);
        }

        openPreSelected(scrollUpIfNeeded = false) {
            this.openNode(this.$preSelectedNode || this.$selectedNode, scrollUpIfNeeded);
        }

        closeSelected() {
            this.closeNode(this.$selectedNode);
        }

        toggleSelected(scrollUpIfNeeded) {
            if (this.isNodeOpen(this.$selectedNode)) {
                this.closeSelected();
            } else {
                this.openSelected(scrollUpIfNeeded);
            }
        }

        openNode(node, scrollUpIfNeeded = false, drillDown = true, preSelect = true) {
            if (!node)
                return;
            if (this.fire('item.before.open', node) === false)
                return this.$q.when();

            let defer = this.$q.defer();

            let flat = this._flatFromNode(node);

            if (flat && flat.hasChildren !== false && !flat.data.$noChildren && !flat.$pending) {
                if (!_.includes(this.$openedNodes, node)) {
                    this.$openedNodes.push(node);
                    flat.$pending = true;
                    this.getChildren(node).then(children => {
                        if (!children.length)
                            node.$noChildren = true;
                        else
                            flat.hasChildren = true;

                        let reDrill = false;
                        if (this.$drillDownMode && this.$currParentFlat) {
                            if (flat.data !== this.GO_UP_NODE && this.uniqueIdGetter(flat.data) === this.uniqueIdGetter(this.$currParentFlat.data)) {
                                reDrill = true;
                            }
                        }

                        if (this.$drillDownMode && (reDrill || drillDown)) {
                            this.drillDown(flat);
                        } else {

                            if (preSelect)
                                this._preSelect(flat);

                            let addedFlats = flat.pane._addChildren(children, flat.level + 1, flat);

                            if (scrollUpIfNeeded) {
                                if (addedFlats.length >= 3) {
                                    flat.pane.bringItemToView(addedFlats[2], false);
                                } else if (addedFlats.length) {
                                    flat.pane.bringItemToView(addedFlats[addedFlats.length - 1], false);
                                }
                            }

                        }
                        defer.resolve();
                        flat.$pending = false;
                    });
                } else {
                    defer.resolve();
                }
            } else {
                if (flat && flat.$pending) {
                    this.$timeout(() => {
                        this.openNode(node, scrollUpIfNeeded).then(() => {
                            defer.resolve();
                        });
                    }, 100);
                } else {
                    defer.resolve();
                }
            }

            return defer.promise;
        }

        closeNode(node) {
            if (_.includes(this.$openedNodes, node)) {
                _.remove(this.$openedNodes, n => n === node);
                let flat = this._flatFromNode(node);
                if (flat)
                    flat.pane._removeChildren(flat);
            }
        }

        toggleExpansion(node) {
            let flat = this._flatFromNode(node);
            if (flat && flat.pane.isNodeOpen(node)) {
                this.closeNode(node);
            } else {
                this.openNode(node, true);
            }
        }

        deleteNode(node) {
            let flat = this._flatFromNode(node);
            flat.pane._deleteItem(flat);
        }

        drillUp() {
            if (!this.$drillDownMode)
                return;

            this.closeNode(this.$currParentFlat.$origFlat.data);
            let parent = this.$currParentFlat.$origFlat.parent;
            if (parent && parent.data !== this.GO_UP_NODE) {
                this.drillDown(parent);
            } else {
                this.drillUpToRoot();
            }
            this._refreshIndentations();

        }

        drillDown(flatItem) {
            let goUpFlat = flatItem.pane._createFlatItem(this.GO_UP_NODE);
            this.$currParentFlat = flatItem.pane._createFlatItem(flatItem.data, 1, goUpFlat);
            let orig = flatItem;
            while (orig.$origFlat) {
                orig = orig.$origFlat;
            }
            this.$currParentFlat.$origFlat = orig;
            if (flatItem.pane.dirCtrl)
                flatItem.pane.dirCtrl.resetScroll();
            flatItem.pane.$flatItems = [
                goUpFlat,
                this.$currParentFlat
            ];
            flatItem.pane._addChildren(flatItem.data.$childrenCache, 2, this.$currParentFlat);
            this.selectNode(this.$currParentFlat.data, false);
            this._refreshIndentations();
        }

        drillUpToRoot() {
            if (!this.$currParentFlat)
                return;
            this.$openedNodes = [];
            this.$currParentFlat.$origFlat.pane.dirCtrl.resetScroll();
            this.setTreeData(this.$rootCache);
            delete this.$currParentFlat;
            this._refreshIndentations();
            this.centerOnSelected();
        }

        getCurrentParent() {
            return this.$currParentFlat ? this.$currParentFlat.data : null;
        }

        openDeepNodeByUniqueId(uniqueId) {
            let defer = this.$q.defer();

            this.nodeByIdGetter(uniqueId).then(node => {
                this.openDeepNode(node).then(() => {
                    defer.resolve();
                });
            });

            return defer.promise;

        }

        openDeepNode(node) {

            if (!node) {
                console.error('openDeepNode was called with undefined node');
                return;
            }

            if (this.$drillDownMode) {
                this.drillUpToRoot();
            }

            let defer = this.$q.defer();

            let nodesToOpen = [];

            let curr = node;
            while (curr) {
                nodesToOpen.push(curr);
                curr = this.parentGetter(curr);
            }

            if (!nodesToOpen.length) {
                this.selectNode(node);
                return;
            }

            nodesToOpen.reverse();

            let index = 0;
            let handleNext = () => {
                let nextId = this.uniqueIdGetter(nodesToOpen[index]);
                let nextNode = this.findNode(n => this.uniqueIdGetter(n) === nextId);

                if (index + 1 < nodesToOpen.length) {
                    if (nextNode)
                        this.openNode(nextNode).then(() => {
                            index++;
                            handleNext();
                        });
                    else {
                        defer.resolve();
                    }
                } else {
                    this.$timeout(() => {
                        if (nextNode) {
                            let flat = this._flatFromNode(nextNode);
                            if (flat)
                                this.selectNode(nextNode);
                            else {
                                this.selectFirst();
                            }    //                        this.treeApi.openNode(nodeToSelect)
                        } else {
                            this.selectFirst();
                        }
                        defer.resolve();
                    });
                }
            };

            handleNext();

            return defer.promise;

        }

        getChildren(node) {
            let defer = this.$q.defer();

            if (this.childrenGetter) {
                if (node && node.$childrenCache) {
                    defer.resolve(node.$childrenCache);
                } else if (!node && this.$rootCache) {
                    defer.resolve(this.$rootCache);
                } else {
                    let childrenOrPromise = this.childrenGetter(node);
                    if (childrenOrPromise && childrenOrPromise.then) {
                        childrenOrPromise.then(children => {
                            if (children && this.sortingFunction) {
                                children = children.sort(this.sortingFunction);
                            }
                            if (node)
                                node.$childrenCache = children;
                            else
                                this.$rootCache = children;
                            defer.resolve(children);
                        });
                    } else {
                        if (this.sortingFunction && childrenOrPromise) {
                            childrenOrPromise = childrenOrPromise.sort(this.sortingFunction);
                        }
                        if (node)
                            node.$childrenCache = childrenOrPromise;
                        else
                            this.$rootCache = childrenOrPromise;

                        defer.resolve(childrenOrPromise || []);
                    }
                }
            } else {
                defer.resolve([]);
            }

            return defer.promise;
        }


        _setSelected(item, fireEvent = true) {
            if (fireEvent && item.data !== this.GO_UP_NODE && this.$selectedNode !== this.GO_UP_NODE) {
                let entityChange = !this.uniqueIdGetter || item.data && this.$selectedNode && this.uniqueIdGetter(item.data) !== this.uniqueIdGetter(this.$selectedNode) || !this.$selectedNode && item.data || this.$selectedNode && !item.data;
                Vue.set(this, '$selectedNode', item.data);
                if (entityChange) {
                    this.fire('item.selected', item.data);
                }
            } else {
                Vue.set(this, '$selectedNode', item.data);
            }
            Vue.set(this, '$preSelectedNode', null);
        }

        _preSelect(item) {
            Vue.set(this, '$preSelectedNode', item.data);
            item.pane.bringItemToView(item);
        }

        selectPreSelected() {
            if (this.$preSelectedNode) {
                this._setSelected(this._flatFromNode(this.$preSelectedNode));
            }
        }

        _isSelected(item) {
            return this.$freezedSelected ? this.$freezedSelected === item.data : this.$selectedNode === item.data;
        }

        _isPreSelected(item) {
            return this.$freezedPreSelected ? this.$freezedPreSelected === item.data : this.$preSelectedNode === item.data;
        }

        _freezeSelected() {
            this.$freezedSelected = this.$selectedNode;
            this.$freezedPreSelected = this.$preSelectedNode;
        }

        _unFreezeSelected() {
            delete this.$freezedSelected;
            delete this.$freezedPreSelected;
        }

        selectFirst() {
            if (this.$viewPanes[0])
                this.$viewPanes[0].selectFirst();
        }

        getSelectedNode(ignoreFreeze = false) {
            return !ignoreFreeze ? this.$freezedSelected || this.$selectedNode : this.$selectedNode || null;
        }

        getPreSelectedNode(ignoreFreeze = false) {
            return !ignoreFreeze ? this.$freezedPreSelected || this.$preSelectedNode : this.$preSelectedNode || null;
        }

        on(event, listener) {
            if (!_.includes(this.supportedEvents, event)) {
                console.error('jf-tree: Unsupported Event: ' + event);
                return;
            }
            if (!this.listeners[event])
                this.listeners[event] = [];
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
                    _.remove(this.listeners[event], l => l === listener);
                } else {
                    this.listeners[event] = [];
                }
            }
        }

        fire(event, ...params) {
            let stopped = false;
            if (this.listeners[event]) {
                this.listeners[event].forEach(listener => {
                    if (stopped)
                        return;
                    if (listener(...params) === false)
                        stopped = true;
                });
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
            if (exists)
                return exists;
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
            if (!pane)
                console.error(`Missing view pane '${ ctrl.viewPaneName }'. Forgot to create it?`);
            else
                pane._setDirectiveController(ctrl);
        }

        setEmptyTreeText(text) {
            this.emptyTreeText = text;
            return this;
        }

        refreshFilter() {
            this.$viewPanes.forEach(vp => vp.refreshFilter(true));
        }

        focus() {
            if (this.$viewPanes[0])
                this.$viewPanes[0].focus();
        }

        onViewUpdate(originView) {
            this.$viewPanes.forEach(vp => {
                if (vp !== originView)
                    vp.update(false);
            });
        }

        refreshPaneSelection() {
            this.$viewPanes.forEach(vp => vp._buildFlatItems());
        }

        getParentNode(node) {
            let flat = this._flatFromNode(node);
            let parent = flat.parent;
            if (parent)
                return parent.data;
        }

        _createContextMenu() {
            this.ContextMenuService.contextMenu({
                selector: '.jf-tree .jf-tree-item',
                build: $trigger => {
                    let defer = this.$q.defer();
                    let rowCtrl = ($($trigger[0]).is('.jf-tree-item') ? $($trigger[0]) : $($($trigger[0]).parents('jf-tree-item')[0])).prop('comp');
                    let items = rowCtrl.data.data.$cachedCMItems;
                    if (items) {
                        defer.resolve(items);
                    } else {
                        this.contextMenuItemsGetter(rowCtrl.data.data, items => {
                            rowCtrl.data.data.$cachedCMItems = items;
                            defer.resolve(items);
                        });
                    }
                    return defer.promise;
                }
            });
        }

        getNodesCount() {
            let count = 0;
            this.$viewPanes.forEach(vp => {
                count += vp.getNodesCount();
            });
            return count;
        }

        getFilteredNodesCount() {
            let count = 0;
            this.$viewPanes.forEach(vp => {
                count += vp.getFilteredNodesCount();
            });
            return count;
        }

        showLines() {
            this.linesVisible = true;
            this._refreshIndentations();
            return this;
        }
        hideLines() {
            this.linesVisible = false;
            this._refreshIndentations();
        }

        bringNodeToView(node, doScroll = false) {
            let fi = this._flatFromNode(node);
            if (fi) {
                fi.pane.bringItemToView(fi, !doScroll);
            }
        }

        registerEventOnNode(event, callback) {
            if (!this.eventsToRegisterOnNode)
                this.eventsToRegisterOnNode = [];
            this.eventsToRegisterOnNode.push({
                event,
                callback
            });
        }

    }
    return JFTreeApiClass;

}



