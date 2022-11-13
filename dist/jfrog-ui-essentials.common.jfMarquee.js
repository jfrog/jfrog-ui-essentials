((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[33],{

/***/ "0f67":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMarqueeComponent/index.vue?vue&type=template&id=3ba1e531&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-marquee-container"},[_c('span',{directives:[{name:"init",rawName:"v-init",value:(_vm.checkOverflow()),expression:"checkOverflow()"}]},[(!_vm.$transclude.isSlotFilled('innerHtml'))?_vm._t("default"):_vm._e(),(_vm.$transclude.isSlotFilled('innerHtml'))?_vm._t("default"):_vm._e()],2)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfMarqueeComponent/index.vue?vue&type=template&id=3ba1e531&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./src/mixins/Sanitize/index.js
var Sanitize = __webpack_require__("0b04");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMarqueeComponent/index.vue?vue&type=script&lang=js&

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

/* harmony default export */ var JfMarqueeComponentvue_type_script_lang_js_ = ({
  name: 'jf-marquee',
  props: ['disabled'],
  'jf@inject': ['$element', '$timeout', '$interval', '$scope', '$transclude'],
  mixins: [Sanitize["a" /* default */]],
  data: function data() {
    return {};
  },
  created: function created() {},
  mounted: function mounted() {
    var _this = this;

    this.container = $(this.$element).find('.jf-marquee-container');
    this.content = $(this.$element).find('.jf-marquee-container span');
    this.container.on('mouseenter', function () {
      return _this.onMouseEnter();
    });
    this.container.on('mouseleave', function () {
      return _this.onMouseLeave();
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfMarquee'
  },
  methods: {
    onMouseEnter: function onMouseEnter() {
      if (this.disabled) return;
      this.checkOverflow();

      if (this.overflowing) {
        this.animPeriod = this.content.innerWidth() * 0.01;
        this.startAnimation(1000);
      }
    },
    onMouseLeave: function onMouseLeave() {
      if (this.disabled) return;

      if (this.overflowing) {
        this.content.css('transition', 'none');
        this.content.css('left', '0');
        this.container.removeClass('animating');
        if (this.startAnimTimeout) this.$timeout.cancel(this.startAnimTimeout);
        if (this.loopAnimTimeout) this.$timeout.cancel(this.loopAnimTimeout);
      }
    },
    startAnimation: function startAnimation() {
      var _this2 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.container.addClass('animating');
      this.content.css('transition', "left ".concat(this.animPeriod, "s linear"));
      this.content.css('left', '0');
      this.startAnimTimeout = this.$timeout(function () {
        _this2.content.css('left', -_this2.content.innerWidth() + 'px');

        _this2.loopAnimTimeout = _this2.$timeout(function () {
          _this2.content.css('transition', 'none');

          _this2.content.css('left', _this2.container.innerWidth() + 'px');

          _this2.animPeriod = (_this2.container.innerWidth() + _this2.content.innerWidth()) * 0.01;

          _this2.$timeout(function () {
            return _this2.startAnimation();
          }, 10);
        }, _this2.animPeriod * 1000);
      }, delay);
    },
    checkOverflow: function checkOverflow() {
      if (!this.container) return;

      if (Math.round(this.container.innerWidth()) < Math.round(this.container[0].scrollWidth)) {
        this.container.addClass('overflowing');
        this.overflowing = true;
      } else {
        this.container.removeClass('overflowing');
        this.overflowing = false;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfMarqueeComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfMarqueeComponentvue_type_script_lang_js_ = (JfMarqueeComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfMarqueeComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfMarqueeComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "3ba1e531",
  null
  
)

/* harmony default export */ var JfMarqueeComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfMarquee.js.map