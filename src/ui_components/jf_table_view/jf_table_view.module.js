import {JFrogTableViewOptions} from "./jfrog_table_view_options";
import {jfTableView} from "./jf_table_view";
import {jfTableRow} from "./jf_table_row";

export default angular.module('jfrog_table_view', [])
	.directive('jfTableView', jfTableView)
	.directive('jfTableRow', jfTableRow)
	.factory('JFrogTableViewOptions', JFrogTableViewOptions);
