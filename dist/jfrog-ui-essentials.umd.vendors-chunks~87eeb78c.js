((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[223],{

/***/ "4230":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function empty() {
  return [];
}

/* harmony default export */ __webpack_exports__["a"] = (function(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
});


/***/ }),

/***/ "4fd4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _selection_on__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0165");


/* harmony default export */ __webpack_exports__["a"] = (function() {
  var current = _selection_on__WEBPACK_IMPORTED_MODULE_0__[/* event */ "c"], source;
  while (source = current.sourceEvent) current = source;
  return current;
});


/***/ }),

/***/ "6fd3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function none() {}

/* harmony default export */ __webpack_exports__["a"] = (function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~87eeb78c.js.map