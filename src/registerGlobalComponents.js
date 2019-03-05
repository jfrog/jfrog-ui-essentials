import jfSummaryRowItem from './components/JfSummaryRowComponent/JfSummaryRowItemComponent/index.vue';
import jfSummaryRow from './components/JfSummaryRowComponent/index.vue';
import jfDivider from './components/JfDividerComponent/index.vue';
import jfTreeIndentation from './components/JfTreeIndentationComponent/index.vue';
import jfTreeCompiledCell from './components/JfTreeCompiledCellComponent/index.vue';
import jfTreeItem from './components/JfTreeItemComponent/index.vue';
import jfTree from './components/JfTreeComponent/index.vue';
import jfTableTop from './components/JfTableTopComponent/index.vue';
import jfTableCompiledCell from './components/JfTableCompiledCellComponent/index.vue';
import jfTableViewBatchActions from './components/JfTableViewBatchActionsComponent/index.vue';
import jfTableRow from './components/JfTableRowComponent/index.vue';
import jfTableView from './components/JfTableViewComponent/index.vue';
import jfFileDrop from './components/JfFileDropComponent/index.vue';
import jfGraphs from './components/JfGraphsComponent/index.vue';
import jfPendingData from './components/JfPendingDataComponent/index.vue';
import jfTextBox from './components/JfTextBoxComponent/index.vue';
import jfOnOffSwitch from './components/JfOnOffSwitchComponent/index.vue';
import jfSwitchToggler from './components/JfSwitchTogglerComponent/index.vue';
import jfToggler from './components/JfTogglerComponent/index.vue';
import jfDataList from './components/JfDataListComponent/index.vue';
import jfVscrollElement from './components/JfVscrollElementComponent/index.vue';
import jfVscroll from './components/JfVscrollComponent/index.vue';
import jfContextMenu from './components/JfContextMenuComponent/index.vue';
import jfDragAndDropTxt from './components/JfDragAndDropTxtComponent/index.vue';
import jfRadioButton from './components/JfRadioButtonComponent/index.vue';
import jfJsTreeWrap from './components/JfJsTreeWrapComponent/index.vue';
import jfMarkupEditor from './components/JfMarkupEditorComponent/index.vue';
import jfListSelection from './components/JfListSelectionComponent/index.vue';
import jfDatetimepicker from './components/JfDatetimepickerComponent/index.vue';
import jfPasswordStrength from './components/JfPasswordStrengthComponent/index.vue';
import jfMarquee from './components/JfMarqueeComponent/index.vue';
import jfWidgetsLayout from './components/JfWidgetsLayoutComponent/index.vue';
import jfMultiDropdown from './components/JfMultiDropdownComponent/index.vue';
import jfSidebar from './components/JfSidebarComponent/index.vue';
import jfClipCopy from './components/JfClipCopyComponent/index.vue';
import jfEnterPress from './components/JfEnterPressComponent/index.vue';
import jfUiSelect from './components/JfUiSelectComponent/index.vue';
import jfPanel from './components/JfPanelComponent/index.vue';
import jfDrawer from './components/JfDrawerComponent/index.vue';
import jfTab from './components/JfTabComponent/index.vue';
import jfTabs from './components/JfTabsComponent/index.vue';
import jfGridFilter from './components/JfGridFilterComponent/index.vue';
import jfCodeMirror from './components/JfCodeMirrorComponent/index.vue';
import jfField from './components/JfFieldComponent/index.vue';
import jfValidation from './components/JfValidationComponent/index.vue';
import jfGridBatchActions from './components/JfGridBatchActionsComponent/index.vue';
import jfGridPagination from './components/JfGridPaginationComponent/index.vue';
import jfGrid from './components/JfGridComponent/index.vue';
import jfSwitch from './components/JfSwitchComponent/index.vue';
import jfCheckbox from './components/JfCheckboxComponent/index.vue';
import jfListMaker from './components/JfListMakerComponent/index.vue';
import jfHelpTooltip from './components/JfHelpTooltipComponent/index.vue';
import jfActions from './components/JfActionsComponent/index.vue';
import jfDragDropPagination from './components/JfDragDropPaginationComponent/index.vue';
import jfDragDrop from './components/JfDragDropComponent/index.vue';
import jfTabularDnd from './components/JfTabularDndComponent/index.vue';
import jfWizard from './components/JfWizardComponent/index.vue';
import jfWizardElement from './components/JfWizardElementComponent/index.vue';
import vSelect from './../node_modules/vue-select/src/components/Select.vue'
import Multiselect from './../node_modules/vue-multiselect/src/index.js'


const Vue = window.Vue;
let components = [
    jfWizardElement,
    jfWizard,
    jfTabularDnd,
    jfDragDrop,
    jfDragDropPagination,
    jfActions,
    jfHelpTooltip,
    jfListMaker,
    jfCheckbox,
    jfSwitch,
    jfGrid,
    jfGridPagination,
    jfGridBatchActions,
    jfValidation,
    jfField,
    jfCodeMirror,
    jfGridFilter,
    jfTabs,
    jfTab,
    jfDrawer,
    jfPanel,
    jfUiSelect,
    jfEnterPress,
    jfClipCopy,
    jfSidebar,
    jfMultiDropdown,
    jfWidgetsLayout,
    jfMarquee,
    jfPasswordStrength,
    jfDatetimepicker,
    jfListSelection,
    jfMarkupEditor,
    jfJsTreeWrap,
    jfRadioButton,
    jfDragAndDropTxt,
    jfContextMenu,
    jfVscroll,
    jfVscrollElement,
    jfDataList,
    jfToggler,
    jfSwitchToggler,
    jfOnOffSwitch,
    jfTextBox,
    jfPendingData,
    jfGraphs,
    jfFileDrop,
    jfTableView,
    jfTableRow,
    jfTableViewBatchActions,
    jfTableCompiledCell,
    jfTableTop,
    jfTree,
    jfTreeItem,
    jfTreeCompiledCell,
    jfTreeIndentation,
    jfDivider,
    jfSummaryRow,
    jfSummaryRowItem
];

components.forEach(comp => {
    Vue.component(comp.name, comp);
});

Vue.component('v-select', vSelect)
Vue.component('multiSelect', Multiselect)
