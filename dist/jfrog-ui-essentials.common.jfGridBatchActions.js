((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[25],{

/***/ "a7c7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridBatchActionsComponent/index.vue?vue&type=template&id=d5129628&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"grid-batch-actions text-right"},_vm._l((_vm.actions),function(action,$index){
var _obj;
return _c('div',{directives:[{name:"jf-tooltip",rawName:"v-jf-tooltip.bind",value:(_vm.isDisabled(action) ? action.getDisabledTooltip() : ''),expression:"isDisabled(action) ? action.getDisabledTooltip() : ''",modifiers:{"bind":true}}],staticClass:"grid-batch-action-wrapper",class:{'more-actions': action === _vm.MORE_ACTIONS},style:({visibility: action === _vm.MORE_ACTIONS || _vm.visibleActions.indexOf(action) !== -1 ? 'inherit' : 'hidden', opacity: action === _vm.MORE_ACTIONS || _vm.visibleActions.indexOf(action) !== -1 ? 1 : 0}),attrs:{"data-action-id":action.name}},[(action !== _vm.MORE_ACTIONS && (!action.visibleWhen || action.visibleWhen()))?_c('a',{class:( _obj = {disabled: _vm.isDisabled(action)}, _obj['btn batch-action-' + action.icon] = true, _obj ),on:{"click":function($event){$event.preventDefault();return _vm.perform(action)}}},[(action.img)?_c('img',{attrs:{"src":'images/' + action.icon + '.png'}}):_vm._e(),(!action.img)?_c('i',{class:'icon icon-' + action.icon}):_vm._e(),_vm._v(" "+_vm._s(action.name)+"\n            ")]):_vm._e(),(action === _vm.MORE_ACTIONS)?_c('div',{staticClass:"more-wrapper"},[_c('jf-actions',{attrs:{"parent-controller":_vm.jfBatchActions,"label":"More Actions","init-method":"initActions","show-drop-down-for-one-item":true}})],1):_vm._e()])}),0)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfGridBatchActionsComponent/index.vue?vue&type=template&id=d5129628&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfGridBatchActionsComponent/index.vue?vue&type=script&lang=js&



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
/* harmony default export */ var JfGridBatchActionsComponentvue_type_script_lang_js_ = ({
  name: 'jf-grid-batch-actions',
  props: ['actions', 'gridApi', 'gridOptions'],
  'jf@inject': ['$element', '$scope', '$timeout'],
  data: function data() {
    return {
      MORE_ACTIONS: {
        '@@MORE_ACTIONS@@': '@@MORE_ACTIONS@@'
      }
    };
  },
  created: function created() {
    var _this = this;

    this.$scope.$watch('jfBatchActions.gridApi', function () {
      if (!_this.gridApi) return;

      _this.gridApi.selection.on.rowSelectionChanged(_this.$scope, function (row) {
        _this.$timeout(function () {
          return _this.updateMoreActions();
        });
      });

      _this.gridApi.selection.on.rowSelectionChangedBatch(_this.$scope, function (row) {
        _this.$timeout(function () {
          return _this.updateMoreActions();
        });
      });
    });
  },
  mounted: function mounted() {
    var _this2 = this;

    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    this.$scope.$on('ui-layout.resize', function () {
      _this2.$timeout(function () {
        return _this2.calcActionsVisibility();
      });
    });
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

    $(window).on('resize', function () {
      _this2.$timeout(function () {
        return _this2.calcActionsVisibility();
      });
    });
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

    this.$scope.$watch('jfBatchActions.actions', function () {
      return _this2.$timeout(function () {
        return _this2.calcActionsVisibility();
      });
    });
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

    this.$timeout(function () {
      return _this2.calcActionsVisibility();
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfBatchActions'
  },
  methods: {
    perform: function perform(action) {
      if (this.anySelected() && (!action.disabledWhen || !action.disabledWhen())) {
        action.callback && action.callback(this.gridApi.selection.getSelectedRows());
      }
    },
    anySelected: function anySelected() {
      return this.gridApi && this.gridApi.selection.getSelectedRows().length > 0;
    },
    isDisabled: function isDisabled(action) {
      return !this.anySelected() || action.disabledWhen && action.disabledWhen();
    },
    calcActionsVisibility: function calcActionsVisibility() {
      var _this3 = this;

      if (!this.actions) return;
      var visible = [];
      var inDropDown = [];
      var moreDropdownWidth = 115;
      var elems = $(this.$element).find('.grid-batch-action-wrapper:not(.more-actions)');
      var containerWidth = $(this.$element).width();
      var totalWidth = 0;
      var addTo = visible;
      var moreActionsNewIndex = -1;
      var moreActionsOldIndex = this.actions.indexOf(this.MORE_ACTIONS);

      for (var i = 0; i < elems.length; i++) {
        var el = $(elems[i]);
        totalWidth += el.width();
        var id = el.attr('data-action-id');

        var act = _.find(this.actions, {
          name: id
        });

        var index = this.actions.indexOf(act);

        if ((totalWidth > containerWidth || this.moreActions && this.moreActions.length && totalWidth - el.width() + moreDropdownWidth > containerWidth) && addTo === visible) {
          addTo = inDropDown;
          moreActionsNewIndex = index;

          if (visible.length && totalWidth - el.width() + moreDropdownWidth > containerWidth) {
            var last = visible.pop();
            inDropDown.push(last);
            moreActionsNewIndex = this.actions.indexOf(last);
          }
        }

        if (act) addTo.push(act);
      }

      if (totalWidth < containerWidth) {
        inDropDown = [];
        visible = _.filter(this.actions, function (act) {
          return act !== _this3.MORE_ACTIONS;
        });
        moreActionsNewIndex = -1;
      }

      var temp = {
        TEMP: 'TEMP'
      };

      if (moreActionsOldIndex !== -1) {
        this.actions.splice(moreActionsOldIndex, 1, temp);
      }

      if (moreActionsNewIndex !== -1) {
        this.actions.splice(moreActionsNewIndex, 0, this.MORE_ACTIONS);
      }

      var tempIndex = this.actions.indexOf(temp);

      if (tempIndex !== -1) {
        this.actions.splice(tempIndex, 1);
      }

      this.visibleActions = visible;
      this.moreActions = inDropDown;
      this.$timeout(function () {
        return _this3.updateMoreActions();
      });
    },
    initActions: function initActions(actionsController) {
      this.moreActionsController = actionsController;
      if (this.gridOptions) this.$set(this.gridOptions, 'moreActionsController', actionsController);
      this.updateMoreActions();
    },
    updateMoreActions: function updateMoreActions() {
      var _this4 = this;

      if (!this.moreActionsController) return;

      var actionsCount = _.filter(this.actions, function (act) {
        return act !== _this4.MORE_ACTIONS;
      }).length;

      if (this.moreActions.length < actionsCount) {
        this.moreActionsController.label = 'More Actions';
      } else if (this.moreActions.length === actionsCount) {
        this.moreActionsController.label = 'Actions';
      }

      var dict = {};
      this.moreActions.forEach(function (action) {
        dict[action.name] = {
          title: action.name,
          icon: 'icon-' + action.icon,
          disabled: _this4.isDisabled(action)
        };
      });
      this.moreActionsController.setActionsDictionary(dict);
      this.moreActionsController.setActions(_.map(this.moreActions, function (action) {
        return {
          name: action.name,
          visibleWhen: action.visibleWhen,
          action: action.callback
        };
      }));
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfGridBatchActionsComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfGridBatchActionsComponentvue_type_script_lang_js_ = (JfGridBatchActionsComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfGridBatchActionsComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfGridBatchActionsComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "d5129628",
  null
  
)

/* harmony default export */ var JfGridBatchActionsComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfGridBatchActions.js.map