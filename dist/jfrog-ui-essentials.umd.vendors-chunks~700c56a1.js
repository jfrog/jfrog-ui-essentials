((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[178],{

/***/ "3b40":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4748");
/* harmony import */ var d3_time_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("70e1");
/* harmony import */ var d3_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("b607");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d48c");





/* harmony default export */ __webpack_exports__["a"] = (function() {
  return _init__WEBPACK_IMPORTED_MODULE_3__[/* initRange */ "b"].apply(Object(_time__WEBPACK_IMPORTED_MODULE_0__[/* calendar */ "a"])(d3_time__WEBPACK_IMPORTED_MODULE_2__[/* utcYear */ "v"], d3_time__WEBPACK_IMPORTED_MODULE_2__[/* utcMonth */ "q"], d3_time__WEBPACK_IMPORTED_MODULE_2__[/* utcWeek */ "u"], d3_time__WEBPACK_IMPORTED_MODULE_2__[/* utcDay */ "l"], d3_time__WEBPACK_IMPORTED_MODULE_2__[/* utcHour */ "m"], d3_time__WEBPACK_IMPORTED_MODULE_2__[/* utcMinute */ "o"], d3_time__WEBPACK_IMPORTED_MODULE_2__[/* utcSecond */ "r"], d3_time__WEBPACK_IMPORTED_MODULE_2__[/* utcMillisecond */ "n"], d3_time_format__WEBPACK_IMPORTED_MODULE_1__["utcFormat"]).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
});


/***/ }),

/***/ "4748":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calendar; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc17");
/* harmony import */ var d3_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b607");
/* harmony import */ var d3_time_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("70e1");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("9cfa");
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("e981");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("d48c");
/* harmony import */ var _nice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("6dc6");








var durationSecond = 1000,
    durationMinute = durationSecond * 60,
    durationHour = durationMinute * 60,
    durationDay = durationHour * 24,
    durationWeek = durationDay * 7,
    durationMonth = durationDay * 30,
    durationYear = durationDay * 365;

function date(t) {
  return new Date(t);
}

function number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
  var scale = Object(_continuous__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"])(_continuous__WEBPACK_IMPORTED_MODULE_4__[/* identity */ "c"], _continuous__WEBPACK_IMPORTED_MODULE_4__[/* identity */ "c"]),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  var tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  function tickInterval(interval, start, stop, step) {
    if (interval == null) interval = 10;

    // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.
    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* bisector */ "c"])(function(i) { return i[2]; }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* tickStep */ "g"])(start / durationYear, stop / durationYear, interval);
        interval = year;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = Math.max(Object(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* tickStep */ "g"])(start, stop, interval), 1);
        interval = millisecond;
      }
    }

    return step == null ? interval : interval.every(step);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(_array__WEBPACK_IMPORTED_MODULE_3__[/* map */ "a"].call(_, number)) : domain().map(date);
  };

  scale.ticks = function(interval, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
    return r ? t.reverse() : t;
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval, step) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
        ? domain(Object(_nice__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(d, interval))
        : scale;
  };

  scale.copy = function() {
    return Object(_continuous__WEBPACK_IMPORTED_MODULE_4__[/* copy */ "a"])(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
  };

  return scale;
}

/* harmony default export */ __webpack_exports__["b"] = (function() {
  return _init__WEBPACK_IMPORTED_MODULE_5__[/* initRange */ "b"].apply(calendar(d3_time__WEBPACK_IMPORTED_MODULE_1__[/* timeYear */ "k"], d3_time__WEBPACK_IMPORTED_MODULE_1__[/* timeMonth */ "f"], d3_time__WEBPACK_IMPORTED_MODULE_1__[/* timeWeek */ "j"], d3_time__WEBPACK_IMPORTED_MODULE_1__[/* timeDay */ "a"], d3_time__WEBPACK_IMPORTED_MODULE_1__[/* timeHour */ "b"], d3_time__WEBPACK_IMPORTED_MODULE_1__[/* timeMinute */ "d"], d3_time__WEBPACK_IMPORTED_MODULE_1__[/* timeSecond */ "g"], d3_time__WEBPACK_IMPORTED_MODULE_1__[/* timeMillisecond */ "c"], d3_time_format__WEBPACK_IMPORTED_MODULE_2__["timeFormat"]).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
});


/***/ }),

/***/ "6b0f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return threshold; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc17");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9cfa");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d48c");




function threshold() {
  var domain = [0.5],
      range = [0, 1],
      unknown,
      n = 1;

  function scale(x) {
    return x <= x ? range[Object(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* bisect */ "b"])(domain, x, 0, n)] : unknown;
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = _array__WEBPACK_IMPORTED_MODULE_1__[/* slice */ "b"].call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = _array__WEBPACK_IMPORTED_MODULE_1__[/* slice */ "b"].call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return threshold()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return _init__WEBPACK_IMPORTED_MODULE_2__[/* initRange */ "b"].apply(scale, arguments);
}


/***/ }),

/***/ "b2c9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc17");
/* harmony import */ var d3_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ad68");



/* harmony default export */ __webpack_exports__["a"] = (function(start, stop, count, specifier) {
  var step = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__[/* tickStep */ "g"])(start, stop, count),
      precision;
  specifier = Object(d3_format__WEBPACK_IMPORTED_MODULE_1__[/* formatSpecifier */ "c"])(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = Object(d3_format__WEBPACK_IMPORTED_MODULE_1__[/* precisionPrefix */ "e"])(step, value))) specifier.precision = precision;
      return Object(d3_format__WEBPACK_IMPORTED_MODULE_1__[/* formatPrefix */ "b"])(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = Object(d3_format__WEBPACK_IMPORTED_MODULE_1__[/* precisionRound */ "f"])(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = Object(d3_format__WEBPACK_IMPORTED_MODULE_1__[/* precisionFixed */ "d"])(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return Object(d3_format__WEBPACK_IMPORTED_MODULE_1__[/* format */ "a"])(specifier);
});


/***/ }),

/***/ "c02d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return symlogish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return symlog; });
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("548a");
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e981");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d48c");




function transformSymlog(c) {
  return function(x) {
    return Math.sign(x) * Math.log1p(Math.abs(x / c));
  };
}

function transformSymexp(c) {
  return function(x) {
    return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
  };
}

function symlogish(transform) {
  var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));

  scale.constant = function(_) {
    return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
  };

  return Object(_linear__WEBPACK_IMPORTED_MODULE_0__[/* linearish */ "b"])(scale);
}

function symlog() {
  var scale = symlogish(Object(_continuous__WEBPACK_IMPORTED_MODULE_1__[/* transformer */ "d"])());

  scale.copy = function() {
    return Object(_continuous__WEBPACK_IMPORTED_MODULE_1__[/* copy */ "a"])(scale, symlog()).constant(scale.constant());
  };

  return _init__WEBPACK_IMPORTED_MODULE_2__[/* initRange */ "b"].apply(scale, arguments);
}


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~700c56a1.js.map