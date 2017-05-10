class jfTreeController{

    constructor($scope,$q,$element,$timeout){
        this.$element = $element;
        this.$timeout = $timeout;
        this.$q = $q;

        $scope.$watch('jfTree.treeData',(data)=>{
            if (data && !this.built) this.initTree();
        })
    }

    treeConfig() {
        return {
            'core': {
                'data': {}
            },
            "checkbox" : {
                "keep_selected_style" : false,
                "three_state" : true,
                "tie_selection" : false,
                "whole_node": false
            },
            'plugins' : this.checkboxes === true || this.checkboxes === undefined ? ['wholerow','checkbox'] : []
        }
    }

    initTree() {
        this.buildTree().then(()=>{
            this.registerTreeEvents();
            if (this.onReady) this.onReady({jstree:this.jstree()});
            this.built = true;
        });
    }

    registerTreeEvents() {
        $(this.treeElement).on("select_node.jstree", (e, args) => {
        });
        $(this.treeElement).on("check_node.jstree", (e, args) => {
            if (this.onStateChange) this.$timeout(()=>this.onStateChange());
        });
        $(this.treeElement).on("uncheck_node.jstree", (e, args) => {
            if (this.onStateChange) this.$timeout(()=>this.onStateChange());
        });
    }

    buildTree(){
        this.transformedData = this.transformData(this.treeData);
        let TreeConfig = this.treeConfig();

        TreeConfig.core.data = (obj, cb) => {
            if (obj.id==='#') cb(this.transformedData);
            else {
                let children = this.getChildrenFunc({node:obj.data.originalObject()});
                if (children.then) {
                    children.then(data=>cb(this.transformData(data)));
                }
                else {
                    cb(children ? this.transformData(children) : []);
                }
            }
        };
        this.treeElement = $(this.$element).find('.tree-element');
        $(this.treeElement).jstree(TreeConfig);

        let defer = this.$q.defer();
        $(this.treeElement).on("ready.jstree", (e) => {
            defer.resolve();
        });
        return defer.promise;
    }

    jstree() {
        return $(this.treeElement).jstree();
    }

    transformData(origData){
        if(!origData || !origData.length) return;
        return _.map(origData,(origItem) => {
            let item = {};
            item.data = {originalObject: ()=>origItem};
            let children = this.getChildrenFunc({node:origItem});
            item.children = children && (children.length || children.then) ? true : [];
            item.text = this.getTextFunc({node:origItem}) || '';
            item.icon = "jf-tree-no-icon";
            item.state =  this.getInitialStateFunc ? this.getInitialStateFunc({node:origItem}) : { opened: false, disabled: false, selected: false, checked: false};

            this.setItemMethods(origItem);

            return item;
        });
    }

    setItemMethods(item) {
        item.$isChecked = () => {
            let node = this.getTreeNodeByOrigItem(item);
            return node ? this.jstree().is_checked(node) : false;
        }
        item.$isOpened = () => {
            let node = this.getTreeNodeByOrigItem(item);
            return node ? this.jstree().is_open(node) : false;
        }
        item.$setChecked = (checked = true) => {
            let node = this.getTreeNodeByOrigItem(item);
            if (node) {
                if (checked) this.jstree().check_node(node);
                else this.jstree().uncheck_node(node);
            }
        }
        item.$setOpened = (opened = true) => {
            let node = this.getTreeNodeByOrigItem(item);
            if (node) {
                if (opened) this.jstree().open_node(node,null,false);
                else this.jstree().close_node(node,null,false);
            }
        }
    }

    getTreeNodeByOrigItem(origItem) {
        let treeJSON = this.jstree().get_json();
        let found;
        let recursiveFind = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].data.originalObject() === origItem) {
                    found = arr[i];
                    break;
                }
            }
            if (!found) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].children && arr[i].children.length) {
                        found = recursiveFind(arr[i].children);
                        if (found) break;
                    }
                }
            }
            return found;
        }
        recursiveFind(treeJSON);
        return found;
    }

    hasData() {
        return this.treeData && this.treeData.length;
    }

}

export function jfTree() {
    return {
        restrict: 'E',
        scope: {
            treeData: '=',
            treeHeader: '=',
            checkboxes: '=',
            getTextFunc: '&',
            getChildrenFunc: '&',
            getInitialStateFunc: '&?',
            onStateChange: '&?',
            onReady: '&?'
        },
        controller: jfTreeController,
        controllerAs: 'jfTree',
        templateUrl: 'directives/jf_tree/jf_tree.html',
        bindToController: true
    };
}
