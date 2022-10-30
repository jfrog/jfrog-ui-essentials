((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[31],{

/***/ "98bb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d0b81578_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cac9");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d0b81578_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d0b81578_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "a1f7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfListSelectionComponent/index.vue?vue&type=template&id=d0b81578&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jf-list-selection"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterList),expression:"filterList"}],staticClass:"input-text dnd-filter",attrs:{"type":"text","placeholder":"Filter..."},domProps:{"value":(_vm.filterList)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.filterList=$event.target.value},function($event){return _vm.onFilterChange()}]}}),_c('div',{staticClass:"group-list-wrapper"},[_c('ul',{staticClass:"group-list"},[_c('li',{staticClass:"group-list-item",staticStyle:{"display":"none"}},[_vm._v("*")]),_vm._l((_vm.getPageItems()),function(item,index){return _c('li',_vm._b({key:index,staticClass:"group-list-item cursor-pointer",class:{'not-clickable': !item.clickable, 'highlighted': item.highlighted && _vm.highlightSelected},on:{"dblclick":function($event){return _vm.onItemClick(item)},"click":function($event){_vm.allowSingleClick ? _vm.onItemSelection(item) : null}}},'li',_vm.addToolTip(item),false),[(item.icon_class)?_c('i',_vm._b({staticClass:"icon pull-left",class:item.icon_class},'i',_vm.addToolTip(item),false)):_vm._e(),_vm._v("\n                "+_vm._s(item.name)+"\n                "),_c('i',{staticClass:"icon icon-arrow pull-right cursor-pointer",on:{"click":function($event){return _vm.onItemSelection(item)}}})])})],2)]),_c('div',[_c('jf-drag-drop-pagination',{attrs:{"pagination-api":_vm.paginationApi}})],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfListSelectionComponent/index.vue?vue&type=template&id=d0b81578&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d225");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js
var createClass = __webpack_require__("b0b4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfListSelectionComponent/index.vue?vue&type=script&lang=js&





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
var JfListSelectionComponentvue_type_script_lang_js_PaginationApi = /*#__PURE__*/function () {
  function PaginationApi(ctrl) {
    Object(classCallCheck["a" /* default */])(this, PaginationApi);

    this.ctrl = ctrl;
  }

  Object(createClass["a" /* default */])(PaginationApi, [{
    key: "getTotalPages",
    value: function getTotalPages() {
      if (!this.ctrl.usePagination) {
        return 0;
      }

      return Math.ceil(this.ctrl.filter(this.ctrl.items, this.ctrl.filterList).length / this.ctrl.itemsPerPage);
    }
  }, {
    key: "getCurrentPage",
    value: function getCurrentPage() {
      if (this.ctrl.currentPage > this.getTotalPages()) {
        this.ctrl.currentPage = this.getTotalPages();
      }

      if (this.ctrl.currentPage < 1) {
        this.ctrl.currentPage = 1;
      }

      return this.ctrl.currentPage;
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      if (this.ctrl.currentPage < this.getTotalPages()) {
        this.ctrl.currentPage++;
      }
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      if (this.ctrl.currentPage > 1) {
        this.ctrl.currentPage--;
      }
    }
  }, {
    key: "setPage",
    value: function setPage(pageNum) {
      if (pageNum >= 1 && pageNum <= this.getTotalPages()) {
        this.ctrl.currentPage = pageNum;
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      this.ctrl.$timeout(function () {
        if (_this.getCurrentPage() > _this.getTotalPages()) {
          _this.setPage(_this.getTotalPages());
        }

        if (_this.listener) {
          _this.listener(_this.getCurrentPage());
        }
      });
    }
  }, {
    key: "registerChangeListener",
    value: function registerChangeListener(listener) {
      this.listener = listener;
    }
  }]);

  return PaginationApi;
}();

/* harmony default export */ var JfListSelectionComponentvue_type_script_lang_js_ = ({
  name: 'jf-list-selection',
  props: ['items', 'usePagination', 'highlightSelected', 'allowSingleClick'],
  'jf@inject': ['$timeout'],
  data: function data() {
    return {
      filterList: null,
      paginationApi: null,
      itemsPerPage: this.items && this.items.length || 0,
      currentPage: 1
    };
  },
  created: function created() {
    this.paginationApi = new JfListSelectionComponentvue_type_script_lang_js_PaginationApi(this);
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      if (!_this2.$element) {
        return;
      }

      var containerHeight = _this2.$element.find('.group-list-wrapper').innerHeight();

      var itemHeight = _this2.$element.find('.group-list-item').outerHeight();

      _this2.itemsPerPage = Math.floor(containerHeight / itemHeight);
    });
  },
  methods: {
    filter: function filter(originalList, filterCriteria) {
      if (filterCriteria) {
        return originalList.filter(function (item) {
          return item.name.toLowerCase().indexOf(filterCriteria) != -1;
        });
      }

      return originalList;
    },
    addToolTip: function addToolTip(item) {
      var prop = {};

      if (item.icon_tooltip) {
        prop = {
          "jf-tooltip": item.icon_tooltip
        };
      }

      return prop;
    },
    getPageItems: function getPageItems() {
      if (!this.usePagination) {
        return this.filter(this.items, this.filterList);
      }

      var start = (this.currentPage - 1) * this.itemsPerPage;
      var slice = this.filter(this.items, this.filterList).slice(start, start + this.itemsPerPage);
      return slice;
    },
    onFilterChange: function onFilterChange() {
      this.paginationApi.setPage(1);
      this.paginationApi.update();
    },
    onItemSelection: function onItemSelection(item) {
      if (this.highlightSelected && !item.highlighted) {
        var lastHiglighted = _.find(this.items, function (i) {
          return i.highlighted;
        });

        if (lastHiglighted) {
          lastHiglighted.highlighted = false;
        }

        item.highlighted = true;
      }

      this.onItemClick(item);
    },
    onItemClick: function onItemClick(item) {
      this.$emit('select', item);
      this.paginationApi.update();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfListSelectionComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfListSelectionComponentvue_type_script_lang_js_ = (JfListSelectionComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfListSelectionComponent/index.vue?vue&type=style&index=0&id=d0b81578&scoped=true&lang=less&
var JfListSelectionComponentvue_type_style_index_0_id_d0b81578_scoped_true_lang_less_ = __webpack_require__("98bb");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfListSelectionComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfListSelectionComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "d0b81578",
  null
  
)

/* harmony default export */ var JfListSelectionComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "cac9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfListSelection.js.map