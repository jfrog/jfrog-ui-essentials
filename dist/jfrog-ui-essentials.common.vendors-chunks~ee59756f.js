((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[390],{

/***/ "3baf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _mediaBody = _interopRequireDefault(__webpack_require__("7a5e"));

var _mediaAside = _interopRequireDefault(__webpack_require__("7b63"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  tag: {
    type: String,
    default: 'div'
  },
  rightAlign: {
    type: Boolean,
    default: false
  },
  verticalAlign: {
    type: String,
    default: 'top'
  },
  noBody: {
    type: Boolean,
    default: false
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BMedia',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        children = _ref.children;
    var childNodes = props.noBody ? children : [];
    var $slots = slots();

    if (!props.noBody) {
      if ($slots.aside && !props.rightAlign) {
        childNodes.push(h(_mediaAside.default, {
          staticClass: 'mr-3',
          props: {
            verticalAlign: props.verticalAlign
          }
        }, $slots.aside));
      }

      childNodes.push(h(_mediaBody.default, $slots.default));

      if ($slots.aside && props.rightAlign) {
        childNodes.push(h(_mediaAside.default, {
          staticClass: 'ml-3',
          props: {
            verticalAlign: props.verticalAlign
          }
        }, $slots.aside));
      }
    }

    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'media'
    }), childNodes);
  }
});

exports.default = _default;

/***/ }),

/***/ "7a5e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  tag: {
    type: String,
    default: 'div'
  }
};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BMediaBody',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'media-body'
    }), children);
  }
});

exports.default = _default;

/***/ }),

/***/ "7b63":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = {
  tag: {
    type: String,
    default: 'div'
  },
  verticalAlign: {
    type: String,
    default: 'top'
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BMediaAside',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'd-flex',
      class: _defineProperty({}, "align-self-".concat(props.verticalAlign), props.verticalAlign)
    }), children);
  }
});

exports.default = _default;

/***/ }),

/***/ "d71d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _media = _interopRequireDefault(__webpack_require__("3baf"));

var _mediaAside = _interopRequireDefault(__webpack_require__("7b63"));

var _mediaBody = _interopRequireDefault(__webpack_require__("7a5e"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BMedia: _media.default,
  BMediaAside: _mediaAside.default,
  BMediaBody: _mediaBody.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~ee59756f.js.map