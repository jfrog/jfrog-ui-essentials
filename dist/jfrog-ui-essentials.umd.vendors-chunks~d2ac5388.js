((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[348],{

/***/ "6096":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _sourceEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4fd4");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("f07f");



/* harmony default export */ __webpack_exports__["a"] = (function(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = Object(_sourceEvent__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return Object(_point__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(node, touch);
    }
  }

  return null;
});


/***/ }),

/***/ "629f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _sourceEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4fd4");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("f07f");



/* harmony default export */ __webpack_exports__["a"] = (function(node, touches) {
  if (touches == null) touches = Object(_sourceEvent__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = Object(_point__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(node, touches[i]);
  }

  return points;
});


/***/ }),

/***/ "a317":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~d2ac5388.js.map