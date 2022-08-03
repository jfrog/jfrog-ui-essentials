import {VueFactory} from "./services/VueFactory";

const jfSummaryRowItem = () => import(/* webpackChunkName: "jfSummaryRow" */ './components/JfSummaryRowComponent/JfSummaryRowItemComponent/index.vue');
const jfSummaryRow = () => import(/* webpackChunkName: "jfSummaryRow" */ './components/JfSummaryRowComponent/index.vue');
const jfDivider = () => import(/* webpackChunkName: "jfDivider" */ './components/JfDividerComponent/index.vue');
const jfTreeIndentation = () => import(/* webpackChunkName: "jfTree" */ './components/JfTreeIndentationComponent/index.vue');
const jfTreeCompiledCell = () => import(/* webpackChunkName: "jfTree" */ './components/JfTreeCompiledCellComponent/index.vue');
const jfTreeItem = () => import(/* webpackChunkName: "jfTree" */ './components/JfTreeItemComponent/index.vue');
const jfTree = () => import(/* webpackChunkName: "jfTree" */ './components/JfTreeComponent/index.vue');
const jfTableTop = () => import(/* webpackChunkName: "jfTable" */ './components/JfTableTopComponent/index.vue');
const jfTableCompiledCell = () => import(/* webpackChunkName: "jfTable" */ './components/JfTableCompiledCellComponent/index.vue');
const jfTableViewBatchActions = () => import(/* webpackChunkName: "jfTable" */ './components/JfTableViewBatchActionsComponent/index.vue');
const jfTableRow = () => import(/* webpackChunkName: "jfTable" */ './components/JfTableRowComponent/index.vue');
const jfTableView = () => import(/* webpackChunkName: "jfTable" */ './components/JfTableViewComponent/index.vue');
const jfTableViewWrapper = () => import(/* webpackChunkName: "jfTable" */ './components/JfTableViewWrapper/index.vue');
const jfFileDrop = () => import(/* webpackChunkName: "jfFileDrop" */ './components/JfFileDropComponent/index.vue');
const jfGraphs = () => import(/* webpackChunkName: "jfGraphs" */ './components/JfGraphsComponent/index.vue');
const jfPendingData = () => import(/* webpackChunkName: "jfPendingData" */ './components/JfPendingDataComponent/index.vue');
const jfTextBox = () => import(/* webpackChunkName: "jfTextBox" */ './components/JfTextBoxComponent/index.vue');
const jfOnOffSwitch = () => import(/* webpackChunkName: "jfOnOffSwitch" */ './components/JfOnOffSwitchComponent/index.vue');
const jfSwitchToggler = () => import(/* webpackChunkName: "jfSwitchToggler" */ './components/JfSwitchTogglerComponent/index.vue');
const jfToggler = () => import(/* webpackChunkName: "jfToggler" */ './components/JfTogglerComponent/index.vue');
const jfWizardElement = () => import(/* webpackChunkName: "jfWizardElement" */ './components/JfWizardElementComponent/index.vue');
const Multiselect = () => import(/* webpackChunkName: "Multiselect" */ './../node_modules/vue-multiselect/src/index.js');
const vSelect = () => import(/* webpackChunkName: "vSelect" */ './../node_modules/vue-select/src/components/Select.vue');
const jfWizard = () => import(/* webpackChunkName: "jfWizard" */ './components/JfWizardComponent/index.vue');
const jfTabularDnd = () => import(/* webpackChunkName: "jfTabularDnd" */ './components/JfTabularDndComponent/index.vue');
const jfDragDrop = () => import(/* webpackChunkName: "jfTabularDnd" */ './components/JfDragDropComponent/index.vue');
const jfDragDropPagination = () => import(/* webpackChunkName: "jfDragDrop" */ './components/JfDragDropPaginationComponent/index.vue');
const jfActions = () => import(/* webpackChunkName: "jfActions" */ './components/JfActionsComponent/index.vue');
const jfHelpTooltip = () => import(/* webpackChunkName: "jfHelpTooltip" */ './components/JfHelpTooltipComponent/index.vue');
const jfListMaker = () => import(/* webpackChunkName: "jfListMaker" */ './components/JfListMakerComponent/index.vue');
const jfCheckbox = () => import(/* webpackChunkName: "jfCheckbox" */ './components/JfCheckboxComponent/index.vue');
const jfSwitch = () => import(/* webpackChunkName: "jfCheckbox" */ './components/JfSwitchComponent/index.vue');
const jfGrid = () => import(/* webpackChunkName: "jfGrid" */ './components/JfGridComponent/index.vue');
const jfGridPagination = () => import(/* webpackChunkName: "jfGrid" */ './components/JfGridPaginationComponent/index.vue');
const jfGridBatchActions = () => import(/* webpackChunkName: "jfGrid" */ './components/JfGridBatchActionsComponent/index.vue');
const jfValidation = () => import(/* webpackChunkName: "jfValidation" */ './components/JfValidationComponent/index.vue');
const jfField = () => import(/* webpackChunkName: "jfField" */ './components/JfFieldComponent/index.vue');
const jfCodeMirror = () => import(/* webpackChunkName: "jfCodeMirror" */ './components/JfCodeMirrorComponent/index.vue');
const jfGridFilter = () => import(/* webpackChunkName: "jfGrid" */ './components/JfGridFilterComponent/index.vue');
const jfTabs = () => import(/* webpackChunkName: "jfTabs" */ './components/JfTabsComponent/index.vue');
const jfTab = () => import(/* webpackChunkName: "jfTabs" */ './components/JfTabComponent/index.vue');
const jfDrawer = () => import(/* webpackChunkName: "jfDrawer" */ './components/JfDrawerComponent/index.vue');
const jfPanel = () => import(/* webpackChunkName: "jfPanel" */ './components/JfPanelComponent/index.vue');
const jfUiSelect = () => import(/* webpackChunkName: "jfUiSelect" */ './components/JfUiSelectComponent/index.vue');
const jfEnterPress = () => import(/* webpackChunkName: "JfEnterPressComponent" */ './components/JfEnterPressComponent/index.vue');
const jfClipCopy = () => import(/* webpackChunkName: "jfClipCopy" */ './components/JfClipCopyComponent/index.vue');
const jfSidebar = () => import(/* webpackChunkName: "jfSidebar" */ './components/JfSidebarComponent/index.vue');
const jfMultiDropdown = () => import(/* webpackChunkName: "jfMultiDropdown" */ './components/JfMultiDropdownComponent/index.vue');
const jfWidgetsLayout = () => import(/* webpackChunkName: "jfWidgetsLayout" */ './components/JfWidgetsLayoutComponent/index.vue');
const jfMarquee = () => import(/* webpackChunkName: "jfMarquee" */ './components/JfMarqueeComponent/index.vue');
const jfPasswordStrength = () => import(/* webpackChunkName: "jfPasswordStrength" */ './components/JfPasswordStrengthComponent/index.vue');
const jfListSelection = () => import(/* webpackChunkName: "jfListSelection" */ './components/JfListSelectionComponent/index.vue');
const jfMarkupEditor = () => import(/* webpackChunkName: "jfMarkupEditor" */ './components/JfMarkupEditorComponent/index.vue');
const jfJsTreeWrap = () => import(/* webpackChunkName: "jfJsTreeWrap" */ './components/JfJsTreeWrapComponent/index.vue');
const jfRadioButton = () => import(/* webpackChunkName: "jfRadioButton" */ './components/JfRadioButtonComponent/index.vue');
const jfDragAndDropTxt = () => import(/* webpackChunkName: "jfDragAndDropTxt" */ './components/JfDragAndDropTxtComponent/index.vue');
const jfContextMenu = () => import(/* webpackChunkName: "jfContextMenu" */ './components/JfContextMenuComponent/index.vue');
const jfVscroll = () => import(/* webpackChunkName: "jfVscroll" */ './components/JfVscrollComponent/index.vue');
const jfVscrollElement = () => import(/* webpackChunkName: "jfVscroll" */ './components/JfVscrollElementComponent/index.vue');
const jfDataList = () => import(/* webpackChunkName: "jfDataList" */ './components/JfDataListComponent/index.vue');


export function registerGlobalComponents() {
    const {Vue} = VueFactory.getInstance();

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
        jfTableViewWrapper,
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
}
