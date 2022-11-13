((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[52],{

/***/ "50ac":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeCompiledCellComponent/index.vue?vue&type=template&id=d58e0598&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"compile-this"})])}]


// CONCATENATED MODULE: ./src/components/JfTreeCompiledCellComponent/index.vue?vue&type=template&id=d58e0598&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeCompiledCellComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
/* harmony default export */ var JfTreeCompiledCellComponentvue_type_script_lang_js_ = ({
  name: 'jf-tree-compiled-cell',
  props: ['itemId', 'treeItem'],
  'jf@inject': ['$element', '$timeout', '$scope'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var _this = this;

    this.$scope.$watch('compiledCell.treeItem.data', function () {
      _this.compile();
    });
  },
  ng1_legacy: {
    'controllerAs': 'compiledCell'
  },
  methods: {
    compile: function compile() {
      var elem = $(this.$element).find(".compile-this");
      this.treeItem.tree.compileTemplate(elem, this.itemId);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTreeCompiledCellComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTreeCompiledCellComponentvue_type_script_lang_js_ = (JfTreeCompiledCellComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTreeCompiledCellComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTreeCompiledCellComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "d58e0598",
  null
  
)

/* harmony default export */ var JfTreeCompiledCellComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfTreeCompiledCell.js.map