((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[27],{

/***/ "0eac":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_93662fee_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ada5");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_93662fee_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_93662fee_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "9f99":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridPaginationComponent/index.vue?vue&type=template&id=93662fee&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.gridApi.pagination.getTotalPages())?_c('div',{staticClass:"grid-pagination text-right"},[_c('p',[_c('input',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip",value:('Jump to Page'),expression:"'Jump to Page'"},{name:"model",rawName:"v-model",value:(_vm.pageViewModel),expression:"pageViewModel"}],staticClass:"grid-page-box",style:({'width': (_vm.CONSTANTS.PAGINATION_DIGIT_WIDTH_PX + _vm.getTotalPages().toString().length * _vm.CONSTANTS.PAGINATION_DIGIT_WIDTH_PX) + 'px'}),attrs:{"type":"text"},domProps:{"value":(_vm.pageViewModel)},on:{"blur":function($event){return _vm.onBlur()},"input":[function($event){if($event.target.composing){ return; }_vm.pageViewModel=$event.target.value},function($event){return _vm.pageChanged()}]}}),_vm._v("\n            out of "+_vm._s(_vm.getTotalPages())+"\n            "),_c('a',{class:{disabled: _vm.currentPage === 1},attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.prevPage()}}},[_vm._v("‹")]),_c('a',{class:{disabled: _vm.currentPage === _vm.gridApi.pagination.getTotalPages()},attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.nextPage()}}},[_vm._v("›")])])]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfGridPaginationComponent/index.vue?vue&type=template&id=93662fee&scoped=true&

// EXTERNAL MODULE: ./src/constants/general.constants.js
var general_constants = __webpack_require__("e56d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridPaginationComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfGridPaginationComponentvue_type_script_lang_js_ = ({
  name: 'jf-grid-pagination',
  props: ['gridApi'],
  'jf@inject': ['$scope', '$timeout', 'JFrogEventBus'],
  data: function data() {
    return {
      CONSTANTS: {
        PAGINATION_DIGIT_WIDTH_PX: null
      },
      pageViewModel: 1,
      currentPage: 1
    };
  },
  created: function created() {
    var _this = this;

    this.CONSTANTS = general_constants["a" /* GENERAL_CONSTANTS */];
    this.JFrogEventBus.registerOnScope(this.$scope, this.JFrogEventBus.getEventsDefinition().RESET_GRID_PAGINATION, function () {
      return _this.resetPagination();
    });
  },
  mounted: function mounted() {
    var _this2 = this;

    this.gridApi = this.$scope.gridApi;
    this.$timeout(function () {
      if (_this2.gridApi.pagination) {
        _this2.gridApi.pagination.on.paginationChanged(_this2.$scope, function (pageNum) {
          _this2.currentPage = pageNum;
          _this2.pageViewModel = _this2.currentPage;
        });
      }
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfGridPagination'
  },
  methods: {
    onBlur: function onBlur() {
      this.pageViewModel = parseInt(this.pageViewModel);
      if (!this.pageViewModel) this.pageViewModel = this.currentPage;
    },
    pageChanged: function pageChanged() {
      this.pageViewModel = parseInt(this.pageViewModel);
      if (this.pageViewModel !== 0 && !this.pageViewModel) return;
      this.currentPage = this.pageViewModel;
      if (this.currentPage < 1) this.currentPage = 1;
      if (this.currentPage > this.gridApi.pagination.getTotalPages()) this.currentPage = this.gridApi.pagination.getTotalPages();
      this.pageViewModel = this.currentPage;
      this.gridApi.pagination.seek(this.currentPage);
    },
    nextPage: function nextPage() {
      if (this.currentPage === this.gridApi.pagination.getTotalPages()) return;
      this.gridApi.pagination.nextPage();
      this.currentPage = this.gridApi.pagination.getPage();
    },
    prevPage: function prevPage() {
      this.gridApi.pagination.previousPage();
      this.currentPage = this.gridApi.pagination.getPage();
    },
    getTotalPages: function getTotalPages() {
      this.gridApi.pagination.seek(this.currentPage);
      return this.gridApi.pagination.getTotalPages();
    },
    resetPagination: function resetPagination() {
      this.gridApi.pagination.seek(1);
      this.currentPage = 1;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfGridPaginationComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfGridPaginationComponentvue_type_script_lang_js_ = (JfGridPaginationComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfGridPaginationComponent/index.vue?vue&type=style&index=0&id=93662fee&scoped=true&lang=less&
var JfGridPaginationComponentvue_type_style_index_0_id_93662fee_scoped_true_lang_less_ = __webpack_require__("0eac");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfGridPaginationComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfGridPaginationComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "93662fee",
  null
  
)

/* harmony default export */ var JfGridPaginationComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "ada5":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e56d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GENERAL_CONSTANTS; });
var GENERAL_CONSTANTS = {
  PAGINATION_DIGIT_WIDTH_PX: 8
};

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfGridPagination.js.map