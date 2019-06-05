((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[52],{

/***/ "886b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _config = __webpack_require__("eb60");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAME = 'BCardSubTitle';
var props = {
  subTitle: {
    type: String,
    default: ''
  },
  subTitleTag: {
    type: String,
    default: 'h6'
  },
  subTitleTextVariant: {
    type: String,
    default: function _default() {
      return String((0, _config.getComponentConfig)(NAME, 'subTitleTextVariant') || '') || null;
    }
  } // @vue/component

};
exports.props = props;

var _default2 = _vue.default.extend({
  name: NAME,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.subTitleTag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'card-subtitle',
      class: [props.subTitleTextVariant ? "text-".concat(props.subTitleTextVariant) : null]
    }), children || props.subTitle);
  }
});

exports.default = _default2;

/***/ }),

/***/ "aafb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  textTag: {
    type: String,
    default: 'p'
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BCardText',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.textTag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'card-text'
    }), children);
  }
});

exports.default = _default;

/***/ }),

/***/ "cf89":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  title: {
    type: String,
    default: ''
  },
  titleTag: {
    type: String,
    default: 'h4'
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BCardTitle',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.titleTag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'card-title'
    }), children || props.title);
  }
});

exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~1f5bd912.js.map