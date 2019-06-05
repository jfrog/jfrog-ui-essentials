((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[103],{

/***/ "ce24":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/d3-scale/src/band.js
var band = __webpack_require__("b026");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/array.js
var array = __webpack_require__("9cfa");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/linear.js
var linear = __webpack_require__("548a");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/number.js
var number = __webpack_require__("e26e");

// CONCATENATED MODULE: ./node_modules/d3-scale/src/identity.js




function identity(domain) {
  var unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = array["a" /* map */].call(_, number["a" /* default */]), scale) : domain.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return identity(domain).unknown(unknown);
  };

  domain = arguments.length ? array["a" /* map */].call(domain, number["a" /* default */]) : [0, 1];

  return Object(linear["b" /* linearish */])(scale);
}

// EXTERNAL MODULE: ./node_modules/d3-scale/src/log.js
var log = __webpack_require__("9f48");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/symlog.js
var symlog = __webpack_require__("c02d");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/ordinal.js
var ordinal = __webpack_require__("df19");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/pow.js
var pow = __webpack_require__("789b");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/quantile.js
var quantile = __webpack_require__("726a");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/quantize.js
var quantize = __webpack_require__("7f80");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/threshold.js
var threshold = __webpack_require__("6b0f");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/time.js
var time = __webpack_require__("4748");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/utcTime.js
var utcTime = __webpack_require__("3b40");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/sequential.js
var sequential = __webpack_require__("ce6b");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/sequentialQuantile.js
var sequentialQuantile = __webpack_require__("07ff");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/continuous.js + 1 modules
var continuous = __webpack_require__("e981");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/init.js
var init = __webpack_require__("d48c");

// CONCATENATED MODULE: ./node_modules/d3-scale/src/diverging.js








function transformer() {
  var x0 = 0,
      x1 = 0.5,
      x2 = 1,
      t0,
      t1,
      t2,
      k10,
      k21,
      interpolator = continuous["c" /* identity */],
      transform,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (x < t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? (t0 = transform(x0 = +_[0]), t1 = transform(x1 = +_[1]), t2 = transform(x2 = +_[2]), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), scale) : [x0, x1, x2];
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
    transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1);
    return scale;
  };
}

function diverging() {
  var scale = Object(linear["b" /* linearish */])(transformer()(continuous["c" /* identity */]));

  scale.copy = function() {
    return Object(sequential["a" /* copy */])(scale, diverging());
  };

  return init["a" /* initInterpolator */].apply(scale, arguments);
}

function divergingLog() {
  var scale = Object(log["b" /* loggish */])(transformer()).domain([0.1, 1, 10]);

  scale.copy = function() {
    return Object(sequential["a" /* copy */])(scale, divergingLog()).base(scale.base());
  };

  return init["a" /* initInterpolator */].apply(scale, arguments);
}

function divergingSymlog() {
  var scale = Object(symlog["b" /* symlogish */])(transformer());

  scale.copy = function() {
    return Object(sequential["a" /* copy */])(scale, divergingSymlog()).constant(scale.constant());
  };

  return init["a" /* initInterpolator */].apply(scale, arguments);
}

function divergingPow() {
  var scale = Object(pow["b" /* powish */])(transformer());

  scale.copy = function() {
    return Object(sequential["a" /* copy */])(scale, divergingPow()).exponent(scale.exponent());
  };

  return init["a" /* initInterpolator */].apply(scale, arguments);
}

function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}

// EXTERNAL MODULE: ./node_modules/d3-scale/src/tickFormat.js
var tickFormat = __webpack_require__("b2c9");

// CONCATENATED MODULE: ./node_modules/d3-scale/src/index.js
/* concated harmony reexport scaleBand */__webpack_require__.d(__webpack_exports__, "scaleBand", function() { return band["a" /* default */]; });
/* concated harmony reexport scalePoint */__webpack_require__.d(__webpack_exports__, "scalePoint", function() { return band["b" /* point */]; });
/* concated harmony reexport scaleIdentity */__webpack_require__.d(__webpack_exports__, "scaleIdentity", function() { return identity; });
/* concated harmony reexport scaleLinear */__webpack_require__.d(__webpack_exports__, "scaleLinear", function() { return linear["a" /* default */]; });
/* concated harmony reexport scaleLog */__webpack_require__.d(__webpack_exports__, "scaleLog", function() { return log["a" /* default */]; });
/* concated harmony reexport scaleSymlog */__webpack_require__.d(__webpack_exports__, "scaleSymlog", function() { return symlog["a" /* default */]; });
/* concated harmony reexport scaleOrdinal */__webpack_require__.d(__webpack_exports__, "scaleOrdinal", function() { return ordinal["a" /* default */]; });
/* concated harmony reexport scaleImplicit */__webpack_require__.d(__webpack_exports__, "scaleImplicit", function() { return ordinal["b" /* implicit */]; });
/* concated harmony reexport scalePow */__webpack_require__.d(__webpack_exports__, "scalePow", function() { return pow["a" /* default */]; });
/* concated harmony reexport scaleSqrt */__webpack_require__.d(__webpack_exports__, "scaleSqrt", function() { return pow["c" /* sqrt */]; });
/* concated harmony reexport scaleQuantile */__webpack_require__.d(__webpack_exports__, "scaleQuantile", function() { return quantile["a" /* default */]; });
/* concated harmony reexport scaleQuantize */__webpack_require__.d(__webpack_exports__, "scaleQuantize", function() { return quantize["a" /* default */]; });
/* concated harmony reexport scaleThreshold */__webpack_require__.d(__webpack_exports__, "scaleThreshold", function() { return threshold["a" /* default */]; });
/* concated harmony reexport scaleTime */__webpack_require__.d(__webpack_exports__, "scaleTime", function() { return time["b" /* default */]; });
/* concated harmony reexport scaleUtc */__webpack_require__.d(__webpack_exports__, "scaleUtc", function() { return utcTime["a" /* default */]; });
/* concated harmony reexport scaleSequential */__webpack_require__.d(__webpack_exports__, "scaleSequential", function() { return sequential["b" /* default */]; });
/* concated harmony reexport scaleSequentialLog */__webpack_require__.d(__webpack_exports__, "scaleSequentialLog", function() { return sequential["c" /* sequentialLog */]; });
/* concated harmony reexport scaleSequentialPow */__webpack_require__.d(__webpack_exports__, "scaleSequentialPow", function() { return sequential["d" /* sequentialPow */]; });
/* concated harmony reexport scaleSequentialSqrt */__webpack_require__.d(__webpack_exports__, "scaleSequentialSqrt", function() { return sequential["e" /* sequentialSqrt */]; });
/* concated harmony reexport scaleSequentialSymlog */__webpack_require__.d(__webpack_exports__, "scaleSequentialSymlog", function() { return sequential["f" /* sequentialSymlog */]; });
/* concated harmony reexport scaleSequentialQuantile */__webpack_require__.d(__webpack_exports__, "scaleSequentialQuantile", function() { return sequentialQuantile["a" /* default */]; });
/* concated harmony reexport scaleDiverging */__webpack_require__.d(__webpack_exports__, "scaleDiverging", function() { return diverging; });
/* concated harmony reexport scaleDivergingLog */__webpack_require__.d(__webpack_exports__, "scaleDivergingLog", function() { return divergingLog; });
/* concated harmony reexport scaleDivergingPow */__webpack_require__.d(__webpack_exports__, "scaleDivergingPow", function() { return divergingPow; });
/* concated harmony reexport scaleDivergingSqrt */__webpack_require__.d(__webpack_exports__, "scaleDivergingSqrt", function() { return divergingSqrt; });
/* concated harmony reexport scaleDivergingSymlog */__webpack_require__.d(__webpack_exports__, "scaleDivergingSymlog", function() { return divergingSymlog; });
/* concated harmony reexport tickFormat */__webpack_require__.d(__webpack_exports__, "tickFormat", function() { return tickFormat["a" /* default */]; });

































/***/ }),

/***/ "e981":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-array/src/index.js + 8 modules
var src = __webpack_require__("bc17");

// EXTERNAL MODULE: ./node_modules/d3-interpolate/src/index.js + 3 modules
var d3_interpolate_src = __webpack_require__("a43d");

// EXTERNAL MODULE: ./node_modules/d3-scale/src/array.js
var array = __webpack_require__("9cfa");

// CONCATENATED MODULE: ./node_modules/d3-scale/src/constant.js
/* harmony default export */ var constant = (function(x) {
  return function() {
    return x;
  };
});

// EXTERNAL MODULE: ./node_modules/d3-scale/src/number.js
var number = __webpack_require__("e26e");

// CONCATENATED MODULE: ./node_modules/d3-scale/src/continuous.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return transformer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return continuous; });






var unit = [0, 1];

function identity(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constant(isNaN(b) ? NaN : 0.5);
}

function clamper(domain) {
  var a = domain[0], b = domain[domain.length - 1], t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = Object(src["b" /* bisect */])(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer() {
  var domain = unit,
      range = unit,
      interpolate = d3_interpolate_src["interpolate"],
      transform,
      untransform,
      unknown,
      clamp = identity,
      piecewise,
      output,
      input;

  function rescale() {
    piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), d3_interpolate_src["interpolateNumber"])))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = array["a" /* map */].call(_, number["a" /* default */]), clamp === identity || (clamp = clamper(domain)), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = array["b" /* slice */].call(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = array["b" /* slice */].call(_), interpolate = d3_interpolate_src["interpolateRound"], rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? clamper(domain) : identity, scale) : clamp !== identity;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous(transform, untransform) {
  return transformer()(transform, untransform);
}


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~3e8cc2cf.js.map