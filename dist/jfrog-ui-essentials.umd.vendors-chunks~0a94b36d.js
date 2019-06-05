((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[15],{

/***/ "365e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
});


/***/ }),

/***/ "63b64":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _deviation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("09c0");


/* unused harmony default export */ var _unused_webpack_default_export = (function(values, min, max) {
  return Math.ceil((max - min) / (3.5 * Object(_deviation__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(values) * Math.pow(values.length, -1 / 3)));
});


/***/ }),

/***/ "7326":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ab5");


/* harmony default export */ __webpack_exports__["a"] = (function(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = Object(_min__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
});

function length(d) {
  return d.length;
}


/***/ }),

/***/ "c234":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c0c2");
/* harmony import */ var _ascending__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("00fb");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("0a20");
/* harmony import */ var _quantile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1875");





/* unused harmony default export */ var _unused_webpack_default_export = (function(values, min, max) {
  values = _array__WEBPACK_IMPORTED_MODULE_0__[/* map */ "a"].call(values, _number__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]).sort(_ascending__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
  return Math.ceil((max - min) / (2 * (Object(_quantile__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(values, 0.75) - Object(_quantile__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(values, 0.25)) * Math.pow(values.length, -1 / 3)));
});


/***/ }),

/***/ "eec7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0a20");


/* harmony default export */ __webpack_exports__["a"] = (function(values, valueof) {
  var n = values.length,
      m = 0,
      i = -1,
      mean = 0,
      value,
      delta,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = Object(_number__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = Object(_number__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(valueof(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  if (m > 1) return sum / (m - 1);
});


/***/ }),

/***/ "eecb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tickIncrement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return tickStep; });
var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

/* harmony default export */ __webpack_exports__["a"] = (function(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
});

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}


/***/ }),

/***/ "fb2e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _transpose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7326");


/* unused harmony default export */ var _unused_webpack_default_export = (function() {
  return Object(_transpose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(arguments);
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~0a94b36d.js.map