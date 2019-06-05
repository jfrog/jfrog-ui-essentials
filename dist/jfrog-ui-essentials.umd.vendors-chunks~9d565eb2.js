((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[258],{

/***/ "06e4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/*
 * Key Codes (events)
 */
var KEY_CODES = {
  SPACE: 32,
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  PAGEUP: 33,
  PAGEDOWN: 34,
  HOME: 36,
  END: 35,
  TAB: 9,
  SHIFT: 16,
  CTRL: 17,
  BACKSPACE: 8,
  ALT: 18,
  PAUSE: 19,
  BREAK: 19,
  INSERT: 45,
  INS: 45,
  DELETE: 46
};
var _default = KEY_CODES;
exports.default = _default;

/***/ }),

/***/ "0d5a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isPromise = exports.isRegExp = exports.isDate = exports.isPrimitive = exports.isNumber = exports.isString = exports.isBoolean = exports.isFunction = exports.isNull = exports.isUndefined = exports.toRawTypeLC = exports.toRawType = exports.toType = void 0;

var _array = __webpack_require__("bb2f");

exports.isArray = _array.isArray;

var _object = __webpack_require__("24e2");

exports.isObject = _object.isObject;
exports.isPlainObject = _object.isPlainObject;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var toType = function toType(val) {
  return _typeof(val);
};

exports.toType = toType;

var toRawType = function toRawType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};

exports.toRawType = toRawType;

var toRawTypeLC = function toRawTypeLC(val) {
  return toRawType(val).toLowerCase();
};

exports.toRawTypeLC = toRawTypeLC;

var isUndefined = function isUndefined(val) {
  return val === undefined;
};

exports.isUndefined = isUndefined;

var isNull = function isNull(val) {
  return val === null;
};

exports.isNull = isNull;

var isFunction = function isFunction(val) {
  return toType(val) === 'function';
};

exports.isFunction = isFunction;

var isBoolean = function isBoolean(val) {
  return toType(val) === 'boolean';
};

exports.isBoolean = isBoolean;

var isString = function isString(val) {
  return toType(val) === 'string';
};

exports.isString = isString;

var isNumber = function isNumber(val) {
  return toType(val) === 'number';
};

exports.isNumber = isNumber;

var isPrimitive = function isPrimitive(val) {
  return isBoolean(val) || isString(val) || isNumber(val);
};

exports.isPrimitive = isPrimitive;

var isDate = function isDate(val) {
  return val instanceof Date;
};

exports.isDate = isDate;

var isRegExp = function isRegExp(val) {
  return toRawType(val) === 'RegExp';
};

exports.isRegExp = isRegExp;

var isPromise = function isPromise(val) {
  return !isUndefined(val) && !isNull(val) && isFunction(val.then) && isFunction(val.catch);
}; // Extra convenience named re-exports


exports.isPromise = isPromise;

/***/ }),

/***/ "2839":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/**
 * @param {string} str
 */
var lowerFirst = function lowerFirst(str) {
  str = String(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
};

var _default = lowerFirst;
exports.default = _default;

/***/ }),

/***/ "2d8d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _looseEqual = _interopRequireDefault(__webpack_require__("96cd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var looseIndexOf = function looseIndexOf(arr, val) {
  // Assumes that the first argument is an array
  for (var i = 0; i < arr.length; i++) {
    if ((0, _looseEqual.default)(arr[i], val)) {
      return i;
    }
  }

  return -1;
};

var _default = looseIndexOf;
exports.default = _default;

/***/ }),

/***/ "64bb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _object = __webpack_require__("24e2");

var memoize = function memoize(fn) {
  var cache = (0, _object.create)(null);
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var argsKey = JSON.stringify(args);
    return cache[argsKey] = cache[argsKey] || fn.apply(null, args);
  };
};

var _default = memoize;
exports.default = _default;

/***/ }),

/***/ "96cd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _object = __webpack_require__("24e2");

var _inspect = __webpack_require__("0d5a");

// Assumes both a and b are arrays!
// Handles when arrays are "sparse" (array.every(...) doesn't handle sparse)
var compareArrays = function compareArrays(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  var equal = true;

  for (var i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }

  return equal;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 * Returns boolean true or false
 */


var looseEqual = function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var aValidType = (0, _inspect.isDate)(a);
  var bValidType = (0, _inspect.isDate)(b);

  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }

  aValidType = (0, _inspect.isArray)(a);
  bValidType = (0, _inspect.isArray)(b);

  if (aValidType || bValidType) {
    return aValidType && bValidType ? compareArrays(a, b) : false;
  }

  aValidType = (0, _inspect.isObject)(a);
  bValidType = (0, _inspect.isObject)(b);

  if (aValidType || bValidType) {
    /* istanbul ignore if: this if will probably never be called */
    if (!aValidType || !bValidType) {
      return false;
    }

    var aKeysCount = (0, _object.keys)(a).length;
    var bKeysCount = (0, _object.keys)(b).length;

    if (aKeysCount !== bKeysCount) {
      return false;
    }

    for (var key in a) {
      var aHasKey = a.hasOwnProperty(key);
      var bHasKey = b.hasOwnProperty(key);

      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }

  return String(a) === String(b);
};

var _default = looseEqual;
exports.default = _default;

/***/ }),

/***/ "9de7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _inspect = __webpack_require__("0d5a");

/**
 * Returns vNodes for named slot either scoped or unscoped
 *
 * @param {String} name
 * @param {String} scope
 * @param {Object} scopedSlots
 * @param {Object} slots
 * @returns {Array|undefined} vNodes
 */
var normalizeSlot = function normalizeSlot(name) {
  var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var $scopedSlots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var $slots = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // Note: in Vue 2.6.x, all names slots are also scoped slots
  var slot = $scopedSlots[name] || $slots[name];
  return (0, _inspect.isFunction)(slot) ? slot(scope) : slot;
};

var _default = normalizeSlot;
exports.default = _default;

/***/ }),

/***/ "be11":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.htmlOrText = exports.stripTags = void 0;
var stripTagsRegex = /(<([^>]+)>)/gi; // Removes any thing that looks like an HTML tag from the supplied string

var stripTags = function stripTags() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(text).replace(stripTagsRegex, '');
}; // Generate a domProps object for either innerHTML, textContent or nothing


exports.stripTags = stripTags;

var htmlOrText = function htmlOrText(innerHTML, textContent) {
  return innerHTML ? {
    innerHTML: innerHTML
  } : textContent ? {
    textContent: textContent
  } : {};
};

exports.htmlOrText = htmlOrText;

/***/ }),

/***/ "cab0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var noop = function noop() {};

var _default = noop;
exports.default = _default;

/***/ }),

/***/ "fccc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var identity = function identity(x) {
  return x;
};

var _default = identity;
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~9d565eb2.js.map