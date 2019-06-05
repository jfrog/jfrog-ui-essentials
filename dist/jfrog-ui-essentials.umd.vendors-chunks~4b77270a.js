((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[123],{

/***/ "32ec":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _embed = _interopRequireDefault(__webpack_require__("cc37"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BEmbed: _embed.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "cc37":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _array = __webpack_require__("bb2f");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = {
  type: {
    type: String,
    default: 'iframe',
    validator: function validator(str) {
      return (0, _array.arrayIncludes)(['iframe', 'embed', 'video', 'object', 'img', 'b-img', 'b-img-lazy'], str);
    }
  },
  tag: {
    type: String,
    default: 'div'
  },
  aspect: {
    type: String,
    default: '16by9'
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BEmbed',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, {
      ref: data.ref,
      staticClass: 'embed-responsive',
      class: _defineProperty({}, "embed-responsive-".concat(props.aspect), Boolean(props.aspect))
    }, [h(props.type, (0, _vueFunctionalDataMerge.mergeData)(data, {
      ref: '',
      staticClass: 'embed-responsive-item'
    }), children)]);
  }
});

exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~4b77270a.js.map