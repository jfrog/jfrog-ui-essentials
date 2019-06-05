((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[357],{

/***/ "a306":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _looseEqual = _interopRequireDefault(__webpack_require__("96cd"));

var _warn = _interopRequireDefault(__webpack_require__("93e0"));

var _inspect = __webpack_require__("0d5a");

var _stringifyRecordValues = _interopRequireDefault(__webpack_require__("3b14"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEPRECATION_MSG = 'Supplying a function to prop "filter" is deprecated. Use "filter-function" instead.';
var _default = {
  props: {
    filter: {
      // Passing a function to filter is deprecated and should be avoided
      type: [String, RegExp, Object, Array, Function],
      default: null,
      // `deprecated` -> Don't use this prop
      // `deprecation` -> Refers to a change in prop usage
      deprecation: DEPRECATION_MSG
    },
    filterFunction: {
      type: Function,
      default: null
    }
  },
  data: function data() {
    return {
      // Flag for displaying which empty slot to show, and for some event triggering.
      isFiltered: false
    };
  },
  computed: {
    localFiltering: function localFiltering() {
      return this.hasProvider ? !!this.noProviderFiltering : true;
    },
    filteredCheck: function filteredCheck() {
      // For watching changes to filteredItems vs localItems
      return {
        filteredItems: this.filteredItems,
        localItems: this.localItems,
        localFilter: this.localFilter
      };
    },
    localFilter: function localFilter() {
      // Returns a sanitized/normalized version of filter prop
      if ((0, _inspect.isFunction)(this.filter)) {
        // this.localFilterFn will contain the correct function ref.
        // Deprecate setting prop filter to a function

        /* istanbul ignore next */
        return '';
      } else if (!(0, _inspect.isFunction)(this.filterFunction) && !((0, _inspect.isString)(this.filter) || (0, _inspect.isRegExp)(this.filter))) {
        // Using internal filter function, which only accepts string or regexp at the moment
        return '';
      } else {
        // Could be a string, object or array, as needed by external filter function
        return this.filter;
      }
    },
    localFilterFn: function localFilterFn() {
      var filter = this.filter;
      var filterFn = this.filterFunction; // Sanitized/normalize filter-function prop

      if ((0, _inspect.isFunction)(filterFn)) {
        return filterFn;
      } else if ((0, _inspect.isFunction)(filter)) {
        // Deprecate setting prop filter to a function

        /* istanbul ignore next */
        (0, _warn.default)("b-table: ".concat(DEPRECATION_MSG));
        /* istanbul ignore next */

        return filter;
      } else {
        // no filterFunction, so signal to use internal filter function
        return null;
      }
    },
    filteredItems: function filteredItems() {
      // Returns the records in localItems that match the filter criteria.
      // Returns the original localItems array if not sorting
      var items = this.localItems || [];
      var criteria = this.localFilter;
      var filterFn = this.filterFnFactory(this.localFilterFn, criteria) || this.defaultFilterFnFactory(criteria); // We only do local filtering if requested, and if the are records to filter and
      // if a filter criteria was specified

      if (this.localFiltering && filterFn && items.length > 0) {
        items = items.filter(filterFn);
      }

      return items;
    }
  },
  watch: {
    // Watch for changes to the filter criteria and filtered items vs localItems).
    // And set visual state and emit events as required
    filteredCheck: function filteredCheck(_ref) {
      var filteredItems = _ref.filteredItems,
          localItems = _ref.localItems,
          localFilter = _ref.localFilter;
      // Determine if the dataset is filtered or not
      var isFiltered;

      if (!localFilter) {
        // If filter criteria is falsey
        isFiltered = false;
      } else if ((0, _looseEqual.default)(localFilter, []) || (0, _looseEqual.default)(localFilter, {})) {
        // If filter criteria is an empty array or object
        isFiltered = false;
      } else if (localFilter) {
        // if Filter criteria is truthy
        isFiltered = true;
      } else {
        /* istanbul ignore next: rare chance of reaching this else */
        isFiltered = false;
      }

      if (isFiltered) {
        this.$emit('filtered', filteredItems, filteredItems.length);
      }

      this.isFiltered = isFiltered;
    },
    isFiltered: function isFiltered(newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        // We need to emit a filtered event if isFiltered transitions from true to
        // false so that users can update their pagination controls.
        this.$emit('filtered', this.localItems, this.localItems.length);
      }
    }
  },
  created: function created() {
    var _this = this;

    // Set the initial filtered state.
    // In a nextTick so that we trigger a filtered event if needed
    this.$nextTick(function () {
      _this.isFiltered = Boolean(_this.localFilter);
    });
  },
  methods: {
    // Filter Function factories
    filterFnFactory: function filterFnFactory(filterFn, criteria) {
      // Wrapper factory for external filter functions.
      // Wrap the provided filter-function and return a new function.
      // Returns null if no filter-function defined or if criteria is falsey.
      // Rather than directly grabbing this.computedLocalFilterFn or this.filterFunction
      // we have it passed, so that the caller computed prop will be reactive to changes
      // in the original filter-function (as this routine is a method)
      if (!filterFn || !(0, _inspect.isFunction)(filterFn) || !criteria || (0, _looseEqual.default)(criteria, []) || (0, _looseEqual.default)(criteria, {})) {
        return null;
      } // Build the wrapped filter test function, passing the criteria to the provided function


      var fn = function fn(item) {
        // Generated function returns true if the criteria matches part
        // of the serialized data, otherwise false
        return filterFn(item, criteria);
      }; // Return the wrapped function


      return fn;
    },
    defaultFilterFnFactory: function defaultFilterFnFactory(criteria) {
      // Generates the default filter function, using the given filter criteria
      if (!criteria || !((0, _inspect.isString)(criteria) || (0, _inspect.isRegExp)(criteria))) {
        // Built in filter can only support strings or RegExp criteria (at the moment)
        return null;
      } // Build the regexp needed for filtering


      var regexp = criteria;

      if ((0, _inspect.isString)(regexp)) {
        // Escape special RegExp characters in the string and convert contiguous
        // whitespace to \s+ matches
        var pattern = criteria.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/[\s\uFEFF\xA0]+/g, '\\s+'); // Build the RegExp (no need for global flag, as we only need
        // to find the value once in the string)

        regexp = new RegExp(".*".concat(pattern, ".*"), 'i');
      } // Generate the wrapped filter test function to use


      var fn = function fn(item) {
        // This searches all row values (and sub property values) in the entire (excluding
        // special _ prefixed keys), because we convert the record to a space-separated
        // string containing all the value properties (recursively), even ones that are
        // not visible (not specified in this.fields).
        //
        // TODO: Enable searching on formatted fields and scoped slots
        // TODO: Should we filter only on visible fields (i.e. ones in this.fields) by default?
        // TODO: Allow for searching on specific fields/key, this could be combined with the previous TODO
        // TODO: Give stringifyRecordValues extra options for filtering (i.e. passing the
        //       fields definition and a reference to $scopedSlots)
        //
        // Generated function returns true if the criteria matches part of
        // the serialized data, otherwise false
        // We set lastIndex = 0 on regex in case someone uses the /g global flag
        regexp.lastIndex = 0;
        return regexp.test((0, _stringifyRecordValues.default)(item));
      }; // Return the generated function


      return fn;
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~db8bc07f.js.map