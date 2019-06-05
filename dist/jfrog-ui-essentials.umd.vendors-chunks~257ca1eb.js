((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[62],{

/***/ "256b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _modal = _interopRequireDefault(__webpack_require__("3a5b"));

var _bvModal = _interopRequireDefault(__webpack_require__("b7af"));

var _modal2 = _interopRequireDefault(__webpack_require__("f429"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BModal: _modal.default
};
var directives = {
  BModal: _modal2.default
};

var _install = (0, _plugins.installFactory)({
  components: components,
  directives: directives
});

var _default = {
  install: function install(Vue) {
    // Inject `$bvModal` into Vue prototype
    (0, _bvModal.default)(Vue); // Install component and directive

    _install(Vue);
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~257ca1eb.js.map