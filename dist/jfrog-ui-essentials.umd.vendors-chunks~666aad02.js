((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[169],{

/***/ "12b6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _lowerFirst = _interopRequireDefault(__webpack_require__("2839"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} prefix
 * @param {string} value
 */
var unprefixPropName = function unprefixPropName(prefix, value) {
  return (0, _lowerFirst.default)(value.replace(prefix, ''));
};

var _default = unprefixPropName;
exports.default = _default;

/***/ }),

/***/ "19fe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _upperFirst = _interopRequireDefault(__webpack_require__("5540"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Suffix can be a falsey value so nothing is appended to string.
 * (helps when looping over props & some shouldn't change)
 * Use data last parameters to allow for currying.
 * @param {string} suffix
 * @param {string} str
 */
var suffixPropName = function suffixPropName(suffix, str) {
  return str + (suffix ? (0, _upperFirst.default)(suffix) : '');
};

var _default = suffixPropName;
exports.default = _default;

/***/ }),

/***/ "2e50":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/*
 * Consistent and stable sort function across JavaScript platforms
 *
 * Inconsistent sorts can cause SSR problems between client and server
 * such as in <b-table> if sortBy is applied to the data on server side render.
 * Chrome and V8 native sorts are inconsistent/unstable
 *
 * This function uses native sort with fallback to index compare when the a and b
 * compare returns 0
 *
 * Algorithm based on:
 * https://stackoverflow.com/questions/1427608/fast-stable-sorting-algorithm-implementation-in-javascript/45422645#45422645
 *
 * @param {array} array to sort
 * @param {function} sort compare function
 * @return {array}
 */
var stableSort = function stableSort(array, compareFn) {
  // Using `.bind(compareFn)` on the wrapped anonymous function improves
  // performance by avoiding the function call setup. We don't use an arrow
  // function here as it binds `this` to the `stableSort` context rather than
  // the `compareFn` context, which wouldn't give us the performance increase.
  return array.map(function (a, index) {
    return [index, a];
  }).sort(function (a, b) {
    return this(a[1], b[1]) || a[0] - b[0];
  }.bind(compareFn)).map(function (e) {
    return e[1];
  });
};

var _default = stableSort;
exports.default = _default;

/***/ }),

/***/ "3098":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/**
 * Converts a string, including strings in camelCase or snake_case, into Start Case (a variant
 * of Title Case where all words start with a capital letter), it keeps original single quote
 * and hyphen in the word.
 *
 * Copyright (c) 2017 Compass (MIT)
 * https://github.com/UrbanCompass/to-start-case
 * @author Zhuoyuan Zhang <https://github.com/drawyan>
 * @author Wei Wang <https://github.com/onlywei>
 *
 *
 *   'management_companies' to 'Management Companies'
 *   'managementCompanies' to 'Management Companies'
 *   `hell's kitchen` to `Hell's Kitchen`
 *   `co-op` to `Co-op`
 *
 * @param {String} str
 * @returns {String}
 */
var startCase = function startCase(str) {
  return str.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, function (str, $1, $2) {
    return $1 + ' ' + $2;
  }).replace(/(\s|^)(\w)/g, function (str, $1, $2) {
    return $1 + $2.toUpperCase();
  });
};

var _default = startCase;
exports.default = _default;

/***/ }),

/***/ "40f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _inspect = __webpack_require__("0d5a");

/**
 * Convert a value to a string that can be rendered.
 */
var toString = function toString(val) {
  var spaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return (0, _inspect.isUndefined)(val) || (0, _inspect.isNull)(val) ? '' : (0, _inspect.isArray)(val) || (0, _inspect.isPlainObject)(val) && val.toString === Object.prototype.toString ? JSON.stringify(val, null, spaces) : String(val);
};

var _default = toString;
exports.default = _default;

/***/ }),

/***/ "5540":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _inspect = __webpack_require__("0d5a");

/**
 * Transform the first character to uppercase
 * @param {string} str
 */
var upperFirst = function upperFirst(str) {
  if (!(0, _inspect.isString)(str)) {
    str = String(str);
  }

  str = str.trim();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var _default = upperFirst;
exports.default = _default;

/***/ }),

/***/ "ac0f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HTMLElement = void 0;

var _env = __webpack_require__("4565");

/**
 * SSR safe types
 */
var w = _env.hasWindowSupport ? window : {};
var HTMLElement = w.HTMLElement || Object;
exports.HTMLElement = HTMLElement;

/***/ }),

/***/ "f347":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.unbindTargets = exports.bindTargets = void 0;

var _object = __webpack_require__("24e2");

var _dom = __webpack_require__("1611");

var allListenTypes = {
  hover: true,
  click: true,
  focus: true
};
var BVBoundListeners = '__BV_boundEventListeners__';

var bindTargets = function bindTargets(vnode, binding, listenTypes, fn) {
  var targets = (0, _object.keys)(binding.modifiers || {}).filter(function (t) {
    return !allListenTypes[t];
  });

  if (binding.value) {
    targets.push(binding.value);
  }

  var listener = function listener() {
    fn({
      targets: targets,
      vnode: vnode
    });
  };

  (0, _object.keys)(allListenTypes).forEach(function (type) {
    if (listenTypes[type] || binding.modifiers[type]) {
      (0, _dom.eventOn)(vnode.elm, type, listener);
      var boundListeners = vnode.elm[BVBoundListeners] || {};
      boundListeners[type] = boundListeners[type] || [];
      boundListeners[type].push(listener);
      vnode.elm[BVBoundListeners] = boundListeners;
    }
  }); // Return the list of targets

  return targets;
};

exports.bindTargets = bindTargets;

var unbindTargets = function unbindTargets(vnode, binding, listenTypes) {
  (0, _object.keys)(allListenTypes).forEach(function (type) {
    if (listenTypes[type] || binding.modifiers[type]) {
      var boundListeners = vnode.elm[BVBoundListeners] && vnode.elm[BVBoundListeners][type];

      if (boundListeners) {
        boundListeners.forEach(function (listener) {
          return (0, _dom.eventOff)(vnode.elm, type, listener);
        });
        delete vnode.elm[BVBoundListeners][type];
      }
    }
  });
};

exports.unbindTargets = unbindTargets;
var _default = bindTargets;
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~666aad02.js.map