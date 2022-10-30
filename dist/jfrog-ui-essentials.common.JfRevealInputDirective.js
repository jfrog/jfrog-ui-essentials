((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[7],{

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
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_VueFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("e1f3");







var Ng1AttributeDirectiveAdapter = /*#__PURE__*/function () {
  function Ng1AttributeDirectiveAdapter() {
    Object(_Users_tomere_workspace_jfrog_ui_essentials_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Ng1AttributeDirectiveAdapter);
  }

  Object(_Users_tomere_workspace_jfrog_ui_essentials_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Ng1AttributeDirectiveAdapter, null, [{
    key: "patchLinkFunction",
    value: function patchLinkFunction(linkFn, scopeDef) {
      var _VueFactory$getInstan = _services_VueFactory__WEBPACK_IMPORTED_MODULE_6__[/* VueFactory */ "a"].getInstance(),
          Vue = _VueFactory$getInstan.Vue;

      return function (el, binding, vnode) {
        var scope;

        if (scopeDef) {
          scope = {};
          Object(lodash__WEBPACK_IMPORTED_MODULE_5__["entries"])(scopeDef).forEach(function (entry) {
            if (entry[0] === Object(lodash__WEBPACK_IMPORTED_MODULE_5__["camelCase"])(binding.name)) {
              if (entry[1] === '=' || binding.modifiers.bind) {
                Object.defineProperty(scope, entry[0], {
                  get: function get() {
                    return Object(lodash__WEBPACK_IMPORTED_MODULE_5__["get"])(vnode.context, binding.expression);
                  }
                });
              } else {
                scope[entry[0]] = binding.expression;
              }
            } else {
              Object.defineProperty(scope, entry[0], {
                get: function get() {
                  if (entry[1] === '=') {
                    return Object(lodash__WEBPACK_IMPORTED_MODULE_5__["get"])(vnode.context, el.attributes.getNamedItem(Object(lodash__WEBPACK_IMPORTED_MODULE_5__["kebabCase"])(entry[0])).value);
                  } else {
                    var ni = el.attributes.getNamedItem(Object(lodash__WEBPACK_IMPORTED_MODULE_5__["kebabCase"])(entry[0]));
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
          Object.defineProperty(attrs, Object(lodash__WEBPACK_IMPORTED_MODULE_5__["camelCase"])(binding.name), {
            get: function get() {
              if (!Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isFunction"])(binding.value)) {
                return Object(lodash__WEBPACK_IMPORTED_MODULE_5__["get"])(vnode.context, Object(lodash__WEBPACK_IMPORTED_MODULE_5__["trim"])(binding.expression, '\''));
              } else {
                return binding.value();
              }
            }
          });
        } else {
          attrs[Object(lodash__WEBPACK_IMPORTED_MODULE_5__["camelCase"])(binding.name)] = Object(lodash__WEBPACK_IMPORTED_MODULE_5__["trim"])(binding.expression, '\'');
        }

        Object(lodash__WEBPACK_IMPORTED_MODULE_5__["values"])(el.attributes).forEach(function (attr) {
          Object.defineProperty(attrs, Object(lodash__WEBPACK_IMPORTED_MODULE_5__["camelCase"])(attr.name), {
            get: function get() {
              return attr.value;
            }
          });
        });

        attrs.$observe = function (path, cb) {
          if (path === Object(lodash__WEBPACK_IMPORTED_MODULE_5__["camelCase"])(binding.name)) {
            vnode.context.$watch(!Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isFunction"])(binding.value) ? binding.expression : binding.value, function () {
              if (Object(lodash__WEBPACK_IMPORTED_MODULE_5__["get"])(vnode.context, Object(lodash__WEBPACK_IMPORTED_MODULE_5__["trim"])(binding.expression, '\''))) {
                cb(Object(lodash__WEBPACK_IMPORTED_MODULE_5__["get"])(vnode.context, Object(lodash__WEBPACK_IMPORTED_MODULE_5__["trim"])(binding.expression, '\'')));
              } else if (Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isFunction"])(binding.value)) {
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

/***/ "f7ad":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a481");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plugins_JFrogUI_Ng1AttributeDirectiveAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4390");


/* harmony default export */ __webpack_exports__["default"] = ({
  bind: function bind(el, binding, vnode) {
    var patchedLinkFn = _plugins_JFrogUI_Ng1AttributeDirectiveAdapter__WEBPACK_IMPORTED_MODULE_1__[/* Ng1AttributeDirectiveAdapter */ "a"].patchLinkFunction(ng1LinkFunction, null);
    patchedLinkFn(el, binding, vnode);
  }
});

function ng1LinkFunction($scope, $element, $attrs) {
  var revealInputComponent = new Vue({
    template: "<i class=\"icon icon-view jf-reveal-input\"\n                      v-jf-tooltip.bind=\"tooltipText\"\n                      v-if=\"hasData()\"\n                      @click=\"updateInput()\"></i>",
    data: function data() {
      return {
        elementIcon: null,
        inputId: $attrs.jfRevealInput,
        tooltipText: 'Show ' + $attrs.objectName
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.elementIcon = this.$element;
      setTimeout(function () {
        $("#".concat(_this.inputId)).on('input', function () {
          _this.$forceUpdate();
        });
      });
    },
    methods: {
      hasData: function hasData() {
        var input = $("#".concat(this.inputId));
        return !!input.val();
      },
      updateInput: function updateInput() {
        var input = $("#".concat(this.inputId));
        var type = input.attr('type');

        if (type === 'text') {
          input.attr('type', 'password');
          this.elementIcon.removeClass('icon-unview').addClass('icon-view');
          this.tooltipText = this.tooltipText.replace('Hide', 'Show');
        } else {
          input.attr('type', 'text');
          this.elementIcon.removeClass('icon-view').addClass('icon-unview');
          this.tooltipText = this.tooltipText.replace('Show', 'Hide');
        }
      }
    }
  });
  var comp = revealInputComponent.$mount();
  $element[0].appendChild(comp.$el);
}

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.JfRevealInputDirective.js.map