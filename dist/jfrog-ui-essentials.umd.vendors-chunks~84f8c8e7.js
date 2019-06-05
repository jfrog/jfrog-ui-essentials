((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[211],{

/***/ "2739":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return utcSunday; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return utcMonday; });
/* unused harmony export utcTuesday */
/* unused harmony export utcWednesday */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return utcThursday; });
/* unused harmony export utcFriday */
/* unused harmony export utcSaturday */
/* unused harmony export utcSundays */
/* unused harmony export utcMondays */
/* unused harmony export utcTuesdays */
/* unused harmony export utcWednesdays */
/* unused harmony export utcThursdays */
/* unused harmony export utcFridays */
/* unused harmony export utcSaturdays */
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18e2");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1738");



function utcWeekday(i) {
  return Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationWeek */ "e"];
  });
}

var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);

var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;


/***/ }),

/***/ "55f8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export utcMonths */
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18e2");


var utcMonth = Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});

/* harmony default export */ __webpack_exports__["a"] = (utcMonth);
var utcMonths = utcMonth.range;


/***/ }),

/***/ "5edf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export seconds */
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18e2");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1738");



var second = Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
  date.setTime(date - date.getMilliseconds());
}, function(date, step) {
  date.setTime(+date + step * _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationSecond */ "d"]);
}, function(start, end) {
  return (end - start) / _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationSecond */ "d"];
}, function(date) {
  return date.getUTCSeconds();
});

/* harmony default export */ __webpack_exports__["a"] = (second);
var seconds = second.range;


/***/ }),

/***/ "6eb2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export utcDays */
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18e2");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1738");



var utcDay = Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationDay */ "a"];
}, function(date) {
  return date.getUTCDate() - 1;
});

/* harmony default export */ __webpack_exports__["a"] = (utcDay);
var utcDays = utcDay.range;


/***/ }),

/***/ "77ae":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export utcYears */
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18e2");


var utcYear = Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (utcYear);
var utcYears = utcYear.range;


/***/ }),

/***/ "a15a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export years */
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18e2");


var year = Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (year);
var years = year.range;


/***/ }),

/***/ "b14c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sunday; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return monday; });
/* unused harmony export tuesday */
/* unused harmony export wednesday */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return thursday; });
/* unused harmony export friday */
/* unused harmony export saturday */
/* unused harmony export sundays */
/* unused harmony export mondays */
/* unused harmony export tuesdays */
/* unused harmony export wednesdays */
/* unused harmony export thursdays */
/* unused harmony export fridays */
/* unused harmony export saturdays */
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18e2");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1738");



function weekday(i) {
  return Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationMinute */ "c"]) / _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationWeek */ "e"];
  });
}

var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);

var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;


/***/ }),

/***/ "f623":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export utcHours */
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18e2");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1738");



var utcHour = Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationHour */ "b"]);
}, function(start, end) {
  return (end - start) / _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationHour */ "b"];
}, function(date) {
  return date.getUTCHours();
});

/* harmony default export */ __webpack_exports__["a"] = (utcHour);
var utcHours = utcHour.range;


/***/ }),

/***/ "f8ee":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export utcMinutes */
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18e2");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1738");



var utcMinute = Object(_interval__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationMinute */ "c"]);
}, function(start, end) {
  return (end - start) / _duration__WEBPACK_IMPORTED_MODULE_1__[/* durationMinute */ "c"];
}, function(date) {
  return date.getUTCMinutes();
});

/* harmony default export */ __webpack_exports__["a"] = (utcMinute);
var utcMinutes = utcMinute.range;


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~84f8c8e7.js.map