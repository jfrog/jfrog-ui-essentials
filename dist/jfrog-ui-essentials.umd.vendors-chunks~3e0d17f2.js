((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[102],{

/***/ "249f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _tooltip = _interopRequireDefault(__webpack_require__("e93a"));

var _tooltip2 = _interopRequireDefault(__webpack_require__("91b6"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BTooltip: _tooltip.default
};
var directives = {
  BTooltip: _tooltip2.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components,
    directives: directives
  })
};
exports.default = _default;

/***/ }),

/***/ "4eb8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.DefaultTransition = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _portalVue = __webpack_require__("2b88");

var _warn = _interopRequireDefault(__webpack_require__("93e0"));

var _dom = __webpack_require__("1611");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore file: for now until ready for testing */
// --- Constants ---
var NAME = 'BToaster';
var props = {
  name: {
    type: String,
    required: true
  },
  ariaLive: {
    type: String,
    default: 'polite'
  },
  ariaAtomic: {
    type: String,
    default: 'true' // Allowed: 'true' or 'false'

  },
  role: {
    // Aria role
    type: String,
    default: null
    /*
    transition: {
      type: [Boolean, String, Object],
      default: false
    }
    */

  } // @vue/component

};
exports.props = props;

var DefaultTransition = _vue.default.extend({
  // functional: true,
  // render(h, { children }) {
  //   return h('transition-group', { props: { tag: 'div', name: 'b-toaster' } }, children)
  data: function data() {
    return {
      // Transition classes base name
      name: 'b-toaster'
    };
  },
  methods: {
    onAfterEnter: function onAfterEnter(el) {
      var _this = this;

      // Handle bug where enter-to class is not removed.
      // Bug is related to portal-vue and transition-groups.
      (0, _dom.requestAF)(function () {
        (0, _dom.removeClass)(el, "".concat(_this.name, "-enter-to")); // The *-move class is also stuck on elements that moved,
        // but there are no javascript hooks to handle after move.
      });
    }
  },
  render: function render(h) {
    return h('transition-group', {
      props: {
        tag: 'div',
        name: this.name
      },
      on: {
        afterEnter: this.onAfterEnter
      }
    }, this.$slots.default);
  }
}); // @vue/component


exports.DefaultTransition = DefaultTransition;

var _default = _vue.default.extend({
  name: NAME,
  props: props,
  data: function data() {
    return {
      // We don't render on SSR or if a an existing target found
      doRender: false,
      dead: false,
      // Toaster names cannot change once created
      staticName: this.name
    };
  },
  beforeMount: function beforeMount() {
    var _this2 = this;

    this.staticName = this.name;
    /* istanbul ignore if */

    if (_portalVue.Wormhole.hasTarget(this.staticName)) {
      (0, _warn.default)("b-toaster: A <portal-target> with name '".concat(this.name, "' already exists in the document."));
      this.dead = true;
    } else {
      this.doRender = true;
      this.$once('hook:beforeDestroy', function () {
        // Let toasts made with `this.$bvToast.toast()` know that this toaster
        // is being destroyed and should should also destroy/hide themselves
        _this2.$root.$emit('bv::toaster::destroyed', _this2.staticName);
      });
    }
  },
  destroyed: function destroyed() {
    // Remove from DOM if needed
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  render: function render(h) {
    var $toaster = h('div', {
      class: ['d-none', {
        'b-dead-toaster': this.dead
      }]
    });

    if (this.doRender) {
      var $target = h(_portalVue.PortalTarget, {
        staticClass: 'b-toaster-slot',
        attrs: {
          role: this.role,
          'aria-live': this.ariaLive,
          'aria-atomic': this.ariaAtomic
        },
        props: {
          name: this.staticName,
          multiple: true,
          tag: 'div',
          slim: false,
          // transition: this.transition || DefaultTransition
          transition: DefaultTransition
        }
      });
      $toaster = h('div', {
        staticClass: 'b-toaster',
        class: [this.staticName],
        attrs: {
          id: this.staticName
        }
      }, [$target]);
    }

    return $toaster;
  }
});

exports.default = _default;

/***/ }),

/***/ "8596":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _toast = _interopRequireDefault(__webpack_require__("782b"));

var _toaster = _interopRequireDefault(__webpack_require__("4eb8"));

var _bvToast = _interopRequireDefault(__webpack_require__("3163"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BToast: _toast.default,
  BToaster: _toaster.default
};

var _install = (0, _plugins.installFactory)({
  components: components
});

var _default = {
  install: function install(Vue) {
    // Inject `$bvToast` into Vue prototype
    (0, _bvToast.default)(Vue); // Install components

    _install(Vue);
  }
};
exports.default = _default;

/***/ }),

/***/ "e93a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _tooltip = _interopRequireDefault(__webpack_require__("16ae"));

var _warn = _interopRequireDefault(__webpack_require__("93e0"));

var _toolpop = _interopRequireDefault(__webpack_require__("c542"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @vue/component
var _default = _vue.default.extend({
  name: 'BTooltip',
  mixins: [_toolpop.default],
  props: {
    title: {
      type: String,
      default: ''
    },
    triggers: {
      type: [String, Array],
      default: 'hover focus'
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  data: function data() {
    return {};
  },
  methods: {
    createToolpop: function createToolpop() {
      // getTarget is in toolpop mixin
      var target = this.getTarget();
      /* istanbul ignore else */

      if (target) {
        this._toolpop = new _tooltip.default(target, this.getConfig(), this.$root);
      } else {
        this._toolpop = null;
        (0, _warn.default)("b-tooltip: 'target' element not found!");
      }

      return this._toolpop;
    }
  },
  render: function render(h) {
    return h('div', {
      class: ['d-none'],
      style: {
        display: 'none'
      },
      attrs: {
        'aria-hidden': true
      }
    }, [h('div', {
      ref: 'title'
    }, this.$slots.default)]);
  }
});

exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~3e0d17f2.js.map