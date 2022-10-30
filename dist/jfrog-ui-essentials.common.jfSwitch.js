((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[43],{

/***/ "7697":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_754d22c3_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b920");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_754d22c3_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_754d22c3_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "b920":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d3f2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSwitchComponent/index.vue?vue&type=template&id=754d22c3&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-switch",class:_vm.jfSwitchClass},[(_vm.jfSwitchTitle)?_c('span',{staticClass:"jf-switch-title"},[_vm._v(_vm._s(_vm.jfSwitchTitle))]):_vm._e(),(_vm.helpTooltip)?_c('jf-help-tooltip',{attrs:{"html":_vm.helpTooltip}}):_vm._e(),_c('ul',{staticClass:"jf-switch-options"},_vm._l((_vm.optionObjects),function(option,index){return _c('li',{key:index},[_c('a',{staticClass:"jf-switch-option",class:{active: _vm.isSelected(option), disabled: _vm.disabled},attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.selectOption(option)}}},[_vm._v(_vm._s(option.text))])])}),0)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfSwitchComponent/index.vue?vue&type=template&id=754d22c3&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSwitchComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfSwitchComponentvue_type_script_lang_js_ = ({
  name: 'jf-switch',
  props: ['jfSwitchTitle', 'options', 'value', 'disabled', 'helpTooltip', 'jfSwitchClass'],
  data: function data() {
    return {
      optionObjects: null
    };
  },
  mounted: function mounted() {
    if (!this.options) throw 'Must supply options'; // Supports 2 methods of options:
    // array of strings
    // array of objects of type {'value': ..., 'text': ...}
    // The model is assigned the value, and the text is displayed

    this.updateOptionObjects();
    if (_.isEmpty(this.value)) this.$emit('input', this.optionObjects[0].value);
  },
  methods: {
    updateOptionObjects: function updateOptionObjects() {
      this.optionObjects = this.options.map(function (option) {
        if (typeof option === 'string') return {
          value: option,
          text: option
        };else return option;
      });
    },
    selectOption: function selectOption(option) {
      if (this.disabled) return;
      this.$emit('input', option.value);
    },
    isSelected: function isSelected(option) {
      return this.value === option.value;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfSwitchComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfSwitchComponentvue_type_script_lang_js_ = (JfSwitchComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfSwitchComponent/index.vue?vue&type=style&index=0&id=754d22c3&scoped=true&lang=less&
var JfSwitchComponentvue_type_style_index_0_id_754d22c3_scoped_true_lang_less_ = __webpack_require__("7697");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfSwitchComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfSwitchComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "754d22c3",
  null
  
)

/* harmony default export */ var JfSwitchComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfSwitch.js.map