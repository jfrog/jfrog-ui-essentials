((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[46],{

/***/ "0ece":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfVscrollElementComponent/index.vue?vue&type=template&id=f00afde6&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.compiledProps)?_c(_vm.template,_vm._b({tag:"component"},'component',_vm.compiledProps,false)):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfVscrollElementComponent/index.vue?vue&type=template&id=f00afde6&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("bd86");

// EXTERNAL MODULE: ./src/services/VueFactory.js
var VueFactory = __webpack_require__("e1f3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfVscrollElementComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//

/* harmony default export */ var JfVscrollElementComponentvue_type_script_lang_js_ = ({
  name: 'jf-vscroll-element',
  props: ['data', 'template', 'variable', 'index', 'last', 'vscroll'],
  'jf@inject': ['$scope', '$compileComp', '$element', '$timeout'],
  data: function data() {
    return {
      compiledProps: null
    };
  },
  computed: {},
  created: function created() {
    /*
                let unwatchHeight = this.$scope.$watch('jfVScrollElement.childrenHeight', () => {
                    if (this.childrenHeight && this.childrenHeight > 1) {
                        this.vscroll.setItemHeight(this.childrenHeight);
                        unwatchHeight();
                    }
                });
    */
  },
  watch: {},
  mounted: function mounted() {
    var _this = this,
        _elementScope;

    var elementScope = (_elementScope = {}, Object(defineProperty["a" /* default */])(_elementScope, this.variable, this.data), Object(defineProperty["a" /* default */])(_elementScope, "v_index", function v_index() {
      return _this.index;
    }), Object(defineProperty["a" /* default */])(_elementScope, "is_last", function is_last() {
      return _this.last;
    }), _elementScope); //            this.compiledTemplate = this.$compileComp(this.template, {});

    this.compiledProps = elementScope;

    var _VueFactory$getInstan = VueFactory["a" /* VueFactory */].getInstance(),
        Vue = _VueFactory$getInstan.Vue;

    Vue.nextTick(function () {
      _this.vscroll.setItemHeight(_this.childrenHeight());

      _this.$scope.$watch('jfVScrollElement.data', function () {
        if (!_this.compiledProps || !_this.variable || !_this.data) return;
        _this.compiledProps[_this.variable] = _this.data;
      });
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfVScrollElement'
  },
  methods: {
    childrenHeight: function childrenHeight() {
      return $(this.$element).children().height() || 50;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfVscrollElementComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfVscrollElementComponentvue_type_script_lang_js_ = (JfVscrollElementComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfVscrollElementComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfVscrollElementComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "f00afde6",
  null
  
)

/* harmony default export */ var JfVscrollElementComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "59a1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableRowComponent/index.vue?vue&type=template&id=560d89dc&scoped=true&
var render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.data)?_c('div',{staticClass:"jf-table-row",class:( _obj = {
        headers: _vm.rowId === 'headers',
        'group-header': _vm.data && _vm.data.$groupHeader,
        'expanded': _vm.data && _vm.data.$groupHeader && _vm.data.$groupHeader.$expanded,
        'sub-row': _vm.data && _vm.data.$parentRow,
        sticky: _vm.data && _vm.data.$sticky,
        selected: _vm.data && _vm.data.$selected,
        'drag-mark': _vm.rowId !== 'headers' && _vm.tableView.options.draggableRows && !(_vm.tableView.options.registeredTabularDnd && _vm.tableView.options.registeredTabularDnd.dndCtrl.disabled) && _vm.isRowDraggable()
      }, _obj[_vm.data[_vm.tableView.options.rowClassAttr]] = _vm.tableView.options.rowClassAttr && _vm.data[_vm.tableView.options.rowClassAttr], _obj ),style:({height: _vm.rowId === 'headers' ? '' : _vm.tableView.options.rowHeight, opacity: _vm.tableView.options.ready ? 1 : 0}),on:{"mousemove":function($event){_vm.rowId === 'headers' && _vm.tableView.options.resizableColumns && _vm.onMouseMove($event)},"mousedown":function($event){_vm.rowId === 'headers' && _vm.tableView.options.resizableColumns && _vm.onMouseDown($event)},"mouseup":function($event){_vm.rowId === 'headers' && _vm.tableView.options.resizableColumns && _vm.onMouseUp($event)},"mouseleave":function($event){_vm.rowId === 'headers' && _vm.tableView.options.resizableColumns && _vm.onMouseUp($event)},"click":function($event){return _vm.onRowClick($event)}}},[(_vm.tableView.options.hasSelection())?_c('div',{staticClass:"jf-table-cell selection",class:{'single-selection' : _vm.tableView.options.selectionMode === _vm.tableView.options.SINGLE_SELECTION},style:({height: _vm.tableView.options.rowHeight, width: _vm.tableView.options.selectionColumnWidth + 'px'})},[_c('div',{staticClass:"jf-table-cell-content"},[((!_vm.data.$groupHeader && _vm.rowId !== 'headers') || (_vm.tableView.options.selectionMode === _vm.tableView.options.MULTI_SELECTION && _vm.tableView.options.getRawData().length && !_vm.tableView.options.noSelectAll))?_c('div',{staticClass:"selection-button",style:({height: _vm.tableView.options.rowHeight, width: _vm.tableView.options.selectionColumnWidth +'px'})},[_c('div',{staticClass:"selection-icon icon icon-datagrid-v",class:{selected: _vm.data.$selected || (_vm.rowId === 'headers' && _vm.tableView.allSelected)},on:{"click":function($event){_vm.toggleSelection(_vm.rowId === 'headers');$event.stopPropagation();}}})]):_vm._e()])]):_vm._e(),(_vm.data.$groupHeader)?_c('div',{staticClass:"jf-table-cell group-header",style:({height: _vm.rowId === 'headers' ? '' : _vm.tableView.options.rowHeight,
                  lineHeight: _vm.rowId === 'headers' ? '' : _vm.tableView.options.rowHeight})},[_c('i',{staticClass:"icon icon-small-arrow-down",class:{'expanded': _vm.data.$groupHeader.$expanded}}),(_vm.data.$groupHeader.col && !_vm.data.$groupHeader.col.cellTemplate)?_c('span',{staticClass:"jf-table-cell-content group-header"},[_vm._v("\n            "+_vm._s(_vm.data.$groupHeader.value)+"\n        ")]):_vm._e(),(_vm.data.$groupHeader.col && _vm.data.$groupHeader.col.cellTemplate)?_c('div',{staticClass:"jf-table-cell-content group-header"},[_c('jf-table-compiled-cell',{attrs:{"field":_vm.data.$groupHeader.field,"row-id":_vm.rowId,"table-row":_vm.jfTableRow}})],1):_vm._e(),_c('div',{staticClass:"group-header-count"},[_vm._v("("+_vm._s(_vm.data.$groupHeader.count)+")")])]):_vm._e(),_vm._l((_vm.tableView.options.columns),function(col,$index){
                  var _obj;
return (!_vm.data.$groupHeader)?_c('div',{staticClass:"jf-table-cell",class:( _obj = {header: _vm.rowId === 'headers' && col.header, sortable: _vm.rowId === 'headers' && _vm.tableView.options.sortable && _vm.tableView.options.getRawData().length && col.sortable && !_vm.hoveringResize, 'column-resizer': _vm.hoveringResize}, _obj['drag-right'] = col.$dragRightBorder, _obj['drag-left'] = col.$dragLeftBorder, _obj['field-id-' + _vm.kebab(col.field)] = true, _obj['row-expander-cell'] = $index === 0 && _vm.tableView.options.subRowsEnabled, _obj ),style:({height: _vm.rowId === 'headers' ? _vm.tableView.options.headerRowHeight : _vm.tableView.options.rowHeight, width: col.width}),on:{"click":function($event){return _vm.onClickCell(col,$event)}}},[($index === 0 && _vm.tableView.options.subRowsEnabled)?_c('div',{staticClass:"row-expander",class:{placeholder: (!_vm.data.$subRows && !_vm.data.$parentRow) || (_vm.data.$subRows && _vm.data.$subRows.length === 0) || (_vm.data.$parentRow)},style:({height: _vm.tableView.options.rowHeight}),on:{"click":function($event){return _vm.toggleExpansion($event)}}},[(_vm.data.$subRows && _vm.data.$subRows.length && !_vm.data.$parentRow && !_vm.data.$pendingSubRows)?_c('i',{staticClass:"action-icon icon icon-small-arrow-down",class:{'expanded': _vm.data.$expanded}}):_vm._e(),(_vm.data.$pendingSubRows)?_c('div',{staticClass:"spinner-msg-local"},[_c('div',{staticClass:"icon-hourglass-local"})]):_vm._e()]):_vm._e(),((!col.cellTemplate && _vm.rowId !== 'headers') || (!col.headerCellTemplate && _vm.rowId === 'headers'))?_c('div',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],staticClass:"jf-table-cell-content",class:{'row-expander-content': $index === 0 && _vm.tableView.options.subRowsEnabled,
                        'sortable-aligned-center' : col.sortable && col.textAlign === 'center'},style:({'text-align': col.textAlign || 'auto'})},[_vm._v("\n            "+_vm._s(_vm.getField(col.field))+"\n            "),_c('i',{staticClass:"icon sorting-icon icon-small-arrow-down",class:{'rotate180': !_vm.tableView.options.revSort || (_vm.tableView.options.sortByField !== col.field && _vm.tableView.options.showSortingArrowsAlways),
                          active: _vm.tableView.options.sortByField === col.field,
                          'invisible' : !(_vm.rowId === 'headers' && _vm.tableView.options.sortable && (_vm.tableView.options.sortByField === col.field || _vm.tableView.options.showSortingArrowsAlways) && col.sortable && _vm.tableView.options.getRawData().length && (col.header || col.headerCellTemplate))}}),(_vm.rowId === 'headers' && col.allowGrouping)?_c('div',{staticClass:"group-button-wrapper"},[_c('div',{staticClass:"group-button icon-grouping-off",class:{'icon-grouping-on': _vm.tableView.options.groupedBy === col.field},on:{"click":function($event){_vm.tableView.options.groupBy(col.field); $event.stopPropagation();}}})]):_vm._e()]):_vm._e(),((col.cellTemplate && _vm.rowId !== 'headers') || (col.headerCellTemplate && _vm.rowId === 'headers'))?_c('div',{staticClass:"jf-table-cell-content",class:{'drag-mark': $index === 0 && _vm.rowId !== 'headers' && _vm.tableView.options.draggableRows},style:({'text-align': col.textAlign || 'auto'})},[_c('jf-table-compiled-cell',{key:_vm.rowId,attrs:{"field":col.field,"row-id":_vm.rowId,"table-row":_vm.jfTableRow}}),(_vm.rowId === 'headers' && _vm.tableView.options.sortable && (_vm.tableView.options.sortByField === col.field || _vm.tableView.options.showSortingArrowsAlways) && col.sortable && _vm.tableView.options.getRawData().length && (col.header || col.headerCellTemplate))?_c('i',{staticClass:"icon sorting-icon",class:{'icon-down-arrow': _vm.tableView.options.revSort && _vm.tableView.options.sortByField === col.field, 'icon-up-arrow': !_vm.tableView.options.revSort || (_vm.tableView.options.sortByField !== col.field && _vm.tableView.options.showSortingArrowsAlways), active: _vm.tableView.options.sortByField === col.field}}):_vm._e(),(_vm.rowId === 'headers' && col.allowGrouping)?_c('div',{staticClass:"group-button-wrapper"},[_c('div',{staticClass:"group-button icon-grouping-off",class:{'icon-grouping-on': _vm.tableView.options.groupedBy === col.field},on:{"click":function($event){_vm.tableView.options.groupBy(col.field); $event.stopPropagation();}}})]):_vm._e()],1):_vm._e()]):_vm._e()}),(_vm.rowId !== 'headers' && _vm.tableView.options.actions.length && !_vm.data.$groupHeader)?_c('div',{staticClass:"jf-table-cell actions",style:({height: _vm.rowId === 'headers' ? '' : _vm.tableView.options.rowHeight, width: _vm._getRowActionsWidth()})},[_c('div',{staticClass:"jf-table-cell-content"},[_vm._l((_vm.tableView.options.actions),function(action){return (_vm.tableView.options.actions.length <= 3 || _vm.tableView.options.isRowActionGroupingDisabled)?_c('div',{staticClass:"action-button",style:({height: _vm.tableView.options.rowHeight, width: _vm.tableView.options.actionButtonSize + 'px', visibility: !action.visibleWhen || action.visibleWhen(_vm.data) ? 'visible' : 'hidden'})},[_c('row-action',{attrs:{"action":action,"data":_vm.data,"on-action-click":_vm.fireAction}})],1):_vm._e()}),(_vm.tableView.options && !_vm.tableView.options.isRowActionGroupingDisabled && _vm.tableView.options.actions.length > 3 )?_c('div',{staticClass:"action-button",style:({height: _vm.tableView.options.rowHeight, width: _vm.tableView.options.actionButtonSize + 'px', visibility: _vm.tableView.options.hasVisibleActionsFor(_vm.data) ? 'visible' : 'hidden'})},[_c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.actionsTooltip),expression:"actionsTooltip",modifiers:{"bind":true}}],staticClass:"action-icon icon-more",on:{"click":function($event){return _vm.toggleActionsDropdown($event)}}})]):_vm._e()],2)]):_vm._e(),(_vm.rowId === 'headers' && _vm.tableView.options.columnsCustomization)?_c('div',{staticClass:"columns-customization-icon",on:{"click":function($event){return _vm.tableView.options.toggleColumnsCustomizationDropdown()}}},[_c('i',{staticClass:"icon-menu-arrow"})]):_vm._e(),(_vm.actionsDropdownOpen)?_c('div',{ref:"jfTableRowActionsDropdown",staticClass:"jf-table-row-actions-dropdown",class:_vm.outOfViewport},_vm._l((_vm.tableView.options.actions),function(action){return (!action.visibleWhen || action.visibleWhen(_vm.data))?_c('div',{staticClass:"action-item",attrs:{"icon-name":action.icon || ''},on:{"click":function($event){_vm.fireAction(action);$event.stopPropagation();_vm.actionsDropdownOpen=false;}}},[_c('i',{staticClass:"action-icon",class:action.icon}),(!action.href)?_c('span',[_vm._v(_vm._s(action.tooltip))]):_vm._e(),(action.href)?_c('a',{attrs:{"href":action.href(_vm.data),"download":_vm.data.name}},[_vm._v(_vm._s(action.tooltip))]):_vm._e()]):_vm._e()}),0):_vm._e()],2):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableRowComponent/index.vue?vue&type=template&id=560d89dc&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__("768b");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("3b8d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.ends-with.js
var es6_string_ends_with = __webpack_require__("aef6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/components-jqueryui/jquery-ui.js
var jquery_ui = __webpack_require__("b1f8");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableRowComponent/components/RowAction/index.vue?vue&type=template&id=16c7be22&scoped=true&
var RowActionvue_type_template_id_16c7be22_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.action.href)?_c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.action.tooltip),expression:"action.tooltip",modifiers:{"bind":true}}],staticClass:"action-icon",class:_vm.action.icon,on:{"click":function($event){return _vm.actionHandler(_vm.action,$event)}}}):_vm._e(),(_vm.action.href)?_c('a',{attrs:{"href":_vm.action.href(_vm.data)},on:{"click":function($event){return _vm.actionHandler(_vm.action,$event)}}},[_c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.action.tooltip),expression:"action.tooltip",modifiers:{"bind":true}}],staticClass:"action-icon",class:_vm.action.icon})]):_vm._e()])}
var RowActionvue_type_template_id_16c7be22_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableRowComponent/components/RowAction/index.vue?vue&type=template&id=16c7be22&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableRowComponent/components/RowAction/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var RowActionvue_type_script_lang_js_ = ({
  name: 'RowAction',
  props: ['onActionClick', 'action', 'data'],
  methods: {
    actionHandler: function actionHandler(action, $event) {
      $event.stopPropagation();
      this.onActionClick(action);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableRowComponent/components/RowAction/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RowActionvue_type_script_lang_js_ = (RowActionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTableRowComponent/components/RowAction/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_RowActionvue_type_script_lang_js_,
  RowActionvue_type_template_id_16c7be22_scoped_true_render,
  RowActionvue_type_template_id_16c7be22_scoped_true_staticRenderFns,
  false,
  null,
  "16c7be22",
  null
  
)

/* harmony default export */ var RowAction = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableRowComponent/index.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var JfTableRowComponentvue_type_script_lang_js_ = ({
  components: {
    RowAction: RowAction
  },
  name: 'jf-table-row',
  props: ['data', 'rowId', 'tableView'],
  'jf@inject': ['$scope', '$element', '$timeout', 'JFrogEventBus'],
  data: function data() {
    return {
      hoveringResize: null,
      actionsDropdownOpen: null,
      outOfViewport: {}
    };
  },
  computed: {
    actionsTooltip: function actionsTooltip() {
      return this.actionsDropdownOpen ? '' : 'Actions';
    }
  },
  created: function created() {
    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
  },
  mounted: function mounted() {
    var _this = this;

    $(this.$el).prop('comp', this);
    this.templatesCount = _.filter(this.tableView.options.columns, function (col) {
      return !!col.cellTemplate;
    }).length;
    this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, function (tableView) {
      if (tableView === _this.tableView) _this.actionsDropdownOpen = false;
    });
    if (this.tableView.options.draggableRows) this.$timeout(function () {
      return _this.initDragAndDrop();
    });
    $(this.$element).prop('ctrl', this);
  },
  ng1_legacy: {
    'controllerAs': 'jfTableRow'
  },
  methods: {
    getField: function getField(field) {
      return _.get(this.data, field);
    },
    kebab: function kebab(str) {
      return _.kebabCase(str);
    },
    toggleSelection: function toggleSelection(all) {
      if (this.tableView.options.isRowSelectable && !this.tableView.options.isRowSelectable({
        entity: this.data
      })) return;

      if (!all) {
        if (this.tableView.options.selectionMode === this.tableView.options.MULTI_SELECTION) {
          this.$set(this.data, '$selected', !this.data.$selected);

          if (!this.data.$selected) {
            this.$set(this.tableView, 'allSelected', false);

            if (this.tableView.options.groupedBy) {
              var groupHeader = _.find(this.tableView.options.getPrePagedData(), {
                $groupHeader: {
                  value: _.get(this.data, this.tableView.options.groupedBy)
                }
              });

              if (groupHeader) groupHeader.$selected = false;
            }
          }

          if (this.data.$groupHeader) this.tableView.groupSelection(this.data);
        } else if (this.tableView.options.selectionMode === this.tableView.options.SINGLE_SELECTION) {
          this.tableView.clearSelection();
          this.$set(this.data, '$selected', true);
        }
      } else {
        this.tableView.toggleSelectAll();
      }

      this.tableView.options.fire('selection.change', this.tableView.options.getSelectedRows());
    },
    toggleGroupExpansion: function toggleGroupExpansion() {
      this.$set(this.data.$groupHeader, '$expanded', !this.data.$groupHeader.$expanded);
      this.tableView.options.updateGroupExpansionState(this.data);
      this.$forceUpdate();
    },
    fireAction: function fireAction(action) {
      if (action.callback) action.callback(this.data);
      this.tableView.onUpdateFilter(false);
    },
    onMouseMove: function onMouseMove(e) {
      if (!this.resizingColumns) {
        if (this.hoveringResize && this.hoveringResize.left) this.$delete(this.hoveringResize.left, '$dragRightBorder');
        if (this.hoveringResize && this.hoveringResize.right) this.$delete(this.hoveringResize.right, '$dragLeftBorder');
        this.hoveringResize = this._getHoveringResizePoint(e);
      } else {
        this.dragColumnResize(e);
      }
    },
    dragColumnResize: function dragColumnResize(e) {
      var MIN_WIDTH = 5; //percent

      var container = this._getTableContainer();

      var containerWidth = container.innerWidth();
      var mouseX = e.pageX - container.offset().left;
      var mouseXPerc = Math.round(mouseX / containerWidth * 100);
      var offset = mouseXPerc - this.resizeDragStart;
      var newLeftWidth, newRightWidth;

      if (_.isString(this.hoveringResize.origLeftWidth) && this.hoveringResize.origLeftWidth.endsWith('%')) {
        newLeftWidth = parseFloat(this.hoveringResize.origLeftWidth) + offset + '%';
      } else if (_.isString(this.hoveringResize.origLeftWidth) && this.hoveringResize.origLeftWidth.endsWith('px')) {
        var perc = parseFloat(this.hoveringResize.origLeftWidth) / containerWidth * 100;
        newLeftWidth = perc + offset + '%';
      }

      if (this.hoveringResize.right) {
        if (_.isString(this.hoveringResize.origRightWidth) && this.hoveringResize.origRightWidth.endsWith('%')) {
          newRightWidth = parseFloat(this.hoveringResize.origRightWidth) - offset + '%';
        } else if (_.isString(this.hoveringResize.origRightWidth) && this.hoveringResize.origRightWidth.endsWith('px')) {
          var _perc = parseFloat(this.hoveringResize.origRightWidth) / containerWidth * 100;

          newRightWidth = _perc - offset + '%';
        }
      }

      if (parseFloat(newLeftWidth) > MIN_WIDTH && (!newRightWidth || parseFloat(newRightWidth) > MIN_WIDTH)) {
        this.$set(this.hoveringResize.left, 'width', this.$set(this.hoveringResize.left, 'origWidth', newLeftWidth));
        if (this.hoveringResize.right) this.$set(this.hoveringResize.right, 'width', this.$set(this.hoveringResize.right, 'origWidth', newRightWidth));
      }
    },
    onMouseDown: function onMouseDown(e) {
      if (this.hoveringResize) {
        var container = this._getTableContainer();

        var containerWidth = container.innerWidth();
        var mouseX = e.pageX - container.offset().left;
        var mouseXPerc = Math.round(mouseX / containerWidth * 100);
        this.resizingColumns = true;
        this.resizeDragStart = mouseXPerc;
        this.$set(this.hoveringResize.left, '$dragRightBorder', true);
        if (this.hoveringResize.right) this.$set(this.hoveringResize.right, '$dragLeftBorder', true);
      }
    },
    onMouseUp: function onMouseUp(e) {
      if (this.hoveringResize && this.hoveringResize.left) this.$delete(this.hoveringResize.left, '$dragRightBorder');
      if (this.hoveringResize && this.hoveringResize.right) this.$delete(this.hoveringResize.right, '$dragLeftBorder');
      this.resizingColumns = false;
      delete this.resizeDragStart;
    },
    _getHoveringResizePoint: function _getHoveringResizePoint(e) {
      var columns = this.tableView.options.columns;

      var container = this._getTableContainer();

      var containerWidth = container.innerWidth();
      var mouseX = e.pageX - container.offset().left;
      var mouseXPerc = Math.round(mouseX / containerWidth * 100);
      var percCount = this.tableView.options.hasSelection() ? this.tableView.options.selectionColumnWidth / containerWidth * 100 : 0;
      var hovering = false;

      for (var colI = 0; colI < columns.length; colI++) {
        var col = columns[colI];

        if (_.isString(col.width) && col.width.endsWith('%')) {
          percCount += parseFloat(col.width);
        } else if (_.isString(col.width) && col.width.endsWith('px')) {
          var perc = parseFloat(col.width) / containerWidth * 100;
          percCount += perc;
        }

        if (Math.abs(percCount - mouseXPerc) <= 0.5) {
          hovering = {
            left: col,
            right: columns[colI + 1],
            origLeftWidth: col.width,
            origRightWidth: columns[colI + 1] ? columns[colI + 1].width : undefined
          };
          break;
        }
      }

      return hovering;
    },
    _getTableContainer: function _getTableContainer() {
      return $(this.tableView.$element).find('.jf-table-view-container');
    },
    onClickCell: function onClickCell(col, event) {
      //        event.stopPropagation();
      if (this.rowId === 'headers' && col.header && this.tableView.options.sortable && !this.hoveringResize && col.sortable) {
        this.tableView.options.sortBy(col.field);
        this.$forceUpdate();
      }
    },
    onRowClick: function onRowClick($event) {
      if (this.data.$groupHeader) {
        this.toggleGroupExpansion();
      } else {
        if (this.rowId !== 'headers') this.tableView.options.fire('row.clicked', {
          entity: this.data,
          event: $event
        });
      }
    },
    toggleExpansion: function toggleExpansion($event) {
      $event.stopPropagation();
      this.tableView.options.toggleExpansion(this.data);
    },
    toggleActionsDropdown: function () {
      var _toggleActionsDropdown = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var origState;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.stopPropagation();
                origState = this.actionsDropdownOpen;
                this.JFrogEventBus.dispatch(this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, this.tableView);
                this.actionsDropdownOpen = !origState;
                _context.next = 6;
                return this.$nextTick();

              case 6:
                _context.next = 8;
                return this.applyOutOfViewport(e.pageY);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function toggleActionsDropdown(_x) {
        return _toggleActionsDropdown.apply(this, arguments);
      }

      return toggleActionsDropdown;
    }(),
    applyOutOfViewport: function () {
      var _applyOutOfViewport = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(clickHeight) {
        var el, dropdownRect, _document$getElements, _document$getElements2, tableRowsContainer, tableRowsRect, isOutOfViewPort, isOutOfTableRowsContainer;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                el = this.$refs.jfTableRowActionsDropdown;

                if (el) {
                  _context2.next = 5;
                  break;
                }

                this.outOfViewport = {};
                return _context2.abrupt("return");

              case 5:
                dropdownRect = el.getBoundingClientRect();
                _document$getElements = document.getElementsByClassName('table-rows-container'), _document$getElements2 = Object(slicedToArray["a" /* default */])(_document$getElements, 1), tableRowsContainer = _document$getElements2[0];
                tableRowsRect = tableRowsContainer.getBoundingClientRect();
                isOutOfViewPort = dropdownRect.bottom > (window.innerHeight || document.documentElement.clientHeight);
                isOutOfTableRowsContainer = tableRowsRect.bottom - clickHeight < dropdownRect.height;
                _context2.next = 12;
                return this.$nextTick();

              case 12:
                this.outOfViewport = isOutOfViewPort || isOutOfTableRowsContainer ? {
                  'out-of-viewport': true
                } : {};
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);
                this.outOfViewport = {};

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 15]]);
      }));

      function applyOutOfViewport(_x2) {
        return _applyOutOfViewport.apply(this, arguments);
      }

      return applyOutOfViewport;
    }(),
    initDragAndDrop: function initDragAndDrop() {
      var _this2 = this;

      if (this.rowId === 'headers') return;
      window.$(this.$element).draggable({
        helper: 'clone',
        scroll: true,
        distance: 10,
        appendTo: $(this.tableView.$element).find('.jf-table-view-container'),
        start: function start(event, ui) {
          return _this2.dragStart(event, ui);
        },
        stop: function stop(event, ui) {
          return _this2.dragStop(event, ui);
        },
        drag: function drag(event, ui) {
          return _this2.dragMove(event, ui);
        }
      });
      $(this.$element).addClass('drag-enabled');
    },
    dragStart: function dragStart(event, ui) {
      if (this.tableView.options.registeredTabularDnd && this.tableView.options.registeredTabularDnd.dndCtrl.disabled) {
        event.preventDefault();
        return;
      }

      if (!this.isRowDraggable()) {
        event.preventDefault();
        return;
      }

      $('body').addClass('grabbing');
      this.tableView.options.dragRow(this.data);
      this.initDragHelper(ui.helper);
    },
    isRowDraggable: function isRowDraggable() {
      if (this.tableView.options.registeredTabularDnd && this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr && !_.isUndefined(this.data[this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr]) && !this.data[this.tableView.options.registeredTabularDnd.dndCtrl.itemDraggableAttr]) {
        return false;
      } else return true;
    },
    initDragHelper: function initDragHelper(helper) {
      helper.addClass('row-drag-helper');

      if (this.tableView.options.registeredTabularDnd) {
        var numOfDraggedRows = this.tableView.options.draggedRows ? this.tableView.options.draggedRows.length : 1;

        if (numOfDraggedRows > 1) {
          helper.addClass('multiple').html("<span>\u2261</span>" + numOfDraggedRows + ' ' + this.tableView.getObjectNameByCount(numOfDraggedRows, this.tableView.options.registeredTabularDnd.dndCtrl.entityName || 'Item'));
        }
      }
    },
    dragStop: function dragStop(event, ui) {
      var _this3 = this;

      var draggedRowsArrayForDndEvent = this.tableView.options.draggedRow ? [this.tableView.options.draggedRow] : _.map(this.tableView.options.draggedRows, 'row');
      var target = $(event.originalEvent.target);
      target = target.is('.jf-table-row') ? target[0] : target.parents('.jf-table-row')[0];
      $('body').removeClass('grabbing');

      var handleForeignDrop = function handleForeignDrop(targetRow) {
        _this3.tableView.options.registeredTabularDnd.dndOther.dropDraggedRow(targetRow, _this3.tableView.options.draggedRow || _this3.tableView.options.draggedRows, true);

        _this3.tableView.options.markDropTarget(null);

        _this3.tableView.options.registeredTabularDnd.dndCtrl.onDragTransfer(draggedRowsArrayForDndEvent, _this3.tableView.options);

        delete _this3.tableView.options.draggedRow;
        delete _this3.tableView.options.draggedRows;
      };

      if (target) {
        if (this.isForeignDrop(target)) {
          handleForeignDrop($(target).prop('ctrl').data);
        } else {
          this.tableView.options.dropDraggedRow($(target).prop('ctrl').data);
        }
      } else {
        if (this.tableView.options.registeredTabularDnd) {
          if ($(event.originalEvent.target).is('.empty-table-placeholder') && $(event.originalEvent.target).parents('.jf-table-view')[0] !== $(this.tableView.$element).find('.jf-table-view')[0]) {
            handleForeignDrop(null);
          } else {
            var container = $(event.originalEvent.target).is('.tabular-dnd-table-container') ? $(event.originalEvent.target) : $(event.originalEvent.target).parents('.tabular-dnd-table-container');
            var myRole = this.tableView.options.registeredTabularDnd.dndRole;

            if (container && (container.is('.available-table') && myRole === 'selected' || container.is('.selected-table') && myRole === 'available')) {
              handleForeignDrop(null);
            } else {
              this.tableView.options.dropDraggedRow();
            }
          }
        } else {
          this.tableView.options.dropDraggedRow();
        }
      }
    },
    handleScrollOnDrag: function handleScrollOnDrag(target, event) {
      if (this.tableView.options.paginationMode === this.tableView.options.VIRTUAL_SCROLL) {
        var tableView;

        if (this.tableView.options.registeredTabularDnd && target) {
          var rowCtrl = $(target).prop('ctrl');
          tableView = rowCtrl.tableView;
        } else if (!this.tableView.options.registeredTabularDnd) {
          tableView = this.tableView;
        }

        if (!tableView) return;
        var container = $(tableView.$element).find('.table-rows-container');
        var containerY = container[0].getClientRects()[0].y;
        var relativeY = event.clientY - containerY;
        var containerHeight = container.height();
        var vsApi = tableView.vsApi;

        if (relativeY < 50) {
          vsApi.scroll(-0.1 * (50 - relativeY));
        } else if (relativeY > containerHeight - 50) {
          vsApi.scroll(0.1 * (50 - (containerHeight - relativeY)));
        }
      }
    },
    dragMove: function dragMove(event, ui) {
      var target = $(event.originalEvent.target);
      target = target.is('.jf-table-row') ? target[0] : target.parents('.jf-table-row')[0];
      this.handleScrollOnDrag(target, event);
      if (!target && $(event.originalEvent.target).is('.empty-table-placeholder')) target = event.originalEvent.target;

      if (target) {
        this.tableView.options.markDropTarget($(target));
      } else {
        this.tableView.options.markDropTarget(null);
      }
    },
    isForeignDrop: function isForeignDrop(dropTarget) {
      if (!this.tableView.options.registeredTabularDnd) return false;else {
        var targetTableView = $(dropTarget).prop('ctrl') ? $(dropTarget).prop('ctrl').tableView : null;
        if (targetTableView && targetTableView.options === this.tableView.options.registeredTabularDnd.dndOther) return true;else return false;
      }
    },
    _getRowActionsWidth: function _getRowActionsWidth() {
      return this.tableView.options.getActionsContainerWidthInPixels() + 'px';
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableRowComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableRowComponentvue_type_script_lang_js_ = (JfTableRowComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/JfTableRowComponent/index.vue





/* normalize component */

var JfTableRowComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfTableRowComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "560d89dc",
  null
  
)

/* harmony default export */ var JfTableRowComponent = __webpack_exports__["default"] = (JfTableRowComponent_component.exports);

/***/ }),

/***/ "9499":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfVscrollComponent/index.vue?vue&type=template&id=6f44c5af&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"v-scroll-container"},[_c('div',{staticClass:"v-scroll-inner-container",style:({transform: 'translate(0, ' + (-_vm.getTranslate()) + 'px)', height: _vm.containerHeight + 'px', opacity: _vm.ready ? 1 : 0})},[_c('div',{staticClass:"scroll-faker-container",style:({transform: 'translate(0, ' + (_vm.getTranslate()) + 'px)', right: 0, height: _vm.getPageHeight() + 'px'})},[_c('div',{directives:[{name:"init",rawName:"v-init",value:(_vm.initScrollFaker()),expression:"initScrollFaker()"}],staticClass:"scroll-faker",style:({height: (_vm.getTotalScrollHeight() > _vm.maxFakeScrollHeight ? _vm.maxFakeScrollHeight : _vm.getTotalScrollHeight()) + 'px'})})]),_c('div',{staticClass:"h-scroll-wrapper",style:({height: (_vm.getPageHeight() + _vm.getTranslate()) + 'px'}),on:{"wheel":_vm.onMouseWheel}},[_c('div',{staticClass:"h-scroll-content"},_vm._l((_vm.getPage()),function(item,$index){return _c('jf-vscroll-element',{key:$index,attrs:{"vscroll":_vm.jfVScroll,"data":item,"index":$index,"template":_vm.childComponent,"variable":_vm.withEach,"last":$index === _vm.getPage().length - 1}})}),1)])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfVscrollComponent/index.vue?vue&type=template&id=6f44c5af&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./src/services/VueFactory.js
var VueFactory = __webpack_require__("e1f3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfVscrollComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfVscrollComponentvue_type_script_lang_js_ = ({
  name: 'jf-vscroll',
  props: ['withEach', 'api', 'in', 'preventDefaultScroll'],
  'jf@inject': ['$scope', '$timeout', '$compileComp', '$element', '$q'],
  data: function data() {
    return {
      ready: false,
      maxFakeScrollHeight: 1000000,
      transcludedContent: null,
      containerHeight: 0,
      scrollTimeout: undefined,
      virtualScrollIndex: 0,
      virtScrollDisplacement: 0,
      settingScroll: false,
      itemHeight: undefined,
      itemsPerPage: 1,
      childComponent: null
    };
  },
  watch: {
    in: function _in() {
      this.refresh();
    }
  },
  created: function created() {
    var _this = this;

    var whenReadyDefer = this.$q.defer();
    this.whenReady = whenReadyDefer.promise;
    this.$scope.$watch('jfVScroll.ready', function () {
      if (_this.ready) {
        _this.refresh();

        whenReadyDefer.resolve();
      }
    });
  },
  mounted: function mounted() {
    this.childComponent = this.$compileComp(this.transcludedContent, this.$parent.$data, this.$parent);
    this.childComponent.props = [this.withEach, 'v_index', 'is_last'];
    this.containerHeight = $(this.$element).parent().height() + 1;

    this._setAutoItemsPerPage();

    this._initApi();
  },
  ng1_legacy: {
    ng1compileFn: function ng1compileFn(element, attrs, transcludeFn) {
      return {
        post: function post(scope, element, attrs, directiveCtrl) {
          transcludeFn(function (clone) {
            var html = '';

            for (var i = 0; i < clone.length; i++) {
              html += clone[i].outerHTML || '';
            }

            html = html.replace('v-pre', '');
            directiveCtrl.transcludedContent = html;
          });
        }
      };
    },
    'controllerAs': 'jfVScroll'
  },
  computed: {
    /*
                containerHeight() {
                    return $(this.$element).parent().height();
                }
    */
  },
  methods: {
    setItemHeight: function setItemHeight(itemHeight) {
      if (this.itemHeight !== undefined && this.itemHeight !== itemHeight && !this.inequalHeightsWarned) {
        this.inequalHeightsWarned = true;
        console.error('Virtual scroll will not work correctly if items are not all the same height');
      }

      if (this.itemHeight === undefined) {
        this.itemHeight = itemHeight;

        this._setAutoItemsPerPage();

        this.ready = true;
        if (this.api.onInit) this.api.onInit();
      }
    },
    _setAutoItemsPerPage: function _setAutoItemsPerPage() {
      if (!this.itemHeight) return;
      this.itemsPerPage = Math.floor(this.containerHeight / this.itemHeight);
    },
    getItemsPerPage: function getItemsPerPage() {
      return this.itemsPerPage;
    },
    initScrollFaker: function initScrollFaker() {
      var _this2 = this;

      var scrollParent = $(this.$element).find('.scroll-faker-container');
      scrollParent.on('scroll', function (e) {
        if (_this2.settingScroll) {
          _this2.settingScroll = false;
          return;
        }

        if (_this2.autoScrolling) {
          return;
        }

        if (_this2.scrollTimeout) {
          _this2.$timeout.cancel(_this2.scrollTimeout);

          delete _this2.scrollTimeout;
        }

        var len = _this2.in.length;

        if (len) {
          var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
          var relativePosition = scrollParent.scrollTop() / maxScrollTop;

          if (_.isNaN(relativePosition)) {
            relativePosition = 1;
          }

          var newScrollIndex = relativePosition * (len - _this2.itemsPerPage);
          if (newScrollIndex < 0) newScrollIndex = 0;
          _this2.virtualScrollIndex = Math.floor(newScrollIndex);
          _this2.virtScrollDisplacement = newScrollIndex - _this2.virtualScrollIndex;

          if (_this2.virtualScrollIndex + _this2.itemsPerPage >= _this2.in.length - 2) {
            if (_this2.bottomReachedListener) {
              _this2.bottomReachedListener();
            }
          }
        } else {
          _this2.virtualScrollIndex = 0;
          _this2.virtScrollDisplacement = 0;
        }
      });
    },
    syncFakeScroller: function syncFakeScroller() {
      var _this3 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var len = this.in.length;
      var scrollParent = $(this.$element).find('.scroll-faker-container');
      var relativePosition = this._getCurrentScrollPos() / (len - this.itemsPerPage);

      var sync = function sync() {
        var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
        var scrollTop = Math.floor(maxScrollTop * relativePosition);
        _this3.settingScroll = true;
        scrollParent.scrollTop(scrollTop);
      };

      if (delay) this.$timeout(sync);else sync();
    },
    getPage: function getPage() {
      var vScrollIndex = this.virtualScrollIndex;
      var additionals = vScrollIndex + this.itemsPerPage + 2 <= this.in.length ? 2 : vScrollIndex + this.itemsPerPage + 1 <= this.in.length ? 1 : 0;
      return this.in.slice(vScrollIndex, vScrollIndex + this.itemsPerPage + additionals);
    },
    getTranslate: function getTranslate() {
      var displacement = this.virtScrollDisplacement;

      if (!displacement) {
        return 0;
      } else {
        var pixels = displacement * this.itemHeight;
        return pixels;
      }
    },
    getPageHeight: function getPageHeight() {
      if (this.containerHeight) {
        return this.containerHeight;
      } else {
        var len = this.in.length;
        if (len < this.itemsPerPage) return len * this.itemHeight;else return this.itemsPerPage * this.itemHeight;
      }
    },
    getTotalScrollHeight: function getTotalScrollHeight() {
      return this.in.length * this.itemHeight;
    },
    onMouseWheel: function onMouseWheel($event) {
      if (this.scrollTimeout) {
        this.$timeout.cancel(this.scrollTimeout);
        this.scrollTimeout = undefined;
      }

      var normalDelta = this._normalizeWheelEvent($event).pixelY;

      var xDelta = this._normalizeWheelEvent($event).pixelX;

      if (Math.abs(normalDelta) < Math.abs(xDelta)) {
        $event.stopPropagation();
        return;
      }

      var scrollAmount = 0.02 * Math.abs(normalDelta);

      var scrollPosBefore = this._getCurrentScrollPos();

      if ($event.deltaY > 0) {
        // scrollUp
        this._scrollTo(scrollPosBefore + scrollAmount);
      } else if ($event.deltaY < 0) {
        // scrollDown
        this._scrollTo(scrollPosBefore - scrollAmount);
      }

      if (scrollPosBefore !== this._getCurrentScrollPos() || this.preventDefaultScroll) {
        $event.preventDefault(); //        this.syncFakeScroller(false);
      }
    },
    _getCurrentScrollPos: function _getCurrentScrollPos() {
      return this.virtualScrollIndex + this.virtScrollDisplacement;
    },
    scrollTo: function scrollTo(scrollPos) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

      var dist = scrollPos - this._getCurrentScrollPos();

      this.scroll(dist, duration);
    },
    _scrollTo: function _scrollTo(scrollPos) {
      var dist = scrollPos - this._getCurrentScrollPos();

      this._scroll(dist);
    },
    scroll: function scroll(numOfRows) {
      var _this4 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

      if (duration === 0) {
        this._scroll(numOfRows);

        return;
      }

      if (this.scrollTimeout) {
        this.$timeout.cancel(this.scrollTimeout);
        this.scrollTimeout = undefined;
      }

      var quadraticEase = function quadraticEase(k) {
        return k * (2 - k);
      };

      var interval = 40;

      var currentScrollPos = this._getCurrentScrollPos();

      var steps = Math.ceil(duration / interval);
      var currentStep = 1;

      var cycle = function cycle() {
        var progress = currentStep / steps;

        _this4._scrollTo(currentScrollPos + quadraticEase(progress) * numOfRows);

        currentStep++;

        if (currentStep <= steps) {
          _this4.scrollTimeout = _this4.$timeout(function () {
            return cycle();
          }, interval);
        } else {
          _this4.scrollTimeout = undefined;
          _this4.autoScrolling = false;
        }
      };

      this.autoScrolling = true;
      cycle();
    },
    _scroll: function _scroll(numOfRows) {
      if (!numOfRows) return;
      var abs = Math.abs(numOfRows);
      var sign = numOfRows / abs;
      var full = Math.floor(abs);
      this.virtualScrollIndex += sign * full;
      this.virtScrollDisplacement += sign * (abs - full);

      if (this.virtScrollDisplacement >= 1) {
        this.virtualScrollIndex += 1;
        this.virtScrollDisplacement -= 1;
      }

      if (this.virtScrollDisplacement < 0) {
        this.virtualScrollIndex -= 1;
        this.virtScrollDisplacement = 1 - Math.abs(this.virtScrollDisplacement);
      }

      if (this.virtualScrollIndex < 0) {
        this.virtualScrollIndex = 0;
        this.virtScrollDisplacement = 0;
      }

      if (this.virtualScrollIndex + this.itemsPerPage >= this.in.length) {
        this.virtualScrollIndex = this.in.length - this.itemsPerPage;
        this.virtScrollDisplacement = 0;

        if (this.bottomReachedListener) {
          this.bottomReachedListener();
        }
      }

      if (this.virtualScrollIndex + this.itemsPerPage >= this.in.length - 2) {
        if (this.bottomReachedListener) {
          this.bottomReachedListener();
        }
      }

      if (this.virtualScrollIndex < 0) this.virtualScrollIndex = 0;
      this.syncFakeScroller(false);
    },
    _normalizeWheelEvent: function _normalizeWheelEvent(event) {
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;
      var sX = 0,
          sY = 0,
          pX = 0,
          pY = 0;

      if ('detail' in event) {
        sY = event.detail;
      }

      if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
      }

      if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in event) {
        pY = event.deltaY;
      }

      if ('deltaX' in event) {
        pX = event.deltaX;
      }

      if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode == 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    },
    resetScroll: function resetScroll() {
      this.virtualScrollIndex = 0;
      this.virtScrollDisplacement = 0;
      this.syncFakeScroller(false);
    },
    centerOnItem: function centerOnItem(item) {
      var _this5 = this;

      if (!this.ready) {
        this.whenReady.then(function () {
          _this5.centerOnItem(item);
        });
        return;
      }

      var prePaged = this.in;
      var index = prePaged.indexOf(item);
      var halfPage = Math.floor(this.itemsPerPage / 2);

      if (prePaged.length <= this.itemsPerPage || index - halfPage < 0) {
        this.virtualScrollIndex = 0;
      } else if (index + (this.itemsPerPage - halfPage) > prePaged.length) {
        this.virtualScrollIndex = prePaged.length - this.itemsPerPage;
      } else {
        this.virtualScrollIndex = index - halfPage;
      }

      this.syncFakeScroller(false);
    },
    bringItemToView: function bringItemToView(item) {
      var jump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var prePaged = this.in;
      var index = prePaged.indexOf(item);

      if (index - 1 < this.virtualScrollIndex) {
        this.scrollTo(index, jump ? 0 : undefined);
      } else if (index + 1 > this.virtualScrollIndex + this.itemsPerPage) {
        var fullItems = this.containerHeight ? Math.floor(this.containerHeight / this.itemHeight) : this.itemsPerPage;
        var scrollIndex = index - fullItems >= 0 ? index - fullItems : 0;
        var displace = this.containerHeight ? 1 - (this.containerHeight / this.itemHeight - fullItems) : 1;
        var hScrollFactor = 0;

        if (this._hasHorizontalScrollbar()) {
          var pixelFactor = this._getHorizontalScrollbarHeight();

          hScrollFactor = pixelFactor / this.itemHeight;
        }

        this.scrollTo(scrollIndex + displace + hScrollFactor, jump ? 0 : undefined);
      }

      this.syncFakeScroller(false);
    },
    _hasHorizontalScrollbar: function _hasHorizontalScrollbar() {
      var hScrollWrapper = $(this.$element).find('.h-scroll-wrapper');
      return hScrollWrapper[0].scrollWidth > hScrollWrapper.width();
    },
    _getHorizontalScrollbarHeight: function _getHorizontalScrollbarHeight() {
      var hScrollWrapper = $(this.$element).find('.h-scroll-wrapper');
      return hScrollWrapper.height() - hScrollWrapper[0].clientHeight;
    },
    _freezeVScroll: function _freezeVScroll() {
      this.$freezedVScrollIndex = this.virtualScrollIndex;
      this.$freezedVScrollDisplacement = this.virtScrollDisplacement;
    },
    _unFreezeVScroll: function _unFreezeVScroll() {
      delete this.$freezedVScrollIndex;
      delete this.$freezedVScrollDisplacement;
    },
    registerScrollListener: function registerScrollListener(listener) {
      var _this6 = this;

      if (!this.scrollListener) {
        this.scrollListener = listener;
        this.$scope.$watch(function () {
          return _this6.virtualScrollIndex + _this6.virtScrollDisplacement;
        }, function () {
          _this6.scrollListener(_this6._getCurrentScrollPos());
        });
      }
    },
    registerBottomReachedListener: function registerBottomReachedListener(listener) {
      this.bottomReachedListener = listener;
    },
    refresh: function refresh() {
      var _this7 = this;

      var _VueFactory$getInstan = VueFactory["a" /* VueFactory */].getInstance(),
          Vue = _VueFactory$getInstan.Vue;

      Vue.nextTick(function () {
        _this7.containerHeight = $(_this7.$element).parent().height() + 1;

        _this7._setAutoItemsPerPage();
      });
    },
    _initApi: function _initApi() {
      var _this8 = this;

      if (this.api) {
        this.api.getPageData = function () {
          return _this8.getPage();
        };

        this.api.reset = function (item) {
          return _this8.resetScroll();
        };

        this.api.refresh = function () {
          return _this8.refresh();
        };

        this.api.centerOnItem = function (item) {
          return _this8.centerOnItem(item);
        };

        this.api.bringItemToView = function (item) {
          var jump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          return _this8.bringItemToView(item, jump);
        };

        this.api.freezeScroll = function () {
          return _this8._freezeVScroll();
        };

        this.api.unFreezeScroll = function () {
          return _this8._unFreezeVScroll();
        };

        this.api.sync = function () {
          return _this8.syncFakeScroller(false);
        };

        this.api.scroll = function (numOfRows) {
          var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
          return _this8.scroll(numOfRows, duration);
        };

        this.api.scrollTo = function (scrollPos) {
          var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
          return _this8.scrollTo(scrollPos, duration);
        };

        this.api.registerScrollListener = function (listener) {
          return _this8.registerScrollListener(listener);
        };

        this.api.registerBottomReachedListener = function (listener) {
          return _this8.registerBottomReachedListener(listener);
        };

        this.api.getItemsPerPage = function () {
          return _this8.getItemsPerPage();
        };

        this.api.whenReady = function () {
          return _this8.whenReady;
        };
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfVscrollComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfVscrollComponentvue_type_script_lang_js_ = (JfVscrollComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfVscrollComponent/index.vue?vue&type=style&index=0&id=6f44c5af&scoped=true&lang=less&
var JfVscrollComponentvue_type_style_index_0_id_6f44c5af_scoped_true_lang_less_ = __webpack_require__("fcb9");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfVscrollComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfVscrollComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6f44c5af",
  null
  
)

/* harmony default export */ var JfVscrollComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "a83f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c2fb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewBatchActionsComponent/index.vue?vue&type=template&id=13b7a2b8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"grid-batch-actions text-right"},_vm._l((_vm.actions),function(action,$index){
var _obj;
return _c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(function () { return _vm.isDisabled(action) && action.getDisabledTooltip ? action.getDisabledTooltip() : ''; }),expression:"() => isDisabled(action) && action.getDisabledTooltip ? action.getDisabledTooltip() : ''",modifiers:{"bind":true}}],staticClass:"grid-batch-action-wrapper",class:{'more-actions': action === _vm.MORE_ACTIONS},style:({visibility: action === _vm.MORE_ACTIONS || (_vm.visibleActions && _vm.visibleActions.indexOf(action) !== -1) ? 'inherit' : 'hidden', opacity: action === _vm.MORE_ACTIONS || (_vm.visibleActions && _vm.visibleActions.indexOf(action) !== -1) ? 1 : 0}),attrs:{"data-action-id":action.name}},[(action !== _vm.MORE_ACTIONS && (!action.visibleWhen || action.visibleWhen()))?_c('a',{class:( _obj = {disabled: _vm.isDisabled(action)}, _obj['btn batch-action-' + action.icon] = true, _obj ),on:{"click":function($event){$event.preventDefault();return _vm.perform(action)}}},[(action.img)?_c('img',{attrs:{"src":'images/' + action.icon + '.png'}}):_vm._e(),(!action.img)?_c('i',{class:'icon icon-' + action.icon}):_vm._e(),_vm._v(" "+_vm._s(action.name)+"\n            ")]):_vm._e(),(action === _vm.MORE_ACTIONS)?_c('div',{staticClass:"more-wrapper"},[_c('jf-actions',{attrs:{"parent-controller":_vm.jfTableViewBatchActions,"label":"More Actions","init-method":"initActions","show-drop-down-for-one-item":true}})],1):_vm._e()])}),0)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableViewBatchActionsComponent/index.vue?vue&type=template&id=13b7a2b8&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewBatchActionsComponent/index.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTableViewBatchActionsComponentvue_type_script_lang_js_ = ({
  name: 'jf-table-view-batch-actions',
  props: ['actions', 'tableOptions'],
  'jf@inject': ['$element', '$scope', '$timeout'],
  data: function data() {
    return {
      MORE_ACTIONS: {
        '@@MORE_ACTIONS@@': '@@MORE_ACTIONS@@'
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$scope.$watch('jfTableViewBatchActions.tableOptions', function () {
      if (!_this.tableOptions) return;

      _this.tableOptions.on('selection.change', function () {
        _this.$timeout(function () {
          return _this.updateMoreActions();
        });
      });
    });
    this.$scope.$on('ui-layout.resize', function () {
      _this.$timeout(function () {
        return _this.calcActionsVisibility();
      });
    });
    $(window).on('resize', function () {
      _this.$timeout(function () {
        return _this.calcActionsVisibility();
      });
    });
    this.$scope.$watch('jfTableViewBatchActions.actions', function () {
      return _this.$timeout(function () {
        return _this.calcActionsVisibility();
      });
    });
    this.$timeout(function () {
      _this.calcActionsVisibility();

      _this.$forceUpdate();
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfTableViewBatchActions'
  },
  methods: {
    perform: function perform(action) {
      if (this.anySelected() && (!action.disabledWhen || !action.disabledWhen())) {
        action.callback && action.callback(this.tableOptions.getSelectedRows());
      }
    },
    anySelected: function anySelected() {
      return this.tableOptions && this.tableOptions.getSelectedRows().length > 0;
    },
    isDisabled: function isDisabled(action) {
      return !this.anySelected() || action.disabledWhen && action.disabledWhen();
    },
    calcActionsVisibility: function calcActionsVisibility() {
      var _this2 = this;

      if (!this.actions) return;
      var visible = [];
      var inDropDown = [];
      var moreDropdownWidth = 125;
      var elems = $(this.$element).find('.grid-batch-action-wrapper:not(.more-actions)');
      var containerWidth = $(this.$element).children().width();
      var totalWidth = 0;
      var addTo = visible;
      var moreActionsNewIndex = -1;
      var moreActionsOldIndex = this.actions.indexOf(this.MORE_ACTIONS);

      for (var i = 0; i < elems.length; i++) {
        var el = $(elems[i]);
        totalWidth += el.width();
        var id = el.attr('data-action-id');

        var act = _.find(this.actions, {
          name: id
        });

        var index = this.actions.indexOf(act);

        if ((totalWidth > containerWidth || this.moreActions && this.moreActions.length && totalWidth - el.width() + moreDropdownWidth > containerWidth) && addTo === visible) {
          addTo = inDropDown;
          moreActionsNewIndex = index;

          if (visible.length && totalWidth - el.width() + moreDropdownWidth > containerWidth) {
            var last = visible.pop();
            inDropDown.push(last);
            moreActionsNewIndex = this.actions.indexOf(last);
          }
        }

        if (act) addTo.push(act);
      }

      if (totalWidth < containerWidth) {
        inDropDown = [];
        visible = _.filter(this.actions, function (act) {
          return act !== _this2.MORE_ACTIONS;
        });
        moreActionsNewIndex = -1;
      }

      var temp = {
        TEMP: 'TEMP'
      };

      if (moreActionsOldIndex !== -1) {
        this.actions.splice(moreActionsOldIndex, 1, temp);
      }

      if (moreActionsNewIndex !== -1) {
        this.actions.splice(moreActionsNewIndex, 0, this.MORE_ACTIONS);
      }

      var tempIndex = this.actions.indexOf(temp);

      if (tempIndex !== -1) {
        this.actions.splice(tempIndex, 1);
      }

      this.visibleActions = visible;
      this.moreActions = inDropDown;
      this.$timeout(function () {
        return _this2.updateMoreActions();
      });
    },
    initActions: function initActions(actionsController) {
      this.moreActionsController = actionsController;
      if (this.gridOptions) this.gridOptions.moreActionsController = actionsController;
      this.updateMoreActions();
    },
    updateMoreActions: function updateMoreActions() {
      var _this3 = this;

      if (!this.moreActionsController) return;

      var actionsCount = _.filter(this.actions, function (act) {
        return act !== _this3.MORE_ACTIONS;
      }).length;

      if (this.moreActions.length < actionsCount) {
        this.moreActionsController.label = 'More Actions';
      } else if (this.moreActions.length === actionsCount) {
        this.moreActionsController.label = 'Actions';
      }

      var dict = {};
      this.moreActions.forEach(function (action) {
        dict[action.name] = {
          title: action.name,
          icon: 'icon-' + action.icon,
          disabled: _this3.isDisabled(action)
        };
      });
      this.moreActionsController.setActionsDictionary(dict);
      this.moreActionsController.setActions(_.map(this.moreActions, function (_action) {
        return {
          name: _action.name,
          visibleWhen: _action.visibleWhen,
          action: function action() {
            return _this3.perform(_action);
          }
        };
      }));
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableViewBatchActionsComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableViewBatchActionsComponentvue_type_script_lang_js_ = (JfTableViewBatchActionsComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTableViewBatchActionsComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTableViewBatchActionsComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "13b7a2b8",
  null
  
)

/* harmony default export */ var JfTableViewBatchActionsComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "d537":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableTopComponent/index.vue?vue&type=template&id=49daa7e8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-table-top clearfix"},[(!_vm.tableView.options.getRawData().length || _vm.hasExternalFilter || _vm.tableView.options.filterVisible)?_c('div',{staticClass:"counter-and-filter-wrapper"},[(_vm.tableView.options && !_vm.tableView.options.noCount)?_c('div',{staticClass:"table-counter"},[_vm._v(_vm._s(_vm.totalRecords)),(_vm.tableView.getSelectedRecords())?_c('span',[_vm._v(" ("+_vm._s(_vm.tableView.getSelectedRecords())+" Selected)")]):_vm._e()]):_vm._e(),_c('div',{staticClass:"external-filters"},[_vm._t("external-filters")],2),(!_vm.hasExternalFilter)?_c('div',{staticClass:"jf-table-filter"},[(_vm.tableView.options && _vm.tableView.options.filterVisible)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.tableView.tableFilter),expression:"tableView.tableFilter"},{name:"init",rawName:"v-init",value:(_vm.tableView.initFilter()),expression:"tableView.initFilter()"},{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.filterTooltip),expression:"filterTooltip",modifiers:{"bind":true}}],staticClass:"input-text",class:{'no-results': _vm.tableView.noFilterResults},attrs:{"disabled":_vm.isFilterDisabled(),"ng-model-options":"{debounce: { 'default': 500 } }","placeholder":"Filter"},domProps:{"value":(_vm.tableView.tableFilter)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.tableView, "tableFilter", $event.target.value)},function($event){return _vm.tableView.onUpdateFilter()}]}}):_vm._e()]):_vm._e()]):_vm._e(),(_vm.tableView.options && _vm.tableView.options.batchActions && _vm.tableView.options.batchActions.length)?_c('div',{staticClass:"batch-actions-wrapper"},[_c('jf-table-view-batch-actions',{attrs:{"table-options":_vm.tableView.options,"actions":_vm.tableView.options.batchActions}})],1):_vm._e(),(_vm.tableView.options && _vm.tableView.paginationApi.getTotalPages() > 1)?_c('div',{staticClass:"pagination-controls"},[(_vm.tableView.paginationApi && _vm.tableView.options.paginationVisible)?_c('jf-drag-drop-pagination',{ref:"pagination",attrs:{"pagination-api":_vm.tableView.paginationApi}}):_vm._e()],1):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableTopComponent/index.vue?vue&type=template&id=49daa7e8&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableTopComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTableTopComponentvue_type_script_lang_js_ = ({
  name: 'jf-table-top',
  props: ['tableView', 'totalRecords'],
  data: function data() {
    return {};
  },
  computed: {
    filterTooltip: function filterTooltip() {
      return !this.tableView.options.tooltipFilterDisabled ? this.tableView.options.getFilterTooltip() : '';
    },
    hasExternalFilter: function hasExternalFilter() {
      return !!this.$slots['external-filters'] || !!this.$scopedSlots['external-filters'];
    }
  },
  ng1_legacy: {
    'controllerAs': 'jfTableTop'
  },
  methods: {
    isFilterDisabled: function isFilterDisabled() {
      return !(this.tableView.options && (this.tableView.options.getRawData().length || this.tableView.options.externalTotalCount && this.tableView.options.externalTotalCount.total > 0)) || this.tableView.options.isFilterDisabledCallback && this.tableView.options.isFilterDisabledCallback();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableTopComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableTopComponentvue_type_script_lang_js_ = (JfTableTopComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTableTopComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTableTopComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "49daa7e8",
  null
  
)

/* harmony default export */ var JfTableTopComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "ee70":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableCompiledCellComponent/index.vue?vue&type=template&id=15d45563&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.compiledTemplate)?_c(_vm.compiledTemplate.comp,_vm._b({tag:"component"},'component',_vm.compiledTemplate.props,false)):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableCompiledCellComponent/index.vue?vue&type=template&id=15d45563&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__("768b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableCompiledCellComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
/* harmony default export */ var JfTableCompiledCellComponentvue_type_script_lang_js_ = ({
  name: 'jf-table-compiled-cell',
  props: ['field', 'rowId', 'tableRow'],
  'jf@inject': ['$element', '$timeout', '$scope'],
  data: function data() {
    return {
      compiledTemplate: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.setMfeRouter();
    this.$scope.$watch('compiledCell.tableRow.data', function () {
      _this.compile();
    });
  },
  ng1_legacy: {
    'controllerAs': 'compiledCell'
  },
  methods: {
    setMfeRouter: function setMfeRouter() {
      var _$$closest = $(this.$element).closest("div[id^=app-]"),
          _$$closest2 = Object(slicedToArray["a" /* default */])(_$$closest, 1),
          _$$closest2$ = _$$closest2[0],
          mfe = _$$closest2$ === void 0 ? {
        id: ''
      } : _$$closest2$;

      var mfeName = "".concat(mfe.id || '').replace('app-', '');
      window.$jfrog.router = mfeName.length > 0 ? window.$jfrog.routersCache[mfeName] : window.$jfrog.router;
    },
    compile: function compile() {
      if (!this.compiledTemplate) {
        this.compiledTemplate = this.tableRow.tableView.compileTemplate(this.field, this.rowId);
      } else {
        this.compiledTemplate.props = this.tableRow.tableView.compileTemplate(this.field, this.rowId).props;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableCompiledCellComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableCompiledCellComponentvue_type_script_lang_js_ = (JfTableCompiledCellComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTableCompiledCellComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTableCompiledCellComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "15d45563",
  null
  
)

/* harmony default export */ var JfTableCompiledCellComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "fcb9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6f44c5af_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a83f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6f44c5af_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6f44c5af_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfTable.js.map