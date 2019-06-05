((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[219],{

/***/ "377c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;
// @vue/component
var _default = {
  props: {
    plain: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    custom: function custom() {
      return !this.plain;
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "461c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _html = __webpack_require__("be11");

var _inspect = __webpack_require__("0d5a");

var _object = __webpack_require__("24e2");

// @vue/component
var _default2 = {
  props: {
    options: {
      type: [Array, Object],
      default: function _default() {
        return [];
      }
    },
    valueField: {
      type: String,
      default: 'value'
    },
    textField: {
      type: String,
      default: 'text'
    },
    htmlField: {
      type: String,
      default: 'html'
    },
    disabledField: {
      type: String,
      default: 'disabled'
    }
  },
  computed: {
    formOptions: function formOptions() {
      var options = this.options;
      var valueField = this.valueField;
      var textField = this.textField;
      var htmlField = this.htmlField;
      var disabledField = this.disabledField;

      if ((0, _inspect.isArray)(options)) {
        // Normalize flat-ish arrays to Array of Objects
        return options.map(function (option) {
          if ((0, _inspect.isPlainObject)(option)) {
            var value = option[valueField];
            var text = String(option[textField]);
            return {
              value: (0, _inspect.isUndefined)(value) ? text : value,
              text: (0, _html.stripTags)(text),
              html: option[htmlField],
              disabled: Boolean(option[disabledField])
            };
          }

          return {
            value: option,
            text: (0, _html.stripTags)(String(option)),
            disabled: false
          };
        });
      } else {
        // options is Object
        // Normalize Objects to Array of Objects
        return (0, _object.keys)(options).map(function (key) {
          var option = options[key] || {};

          if ((0, _inspect.isPlainObject)(option)) {
            var value = option[valueField];
            var text = option[textField];
            return {
              value: (0, _inspect.isUndefined)(value) ? key : value,
              text: (0, _inspect.isUndefined)(text) ? (0, _html.stripTags)(String(key)) : (0, _html.stripTags)(String(text)),
              html: option[htmlField],
              disabled: Boolean(option[disabledField])
            };
          }

          return {
            value: key,
            text: (0, _html.stripTags)(String(option)),
            disabled: false
          };
        });
      }
    }
  }
};
exports.default = _default2;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~86f69a8a.js.map