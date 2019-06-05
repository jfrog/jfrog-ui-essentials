((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[284],{

/***/ "1fae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _prefixPropName = _interopRequireDefault(__webpack_require__("e109"));

var _copyProps = _interopRequireDefault(__webpack_require__("0942"));

var _html = __webpack_require__("be11");

var _cardMixin = _interopRequireDefault(__webpack_require__("45f0"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = _objectSpread({}, (0, _copyProps.default)(_cardMixin.default.props, _prefixPropName.default.bind(null, 'header')), {
  header: {
    type: String,
    default: null
  },
  headerHtml: {
    type: String,
    default: null
  },
  headerClass: {
    type: [String, Object, Array],
    default: null
  } // @vue/component

});

exports.props = props;

var _default = _vue.default.extend({
  name: 'BCardHeader',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _ref2;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.headerTag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'card-header',
      class: [props.headerClass, (_ref2 = {}, _defineProperty(_ref2, "bg-".concat(props.headerBgVariant), Boolean(props.headerBgVariant)), _defineProperty(_ref2, "border-".concat(props.headerBorderVariant), Boolean(props.headerBorderVariant)), _defineProperty(_ref2, "text-".concat(props.headerTextVariant), Boolean(props.headerTextVariant)), _ref2)]
    }), children || [h('div', {
      domProps: (0, _html.htmlOrText)(props.headerHtml, props.header)
    })]);
  }
});

exports.default = _default;

/***/ }),

/***/ "23c9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  src: {
    type: String,
    default: null,
    required: true
  },
  alt: {
    type: String,
    default: null
  },
  top: {
    type: Boolean,
    default: false
  },
  bottom: {
    type: Boolean,
    default: false
  },
  left: {
    type: Boolean,
    default: false
  },
  start: {
    type: Boolean,
    default: false // alias of 'left'

  },
  right: {
    type: Boolean,
    default: false
  },
  end: {
    type: Boolean,
    default: false // alias of 'right'

  },
  height: {
    type: String,
    default: null
  },
  width: {
    type: String,
    default: null
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BCardImg',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;
    var baseClass = 'card-img';

    if (props.top) {
      baseClass += '-top';
    } else if (props.right || props.end) {
      baseClass += '-right';
    } else if (props.bottom) {
      baseClass += '-bottom';
    } else if (props.left || props.start) {
      baseClass += '-left';
    }

    return h('img', (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: [baseClass],
      attrs: {
        src: props.src,
        alt: props.alt,
        height: props.height,
        width: props.width
      }
    }));
  }
});

exports.default = _default;

/***/ }),

/***/ "90a3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _imgLazy = _interopRequireWildcard(__webpack_require__("294b"));

var _object = __webpack_require__("24e2");

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copy of `<b-img-lazy>` props, and remove conflicting/non-applicable props
// The `omit()` util creates a new object, so we can just pass the original props
var lazyProps = (0, _object.omit)(_imgLazy.props, ['left', 'right', 'center', 'block', 'rounded', 'thumbnail', 'fluid', 'fluidGrow']);

var props = _objectSpread({}, lazyProps, {
  top: {
    type: Boolean,
    default: false
  },
  bottom: {
    type: Boolean,
    default: false
  },
  left: {
    type: Boolean,
    default: false
  },
  start: {
    type: Boolean,
    default: false // alias of 'left'

  },
  right: {
    type: Boolean,
    default: false
  },
  end: {
    type: Boolean,
    default: false // alias of 'right'

  } // @vue/component

});

exports.props = props;

var _default = _vue.default.extend({
  name: 'BCardImgLazy',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;
    var baseClass = 'card-img';

    if (props.top) {
      baseClass += '-top';
    } else if (props.right || props.end) {
      baseClass += '-right';
    } else if (props.bottom) {
      baseClass += '-bottom';
    } else if (props.left || props.start) {
      baseClass += '-left';
    } // False out the left/center/right props before passing to b-img-lazy


    var lazyProps = _objectSpread({}, props, {
      left: false,
      right: false,
      center: false
    });

    return h(_imgLazy.default, (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: [baseClass],
      props: lazyProps
    }));
  }
});

exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~ad87cc65.js.map