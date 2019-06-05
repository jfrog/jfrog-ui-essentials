((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[242],{

/***/ "532a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _normalizeSlot2 = _interopRequireDefault(__webpack_require__("9de7"));

var _array = __webpack_require__("bb2f");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  methods: {
    hasNormalizedSlot: function hasNormalizedSlot(name) {
      // Returns true if the either a $scopedSlot or $slot exists with the specified name
      return Boolean(this.$scopedSlots[name] || this.$slots[name]);
    },
    normalizeSlot: function normalizeSlot(name) {
      var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Returns an array of rendered vNodes if slot found.
      // Returns undefined if not found.
      var vNodes = (0, _normalizeSlot2.default)(name, scope, this.$scopedSlots, this.$slots);
      return vNodes ? (0, _array.concat)(vNodes) : vNodes;
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "edbc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/**
 * Issue #569: collapse::toggle::state triggered too many times
 * @link https://github.com/bootstrap-vue/bootstrap-vue/issues/569
 */
// @vue/component
var _default = {
  methods: {
    /**
     * Safely register event listeners on the root Vue node.
     * While Vue automatically removes listeners for individual components,
     * when a component registers a listener on root and is destroyed,
     * this orphans a callback because the node is gone,
     * but the root does not clear the callback.
     *
     * When registering a $root listener, it also registers a listener on
     * the component's `beforeDestroy` hook to automatically remove the
     * event listener from the $root instance.
     *
     * @param {string} event
     * @param {function} callback
     * @chainable
     */
    listenOnRoot: function listenOnRoot(event, callback) {
      var _this = this;

      this.$root.$on(event, callback);
      this.$on('hook:beforeDestroy', function () {
        _this.$root.$off(event, callback);
      }); // Return this for easy chaining

      return this;
    },

    /**
     * Safely register a $once event listener on the root Vue node.
     * While Vue automatically removes listeners for individual components,
     * when a component registers a listener on root and is destroyed,
     * this orphans a callback because the node is gone,
     * but the root does not clear the callback.
     *
     * When registering a $root listener, it also registers a listener on
     * the component's `beforeDestroy` hook to automatically remove the
     * event listener from the $root instance.
     *
     * @param {string} event
     * @param {function} callback
     * @chainable
     */
    listenOnRootOnce: function listenOnRootOnce(event, callback) {
      var _this2 = this;

      this.$root.$once(event, callback);
      this.$on('hook:beforeDestroy', function () {
        _this2.$root.$off(event, callback);
      }); // Return this for easy chaining

      return this;
    },

    /**
     * Convenience method for calling vm.$emit on vm.$root.
     * @param {string} event
     * @param {*} args
     * @chainable
     */
    emitOnRoot: function emitOnRoot(event) {
      var _this$$root;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_this$$root = this.$root).$emit.apply(_this$$root, [event].concat(args)); // Return this for easy chaining


      return this;
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~91a4a0a7.js.map