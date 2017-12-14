class jfTreeIndentationController {

    constructor() {
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
            visible: '='
        },
        templateUrl: 'ui_components/jf_tree/jf_tree_indentation.html'
    }
}