((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[35],{

/***/ "4dce":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfOnOffSwitchComponent/index.vue?vue&type=template&id=044d76a9&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-on-off-toggler",class:{'on-selected' : _vm.isOn,
                'off-selected' : !_vm.isOn}},[_c('jf-toggler',{model:{value:(_vm.isOn),callback:function ($$v) {_vm.isOn=$$v},expression:"isOn"}}),_c('span',{staticClass:"on-option-text jf-toggler-text"},[_vm._v(_vm._s(_vm.on))]),_c('span',{staticClass:"off-option-text jf-toggler-text"},[_vm._v(_vm._s(_vm.off))])],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfOnOffSwitchComponent/index.vue?vue&type=template&id=044d76a9&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfOnOffSwitchComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfOnOffSwitchComponentvue_type_script_lang_js_ = ({
  name: 'jf-on-off-switch',
  props: ['selected', 'options'],
  data: function data() {
    return {
      on: null,
      isOn: Boolean,
      off: null,
      selectedValue: this.selected
    };
  },
  created: function created() {
    if (!this.options) throw 'Must supply options';
    this.on = this.options[0];
    this.off = this.options[1];
    this.selectedValue = this.selectedValue || this.on;
    this.isOn = this.on === this.selectedValue ? true : false;
  }
});
// CONCATENATED MODULE: ./src/components/JfOnOffSwitchComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfOnOffSwitchComponentvue_type_script_lang_js_ = (JfOnOffSwitchComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfOnOffSwitchComponent/index.vue?vue&type=style&index=0&id=044d76a9&scoped=true&lang=less&
var JfOnOffSwitchComponentvue_type_style_index_0_id_044d76a9_scoped_true_lang_less_ = __webpack_require__("5d2d");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfOnOffSwitchComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfOnOffSwitchComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "044d76a9",
  null
  
)

/* harmony default export */ var JfOnOffSwitchComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "5c8b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5d2d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_044d76a9_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5c8b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_044d76a9_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_044d76a9_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfOnOffSwitch.js.map