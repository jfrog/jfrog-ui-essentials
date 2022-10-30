((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[4],{

/***/ "877b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  bind: function bind(el) {
    $(el).attr('readonly', true);

    var removeAttr = function removeAttr() {
      $(el).attr('readonly', false);
      $(el).off('focus', removeAttr);
    };

    $(el).on('focus', removeAttr);
  }
});

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.JfFakeReadonlyDirective.js.map