((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[51],{

/***/ "0590":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7036":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_fae57256_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0590");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_fae57256_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_fae57256_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "bf3a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2dee9595-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeComponent/index.vue?vue&type=template&id=fae57256&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"jf-tree",class:_vm.viewPaneName + '-pane',staticStyle:{"clear":"both"},attrs:{"tabindex":"0"}},[(_vm.viewPane)?_c('div',{staticClass:"jf-tree-container",style:({height: _vm.getPageHeight() + 'px', overflow: _vm.isEmpty() || !_vm.api.dataGettersSet ? 'visible' : 'hidden'})},[_c('div',{staticClass:"tree-items-container",style:({transform: 'translate(0, ' + (-_vm.getTranslate()) + 'px)'})},[_c('div',{staticClass:"scroll-faker-container",style:({transform: 'translate(0, ' + (_vm.getTranslate()) + 'px)', right: 0, height: _vm.getPageHeight() + 'px'})},[_c('div',{directives:[{name:"init",rawName:"v-init",value:(_vm.initScrollFaker()),expression:"initScrollFaker()"}],staticClass:"scroll-faker",style:({height: (_vm.getTotalScrollHeight() > _vm.maxFakeScrollHeight ? _vm.maxFakeScrollHeight : _vm.getTotalScrollHeight()) + 'px'})})]),_c('div',{staticClass:"h-scroll-wrapper",style:({height: (_vm.getPageHeight() + _vm.getTranslate()) + 'px'}),on:{"mousewheel":function($event){$event.preventDefault();return _vm.onMouseWheel($event)}}},[_c('div',{staticClass:"h-scroll-content"},_vm._l((_vm.viewPane._getPageData()),function(item,$index){return _c('jf-tree-item',{key:$index,attrs:{"tree":_vm.jfTree,"item-id":$index,"data":item}})}),1)])]),(!_vm.api.dataGettersSet)?_c('div',{staticClass:"missing-data-setters"},[_vm._v("\n                "+_vm._s('jf-tree: Data getters was not set (call setDataDriver())')+"\n            ")]):_vm._e(),(_vm.isEmpty())?_c('div',{staticClass:"empty-tree-placeholder"},[_vm._v("\n                "+_vm._s(_vm.api.emptyTreeText || 'This tree is empty !')+"\n            ")]):_vm._e(),(_vm.noFilterResults)?_c('div',{staticClass:"empty-tree-placeholder filter-no-results"},[_vm._v("\n                Current filter has no results. "),_c('a',{attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.clearFilter()}}},[_vm._v("Clear filter")])]):_vm._e()]):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JfTreeComponent/index.vue?vue&type=template&id=fae57256&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d225");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js
var createClass = __webpack_require__("b0b4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfTreeComponent/index.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var JfTreeComponentvue_type_script_lang_js_ = ({
  name: 'jf-tree',
  props: {
    api: {},
    viewPaneName: {
      default: 'default'
    }
  },
  'jf@inject': ['$scope', '$element', '$timeout', '$compile', '$rootScope'],
  data: function data() {
    return {
      viewPane: null,
      maxFakeScrollHeight: 1000000,
      noFilterResults: null,
      virtualScrollIndex: 0,
      virtScrollDisplacement: 0,
      currentPage: 0,
      refreshHack: {
        count: 1
      }
    };
  },
  created: function created() {
    var _this = this;

    this.cellScopes = [];
    this.$scope.$watch('jfTree.api', function (api) {
      if (_this.api) {
        _this.api._setDirectiveController(_this);
      }

      if (_this.api && !_this.paginationApi) {
        _this.paginationApi = new JfTreeComponentvue_type_script_lang_js_PaginationApi(_this);

        _this.paginationApi.registerChangeListener(function () {
          _this.refresh(false);
        });
      }
    });
    this.$scope.$on('$destroy', function () {
      _this.cellScopes.forEach(function (s) {
        return s.$destroy();
      });
    });
    $(window).on('resize', function () {
      if (_this.viewPane.autoHeight) _this.viewPane._setAutoItemsPerPage();
    });
  },
  mounted: function mounted() {
    var _this2 = this;

    $(this.$element).find('.jf-tree').keydown(function (e) {
      switch (e.key) {
        case 'Down':
        case 'ArrowDown':
          e.preventDefault();

          _this2.api._onArrowKey(true, _this2.viewPane);

          break;

        case 'Up':
        case 'ArrowUp':
          e.preventDefault();

          _this2.api._onArrowKey(false, _this2.viewPane);

          break;

        case 'Enter':
          e.preventDefault();

          if (_this2.api.getPreSelectedNode() === _this2.api.GO_UP_NODE) {
            _this2.api.drillUp();
          } else {
            _this2.api.selectPreSelected();

            _this2.api.toggleSelected(true);
          }

          break;

        case 'Right':
        case 'ArrowRight':
          {
            e.preventDefault();

            var relevant = _this2.api.getPreSelectedNode() || _this2.api.getSelectedNode();

            if (relevant) {
              if (!_this2.api.isNodeOpen(relevant)) _this2.api.openNode(relevant, true);else {
                if (relevant.$childrenCache && relevant.$childrenCache.length) {
                  _this2.api.preSelectNode(relevant.$childrenCache[0]);
                }
              }
            }

            break;
          }

        case 'Left':
        case 'ArrowLeft':
          {
            e.preventDefault();

            var _relevant = _this2.api.getPreSelectedNode() || _this2.api.getSelectedNode();

            if (_relevant) {
              if (_this2.api.isNodeOpen(_relevant)) _this2.api.closeNode(_relevant);else {
                var parent = _this2.api.getParentNode(_relevant);

                if (parent) _this2.api.preSelectNode(parent);
              }
            }

            break;
          }

        default:
          if (!e.ctrlKey && !e.shiftKey && !e.metaKey && e.key.toLowerCase() === String.fromCharCode(e.which).toLowerCase()) {
            _this2.api.fire('keydown', e);
          }

      }
    });
  },
  ng1_legacy: {
    'controllerAs': 'jfTree'
  },
  methods: {
    clearFilter: function clearFilter() {
      this.treeFilter = '';
      this.onUpdateFilter();
    },
    compileTemplate: function compileTemplate(elem, itemId) {
      var node = this.viewPane._getPageData()[itemId];

      if (!node) return;

      var existingScope = _.find(this.cellScopes, function (s) {
        return s.node === node.data;
      });

      var itemScope;

      if (!existingScope) {
        itemScope = this.$rootScope.$new({
          node: node.data,
          appScope: this.api.appScope,
          tree: {
            api: this.api
          }
        });
        this.cellScopes.push(itemScope);
      } else itemScope = existingScope;

      var template = _.isFunction(this.api.nodeTemplate) ? this.api.nodeTemplate(node.data) : this.api.nodeTemplate;
      var templateElem = $('<div>' + template + '</div>');
      this.$compile(templateElem.children()[0])(itemScope);
      elem.empty();
      elem.append(templateElem.children()[0]);
    },
    _normalizeWheelEvent: function _normalizeWheelEvent(event) {
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;
      var sX = 0,
          sY = 0,
          pX = 0,
          pY = 0;

      if ('detail' in event) {
        sY = event.detail;
      }

      if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
      }

      if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in event) {
        pY = event.deltaY;
      }

      if ('deltaX' in event) {
        pX = event.deltaX;
      }

      if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode == 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    },
    onMouseWheel: function onMouseWheel($event, $delta, $deltaX, $deltaY) {
      if (this.viewPane.scrollTimeout) {
        this.$timeout.cancel(this.viewPane.scrollTimeout);
        delete this.viewPane.scrollTimeout;
      }

      var normalDelta = this._normalizeWheelEvent($event).pixelY;

      var xDelta = this._normalizeWheelEvent($event).pixelX;

      if (Math.abs(normalDelta) < Math.abs(xDelta)) {
        $event.stopPropagation();
        return;
      }

      var scrollAmount = 0.02 * Math.abs(normalDelta);

      var scrollPosBefore = this.viewPane._getCurrentScrollPos();

      if ($event.deltaY > 0) {
        // scrollUp
        this.viewPane._scrollTo(scrollPosBefore + scrollAmount);
      } else if ($event.deltaY < 0) {
        // scrollDown
        this.viewPane._scrollTo(scrollPosBefore - scrollAmount);
      }

      this.currentPage = Math.floor((this.virtualScrollIndex + this.viewPane.itemsPerPage - 1) / this.viewPane.itemsPerPage);
      if (scrollPosBefore !== this.viewPane._getCurrentScrollPos()) $event.preventDefault();
      this.syncFakeScroller(false);
      this.viewPane.focus();
    },
    resetScroll: function resetScroll() {
      this.virtualScrollIndex = 0;
      this.virtScrollDisplacement = 0;
      this.currentPage = 1;
      this.syncFakeScroller(false);
    },
    getTotalScrollHeight: function getTotalScrollHeight() {
      return this.viewPane._getPrePagedData().length * parseFloat(this.viewPane.itemHeight);
    },
    getPageHeight: function getPageHeight() {
      if (this.viewPane.containerHeight) {
        return this.viewPane.containerHeight;
      } else {
        var len = this.viewPane._getPrePagedData().length;

        if (len < this.viewPane.itemsPerPage) return len * parseFloat(this.viewPane.itemHeight);else return this.viewPane.itemsPerPage * parseFloat(this.viewPane.itemHeight);
      }
    },
    initScrollFaker: function initScrollFaker() {
      var _this3 = this;

      var scrollParent = $(this.$element).find('.scroll-faker-container');
      scrollParent.on('scroll', function (e) {
        if (_this3.$settingScroll) {
          delete _this3.$settingScroll;
          return;
        }

        if (_this3.viewPane.scrollTimeout) {
          _this3.$timeout.cancel(_this3.viewPane.scrollTimeout);

          delete _this3.viewPane.scrollTimeout;
        }

        var len = _this3.viewPane._getPrePagedData().length;

        if (len) {
          var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
          var relativePosition = scrollParent.scrollTop() / maxScrollTop;

          if (_.isNaN(relativePosition)) {
            relativePosition = 1;
          }

          var newScrollIndex = relativePosition * (len - _this3.viewPane.itemsPerPage);
          if (newScrollIndex < 0) newScrollIndex = 0;
          _this3.virtualScrollIndex = Math.floor(newScrollIndex);
          _this3.virtScrollDisplacement = newScrollIndex - _this3.virtualScrollIndex;
          _this3.currentPage = Math.floor((_this3.virtualScrollIndex + _this3.viewPane.itemsPerPage - 1) / _this3.viewPane.itemsPerPage);
        } else {
          _this3.virtualScrollIndex = 0;
          _this3.virtScrollDisplacement = 0;
          _this3.currentPage = 0;
        }

        _this3.api.fire('pagination.change', _this3.paginationApi.getCurrentPage());
      });
    },
    getTranslate: function getTranslate() {
      var displacement = this.$freezedVScrollDisplacement !== undefined ? this.$freezedVScrollDisplacement : this.virtScrollDisplacement;

      if (!displacement) {
        return 0;
      } else {
        var pixels = displacement * parseFloat(this.viewPane.itemHeight);
        return pixels;
      }
    },
    syncFakeScroller: function syncFakeScroller() {
      var _this4 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var len = this.viewPane._getPrePagedData(true).length;

      var scrollParent = $(this.$element).find('.scroll-faker-container');
      var relativePosition = this.viewPane._getCurrentScrollPos() / (len - this.viewPane.itemsPerPage);

      var sync = function sync() {
        var maxScrollTop = scrollParent[0].scrollHeight - scrollParent.outerHeight();
        var scrollTop = Math.floor(maxScrollTop * relativePosition);
        _this4.$settingScroll = true;
        scrollParent.scrollTop(scrollTop);
      };

      if (delay) this.$timeout(sync);else sync();
    },
    getScrollWidth: function getScrollWidth() {
      var el = $(this.$element).find('.scroll-faker-container')[0];
      return el.offsetWidth - el.clientWidth;
    },
    refresh: function refresh() {
      var _this5 = this;

      setTimeout(function () {
        return _this5.refreshHack.count++;
      });
    },
    isEmpty: function isEmpty() {
      return !!(this.api.dataWasSet && !this.viewPane._getRawData().length && !this.viewPane.$freezed);
    },
    _freezeVScroll: function _freezeVScroll() {
      this.$freezedVScrollIndex = this.virtualScrollIndex;
      this.$freezedVScrollDisplacement = this.virtScrollDisplacement;
    },
    _unFreezeVScroll: function _unFreezeVScroll() {
      delete this.$freezedVScrollIndex;
      delete this.$freezedVScrollDisplacement;
    }
  }
});

var JfTreeComponentvue_type_script_lang_js_PaginationApi = /*#__PURE__*/function () {
  function PaginationApi(treeCtrl) {
    Object(classCallCheck["a" /* default */])(this, PaginationApi);

    this.treeCtrl = treeCtrl;
  }

  Object(createClass["a" /* default */])(PaginationApi, [{
    key: "getTotalPages",
    value: function getTotalPages() {
      return Math.ceil(this.treeCtrl.viewPane.getTotalLengthOfData() / this.treeCtrl.viewPane.itemsPerPage);
    }
  }, {
    key: "getCurrentPage",
    value: function getCurrentPage() {
      return this.treeCtrl.currentPage + 1;
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      if (this.getCurrentPage() === this.getTotalPages()) return;
      this.treeCtrl.currentPage++;
      this.syncVirtualScroll();
      this.update();
      this.treeCtrl.api.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      if (this.getCurrentPage() === 1) return;
      this.treeCtrl.currentPage--;
      this.syncVirtualScroll();
      this.update();
      this.treeCtrl.api.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "setPage",
    value: function setPage(pageNum) {
      if (pageNum < 1 || pageNum > this.getTotalPages()) return;
      this.treeCtrl.currentPage = pageNum - 1;
      this.syncVirtualScroll();
      this.update();
      this.treeCtrl.api.fire('pagination.change', this.getCurrentPage());
    }
  }, {
    key: "update",
    value: function update() {
      var _this6 = this;

      if (this.getCurrentPage() > this.getTotalPages()) {
        this.setPage(this.getTotalPages());
      }

      if (this.listeners) this.listeners.forEach(function (listener) {
        return listener(_this6.getCurrentPage());
      });
    }
  }, {
    key: "registerChangeListener",
    value: function registerChangeListener(listener) {
      if (!this.listeners) this.listeners = [];
      this.listeners.push(listener);
    }
  }, {
    key: "syncVirtualScroll",
    value: function syncVirtualScroll() {
      this.treeCtrl.virtualScrollIndex = this.treeCtrl.currentPage * this.treeCtrl.viewPane.itemsPerPage;
      this.treeCtrl.syncFakeScroller();
    }
  }]);

  return PaginationApi;
}();
// CONCATENATED MODULE: ./src/components/JfTreeComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfTreeComponentvue_type_script_lang_js_ = (JfTreeComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/JfTreeComponent/index.vue?vue&type=style&index=0&id=fae57256&scoped=true&lang=less&
var JfTreeComponentvue_type_style_index_0_id_fae57256_scoped_true_lang_less_ = __webpack_require__("7036");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfTreeComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfTreeComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "fae57256",
  null
  
)

/* harmony default export */ var JfTreeComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.jfTree.js.map