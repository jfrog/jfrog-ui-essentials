((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[116],{

/***/ "742c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export days */
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18e2");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1738");



var day = Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationMinute */ "c"]) / _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationDay */ "a"];
}, function(date) {
  return date.getDate() - 1;
});

/* harmony default export */ __webpack_exports__["a"] = (day);
var days = day.range;


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~45c7a13e.js.map