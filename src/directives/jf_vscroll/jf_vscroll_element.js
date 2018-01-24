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

        $timeout(() => {
            let height = $($element).children().height();
            if (height) this.vscroll.setItemHeight(height);
        });

        $scope.$watch('jfVScrollElement.data', () => {
            this.elementScope[this.variable] = this.data;
        })
    }
}
