import {jfListMaker}          from './jf_list_maker/jf_list_maker';
import {jfActions}       from './jf_actions/jf_actions';
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
import {jfPanel}   from './jf_panel/jf_panel';
import {jfUiSelect}   from './jf_ui_select/jf_ui_select';
import {jfRevealInput}   from './jf_reveal_input/jf_reveal_input';
import {jfDisableNgAnimate} from './jf_disable_ng_animate/jf_disable_ng_animate';
import {jfEnterPress}   from './jf_enter_press/jf_enter_press';
import {jfTooltipOnOverflow} from './jf_tooltip_on_overflow/jf_tooltip_on_overflow';
import {jfClipCopy} from './jf_clip_copy/jf_clip_copy';
import {jfValidation}   from './jf_validation/jf_validation';
import {jfSidebar}       from './jf_sidebar/jf_sidebar';

angular.module('jfrog.ui.essentials.directives', [])
    .directive({
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
        'jfPanel': jfPanel,
        'jfUiSelect': jfUiSelect,
        'jfRevealInput': jfRevealInput,
        'jfDisableNgAnimate': jfDisableNgAnimate,
        'jfEnterPress': jfEnterPress,
        'jfTooltipOnOverflow': jfTooltipOnOverflow,
        'jfClipCopy': jfClipCopy,
        'jfSidebar': jfSidebar
    });
