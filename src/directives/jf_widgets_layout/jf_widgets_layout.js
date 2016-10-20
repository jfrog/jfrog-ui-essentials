export function jfWidgetsLayout(recursiveDirective) {
    return {
        controller: jfWidgetsLayoutController,
        controllerAs: 'jfWidgetsLayout',
        bindToController: true,
        scope: {
            widgets: '=',
            layout: '=',
            options: '='
        },
        templateUrl: 'directives/jf_widgets_layout/jf_widgets_layout.html',
        compile: (element) => {
            return recursiveDirective.compile(element);
        }
    }
}

class jfWidgetsLayoutController {
    constructor($scope,$compile,$timeout,$q,$templateRequest,$sce, $injector,$element) {
        this.$q = $q;
        this.$sce = $sce;
        this.$scope = $scope;
        this.$element = $element;
        this.$injector = $injector;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.$templateRequest = $templateRequest;

        this.setDefaultOptions();

        let onChange = (newval,oldval) => {
            if (!newval || this.templatesLoadStarted && !this.templatesLoaded) return;
            this.transformLayout();
            this.updateCss();
            this.loadTemplates().then(()=>{
                $timeout(()=>this.compileElements());
            })
        };

        $scope.$watch('jfWidgetsLayout.layout', onChange);
//        $scope.$watch('jfWidgetsLayout.options', onChange, true);
    }

    setDefaultOptions() {
        if (!this.options) this.options = {}
        if (!this.options.padding) this.options.padding = 10;
        if (!this.options.minHeight) this.options.minHeight = 'initial';
        if (!this.options.backColor) this.options.backColor = 'transparent';
        if (this.options.outerPadding === undefined) this.options.outerPadding = true;

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
        this.flatCells = [];

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
                tRowOrColumn.push(tCell);
                this.flatCells.push(tCell);
            })
            this.transformedLayout.push(tRowOrColumn);
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
        this.cssRules = {};
        this.dragLines = [];
        let currentX = 0, currentY = 0;
        let emptyWidgetNextIndex = 0;

        this.transformedLayout.forEach((rowOrColumn) => {
            if (this.mainAxis === 'rows') currentX = 0;
            else if (this.mainAxis === 'columns') currentY = 0;
            let topSize = 0;
            rowOrColumn.forEach((layoutDef) => {
                let widget = this.widgets[layoutDef.widget];
                if (!widget) {
                    layoutDef.widget = '$$widget'+emptyWidgetNextIndex;
                    emptyWidgetNextIndex++;
                }
                this.cssRules[layoutDef.widget] = {
                    top: currentY + '%',
                    left: currentX + '%',
                    bottom: (100 - (currentY + layoutDef.percentHeight)) + '%',
                    right: (100 - (currentX + layoutDef.percentWidth)) + '%',
                    padding: (this.options.padding/2) + 'px'
                };

                this.addLinesFromRect({
                    x1: currentX,
                    y1: currentY,
                    x2: currentX + layoutDef.percentWidth,
                    y2: currentY + layoutDef.percentHeight,
                    cssRules: this.cssRules[layoutDef.widget]
                });

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
            'background-color': this.options.backColor
        }

        console.log(this.dragLines);
    }

    compileElements() {
        let elems = $('.compile-children');
        for (let i = 0; i< elems.length; i++) {
            let elem = $(elems[i]);
            let widgetId = elem.prop('id');
            if (this._isWidgetInUse(widgetId)) {
                let widget = this._getWidgetById(widgetId);
                let scope = this.$scope.$new();

                if (widget.model) {
                    _.extend(scope,widget.model);
                }
                if (widget.controller) {
                    widget.controller.prototype.$scope = scope;
                    widget.controller.prototype.$widgetObject = widget;
                    widget.controller.prototype.$layoutObject = this._getLayoutByWidget(elem.prop('id'));
                    widget.controller.prototype.$widgetLayoutManager = this;

                    let controllerInstance = this.$injector.instantiate(widget.controller);

                    let controllerObject = {};
                    controllerObject[widget.controllerAs || 'ctrl'] = controllerInstance;

                    _.extend(scope,controllerObject);
                }

                let children = elem.children();

                //We compile only first child, templates should have only one root element!
                let rootChild = $(children[0]);
                if (!rootChild.prop('compiled')) {
                    this.$compile(rootChild)(scope);
                    rootChild.prop('compiled',true);
                }
                this.$timeout(()=>{
                    widget.$compiled=true;
                })
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
            let row = this.transformedLayout[i];
            layout = _.find(row, {widget: id});
            if (layout) break;
        }

        return layout;
    }

    _isWidgetInUse(widgetId) {
        return !!_.find(this.flatCells,{widget: widgetId});
    }


    onMouseMove(e) {

        if (this.draggingLines) {
            this.onDrag(e);
            e.preventDefault();
        }
        else {

            let container = $(this.$element).find('.jf-widgets-layout-container');

            let containerWidth = container.innerWidth();
            let containerHeight = container.innerHeight();

            let mouseX = e.pageX - container.offset().left;
            let mouseY = e.pageY - container.offset().top;

            let xprec = Math.round((mouseX / containerWidth) * 100);
            let yprec = Math.round((mouseY / containerHeight) * 100);

            this.mousePrecPt = {x:xprec,y:yprec};
            this.closestLines = this.getClosestLines(xprec,yprec);
            if (this.closestLines.length) {
                let directions = _.map(this.closestLines,'cssRelevantRule');

                let cursor;
                if (_.includes(directions,'top') && _.includes(directions,'bottom')) {
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
                if (!this.subIsOnEdge) container.css('cursor','default');
            }
        }

    }

    onDrag(e) {
        let container = $(this.$element).find('.jf-widgets-layout-container');
        let containerWidth = container.innerWidth();
        let containerHeight = container.innerHeight();

        let mouseX = e.pageX - container.offset().left;
        let mouseY = e.pageY - container.offset().top;

        let xprec = Math.round((mouseX / containerWidth) * 100);
        let yprec = Math.round((mouseY / containerHeight) * 100);

        let xDiff = xprec - this.dragStartPt.x;
        let yDiff = yprec - this.dragStartPt.y;

        for (let i in this.closestLines) {
            let line = this.closestLines[i];
            let origLine = this.dragStartLines[i];
            if (line.cssRelevantRule === 'top') {
                let top = parseFloat(origLine.cssRules.top);
                line.cssRules.top = (top+yDiff) + '%';
                line.y1 = origLine.y1 + yDiff;
                line.y2 = origLine.y2 + yDiff;
            }
            else if (line.cssRelevantRule === 'bottom') {
                let bottom = parseFloat(origLine.cssRules.bottom);
                line.cssRules.bottom = (bottom-yDiff) + '%';
                line.y1 = origLine.y1 + yDiff;
                line.y2 = origLine.y2 + yDiff;
            }
            else if (line.cssRelevantRule === 'left') {
                let left = parseFloat(origLine.cssRules.left);
                line.cssRules.left = (left+xDiff) + '%';
                line.x1 = origLine.x1 + xDiff;
                line.x2 = origLine.x2 + xDiff;
            }
            else if (line.cssRelevantRule === 'right') {
                let right = parseFloat(origLine.cssRules.right);
                line.cssRules.right = (right-xDiff) + '%';
                line.x1 = origLine.x1 + xDiff;
                line.x2 = origLine.x2 + xDiff;
            }
        }
    }

    onMouseDown(e) {
        if (this.closestLines && this.closestLines.length) {
            this.draggingLines = true;
            this.dragStartPt = _.cloneDeep(this.mousePrecPt);
            this.dragStartLines = _.cloneDeep(this.closestLines);
            e.preventDefault();
        }
    }

    onMouseUp(e) {
        this.draggingLines = false;
        this.dragStartPt = null;
        this.dragStartLines = null;
    }

    addLinesFromRect(rect) {
        this.dragLines.push({x1: rect.x1, y1: rect.y1, x2: rect.x2, y2: rect.y1, cssRules: rect.cssRules, cssRelevantRule: 'top'});
        this.dragLines.push({x1: rect.x2, y1: rect.y1, x2: rect.x2, y2: rect.y2, cssRules: rect.cssRules, cssRelevantRule: 'right'});
        this.dragLines.push({x1: rect.x1, y1: rect.y2, x2: rect.x2, y2: rect.y2, cssRules: rect.cssRules, cssRelevantRule: 'bottom'});
        this.dragLines.push({x1: rect.x1, y1: rect.y1, x2: rect.x1, y2: rect.y2, cssRules: rect.cssRules, cssRelevantRule: 'left'});
    }

    getClosestLines(x,y) {
        let closest = [];

        this.dragLines.forEach((line)=>{
            let infinite = ((line.cssRelevantRule === 'bottom' || line.cssRelevantRule === 'top') && this.mainAxis === 'rows') ||
                           ((line.cssRelevantRule === 'right' || line.cssRelevantRule === 'left') && this.mainAxis === 'columns')
            let dist = this.getPointDistToLine({x:x,y:y},line,infinite);
            if (dist<=0.5) closest.push(line);
        });

        let filtered = [];

        return closest;
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
}

