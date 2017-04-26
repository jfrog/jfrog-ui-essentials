/**
 * Created by tomere on 26/04/2017.
 * jfTree
 */

class jfTreeController{

    /**
     * Constructor
     * */
    constructor($scope,$q,$timeout,JFrogEventBus){
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$q = $q;
        this.JFrogEventBus = JFrogEventBus;
        this.beautify = require('../../../node_modules/js-beautify/js/index').js_beautify;
        this.currentNode = {};
        this.generatedDictionay = {
            tabs: {
                result: 'result',
            }
        };
        this.infoTabs = [{name:'result'}];
        this.registerTreeEvents();
        this.initTree();
    }

    initTree(){
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
    }

    beautifyText (jsonToBeautify) {
        return this.beautify(jsonToBeautify);
    }

    buildTree(){
        let defer = this.$q.defer();
        if(!this.jsonData || !this.jsonData.results){
            defer.reject();
            return defer.promise;
        }
        this.jsonString = this.beautifyText(JSON.stringify(this.jsonData));
        this.treeData = this.transformData(this.jsonData.results);
        let TreeConfig = {
            'core': {
                'data': {}
            },
            "checkbox" : {
                "keep_selected_style" : false
            },
            'plugins' : this.plugins
        };
        this.$timeout(()=>{
            TreeConfig.core.data = this.treeData;
            this.treeElement = $('#tree-element');
            $(this.treeElement).jstree(TreeConfig);
            $(this.treeElement).on("ready.jstree", (e) => {
                let firstNode = $(this.treeElement).find('.jstree-li:first');
                if(firstNode){
                    let nodeId = firstNode.attr('id');
                    $(this.treeElement).jstree('select_node', nodeId, true);
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

    // TODO: Make the transformData method to act as generic as possible by passing mapper functions to this directive that describes each node's name,children,data( but also leave the default)
    transformData(resultsData,dataText){
        // // Base case
        if(!resultsData) return;
        let i = 0;
        return _.map(resultsData,(result) => {
            let item = {};
            item.data = {};
            item.children = [];
            item.text = dataText ? dataText+'-'+i : ""+i;
            item.icon = "";
            item.state =  {
                "opened": false,
                "disabled": false,
                "selected": false
            };

            for(let key in result){
                if (result.hasOwnProperty(key)) {
                    if(typeof result[key] === 'string'){
                        item.data[key] = result[key];
                        this.generatedDictionay[key] = this.toTitleCase(key)
                    } else if(typeof result[key] === 'object') {
                        item.children = this.transformData(result[key],key);
                    }
                }
            }
            i++;
            return item;
        });
    }

    toTitleCase(str) {
        return str.replace('_'," ").replace(/\w\S*/g, (txt)=>{
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    hasData(){
        return this.jsonData;
    }

}

export function jfTree() {
    return {
        restrict: 'E',
        scope: {
            jsonData: '=',
            treeHeader: '=',
            treeWidth: '=',
            treeHeight: '=',
            plugins: '='
        },
        controller: jfTreeController,
        controllerAs: 'jfTree',
        templateUrl: 'directives/jf_tree/jf_tree.html',
        bindToController: true
    };
}
