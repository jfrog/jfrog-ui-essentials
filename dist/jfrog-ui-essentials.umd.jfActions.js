((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[10],{

/***/ "32aa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1fe6b283_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6d90");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1fe6b283_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1fe6b283_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "6d90":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f2ca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfActionsComponent/index.vue?vue&type=template&id=1fe6b283&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.getActiveActionsCount()),expression:"getActiveActionsCount()"}],staticClass:"list-inline"},[_vm._l((_vm.fixedActions),function(actionObj,index){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(!actionObj.visibleWhen || actionObj.visibleWhen()),expression:"!actionObj.visibleWhen || actionObj.visibleWhen()"}],key:index,staticClass:"action-button",class:{disabled: actionObj.disabled || (actionObj.disabledWhen && actionObj.disabledWhen())},on:{"click":function($event){return _vm.doAction(actionObj,$event)}}},[_c('a',{attrs:{"href":actionObj.href,"download":""}},[_c('i',{staticClass:"action-icon icon",class:actionObj.icon}),_vm._v(" "+_vm._s(actionObj.title)+"\n            ")])])}),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.dynamicActions.length),expression:"dynamicActions.length"}],staticClass:"action-button"},[_c('span',{staticClass:"dropdown",class:{ open: _vm.isDropdownOpen }},[_c('ul',{staticClass:"dropdown-menu dropdown-menu-right actions-dropdown text-left"},_vm._l((_vm.dynamicActions),function(actionObj,index){return _c('li',{directives:[{name:"show",rawName:"v-show",value:((!actionObj.visibleWhen || actionObj.visibleWhen()) && !actionObj.isHidden),expression:"(!actionObj.visibleWhen || actionObj.visibleWhen()) && !actionObj.isHidden"}],key:index,staticClass:"action-item dynamic-action"},[_c('a',{staticClass:"action-container",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.doAction(actionObj,$event)}}},[(actionObj.icon)?_c('span',{staticClass:"action-icon icon",class:actionObj.icon}):_vm._e(),(actionObj.image && !actionObj.icon)?_c('span',{staticClass:"action-icon"},[_c('img',{attrs:{"src":actionObj.image}})]):_vm._e(),_c('span',{staticClass:"action-name"},[_vm._v(_vm._s(actionObj.title))])])])}),0),_c('a',{staticClass:"dropdown-toggle actions-more",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.isDropdownOpen = !_vm.isDropdownOpen}}},[_vm._v("\n                    "+_vm._s(_vm.int_label)+" "),_c('i',{staticClass:"action-icon icon icon-small-arrow-down"})])])])],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfActionsComponent/index.vue?vue&type=template&id=1fe6b283&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/lodash/filter.js
var filter = __webpack_require__("9380");
var filter_default = /*#__PURE__*/__webpack_require__.n(filter);

// EXTERNAL MODULE: ./node_modules/lodash/forEach.js
var forEach = __webpack_require__("6cd4");
var forEach_default = /*#__PURE__*/__webpack_require__.n(forEach);

// EXTERNAL MODULE: ./node_modules/lodash/includes.js
var includes = __webpack_require__("8a30");
var includes_default = /*#__PURE__*/__webpack_require__.n(includes);

// EXTERNAL MODULE: ./src/services/VueFactory.js
var VueFactory = __webpack_require__("e1f3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfActionsComponent/index.vue?vue&type=script&lang=js&



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




/* harmony default export */ var JfActionsComponentvue_type_script_lang_js_ = ({
  name: 'jf-actions',
  props: ['label', 'initMethod', 'fixedActionsNames', 'disableMouseOverEvents', 'showDropDownForOneItem'],
  data: function data() {
    return {
      fixedActions: [],
      dynamicActions: [],
      isDropdownOpen: false,
      anyActionHasAnIcon: false,
      actionsList: {
        actions: []
      },
      int_label: this.label || 'Actions',
      clicked: false,
      stayOpened: false
    };
  },
  computed: {
    hasSingleVisibleAction: function hasSingleVisibleAction() {
      return this.getActiveActionsCount() === 1 && !this.showDropDownForOneItem;
    }
  },
  watch: {
    actionsList: function actionsList(newVal) {
      console.log("in watch for actions");

      this._divideActions();
    },
    isDropdownOpen: function isDropdownOpen(newVal) {
      if (!newVal && this.clicked) {
        this.isDropdownOpen = true;
        this.clicked = false;
        this.stayOpened = true;
      } else if (!newVal && this.stayOpened) {
        this.stayOpened = false;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    var thisComponent = this;

    if (!thisComponent.initMethod || !thisComponent.$parent[thisComponent.initMethod]) {
      console.error('jfActions: Missing init-method attribute');
      return;
    } else {
      thisComponent.$parent[thisComponent.initMethod](thisComponent);
    }

    this.intervalId = setInterval(function () {
      thisComponent._divideActions();
    }, 2000);
    thisComponent.$watch('hasSingleVisibleAction', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        thisComponent._divideActions();
      }
    });
    var dropdownOver = false;
    var buttonOver = false;
    var $dropdownElement = thisComponent.$element.find('.actions-more');
    var $buttonElement = thisComponent.$element.find('.action-button');

    if (!thisComponent.disableMouseOverEvents) {
      $dropdownElement.on('mouseup', function () {
        if (!thisComponent.stayOpened) {
          thisComponent.clicked = true;
        }
      });
      $dropdownElement.on('mouseenter', function () {
        buttonOver = true;

        thisComponent._toggleDropdown(true);
      });
      $dropdownElement.on('mouseleave', function () {
        buttonOver = false;

        if (!thisComponent.stayOpened) {
          thisComponent._toggleDropdown(dropdownOver);
        }
      });
      $buttonElement.on('mouseenter', function () {
        dropdownOver = true;

        thisComponent._toggleDropdown(true);
      });
      $buttonElement.on('mouseleave', function () {
        dropdownOver = false;

        if (!thisComponent.stayOpened) {
          setTimeout(function () {
            thisComponent._toggleDropdown(buttonOver || dropdownOver);
          }, 200);
        }
      });
    }

    this.showDropdown = function () {
      _this.stayOpened = true;
      _this.clicked = true;
      buttonOver = true;
      dropdownOver = true;

      _this._toggleDropdown(true);
    };

    this.hideDropdown = function () {
      _this.stayOpened = false;
      _this.clicked = false;
      buttonOver = false;
      dropdownOver = false;

      _this._toggleDropdown(false);
    };
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.intervalId);

    if (!this.disableMouseOverEvents) {
      var $dropdownElement = this.$element.find('.actions-more');
      var $buttonElement = this.$element.find('.action-button');
      $dropdownElement.off('mouseup');
      $dropdownElement.off('mouseenter');
      $dropdownElement.off('mouseleave');
      $buttonElement.off('mouseenter');
      $buttonElement.off('mouseleave');
    }
  },
  methods: {
    setActionsHandler: function setActionsHandler(actionsHandler) {
      this.actionsHandler = actionsHandler;
    },
    setCurrentEntity: function setCurrentEntity(entity) {
      this.currentEntity = entity;
    },
    setActionsDictionary: function setActionsDictionary(actionsDictionary) {
      this.actionsDictionary = actionsDictionary;

      this._transformActionsData();
    },
    setActions: function setActions(actions) {
      this.actionsList.actions = actions;

      this._transformActionsData();
    },
    doAction: function doAction(actionObj, e) {
      if (actionObj.disabled || actionObj.disabledWhen && actionObj.disabledWhen()) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }

      if (actionObj.name === 'Download' && actionObj.xrayShouldValidate) {
        e.preventDefault();
      }

      if (this.actionsHandler) {
        this.actionsHandler.perform(actionObj, this.currentEntity);
      } else if (actionObj.action) {
        actionObj.action(this.currentEntity);
      }
    },
    getActiveActionsCount: function getActiveActionsCount() {
      if (!this.actionsList.actions || !this.actionsList.actions.length) return 0;
      return filter_default()(this.actionsList.actions, function (act) {
        return !act.visibleWhen || act.visibleWhen();
      }).length;
    },
    _toggleDropdown: function _toggleDropdown(isOpen) {
      var _this2 = this;

      setTimeout(function () {
        _this2.isDropdownOpen = isOpen;
      }, 10);
    },
    _transformActionsData: function _transformActionsData() {
      var _this3 = this;

      if (!this.actionsDictionary || !this.actionsList) {
        return;
      } // extend action properties from ACTIONS dictionary


      this.actionsList.actions.forEach(function (actionObj) {
        if (!_this3.actionsDictionary[actionObj.name]) {
          console.log('Unrecognized action', actionObj.name);
          return true;
        }

        var _VueFactory$getInstan = VueFactory["a" /* VueFactory */].getInstance(),
            Vue = _VueFactory$getInstan.Vue;

        Vue.util.extend(actionObj, _this3.actionsDictionary[actionObj.name]);
      }); // Divide actions to fixed and dynamic (dropdown)

      this._divideActions();
    },
    _divideActions: function _divideActions() {
      var _this4 = this;

      this.fixedActions = [];
      this.dynamicActions = [];

      if (this.hasSingleVisibleAction) {
        this.fixedActions.push(this.actionsList.actions.find(function (action) {
          return action.visibleWhen();
        }));
        return;
      }

      forEach_default()(this.actionsList.actions, function (actionObj) {
        if (includes_default()(_this4.fixedActionsNames, actionObj.name)) {
          _this4.fixedActions.push(actionObj);
        } else {
          _this4.dynamicActions.push(actionObj);

          _this4.anyActionHasAnIcon = _this4.anyActionHasAnIcon || !!actionObj.icon;
        }
      });

      if (this.fixedActions.length === 0 && this.dynamicActions.length === 1 && !this.showDropDownForOneItem) {
        this.fixedActions.push(this.dynamicActions.pop());
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfActionsComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfActionsComponentvue_type_script_lang_js_ = (JfActionsComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfActionsComponent/index.vue?vue&type=style&index=0&id=1fe6b283&scoped=true&lang=less&
var JfActionsComponentvue_type_style_index_0_id_1fe6b283_scoped_true_lang_less_ = __webpack_require__("32aa");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfActionsComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfActionsComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "1fe6b283",
  null
  
)

/* harmony default export */ var JfActionsComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfActions.js.map