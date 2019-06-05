((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[382],{

/***/ "07d0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _looseEqual = _interopRequireDefault(__webpack_require__("96cd"));

var _id = _interopRequireDefault(__webpack_require__("eae0"));

var _normalizeSlot = _interopRequireDefault(__webpack_require__("532a"));

var _mixinItems = _interopRequireDefault(__webpack_require__("4399"));

var _mixinFiltering = _interopRequireDefault(__webpack_require__("a306"));

var _mixinSorting = _interopRequireDefault(__webpack_require__("e8c7"));

var _mixinPagination = _interopRequireDefault(__webpack_require__("0c42"));

var _mixinCaption = _interopRequireDefault(__webpack_require__("50b2"));

var _mixinColgroup = _interopRequireDefault(__webpack_require__("6a0e"));

var _mixinThead = _interopRequireDefault(__webpack_require__("060b"));

var _mixinTfoot = _interopRequireDefault(__webpack_require__("711a"));

var _mixinTbody = _interopRequireDefault(__webpack_require__("3888"));

var _mixinBusy = _interopRequireDefault(__webpack_require__("7f6b"));

var _mixinSelectable = _interopRequireDefault(__webpack_require__("3966"));

var _mixinProvider = _interopRequireDefault(__webpack_require__("b6bd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// b-table component definition
// @vue/component
var _default2 = _vue.default.extend({
  name: 'BTable',
  // Order of mixins is important.
  // They are merged from left to fight, followed by this component.
  mixins: [_id.default, _normalizeSlot.default, _mixinItems.default, _mixinFiltering.default, _mixinSorting.default, _mixinPagination.default, _mixinBusy.default, _mixinCaption.default, _mixinColgroup.default, _mixinThead.default, _mixinTfoot.default, _mixinTbody.default, _mixinSelectable.default, _mixinProvider.default],
  // Don't place ATTRS on root element automatically, as table could be wrapped in responsive div
  inheritAttrs: false,
  props: {
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    borderless: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: [Boolean, String],
      default: false
    },
    tableClass: {
      type: [String, Array, Object],
      default: null
    },
    value: {
      // v-model for retrieving the current displayed rows
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    // Mixins add to data
    return {};
  },
  computed: {
    // Layout related computed props
    isStacked: function isStacked() {
      return this.stacked === '' ? true : this.stacked;
    },
    isResponsive: function isResponsive() {
      var responsive = this.responsive === '' ? true : this.responsive;
      return this.isStacked ? false : responsive;
    },
    responsiveClass: function responsiveClass() {
      return this.isResponsive === true ? 'table-responsive' : this.isResponsive ? "table-responsive-".concat(this.responsive) : '';
    },
    tableClasses: function tableClasses() {
      return [// User supplied classes
      this.tableClass, // Styling classes
      _defineProperty({
        'table-striped': this.striped,
        'table-hover': this.hover && this.computedItems.length > 0 && !this.computedBusy,
        'table-dark': this.dark,
        'table-bordered': this.bordered,
        'table-borderless': this.borderless,
        'table-sm': this.small,
        border: this.outlined,
        // The following are b-table custom styles
        'b-table-fixed': this.fixed,
        'b-table-stacked': this.stacked === true || this.stacked === ''
      }, "b-table-stacked-".concat(this.stacked), this.stacked !== true && this.stacked), // Selectable classes
      this.selectableTableClasses];
    },
    tableAttrs: function tableAttrs() {
      // Preserve user supplied aria-describedby, if provided in $attrs
      var adb = [(this.$attrs || {})['aria-describedby'], this.captionId].filter(Boolean).join(' ') || null;
      var items = this.computedItems;
      var fields = this.computedFields;
      return _objectSpread({
        // We set aria-rowcount before merging in $attrs, in case user has supplied their own
        'aria-rowcount': this.filteredItems.length > items.length ? String(this.filteredItems.length) : null
      }, this.$attrs, {
        // Now we can override any $attrs here
        id: this.safeId(),
        role: this.isStacked ? 'table' : null,
        'aria-busy': this.computedBusy ? 'true' : 'false',
        'aria-colcount': String(fields.length),
        'aria-describedby': adb
      }, this.selectableTableAttrs);
    },
    context: function context() {
      // Current state of sorting, filtering and pagination props/values
      return {
        filter: this.localFilter,
        sortBy: this.localSortBy,
        sortDesc: this.localSortDesc,
        perPage: parseInt(this.perPage, 10) || 0,
        currentPage: parseInt(this.currentPage, 10) || 1,
        apiUrl: this.apiUrl
      };
    },
    computedItems: function computedItems() {
      return this.paginatedItems || [];
    }
  },
  watch: {
    // Watch for changes on computedItems and update the v-model
    computedItems: function computedItems(newVal, oldVal) {
      this.$emit('input', newVal);
    },
    context: function context(newVal, oldVal) {
      // Emit context info for external paging/filtering/sorting handling
      if (!(0, _looseEqual.default)(newVal, oldVal)) {
        this.$emit('context-changed', newVal);
      }
    }
  },
  mounted: function mounted() {
    // Initially update the v-model of displayed items
    this.$emit('input', this.computedItems);
  },
  render: function render(h) {
    // Build the caption (from caption mixin)
    var $caption = this.renderCaption(); // Build the colgroup

    var $colgroup = this.renderColgroup(); // Build the thead

    var $thead = this.renderThead(); // Build the tfoot

    var $tfoot = this.renderTfoot(); // Build the tbody

    var $tbody = this.renderTbody(); // Assemble table

    var $table = h('table', {
      key: 'b-table',
      staticClass: 'table b-table',
      class: this.tableClasses,
      attrs: this.tableAttrs
    }, [$caption, $colgroup, $thead, $tfoot, $tbody]); // Add responsive wrapper if needed and return table

    return this.isResponsive ? h('div', {
      key: 'b-table-responsive',
      class: this.responsiveClass
    }, [$table]) : $table;
  }
});

exports.default = _default2;

/***/ }),

/***/ "b740":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _table = _interopRequireDefault(__webpack_require__("07d0"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BTable: _table.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~ea207835.js.map