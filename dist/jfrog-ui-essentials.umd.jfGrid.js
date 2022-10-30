((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[24],{

/***/ "ef33":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridComponent/index.vue?vue&type=template&id=4274c67c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.gridOptions.data)?_c('div',{staticClass:"grid-container",class:{'single-select':_vm.gridOptions.allowSingleSelect},style:({overflow: _vm.gridOptions.moreActionsController.isDropdownOpen ? 'visible' : 'hidden'})},[(_vm.gridOptions.columnsCustomization)?_c('div',{staticClass:"columns-customization pull-right"},[_c('jf-multi-dropdown',{attrs:{"title":"Columns","filter-placeholder":"Filter Columns","items":_vm.gridOptions.availableColumns,"on-change":"gridOptions.updateCustomizedColumns()"}})],1):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.noPagination || !_vm.noCount || _vm.gridOptions.batchActions.length || _vm.filterField),expression:"!noPagination || !noCount || gridOptions.batchActions.length || filterField"}],staticClass:"wrapper-grid-actions"},[_c('div',{staticClass:"counter-and-filter"},[(!_vm.noCount)?_c('div',{staticClass:"grid-counter"},[_vm._v(_vm._s(_vm.getTotalRecords())),(_vm.getSelectedRecords())?_c('span',[_vm._v(" ("+_vm._s(_vm.getSelectedRecords())+" Selected)")]):_vm._e()]):_vm._e(),(_vm.filterField)?_c('div',{staticClass:"filter-group"},[_c('jf-grid-filter',{attrs:{"auto-focus":_vm.autoFocus,"filter-grid":"gridOptions","filter-field":_vm.filterField,"filter-field2":_vm.filterField2,"filter-on-change":_vm.filterOnChange}})],1):_vm._e()]),_c('jf-grid-pagination',{directives:[{name:"show",rawName:"v-show",value:(!_vm.noPagination),expression:"!noPagination"}],staticClass:"pull-right",attrs:{"grid-api":_vm.gridOptions.api}}),_c('jf-grid-batch-actions',{attrs:{"grid-options":_vm.gridOptions,"grid-api":_vm.gridOptions.api,"actions":_vm.gridOptions.batchActions}})],1),_c('div',{directives:[{name:"ui-grid-draggable-rows",rawName:"v-ui-grid-draggable-rows",value:(''),expression:"''"}],staticClass:"grid",style:({visibility: _vm.gridOptions.columnDefs.length ? 'visible' : 'hidden'}),attrs:{"ui-grid":"gridOptions","ui-grid-selection":"","ui-grid-pagination":"","ui-grid-grouping":"","ui-grid-edit":"","ui-grid-resize-columns":""}})]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfGridComponent/index.vue?vue&type=template&id=4274c67c&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridComponent/index.vue?vue&type=script&lang=js&
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
/* harmony default export */ var JfGridComponentvue_type_script_lang_js_ = ({
  name: 'jf-grid',
  props: ['gridOptions', 'filterField', 'filterField2', 'filterOnChange', 'autoFocus', 'objectName'],
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./src/components/JfGridComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfGridComponentvue_type_script_lang_js_ = (JfGridComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfGridComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfGridComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "4274c67c",
  null
  
)

/* harmony default export */ var JfGridComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfGrid.js.map