((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[285],{

/***/ "41cd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _listenOnRoot = _interopRequireDefault(__webpack_require__("edbc"));

var _config = __webpack_require__("eb60");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAME = 'BNavbarToggle'; // Events we emit on $root

var EVENT_TOGGLE = 'bv::toggle::collapse'; // Events we listen to on $root

var EVENT_STATE = 'bv::collapse::state'; // This private event is NOT to be documented as people should not be using it.

var EVENT_STATE_SYNC = 'bv::collapse::sync::state'; // @vue/component

var _default2 = _vue.default.extend({
  name: NAME,
  mixins: [_listenOnRoot.default],
  props: {
    label: {
      type: String,
      default: function _default() {
        return String((0, _config.getComponentConfig)(NAME, 'label') || '');
      }
    },
    target: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      toggleState: false
    };
  },
  created: function created() {
    this.listenOnRoot(EVENT_STATE, this.handleStateEvt);
    this.listenOnRoot(EVENT_STATE_SYNC, this.handleStateEvt);
  },
  methods: {
    onClick: function onClick(evt) {
      this.$emit('click', evt);

      if (!evt.defaultPrevented) {
        this.$root.$emit(EVENT_TOGGLE, this.target);
      }
    },
    handleStateEvt: function handleStateEvt(id, state) {
      if (id === this.target) {
        this.toggleState = state;
      }
    }
  },
  render: function render(h) {
    return h('button', {
      class: ['navbar-toggler'],
      attrs: {
        type: 'button',
        'aria-label': this.label,
        'aria-controls': this.target,
        'aria-expanded': this.toggleState ? 'true' : 'false'
      },
      on: {
        click: this.onClick
      }
    }, [this.$slots.default || h('span', {
      class: ['navbar-toggler-icon']
    })]);
  }
});

exports.default = _default2;

/***/ }),

/***/ "4d00":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _pluckProps = _interopRequireDefault(__webpack_require__("9c97"));

var _nav = __webpack_require__("92e4");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// -- Constants --
var props = (0, _pluckProps.default)(['tag', 'fill', 'justified', 'align', 'small'], _nav.props); // -- Utils --

exports.props = props;

var computeJustifyContent = function computeJustifyContent(value) {
  // Normalize value
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value;
  return "justify-content-".concat(value);
}; // @vue/component


var _default = _vue.default.extend({
  name: 'BNavbarNav',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'navbar-nav',
      class: (_class = {
        'nav-fill': props.fill,
        'nav-justified': props.justified
      }, _defineProperty(_class, computeJustifyContent(props.align), props.align), _defineProperty(_class, "small", props.small), _class)
    }), children);
  }
});

exports.default = _default;

/***/ }),

/***/ "c52a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _link = _interopRequireWildcard(__webpack_require__("4e40"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _pluckProps = _interopRequireDefault(__webpack_require__("9c97"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var linkProps = (0, _link.propsFactory)();
linkProps.href.default = undefined;
linkProps.to.default = undefined;

var props = _objectSpread({}, linkProps, {
  tag: {
    type: String,
    default: 'div'
  } // @vue/component

});

exports.props = props;

var _default = _vue.default.extend({
  name: 'BNavbarBrand',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var isLink = Boolean(props.to || props.href);
    var tag = isLink ? _link.default : props.tag;
    return h(tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'navbar-brand',
      props: isLink ? (0, _pluckProps.default)(linkProps, props) : {}
    }), children);
  }
});

exports.default = _default;

/***/ }),

/***/ "e1a8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _config = __webpack_require__("eb60");

var _inspect = __webpack_require__("0d5a");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = {
  tag: {
    type: String,
    default: 'nav'
  },
  type: {
    type: String,
    default: 'light'
  },
  variant: {
    type: String
  },
  toggleable: {
    type: [Boolean, String],
    default: false
  },
  fixed: {
    type: String
  },
  sticky: {
    type: Boolean,
    default: false
  },
  print: {
    type: Boolean,
    default: false
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BNavbar',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var breakpoint = '';
    var xs = (0, _config.getBreakpoints)()[0];

    if (props.toggleable && (0, _inspect.isString)(props.toggleable) && props.toggleable !== xs) {
      breakpoint = "navbar-expand-".concat(props.toggleable);
    } else if (props.toggleable === false) {
      breakpoint = 'navbar-expand';
    }

    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'navbar',
      class: (_class = {
        'd-print': props.print,
        'sticky-top': props.sticky
      }, _defineProperty(_class, "navbar-".concat(props.type), Boolean(props.type)), _defineProperty(_class, "bg-".concat(props.variant), Boolean(props.variant)), _defineProperty(_class, "fixed-".concat(props.fixed), Boolean(props.fixed)), _defineProperty(_class, "".concat(breakpoint), Boolean(breakpoint)), _class),
      attrs: {
        role: props.tag === 'nav' ? null : 'navigation'
      }
    }), children);
  }
});

exports.default = _default;

/***/ }),

/***/ "edd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _navbar = _interopRequireDefault(__webpack_require__("e1a8"));

var _navbarNav = _interopRequireDefault(__webpack_require__("4d00"));

var _navbarBrand = _interopRequireDefault(__webpack_require__("c52a"));

var _navbarToggle = _interopRequireDefault(__webpack_require__("41cd"));

var _nav = _interopRequireDefault(__webpack_require__("6423"));

var _collapse = _interopRequireDefault(__webpack_require__("f3fa"));

var _dropdown = _interopRequireDefault(__webpack_require__("c7b9"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BNavbar: _navbar.default,
  BNavbarNav: _navbarNav.default,
  BNavbarBrand: _navbarBrand.default,
  BNavbarToggle: _navbarToggle.default,
  BNavToggle: _navbarToggle.default
};
var plugins = {
  NavPlugin: _nav.default,
  CollapsePlugin: _collapse.default,
  DropdownPlugin: _dropdown.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components,
    plugins: plugins
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~adad1d55.js.map