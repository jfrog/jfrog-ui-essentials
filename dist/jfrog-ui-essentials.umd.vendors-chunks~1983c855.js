((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[39],{

/***/ "1018":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _tabs = _interopRequireDefault(__webpack_require__("40bb"));

var _tab = _interopRequireDefault(__webpack_require__("a212"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BTabs: _tabs.default,
  BTab: _tab.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "a212":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _id = _interopRequireDefault(__webpack_require__("eae0"));

var _warn = _interopRequireDefault(__webpack_require__("93e0"));

var _dom = __webpack_require__("1611");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEPRECATED_MSG = 'Setting prop "href" is deprecated. Use the <b-nav> component instead.'; // @vue/component

var _default2 = _vue.default.extend({
  name: 'BTab',
  mixins: [_id.default],
  inject: {
    bvTabs: {
      default: function _default() {
        return {
          // Don't set a tab index if not rendered inside <b-tabs>
          noKeyNav: true
        };
      }
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    buttonId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleItemClass: {
      // Sniffed by tabs.js and added to nav 'li.nav-item'
      type: [String, Array, Object],
      default: null
    },
    titleLinkClass: {
      // Sniffed by tabs.js and added to nav 'a.nav-link'
      type: [String, Array, Object],
      default: null
    },
    headHtml: {
      // Is this actually ever used?
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noBody: {
      type: Boolean,
      default: false
    },
    href: {
      // This should be deprecated, as tabs are not navigation (URL) based
      // <b-nav> + <b-card> + <router-view>/<nuxt-child> should be used instead
      // We don't support router-links here
      type: String,
      default: '#',
      // `deprecated` -> Don't use this prop
      // `deprecation` -> Refers to a change in prop usage
      deprecated: DEPRECATED_MSG
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      localActive: this.active && !this.disabled,
      show: false
    };
  },
  computed: {
    tabClasses: function tabClasses() {
      return [{
        show: this.show,
        active: this.localActive,
        fade: this.computedFade,
        disabled: this.disabled,
        'card-body': this.bvTabs.card && !this.noBody
      }, // Apply <b-tabs> `activeTabClass` styles when this tab is active
      this.localActive ? this.bvTabs.activeTabClass : null];
    },
    controlledBy: function controlledBy() {
      return this.buttonId || this.safeId('__BV_tab_button__');
    },
    computedFade: function computedFade() {
      return this.bvTabs.fade || false;
    },
    computedLazy: function computedLazy() {
      return this.bvTabs.lazy || this.lazy;
    },
    _isTab: function _isTab() {
      // For parent sniffing of child
      return true;
    }
  },
  watch: {
    localActive: function localActive(newVal, oldVal) {
      // Make 'active' prop work with `.sync` modifier
      this.$emit('update:active', newVal);
    },
    active: function active(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal) {
          // If activated post mount
          this.activate();
        } else {
          if (!this.deactivate()) {
            // Tab couldn't be deactivated, so we reset the synced active prop
            // Deactivation will fail if no other tabs to activate
            this.$emit('update:active', this.localActive);
          }
        }
      }
    },
    disabled: function disabled(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal && this.localActive && this.bvTabs.firstTab) {
          this.localActive = false;
          this.bvTabs.firstTab();
        }
      }
    }
  },
  mounted: function mounted() {
    // Initially show on mount if active and not disabled
    this.show = this.localActive; // Deprecate use of `href` prop

    if (this.href && this.href !== '#') {
      /* istanbul ignore next */
      (0, _warn.default)("b-tab: ".concat(DEPRECATED_MSG));
    }
  },
  updated: function updated() {
    // Force the tab button content to update (since slots are not reactive)
    // Only done if we have a title slot, as the title prop is reactive
    if (this.$slots.title && this.bvTabs.updateButton) {
      this.bvTabs.updateButton(this);
    }
  },
  methods: {
    // Transition handlers
    beforeEnter: function beforeEnter() {
      var _this = this;

      // Change opacity (add 'show' class) 1 frame after display,
      // otherwise CSS transition won't happen
      (0, _dom.requestAF)(function () {
        _this.show = true;
      });
    },
    beforeLeave: function beforeLeave() {
      // Remove the 'show' class
      this.show = false;
    },
    // Public methods
    activate: function activate() {
      if (this.bvTabs.activateTab && !this.disabled) {
        return this.bvTabs.activateTab(this);
      } else {
        // Not inside a <b-tabs> component or tab is disabled
        return false;
      }
    },
    deactivate: function deactivate() {
      if (this.bvTabs.deactivateTab && this.localActive) {
        return this.bvTabs.deactivateTab(this);
      } else {
        // Not inside a <b-tabs> component or not active to begin with
        return false;
      }
    }
  },
  render: function render(h) {
    var content = h(this.tag, {
      ref: 'panel',
      staticClass: 'tab-pane',
      class: this.tabClasses,
      directives: [// TODO: Convert to style object in render
      {
        name: 'show',
        rawName: 'v-show',
        value: this.localActive,
        expression: 'localActive'
      }],
      attrs: {
        role: 'tabpanel',
        id: this.safeId(),
        tabindex: this.localActive && !this.bvTabs.noKeyNav ? '0' : null,
        'aria-hidden': this.localActive ? 'false' : 'true',
        'aria-labelledby': this.controlledBy || null
      }
    }, // Render content lazily if requested
    [this.localActive || !this.computedLazy ? this.$slots.default : h(false)]);
    return h('transition', {
      props: {
        mode: 'out-in',
        // Disable use of built-in transition classes
        'enter-class': '',
        'enter-active-class': '',
        'enter-to-class': '',
        'leave-class': '',
        'leave-active-class': '',
        'leave-to-class': ''
      },
      on: {
        beforeEnter: this.beforeEnter,
        beforeLeave: this.beforeLeave
      }
    }, [content]);
  }
});

exports.default = _default2;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~1983c855.js.map