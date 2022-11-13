((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[54],{

/***/ "e9ec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeItemComponent/index.vue?vue&type=template&id=12d09ce3&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.refreshHack.count && _vm.getClasses().concat(_vm.getCustomClasses()),style:({height: _vm.tree.viewPane.itemHeight, 'line-height': _vm.tree.viewPane.itemHeight}),on:{"click":function($event){return _vm.onItemClick($event)},"dblclick":function($event){return _vm.onItemDoubleClick()}}},[_c('div',{staticClass:"jf-tree-item-container",style:({height: _vm.tree.viewPane.itemHeight, 'line-height': _vm.tree.viewPane.itemHeight})},[_c('jf-tree-indentation',{attrs:{"visible":_vm.tree.api.linesVisible,"height":_vm.tree.viewPane.itemHeight,"lines-backgrounds":_vm.tree.viewPane.linesBackgrounds,"indentation":_vm.getIndentation()}}),(_vm.data.level >= 1 && _vm.tree.api.linesVisible && !_vm.shouldShowExpander() && !_vm.data.$pending)?_c('div',{staticClass:"no-children-line-extension",style:({height: _vm.tree.viewPane.itemHeight, 'background-image': 'url(\'' + _vm.tree.viewPane.linesBackgrounds['horizontal-line'] + '\')'})}):_vm._e(),(_vm.data.data === _vm.tree.api.GO_UP_NODE)?_c('span',{staticClass:"drill-back"},[_vm._v("  ..")]):_vm._e(),(_vm.data.data !== _vm.tree.api.GO_UP_NODE && (_vm.shouldShowExpander() || _vm.data.$pending || _vm.data.level === 0))?_c('div',{directives:[{name:"init",rawName:"v-init",value:(_vm.initExpander()),expression:"initExpander()"}],staticClass:"node-expander",style:({height: _vm.tree.viewPane.itemHeight}),on:{"click":function($event){_vm.shouldShowExpander() && _vm.toggleExpansion(); $event.stopPropagation();}}},[(_vm.shouldShowExpander())?_c('div',{staticClass:"action-icon icon icon-addons-arrow-right"}):_vm._e(),(_vm.data.$pending)?_c('div',{staticClass:"spinner-msg-local"},[_c('div',{staticClass:"icon-hourglass-local"})]):_vm._e()]):_vm._e(),(_vm.data.data !== _vm.tree.api.GO_UP_NODE)?_c('div',{staticClass:"jf-tree-item-content"},[_c('jf-tree-compiled-cell',{attrs:{"item-id":_vm.itemId,"tree-item":_vm.jfTreeItem}})],1):_vm._e()],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTreeItemComponent/index.vue?vue&type=template&id=12d09ce3&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/lodash/isArray.js
var isArray = __webpack_require__("6747");
var isArray_default = /*#__PURE__*/__webpack_require__.n(isArray);

// EXTERNAL MODULE: ./node_modules/lodash/map.js
var map = __webpack_require__("dd61");
var map_default = /*#__PURE__*/__webpack_require__.n(map);

// EXTERNAL MODULE: ./node_modules/lodash/filter.js
var filter = __webpack_require__("9380");
var filter_default = /*#__PURE__*/__webpack_require__.n(filter);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeItemComponent/index.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var JfTreeItemComponentvue_type_script_lang_js_ = ({
  name: 'jf-tree-item',
  props: ['data', 'itemId', 'tree'],
  'jf@inject': ['$scope', '$element', '$timeout', 'AdvancedStringMatch'],
  data: function data() {
    return {
      refreshHack: this.tree.refreshHack
    };
  },
  created: function created() {
    this.asm = this.AdvancedStringMatch;
  },
  mounted: function mounted() {
    $(this.$el).prop('comp', this);

    this._watchSelection();

    this._watchExpansion();

    this._registerEvents();
    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */


    $(this.$element).prop('ctrl', this);
  },
  ng1_legacy: {
    'controllerAs': 'jfTreeItem'
  },
  methods: {
    _registerEvents: function _registerEvents() {
      var _this = this;

      if (this.tree.api.eventsToRegisterOnNode) {
        this.tree.api.eventsToRegisterOnNode.forEach(function (registeredEvent) {
          _this.tree.api.JFrogEventBus.registerOnScope(_this.$scope, registeredEvent.event, function () {
            for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
              params[_key] = arguments[_key];
            }

            registeredEvent.callback(_this.data.data, params);
          });
        });
      }
    },
    initExpander: function initExpander() {
      this._syncExpansionClass(this.isExpanded());
    },
    _syncExpansionClass: function _syncExpansionClass(expanded) {
      var iconElem = $(this.$element).find('.node-expander');

      if (expanded) {
        iconElem.addClass('expanded');
      } else {
        iconElem.removeClass('expanded');
      }
    },
    _watchExpansion: function _watchExpansion() {
      var _this2 = this;

      this.$scope.$watch(function () {
        return _this2.isExpanded();
      }, function (expanded) {
        return _this2._syncExpansionClass(expanded);
      });
      this.$scope.$watch('jfTreeItem.data', function () {
        return _this2._syncExpansionClass(_this2.isExpanded());
      });
    },
    _watchSelection: function _watchSelection() {
      var _this3 = this;

      //This is instead of using ng-class, which not working smoothly in safari
      var toggleClass = function toggleClass(add, className) {
        if (add) {
          $(_this3.$element).addClass(className);
        } else {
          $(_this3.$element).removeClass(className);
        }
      };

      this.$scope.$watch(function () {
        return _this3.tree.api.$freezedSelected || _this3.tree.api.$selectedNode;
      }, function (selected) {
        var iAmSelected = selected === _this3.data.data;
        toggleClass(iAmSelected, 'selected');
      });
      this.$scope.$watch(function () {
        return _this3.tree.api.$freezedPreSelected || _this3.tree.api.$preSelectedNode;
      }, function (preSelected) {
        var iAmPreSelected = preSelected === _this3.data.data;
        toggleClass(iAmPreSelected, 'pre-selected');
      });
      this.$scope.$watch('jfTreeItem.data', function () {
        var iAmPreSelected = (_this3.tree.api.$freezedPreSelected || _this3.tree.api.$preSelectedNode) === _this3.data.data;
        var iAmSelected = (_this3.tree.api.$freezedSelected || _this3.tree.api.$selectedNode) === _this3.data.data;
        toggleClass(iAmSelected, 'selected');
        toggleClass(iAmPreSelected, 'pre-selected');
      });
    },
    _getTreeContainer: function _getTreeContainer() {
      return $(this.tree.$element).find('.jf-tree-container');
    },
    isSelected: function isSelected() {
      return this.tree.api._isSelected(this.data);
    },
    isPreSelected: function isPreSelected() {
      return this.tree.api._isPreSelected(this.data);
    },
    onItemClick: function onItemClick(e) {
      if (e.type === 'click') {
        if (this.data.data === this.tree.api.GO_UP_NODE) {
          this.tree.api.drillUp();
        } else {
          this.tree.api._setSelected(this.data);

          this.tree.api.fire('item.clicked', this.data.data);
        }
      }
    },
    onItemDoubleClick: function onItemDoubleClick() {
      this.tree.api.fire('item.dblClicked', this.data.data);
    },
    isExpanded: function isExpanded() {
      return this.tree.viewPane.isNodeOpen(this.data.data);
    },
    toggleExpansion: function toggleExpansion() {
      this.tree.api.toggleExpansion(this.data.data);
    },
    isQuickFindMatch: function isQuickFindMatch() {
      var elem = $(this.$element).find('.jf-tree-item-content .node-text');

      if (elem.length) {
        var text = elem.text();
        elem.unhighlight();

        if (text && this.tree.api.quickFindTerm) {
          var asmResponse = this.asm.match(text, this.tree.api.quickFindTerm);

          if (asmResponse.matched) {
            this.asm.highlight(elem, asmResponse.segments);
          }

          return asmResponse.matched;
        } else return false;
      }
    },
    getClasses: function getClasses() {
      var classes = ['jf-tree-item-vue'];
      if (this.isQuickFindMatch()) classes.push('quick-find-match');
      return classes;
    },
    getCustomClasses: function getCustomClasses() {
      if (!this.data.data || this.data.data === this.tree.api.GO_UP_NODE || !this.tree.api.classGetter) return [];else {
        var classes = this.tree.api.classGetter(this.data.data);
        if (!classes) classes = [];else if (!isArray_default()(classes)) classes = [classes];
        return classes;
      }
    },
    shouldShowExpander: function shouldShowExpander() {
      return this.data.hasChildren && !this.data.data.$noChildren && !this.data.$pending;
    },
    getIndentation: function getIndentation() {
      if (!this.data.data.$indentation) {
        this.createIndentation();
      }

      return this.data.data.$indentation;
    },
    createIndentation: function createIndentation() {
      if (!this.tree.api.linesVisible) {
        this.$set(this.data.data, '$indentation', map_default()(new Array(this.data.level), function (i) {
          return {};
        }));
        return;
      }

      var flats = this.data.pane.$flatItems;

      var isLastChild = function isLastChild(item) {
        if (item.$isLastChild === undefined) {
          var parent = item.parent;
          var children = filter_default()(flats, {
            parent: parent
          });
          var index = children.indexOf(item);
          item.$isLastChild = index !== -1 && index === children.length - 1;
        }

        return item.$isLastChild;
      };

      var indentation = [];
      var relevantItem = this.data;

      for (var i = this.data.level - 1; i >= 0; i--) {
        var isLast = isLastChild(relevantItem);
        var unit = {
          index: i,
          background: i === this.data.level - 1 ? isLast ? 'last-connection-point' : 'connection-point' : isLast ? '' : 'vertical-line'
        };
        indentation.push(unit);
        relevantItem = relevantItem.parent;
      }

      this.$set(this.data.data, '$indentation', indentation.reverse());
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfTreeItemComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTreeItemComponentvue_type_script_lang_js_ = (JfTreeItemComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTreeItemComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTreeItemComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "12d09ce3",
  null
  
)

/* harmony default export */ var JfTreeItemComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfTreeItem.js.map