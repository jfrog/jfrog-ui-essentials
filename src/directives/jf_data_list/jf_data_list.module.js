import jfDataListCompiledItem from './components/jf_data_list_item/jf_data_list_compiled_item';
import jfDataListItem from './components/jf_data_list_item/jf_data_list_item';
import jfDataList from './jf_data_list';

export const MODULE_DATA_LIST = 'jf.data.list';
angular.module(MODULE_DATA_LIST, [])
       .directive('jfDataListCompiledItem', jfDataListCompiledItem)
       .directive('jfDataListItem', jfDataListItem)
       .directive('jfDataList', jfDataList);