((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[19],{

/***/ "02d8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2e0d08fb_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fbc2");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2e0d08fb_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_2e0d08fb_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "fbc2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fc7f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDrawerComponent/index.vue?vue&type=template&id=2e0d08fb&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-drawer"},[_c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.headerTooltip),expression:"headerTooltip",modifiers:{"bind":true}}],staticClass:"drawer-header",on:{"click":function($event){return _vm.onClickHeader()}}},[_c('div',{staticClass:"drawer-header-title"},[_vm._v("\n                "+_vm._s(_vm.header)+"\n            ")]),_c('div',{staticClass:"drawer-header-description"},[_vm._v("\n                "+_vm._s(_vm.description)+"\n            ")]),_c('i',{staticClass:"icon-small-arrow-down",class:{'drawer-arrow-close' : !_vm.opened}})]),_c('b-collapse',{staticClass:"drawer-content",attrs:{"id":"collapse"},model:{value:(_vm.opened),callback:function ($$v) {_vm.opened=$$v},expression:"opened"}},[_vm._t("default")],2)],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDrawerComponent/index.vue?vue&type=template&id=2e0d08fb&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDrawerComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfDrawerComponentvue_type_script_lang_js_ = ({
  name: 'jf-drawer',
  props: ['header', 'description', 'openFirst', 'headerTooltip'],
  'jf@inject': ['JFrogUIUtils', '$timeout'],
  data: function data() {
    return {
      opened: null
    };
  },
  created: function created() {
    this.opened = false;
    this.utils = this.JFrogUIUtils;
  },
  mounted: function mounted() {
    if (this.openFirst === '0') {
      this.opened = true;
    }
  },
  ng1_legacy: {
    'controllerAs': 'jfDrawer'
  },
  methods: {
    onClickHeader: function onClickHeader() {
      this.opened = !this.opened;
      if (this.opened) this.utils.fireResizeEvent();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDrawerComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDrawerComponentvue_type_script_lang_js_ = (JfDrawerComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfDrawerComponent/index.vue?vue&type=style&index=0&id=2e0d08fb&scoped=true&lang=less&
var JfDrawerComponentvue_type_style_index_0_id_2e0d08fb_scoped_true_lang_less_ = __webpack_require__("02d8");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfDrawerComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfDrawerComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "2e0d08fb",
  null
  
)

/* harmony default export */ var JfDrawerComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfDrawer.js.map