((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[185],{

/***/ "0c42":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;
var _default = {
  props: {
    perPage: {
      type: [Number, String],
      default: 0
    },
    currentPage: {
      type: [Number, String],
      default: 1
    }
  },
  computed: {
    localPaging: function localPaging() {
      return this.hasProvider ? !!this.noProviderPaging : true;
    },
    paginatedItems: function paginatedItems() {
      var items = this.sortedItems || [];
      var currentPage = Math.max(parseInt(this.currentPage, 10) || 1, 1);
      var perPage = Math.max(parseInt(this.perPage, 10) || 0, 0); // Apply local pagination

      if (this.localPaging && !!perPage) {
        // Grab the current page of data (which may be past filtered items limit)
        items = items.slice((currentPage - 1) * perPage, currentPage * perPage);
      } // Return the items to display in the table


      return items;
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "b6bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _looseEqual = _interopRequireDefault(__webpack_require__("96cd"));

var _warn = _interopRequireDefault(__webpack_require__("93e0"));

var _inspect = __webpack_require__("0d5a");

var _listenOnRoot = _interopRequireDefault(__webpack_require__("edbc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  mixins: [_listenOnRoot.default],
  props: {
    noProviderPaging: {
      type: Boolean,
      default: false
    },
    noProviderSorting: {
      type: Boolean,
      default: false
    },
    noProviderFiltering: {
      type: Boolean,
      default: false
    },
    apiUrl: {
      // Passthrough prop. Passed to the context object. Not used by b-table directly
      type: String,
      default: ''
    }
  },
  computed: {
    hasProvider: function hasProvider() {
      return this.items instanceof Function;
    },
    providerTriggerContext: function providerTriggerContext() {
      // Used to trigger the provider function via a watcher. Only the fields that
      // are needed for triggering a provider update are included. Note that the
      // regular this.context is sent to the provider during fetches though, as they
      // may need all the prop info.
      var ctx = {
        apiUrl: this.apiUrl
      };

      if (!this.noProviderFiltering) {
        // Either a string, or could be an object or array.
        ctx.filter = this.localFilter;
      }

      if (!this.noProviderSorting) {
        ctx.sortBy = this.localSortBy;
        ctx.sortDesc = this.localSortDesc;
      }

      if (!this.noProviderPaging) {
        ctx.perPage = this.perPage;
        ctx.currentPage = this.currentPage;
      }

      return ctx;
    }
  },
  watch: {
    // Provider update triggering
    items: function items(newVal, oldVal) {
      // If a new provider has been specified, trigger an update
      if (this.hasProvider || newVal instanceof Function) {
        this.$nextTick(this._providerUpdate);
      }
    },
    providerTriggerContext: function providerTriggerContext(newVal, oldVal) {
      // Trigger the provider to update as the relevant context values have changed.
      if (!(0, _looseEqual.default)(newVal, oldVal)) {
        this.$nextTick(this._providerUpdate);
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    // Call the items provider if necessary
    if (this.hasProvider && (!this.localItems || this.localItems.length === 0)) {
      // Fetch on mount if localItems is empty
      this._providerUpdate();
    } // Listen for global messages to tell us to force refresh the table


    this.listenOnRoot('bv::refresh::table', function (id) {
      if (id === _this.id || id === _this) {
        _this.refresh();
      }
    });
  },
  methods: {
    refresh: function refresh() {
      // Public Method: Force a refresh of the provider function
      this.$off('refreshed', this.refresh);

      if (this.computedBusy) {
        // Can't force an update when forced busy by user (busy prop === true)
        if (this.localBusy && this.hasProvider) {
          // But if provider running (localBusy), re-schedule refresh once `refreshed` emitted
          this.$on('refreshed', this.refresh);
        }
      } else {
        this.clearSelected();

        if (this.hasProvider) {
          this.$nextTick(this._providerUpdate);
        } else {
          /* istanbul ignore next */
          this.localItems = (0, _inspect.isArray)(this.items) ? this.items.slice() : [];
        }
      }
    },
    // Provider related methods
    _providerSetLocal: function _providerSetLocal(items) {
      this.localItems = (0, _inspect.isArray)(items) ? items.slice() : [];
      this.localBusy = false;
      this.$emit('refreshed'); // New root emit

      if (this.id) {
        this.emitOnRoot('bv::table::refreshed', this.id);
      }
    },
    _providerUpdate: function _providerUpdate() {
      // Refresh the provider function items.
      if (!this.hasProvider) {
        // Do nothing if no provider
        return;
      } // If table is busy, wait until refreshed before calling again


      if (this.computedBusy) {
        // Schedule a new refresh once `refreshed` is emitted
        this.$nextTick(this.refresh);
        return;
      } // Set internal busy state


      this.localBusy = true; // Call provider function with context and optional callback after DOM is fully updated

      this.$nextTick(function () {
        var _this2 = this;

        try {
          // Call provider function passing it the context and optional callback
          var data = this.items(this.context, this._providerSetLocal);

          if (data && data.then && (0, _inspect.isFunction)(data.then)) {
            // Provider returned Promise
            data.then(function (items) {
              // Provider resolved with items
              _this2._providerSetLocal(items);
            });
          } else if ((0, _inspect.isArray)(data)) {
            // Provider returned Array data
            this._providerSetLocal(data);
          } else if (this.items.length !== 2) {
            // Check number of arguments provider function requested
            // Provider not using callback (didn't request second argument), so we clear
            // busy state as most likely there was an error in the provider function

            /* istanbul ignore next */
            (0, _warn.default)("b-table provider function didn't request callback and did not return a promise or data");
            /* istanbul ignore next */

            this.localBusy = false;
          }
        } catch (e)
        /* istanbul ignore next */
        {
          // Provider function borked on us, so we spew out a warning
          // and clear the busy state
          (0, _warn.default)("b-table provider function error [".concat(e.name, "] ").concat(e.message));
          this.localBusy = false;
          this.$off('refreshed', this.refresh);
        }
      });
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~7590b234.js.map