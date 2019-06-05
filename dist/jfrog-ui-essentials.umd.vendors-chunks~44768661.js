((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[113],{

/***/ "076e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _spinner = _interopRequireDefault(__webpack_require__("9c6f"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BSpinner: _spinner.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "9c6f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @vue/component
var _default = _vue.default.extend({
  name: 'BSpinner',
  functional: true,
  props: {
    type: {
      type: String,
      default: 'border' // SCSS currently supports 'border' or 'grow'

    },
    label: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    small: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'status'
    },
    tag: {
      type: String,
      default: 'span'
    }
  },
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;
    var label = h(false);
    var hasLabel = slots().label || props.label;

    if (hasLabel) {
      label = h('span', {
        staticClass: 'sr-only'
      }, hasLabel);
    }

    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      attrs: {
        role: hasLabel ? props.role || 'status' : null,
        'aria-hidden': hasLabel ? null : 'true'
      },
      class: (_class = {}, _defineProperty(_class, "spinner-".concat(props.type), Boolean(props.type)), _defineProperty(_class, "spinner-".concat(props.type, "-sm"), props.small), _defineProperty(_class, "text-".concat(props.variant), Boolean(props.variant)), _class)
    }), [label]);
  }
});

exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~44768661.js.map