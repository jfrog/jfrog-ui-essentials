((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[56],{

/***/ "e707":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfValidationComponent/index.vue?vue&type=template&id=42cf285a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('ng-messages',{staticClass:"jf-validation",style:({position: _vm.dontPushDown ? 'absolute' : 'relative'}),attrs:{"for":"field.$error"}},_vm._l((_vm.messages),function(key,value){return _c('div',[_c('div',{attrs:{"ng-message-exp":"key","id":"validation-label"}},[_vm._v(_vm._s(_vm.applyParams(value)))])])}),0)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfValidationComponent/index.vue?vue&type=template&id=42cf285a&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfValidationComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfValidationComponentvue_type_script_lang_js_ = ({
  name: 'jf-validation',
  props: ['field', 'dictionary', 'validationsParams', 'dontPushDown'],
  'jf@inject': ['JFrogUILibConfig'],
  data: function data() {
    return {
      messages: null
    };
  },
  created: function created() {
    return {
      scope: {
        field: '=',
        dictionary: '@',
        validationsParams: '=',
        dontPushDown: '='
      },
      controller: jfValidation,
      controllerAs: 'jfValidation',
      bindToController: true,
      templateUrl: 'directives/jf_validation/jf_validation.html'
    };
  },
  ng1_legacy: {
    'controllerAs': 'jfValidation'
  }
});
// CONCATENATED MODULE: ./src/components/JfValidationComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfValidationComponentvue_type_script_lang_js_ = (JfValidationComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfValidationComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfValidationComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "42cf285a",
  null
  
)

/* harmony default export */ var JfValidationComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfValidation.js.map