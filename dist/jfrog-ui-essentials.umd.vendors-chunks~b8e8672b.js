((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[303],{

/***/ "382a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = filterEvent;

var _dom = __webpack_require__("1611");

var _constants = __webpack_require__("3ed8");

// Returns true of we should ignore the click/dbclick/keypress event
// Avoids having the user need to use @click.stop on the form control
function filterEvent(evt) {
  if (!evt || !evt.target) {
    /* istanbul ignore next */
    return;
  }

  var el = evt.target;

  if (el.tagName === 'TD' || el.tagName === 'TH' || el.tagName === 'TR' || el.disabled) {
    // Shortut all the following tests for efficiency
    return false;
  }

  if ((0, _dom.closest)('.dropdown-menu', el)) {
    // Click was in a dropdown menu, so ignore
    return true;
  }

  var label = el.tagName === 'LABEL' ? el : (0, _dom.closest)('label', el);

  if (label && label.control && !label.control.disabled) {
    // If the label's form control is not disabled then we don't propagate evt
    return true;
  } // Else check to see if the event target matches one of the selectors in the event filter
  // i.e. anchors, non disabled inputs, etc. Return true if we should ignore the event.


  return (0, _dom.matches)(el, _constants.EVENT_FILTER);
}

/***/ }),

/***/ "fc47":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = defaultSortCompare;

var _get = _interopRequireDefault(__webpack_require__("b0df"));

var _inspect = __webpack_require__("0d5a");

var _stringifyObjectValues = _interopRequireDefault(__webpack_require__("2227"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default sort compare routine
//
// TODO: add option to sort by multiple columns (tri-state per column, plus order of columns in sort)
//  where sortBy could be an array of objects [ {key: 'foo', sortDir: 'asc'}, {key:'bar', sortDir: 'desc'} ...]
//  or an array of arrays [ ['foo','asc'], ['bar','desc'] ]
function defaultSortCompare(a, b, sortBy) {
  a = (0, _get.default)(a, sortBy, '');
  b = (0, _get.default)(b, sortBy, '');

  if ((0, _inspect.isDate)(a) && (0, _inspect.isDate)(b) || (0, _inspect.isNumber)(a) && (0, _inspect.isNumber)(b)) {
    // Special case for comparing Dates and Numbers
    // Internally dates are compared via their epoch number values
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  } else {
    // Do localized string comparison
    return (0, _stringifyObjectValues.default)(a).localeCompare((0, _stringifyObjectValues.default)(b), undefined, {
      numeric: true
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~b8e8672b.js.map