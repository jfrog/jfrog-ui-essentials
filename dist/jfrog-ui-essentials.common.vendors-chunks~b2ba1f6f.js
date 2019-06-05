((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[290],{

/***/ "ae0d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _toggle = _interopRequireDefault(__webpack_require__("d4a9"));

exports.Toggle = _toggle.default;

var _modal = _interopRequireDefault(__webpack_require__("be8c"));

exports.Modal = _modal.default;

var _scrollspy = _interopRequireDefault(__webpack_require__("8090"));

exports.Scrollspy = _scrollspy.default;

var _tooltip = _interopRequireDefault(__webpack_require__("2eee"));

exports.Tooltip = _tooltip.default;

var _popover = _interopRequireDefault(__webpack_require__("d670"));

exports.Popover = _popover.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "be8c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _modal = _interopRequireDefault(__webpack_require__("f429"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var directives = {
  BModal: _modal.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    directives: directives
  })
};
exports.default = _default;

/***/ }),

/***/ "f429":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _dom = __webpack_require__("1611");

var _target = __webpack_require__("f347");

// Target listen types
var listenTypes = {
  click: true // Emitted show event for modal

};
var EVENT_SHOW = 'bv::show::modal';

var setRole = function setRole(el, binding, vnode) {
  if (el.tagName !== 'BUTTON') {
    (0, _dom.setAttr)(el, 'role', 'button');
  }
};
/*
 * Export our directive
 */


var _default = {
  // eslint-disable-next-line no-shadow-restricted-names
  bind: function bind(el, binding, vnode) {
    (0, _target.bindTargets)(vnode, binding, listenTypes, function (_ref) {
      var targets = _ref.targets,
          vnode = _ref.vnode;
      targets.forEach(function (target) {
        vnode.context.$root.$emit(EVENT_SHOW, target, vnode.elm);
      });
    }); // If element is not a button, we add `role="button"` for accessibility

    setRole(el, binding, vnode);
  },
  updated: setRole,
  componentUpdated: setRole,
  unbind: function unbind(el, binding, vnode) {
    (0, _target.unbindTargets)(vnode, binding, listenTypes); // If element is not a button, we add `role="button"` for accessibility

    if (el.tagName !== 'BUTTON') {
      (0, _dom.removeAttr)(el, 'role', 'button');
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~b2ba1f6f.js.map