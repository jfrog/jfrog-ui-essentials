class jfDrawerController {

    constructor(JFrogUIUtils) {
        this.opened = false;
        this.utils = JFrogUIUtils;
    }

    onClickHeader() {
        this.opened = !this.opened;
        if (this.opened) this.utils.fireResizeEvent();
    }
}


export function jfDrawer() {
    return {
        scope: {
            header: '@',
            description: '@'
        },
        require:'^jfDrawers',
        templateUrl: 'directives/jf_drawers/jf_drawer.html',
        transclude: true,
        controller: jfDrawerController,
        controllerAs: 'jfDrawer',
        bindToController: true
    }
}
