((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[34],{

/***/ "5d09":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMultiDropdownComponent/index.vue?vue&type=template&id=d5015d4e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-multi-dropdown",class:{'disabled':_vm.disabled,'with-text-inputs':_vm.textInputs,'borderless':_vm.borderless}},[(_vm.label)?_c('label',[_vm._v(_vm._s(_vm.label)+" "),(_vm.showLabelCounter && _vm.selectedItems().length)?_c('span',[_vm._v("("+_vm._s(_vm.selectedItems().length)+")")]):_vm._e()]):_vm._e(),_c('div',{staticClass:"main-box",class:{'selected-view' : _vm.selectedItems().length,
                    'no-items': !_vm.items.length && _vm.noItemsMessage,
                    'no-label': !_vm.label},on:{"click":function($event){return _vm.onClick()}}},[(_vm.showSelected && !_vm.selectedItems().length)?_c('span',[_vm._v(_vm._s(_vm.title))]):_vm._e(),(!_vm.showSelected)?_c('span',{staticClass:"title-wrapper"},[_vm._v("\n            "+_vm._s(_vm.title)+"\n            "),_c('span',{staticClass:"selected-counter"},[_vm._v("("+_vm._s(_vm.getSelectedCount())+")")])]):_vm._e(),(_vm.showSelected && _vm.selectedItems().length)?_c('span',[_vm._v("\n            "+_vm._s(_vm.getSelectedForTitle())+"\n        ")]):_vm._e(),_c('span',{staticClass:"actions"},[(_vm.showSelected && _vm.selectedItems().length)?_c('i',{staticClass:"clear-field",on:{"click":function($event){$event.stopPropagation();return _vm.unSelectAll()}}},[_vm._v("×")]):_vm._e(),_c('i',{staticClass:"icon-small-arrow-down"})])]),(_vm.opened)?_c('div',{staticClass:"drop-down-container"},[(!_vm.noFilter)?_c('div',{staticClass:"filter-container"},[_c('form',[_c('jf-field',{attrs:{"autofocus":true}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterText),expression:"filterText"}],staticClass:"input-text",attrs:{"type":"text","autocomplete":"off","name":"items-filter","placeholder":_vm.filterPlaceholder},domProps:{"value":(_vm.filterText)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filterText=$event.target.value}}})])],1)]):_vm._e(),(_vm.items.length)?_c('div',{staticClass:"list-container"},_vm._l((_vm.$filterArray(_vm.items, {text: _vm.filterText})),function(item,$index){return _c('div',{key:$index + _vm.filterText,staticClass:"drop-down-item",class:{'last-selected': $index === _vm.lastSelectedIndex && !_vm.filterText, 'disabled': item.disabled}},[(!_vm.singleSelection)?_c('label',{staticClass:"jf-checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.isSelected),expression:"item.isSelected"}],attrs:{"type":"checkbox","disabled":item.disabled},domProps:{"checked":Array.isArray(item.isSelected)?_vm._i(item.isSelected,null)>-1:(item.isSelected)},on:{"change":[function($event){var $$a=item.isSelected,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(item, "isSelected", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(item, "isSelected", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(item, "isSelected", $$c)}},function($event){return _vm.onSelection()}]}}),_c('span'),(item.iconClass)?_c('i',{staticClass:"item-icon",class:item.iconClass}):_vm._e(),_vm._v("\n                        "+_vm._s(item.text)+"\n                    ")]):_vm._e(),(_vm.singleSelection)?_c('jf-radio-button',{key:item.isSelected,attrs:{"text":item.text}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.singleSelectionIndex),expression:"singleSelectionIndex"}],attrs:{"type":"radio","disabled":item.disabled},domProps:{"value":item.$id,"checked":_vm._q(_vm.singleSelectionIndex,item.$id)},on:{"change":[function($event){_vm.singleSelectionIndex=item.$id},function($event){return _vm.onSingleSelection()}]}})]):_vm._e(),(_vm.textInputs)?_c('span',{staticClass:"text-input-wrapper"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.inputTextValue),expression:"item.inputTextValue"}],staticClass:"input-text",attrs:{"type":"text","name":"items-filter","placeholder":item.inputPlaceholder || 'Free text'},domProps:{"value":(item.inputTextValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "inputTextValue", $event.target.value)}}})]):_vm._e()],1)}),0):_vm._e(),(_vm.items.length)?_c('div',{staticClass:"batch-action-buttons"},[_c('button',{staticClass:"btn btn-default pull-right",attrs:{"type":"button"},on:{"click":function($event){return _vm.clearSelection()}}},[_vm._v("\n                    "+_vm._s(_vm.singleSelection ? 'Clear selection' : 'Clear All')+"\n                ")]),(!_vm.singleSelection)?_c('button',{staticClass:"btn btn-default pull-right",attrs:{"type":"button"},on:{"click":function($event){return _vm.selectAll()}}},[_vm._v("\n                    Select All\n                ")]):_vm._e()]):_vm._e(),(!_vm.items.length && _vm.noItemsMessage)?_c('div',{staticClass:"list-container"},[_c('div',{staticClass:"no-items-message"},[_vm._v("\n                    "+_vm._s(_vm.noItemsMessage)+"\n                ")])]):_vm._e()]):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfMultiDropdownComponent/index.vue?vue&type=template&id=d5015d4e&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/lodash/sortBy.js
var sortBy = __webpack_require__("c707");
var sortBy_default = /*#__PURE__*/__webpack_require__.n(sortBy);

// EXTERNAL MODULE: ./node_modules/lodash/map.js
var map = __webpack_require__("dd61");
var map_default = /*#__PURE__*/__webpack_require__.n(map);

// EXTERNAL MODULE: ./node_modules/lodash/forEach.js
var forEach = __webpack_require__("6cd4");
var forEach_default = /*#__PURE__*/__webpack_require__.n(forEach);

// EXTERNAL MODULE: ./node_modules/lodash/filter.js
var filter = __webpack_require__("9380");
var filter_default = /*#__PURE__*/__webpack_require__.n(filter);

// EXTERNAL MODULE: ./node_modules/lodash/find.js
var find = __webpack_require__("2769");
var find_default = /*#__PURE__*/__webpack_require__.n(find);

// EXTERNAL MODULE: ./src/services/VueFactory.js
var VueFactory = __webpack_require__("e1f3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfMultiDropdownComponent/index.vue?vue&type=script&lang=js&


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






/* harmony default export */ var JfMultiDropdownComponentvue_type_script_lang_js_ = ({
  name: 'jf-multi-dropdown',
  props: ['title', 'label', 'filterPlaceholder', 'noItemsMessage', 'items', 'disabled', 'noSort', 'dropdownOpened', 'showSelected', 'showLabelCounter', 'noFilter', 'noSelectedFirst', 'singleSelection', 'textInputs', 'borderless'],
  'jf@inject': ['$scope', '$filter', '$element'],
  data: function data() {
    return {
      opened: null,
      filterText: null,
      lastSelectedIndex: null,
      singleSelectionIndex: -1
    };
  },
  created: function created() {
    var _this = this;

    this.filter = this.$filterArray;
    this.opened = false;
    this.$scope.$watch('jfMultiDropdown.items', function (newVal, oldVal) {
      if (newVal) {
        //this.sortItems();
        if (_this.singleSelection) {
          _this.items.forEach(function (item, index) {
            return item.$id = index;
          });

          var disabled = filter_default()(_this.items, function (item) {
            return item.disabled;
          });
          disabled.forEach(function (item) {
            return item.isSelected = false;
          });
          var selected = filter_default()(_this.items, function (item) {
            return item.isSelected;
          });

          if (selected.length > 1) {
            selected.slice(1).forEach(function (item) {
              return item.isSelected = false;
            });
          }

          if (selected.length) {
            _this.singleSelectionIndex = selected[0].$id;
          }
        }
      }
    });
    this.$scope.$watch('jfMultiDropdown.dropdownOpened', function (val) {
      if (val === true) {
        if (!_this.items) {
          return;
        }

        _this.opened = true;
        _this.filterText = '';
      } else if (val === false) {
        _this.opened = false;
        _this.filterText = '';
      } else {}
    });
  },
  mounted: function mounted() {
    this.handleOutsideClick();
  },
  ng1_legacy: {
    'controllerAs': 'jfMultiDropdown'
  },
  methods: {
    sendOpenStateChange: function sendOpenStateChange() {
      this.$emit('on-open-state-change', {
        opened: this.opened
      });

      if (!this.opened && !this.singleSelection) {//                    this.sortItems();
      }
    },
    handleOutsideClick: function handleOutsideClick() {
      var _this2 = this;

      var handler = function handler(e) {
        var outside = !$(e.target).parents('.jf-multi-dropdown').length || $(e.target).parents('.jf-multi-dropdown')[0] !== $(_this2.$element).find('.jf-multi-dropdown')[0];

        if (outside) {
          var changed = !!_this2.opened;
          _this2.opened = false;

          if (changed) {
            _this2.sendOpenStateChange();
          }
        }
      };

      $(document).on('click', handler);
      this.$scope.$on('$destroy', function () {
        $(document).off('click', handler);
      });
    },
    getSelectedForTitle: function getSelectedForTitle() {
      var selected = filter_default()(this.items, function (item) {
        return item.isSelected;
      });
      selected = map_default()(selected, function (s) {
        return s.selectedText || s.text;
      });
      return selected.join(', ');
    },
    onClick: function onClick() {
      if (this.disabled !== true) {
        if (!this.items) {
          return;
        }

        this.opened = !this.opened;
        this.sendOpenStateChange();
        this.filterText = '';
      }
    },
    onSingleSelection: function onSingleSelection() {
      var _this3 = this;

      var _VueFactory$getInstan = VueFactory["a" /* VueFactory */].getInstance(),
          Vue = _VueFactory$getInstan.Vue;

      Vue.nextTick(function () {
        _this3.items.forEach(function (item, index) {
          if (!item.disabled) {
            item.isSelected = false;
          }
        });

        var selected = find_default()(_this3.items, function (item) {
          return item.$id == _this3.singleSelectionIndex;
        });
        selected.isSelected = true;

        _this3.applyChanges();
      });
    },
    getSelectedCount: function getSelectedCount() {
      var selected = filter_default()(this.items, function (item) {
        return item.isSelected && !item.isAllToggleCheckbox;
      });
      return selected.length;
    },
    applyChanges: function applyChanges() {
      var _this4 = this;

      var _VueFactory$getInstan2 = VueFactory["a" /* VueFactory */].getInstance(),
          Vue = _VueFactory$getInstan2.Vue;

      Vue.nextTick(function () {
        var selected = filter_default()(_this4.items, function (item) {
          return item.isSelected;
        });

        _this4.$emit('on-change', selected);

        _this4.$forceUpdate();
      });
    },
    selectedItems: function selectedItems() {
      var selected = filter_default()(this.items, function (item) {
        return item.isSelected;
      });
      selected = map_default()(selected, 'text');
      return selected;
    },
    sortItems: function sortItems() {
      if (this.opened) return;

      if (this.noSelectedFirst) {
        return;
      }

      if (!this.items) {
        return;
      }

      var selected = this.noSort ? filter_default()(this.items, function (item) {
        return item.isSelected;
      }) : sortBy_default()(filter_default()(this.items, function (item) {
        return item.isSelected;
      }), 'text');
      var unSelected = this.noSort ? filter_default()(this.items, function (item) {
        return !item.isSelected;
      }) : sortBy_default()(filter_default()(this.items, function (item) {
        return !item.isSelected;
      }), 'text');
      this.lastSelectedIndex = selected.length - 1;
      var combined = selected.concat(unSelected);
      this.items.splice.apply(this.items, [0, this.items.length].concat(combined));
    },
    selectAll: function selectAll() {
      if (this.disabled) return;
      this.filter(this.items, this.filterText).forEach(function (item) {
        if (!item.disabled) {
          item.isSelected = true;
        }
      });
      this.applyChanges();
    },
    unSelectAll: function unSelectAll() {
      if (this.disabled) return;
      this.filter(this.items, this.filterText).forEach(function (item) {
        if (!item.disabled) {
          item.isSelected = false;
        }
      });
      this.applyChanges();
      this.singleSelectionIndex = -1;
    },
    onSelection: function onSelection() {
      this.applyChanges();
    },
    clearSelection: function clearSelection() {
      if (this.disabled) return;

      if (this.textInputs) {
        forEach_default()(this.items, function (item) {
          item.inputTextValue = '';
        });
      }

      this.unSelectAll();
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfMultiDropdownComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfMultiDropdownComponentvue_type_script_lang_js_ = (JfMultiDropdownComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfMultiDropdownComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfMultiDropdownComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "d5015d4e",
  null
  
)

/* harmony default export */ var JfMultiDropdownComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfMultiDropdown.js.map