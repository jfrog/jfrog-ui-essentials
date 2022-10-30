((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[38],{

/***/ "350f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPendingDataComponent/index.vue?vue&type=template&id=6619b3a2&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.waitFor && (!_vm.delaySpinner || _vm.showSpinner))?_c('div',{staticClass:"spinner-msg-local"},[_c('div',{staticClass:"icon-hourglass-local"})]):_vm._e(),(_vm.waitFor)?_vm._t("default"):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfPendingDataComponent/index.vue?vue&type=template&id=6619b3a2&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfPendingDataComponent/index.vue?vue&type=script&lang=js&
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
/* harmony default export */ var JfPendingDataComponentvue_type_script_lang_js_ = ({
  name: 'jf-pending-data',
  props: ['waitFor', 'delaySpinner'],
  data: function data() {
    return {
      showSpinner: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (this.delaySpinner) {
      setTimeout(function () {
        _this.showSpinner = true;
      }, !_.isNaN(parseInt(this.delaySpinner)) ? this.delaySpinner : 400);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfPendingDataComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfPendingDataComponentvue_type_script_lang_js_ = (JfPendingDataComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfPendingDataComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfPendingDataComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6619b3a2",
  null
  
)

/* harmony default export */ var JfPendingDataComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfPendingData.js.map