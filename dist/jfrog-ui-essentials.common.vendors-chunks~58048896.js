((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[145],{

/***/ "68d9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aed6");


function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? _schedule__WEBPACK_IMPORTED_MODULE_0__[/* init */ "g"] : _schedule__WEBPACK_IMPORTED_MODULE_0__[/* set */ "h"];
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? Object(_schedule__WEBPACK_IMPORTED_MODULE_0__[/* get */ "f"])(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~58048896.js.map