((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[340],{

/***/ "3163":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _config = __webpack_require__("eb60");

var _dom = __webpack_require__("1611");

var _inspect = __webpack_require__("0d5a");

var _object = __webpack_require__("24e2");

var _warn = __webpack_require__("93e0");

var _toast = _interopRequireWildcard(__webpack_require__("782b"));

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
var PROP_NAME = '$bvToast'; // Base toast props that are allowed
// Some may be ignored or overridden on some message boxes
// Prop ID is allowed, but really only should be used for testing
// We need to add it in explicitly as it comes from the `idMixin`

var BASE_PROPS = ['id'].concat(_toConsumableArray((0, _object.keys)((0, _object.omit)(_toast.props, ['static', 'visible'])))); // Map prop names to toast slot names

var propsToSlots = {
  toastContent: 'default',
  title: 'toast-title' // --- Utility methods ---
  // Method to filter only recognized props that are not undefined

};

var filterOptions = function filterOptions(options) {
  return BASE_PROPS.reduce(function (memo, key) {
    if (!(0, _inspect.isUndefined)(options[key])) {
      memo[key] = options[key];
    }

    return memo;
  }, {});
}; // Create a private sub-component that extends BToast
// which self-destructs after hidden
// @vue/component


var BToastPop = _vue.default.extend({
  name: 'BToastPop',
  extends: _toast.default,
  destroyed: function destroyed() {
    // Make sure we not in document any more
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  mounted: function mounted() {
    // Self destruct handler
    var self = this;

    var handleDestroy = function handleDestroy() {
      // Ensure the toast has been force hidden
      self.localShow = false;
      self.doRender = false;
      self.$nextTick(function () {
        self.$nextTick(function () {
          // In a `requestAF()` to release control back to application
          // and to allow the portal-target time to remove the content
          (0, _dom.requestAF)(function () {
            self.$destroy();
          });
        });
      });
    }; // Self destruct if parent destroyed


    this.$parent.$once('hook:destroyed', handleDestroy); // Self destruct after hidden

    this.$once('hidden', handleDestroy); // Self destruct when toaster is destroyed

    this.listenOnRoot('bv::toaster::destroyed', function (toaster) {
      if (toaster === self.toaster) {
        handleDestroy();
      }
    });
  }
}); // Method to generate the on-demand toast


var makeToast = function makeToast(props, $parent) {
  if ((0, _warn.warnNotClient)(PROP_NAME)) {
    // Should this throw an error?

    /* istanbul ignore next */
    return;
  } // Create an instance of `BToast` component


  var toast = new BToastPop({
    // We set parent as the local VM so these toasts can emit events on
    // the app `$root`
    // And it helps to ensure `BToast` is destroyed when parent is destroyed
    parent: $parent,
    // Preset the prop values
    propsData: _objectSpread({}, filterOptions((0, _config.getComponentConfig)('BToast') || {}), (0, _object.omit)(props, ['toastContent']), {
      // Props that can't be overridden
      static: false,
      visible: true
    })
  }); // Convert certain props to slots

  (0, _object.keys)(propsToSlots).forEach(function (prop) {
    var value = props[prop];

    if (!(0, _inspect.isUndefined)(value)) {
      // Can be a string, or array of VNodes
      // Alternatively, user can use HTML version of prop to pass an HTML string
      if (prop === 'title' && (0, _inspect.isString)(value)) {
        // Special case for title if it is a string, we wrap in a <strong>
        value = [$parent.$createElement('strong', {
          class: 'mr-2'
        }, value)];
      }

      toast.$slots[propsToSlots[prop]] = value;
    }
  }); // Create a mount point (a DIV)
  // TODO: this needs to target a portal-target
  // But we still need to place in document to portal-vue can
  // transfer the content

  var div = document.createElement('div');
  document.body.appendChild(div); // Mount the toast to trigger it to show

  toast.$mount(div);
}; // BvToast instance property class


var BvToast =
/*#__PURE__*/
function () {
  function BvToast(vm) {
    _classCallCheck(this, BvToast);

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
  // Opens a user defined toast and returns immediately


  _createClass(BvToast, [{
    key: "toast",
    value: function toast(content) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!content || (0, _warn.warnNotClient)(PROP_NAME)) {
        // Should this throw an error?

        /* istanbul ignore next */
        return;
      }

      var props = _objectSpread({}, filterOptions(options), {
        toastContent: content
      });

      makeToast(props, this._vm);
    } // shows a `<b-toast>` component with the specified ID

  }, {
    key: "show",
    value: function show(id) {
      if (id) {
        this._root.$emit('bv::show::toast', id);
      }
    } // Hide a toast with specified ID, or if not ID all toasts

  }, {
    key: "hide",
    value: function hide() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._root.$emit('bv::hide::toast', id);
    }
  }]);

  return BvToast;
}(); // Method to install `$bvToast` VM injection


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
      // we have to create a fresh instance of `BvToast` for each VM
      this._bv__toast = new BvToast(this);
    }
  }); // Define our read-only `$bvToast` instance property
  // Placed in an if just in case in HMR mode


  if (!_Vue.prototype.hasOwnProperty(PROP_NAME)) {
    (0, _object.defineProperty)(_Vue.prototype, PROP_NAME, {
      get: function get() {
        return this._bv__toast;
      }
    });
  }
};

var _default = install;
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~cc909622.js.map