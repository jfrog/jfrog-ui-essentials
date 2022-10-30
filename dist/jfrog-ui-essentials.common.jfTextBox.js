((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[49],{

/***/ "506b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9e68":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTextBoxComponent/index.vue?vue&type=template&id=530a5424&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-text-box-container"},[_c('div',{staticClass:"jf-text-box-content-current"},[_vm._v(_vm._s(_vm.content)+" "),(_vm.ready && _vm.isOverflowing)?_c('span',{staticClass:"jf-text-box-show-all",style:({'white-space': _vm.wrapSeeAll ? 'inherit' : 'nowrap'}),domProps:{"innerHTML":_vm._s(_vm.seeAllCustomText)},on:{"click":function($event){return _vm.seeAll()}}}):_vm._e()]),_c('div',{staticClass:"jf-text-box-content-full"}),_c('div',{staticClass:"jf-text-box-content-stage"})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTextBoxComponent/index.vue?vue&type=template&id=530a5424&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.promise.finally.js
var es7_promise_finally = __webpack_require__("097d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./src/mixins/Sanitize/index.js
var Sanitize = __webpack_require__("0b04");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTextBoxComponent/index.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var JfTextBoxComponentvue_type_script_lang_js_ = ({
  name: 'jf-text-box',
  props: ['text', 'modalTitle', 'seeAllText', 'maxLines', 'noAction', 'customAction'],
  'jf@inject': ['$scope', '$element', '$timeout', '$interval', '$compile', '$q', 'JfFullTextService'],
  mixins: [Sanitize["a" /* default */]],
  data: function data() {
    return {
      content: null,
      ready: null,
      wrapSeeAll: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.fullTextElement.text(this.sanitizedText);
    this.registerResize();
    setTimeout(function () {
      return _this.refreshText();
    });
    this.fullTextModal = this.JfFullTextService;
  },
  beforeDestroy: function beforeDestroy() {
    this.deregisterResize();
  },
  methods: {
    registerResize: function registerResize() {
      var _this2 = this;

      var appliedRefresh = function appliedRefresh() {
        _this2.refreshText();

        _this2.$forceUpdate();
      };

      var debouncedRefresh = _.debounce(appliedRefresh, 0, {
        leading: true
      }); // let throttledRefresh = _.throttle(appliedRefresh, 150, {/*leading: false*/})


      this.onResize = debouncedRefresh;
      $(window).on('resize', this.onResize);
    },
    deregisterResize: function deregisterResize() {
      $(window).off('resize', this.onResize);
    },
    setStageText: function setStageText(text) {
      this.stageElement.text(text);
    },
    refreshText: function refreshText() {
      var _this3 = this;

      this.measureLineHeight();

      if (!this.isOverflowing) {
        this.content = this.sanitizedText;
      } else {
        this.stageElement.html('');
        var words = this.splitText(this.sanitizedText);
        var i = 1;

        var getNumOfLinesUntil = function getNumOfLinesUntil(index) {
          var withSeeAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

          _this3.setStageText(_.trimEnd(words.slice(0, index).join('')) + (withSeeAll ? ' ' : ''));

          if (withSeeAll) _this3.stageElement.append($("  <div class=\"jf-text-box-show-all\">".concat(_this3.seeAllCustomText, "</div>")));
          return _this3.numOfStageRows();
        };

        while (getNumOfLinesUntil(i) <= this.numOfWholeRows && i <= words.length) {
          i++;
        }

        if (getNumOfLinesUntil(i, false) !== getNumOfLinesUntil(i)) {
          this.wrapSeeAll = true;
        } else this.wrapSeeAll = false;
        /*
                    let saved = i;
                    i--;
                    while (getNumOfLinesUntil(i, false) !== getNumOfLinesUntil(i) && i > 0) {
                        console.log('?');
                        i--;
                    }
                     if  (i === 0) {
                        i = saved;
                        this.wrapSeeAll = true;
                    }
                    else this.wrapSeeAll = false;
        */


        var fit = words.slice(0, i);
        this.setStageText(_.trimEnd(fit.join('')) + (this.isOverflowing ? ' ' : ''));
        if (this.isOverflowing) this.stageElement.append($("<div class=\"jf-text-box-show-all\">".concat(this.seeAllCustomText, "</div>")));
        var m = 0;

        while (this.numOfStageRows() > this.numOfWholeRows && i > m) {
          m++;
          fit = words.slice(0, i - m);
          this.setStageText(_.trimEnd(fit.join('')) + (this.isOverflowing ? ' ' : ''));
          if (this.isOverflowing) this.stageElement.append($("<div class=\"jf-text-box-show-all\">".concat(this.seeAllCustomText, "</div>")));
        }

        this.content = _.trimEnd(fit.join(''));
      }

      this.ready = true;
      this.$forceUpdate();
    },
    numOfStageRows: function numOfStageRows() {
      var contentHeight = this.stageElement.height();
      return Math.ceil(contentHeight / this.lineHeight - 0.1);
    },
    splitText: function splitText(text) {
      if (this.splitCache) return this.splitCache;else {
        var regex = /\s+/g;
        var parts = [];
        var match = regex.exec(text);
        var lastIndex = 0;

        while (match) {
          parts.push(text.substr(lastIndex, match.index - lastIndex) + match[0]);
          lastIndex = match.index + match[0].length;
          match = regex.exec(text);
        }

        parts.push(text.substr(lastIndex, text.length - lastIndex));
        parts = _.map(parts, function (part) {
          if (part.length > 16) return part.split('');else return part;
        });
        parts = _.flatten(parts);
        this.splitCache = parts;
        return parts;
      }
    },
    measureLineHeight: function measureLineHeight() {
      this.stageElement.text('*');
      this.lineHeight = this.stageElement.height();

      if (this.maxLines) {
        this.containerElement.height(parseInt(this.maxLines) * this.lineHeight);
      }
    },
    seeAll: function seeAll() {
      var _this4 = this;

      if (this.noAction) return;
      var text = this.sanitizedText;

      if (this.customAction) {
        this.customAction({
          text: text
        });
      } else {
        var modalInstance = this.fullTextModal.showFullTextModal(text, this.modalTitle || 'Full Text', 500, false, null, 'text-box-show-all-modal');
        this.deregisterResize();
        modalInstance.result.finally(function () {
          setTimeout(function () {
            return _this4.registerResize();
          });
        });
      }
    }
    /* Getter Elements */

  },
  computed: {
    seeAllCustomText: function seeAllCustomText() {
      return this.seeAllText ? this.$sanitize(this.seeAllText) : '(Show All ...)';
    },
    sanitizedText: function sanitizedText() {
      return this.$sanitize(this.text);
    },
    containerElement: {
      get: function get() {
        if (!this.cachedContainerElement) {
          this.cachedContainerElement = $(this.$element).find('.jf-text-box-container');
        }

        return this.cachedContainerElement;
      }
    },
    fullTextElement: {
      get: function get() {
        if (!this.cachedFullTextElement) {
          this.cachedFullTextElement = $(this.$element).find('.jf-text-box-content-full');
        }

        return this.cachedFullTextElement;
      }
    },
    currentTextElement: {
      get: function get() {
        if (!this.cachedCurrentTextElement) {
          this.cachedCurrentTextElement = $(this.$element).find('.jf-text-box-content-current');
        }

        return this.cachedCurrentTextElement;
      }
    },
    stageElement: {
      get: function get() {
        if (!this.cachedStageElement) {
          this.cachedStageElement = $(this.$element).find('.jf-text-box-content-stage');
        }

        return this.cachedStageElement;
      }
    },
    containerHeight: {
      get: function get() {
        return this.containerElement.height();
      }
    },
    containerWidth: {
      get: function get() {
        return this.containerElement.width();
      }
    },
    numOfWholeRows: {
      get: function get() {
        var auto = Math.floor(this.containerHeight / this.lineHeight + 0.1);
        return this.maxLines ? Math.min(parseInt(this.maxLines), auto) : auto;
      }
    },
    numOfActualRows: {
      get: function get() {
        var contentHeight = this.fullTextElement.height();
        return Math.ceil(contentHeight / this.lineHeight - 0.1);
      }
    },
    numOfVisibleRows: {
      get: function get() {
        var contentHeight = this.currentTextElement.height();
        return Math.ceil(contentHeight / this.lineHeight - 0.1);
      }
    },
    isOverflowing: {
      get: function get() {
        return this.numOfActualRows > this.numOfWholeRows;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTextBoxComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTextBoxComponentvue_type_script_lang_js_ = (JfTextBoxComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTextBoxComponent/index.vue?vue&type=style&index=0&id=530a5424&scoped=true&lang=less&
var JfTextBoxComponentvue_type_style_index_0_id_530a5424_scoped_true_lang_less_ = __webpack_require__("a2bc");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTextBoxComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTextBoxComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "530a5424",
  null
  
)

/* harmony default export */ var JfTextBoxComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "a2bc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_530a5424_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("506b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_530a5424_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_530a5424_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfTextBox.js.map