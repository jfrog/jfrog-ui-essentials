((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[29],{

/***/ "702c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfJsTreeWrapComponent/index.vue?vue&type=template&id=72451b3c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasData()),expression:"hasData()"}],staticClass:"jf-js-tree-wrap-container"},[(_vm.treeHeader)?_c('div',{staticClass:"tree-browser-header"},[_c('div',{staticClass:"tree-browser-header-tabs",domProps:{"innerHTML":_vm._s(_vm.treeHeader)}})]):_vm._e(),_vm._m(0)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-element-container"},[_c('div',[_c('div',{staticClass:"tree-element"})])])}]


// CONCATENATED MODULE: ./src/components/JfJsTreeWrapComponent/index.vue?vue&type=template&id=72451b3c&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfJsTreeWrapComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfJsTreeWrapComponentvue_type_script_lang_js_ = ({
  name: 'jf-js-tree-wrap',
  props: ['treeData', 'treeHeader', 'checkboxes'],
  'jf@inject': ['$scope', '$q', '$element', '$timeout'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var _this = this;

    /* (NG2VUE) This was moved from created() to mounted() */

    /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    this.$scope.$watch('jfJsTreeWrap.treeData', function (data) {
      if (data && !_this.built) _this.initTree();
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfJsTreeWrap'
  },
  methods: {
    treeConfig: function treeConfig() {
      return {
        'core': {
          'data': {}
        },
        'checkbox': {
          'keep_selected_style': false,
          'three_state': true,
          'tie_selection': false,
          'whole_node': false
        },
        'plugins': this.checkboxes === true || this.checkboxes === undefined ? ['wholerow', 'checkbox'] : []
      };
    },
    initTree: function initTree() {
      var _this2 = this;

      this.buildTree().then(function () {
        _this2.registerTreeEvents();

        _this2.$emit('on-ready', {
          jstree: _this2.jstree()
        });

        _this2.built = true;
      });
    },
    registerTreeEvents: function registerTreeEvents() {
      var _this3 = this;

      $(this.treeElement).on('select_node.jstree', function (e, args) {});
      $(this.treeElement).on('check_node.jstree', function (e, args) {
        _this3.$timeout(function () {
          return _this3.$emit('on-state-change');
        });
      });
      $(this.treeElement).on('uncheck_node.jstree', function (e, args) {
        _this3.$timeout(function () {
          return _this3.$emit('on-state-change');
        });
      });
    },
    buildTree: function buildTree() {
      var _this4 = this;

      this.transformedData = this.transformData(this.treeData);
      var TreeConfig = this.treeConfig();

      TreeConfig.core.data = function (obj, cb) {
        if (obj.id === '#') cb(_this4.transformedData);else {
          var children = _this4.$emit('get-children-func', {
            node: obj.data.originalObject()
          });

          if (children.then) {
            children.then(function (data) {
              return cb(_this4.transformData(data));
            });
          } else {
            cb(children ? _this4.transformData(children) : []);
          }
        }
      };

      this.treeElement = $(this.$element).find('.tree-element');
      $(this.treeElement).jstree(TreeConfig);
      var defer = this.$q.defer();
      $(this.treeElement).on('ready.jstree', function (e) {
        defer.resolve();
      });
      return defer.promise;
    },
    jstree: function jstree() {
      return $(this.treeElement).jstree();
    },
    transformData: function transformData(origData) {
      var _this5 = this;

      if (!origData || !origData.length) return;
      return _.map(origData, function (origItem) {
        var item = {};
        item.data = {
          originalObject: function originalObject() {
            return origItem;
          }
        };

        var children = _this5.$emit('get-children-func', {
          node: origItem
        });

        item.children = children && (children.length || children.then) ? true : [];
        item.text = _this5.$emit('get-text-func', {
          node: origItem
        }) || '';
        item.icon = 'jf-tree-no-icon';
        item.state = _this5.getInitialStateFunc ? _this5.$emit('get-initial-state-func', {
          node: origItem
        }) : {
          opened: false,
          disabled: false,
          selected: false,
          checked: false
        };

        _this5.setItemMethods(origItem);

        return item;
      });
    },
    setItemMethods: function setItemMethods(item) {
      var _this6 = this;

      item.$isChecked = function () {
        var node = _this6.getTreeNodeByOrigItem(item);

        return node ? _this6.jstree().is_checked(node) : false;
      };

      item.$isOpened = function () {
        var node = _this6.getTreeNodeByOrigItem(item);

        return node ? _this6.jstree().is_open(node) : false;
      };

      item.$setChecked = function () {
        var checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var node = _this6.getTreeNodeByOrigItem(item);

        if (node) {
          if (checked) _this6.jstree().check_node(node);else _this6.jstree().uncheck_node(node);
        }
      };

      item.$setOpened = function () {
        var opened = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var node = _this6.getTreeNodeByOrigItem(item);

        if (node) {
          if (opened) _this6.jstree().open_node(node, null, false);else _this6.jstree().close_node(node, null, false);
        }
      };
    },
    getTreeNodeByOrigItem: function getTreeNodeByOrigItem(origItem) {
      var treeJSON = this.jstree().get_json();
      var found;

      var recursiveFind = function recursiveFind(arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].data.originalObject() === origItem) {
            found = arr[i];
            break;
          }
        }

        if (!found) {
          for (var _i = 0; _i < arr.length; _i++) {
            if (arr[_i].children && arr[_i].children.length) {
              found = recursiveFind(arr[_i].children);
              if (found) break;
            }
          }
        }

        return found;
      };

      recursiveFind(treeJSON);
      return found;
    },
    hasData: function hasData() {
      return this.treeData && this.treeData.length;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfJsTreeWrapComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfJsTreeWrapComponentvue_type_script_lang_js_ = (JfJsTreeWrapComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfJsTreeWrapComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfJsTreeWrapComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "72451b3c",
  null
  
)

/* harmony default export */ var JfJsTreeWrapComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfJsTreeWrap.js.map