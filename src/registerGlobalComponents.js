import jfSummaryRowItem from './components/JfSummaryRowItemComponent.vue';
import jfSummaryRow from './components/JfSummaryRowComponent.vue';
import jfDivider from './components/JfDividerComponent.vue';
import jfTreeIndentation from './components/JfTreeIndentationComponent.vue';
import jfTreeCompiledCell from './components/JfTreeCompiledCellComponent.vue';
import jfTreeItem from './components/JfTreeItemComponent.vue';
import jfTree from './components/JfTreeComponent.vue';
import jfTableTop from './components/JfTableTopComponent.vue';
import jfTableCompiledCell from './components/JfTableCompiledCellComponent.vue';
import jfTableViewBatchActions from './components/JfTableViewBatchActionsComponent.vue';
import jfTableRow from './components/JfTableRowComponent.vue';
import jfTableView from './components/JfTableViewComponent.vue';
import jfFileDrop from './components/JfFileDropComponent.vue';
import jfBillboard from './components/JfBillboardComponent.vue';
import jfPendingData from './components/JfPendingDataComponent.vue';
import jfTextBox from './components/JfTextBoxComponent.vue';
import jfOnOffSwitch from './components/JfOnOffSwitchComponent.vue';
import jfSwitchToggler from './components/JfSwitchTogglerComponent.vue';
import jfToggler from './components/JfTogglerComponent.vue';
import jfDataList from './components/JfDataListComponent.vue';
import jfVscrollElement from './components/JfVscrollElementComponent.vue';
import jfVscroll from './components/JfVscrollComponent.vue';
import jfContextMenu from './components/JfContextMenuComponent.vue';
import jfDragAndDropTxt from './components/JfDragAndDropTxtComponent.vue';
import jfRadioButton from './components/JfRadioButtonComponent.vue';
import jfJsTreeWrap from './components/JfJsTreeWrapComponent.vue';
import jfMarkupEditor from './components/JfMarkupEditorComponent.vue';
import jfListSelection from './components/JfListSelectionComponent.vue';
import jfDatetimepicker from './components/JfDatetimepickerComponent.vue';
import jfPasswordStrength from './components/JfPasswordStrengthComponent.vue';
import jfMarquee from './components/JfMarqueeComponent.vue';
import jfWidgetsLayout from './components/JfWidgetsLayoutComponent.vue';
import jfMultiDropdown from './components/JfMultiDropdownComponent.vue';
import jfSidebar from './components/JfSidebarComponent.vue';
import jfClipCopy from './components/JfClipCopyComponent.vue';
import jfEnterPress from './components/JfEnterPressComponent.vue';
import jfUiSelect from './components/JfUiSelectComponent.vue';
import jfPanel from './components/JfPanelComponent.vue';
import jfDrawer from './components/JfDrawerComponent.vue';
import jfTab from './components/JfTabComponent.vue';
import jfTabs from './components/JfTabsComponent.vue';
import jfGridFilter from './components/JfGridFilterComponent.vue';
import jfCodeMirror from './components/JfCodeMirrorComponent.vue';
import jfField from './components/JfFieldComponent.vue';
import jfValidation from './components/JfValidationComponent.vue';
import jfGridBatchActions from './components/JfGridBatchActionsComponent.vue';
import jfGridPagination from './components/JfGridPaginationComponent.vue';
import jfGrid from './components/JfGridComponent.vue';
import jfSwitch from './components/JfSwitchComponent.vue';
import jfCheckbox from './components/JfCheckboxComponent.vue';
import jfListMaker from './components/JfListMakerComponent.vue';
import jfHelpTooltip from './components/JfHelpTooltipComponent.vue';
import jfActions from './components/JfActionsComponent.vue';
import jfDragDropPagination from './components/JfDragDropPaginationComponent.vue';
import jfDragDrop from './components/JfDragDropComponent.vue';
import jfTabularDnd from './components/JfTabularDndComponent.vue';
import jfWizard from './components/JfWizardComponent.vue';
import jfWizardElement from './components/JfWizardElementComponent.vue';
import uiSelectMatch from './sourceless/components/UiSelectMatchComponent.vue';
import uiSelect from './sourceless/components/UiSelectComponent.vue';
import uiSelectChoices from './sourceless/components/UiSelectChoicesComponent.vue';
import ngMessages from './sourceless/components/NgMessagesComponent.vue';
import vSelect from './../node_modules/vue-select/src/components/Select.vue'
const Vue = window.Vue;
let components = [
    ngMessages,
    uiSelectChoices,
    uiSelect,
    uiSelectMatch,
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
    jfBillboard,
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
