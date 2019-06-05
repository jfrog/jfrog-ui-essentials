((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[354],{

/***/ "3888":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _mixinTbodyRow = _interopRequireDefault(__webpack_require__("282f"));

var _mixinEmpty = _interopRequireDefault(__webpack_require__("0b34"));

var _mixinTopRow = _interopRequireDefault(__webpack_require__("621e"));

var _mixinBottomRow = _interopRequireDefault(__webpack_require__("1106"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// busy mixin is imported in main table.js as it is used by multiple mixins
var _default = {
  mixins: [_mixinTbodyRow.default, _mixinEmpty.default, _mixinTopRow.default, _mixinBottomRow.default],
  props: {
    tbodyClass: {
      type: [String, Array],
      default: null
    },
    tbodyTransitionProps: {
      type: Object // default: undefined

    },
    tbodyTransitionHandlers: {
      type: Object // default: undefined

    }
  },
  methods: {
    renderTbody: function renderTbody() {
      var _this = this;

      // Render the tbody element and children
      var h = this.$createElement;
      var items = this.computedItems; // Prepare the tbody rows

      var $rows = []; // Add the item data rows or the busy slot

      var $busy = this.renderBusy();

      if ($busy) {
        // If table is busy and a busy slot, then return only the busy "row" indicator
        $rows.push($busy);
      } else {
        // Table isn't bsuy, or we don't have a busy slot
        // Add static Top Row slot (hidden in visibly stacked mode as we can't control the data-label)
        $rows.push(this.renderTopRow()); // render the rows

        items.forEach(function (item, rowIndex) {
          // Render the individual item row (rows if details slot)
          $rows.push(_this.renderTbodyRow(item, rowIndex));
        }); // Empty Items / Empty Filtered Row slot (only shows if items.length < -

        $rows.push(this.renderEmpty()); // Static bottom row slot (hidden in visibly stacked mode as we can't control the data-label)

        $rows.push(this.renderBottomRow());
      } // If tbody transition enabled


      var isTransGroup = this.tbodyTransitionProps || this.tbodyTransitionHandlers;
      var tbodyProps = {};
      var tbodyOn = {};

      if (isTransGroup) {
        tbodyOn = this.tbodyTransitionHandlers || {};
        tbodyProps = _objectSpread({}, this.tbodyTransitionProps || {}, {
          tag: 'tbody'
        });
      } // Assemble rows into the tbody


      var $tbody = h(isTransGroup ? 'transition-group' : 'tbody', {
        props: tbodyProps,
        on: tbodyOn,
        class: [this.tbodyClass],
        attrs: {
          role: 'rowgroup'
        }
      }, $rows); // Return the assembled tbody

      return $tbody;
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "711a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;
var _default = {
  props: {
    footClone: {
      type: Boolean,
      default: false
    },
    footVariant: {
      type: String,
      default: ''
    },
    tfootClass: {
      type: [String, Array, Object],
      default: null
    },
    tfootTrClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    footClasses: function footClasses() {
      var variant = this.footVariant || this.headVariant || null;
      return [variant ? 'thead-' + variant : '', this.tfootClass];
    }
  },
  methods: {
    renderTfoot: function renderTfoot() {
      var h = this.$createElement; // Passing true to renderThead will make it render a tfoot

      return this.footClone ? this.renderThead(true) : h(false);
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~d9c5e54b.js.map