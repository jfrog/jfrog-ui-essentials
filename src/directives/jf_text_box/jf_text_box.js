class jfTextBoxController {
	/* @ngInject */
    constructor($scope, $element, $timeout, $interval, $compile, $q, $sce, JfFullTextService) {
        this.$scope = $scope;
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.$element = $element;
        this.fullTextModal = JfFullTextService;
        this.$q = $q;
        this.$sce = $sce;

        this.seeAllTemplate = '<div class="jf-text-box-show-all" ng-click="jfTextBox.seeAll()">(SEE ALL...)</div>';
    }

    $onInit() {

        this.measureLineHeight().then(() => {
            this.fullContent = this.text;
            this.$timeout(() => {
                this.registerResize();
                this.refreshText();
            })
        })

        this.$scope.$on('$destroy', () => {
            this.deregisterResize();
        })
    }

    registerResize() {
        this.onResize = () => {
            this.$scope.$apply(() => {
                this.refreshText();
            })
        }

        $(window).on('resize', this.onResize)
    }

    deregisterResize() {
        $(window).off('resize', this.onResize)
    }

    get containerHeight() {
        return $(this.$element).find('.jf-text-box-container').height();
    }

    get containerWidth() {
        return $(this.$element).find('.jf-text-box-container').width();
    }

    get numOfWholeRows() {
        return Math.floor(this.containerHeight / this.lineHeight);
    }

    get numOfActualRows() {
        let contentHeight = $(this.$element).find('.jf-text-box-content-full').height();
        return contentHeight / this.lineHeight;
    }

    get isOverflowing() {
        return this.numOfActualRows > this.numOfWholeRows;
    }

    refreshText() {
        if (!this.isOverflowing) {
            this.content = this.fullContent;
        }
        else {
            $(this.$element).find('.jf-text-box-content-stage').text('');
            let words = this.fullContent.split('');
            let i = 1;
            let numOfLines = $(this.$element).find('.jf-text-box-content-stage').height() / this.lineHeight;
            while (numOfLines <= this.numOfWholeRows && i <= words.length) {
                $(this.$element).find('.jf-text-box-content-stage').html(words.slice(0,i).join(' ') + ' ' + this.seeAllTemplate);
                numOfLines = $(this.$element).find('.jf-text-box-content-stage').height() / this.lineHeight;
                i++;
            }
            this.content = this.$sce.trustAsHtml(words.slice(0,i-2).join(' ') + ' ' + this.seeAllTemplate);

            this.$timeout(() => {
                let seeAll = $('.jf-text-box-show-all');
                if (!seeAll.prop('compiled')) {
                    this.$compile(seeAll)(this.$scope);
                    seeAll.prop('compiled', true);
                }
            })
        }
    }

    measureLineHeight() {
        let defer = this.$q.defer();
        $(this.$element).find('.jf-text-box-content-stage').text('*');
        this.$timeout(() => {
            this.lineHeight = $(this.$element).find('.jf-text-box-content-stage').height();
            $(this.$element).find('.jf-text-box-content-stage').text('');
            defer.resolve();
        })
        return defer.promise;
    }

    seeAll() {
        let text = this.fullContent;
        this.fullTextModal.showFullTextModal(text, this.modalTitle || 'Full Text', 500, false, null, 'text-box-show-all-modal');
        this.deregisterResize();
        this.fullTextModal.modalInstance.result.finally(() => {
            this.$timeout(() => this.registerResize());
        })
    }

}

export function jfTextBox() {
    return {
        restrict: 'E',
        scope: {
            text: '=',
            numOfLines: '@',
            modalTitle: '@?'
        },
        controller: jfTextBoxController,
        controllerAs: 'jfTextBox',
        bindToController: true,
        templateUrl: 'directives/jf_text_box/jf_text_box.html'
    }
}