((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[220],{

/***/ "eb60":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getBreakpointsDownCached = exports.getBreakpointsUpCached = exports.getBreakpointsCached = exports.getBreakpointsDown = exports.getBreakpointsUp = exports.getBreakpoints = exports.getComponentConfig = exports.getConfigValue = exports.getDefaults = exports.getConfig = exports.resetConfig = exports.setConfig = void 0;

var _cloneDeep = _interopRequireDefault(__webpack_require__("f18f"));

var _get = _interopRequireDefault(__webpack_require__("b0df"));

var _memoize = _interopRequireDefault(__webpack_require__("64bb"));

var _warn = _interopRequireDefault(__webpack_require__("93e0"));

var _inspect = __webpack_require__("0d5a");

var _object = __webpack_require__("24e2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// General BootstrapVue configuration
//
// BREAKPOINT DEFINITIONS
//
// Some components (BCol and BFormGroup) generate props based on breakpoints, and this
// occurs when the component is first loaded (evaluated), which may happen before the
// config is created/modified
//
// To get around this we make these components async (lazy evaluation)
// The component definition is only called/executed when the first access to the
// component is used (and cached on subsequent uses)
//
// See: https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
//
// PROP DEFAULTS
//
// For default values on props, we use the default value factory function approach so
// so that the default values are pulled in at each component instantiation
//
//  props: {
//    variant: {
//      type: String,
//      default: () => getConfigComponent('BAlert', 'variant')
//    }
//  }
// prettier-ignore
var DEFAULTS = {
  // Breakpoints
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  // Component Specific defaults are keyed by the component
  // name (PascalCase) and prop name (camelCase)
  BAlert: {
    dismissLabel: 'Close',
    variant: 'info'
  },
  BBadge: {
    variant: 'secondary'
  },
  BButton: {
    variant: 'secondary'
  },
  BButtonClose: {
    // `textVariant` is `null` to inherit the current text color
    textVariant: null,
    ariaLabel: 'Close'
  },
  BCardSubTitle: {
    // BCard and BCardBody also inherit this prop
    subTitleTextVariant: 'muted'
  },
  BCarousel: {
    labelPrev: 'Previous Slide',
    labelNext: 'Next Slide',
    labelGotoSlide: 'Goto Slide',
    labelIndicators: 'Select a slide to display'
  },
  BDropdown: {
    toggleText: 'Toggle Dropdown',
    variant: 'secondary'
  },
  BFormFile: {
    browseText: 'Browse',
    // Chrome default file prompt
    placeholder: 'No file chosen',
    dropPlaceholder: 'Drop files here'
  },
  BFormText: {
    textVariant: 'muted'
  },
  BImg: {
    blankColor: 'transparent'
  },
  BImgLazy: {
    blankColor: 'transparent'
  },
  BModal: {
    cancelTitle: 'Cancel',
    cancelVariant: 'secondary',
    okTitle: 'OK',
    okVariant: 'primary',
    headerCloseLabel: 'Close'
  },
  BNavbarToggle: {
    label: 'Toggle navigation'
  },
  BToast: {
    toaster: 'b-toaster-top-right'
  } // This contains user defined configuration

};
var CONFIG = {}; // Method to get a deep clone (immutable) copy of the defaults

var getDefaults = function getDefaults() {
  return (0, _cloneDeep.default)(DEFAULTS);
}; // Method to set the config
// Merges in only known top-level and sub-level keys
//   Vue.use(BootstrapVue, config)
// or
//   BootstrapVue.setConfig(config)
//   Vue.use(BootstrapVue)


exports.getDefaults = getDefaults;

var setConfig = function setConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!(0, _inspect.isObject)(config)) {
    /* istanbul ignore next */
    return;
  }

  (0, _object.keys)(config).filter(function (cmpName) {
    return config.hasOwnProperty(cmpName);
  }).forEach(function (cmpName) {
    if (!DEFAULTS.hasOwnProperty(cmpName)) {
      /* istanbul ignore next */
      (0, _warn.default)("config: unknown config property \"".concat(cmpName, "\""));
      /* istanbul ignore next */

      return;
    }

    var cmpConfig = config[cmpName];

    if (cmpName === 'breakpoints') {
      // Special case for breakpoints
      var breakpoints = config.breakpoints;

      if (!(0, _inspect.isArray)(breakpoints) || breakpoints.length < 2 || breakpoints.some(function (b) {
        return !(0, _inspect.isString)(b) || b.length === 0;
      })) {
        /* istanbul ignore next */
        (0, _warn.default)('config: "breakpoints" must be an array of at least 2 breakpoint names');
      } else {
        CONFIG.breakpoints = (0, _cloneDeep.default)(breakpoints);
      }
    } else if ((0, _inspect.isObject)(cmpConfig)) {
      (0, _object.keys)(cmpConfig).filter(function (key) {
        return cmpConfig.hasOwnProperty(key);
      }).forEach(function (key) {
        if (!DEFAULTS[cmpName].hasOwnProperty(key)) {
          /* istanbul ignore next */
          (0, _warn.default)("config: unknown config property \"".concat(cmpName, ".{$key}\""));
        } else {
          // If we pre-populate the config with defaults, we can skip this line
          CONFIG[cmpName] = CONFIG[cmpName] || {};

          if (!(0, _inspect.isUndefined)(cmpConfig[key])) {
            CONFIG[cmpName][key] = (0, _cloneDeep.default)(cmpConfig[key]);
          }
        }
      });
    }
  });
}; // Reset the user config to default
// For testing purposes only


exports.setConfig = setConfig;

var resetConfig = function resetConfig() {
  CONFIG = {};
}; // Get the current user config
// For testing purposes only


exports.resetConfig = resetConfig;

var getConfig = function getConfig() {
  return (0, _cloneDeep.default)(CONFIG);
}; // Method to grab a config value based on a dotted/array notation key
// Returns a deep clone (immutable) copy


exports.getConfig = getConfig;

var getConfigValue = function getConfigValue(key) {
  // First we try the user config, and if key not found we fall back to default value
  // NOTE: If we deep clone DEFAULTS into config, then we can skip the fallback for get
  return (0, _cloneDeep.default)((0, _get.default)(CONFIG, key, (0, _get.default)(getDefaults(), key)));
}; // Method to grab a config value for a particular component.
// Returns a deep clone (immutable) copy


exports.getConfigValue = getConfigValue;

var getComponentConfig = function getComponentConfig(cmpName) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // Return the particular config value for key for if specified,
  // otherwise we return the full config
  return key ? getConfigValue("".concat(cmpName, ".").concat(key)) : getConfigValue(cmpName) || {};
}; // Convenience method for getting all breakpoint names


exports.getComponentConfig = getComponentConfig;

var getBreakpoints = function getBreakpoints() {
  return getConfigValue('breakpoints');
}; // Convenience method for getting all breakpoint names
// Caches the results after first access


exports.getBreakpoints = getBreakpoints;
var getBreakpointsCached = (0, _memoize.default)(function () {
  return getConfigValue('breakpoints');
}); // Convenience method for getting breakpoints with
// the smallest breakpoint set as ''
// Useful for components that create breakpoint specific props

exports.getBreakpointsCached = getBreakpointsCached;

var getBreakpointsUp = function getBreakpointsUp() {
  var breakpoints = getBreakpoints();
  breakpoints[0] = '';
  return breakpoints;
}; // Convenience method for getting breakpoints with
// the smallest breakpoint set as ''
// Useful for components that create breakpoint specific props
// Caches the results after first access


exports.getBreakpointsUp = getBreakpointsUp;
var getBreakpointsUpCached = (0, _memoize.default)(function () {
  var breakpoints = getBreakpointsCached().slice();
  breakpoints[0] = '';
  return breakpoints;
}); // Convenience method for getting breakpoints with
// the largest breakpoint set as ''
// Useful for components that create breakpoint specific props

exports.getBreakpointsUpCached = getBreakpointsUpCached;

var getBreakpointsDown = function getBreakpointsDown() {
  var breakpoints = getBreakpoints();
  breakpoints[breakpoints.length - 1] = '';
  return breakpoints;
}; // Convenience method for getting breakpoints with
// the largest breakpoint set as ''
// Useful for components that create breakpoint specific props
// Caches the results after first access

/* istanbul ignore next: we don't use this method anywhere, yet */


exports.getBreakpointsDown = getBreakpointsDown;
var getBreakpointsDownCached = (0, _memoize.default)(function () {
  var breakpoints = getBreakpointsCached().slice();
  breakpoints[breakpoints.length - 1] = '';
  return breakpoints;
}); // Named Exports

exports.getBreakpointsDownCached = getBreakpointsDownCached;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~87029b27.js.map