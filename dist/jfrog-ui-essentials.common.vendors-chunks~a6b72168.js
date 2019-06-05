((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[271],{

/***/ "50b2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _html = __webpack_require__("be11");

var _default = {
  props: {
    caption: {
      type: String,
      default: null
    },
    captionHtml: {
      type: String
    },
    captionTop: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    captionClasses: function captionClasses() {
      return {
        'b-table-caption-top': this.captionTop
      };
    },
    captionId: function captionId() {
      // Even though this.safeId looks like a method, it is a computed prop
      // that returns a new function if the underlying ID changes
      return this.isStacked ? this.safeId('_caption_') : null;
    }
  },
  methods: {
    renderCaption: function renderCaption() {
      var h = this.$createElement; // Build the caption

      var $captionSlot = this.normalizeSlot('table-caption', {});
      var $caption = h(false);

      if ($captionSlot || this.caption || this.captionHtml) {
        var data = {
          key: 'caption',
          class: this.captionClasses,
          attrs: {
            id: this.captionId
          }
        };

        if (!$captionSlot) {
          data.domProps = (0, _html.htmlOrText)(this.captionHtml, this.caption);
        }

        $caption = h('caption', data, [$captionSlot]);
      }

      return $caption;
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "6a0e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;
var _default = {
  methods: {
    renderColgroup: function renderColgroup() {
      var h = this.$createElement;
      var fields = this.computedFields;
      var $colgroup = h(false);

      if (this.hasNormalizedSlot('table-colgroup')) {
        $colgroup = h('colgroup', {
          key: 'colgroup'
        }, [this.normalizeSlot('table-colgroup', {
          columns: fields.length,
          fields: fields
        })]);
      }

      return $colgroup;
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~a6b72168.js.map