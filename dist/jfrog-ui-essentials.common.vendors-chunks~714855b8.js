((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[181],{

/***/ "8339":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("2d14"));

var _pagination = _interopRequireDefault(__webpack_require__("8146"));

var _dom = __webpack_require__("1611");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_PER_PAGE = 20;
var DEFAULT_TOTAL_ROWS = 0;

function sanitizePerPage(value) {
  var perPage = parseInt(value, 10) || DEFAULT_PER_PAGE;
  return perPage < 1 ? 1 : perPage;
}

function sanitizeTotalRows(value) {
  var totalRows = parseInt(value, 10) || DEFAULT_TOTAL_ROWS;
  return totalRows < 0 ? 0 : totalRows;
}

var props = {
  perPage: {
    type: [Number, String],
    default: DEFAULT_PER_PAGE
  },
  totalRows: {
    type: [Number, String],
    default: DEFAULT_TOTAL_ROWS
  },
  ariaControls: {
    type: String,
    default: null
  } // Our render function is brought in from the pagination mixin
  // @vue/component

};

var _default = _vue.default.extend({
  name: 'BPagination',
  mixins: [_pagination.default],
  props: props,
  computed: {
    numberOfPages: function numberOfPages() {
      var result = Math.ceil(sanitizeTotalRows(this.totalRows) / sanitizePerPage(this.perPage));
      return result < 1 ? 1 : result;
    }
  },
  watch: {
    numberOfPages: function numberOfPages(newVal) {
      if (newVal === this.localNumPages) {
        /* istanbul ignore next */
        return;
      }

      this.localNumPages = newVal;
      this.currentPage = 1;
    }
  },
  created: function created() {
    var _this = this;

    // Set the initial page count
    this.localNumPages = this.numberOfPages; // Set the initial page value

    var curr = parseInt(this.value, 10) || 0;

    if (curr > 0) {
      this.currentPage = curr;
    } else {
      this.$nextTick(function () {
        // If this value parses to NaN or a value less than 1
        // Trigger an initial emit of 'null' if no page specified
        _this.currentPage = 0;
      });
    }
  },
  mounted: function mounted() {
    // Set the initial page count
    this.localNumPages = this.numberOfPages;
  },
  methods: {
    // These methods are used by the render function
    onClick: function onClick(num, evt) {
      var _this2 = this;

      // Handle edge cases where number of pages has changed (i.e. if perPage changes)
      // This should normally not happen, but just in case.
      if (num > this.numberOfPages) {
        /* istanbul ignore next */
        num = this.numberOfPages;
      } else if (num < 1) {
        /* istanbul ignore next */
        num = 1;
      } // Update the v-model


      this.currentPage = num; // Emit event triggered by user interaction

      this.$emit('change', this.currentPage);
      this.$nextTick(function () {
        // Keep the current button focused if possible
        var target = evt.target;

        if ((0, _dom.isVisible)(target) && _this2.$el.contains(target) && target.focus) {
          target.focus();
        } else {
          _this2.focusCurrent();
        }
      });
    },
    makePage: function makePage(pageNum) {
      return pageNum;
    },
    linkProps: function linkProps(pageNum) {
      // Always '#' for pagination component
      return {
        href: '#'
      };
    }
  }
});

exports.default = _default;

/***/ }),

/***/ "887d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _pagination = _interopRequireDefault(__webpack_require__("8339"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BPagination: _pagination.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ }),

/***/ "f8d0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _paginationNav = _interopRequireDefault(__webpack_require__("8934"));

var _plugins = __webpack_require__("0a8d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  BPaginationNav: _paginationNav.default
};
var _default = {
  install: (0, _plugins.installFactory)({
    components: components
  })
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~714855b8.js.map