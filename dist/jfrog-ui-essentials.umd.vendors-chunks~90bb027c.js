((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[238],{

/***/ "11ab":
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
  switches: {
    // Custom switch styling
    type: Boolean,
    default: false
  },
  checked: {
    type: [String, Number, Object, Array, Boolean],
    default: null
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BFormCheckboxGroup',
  mixins: [_id.default, _form.default, _formRadioCheckGroup.default, // Includes render function
  _formOptions.default, _formSize.default, _formState.default],
  provide: function provide() {
    return {
      bvCheckGroup: this
    };
  },
  props: props,
  data: function data() {
    return {
      localChecked: this.checked || []
    };
  },
  computed: {
    is_RadioGroup: function is_RadioGroup() {
      return false;
    }
  }
});

exports.default = _default;

/***/ }),

/***/ "a60a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _formFile = _interopRequireDefault(__webpack_require__("07b5"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BFormFile: _formFile.default,
  BFile: _formFile.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "bdb1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _looseEqual = _interopRequireDefault(__webpack_require__("96cd"));

var _looseIndexOf = _interopRequireDefault(__webpack_require__("2d8d"));

var _inspect = __webpack_require__("0d5a");

var _form = _interopRequireDefault(__webpack_require__("5f07"));

var _formRadioCheck = _interopRequireDefault(__webpack_require__("4fe1"));

var _formSize = _interopRequireDefault(__webpack_require__("6e1b"));

var _formState = _interopRequireDefault(__webpack_require__("41fb"));

var _id = _interopRequireDefault(__webpack_require__("eae0"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @vue/component
var _default = _vue.default.extend({
  name: 'BFormCheckbox',
  mixins: [_formRadioCheck.default, // Includes shared render function
  _id.default, _form.default, _formSize.default, _formState.default],
  inject: {
    bvGroup: {
      from: 'bvCheckGroup',
      default: false
    }
  },
  props: {
    value: {
      // type: [Object, Boolean],
      default: true
    },
    uncheckedValue: {
      // type: [Object, Boolean],
      // Not applicable in multi-check mode
      default: false
    },
    indeterminate: {
      // Not applicable in multi-check mode
      type: Boolean,
      default: false
    },
    switch: {
      // Custom switch styling
      type: Boolean,
      default: false
    },
    checked: {
      // v-model
      type: [String, Number, Object, Array, Boolean],
      default: null
    }
  },
  computed: {
    is_Checked: function is_Checked() {
      var checked = this.computedLocalChecked;
      var value = this.value;

      if ((0, _inspect.isArray)(checked)) {
        return (0, _looseIndexOf.default)(checked, value) > -1;
      } else {
        return (0, _looseEqual.default)(checked, value);
      }
    },
    is_Radio: function is_Radio() {
      return false;
    },
    is_Check: function is_Check() {
      return true;
    }
  },
  watch: {
    computedLocalChecked: function computedLocalChecked(newVal, oldVal) {
      this.$emit('input', newVal);

      if (this.$refs && this.$refs.input) {
        this.$emit('update:indeterminate', this.$refs.input.indeterminate);
      }
    },
    indeterminate: function indeterminate(newVal, oldVal) {
      this.setIndeterminate(newVal);
    }
  },
  mounted: function mounted() {
    // Set initial indeterminate state
    this.setIndeterminate(this.indeterminate);
  },
  methods: {
    handleChange: function handleChange(_ref) {
      var _ref$target = _ref.target,
          checked = _ref$target.checked,
          indeterminate = _ref$target.indeterminate;
      var localChecked = this.computedLocalChecked;
      var value = this.value;
      var isArr = (0, _inspect.isArray)(localChecked);
      var uncheckedValue = isArr ? null : this.uncheckedValue; // Update computedLocalChecked

      if (isArr) {
        var idx = (0, _looseIndexOf.default)(localChecked, value);

        if (checked && idx < 0) {
          // Add value to array
          localChecked = localChecked.concat(value);
        } else if (!checked && idx > -1) {
          // Remove value from array
          localChecked = localChecked.slice(0, idx).concat(localChecked.slice(idx + 1));
        }
      } else {
        localChecked = checked ? value : uncheckedValue;
      }

      this.computedLocalChecked = localChecked; // Change is only emitted on user interaction

      this.$emit('change', checked ? value : uncheckedValue); // If this is a child of form-checkbox-group, we emit a change event on it as well

      if (this.is_Group) {
        this.bvGroup.$emit('change', localChecked);
      }

      this.$emit('update:indeterminate', indeterminate);
    },
    setIndeterminate: function setIndeterminate(state) {
      // Indeterminate only supported in single checkbox mode
      if ((0, _inspect.isArray)(this.computedLocalChecked)) {
        state = false;
      }

      if (this.$refs && this.$refs.input) {
        this.$refs.input.indeterminate = state; // Emit update event to prop

        this.$emit('update:indeterminate', state);
      }
    }
  }
});

exports.default = _default;

/***/ }),

/***/ "efe3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _formCheckbox = _interopRequireDefault(__webpack_require__("bdb1"));

var _formCheckboxGroup = _interopRequireDefault(__webpack_require__("11ab"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BFormCheckbox: _formCheckbox.default,
  BCheckbox: _formCheckbox.default,
  BCheck: _formCheckbox.default,
  BFormCheckboxGroup: _formCheckboxGroup.default,
  BCheckboxGroup: _formCheckboxGroup.default,
  BCheckGroup: _formCheckboxGroup.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~90bb027c.js.map