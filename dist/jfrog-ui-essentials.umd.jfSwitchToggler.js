((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[44],{

/***/ "4b15":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "82dc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_08a14c61_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4b15");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_08a14c61_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_08a14c61_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8648":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSwitchTogglerComponent/index.vue?vue&type=template&id=08a14c61&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-switch-toggler",class:{'left-option-selected' : _vm.isLeftOptionOn,
            'right-option-selected' : !_vm.isLeftOptionOn}},[_c('span',{staticClass:"left-option-text jf-toggler-text"},[_vm._v(_vm._s(_vm.leftOption.text)+">")]),_c('jf-toggler',{on:{"input":function($event){return _vm.toggleSelection()}},model:{value:(_vm.isLeftOptionOn),callback:function ($$v) {_vm.isLeftOptionOn=$$v},expression:"isLeftOptionOn"}}),_c('span',{staticClass:"right-option-text jf-toggler-text"},[_vm._v(_vm._s(_vm.rightOption.text))])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfSwitchTogglerComponent/index.vue?vue&type=template&id=08a14c61&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSwitchTogglerComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfSwitchTogglerComponentvue_type_script_lang_js_ = ({
  name: 'jf-switch-toggler',
  props: ['value', 'options'],
  data: function data() {
    return {
      isLeftOptionOn: null,
      leftOption: {
        text: null
      },
      rightOption: {
        text: null
      },
      model: this.value
    };
  },
  created: function created() {
    if (!this.options) throw 'Must supply options'; // Supports 2 methods of options:
    // array of strings
    // array of objects of type {'value': ..., 'text': ...}
    // The model is assigned the value, and the text is displayed

    this.setOptionObjects();

    if (_.isEmpty(this.model)) {
      this.model = this.leftOption.value;
    }

    this.isLeftOptionOn = this.model === this.leftOption.value;
  },
  methods: {
    toggleSelection: function toggleSelection() {
      this.model = this.model === this.leftOption.value ? this.rightOption.value : this.leftOption.value;
      this.$emit('input', this.model);
    },
    setOptionObjects: function setOptionObjects() {
      var optionObjects = this.options.map(function (option) {
        if (typeof option === 'string') return {
          value: option,
          text: option
        };else {
          return option;
        }
      });
      this.leftOption = optionObjects[0];
      this.rightOption = optionObjects[1];
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfSwitchTogglerComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfSwitchTogglerComponentvue_type_script_lang_js_ = (JfSwitchTogglerComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfSwitchTogglerComponent/index.vue?vue&type=style&index=0&id=08a14c61&scoped=true&lang=less&
var JfSwitchTogglerComponentvue_type_style_index_0_id_08a14c61_scoped_true_lang_less_ = __webpack_require__("82dc");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfSwitchTogglerComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfSwitchTogglerComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "08a14c61",
  null
  
)

/* harmony default export */ var JfSwitchTogglerComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfSwitchToggler.js.map