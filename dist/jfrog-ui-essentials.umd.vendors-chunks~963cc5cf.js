((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[246],{

/***/ "1520":
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
  },
  fluid: {
    type: Boolean,
    default: false
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BContainer',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: {
        container: !props.fluid,
        'container-fluid': props.fluid
      }
    }), children);
  }
});

exports.default = _default;

/***/ }),

/***/ "1665":
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
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BFormRow',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'form-row'
    }), children);
  }
});

exports.default = _default;

/***/ }),

/***/ "7d02":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _memoize = _interopRequireDefault(__webpack_require__("64bb"));

var _suffixPropName = _interopRequireDefault(__webpack_require__("19fe"));

var _array = __webpack_require__("bb2f");

var _inspect = __webpack_require__("0d5a");

var _object = __webpack_require__("24e2");

var _config = __webpack_require__("eb60");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Generates a prop object with a type of
 * [Boolean, String, Number]
 */
function boolStrNum() {
  return {
    type: [Boolean, String, Number],
    default: false
  };
}
/**
 * Generates a prop object with a type of
 * [String, Number]
 */


function strNum() {
  return {
    type: [String, Number],
    default: null
  };
} // Memoized function for better performance on generating class names


var computeBkPtClass = (0, _memoize.default)(function computeBkPt(type, breakpoint, val) {
  var className = type;

  if ((0, _inspect.isUndefined)(val) || (0, _inspect.isNull)(val) || val === false) {
    return undefined;
  }

  if (breakpoint) {
    className += "-".concat(breakpoint);
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <b-col sm></b-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase();
  } // .order-md-6


  className += "-".concat(val);
  return className.toLowerCase();
}); // Cached copy of the breakpoint prop names

var breakpointPropMap = (0, _object.create)(null); // Lazy evaled props factory for BCol

var generateProps = function generateProps() {
  // Grab the breakpoints from the cached config (exclude the '' (xs) breakpoint)
  var breakpoints = (0, _config.getBreakpointsUpCached)().filter(Boolean); // Supports classes like: .col-sm, .col-md-6, .col-lg-auto

  var breakpointCol = breakpoints.reduce(function (propMap, breakpoint) {
    if (breakpoint) {
      // We filter out the '' breakpoint (xs), as making a prop name ''
      // would not work. The `cols` prop is used for `xs`
      propMap[breakpoint] = boolStrNum();
    }

    return propMap;
  }, (0, _object.create)(null)); // Supports classes like: .offset-md-1, .offset-lg-12

  var breakpointOffset = breakpoints.reduce(function (propMap, breakpoint) {
    propMap[(0, _suffixPropName.default)(breakpoint, 'offset')] = strNum();
    return propMap;
  }, (0, _object.create)(null)); // Supports classes like: .order-md-1, .order-lg-12

  var breakpointOrder = breakpoints.reduce(function (propMap, breakpoint) {
    propMap[(0, _suffixPropName.default)(breakpoint, 'order')] = strNum();
    return propMap;
  }, (0, _object.create)(null)); // For loop doesn't need to check hasOwnProperty
  // when using an object created from null

  breakpointPropMap = (0, _object.assign)((0, _object.create)(null), {
    col: (0, _object.keys)(breakpointCol),
    offset: (0, _object.keys)(breakpointOffset),
    order: (0, _object.keys)(breakpointOrder)
  }); // Return the generated props

  return _objectSpread({
    // Generic flexbox .col (xs)
    col: {
      type: Boolean,
      default: false
    },
    // .col-[1-12]|auto  (xs)
    cols: strNum()
  }, breakpointCol, {
    offset: strNum()
  }, breakpointOffset, {
    order: strNum()
  }, breakpointOrder, {
    // Flex alignment
    alignSelf: {
      type: String,
      default: null,
      validator: function validator(str) {
        return (0, _array.arrayIncludes)(['auto', 'start', 'end', 'center', 'baseline', 'stretch'], str);
      }
    },
    tag: {
      type: String,
      default: 'div'
    }
  });
}; // We do not use Vue.extend here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component


var _default = {
  name: 'BCol',
  functional: true,

  get props() {
    // Allow props to be lazy evaled on first access and
    // then they become a non-getter afterwards.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
    delete this.props; // eslint-disable-next-line no-return-assign

    return this.props = generateProps();
  },

  render: function render(h, _ref) {
    var _classList$push;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var classList = []; // Loop through `col`, `offset`, `order` breakpoint props

    for (var type in breakpointPropMap) {
      // Returns colSm, offset, offsetSm, orderMd, etc.
      var _keys = breakpointPropMap[type];

      for (var i = 0; i < _keys.length; i++) {
        // computeBkPt(col, colSm => Sm, value=[String, Number, Boolean])
        var c = computeBkPtClass(type, _keys[i].replace(type, ''), props[_keys[i]]); // If a class is returned, push it onto the array.

        if (c) {
          classList.push(c);
        }
      }
    }

    var hasColClasses = classList.some(function (className) {
      return /^col-/.test(className);
    });
    classList.push((_classList$push = {
      // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
      col: props.col || !hasColClasses && !props.cols
    }, _defineProperty(_classList$push, "col-".concat(props.cols), props.cols), _defineProperty(_classList$push, "offset-".concat(props.offset), props.offset), _defineProperty(_classList$push, "order-".concat(props.order), props.order), _defineProperty(_classList$push, "align-self-".concat(props.alignSelf), props.alignSelf), _classList$push));
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: classList
    }), children);
  }
};
exports.default = _default;

/***/ }),

/***/ "9d37":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _container = _interopRequireDefault(__webpack_require__("1520"));

var _row = _interopRequireDefault(__webpack_require__("5d69"));

var _col = _interopRequireDefault(__webpack_require__("7d02"));

var _formRow = _interopRequireDefault(__webpack_require__("1665"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BContainer: _container.default,
  BRow: _row.default,
  BCol: _col.default,
  BFormRow: _formRow.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~963cc5cf.js.map