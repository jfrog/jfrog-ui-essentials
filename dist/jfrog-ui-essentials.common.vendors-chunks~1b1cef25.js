((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[42],{

/***/ "0986":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return atan2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return cos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return sin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return epsilon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return pi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return halfPi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return tau; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return acos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return asin; });
var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}


/***/ }),

/***/ "1a34":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _none__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d13e");


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  Object(_none__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(series, order);
});


/***/ }),

/***/ "1a88":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return linkHorizontal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return linkVertical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return linkRadial; });
/* harmony import */ var d3_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f37c");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("82ac");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d8ad");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("fda4");
/* harmony import */ var _pointRadial__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("1324");






function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x = _point__WEBPACK_IMPORTED_MODULE_3__[/* x */ "a"],
      y = _point__WEBPACK_IMPORTED_MODULE_3__[/* y */ "b"],
      context = null;

  function link() {
    var buffer, argv = _array__WEBPACK_IMPORTED_MODULE_1__[/* slice */ "a"].call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = Object(d3_path__WEBPACK_IMPORTED_MODULE_0__[/* path */ "a"])();
    curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(+_), link) : y;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial(context, x0, y0, x1, y1) {
  var p0 = Object(_pointRadial__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(x0, y0),
      p1 = Object(_pointRadial__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(x0, y0 = (y0 + y1) / 2),
      p2 = Object(_pointRadial__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(x1, y0),
      p3 = Object(_pointRadial__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}


/***/ }),

/***/ "36dc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _none__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d13e");


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  Object(_none__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(series, order);
});


/***/ }),

/***/ "3a8e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _appearance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4f5e");
/* harmony import */ var _ascending__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5ae0");



/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(_ascending__WEBPACK_IMPORTED_MODULE_1__[/* sum */ "b"]),
      order = Object(_appearance__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(series),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
});


/***/ }),

/***/ "4c8d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return lineRadial; });
/* harmony import */ var _curve_radial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2670");
/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fae8");



function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(Object(_curve_radial__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"])(_)) : c()._curve;
  };

  return l;
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return lineRadial(Object(_line__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])().curve(_curve_radial__WEBPACK_IMPORTED_MODULE_0__[/* curveRadialLinear */ "a"]));
});


/***/ }),

/***/ "4f5e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _none__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aaaa");


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var peaks = series.map(peak);
  return Object(_none__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(series).sort(function(a, b) { return peaks[a] - peaks[b]; });
});

function peak(series) {
  var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
  while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;
  return j;
}


/***/ }),

/***/ "5056":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _none__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aaaa");


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  return Object(_none__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(series).reverse();
});


/***/ }),

/***/ "5ae0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sum; });
/* harmony import */ var _none__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aaaa");


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var sums = series.map(sum);
  return Object(_none__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(series).sort(function(a, b) { return sums[a] - sums[b]; });
});

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}


/***/ }),

/***/ "aaaa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
});


/***/ }),

/***/ "d0ae":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {});


/***/ }),

/***/ "d13e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
});


/***/ }),

/***/ "e1b9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
});


/***/ }),

/***/ "f1e2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _none__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d13e");


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  Object(_none__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(series, order);
});


/***/ }),

/***/ "f5cf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _ascending__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5ae0");


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  return Object(_ascending__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(series).reverse();
});


/***/ }),

/***/ "fae8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var d3_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f37c");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("d8ad");
/* harmony import */ var _curve_linear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4830");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("fda4");





/* harmony default export */ __webpack_exports__["a"] = (function() {
  var x = _point__WEBPACK_IMPORTED_MODULE_3__[/* x */ "a"],
      y = _point__WEBPACK_IMPORTED_MODULE_3__[/* y */ "b"],
      defined = Object(_constant__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(true),
      context = null,
      curve = _curve_linear__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = Object(d3_path__WEBPACK_IMPORTED_MODULE_0__[/* path */ "a"])());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~1b1cef25.js.map