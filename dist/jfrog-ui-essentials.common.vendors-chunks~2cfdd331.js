((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[78],{

/***/ "782b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _portalVue = __webpack_require__("2b88");

var _bvEvent = _interopRequireDefault(__webpack_require__("f8bb"));

var _config = __webpack_require__("eb60");

var _dom = __webpack_require__("1611");

var _listenOnRoot = _interopRequireDefault(__webpack_require__("edbc"));

var _normalizeSlot = _interopRequireDefault(__webpack_require__("532a"));

var _buttonClose = _interopRequireDefault(__webpack_require__("600b"));

var _toaster = _interopRequireDefault(__webpack_require__("4eb8"));

var _link = _interopRequireDefault(__webpack_require__("4e40"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* istanbul ignore file: for now until ready for testing */
// --- Constants ---
var NAME = 'BToast';
var MIN_DURATION = 1000;
var props = {
  id: {
    type: String,
    default: null
  },
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: null
  },
  toaster: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'toaster') || 'b-toaster-top-right';
    }
  },
  isStatus: {
    // Switches role to 'status' and aria-live to 'polite'
    type: Boolean,
    default: false
  },
  appendToast: {
    type: Boolean,
    default: false
  },
  noAutoHide: {
    type: Boolean,
    default: false
  },
  autoHideDelay: {
    type: [Number, String],
    default: 5000
  },
  noCloseButton: {
    type: Boolean,
    default: false
  },
  noFade: {
    type: Boolean,
    default: false
  },
  noHoverPause: {
    type: Boolean,
    default: false
  },
  solid: {
    type: Boolean,
    default: false
  },
  toastClass: {
    type: [String, Object, Array],
    default: ''
  },
  headerClass: {
    type: [String, Object, Array],
    default: ''
  },
  bodyClass: {
    type: [String, Object, Array],
    default: ''
  },
  href: {
    type: String,
    default: null
  },
  to: {
    type: [String, Object],
    default: null
  },
  static: {
    // Render the toast in place, rather than in a portal-target
    type: Boolean,
    default: false
  } // Transition props defaults

};
exports.props = props;
var DEFAULT_TRANSITION_PROPS = {
  name: '',
  enterClass: '',
  enterActiveClass: '',
  enterToClass: '',
  leaveClass: 'show',
  leaveActiveClass: '',
  leaveToClass: '' // @vue/component

};

var _default2 = _vue.default.extend({
  name: NAME,
  mixins: [_listenOnRoot.default, _normalizeSlot.default],
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: props,
  data: function data() {
    return {
      isMounted: false,
      doRender: false,
      localShow: false,
      showClass: false,
      isTransitioning: false,
      order: 0,
      timer: null,
      dismissStarted: 0,
      resumeDismiss: 0
    };
  },
  computed: {
    toastClasses: function toastClasses() {
      return [this.toastClass, {
        show: this.showClass,
        fade: !this.noFade
      }];
    },
    bToastClasses: function bToastClasses() {
      return _defineProperty({
        'b-toast-solid': this.solid,
        'b-toast-append': this.appendToast,
        'b-toast-prepend': !this.appendToast
      }, "b-toast-".concat(this.variant), this.variant);
    },
    slotScope: function slotScope() {
      return {
        hide: this.hide
      };
    },
    computedDuration: function computedDuration() {
      // Minimum supported duration is 1 second
      return Math.max(parseInt(this.autoHideDelay, 10) || 0, MIN_DURATION);
    },
    transitionHandlers: function transitionHandlers() {
      return {
        beforeEnter: this.onBeforeEnter,
        afterEnter: this.onAfterEnter,
        beforeLeave: this.onBeforeLeave,
        afterLeave: this.onAfterLeave
      };
    }
  },
  watch: {
    visible: function visible(newVal) {
      newVal ? this.show() : this.hide();
    },
    localShow: function localShow(newVal) {
      if (newVal !== this.visible) {
        this.$emit('change', newVal);
      }
    },
    toaster: function toaster(newVal) {
      var _this = this;

      // If toaster target changed, make sure toaster exists
      this.$nextTick(function () {
        return _this.ensureToaster;
      });
    },
    static: function _static(newVal) {
      // If static changes to true, and the toast is showing,
      // ensure the toaster target exists
      if (newVal && this.localShow) {
        this.ensureToaster();
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.isMounted = true;
    this.$nextTick(function () {
      if (_this2.visible) {
        (0, _dom.requestAF)(function () {
          _this2.show();
        });
      }
    }); // Listen for global $root show events

    this.listenOnRoot('bv::show::toast', function (id) {
      if (id === _this2.id) {
        _this2.show();
      }
    }); // Listen for global $root hide events

    this.listenOnRoot('bv::hide::toast', function (id) {
      if (!id || id === _this2.id) {
        _this2.hide();
      }
    }); // Make sure we hide when toaster is destroyed

    this.listenOnRoot('bv::toaster::destroyed', function (toaster) {
      if (toaster === _this2.toaster) {
        _this2.hide();
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.clearDismissTimer();
  },
  methods: {
    show: function show() {
      var _this3 = this;

      if (!this.localShow) {
        this.ensureToaster();
        var showEvt = this.buildEvent('show');
        this.emitEvent(showEvt);
        this.dismissStarted = this.resumeDismiss = 0;
        this.order = Date.now() * (this.appendToast ? 1 : -1);
        this.doRender = true;
        this.$nextTick(function () {
          // we show the toast after we have rendered the portal
          _this3.localShow = true;
        });
      }
    },
    hide: function hide() {
      if (this.localShow) {
        var hideEvt = this.buildEvent('hide');
        this.emitEvent(hideEvt);
        this.setHoverHandler(false);
        this.dismissStarted = this.resumeDismiss = 0;
        this.clearDismissTimer();
        this.localShow = false;
      }
    },
    buildEvent: function buildEvent(type) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new _bvEvent.default(type, _objectSpread({
        cancelable: false,
        target: this.$el,
        relatedTarget: null
      }, opts, {
        vueTarget: this,
        componentId: this.id || null,
        toastId: this.id || null
      }));
    },
    emitEvent: function emitEvent(bvEvt) {
      var type = bvEvt.type;
      this.$root.$emit("bv::toast:".concat(type), bvEvt);
      this.$emit(type, bvEvt);
    },
    ensureToaster: function ensureToaster() {
      if (this.static) {
        return;
      }

      if (!_portalVue.Wormhole.hasTarget(this.toaster)) {
        var div = document.createElement('div');
        document.body.append(div);
        var toaster = new _toaster.default({
          parent: this.$root,
          propsData: {
            name: this.toaster
          }
        });
        toaster.$mount(div);
      }
    },
    startDismissTimer: function startDismissTimer() {
      this.clearDismissTimer();

      if (!this.noAutoHide) {
        this.timer = setTimeout(this.hide, this.resumeDismiss || this.computedDuration);
        this.dismissStarted = Date.now();
        this.resumeDismiss = 0;
      }
    },
    clearDismissTimer: function clearDismissTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    setHoverHandler: function setHoverHandler(on) {
      var method = on ? _dom.eventOn : _dom.eventOff;
      method(this.$refs.btoast, 'mouseenter', this.onPause, {
        passive: true,
        capture: false
      });
      method(this.$refs.btoast, 'mouseleave', this.onUnPause, {
        passive: true,
        capture: false
      });
    },
    onPause: function onPause(evt) {
      // Determine time remaining, and then pause timer
      if (this.noAutoHide || this.noHoverPause || !this.timer || this.resumeDismiss) {
        return;
      }

      var passed = Date.now() - this.dismissStarted;

      if (passed > 0) {
        this.clearDismissTimer();
        this.resumeDismiss = Math.max(this.computedDuration - passed, MIN_DURATION);
      }
    },
    onUnPause: function onUnPause(evt) {
      // Restart with max of time remaining or 1 second
      if (this.noAutoHide || this.noHoverPause || !this.resumeDismiss) {
        this.resumeDismiss = this.dismissStarted = 0;
        return;
      }

      this.startDismissTimer();
    },
    onLinkClick: function onLinkClick() {
      var _this4 = this;

      // We delay the close to allow time for the
      // browser to process the link click
      this.$nextTick(function () {
        (0, _dom.requestAF)(function () {
          _this4.hide();
        });
      });
    },
    onBeforeEnter: function onBeforeEnter() {
      var _this5 = this;

      this.isTransitioning = true;
      (0, _dom.requestAF)(function () {
        _this5.showClass = true;
      });
    },
    onAfterEnter: function onAfterEnter() {
      this.isTransitioning = false;
      var hiddenEvt = this.buildEvent('shown');
      this.emitEvent(hiddenEvt);
      this.startDismissTimer();
      this.setHoverHandler(true);
    },
    onBeforeLeave: function onBeforeLeave() {
      var _this6 = this;

      this.isTransitioning = true;
      (0, _dom.requestAF)(function () {
        _this6.showClass = false;
      });
    },
    onAfterLeave: function onAfterLeave() {
      this.isTransitioning = false;
      this.order = 0;
      this.resumeDismiss = this.dismissStarted = 0;
      var hiddenEvt = this.buildEvent('hidden');
      this.emitEvent(hiddenEvt);
      this.doRender = false;
    },
    makeToast: function makeToast(h) {
      var _this7 = this;

      // Render helper for generating the toast
      // Assemble the header content
      var $headerContent = [];
      var $title = this.normalizeSlot('toast-title', this.slotScope);

      if ($title) {
        $headerContent.push($title);
      } else if (this.title) {
        $headerContent.push(h('strong', {
          staticClass: 'mr-2'
        }, this.title));
      }

      if (!this.noCloseButton) {
        $headerContent.push(h(_buttonClose.default, {
          staticClass: 'ml-auto mb-1',
          on: {
            click: function click(evt) {
              _this7.hide();
            }
          }
        }));
      } // Assemble the header (if needed)


      var $header = h(false);

      if ($headerContent.length > 0) {
        $header = h('header', {
          staticClass: 'toast-header',
          class: this.headerClass
        }, $headerContent);
      } // Toast body


      var isLink = this.href || this.to;
      var $body = h(isLink ? _link.default : 'div', {
        staticClass: 'toast-body',
        class: this.bodyClass,
        props: isLink ? {
          to: this.to,
          href: this.href
        } : {},
        on: isLink ? {
          click: this.onLinkClick
        } : {}
      }, [this.normalizeSlot('default', this.slotScope) || h(false)]); // Build the toast

      var $toast = h('div', {
        key: 'toast',
        ref: 'toast',
        staticClass: 'toast',
        class: this.toastClasses,
        attrs: _objectSpread({}, this.$attrs, {
          id: this.id || null,
          tabindex: '-1',
          role: this.isStatus ? 'status' : 'alert',
          'aria-live': this.isStatus ? 'polite' : 'assertive',
          'aria-atomic': 'true'
        })
      }, [$header, $body]);
      return $toast;
    }
  },
  render: function render(h) {
    if (!this.doRender || !this.isMounted) {
      return h(false);
    }

    var name = "b-toast-".concat(this._uid);
    return h(_portalVue.Portal, {
      props: {
        name: name,
        to: this.toaster,
        order: this.order,
        slim: true,
        disabled: this.static
      }
    }, [h('div', {
      key: name,
      ref: 'btoast',
      staticClass: 'b-toast',
      class: this.bToastClasses
    }, [h('transition', {
      props: DEFAULT_TRANSITION_PROPS,
      on: this.transitionHandlers
    }, [this.localShow ? this.makeToast(h) : null])])]);
  }
});

exports.default = _default2;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~2cfdd331.js.map