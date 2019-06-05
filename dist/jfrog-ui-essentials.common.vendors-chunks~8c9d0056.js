((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[233],{

/***/ "0a8d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.vueUse = exports.registerDirectives = exports.registerDirective = exports.registerComponents = exports.registerComponent = exports.registerPlugins = exports.installFactory = void 0;

var _config = __webpack_require__("eb60");

var _env = __webpack_require__("4565");

/**
 * Plugin install factory function.
 * @param {object} { components, directives }
 * @returns {function} plugin install function
 */
var installFactory = function installFactory(_ref) {
  var components = _ref.components,
      directives = _ref.directives,
      plugins = _ref.plugins;

  var install = function install(Vue) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (install.installed) {
      /* istanbul ignore next */
      return;
    }

    install.installed = true;
    (0, _config.setConfig)(config);
    registerComponents(Vue, components);
    registerDirectives(Vue, directives);
    registerPlugins(Vue, plugins);
  };

  install.installed = false;
  return install;
};
/**
 * Load a group of plugins.
 * @param {object} Vue
 * @param {object} Plugin definitions
 */


exports.installFactory = installFactory;

var registerPlugins = function registerPlugins(Vue) {
  var plugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  for (var plugin in plugins) {
    if (plugin && plugins[plugin]) {
      Vue.use(plugins[plugin]);
    }
  }
};
/**
 * Load a component.
 * @param {object} Vue
 * @param {string} Component name
 * @param {object} Component definition
 */


exports.registerPlugins = registerPlugins;

var registerComponent = function registerComponent(Vue, name, def) {
  if (Vue && name && def) {
    Vue.component(name, def);
  }
};
/**
 * Load a group of components.
 * @param {object} Vue
 * @param {object} Object of component definitions
 */


exports.registerComponent = registerComponent;

var registerComponents = function registerComponents(Vue) {
  var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  for (var component in components) {
    registerComponent(Vue, component, components[component]);
  }
};
/**
 * Load a directive.
 * @param {object} Vue
 * @param {string} Directive name
 * @param {object} Directive definition
 */


exports.registerComponents = registerComponents;

var registerDirective = function registerDirective(Vue, name, def) {
  if (Vue && name && def) {
    Vue.directive(name, def);
  }
};
/**
 * Load a group of directives.
 * @param {object} Vue
 * @param {object} Object of directive definitions
 */


exports.registerDirective = registerDirective;

var registerDirectives = function registerDirectives(Vue) {
  var directives = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  for (var directive in directives) {
    registerDirective(Vue, directive, directives[directive]);
  }
};
/**
 * Install plugin if window.Vue available
 * @param {object} Plugin definition
 */


exports.registerDirectives = registerDirectives;

var vueUse = function vueUse(VuePlugin) {
  /* istanbul ignore next */
  if (_env.hasWindowSupport && window.Vue) {
    window.Vue.use(VuePlugin);
  }
};

exports.vueUse = vueUse;

/***/ }),

/***/ "9c97":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _identity = _interopRequireDefault(__webpack_require__("fccc"));

var _inspect = __webpack_require__("0d5a");

var _object = __webpack_require__("24e2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given an array of properties or an object of property keys,
 * plucks all the values off the target object, returning a new object
 * that has props that reference the original prop values
 *
 * @param {{}|string[]} keysToPluck
 * @param {{}} objToPluck
 * @param {Function} transformFn
 * @return {{}}
 */
var pluckProps = function pluckProps(keysToPluck, objToPluck) {
  var transformFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _identity.default;
  return ((0, _inspect.isArray)(keysToPluck) ? keysToPluck.slice() : (0, _object.keys)(keysToPluck)).reduce(function (memo, prop) {
    memo[transformFn(prop)] = objToPluck[prop];
    return memo;
  }, {});
};

var _default = pluckProps;
exports.default = _default;

/***/ }),

/***/ "bf9c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _dom = __webpack_require__("1611");

var _warn = __webpack_require__("93e0");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Observe a DOM element changes, falls back to eventListener mode
 * @param {Element} el The DOM element to observe
 * @param {Function} callback callback to be called on change
 * @param {object} [opts={childList: true, subtree: true}] observe options
 * @see http://stackoverflow.com/questions/3219758
 */
var observeDom = function observeDom(el, callback, opts)
/* istanbul ignore next: difficult to test in JSDOM */
{
  // Handle cases where we might be passed a Vue instance
  el = el ? el.$el || el : null; // Early exit when we have no element

  /* istanbul ignore next: difficult to test in JSDOM */

  if (!(0, _dom.isElement)(el)) {
    return null;
  } // Exit and throw a warning when `MutationObserver` isn't available


  if ((0, _warn.warnNoMutationObserverSupport)('observeDom')) {
    return null;
  } // Define a new observer


  var obs = new _dom.MutationObs(function (mutations) {
    var changed = false; // A mutation can contain several change records, so we loop
    // through them to see what has changed
    // We break out of the loop early if any "significant" change
    // has been detected

    for (var i = 0; i < mutations.length && !changed; i++) {
      // The mutation record
      var mutation = mutations[i]; // Mutation type

      var type = mutation.type; // DOM node (could be any DOM node type - HTMLElement, Text, comment, etc.)

      var target = mutation.target; // Detect whether a change happened based on type and target

      if (type === 'characterData' && target.nodeType === Node.TEXT_NODE) {
        // We ignore nodes that are not TEXT (i.e. comments, etc)
        // as they don't change layout
        changed = true;
      } else if (type === 'attributes') {
        changed = true;
      } else if (type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
        // This includes HTMLElement and text nodes being
        // added/removed/re-arranged
        changed = true;
      }
    } // We only call the callback if a change that could affect
    // layout/size truely happened


    if (changed) {
      callback();
    }
  }); // Have the observer observe foo for changes in children, etc

  obs.observe(el, _objectSpread({
    childList: true,
    subtree: true
  }, opts)); // We return a reference to the observer so that `obs.disconnect()`
  // can be called if necessary
  // To reduce overhead when the root element is hidden

  return obs;
};

var _default = observeDom;
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~8c9d0056.js.map