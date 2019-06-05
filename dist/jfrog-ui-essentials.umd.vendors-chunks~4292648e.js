((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[108],{

/***/ "1b6d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
});


/***/ }),

/***/ "3872":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cubehelixLong; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("482f");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b055");



function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(end)).h),
          s = Object(_color__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(start.s, end.s),
          l = Object(_color__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(start.l, end.l),
          opacity = Object(_color__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

/* harmony default export */ __webpack_exports__["b"] = (cubehelix(_color__WEBPACK_IMPORTED_MODULE_1__[/* hue */ "c"]));
var cubehelixLong = cubehelix(_color__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);


/***/ }),

/***/ "4bcd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _basis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c84a");


/* harmony default export */ __webpack_exports__["a"] = (function(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return Object(_basis__WEBPACK_IMPORTED_MODULE_0__[/* basis */ "a"])((t - i / n) * n, v0, v1, v2, v3);
  };
});


/***/ }),

/***/ "5061":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
});


/***/ }),

/***/ "6730":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ea1d");


/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = Object(_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
});


/***/ }),

/***/ "b055":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return gamma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nogamma; });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c698");


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : Object(_constant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : Object(_constant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : Object(_constant__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(isNaN(a) ? b : a);
}


/***/ }),

/***/ "c698":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "c84a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return basis; });
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ __webpack_exports__["b"] = (function(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~4292648e.js.map