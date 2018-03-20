class jfDrawerController {

    constructor(JFrogUIUtils) {
        this.opened = false;
        this.utils = JFrogUIUtils;

        if (this.openFirst === '0') {
	        this.opened = true;
        }

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
            description: '@',
            openFirst: '@?'
        },
        require:'^jfDrawers',
        templateUrl: 'directives/jf_drawers/jf_drawer.html',
        transclude: true,
        controller: jfDrawerController,
        controllerAs: 'jfDrawer',
        bindToController: true
    }
}
