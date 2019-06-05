((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[186],{

/***/ "a596":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _dom = __webpack_require__("1611");

var _env = __webpack_require__("4565");

var _target = __webpack_require__("f347");

// Target listen types
var listenTypes = {
  click: true // Property key for handler storage

};
var BV_TOGGLE = '__BV_toggle__';
var BV_TOGGLE_STATE = '__BV_toggle_STATE__';
var BV_TOGGLE_CONTROLS = '__BV_toggle_CONTROLS__';
var BV_TOGGLE_TARGETS = '__BV_toggle_TARGETS__'; // Emitted control event for collapse (emitted to collapse)

var EVENT_TOGGLE = 'bv::toggle::collapse'; // Listen to event for toggle state update (emitted by collapse)

var EVENT_STATE = 'bv::collapse::state'; // Private event emitted on $root to ensure the toggle state is always synced.
// Gets emitted even if the state of b-collapse has not changed.
// This event is NOT to be documented as people should not be using it.

var EVENT_STATE_SYNC = 'bv::collapse::sync::state'; // Reset and remove a property from the provided element

var resetProp = function resetProp(el, prop) {
  el[prop] = null;
  delete el[prop];
}; // Handle directive updates

/* istanbul ignore next: not easy to test */


var handleUpdate = function handleUpdate(el, binding, vnode) {
  if (!_env.isBrowser) {
    return;
  } // Ensure the collapse class and aria-* attributes persist
  // after element is updated (either by parent re-rendering
  // or changes to this element or it's contents


  if (el[BV_TOGGLE_STATE] === true) {
    (0, _dom.addClass)(el, 'collapsed');
    (0, _dom.setAttr)(el, 'aria-expanded', 'true');
  } else if (el[BV_TOGGLE_STATE] === false) {
    (0, _dom.removeClass)(el, 'collapsed');
    (0, _dom.setAttr)(el, 'aria-expanded', 'false');
  }

  (0, _dom.setAttr)(el, 'aria-controls', el[BV_TOGGLE_CONTROLS]);
};
/*
 * Export our directive
 */


var _default = {
  bind: function bind(el, binding, vnode) {
    var targets = (0, _target.bindTargets)(vnode, binding, listenTypes, function (_ref) {
      var targets = _ref.targets,
          vnode = _ref.vnode;
      targets.forEach(function (target) {
        vnode.context.$root.$emit(EVENT_TOGGLE, target);
      });
    });

    if (_env.isBrowser && vnode.context && targets.length > 0) {
      // Add targets array to element
      el[BV_TOGGLE_TARGETS] = targets; // Add aria attributes to element

      el[BV_TOGGLE_CONTROLS] = targets.join(' '); // State is initially collapsed until we receive a state event

      el[BV_TOGGLE_STATE] = false;
      (0, _dom.setAttr)(el, 'aria-controls', el[BV_TOGGLE_CONTROLS]);
      (0, _dom.setAttr)(el, 'aria-expanded', 'false'); // If element is not a button, we add `role="button"` for accessibility

      if (el.tagName !== 'BUTTON') {
        (0, _dom.setAttr)(el, 'role', 'button');
      } // Toggle state handler, stored on element


      el[BV_TOGGLE] = function toggleDirectiveHandler(id, state) {
        var targets = el[BV_TOGGLE_TARGETS] || [];

        if (targets.indexOf(id) !== -1) {
          // Set aria-expanded state
          (0, _dom.setAttr)(el, 'aria-expanded', state ? 'true' : 'false'); // Set/Clear 'collapsed' class state

          el[BV_TOGGLE_STATE] = state;

          if (state) {
            (0, _dom.removeClass)(el, 'collapsed');
          } else {
            (0, _dom.addClass)(el, 'collapsed');
          }
        }
      }; // Listen for toggle state changes (public)


      vnode.context.$root.$on(EVENT_STATE, el[BV_TOGGLE]); // Listen for toggle state sync (private)

      vnode.context.$root.$on(EVENT_STATE_SYNC, el[BV_TOGGLE]);
    }
  },
  componentUpdated: handleUpdate,
  updated: handleUpdate,
  unbind: function unbind(el, binding, vnode)
  /* istanbul ignore next */
  {
    (0, _target.unbindTargets)(vnode, binding, listenTypes); // Remove our $root listener

    if (el[BV_TOGGLE]) {
      vnode.context.$root.$off(EVENT_STATE, el[BV_TOGGLE]);
      vnode.context.$root.$off(EVENT_STATE_SYNC, el[BV_TOGGLE]);
    } // Reset custom  props


    resetProp(el, BV_TOGGLE);
    resetProp(el, BV_TOGGLE_STATE);
    resetProp(el, BV_TOGGLE_CONTROLS);
    resetProp(el, BV_TOGGLE_TARGETS); // Reset classes/attrs

    (0, _dom.removeClass)(el, 'collapsed');
    (0, _dom.removeAttr)(el, 'aria-expanded');
    (0, _dom.removeAttr)(el, 'aria-controls');
    (0, _dom.removeAttr)(el, 'role');
  }
};
exports.default = _default;

/***/ }),

/***/ "d4a9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _toggle = _interopRequireDefault(__webpack_require__("a596"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var directives = {
  BToggle: _toggle.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    directives: directives
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~775054ea.js.map