((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[312],{

/***/ "621e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _inspect = __webpack_require__("0d5a");

var _default = {
  methods: {
    renderTopRow: function renderTopRow() {
      var h = this.$createElement; // Add static Top Row slot (hidden in visibly stacked mode as we can't control the data-label)
      // If in always stacked mode, we don't bother rendering the row

      if (!this.hasNormalizedSlot('top-row') || this.isStacked === true) {
        return h(false);
      }

      var fields = this.computedFields;
      return h('tr', {
        key: 'top-row',
        staticClass: 'b-table-top-row',
        class: [(0, _inspect.isFunction)(this.tbodyTrClass) ? this.tbodyTrClass(null, 'row-top') : this.tbodyTrClass],
        attrs: {
          role: 'row'
        }
      }, [this.normalizeSlot('top-row', {
        columns: fields.length,
        fields: fields
      })]);
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~be7a59e6.js.map