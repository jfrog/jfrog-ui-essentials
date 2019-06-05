((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[249],{

/***/ "4399":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _inspect = __webpack_require__("0d5a");

var _normalizeFields = _interopRequireDefault(__webpack_require__("4d86"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  props: {
    items: {
      type: [Array, Function],
      default: function _default()
      /* istanbul ignore next */
      {
        return [];
      }
    },
    fields: {
      // Object format is deprecated and should be avoided
      type: [Array, Object],
      default: null
    },
    primaryKey: {
      // Primary key for record.
      // If provided the value in each row must be unique!!!
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      // Our local copy of the items. Must be an array
      localItems: (0, _inspect.isArray)(this.items) ? this.items.slice() : []
    };
  },
  computed: {
    computedFields: function computedFields() {
      // We normalize fields into an array of objects
      // [ { key:..., label:..., ...}, {...}, ..., {..}]
      return (0, _normalizeFields.default)(this.fields, this.localItems);
    },
    computedFieldsObj: function computedFieldsObj()
    /* istanbul ignore next: not using at the moment */
    {
      // Fields as a simple lookup hash object
      // Mainly for scopedSlots for convenience
      return this.computedFields.reduce(function (f, obj) {
        obj[f.key] = f;
        return obj;
      }, {});
    }
  },
  watch: {
    items: function items(newItems) {
      /* istanbul ignore else */
      if ((0, _inspect.isArray)(newItems)) {
        // Set localItems/filteredItems to a copy of the provided array
        this.localItems = newItems.slice();
      } else if ((0, _inspect.isUndefined)(newItems) || (0, _inspect.isNull)(newItems)) {
        /* istanbul ignore next */
        this.localItems = [];
      }
    }
  }
};
exports.default = _default2;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~971c759a.js.map