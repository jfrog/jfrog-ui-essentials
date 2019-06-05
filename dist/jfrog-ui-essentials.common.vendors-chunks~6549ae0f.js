((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[166],{

/***/ "211d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _config = __webpack_require__("eb60");

var _pluckProps = _interopRequireDefault(__webpack_require__("9c97"));

var _link = _interopRequireWildcard(__webpack_require__("4e40"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NAME = 'BBadge';
var linkProps = (0, _link.propsFactory)();
delete linkProps.href.default;
delete linkProps.to.default;

var props = _objectSpread({}, linkProps, {
  tag: {
    type: String,
    default: 'span'
  },
  variant: {
    type: String,
    default: function _default() {
      return String((0, _config.getComponentConfig)(NAME, 'variant'));
    }
  },
  pill: {
    type: Boolean,
    default: false
  } // @vue/component

});

exports.props = props;

var _default2 = _vue.default.extend({
  name: NAME,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var tag = !props.href && !props.to ? props.tag : _link.default;
    var componentData = {
      staticClass: 'badge',
      class: ["badge-".concat(props.variant || (0, _config.getComponentConfig)(NAME, 'variant')), {
        'badge-pill': Boolean(props.pill),
        active: props.active,
        disabled: props.disabled
      }],
      props: (0, _pluckProps.default)(linkProps, props)
    };
    return h(tag, (0, _vueFunctionalDataMerge.mergeData)(data, componentData), children);
  }
});

exports.default = _default2;

/***/ }),

/***/ "23f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _config = __webpack_require__("eb60");

var _dom = __webpack_require__("1611");

var _inspect = __webpack_require__("0d5a");

var _buttonClose = _interopRequireDefault(__webpack_require__("600b"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NAME = 'BAlert'; // Convert `show` value to a number

var parseCountDown = function parseCountDown(show) {
  if (show === '' || (0, _inspect.isBoolean)(show)) {
    return 0;
  }

  show = parseInt(show, 10);
  return show > 0 ? show : 0;
}; // Convert `show` value to a boolean


var parseShow = function parseShow(show) {
  if (show === '' || show === true) {
    return true;
  }

  if (parseInt(show, 10) < 1) {
    // Boolean will always return false for the above comparison
    return false;
  }

  return Boolean(show);
}; // Is a value number like (i.e. a number or a number as string)


var isNumericLike = function isNumericLike(value) {
  return !isNaN(parseInt(value, 10));
}; // @vue/component


var _default2 = _vue.default.extend({
  name: NAME,
  model: {
    prop: 'show',
    event: 'input'
  },
  props: {
    variant: {
      type: String,
      default: function _default() {
        return String((0, _config.getComponentConfig)(NAME, 'variant'));
      }
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    dismissLabel: {
      type: String,
      default: function _default() {
        return String((0, _config.getComponentConfig)(NAME, 'dismissLabel'));
      }
    },
    show: {
      type: [Boolean, Number, String],
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      countDownTimerId: null,
      countDown: 0,
      // If initially shown, we need to set these for SSR
      localShow: parseShow(this.show),
      showClass: this.fade && this.show
    };
  },
  watch: {
    show: function show(newVal) {
      this.countDown = parseCountDown(newVal);
      this.localShow = parseShow(newVal);
    },
    countDown: function countDown(newVal) {
      var _this = this;

      this.clearTimer();
      this.$emit('dismiss-count-down', newVal);

      if (this.show !== newVal) {
        // Update the v-model if needed
        this.$emit('input', newVal);
      }

      if (newVal > 0) {
        this.localShow = true;
        this.countDownTimerId = setTimeout(function () {
          _this.countDown--;
        }, 1000);
      } else {
        // Slightly delay the hide to allow any UI updates
        this.$nextTick(function () {
          (0, _dom.requestAF)(function () {
            _this.localShow = false;
          });
        });
      }
    },
    localShow: function localShow(newVal) {
      if (!newVal && (this.dismissible || isNumericLike(this.show))) {
        // Only emit dismissed events for dismissible or auto dismissing alerts
        this.$emit('dismissed');
      }

      if (!isNumericLike(this.show) && this.show !== newVal) {
        // Only emit booleans if we weren't passed a number via `this.show`
        this.$emit('input', newVal);
      }
    }
  },
  created: function created() {
    this.countDown = parseCountDown(this.show);
    this.localShow = parseShow(this.show);
  },
  mounted: function mounted() {
    this.countDown = parseCountDown(this.show);
    this.localShow = parseShow(this.show);
  },
  beforeDestroy: function beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    dismiss: function dismiss() {
      this.clearTimer();
      this.countDown = 0;
      this.localShow = false;
    },
    clearTimer: function clearTimer() {
      if (this.countDownTimerId) {
        clearInterval(this.countDownTimerId);
        this.countDownTimerId = null;
      }
    },
    onBeforeEnter: function onBeforeEnter() {
      var _this2 = this;

      if (this.fade) {
        (0, _dom.requestAF)(function () {
          _this2.showClass = true;
        });
      }
    },
    onBeforeLeave: function onBeforeLeave()
    /* istanbul ignore next: does not appear to be called in vue-test-utils */
    {
      this.showClass = false;
    }
  },
  render: function render(h) {
    var $slots = this.$slots;
    var $alert; // undefined

    if (this.localShow) {
      var $dismissBtn = h(false);

      if (this.dismissible) {
        // Add dismiss button
        $dismissBtn = h(_buttonClose.default, {
          attrs: {
            'aria-label': this.dismissLabel
          },
          on: {
            click: this.dismiss
          }
        }, [$slots.dismiss]);
      }

      $alert = h('div', {
        staticClass: 'alert',
        class: _defineProperty({
          fade: this.fade,
          show: this.showClass,
          'alert-dismissible': this.dismissible
        }, "alert-".concat(this.variant), this.variant),
        attrs: {
          role: 'alert',
          'aria-live': 'polite',
          'aria-atomic': true
        }
      }, [$dismissBtn, $slots.default]);
      $alert = [$alert];
    }

    return h('transition', {
      props: {
        'enter-class': '',
        'enter-active-class': '',
        'enter-to-class': '',
        'leave-class': 'show',
        'leave-active-class': '',
        'leave-to-class': ''
      },
      on: {
        beforeEnter: this.onBeforeEnter,
        beforeLeave: this.onBeforeLeave
      }
    }, $alert);
  }
});

exports.default = _default2;

/***/ }),

/***/ "7cb0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _badge = _interopRequireDefault(__webpack_require__("211d"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BBadge: _badge.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "9e25":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _alert = _interopRequireDefault(__webpack_require__("23f0"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BAlert: _alert.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~6549ae0f.js.map