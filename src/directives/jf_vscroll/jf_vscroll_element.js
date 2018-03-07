export function jfVScrollElement($compile) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            template: '=',
            variable: '=',
            index: '=',
            vscroll: '='
        },
        template: '<div class="compile-placeholder"></div>',
        controller: jfVScrollElementController,
        controllerAs: 'jfVScrollElement',
        bindToController: true,
        link: function(scope, element, attrs, directiveCtrl) {

            let elementScope = scope.$parent.$parent.$parent.$new();
            let target = $(element).find('.compile-placeholder');

            elementScope[directiveCtrl.variable] = directiveCtrl.data;
            elementScope['$index'] = directiveCtrl.index;

            directiveCtrl.elementScope = elementScope;
            let compiled = $compile($(`<div>${directiveCtrl.template}</div>`))(elementScope);
            target.replaceWith(compiled);

        }
    }
}

class jfVScrollElementController {
    constructor($scope, $element, $timeout) {

        this.$element = $element;

        let unwatchHeight = $scope.$watch('jfVScrollElement.childrenHeight', () => {
            if (this.childrenHeight && this.childrenHeight > 1) {
                this.vscroll.setItemHeight(this.childrenHeight);
                unwatchHeight();
            }
        })

        $scope.$watch('jfVScrollElement.data', () => {
            this.elementScope[this.variable] = this.data;
        })
    }

    get childrenHeight() {
        return $(this.$element).children().height();
    }
}
