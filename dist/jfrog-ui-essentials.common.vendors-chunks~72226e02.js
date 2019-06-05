((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[183],{

/***/ "b7af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _modal = _interopRequireWildcard(__webpack_require__("3a5b"));

var _config = __webpack_require__("eb60");

var _inspect = __webpack_require__("0d5a");

var _object = __webpack_require__("24e2");

var _warn = __webpack_require__("93e0");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// --- Constants ---
var PROP_NAME = '$bvModal'; // Base modal props that are allowed
// Some may be ignored or overridden on some message boxes
// Prop ID is allowed, but really only should be used for testing
// We need to add it in explicitly as it comes from the `idMixin`

var BASE_PROPS = ['id'].concat(_toConsumableArray((0, _object.keys)((0, _object.omit)(_modal.props, ['busy', 'lazy', 'noStacking', 'visible'])))); // Fallback event resolver (returns undefined)

var defaultResolver = function defaultResolver(bvModalEvt) {}; // Map prop names to modal slot names


var propsToSlots = {
  msgBoxContent: 'default',
  title: 'modal-title',
  okTitle: 'modal-ok',
  cancelTitle: 'modal-cancel' // --- Utility methods ---
  // Method to filter only recognized props that are not undefined

};

var filterOptions = function filterOptions(options) {
  return BASE_PROPS.reduce(function (memo, key) {
    if (!(0, _inspect.isUndefined)(options[key])) {
      memo[key] = options[key];
    }

    return memo;
  }, {});
}; // Create a private sub-component that extends BModal
// which self-destructs after hidden
// @vue/component


var MsgBox = _vue.default.extend({
  name: 'BMsgBox',
  extends: _modal.default,
  destroyed: function destroyed() {
    // Make sure we not in document any more
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  mounted: function mounted() {
    var _this = this;

    // Self destruct handler
    var handleDestroy = function handleDestroy() {
      var self = _this;

      _this.$nextTick(function () {
        // In a `setTimeout()` to release control back to application
        setTimeout(function () {
          return self.$destroy();
        }, 0);
      });
    }; // Self destruct if parent destroyed


    this.$parent.$once('hook:destroyed', handleDestroy); // Self destruct after hidden

    this.$once('hidden', handleDestroy); // Self destruct on route change

    /* istanbul ignore if */

    if (this.$router && this.$route) {
      var unwatch = this.$watch('$router', handleDestroy);
      this.$once('hook:beforeDestroy', unwatch);
    } // Should we also self destruct on parent deactivation?
    // Show the `MsgBox`


    this.show();
  }
}); // Method to generate the on-demand modal message box
// Returns a promise that resolves to a value returned by the resolve


var asyncMsgBox = function asyncMsgBox(props, $parent) {
  var resolver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultResolver;

  if ((0, _warn.warnNotClient)(PROP_NAME) || (0, _warn.warnNoPromiseSupport)(PROP_NAME)) {
    // Should this throw an error?

    /* istanbul ignore next */
    return;
  } // Create an instance of `MsgBox` component


  var msgBox = new MsgBox({
    // We set parent as the local VM so these modals can emit events on
    // the app `$root`, as needed by things like tooltips and popovers
    // And it helps to ensure `MsgBox` is destroyed when parent is destroyed
    parent: $parent,
    // Preset the prop values
    propsData: _objectSpread({}, filterOptions((0, _config.getComponentConfig)('BModal') || {}), {
      // Defaults that user can override
      hideHeaderClose: true,
      hideHeader: !(props.title || props.titleHtml)
    }, (0, _object.omit)(props, ['msgBoxContent']), {
      // Props that can't be overridden
      lazy: false,
      busy: false,
      visible: false,
      noStacking: false,
      noEnforceFocus: false
    })
  }); // Convert certain props to scoped slots

  (0, _object.keys)(propsToSlots).forEach(function (prop) {
    if (!(0, _inspect.isUndefined)(props[prop])) {
      // Can be a string, or array of VNodes.
      // Alternatively, user can use HTML version of prop to pass an HTML string.
      msgBox.$slots[propsToSlots[prop]] = props[prop];
    }
  }); // Create a mount point (a DIV)

  var div = document.createElement('div');
  document.body.appendChild(div); // Return a promise that resolves when hidden, or rejects on destroyed

  return new Promise(function (resolve, reject) {
    var resolved = false;
    msgBox.$once('hook:destroyed', function () {
      if (!resolved) {
        /* istanbul ignore next */
        reject(new Error('BootstrapVue MsgBox destroyed before resolve'));
      }
    });
    msgBox.$on('hide', function (bvModalEvt) {
      if (!bvModalEvt.defaultPrevented) {
        var result = resolver(bvModalEvt); // If resolver didn't cancel hide, we resolve

        if (!bvModalEvt.defaultPrevented) {
          resolved = true;
          resolve(result);
        }
      }
    }); // Mount the `MsgBox`, which will auto-trigger it to show

    msgBox.$mount(div);
  });
}; // BvModal instance property class


var BvModal =
/*#__PURE__*/
function () {
  function BvModal(vm) {
    _classCallCheck(this, BvModal);

    // Assign the new properties to this instance
    (0, _object.assign)(this, {
      _vm: vm,
      _root: vm.$root
    }); // Set these properties as read-only and non-enumerable

    (0, _object.defineProperties)(this, {
      _vm: (0, _object.readonlyDescriptor)(),
      _root: (0, _object.readonlyDescriptor)()
    });
  } // --- Instance methods ---
  // Show modal with the specified ID args are for future use


  _createClass(BvModal, [{
    key: "show",
    value: function show(id) {
      if (id && this._root) {
        var _this$_root;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_this$_root = this._root).$emit.apply(_this$_root, ['bv::show::modal', id].concat(args));
      }
    } // Hide modal with the specified ID args are for future use

  }, {
    key: "hide",
    value: function hide(id) {
      if (id && this._root) {
        var _this$_root2;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        (_this$_root2 = this._root).$emit.apply(_this$_root2, ['bv::hide::modal', id].concat(args));
      }
    } // TODO: Could make Promise versions of above that first checks
    //       if modal is in document (by ID) and if not found reject
    //       the Promise. Otherwise waits for hide/hidden event and
    //       then resolves returning the `BvModalEvent` object
    //       (which contains the details)
    // The following methods require Promise support!
    // IE 11 and others do not support Promise natively, so users
    // should have a Polyfill loaded (which they need anyways for IE 11 support)
    // Opens a user defined message box and returns a promise

  }, {
    key: "msgBox",
    value: function msgBox(content) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var resolver = arguments.length > 2 ? arguments[2] : undefined;

      if (!content || (0, _warn.warnNoPromiseSupport)(PROP_NAME) || (0, _warn.warnNotClient)(PROP_NAME) || !(0, _inspect.isFunction)(resolver)) {
        // Should this throw an error?

        /* istanbul ignore next */
        return;
      }

      var props = _objectSpread({}, filterOptions(options), {
        msgBoxContent: content
      });

      return asyncMsgBox(props, this._vm, resolver);
    } // Open a message box with OK button only and returns a promise

  }, {
    key: "msgBoxOk",
    value: function msgBoxOk(message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Pick the modal props we support from options
      var props = _objectSpread({}, options, {
        // Add in overrides and our content prop
        okOnly: true,
        okDisabled: false,
        hideFooter: false,
        msgBoxContent: message
      });

      return this.msgBox(message, props, function (bvModalEvt) {
        // Always resolve to true for OK
        return true;
      });
    } // Open a message box modal with OK and CANCEL buttons
    // and returns a promise

  }, {
    key: "msgBoxConfirm",
    value: function msgBoxConfirm(message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Set the modal props we support from options
      var props = _objectSpread({}, options, {
        // Add in overrides and our content prop
        okOnly: false,
        okDisabled: false,
        cancelDisabled: false,
        hideFooter: false
      });

      return this.msgBox(message, props, function (bvModalEvt) {
        var trigger = bvModalEvt.trigger;
        return trigger === 'ok' ? true : trigger === 'cancel' ? false : null;
      });
    }
  }]);

  return BvModal;
}(); // Method to install `$bvModal` VM injection


var install = function install(_Vue) {
  if (install._installed) {
    // Only install once

    /* istanbul ignore next */
    return;
  }

  install._installed = true; // Add our instance mixin

  _Vue.mixin({
    beforeCreate: function beforeCreate() {
      // Because we need access to `$root` for `$emits`, and VM for parenting,
      // we have to create a fresh instance of `BvModal` for each VM
      this._bv__modal = new BvModal(this);
    }
  }); // Define our read-only `$bvModal` instance property
  // Placed in an if just in case in HMR mode


  if (!_Vue.prototype.hasOwnProperty(PROP_NAME)) {
    (0, _object.defineProperty)(_Vue.prototype, PROP_NAME, {
      get: function get() {
        return this._bv__modal;
      }
    });
  }
};

var _default = install;
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~72226e02.js.map