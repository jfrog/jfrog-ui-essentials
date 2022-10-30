((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[0],{

/***/ "0814":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e85e4d42_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("154a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e85e4d42_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e85e4d42_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "154a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9b3d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewWrapper/index.vue?vue&type=template&id=5edb9f6c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('jf-table-view',{ref:"tableView",attrs:{"options":_vm.tableOptions}},[_vm._t("external-filters",null,{"slot":"external-filters"})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTableViewWrapper/index.vue?vue&type=template&id=5edb9f6c&scoped=true&

// EXTERNAL MODULE: ./src/components/JfTableViewComponent/index.vue + 4 modules
var JfTableViewComponent = __webpack_require__("e730");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewWrapper/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//

/* harmony default export */ var JfTableViewWrappervue_type_script_lang_js_ = ({
  name: 'jf-table-view-wrapper',
  components: {
    JfTableView: JfTableViewComponent["default"]
  },
  props: ['options', 'objectName', 'tableId', 'data', 'columns', 'actions', 'batchActions', 'scope', 'rowsPerPage', 'emptyTableText', 'useVirtualScroll', 'enableSubrows', 'sortBy', 'sortDir', 'groupBy', 'showFilter', 'showPagination', 'showCounter', 'sortable', 'disableFilterTooltip', 'externalSearchFields', 'newEntityCustomText', 'disableNewEntity', 'emptyTableCallToAction', 'emptyTableAction', 'externalSortCallback', 'keyField', 'hideSelectAll', 'singleRowSelection', 'rowClassAttr'],
  'jf@inject': ['JFrogTableViewOptions', '$q', '$scope'],
  data: function data() {
    return {
      tableOptions: null,
      columnsSet: false
    };
  },
  watch: {
    data: {
      deep: true,
      handler: function handler(val) {
        if (val && val !== this.tableOptions.data) this.setData();
      }
    },
    externalSearchFields: function externalSearchFields(newVal) {
      this.tableOptions.externalSearchFields = newVal;

      if (this.tableOptions.paginationMode === this.tableOptions.INFINITE_SCROLL || this.tableOptions.paginationMode === this.tableOptions.INFINITE_VIRTUAL_SCROLL) {
        this.tableOptions.sendInfiniteScrollRequest(true);
      }

      if (this.tableOptions.paginationMode === this.tableOptions.EXTERNAL_PAGINATION) {
        this.tableOptions.sendExternalPageRequest();
      }
    }
  },
  created: function created() {
    var _this = this;

    this.tableOptions = this.options || new this.JFrogTableViewOptions(this.scope || this.$scope);

    if (!_.isUndefined(this.enableSubrows)) {
      this.tableOptions.enableSubRows();
    }

    if (!_.isUndefined(this.hideSelectAll)) {
      this.tableOptions.hideSelectAll();
    }

    if (this.tableId) {
      this.tableOptions.setId(this.tableId);
    }

    if (this.objectName) {
      this.tableOptions.setObjectName(this.objectName);
    }

    if (this.rowsPerPage) {
      if (_.isString(this.rowsPerPage) && this.rowsPerPage !== 'auto') {
        console.error('Error: rows-per-page should be a number, or the string \'auto\'.');
      }

      this.tableOptions.setRowsPerPage(this.rowsPerPage);
    }

    this.$watch(function () {
      return _this.getActualColumns();
    }, function () {
      if (_this.columns
      /* && !this.columnsSet*/
      ) {
        _this.tableOptions.setColumns(_this.getActualColumns());

        _this.columnsSet = true;
      }

      ;
    }, {
      immediate: true
    });
    /*
                if (this.columns) {
                    this.tableOptions.setColumns(this.getActualColumns());
                    this.columnsSet = true;
                }
    */

    if (this.actions) {
      this.tableOptions.setActions(this.actions);
    }

    if (this.batchActions) {
      this.tableOptions.setBatchActions(this.batchActions);
    }

    if (this.emptyTableText) {
      this.tableOptions.setEmptyTableText(this.emptyTableText);
    }

    if (this.emptyTableCallToAction) {
      this.tableOptions.setEmptyTableCallToAction(this.emptyTableCallToAction);
    }

    if (this.emptyTableAction) {
      this.tableOptions.setEmptyTableAction(this.emptyTableAction);
    }

    if (this.groupBy) {
      this.tableOptions.groupBy(this.groupBy);
    }

    if (this.sortBy) {
      this.tableOptions.sortBy(this.sortBy);
    }

    if (this.sortDir && this.sortDir === 'desc') {
      this.tableOptions.reverseSortingDir();
    }

    if (this.keyField) {
      this.tableOptions.setKey(this.keyField);
    }

    if (this.singleRowSelection) {
      this.tableOptions.setSelection(this.tableOptions.SINGLE_SELECTION);
    }

    if (!_.isUndefined(this.showFilter)) {
      this.tableOptions.showFilter(this.showFilter);
    }

    if (!_.isUndefined(this.showPagination)) {
      this.tableOptions.showPagination(this.showPagination);
    }

    if (!_.isUndefined(this.showCounter)) {
      this.tableOptions.showCounter(this.showCounter);
    }

    if (!_.isUndefined(this.sortable)) {
      this.tableOptions.setSortable(this.sortable);
    }

    if (!_.isUndefined(this.useVirtualScroll) && !this.$listeners['load-more']) {
      this.tableOptions.setPaginationMode(this.tableOptions.VIRTUAL_SCROLL);
    }

    if (!_.isUndefined(this.disableFilterTooltip)) {
      this.tableOptions.disableFilterTooltip();
    }

    if (!_.isUndefined(this.externalSearchFields)) {
      this.tableOptions.externalSearchFields = this.externalSearchFields;
    }

    if (!_.isUndefined(this.newEntityCustomText)) {
      this.tableOptions.newEntityCustomText = this.newEntityCustomText;
    }

    if (!_.isUndefined(this.rowClassAttr)) {
      this.tableOptions.setRowClassAttr(this.rowClassAttr);
    }

    if (!this.options) {
      this.$emit('init', {
        tableOptions: this.tableOptions,
        cellTemplateGenerators: this.JFrogTableViewOptions.cellTemplateGenerators
      });
    }

    if ((_.isUndefined(this.disableNewEntity) || !this.disableNewEntity) && this.$listeners['new-entity']) {
      this.tableOptions.setNewEntityAction(function () {
        _this.$emit('new-entity');
      });
    }

    if (this.$listeners['pagination-change']) {
      this.tableOptions.on('pagination.change', function (eventData) {
        _this.$emit('pagination-change', {
          eventData: eventData
        });
      });
    }

    if (this.$listeners['row-clicked']) {
      this.tableOptions.on('row.clicked', function (eventData) {
        _this.$emit('row-clicked', {
          eventData: eventData
        });
      });
    }

    if (this.$listeners['selection-change']) {
      this.tableOptions.on('selection.change', function (eventData) {
        _this.$emit('selection-change', {
          eventData: eventData
        });
      });
    }

    if (this.$listeners['external-sort']) {
      this.tableOptions.useExternalSortCallback(function (field, dir) {
        _this.$emit('external-sort', {
          field: field,
          dir: dir
        });
      });
    }

    if (this.$listeners['load-more']) {
      this.tableOptions.setPaginationMode(!_.isUndefined(this.useVirtualScroll) ? this.tableOptions.INFINITE_VIRTUAL_SCROLL : this.tableOptions.INFINITE_SCROLL, function (params) {
        var defer = _this.$q.defer();

        _this.$emit('load-more', params);

        _this.pageResolver = defer.resolve;
        return defer.promise;
      });
      if (this.sortable) this.tableOptions.setSortable(true);
    }

    window.store.subscribeAction(function (_ref) {
      var type = _ref.type,
          payload = _ref.payload;

      if (type === 'CHANGE_TABLE_PAGINATION') {
        var tableId = payload.tableId,
            _payload$toPage = payload.toPage,
            toPage = _payload$toPage === void 0 ? 1 : _payload$toPage;

        if (_this.$refs.tableView && tableId === _this.$refs.tableView.options.tableId) {
          if (!_this.$refs.tableView.$refs.top.$refs.pagination) {
            _this.$refs.tableView.currentPage = 0;
          } else {
            _this.$refs.tableView.$refs.top.$refs.pagination.paginationApi.setPage(toPage);
          }
        }
      }
    });
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.data) this.setData(true);

    if (this.$listeners['page-needed']) {
      this.tableOptions.setPaginationMode(this.tableOptions.EXTERNAL_PAGINATION, function (pagingData) {
        var defer = _this2.$q.defer();

        _this2.$emit('page-needed', pagingData);

        _this2.pageResolver = defer.resolve;
        return defer.promise;
      });
    }
  },
  methods: {
    setData: function setData(initialSet) {
      if (!this.$listeners['page-needed'] && !this.$listeners['load-more'] && this.tableOptions.paginationMode !== this.tableOptions.EXTERNAL_PAGINATION) {
        if (this.data && !_.isUndefined(this.data.isUpdate) && this.data.data) {
          if (this.data.isUpdate) {
            this.tableOptions.updateData(this.data.data, this.data.removeIfMissing);
          } else {
            this.tableOptions.setData(this.data.data);
          }
        } else {
          this.tableOptions.setData(this.data);
          this.tableOptions.refreshFilter();
        }
      } else if (!initialSet && this.$listeners['load-more'] && !this.pageResolver) {
        this.tableOptions.setData(this.data.data, '$$internal$$');
      } else if (this.pageResolver) {
        this.pageResolver(this.data);
        this.pageResolver = null;
      }
    },
    getActualColumns: function getActualColumns() {
      if (_.isFunction(this.columns)) {
        if (this.JFrogTableViewOptions) {
          return this.columns({
            cellTemplateGenerators: this.JFrogTableViewOptions.cellTemplateGenerators
          });
        } else {
          return null;
        }
      } else {
        return this.columns;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTableViewWrapper/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableViewWrappervue_type_script_lang_js_ = (JfTableViewWrappervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTableViewWrapper/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTableViewWrappervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "5edb9f6c",
  null
  
)

/* harmony default export */ var JfTableViewWrapper = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "e730":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewComponent/index.vue?vue&type=template&id=e85e4d42&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-table-view",staticStyle:{"clear":"both"},attrs:{"id":_vm.options.tableId}},[_c('div',{staticClass:"new-entity-wrapper"},[(_vm.options && _vm.options.newEntityCallback)?_c('a',{staticClass:"new-entity",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.createNewEntity()}}},[_c('i',{staticClass:"icon icon-new"}),(_vm.options && !_vm.options.newEntityCustomText)?_c('span',[_vm._v("Add "+_vm._s(_vm.options.useAnWithObjectName ? 'an' : 'a')+" "+_vm._s(_vm.objectName ? _vm.objectName.split('/')[0] : _vm.options.objectName ? _vm.options.objectName.split('/')[0] : 'Item'))]):_vm._e(),(_vm.options && _vm.options.newEntityCustomText)?_c('span',[_vm._v(_vm._s(_vm.options.newEntityCustomText))]):_vm._e()]):_vm._e()]),_c('jf-table-top',{ref:"top",attrs:{"total-records":_vm.getTotalRecords(),"table-view":_vm.jfTableView}},[_vm._t("external-filters",null,{"slot":"external-filters"})],2),(_vm.options && _vm.options.columnsCustomization)?_c('div',{staticClass:"columns-customization-wrap"},[_c('div',{staticClass:"columns-customization pull-right"},[_c('jf-multi-dropdown',{attrs:{"title":"Columns","no-filter":"true","filter-placeholder":"Filter Columns","items":_vm.options.availableColumns,"on-change":"options.updateCustomizedColumns()"}})],1)]):_vm._e(),(_vm.options)?_c('div',{staticClass:"jf-table-view-container"},[(_vm.options && _vm.options.headersVisible)?_c('div',{staticClass:"jf-table-view-header"},[_c('jf-table-row',{attrs:{"table-view":_vm.jfTableView,"row-id":'headers',"data":_vm.options.headersRow}})],1):_vm._e(),(_vm.options && (_vm.options.paginationMode === _vm.options.VIRTUAL_SCROLL || _vm.options.paginationMode === _vm.options.INFINITE_VIRTUAL_SCROLL))?_c('div',{staticClass:"table-rows-container",style:({height: _vm.getActualPageHeight() + 'px'})},[_c('jf-vscroll',{attrs:{"with-each":"entity","prevent-default-scroll":this.options.pendingInfiniteScroll,"in":_vm.options.getPrePagedData(),"api":_vm.vsApi}},[_c('div',{pre:true},[_c('div',{pre:true,attrs:{"v-if":"is_last() && options && options.pendingInfiniteScroll && options.paginationMode === options.INFINITE_VIRTUAL_SCROLL",":style":"{height: options.rowHeight}","class":"loading-more"}},[_c('div',{pre:true,attrs:{"class":"spinner-msg-local"}},[_c('div',{pre:true,attrs:{"class":"icon-hourglass-local"}})])]),_c('jf-table-row',{pre:true,attrs:{"v-else":"",":table-view":"jfTableView",":row-id":"v_index()",":data":"entity"}})],1)])],1):_vm._e(),(_vm.options && _vm.options.paginationMode !== _vm.options.VIRTUAL_SCROLL && _vm.options.paginationMode !== _vm.options.INFINITE_VIRTUAL_SCROLL)?_c('div',{staticClass:"table-rows-container"},_vm._l((_vm.options.getPageData()),function(entity,$index){return _c('jf-table-row',{key:$index,attrs:{"table-view":_vm.jfTableView,"row-id":$index,"data":entity}})}),1):_vm._e(),(_vm.options && _vm.options.dataWasSet && !_vm.options.getRawData().length && !_vm.options.pendingExternalPaging && (!_vm.options.externalTotalCount || _vm.options.externalTotalCount.total === 0))?_c('div',{staticClass:"empty-table-placeholder",style:(_vm.options.registeredTabularDnd ? _vm.options.registeredTabularDnd.emptyTableStyle : {})},[_c('p',[_c('span',[_vm._v(_vm._s(_vm.emptyTableText))]),(_vm.options.emptyTableAction && _vm.options.emptyTableCallActionText)?_c('a',{staticClass:"jf-link",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.options.emptyTableAction()}}},[_vm._v(_vm._s(_vm.options.emptyTableCallActionText))]):_vm._e()])]):_vm._e(),(_vm.options && _vm.noFilterResults)?_c('div',{staticClass:"empty-table-placeholder filter-no-results"},[_c('div',[_vm._v(_vm._s(_vm.noFilterResultsText))]),(_vm.tableFilter)?_c('a',{staticClass:"jf-link",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.clearFilter()}}},[_vm._v("Clear filter")]):_vm._e()]):_vm._e(),(_vm.options && _vm.options.pendingInfiniteScroll && _vm.options.paginationMode !== _vm.options.INFINITE_VIRTUAL_SCROLL)?_c('div',{staticClass:"loading-more",style:({height: _vm.options.rowHeight})},[_vm._m(0)]):_vm._e()]):_vm._e()],1)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spinner-msg-local"},[_c('div',{staticClass:"icon-hourglass-local"})])}]


// CONCATENATED MODULE: ./src/components/JfTableViewComponent/index.vue?vue&type=template&id=e85e4d42&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d225");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js
var createClass = __webpack_require__("b0b4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("bd86");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTableViewComponent/index.vue?vue&type=script&lang=js&










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
/* harmony default export */ var JfTableViewComponentvue_type_script_lang_js_ = ({
  name: 'jf-table-view',
  props: ['options', 'objectName'],
  'jf@inject': ['$scope', '$element', '$timeout', '$compileComp', '$rootScope', 'JFrogEventBus'],
  data: function data() {
    var _this = this;

    return {
      vsApi: {
        onInit: function onInit() {
          _this.vsApi.registerScrollListener(function (scrollPos) {
            return _this.onVScroll(scrollPos);
          });
        }
      },
      noFilterResults: null,
      tableFilter: null,
      currentPage: 0,
      allSelected: false,
      jfTableView: this,
      cellScopes: [],
      cellComponents: []
    };
  },
  created: function created() {
    var _this2 = this;

    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
    this.$scope.$watch('jfTableView.options', function (options) {
      if (_this2.options && _this2.options.dirCtrl !== _this2) {
        _this2.options._setDirectiveController(_this2);
      }

      if (_this2.options && !_this2.paginationApi) {
        _this2.paginationApi = new JfTableViewComponentvue_type_script_lang_js_PaginationApi(_this2);

        _this2.paginationApi.registerChangeListener(function () {
          _this2.refresh(false);

          _this2._fireDebouncedRowsInView();

          _this2.options._normalizeWidths();
        });

        _this2.currentPage = 0;
      }
    });

    var on_resize = function on_resize() {
      _this2.options._normalizeWidths();

      _this2._fireDebouncedRowsInView();

      _this2.$forceUpdate();

      if (_this2.vsApi && _this2.vsApi.refresh) _this2.vsApi.refresh();
    };

    $(window).on('resize', on_resize);
    this.$scope.$on('$destroy', function () {
      //                this.cellScopes.forEach(s => s.$destroy());
      $(window).off('resize', on_resize);
    });
  },
  mounted: function mounted() {
    this.$containerElement = this.$element.find('.jf-table-view');

    this._handleDocumentClick();
  },
  ng1_legacy: {
    'controllerAs': 'jfTableView'
  },
  methods: {
    clearFilter: function clearFilter() {
      this.tableFilter = '';
      this.onUpdateFilter();
    },
    getActualPageHeight: function getActualPageHeight() {
      var maxForInfiniteVirtualScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (maxForInfiniteVirtualScroll) {
        return $(this.$element).parent().height() - $(this.$element).find('.table-rows-container').position().top;
      } else if (this.options.rowsPerPage === 'auto' && $(this.$element).find('.table-rows-container').length) {
        return Math.min($(this.$element).parent().height() - $(this.$element).find('.table-rows-container').position().top, parseFloat(this.options.rowHeight) * this.options.getPrePagedData().length);
      } else {
        return parseFloat(this.options.rowHeight) * Math.min(this.options.rowsPerPage, this.options.getPrePagedData().length) + 2;
      }
    },
    compileTemplate: function compileTemplate(field, rowId) {
      var columnObj = _.find(this.options.columns, {
        field: field
      });

      var rowObj = rowId !== 'headers' ? this.options.getPageData()[rowId] : this.options.headersRow;
      if (!rowObj) return;

      if (rowObj.$groupHeader) {
        var groupRowObj = {};

        _.set(groupRowObj, rowObj.$groupHeader.field, rowObj.$groupHeader.value);

        rowObj = groupRowObj;
      }

      var existingScope = _.find(this.cellScopes, function (s) {
        return s.row.uid === rowId && s.col.field === columnObj.field;
      });

      var rowScope;

      if (!existingScope) {
        rowScope = {
          row: {
            entity: rowObj,
            uid: rowId
          },
          col: columnObj,
          MODEL_COL_FIELD: _.get(rowObj, field),
          COL_FIELD: _.get(rowObj, field),
          appScope: this.options.appScope,
          grid: {
            appScope: this.options.appScope
          },
          //Backward compatibility with old grid
          table: {
            options: this.options
          }
        };
        this.cellScopes.push(rowScope);
        var template = rowId !== 'headers' ? columnObj.cellTemplate : columnObj.headerCellTemplate;
        var templateElem = $('<div>' + template + '</div>');

        this._autoAddEllipsisClass(templateElem);

        template = templateElem.html();
        /*
                            if (this.options.appScope && this.options.appScope.$comp) {
                                rowScope.$comp.$options.components = this.options.appScope.$comp.$options.components;
                            }
        */

        var compOptions = this.$compileComp(template, {}, this.options.appScope && this.options.appScope.$comp);
        compOptions.props = Object.keys(rowScope);
        this.cellComponents.push(compOptions);
        return {
          comp: compOptions,
          props: rowScope
        };
      } else {
        var index = this.cellScopes.indexOf(existingScope);
        var comp = this.cellComponents[index];

        var scope = _objectSpread(_objectSpread({}, existingScope), {}, {
          row: {}
        });

        scope.row.entity = rowObj;
        scope.row.uid = rowId;
        return {
          comp: comp,
          props: scope
        };
      }
    },
    _autoAddEllipsisClass: function _autoAddEllipsisClass(templateRoot) {
      var allText = templateRoot.text();
      var elementToAddTo = null;

      var recursiveAdd = function recursiveAdd(root) {
        var children = root.children();
        var childToRecurseInto = null;

        for (var i = 0; i < children.length; i++) {
          var child = $(children[i]);

          if (child.text() === allText) {
            childToRecurseInto = child;
            break;
          }
        }

        if (childToRecurseInto) {
          recursiveAdd(childToRecurseInto);
        } else {
          elementToAddTo = root;
        }
      };

      recursiveAdd(templateRoot);

      if (elementToAddTo) {
        if (!elementToAddTo.is('[disable-tooltip-on-overflow]')) {
          elementToAddTo.attr('v-jf-tooltip-on-overflow', '');
        }

        elementToAddTo.addClass('overflow-ellipsis');
      }
    },
    onUpdateFilter: function onUpdateFilter() {
      var resetPagination = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.options.refreshFilter();
      this.refresh();

      if (resetPagination) {
        this.paginationApi.setPage(1, true);
        this.paginationApi.update();
      }
    },
    refresh: function refresh() {
      var updatePagination = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var pageData = this.options.getPageData();
      /*
                      let unusedScopes = _.filter(this.cellScopes, scope => pageData.indexOf(scope.row.entity) === -1);
                      unusedScopes.forEach(s => {
                          this.cellScopes.splice(this.cellScopes.indexOf(s), 1);
      //                    s.$destroy();
                      });
      */

      if (this.paginationApi && updatePagination) this.paginationApi.update();
      this.$forceUpdate();
    },
    clearSelection: function clearSelection() {
      var _this3 = this;

      this.options.getRawData().forEach(function (row) {
        return _this3.$delete(row, '$selected');
      });
      this.allSelected = false;
    },
    toggleSelectAll: function toggleSelectAll() {
      var _this4 = this;

      this.allSelected = !this.allSelected;
      this.options.getPrePagedData().forEach(function (row) {
        if (_this4.options.isRowSelectable && !_this4.options.isRowSelectable({
          entity: row
        })) {
          _this4.$set(row, '$selected', false);
        } else {
          _this4.$set(row, '$selected', _this4.allSelected);
        }
      });

      if (this.options.groupedBy) {
        this.options.getFilteredData().forEach(function (row) {
          if (_this4.options.isRowSelectable && !_this4.options.isRowSelectable({
            entity: row
          })) {
            _this4.$set(row, '$selected', false);
          } else {
            _this4.$set(row, '$selected', _this4.allSelected);
          }
        });
      }
    },
    onVScroll: function onVScroll(scrollPos) {
      var virtualScrollIndex = Math.floor(scrollPos);
      var virtualScrollDisplacement = scrollPos - virtualScrollIndex;
      this.currentPage = Math.floor((virtualScrollIndex + this.options.rowsPerPage - 1) / this.options.rowsPerPage);
      this.paginationApi.update();

      this._fireDebouncedRowsInView();
    },
    _fireDebouncedRowsInView: function _fireDebouncedRowsInView() {
      var _this5 = this;

      if (!this.options.hasListenersFor('row.in.view')) return;

      var debounceCall = function debounceCall(debouncedFunc, debounceTime) {
        if (_this5.debounceTimeout) _this5.$timeout.cancel(_this5.debounceTimeout);
        _this5.debounceTimeout = _this5.$timeout(function () {
          debouncedFunc();
        }, debounceTime);
      };
      /*
                      debounceCall(() => {
                          let pageData = this.options.paginationMode === this.options.VIRTUAL_SCROLL ? this.vsApi.getPageData() : this.options.getPageData();
                          let lriv = this.lastRowsInView || [];
                          this.lastRowsInView = pageData;
                          pageData = _.filter(pageData, row => !_.includes(lriv, row));
                          pageData.forEach(row => this.options.fire('row.in.view', row));
                      }, this.options.rowInViewDebounceTime);
      */

    },
    getTotalScrollHeight: function getTotalScrollHeight() {
      return this.options.getPrePagedData().length * parseFloat(this.options.rowHeight) + 'px';
    },
    getScrollWidth: function getScrollWidth() {
      var el = $(this.$element).find('.scroll-faker-container')[0];
      return el.offsetWidth - el.clientWidth;
    },
    createNewEntity: function createNewEntity() {
      var _this6 = this;

      this.options.newEntityCallback();
      this.$timeout(function () {
        return _this6.onUpdateFilter();
      });
    },
    groupSelection: function groupSelection(groupHeader) {
      var query = {};

      _.set(query, groupHeader.$groupHeader.field, groupHeader.$groupHeader.value);

      var group = _.filter(this.options.getFilteredData(), query);

      group.forEach(function (row) {
        return row.$selected = groupHeader.$selected;
      });
    },
    initFilter: function initFilter() {
      var _this7 = this;

      this.$timeout(function () {
        if (_this7.options && _this7.options.autoFocusFilter) {
          var filterInput = $(_this7.$element).find('.jf-table-filter input');
          filterInput.focus();
        }
      });
    },
    getTotalRecords: function getTotalRecords() {
      if (!this.options) return;
      var count = 0;

      if (this.options.paginationMode === this.options.EXTERNAL_PAGINATION) {
        count = this.options.getTotalLengthOfData();
      } else {
        count = _.filter(this.options.getFilteredData(), function (record) {
          return !record.$parentRow;
        }).length;
      }
      /* rows with $doNotCount property won't be included
         in total records count
       */


      if (this.options.data) {
        count -= _.filter(this.options.data, {
          $doNotCount: true
        }).length;
      }

      return count + ' ' + this.getObjectNameByCount(count);
    },
    getObjectNameByCount: function getObjectNameByCount(count, objectName) {
      objectName = objectName || this.options.objectName;
      var recordsName;

      if (objectName) {
        if (objectName.indexOf('/') >= 0) {
          var splited = objectName.split('/');
          recordsName = count !== 1 ? splited[1] : splited[0];
        } else {
          recordsName = count !== 1 ? objectName + 's' : objectName;
        }
      } else {
        recordsName = count !== 1 ? 'records' : 'record';
      }

      return _.startCase(recordsName);
    },
    getSelectedRecords: function getSelectedRecords() {
      if (!this.options) return 0;
      var count = this.options.getSelectedRows().length;
      return count;
    },
    _handleDocumentClick: function _handleDocumentClick() {
      var _this8 = this;

      var handler = function handler(e) {
        _this8.$timeout(function () {
          var shouldCloseDropdown = !$(e.target).parents('.jf-table-cell.actions').length || $(e.target).parents('.jf-table-view')[0] !== $(_this8.$element).find('.jf-table-view')[0];
          if (shouldCloseDropdown) _this8.JFrogEventBus.dispatch(_this8.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, _this8);
        });
      };

      $(document).on('click', handler);
      this.$scope.$on('$destroy', function () {
        $(document).off('click', handler);
      });
    }
  },
  computed: {
    emptyTableText: function emptyTableText() {
      return this.options.emptyTableText || 'There is no data to display';
    },
    noFilterResultsText: function noFilterResultsText() {
      return this.options.noFilterResultsText || 'Current filter has no results.';
    }
  }
});

var JfTableViewComponentvue_type_script_lang_js_PaginationApi = /*#__PURE__*/function () {
  function PaginationApi(tableCtrl) {
    Object(classCallCheck["a" /* default */])(this, PaginationApi);

    this.tableCtrl = tableCtrl;
  }

  Object(createClass["a" /* default */])(PaginationApi, [{
    key: "getTotalPages",
    value: function getTotalPages() {
      return Math.ceil(this.tableCtrl.options.getTotalLengthOfData() / this.tableCtrl.options.rowsPerPage);
    }
  }, {
    key: "getCurrentPage",
    value: function getCurrentPage() {
      return this.tableCtrl.currentPage + 1;
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      if (this.getCurrentPage() === this.getTotalPages()) return;
      this.tableCtrl.currentPage++;
      this.syncVirtualScroll();
      this.update();
      this.sendExternalPageRequest();
      this.tableCtrl.options.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      if (this.getCurrentPage() === 1) return;
      this.tableCtrl.currentPage--;
      this.syncVirtualScroll();
      this.update();
      this.sendExternalPageRequest();
      this.tableCtrl.options.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "sendExternalPageRequest",
    value: function sendExternalPageRequest() {
      if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.EXTERNAL_PAGINATION) {
        this.tableCtrl.options.sendExternalPageRequest();
      }
    }
  }, {
    key: "setPage",
    value: function setPage(pageNum) {
      var jump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (pageNum < 1 || pageNum > this.getTotalPages()) return;
      this.tableCtrl.currentPage = pageNum - 1;
      this.syncVirtualScroll(jump);
      this.update();
      this.sendExternalPageRequest();
      this.tableCtrl.options.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "update",
    value: function update() {
      var _this9 = this;

      if (this.getCurrentPage() > this.getTotalPages()) {
        this.setPage(1, true);
      }

      if (this.listeners) this.listeners.forEach(function (listener) {
        return listener(_this9.getCurrentPage());
      });
    }
  }, {
    key: "registerChangeListener",
    value: function registerChangeListener(listener) {
      if (!this.listeners) this.listeners = [];
      this.listeners.push(listener);
    }
  }, {
    key: "syncVirtualScroll",
    value: function syncVirtualScroll() {
      var jump = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.VIRTUAL_SCROLL) {
        this.tableCtrl.vsApi.scrollTo(this.tableCtrl.currentPage * this.tableCtrl.options.rowsPerPage, jump ? 0 : 500);
      }
    }
  }]);

  return PaginationApi;
}();
// CONCATENATED MODULE: ./src/components/JfTableViewComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTableViewComponentvue_type_script_lang_js_ = (JfTableViewComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTableViewComponent/index.vue?vue&type=style&index=0&id=e85e4d42&scoped=true&lang=less&
var JfTableViewComponentvue_type_style_index_0_id_e85e4d42_scoped_true_lang_less_ = __webpack_require__("0814");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTableViewComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTableViewComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "e85e4d42",
  null
  
)

/* harmony default export */ var JfTableViewComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfTable~jfTabularDnd.js.map