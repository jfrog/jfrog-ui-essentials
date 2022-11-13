((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[49],{

/***/ "13e5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_74168780_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("191e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_74168780_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_74168780_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "191e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "408c":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("2b3e");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "9e68":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTextBoxComponent/index.vue?vue&type=template&id=74168780&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-text-box-container"},[_c('div',{staticClass:"jf-text-box-content-current"},[_vm._v(_vm._s(_vm.content)+" "),(_vm.ready && _vm.isOverflowing)?_c('span',{staticClass:"jf-text-box-show-all",style:({'white-space': _vm.wrapSeeAll ? 'inherit' : 'nowrap'}),domProps:{"innerHTML":_vm._s(_vm.seeAllCustomText)},on:{"click":function($event){return _vm.seeAll()}}}):_vm._e()]),_c('div',{staticClass:"jf-text-box-content-full"}),_c('div',{staticClass:"jf-text-box-content-stage"})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTextBoxComponent/index.vue?vue&type=template&id=74168780&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.promise.finally.js
var es7_promise_finally = __webpack_require__("097d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/lodash/map.js
var map = __webpack_require__("dd61");
var map_default = /*#__PURE__*/__webpack_require__.n(map);

// EXTERNAL MODULE: ./node_modules/lodash/trimEnd.js
var trimEnd = __webpack_require__("f942");
var trimEnd_default = /*#__PURE__*/__webpack_require__.n(trimEnd);

// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__("b047c");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// EXTERNAL MODULE: ./node_modules/lodash/flatten.js
var flatten = __webpack_require__("4d8c");
var flatten_default = /*#__PURE__*/__webpack_require__.n(flatten);

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

      var debouncedRefresh = debounce_default()(appliedRefresh, 0, {
        leading: true
      }); // let throttledRefresh = throttle(appliedRefresh, 150, {/*leading: false*/})

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

          _this3.setStageText(trimEnd_default()(words.slice(0, index).join('')) + (withSeeAll ? ' ' : ''));

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
        this.setStageText(trimEnd_default()(fit.join('')) + (this.isOverflowing ? ' ' : ''));
        if (this.isOverflowing) this.stageElement.append($("<div class=\"jf-text-box-show-all\">".concat(this.seeAllCustomText, "</div>")));
        var m = 0;

        while (this.numOfStageRows() > this.numOfWholeRows && i > m) {
          m++;
          fit = words.slice(0, i - m);
          this.setStageText(trimEnd_default()(fit.join('')) + (this.isOverflowing ? ' ' : ''));
          if (this.isOverflowing) this.stageElement.append($("<div class=\"jf-text-box-show-all\">".concat(this.seeAllCustomText, "</div>")));
        }

        this.content = trimEnd_default()(fit.join(''));
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
        parts = map_default()(parts, function (part) {
          if (part.length > 16) return part.split('');else return part;
        });
        parts = flatten_default()(parts);
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
// EXTERNAL MODULE: ./src/components/JfTextBoxComponent/index.vue?vue&type=style&index=0&id=74168780&scoped=true&lang=less&
var JfTextBoxComponentvue_type_style_index_0_id_74168780_scoped_true_lang_less_ = __webpack_require__("13e5");

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
  "74168780",
  null
  
)

/* harmony default export */ var JfTextBoxComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "b047c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("1a8c"),
    now = __webpack_require__("408c"),
    toNumber = __webpack_require__("b4b0");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfTextBox.js.map