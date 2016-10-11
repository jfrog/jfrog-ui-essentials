class jfWidgetsLayoutController {
    constructor($scope,$compile,$timeout) {
        this.$scope = $scope;
        this.$compile = $compile;

        let onChange = () => {
            this.updateCss();
            $timeout(()=>this.compileDirectives());
        };
        $scope.$watch('jfWidgetsLayout.layout', onChange, true);
        $scope.$watch('jfWidgetsLayout.options', onChange, true);
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
        let scope = this.$scope.$new();
        let elems = $('.compile-children').children();
        this.$compile(elems)(scope);
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