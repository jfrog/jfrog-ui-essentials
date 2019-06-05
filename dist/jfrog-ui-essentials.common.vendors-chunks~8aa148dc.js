((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[229],{

/***/ "1106":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _inspect = __webpack_require__("0d5a");

var _default = {
  methods: {
    renderBottomRow: function renderBottomRow() {
      var h = this.$createElement; // Static bottom row slot (hidden in visibly stacked mode as we can't control the data-label)
      // If in always stacked mode, we don't bother rendering the row

      if (!this.hasNormalizedSlot('bottom-row') || this.isStacked === true) {
        return h(false);
      }

      var fields = this.computedFields;
      return h('tr', {
        key: '__b-table-bottom-row__',
        staticClass: 'b-table-bottom-row',
        class: [(0, _inspect.isFunction)(this.tbodyTrClass) ? this.tbodyTrClass(null, 'row-bottom') : this.tbodyTrClass],
        attrs: {
          role: 'row'
        }
      }, this.normalizeSlot('bottom-row', {
        columns: fields.length,
        fields: fields
      }));
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "7f6b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _inspect = __webpack_require__("0d5a");

var _default = {
  props: {
    busy: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      localBusy: false
    };
  },
  computed: {
    computedBusy: function computedBusy() {
      return this.busy || this.localBusy;
    }
  },
  watch: {
    localBusy: function localBusy(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('update:busy', newVal);
      }
    }
  },
  methods: {
    // Event handler helper
    stopIfBusy: function stopIfBusy(evt) {
      if (this.computedBusy) {
        // If table is busy (via provider) then don't propagate
        evt.preventDefault();
        evt.stopPropagation();
        return true;
      }

      return false;
    },
    // Renter the busy indicator or return null if not busy
    renderBusy: function renderBusy() {
      var h = this.$createElement; // Return a busy indicator row, or null if not busy

      if (this.computedBusy && this.hasNormalizedSlot('table-busy')) {
        // Show the busy slot
        var trAttrs = {
          role: this.isStacked ? 'row' : null
        };
        var tdAttrs = {
          colspan: String(this.computedFields.length),
          role: this.isStacked ? 'cell' : null
        };
        return h('tr', {
          key: 'table-busy-slot',
          staticClass: 'b-table-busy-slot',
          class: [(0, _inspect.isFunction)(this.tbodyTrClass) ? this.tbodyTrClass(null, 'table-busy') : this.tbodyTrClass],
          attrs: trAttrs
        }, [h('td', {
          attrs: tdAttrs
        }, [this.normalizeSlot('table-busy', {})])]);
      } else {
        // We return null here so that we can determine if we need to
        // render the table items rows or not.
        return null;
      }
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~8aa148dc.js.map