((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[36],{

/***/ "63e2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPanelComponent/index.vue?vue&type=template&id=be09b244&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.containerClass},[(_vm.jfPanelHeading)?_c('span',{staticClass:"panel-heading"},[_vm._v("\n        "+_vm._s(_vm.jfPanelHeading)+" "),(_vm.jfPanelHelpTooltip)?_c('jf-help-tooltip',{attrs:{"html":_vm.jfPanelHelpTooltip}}):_vm._e()],1):_vm._e(),_c('div',{staticClass:"panel-body"},[_c('div',{staticClass:"panel panel-default clearfix"},[_vm._t("default")],2)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfPanelComponent/index.vue?vue&type=template&id=be09b244&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPanelComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfPanelComponentvue_type_script_lang_js_ = ({
  name: 'jf-panel',
  props: ['jfPanelHeading', 'jfPanelHelpTooltip', 'jfPanelClasses', 'bordered'],
  'jf@inject': ['$element'],
  data: function data() {
    return {
      todo: false,
      hasNested: false
    };
  },
  computed: {
    containerClass: function containerClass() {
      return "panel-container".concat(this.jfPanelClasses ? ' ' + this.jfPanelClasses : '', " ").concat(this.bordered || this.hasNested ? 'bordered' : '');
    }
  },
  methods: {
    hasNestedJfPanel: function hasNestedJfPanel() {
      if (!this.$element) {
        return false;
      }

      return this.$element[0].getElementsByClassName('panel-body').length > 1;
    }
  },
  mounted: function mounted() {
    this.hasNested = this.hasNestedJfPanel();
  },
  ng1_legacy: {
    'controllerAs': '$ctrl'
  }
});
// CONCATENATED MODULE: ./src/components/JfPanelComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfPanelComponentvue_type_script_lang_js_ = (JfPanelComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfPanelComponent/index.vue?vue&type=style&index=0&id=be09b244&scoped=true&lang=less&
var JfPanelComponentvue_type_style_index_0_id_be09b244_scoped_true_lang_less_ = __webpack_require__("d0b4");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfPanelComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfPanelComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "be09b244",
  null
  
)

/* harmony default export */ var JfPanelComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "cd80":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d0b4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_be09b244_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cd80");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_be09b244_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_be09b244_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfPanel.js.map