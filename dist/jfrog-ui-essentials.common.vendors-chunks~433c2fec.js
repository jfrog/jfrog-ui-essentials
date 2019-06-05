((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[110],{

/***/ "8597":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.props = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _popover = _interopRequireDefault(__webpack_require__("daa8"));

var _warn = _interopRequireDefault(__webpack_require__("93e0"));

var _toolpop = _interopRequireDefault(__webpack_require__("c542"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  triggers: {
    type: [String, Array],
    default: 'click'
  },
  placement: {
    type: String,
    default: 'right'
  } // @vue/component

};
exports.props = props;

var _default = _vue.default.extend({
  name: 'BPopover',
  mixins: [_toolpop.default],
  props: props,
  data: function data() {
    return {};
  },
  methods: {
    createToolpop: function createToolpop() {
      // getTarget is in toolpop mixin
      var target = this.getTarget();
      /* istanbul ignore else */

      if (target) {
        this._toolpop = new _popover.default(target, this.getConfig(), this.$root);
      } else {
        this._toolpop = null;
        (0, _warn.default)("b-popover: 'target' element not found!");
      }

      return this._toolpop;
    }
  },
  render: function render(h) {
    return h('div', {
      class: ['d-none'],
      style: {
        display: 'none'
      },
      attrs: {
        'aria-hidden': true
      }
    }, [h('div', {
      ref: 'title'
    }, this.$slots.title), h('div', {
      ref: 'content'
    }, this.$slots.default)]);
  }
});

exports.default = _default;

/***/ }),

/***/ "b528":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _progress = _interopRequireDefault(__webpack_require__("c4c4"));

var _progressBar = _interopRequireDefault(__webpack_require__("cf15"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BProgress: _progress.default,
  BProgressBar: _progressBar.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "c4c4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _progressBar = _interopRequireDefault(__webpack_require__("cf15"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @vue/component
var _default = _vue.default.extend({
  name: 'BProgress',
  provide: function provide() {
    return {
      bvProgress: this
    };
  },
  props: {
    // These props can be inherited via the child b-progress-bar(s)
    variant: {
      type: String,
      default: null
    },
    striped: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    },
    precision: {
      type: Number,
      default: 0
    },
    showProgress: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 100
    },
    // This prop is not inherited by child b-progress-bar(s)
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    progressHeight: function progressHeight() {
      return {
        height: this.height || null
      };
    }
  },
  render: function render(h) {
    var childNodes = this.$slots.default;

    if (!childNodes) {
      childNodes = h(_progressBar.default, {
        props: {
          value: this.value,
          max: this.max,
          precision: this.precision,
          variant: this.variant,
          animated: this.animated,
          striped: this.striped,
          showProgress: this.showProgress,
          showValue: this.showValue
        }
      });
    }

    return h('div', {
      class: ['progress'],
      style: this.progressHeight
    }, [childNodes]);
  }
});

exports.default = _default;

/***/ }),

/***/ "cf15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _html = __webpack_require__("be11");

var _inspect = __webpack_require__("0d5a");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @vue/component
var _default2 = _vue.default.extend({
  name: 'BProgressBar',
  inject: {
    bvProgress: {
      default: function _default()
      /* istanbul ignore next */
      {
        return {};
      }
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: null
    },
    labelHtml: {
      type: String
    },
    // $parent (this.bvProgress) prop values may take precedence over the following props
    // Which is why they are defaulted to null
    max: {
      type: Number,
      default: null
    },
    precision: {
      type: Number,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    striped: {
      type: Boolean,
      default: null
    },
    animated: {
      type: Boolean,
      default: null
    },
    showProgress: {
      type: Boolean,
      default: null
    },
    showValue: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    progressBarClasses: function progressBarClasses() {
      return [this.computedVariant ? "bg-".concat(this.computedVariant) : '', this.computedStriped || this.computedAnimated ? 'progress-bar-striped' : '', this.computedAnimated ? 'progress-bar-animated' : ''];
    },
    progressBarStyles: function progressBarStyles() {
      return {
        width: 100 * (this.value / this.computedMax) + '%'
      };
    },
    computedProgress: function computedProgress() {
      var p = Math.pow(10, this.computedPrecision);
      return Math.round(100 * p * this.value / this.computedMax) / p;
    },
    computedMax: function computedMax() {
      // Prefer our max over parent setting
      return (0, _inspect.isNumber)(this.max) ? this.max : this.bvProgress.max || 100;
    },
    computedVariant: function computedVariant() {
      // Prefer our variant over parent setting
      return this.variant || this.bvProgress.variant;
    },
    computedPrecision: function computedPrecision() {
      // Prefer our precision over parent setting
      return (0, _inspect.isNumber)(this.precision) ? this.precision : this.bvProgress.precision || 0;
    },
    computedStriped: function computedStriped() {
      // Prefer our striped over parent setting
      return (0, _inspect.isBoolean)(this.striped) ? this.striped : this.bvProgress.striped || false;
    },
    computedAnimated: function computedAnimated() {
      // Prefer our animated over parent setting
      return (0, _inspect.isBoolean)(this.animated) ? this.animated : this.bvProgress.animated || false;
    },
    computedShowProgress: function computedShowProgress() {
      // Prefer our showProgress over parent setting
      return (0, _inspect.isBoolean)(this.showProgress) ? this.showProgress : this.bvProgress.showProgress || false;
    },
    computedShowValue: function computedShowValue() {
      // Prefer our showValue over parent setting
      return (0, _inspect.isBoolean)(this.showValue) ? this.showValue : this.bvProgress.showValue || false;
    }
  },
  render: function render(h) {
    var childNodes = h(false);

    if (this.$slots.default) {
      childNodes = this.$slots.default;
    } else if (this.label || this.labelHtml) {
      childNodes = h('span', {
        domProps: (0, _html.htmlOrText)(this.labelHtml, this.label)
      });
    } else if (this.computedShowProgress) {
      childNodes = this.computedProgress.toFixed(this.computedPrecision);
    } else if (this.computedShowValue) {
      childNodes = this.value.toFixed(this.computedPrecision);
    }

    return h('div', {
      staticClass: 'progress-bar',
      class: this.progressBarClasses,
      style: this.progressBarStyles,
      attrs: {
        role: 'progressbar',
        'aria-valuemin': '0',
        'aria-valuemax': this.computedMax.toString(),
        'aria-valuenow': this.value.toFixed(this.computedPrecision)
      }
    }, [childNodes]);
  }
});

exports.default = _default2;

/***/ }),

/***/ "f38f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _popover = _interopRequireDefault(__webpack_require__("8597"));

var _popover2 = _interopRequireDefault(__webpack_require__("5764"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BPopover: _popover.default
};
var directives = {
  BPopover: _popover2.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components,
    directives: directives
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~433c2fec.js.map