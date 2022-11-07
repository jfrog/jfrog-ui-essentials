((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[48],{

/***/ "268b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "530d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTabularDndComponent/index.vue?vue&type=template&id=3d7e7e76&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-tabular-dnd",attrs:{"tabindex":"0","disabled":_vm.disabled}},[_c('div',{staticClass:"tabular-dnd-table-container available-table",class:{'no-data': !_vm.availableItems.length && (!_vm.availableItemsTableOptions || (!_vm.availableItemsTableOptions.draggedRow && !_vm.availableItemsTableOptions.draggedRows)) && !_vm.selectedItems.length && (!_vm.selectedItemsTableOptions || (!_vm.selectedItemsTableOptions.draggedRow && !_vm.selectedItemsTableOptions.draggedRows))}},[_c('jf-table-view-wrapper',{attrs:{"options":_vm.availableItemsTableOptions,"data":_vm.availableItems}})],1),_c('div',{staticClass:"dnd-actions-wrap"},[_c('ul',{staticClass:"dnd-actions"},[_c('li',[_c('span',{staticClass:"dnd-exclude-all",attrs:{"disabled":_vm.isIncludeListEmpty() || _vm.areAllRowsDisabled(_vm.selectedItemsTableOptions.getFilteredData()) || _vm.disabled},on:{"click":function($event){return _vm.excludeAll()}}},[_vm._v("«\n                ")])]),_c('li',[_c('span',{staticClass:"dnd-exclude-selected",attrs:{"disabled":!_vm.isIncludeListItemSelected() || _vm.disabled},on:{"click":function($event){return _vm.excludeSelected()}}},[_vm._v("‹\n                ")])]),_c('li',[_c('span',{staticClass:"dnd-include-selected",attrs:{"disabled":!_vm.isExcludeListItemSelected() || _vm.disabled},on:{"click":function($event){return _vm.includeSelected()}}},[_vm._v("›\n                ")])]),_c('li',[_c('span',{staticClass:"dnd-include-all",attrs:{"disabled":_vm.isExcludeListEmpty() || _vm.areAllRowsDisabled(_vm.availableItemsTableOptions.getFilteredData()) || _vm.disabled},on:{"click":function($event){return _vm.includeAll()}}},[_vm._v("»\n                ")])])])]),_c('div',{staticClass:"tabular-dnd-table-container selected-table"},[_c('jf-table-view-wrapper',{attrs:{"options":_vm.selectedItemsTableOptions,"data":_vm.selectedItems}})],1)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTabularDndComponent/index.vue?vue&type=template&id=3d7e7e76&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__("768b");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("75fc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/lodash/includes.js
var includes = __webpack_require__("8a30");
var includes_default = /*#__PURE__*/__webpack_require__.n(includes);

// EXTERNAL MODULE: ./node_modules/lodash/remove.js
var remove = __webpack_require__("c04c");
var remove_default = /*#__PURE__*/__webpack_require__.n(remove);

// EXTERNAL MODULE: ./node_modules/lodash/map.js
var map = __webpack_require__("dd61");
var map_default = /*#__PURE__*/__webpack_require__.n(map);

// EXTERNAL MODULE: ./node_modules/lodash/cloneDeep.js
var cloneDeep = __webpack_require__("0644");
var cloneDeep_default = /*#__PURE__*/__webpack_require__.n(cloneDeep);

// EXTERNAL MODULE: ./node_modules/lodash/isUndefined.js
var isUndefined = __webpack_require__("4cfe");
var isUndefined_default = /*#__PURE__*/__webpack_require__.n(isUndefined);

// EXTERNAL MODULE: ./node_modules/lodash/isString.js
var isString = __webpack_require__("e2a0");
var isString_default = /*#__PURE__*/__webpack_require__.n(isString);

// EXTERNAL MODULE: ./node_modules/lodash/isObject.js
var isObject = __webpack_require__("1a8c");
var isObject_default = /*#__PURE__*/__webpack_require__.n(isObject);

// EXTERNAL MODULE: ./node_modules/lodash/filter.js
var filter = __webpack_require__("9380");
var filter_default = /*#__PURE__*/__webpack_require__.n(filter);

// EXTERNAL MODULE: ./src/components/JfTableViewWrapper/index.vue + 4 modules
var JfTableViewWrapper = __webpack_require__("9b3d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTabularDndComponent/index.vue?vue&type=script&lang=js&





var _this = undefined;

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









/* harmony default export */ var JfTabularDndComponentvue_type_script_lang_js_ = ({
  name: 'jf-tabular-dnd',
  components: {
    JfTableViewWrapper: JfTableViewWrapper["default"]
  },
  props: ['availableItems', 'selectedItems', 'itemClassAttr', 'itemDraggableAttr', 'columns', 'numberOfRows', 'availableItemsColumns', 'selectedItemsColumns', 'entityName', 'appScope', 'disableWholeRowSelection', 'disabled'],
  'jf@inject': ['$element', '$scope', 'JFrogTableViewOptions'],
  data: function data() {
    return {
      availableItemsTableOptions: null,
      selectedItemsTableOptions: null,
      availableItemsColumnsVar: this.availableItemsColumns,
      selectedItemsColumnsVar: this.selectedItemsColumns,
      currNumberOfRows: this.numberOfRows || 8
    };
  },
  created: function created() {
    if (this.columns) {
      this.availableItemsColumnsVar = cloneDeep_default()(this.columns);
      this.selectedItemsColumnsVar = cloneDeep_default()(this.columns);
    }

    this.createTables();
  },
  watch: {
    availableItems: function availableItems(val) {
      return _this && _this.watchListChanges && _this.watchListChanges(val);
    },
    selectedItems: function selectedItems(val) {
      return _this && _this.watchListChanges && _this.watchListChanges(val);
    }
  },
  ng1_legacy: {
    'controllerAs': 'jfTabularDnD'
  },
  methods: {
    watchListChanges: function watchListChanges(val) {
      this._refreshBothTables();

      this._fireOnChange();
    },
    createAutoColumns: function createAutoColumns() {
      var _this2 = this;

      ['availableItemsColumnsVar', 'selectedItemsColumnsVar'].forEach(function (columnsArrayName) {
        var _this2$columnsArrayNa;

        var newColumnsArray = map_default()(_this2[columnsArrayName], function (column) {
          if (isObject_default()(column)) {
            return column;
          } else if (isString_default()(column)) {
            return {
              field: column
            };
          }
        }); // Replacing the content of the array without changing the reference to it, to support setting Array literals on templates.

        (_this2$columnsArrayNa = _this2[columnsArrayName]).splice.apply(_this2$columnsArrayNa, [0, _this2[columnsArrayName].length].concat(Object(toConsumableArray["a" /* default */])(newColumnsArray)));
      });
    },
    createTables: function createTables() {
      var _this3 = this;

      this.createAutoColumns();
      this.availableItemsTableOptions = new this.JFrogTableViewOptions(this.appScope || this.$scope);
      this.selectedItemsTableOptions = new this.JFrogTableViewOptions(this.appScope || this.$scope);
      var emptyPlaceholdersStyle = {
        height: 50 * this.currNumberOfRows + 'px',
        'line-height': 50 * this.currNumberOfRows + 'px'
      };

      this.availableItemsTableOptions._registerTabularDnd(this, 'available', this.selectedItemsTableOptions, emptyPlaceholdersStyle);

      this.selectedItemsTableOptions._registerTabularDnd(this, 'selected', this.availableItemsTableOptions, emptyPlaceholdersStyle);

      var _this$_getObjectNames = this._getObjectNames(),
          availableObjectName = _this$_getObjectNames.availableObjectName,
          selectedObjectName = _this$_getObjectNames.selectedObjectName;

      this.availableItemsTableOptions.setColumns(this.availableItemsColumnsVar).setSelection(this.availableItemsTableOptions.MULTI_SELECTION).setPaginationMode(this.availableItemsTableOptions.VIRTUAL_SCROLL).showPagination(false).setDraggable().setRowsPerPage(parseInt(this.currNumberOfRows)).setObjectName(availableObjectName).setRowClassAttr(this.itemClassAttr).disableFilterWhen(function () {
        return _this3.disabled;
      }).setEmptyTableText(!this.availableItems.length && !this.selectedItems.length ? 'No data found' : 'Drag row here');
      this.selectedItemsTableOptions.setColumns(this.selectedItemsColumnsVar).setSelection(this.selectedItemsTableOptions.MULTI_SELECTION).setPaginationMode(this.selectedItemsTableOptions.VIRTUAL_SCROLL).showPagination(false).setDraggable().setRowsPerPage(parseInt(this.currNumberOfRows)).setObjectName(selectedObjectName).setRowClassAttr(this.itemClassAttr).disableFilterWhen(function () {
        return _this3.disabled;
      }).setEmptyTableText('Drag row here');
      this.$set(this.selectedItemsTableOptions, 'isRowSelectable', this.$set(this.availableItemsTableOptions, 'isRowSelectable', function (row) {
        return _this3._isItemDraggable(row.entity);
      }));

      if (!this.disableWholeRowSelection) {
        var toggleSelection = function toggleSelection(row) {
          if (_this3.disabled || _this3.itemDraggableAttr && row.entity[_this3.itemDraggableAttr] === false) {
            return;
          }

          _this3.$set(row.entity, '$selected', !row.entity.$selected);
        };

        this.availableItemsTableOptions.on('row.clicked', toggleSelection);
        this.selectedItemsTableOptions.on('row.clicked', toggleSelection);
      }

      this.availableItemsTableOptions.on('row.clicked', function (row) {
        return _this3.$emit('on-row-click', {
          row: row.entity,
          list: 'available'
        });
      });
      this.selectedItemsTableOptions.on('row.clicked', function (row) {
        return _this3.$emit('on-row-click', {
          row: row.entity,
          list: 'selected'
        });
      });
      this.availableItemsTableOptions.on('selection.change', function () {
        if (_this3.disabled) {
          _this3.availableItemsTableOptions.clearSelection();
        }
      });
      this.selectedItemsTableOptions.on('selection.change', function () {
        if (_this3.disabled) {
          _this3.selectedItemsTableOptions.clearSelection();
        }
      });
      this.$scope.$watch('jfTabularDnD.disabled', function () {
        if (_this3.disabled) {
          _this3.selectedItemsTableOptions.clearSelection();

          _this3.availableItemsTableOptions.clearSelection();
        }
      });
    },
    _getObjectNames: function _getObjectNames() {
      var availableObjectName, selectedObjectName;

      if (this.entityName) {
        if (this.entityName.indexOf('/') !== -1) {
          var _this$entityName$spli = this.entityName.split('/'),
              _this$entityName$spli2 = Object(slicedToArray["a" /* default */])(_this$entityName$spli, 2),
              single = _this$entityName$spli2[0],
              plural = _this$entityName$spli2[1];

          availableObjectName = 'Available ' + single + '/' + 'Available ' + plural;
          selectedObjectName = 'Included ' + single + '/' + 'Included ' + plural;
        } else {
          availableObjectName = 'Available ' + this.entityName;
          selectedObjectName = 'Included ' + this.entityName;
        }
      } else {
        availableObjectName = 'Available Item';
        selectedObjectName = 'Included Item';
      }

      return {
        availableObjectName: availableObjectName,
        selectedObjectName: selectedObjectName
      };
    },
    areAllRowsDisabled: function areAllRowsDisabled(itemsList) {
      var _this4 = this;

      if (!this.itemDraggableAttr || !itemsList) {
        return false;
      }

      var filtered = filter_default()(itemsList, function (item) {
        return item.hasOwnProperty("".concat(_this4.itemDraggableAttr)) && item[_this4.itemDraggableAttr] === false;
      });
      return filtered.length === itemsList.length;
    },
    isIncludeListEmpty: function isIncludeListEmpty() {
      if (!this.selectedItemsTableOptions || !this.selectedItemsTableOptions.dirCtrl) {
        return true;
      }

      return !this.selectedItemsTableOptions.getFilteredData().length;
    },
    isExcludeListEmpty: function isExcludeListEmpty() {
      if (!this.availableItemsTableOptions || !this.availableItemsTableOptions.dirCtrl) {
        return true;
      }

      return !this.availableItemsTableOptions.getFilteredData().length;
    },
    isIncludeListItemSelected: function isIncludeListItemSelected() {
      if (!this.selectedItemsTableOptions || !this.selectedItemsTableOptions.dirCtrl) {
        return false;
      }

      var selected = this.selectedItemsTableOptions.getSelected();
      var filtered = this.selectedItemsTableOptions.getFilteredData();
      return !!selected.length;
      selected = filter_default()(selected, function (item) {
        return includes_default()(filtered, item);
      });
    },
    isExcludeListItemSelected: function isExcludeListItemSelected() {
      if (!this.availableItemsTableOptions || !this.availableItemsTableOptions.dirCtrl) {
        return false;
      }

      var selected = this.availableItemsTableOptions.getSelected();
      var filtered = this.availableItemsTableOptions.getFilteredData();
      selected = filter_default()(selected, function (item) {
        return includes_default()(filtered, item);
      });
      return !!selected.length;
    },
    excludeAll: function excludeAll() {
      var _this$availableItems;

      if (this.isIncludeListEmpty() || this.disabled) {
        return;
      }

      var selected = this.selectedItemsTableOptions.getSelected();
      selected.forEach(function (s) {
        return delete s.$selected;
      });
      this.$set(this.selectedItemsTableOptions.dirCtrl, 'allSelected', false);
      var filtered = this.selectedItemsTableOptions.getFilteredData();
      filtered = this._getOnlyDraggables(filtered);

      (_this$availableItems = this.availableItems).splice.apply(_this$availableItems, [this.availableItems.length, 0].concat(Object(toConsumableArray["a" /* default */])(filtered)));

      remove_default()(this.selectedItems, function (i) {
        return includes_default()(filtered, i);
      });

      this._refreshBothTables();

      this._fireOnChange();
    },
    includeAll: function includeAll() {
      var _this$selectedItems;

      if (this.isExcludeListEmpty() || this.disabled) {
        return;
      }

      var selected = this.availableItemsTableOptions.getSelected();
      selected.forEach(function (s) {
        return delete s.$selected;
      });
      this.$set(this.availableItemsTableOptions.dirCtrl, 'allSelected', false);
      var filtered = this.availableItemsTableOptions.getFilteredData();
      filtered = this._getOnlyDraggables(filtered);

      (_this$selectedItems = this.selectedItems).splice.apply(_this$selectedItems, [this.selectedItems.length, 0].concat(Object(toConsumableArray["a" /* default */])(filtered)));

      remove_default()(this.availableItems, function (i) {
        return includes_default()(filtered, i);
      });

      this._refreshBothTables();

      this._fireOnChange();
    },
    excludeSelected: function excludeSelected() {
      var _this$availableItems2;

      if (!this.isIncludeListItemSelected() || this.disabled) {
        return;
      }

      var selected = this.selectedItemsTableOptions.getSelected();
      selected.forEach(function (s) {
        return delete s.$selected;
      });
      this.$set(this.selectedItemsTableOptions.dirCtrl, 'allSelected', false);
      var filtered = this.selectedItemsTableOptions.getFilteredData();
      remove_default()(selected, function (i) {
        return !includes_default()(filtered, i);
      });
      selected = this._getOnlyDraggables(selected);

      (_this$availableItems2 = this.availableItems).splice.apply(_this$availableItems2, [this.availableItems.length, 0].concat(Object(toConsumableArray["a" /* default */])(selected)));

      remove_default()(this.selectedItems, function (item) {
        return includes_default()(selected, item);
      });

      this._refreshBothTables();

      this._fireOnChange();
    },
    includeSelected: function includeSelected() {
      var _this$selectedItems2;

      if (!this.isExcludeListItemSelected() || this.disabled) {
        return;
      }

      var selected = this.availableItemsTableOptions.getSelected();
      selected.forEach(function (s) {
        return delete s.$selected;
      });
      this.$set(this.availableItemsTableOptions.dirCtrl, 'allSelected', false);
      var filtered = this.availableItemsTableOptions.getFilteredData();
      remove_default()(selected, function (i) {
        return !includes_default()(filtered, i);
      });
      selected = this._getOnlyDraggables(selected);

      (_this$selectedItems2 = this.selectedItems).splice.apply(_this$selectedItems2, [this.selectedItems.length, 0].concat(Object(toConsumableArray["a" /* default */])(selected)));

      remove_default()(this.availableItems, function (item) {
        return includes_default()(selected, item);
      });

      this._refreshBothTables();

      this._fireOnChange();
    },
    _getOnlyDraggables: function _getOnlyDraggables(array) {
      var _this5 = this;

      if (this.itemDraggableAttr) {
        return filter_default()(array, function (item) {
          return _this5._isItemDraggable(item);
        });
      } else {
        return array;
      }
    },
    _isItemDraggable: function _isItemDraggable(item) {
      if (this.itemDraggableAttr) {
        return isUndefined_default()(item[this.itemDraggableAttr]) || item[this.itemDraggableAttr];
      } else {
        return true;
      }
    },
    _refreshBothTables: function _refreshBothTables() {
      [this.availableItemsTableOptions, this.selectedItemsTableOptions].forEach(function (tableOptions) {
        tableOptions.update();
        tableOptions.refreshFilter();
        tableOptions.dirCtrl.vsApi.refresh();
      });
    },
    onDragTransfer: function onDragTransfer(draggedRows, originTableOptions) {
      draggedRows.forEach(function (draggedRow) {
        return delete draggedRow.$selected;
      });
      originTableOptions.dirCtrl.allSelected = false;

      this._fireOnChange();
    },
    _fireOnChange: function _fireOnChange() {
      this.$emit('on-change', {
        available: this.availableItems,
        selected: this.selectedItems
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTabularDndComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTabularDndComponentvue_type_script_lang_js_ = (JfTabularDndComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTabularDndComponent/index.vue?vue&type=style&index=0&id=3d7e7e76&scoped=true&lang=less&
var JfTabularDndComponentvue_type_style_index_0_id_3d7e7e76_scoped_true_lang_less_ = __webpack_require__("92a0");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTabularDndComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTabularDndComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "3d7e7e76",
  null
  
)

/* harmony default export */ var JfTabularDndComponent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "92a0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3d7e7e76_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("268b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3d7e7e76_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3d7e7e76_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfTabularDnd.js.map