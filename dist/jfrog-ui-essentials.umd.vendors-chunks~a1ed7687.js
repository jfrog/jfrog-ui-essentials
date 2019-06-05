((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[265],{

/***/ "00fb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
});


/***/ }),

/***/ "09c0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _variance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eec7");


/* harmony default export */ __webpack_exports__["a"] = (function(array, f) {
  var v = Object(_variance__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(array, f);
  return v ? Math.sqrt(v) : v;
});


/***/ }),

/***/ "bc17":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-array/src/ascending.js
var ascending = __webpack_require__("00fb");

// CONCATENATED MODULE: ./node_modules/d3-array/src/bisector.js


/* harmony default export */ var bisector = (function(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
});

function ascendingComparator(f) {
  return function(d, x) {
    return Object(ascending["a" /* default */])(f(d), x);
  };
}

// CONCATENATED MODULE: ./node_modules/d3-array/src/bisect.js



var ascendingBisect = bisector(ascending["a" /* default */]);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
/* harmony default export */ var bisect = (bisectRight);

// EXTERNAL MODULE: ./node_modules/d3-array/src/pairs.js
var pairs = __webpack_require__("47d0");

// CONCATENATED MODULE: ./node_modules/d3-array/src/cross.js


/* harmony default export */ var cross = (function(values0, values1, reduce) {
  var n0 = values0.length,
      n1 = values1.length,
      values = new Array(n0 * n1),
      i0,
      i1,
      i,
      value0;

  if (reduce == null) reduce = pairs["a" /* pair */];

  for (i0 = i = 0; i0 < n0; ++i0) {
    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
      values[i] = reduce(value0, values1[i1]);
    }
  }

  return values;
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/descending.js
/* harmony default export */ var descending = (function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
});

// EXTERNAL MODULE: ./node_modules/d3-array/src/deviation.js
var deviation = __webpack_require__("09c0");

// CONCATENATED MODULE: ./node_modules/d3-array/src/extent.js
/* harmony default export */ var extent = (function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
});

// EXTERNAL MODULE: ./node_modules/d3-array/src/array.js
var array = __webpack_require__("c0c2");

// CONCATENATED MODULE: ./node_modules/d3-array/src/constant.js
/* harmony default export */ var constant = (function(x) {
  return function() {
    return x;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/identity.js
/* harmony default export */ var identity = (function(x) {
  return x;
});

// EXTERNAL MODULE: ./node_modules/d3-array/src/range.js
var range = __webpack_require__("365b");

// EXTERNAL MODULE: ./node_modules/d3-array/src/ticks.js
var ticks = __webpack_require__("eecb");

// EXTERNAL MODULE: ./node_modules/d3-array/src/threshold/sturges.js
var sturges = __webpack_require__("365e");

// CONCATENATED MODULE: ./node_modules/d3-array/src/histogram.js









/* harmony default export */ var src_histogram = (function() {
  var value = identity,
      domain = extent,
      threshold = sturges["a" /* default */];

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      tz = Object(ticks["c" /* tickStep */])(x0, x1, tz);
      tz = Object(range["a" /* default */])(Math.ceil(x0 / tz) * tz, x1, tz); // exclusive
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[bisect(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(array["b" /* slice */].call(_)) : constant(_), histogram) : threshold;
  };

  return histogram;
});

// EXTERNAL MODULE: ./node_modules/d3-array/src/threshold/freedmanDiaconis.js
var freedmanDiaconis = __webpack_require__("c234");

// EXTERNAL MODULE: ./node_modules/d3-array/src/threshold/scott.js
var scott = __webpack_require__("63b64");

// EXTERNAL MODULE: ./node_modules/d3-array/src/max.js
var max = __webpack_require__("823f");

// EXTERNAL MODULE: ./node_modules/d3-array/src/mean.js
var mean = __webpack_require__("575f");

// EXTERNAL MODULE: ./node_modules/d3-array/src/median.js
var median = __webpack_require__("c0aa");

// EXTERNAL MODULE: ./node_modules/d3-array/src/merge.js
var merge = __webpack_require__("1539");

// EXTERNAL MODULE: ./node_modules/d3-array/src/min.js
var min = __webpack_require__("9ab5");

// EXTERNAL MODULE: ./node_modules/d3-array/src/permute.js
var permute = __webpack_require__("3220");

// EXTERNAL MODULE: ./node_modules/d3-array/src/quantile.js
var quantile = __webpack_require__("1875");

// EXTERNAL MODULE: ./node_modules/d3-array/src/scan.js
var scan = __webpack_require__("3a4e");

// EXTERNAL MODULE: ./node_modules/d3-array/src/shuffle.js
var shuffle = __webpack_require__("40ae");

// EXTERNAL MODULE: ./node_modules/d3-array/src/sum.js
var sum = __webpack_require__("3965");

// EXTERNAL MODULE: ./node_modules/d3-array/src/transpose.js
var transpose = __webpack_require__("7326");

// EXTERNAL MODULE: ./node_modules/d3-array/src/variance.js
var variance = __webpack_require__("eec7");

// EXTERNAL MODULE: ./node_modules/d3-array/src/zip.js
var zip = __webpack_require__("fb2e");

// CONCATENATED MODULE: ./node_modules/d3-array/src/index.js
/* concated harmony reexport bisect */__webpack_require__.d(__webpack_exports__, "b", function() { return bisect; });
/* unused concated harmony import bisectRight */
/* unused concated harmony import bisectLeft */
/* concated harmony reexport ascending */__webpack_require__.d(__webpack_exports__, "a", function() { return ascending["a" /* default */]; });
/* concated harmony reexport bisector */__webpack_require__.d(__webpack_exports__, "c", function() { return bisector; });
/* unused concated harmony import cross */
/* unused concated harmony import descending */
/* unused concated harmony import deviation */
/* unused concated harmony import extent */
/* unused concated harmony import histogram */
/* unused concated harmony import thresholdFreedmanDiaconis */
/* unused concated harmony import thresholdScott */
/* unused concated harmony import thresholdSturges */
/* unused concated harmony import max */
/* unused concated harmony import mean */
/* unused concated harmony import median */
/* unused concated harmony import merge */
/* unused concated harmony import min */
/* unused concated harmony import pairs */
/* unused concated harmony import permute */
/* concated harmony reexport quantile */__webpack_require__.d(__webpack_exports__, "d", function() { return quantile["a" /* default */]; });
/* concated harmony reexport range */__webpack_require__.d(__webpack_exports__, "e", function() { return range["a" /* default */]; });
/* unused concated harmony import scan */
/* unused concated harmony import shuffle */
/* unused concated harmony import sum */
/* concated harmony reexport ticks */__webpack_require__.d(__webpack_exports__, "h", function() { return ticks["a" /* default */]; });
/* concated harmony reexport tickIncrement */__webpack_require__.d(__webpack_exports__, "f", function() { return ticks["b" /* tickIncrement */]; });
/* concated harmony reexport tickStep */__webpack_require__.d(__webpack_exports__, "g", function() { return ticks["c" /* tickStep */]; });
/* unused concated harmony import transpose */
/* unused concated harmony import variance */
/* unused concated harmony import zip */





























/***/ }),

/***/ "c0c2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return slice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return map; });
var array = Array.prototype;

var slice = array.slice;
var map = array.map;


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~a1ed7687.js.map