((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[30],{

/***/ "714c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b57a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1959c82d_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("714c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1959c82d_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1959c82d_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "fae4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfListMakerComponent/index.vue?vue&type=template&id=1959c82d&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-list-maker"},[(!_vm.hideAddNewFields)?_c('div',{staticClass:"list-new-value",class:{dropdown: _vm.predefinedValues}},[_c('div',[_c('jf-field',{attrs:{"validations":"common","dont-push-down-errors":true,"delayed-init":true}},[(_vm.label)?_c('label',[_vm._v(_vm._s(_vm.label))]):_vm._e(),(_vm.helpTooltip)?_c('jf-help-tooltip',{attrs:{"html":_vm.helpTooltip}}):_vm._e(),((_vm.inputType || 'text')==='checkbox'&&(!_vm.predefinedValues))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newValue),expression:"newValue"}],staticClass:"input-text",attrs:{"placeholder":_vm.derivedPlaceHolder,"id":'newValueField-' + _vm.int_listId,"name":"newValueField","disabled":_vm.disabled,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.newValue)?_vm._i(_vm.newValue,null)>-1:(_vm.newValue)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.addValue($event)},"input":function($event){_vm.errorMessage=null},"change":function($event){var $$a=_vm.newValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.newValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.newValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.newValue=$$c}}}}):((_vm.inputType || 'text')==='radio'&&(!_vm.predefinedValues))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newValue),expression:"newValue"}],staticClass:"input-text",attrs:{"placeholder":_vm.derivedPlaceHolder,"id":'newValueField-' + _vm.int_listId,"name":"newValueField","disabled":_vm.disabled,"type":"radio"},domProps:{"checked":_vm._q(_vm.newValue,null)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.addValue($event)},"input":function($event){_vm.errorMessage=null},"change":function($event){_vm.newValue=null}}}):(!_vm.predefinedValues)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newValue),expression:"newValue"}],staticClass:"input-text",attrs:{"placeholder":_vm.derivedPlaceHolder,"id":'newValueField-' + _vm.int_listId,"name":"newValueField","disabled":_vm.disabled,"type":_vm.inputType || 'text'},domProps:{"value":(_vm.newValue)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.addValue($event)},"input":[function($event){if($event.target.composing){ return; }_vm.newValue=$event.target.value},function($event){_vm.errorMessage=null}]}}):_vm._e(),(_vm.predefinedValues)?_c('jf-ui-select',{attrs:{"jf-select-placeholder":_vm.derivedPlaceHolder,"jf-select-disabled":_vm.disabled,"jf-select-options":_vm.predefinedValues},model:{value:(_vm.newValue),callback:function ($$v) {_vm.newValue=$$v},expression:"newValue"}}):_vm._e()],1)],1),_c('div',{staticClass:"list-new-value-button"},[_c('i',{staticClass:"icon icon-plus-sign",attrs:{"disabled":_vm.addingNotAllowed},on:{"click":_vm.addValue}})])]):_vm._e(),(_vm.errorMessage)?_c('div',{staticClass:"jf-validation"},[_vm._v(_vm._s(_vm.errorMessage))]):_vm._e(),(_vm.int_values.length)?_c('div',{staticClass:"list-maker-list",attrs:{"id":_vm.int_listId}},_vm._l((_vm.int_values),function(value,index){return _c('div',{key:index,staticClass:"list-maker-list-row"},[_c('div',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],staticClass:"list-maker-row-value"},[_vm._v(_vm._s(value))]),_c('div',{staticClass:"list-maker-list-buttons"},[(_vm.int_values.length > _vm.int_minLength && !_vm.disabled)?_c('a',{staticClass:"icon icon-close",attrs:{"href":"","disabled":_vm.disabled},on:{"click":function($event){$event.preventDefault();return _vm.removeValue(index)}}}):_vm._e()])])}),0):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfListMakerComponent/index.vue?vue&type=template&id=1959c82d&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("75fc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__("3b2b");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfListMakerComponent/index.vue?vue&type=script&lang=js&


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
//
//
//
//

/* harmony default export */ var JfListMakerComponentvue_type_script_lang_js_ = ({
  name: 'jf-list-maker',
  props: ['value', 'label', 'helpTooltip', 'objectName', 'disabled', 'noSort', 'minLength', 'inputType', 'predefinedValues', 'placeholder', 'listId', 'hideAddNewFields', 'validationRegex', 'validationRegexMessage', 'caseInsensitive'],
  data: function data() {
    return {
      newValue: "",
      errorMessage: null,
      derivedPlaceHolder: this.placeholder || "New ".concat(this.objectName || "Value"),
      // The three variables below are being added to avoid mutating the prop
      int_listId: this.listId,
      int_noSort: this.noSort || false,
      int_minLength: this.minLength || 0
    };
  },
  watch: {
    listId: function listId(changedValue) {
      this.int_listId = changedValue;
    },
    noSort: function noSort(changedValue) {
      this.int_noSort = changedValue;
    }
  },
  computed: {
    addingNotAllowed: function addingNotAllowed() {
      return this.disabled || !this.newValue || !this.newValue.length;
    },
    int_values: function int_values() {
      var int_values = this.value || [];
      this.int_noSort = this.noSort || this.$attrs.hasOwnProperty('noSort');

      if (int_values && !this.int_noSort) {
        int_values = Object(lodash["sortBy"])(int_values);
      }

      return int_values;
    }
  },
  mounted: function mounted() {
    if (!this.int_listId) {
      var randomId = Math.floor(1000000000 * Math.random());
      this.int_listId = 'list-id-' + randomId;
    }
  },
  methods: {
    addValue: function addValue() {
      if (this.addingNotAllowed) {
        return;
      }

      this.errorMessage = null;

      if (Object(lodash["isEmpty"])(this.newValue.trim())) {
        this.errorMessage = 'Must input value';
      } else if (!this._isValueUnique(this.newValue)) {
        this.errorMessage = 'Value already exists';
      } else if (!Object(lodash["isEmpty"])(this.validationRegex) && !new RegExp(this.validationRegex).test(this.newValue)) {
        this.errorMessage = Object(lodash["isEmpty"])(this.validationRegexMessage) ? 'Value not valid' : this.validationRegexMessage;
      } else {
        this.$emit('on-add-value', {
          newValue: this.newValue
        });
        this.int_values.push(this.newValue);
        this.newValue = "";
        this.$emit('on-after-add-value');
      }

      var returnValue = this.int_values;

      if (!this.int_noSort) {
        returnValue = Object(lodash["sortBy"])(returnValue);
      }

      this.$emit('input', returnValue);
    },
    removeValue: function removeValue(index) {
      var copyOfValues = Object(toConsumableArray["a" /* default */])(this.int_values);

      copyOfValues.splice(index, 1);
      this.$emit('input', copyOfValues);
      this.$emit('on-after-delete-value');
    },
    _isValueUnique: function _isValueUnique(text) {
      if (this.caseInsensitive) {
        return !this.int_values || !Object(lodash["find"])(this.int_values, function (val) {
          return val.toLowerCase() === text.toLowerCase();
        });
      }

      return !this.int_values || this.int_values.indexOf(text) == -1;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfListMakerComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfListMakerComponentvue_type_script_lang_js_ = (JfListMakerComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfListMakerComponent/index.vue?vue&type=style&index=0&id=1959c82d&scoped=true&lang=less&
var JfListMakerComponentvue_type_style_index_0_id_1959c82d_scoped_true_lang_less_ = __webpack_require__("b57a");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfListMakerComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfListMakerComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "1959c82d",
  null
  
)

/* harmony default export */ var JfListMakerComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfListMaker.js.map