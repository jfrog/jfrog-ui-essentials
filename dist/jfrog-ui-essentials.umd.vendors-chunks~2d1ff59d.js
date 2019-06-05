((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[79],{

/***/ "2e08":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = {
  vertical: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  },
  ariaRole: {
    type: String,
    default: 'group'
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BButtonGroup',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: _defineProperty({
        'btn-group': !props.vertical,
        'btn-group-vertical': props.vertical
      }, "btn-group-".concat(props.size), Boolean(props.size)),
      attrs: {
        role: props.ariaRole
      }
    }), children);
  }
});

exports.default = _default;

/***/ }),

/***/ "5c3f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _buttonToolbar = _interopRequireDefault(__webpack_require__("bb0c"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BButtonToolbar: _buttonToolbar.default,
  BBtnToolbar: _buttonToolbar.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "8b96":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _buttonGroup = _interopRequireDefault(__webpack_require__("2e08"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BButtonGroup: _buttonGroup.default,
  BBtnGroup: _buttonGroup.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "bb0c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _dom = __webpack_require__("1611");

var _keyCodes = _interopRequireDefault(__webpack_require__("06e4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ITEM_SELECTOR = ['.btn:not(.disabled):not([disabled]):not(.dropdown-item)', '.form-control:not(.disabled):not([disabled])', 'select:not(.disabled):not([disabled])', 'input[type="checkbox"]:not(.disabled)', 'input[type="radio"]:not(.disabled)'].join(','); // @vue/component

var _default = _vue.default.extend({
  name: 'BButtonToolbar',
  props: {
    justify: {
      type: Boolean,
      default: false
    },
    keyNav: {
      type: Boolean,
      default: false
    }
  },
  mounted: function mounted() {
    if (this.keyNav) {
      // Pre-set the tabindexes if the markup does not include tabindex="-1" on the toolbar items
      this.getItems();
    }
  },
  methods: {
    onFocusin: function onFocusin(evt) {
      if (evt.target === this.$el) {
        evt.preventDefault();
        evt.stopPropagation();
        this.focusFirst(evt);
      }
    },
    stop: function stop(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },
    onKeydown: function onKeydown(evt) {
      if (!this.keyNav) {
        /* istanbul ignore next: should never happen */
        return;
      }

      var key = evt.keyCode;
      var shift = evt.shiftKey;

      if (key === _keyCodes.default.UP || key === _keyCodes.default.LEFT) {
        this.stop(evt);
        shift ? this.focusFirst(evt) : this.focusPrev(evt);
      } else if (key === _keyCodes.default.DOWN || key === _keyCodes.default.RIGHT) {
        this.stop(evt);
        shift ? this.focusLast(evt) : this.focusNext(evt);
      }
    },
    setItemFocus: function setItemFocus(item) {
      item && item.focus && item.focus();
    },
    focusFirst: function focusFirst(evt) {
      var items = this.getItems();
      this.setItemFocus(items[0]);
    },
    focusPrev: function focusPrev(evt) {
      var items = this.getItems();
      var index = items.indexOf(evt.target);

      if (index > -1) {
        items = items.slice(0, index).reverse();
        this.setItemFocus(items[0]);
      }
    },
    focusNext: function focusNext(evt) {
      var items = this.getItems();
      var index = items.indexOf(evt.target);

      if (index > -1) {
        items = items.slice(index + 1);
        this.setItemFocus(items[0]);
      }
    },
    focusLast: function focusLast(evt) {
      var items = this.getItems().reverse();
      this.setItemFocus(items[0]);
    },
    getItems: function getItems() {
      var items = (0, _dom.selectAll)(ITEM_SELECTOR, this.$el);
      items.forEach(function (item) {
        // Ensure tabfocus is -1 on any new elements
        item.tabIndex = -1;
      });
      return items.filter(function (el) {
        return (0, _dom.isVisible)(el);
      });
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'btn-toolbar',
      class: {
        'justify-content-between': this.justify
      },
      attrs: {
        role: 'toolbar',
        tabindex: this.keyNav ? '0' : null
      },
      on: this.keyNav ? {
        focusin: this.onFocusin,
        keydown: this.onKeydown
      } : {}
    }, [this.$slots.default]);
  }
});

exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~2d1ff59d.js.map