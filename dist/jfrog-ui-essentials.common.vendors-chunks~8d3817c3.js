((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[234],{

/***/ "92e4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// -- Constants --
var DEPRECATED_MSG = 'Setting prop "is-nav-bar" is deprecated. Use the <b-navbar-nav> component instead.';
var props = {
  tag: {
    type: String,
    default: 'ul'
  },
  fill: {
    type: Boolean,
    default: false
  },
  justified: {
    type: Boolean,
    default: false
  },
  align: {
    type: String,
    default: null
  },
  tabs: {
    type: Boolean,
    default: false
  },
  pills: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  isNavBar: {
    type: Boolean,
    default: false,
    // `deprecated` -> Don't use this prop
    // `deprecation` -> Refers to a change in prop usage
    deprecated: DEPRECATED_MSG
  } // -- Utils --

};
exports.props = props;

var computeJustifyContent = function computeJustifyContent(value) {
  // Normalize value
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value;
  return "justify-content-".concat(value);
}; // @vue/component


var _default = _vue.default.extend({
  name: 'BNav',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: (_class = {
        nav: !props.isNavBar,
        'navbar-nav': props.isNavBar,
        'nav-tabs': props.tabs && !props.isNavBar,
        'nav-pills': props.pills && !props.isNavBar,
        'flex-column': props.vertical && !props.isNavBar,
        'nav-fill': !props.vertical && props.fill,
        'nav-justified': !props.vertical && props.justified
      }, _defineProperty(_class, computeJustifyContent(props.align), !props.vertical && props.align), _defineProperty(_class, "small", props.small), _class)
    }), children);
  }
});

exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~8d3817c3.js.map