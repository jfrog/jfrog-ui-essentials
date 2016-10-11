class jfWidgetsLayoutController {
    constructor($scope,$compile,$timeout) {
        this.$scope = $scope;
        this.$compile = $compile;

        let onChange = () => {
            this.updateCss();
            $timeout(()=>this.compileDirectives());
        };
        $scope.$watch('jfWidgetsLayout.layout', onChange, true);
//        $scope.$watch('jfWidgetsLayout.options', onChange, true);
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
            if (widget.model) _.extend(scope,widget.model);

            let children = elem.children();
            for (let i = 0; i< children.length; i++) {
                let elem = $(children[i]);
                if (!elem.prop('compiled')) {
                    this.$compile(elem)(scope);
                    elem.prop('compiled',true);
                }
            }
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