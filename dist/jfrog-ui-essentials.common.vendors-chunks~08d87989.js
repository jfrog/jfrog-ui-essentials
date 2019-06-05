((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[11],{

/***/ "2c38":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _id = _interopRequireDefault(__webpack_require__("eae0"));

var _form = _interopRequireDefault(__webpack_require__("5f07"));

var _formState = _interopRequireDefault(__webpack_require__("41fb"));

var _formSize = _interopRequireDefault(__webpack_require__("6e1b"));

var _formRadioCheck = _interopRequireDefault(__webpack_require__("4fe1"));

var _looseEqual = _interopRequireDefault(__webpack_require__("96cd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @vue/component
var _default = _vue.default.extend({
  name: 'BFormRadio',
  mixins: [_id.default, _formRadioCheck.default, // Includes shared render function
  _form.default, _formSize.default, _formState.default],
  inject: {
    bvGroup: {
      from: 'bvRadioGroup',
      default: false
    }
  },
  props: {
    checked: {
      // v-model
      type: [String, Object, Number, Boolean],
      default: null
    }
  },
  computed: {
    // Radio Groups can only have a single value, so determining if checked is simple
    is_Checked: function is_Checked() {
      return (0, _looseEqual.default)(this.value, this.computedLocalChecked);
    },
    // Flags for form-radio-check mixin
    is_Radio: function is_Radio() {
      return true;
    },
    is_Check: function is_Check() {
      return false;
    }
  },
  watch: {
    // Radio Groups can only have a single value, so our watchers are simple
    computedLocalChecked: function computedLocalChecked(newVal, oldVal) {
      this.$emit('input', this.computedLocalChecked);
    }
  },
  methods: {
    handleChange: function handleChange(_ref) {
      var checked = _ref.target.checked;
      var value = this.value;
      this.computedLocalChecked = value; // Change is only emitted on user interaction

      this.$emit('change', checked ? value : null); // If this is a child of form-radio-group, we emit a change event on it as well

      if (this.is_Group) {
        this.bvGroup.$emit('change', checked ? value : null);
      }
    }
  }
});

exports.default = _default;

/***/ }),

/***/ "3110":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _formRadio = _interopRequireDefault(__webpack_require__("2c38"));

var _formRadioGroup = _interopRequireDefault(__webpack_require__("679b"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BFormRadio: _formRadio.default,
  BRadio: _formRadio.default,
  BFormRadioGroup: _formRadioGroup.default,
  BRadioGroup: _formRadioGroup.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "679b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _id = _interopRequireDefault(__webpack_require__("eae0"));

var _form = _interopRequireDefault(__webpack_require__("5f07"));

var _formOptions = _interopRequireDefault(__webpack_require__("461c"));

var _formRadioCheckGroup = _interopRequireDefault(__webpack_require__("5c02"));

var _formSize = _interopRequireDefault(__webpack_require__("6e1b"));

var _formState = _interopRequireDefault(__webpack_require__("41fb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  checked: {
    type: [String, Object, Number, Boolean],
    default: null
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BFormRadioGroup',
  mixins: [_id.default, _form.default, _formRadioCheckGroup.default, // Includes render function
  _formOptions.default, _formSize.default, _formState.default],
  provide: function provide() {
    return {
      bvRadioGroup: this
    };
  },
  props: props,
  data: function data() {
    return {
      localChecked: this.checked
    };
  },
  computed: {
    is_RadioGroup: function is_RadioGroup() {
      return true;
    }
  }
});

exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~08d87989.js.map