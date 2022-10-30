((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[57],{

/***/ "1892":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.starts-with.js
var es6_string_starts_with = __webpack_require__("f559");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d225");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.promise.finally.js
var es7_promise_finally = __webpack_require__("097d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JfWidgetsLayoutComponent/index.vue?vue&type=script&lang=js&










var TEMPLATE = "\n<div>\n    <div class=\"jf-widgets-layout-container\"  :style=\"containerCss\" @mouseleave=\"onMouseLeave($event)\" @mousemove=\"onMouseMove($event)\" @mousedown=\"onMouseDown($event)\" @mouseup=\"onMouseUp($event)\">\n        <div class=\"widgets-padder\" :style=\"padderCss\">\n            <div v-for=\"rowOrColumn in transformedLayout\" class=\"widgets-row\">\n                <div v-for=\"layoutObj in rowOrColumn\" :style=\"cssRules[layoutObj.cssId]\" class=\"widget-wrapper\" :class=\"{['widget-wrapper-' + widgets[layoutObj.widget].id.toLowerCase()]: true, 'atom': !layoutObj.subLayout}\">\n                    <div v-if=\"!layoutObj.subLayout && editMode\" class=\"edit-mode-actions\" @mousemove=\"onWidgetMouseMove($event)\">\n                        <i class=\"glyphicon glyphicon-asterisk\" v-jf-tooltip=\"'Change'\" @click=\"changeWidget(layoutObj)\"></i>\n                        <i class=\"glyphicon glyphicon-remove-circle\" v-jf-tooltip=\"'Remove'\" v-if=\"getWidgetsCount() > 1\" @click=\"removeWidget(layoutObj)\"></i>\n                        <i class=\"glyphicon glyphicon-resize-vertical\" v-jf-tooltip=\"'Vertical Split'\" @click=\"splitCell(layoutObj,'v')\"></i>\n                        <i class=\"glyphicon glyphicon-resize-horizontal\" v-jf-tooltip=\"'Horizontal Split'\" @click=\"splitCell(layoutObj,'h')\"></i>\n                    </div>\n                    <div v-if=\"!layoutObj.subLayout && editMode && layoutObj.selectWidgetMode\" class=\"select-widget-mode\" @mousemove=\"onWidgetMouseMove($event)\">\n                        <div class=\"widget-selector\">\n                            <jf-ui-select :jf-select-model=\"layoutObj.widget\" jf-select-display-func=\"getWidgetName($item)\" jf-select-placeholder=\"Select A Widget\" jf-select-change=\"onWidgetChange(layoutObj)\" :jf-select-options=\"widgetKeys\"></jf-ui-select>\n                        </div>\n                    </div>\n                    <div v-if=\"!layoutObj.subLayout && (_getRootDirective().transformedLayout.length > 1 || _getRootDirective().transformedLayout[0].length > 1) && options.expandablePanes\" :style=\"{top: top, left: left}\" class=\"expansion-corner-mask\">\n                        <div class=\"expansion-corner-fill\" @click=\"expandPane(layoutObj)\">\n                            <div class=\"icon icon-thin-arrow\" :class=\"{expanded: layoutObj.expanded}\"></div>\n                        </div>\n                    </div>\n                    <div class=\"widget-container\" @mousemove=\"onWidgetMouseMove($event)\" v-if=\"!layoutObj.subLayout\" :style=\"{overflow: widgets[layoutObj.widget].scroll ? 'auto' : 'hidden'}\">\n                        <div v-if=\"widgets[layoutObj.widget] && widgets[layoutObj.widget].showSpinner\" class=\"widget-spinner\">\n                            <div class=\"spinner-msg\">\n                                <div class=\"icon-hourglass\"></div>\n                            </div>\n                        </div>\n                        <div v-if=\"widgets[layoutObj.widget] && widgets[layoutObj.widget].template\" v-show=\"widgets[layoutObj.widget].$compiled || (!widgets[layoutObj.widget].model && !widgets[layoutObj.widget].controller)\">\n                            <div class=\"compile-children\" v-show=\"widgets[layoutObj.widget].$compiled\" :id=\"layoutObj.widget\" v-html=\"widgets[layoutObj.widget].template\"></div>\n                        </div>\n                    </div>\n                    <div v-if=\"layoutObj.subLayout\">\n                        <jf-widgets-layout :layout=\"layoutObj.subLayout\" :widgets=\"widgets\" :options=\"subOptions\" parent-cell=\"layoutObj\"></jf-widgets-layout>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div id=\"home-disclaimer\" v-html=\"footerText\" v-if=\"footerText\"></div>\n    </div>\n</div>\n";
/* harmony default export */ var JfWidgetsLayoutComponentvue_type_script_lang_js_ = ({
  template: TEMPLATE,
  name: 'jf-widgets-layout',
  props: ['widgets', 'layout', 'options', 'parentCell', 'footerText'],
  'jf@inject': ['$scope', '$rootScope', '$compile', '$timeout', '$q', '$templateRequest', '$sce', '$injector', '$element'],
  data: function data() {
    return {
      containerCss: null,
      padderCss: null,
      transformedLayout: null,
      cssRules: null,
      editMode: null,
      widgetKeys: null,
      top: null,
      left: null,
      subOptions: null
    };
  },
  created: function created() {
    this.ANIM_DURATION = 0.5;
  },
  mounted: function mounted() {
    var _this = this;

    this.setDefaultOptions();

    var onChange = function onChange(newval, oldval) {
      if (!newval) return;

      _this.transformLayout();

      _this.updateFlatCells();

      _this.updateCss();

      _this.updateDragLines();

      if (_this.recompile) {
        _this.recompile = false;
        Object.keys(_this.widgets).forEach(function (id) {
          return delete _this.widgets[id].$compiled;
        });
        _this.templatesLoadStarted = false;
        _this.templatesLoaded = false;

        _this.$timeout(function () {
          return _this.compileElements();
        });
      } else if (!_this.templatesLoadStarted || _this.templatesLoaded) {
        Object.keys(_this.widgets).forEach(function (id) {
          if (_this._isWidgetInUse(id)) delete _this.widgets[id].$compiled;
        });

        _this.loadTemplates().then(function () {
          _this.$timeout(function () {
            return _this.compileElements();
          });
        });
      }
    };

    this.$scope.$watch('jfWidgetsLayout.options.editMode', function (editMode) {
      _this.editMode = editMode === undefined ? false : editMode;

      _this.$set(_this.subOptions, 'editMode', _this.editMode);

      if (!editMode) {
        _this.cleanLayout();

        if (!_this.options.isSub) {
          _this.updateLayoutJSON();

          if (_this.wasEditing) {
            if (_this.options.onEditEnd && _this.layoutJSON) _this.options.onEditEnd(_this.layoutJSON);
            _this.recompile = true;
          }
        }
      }

      _this.wasEditing = _this.editMode;
    });
    this.$scope.$watch('jfWidgetsLayout.layout', onChange);
    this.$scope.$watch('jfWidgetsLayout.widgets', function (widgets) {
      if (widgets) {
        _this.widgetKeys = Object.keys(widgets);
      }
    });

    if (this.options.parent && this.parentCell) {
      this.$set(this.parentCell, '$childLayout', this);
    }

    this.$scope.$on('$destroy', function () {
      if (_this.scopes) _this.scopes.forEach(function (s) {
        return s.$destroy();
      });
    });
  },
  ng1_legacy: {
    ng1compileFn: function ng1compileFn(element) {
      return recursiveDirective.compile(element);
    },
    'controllerAs': 'jfWidgetsLayout'
  },
  methods: {
    setDefaultOptions: function setDefaultOptions() {
      if (!this.options) this.options = {};
      if (!this.options.padding) this.$set(this.options, 'padding', 10);
      if (!this.options.minHeight) this.$set(this.options, 'minHeight', 'initial');
      if (!this.options.backColor) this.$set(this.options, 'backColor', 'transparent');
      if (this.options.allowResize === undefined) this.$set(this.options, 'allowResize', false);
      if (this.options.outerPadding === undefined) this.$set(this.options, 'outerPadding', true);
      if (this.options.editMode === undefined) this.$set(this.options, 'editMode', false);
      this.subOptions = _.cloneDeep(this.options);
      this.$set(this.subOptions, 'minHeight', 'initial');
      this.$set(this.subOptions, 'isSub', true);
      this.$set(this.subOptions, 'parent', this);
    },
    transformLayout: function transformLayout() {
      var _this2 = this;

      var _getSizeFromCell = function _getSizeFromCell(cell) {
        var i1 = cell.indexOf('%');
        var i2 = cell.indexOf('px');
        if (i1 !== -1) return cell.substr(0, i1);
        if (i2 !== -1) return cell.substr(0, i2);
      };

      var _getWidgetNameFromCell = function _getWidgetNameFromCell(cell) {
        var i = cell.indexOf('@');
        if (i !== -1) return cell.substr(i + 1);
      };

      var _getSubLayoutFromCell = function _getSubLayoutFromCell(cell) {
        var i = cell.indexOf('#');
        if (i !== -1) return cell.substr(i + 1);
      };

      this.transformedLayout = [];
      var theLayout = this.layout.main || this.layout;

      if (theLayout.rows) {
        this.mainAxis = 'rows';
      } else if (theLayout.columns) {
        this.mainAxis = 'columns';
      } else {
        console.log('Layout Format Error! Must have rows or columns.');
        return;
      }

      theLayout[this.mainAxis].forEach(function (rowOrColumn) {
        var tRowOrColumn = [];
        rowOrColumn.cells.forEach(function (cell) {
          var height = _this2.mainAxis === 'rows' ? rowOrColumn.size : _getSizeFromCell(cell);
          var width = _this2.mainAxis === 'columns' ? rowOrColumn.size : _getSizeFromCell(cell);

          var subLayoutName = _getSubLayoutFromCell(cell);

          var tCell = {
            widget: _getWidgetNameFromCell(cell),
            subLayout: subLayoutName ? _this2.layout[subLayoutName] : undefined,
            percentWidth: parseInt(width),
            percentHeight: parseInt(height)
          };

          if (rowOrColumn.new) {
            _this2.$timeout(function () {
              _this2.splitCell(tCell, _this2.mainAxis === 'columns' ? 'v' : 'h');
            });
          }

          tRowOrColumn.push(tCell);
        });

        _this2.transformedLayout.push(tRowOrColumn);
      });
      this.normalizeSizes();
    },
    updateFlatCells: function updateFlatCells() {
      var _this3 = this;

      this.flatCells = [];
      this.transformedLayout.forEach(function (rowOrColumn) {
        rowOrColumn.forEach(function (cell) {
          _this3.flatCells.push(cell);
        });
      });
    },
    loadTemplates: function loadTemplates() {
      var _this4 = this;

      var defer = this.$q.defer();

      if (this.templatesLoaded) {
        defer.resolve();
        return defer.promise;
      }

      this.templatesLoadStarted = true;
      var fired = 0,
          completed = 0;
      this.transformedLayout.forEach(function (rowOrColumn) {
        rowOrColumn.forEach(function (layoutDef) {
          var widget = _this4.widgets[layoutDef.widget];

          if (widget) {
            if (widget.templateUrl && !widget.template) {
              fired++;

              _this4.$templateRequest(widget.templateUrl).then(function (template) {
                if (!widget.$templateLoaded) {
                  widget.template = _this4.$sce.trustAsHtml(template);
                  widget.$templateLoaded = true;
                }
              }).finally(function () {
                completed++; //                            console.log('completed ' + completed + ' out of ' + fired);

                if (fired === completed) {
                  _this4.templatesLoaded = true;
                  defer.resolve();
                }
              });
            } else if (widget.template) {
              if (!widget.$templateLoaded) {
                widget.template = _this4.$sce.trustAsHtml(widget.template);
                widget.$templateLoaded = true;
              }
            }
          }
        });
      });
      if (!fired) defer.resolve();
      return defer.promise;
    },
    updateCss: function updateCss() {
      var _this5 = this;

      var oldRules = _.cloneDeep(this.cssRules);

      this.cssRules = {};
      var currentX = 0,
          currentY = 0;
      var cssRunningId = 0;
      this.transformedLayout.forEach(function (rowOrColumn) {
        if (_this5.mainAxis === 'rows') currentX = 0;else if (_this5.mainAxis === 'columns') currentY = 0;
        var topSize = 0;
        rowOrColumn.forEach(function (layoutDef) {
          var widget = _this5.widgets[layoutDef.widget];
          layoutDef.cssId = cssRunningId;

          if (!widget) {
            layoutDef.widget = '$widget' + cssRunningId;
          }

          cssRunningId++;
          _this5.cssRules[layoutDef.cssId] = {
            top: currentY + '%',
            left: currentX + '%',
            bottom: 100 - (currentY + layoutDef.percentHeight) + '%',
            right: 100 - (currentX + layoutDef.percentWidth) + '%',
            padding: _this5.options.padding / 2 + 'px',
            opacity: oldRules && oldRules[layoutDef.cssId] && oldRules[layoutDef.cssId].opacity !== undefined ? oldRules[layoutDef.cssId].opacity : 1
          };

          if (_this5.mainAxis === 'rows') {
            currentX += layoutDef.percentWidth;
            if (layoutDef.percentHeight > topSize) topSize = layoutDef.percentHeight;
          } else if (_this5.mainAxis === 'columns') {
            currentY += layoutDef.percentHeight;
            if (layoutDef.percentWidth > topSize) topSize = layoutDef.percentWidth;
          }
        });
        if (_this5.mainAxis === 'rows') currentY += topSize;else if (_this5.mainAxis === 'columns') currentX += topSize;
      });
      var pad = this.options.isSub ? 0 : this.options.outerPadding ? this.options.padding / 2 : -this.options.padding / 2;
      this.padderCss = {
        top: pad + 'px',
        left: pad + 'px',
        bottom: pad + 'px',
        right: pad + 'px'
      };
      this.containerCss = {
        'min-height': this.options.minHeight + 'px',
        'background-color': this.options.backColor,
        'overflow': this.options.isSub && this.editMode ? 'visible' : 'hidden'
      };
      if (this.options.parent) this.options.parent.updateCss();
    },
    updateDragLines: function updateDragLines() {
      this.dragLines = [];

      for (var key in this.cssRules) {
        var rules = this.cssRules[key];
        var top = parseFloat(rules.top);
        var bottom = parseFloat(rules.bottom);
        var left = parseFloat(rules.left);
        var right = parseFloat(rules.right);

        var cell = _.find(this.flatCells, {
          cssId: parseInt(key)
        });

        this.addLinesFromRect({
          x1: left,
          y1: top,
          x2: 100 - right,
          y2: 100 - bottom,
          cssRules: rules,
          widget: cell.widget
        });
        cell.percentWidth = 100 - right - left;
        cell.percentHeight = 100 - bottom - top;
      }
    },
    compileElements: function compileElements() {
      var _this6 = this;

      var elems = $('.compile-children');
      if (this.scopes) this.scopes.forEach(function (s) {
        return s.$destroy();
      });
      this.scopes = [];

      for (var i = 0; i < elems.length; i++) {
        var elem = $(elems[i]);
        var widgetId = elem.prop('id');

        if (this._isWidgetInUse(widgetId)) {
          (function () {
            var widget = _this6._getWidgetById(widgetId);

            var scope = _this6.$rootScope.$new();

            _this6.scopes.push(scope);

            var children = elem.children();

            if (widget.model) {
              _.extend(scope, widget.model);
            }

            if (_this6.options.sharedModel) {
              _.extend(scope, _this6.options.sharedModel);
            }

            if (!widget.controller) {
              widget.controller = function Ctrl() {
                Object(classCallCheck["a" /* default */])(this, Ctrl);
              };
            }

            widget.controller.prototype.$widgetLayoutManager = _this6;

            var controllerInstance = _this6.$injector.instantiate(widget.controller);

            controllerInstance.$element = children[0];
            controllerInstance.$layoutObject = _this6._getLayoutByWidget(elem.prop('id'));
            controllerInstance.$scope = scope;
            controllerInstance.$widgetObject = widget;
            var controllerObject = {};
            controllerObject[widget.controllerAs || 'ctrl'] = controllerInstance;

            _.extend(scope, controllerObject);

            if (controllerInstance.$onInit) controllerInstance.$onInit(); //We compile only first child, templates should have only one root element!

            var rootChild = $(children[0]);

            if (!rootChild.prop('compiled')) {
              _this6.$compile(rootChild)(scope);

              rootChild.prop('compiled', true);
            }

            _this6.$timeout(function () {
              widget.$compiled = true;
            });
          })();
        }
      }
    },
    _getWidgetById: function _getWidgetById(id) {
      var widget = this.widgets[id];
      return widget;
    },
    _getLayoutByWidget: function _getLayoutByWidget(id) {
      var layout;

      for (var i in this.transformedLayout) {
        var rowOrColumn = this.transformedLayout[i];
        layout = _.find(rowOrColumn, {
          widget: id
        });
        if (layout) break;
      }

      return layout;
    },
    _isWidgetInUse: function _isWidgetInUse(widgetId) {
      return !!_.find(this.flatCells, {
        widget: widgetId
      });
    },
    _getPrecPoint: function _getPrecPoint(e) {
      var container = $(this.$element).find('.jf-widgets-layout-container');
      var containerWidth = container.innerWidth();
      var containerHeight = container.innerHeight();
      var mouseX = e.pageX - container.offset().left;
      var mouseY = e.pageY - container.offset().top;
      var xprec = Math.round(mouseX / containerWidth * 100);
      var yprec = Math.round(mouseY / containerHeight * 100);
      return {
        x: xprec,
        y: yprec
      };
    },
    onMouseMove: function onMouseMove(e) {
      if (!this.options.allowResize && !this.editMode) return;

      if (this.draggingLines) {
        this.onDrag(e);
        e.preventDefault();
      } else {
        var container = $(this.$element).find('.jf-widgets-layout-container');

        var prec = this._getPrecPoint(e);

        this.closestLines = this.getClosestLines(prec.x, prec.y);

        if (this.closestLines.length) {
          var directions = _.map(this.closestLines, 'cssRelevantRule');

          var cursor;

          if (_.includes(directions, 'right') && _.includes(directions, 'left') && _.includes(directions, 'top') && _.includes(directions, 'bottom')) {
            cursor = 'all-scroll';
            this.setSubIsOnEdge(true);
          } else if (_.includes(directions, 'top') && _.includes(directions, 'bottom')) {
            cursor = 'row-resize';
            this.setSubIsOnEdge(true);
          } else if (_.includes(directions, 'right') && _.includes(directions, 'left')) {
            cursor = 'col-resize';
            this.setSubIsOnEdge(true);
          } else {
            cursor = 'default';
            this.setSubIsOnEdge(false);
          }

          container.css('cursor', cursor);
        } else {
          if (!this.subIsOnEdge) {
            container.css('cursor', 'default');
            this.setSubIsOnEdge(false);
          }
        }
      }
    },
    onMouseLeave: function onMouseLeave(e) {
      if (!this.options.allowResize && !this.editMode) return;
      this.onMouseUp();
      this.setSubIsOnEdge(false);
    },
    onDrag: function onDrag(e) {
      var perc = this._getPrecPoint(e);

      var xDiff = perc.x - this.dragStartPt.x;
      var yDiff = perc.y - this.dragStartPt.y;
      var okToDrag = true;

      for (var i in this.closestLines) {
        var line = this.closestLines[i];
        var origLine = this.dragStartLines[i];
        var top = parseFloat(origLine.cssRules.top);
        var bottom = parseFloat(origLine.cssRules.bottom);
        var left = parseFloat(origLine.cssRules.left);
        var right = parseFloat(origLine.cssRules.right);

        var originalHeight = this._getLayoutByWidget(line.widget).percentHeight;

        var originalWidth = this._getLayoutByWidget(line.widget).percentWidth;

        if (line.cssRelevantRule === 'top') {
          var newTop = top + yDiff;
          var newHeight = 100 - bottom - newTop;

          if (newHeight < 0.2 * originalHeight) {
            okToDrag = false;
            break;
          }
        } else if (line.cssRelevantRule === 'bottom') {
          var newBottom = bottom - yDiff;

          var _newHeight = 100 - newBottom - top;

          if (_newHeight < 0.2 * originalHeight) {
            okToDrag = false;
            break;
          }
        } else if (line.cssRelevantRule === 'left') {
          var newLeft = left + xDiff;
          var newWidth = 100 - right - newLeft;

          if (newWidth < 0.2 * originalWidth) {
            okToDrag = false;
            break;
          }
        } else if (line.cssRelevantRule === 'right') {
          var newRight = right - xDiff;

          var _newWidth = 100 - newRight - left;

          if (_newWidth < 0.2 * originalWidth) {
            okToDrag = false;
            break;
          }
        }
      }

      if (okToDrag) {
        for (var _i in this.closestLines) {
          var _line = this.closestLines[_i];
          if (!this.ensureCSSRulesSync(_line, e)) break;
          var _origLine = this.dragStartLines[_i];

          if (_line.cssRelevantRule === 'top') {
            var _top = parseFloat(_origLine.cssRules.top);

            _line.cssRules.top = _top + yDiff + '%';
          } else if (_line.cssRelevantRule === 'bottom') {
            var _bottom = parseFloat(_origLine.cssRules.bottom);

            _line.cssRules.bottom = _bottom - yDiff + '%';
          } else if (_line.cssRelevantRule === 'left') {
            var _left = parseFloat(_origLine.cssRules.left);

            _line.cssRules.left = _left + xDiff + '%';
          } else if (_line.cssRelevantRule === 'right') {
            var _right = parseFloat(_origLine.cssRules.right);

            _line.cssRules.right = _right - xDiff + '%';
          }
        }
      }
    },
    ensureCSSRulesSync: function ensureCSSRulesSync(line, e) {
      // Very hacky solution TODO: Find a better solution!
      var found = false;

      for (var key in this.cssRules) {
        if (this.cssRules[key] === line.cssRules) {
          found = true;
          break;
        }
      }

      if (!found) {
        this.onMouseUp();
        this.onMouseMove(e);
        this.onMouseDown(e);
        this.onMouseMove(e);
        return false;
      }

      return true;
    },
    onMouseDown: function onMouseDown(e) {
      if (!this.options.allowResize && !this.editMode) return;

      if (this.closestLines && this.closestLines.length) {
        this.draggingLines = true;
        this.dragStartPt = _.cloneDeep(this._getPrecPoint(e));
        this.dragStartLines = _.cloneDeep(this.closestLines);

        this._setTransitions(false);

        e.preventDefault();
        e.stopPropagation();
      }
    },
    onMouseUp: function onMouseUp(e) {
      if (!this.options.allowResize && !this.editMode) return;
      this.updateDragLines();
      this.closestLines = null;
      this.draggingLines = false;
      this.dragStartPt = null;
      this.dragStartLines = null;
      if (e) this._setTransitions(true);
    },
    onWidgetMouseMove: function onWidgetMouseMove(e) {
      if (!this.options.allowResize && !this.editMode) return;
      if (this.draggingLines || this.isParentDragging()) return;
      var container = $(this.$element).find('.jf-widgets-layout-container');

      if (!this.subIsOnEdge) {
        container.css('cursor', 'default');
        this.setSubIsOnEdge(false);
      }

      e.stopPropagation();
    },
    addLinesFromRect: function addLinesFromRect(rect) {
      this.dragLines.push({
        x1: rect.x1,
        y1: rect.y1,
        x2: rect.x2,
        y2: rect.y1,
        cssRules: rect.cssRules,
        widget: rect.widget,
        cssRelevantRule: 'top'
      });
      this.dragLines.push({
        x1: rect.x2,
        y1: rect.y1,
        x2: rect.x2,
        y2: rect.y2,
        cssRules: rect.cssRules,
        widget: rect.widget,
        cssRelevantRule: 'right'
      });
      this.dragLines.push({
        x1: rect.x1,
        y1: rect.y2,
        x2: rect.x2,
        y2: rect.y2,
        cssRules: rect.cssRules,
        widget: rect.widget,
        cssRelevantRule: 'bottom'
      });
      this.dragLines.push({
        x1: rect.x1,
        y1: rect.y1,
        x2: rect.x1,
        y2: rect.y2,
        cssRules: rect.cssRules,
        widget: rect.widget,
        cssRelevantRule: 'left'
      });
    },
    getClosestLines: function getClosestLines(x, y) {
      var _this7 = this;

      var closest = [];
      this.dragLines.forEach(function (line) {
        var infinite = (line.cssRelevantRule === 'bottom' || line.cssRelevantRule === 'top') && _this7.mainAxis === 'rows' || (line.cssRelevantRule === 'right' || line.cssRelevantRule === 'left') && _this7.mainAxis === 'columns';

        var dist = _this7.getPointDistToLine({
          x: x,
          y: y
        }, line, infinite);

        if (dist <= 1) closest.push(line);
      });
      var filtered = [];

      var top = _.filter(closest, {
        cssRelevantRule: 'top'
      });

      var bottom = _.filter(closest, {
        cssRelevantRule: 'bottom'
      });

      var left = _.filter(closest, {
        cssRelevantRule: 'left'
      });

      var right = _.filter(closest, {
        cssRelevantRule: 'right'
      });

      top.forEach(function (line) {
        var matches = _this7.mainAxis === 'rows' ? _.filter(bottom, {
          y1: line.y1
        }) : _.filter(bottom, {
          x1: line.x1,
          x2: line.x2
        });

        if (matches.length) {
          filtered.push(line);
          matches.forEach(function (match) {
            return filtered.push(match);
          });
        }
      });
      left.forEach(function (line) {
        var matches = _this7.mainAxis === 'columns' ? _.filter(right, {
          x1: line.x1
        }) : _.filter(right, {
          y1: line.y1,
          y2: line.y2
        });

        if (matches.length) {
          filtered.push(line);
          matches.forEach(function (match) {
            return filtered.push(match);
          });
        }
      });
      return filtered;
    },
    getPointDistToLine: function getPointDistToLine(pt, line, infiniteLine) {
      if (line.x1 === line.x2) {
        if (infiniteLine) return Math.abs(pt.x - line.x1);else if (pt.y < line.y1) return this.getPointDistToPoint(pt, {
          x: line.x1,
          y: line.y1
        });else if (pt.y > line.y2) return this.getPointDistToPoint(pt, {
          x: line.x2,
          y: line.y2
        });else return Math.abs(pt.x - line.x1);
      } else if (line.y1 === line.y2) {
        if (infiniteLine) return Math.abs(pt.y - line.y1);
        if (pt.x < line.x1) return this.getPointDistToPoint(pt, {
          x: line.x1,
          y: line.y1
        });else if (pt.x > line.x2) return this.getPointDistToPoint(pt, {
          x: line.x2,
          y: line.y2
        });else return Math.abs(pt.y - line.y1);
      }
    },
    getPointDistToPoint: function getPointDistToPoint(pt1, pt2) {
      return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
    },
    setSubIsOnEdge: function setSubIsOnEdge(onEdge) {
      var parent = this.options.parent;

      while (parent) {
        parent.subIsOnEdge = onEdge;
        parent = parent.options.parent;
      }
    },
    isParentDragging: function isParentDragging() {
      var recurse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var parent = this.options.parent;
      if (parent) return parent.draggingLines || parent.isParentDragging(true);else return recurse ? this.draggingLines : false;
    },
    removeWidget: function removeWidget(layoutObj) {
      this._setTransitions(true);

      var rowOrColumnToRemove = null;
      this.transformedLayout.forEach(function (rowOrColumn) {
        var index = _.indexOf(rowOrColumn, layoutObj);

        if (index !== -1) {
          rowOrColumn.splice(index, 1);

          if (rowOrColumn.length === 0) {
            rowOrColumnToRemove = rowOrColumn;
          }
        }
      });

      if (rowOrColumnToRemove) {
        var index = _.indexOf(this.transformedLayout, rowOrColumnToRemove);

        this.transformedLayout.splice(index, 1);
      }

      if (this.transformedLayout.length === 0) {
        if (this.options.isSub) {
          var parentLayoutObj = _.find(this.options.parent.flatCells, {
            subLayout: this.layout
          });

          this.options.parent.removeWidget(parentLayoutObj);
        }
      }

      this.megaRefresh();
    },
    normalizeSizes: function normalizeSizes() {
      var _this8 = this;

      var totalSizeMajor = 0;
      this.transformedLayout.forEach(function (rowOrColumn) {
        var totalSizeMinor = 0;
        var totalSizeMajorAdd = 0;
        rowOrColumn.forEach(function (cell) {
          totalSizeMinor += _this8.mainAxis === 'columns' ? cell.percentHeight : cell.percentWidth;
          var major = _this8.mainAxis === 'columns' ? cell.percentWidth : cell.percentHeight;
          totalSizeMajorAdd = major > totalSizeMajorAdd ? major : totalSizeMajorAdd;
        });
        totalSizeMajor += totalSizeMajorAdd;

        if (totalSizeMinor !== 100) {
          rowOrColumn.forEach(function (cell) {
            if (_this8.mainAxis === 'columns') {
              cell.percentHeight = 100 * cell.percentHeight / totalSizeMinor;
            } else {
              cell.percentWidth = 100 * cell.percentWidth / totalSizeMinor;
            }
          });
        }
      });

      if (totalSizeMajor !== 100) {
        this.transformedLayout.forEach(function (rowOrColumn) {
          rowOrColumn.forEach(function (cell) {
            if (_this8.mainAxis === 'columns') {
              cell.percentWidth = 100 * cell.percentWidth / totalSizeMajor;
            } else {
              cell.percentHeight = 100 * cell.percentHeight / totalSizeMajor;
            }
          });
        });
      }
    },
    splitCell: function splitCell(layoutObj, orientation) {
      var _this9 = this;

      this._setTransitions(true);

      this.transformedLayout.forEach(function (rowOrColumn) {
        var index = _.indexOf(rowOrColumn, layoutObj);

        if (index !== -1) {
          var clone = angular.copy(layoutObj);

          if (orientation === 'h' && _this9.mainAxis === 'rows' || orientation === 'v' && _this9.mainAxis === 'columns') {
            var attr = orientation === 'h' ? 'percentWidth' : 'percentHeight';
            layoutObj[attr] /= 2;
            clone[attr] /= 2;
            rowOrColumn.splice(index + 1, 0, clone);
            clone.selectWidgetMode = true;
          } else {
            delete layoutObj.widget;
            layoutObj.subLayout = {};
            var axis = _this9.mainAxis === 'columns' ? 'rows' : 'columns';
            layoutObj.subLayout[axis] = [{
              size: '100%',
              cells: ['100% @' + clone.widget],
              new: true
            }];
          }
        }
      });
      this.megaRefresh();
    },
    megaRefresh: function megaRefresh() {
      var _this10 = this;

      this.updateFlatCells();
      this.normalizeSizes();
      this.updateCss();
      this.updateDragLines();
      this.loadTemplates().then(function () {
        _this10.$timeout(function () {
          return _this10.compileElements();
        });
      });
    },
    changeWidget: function changeWidget(layoutObj) {
      layoutObj.selectWidgetMode = !layoutObj.selectWidgetMode;
      this.updateCss();
    },
    onWidgetChange: function onWidgetChange(layoutObj) {
      layoutObj.selectWidgetMode = false;
      this.templatesLoaded = false;
      this.megaRefresh();
    },
    getWidgetName: function getWidgetName(key) {
      return this.widgets[key] ? this.widgets[key].name || key : '';
    },
    updateLayoutJSON: function updateLayoutJSON() {
      var _this11 = this;

      if (!this.transformedLayout) return;
      this.layoutJSON = {};
      this.layoutJSON.main = {};
      this.layoutJSON.main[this.mainAxis] = [];
      var subLayoutCounter = 0;
      this.transformedLayout.forEach(function (rowOrColumn) {
        var rowOrColumnObject = {};
        rowOrColumn.forEach(function (cell) {
          if (!rowOrColumnObject.size) rowOrColumnObject.size = cell[_this11.mainAxis === 'columns' ? 'percentWidth' : 'percentHeight'] + '%';
          if (!rowOrColumnObject.cells) rowOrColumnObject.cells = [];
          var cellString = '';
          cellString += cell[_this11.mainAxis === 'columns' ? 'percentHeight' : 'percentWidth'] + '%';
          if (cell.widget && !cell.widget.startsWith('$')) cellString += ' @' + cell.widget;

          if (cell.$childLayout) {
            cell.$childLayout.updateLayoutJSON();
            var subName = 'sub' + subLayoutCounter;
            subLayoutCounter++;
            _this11.layoutJSON[subName] = cell.$childLayout.layoutJSON;
            cellString += ' #' + subName;
          }

          rowOrColumnObject.cells.push(cellString);
        });

        _this11.layoutJSON.main[_this11.mainAxis].push(rowOrColumnObject);
      });
    },
    getWidgetsCount: function getWidgetsCount() {
      return $('.widget-container').length;
    },
    _setTransitions: function _setTransitions(active) {
      if (active) {
        $('.widgets-padder .widget-wrapper').css('transition', "all ".concat(this.ANIM_DURATION, "s ease-out"));
      } else {
        $('.widgets-padder .widget-wrapper').css('transition', 'none');
      }
    },
    _getRootDirective: function _getRootDirective() {
      if (!this.options.parent) return this;else return this.options.parent._getRootDirective();
    },
    cleanLayout: function cleanLayout() {
      if (!this.transformedLayout) return; // Remove empty layout directives from parent

      if (!this.transformedLayout.length && this.options.parent) {
        var parentLayoutObj = _.find(this.options.parent.flatCells, {
          subLayout: this.layout
        });

        this.options.parent.removeWidget(parentLayoutObj);
      } // In case this directive is a sub and only has one widget in one cell, we move the widget to parent
      else if (this.transformedLayout.length === 1 && this.transformedLayout[0].length === 1 && this.transformedLayout[0][0].percentHeight === 100 && this.transformedLayout[0][0].percentWidth === 100 && this.options.parent) {
        var _parentLayoutObj = _.find(this.options.parent.flatCells, {
          subLayout: this.layout
        });

        var axis = Object.keys(_parentLayoutObj.subLayout)[0];

        if (!_parentLayoutObj.subLayout[axis][0] || _parentLayoutObj.subLayout[axis][0] && !_parentLayoutObj.subLayout[axis][0].new) {
          if (this.transformedLayout[0][0].widget) {
            _parentLayoutObj.widget = this.transformedLayout[0][0].widget;
            delete _parentLayoutObj.subLayout;
            delete _parentLayoutObj.$childLayout;
          } else if (this.transformedLayout[0][0].subLayout) {
            _parentLayoutObj.subLayout = this.transformedLayout[0][0].subLayout;
            delete _parentLayoutObj.widget;
          }
        }
      } // In case this directive is the root and only has one sub in one cell, we move the sub data to this
      else if (this.transformedLayout.length === 1 && this.transformedLayout[0].length === 1 && this.transformedLayout[0][0].percentHeight === 100 && this.transformedLayout[0][0].percentWidth === 100 && this.transformedLayout[0][0].subLayout && !this.options.parent) {
        console.log('pre', JSON.stringify(this.layout));
        var theSub = this.transformedLayout[0][0].subLayout;
        this.layout = theSub;
        console.log('post', JSON.stringify(this.layout));
        this.transformLayout();
        this.cleanLayout();
      }
    },
    expandPane: function expandPane(layoutObj) {
      var _this12 = this;

      var expanding = this.$expanded = !this.$expanded ? layoutObj : null;
      this.transformedLayout.forEach(function (rowOrColumn) {
        rowOrColumn.forEach(function (cell) {
          if (expanding) {
            cell.dimBeforeExpansion = {
              width: cell.percentWidth,
              height: cell.percentHeight
            };

            if (cell === layoutObj) {
              cell.percentWidth = cell.percentHeight = 100;
            } else {
              _this12.cssRules[cell.cssId].opacity = 0;
              var onTheSameRowOrColumn = rowOrColumn.indexOf(layoutObj) !== -1;

              if (onTheSameRowOrColumn) {
                cell[_this12.mainAxis === 'columns' ? 'percentHeight' : 'percentWidth'] = 0;
                cell[_this12.mainAxis === 'rows' ? 'percentHeight' : 'percentWidth'] = 100;
              } else {
                cell[_this12.mainAxis === 'rows' ? 'percentHeight' : 'percentWidth'] = 0;
                cell[_this12.mainAxis === 'columns' ? 'percentHeight' : 'percentWidth'] = 100;
              }
            }
          } else {
            cell.percentWidth = cell.dimBeforeExpansion.width;
            cell.percentHeight = cell.dimBeforeExpansion.height;
            delete cell.dimBeforeExpansion;
          }
        });
      });

      if (expanding) {
        this.$timeout(function () {
          _this12.updateCss();
        }, this.ANIM_DURATION * 1000);
      } else {
        this.updateCss();
        this.$timeout(function () {
          _this12.transformedLayout.forEach(function (rowOrColumn) {
            rowOrColumn.forEach(function (cell) {
              _this12.cssRules[cell.cssId].opacity = 1;
            });
          });
        }, this.ANIM_DURATION * 1000);
      }

      if (this.options.parent && this.parentCell) {
        this.options.parent.expandPane(this.parentCell);
      }

      layoutObj.expanded = !layoutObj.expanded;
    }
  }
});
// CONCATENATED MODULE: ./src/components/JfWidgetsLayoutComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_JfWidgetsLayoutComponentvue_type_script_lang_js_ = (JfWidgetsLayoutComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JfWidgetsLayoutComponent/index.vue
var render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_JfWidgetsLayoutComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "92e4184e",
  null
  
)

/* harmony default export */ var JfWidgetsLayoutComponent = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.jfWidgetsLayout.js.map