((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[58],{

/***/ "6fef":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWizardComponent/index.vue?vue&type=template&id=41a27d94&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-wizard"},[_c('div',{staticClass:"jf-wizard-container"},[_c('div',{staticClass:"wizard-bar"},[_c('ul',_vm._l((_vm.tabs),function(tab,index){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.isVisible(tab)),expression:"isVisible(tab)"}],key:index,class:{'active': _vm.active.title === tab.title}},[_c('a',{attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm._switch(tab)}}},[_vm._v(_vm._s(tab.title))])])}),0)]),_c('div',{staticClass:"wizard-content"},[_vm._t("default")],2)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfWizardComponent/index.vue?vue&type=template&id=41a27d94&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/lodash/find.js
var find = __webpack_require__("2769");
var find_default = /*#__PURE__*/__webpack_require__.n(find);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWizardComponent/index.vue?vue&type=script&lang=js&

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

/* harmony default export */ var JfWizardComponentvue_type_script_lang_js_ = ({
  name: 'jf-wizard',
  props: ['config'],
  'jf@inject': ['JFrogEventBus', 'JFrogUIUtils', '$scope'],
  data: function data() {
    return {
      tabs: [],
      active: {
        title: null
      }
    };
  },
  created: function created() {
    var _this = this;

    this.JFrogEventBus.registerOnScope(this.$scope, this.JFrogEventBus.getEventsDefinition().WIZARD_TAB_CHANGE, function (tab) {
      _this._switch(tab);
    });
    this.init = true;
  },
  methods: {
    registerTab: function registerTab(tab) {
      if (this.init || tab.isSelectedTab) {
        this.active = tab;
        this.init = false;
      }

      this.tabs.push(tab);
    },
    _switch: function _switch(tab) {
      this.$element.find('.wizard-content').scrollTop(0);
      this.active = typeof tab === 'string' ? find_default()(this.tabs, function (t) {
        return t.title === tab;
      }) : tab;
      this.$emit('on-tab-switch', {
        tab: this.active.title
      });
      this.JFrogUIUtils.fireResizeEvent();
    },
    isVisible: function isVisible(tab) {
      return typeof tab.isVisibleTab == "undefined" || typeof tab.isVisibleTab == "boolean" && !!tab.isVisibleTab || typeof tab.isVisibleTab === 'function' && tab.isVisibleTab(); //isVisible is a function and its output is truthy
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfWizardComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfWizardComponentvue_type_script_lang_js_ = (JfWizardComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfWizardComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfWizardComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfWizardComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfWizard.js.map