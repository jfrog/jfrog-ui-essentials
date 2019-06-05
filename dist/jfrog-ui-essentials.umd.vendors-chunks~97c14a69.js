((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[250],{

/***/ "6423":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _nav = _interopRequireDefault(__webpack_require__("92e4"));

var _navItem = _interopRequireDefault(__webpack_require__("eee9"));

var _navText = _interopRequireDefault(__webpack_require__("e599"));

var _navForm = _interopRequireDefault(__webpack_require__("a07b"));

var _navItemDropdown = _interopRequireDefault(__webpack_require__("485d"));

var _dropdown = _interopRequireDefault(__webpack_require__("c7b9"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BNav: _nav.default,
  BNavItem: _navItem.default,
  BNavText: _navText.default,
  BNavForm: _navForm.default,
  BNavItemDropdown: _navItemDropdown.default,
  BNavItemDd: _navItemDropdown.default,
  BNavDropdown: _navItemDropdown.default,
  BNavDd: _navItemDropdown.default
};
var plugins = {
  DropdownPlugin: _dropdown.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components,
    plugins: plugins
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~97c14a69.js.map