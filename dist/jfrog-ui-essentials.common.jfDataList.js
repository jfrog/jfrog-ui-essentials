((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[14],{

/***/ "37db":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3eea":
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__("7948"),
    baseClone = __webpack_require__("3818"),
    baseUnset = __webpack_require__("4bb5"),
    castPath = __webpack_require__("e2e4"),
    copyObject = __webpack_require__("8eeb"),
    customOmitClone = __webpack_require__("e0e7"),
    flatRest = __webpack_require__("c6cf"),
    getAllKeysIn = __webpack_require__("1bac");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function(path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});

module.exports = omit;


/***/ }),

/***/ "405d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4863":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_c2ccc300_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("405d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_c2ccc300_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_c2ccc300_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "c4c9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDataListComponent/index.vue?vue&type=template&id=c2ccc300&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('table',{staticClass:"data-list"},[_c('tbody',_vm._l((_vm.formattedItems),function(item,index){return _c('tr',{key:index,staticClass:"data-list-item"},[(!item.hideLabel)?_c('td',{staticClass:"data-list-item-label"},[_vm._v(_vm._s(item.label)+":")]):_vm._e(),_c('td',{staticClass:"data-list-item-value"},[_c('jf-datalist-item-component',{attrs:{"item":item,"index":index},on:{"item-updated":_vm.updateList}})],1)])}),0)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDataListComponent/index.vue?vue&type=template&id=c2ccc300&scoped=true&

// EXTERNAL MODULE: ./node_modules/lodash/filter.js
var filter = __webpack_require__("9380");
var filter_default = /*#__PURE__*/__webpack_require__.n(filter);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue?vue&type=template&id=fb077ad0&
var JfDatalistItemComponentvue_type_template_id_fb077ad0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"templateValue",staticClass:"value"},[(_vm.itemIsLink)?_c('a',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],staticClass:"jf-link",attrs:{"href":_vm.viewItem.url ? _vm.viewItem.url : _vm.viewItem.value,"target":"_blank","rel":"noopener noreferrer"},domProps:{"innerHTML":_vm._s(_vm.viewItem.value)}}):_vm._e(),(_vm.itemIsLinkWithUrl || _vm.itemIsPlainText)?_c('div',{directives:[{name:"jf-tooltip-on-overflow",rawName:"v-jf-tooltip-on-overflow"}],domProps:{"innerHTML":_vm._s(_vm.viewItem.value)}}):_vm._e(),(_vm.itemIsTagsArray)?_c('div',{attrs:{"id":'data-list-row-' + _vm.index}},[_vm._l((_vm.viewItem.value),function(tag,index2){return _c('div',{key:index2,staticClass:"tag"},[(tag.url)?_c('a',{staticClass:"gridcell-content-text jf-link",attrs:{"href":tag.url,"target":"_blank","rel":"noopener noreferrer"},domProps:{"innerHTML":_vm._s(tag.label)}}):_vm._e(),(!tag.url)?_c('span',{staticClass:"gridcell-content-text",domProps:{"innerHTML":_vm._s(tag.label)}}):_vm._e(),(_vm.viewItem.delete)?_c('i',{staticClass:"icon icon-close delete-tag",on:{"click":function($event){return _vm.deleteTag(tag)}}}):_vm._e()])}),(_vm.showAllValue)?_c('a',{staticClass:"jf-link gridcell-showall",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.showAll(_vm.viewItem.value,_vm.viewItem.label,_vm.viewItem.objectName)}}},[_vm._v("(See "+_vm._s(_vm.viewItem.value.length > 1 ? 'All' : 'List')+")")]):_vm._e()],2):_vm._e(),(_vm.viewItem.copy && !_vm.isArray(_vm.viewItem.value))?_c('div',{staticClass:"copy"},[_c('jf-clip-copy',{attrs:{"text-to-copy":_vm.viewItem.value}})],1):_vm._e()])}
var JfDatalistItemComponentvue_type_template_id_fb077ad0_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue?vue&type=template&id=fb077ad0&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("bd86");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("75fc");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("7618");

// EXTERNAL MODULE: ./node_modules/lodash/omit.js
var omit = __webpack_require__("3eea");
var omit_default = /*#__PURE__*/__webpack_require__.n(omit);

// EXTERNAL MODULE: ./node_modules/lodash/extend.js
var extend = __webpack_require__("cdd8");
var extend_default = /*#__PURE__*/__webpack_require__.n(extend);

// EXTERNAL MODULE: ./src/components/JfDataListModal/index.js
var JfDataListModal = __webpack_require__("72d8");

// EXTERNAL MODULE: ./src/services/VueFactory.js
var VueFactory = __webpack_require__("e1f3");

// EXTERNAL MODULE: ./src/mixins/Sanitize/index.js
var Sanitize = __webpack_require__("0b04");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue?vue&type=script&lang=js&








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






/* harmony default export */ var JfDatalistItemComponentvue_type_script_lang_js_ = ({
  name: 'jf-datalist-item-component',
  props: ['item', 'index'],
  'jf@inject': ['JFrogModal', 'JFrogUIUtils', 'JFrogUILibConfig'],
  mixins: [Sanitize["a" /* default */]],
  data: function data() {
    return {
      showAllValue: false
    };
  },
  mounted: function mounted() {
    this.showAllValue = this.viewItem.value.length >= 1 ? this.htmlIsOverflowing('#data-list-row-' + this.index) : false;

    if (this.showAllValue) {
      this.$forceUpdate;
    }

    this.createTemplate();
  },
  updated: function updated() {
    this.createTemplate();
  },
  methods: {
    deleteTag: function deleteTag(tag) {
      /*
          Invoked when user deletes a value in a data list item
          Updates the value object by removing the entry for the item
          Emits event with the updated data list item object and the index in the data list
      */
      this.item.value = filter_default()(this.item.value, function (valueItem) {
        return valueItem.label !== tag.label;
      });
      this.$emit('item-updated', {
        index: this.index,
        item: this.item
      });
    },
    htmlIsOverflowing: function htmlIsOverflowing(rowId) {
      if (!this.$el) return false;
      var elem = $(rowId);
      var children = elem.children('.tag');
      var maxWidth = elem.closest('.data-list-item-value').outerWidth() - 60;
      var totalChildrenWidth = 0;
      children.each(function (i, child) {
        var childElem = $(child);
        totalChildrenWidth += childElem.outerWidth() + parseInt(childElem.css('margin-left')) + parseInt(childElem.css('margin-right'));

        if (totalChildrenWidth < maxWidth) {
          childElem.removeClass('overflowing-child');
        }

        if (totalChildrenWidth > maxWidth && !childElem.is('.overflowing-child')) {
          childElem.addClass('overflowing-child');
        }
      });
      return elem.children('.tag.overflowing-child').length > 0;
    },
    showAll: function showAll(model, rowName, objectName) {
      var modalScope = {
        items: model,
        rowName: rowName,
        colName: '',
        objectName: objectName,
        filter: {}
      };
      this.JFrogModal.launchModal(JfDataListModal["a" /* JfDataListModal */], modalScope, 'sm', true, {
        dontRejectOnClose: true,
        class: "show-all-modal"
      });
    },
    isArray: function isArray(o) {
      return Array.isArray(o);
    },
    getItemValue: function getItemValue(value) {
      return value || '&nbsp';
    },
    createTemplate: function createTemplate() {
      var item = this.viewItem;

      if (!item.template) {
        return;
      }

      var mixin = Object(esm_typeof["a" /* default */])(item.template) === 'object' ? item.template : !this.isHtml(item.template) ? this.JFrogUILibConfig.getConfig().customModalTemplates[item.template] : {
        template: item.template
      };
      var template = "".concat(mixin.template);

      var _VueFactory$getInstan = VueFactory["a" /* VueFactory */].getInstance(),
          Vue = _VueFactory$getInstan.Vue;

      var ComponentClass = Vue.extend({
        name: 'template-component',
        template: template,
        mixins: [mixin],
        props: ['item'].concat(Object(toConsumableArray["a" /* default */])(Object.keys(item.scope || {})))
      });
      var component = new ComponentClass({
        propsData: extend_default()({
          item: omit_default()(item, ['scope'])
        }, item.scope)
      });
      component.$mount();
      this.$refs.templateValue.append(component.$el);
    },
    isHtml: function isHtml(value) {
      return /<[a-z/][\s\S]*>/i.test(value);
    }
  },
  computed: {
    itemIsPlainText: function itemIsPlainText() {
      var _this$item = this.item,
          value = _this$item.value,
          isUrl = _this$item.isUrl,
          template = _this$item.template;
      return !isUrl && !this.isArray(value) && !template;
    },
    itemIsLink: function itemIsLink() {
      var _this$item2 = this.item,
          value = _this$item2.value,
          isUrl = _this$item2.isUrl,
          template = _this$item2.template;
      return value && !this.isArray(value) && isUrl && !template;
    },
    itemIsLinkWithUrl: function itemIsLinkWithUrl() {
      var _this$item3 = this.item,
          value = _this$item3.value,
          isUrl = _this$item3.isUrl,
          url = _this$item3.url;
      return isUrl && url != undefined && !url.length || !value;
    },
    itemIsTagsArray: function itemIsTagsArray() {
      var _this$item4 = this.item,
          value = _this$item4.value,
          template = _this$item4.template;
      return this.isArray(value) && !template;
    },
    viewItem: function viewItem() {
      var _this = this;

      var res = _objectSpread({}, this.item);

      var value = this.item.value;

      if (this.itemIsLink) {
        res.value = this.$sanitize(value);
      }

      if (this.itemIsLinkWithUrl || this.itemIsPlainText) {
        res.value = this.$sanitize(value) || '&nbsp';
      }

      if (this.itemIsTagsArray) {
        res.value = value.map(function (tag) {
          return _objectSpread(_objectSpread({}, tag), {}, {
            label: _this.$sanitize(tag.label)
          });
        });
      }

      return res;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var JfDataListComponent_JfDatalistItemComponentvue_type_script_lang_js_ = (JfDatalistItemComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue?vue&type=style&index=0&lang=less&
var JfDatalistItemComponentvue_type_style_index_0_lang_less_ = __webpack_require__("eeec");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfDataListComponent/JfDatalistItemComponent/index.vue






/* normalize component */

var JfDatalistItemComponent_component = Object(componentNormalizer["a" /* default */])(
  JfDataListComponent_JfDatalistItemComponentvue_type_script_lang_js_,
  JfDatalistItemComponentvue_type_template_id_fb077ad0_render,
  JfDatalistItemComponentvue_type_template_id_fb077ad0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var JfDatalistItemComponent = (JfDatalistItemComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDataListComponent/index.vue?vue&type=script&lang=js&
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


/* harmony default export */ var JfDataListComponentvue_type_script_lang_js_ = ({
  name: 'jf-data-list',
  props: ['items'],
  components: {
    JfDatalistItemComponent: JfDatalistItemComponent
  },
  data: function data() {
    return {
      formattedItems: [],
      isMounted: false
    };
  },
  watch: {
    items: function items(newVal) {
      this.filterItems(newVal);
    }
  },
  mounted: function mounted() {
    this.$forceUpdate();
    this.isMounted = true;
    this.filterItems(this.items);
  },
  ng1_legacy: {
    'controllerAs': 'jfDataList'
  },
  methods: {
    filterItems: function filterItems(items) {
      if (items) {
        this.formattedItems = filter_default()(items, function (item) {
          return item.label != '' && !item.isHidden;
        });
      }
    },
    updateList: function updateList(updatedItem) {
      /*
          Invoked when a value in the data list is deleted
          Updates the "items" array with the received data list item
          Emits event with the updated data list
      */
      this.items.splice(updatedItem.index, 1, updatedItem.item);
      this.$emit("data-list-updated", this.items);
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDataListComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDataListComponentvue_type_script_lang_js_ = (JfDataListComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfDataListComponent/index.vue?vue&type=style&index=0&id=c2ccc300&scoped=true&lang=less&
var JfDataListComponentvue_type_style_index_0_id_c2ccc300_scoped_true_lang_less_ = __webpack_require__("4863");

// CONCATENATED MODULE: ./src/components/JfDataListComponent/index.vue






/* normalize component */

var JfDataListComponent_component = Object(componentNormalizer["a" /* default */])(
  components_JfDataListComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "c2ccc300",
  null
  
)

/* harmony default export */ var JfDataListComponent = __webpack_exports__["default"] = (JfDataListComponent_component.exports);

/***/ }),

/***/ "e0e7":
/***/ (function(module, exports, __webpack_require__) {

var isPlainObject = __webpack_require__("60ed");

/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone(value) {
  return isPlainObject(value) ? undefined : value;
}

module.exports = customOmitClone;


/***/ }),

/***/ "eeec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("37db");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfDataList.js.map