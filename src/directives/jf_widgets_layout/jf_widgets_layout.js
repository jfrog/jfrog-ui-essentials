export function jfWidgetsLayout(recursiveDirective) {
	'ngInject';
    return {
        controller: jfWidgetsLayoutController,
        controllerAs: 'jfWidgetsLayout',
        bindToController: true,
        scope: {
            widgets: '=',
            layout: '=',
            options: '=',
            parentCell: '=?',
            footerText: '='
        },
        templateUrl: 'directives/jf_widgets_layout/jf_widgets_layout.html',
        compile: (element) => {
            return recursiveDirective.compile(element);
        }
    }
}

class jfWidgetsLayoutController {
	/* @ngInject */
    constructor($scope,$rootScope, $compile,$timeout,$q,$templateRequest,$sce, $injector,$element) {
        this.$q = $q;
        this.$sce = $sce;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$element = $element;
        this.$injector = $injector;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.$templateRequest = $templateRequest;
        this.ANIM_DURATION = .5;
    }

    $onInit() {
        this.setDefaultOptions();

        let onChange = (newval,oldval) => {
            if (!newval) return;
            this.transformLayout();
            this.updateFlatCells();
            this.updateCss();
            this.updateDragLines();
            if (this.recompile) {
                this.recompile = false;
                Object.keys(this.widgets).forEach(id=>delete this.widgets[id].$compiled);
                this.templatesLoadStarted = false;
                this.templatesLoaded = false;
                this.$timeout(()=>this.compileElements());
            }
            else if (!this.templatesLoadStarted || this.templatesLoaded) {
                Object.keys(this.widgets).forEach(id=>{
                    if (this._isWidgetInUse(id)) delete this.widgets[id].$compiled;
                });
                this.loadTemplates().then(()=>{
                    this.$timeout(()=>this.compileElements());
                })
            }
        };
        this.$scope.$watch('jfWidgetsLayout.options.editMode', (editMode) => {
            this.editMode = editMode === undefined ? false : editMode;
            this.subOptions.editMode = this.editMode;

            if (!editMode) {
                this.cleanLayout();
                if (!this.options.isSub) {
                    this.updateLayoutJSON();

                    if (this.wasEditing) {
                        if (this.options.onEditEnd && this.layoutJSON) this.options.onEditEnd(this.layoutJSON);
                        this.recompile = true;
                    }
                }
            }
            this.wasEditing = this.editMode;
        });

        this.$scope.$watch('jfWidgetsLayout.layout', onChange);

        this.$scope.$watch('jfWidgetsLayout.widgets', (widgets) => {
            if (widgets) {
                this.widgetKeys = Object.keys(widgets);
            }
        });

        if (this.options.parent && this.parentCell) {
            this.parentCell.$$childLayout = this;
        }

        this.$scope.$on('$destroy',()=>{
            if (this.scopes) this.scopes.forEach(s=>s.$destroy());
        })
    }


    setDefaultOptions() {
        if (!this.options) this.options = {}
        if (!this.options.padding) this.options.padding = 10;
        if (!this.options.minHeight) this.options.minHeight = 'initial';
        if (!this.options.backColor) this.options.backColor = 'transparent';
        if (this.options.allowResize === undefined) this.options.allowResize = false;
        if (this.options.outerPadding === undefined) this.options.outerPadding = true;
        if (this.options.editMode === undefined) this.options.editMode = false;

        this.subOptions = _.cloneDeep(this.options);
        this.subOptions.minHeight = 'initial';
        this.subOptions.isSub = true;
        this.subOptions.parent = this;
    }

    transformLayout() {

        let _getSizeFromCell = (cell) => {
            let i1 = cell.indexOf('%');
            let i2 = cell.indexOf('px');
            if (i1 !== -1) return cell.substr(0,i1);
            if (i2 !== -1) return cell.substr(0,i2);
        };
        let _getWidgetNameFromCell = (cell) => {
            let i = cell.indexOf('@');
            if (i !== -1) return cell.substr(i+1);
        };
        let _getSubLayoutFromCell = (cell) => {
            let i = cell.indexOf('#');
            if (i !== -1) return cell.substr(i+1);
        };

        this.transformedLayout = [];

        let theLayout = this.layout.main || this.layout;

        if (theLayout.rows) {
            this.mainAxis = 'rows';
        }
        else if (theLayout.columns) {
            this.mainAxis = 'columns';
        }
        else {
            console.log('Layout Format Error! Must have rows or columns.');
            return;
        }

        theLayout[this.mainAxis].forEach((rowOrColumn)=>{
            let tRowOrColumn = [];
            rowOrColumn.cells.forEach((cell)=>{
                let height = this.mainAxis === 'rows' ? rowOrColumn.size : _getSizeFromCell(cell);
                let width = this.mainAxis === 'columns' ? rowOrColumn.size : _getSizeFromCell(cell);
                let subLayoutName = _getSubLayoutFromCell(cell);
                let tCell = {
                    widget: _getWidgetNameFromCell(cell),
                    subLayout: subLayoutName ? this.layout[subLayoutName] : undefined,
                    percentWidth: parseInt(width),
                    percentHeight: parseInt(height)
                };
                if (rowOrColumn.new) {
                    this.$timeout(()=>{
                        this.splitCell(tCell,this.mainAxis === 'columns' ? 'v' : 'h');
                    })
                }
                tRowOrColumn.push(tCell);
            })
            this.transformedLayout.push(tRowOrColumn);
        })

        this.normalizeSizes();

    }
    updateFlatCells() {
        this.flatCells = [];
        this.transformedLayout.forEach((rowOrColumn) => {
            rowOrColumn.forEach((cell)=> {
                this.flatCells.push(cell);
            })
        })
    }

    loadTemplates() {
        let defer = this.$q.defer();

        if (this.templatesLoaded) {
            defer.resolve();
            return defer.promise;
        }

        this.templatesLoadStarted = true;
        let fired = 0, completed = 0;
        this.transformedLayout.forEach((rowOrColumn) => {
            rowOrColumn.forEach((layoutDef) => {
                let widget = this.widgets[layoutDef.widget];
                if (widget) {
                    if (widget.templateUrl && !widget.template) {
                        fired++;
                        this.$templateRequest(widget.templateUrl)
                            .then((template) => {
                                if (!widget.$templateLoaded) {
                                    widget.template = this.$sce.trustAsHtml(template);
                                    widget.$templateLoaded = true;
                                }
                            })
                            .finally(()=>{
                                completed++;
//                            console.log('completed ' + completed + ' out of ' + fired);
                                if (fired === completed) {
                                    this.templatesLoaded = true;
                                    defer.resolve();
                                }
                            })
                    }
                    else if (widget.template) {
                        if (!widget.$templateLoaded) {
                            widget.template = this.$sce.trustAsHtml(widget.template)
                            widget.$templateLoaded = true;
                        }
                    }
                }
            });
        });

        if (!fired) defer.resolve();
        return defer.promise;
    }

    updateCss() {
        let oldRules = _.cloneDeep(this.cssRules);
        this.cssRules = {};

        let currentX = 0, currentY = 0;
        let cssRunningId = 0;

        this.transformedLayout.forEach((rowOrColumn) => {
            if (this.mainAxis === 'rows') currentX = 0;
            else if (this.mainAxis === 'columns') currentY = 0;
            let topSize = 0;
            rowOrColumn.forEach((layoutDef) => {
                let widget = this.widgets[layoutDef.widget];
                layoutDef.cssId = cssRunningId;
                if (!widget) {
                    layoutDef.widget = '$$widget'+cssRunningId;
                }
                cssRunningId++;

                this.cssRules[layoutDef.cssId] = {
                    top: currentY + '%',
                    left: currentX + '%',
                    bottom: (100 - (currentY + layoutDef.percentHeight)) + '%',
                    right: (100 - (currentX + layoutDef.percentWidth)) + '%',
                    padding: (this.options.padding/2) + 'px',
                    opacity: (oldRules && oldRules[layoutDef.cssId] && oldRules[layoutDef.cssId].opacity !== undefined) ? oldRules[layoutDef.cssId].opacity : 1
                };

                if (this.mainAxis === 'rows') {
                    currentX += layoutDef.percentWidth;
                    if (layoutDef.percentHeight > topSize) topSize = layoutDef.percentHeight;
                }
                else if (this.mainAxis === 'columns') {
                    currentY += layoutDef.percentHeight;
                    if (layoutDef.percentWidth > topSize) topSize = layoutDef.percentWidth;
                }

            })
            if (this.mainAxis === 'rows') currentY += topSize;
            else if (this.mainAxis === 'columns') currentX += topSize;
        })

        let pad = this.options.isSub ? 0 : (this.options.outerPadding ? this.options.padding/2 : -this.options.padding/2);
        this.padderCss = {
            top: pad + 'px',
            left: pad + 'px',
            bottom: pad + 'px',
            right: pad + 'px'
        }

        this.containerCss = {
            'min-height': this.options.minHeight + 'px',
            'background-color': this.options.backColor,
            'overflow': this.options.isSub && this.editMode ? 'visible' : 'hidden'
        }

        if (this.options.parent) this.options.parent.updateCss();
    }

    updateDragLines() {
        this.dragLines = [];
        for (let key in this.cssRules) {
            let rules = this.cssRules[key];
            let top = parseFloat(rules.top);
            let bottom = parseFloat(rules.bottom);
            let left = parseFloat(rules.left);
            let right = parseFloat(rules.right);
            let cell = _.find(this.flatCells,{cssId: parseInt(key)});
            this.addLinesFromRect({
                x1: left,
                y1: top,
                x2: 100-right,
                y2: 100-bottom,
                cssRules: rules,
                widget: cell.widget
            });
            cell.percentWidth = (100-right) - left;
            cell.percentHeight = (100-bottom) - top;
        }

    }

    compileElements() {
        let elems = $('.compile-children');
        if (this.scopes) this.scopes.forEach(s=>s.$destroy());
        this.scopes = [];
        for (let i = 0; i< elems.length; i++) {
            let elem = $(elems[i]);
            let widgetId = elem.prop('id');
            if (this._isWidgetInUse(widgetId)) {
                let widget = this._getWidgetById(widgetId);
                let scope = this.$rootScope.$new();

                this.scopes.push(scope);

                let children = elem.children();

                if (widget.model) {
                    _.extend(scope,widget.model);
                }
                if (this.options.sharedModel) {
                    _.extend(scope,this.options.sharedModel);
                }
                if (!widget.controller) {
                    widget.controller = class Ctrl {}
                }

                widget.controller.prototype.$widgetLayoutManager = this;

                let controllerInstance = this.$injector.instantiate(widget.controller);

                controllerInstance.$element = children[0];
                controllerInstance.$layoutObject = this._getLayoutByWidget(elem.prop('id'));
                controllerInstance.$scope = scope;
                controllerInstance.$widgetObject = widget;

                let controllerObject = {};
                controllerObject[widget.controllerAs || 'ctrl'] = controllerInstance;

                _.extend(scope,controllerObject);


                if (controllerInstance.$onInit) controllerInstance.$onInit();

                //We compile only first child, templates should have only one root element!
                let rootChild = $(children[0]);
                if (!rootChild.prop('compiled')) {
                    this.$compile(rootChild)(scope);
                    rootChild.prop('compiled',true);
                }

                this.$timeout(()=>{
                    widget.$compiled=true;
                });

            }
        }
    }
    _getWidgetById(id) {
        let widget = this.widgets[id];
        return widget;
    }
    _getLayoutByWidget(id) {
        let layout;

        for (let i in this.transformedLayout) {
            let rowOrColumn = this.transformedLayout[i];
            layout = _.find(rowOrColumn, {widget: id});
            if (layout) break;
        }

        return layout;
    }

    _isWidgetInUse(widgetId) {
        return !!_.find(this.flatCells,{widget: widgetId});
    }


    _getPrecPoint(e) {
        let container = $(this.$element).find('.jf-widgets-layout-container');

        let containerWidth = container.innerWidth();
        let containerHeight = container.innerHeight();

        let mouseX = e.pageX - container.offset().left;
        let mouseY = e.pageY - container.offset().top;

        let xprec = Math.round((mouseX / containerWidth) * 100);
        let yprec = Math.round((mouseY / containerHeight) * 100);

        return {x:xprec,y:yprec};
    }

    onMouseMove(e) {

        if (!this.options.allowResize && !this.editMode) return;

        if (this.draggingLines) {
            this.onDrag(e);
            e.preventDefault();
        }
        else {

            let container = $(this.$element).find('.jf-widgets-layout-container');

            let prec = this._getPrecPoint(e);
            this.closestLines = this.getClosestLines(prec.x,prec.y);
            if (this.closestLines.length) {
                let directions = _.map(this.closestLines,'cssRelevantRule');

                let cursor;
                if (_.includes(directions,'right') && _.includes(directions,'left') && _.includes(directions,'top') && _.includes(directions,'bottom')) {
                    cursor = 'all-scroll';
                    this.setSubIsOnEdge(true);
                }
                else if (_.includes(directions,'top') && _.includes(directions,'bottom')) {
                    cursor = 'row-resize';
                    this.setSubIsOnEdge(true);
                }
                else if (_.includes(directions,'right') && _.includes(directions,'left')) {
                    cursor = 'col-resize';
                    this.setSubIsOnEdge(true);
                }
                else {
                    cursor = 'default';
                    this.setSubIsOnEdge(false);
                }
                container.css('cursor',cursor);
            }
            else {
                if (!this.subIsOnEdge) {
                    container.css('cursor','default');
                    this.setSubIsOnEdge(false);
                }
            }
        }

    }
    onMouseLeave(e) {
        if (!this.options.allowResize && !this.editMode) return;
        this.onMouseUp();
        this.setSubIsOnEdge(false);
    }

    onDrag(e) {

        let perc = this._getPrecPoint(e);

        let xDiff = perc.x - this.dragStartPt.x;
        let yDiff = perc.y - this.dragStartPt.y;

        let okToDrag = true;

        for (let i in this.closestLines) {
            let line = this.closestLines[i];
            let origLine = this.dragStartLines[i];
            let top = parseFloat(origLine.cssRules.top);
            let bottom = parseFloat(origLine.cssRules.bottom);
            let left = parseFloat(origLine.cssRules.left);
            let right = parseFloat(origLine.cssRules.right);
            let originalHeight = this._getLayoutByWidget(line.widget).percentHeight;
            let originalWidth = this._getLayoutByWidget(line.widget).percentWidth;
            if (line.cssRelevantRule === 'top') {
                let newTop = top + yDiff;
                let newHeight = (100 - bottom) - newTop;
                if (newHeight < 0.2 * originalHeight) {
                    okToDrag = false;
                    break;
                }
            }
            else if (line.cssRelevantRule === 'bottom') {
                let newBottom = bottom - yDiff;
                let newHeight = (100 - newBottom) - top;
                if (newHeight < 0.2 * originalHeight) {
                    okToDrag = false;
                    break;
                }
            }
            else if (line.cssRelevantRule === 'left') {
                let newLeft = left + xDiff;
                let newWidth = (100 - right) - newLeft;
                if (newWidth < 0.2 * originalWidth) {
                    okToDrag = false;
                    break;
                }
            }
            else if (line.cssRelevantRule === 'right') {
                let newRight = right - xDiff;
                let newWidth = (100 - newRight) - left;
                if (newWidth < 0.2 * originalWidth) {
                    okToDrag = false;
                    break;
                }
            }
        }

        if (okToDrag) {
            for (let i in this.closestLines) {
                let line = this.closestLines[i];

                if (!this.ensureCSSRulesSync(line,e)) break;

                let origLine = this.dragStartLines[i];
                if (line.cssRelevantRule === 'top') {
                    let top = parseFloat(origLine.cssRules.top);
                    line.cssRules.top = (top+yDiff) + '%';
                }
                else if (line.cssRelevantRule === 'bottom') {
                    let bottom = parseFloat(origLine.cssRules.bottom);
                    line.cssRules.bottom = (bottom-yDiff) + '%';
                }
                else if (line.cssRelevantRule === 'left') {
                    let left = parseFloat(origLine.cssRules.left);
                    line.cssRules.left = (left+xDiff) + '%';
                }
                else if (line.cssRelevantRule === 'right') {
                    let right = parseFloat(origLine.cssRules.right);
                    line.cssRules.right = (right-xDiff) + '%';
                }
            }
        }

    }
    ensureCSSRulesSync(line,e) {

        // Very hacky solution TODO: Find a better solution!

        let found = false;
        for (let key in this.cssRules) {
            if (this.cssRules[key] === line.cssRules) {
                found = true;
                break;
            }
        }

        if (!found) {
            this.onMouseUp();
            this.onMouseMove(e)
            this.onMouseDown(e);
            this.onMouseMove(e);
            return false;
        }
        return true;
    }

    onMouseDown(e) {

        if (!this.options.allowResize && !this.editMode) return;

        if (this.closestLines && this.closestLines.length) {
            this.draggingLines = true;
            this.dragStartPt = _.cloneDeep(this._getPrecPoint(e));
            this.dragStartLines = _.cloneDeep(this.closestLines);
            this._setTransitions(false);
            e.preventDefault();
            e.stopPropagation();
        }
    }

    onMouseUp(e) {
        if (!this.options.allowResize && !this.editMode) return;

        this.updateDragLines();
        this.closestLines = null;
        this.draggingLines = false;
        this.dragStartPt = null;
        this.dragStartLines = null;

        if (e) this._setTransitions(true);

    }
    onWidgetMouseMove(e) {
        if (!this.options.allowResize && !this.editMode) return;
        if (this.draggingLines || this.isParentDragging()) return;
        let container = $(this.$element).find('.jf-widgets-layout-container');
        if (!this.subIsOnEdge) {
            container.css('cursor','default');
            this.setSubIsOnEdge(false);
        }
        e.stopPropagation();
    }
    addLinesFromRect(rect) {
        this.dragLines.push({x1: rect.x1, y1: rect.y1, x2: rect.x2, y2: rect.y1, cssRules: rect.cssRules, widget: rect.widget, cssRelevantRule: 'top'});
        this.dragLines.push({x1: rect.x2, y1: rect.y1, x2: rect.x2, y2: rect.y2, cssRules: rect.cssRules, widget: rect.widget, cssRelevantRule: 'right'});
        this.dragLines.push({x1: rect.x1, y1: rect.y2, x2: rect.x2, y2: rect.y2, cssRules: rect.cssRules, widget: rect.widget, cssRelevantRule: 'bottom'});
        this.dragLines.push({x1: rect.x1, y1: rect.y1, x2: rect.x1, y2: rect.y2, cssRules: rect.cssRules, widget: rect.widget, cssRelevantRule: 'left'});
    }

    getClosestLines(x,y) {
        let closest = [];

        this.dragLines.forEach((line)=>{

            let infinite = ((line.cssRelevantRule === 'bottom' || line.cssRelevantRule === 'top') && this.mainAxis === 'rows') ||
                           ((line.cssRelevantRule === 'right' || line.cssRelevantRule === 'left') && this.mainAxis === 'columns')
            let dist = this.getPointDistToLine({x:x,y:y},line,infinite);
            if (dist<=1) closest.push(line);
        });

        let filtered = [];

        let top = _.filter(closest,{cssRelevantRule: 'top'});
        let bottom = _.filter(closest,{cssRelevantRule: 'bottom'});
        let left = _.filter(closest,{cssRelevantRule: 'left'});
        let right = _.filter(closest,{cssRelevantRule: 'right'});

        top.forEach((line)=>{
            let matches = this.mainAxis === 'rows' ? _.filter(bottom,{y1:line.y1}) : _.filter(bottom,{x1:line.x1,x2:line.x2});

            if (matches.length) {
                filtered.push(line);
                matches.forEach((match)=>filtered.push(match));
            }
        });
        left.forEach((line)=>{
            let matches = this.mainAxis === 'columns' ? _.filter(right,{x1:line.x1}) : _.filter(right,{y1:line.y1,y2:line.y2});

            if (matches.length) {
                filtered.push(line);
                matches.forEach((match)=>filtered.push(match));
            }
        });

        return filtered;
    }

    getPointDistToLine(pt,line, infiniteLine) {
        if (line.x1 === line.x2) {
            if (infiniteLine) return Math.abs(pt.x - line.x1);
            else if (pt.y < line.y1) return this.getPointDistToPoint(pt,{x:line.x1,y:line.y1});
            else if (pt.y > line.y2) return this.getPointDistToPoint(pt,{x:line.x2,y:line.y2});
            else return Math.abs(pt.x - line.x1);
        }
        else if (line.y1 === line.y2) {
            if (infiniteLine) return Math.abs(pt.y - line.y1);
            if (pt.x < line.x1) return this.getPointDistToPoint(pt,{x:line.x1,y:line.y1});
            else if (pt.x > line.x2) return this.getPointDistToPoint(pt,{x:line.x2,y:line.y2});
            else return Math.abs(pt.y - line.y1);
        }
    }
    getPointDistToPoint(pt1,pt2) {
        return Math.sqrt(Math.pow(pt1.x-pt2.x,2) + Math.pow(pt1.y-pt2.y,2))
    }

    setSubIsOnEdge(onEdge) {
        let parent = this.options.parent;
        while (parent) {
            parent.subIsOnEdge = onEdge;
            parent = parent.options.parent;
        }
    }
    isParentDragging(recurse=false) {
        let parent = this.options.parent;
        if (parent) return parent.draggingLines || parent.isParentDragging(true);
        else return recurse ? this.draggingLines : false;
    }

    removeWidget(layoutObj) {
        this._setTransitions(true);

        let rowOrColumnToRemove = null;
        this.transformedLayout.forEach((rowOrColumn) => {
            let index = _.indexOf(rowOrColumn,layoutObj);
            if (index !== -1) {
                rowOrColumn.splice(index,1);
                if (rowOrColumn.length === 0) {
                    rowOrColumnToRemove = rowOrColumn;
                }
            }
        });
        if (rowOrColumnToRemove) {
            let index = _.indexOf(this.transformedLayout,rowOrColumnToRemove);
            this.transformedLayout.splice(index,1);
        }
        if (this.transformedLayout.length === 0) {
            if (this.options.isSub) {
                let parentLayoutObj = _.find(this.options.parent.flatCells,{subLayout: this.layout});
                this.options.parent.removeWidget(parentLayoutObj);
            }
        }
        this.megaRefresh();
    }

    normalizeSizes() {
        let totalSizeMajor = 0;
        this.transformedLayout.forEach((rowOrColumn) => {
            let totalSizeMinor = 0;
            let totalSizeMajorAdd = 0;
            rowOrColumn.forEach((cell)=>{
                totalSizeMinor += this.mainAxis === 'columns' ? cell.percentHeight : cell.percentWidth;
                let major = this.mainAxis === 'columns' ? cell.percentWidth : cell.percentHeight;
                totalSizeMajorAdd = major > totalSizeMajorAdd ? major : totalSizeMajorAdd;
            })
            totalSizeMajor += totalSizeMajorAdd;
            if (totalSizeMinor !== 100) {
                rowOrColumn.forEach((cell)=>{
                    if (this.mainAxis === 'columns') {
                        cell.percentHeight = 100*cell.percentHeight/totalSizeMinor;
                    }
                    else {
                        cell.percentWidth = 100*cell.percentWidth/totalSizeMinor;
                    }
                })
            }
        });
        if (totalSizeMajor !== 100) {
            this.transformedLayout.forEach((rowOrColumn) => {
                rowOrColumn.forEach((cell)=>{
                    if (this.mainAxis === 'columns') {
                        cell.percentWidth = 100*cell.percentWidth/totalSizeMajor;
                    }
                    else {
                        cell.percentHeight = 100*cell.percentHeight/totalSizeMajor;
                    }
                });
            });
        }
    }
    splitCell(layoutObj,orientation) {
        this._setTransitions(true);
        this.transformedLayout.forEach((rowOrColumn) => {
            let index = _.indexOf(rowOrColumn,layoutObj);
            if (index !== -1) {
                let clone = angular.copy(layoutObj);
                if ((orientation === 'h' && this.mainAxis === 'rows') || (orientation === 'v' && this.mainAxis === 'columns')) {
                    let attr = orientation === 'h' ? 'percentWidth' : 'percentHeight';
                    layoutObj[attr] /= 2;
                    clone[attr] /= 2;
                    rowOrColumn.splice(index + 1,0,clone);
                    clone.selectWidgetMode = true;
                }
                else {
                    delete layoutObj.widget;
                    layoutObj.subLayout = {};
                    let axis = this.mainAxis === 'columns' ? 'rows' : 'columns';
                    layoutObj.subLayout[axis] = [
                        {
                            size: '100%',
                            cells: ['100% @'+clone.widget],
                            new: true
                        }
                    ]
                }
            }
        });

        this.megaRefresh();
    }

    megaRefresh() {
        this.updateFlatCells();
        this.normalizeSizes();
        this.updateCss();
        this.updateDragLines();
        this.loadTemplates().then(()=>{
            this.$timeout(()=>this.compileElements());
        })
    }

    changeWidget(layoutObj) {
        layoutObj.selectWidgetMode = !layoutObj.selectWidgetMode;
        this.updateCss();
    }
    onWidgetChange(layoutObj) {
        layoutObj.selectWidgetMode = false;
        this.templatesLoaded = false;
        this.megaRefresh();
    }
    getWidgetName(key) {
        return this.widgets[key] ? this.widgets[key].name || key : '';
    }

    updateLayoutJSON() {
        if (!this.transformedLayout) return;

        this.layoutJSON = {};
        this.layoutJSON.main = {};
        this.layoutJSON.main[this.mainAxis] = [];
        let subLayoutCounter = 0;

        this.transformedLayout.forEach((rowOrColumn) => {
            let rowOrColumnObject = {};
            rowOrColumn.forEach((cell)=> {
                if (!rowOrColumnObject.size) rowOrColumnObject.size = cell[this.mainAxis === 'columns' ? 'percentWidth' : 'percentHeight'] + '%';
                if (!rowOrColumnObject.cells) rowOrColumnObject.cells = [];

                let cellString = '';
                cellString += cell[this.mainAxis === 'columns' ? 'percentHeight' : 'percentWidth'] + '%';
                if (cell.widget && !cell.widget.startsWith('$$')) cellString += ' @' + cell.widget;

                if (cell.$$childLayout) {
                    cell.$$childLayout.updateLayoutJSON();

                    let subName = 'sub' + subLayoutCounter;
                    subLayoutCounter++;

                    this.layoutJSON[subName] = cell.$$childLayout.layoutJSON;
                    cellString += ' #' + subName;
                }

                rowOrColumnObject.cells.push(cellString);
            })

            this.layoutJSON.main[this.mainAxis].push(rowOrColumnObject);
        });

    }

    getWidgetsCount() {
        return $('.widget-container').length;
    }


    _setTransitions(active) {
        if (active) {
            $('.widgets-padder .widget-wrapper').css('transition',`all ${this.ANIM_DURATION}s ease-out`)
        }
        else {
            $('.widgets-padder .widget-wrapper').css('transition','none')
        }
    }

    _getRootDirective() {
        if (!this.options.parent) return this;
        else return this.options.parent._getRootDirective();
    }

    cleanLayout() {
        if (!this.transformedLayout) return;

        // Remove empty layout directives from parent
        if (!this.transformedLayout.length && this.options.parent) {
            let parentLayoutObj = _.find(this.options.parent.flatCells,{subLayout: this.layout});
            this.options.parent.removeWidget(parentLayoutObj);
        }

        // In case this directive is a sub and only has one widget in one cell, we move the widget to parent
        else if (this.transformedLayout.length === 1 &&
            this.transformedLayout[0].length === 1 &&
            this.transformedLayout[0][0].percentHeight === 100 &&
            this.transformedLayout[0][0].percentWidth === 100 &&
            this.options.parent) {

            let parentLayoutObj = _.find(this.options.parent.flatCells,{subLayout: this.layout});
            let axis = Object.keys(parentLayoutObj.subLayout)[0];
            if (!parentLayoutObj.subLayout[axis][0] || (parentLayoutObj.subLayout[axis][0] && !parentLayoutObj.subLayout[axis][0].new)) {
                if (this.transformedLayout[0][0].widget) {
                    parentLayoutObj.widget = this.transformedLayout[0][0].widget;
                    delete parentLayoutObj.subLayout;
                    delete parentLayoutObj.$$childLayout;
                }
                else if (this.transformedLayout[0][0].subLayout) {
                    parentLayoutObj.subLayout = this.transformedLayout[0][0].subLayout;
                    delete parentLayoutObj.widget;
                }
            }
        }

        // In case this directive is the root and only has one sub in one cell, we move the sub data to this
        else if (this.transformedLayout.length === 1 &&
            this.transformedLayout[0].length === 1 &&
            this.transformedLayout[0][0].percentHeight === 100 &&
            this.transformedLayout[0][0].percentWidth === 100 &&
            this.transformedLayout[0][0].subLayout &&
            !this.options.parent) {

            console.log('pre',JSON.stringify(this.layout))
            let theSub = this.transformedLayout[0][0].subLayout;
            this.layout = theSub;
            console.log('post',JSON.stringify(this.layout))
            this.transformLayout();
            this.cleanLayout();

        }

    }

    expandPane(layoutObj) {
        let expanding = this.$expanded = !this.$expanded ? layoutObj : null;
        this.transformedLayout.forEach((rowOrColumn) => {
            rowOrColumn.forEach((cell)=> {
                if (expanding) {
                    cell.dimBeforeExpansion = {width: cell.percentWidth, height: cell.percentHeight};
                    if (cell === layoutObj) {
                        cell.percentWidth = cell.percentHeight = 100;
                    }
                    else {
                        this.cssRules[cell.cssId].opacity = 0;
                        let onTheSameRowOrColumn = rowOrColumn.indexOf(layoutObj) !== -1;
                        if (onTheSameRowOrColumn) {
                            cell[this.mainAxis === 'columns' ? 'percentHeight' : 'percentWidth'] = 0;
                            cell[this.mainAxis === 'rows' ? 'percentHeight' : 'percentWidth'] = 100;
                        }
                        else {
                            cell[this.mainAxis === 'rows' ? 'percentHeight' : 'percentWidth'] = 0;
                            cell[this.mainAxis === 'columns' ? 'percentHeight' : 'percentWidth'] = 100;
                        }
                    }
                }
                else {
                    cell.percentWidth = cell.dimBeforeExpansion.width;
                    cell.percentHeight = cell.dimBeforeExpansion.height;
                    delete cell.dimBeforeExpansion;
                }
            })
        })

        if (expanding) {
            this.$timeout(() => {
                this.updateCss();
            }, this.ANIM_DURATION*1000);
        }
        else {
            this.updateCss();
            this.$timeout(() => {
                this.transformedLayout.forEach((rowOrColumn) => {
                    rowOrColumn.forEach((cell)=> {
                        this.cssRules[cell.cssId].opacity = 1;
                    })
                })

            }, this.ANIM_DURATION*1000);
        }

        if (this.options.parent && this.parentCell) {
            this.options.parent.expandPane(this.parentCell)
        }

        layoutObj.expanded = !layoutObj.expanded;

    }

}

