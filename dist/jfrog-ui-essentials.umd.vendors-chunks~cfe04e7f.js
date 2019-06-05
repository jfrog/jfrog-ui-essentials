((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[345],{

/***/ "789b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return powish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return sqrt; });
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("548a");
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e981");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d48c");




function transformPow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function powish(transform) {
  var scale = transform(_continuous__WEBPACK_IMPORTED_MODULE_1__[/* identity */ "c"], _continuous__WEBPACK_IMPORTED_MODULE_1__[/* identity */ "c"]),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(_continuous__WEBPACK_IMPORTED_MODULE_1__[/* identity */ "c"], _continuous__WEBPACK_IMPORTED_MODULE_1__[/* identity */ "c"])
        : exponent === 0.5 ? transform(transformSqrt, transformSquare)
        : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return Object(_linear__WEBPACK_IMPORTED_MODULE_0__[/* linearish */ "b"])(scale);
}

function pow() {
  var scale = powish(Object(_continuous__WEBPACK_IMPORTED_MODULE_1__[/* transformer */ "d"])());

  scale.copy = function() {
    return Object(_continuous__WEBPACK_IMPORTED_MODULE_1__[/* copy */ "a"])(scale, pow()).exponent(scale.exponent());
  };

  _init__WEBPACK_IMPORTED_MODULE_2__[/* initRange */ "b"].apply(scale, arguments);

  return scale;
}

function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}


/***/ }),

/***/ "df19":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return implicit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ordinal; });
/* harmony import */ var d3_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f04");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9cfa");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d48c");




var implicit = {name: "implicit"};

function ordinal() {
  var index = Object(d3_collection__WEBPACK_IMPORTED_MODULE_0__[/* map */ "a"])(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = Object(d3_collection__WEBPACK_IMPORTED_MODULE_0__[/* map */ "a"])();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = _array__WEBPACK_IMPORTED_MODULE_1__[/* slice */ "b"].call(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  _init__WEBPACK_IMPORTED_MODULE_2__[/* initRange */ "b"].apply(scale, arguments);

  return scale;
}


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~cfe04e7f.js.map