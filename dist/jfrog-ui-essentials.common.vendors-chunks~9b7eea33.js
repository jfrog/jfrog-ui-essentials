((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[255],{

/***/ "0096":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _link = _interopRequireWildcard(__webpack_require__("4e40"));

var _dom = __webpack_require__("1611");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = (0, _link.propsFactory)(); // @vue/component

exports.props = props;

var _default = _vue.default.extend({
  name: 'BDropdownItem',
  inject: {
    bvDropdown: {
      default: null
    }
  },
  props: props,
  methods: {
    closeDropdown: function closeDropdown() {
      var _this = this;

      // Close on next animation frame to allow <b-link> time to process
      (0, _dom.requestAF)(function () {
        if (_this.bvDropdown) {
          _this.bvDropdown.hide(true);
        }
      });
    },
    onClick: function onClick(evt) {
      this.$emit('click', evt);
      this.closeDropdown();
    }
  },
  render: function render(h) {
    return h('li', [h(_link.default, {
      props: this.$props,
      staticClass: 'dropdown-item',
      attrs: {
        role: 'menuitem'
      },
      on: {
        click: this.onClick
      },
      ref: 'item'
    }, this.$slots.default)]);
  }
});

exports.default = _default;

/***/ }),

/***/ "5df9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = {
  active: {
    type: Boolean,
    default: false
  },
  activeClass: {
    type: String,
    default: 'active'
  },
  disabled: {
    type: Boolean,
    default: false
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BDropdownItemButton',
  inject: {
    bvDropdown: {
      default: null
    }
  },
  props: props,
  methods: {
    closeDropdown: function closeDropdown() {
      if (this.bvDropdown) {
        this.bvDropdown.hide(true);
      }
    },
    onClick: function onClick(evt) {
      this.$emit('click', evt);
      this.closeDropdown();
    }
  },
  render: function render(h) {
    return h('li', [h('button', {
      staticClass: 'dropdown-item',
      class: _defineProperty({}, this.activeClass, this.active),
      attrs: {
        role: 'menuitem',
        type: 'button',
        disabled: this.disabled
      },
      on: {
        click: this.onClick
      },
      ref: 'button'
    }, this.$slots.default)]);
  }
});

exports.default = _default;

/***/ }),

/***/ "9668":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'h6'
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BDropdownHeader',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h('li', [h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'dropdown-header',
      attrs: {
        id: props.id || null
      },
      ref: 'header'
    }), children)]);
  }
});

exports.default = _default;

/***/ }),

/***/ "9d3f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _vue.default.extend({
  name: 'BDropdownText',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'p'
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h('li', [h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'b-dropdown-text',
      props: props,
      ref: 'text'
    }), children)]);
  }
});

exports.default = _default;

/***/ }),

/***/ "e14e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _html = __webpack_require__("be11");

var _config = __webpack_require__("eb60");

var _id = _interopRequireDefault(__webpack_require__("eae0"));

var _dropdown = _interopRequireDefault(__webpack_require__("c190"));

var _button = _interopRequireDefault(__webpack_require__("b664"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAME = 'BDropdown';
var props = {
  toggleText: {
    // This really should be toggleLabel
    type: String,
    default: function _default() {
      return String((0, _config.getComponentConfig)(NAME, 'toggleText'));
    }
  },
  size: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: function _default() {
      return String((0, _config.getComponentConfig)(NAME, 'variant') || '') || null;
    }
  },
  menuClass: {
    type: [String, Array],
    default: null
  },
  toggleTag: {
    type: String,
    default: 'button'
  },
  toggleClass: {
    type: [String, Array],
    default: null
  },
  noCaret: {
    type: Boolean,
    default: false
  },
  split: {
    type: Boolean,
    default: false
  },
  splitHref: {
    type: String // default: undefined

  },
  splitTo: {
    type: [String, Object] // default: undefined

  },
  splitVariant: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: 'menu'
  },
  boundary: {
    // String: `scrollParent`, `window` or `viewport`
    // Object: HTML Element reference
    type: [String, Object],
    default: 'scrollParent'
  } // @vue/component

};
exports.props = props;

var _default2 = _vue.default.extend({
  name: NAME,
  mixins: [_id.default, _dropdown.default],
  props: props,
  computed: {
    dropdownClasses: function dropdownClasses() {
      // Position `static` is needed to allow menu to "breakout" of the scrollParent boundaries
      // when boundary is anything other than `scrollParent`
      // See https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
      var positionStatic = this.boundary !== 'scrollParent' || !this.boundary;
      return ['btn-group', 'b-dropdown', 'dropdown', this.directionClass, {
        show: this.visible,
        'position-static': positionStatic
      }];
    },
    menuClasses: function menuClasses() {
      return ['dropdown-menu', {
        'dropdown-menu-right': this.right,
        show: this.visible
      }, this.menuClass];
    },
    toggleClasses: function toggleClasses() {
      return ['dropdown-toggle', {
        'dropdown-toggle-split': this.split,
        'dropdown-toggle-no-caret': this.noCaret && !this.split
      }, this.toggleClass];
    }
  },
  render: function render(h) {
    var split = h(false);

    if (this.split) {
      var btnProps = {
        disabled: this.disabled,
        variant: this.splitVariant || this.variant,
        size: this.size // We add these as needed due to router-link issues with defined property with undefined/null values

      };

      if (this.splitTo) {
        btnProps.to = this.splitTo;
      }

      if (this.splitHref) {
        btnProps.href = this.splitHref;
      }

      split = h(_button.default, {
        ref: 'button',
        props: btnProps,
        attrs: {
          id: this.safeId('_BV_button_')
        },
        on: {
          click: this.click
        }
      }, [this.$slots['button-content'] || this.$slots.text || this.html || (0, _html.stripTags)(this.text)]);
    }

    var toggle = h(_button.default, {
      ref: 'toggle',
      class: this.toggleClasses,
      props: {
        variant: this.variant,
        size: this.size,
        disabled: this.disabled,
        tag: this.toggleTag
      },
      attrs: {
        id: this.safeId('_BV_toggle_'),
        'aria-haspopup': 'true',
        'aria-expanded': this.visible ? 'true' : 'false'
      },
      on: {
        click: this.toggle,
        // click
        keydown: this.toggle // enter, space, down

      }
    }, [this.split ? h('span', {
      class: ['sr-only']
    }, [this.toggleText]) : this.$slots['button-content'] || this.$slots.text || this.html || (0, _html.stripTags)(this.text)]);
    var menu = h('ul', {
      ref: 'menu',
      class: this.menuClasses,
      attrs: {
        role: this.role,
        tabindex: '-1',
        'aria-labelledby': this.safeId(this.split ? '_BV_button_' : '_BV_toggle_')
      },
      on: {
        mouseover: this.onMouseOver,
        keydown: this.onKeydown // tab, up, down, esc

      }
    }, [this.$slots.default]);
    return h('div', {
      attrs: {
        id: this.safeId()
      },
      class: this.dropdownClasses
    }, [split, toggle, menu]);
  }
});

exports.default = _default2;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~9b7eea33.js.map