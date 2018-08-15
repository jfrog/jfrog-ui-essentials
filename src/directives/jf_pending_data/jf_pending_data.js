export function jfPendingData() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            waitFor: '='
        },
        controller: jfTinySpinnerController,
        controllerAs: '$ctrl',
        bindToController: true,
        template: `
            <div class="spinner-msg-local" ng-if="$ctrl.waitFor === undefined">
                <div class="icon-hourglass-local"></div>
            </div>
            <ng-transclude ng-if="$ctrl.waitFor !== undefined"></ng-transclude>
        `,
    }
}

class jfTinySpinnerController {
    constructor($timeout) {
        const MINIMUM_WAIT_TO_SHOW_SPINNER = 400; //ms
        $timeout(() => {
            this.showSpinner = true;
        }, MINIMUM_WAIT_TO_SHOW_SPINNER)
    }
}