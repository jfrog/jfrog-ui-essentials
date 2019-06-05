((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[9],{

/***/ "6e1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;
// @vue/component
var _default = {
  props: {
    size: {
      type: String,
      default: null
    }
  },
  computed: {
    sizeFormClass: function sizeFormClass() {
      return [this.size ? "form-control-".concat(this.size) : null];
    },
    sizeBtnClass: function sizeBtnClass()
    /* istanbul ignore next: don't think this is used */
    {
      return [this.size ? "btn-".concat(this.size) : null];
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~06f4cc28.js.map