((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[310],{

/***/ "0add":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
});


/***/ }),

/***/ "db7d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("57f5");


/* harmony default export */ __webpack_exports__["a"] = (function(name) {
  var create = typeof name === "function" ? name : Object(_creator__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
});


/***/ }),

/***/ "f872":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _namespace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6cd4");


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(name, value) {
  var fullname = Object(_namespace__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~bc0cc668.js.map