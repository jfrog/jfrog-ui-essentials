((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[18],{

/***/ "23d4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragDropPaginationComponent/index.vue?vue&type=template&id=6582108b&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.paginationApi.getTotalPages())?_c('div',{staticClass:"grid-pagination text-right grid-pagination-wrap",staticStyle:{"border":"none"}},[_c('p',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pageViewModel),expression:"pageViewModel"}],staticClass:"grid-page-box",style:({'width': (_vm.CONSTANTS.PAGINATION_DIGIT_WIDTH_PX + _vm.paginationApi.getTotalPages().toString().length * _vm.CONSTANTS.PAGINATION_DIGIT_WIDTH_PX) + 'px'}),attrs:{"type":"text","jf-tooltip":"Jump to Page"},domProps:{"value":(_vm.pageViewModel)},on:{"blur":function($event){return _vm.onBlur()},"input":[function($event){if($event.target.composing){ return; }_vm.pageViewModel=$event.target.value},_vm.pageChanged]}}),_vm._v("\n            out of "+_vm._s(_vm.paginationApi.getTotalPages())+"\n            "),_c('a',{class:{disabled: _vm.currentPage === 1},attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.prevPage()}}},[_vm._v("‹")]),_c('a',{class:{disabled: _vm.currentPage === _vm.paginationApi.getTotalPages()},attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.nextPage()}}},[_vm._v("›")])])]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDragDropPaginationComponent/index.vue?vue&type=template&id=6582108b&

// EXTERNAL MODULE: ./node_modules/lodash/extend.js
var extend = __webpack_require__("cdd8");
var extend_default = /*#__PURE__*/__webpack_require__.n(extend);

// EXTERNAL MODULE: ./src/constants/general.constants.js
var general_constants = __webpack_require__("e56d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragDropPaginationComponent/index.vue?vue&type=script&lang=js&
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
//


/* harmony default export */ var JfDragDropPaginationComponentvue_type_script_lang_js_ = ({
  name: 'jf-drag-drop-pagination',
  props: ['paginationApi'],
  data: function data() {
    return {
      pageViewModel: 1,
      currentPage: this.paginationApi && this.paginationApi.currentPage ? this.paginationApi.currentPage : 0
    };
  },
  created: function created() {
    this.CONSTANTS = extend_default()({
      PAGINATION_DIGIT_WIDTH_PX: null
    }, general_constants["a" /* GENERAL_CONSTANTS */]);
  },
  mounted: function mounted() {
    var _this = this;

    if (this.paginationApi) {
      this.currentPage = this.paginationApi.getCurrentPage();
      this.pageViewModel = this.currentPage;
      this.paginationApi.registerChangeListener(function (pageNum) {
        _this.currentPage = pageNum;
        _this.pageViewModel = _this.currentPage;
      });
    }
  },
  methods: {
    onBlur: function onBlur() {
      this.pageViewModel = parseInt(this.pageViewModel);

      if (!this.pageViewModel || isNaN(this.pageViewModel)) {
        this.pageViewModel = this.currentPage;
      }
    },
    pageChanged: function pageChanged() {
      var parsedPageNumber = parseInt(this.pageViewModel);

      if (isNaN(parsedPageNumber)) {
        return;
      }

      this.pageViewModel = parsedPageNumber;

      if (this.pageViewModel !== 0 && !this.pageViewModel) {
        return;
      }

      this.currentPage = this.pageViewModel;
      if (this.currentPage < 1) this.currentPage = 1;
      if (this.currentPage > this.paginationApi.getTotalPages()) this.currentPage = this.paginationApi.getTotalPages();
      this.pageViewModel = this.currentPage;
      this.paginationApi.setPage(this.currentPage);
    },
    nextPage: function nextPage() {
      this.paginationApi.nextPage();
      this.pageViewModel = this.currentPage = this.paginationApi.getCurrentPage();
    },
    prevPage: function prevPage() {
      this.paginationApi.prevPage();
      this.pageViewModel = this.currentPage = this.paginationApi.getCurrentPage();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDragDropPaginationComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDragDropPaginationComponentvue_type_script_lang_js_ = (JfDragDropPaginationComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfDragDropPaginationComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfDragDropPaginationComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfDragDropPaginationComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "e56d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GENERAL_CONSTANTS; });
var GENERAL_CONSTANTS = {
  PAGINATION_DIGIT_WIDTH_PX: 8
};

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfDragDropPagination.js.map