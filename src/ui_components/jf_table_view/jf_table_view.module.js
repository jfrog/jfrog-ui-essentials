import {JFrogTableViewOptions} from "./jfrog_table_view_options";
import {jfTableView} from "./jf_table_view";
import {jfTableRow} from "./jf_table_row";
import {jfTableViewBatchActions} from "./jf_table_view_batch_actions";
import {jfTableCompiledCell} from "./jf_table_compiled_cell";

export default angular.module('jfrog_table_view', [])
	.directive('jfTableView', jfTableView)
	.directive('jfTableRow', jfTableRow)
	.directive('jfTableViewBatchActions', jfTableViewBatchActions)
	.directive('jfTableCompiledCell', jfTableCompiledCell)
	.factory('JFrogTableViewOptions', JFrogTableViewOptions);
