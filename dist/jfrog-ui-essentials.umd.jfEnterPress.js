((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[20],{

/***/ "bf97":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfEnterPressComponent/index.vue?vue&type=template&id=36ead2c6&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfEnterPressComponent/index.vue?vue&type=template&id=36ead2c6&scoped=true&

// CONCATENATED MODULE: ./src/constants/keys.constants.js
/* harmony default export */ var keys_constants = ({
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  HOTKEYS: {
    ALPHANUMERIC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_'
  },
  PROPERTY_TYPE: {
    MULTI_SELECT: null,
    SINGLE_SELECT: 1,
    ANY_VALUE: 0
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfEnterPressComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* ---------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------- */
// No need for this component being converted. Simply use -
//   <input v-on:keyup.enter="callback">

/* ---------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------- */

/* harmony default export */ var JfEnterPressComponentvue_type_script_lang_js_ = ({
  name: 'jf-enter-press',
  'jf@inject': ['$element', '$scope'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var _this = this;

    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    this.$element.on('keypress', function (e) {
      return _this._onKeyPress(e);
    });
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

    this.$scope.$on('$destroy', function () {
      return _this.$element.off('keypress');
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfEnterPress'
  },
  methods: {
    _onKeyPress: function _onKeyPress(e) {
      if (e.keyCode != keys_constants.ENTER) return;
      e.preventDefault();
      this.$emit('callback');
      if (!this.$scope.$phase) this.$scope.$apply();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfEnterPressComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfEnterPressComponentvue_type_script_lang_js_ = (JfEnterPressComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfEnterPressComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfEnterPressComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "36ead2c6",
  null
  
)

/* harmony default export */ var JfEnterPressComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfEnterPress.js.map