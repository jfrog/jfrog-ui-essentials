((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[260],{

/***/ "07ff":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sequentialQuantile; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc17");
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e981");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d48c");




function sequentialQuantile() {
  var domain = [],
      interpolator = _continuous__WEBPACK_IMPORTED_MODULE_1__[/* identity */ "c"];

  function scale(x) {
    if (!isNaN(x = +x)) return interpolator((Object(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* bisect */ "b"])(domain, x) - 1) / (domain.length - 1));
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* ascending */ "a"]);
    return scale;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return sequentialQuantile(interpolator).domain(domain);
  };

  return _init__WEBPACK_IMPORTED_MODULE_2__[/* initInterpolator */ "a"].apply(scale, arguments);
}


/***/ }),

/***/ "726a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return quantile; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc17");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9cfa");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d48c");




function quantile() {
  var domain = [],
      range = [],
      thresholds = [],
      unknown;

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* quantile */ "d"])(domain, i / n);
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : range[Object(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* bisect */ "b"])(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* ascending */ "a"]);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = _array__WEBPACK_IMPORTED_MODULE_1__[/* slice */ "b"].call(_), rescale()) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return _init__WEBPACK_IMPORTED_MODULE_2__[/* initRange */ "b"].apply(scale, arguments);
}


/***/ }),

/***/ "7f80":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return quantize; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc17");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9cfa");
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("548a");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d48c");





function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1],
      unknown;

  function scale(x) {
    return x <= x ? range[Object(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* bisect */ "b"])(domain, x, 0, n)] : unknown;
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range = _array__WEBPACK_IMPORTED_MODULE_1__[/* slice */ "b"].call(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };

  scale.thresholds = function() {
    return domain.slice();
  };

  scale.copy = function() {
    return quantize()
        .domain([x0, x1])
        .range(range)
        .unknown(unknown);
  };

  return _init__WEBPACK_IMPORTED_MODULE_3__[/* initRange */ "b"].apply(Object(_linear__WEBPACK_IMPORTED_MODULE_2__[/* linearish */ "b"])(scale), arguments);
}


/***/ }),

/***/ "ce6b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sequential; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return sequentialLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return sequentialSymlog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return sequentialPow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return sequentialSqrt; });
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e981");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("d48c");
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("548a");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("9f48");
/* harmony import */ var _symlog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("c02d");
/* harmony import */ var _pow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("789b");







function transformer() {
  var x0 = 0,
      x1 = 1,
      t0,
      t1,
      k10,
      transform,
      interpolator = _continuous__WEBPACK_IMPORTED_MODULE_0__[/* identity */ "c"],
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? (t0 = transform(x0 = +_[0]), t1 = transform(x1 = +_[1]), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
    return scale;
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .interpolator(source.interpolator())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function sequential() {
  var scale = Object(_linear__WEBPACK_IMPORTED_MODULE_2__[/* linearish */ "b"])(transformer()(_continuous__WEBPACK_IMPORTED_MODULE_0__[/* identity */ "c"]));

  scale.copy = function() {
    return copy(scale, sequential());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__[/* initInterpolator */ "a"].apply(scale, arguments);
}

function sequentialLog() {
  var scale = Object(_log__WEBPACK_IMPORTED_MODULE_3__[/* loggish */ "b"])(transformer()).domain([1, 10]);

  scale.copy = function() {
    return copy(scale, sequentialLog()).base(scale.base());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__[/* initInterpolator */ "a"].apply(scale, arguments);
}

function sequentialSymlog() {
  var scale = Object(_symlog__WEBPACK_IMPORTED_MODULE_4__[/* symlogish */ "b"])(transformer());

  scale.copy = function() {
    return copy(scale, sequentialSymlog()).constant(scale.constant());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__[/* initInterpolator */ "a"].apply(scale, arguments);
}

function sequentialPow() {
  var scale = Object(_pow__WEBPACK_IMPORTED_MODULE_5__[/* powish */ "b"])(transformer());

  scale.copy = function() {
    return copy(scale, sequentialPow()).exponent(scale.exponent());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__[/* initInterpolator */ "a"].apply(scale, arguments);
}

function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~9fb01e94.js.map