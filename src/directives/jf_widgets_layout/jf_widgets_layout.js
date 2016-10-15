class jfWidgetsLayoutController {
    constructor($scope,$compile,$timeout,$q,$templateRequest,$sce, $injector) {
        this.$q = $q;
        this.$sce = $sce;
        this.$scope = $scope;
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
                tRowOrColumn.push({
                    widget: _getWidgetNameFromCell(cell),
                    subLayout: subLayoutName ? this.layout[subLayoutName] : undefined,
                    percentWidth: parseInt(width),
                    percentHeight: parseInt(height)
                })
            })
            this.transformedLayout.push(tRowOrColumn);
        })

        console.log(this.transformedLayout)

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
                }
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

        let pad = this.options.outerPadding ? this.options.padding/2 : -this.options.padding/2;
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
    }

    compileElements() {
        let elems = $('.compile-children');
        for (let i = 0; i< elems.length; i++) {
            let elem = $(elems[i]);
            let widget = this._getWidgetById(elem.prop('id'));

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
            for (let i = 0; i< children.length; i++) {
                let elem = $(children[i]);
                if (!elem.prop('compiled')) {
                    this.$compile(elem)(scope);
                    elem.prop('compiled',true);
                }
            }
            this.$timeout(()=>{
                widget.$compiled=true;
            })
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
}

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