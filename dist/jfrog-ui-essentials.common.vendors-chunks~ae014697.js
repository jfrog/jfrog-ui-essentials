((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[287],{

/***/ "fde0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _inputGroupPrepend = _interopRequireDefault(__webpack_require__("9e3e"));

var _inputGroupAppend = _interopRequireDefault(__webpack_require__("6780"));

var _inputGroupText = _interopRequireDefault(__webpack_require__("df74"));

var _html = __webpack_require__("be11");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var props = {
  id: {
    type: String
  },
  size: {
    type: String
  },
  prepend: {
    type: String
  },
  prependHTML: {
    type: String
  },
  append: {
    type: String
  },
  appendHTML: {
    type: String
  },
  tag: {
    type: String,
    default: 'div'
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BInputGroup',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;
    var $slots = slots();
    var childNodes = []; // Prepend prop

    if (props.prepend) {
      childNodes.push(h(_inputGroupPrepend.default, [h(_inputGroupText.default, {
        domProps: (0, _html.htmlOrText)(props.prependHTML, props.prepend)
      })]));
    } else {
      childNodes.push(h(false));
    } // Prepend slot


    if ($slots.prepend) {
      childNodes.push(h(_inputGroupPrepend.default, $slots.prepend));
    } else {
      childNodes.push(h(false));
    } // Default slot


    if ($slots.default) {
      childNodes.push.apply(childNodes, _toConsumableArray($slots.default));
    } else {
      childNodes.push(h(false));
    } // Append prop


    if (props.append) {
      childNodes.push(h(_inputGroupAppend.default, [h(_inputGroupText.default, {
        domProps: (0, _html.htmlOrText)(props.appendHTML, props.append)
      })]));
    } else {
      childNodes.push(h(false));
    } // Append slot


    if ($slots.append) {
      childNodes.push(h(_inputGroupAppend.default, $slots.append));
    } else {
      childNodes.push(h(false));
    }

    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'input-group',
      class: _defineProperty({}, "input-group-".concat(props.size), Boolean(props.size)),
      attrs: {
        id: props.id || null,
        role: 'group'
      }
    }), childNodes);
  }
});

exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~ae014697.js.map