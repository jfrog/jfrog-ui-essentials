class jfTextBoxController {
	/* @ngInject */
    constructor($scope, $element, $timeout, $interval, $compile, $q, JfFullTextService) {
        this.$scope = $scope;
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.$element = $element;
        this.fullTextModal = JfFullTextService;
        this.$q = $q;
    }

    $onInit() {

        this.seeAllText = this.seeAllText || '(Show All ...)';

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
        let appliedRefresh = () => {
            this.$scope.$apply(() => {
                this.refreshText();
            })
        }
        let throttledRefresh = _.throttle(appliedRefresh, 150, {leading: false})

        this.onResize = throttledRefresh;

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
        let auto = Math.floor(this.containerHeight / this.lineHeight);
        return this.maxLines ? Math.min(parseInt(this.maxLines) + 1, auto) : auto;
    }

    get numOfActualRows() {
        let contentHeight = $(this.$element).find('.jf-text-box-content-full').height();
        return Math.ceil(contentHeight / this.lineHeight);
    }

    get numOfVisibleRows() {
        let contentHeight = $(this.$element).find('.jf-text-box-content-current').height();
        return Math.ceil(contentHeight / this.lineHeight);
    }

    get numOfStageRows() {
        let contentHeight = $(this.$element).find('.jf-text-box-content-stage').height();
        return Math.ceil(contentHeight / this.lineHeight);
    }

    get isOverflowing() {
        return this.numOfActualRows > this.numOfWholeRows;
    }

    setStageText(text) {
        $(this.$element).find('.jf-text-box-content-stage').text(text);
    }

    refreshText(minus = 1) {

        if (!this.isOverflowing) {
            this.content = this.fullContent;
        }
        else {
            $(this.$element).find('.jf-text-box-content-stage').html('');
            let words = this.splitText(this.fullContent);
            let i = 1;
            let getNumOfLinesUntil = (index, withSeeAll = true) => {
                this.setStageText(_.trimRight(words.slice(0,index).join('')) + (withSeeAll ? ' ' : ''))
                if (withSeeAll) $(this.$element).find('.jf-text-box-content-stage').append($(`  <div class="jf-text-box-show-all">${this.seeAllText}</div>`));
                return this.numOfStageRows;
            }
            while (getNumOfLinesUntil(i) <= this.numOfWholeRows && i <= words.length) {
                i++;
            }

            let saved = i;
            i-=minus;
            while (getNumOfLinesUntil(i, false) !== getNumOfLinesUntil(i) && i > 0) {
                i--;
            }

            if  (i === 0) {
                i = saved;
                this.wrapSeeAll = true;
            }
            else this.wrapSeeAll = false;

            let fit = words.slice(0,i);

            this.setStageText(_.trimRight(fit.join('')) + (this.isOverflowing ? ' ' : ''));
            if (this.isOverflowing) $(this.$element).find('.jf-text-box-content-stage').append($(`  <div class="jf-text-box-show-all">${this.seeAllText}</div>`));

            this.$timeout(() => {
                if (this.numOfStageRows > this.numOfWholeRows) {
                    this.refreshText(minus+1);
                }
                else {
                    this.content = _.trimRight(fit.join(''));
                }
            })
        }
        this.ready = true;
    }

    splitText(text) {

        if (this.splitCache) return this.splitCache;
        else {
            let regex = /\s+/g;
            let parts = [];
            let match = regex.exec(text);
            let lastIndex = 0;
            while (match) {
                parts.push(text.substr(lastIndex, match.index - lastIndex) + match[0]);
                lastIndex = match.index + match[0].length;
                match = regex.exec(text);
            }
            parts.push(text.substr(lastIndex, text.length - lastIndex));

            parts = _.map(parts, part => {
                if (part.length > 16) return part.split('');
                else return part;
            })

            parts = _.flatten(parts);

            this.splitCache = parts;
            return parts;
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
        if (this.noAction) return;
        let text = this.fullContent;
        if (this.customAction) {
            this.customAction({text})
        }
        else {
            this.fullTextModal.showFullTextModal(text, this.modalTitle || 'Full Text', 500, false, null, 'text-box-show-all-modal');
            this.deregisterResize();
            this.fullTextModal.modalInstance.result.finally(() => {
                this.$timeout(() => this.registerResize());
            })
        }
    }

}

export function jfTextBox() {
    return {
        restrict: 'E',
        scope: {
            text: '=',
            numOfLines: '@',
            modalTitle: '@?',
            seeAllText: '@?',
            maxLines: '@?',
            customAction: '&?',
            noAction: '@?'
        },
        controller: jfTextBoxController,
        controllerAs: 'jfTextBox',
        bindToController: true,
        templateUrl: 'directives/jf_text_box/jf_text_box.html'
    }
}