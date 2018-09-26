export function jfPendingData() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            waitFor: '=',
            delaySpinner: '@?'
        },
        controller: jfTinySpinnerController,
        controllerAs: '$ctrl',
        bindToController: true,
        template: `
            <div class="spinner-msg-local" ng-if="$ctrl.waitFor === undefined && (!$ctrl.delaySpinner || $ctrl.showSpinner)">
                <div class="icon-hourglass-local"></div>
            </div>
            <ng-transclude ng-if="$ctrl.waitFor !== undefined"></ng-transclude>
        `,
    }
}

class jfTinySpinnerController {
    constructor($timeout) {
        this.$timeout = $timeout;
    }

    $onInit() {
        if (this.delaySpinner) {
            this.$timeout(() => {
                this.showSpinner = true;
            }, !_.isNaN(parseInt(this.delaySpinner)) ? this.delaySpinner : 400)
        }
    }
}