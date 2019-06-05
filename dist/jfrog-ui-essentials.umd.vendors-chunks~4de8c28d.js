((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[133],{

/***/ "2227":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = stringifyObjectValues;

var _object = __webpack_require__("24e2");

var _inspect = __webpack_require__("0d5a");

// Recursively stringifies the values of an object, space separated, in an
// SSR safe deterministic way (keys are sorted before stringification)
//
//   ex:
//     { b: 3, c: { z: 'zzz', d: null, e: 2 }, d: [10, 12, 11], a: 'one' }
//   becomes
//     'one 3 2 zzz 10 12 11'
//
// Primitives (numbers/strings) are returned as-is
// Null and undefined values are filtered out
// Dates are converted to their native string format
//
function stringifyObjectValues(val) {
  if ((0, _inspect.isUndefined)(val) || (0, _inspect.isNull)(val)) {
    /* istanbul ignore next */
    return '';
  }

  if (val instanceof Object && !(val instanceof Date)) {
    // Arrays are also object, and keys just returns the array indexes
    // Date objects we convert to strings
    return (0, _object.keys)(val).sort()
    /* sort to prevent SSR issues on pre-rendered sorted tables */
    .filter(function (v) {
      return !(0, _inspect.isUndefined)(v) && !(0, _inspect.isNull)(v);
    })
    /* ignore undefined/null values */
    .map(function (k) {
      return stringifyObjectValues(val[k]);
    }).join(' ');
  }

  return String(val);
}

/***/ }),

/***/ "3b14":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = stringifyRecordValues;

var _sanitizeRow = _interopRequireDefault(__webpack_require__("b40f"));

var _stringifyObjectValues = _interopRequireDefault(__webpack_require__("2227"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Stringifies the values of a record, ignoring any special top level field keys
// TODO: add option to strigify formatted/scopedSlot items, and only specific fields
function stringifyRecordValues(row) {
  /* istanbul ignore else */
  if (row instanceof Object) {
    return (0, _stringifyObjectValues.default)((0, _sanitizeRow.default)(row));
  } else {
    /* istanbul ignore next */
    return '';
  }
}

/***/ }),

/***/ "b40f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = sanitizeRow;

var _object = __webpack_require__("24e2");

var _constants = __webpack_require__("3ed8");

// Return a copy of a row after all reserved fields have been filtered out
// TODO: add option to specify which fields to include
function sanitizeRow(row) {
  return (0, _object.keys)(row).reduce(function (obj, key) {
    // Ignore special fields that start with _
    if (!_constants.IGNORED_FIELD_KEYS[key]) {
      obj[key] = row[key];
    }

    return obj;
  }, {});
}

/***/ }),

/***/ "c57f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = textSelectionActive;

var _dom = __webpack_require__("1611");

// Helper to determine if a there is an active text selection on the document page.
// Used to filter out click events caused by the mouse up at end of selection
//
// Accepts an element as only argument to test to see if selection overlaps or is
// contained within the element
function textSelectionActive() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var win = window;
  /* istanbul ignore if: JSDOM doesn't support getSelection */

  if (win && win.getSelection && win.getSelection().toString() !== '' && (0, _dom.isElement)(el)) {
    /* istanbul ignore next: JSDOM doesn't support getSelection */
    var sel = win.getSelection();
    /* istanbul ignore next: JSDOM doesn't support getSelection */

    return sel.containsNode ? sel.containsNode(el, true) : false;
  } else {
    return false;
  }
}

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~4de8c28d.js.map