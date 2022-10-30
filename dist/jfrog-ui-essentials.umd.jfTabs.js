((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[47],{

/***/ "6f77":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c27c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTabsComponent/index.vue?vue&type=template&id=4ba2684f&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-tabs"},[_c('ul',{staticClass:"nav nav-tabs"},[_vm._l((_vm.tabsVisible),function(tab,index){
var _obj;
return _c('li',{key:index,staticClass:"jf-tabs-tab-header",class:( _obj = {active:_vm.isActiveTab(tab), disabled:tab.isDisabled}, _obj[tab.class] = _vm.hasClass(tab), _obj ),style:({width: _vm.getTabWidthForStyle()}),attrs:{"jf-disable-feature":tab.feature}},[_c('a',{staticStyle:{"z-index":"999999"},on:{"click":function($event){$event.preventDefault();return _vm.onClickTab(tab, true)}}},[_c('div',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],staticClass:"jf-tab-header-container"},[_c('span',[_vm._v(_vm._s(_vm.dictionary[tab.name]))])])])])}),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.tabsCollapsed.length),expression:"tabsCollapsed.length"}],staticClass:"action-expand"},[_c('span',{directives:[{name:"click-outside",rawName:"v-click-outside",value:(_vm.closeDropdown),expression:"closeDropdown"}],staticClass:"dropdown",class:{ open: _vm.isDropdownOpen }},[_c('a',{staticClass:"dropdown-toggle nav-tabs-more",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.isDropdownOpen = !_vm.isDropdownOpen}}},[_c('i',{staticClass:"icon-arrow"})]),_c('ul',{staticClass:"dropdown-menu dropdown-menu-right dropdown-container text-left"},_vm._l((_vm.tabsCollapsed),function(tab,index){
var _obj;
return _c('li',{key:index,staticClass:"dropdown-item",class:( _obj = {}, _obj[tab.class] = _vm.hasClass(tab), _obj ),attrs:{"jf-disable-feature":tab.feature}},[_c('a',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],on:{"click":function($event){$event.preventDefault();return _vm.onClickTab(tab, true)}}},[_c('span',[_vm._v(_vm._s(_vm.dictionary[tab.name]))])])])}),0)])])],2),_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTabsComponent/index.vue?vue&type=template&id=4ba2684f&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("bd86");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.ends-with.js
var es6_string_ends_with = __webpack_require__("aef6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find-index.js
var es6_array_find_index = __webpack_require__("20d6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTabsComponent/index.vue?vue&type=script&lang=js&











function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
//
//
//
//
//
//
//
/* harmony default export */ var JfTabsComponentvue_type_script_lang_js_ = ({
  name: 'jf-tabs',
  props: ['tabs', 'dictionary', 'tabWidth', 'containerMargin', 'activeTab'],
  'jf@inject': ['JFrogEventBus', '$scope'],
  data: function data() {
    return {
      tabsVisible: null,
      tabsCollapsed: [],
      isDropdownOpen: false,
      currentTab: {
        name: null
      },
      tabwidth: this.tabWidth || "100"
    };
  },
  watch: {
    activeTab: function activeTab() {
      this.currentTab.name = this.activeTab;
    }
  },
  created: function created() {
    this.stateParams = this.$route.query;
    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
    this.currentTab.name = this.stateParams.activeTab || this.activeTab;
  },
  mounted: function mounted() {
    this._registerEvents();

    this.initTabs();
  },
  beforeDestroy: function beforeDestroy() {
    $(window).off('resize.tabs');
    this.unwatch();
    this.stateChangeListener();
  },
  methods: {
    initTabs: function initTabs() {
      var _this = this;

      // wait for the element to render and calculate how many tabs should display
      setTimeout(function () {
        _this._calculateTabsSize();

        var tab = _this._getTab(_this.currentTab);

        if (!tab || tab.isVisible === false || tab.isDisabled) {
          // If current tab doesn't exist on the tabs list at all - select the first tab
          var firstValidTab = _.findIndex(_this.tabs, function (tab) {
            return tab.isVisible !== false && !tab.isDisabled;
          });

          if (firstValidTab !== -1) _this.onClickTab(_this.tabs[firstValidTab], false);
        } else {
          // Otherwise - make sure it's visible
          _this._ensureTabVisible(_this.currentTab);
        }
      });
    },
    _calculateTabsSize: function _calculateTabsSize() {
      // wait for the element to render and calculate how many tabs should display
      var visibleTabs = _.filter(this.tabs, function (tab) {
        return tab.isVisible !== false;
      });

      var container = $(this.$el).children().eq(0);
      var containerWidth = container.width();
      var tabWidth = this.getTabWidthForStyle().endsWith('px') ? parseInt(this.tabwidth) : containerWidth * parseInt(this.tabwidth) / 100;
      var containerMargin = parseInt(this.containerMargin);
      var expanderWidth = $('.action-expand').eq(0).outerWidth(true);
      var tabsToTake = Math.floor((containerWidth - expanderWidth - containerMargin) / tabWidth);
      this.tabsCollapsed = _.takeRight(visibleTabs, visibleTabs.length - tabsToTake);
      this.tabsVisible = _.take(visibleTabs, tabsToTake);
    },
    _registerEvents: function _registerEvents() {
      var _this2 = this;

      this.JFrogEventBus.registerOnScope(this, this.EVENTS.TABS_REFRESH, function () {
        return _this2.initTabs();
      }); // URL changed (like back button / forward button / someone input a URL)

      this.JFrogEventBus.registerOnScope(this, this.EVENTS.TABS_URL_CHANGED, function (stateParams) {
        _this2.currentTab.name = stateParams.tab;
      });
      $(window).on('resize.tabs', function () {
        _this2.initTabs();
      });
    },
    unwatch: function unwatch() {
      var _this3 = this;

      return this.$scope.$watch('jfTabs.tabs', function (newVal, oldVal) {
        _this3._calculateTabsSize();
      }, true);
    },
    stateChangeListener: function stateChangeListener() {
      return this.$root.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
        toState.tabChange = false;
      });
    },
    onClickTab: function onClickTab(tab, tabChange) {
      this.isDropdownOpen = false;

      if (this.$emit('on-tab-change', {
        tab: tab
      }) === false || tab.isDisabled) {
        return;
      }

      this._ensureTabVisible(tab);

      this.$router.replace({
        query: _objectSpread(_objectSpread({}, this.$router.currentRoute.query), {}, {
          activeTab: tab.name
        })
      });
      this.currentTab.name = tab.name;
    },
    _ensureTabVisible: function _ensureTabVisible(tab) {
      var collapsedTab = this._getCollapsedTab(tab);

      if (!collapsedTab) return; // Replace between collapsedTabs & visibleTabs:

      var collapsedTabIndex = this.tabsCollapsed.indexOf(collapsedTab);
      var tabToReplace = this.tabsVisible[this.tabsVisible.length - 1];
      if (!tabToReplace) return;
      this.tabsCollapsed[collapsedTabIndex] = tabToReplace;
      this.tabsVisible[this.tabsVisible.length - 1] = collapsedTab;
    },
    isActiveTab: function isActiveTab(tab) {
      return tab.name === this.currentTab.name;
    },
    _getTab: function _getTab(tab) {
      var currentTab = _.find(this.tabs, {
        name: tab.name
      });

      return currentTab;
    },
    _getCollapsedTab: function _getCollapsedTab(tab) {
      return _.find(this.tabsCollapsed, {
        name: tab.name
      });
    },
    getTabWidthForStyle: function getTabWidthForStyle() {
      return this.tabwidth.endsWith('%') ? this.tabwidth : this.tabwidth.endsWith('px') ? this.tabwidth : this.tabwidth + 'px';
    },
    hasClass: function hasClass(obj) {
      if (obj && obj.class) return true;
    },
    closeDropdown: function closeDropdown() {
      this.isDropdownOpen = false;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTabsComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTabsComponentvue_type_script_lang_js_ = (JfTabsComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTabsComponent/index.vue?vue&type=style&index=0&id=4ba2684f&scoped=true&lang=less&
var JfTabsComponentvue_type_style_index_0_id_4ba2684f_scoped_true_lang_less_ = __webpack_require__("d6d4");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTabsComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTabsComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "4ba2684f",
  null
  
)

/* harmony default export */ var JfTabsComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "d6d4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4ba2684f_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f77");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4ba2684f_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4ba2684f_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfTabs.js.map