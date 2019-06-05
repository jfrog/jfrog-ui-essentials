((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[300],{

/***/ "9f7b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var componentPlugins = _interopRequireWildcard(__webpack_require__("7b38"));

var directivePlugins = _interopRequireWildcard(__webpack_require__("ae0d"));

var _plugins = __webpack_require__("0a8d");

var _config = __webpack_require__("eb60");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var install = function install(Vue) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (install.installed) {
    /* istanbul ignore next */
    return;
  }

  install.installed = true; // Configure BootstrapVue

  (0, _config.setConfig)(config); // Register component plugins

  (0, _plugins.registerPlugins)(Vue, componentPlugins); // Register directive plugins

  (0, _plugins.registerPlugins)(Vue, directivePlugins);
};

install.installed = false;
var BootstrapVue = {
  install: install,
  setConfig: _config.setConfig // Auto installation only occurs if window.Vue exists

};
(0, _plugins.vueUse)(BootstrapVue);
var _default = BootstrapVue;
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~b7b6a01e.js.map