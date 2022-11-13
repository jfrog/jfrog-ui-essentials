((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[53],{

/***/ "8d1b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeIndentationComponent/index.vue?vue&type=template&id=c56d0cf0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-tree-indentation"},[_c('div',{staticClass:"indentation-wrap",style:({width: (_vm.indentation ? _vm.indentation.length * 26 : 0) + 'px'})},[(_vm.visible)?_c('div',{staticClass:"indentation-flex-wrap",domProps:{"innerHTML":_vm._s(_vm.indentationHtml)}}):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTreeIndentationComponent/index.vue?vue&type=template&id=c56d0cf0&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeIndentationComponent/index.vue?vue&type=script&lang=js&

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
/* harmony default export */ var JfTreeIndentationComponentvue_type_script_lang_js_ = ({
  name: 'jf-tree-indentation',
  props: ['indentation', 'height', 'visible', 'linesBackgrounds'],
  'jf@inject': [],
  data: function data() {
    return {
      indentationHtml: null
    };
  },
  created: function created() {
    var _this = this;

    this.$watch('jfTreeIndentation.indentation', function () {
      if (!_this.indentation) return; // Build the inner html for the units here in js, it is much faster than using ng-repeat

      var indentationHtml = '';

      var htmlForIndentation = function htmlForIndentation(indentation) {
        if (_this.linesBackgrounds[indentation.background]) {
          return "<div class=\"indentation-unit\" style=\"height: ".concat(_this.height, "; background-image: url('").concat(_this.linesBackgrounds[indentation.background], "')\"></div>");
        } else {
          return "<div class=\"indentation-unit\" style=\"height: ".concat(_this.height, ";\"></div>");
        }
      };

      _this.indentation.forEach(function (indentation) {
        indentationHtml += htmlForIndentation(indentation);
      });

      _this.indentationHtml = indentationHtml;
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfTreeIndentation'
  }
});
// CONCATENATED MODULE: ./src/components/JfTreeIndentationComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTreeIndentationComponentvue_type_script_lang_js_ = (JfTreeIndentationComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTreeIndentationComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTreeIndentationComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "c56d0cf0",
  null
  
)

/* harmony default export */ var JfTreeIndentationComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfTreeIndentation.js.map