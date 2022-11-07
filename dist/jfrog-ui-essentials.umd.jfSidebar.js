((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[40],{

/***/ "07e1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7d1ff3be_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("563d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7d1ff3be_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_7d1ff3be_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "563d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "aa43":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSidebarComponent/index.vue?vue&type=template&id=7d1ff3be&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{style:(_vm.menu),attrs:{"id":"jf-main-nav"},on:{"mouseleave":function($event){return _vm.mouseLeaveMenu($event)},"mouseover":function($event){return _vm.mouseOverMenu()}}},[_c('span',{staticClass:"pin-menu",on:{"click":function($event){return _vm.pinMenu()}}},[_c('i',{staticClass:"icon-menu-arrow",class:{'menu-arrow-close' : _vm.pinMenuStatus}})]),_c('ul',{staticClass:"sidebar-wrapper-inner",on:{"click":function($event){return _vm.closeSubMenu(0,true,true)}}},_vm._l((_vm.menuItems),function(item){return (!item.isHidden)?_c('li',{class:{disabled: item.isDisabled, active: (item.stateParent | _vm.includedByState) || _vm.isCurrentItem(item) || _vm.highLightOnState(item.stateRelated), 'icon-arrow-left':item.children },attrs:{"jf-disable-feature":item.feature},on:{"click":function($event){$event.stopPropagation(); _vm.itemClick(item)}}},[(item.isDisabled)?_c('a',{staticClass:"menu-item disabled",class:item.customClasses,attrs:{"id":item.id}},[_c('i',{class:item.icon}),_c('span',[_vm._v(_vm._s(item.label))])]):_vm._e(),(!item.isDisabled && !item.children && !item.template)?_c('a',{staticClass:"menu-item",class:item.customClasses,attrs:{"id":item.id},on:{"mouseover":function($event){return _vm.onMouseOverSimpleItem(item)}}},[_c('i',{class:item.icon}),_c('span',[_vm._v(_vm._s(item.label))])]):_vm._e(),(!item.isDisabled && !item.children && item.template)?_c('a',{directives:[{name:"jf-dynamic-template",rawName:"v-jf-dynamic-template",value:('item.template'),expression:"'item.template'"}],staticClass:"menu-item",class:item.customClasses,attrs:{"id":item.id},on:{"mouseover":function($event){return _vm.onMouseOverSimpleItem(item)}}}):_vm._e(),(!item.isDisabled && item.children)?_c('a',{staticClass:"menu-item extended-item",attrs:{"href":"","id":item.id},on:{"mouseover":function($event){return _vm.onMouseOverExtendedItem(item)},"mouseleave":function($event){return _vm.onMouseLeaveExtendedItem(item)}}},[_c('i',{class:item.icon}),_c('span',[_vm._v(_vm._s(item.label))])]):_vm._e(),(item.children && !item.isDisabled)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.openSub === item),expression:"openSub === item"}],staticClass:"sub-menu",on:{"mouseover":function($event){return _vm.subMenuOver()},"click":function($event){return $event.stopPropagation()}}},[(_vm.noSearchBox === undefined && !_vm.openSub.noSearchBox)?_c('div',{staticClass:"searchbox-wrapper"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.menuSearchQuery),expression:"menuSearchQuery"}],staticClass:"input-text",attrs:{"type":"text","id":"menuSearchQuery","placeholder":"Filter Menu...","autocomplete":"off","jf-enter-press":"chooseSingleChoice()"},domProps:{"value":(_vm.menuSearchQuery)},on:{"focus":function($event){return _vm.openSubMenu()},"input":[function($event){if($event.target.composing){ return; }_vm.menuSearchQuery=$event.target.value},function($event){return _vm.checkForSingleChoice()}],"keydown":function($event){return _vm.navigateInMenu($event)}}}),_c('span',{staticClass:"clear-input",class:{'disabled': !_vm.menuSearchQuery},on:{"click":function($event){_vm.menuSearchQuery = ''}}},[_vm._v("×")])]):_vm._e(),_c('div',{staticClass:"masonry",class:{'no-search-box': _vm.noSearchBox !== undefined || _vm.openSub.noSearchBox},attrs:{"tabindex":"-1"}},[_c('div',_vm._l((_vm.subMenuItems),function(item){return (!item.isHidden)?_c('div',{staticClass:"section"},[_c('h3',[_vm._v(_vm._s(item.label))]),_vm._l((item.subItems),function(subItem){return (!subItem.isHidden)?_c('span',{attrs:{"jf-disable-feature":subItem.feature}},[(subItem.isDisabled)?_c('a',{class:{'blocked': subItem.isDisabled}},[_vm._v("\n                                    "+_vm._s(subItem.label)+"\n                                ")]):_vm._e(),_c('router-link',{attrs:{"to":{name: ' subItem.state  ({{ subItem.stateParams }})'}}},[(!subItem.isDisabled)?_c('a',{class:{'highlight' : _vm.searchHighlightCheck(subItem.label),
                                              'not-active' : !_vm.searchHighlightCheck(subItem.label) && _vm.menuSearchQuery.length,
                                              'current' : _vm.isCurrentItem(subItem)},attrs:{"data-state":subItem.state,"data-params":subItem.stateParams,"id":'item-' + subItem.id},on:{"click":function($event){$event.preventDefault();return _vm.subMenuItemClick(subItem)},"keydown":function($event){return _vm.navigateInMenu($event)}}},[_vm._v("\n                                    "+_vm._s(subItem.label)+"\n                                ")]):_vm._e()])],1):_vm._e()})],2):_vm._e()}),0)])]):_vm._e()]):_vm._e()}),0),(_vm.footerTemplate)?_c('ng2vue-include',{attrs:{"src":"footerTemplate"}}):_vm._e(),(_vm.footerTemplateHtml)?_c('div',{domProps:{"innerHTML":_vm._s(_vm.footerTemplateHtml)}}):_vm._e()],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfSidebarComponent/index.vue?vue&type=template&id=7d1ff3be&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/lodash/includes.js
var includes = __webpack_require__("8a30");
var includes_default = /*#__PURE__*/__webpack_require__.n(includes);

// EXTERNAL MODULE: ./node_modules/lodash/isUndefined.js
var isUndefined = __webpack_require__("4cfe");
var isUndefined_default = /*#__PURE__*/__webpack_require__.n(isUndefined);

// EXTERNAL MODULE: ./node_modules/lodash/isEqual.js
var isEqual = __webpack_require__("63ea");
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual);

// EXTERNAL MODULE: ./node_modules/lodash/find.js
var find = __webpack_require__("2769");
var find_default = /*#__PURE__*/__webpack_require__.n(find);

// EXTERNAL MODULE: ./node_modules/lodash/trim.js
var trim = __webpack_require__("66c7");
var trim_default = /*#__PURE__*/__webpack_require__.n(trim);

// EXTERNAL MODULE: ./node_modules/lodash/pick.js
var pick = __webpack_require__("2593");
var pick_default = /*#__PURE__*/__webpack_require__.n(pick);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfSidebarComponent/index.vue?vue&type=script&lang=js&






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
//
//
//
//
//






/* harmony default export */ var JfSidebarComponentvue_type_script_lang_js_ = ({
  name: 'jf-sidebar',
  props: ['driver', 'footerTemplate', 'menuItems', 'openAdminSize', 'defaultSubMenuWidth', 'noSearchBox', 'defaultSubMenuId'],
  'jf@inject': ['$scope', '$state', '$timeout', '$interval', '$window', '$rootScope', 'JFrogEventBus'],
  data: function data() {
    return {
      menu: {
        'transition-duration': '.3s'
      },
      pinMenuStatus: true,
      openSub: {
        noSearchBox: null
      },
      menuSearchQuery: '',
      subMenuItems: null,
      footerTemplateHtml: '<div class="img-wrapper"><img  src="/images/jfrog.svg" alt=""></div>'
    };
  },
  created: function created() {
    this.trim = trim_default.a;
    this.currentTab = 'Home';
    this.EVENTS = this.JFrogEventBus.getEventsDefinition();
    this.pinMenuStatus = JSON.parse(localStorage.pinMenu || 'false');
    this.currentFocus = $(':focus');
    this.skip = false;
    this.$scope.$on('$destroy', function () {
      $('body').off('keydown');
    });
  },
  mounted: function mounted() {
    var _this = this;

    console.log("MOUNTED!±!#@@!#@!#@!#@!#!@WQ");
    this.subMenuWidth = this.defaultSubMenuWidth || this.openAdminSize || '900px';
    this.defaultSubWidth = this.subMenuWidth;
    this.defaultSubMenuId = this.defaultSubMenuId || 'admin';

    if (!this.driver) {
      console.error('jf-sidebar: No driver is provided');
      this.driver = {};
    }

    this.legacyAdminMenuItems = this.driver.getAdminMenuItems ? this.driver.getAdminMenuItems() : [];

    if (this.driver.setMenu) {
      this.driver.setMenu(this);
    }

    if (this.driver.registerEvents) {
      this.driver.registerEvents();
    }

    this.refreshMenu();

    if (this.driver.getFooterData) {
      this.driver.getFooterData().then(function (footerData) {
        return _this.footerData = footerData;
      });
    }

    this.initSideBar();
    this.$forceUpdate();
  },
  ng1_legacy: {
    'controllerAs': 'jfSidebar'
  },
  methods: {
    initSideBar: function initSideBar() {
      var _this2 = this;

      this.pinMenuStatus ? this.$set(this.menu, 'width', '200px') : this.$set(this.menu, 'width', '55px');
      this.pinMenuStatus ? this.$set(this.menu, 'transitionDelay', '.2s') : this.$set(this.menu, 'transitionDelay', '.3s');
      this.$timeout(function () {
        return _this2._trackResize();
      });
      $('body').on('keydown', function (e) {
        if (_this2.driver.onKeyDown) {
          _this2.driver.onKeyDown(e);
        } // Ctrl + right arrow to open the default sub menu


        if (e.keyCode === 39 && e.ctrlKey && e.altKey && $('.sub-menu').length) {
          _this2.$timeout(function () {
            var defaultItem = find_default()(_this2.menuItems, {
              id: _this2.defaultSubMenuId
            });

            if (defaultItem) {
              _this2._setExtendedMenu(defaultItem);
            }

            _this2.openSubMenu();
          });

          e.preventDefault();
        } // ESC click or Ctrl+left to close default sub menu


        if ((e.keyCode === 27 || e.keyCode === 37 && e.ctrlKey && e.altKey) && _this2.menu.width === _this2.subMenuWidth && $('.sub-menu').length > 0) {
          _this2.$timeout(function () {
            _this2.menuSearchQuery = '';
            $('#menuSearchQuery').blur();

            _this2.$set(_this2.menu, 'width', _this2.defaultWidth());

            _this2._updateTabIndex();
          });

          e.preventDefault();
        }
      });
    },
    isCollapsed: function isCollapsed() {
      return this.menu.width === '55px';
    },
    mouseOverMenu: function mouseOverMenu() {
      var _this3 = this;

      if (this.mouseIsOver) {
        return;
      }

      this.mouseIsOver = true;

      if (this.menu.width === this.subMenuWidth && $('.menu-item:hover').length && $('a.menu-item.extended-item:hover').length < 1) {
        if (isUndefined_default()(this.closeSubMenuDelay) && !$('.sub-menu:hover').length) {
          this.closeSubMenuDelay = this.$timeout(function () {
            _this3.closeSubMenu();

            delete _this3.closeSubMenuDelay;
          }, 300);
        }
      } else if (this.menu.width != '200px' && !$('.pin-menu:hover').length && $('.sub-menu:hover').length < 1) {
        // if menu isn't open
        if (isUndefined_default()(this.openMenu)) {
          this.openMenu = this.$timeout(function () {
            var widthToOpen = $('.sub-menu').length > 0 && $('a.menu-item.extended-item:hover').length ? _this3.subMenuWidth : '200px';

            if (($('.sub-menu:hover').length || $('.menu-item.extended-item:hover').length) && !isUndefined_default()(_this3.openMenu)) {
              _this3.$timeout.cancel(_this3.openMenu);

              delete _this3.openMenu;
              return;
            }

            _this3._updateMenuObject(widthToOpen, '.3s', '0s');
          }, 2000);
        }
      }
    },
    mouseLeaveMenu: function mouseLeaveMenu(e) {
      if (e && e.toElement) {
        if ($(e.toElement).hasClass('tooltipster-content') || $(e.toElement.parentElement).hasClass('tooltipster-arrow')) {
          return;
        }
      }

      this.mouseIsOver = false;

      if (this.menu.width != this.subMenuWidth) {
        // if sub menu menu isn't open
        this._updateMenuObject(this.defaultWidth(), '.3s');
      }

      this.closeSubMenu();

      this._openMenuStop();

      this._subMenuDelayStop();
    },
    subMenuOver: function subMenuOver() {
      if (!isUndefined_default()(this.subMenuItemDelayTimer)) {
        this.$timeout.cancel(this.subMenuItemDelayTimer);
        delete this.subMenuItemDelayTimer;
      }

      if (!isUndefined_default()(this.closeSubMenuDelay)) {
        this.$timeout.cancel(this.closeSubMenuDelay);
        delete this.closeSubMenuDelay;
      }
    },
    _updateMenuObject: function _updateMenuObject(width) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0s';
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0s';
      this.menu = {
        'width': width,
        'transition-duration': duration,
        'transition-delay': delay
      };
    },
    isCurrentTab: function isCurrentTab(tab) {
      return this.currentTab === tab.label;
    },
    setCurrentTab: function setCurrentTab(tab) {
      this.currentTab === tab.label ? this.currentTab = '' : this.currentTab = tab.label;
    },
    refreshMenu: function refreshMenu() {
      console.log("******* PUSGIN ITEMS!!!!", this._getMenuItems());
      this.legacyAdminMenuItems = this.driver.getAdminMenuItems ? this.driver.getAdminMenuItems() : [];
    },
    goToState: function goToState(item) {
      if (this.driver.onBeforeStateSwitch) {
        this.driver.onBeforeStateSwitch(item);
      }

      this.$state.go(item.state, item.stateParams);
    },
    _getMenuItems: function _getMenuItems() {
      return this.driver.getMenuItems ? this.driver.getMenuItems() : [];
    },
    defaultWidth: function defaultWidth() {
      return this.pinMenuStatus ? '200px' : '55px';
    },
    pinMenu: function pinMenu() {
      this.pinMenuStatus = !this.pinMenuStatus;
      console.log('Pinning!', this.pinMenuStatus);
      localStorage.pinMenu = this.pinMenuStatus;

      if (!isUndefined_default()(this.openMenu)) {
        this._openMenuStop();
      }

      this.$set(this.menu, 'transitionDelay', '0s');
      this.$set(this.menu, 'width', this.defaultWidth()); //if (!this.pinMenuStatus) {
      //    // close menu - [block screen?]
      //}

      this._trackResize();
    },
    _trackResize: function _trackResize() {
      var _this4 = this;

      if (this.trackResizeInterval) {
        this.$interval.cancel(this.trackResizeInterval);
      }

      var origWidth = parseInt($('#jf-content').css('width'));
      var lastWidth = origWidth;
      var noChangeLoops = 0;
      var resizeEvent = document.createEvent('Event');
      resizeEvent.initEvent('resize', false, true);
      this.trackResizeInterval = this.$interval(function () {
        var currWidth = parseInt($('#jf-content').css('width'));

        if (currWidth === lastWidth) {
          noChangeLoops++;
        } else {
          noChangeLoops = 0;
        }

        if (noChangeLoops >= 20) {
          _this4.$interval.cancel(_this4.trackResizeInterval);

          delete _this4.trackResizeInterval;
        }

        lastWidth = currWidth;

        _this4.$timeout(function () {
          try {
            window.dispatchEvent(new Event('resize'));
          } catch (e) {
            window.dispatchEvent(resizeEvent);
          }

          _this4.JFrogEventBus.dispatch(_this4.EVENTS.SIDEBAR_SIZE_CHANGE);
        });
      }, 1);
    },
    itemClick: function itemClick(item) {
      var _this5 = this;

      if (this.subMenuCloseDelay) {
        this.$timeout.cancel(this.subMenuCloseDelay);
        delete this.subMenuCloseDelay;
      }

      if (!item.children) {
        //            delete this.openSub;
        this.closeSubMenu(0, true);

        if (this.menu.width === '55px' || this.menu.width === '200px') {
          this._openMenuStop();

          this._subMenuDelayStop();
        }

        if (!item.isDisabled) {
          this.$timeout(function () {
            return _this5.goToState(item);
          }, 20);
        }
      } else if (item.children) {
        if (!this.isSubMenuOpen()) {
          this._setExtendedMenu(item);

          this.openSubMenu();
        } else {
          this.closeSubMenu(0, true, true);

          this._subMenuDelayStop();

          if (this.openSub !== item) {
            this.$timeout(function () {
              _this5.itemClick(item);
            }, 500);
          }
        }
      }
    },
    _setExtendedMenu: function _setExtendedMenu(item) {
      if (!item) {
        return;
      }

      if (item.children === true && this.legacyAdminMenuItems) {
        //backward compatibility for single extended ('admin') menu
        this.subMenuItems = this.legacyAdminMenuItems;
        this.subMenuWidth = this.defaultSubWidth;
        this.openSub = item;
      } else if (item.children) {
        this.subMenuItems = item.children;
        this.subMenuWidth = item.subMenuWidth || this.defaultSubWidth;
        this.openSub = item;
      }
    },
    openSubMenu: function openSubMenu() {
      var _this6 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.subMenuCloseDelay) {
        this.$timeout.cancel(this.subMenuCloseDelay);
        delete this.subMenuCloseDelay;
      }

      if ($('.sub-menu').length > 0) {
        this._openMenuStop();

        this._subMenuDelayStop();

        if ($(':focus').length && $(':focus')[0].id != 'admin' && $(':focus')[0].id != 'menuSearchQuery') {
          this.currentFocus = $(':focus');
        }

        if (delay && isUndefined_default()(this.subMenuDelay)) {
          this.subMenuDelay = this.$timeout(function () {
            _this6.openSubMenu();

            _this6._setSubMenuFocus();

            _this6._subMenuDelayStop();

            return;
          }, 2000);
        } else {
          if (!this.skip && this.menu.width !== this.subMenuWidth) {
            this._updateMenuObject('50px', '0.3s', '0s');

            this.$timeout(function () {
              return _this6._setSubMenuFocus();
            });

            if (!isUndefined_default()(this.subMenuDelay)) {
              this._subMenuDelayStop();
            }
          }
        }

        this._updateTabIndex();
      }
    },
    onMouseOverSimpleItem: function onMouseOverSimpleItem(item) {
      this.closeSubMenu(1800, true, true);
    },
    onMouseOverExtendedItem: function onMouseOverExtendedItem(item) {
      var _this7 = this;

      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!this.isSubMenuOpen()) {
        this._setExtendedMenu(item);

        this.openSubMenu(delay);
      } else {
        if (this.openSub !== item) {
          this.closeSubMenu(0, true, true);

          this._subMenuDelayStop();

          this.$timeout(function () {
            _this7.onMouseOverExtendedItem(item, false);
          }, 500);
        } else {
          this.openSubMenu(true);
        }
      }
    },
    onMouseLeaveExtendedItem: function onMouseLeaveExtendedItem(e) {
      this._subMenuDelayStop();

      this.subMenuItemDelay = true;
      this.closeSubMenu(1800, true, true);
    },
    isSubMenuOpen: function isSubMenuOpen() {
      return $('#jf-main-nav').css('width') === this.subMenuWidth;
    },
    clickOffMenu: function clickOffMenu() {
      if ($('.sub-menu').length > 0 && !$('.menu-item:hover').length && (this.menu.width != '55px' || !this.pinMenuStatus && this.menu.width != '200px')) {
        // TODO: Fix this rule. shuldn't happen if menu is 55px or 200 with pinned on
        if (this.menu.width != '55px' && !$('.sub-menu:hover').length) {
          this._updateMenuObject(this.defaultWidth(), '.3s');

          this.menuSearchQuery = '';

          this._updateTabIndex();
        }
      }
    },
    closeSubMenu: function closeSubMenu(delay) {
      var _this8 = this;

      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var expand = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (delay) {
        if (this.subMenuCloseDelay) {
          this.$timeout.cancel(this.subMenuCloseDelay);
          delete this.subMenuCloseDelay;
        }

        this.subMenuCloseDelay = this.$timeout(function () {
          if (_this8.subMenuCloseDelay) {
            _this8.$timeout.cancel(_this8.subMenuCloseDelay);

            delete _this8.subMenuCloseDelay;
          }

          _this8.closeSubMenu(0, force, expand);
        }, delay);
        return;
      }

      if (!force && ($('.sub-menu:hover').length || $('.menu-item.extended-item:hover').length || $('.sub-menu').find('a').is(':focus') || $('#menuSearchQuery').is(':focus') && $('#menuSearchQuery').val().length > 0)) {
        return;
      } else if (this.subMenuItemDelay) {
        this.subMenuItemDelayTimer = this.$timeout(function () {
          _this8.subMenuItemDelay = false;
          delete _this8.subMenuItemDelayTimer;

          if (!$('.sub-menu:hover').length && !$('.tooltipster-content:hover').length && !$('.tooltipster-arrow:hover').length) {
            _this8.closeSubMenu(delay, force, expand);
          }
        }, 100);
        return;
      } else {
        if (expand && $('#jf-main-nav:hover').length) {
          this.$set(this.menu, 'width', '200px');
        } else {
          this.$set(this.menu, 'width', this.defaultWidth());
        }

        if (this.currentFocus.length) {
          this.currentFocus[0].focus();
        }

        $('#menuSearchQuery').blur();
        $('.masonry').scrollTop(0);
        this.menuSearchQuery = '';

        this._updateTabIndex();
      }
    },
    _openMenuStop: function _openMenuStop() {
      this.$timeout.cancel(this.openMenu);
      delete this.openMenu;
    },
    _subMenuDelayStop: function _subMenuDelayStop() {
      this.$timeout.cancel(this.subMenuDelay);
      delete this.subMenuDelay;
    },
    _setSubMenuFocus: function _setSubMenuFocus() {
      if (!$('.sub-menu:hover').length) {
        $('#menuSearchQuery').focus();
        $('#jf-main-nav').scrollLeft(0);
      }
    },
    _updateTabIndex: function _updateTabIndex() {
      if (this.menu.width != this.subMenuWidth) {
        $('.sub-menu').find('a,input').attr('tabindex', -1);
        $('.sub-menu').find('a,input').blur();
      } else {
        var highlighted = $('.sub-menu').find('a.highlight');

        if (highlighted.length) {
          $('.sub-menu').find('input').removeAttr('tabindex');
          $('.sub-menu').find('a.highlight').removeAttr('tabindex');
          $('.sub-menu').find('a:not(.highlight)').attr('tabindex', -1);
        } else {
          $('.sub-menu').find('a,input').removeAttr('tabindex');
        }
      }

      $('#jf-main-nav').scrollLeft(0);
    },
    searchHighlightCheck: function searchHighlightCheck(menuItem) {
      if (this.menuSearchQuery) {
        var string = menuItem.toLowerCase().replace(/ /g, '');
        var searchstring = this.menuSearchQuery.toLowerCase().replace(/ /g, '');

        if (includes_default()(string, searchstring)) {
          return true;
        } else {
          return false;
        }
      }
    },
    checkForSingleChoice: function checkForSingleChoice() {
      $('#jf-main-nav').scrollLeft(0);
      this.$timeout(function () {
        $('.single-choice').removeClass('single-choice');
        var elem = $('.masonry').find('.highlight');

        if (elem.length == 1) {
          elem.addClass('single-choice');
        }
      }, 50);
    },
    chooseSingleChoice: function chooseSingleChoice() {
      var elem = $('.single-choice');

      if (elem.length) {
        if (this.driver.onBeforeStateSwitch) {
          this.driver.onBeforeStateSwitch({
            state: elem.data('state'),
            stateParams: elem.data('params')
          });
        }

        this.$state.go(elem.data('state'), elem.data('params'));
        this.menuSearchQuery = '';

        this._updateMenuObject(this.defaultWidth(), '.3s');

        this._updateTabIndex();
      } else {
        return false;
      }
    },
    subMenuItemClick: function subMenuItemClick(subItem) {
      var _this9 = this;

      this.menuSearchQuery = '';

      this._updateMenuObject(this.defaultWidth(), '.3s');

      this._updateTabIndex();

      this.skip = true;
      this.$timeout(function () {
        _this9.skip = false;
      }, 400);

      if (this.driver.onBeforeStateSwitch) {
        this.driver.onBeforeStateSwitch(subItem);
      }

      this.$state.go(subItem.state, subItem.stateParams);
    },
    navigateInMenu: function navigateInMenu(e) {
      var key = e.keyCode;
      var $allHighlighted = $('.sub-menu').find('.highlight');
      var $allFocusableItems = $('.sub-menu').find('a:focusable');

      switch (key) {
        case 38:
          // UP
          if ($(e.currentTarget).is(':input')) {
            return;
          }

          if (!$('.highlight').length) {
            if (!$allFocusableItems.length) {
              // if no available choices at all (not-active) return
              return;
            } else {
              $allFocusableItems.eq($.inArray($(':focus')[0], $allFocusableItems) - 1).focus();
            }
          } else {
            // if highlighted
            $allHighlighted.eq($.inArray($('.highlight:focus')[0], $allHighlighted) - 1).focus();
          }

          break;

        case 40:
          // DOWN
          if ($(e.currentTarget).is(':input')) {
            if ($allHighlighted.length) {
              $allHighlighted[0].focus();
            } else {
              $('.sub-menu').find('a').first(':focusable').focus();
            }
          } else {
            if (!$('.highlight').length) {
              if (!$allFocusableItems.length) {
                // if no available choices at all (not-active) return
                return;
              } else if ($.inArray($(':focus')[0], $allFocusableItems) === $allFocusableItems.length - 1) {
                // if last item go to first item
                $allFocusableItems[0].focus();
              } else {
                $allFocusableItems.eq($.inArray($(':focus')[0], $allFocusableItems) + 1).focus();
              }
            } else {
              // if highlighted
              if ($.inArray($('.highlight:focus')[0], $allHighlighted) === $allHighlighted.length - 1) {
                $allHighlighted[0].focus();
              } else {
                $allHighlighted.eq($.inArray($('.highlight:focus')[0], $allHighlighted) + 1).focus();
              }
            }
          }

          break;

        case 8:
          //Backspace
          if (this.focusedElement && !$('#menuSearchQuery').is(':focus')) {
            e.preventDefault();
            return;
          }

          break;
      }
    },
    isCurrentItem: function isCurrentItem(subItem) {
      var result = includes_default()(this.$state.current.name, subItem.state);

      if (result && subItem.stateParams) {
        var relevantParams = pick_default()(this.$state.params, Object.keys(subItem.stateParams));
        result = isEqual_default()(relevantParams, subItem.stateParams);
      }

      return result;
    },
    highLightOnState: function highLightOnState(statesArr) {
      if (!statesArr) {
        return false;
      }

      var currentStateName = this.$state.current.name;
      return statesArr.indexOf(currentStateName) > -1;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfSidebarComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfSidebarComponentvue_type_script_lang_js_ = (JfSidebarComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfSidebarComponent/index.vue?vue&type=style&index=0&id=7d1ff3be&scoped=true&lang=less&
var JfSidebarComponentvue_type_style_index_0_id_7d1ff3be_scoped_true_lang_less_ = __webpack_require__("07e1");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfSidebarComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfSidebarComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "7d1ff3be",
  null
  
)

/* harmony default export */ var JfSidebarComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfSidebar.js.map