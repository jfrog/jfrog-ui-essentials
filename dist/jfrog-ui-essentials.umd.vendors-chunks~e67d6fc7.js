((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[372],{

/***/ "1738":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return durationSecond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return durationMinute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return durationHour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return durationDay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return durationWeek; });
var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;


/***/ }),

/***/ "18e2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return newInterval; });
var t0 = new Date,
    t1 = new Date;

function newInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = new Date(+date)), date;
  }

  interval.floor = interval;

  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function(date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function(start, stop, step) {
    var range = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = function(start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? function(d) { return field(d) % step === 0; }
              : function(d) { return interval.count(0, d) % step === 0; });
    };
  }

  return interval;
}


/***/ }),

/***/ "b607":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-time/src/interval.js
var interval = __webpack_require__("18e2");

// CONCATENATED MODULE: ./node_modules/d3-time/src/millisecond.js


var millisecond = Object(interval["a" /* default */])(function() {
  // noop
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = function(k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return Object(interval["a" /* default */])(function(date) {
    date.setTime(Math.floor(date / k) * k);
  }, function(date, step) {
    date.setTime(+date + step * k);
  }, function(start, end) {
    return (end - start) / k;
  });
};

/* harmony default export */ var src_millisecond = (millisecond);
var milliseconds = millisecond.range;

// EXTERNAL MODULE: ./node_modules/d3-time/src/second.js
var second = __webpack_require__("5edf");

// EXTERNAL MODULE: ./node_modules/d3-time/src/duration.js
var duration = __webpack_require__("1738");

// CONCATENATED MODULE: ./node_modules/d3-time/src/minute.js



var minute = Object(interval["a" /* default */])(function(date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * duration["d" /* durationSecond */]);
}, function(date, step) {
  date.setTime(+date + step * duration["c" /* durationMinute */]);
}, function(start, end) {
  return (end - start) / duration["c" /* durationMinute */];
}, function(date) {
  return date.getMinutes();
});

/* harmony default export */ var src_minute = (minute);
var minutes = minute.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/hour.js



var hour = Object(interval["a" /* default */])(function(date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * duration["d" /* durationSecond */] - date.getMinutes() * duration["c" /* durationMinute */]);
}, function(date, step) {
  date.setTime(+date + step * duration["b" /* durationHour */]);
}, function(start, end) {
  return (end - start) / duration["b" /* durationHour */];
}, function(date) {
  return date.getHours();
});

/* harmony default export */ var src_hour = (hour);
var hours = hour.range;

// EXTERNAL MODULE: ./node_modules/d3-time/src/day.js
var day = __webpack_require__("742c");

// EXTERNAL MODULE: ./node_modules/d3-time/src/week.js
var week = __webpack_require__("b14c");

// CONCATENATED MODULE: ./node_modules/d3-time/src/month.js


var month = Object(interval["a" /* default */])(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});

/* harmony default export */ var src_month = (month);
var months = month.range;

// EXTERNAL MODULE: ./node_modules/d3-time/src/year.js
var year = __webpack_require__("a15a");

// EXTERNAL MODULE: ./node_modules/d3-time/src/utcMinute.js
var utcMinute = __webpack_require__("f8ee");

// EXTERNAL MODULE: ./node_modules/d3-time/src/utcHour.js
var utcHour = __webpack_require__("f623");

// EXTERNAL MODULE: ./node_modules/d3-time/src/utcDay.js
var utcDay = __webpack_require__("6eb2");

// EXTERNAL MODULE: ./node_modules/d3-time/src/utcWeek.js
var utcWeek = __webpack_require__("2739");

// EXTERNAL MODULE: ./node_modules/d3-time/src/utcMonth.js
var utcMonth = __webpack_require__("55f8");

// EXTERNAL MODULE: ./node_modules/d3-time/src/utcYear.js
var utcYear = __webpack_require__("77ae");

// CONCATENATED MODULE: ./node_modules/d3-time/src/index.js
/* unused concated harmony import timeInterval */
/* concated harmony reexport timeMillisecond */__webpack_require__.d(__webpack_exports__, "c", function() { return src_millisecond; });
/* unused concated harmony import timeMilliseconds */
/* concated harmony reexport utcMillisecond */__webpack_require__.d(__webpack_exports__, "n", function() { return src_millisecond; });
/* unused concated harmony import utcMilliseconds */
/* concated harmony reexport timeSecond */__webpack_require__.d(__webpack_exports__, "g", function() { return second["a" /* default */]; });
/* unused concated harmony import timeSeconds */
/* concated harmony reexport utcSecond */__webpack_require__.d(__webpack_exports__, "r", function() { return second["a" /* default */]; });
/* unused concated harmony import utcSeconds */
/* concated harmony reexport timeMinute */__webpack_require__.d(__webpack_exports__, "d", function() { return src_minute; });
/* unused concated harmony import timeMinutes */
/* concated harmony reexport timeHour */__webpack_require__.d(__webpack_exports__, "b", function() { return src_hour; });
/* unused concated harmony import timeHours */
/* concated harmony reexport timeDay */__webpack_require__.d(__webpack_exports__, "a", function() { return day["a" /* default */]; });
/* unused concated harmony import timeDays */
/* concated harmony reexport timeWeek */__webpack_require__.d(__webpack_exports__, "j", function() { return week["b" /* sunday */]; });
/* unused concated harmony import timeWeeks */
/* concated harmony reexport timeSunday */__webpack_require__.d(__webpack_exports__, "h", function() { return week["b" /* sunday */]; });
/* unused concated harmony import timeSundays */
/* concated harmony reexport timeMonday */__webpack_require__.d(__webpack_exports__, "e", function() { return week["a" /* monday */]; });
/* unused concated harmony import timeMondays */
/* unused concated harmony import timeTuesday */
/* unused concated harmony import timeTuesdays */
/* unused concated harmony import timeWednesday */
/* unused concated harmony import timeWednesdays */
/* concated harmony reexport timeThursday */__webpack_require__.d(__webpack_exports__, "i", function() { return week["c" /* thursday */]; });
/* unused concated harmony import timeThursdays */
/* unused concated harmony import timeFriday */
/* unused concated harmony import timeFridays */
/* unused concated harmony import timeSaturday */
/* unused concated harmony import timeSaturdays */
/* concated harmony reexport timeMonth */__webpack_require__.d(__webpack_exports__, "f", function() { return src_month; });
/* unused concated harmony import timeMonths */
/* concated harmony reexport timeYear */__webpack_require__.d(__webpack_exports__, "k", function() { return year["a" /* default */]; });
/* unused concated harmony import timeYears */
/* concated harmony reexport utcMinute */__webpack_require__.d(__webpack_exports__, "o", function() { return utcMinute["a" /* default */]; });
/* unused concated harmony import utcMinutes */
/* concated harmony reexport utcHour */__webpack_require__.d(__webpack_exports__, "m", function() { return utcHour["a" /* default */]; });
/* unused concated harmony import utcHours */
/* concated harmony reexport utcDay */__webpack_require__.d(__webpack_exports__, "l", function() { return utcDay["a" /* default */]; });
/* unused concated harmony import utcDays */
/* concated harmony reexport utcWeek */__webpack_require__.d(__webpack_exports__, "u", function() { return utcWeek["b" /* utcSunday */]; });
/* unused concated harmony import utcWeeks */
/* concated harmony reexport utcSunday */__webpack_require__.d(__webpack_exports__, "s", function() { return utcWeek["b" /* utcSunday */]; });
/* unused concated harmony import utcSundays */
/* concated harmony reexport utcMonday */__webpack_require__.d(__webpack_exports__, "p", function() { return utcWeek["a" /* utcMonday */]; });
/* unused concated harmony import utcMondays */
/* unused concated harmony import utcTuesday */
/* unused concated harmony import utcTuesdays */
/* unused concated harmony import utcWednesday */
/* unused concated harmony import utcWednesdays */
/* concated harmony reexport utcThursday */__webpack_require__.d(__webpack_exports__, "t", function() { return utcWeek["c" /* utcThursday */]; });
/* unused concated harmony import utcThursdays */
/* unused concated harmony import utcFriday */
/* unused concated harmony import utcFridays */
/* unused concated harmony import utcSaturday */
/* unused concated harmony import utcSaturdays */
/* concated harmony reexport utcMonth */__webpack_require__.d(__webpack_exports__, "q", function() { return utcMonth["a" /* default */]; });
/* unused concated harmony import utcMonths */
/* concated harmony reexport utcYear */__webpack_require__.d(__webpack_exports__, "v", function() { return utcYear["a" /* default */]; });
/* unused concated harmony import utcYears */































/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~e67d6fc7.js.map