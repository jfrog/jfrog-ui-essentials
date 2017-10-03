export function JFTreeApi() {
	'ngInject';
	class JFTreeApiClass {
		/* @ngInject */
        constructor(appScope) {
            this.$root = [];
            this.flatItems = [];
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

        setChildrenGetter(childrenGetter) {
            this.childrenGetter = childrenGetter;
            return this;
        }

        update() {
            if (this.dirCtrl) {
                this.dirCtrl.refresh();
            }
        }

        _buildFlatItems() {
            this.flatItems = [];
            let addChildren = (children, level = 0) => {
                children.forEach(node => {
                    let _children = this.childrenGetter(node);
                    this.flatItems.push({
                        data: node,
                        level
                    });

                    if (_children && _children.length) addChildren(_children, level + 1);
                })
            }
            addChildren(this.$root);
        }

        _setDefaults() {
            this.objectName = 'Item';
            this.itemHeight = '50px';
            this.itemsPerPage = 25;
        }

        on(event, listener) {
            if (!_.includes(this.supportedEvents, event)) {
                console.error('jf-tree: Unsupported Event: ' + event);
                return;
            }
            if (!this.listeners[event]) this.listeners[event] = [];
            this.listeners[event].push(listener);
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
			return sourceData;
        }

        _getRawData() {
            return this.flatItems || [];
        }

	}
	return JFTreeApiClass;

}



