/**
 * Created by tomere on 26/04/2017.
 * jfTree
 */

class jfTreeController{

    /**
     * Constructor
     * */
    constructor($scope,$q,$timeout,$element){
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$element = $element;
        this.$q = $q;
        this.currentNode = {};
        this.generatedDictionay = {
            tabs: {
                result: 'result',
            }
        };
//        this.registerTreeEvents();
        this.initTree();
    }

    initTree() {
        this.buildTree().then(()=>{
            this.registerTreeEvents();
        });
    }

    /**
     * register a listener on the tree and delegate to
     * relevant methods
     *
     * @param element
     * @private
     */
    registerTreeEvents() {
        $(this.treeElement).on("select_node.jstree", (e, args) => {
            this.currentNode = args.node;
        });
        $(this.treeElement).on("check_node.jstree", (e, args) => {
            args.node.data.originalObject.$checked = true;
        });
        $(this.treeElement).on("uncheck_node.jstree", (e, args) => {
            args.node.data.originalObject.$checked = false;
        });
    }

    buildTree(){
        let defer = this.$q.defer();
        if(!this.treeData){
            defer.reject();
            return defer.promise;
        }
        this.transformedData = this.transformData(this.treeData);
        let TreeConfig = {
            'core': {
                'data': {}
            },
            "checkbox" : {
                "keep_selected_style" : false,
                "three_state" : true,
                "tie_selection" : false,
                "whole_node": true
            },
            'plugins' : this.plugins
        };
        this.$timeout(()=>{
            TreeConfig.core.data = this.transformedData;
            this.treeElement = $(this.$element).find('.tree-element');
            $(this.treeElement).jstree(TreeConfig);
            $(this.treeElement).on("ready.jstree", (e) => {
                let firstNode = $(this.treeElement).find('.jstree-li:first');
                if(firstNode){
                    let nodeId = firstNode.attr('id');
//                    $(this.treeElement).jstree('select_node', nodeId, true);
                    let node = $(this.treeElement).jstree('get_node', nodeId);
                    this.$timeout(()=>{
                        this.currentNode = node;
                    },100);
                }
                defer.resolve()
            });
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
            item.data = {originalObject: _.find(this.treeData,origItem)};
            item.children = this.transformData(this.getChildrenFunc({item:origItem}) || []);
            item.text = this.getTextFunc({item:origItem}) || '';
            item.icon = "jf-tree-no-icon";
            item.state =  {
                opened: false,
                disabled: false,
                selected: false,
                checked: false
            };
            return item;
        });
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
            treeWidth: '=',
            treeHeight: '=',
            plugins: '=',
            getTextFunc: '&',
            getChildrenFunc: '&',
        },
        controller: jfTreeController,
        controllerAs: 'jfTree',
        templateUrl: 'directives/jf_tree/jf_tree.html',
        bindToController: true
    };
}
