((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[8],{

/***/ "4390":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ng1AttributeDirectiveAdapter; });
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7f7f");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac6a");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Users_tomere_workspace_jfrog_ui_essentials_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d225");
/* harmony import */ var _Users_tomere_workspace_jfrog_ui_essentials_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("b0b4");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("1157");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_toPairs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("f542");
/* harmony import */ var lodash_toPairs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_toPairs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("3ff1");
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_values__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("bba4");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("375a");
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_kebabCase__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("9b02");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("9520");
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash_isFunction__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lodash_trim__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("66c7");
/* harmony import */ var lodash_trim__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash_trim__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _services_VueFactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("e1f3");













var Ng1AttributeDirectiveAdapter = /*#__PURE__*/function () {
  function Ng1AttributeDirectiveAdapter() {
    Object(_Users_tomere_workspace_jfrog_ui_essentials_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Ng1AttributeDirectiveAdapter);
  }

  Object(_Users_tomere_workspace_jfrog_ui_essentials_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Ng1AttributeDirectiveAdapter, null, [{
    key: "patchLinkFunction",
    value: function patchLinkFunction(linkFn, scopeDef) {
      var _VueFactory$getInstan = _services_VueFactory__WEBPACK_IMPORTED_MODULE_12__[/* VueFactory */ "a"].getInstance(),
          Vue = _VueFactory$getInstan.Vue;

      return function (el, binding, vnode) {
        var scope;

        if (scopeDef) {
          scope = {};
          lodash_toPairs__WEBPACK_IMPORTED_MODULE_5___default()(scopeDef).forEach(function (entry) {
            if (entry[0] === lodash_camelCase__WEBPACK_IMPORTED_MODULE_7___default()(binding.name)) {
              if (entry[1] === '=' || binding.modifiers.bind) {
                Object.defineProperty(scope, entry[0], {
                  get: function get() {
                    return lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(vnode.context, binding.expression);
                  }
                });
              } else {
                scope[entry[0]] = binding.expression;
              }
            } else {
              Object.defineProperty(scope, entry[0], {
                get: function get() {
                  if (entry[1] === '=') {
                    return lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(vnode.context, el.attributes.getNamedItem(lodash_kebabCase__WEBPACK_IMPORTED_MODULE_8___default()(entry[0])).value);
                  } else {
                    var ni = el.attributes.getNamedItem(lodash_kebabCase__WEBPACK_IMPORTED_MODULE_8___default()(entry[0]));
                    return ni ? ni.value : null;
                  }
                }
              });
            }
          });
        } else {
          scope = vnode.context.$data;
        }

        var thisObj = {
          $inject: function $inject() {
            var _Vue$prototype$$jfrog;

            for (var _len = arguments.length, injections = new Array(_len), _key = 0; _key < _len; _key++) {
              injections[_key] = arguments[_key];
            }

            (_Vue$prototype$$jfrog = Vue.prototype.$jfrog).injectOn.apply(_Vue$prototype$$jfrog, [thisObj].concat(injections));
          }
        };
        var bindedFn = linkFn.bind(thisObj);
        var attrs = {};

        if (binding.modifiers.bind) {
          Object.defineProperty(attrs, lodash_camelCase__WEBPACK_IMPORTED_MODULE_7___default()(binding.name), {
            get: function get() {
              if (!lodash_isFunction__WEBPACK_IMPORTED_MODULE_10___default()(binding.value)) {
                return lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(vnode.context, lodash_trim__WEBPACK_IMPORTED_MODULE_11___default()(binding.expression, '\''));
              } else {
                return binding.value();
              }
            }
          });
        } else {
          attrs[lodash_camelCase__WEBPACK_IMPORTED_MODULE_7___default()(binding.name)] = lodash_trim__WEBPACK_IMPORTED_MODULE_11___default()(binding.expression, '\'');
        }

        lodash_values__WEBPACK_IMPORTED_MODULE_6___default()(el.attributes).forEach(function (attr) {
          Object.defineProperty(attrs, lodash_camelCase__WEBPACK_IMPORTED_MODULE_7___default()(attr.name), {
            get: function get() {
              return attr.value;
            }
          });
        });

        attrs.$observe = function (path, cb) {
          if (path === lodash_camelCase__WEBPACK_IMPORTED_MODULE_7___default()(binding.name)) {
            vnode.context.$watch(!lodash_isFunction__WEBPACK_IMPORTED_MODULE_10___default()(binding.value) ? binding.expression : binding.value, function () {
              if (lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(vnode.context, lodash_trim__WEBPACK_IMPORTED_MODULE_11___default()(binding.expression, '\''))) {
                cb(lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(vnode.context, lodash_trim__WEBPACK_IMPORTED_MODULE_11___default()(binding.expression, '\'')));
              } else if (lodash_isFunction__WEBPACK_IMPORTED_MODULE_10___default()(binding.value)) {
                cb(binding.value());
              }
            });
          } else {
            console.error('!!!!!!!!');
          }
        };

        bindedFn(scope, jquery__WEBPACK_IMPORTED_MODULE_4___default()(el), attrs);
      };
    }
  }]);

  return Ng1AttributeDirectiveAdapter;
}();

/***/ }),

/***/ "4f3d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_JFrogUI_Ng1AttributeDirectiveAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4390");
/* harmony import */ var _mixins_Sanitize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0b04");
/* harmony import */ var jf_tooltipster_css_tooltipster_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2f8a");
/* harmony import */ var jf_tooltipster_css_tooltipster_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jf_tooltipster_css_tooltipster_css__WEBPACK_IMPORTED_MODULE_2__);




__webpack_require__("38ad");

var $sanitize = _mixins_Sanitize__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].methods.$sanitize;
/* harmony default export */ __webpack_exports__["default"] = ({
  bind: function bind(el, binding, vnode) {
    var patchedLinkFn = _plugins_JFrogUI_Ng1AttributeDirectiveAdapter__WEBPACK_IMPORTED_MODULE_0__[/* Ng1AttributeDirectiveAdapter */ "a"].patchLinkFunction(ng1LinkFunction, null);
    patchedLinkFn(el, binding, vnode);
  }
});

function ng1LinkFunction($scope, $element, $attrs) {
  $($element).tooltipster({
    animation: 'fade',
    contentAsHTML: 'true',
    trigger: 'hover',
    onlyOne: 'true',
    interactive: 'true',
    position: 'bottom',
    theme: 'tooltipster-default bottom'
  });
  $($element).tooltipster('content', $attrs.jfTooltip === '' ? null : $sanitize($attrs.jfTooltip));
  $attrs.$observe('jfTooltip', function (val) {
    $($element).tooltipster('content', val === '' ? null : $sanitize(val));
  });
}

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.JfTooltipDirective.js.map