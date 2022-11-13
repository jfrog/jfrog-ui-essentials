((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[28],{

/***/ "4007":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7ff7707e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4cb8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7ff7707e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7ff7707e_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "4cb8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7f36":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfHelpTooltipComponent/index.vue?vue&type=template&id=7ff7707e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-help-tooltip",attrs:{"v-jf-tooltip":_vm.html}},[_c('div',[_c('span',{staticClass:"tooltip-icon jf-tooltipster",on:{"click":function($event){return _vm.tooltipClick($event)}}},[_c('span',[_vm._t("default")],2)])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfHelpTooltipComponent/index.vue?vue&type=template&id=7ff7707e&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./src/mixins/Sanitize/index.js
var Sanitize = __webpack_require__("0b04");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfHelpTooltipComponent/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfHelpTooltipComponentvue_type_script_lang_js_ = ({
  name: 'jf-help-tooltip',
  props: ['placement', 'text', 'html', 'maxWidth'],
  'jf@inject': ['$transclude'],
  mixins: [Sanitize["a" /* default */]],
  data: function data() {
    return {};
  },
  methods: {
    tooltipClick: function tooltipClick(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
  ng1_legacy: {
    ng1postLinkFn: function ng1postLinkFn($scope, element, attrs, ctrl) {
      var content = ctrl.text || ctrl.html || ctrl.$transclude().html();
      if (!content) return;
      content = content.replace(/\n/g, '<br>');
      $(element).find('.jf-tooltipster').tooltipster({
        animation: 'fade',
        contentAsHTML: 'true',
        trigger: 'hover',
        onlyOne: 'true',
        interactive: 'true',
        interactiveTolerance: 500,
        maxWidth: ctrl.maxWidth || 600,
        position: ctrl.placement,
        theme: "tooltipster-default " + ctrl.placement,
        content: content,
        functionReady: function functionReady() {
          $(element).find('.jf-tooltipster').addClass('active');
        },
        functionAfter: function functionAfter() {
          $(element).find('.jf-tooltipster').removeClass('active');
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfHelpTooltipComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfHelpTooltipComponentvue_type_script_lang_js_ = (JfHelpTooltipComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfHelpTooltipComponent/index.vue?vue&type=style&index=0&id=7ff7707e&scoped=true&lang=less&
var JfHelpTooltipComponentvue_type_style_index_0_id_7ff7707e_scoped_true_lang_less_ = __webpack_require__("4007");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfHelpTooltipComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfHelpTooltipComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "7ff7707e",
  null
  
)

/* harmony default export */ var JfHelpTooltipComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfHelpTooltip.js.map