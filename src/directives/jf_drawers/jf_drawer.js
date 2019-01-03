class jfDrawerController {

    constructor(JFrogUIUtils, $timeout, $scope) {
        this.opened = false;
        this.utils = JFrogUIUtils;
        this.$scope = $scope;
    }

    $onInit() {
        if (this.openFirst === '0') {
            this.opened = true;
        }
	    this.$scope.$watch(angular.bind(this, () => this.bindOpen), (val) => {
		    if (typeof val === 'boolean') {
		        this.opened = val;
		        if (this.opened) this.utils.fireResizeEvent();
	        }
	    });
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
            openFirst: '@?',
            bindOpen: '<'
        },
        require:'^jfDrawers',
        templateUrl: 'directives/jf_drawers/jf_drawer.html',
        transclude: true,
        controller: jfDrawerController,
        controllerAs: 'jfDrawer',
        bindToController: true
    }
}
