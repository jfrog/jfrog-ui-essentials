((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[55],{

/***/ "b3df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("75fc");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfUiSelectComponent/index.vue?vue&type=script&lang=js&

var TEMPLATE = "\n   <div>\n\n       <multi-select @open=\"opened\" :options-limit=\"loadChunks\" :internal-search=\"false\" @search-change=\"onSearch\" :allow-empty=\"false\" :disabled=\"jfSelectDisabled\" :close-on-select=\"!jfSelectMultiple\" :multiple=\"jfSelectMultiple\" @input=\"onInputChange\" :value=\"value\" :options=\"manipulatedList\" :searchable=\"true\" :show-labels=\"false\" :placeholder=\"jfSelectPlaceholder\" :track-by=\"displayAttr\" :label=\"displayAttr\">\n\n      <template slot=\"singleLabel\" slot-scope=\"props\">\n\n    <jf-marquee>\n     <div class=\"option__desc\"><span class=\"option__title\">  <i  v-if=\"props.option.icon\" class=\"icon option__icon\" :class=\"props.option.icon\"></i>{{ displayAttr ? setSelectText(props.option[displayAttr]) : setSelectText(props.option) }}</span></div>\n\n   </jf-marquee>\n   </template>\n\n     <template slot=\"option\" slot-scope=\"props\">\n     <div class=\"option__desc\"><span class=\"option__title\"><i  v-if=\"props.option.icon\" class=\"icon option__icon\" :class=\"props.option.icon\"></i>{{ displayAttr ? setSelectText(props.option[displayAttr]) : setSelectText(props.option)  }} <jf-help-tooltip :html=\"jfSelectHelpTooltips(props.option)\" v-if=\"jfSelectHelpTooltips\"></jf-help-tooltip></span></div>\n   </template>\n\n    <template v-if=\"jfSelectLoadChunks && jfSelectLoadChunks < manipulatedList.length\" slot=\"afterList\" slot-scope=\"props\">\n<div class=\"option__desc\"><span @click=\"increaseLimit\" :class=\"{'disabled':exccededLimit}\" class=\"option__title load-more\">  {{jfSelectLoadMoreLabel || 'Load More'}} <div class=\"multiselect__spinner\" style=\"display:none;\"></div> </span> </div>\n   </template>\n\n    </multi-select>\n\n   </div>";
/* harmony default export */ var JfUiSelectComponentvue_type_script_lang_js_ = ({
  template: TEMPLATE,
  name: 'jf-ui-select',
  props: ['jfSelectOptions', 'jfSelectDisplayFunc', 'jfSelectDisabled', 'jfSelectDisableMarquee', 'jfSelectMultiple', 'jfSelectDisplayAttr', 'jfSelectFilterAttr', 'jfSelectPlaceholder', 'jfSelectLoadChunks', 'jfSelectLoadMoreLabel', 'jfSelectHelpTooltips', 'value'],
  watch: {
    jfSelectOptions: function jfSelectOptions() {
      this.manipulatedList = _.cloneDeep(this.jfSelectOptions);
    }
  },
  data: function data() {
    return {
      manipulatedList: _.cloneDeep(this.jfSelectOptions),
      jfSelectOptionsView: null,
      exccededLimit: null,
      loadChunks: this.jfSelectLoadChunks
    };
  },
  computed: {},
  beforeMount: function beforeMount() {
    parseInt(this.jfSelectLoadChunks);
    this.displayAttr = this.jfSelectDisplayAttr || null;
  },
  mounted: function mounted() {
    var _this = this;

    if (this.jfSelectLoadChunks) {
      this.originalLoadChunks = this.jfSelectLoadChunks;
    }

    this.displayLabel = function (item) {
      if (item === null || item === undefined) return null;
      if (_this.isMorePlaceholder(item)) return _this.jfSelectLoadMoreLabel || 'More Options...';
      if (item[_this.jfSelectDisabled]) return null;
      return _this.$emit('jf-select-display-func', {
        $item: item
      });
    };

    if (this.jfSelectLoadChunks === undefined) {} else if (this.jfSelectLoadChunks === '') {
      this.chunkSize = 10;
      this.jfSelectOptionsView = [];
    } else {
      this.chunkSize = parseInt(this.jfSelectLoadChunks) < 4 ? 4 : parseInt(this.jfSelectLoadChunks);
      this.jfSelectOptionsView = [];
    }
  },
  ng1_legacy: {
    'controllerAs': 'jfUiSelect'
  },
  methods: {
    opened: function opened() {
      console.log("checking if excceded limit");

      if (this.jfSelectLoadChunks && this.loadChunks < this.jfSelectOptions.length) {
        this.exccededLimit = false;
      }
    },
    increaseLimit: function increaseLimit() {
      if (!this.exccededLimit) {
        this.loadChunks += this.originalLoadChunks;

        if (this.loadChunks >= this.jfSelectOptions.length) {
          this.exccededLimit = true;
        }
      }
    },
    onSearch: function onSearch(searchQ, id) {
      var _this$manipulatedList,
          _this2 = this;

      this.manipulatedList.splice(0, this.manipulatedList.length);

      (_this$manipulatedList = this.manipulatedList).push.apply(_this$manipulatedList, Object(toConsumableArray["a" /* default */])(_.filter(this.jfSelectOptions, function (o) {
        if (_.isObject(o)) {
          return o[_this2.displayAttr].toLowerCase().indexOf(searchQ.toLowerCase()) > -1;
        } else {
          return o.toLowerCase().indexOf(searchQ.toLowerCase()) > -1;
        }
      })));
    },
    setSelectText: function setSelectText(text) {
      if (this.jfSelectDisplayFunc) {
        return this.jfSelectDisplayFunc(text);
      } else {
        return text;
      }
    },
    onInputChange: function onInputChange(val) {
      this.$emit('jf-select-change');
      this.$emit('input', val);
    },
    onSelect: function onSelect($item, $model) {
      this.$emit('jf-select-change');
      if (this.jfSelectOptionsView) this.jfSelectOptionsView = [];
    },
    onClick: function onClick(item, $event) {
      if (this.jfSelectOptionsView && this.isMorePlaceholder(item)) {
        var newLoads = this[this.filtered ? 'filtered' : 'jfSelectOptions'].slice(this.loaded, this.loaded + this.chunkSize);
        this.jfSelectOptionsView = this.jfSelectOptionsView.slice(0, this.loaded).concat(newLoads);

        if (this[this.filtered ? 'filtered' : 'jfSelectOptions'].length > this.jfSelectOptionsView.length) {
          this.jfSelectOptionsView.push(this.createMorePlaceholder());
        }

        this.loaded += this.chunkSize;
        $event.preventDefault();
        $event.stopPropagation();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfUiSelectComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfUiSelectComponentvue_type_script_lang_js_ = (JfUiSelectComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfUiSelectComponent/index.vue?vue&type=style&index=0&id=e682a796&scoped=true&lang=less&
var JfUiSelectComponentvue_type_style_index_0_id_e682a796_scoped_true_lang_less_ = __webpack_require__("d1e7");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfUiSelectComponent/index.vue
var render, staticRenderFns





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfUiSelectComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "e682a796",
  null
  
)

/* harmony default export */ var JfUiSelectComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "d1e7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e682a796_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d7ab");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e682a796_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e682a796_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "d7ab":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfUiSelect.js.map