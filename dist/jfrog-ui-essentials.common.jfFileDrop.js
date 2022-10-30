((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[22],{

/***/ "22ba":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfFileDropComponent/index.vue?vue&type=template&id=7132089a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"wrapper-drop-zone"},[_c('div',{staticClass:"drop-zone",class:{'drop-zone-load': _vm.jfFileUploader.queue.length , 'multiple': _vm.multiple},attrs:{"nv-file-drop":"","uploader":"jfFileUploader","nv-file-over":"","over-class":"drop-zone-hover","disabled":_vm.jfFileDisabled}},[_c('label',{staticClass:"file-input-label"},[(!_vm.jfFileUploader.queue[0].progress && !_vm.multiple)?_c('input',{staticClass:"select-files-hidden",attrs:{"type":"file","nv-file-select":"","uploader":"jfFileUploader","disabled":_vm.jfFileDisabled,"title":" "}}):_vm._e(),(!_vm.anyFileUploadInProgress() && _vm.multiple)?_c('input',{staticClass:"select-files-hidden",attrs:{"type":"file","nv-file-select":"","uploader":"jfFileUploader","disabled":_vm.jfFileDisabled,"title":" ","multiple":""}}):_vm._e(),(_vm.multiple || !_vm.jfFileUploader.queue.length)?_c('div',[_c('span',[_vm._v("Drop file")]),_vm._v(" here or "),_c('span',[_vm._v("Select file")])]):_vm._e(),(!_vm.multiple && _vm.jfFileUploader.queue.length && (!_vm.jfFileUploader.queue[0].progress || !_vm.showProgressBar))?_c('div',{staticClass:"drop-zone-file-name"},[_vm._v(_vm._s(_vm.jfFileUploader.queue[0].file.name))]):_vm._e(),(!_vm.multiple && _vm.showProgressBar)?_c('div',_vm._l((_vm.jfFileUploader.queue),function(item){return _c('div',[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.jfFileUploader.isHTML5 && item.progress),expression:"jfFileUploader.isHTML5 && item.progress"}],staticClass:"file-upload-progress file-info"},[_c('div',{staticClass:"progress-file-drop"},[_c('div',{staticClass:"progress"},[_c('div',{staticClass:"progress-bar",style:({ 'width': item.progress + '%' }),attrs:{"role":"progressbar"}})])])])])}),0):_vm._e()]),(_vm.multiple)?_c('div',{staticClass:"upload-files-frame"},[_c('ul',_vm._l((_vm.jfFileUploader.queue),function(item){return _c('li',{staticClass:"upload-item"},[_c('jf-checkbox',{directives:[{name:"show",rawName:"v-show",value:(item.hasCheckbox),expression:"item.hasCheckbox"},{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:( _vm.checkboxesName ),expression:" checkboxesName ",modifiers:{"bind":true}}],staticClass:"file-selection pull-left"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.isCheckboxChecked),expression:"item.isCheckboxChecked"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(item.isCheckboxChecked)?_vm._i(item.isCheckboxChecked,null)>-1:(item.isCheckboxChecked)},on:{"input":function($event){return item.onCheckboxChange(item)},"change":function($event){var $$a=item.isCheckboxChecked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(item, "isCheckboxChecked", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(item, "isCheckboxChecked", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(item, "isCheckboxChecked", $$c)}}}})]),_c('span',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:( item.file.name ),expression:" item.file.name ",modifiers:{"bind":true}}],staticClass:"file-name-deploy-multi"},[_vm._v(_vm._s(item.file.name))]),_c('a',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip",value:('Remove'),expression:"'Remove'"}],staticClass:"icon icon-clear pull-right item-remove",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();item.remove(); _vm.multiUploadItemRemoved(); _vm.removeItemCallback(item)}}})],1)}),0)]):_vm._e()])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfFileDropComponent/index.vue?vue&type=template&id=7132089a&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfFileDropComponent/index.vue?vue&type=script&lang=js&
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
/* harmony default export */ var JfFileDropComponentvue_type_script_lang_js_ = ({
  name: 'jf-file-drop',
  props: ['jfFileUploader', 'jfFileDisabled', 'showProgressBar', 'multiple', 'checkboxesName'],
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./src/components/JfFileDropComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfFileDropComponentvue_type_script_lang_js_ = (JfFileDropComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfFileDropComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfFileDropComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "7132089a",
  null
  
)

/* harmony default export */ var JfFileDropComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfFileDrop.js.map