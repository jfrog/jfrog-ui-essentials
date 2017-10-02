import {JFTreeApi} from "./jf_tree_api";
import {jfTree} from "./jf_tree";
import {jfTreeItem} from "./jf_tree_item";
import {jfTreeCompiledCell} from "./jf_tree_compiled_cell";

export default angular.module('jf_tree', [])
	.directive('jfTree', jfTree)
	.directive('jfTreeItem', jfTreeItem)
	.directive('jfTreeCompiledCell', jfTreeCompiledCell)
	.factory('JFTreeApi', JFTreeApi);
