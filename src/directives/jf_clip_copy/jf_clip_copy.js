class jfClipCopyController {
	/* @ngInject */
    constructor($timeout,$scope,$element) {

        this.FEEDBACK_DELAY = 4000;

        this.$timeout = $timeout;

        this.timeoutPromise = null;

        this.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

        if (!this.isSafari) {
            //initialize Clipboard.js
            let target = $element.find('a')[0];
            this.clipboard = new Clipboard(target);
            this.clipboard.on('success', (e) => {
                this.onSuccessfulCopy();
                $scope.$apply();
            });

            this.clipboard.on('error', (e) => {
            });

            $scope.$on('$destroy', () => {
                this.clipboard.destroy();
            });
        }


    }

    $onInit() {
        if (this.objectName) {
	        this.origTooltip = this.tooltipText = `Copy ${(this.keepTooltipLetterCase ? this.objectName : this.objectName.toLowerCase())} to clipboard`;
        }
        else {
            this.origTooltip = this.tooltipText = "Copy to clipboard";
        }

    }

    onSuccessfulCopy() {

        if (!this.textToCopy) return;

        if (this.timeoutPromise) {
            this.$timeout.cancel(this.timeoutPromise);
            this.timeoutPromise = null;
        }

        let objectNameText = this.keepTooltipLetterCase ? this.objectName : this.objectName.charAt(0).toUpperCase() + this.objectName.substr(1);
        this.tooltipText = `${(this.objectName ? objectNameText : 'Value')} copied to clipboard`;
        this.timeoutPromise = this.$timeout(()=>{
            this.tooltipText = this.origTooltip;
        },this.FEEDBACK_DELAY);

    }
}

export function jfClipCopy($compile) {
	'ngInject';
    return {
        restrict: 'E',
        scope: {
            textToCopy: '=',
            objectName: '@',
            keepTooltipLetterCase: '<?'
        },
        controller: jfClipCopyController,
        controllerAs: 'jfClipCopy',
        bindToController: true,
        templateUrl: 'directives/jf_clip_copy/jf_clip_copy.html',
        link: ($scope,$element,$attrs) => {
            let classList = $element[0].classList;
            let outer = angular.element($element[0]);
            let inner = angular.element($($element[0]).find('a'));

            for (let i = classList.length-1; i >= 0; i--) {
                let cls = classList[i];
                if (!cls.startsWith('ng-')) {
                    outer.removeClass(cls);
                    inner.addClass(cls);
                }
            }
        }
    };
}
