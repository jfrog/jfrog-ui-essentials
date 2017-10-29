import {TreeViewPane} from './tree_view_pane';
export function JFTreeApi($q, $timeout, AdvancedStringMatch) {
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
            this.actions = [];
            this.listeners = {};
            this.supportedEvents = ['ready', 'pagination.change', 'item.clicked', 'item.selected', 'keydown'];
            this.appScope = appScope;
            this.objectName = 'Item';

            this.paneSelector = () => 'default';
        }

        setNodeTemplate(nodeTemplate) {
            this.nodeTemplate = nodeTemplate;
            return this;
        }

        setTreeData(rootData) {
            this.$root = rootData;
            this.$viewPanes.forEach(vp => vp._buildFlatItems())
            if (!this.$isReady) {
                this.$isReady = true;
                this.fire('ready');
            }
        }

        setSortingFunction(sortingFunction) {
            this.sortingFunction = sortingFunction;
            return this;
        }

        setContextMenuItemsGetter(contextMenuItemsGetter) {
            this.contextMenuItemsGetter = contextMenuItemsGetter;
            this._createContextMenu();
            return this;
        }

        setChildrenGetter(childrenGetter) {
            this.childrenGetter = childrenGetter;
            this._getRoot();
            return this;
        }

        setPaneSelector(paneSelector) {
            this.paneSelector = paneSelector;
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

        setClassGetter(classGetter) {
            this.classGetter = classGetter;
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
            let matches = [];
            this.$viewPanes.forEach(vp => matches = matches.concat(vp.getQuickFindMatches()))
            this.quickFindMatches = matches;
            delete this.quickFindIndex;
            return this;
        }

        refreshNode(node) {
            let viewPane = _.find(this.$viewPanes, vp => {
                return vp.findNode(n => n === node);
            })
            if (viewPane) viewPane.refreshNode(node);
        }

        refreshTree() {
            let defer = $q.defer();
            delete this.$rootCache;
            let pendingPromises = this.$viewPanes.length;
            this.$viewPanes.forEach(vp => {
                vp.refreshView().then(() => {
                    pendingPromises--;
                    if (!pendingPromises) {
                        defer.resolve();
                    }
                })
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

        selectNode(node) {
            this._setSelected(this._flatFromNode(node));
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
                    if (down && items[currIndex + 1] || !down && currIndex - 1 >= 0) {
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

            let defer = $q.defer();

            let flat = this._flatFromNode(node);

            if (flat.hasChildren && !flat.data.$noChildren && !flat.$pending) {
                if (!_.includes(this.$openedNodes, node)) {
                    this.$openedNodes.push(node);
                    flat.$pending = true;
                    this.getChildren(node).then(children => {
                        if (!children.length) node.$noChildren = true;
                        flat.pane._addChildren(children, flat.level + 1, flat);
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
                            let flat = this._flatFromNode(nodeToSelect);
                            if (flat) flat.pane.centerOnNode(nodeToSelect);
                            else this.selectFirst();
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


        _setSelected(item) {
            this.$selectedNode = item.data;
            this.fire('item.selected', item.data);
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
            if (this.listeners[event]) {
                this.listeners[event].forEach(listener=>listener(...params))
            }
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
            return parent.data;
        }

        _createContextMenu() {
            $.contextMenu({
                selector: '.jf-tree .jf-tree-item',
                build: ($trigger, e) => {

                    let rowCtrl = angular.element($trigger[0]).controller('jfTreeItem');

                    let treeApi = rowCtrl.tree.api;

                    let items = rowCtrl.data.data.$cachedCMItems;

                    if (items) {
                        $timeout(() => {
                            $('.context-menu-item').on('click', (e) => {
                                if (treeApi.actionToDo) {
                                    $(e.target).trigger('contextmenu:hide');
                                    $timeout(() => {
                                        treeApi.actionToDo();
                                        delete treeApi.actionToDo;
                                    }, 100);
                                }
                            });
                        });

                        return {
                            items,
                            callback: (key, options) => {
                                treeApi.actionToDo = () => {
                                    items[key].action();
                                }
                                return false;
                            }
                        }
                    }

                    else {
                        this.contextMenuItemsGetter(rowCtrl.data.data, (items) => {
                            items = _.map(items, item => {
                                item.action = item.callback;
                                delete item.callback;
                                return item;
                            })
                            rowCtrl.data.data.$cachedCMItems = items;
                            var event = jQuery.Event("contextmenu", {pageX: e.pageX, pageY: e.pageY});
                            $($trigger[0]).trigger(event);
                        });

                        return false;
                    }

                }
            })
        }
	}
	return JFTreeApiClass;

}



