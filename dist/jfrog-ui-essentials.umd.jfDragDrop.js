((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[17],{

/***/ "a856":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragDropComponent/index.vue?vue&type=template&id=e4050446&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"dnd-panel",attrs:{"tabindex":"0"},on:{"keydown":function($event){return _vm.onKeyDown($event)}}},[_c('div',{staticClass:"row dnd-filter-wrapper"},[_c('div',{staticClass:"col-lg-5 col-md-5 col-sm-5"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterExcludeList),expression:"filterExcludeList"}],staticClass:"input-text dnd-filter",style:({color:_vm.noMatches ? 'red' : 'black'}),attrs:{"type":"text","ng-model-options":"{debounce: 200}","placeholder":"Filter...","disabled":_vm.disabled},domProps:{"value":(_vm.filterExcludeList)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.filterExcludeList=$event.target.value},function($event){return _vm.updateExcludeFilter(true)}]}})]),_c('div',{staticClass:"col-lg-2 col-md-2 col-sm-2"}),_c('div',{staticClass:"col-lg-5 col-md-5 col-sm-5"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterIncludeList),expression:"filterIncludeList"}],staticClass:"input-text dnd-filter",style:({color:_vm.noIncludeMatches ? 'red' : 'black'}),attrs:{"type":"text","ng-model-options":"{debounce: 200}","placeholder":"Filter...","disabled":_vm.disabled},domProps:{"value":(_vm.filterIncludeList)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.filterIncludeList=$event.target.value},function($event){return _vm.updateIncludeFilter(true)}]}})])]),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-lg-5 col-md-5 col-sm-5"},[(_vm.headers.leftTitle)?_c('h5',{staticClass:"text-primary"},[_vm._v("\n                    "+_vm._s(_vm.headers.leftTitle)+"\n                ")]):_vm._e(),_c('div',{staticClass:"dnd-list-wrapper",attrs:{"id":_vm.excludeListId},on:{"mouseenter":function($event){return _vm.mouseIsInExclude(true)},"mouseleave":function($event){return _vm.mouseIsInExclude(false)}}},[_c('ul',{staticClass:"dnd-list"},_vm._l((_vm.getViewableExcludes()),function(item,$index){return _c('li',{staticClass:"drag-item",class:{'drag-placeholder':item===_vm.PLACEHOLDER, 'active' : _vm.isSelected(item)},attrs:{"data-index":'exc-' + $index},on:{"click":function($event){return _vm.toggleSelection(item)},"dblclick":function($event){return _vm.includeSpecific(item)},"mouseenter":function($event){return _vm.mouseOver(item)},"mouseleave":function($event){return _vm.mouseOver(null)}}},[(item !== _vm.PLACEHOLDER && !_vm.customTemplate)?_c('div',{staticClass:"drag-item-text"},[(item._iconClass)?_c('i',{class:item._iconClass}):_vm._e(),_vm._v("\n                                "+_vm._s(_vm.excludeDisplayField && item[_vm.excludeDisplayField] ? item[_vm.excludeDisplayField] : item)+"\n                            ")]):_vm._e(),(item !== _vm.PLACEHOLDER && _vm.customTemplate)?_c('div',{staticClass:"drag-item-text"},[(item._iconClass)?_c('i',{class:item._iconClass}):_vm._e(),(_vm.customTemplate)?_c('div',{directives:[{name:"init",rawName:"v-init",value:(_vm.compileCustomTemplate(item,'exc')),expression:"compileCustomTemplate(item,'exc')"}],staticClass:"custom-template"}):_vm._e()]):_vm._e(),(item === _vm.PLACEHOLDER)?_c('div',{staticClass:"drag-item-text"}):_vm._e()])}),0)]),_c('jf-drag-drop-pagination',{attrs:{"pagination-api":_vm.excludesPaginationApi}})],1),_c('div',{staticClass:"col-lg-2 col-md-2 col-sm-2"},[(_vm.headers.leftTitle || _vm.headers.rightTitle)?_c('h5',{staticClass:"text-primary"},[_vm._v(" ")]):_vm._e(),_c('ul',{staticClass:"dnd-actions"},[_c('li',[_c('span',{attrs:{"disabled":_vm.isIncludeListEmpty() || _vm.isIncludeListFixed() || _vm.disabled},on:{"click":function($event){return _vm.excludeAll()}}},[_vm._v("«\n                    ")])]),_c('li',[_c('span',{attrs:{"disabled":!_vm.isIncludeListItemSelected() || _vm.disabled},on:{"click":function($event){return _vm.excludeSelected()}}},[_vm._v("‹\n                    ")])]),_c('li',[_c('span',{attrs:{"disabled":!_vm.isExcludeListItemSelected() || _vm.disabled},on:{"click":function($event){return _vm.includeSelected()}}},[_vm._v("›\n                    ")])]),_c('li',[_c('span',{attrs:{"disabled":_vm.isExcludeListEmpty() || _vm.disabled},on:{"click":function($event){return _vm.includeAll()}}},[_vm._v("»\n                    ")])])])]),_c('div',{staticClass:"col-lg-5 col-md-5 col-sm-5"},[(_vm.headers.rightTitle)?_c('h5',{staticClass:"text-primary"},[_vm._v(_vm._s(_vm.headers.rightTitle)+"\n                ")]):_vm._e(),_c('div',{staticClass:"dnd-list-wrapper",attrs:{"id":_vm.includeListId},on:{"mouseenter":function($event){return _vm.mouseIsInInclude(true)},"mouseleave":function($event){return _vm.mouseIsInInclude(false)}}},[_c('ul',{staticClass:"dnd-list dnd-list-fullheight"},_vm._l((_vm.getViewableIncludes()),function(item,$index){return _c('li',{staticClass:"drag-item dropped-item",class:{'drag-placeholder':item===_vm.PLACEHOLDER, 'active' : _vm.isSelected(item)},attrs:{"data-index":'inc-' + $index},on:{"click":function($event){!$event.defaultPrevented ? (_vm.toggleSelection(item)) : ''},"dblclick":function($event){return _vm.excludeSpecific(item)},"mouseenter":function($event){return _vm.mouseOver(item)},"mouseleave":function($event){return _vm.mouseOver(null)}}},[(item !== _vm.PLACEHOLDER && !_vm.customTemplate)?_c('div',{staticClass:"drag-item-text"},[(item._iconClass)?_c('i',{class:item._iconClass}):_vm._e(),_vm._v("\n                                "+_vm._s(_vm.includeDisplayField && item[_vm.includeDisplayField] ? item[_vm.includeDisplayField] : item)+"\n                            ")]):_vm._e(),(item !== _vm.PLACEHOLDER && _vm.customTemplate)?_c('div',{staticClass:"drag-item-text"},[(item._iconClass)?_c('i',{class:item._iconClass}):_vm._e(),(_vm.customTemplate)?_c('div',{directives:[{name:"init",rawName:"v-init",value:(_vm.compileCustomTemplate(item,'inc')),expression:"compileCustomTemplate(item,'inc')"}],staticClass:"custom-template"}):_vm._e()]):_vm._e(),(item === _vm.PLACEHOLDER)?_c('div',{staticClass:"drag-item-text"}):_vm._e(),(item && item !== _vm.PLACEHOLDER && !item['__fixed__'] && !_vm.disabled)?_c('a',{staticClass:"delete-drop-item",attrs:{"href":""},on:{"click":function($event){$event.preventDefault();_vm.excludeSpecific(item);$event.stopPropagation();$event.preventDefault();}}},[_vm._v("✕")]):_vm._e()])}),0)]),_c('jf-drag-drop-pagination',{attrs:{"pagination-api":_vm.includesPaginationApi}})],1)]),_c('div',{staticClass:"clearfix"})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfDragDropComponent/index.vue?vue&type=template&id=e4050446&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__("3b2b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfDragDropComponent/index.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfDragDropComponentvue_type_script_lang_js_ = ({
  name: 'jf-drag-drop',
  props: ['includeList', 'excludeList', 'includeDisplayField', 'excludeDisplayField', 'includeListId', 'excludeListId', 'objectsName', 'headers', 'customTemplate', 'customTemplateScope', 'usePagination', 'commObject', 'disabled'],
  'jf@inject': ['$attrs', '$interval', '$element', '$scope', '$timeout', '$compile'],
  data: function data() {
    return {
      noMatches: null,
      filterExcludeList: null,
      noIncludeMatches: null,
      filterIncludeList: null,
      PLACEHOLDER: {
        '@@@DNDPH@@@': '@@@DNDPH@@@'
      },
      excludesPaginationApi: null,
      includesPaginationApi: null
    };
  },
  created: function created() {
    this.draggedObject = null;
    this.selectedItems = [];
  },
  mounted: function mounted() {
    var _this = this;

    if (!this.includeList) this.includeList = [];

    _.remove(this.excludeList, function (excludeItem) {
      return _.find(_this.includeList, function (includeItem) {
        return angular.equals(includeItem, excludeItem);
      });
    });

    if (this.usePagination) {
      this._initPagination();
    }

    var randomId = Math.floor(1000000000 * Math.random());
    if (!this.includeListId) this.includeListId = 'include-list-' + randomId;
    if (!this.excludeListId) this.excludeListId = 'exclude-list-' + randomId;

    if (this.commObject) {
      _.extend(this.commObject, {
        updateFilter: function updateFilter() {
          return _this.updateFilter();
        },
        excludeAll: function excludeAll() {
          return _this.excludeAll();
        },
        excludeSelected: function excludeSelected() {
          return _this.excludeSelected();
        },
        excludeSpecific: function excludeSpecific(item) {
          return _this.excludeSelected(item);
        },
        includeAll: function includeAll() {
          return _this.includeAll();
        },
        includeSelected: function includeSelected() {
          return _this.includeSelected();
        },
        includeSpecific: function includeSpecific(item) {
          return _this.includeSelected(item);
        }
      });
    }

    this._initWatchers();
  },
  ng1_legacy: {
    ng1postLinkFn: function ng1postLinkFn($scope, $element) {
      $($element).on('mouseenter', '.drag-item-text', function (e) {
        var dragItem = $(e.target);

        if (dragItem.hasClass('drag-item-text')) {
          if (dragItem[0].scrollWidth > dragItem.innerWidth()) {
            if (!dragItem.hasClass('tooltipstered')) {
              dragItem.tooltipster({
                animation: 'fade',
                trigger: 'hover',
                onlyOne: 'true',
                interactive: 'true',
                position: 'bottom',
                theme: 'tooltipster-default bottom',
                content: dragItem.text().trim()
              });
              dragItem.tooltipster('show');
            } else {
              dragItem.tooltipster('enable');
              if (dragItem.tooltipster('content') != dragItem.text().trim()) dragItem.tooltipster('content', dragItem.text().trim());
            }
          } else if (dragItem.hasClass('tooltipstered')) dragItem.tooltipster('disable');
        }
      });
    },
    'controllerAs': 'jfDragDrop'
  },
  methods: {
    _initWatchers: function _initWatchers() {
      var _this2 = this;

      // we don't use this.updateFilter() for performance, we want to update only include list when original include list is update
      this.$scope.$watch('jfDragDrop.includeList', function () {
        _this2.filterIncludeCache = _.filter(_this2.includeList, function (item) {
          return !_this2._isExcludeFilteredOut(item);
        });
      }, true);
      this.$scope.$watch('jfDragDrop.excludeList', function () {
        _this2.filterExcludeCache = _.filter(_this2.excludeList, function (item) {
          return !_this2._isIncludeFilteredOut(item);
        });
      }, true);
    },
    excludeAll: function excludeAll() {
      var _this3 = this;

      if (this.disabled || this.isIncludeListEmpty() || this.isIncludeListFixed()) return;
      var filteredOut = [];
      this.includeList.forEach(function (item) {
        if (_.isObject(item)) {
          item['__fixed__'] = undefined;
        }

        if (_this3.filterIncludeList) {
          if (_this3._isExcludeFilteredOut(item)) {
            filteredOut.push(item);
          } else {
            _this3.excludeList.push(item);
          }
        } else {
          _this3.excludeList.push(item);
        }
      });
      this.includeList = filteredOut;

      this._clearSelectedItems();

      this.updateFilter();

      this._updatePagination();

      this.$timeout(function () {
        _this3.$emit('on-change');
      });
    },
    excludeSelected: function excludeSelected() {
      var _this4 = this;

      if (this.disabled || !this.isIncludeListItemSelected()) return;

      this._filterSelection('inc');

      this.selectedItems.forEach(function (item) {
        if (!_.isObject(item) || !item['__fixed__']) {
          _this4.includeList.splice(_this4.includeList.indexOf(item), 1);

          if (_this4.excludeList.indexOf(item) < 0) {
            _this4.excludeList.push(item);
          }
        }
      });

      this._clearSelectedItems();

      this.updateFilter();

      this._updatePagination();

      this.$emit('on-change');
    },
    excludeSpecific: function excludeSpecific(item) {
      if (this.disabled || item['__fixed__']) return;
      var picked;

      for (var i = this.includeList.length - 1; i >= 0; i--) {
        if (this.includeList[i] == item) {
          picked = this.includeList.splice(i, 1)[0];

          this._removeItemFromSelection(picked);

          break;
        }
      }

      if (picked) {
        this.excludeList.push(picked);
      }

      this.updateFilter();

      this._updatePagination();

      this.$emit('on-change');
    },
    includeSpecific: function includeSpecific(item) {
      if (this.disabled) return;
      var picked;

      for (var i = this.excludeList.length - 1; i >= 0; i--) {
        if (this.excludeList[i] == item) {
          picked = this.excludeList.splice(i, 1)[0];

          this._removeItemFromSelection(picked);

          break;
        }
      }

      if (picked) {
        if (_.isObject(picked)) {
          picked['__fixed__'] = undefined;
        }

        this.includeList.push(picked);
      }

      this.updateFilter();

      this._updatePagination();

      this.$emit('on-change');
    },
    includeAll: function includeAll() {
      var _this5 = this;

      if (this.disabled || this.isExcludeListEmpty()) return;
      var filteredOut = [];
      this.excludeList.forEach(function (item) {
        if (_.isObject(item)) {
          item['__fixed__'] = undefined;
        }

        if (_this5.filterExcludeList) {
          if (_this5._isIncludeFilteredOut(item)) {
            filteredOut.push(item);
          } else {
            _this5.includeList.push(item);
          }
        } else {
          _this5.includeList.push(item);
        }
      });
      this.excludeList = filteredOut;

      this._clearSelectedItems();

      this.updateFilter();

      this._updatePagination();

      this.$timeout(function () {
        _this5.$emit('on-change');
      });
    },
    includeSelected: function includeSelected() {
      var _this6 = this;

      if (this.disabled || !this.isExcludeListItemSelected()) return;

      this._filterSelection('exc');

      if (!this.includeList) {
        this.includeList = [];
      }

      if (this.excludeList.length) {
        this.selectedItems.forEach(function (item) {
          if (_.isObject(item)) {
            item['__fixed__'] = undefined;
          }

          _this6.excludeList.splice(_this6.excludeList.indexOf(item), 1);

          if (_this6.includeList.indexOf(item) < 0) {
            _this6.includeList.push(item);
          }
        });
      }

      this._clearSelectedItems();

      this.updateFilter();

      this._updatePagination();

      this.$emit('on-change');
    },
    toggleSelection: function toggleSelection(item) {
      if (this.disabled) return;

      var index = this._inSelectedItems(item);

      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        if (!_.isObject(item) || !item['__fixed__'] || this.includeList.indexOf(item) < 0) {
          this.selectedItems.push(item);
        }
      }

      var scrollParent = $(this.$element[0].querySelector('.dnd-panel')).scrollParent();
      var tempScrollTop = scrollParent.scrollTop();
      this.$element[0].querySelector('.dnd-panel').focus();
      scrollParent.scrollTop(tempScrollTop);
    },
    isIncludeListItemSelected: function isIncludeListItemSelected() {
      var found = false;

      if (this.includeList) {
        for (var i = 0; i < this.includeList.length; i++) {
          if (this.selectedItems.indexOf(this.includeList[i]) > -1) {
            found = true;
            break;
          }
        }
      }

      return found;
    },
    isExcludeListItemSelected: function isExcludeListItemSelected() {
      var found = false;

      if (this.excludeList) {
        for (var i = 0; i < this.excludeList.length; i++) {
          if (this.selectedItems.indexOf(this.excludeList[i]) > -1) {
            found = true;
            break;
          }
        }
      }

      return found;
    },
    isExcludeListEmpty: function isExcludeListEmpty() {
      if (!this.excludeList || !this.excludeList.length) return true; //        else if (!this.filterList) return false;

      var empty = true;

      for (var i in this.excludeList) {
        var item = this.excludeList[i];

        if (!this._isIncludeFilteredOut(item) && item !== this.PLACEHOLDER) {
          empty = false;
          break;
        }
      }

      return empty;
    },
    isIncludeListEmpty: function isIncludeListEmpty() {
      if (!this.includeList || !this.includeList.length) return true;
      var empty = true;

      for (var i in this.includeList) {
        var item = this.includeList[i];

        if (!this._isExcludeFilteredOut(item) && item !== this.PLACEHOLDER) {
          empty = false;
          break;
        }
      }

      return empty;
    },
    isIncludeListFixed: function isIncludeListFixed() {
      if (this.includeList) {
        var fixed = true;

        for (var i in this.includeList) {
          var item = this.includeList[i];

          if (!_.isObject(item) || !item['__fixed__']) {
            fixed = false;
            break;
          }
        }

        ; //            return _.filter(this.includeList,{'__fixed__':undefined}).length === 0;

        return fixed;
      }
    },
    isSelected: function isSelected(item) {
      return this._inSelectedItems(item) > -1;
    },
    _removeItemFromSelection: function _removeItemFromSelection(item) {
      var index = this.selectedItems.indexOf(item);

      if (index >= 0) {
        this.selectedItems.splice(index, 1);
      }
    },
    _inSelectedItems: function _inSelectedItems(item) {
      return this.selectedItems.indexOf(item);
    },
    _clearSelectedItems: function _clearSelectedItems() {
      this.selectedItems = [];
    },
    _isIncludeFilteredOut: function _isIncludeFilteredOut(item) {
      if (!this.filterExcludeList || item === '' || item === this.PLACEHOLDER) return false;
      var regex = new RegExp('.*' + this.filterExcludeList.split('*').join('.*') + '.*', 'i');
      return !regex.test(this.excludeDisplayField && item[this.excludeDisplayField] ? item[this.excludeDisplayField] : item);
    },
    _isExcludeFilteredOut: function _isExcludeFilteredOut(item) {
      if (!this.filterIncludeList || item === '' || item === this.PLACEHOLDER) return false;
      var regex = new RegExp('.*' + this.filterIncludeList.split('*').join('.*') + '.*', 'i');
      return !regex.test(this.includeDisplayField && item[this.includeDisplayField] ? item[this.includeDisplayField] : item);
    },
    updateExcludeFilter: function updateExcludeFilter() {
      var _this7 = this;

      var fromEdit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.filterExcludeCache = _.filter(this.excludeList, function (item) {
        return !_this7._isIncludeFilteredOut(item);
      });
      if (fromEdit) this._updatePagination();
    },
    updateIncludeFilter: function updateIncludeFilter() {
      var _this8 = this;

      var fromEdit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.filterIncludeCache = _.filter(this.includeList, function (item) {
        return !_this8._isExcludeFilteredOut(item);
      });
      if (fromEdit) this._updatePagination();
    },
    updateFilter: function updateFilter() {
      var _this9 = this;

      var fromEdit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.filterExcludeCache = _.filter(this.excludeList, function (item) {
        return !_this9._isIncludeFilteredOut(item);
      });
      this.filterIncludeCache = _.filter(this.includeList, function (item) {
        return !_this9._isExcludeFilteredOut(item);
      });
      if (fromEdit) this._updatePagination();
    },
    getFilteredExcludeList: function getFilteredExcludeList() {
      var ret = this.filterExcludeCache || this.excludeList;
      this.noExcludeMatches = this.excludeList && this.excludeList.length && !ret.length;
      return ret;
    },
    getFilteredIncludeList: function getFilteredIncludeList() {
      var ret = this.filterIncludeCache || this.includeList;
      this.noIncludeMatches = this.includeList && this.includeList.length && !ret.length;
      return ret;
    },
    _dragStart: function _dragStart(event, ui) {
      var dragObj = this._objectFromElement(event.target);

      if (this.disabled || dragObj.draggedFrom === this.includeList && _.isObject(dragObj.dataObject) && dragObj.dataObject['__fixed__']) {
        event.preventDefault();
        return;
      }

      this._initDragObject(dragObj);

      this._initDragHelper(ui.helper);

      this._dragAdditionals();

      this._insertPlaceHolder(this.draggedObject.draggedFrom, this.draggedObject.index);

      this.updateFilter();
      this.$scope.$apply();
    },
    _initDragObject: function _initDragObject(dragObj) {
      this.draggedObject = dragObj;
      dragObj.draggedFrom.splice(dragObj.index, 1);
      this.$scope.$apply();
    },
    _initDragHelper: function _initDragHelper(helper) {
      this.draggedObject.helper = helper;
      helper.addClass('drag-helper');
      var xicon = helper.find('.delete-drop-item');
      if (xicon) xicon.remove();
    },
    _dragAdditionals: function _dragAdditionals() {
      var _this10 = this;

      if (this.selectedItems.length) {
        //remove dragged object from selection, leave only additionals
        if (this._inSelectedItems(this.draggedObject.dataObject) >= 0) this.toggleSelection(this.draggedObject.dataObject);
        this.draggedObject.additionals = []; //only add to additionals the selected items from the draggedFrom array, and not filtered out.

        this.selectedItems.forEach(function (selected) {
          var index;
          if (_this10.draggedObject.draggedFrom === _this10.excludeList) index = _this10.getFilteredExcludeList().indexOf(selected);else index = _this10.draggedObject.draggedFrom.indexOf(selected);

          if (index >= 0) {
            _this10.draggedObject.additionals.push(selected);
          }
        });

        this._clearSelectedItems();

        this.$scope.$apply(function () {
          _this10.draggedObject.additionals.forEach(function (selected) {
            _this10.draggedObject.draggedFrom.splice(_this10.draggedObject.draggedFrom.indexOf(selected), 1);
          });

          if (_this10.draggedObject.additionals.length > 0) _this10.draggedObject.helper.addClass('multiple').html("<span>\u2261</span>" + (1 + _this10.draggedObject.additionals.length) + ' ' + (_this10.objectsName ? _this10.objectsName : 'Items'));
        });
      }
    },
    _dragStop: function _dragStop(event, ui) {
      var _this11 = this;

      if (this.draggedObject) {
        var ph = this._removePlaceHolder(); //console.log('mouseInExclude: '+this.mouseInExclude, 'mouseInInclude: '+this.mouseInInclude);


        if (this.mouseInExclude || this.mouseInInclude) {
          var droppedInArray = this.mouseInExclude ? this.excludeList : this.includeList;

          if (ph && ph.array === droppedInArray) {
            droppedInArray.splice(ph.index, 0, this.draggedObject.dataObject);
          } else {
            droppedInArray.push(this.draggedObject.dataObject);
          }
        } else {
          this.draggedObject.draggedFrom.splice(this.draggedObject.index, 0, this.draggedObject.dataObject);
        }

        if (_.isObject(this.draggedObject.dataObject)) {
          this.draggedObject.dataObject['__fixed__'] = undefined;
        }

        this._stopScrollInterval();

        this.$scope.$apply();

        this._undragAdditionals(ph.index + 1);

        this._initDragAndDropOnElement(this._elementFromObject(this.draggedObject.dataObject));

        this.draggedObject = null;

        this._clearSelectedItems();

        this.$timeout(function () {
          _this11.updateFilter();
        });

        this._updatePagination();

        this.$emit('on-change');
      }
    },
    _dragMove: function _dragMove(event, ui) {
      var _this12 = this;

      this.$scope.$apply(function () {
        var list_element = $(event.originalEvent.target);
        if (!list_element.hasClass('dnd-list-wrapper')) list_element = list_element.parents('.dnd-list-wrapper');

        if (list_element && list_element.hasClass('dnd-list-wrapper')) {
          var dragOffsetY = event.pageY - list_element.offset().top;
          if (list_element.scrollTop() > 0 && dragOffsetY > 0 && dragOffsetY < 20 && !_this12.scrollInterval) //this.scrollInterval = this.$interval(() => {
            list_element.scrollTop(list_element.scrollTop() - 5); //}, 50);
          else if (dragOffsetY > list_element.outerHeight() - 20 && dragOffsetY < list_element.outerHeight() && !_this12.scrollInterval) //this.scrollInterval = this.$interval(() => {
            list_element.scrollTop(list_element.scrollTop() + 5); //}, 50);
          //else
          //    this._stopScrollInterval();
        } //else
        //    this._stopScrollInterval();

      });
    },
    _stopScrollInterval: function _stopScrollInterval() {
      if (this.scrollInterval) {
        this.$interval.cancel(this.scrollInterval);
        this.scrollInterval = null;
      }
    },
    _undragAdditionals: function _undragAdditionals(startIndex) {
      var _this13 = this;

      if (this.draggedObject.additionals) {
        var next = startIndex;
        this.$scope.$apply(function () {
          _this13.draggedObject.additionals.forEach(function (additional) {
            if (_this13.mouseInInclude) {
              _this13.includeList.splice(next, 0, additional);
            } else if (_this13.mouseInExclude) {
              _this13.excludeList.splice(next, 0, additional);
            } else {
              _this13.draggedObject.draggedFrom.splice(next, 0, additional);
            }

            if (_.isObject(additional)) {
              additional['__fixed__'] = undefined;
            } //                this.$scope.$apply();


            _this13._initDragAndDropOnElement(_this13._elementFromObject(additional));

            next++;
          });
        });
      }
    },
    _initDragAndDropOnElement: function _initDragAndDropOnElement(elem) {
      var _this14 = this;

      if (!elem || elem.hasClass('drag-enabled')) return;
      elem.draggable({
        helper: 'clone',
        cursorAt: {
          left: -5,
          top: -5
        },
        scroll: false,
        distance: 10,
        start: function start(event, ui) {
          return _this14._dragStart(event, ui);
        },
        stop: function stop(event, ui) {
          return _this14._dragStop(event, ui);
        },
        drag: function drag(event, ui) {
          return _this14._dragMove(event, ui);
        }
      });
      elem.addClass('drag-enabled');
    },
    _objectFromElement: function _objectFromElement(elem) {
      var dataIndex = $(elem).attr('data-index');
      var parsed = dataIndex.split('-');
      var array;
      if (parsed[0] === 'inc') array = this.includeList;else if (parsed[0] === 'exc') array = this.excludeList;
      var index = parsed[1];

      if (array === this.excludeList) {
        var _obj = this.getViewableExcludes()[index];
        index = this.excludeList.indexOf(_obj);
      } else {
        var _obj2 = this.getViewableIncludes()[index];
        index = this.includeList.indexOf(_obj2);
      }

      var obj = {
        draggedFrom: array,
        dataObject: array[index],
        index: index,
        phIndex: null,
        phArray: null
      };
      return obj;
    },
    _elementFromObject: function _elementFromObject(obj) {
      var iexc = this.getViewableExcludes().indexOf(obj);
      var iinc = this.getViewableIncludes().indexOf(obj);
      var array = iexc >= 0 ? 'exc' : iinc >= 0 ? 'inc' : '';
      var index = iexc >= 0 ? iexc : iinc >= 0 ? iinc : -1;
      if (index < 0) return null;else {
        return $(this.$element).find('li[data-index=' + array + '-' + index + ']');
      }
    },
    mouseIsInInclude: function mouseIsInInclude(isIn) {
      this.mouseInInclude = isIn;
      if (this.mouseInInclude) this.mouseInExclude = false;

      if (isIn && this.draggedObject && this.draggedObject.phArray !== this.includeList) {
        this._insertPlaceHolder(this.includeList, this.includeList.length);
      }
    },
    mouseIsInExclude: function mouseIsInExclude(isIn) {
      this.mouseInExclude = isIn;
      if (this.mouseInExclude) this.mouseInInclude = false;

      if (isIn && this.draggedObject && this.draggedObject.phArray !== this.excludeList) {
        this._insertPlaceHolder(this.excludeList, this.excludeList.length); //let list_element = $('#dnd-' + (iexc >= 0 ? 'exclude' : 'include'));

      }
    },
    initDragElement: function initDragElement(item) {
      var _this15 = this;

      this.$timeout(function () {
        var elem = _this15._elementFromObject(item);

        _this15._initDragAndDropOnElement(elem);
      });
    },
    mouseOver: function mouseOver(item) {
      if (item != null && this.draggedObject) {
        var iexc = this.excludeList.indexOf(item);
        var iinc = this.includeList.indexOf(item);
        var array = iexc >= 0 ? this.excludeList : iinc >= 0 ? this.includeList : null;
        var index = iexc >= 0 ? iexc : iinc >= 0 ? iinc : -1;
        if (array) this._insertPlaceHolder(array, index);
      } else if (item != null) {
        this.initDragElement(item);
      }
    },
    _insertPlaceHolder: function _insertPlaceHolder(array, index) {
      this._removePlaceHolder();

      array.splice(index, 0, this.PLACEHOLDER);
      this.draggedObject.phIndex = index;
      this.draggedObject.phArray = array;
      this.updateFilter();
    },
    _findPlaceHolder: function _findPlaceHolder() {
      var phIndexExc = this.excludeList.indexOf(this.PLACEHOLDER);
      var phIndexInc = this.includeList.indexOf(this.PLACEHOLDER);

      if (phIndexExc >= 0) {
        return {
          array: this.excludeList,
          index: phIndexExc
        };
      } else if (phIndexInc >= 0) {
        return {
          array: this.includeList,
          index: phIndexInc
        };
      } else {
        return null;
      }
    },
    _removePlaceHolder: function _removePlaceHolder() {
      var ph = this._findPlaceHolder();

      if (ph) {
        ph.array.splice(ph.index, 1);
        this.draggedObject.phIndex = null;
      }

      return ph;
    },
    onKeyDown: function onKeyDown(e) {
      if (e.shiftKey && e.ctrlKey && (e.which === 65 || e.which === 97)) {
        this._clearSelectedItems();
      } else if (e.ctrlKey && (e.which === 65 || e.which === 97)) {
        e.preventDefault();
        if (this.mouseInExclude) this._selectAll(this.excludeList);else if (this.mouseInInclude) this._selectAll(this.includeList);
      }
    },
    _selectAll: function _selectAll(array) {
      var _this16 = this;

      this._clearSelectedItems();

      array.forEach(function (item) {
        _this16.toggleSelection(item);
      });
    },
    compileCustomTemplate: function compileCustomTemplate(item, type) {
      var _this17 = this;

      var displayField;
      if (type === 'exc') displayField = 'excludeDisplayField';else if (type === 'inc') displayField = 'includeDisplayField';

      var elem = this._elementFromObject(item);

      if (elem) {
        var template = this.customTemplate;
        var newElem = $(template);
        var scope = this.$scope.$new();

        _.extend(scope, {
          getItemInfo: function getItemInfo() {
            var theItem = _this17._objectFromElement(elem).dataObject;

            return {
              text: _this17[displayField] && theItem && theItem[_this17[displayField]] ? theItem[_this17[displayField]] : theItem,
              item: theItem,
              included: type === 'inc'
            };
          },
          userScope: this.customTemplateScope
        });

        this.$compile(newElem)(scope);
        var customElem = elem.find('.custom-template');
        customElem[0].innerHTML = '';
        customElem[0].appendChild(newElem[0]);
      }
    },
    _initPagination: function _initPagination() {
      this.itemsPerPage = _.isNaN(parseInt(this.usePagination)) ? 8 : parseInt(this.usePagination);
      this.currExcludesPage = 0;
      this.currIncludesPage = 0;
      this.excludesPaginationApi = new PaginationApi(this, 'exc');
      this.includesPaginationApi = new PaginationApi(this, 'inc'); //get item height and margin

      var e = $("<div style=\"background-color: transparent\" class=\"drag-item\">\n    <div class=\"drag-item-text\"></div>\n</div>");
      $(this.$element).find('.dnd-list')[0].appendChild(e[0]);
      var height = e.outerHeight();
      var margin = parseInt(e.css('margin-bottom'));
      $(this.$element).find('.dnd-list')[0].removeChild(e[0]);
      var listWrappers = $(this.$element).find('.dnd-list-wrapper');
      var wrappersHeight = margin * 2 + (height + margin) * this.itemsPerPage;
      listWrappers.css('height', wrappersHeight + 'px');
      listWrappers.css('overflow-y', 'hidden');
      var actions = $(this.$element).find('.dnd-actions');
      var actionsHeight = parseInt(actions.css('height'));
      actions.css('margin-top', (wrappersHeight - actionsHeight) / 2 + 'px');
    },
    _updatePagination: function _updatePagination() {
      if (this.usePagination) {
        this.excludesPaginationApi.update();
        this.includesPaginationApi.update();
      }
    },
    getViewableExcludes: function getViewableExcludes() {
      if (!this.usePagination) {
        return this.getFilteredExcludeList();
      } else {
        var all = this.getFilteredExcludeList();
        return _.slice(all, this.currExcludesPage * this.itemsPerPage, (this.currExcludesPage + 1) * this.itemsPerPage);
      }
    },
    getViewableIncludes: function getViewableIncludes() {
      if (!this.usePagination) {
        return this.getFilteredIncludeList();
      } else {
        var all = this.getFilteredIncludeList();
        return _.slice(all, this.currIncludesPage * this.itemsPerPage, (this.currIncludesPage + 1) * this.itemsPerPage);
      }
    },
    _filterSelection: function _filterSelection(leave) {
      var _this18 = this;

      this.selectedItems = _.filter(this.selectedItems, function (item) {
        if (leave === 'inc' && _this18.includeList && _this18.includeList.indexOf(item) >= 0) return true;else if (leave === 'exc' && _this18.excludeList && _this18.excludeList.indexOf(item) >= 0) return true;else return false;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfDragDropComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfDragDropComponentvue_type_script_lang_js_ = (JfDragDropComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfDragDropComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfDragDropComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "e4050446",
  null
  
)

/* harmony default export */ var JfDragDropComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfDragDrop.js.map