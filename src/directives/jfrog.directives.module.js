import {jfListMaker}          from './jf_list_maker/jf_list_maker';
import {jfActions}       from './jf_actions/jf_actions';
import {jfTabularDnD}      from './jf_tabular_dnd/jf_tabular_dnd'
import {jfDragDrop}      from './jf_drag_drop/jf_drag_drop'
import {jfDragDropPagination}      from './jf_drag_drop_pagination/jf_drag_drop_pagination'
import {jfTooltip}       from './jf_tooltip/jf_tooltip';
import {jfHelpTooltip}       from './jf_help_tooltip/jf_help_tooltip';
import {jfCheckbox}      from './jf_checkbox/jf_checkbox';
import {jfSwitch}        from './jf_switch/jf_switch';
import {jfGrid} from './jf_grid/jf_grid';
import {jfGridPagination} from './jf_grid_pagination/jf_grid_pagination';
import {jfGridBatchActions}   from './jf_grid_batch_actions/jf_grid_batch_actions';
import {jfField}   from './jf_field/jf_field';
import {jfCodeMirror}   from './jf_codemirror/jf_codemirror';
import {jfGridFilter}   from './jf_grid_filter/jf_grid_filter';
import {jfTabs}   from './jf_tabs/jf_tabs';
import {jfTab}   from './jf_tabs/jf_tab';
import {jfDrawer}   from './jf_drawers/jf_drawer';
import {jfPanel}   from './jf_panel/jf_panel';
import {jfUiSelect}   from './jf_ui_select/jf_ui_select';
import {jfRevealInput}   from './jf_reveal_input/jf_reveal_input';
import {jfDisableNgAnimate} from './jf_disable_ng_animate/jf_disable_ng_animate';
import {jfIncludeReplace} from './jf_include_replace/jf_include_replace';
import {jfEnterPress}   from './jf_enter_press/jf_enter_press';
import {jfTooltipOnOverflow} from './jf_tooltip_on_overflow/jf_tooltip_on_overflow';
import {jfClipCopy} from './jf_clip_copy/jf_clip_copy';
import {jfValidation}   from './jf_validation/jf_validation';
import {jfSidebar}       from './jf_sidebar/jf_sidebar';
import {jfMultiDropdown}       from './jf_multi_dropdown/jf_multi_dropdown';
import {jfRadioButton} from './jf_radio_button/jf_radio_button';
import {jfWidgetsLayout}       from './jf_widgets_layout/jf_widgets_layout';
import {jfMarquee}       from './jf_marquee/jf_marquee';
import {jfPasswordStrength} from './jf_password_strength/jf_password_strength';
import {jfClearErrors} from "./jf_clear_errors/jf_clear_errors";
import {jfMarkupEditor} from "./jf_markup_editor/jf_markup_editor";
import {jfJsTreeWrap} from "./jf_js_tree_wrap/jf_js_tree_wrap";
import {jfAutoComplete} from "./jf_auto_complete/jf_auto_complete";
import {jfDatetimepicker} from "./jf_datetimepicker/jf_datetimepicker";
import {jfDynamicTemplate} from "./jf_dynamic_template/jf_dynamic_template";
import {jfListSelection} from "./jf_list_selection/jf_list_selection";
import {jfDragAndDropTxt} from './jf_drag_and_drop_txt/jf_drag_and_drop_txt';
import {jfContextMenu} from "./jf_context_menu/jf_context_menu.component";
import {jfDataList} from "./jf_data_list/jf_data_list";
import {jfVScroll} from "./jf_vscroll/jf_vscroll";
import {jfVScrollElement} from "./jf_vscroll/jf_vscroll_element";

angular.module('jfrog.ui.essentials.directives', [])
    .directive({
        'jfTabularDnd': jfTabularDnD,
        'jfDragDrop': jfDragDrop,
        'jfDragDropPagination': jfDragDropPagination,
        'jfActions': jfActions,
        'jfTooltip': jfTooltip,
        'jfHelpTooltip': jfHelpTooltip,
        'jfListMaker': jfListMaker,
        'jfCheckbox': jfCheckbox,
        'jfSwitch': jfSwitch,
        'jfGrid': jfGrid,
        'jfGridPagination': jfGridPagination,
        'jfGridBatchActions': jfGridBatchActions,
        'jfValidation': jfValidation,
        'jfField': jfField,
        'jfCodeMirror': jfCodeMirror,
        'jfGridFilter': jfGridFilter,
        'jfTabs': jfTabs,
        'jfTab': jfTab,
        'jfDrawer': jfDrawer,
        'jfPanel': jfPanel,
        'jfUiSelect': jfUiSelect,
        'jfRevealInput': jfRevealInput,
        'jfDisableNgAnimate': jfDisableNgAnimate,
        'jfIncludeReplace': jfIncludeReplace,
        'jfEnterPress': jfEnterPress,
        'jfTooltipOnOverflow': jfTooltipOnOverflow,
        'jfClipCopy': jfClipCopy,
        'jfSidebar': jfSidebar,
        'jfMultiDropdown': jfMultiDropdown,
        'jfWidgetsLayout': jfWidgetsLayout,
        'jfMarquee': jfMarquee,
        'jfPasswordStrength': jfPasswordStrength,
        'jfClearErrors': jfClearErrors,
	    'jfDatetimepicker': jfDatetimepicker,
	    'jfDynamicTemplate': jfDynamicTemplate,
	    'jfListSelection': jfListSelection,
        'jfMarkupEditor': jfMarkupEditor,
        'jfJsTreeWrap': jfJsTreeWrap,
        'jfAutoComplete': jfAutoComplete,
	    'jfRadioButton': jfRadioButton,
        'jfDragAndDropTxt': jfDragAndDropTxt,
        'jfContextMenu': jfContextMenu,
        'jfVscroll': jfVScroll,
        'jfVscrollElement': jfVScrollElement,
        'jfDataList': jfDataList
    });
