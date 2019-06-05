((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[322],{

/***/ "5764":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _popper = _interopRequireDefault(__webpack_require__("f0bd"));

var _popover = _interopRequireDefault(__webpack_require__("daa8"));

var _warn = _interopRequireDefault(__webpack_require__("93e0"));

var _env = __webpack_require__("4565");

var _inspect = __webpack_require__("0d5a");

var _object = __webpack_require__("24e2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Key which we use to store tooltip object on element
var BV_POPOVER = '__BV_PopOver__'; // Valid event triggers

var validTriggers = {
  focus: true,
  hover: true,
  click: true,
  blur: true // Build a PopOver config based on bindings (if any)
  // Arguments and modifiers take precedence over passed value config object

  /* istanbul ignore next: not easy to test */

};

var parseBindings = function parseBindings(bindings)
/* istanbul ignore next: not easy to test */
{
  // We start out with a blank config
  var config = {}; // Process bindings.value

  if ((0, _inspect.isString)(bindings.value)) {
    // Value is popover content (html optionally supported)
    config.content = bindings.value;
  } else if ((0, _inspect.isFunction)(bindings.value)) {
    // Content generator function
    config.content = bindings.value;
  } else if ((0, _inspect.isObject)(bindings.value)) {
    // Value is config object, so merge
    config = _objectSpread({}, config, bindings.value);
  } // If argument, assume element ID of container element


  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.container = "#".concat(bindings.arg);
  } // Process modifiers


  (0, _object.keys)(bindings.modifiers).forEach(function (mod) {
    if (/^html$/.test(mod)) {
      // Title allows HTML
      config.html = true;
    } else if (/^nofade$/.test(mod)) {
      // no animation
      config.animation = false;
    } else if (/^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/.test(mod)) {
      // placement of popover
      config.placement = mod;
    } else if (/^(window|viewport)$/.test(mod)) {
      // Boundary of popover
      config.boundary = mod;
    } else if (/^d\d+$/.test(mod)) {
      // Delay value
      var delay = parseInt(mod.slice(1), 10) || 0;

      if (delay) {
        config.delay = delay;
      }
    } else if (/^o-?\d+$/.test(mod)) {
      // Offset value (negative allowed)
      var offset = parseInt(mod.slice(1), 10) || 0;

      if (offset) {
        config.offset = offset;
      }
    }
  }); // Special handling of event trigger modifiers trigger is
  // a space separated list

  var selectedTriggers = {}; // Parse current config object trigger

  var triggers = (0, _inspect.isString)(config.trigger) ? config.trigger.trim().split(/\s+/) : [];
  triggers.forEach(function (trigger) {
    if (validTriggers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  }); // Parse modifiers for triggers

  (0, _object.keys)(validTriggers).forEach(function (trigger) {
    if (bindings.modifiers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  }); // Sanitize triggers

  config.trigger = (0, _object.keys)(selectedTriggers).join(' ');

  if (config.trigger === 'blur') {
    // Blur by itself is useless, so convert it to focus
    config.trigger = 'focus';
  }

  if (!config.trigger) {
    // Remove trigger config
    delete config.trigger;
  }

  return config;
}; // Add or update PopOver on our element


var applyPopover = function applyPopover(el, bindings, vnode) {
  if (!_env.isBrowser) {
    /* istanbul ignore next */
    return;
  } // Popper is required for PopOvers to work


  if (!_popper.default) {
    /* istanbul ignore next */
    (0, _warn.default)('v-b-popover: Popper.js is required for PopOvers to work');
    /* istanbul ignore next */

    return;
  }

  var config = parseBindings(bindings);

  if (el[BV_POPOVER]) {
    el[BV_POPOVER].updateConfig(config);
  } else {
    el[BV_POPOVER] = new _popover.default(el, config, vnode.context.$root);
  }
}; // Remove PopOver on our element


var removePopover = function removePopover(el) {
  if (el[BV_POPOVER]) {
    el[BV_POPOVER].destroy();
    el[BV_POPOVER] = null;
    delete el[BV_POPOVER];
  }
};
/*
 * Export our directive
 */


var _default = {
  bind: function bind(el, bindings, vnode) {
    applyPopover(el, bindings, vnode);
  },
  inserted: function inserted(el, bindings, vnode) {
    applyPopover(el, bindings, vnode);
  },
  update: function update(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyPopover(el, bindings, vnode);
    }
  },
  componentUpdated: function componentUpdated(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyPopover(el, bindings, vnode);
    }
  },
  unbind: function unbind(el) {
    removePopover(el);
  }
};
exports.default = _default;

/***/ }),

/***/ "75a9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _scrollspy = _interopRequireDefault(__webpack_require__("d57a"));

var _env = __webpack_require__("4565");

var _object = __webpack_require__("24e2");

var _inspect = __webpack_require__("0d5a");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Key we use to store our instance
var BV_SCROLLSPY = '__BV_ScrollSpy__'; // Build a ScrollSpy config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object

/* istanbul ignore next: not easy to test */

var parseBindings = function parseBindings(bindings)
/* istanbul ignore next: not easy to test */
{
  var config = {}; // If argument, assume element ID

  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.element = "#".concat(bindings.arg);
  } // Process modifiers


  (0, _object.keys)(bindings.modifiers).forEach(function (mod) {
    if (/^\d+$/.test(mod)) {
      // Offset value
      config.offset = parseInt(mod, 10);
    } else if (/^(auto|position|offset)$/.test(mod)) {
      // Offset method
      config.method = mod;
    }
  }); // Process value

  if ((0, _inspect.isString)(bindings.value)) {
    // Value is a CSS ID or selector
    config.element = bindings.value;
  } else if ((0, _inspect.isNumber)(bindings.value)) {
    // Value is offset
    config.offset = Math.round(bindings.value);
  } else if ((0, _inspect.isObject)(bindings.value)) {
    // Value is config object
    // Filter the object based on our supported config options
    (0, _object.keys)(bindings.value).filter(function (k) {
      return Boolean(_scrollspy.default.DefaultType[k]);
    }).forEach(function (k) {
      config[k] = bindings.value[k];
    });
  }

  return config;
}; // Add or update ScrollSpy on our element


var applyScrollspy = function applyScrollspy(el, bindings, vnode)
/* istanbul ignore next: not easy to test */
{
  if (!_env.isBrowser) {
    /* istanbul ignore next */
    return;
  }

  var config = parseBindings(bindings);

  if (el[BV_SCROLLSPY]) {
    el[BV_SCROLLSPY].updateConfig(config, vnode.context.$root);
  } else {
    el[BV_SCROLLSPY] = new _scrollspy.default(el, config, vnode.context.$root);
  }
}; // Remove ScrollSpy on our element

/* istanbul ignore next: not easy to test */


var removeScrollspy = function removeScrollspy(el)
/* istanbul ignore next: not easy to test */
{
  if (el[BV_SCROLLSPY]) {
    el[BV_SCROLLSPY].dispose();
    el[BV_SCROLLSPY] = null;
    delete el[BV_SCROLLSPY];
  }
};
/*
 * Export our directive
 */


var _default = {
  bind: function bind(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    applyScrollspy(el, bindings, vnode);
  },
  inserted: function inserted(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    applyScrollspy(el, bindings, vnode);
  },
  update: function update(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyScrollspy(el, bindings, vnode);
    }
  },
  componentUpdated: function componentUpdated(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyScrollspy(el, bindings, vnode);
    }
  },
  unbind: function unbind(el)
  /* istanbul ignore next: not easy to test */
  {
    removeScrollspy(el);
  }
};
exports.default = _default;

/***/ }),

/***/ "8090":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _scrollspy = _interopRequireDefault(__webpack_require__("75a9"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var directives = {
  BScrollspy: _scrollspy.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    directives: directives
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~c2b0bc75.js.map