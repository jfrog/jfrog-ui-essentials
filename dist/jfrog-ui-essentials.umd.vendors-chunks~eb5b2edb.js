((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[384],{

/***/ "2d14":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("8bbf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Single point of contact for Vue
//
// TODO:
//   Conditionally import Vue if no global Vue
//
var _default = _vue.default;
exports.default = _default;

/***/ }),

/***/ "93e0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.warnNoMutationObserverSupport = exports.warnNoPromiseSupport = exports.warnNotClient = void 0;

var _env = __webpack_require__("4565");

/**
 * Log a warning message to the console with BootstrapVue formatting
 * @param {string} message
 */
var warn = function warn(message)
/* istanbul ignore next */
{
  if (!(0, _env.getNoWarn)()) {
    console.warn("[BootstrapVue warn]: ".concat(message));
  }
};
/**
 * Warn when no Promise support is given
 * @param {string} source
 * @returns {boolean} warned
 */


var warnNotClient = function warnNotClient(source) {
  /* istanbul ignore else */
  if (_env.isBrowser) {
    return false;
  } else {
    warn("".concat(source, ": Can not be called during SSR."));
    return true;
  }
};
/**
 * Warn when no Promise support is given
 * @param {string} source
 * @returns {boolean} warned
 */


exports.warnNotClient = warnNotClient;

var warnNoPromiseSupport = function warnNoPromiseSupport(source) {
  /* istanbul ignore else */
  if (_env.hasPromiseSupport) {
    return false;
  } else {
    warn("".concat(source, ": Requires Promise support."));
    return true;
  }
};
/**
 * Warn when no MutationObserver support is given
 * @param {string} source
 * @returns {boolean} warned
 */


exports.warnNoPromiseSupport = warnNoPromiseSupport;

var warnNoMutationObserverSupport = function warnNoMutationObserverSupport(source) {
  /* istanbul ignore else */
  if (_env.hasMutationObserverSupport) {
    return false;
  } else {
    warn("".concat(source, ": Requires MutationObserver support."));
    return true;
  }
}; // Default export


exports.warnNoMutationObserverSupport = warnNoMutationObserverSupport;
var _default = warn;
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~eb5b2edb.js.map