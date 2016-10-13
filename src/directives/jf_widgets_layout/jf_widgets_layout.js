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
            if (this.templatesLoadStarted && !this.templatesLoaded) return;
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

    loadTemplates() {
        let defer = this.$q.defer();

        if (this.templatesLoaded) {
            defer.resolve();
            return defer.promise;
        }

        this.templatesLoadStarted = true;
        let fired = 0, completed = 0;
        this.layout.forEach((row) => {
            row.forEach((layoutDef) => {
                let widget = this.widgets[layoutDef.widget];
                if (widget) {
                    if (widget.templateUrl && !widget.template) {
                        fired++;
                        this.$templateRequest(widget.templateUrl)
                            .then((template) => {
                                widget.template = this.$sce.trustAsHtml(template);
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
                    else if (widget.template) widget.template = this.$sce.trustAsHtml(widget.template)
                }
            });
        });

        if (!fired) defer.resolve();
        return defer.promise;
    }

    updateCss() {
        this.cssRules = {};
        let currentX, currentY = 0;
        let emptyWidgetNextIndex = 0;
        this.layout.forEach((row) => {
            currentX = 0;
            let topHeight = 0;
            row.forEach((layoutDef) => {
                let widget = this.widgets[layoutDef.widget];
                if (!widget) {
                    layoutDef.widget = 'widget'+emptyWidgetNextIndex;
                    emptyWidgetNextIndex++;
                }
                this.cssRules[layoutDef.widget] = {
                    top: currentY + '%',
                    left: currentX + '%',
                    bottom: (100 - (currentY + layoutDef.percentHeight)) + '%',
                    right: (100 - (currentX + layoutDef.percentWidth)) + '%',
                    padding: (this.options.padding/2) + 'px'
                }
                currentX += layoutDef.percentWidth;
                if (layoutDef.percentHeight > topHeight) topHeight = layoutDef.percentHeight;
            })
            currentY += topHeight;
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

        for (let i in this.layout) {
            let row = this.layout[i];
            layout = _.find(row, {widget: id});
            if (layout) break;
        }

        return layout;
    }
}

export function jfWidgetsLayout() {
    return {
        controller: jfWidgetsLayoutController,
        controllerAs: 'jfWidgetsLayout',
        bindToController: true,
        scope: {
            widgets: '=',
            layout: '=',
            options: '='
        },
        templateUrl: 'directives/jf_widgets_layout/jf_widgets_layout.html'
    }
}