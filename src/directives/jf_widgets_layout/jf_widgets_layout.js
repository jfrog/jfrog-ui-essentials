class jfWidgetsLayoutController {
    constructor($scope,$compile,$timeout,$q,$templateRequest,$sce, $injector) {
        this.$q = $q;
        this.$sce = $sce;
        this.$scope = $scope;
        this.$injector = $injector;
        this.$compile = $compile;
        this.$templateRequest = $templateRequest;

        let onChange = (newval,oldval) => {
            if (this.templatesLoadStarted && !this.templatesLoaded) return;
            this.updateCss();
            this.loadTemplates().then(()=>{
                $timeout(()=>this.compileDirectives());
            })
        };
        $scope.$watch('jfWidgetsLayout.layout', onChange);
//        $scope.$watch('jfWidgetsLayout.options', onChange, true);
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
            row.forEach((widget) => {
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
            });
        });

        if (!fired) defer.resolve();
        return defer.promise;
    }
    updateCss() {
        this.cssRules = {};
        let currentX, currentY = 0;
        this.layout.forEach((row) => {
            currentX = 0;
            let topHeight = 0;
            row.forEach((widget) => {
                this.cssRules[widget.id] = {
                    top: currentY + '%',
                    left: currentX + '%',
                    bottom: (100 - (currentY + widget.percentHeight)) + '%',
                    right: (100 - (currentX + widget.percentWidth)) + '%',
                    padding: (this.options.padding/2) + 'px'
                }
                currentX += widget.percentWidth;
                if (widget.percentHeight > topHeight) topHeight = widget.percentHeight;
            })
            currentY += topHeight;
        })

        this.padderCss = {
            top: (this.options.padding/2) + 'px',
            left: (this.options.padding/2) + 'px',
            bottom: (this.options.padding/2) + 'px',
            right: (this.options.padding/2) + 'px'
        }
    }

    compileDirectives() {
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
            widget.$compiled=true;
        }
    }
    _getWidgetById(id) {
        let widget;

        for (let i in this.layout) {
            let row = this.layout[i];
            widget = _.find(row, {id: id});
            if (widget) break;
        }

        return widget;
    }
}

export function jfWidgetsLayout() {
    return {
        controller: jfWidgetsLayoutController,
        controllerAs: 'jfWidgetsLayout',
        bindToController: true,
        scope: {
            layout: '=',
            options: '='
        },
        templateUrl: 'directives/jf_widgets_layout/jf_widgets_layout.html'
    }
}