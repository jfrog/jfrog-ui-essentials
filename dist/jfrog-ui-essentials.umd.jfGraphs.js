((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[23],{

/***/ "634b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGraphsComponent/index.vue?vue&type=template&id=1efe7132&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"chart"})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfGraphsComponent/index.vue?vue&type=template&id=1efe7132&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/billboard.js/dist/billboard.js
var billboard = __webpack_require__("21aa");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGraphsComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//


__webpack_require__("ea80");

/* harmony default export */ var JfGraphsComponentvue_type_script_lang_js_ = ({
  name: 'jf-graphs',
  props: ['hideSearch', 'options'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    this._generate();
  },
  methods: {
    _generate: function _generate() {
      var _this = this;

      if (this.chart) {
        this.chart.destroy();
      }
      /* Polyfill for IE 11 which doesnt support Object.assign */


      if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, 'assign', {
          value: function assign(target, varArgs) {
            // .length of function is 2
            'use strict';

            if (target == null) {
              // TypeError if undefined or null
              throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
              var nextSource = arguments[index];

              if (nextSource != null) {
                // Skip over if undefined or null
                for (var nextKey in nextSource) {
                  // Avoid bugs when hasOwnProperty is shadowed
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                  }
                }
              }
            }

            return to;
          },
          writable: true,
          configurable: true
        });
      }
      /* End Polyfill for IE 11 which doesnt support Object.assign */


      this.chart = billboard["bb"].generate(Object.assign({
        bindto: this.$refs.chart
      }, this.options));
      window.addEventListener('onorientationchange', function () {
        _this.chart.resize();
      });
    }
  },
  updated: function updated() {
    if (this.chart) {
      this._generate();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfGraphsComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfGraphsComponentvue_type_script_lang_js_ = (JfGraphsComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfGraphsComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfGraphsComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "1efe7132",
  null
  
)

/* harmony default export */ var JfGraphsComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfGraphs.js.map