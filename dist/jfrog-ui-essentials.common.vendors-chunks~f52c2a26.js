((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[401],{

/***/ "e4c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _listenOnRoot = _interopRequireDefault(__webpack_require__("edbc"));

var _env = __webpack_require__("4565");

var _dom = __webpack_require__("1611");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Events we emit on $root
var EVENT_STATE = 'bv::collapse::state';
var EVENT_ACCORDION = 'bv::collapse::accordion'; // Private event we emit on $root to ensure the toggle state is always synced
// Gets emited even if the state has not changed!
// This event is NOT to be documented as people should not be using it.

var EVENT_STATE_SYNC = 'bv::collapse::sync::state'; // Events we listen to on $root

var EVENT_TOGGLE = 'bv::toggle::collapse'; // Event Listener options

var EventOptions = {
  passive: true,
  capture: false // @vue/component

};

var _default = _vue.default.extend({
  name: 'BCollapse',
  mixins: [_listenOnRoot.default],
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    isNav: {
      type: Boolean,
      default: false
    },
    accordion: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  data: function data() {
    return {
      show: this.visible,
      transitioning: false
    };
  },
  computed: {
    classObject: function classObject() {
      return {
        'navbar-collapse': this.isNav,
        collapse: !this.transitioning,
        show: this.show && !this.transitioning
      };
    }
  },
  watch: {
    visible: function visible(newVal) {
      if (newVal !== this.show) {
        this.show = newVal;
      }
    },
    show: function show(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.emitState();
      }
    }
  },
  created: function created() {
    this.show = this.visible; // Listen for toggle events to open/close us

    this.listenOnRoot(EVENT_TOGGLE, this.handleToggleEvt); // Listen to other collapses for accordion events

    this.listenOnRoot(EVENT_ACCORDION, this.handleAccordionEvt);
  },
  mounted: function mounted() {
    var _this = this;

    this.show = this.visible;

    if (this.isNav && _env.isBrowser) {
      // Set up handlers
      this.setWindowEvents(true);
      this.handleResize();
    }

    this.$nextTick(function () {
      _this.emitState();
    });
  },
  updated: function updated() {
    // Emit a private event every time this component updates
    // to ensure the toggle button is in sync with the collapse's state.
    // It is emitted regardless if the visible state changes.
    this.$root.$emit(EVENT_STATE_SYNC, this.id, this.show);
  },
  deactivated: function deactivated()
  /* istanbul ignore next */
  {
    if (this.isNav && _env.isBrowser) {
      this.setWindowEvents(false);
    }
  },
  activated: function activated()
  /* istanbul ignore next */
  {
    if (this.isNav && _env.isBrowser) {
      this.setWindowEvents(true);
    }

    this.$root.$emit(EVENT_STATE_SYNC, this.id, this.show);
  },
  beforeDestroy: function beforeDestroy() {
    // Trigger state emit if needed
    this.show = false;

    if (this.isNav && _env.isBrowser) {
      this.setWindowEvents(false);
    }
  },
  methods: {
    setWindowEvents: function setWindowEvents(on) {
      var method = on ? _dom.eventOn : _dom.eventOff;
      method(window, 'resize', this.handleResize, EventOptions);
      method(window, 'orientationchange', this.handleResize, EventOptions);
    },
    toggle: function toggle() {
      this.show = !this.show;
    },
    onEnter: function onEnter(el) {
      el.style.height = 0;
      (0, _dom.reflow)(el);
      el.style.height = el.scrollHeight + 'px';
      this.transitioning = true; // This should be moved out so we can add cancellable events

      this.$emit('show');
    },
    onAfterEnter: function onAfterEnter(el) {
      el.style.height = null;
      this.transitioning = false;
      this.$emit('shown');
    },
    onLeave: function onLeave(el) {
      el.style.height = 'auto';
      el.style.display = 'block';
      el.style.height = (0, _dom.getBCR)(el).height + 'px';
      (0, _dom.reflow)(el);
      this.transitioning = true;
      el.style.height = 0; // This should be moved out so we can add cancellable events

      this.$emit('hide');
    },
    onAfterLeave: function onAfterLeave(el) {
      el.style.height = null;
      this.transitioning = false;
      this.$emit('hidden');
    },
    emitState: function emitState() {
      this.$emit('input', this.show); // Let v-b-toggle know the state of this collapse

      this.$root.$emit(EVENT_STATE, this.id, this.show);

      if (this.accordion && this.show) {
        // Tell the other collapses in this accordion to close
        this.$root.$emit(EVENT_ACCORDION, this.id, this.accordion);
      }
    },
    clickHandler: function clickHandler(evt) {
      // If we are in a nav/navbar, close the collapse when non-disabled link clicked
      var el = evt.target;

      if (!this.isNav || !el || (0, _dom.getCS)(this.$el).display !== 'block') {
        /* istanbul ignore next: can't test getComputedStyle in JSDOM */
        return;
      }

      if ((0, _dom.matches)(el, '.nav-link,.dropdown-item') || (0, _dom.closest)('.nav-link,.dropdown-item', el)) {
        this.show = false;
      }
    },
    handleToggleEvt: function handleToggleEvt(target) {
      if (target !== this.id) {
        return;
      }

      this.toggle();
    },
    handleAccordionEvt: function handleAccordionEvt(openedId, accordion) {
      if (!this.accordion || accordion !== this.accordion) {
        return;
      }

      if (openedId === this.id) {
        // Open this collapse if not shown
        if (!this.show) {
          this.toggle();
        }
      } else {
        // Close this collapse if shown
        if (this.show) {
          this.toggle();
        }
      }
    },
    handleResize: function handleResize() {
      // Handler for orientation/resize to set collapsed state in nav/navbar
      this.show = (0, _dom.getCS)(this.$el).display === 'block';
    }
  },
  render: function render(h) {
    var content = h(this.tag, {
      class: this.classObject,
      directives: [{
        name: 'show',
        value: this.show
      }],
      attrs: {
        id: this.id || null
      },
      on: {
        click: this.clickHandler
      }
    }, [this.$slots.default]);
    return h('transition', {
      props: {
        enterClass: '',
        enterActiveClass: 'collapsing',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: 'collapsing',
        leaveToClass: ''
      },
      on: {
        enter: this.onEnter,
        afterEnter: this.onAfterEnter,
        leave: this.onLeave,
        afterLeave: this.onAfterLeave
      }
    }, [content]);
  }
});

exports.default = _default;

/***/ }),

/***/ "f3fa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _collapse = _interopRequireDefault(__webpack_require__("e4c5"));

var _toggle = _interopRequireDefault(__webpack_require__("a596"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BCollapse: _collapse.default
};
var directives = {
  BToggle: _toggle.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components,
    directives: directives
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~f52c2a26.js.map