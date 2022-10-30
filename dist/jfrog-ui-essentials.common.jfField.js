((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[21],{

/***/ "271b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7e763e16_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("65c1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7e763e16_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7e763e16_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "65c1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "94d4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfFieldComponent/index.vue?vue&type=template&id=7e763e16&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-field",class:{'sticky-errors': _vm.dontPushDownErrors}},[_c('div',{class:{'input-label': _vm.animated}},[_c('validation-provider',{attrs:{"rules":_vm.inferredRules,"events":['input', 'focus'],"name":_vm.validationDomain},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var errors = ref.errors;
return _c('div',{},[_c('div',{class:{invalid: errors.length && !_vm.focused}},[_vm._t("default")],2),(errors.length && !_vm.focused)?_c('div',{staticClass:"field-validation-error"},_vm._l((errors),function(error){return _c('div',{staticClass:"jf-validation"},[_vm._v("\n                            "+_vm._s(error)+"\n                        ")])}),0):_vm._e()])}}],null,true)})],1)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfFieldComponent/index.vue?vue&type=template&id=7e763e16&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/vee-validate/dist/vee-validate.esm.js
var vee_validate_esm = __webpack_require__("7bb1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfFieldComponent/index.vue?vue&type=script&lang=js&






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

/* harmony default export */ var JfFieldComponentvue_type_script_lang_js_ = ({
  name: 'jf-field',
  components: {
    ValidationProvider: vee_validate_esm["a" /* ValidationProvider */]
  },
  'jf@inject': ['JFrogEventBus', 'JFrogUILibConfig', '$timeout', '$rootScope', '$scope'],
  props: ['animated', 'validations', 'validationRules', 'customValidations', 'validationsParams', 'autofocus', 'invalidateOnSubmit', 'alwaysShowErrors', 'dontValidateDisabled', 'delayedInit', 'dontPushDownErrors'],
  data: function data() {
    return {
      focused: false,
      inferredRules: '',
      formField: null,
      inputElement: null,
      inputName: '',
      validationDomain: this.validations || 'common'
    };
  },
  mounted: function mounted() {
    this.inputElement = this.$element.find('input');

    if (!this.inputElement.length) {
      this.inputElement = this.$element.find('textarea');
    }

    if (this.inputElement.length) {
      this.inputName = this.inputElement[0].attributes['name'] ? this.inputElement[0].attributes['name'].value : '';
      this.formField = this.$element.parents('form')[0].attributes['name'] ? window[this.$element.parents('form')[0].attributes['name'].value][this.inputName] : null;
      this.inferRules();
      this.init();
    }
  },
  methods: {
    init: function init() {
      var _this = this;

      var EVENTS = this.JFrogEventBus.getEventsDefinition();

      var init = function init() {
        if (_this.formField) _this.formField.initialValue = true;

        _this.$scope.$watch(function () {
          return _this.autofocus;
        }, function () {
          return _this.focusInput();
        });

        _this.JFrogEventBus.registerOnScope(_this.$scope, EVENTS.FORM_SUBMITTED, _this._onFormSubmitted);

        _this.JFrogEventBus.registerOnScope(_this.$scope, EVENTS.FORM_CLEAR_FIELD_VALIDATION, function (force) {
          _this._onBlur(force);

          if (_this.formField) _this.formField.preventShowErrors = true;
        });

        _this.$scope.$on('$destroy', function () {
          _this.inputElement.off('blur');

          _this.inputElement.off('keyup');

          _this.inputElement.off('keydown');

          _this.inputElement.off('focus');
        });

        _this.inputElement.on('keydown', function () {
          return _this._onKeyDown();
        });

        if (!_this.invalidateOnSubmit && _this.validationDomain) {
          _this.inputElement.on('blur', function () {
            return _this._onBlur();
          });

          _this.inputElement.on('keyup', function () {
            return _this._onKeyUp();
          });
        }

        if (_this.invalidateOnSubmit || _this.validationDomain) {
          _this.inputElement.on('focus', function () {
            return _this._onFocus();
          });
        }

        if (_this.dontValidateDisabled) {
          _this.$rootScope.$watch(function () {
            return _this.inputElement[0].disabled;
          }, function () {
            return _this._onDisabledChanged(_this.inputElement[0].disabled);
          });
        }

        _this.focusInput();
      };

      if (this.delayedInit) {
        this.$timeout(function () {
          return init();
        });
      } else {
        init();
      }
    },
    focusInput: function focusInput() {
      var _this2 = this;

      if (this.autofocus && this.autofocus != 'false') {
        if (this.formField) {
          this.formField.isAutoFocused = true;
          this.formField.isAutoFocusedFlag = true;
        }

        this.$timeout(function () {
          if (_this2.inputElement.scrollParent && _this2.inputElement.scrollParent()) {
            var y = _this2.inputElement.scrollParent().scrollTop();

            _this2.inputElement.focus();

            _this2.inputElement.scrollParent().scrollTop(y);
          } else {
            _this2.inputElement.focus();
          }
        });
      }
    },
    _onDisabledChanged: function _onDisabledChanged(disabled) {
      if (disabled) {
        this.formField.showErrors = false;
      } else {
        this.formField.showErrors = true;
      }
    },
    _onFormSubmitted: function _onFormSubmitted(formName) {
      if (!formName || this.form.$name === formName && !this.formField.$valid) {
        if (this.formField) this.formField.showErrors = true;
      } else {
        if (this.formField) this.formField.showErrors = false;
      }
    },
    _onBlur: function _onBlur(force) {
      var _this3 = this;

      this.focused = false;
      this.$timeout(function () {
        if (_this3.formField) {
          if (force) {
            _this3.formField.showErrors = false;
          } else if (!_this3.formField.preventShowErrors) {
            _this3.formField.showErrors = true;
          }
        }
      });

      if (this.formField && this.formField.isAutoFocused) {
        if (!this.formField.isAutoFocusedFlag) {
          this.formField.isAutoFocused = false;
          this.formField.showErrors = true;
        } else {
          this.formField.isAutoFocusedFlag = false;
        }
      }
    },
    _onFocus: function _onFocus() {
      var _this4 = this;

      this.focused = true;
      this.$timeout(function () {
        if (_this4.formField) {
          _this4.formField.showErrors = false;
          _this4.formField.preventShowErrors = false;
        }
      });
    },
    _onKeyDown: function _onKeyDown() {
      if (this.formField) {
        this.formField.initialValue = false;
        this.formField.isAutoFocusedFlag = false;
      }
    },
    _onKeyUp: function _onKeyUp() {
      var value = this.inputElement.val();

      if (value !== null && value !== undefined && value !== '') {
        this.inputElement.addClass('hascontent');
      } else {
        this.inputElement.removeClass('hascontent');
      }
    },
    inferRules: function inferRules() {
      var rules = {};
      var attrs = this.inputElement[0].attributes;
      if (attrs.required) rules.required = true;

      if (attrs.type) {
        if (attrs.type.value === 'email') rules.email = true;else if (attrs.type.value === 'url') rules.url = true;else if (attrs.type.value === 'number') rules.decimal = true;else if (attrs.type.value === 'date') rules.date_format = 'YYYY-MM-DD';else if (attrs.type.value === 'datetime-local') rules.date_format = 'YYYY-MM-DDThh:mm';else if (attrs.type.value === 'time') rules.date_format = 'YYYY-Www';else if (attrs.type.value === 'week') rules.date_format = 'hh:mm';else if (attrs.type.value === 'month') rules.date_format = 'YYYY-MM';
      }

      if (attrs.min) rules.min_value = attrs.min.value;
      if (attrs.max) rules.max_value = attrs.max.value;
      if (attrs.pattern) rules.regex = attrs.pattern.value;

      if (this.customValidations) {
        rules.customValidations = this.customValidations;
        Object.keys(this.customValidations).forEach(function (key) {
          rules[key] = true;
        });
      }

      if (this.validationRules) {
        if (_.isObject(this.validationRules)) {
          _.extend(rules, this.validationRules);
        } else {
          if (_.isString(this.validationRules)) {
            var strParts = this.validationRules.split('|').map(function (p) {
              return _.trim(p);
            });
            strParts.forEach(function (part) {
              var key = part.split(':')[0];
              var val = part.substr(key.length);
              rules[key] = val;
            });
          }
        }
      }

      this.inferredRules = rules;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfFieldComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfFieldComponentvue_type_script_lang_js_ = (JfFieldComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfFieldComponent/index.vue?vue&type=style&index=0&id=7e763e16&scoped=true&lang=less&
var JfFieldComponentvue_type_style_index_0_id_7e763e16_scoped_true_lang_less_ = __webpack_require__("271b");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfFieldComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfFieldComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "7e763e16",
  null
  
)

/* harmony default export */ var JfFieldComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfField.js.map