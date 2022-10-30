((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[41],{

/***/ "054c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSummaryRowComponent/index.vue?vue&type=template&id=2f5bf151&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"summary-row jf-content-section",style:(_vm.$ctrl.inlineStyle)},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfSummaryRowComponent/index.vue?vue&type=template&id=2f5bf151&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSummaryRowComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//

/* harmony default export */ var JfSummaryRowComponentvue_type_script_lang_js_ = ({
  name: 'jf-summary-row',
  props: [],
  'jf@inject': ['$element'],
  data: function data() {
    return {
      columnsToShow: [],
      inlineStyle: {}
    };
  },
  mounted: function mounted() {
    this.filterOutInactiveColumns();
    this.setColumnsLayout();
  },
  methods: {
    filterOutInactiveColumns: function filterOutInactiveColumns() {
      this.columnsToShow = this.$element.find('.summery-labeled-item');
    },
    setColumnsLayout: function setColumnsLayout() {
      var layout = '';
      Object(lodash["forEach"])(this.columnsToShow, function (col) {
        layout += "".concat($(col).attr('width') || '1fr', " ");
      });
      this.inlineStyle = {
        gridTemplateColumns: layout,
        "-ms-grid-columns": layout
      };
    }
  },
  ng1_legacy: {
    'controllerAs': '$ctrl'
  }
});
// CONCATENATED MODULE: ./src/components/JfSummaryRowComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfSummaryRowComponentvue_type_script_lang_js_ = (JfSummaryRowComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfSummaryRowComponent/index.vue?vue&type=style&index=0&id=2f5bf151&scoped=true&lang=less&
var JfSummaryRowComponentvue_type_style_index_0_id_2f5bf151_scoped_true_lang_less_ = __webpack_require__("6f38");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfSummaryRowComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfSummaryRowComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "2f5bf151",
  null
  
)

/* harmony default export */ var JfSummaryRowComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "6f38":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2f5bf151_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7e94");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2f5bf151_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2f5bf151_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "7e94":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfSummaryRow.js.map