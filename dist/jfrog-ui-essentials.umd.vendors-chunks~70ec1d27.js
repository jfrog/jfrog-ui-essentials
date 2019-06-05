((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[180],{

/***/ "2eee":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _tooltip = _interopRequireDefault(__webpack_require__("91b6"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var directives = {
  BTooltip: _tooltip.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    directives: directives
  })
};
exports.default = _default;

/***/ }),

/***/ "91b6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _popper = _interopRequireDefault(__webpack_require__("f0bd"));

var _tooltip = _interopRequireDefault(__webpack_require__("16ae"));

var _warn = _interopRequireDefault(__webpack_require__("93e0"));

var _env = __webpack_require__("4565");

var _inspect = __webpack_require__("0d5a");

var _object = __webpack_require__("24e2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Key which we use to store tooltip object on element
var BV_TOOLTIP = '__BV_ToolTip__'; // Valid event triggers

var validTriggers = {
  focus: true,
  hover: true,
  click: true,
  blur: true // Build a ToolTip config based on bindings (if any)
  // Arguments and modifiers take precedence over passed value config object

  /* istanbul ignore next: not easy to test */

};

var parseBindings = function parseBindings(bindings)
/* istanbul ignore next: not easy to test */
{
  // We start out with a blank config
  var config = {}; // Process bindings.value

  if ((0, _inspect.isString)(bindings.value)) {
    // Value is tooltip content (html optionally supported)
    config.title = bindings.value;
  } else if ((0, _inspect.isFunction)(bindings.value)) {
    // Title generator function
    config.title = bindings.value;
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
      // No animation
      config.animation = false;
    } else if (/^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/.test(mod)) {
      // Placement of tooltip
      config.placement = mod;
    } else if (/^(window|viewport)$/.test(mod)) {
      // Boundary of tooltip
      config.boundary = mod;
    } else if (/^d\d+$/.test(mod)) {
      // Delay value
      var delay = parseInt(mod.slice(1), 10) || 0;

      if (delay) {
        config.delay = delay;
      }
    } else if (/^o-?\d+$/.test(mod)) {
      // Offset value, negative allowed
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
    // Blur by itself is useless, so convert it to 'focus'
    config.trigger = 'focus';
  }

  if (!config.trigger) {
    // Remove trigger config
    delete config.trigger;
  }

  return config;
}; // Add or update ToolTip on our element


var applyTooltip = function applyTooltip(el, bindings, vnode) {
  if (!_env.isBrowser) {
    /* istanbul ignore next */
    return;
  }

  if (!_popper.default) {
    // Popper is required for ToolTips to work

    /* istanbul ignore next */
    (0, _warn.default)('v-b-tooltip: Popper.js is required for ToolTips to work');
    /* istanbul ignore next */

    return;
  }

  var config = parseBindings(bindings);

  if (el[BV_TOOLTIP]) {
    el[BV_TOOLTIP].updateConfig(config);
  } else {
    el[BV_TOOLTIP] = new _tooltip.default(el, config, vnode.context.$root);
  }
}; // Remove ToolTip on our element


var removeTooltip = function removeTooltip(el) {
  if (el[BV_TOOLTIP]) {
    el[BV_TOOLTIP].destroy();
    el[BV_TOOLTIP] = null;
    delete el[BV_TOOLTIP];
  }
};
/*
 * Export our directive
 */


var _default = {
  bind: function bind(el, bindings, vnode) {
    applyTooltip(el, bindings, vnode);
  },
  inserted: function inserted(el, bindings, vnode) {
    applyTooltip(el, bindings, vnode);
  },
  update: function update(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyTooltip(el, bindings, vnode);
    }
  },
  componentUpdated: function componentUpdated(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyTooltip(el, bindings, vnode);
    }
  },
  unbind: function unbind(el) {
    removeTooltip(el);
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~70ec1d27.js.map