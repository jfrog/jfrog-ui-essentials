class jfTreeIndentationController {

    constructor($scope, $sce) {
        $scope.$watch('jfTreeIndentation.indentation', () => {
            // Build the inner html for the units here in js, it is much faster than using ng-repeat
            let indentationHtml = '';
            let htmlForIndentation = (indentation) => {
                return `<div class="indentation-unit" style="height: ${this.height}; background-image: url('${this.linesBackgrounds[indentation.background]}')"></div>`;
            }
            this.indentation.forEach(indentation => {
                indentationHtml += htmlForIndentation(indentation);
            })
            this.indentationHtml = $sce.trustAsHtml(indentationHtml);
        })
    }


}
export function jfTreeIndentation() {
    return {
        controller: jfTreeIndentationController,
        controllerAs: 'jfTreeIndentation',
        bindToController: true,
        scope: {
            indentation: '=',
            height: '=',
            visible: '=',
            linesBackgrounds: '='
        },
        templateUrl: 'ui_components/jf_tree/jf_tree_indentation.html'
    }
}