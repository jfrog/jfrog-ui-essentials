((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[245],{

/***/ "4565":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports.getNoWarn = exports.getEnv = exports.hasPointerEventSupport = exports.hasTouchSupport = exports.hasPassiveEventSupport = exports.isBrowser = exports.hasMutationObserverSupport = exports.hasPromiseSupport = exports.hasNavigatorSupport = exports.hasDocumentSupport = exports.hasWindowSupport = void 0;

/**
 * Utilities to get information about the current environment
 */
// --- Constants ---
var hasWindowSupport = typeof window !== 'undefined';
exports.hasWindowSupport = hasWindowSupport;
var hasDocumentSupport = typeof document !== 'undefined';
exports.hasDocumentSupport = hasDocumentSupport;
var hasNavigatorSupport = typeof navigator !== 'undefined';
exports.hasNavigatorSupport = hasNavigatorSupport;
var hasPromiseSupport = typeof Promise !== 'undefined';
exports.hasPromiseSupport = hasPromiseSupport;
var hasMutationObserverSupport = typeof MutationObserver !== 'undefined' || typeof WebKitMutationObserver !== 'undefined' || typeof MozMutationObserver !== 'undefined';
exports.hasMutationObserverSupport = hasMutationObserverSupport;
var isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport; // Determine if the browser supports the option passive for events

exports.isBrowser = isBrowser;

var hasPassiveEventSupport = function () {
  var passiveEventSupported = false;

  if (isBrowser) {
    try {
      var options = {
        get passive() {
          // This function will be called when the browser
          // attempts to access the passive property.

          /* istanbul ignore next: will never be called in JSDOM */
          passiveEventSupported = true;
        }

      };
      window.addEventListener('test', options, options);
      window.removeEventListener('test', options, options);
    } catch (err) {
      /* istanbul ignore next: will never be called in JSDOM */
      passiveEventSupported = false;
    }
  }

  return passiveEventSupported;
}();

exports.hasPassiveEventSupport = hasPassiveEventSupport;
var hasTouchSupport = isBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0);
exports.hasTouchSupport = hasTouchSupport;
var hasPointerEventSupport = isBrowser && Boolean(window.PointerEvent || window.MSPointerEvent); // --- Getters ---

exports.hasPointerEventSupport = hasPointerEventSupport;

var getEnv = function getEnv(key) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var env = typeof process !== 'undefined' && process ? Object({"NODE_ENV":"production","BASE_URL":"/"}) || false : {};

  if (!key) {
    /* istanbul ignore next */
    return env;
  }

  return env[key] || fallback;
};

exports.getEnv = getEnv;

var getNoWarn = function getNoWarn() {
  return getEnv('BOOTSTRAP_VUE_NO_WARN');
};

exports.getNoWarn = getNoWarn;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "b0df":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _inspect = __webpack_require__("0d5a");

/**
 * Get property defined by dot/array notation in string.
 *
 * @link https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-1935901
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @param {*} defaultValue (optional)
 * @return {*}
 */
var get = function get(obj, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  // Handle array of path values
  path = (0, _inspect.isArray)(path) ? path.join('.') : path; // If no path or no object passed

  if (!path || !(0, _inspect.isObject)(obj)) {
    return defaultValue;
  } // Handle edge case where user has dot(s) in top-level item field key
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2762


  if (obj.hasOwnProperty(path)) {
    return obj[path];
  } // Handle string array notation (numeric indices only)


  path = String(path).replace(/\[(\d+)]/g, '.$1');
  var steps = path.split('.').filter(Boolean); // Handle case where someone passes a string of only dots

  if (steps.length === 0) {
    return defaultValue;
  } // Traverse path in object to find result


  return steps.every(function (step) {
    return (0, _inspect.isObject)(obj) && obj.hasOwnProperty(step) && (obj = obj[step]) != null;
  }) ? obj : defaultValue;
};

var _default = get;
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~9624602d.js.map