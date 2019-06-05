((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[45],{

/***/ "9e84":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _vueFunctionalDataMerge = __webpack_require__("b42e");

var _prefixPropName = _interopRequireDefault(__webpack_require__("e109"));

var _unprefixPropName = _interopRequireDefault(__webpack_require__("12b6"));

var _copyProps = _interopRequireDefault(__webpack_require__("0942"));

var _pluckProps = _interopRequireDefault(__webpack_require__("9c97"));

var _cardMixin = _interopRequireDefault(__webpack_require__("45f0"));

var _cardBody = _interopRequireWildcard(__webpack_require__("b967"));

var _cardHeader = _interopRequireWildcard(__webpack_require__("1fae"));

var _cardFooter = _interopRequireWildcard(__webpack_require__("6f77"));

var _cardImg = _interopRequireWildcard(__webpack_require__("23c9"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cardImgProps = (0, _copyProps.default)(_cardImg.props, _prefixPropName.default.bind(null, 'img'));
cardImgProps.imgSrc.required = false;

var props = _objectSpread({}, _cardBody.props, _cardHeader.props, _cardFooter.props, cardImgProps, (0, _copyProps.default)(_cardMixin.default.props), {
  align: {
    type: String,
    default: null
  },
  noBody: {
    type: Boolean,
    default: false
  } // @vue/component

});

exports.props = props;

var _default = _vue.default.extend({
  name: 'BCard',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;
    var $slots = slots(); // Create placeholder elements for each section

    var imgFirst = h(false);
    var header = h(false);
    var content = h(false);
    var footer = h(false);
    var imgLast = h(false);

    if (props.imgSrc) {
      var img = h(_cardImg.default, {
        props: (0, _pluckProps.default)(cardImgProps, props, _unprefixPropName.default.bind(null, 'img'))
      });

      if (props.imgBottom) {
        imgLast = img;
      } else {
        imgFirst = img;
      }
    }

    if (props.header || $slots.header) {
      header = h(_cardHeader.default, {
        props: (0, _pluckProps.default)(_cardHeader.props, props)
      }, $slots.header);
    }

    if (props.noBody) {
      content = $slots.default || [];
    } else {
      // Wrap content in card-body
      content = [h(_cardBody.default, {
        props: (0, _pluckProps.default)(_cardBody.props, props)
      }, $slots.default)];
    }

    if (props.footer || $slots.footer) {
      footer = h(_cardFooter.default, {
        props: (0, _pluckProps.default)(_cardFooter.props, props)
      }, $slots.footer);
    }

    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'card',
      class: (_class = {
        'flex-row': props.imgLeft || props.imgStart,
        'flex-row-reverse': (props.imgRight || props.imgEnd) && !(props.imgLeft || props.imgStart)
      }, _defineProperty(_class, "text-".concat(props.align), Boolean(props.align)), _defineProperty(_class, "bg-".concat(props.bgVariant), Boolean(props.bgVariant)), _defineProperty(_class, "border-".concat(props.borderVariant), Boolean(props.borderVariant)), _defineProperty(_class, "text-".concat(props.textVariant), Boolean(props.textVariant)), _class)
    }), [imgFirst, header].concat(_toConsumableArray(content), [footer, imgLast]));
  }
});

exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~1cf84c0a.js.map