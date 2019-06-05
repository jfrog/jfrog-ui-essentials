((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[403],{

/***/ "5106":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _img = _interopRequireDefault(__webpack_require__("4c76"));

var _id = _interopRequireDefault(__webpack_require__("eae0"));

var _env = __webpack_require__("4565");

var _html = __webpack_require__("be11");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  imgSrc: {
    type: String // default: undefined

  },
  imgAlt: {
    type: String // default: undefined

  },
  imgWidth: {
    type: [Number, String] // default: undefined

  },
  imgHeight: {
    type: [Number, String] // default: undefined

  },
  imgBlank: {
    type: Boolean,
    default: false
  },
  imgBlankColor: {
    type: String,
    default: 'transparent'
  },
  contentVisibleUp: {
    type: String
  },
  contentTag: {
    type: String,
    default: 'div'
  },
  caption: {
    type: String
  },
  captionHtml: {
    type: String
  },
  captionTag: {
    type: String,
    default: 'h3'
  },
  text: {
    type: String
  },
  textHtml: {
    type: String
  },
  textTag: {
    type: String,
    default: 'p'
  },
  background: {
    type: String
  } // @vue/component

};
exports.props = props;

var _default2 = _vue.default.extend({
  name: 'BCarouselSlide',
  mixins: [_id.default],
  inject: {
    bvCarousel: {
      default: function _default() {
        return {
          // Explicitly disable touch if not a child of carousel
          noTouch: true
        };
      }
    }
  },
  props: props,
  data: function data() {
    return {};
  },
  computed: {
    contentClasses: function contentClasses() {
      return [this.contentVisibleUp ? 'd-none' : '', this.contentVisibleUp ? "d-".concat(this.contentVisibleUp, "-block") : ''];
    },
    computedWidth: function computedWidth() {
      // Use local width, or try parent width
      return this.imgWidth || this.bvCarousel.imgWidth || null;
    },
    computedHeight: function computedHeight() {
      // Use local height, or try parent height
      return this.imgHeight || this.bvCarousel.imgHeight || null;
    }
  },
  render: function render(h) {
    var $slots = this.$slots;
    var noDrag = !this.bvCarousel.noTouch && _env.hasTouchSupport;
    var img = $slots.img;

    if (!img && (this.imgSrc || this.imgBlank)) {
      img = h(_img.default, {
        props: {
          fluidGrow: true,
          block: true,
          src: this.imgSrc,
          blank: this.imgBlank,
          blankColor: this.imgBlankColor,
          width: this.computedWidth,
          height: this.computedHeight,
          alt: this.imgAlt
        },
        // Touch support event handler
        on: noDrag ? {
          dragstart: function dragstart(e) {
            /* istanbul ignore next: difficult to test in JSDOM */
            e.preventDefault();
          }
        } : {}
      });
    }

    if (!img) {
      img = h(false);
    }

    var content = h(this.contentTag, {
      staticClass: 'carousel-caption',
      class: this.contentClasses
    }, [this.caption || this.captionHtml ? h(this.captionTag, {
      domProps: (0, _html.htmlOrText)(this.captionHtml, this.caption)
    }) : h(false), this.text || this.textHtml ? h(this.textTag, {
      domProps: (0, _html.htmlOrText)(this.textHtml, this.text)
    }) : h(false), $slots.default]);
    return h('div', {
      staticClass: 'carousel-item',
      style: {
        background: this.background || this.bvCarousel.background || null
      },
      attrs: {
        id: this.safeId(),
        role: 'listitem'
      }
    }, [img, content]);
  }
});

exports.default = _default2;

/***/ }),

/***/ "a88f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _carousel = _interopRequireDefault(__webpack_require__("a85f"));

var _carouselSlide = _interopRequireDefault(__webpack_require__("5106"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BCarousel: _carousel.default,
  BCarouselSlide: _carouselSlide.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~f7a6d865.js.map