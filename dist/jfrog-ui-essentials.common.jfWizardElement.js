((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[59],{

/***/ "43c6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWizardElementComponent/index.vue?vue&type=template&id=70305e61&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.config.enableNgShow)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.title && _vm.title === _vm.selectedTitle),expression:"title && title === selectedTitle"}],staticClass:"wizard-element-container"},[_vm._t("default")],2):(!_vm.config.enableNgShow && _vm.title && _vm.title === _vm.selectedTitle)?_c('div',{staticClass:"wizard-element-container"},[_vm._t("default")],2):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfWizardElementComponent/index.vue?vue&type=template&id=70305e61&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWizardElementComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfWizardElementComponentvue_type_script_lang_js_ = ({
  name: 'jf-wizard-element',
  props: ['dataTitle', 'isSelectedTab', 'isVisibleTab'],
  data: function data() {
    return {
      title: this.dataTitle,
      config: {
        enableNgShow: null
      }
    };
  },
  computed: {
    selectedTitle: function selectedTitle() {
      return this.$parent.active.title;
    }
  },
  mounted: function mounted() {
    var tabProperties = {
      title: this.dataTitle,
      isSelectedTab: this.isSelectedTab,
      isVisibleTab: this.isVisibleTab
    };
    this.$parent.registerTab(tabProperties);
    this.config = this.$parent.config;
  }
});
// CONCATENATED MODULE: ./src/components/JfWizardElementComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfWizardElementComponentvue_type_script_lang_js_ = (JfWizardElementComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfWizardElementComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfWizardElementComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfWizardElementComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfWizardElement.js.map