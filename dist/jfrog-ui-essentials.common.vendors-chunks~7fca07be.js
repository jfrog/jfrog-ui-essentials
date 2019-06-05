((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[206],{

/***/ "bb2f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.concat = exports.arrayIncludes = exports.isArray = exports.from = void 0;

var _from = _interopRequireDefault(__webpack_require__("d2d5"));

var _isArray = _interopRequireDefault(__webpack_require__("f410"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// --- Static ---
var from = Array.from || _from.default;
exports.from = from;
var isArray = Array.isArray || _isArray.default; // --- Instance ---

exports.isArray = isArray;

var arrayIncludes = function arrayIncludes(array, value) {
  return array.indexOf(value) !== -1;
};

exports.arrayIncludes = arrayIncludes;

var concat = function concat() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Array.prototype.concat.apply([], args);
};

exports.concat = concat;

/***/ }),

/***/ "f8bb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.BvEvent = void 0;

var _object = __webpack_require__("24e2");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BvEvent =
/*#__PURE__*/
function () {
  function BvEvent(type) {
    var eventInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BvEvent);

    // Start by emulating native Event constructor.
    if (!type) {
      /* istanbul ignore next */
      throw new TypeError("Failed to construct '".concat(this.constructor.name, "'. 1 argument required, ").concat(arguments.length, " given."));
    } // Assign defaults first, the eventInit,
    // and the type last so it can't be overwritten.


    (0, _object.assign)(this, BvEvent.Defaults, this.constructor.Defaults, eventInit, {
      type: type
    }); // Freeze some props as readonly, but leave them enumerable.

    (0, _object.defineProperties)(this, {
      type: (0, _object.readonlyDescriptor)(),
      cancelable: (0, _object.readonlyDescriptor)(),
      nativeEvent: (0, _object.readonlyDescriptor)(),
      target: (0, _object.readonlyDescriptor)(),
      relatedTarget: (0, _object.readonlyDescriptor)(),
      vueTarget: (0, _object.readonlyDescriptor)()
    }); // Create a private variable using closure scoping.

    var defaultPrevented = false; // Recreate preventDefault method. One way setter.

    this.preventDefault = function preventDefault() {
      if (this.cancelable) {
        defaultPrevented = true;
      }
    }; // Create 'defaultPrevented' publicly accessible prop
    // that can only be altered by the preventDefault method.


    (0, _object.defineProperty)(this, 'defaultPrevented', {
      enumerable: true,
      get: function get() {
        return defaultPrevented;
      }
    });
  }

  _createClass(BvEvent, null, [{
    key: "Defaults",
    get: function get() {
      return {
        type: '',
        cancelable: true,
        nativeEvent: null,
        target: null,
        relatedTarget: null,
        vueTarget: null
      };
    }
  }]);

  return BvEvent;
}(); // Named Exports


exports.BvEvent = BvEvent;
// Default Export
var _default = BvEvent;
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~7fca07be.js.map