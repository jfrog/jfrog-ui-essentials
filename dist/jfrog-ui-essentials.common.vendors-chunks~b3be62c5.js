((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[295],{

/***/ "4216":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _id = _interopRequireDefault(__webpack_require__("eae0"));

var _form = _interopRequireDefault(__webpack_require__("5f07"));

var _formSize = _interopRequireDefault(__webpack_require__("6e1b"));

var _formState = _interopRequireDefault(__webpack_require__("41fb"));

var _formText = _interopRequireDefault(__webpack_require__("c01c"));

var _formSelection = _interopRequireDefault(__webpack_require__("10fc"));

var _formValidity = _interopRequireDefault(__webpack_require__("b965"));

var _array = __webpack_require__("bb2f");

var _dom = __webpack_require__("1611");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Valid supported input types
var TYPES = ['text', 'password', 'email', 'number', 'url', 'tel', 'search', 'range', 'color', 'date', 'time', 'datetime', 'datetime-local', 'month', 'week']; // @vue/component

var _default = _vue.default.extend({
  name: 'BFormInput',
  mixins: [_id.default, _form.default, _formSize.default, _formState.default, _formText.default, _formSelection.default, _formValidity.default],
  props: {
    // value prop defined in form-text mixin
    // value: { },
    type: {
      type: String,
      default: 'text',
      validator: function validator(type) {
        return (0, _array.arrayIncludes)(TYPES, type);
      }
    },
    noWheel: {
      // Disable mousewheel to prevent wheel from changing values (i.e. number/date).
      type: Boolean,
      default: false
    },
    min: {
      type: [String, Number],
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    step: {
      type: [String, Number],
      default: null
    },
    list: {
      type: String,
      default: null
    }
  },
  computed: {
    localType: function localType() {
      // We only allow certain types
      return (0, _array.arrayIncludes)(TYPES, this.type) ? this.type : 'text';
    }
  },
  watch: {
    noWheel: function noWheel(newVal) {
      this.setWheelStopper(newVal);
    }
  },
  mounted: function mounted() {
    this.setWheelStopper(this.noWheel);
  },
  deactivated: function deactivated() {
    // Turn off listeners when keep-alive component deactivated

    /* istanbul ignore next */
    this.setWheelStopper(false);
  },
  activated: function activated() {
    // Turn on listeners (if no-wheel) when keep-alive component activated

    /* istanbul ignore next */
    this.setWheelStopper(this.noWheel);
  },
  beforeDestroy: function beforeDestroy() {
    /* istanbul ignore next */
    this.setWheelStopper(false);
  },
  methods: {
    setWheelStopper: function setWheelStopper(on) {
      var input = this.$el; // We use native events, so that we don't interfere with propgation

      if (on) {
        (0, _dom.eventOn)(input, 'focus', this.onWheelFocus);
        (0, _dom.eventOn)(input, 'blur', this.onWheelBlur);
      } else {
        (0, _dom.eventOff)(input, 'focus', this.onWheelFocus);
        (0, _dom.eventOff)(input, 'blur', this.onWheelBlur);
        (0, _dom.eventOff)(document, 'wheel', this.stopWheel);
      }
    },
    onWheelFocus: function onWheelFocus(evt) {
      (0, _dom.eventOn)(document, 'wheel', this.stopWheel);
    },
    onWheelBlur: function onWheelBlur(evt) {
      (0, _dom.eventOff)(document, 'wheel', this.stopWheel);
    },
    stopWheel: function stopWheel(evt) {
      evt.preventDefault();
      this.$el.blur();
    }
  },
  render: function render(h) {
    var self = this;
    return h('input', {
      ref: 'input',
      class: self.computedClass,
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: self.localValue,
        expression: 'localValue'
      }],
      attrs: {
        id: self.safeId(),
        name: self.name,
        form: self.form || null,
        type: self.localType,
        disabled: self.disabled,
        placeholder: self.placeholder,
        required: self.required,
        autocomplete: self.autocomplete || null,
        readonly: self.readonly || self.plaintext,
        min: self.min,
        max: self.max,
        step: self.step,
        list: self.localType !== 'password' ? self.list : null,
        'aria-required': self.required ? 'true' : null,
        'aria-invalid': self.computedAriaInvalid
      },
      domProps: {
        value: self.localValue
      },
      on: _objectSpread({}, self.$listeners, {
        input: self.onInput,
        change: self.onChange,
        blur: self.onBlur
      })
    });
  }
});

exports.default = _default;

/***/ }),

/***/ "7a5c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _formGroup = _interopRequireDefault(__webpack_require__("d239"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BFormGroup: _formGroup.default,
  BFormFieldset: _formGroup.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "b407":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _formInput = _interopRequireDefault(__webpack_require__("4216"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BFormInput: _formInput.default,
  BInput: _formInput.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~b3be62c5.js.map