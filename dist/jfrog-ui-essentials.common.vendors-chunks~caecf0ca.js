((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[337],{

/***/ "1186":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _dom = __webpack_require__("1611");

// @vue/component
var _default = {
  data: function data() {
    return {
      listenForFocusIn: false
    };
  },
  watch: {
    listenForFocusIn: function listenForFocusIn(newValue, oldValue) {
      if (newValue !== oldValue) {
        (0, _dom.eventOff)(this.focusInElement, 'focusin', this._focusInHandler, false);

        if (newValue) {
          (0, _dom.eventOn)(this.focusInElement, 'focusin', this._focusInHandler, false);
        }
      }
    }
  },
  beforeCreate: function beforeCreate() {
    // Declare non-reactive properties
    this.focusInElement = null;
  },
  mounted: function mounted() {
    if (!this.focusInElement) {
      this.focusInElement = document;
    }

    if (this.listenForFocusIn) {
      (0, _dom.eventOn)(this.focusInElement, 'focusin', this._focusInHandler, false);
    }
  },
  beforeDestroy: function beforeDestroy()
  /* istanbul ignore next */
  {
    (0, _dom.eventOff)(this.focusInElement, 'focusin', this._focusInHandler, false);
  },
  methods: {
    _focusInHandler: function _focusInHandler(evt) {
      if (this.focusInHandler) {
        this.focusInHandler(evt);
      }
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "45f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;
// @vue/component
var _default = {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    bgVariant: {
      type: String,
      default: null
    },
    borderVariant: {
      type: String,
      default: null
    },
    textVariant: {
      type: String,
      default: null
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "788f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _dom = __webpack_require__("1611");

// @vue/component
var _default = {
  data: function data() {
    return {
      listenForClickOut: false
    };
  },
  watch: {
    listenForClickOut: function listenForClickOut(newValue, oldValue) {
      if (newValue !== oldValue) {
        (0, _dom.eventOff)(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, false);

        if (newValue) {
          (0, _dom.eventOn)(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, false);
        }
      }
    }
  },
  beforeCreate: function beforeCreate() {
    // Declare non-reactive properties
    this.clickOutElement = null;
    this.clickOutEventName = null;
  },
  mounted: function mounted() {
    if (!this.clickOutElement) {
      this.clickOutElement = document;
    }

    if (!this.clickOutEventName) {
      this.clickOutEventName = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
    }

    if (this.listenForClickOut) {
      (0, _dom.eventOn)(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, false);
    }
  },
  beforeDestroy: function beforeDestroy()
  /* istanbul ignore next */
  {
    (0, _dom.eventOff)(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, false);
  },
  methods: {
    isClickOut: function isClickOut(evt) {
      return !(0, _dom.contains)(this.$el, evt.target);
    },
    _clickOutHandler: function _clickOutHandler(evt) {
      if (this.clickOutHandler && this.isClickOut(evt)) {
        this.clickOutHandler(evt);
      }
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~caecf0ca.js.map