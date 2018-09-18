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

        this.fullTextElement.text(this.text)
        this.registerResize();
        this.$timeout(() => this.refreshText());

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
        let debouncedRefresh = _.debounce(appliedRefresh, 0, {leading: true});
//        let throttledRefresh = _.throttle(appliedRefresh, 150, {/*leading: false*/})

        this.onResize = debouncedRefresh;

        $(window).on('resize', this.onResize)
    }

    deregisterResize() {
        $(window).off('resize', this.onResize)
    }

    get containerElement() {
        if (!this.cachedContainerElement) {
            this.cachedContainerElement = $(this.$element).find('.jf-text-box-container');
        }
        return this.cachedContainerElement;
    }

    get fullTextElement() {
        if (!this.cachedFullTextElement) {
            this.cachedFullTextElement = $(this.$element).find('.jf-text-box-content-full')
        }
        return this.cachedFullTextElement;
    }

    get currentTextElement() {
        if (!this.cachedCurrentTextElement) {
            this.cachedCurrentTextElement = $(this.$element).find('.jf-text-box-content-current')
        }
        return this.cachedCurrentTextElement;
    }

    get stageElement() {
        if (!this.cachedStageElement) {
            this.cachedStageElement = $(this.$element).find('.jf-text-box-content-stage')
        }
        return this.cachedStageElement;
    }

    get containerHeight() {
        return this.containerElement.height();
    }

    get containerWidth() {
        return this.containerElement.width();
    }

    get numOfWholeRows() {
        let auto = Math.floor(this.containerHeight / this.lineHeight + 0.1);
        return this.maxLines ? Math.min(parseInt(this.maxLines), auto) : auto;
    }

    get numOfActualRows() {
        let contentHeight = this.fullTextElement.height();
        return Math.ceil(contentHeight / this.lineHeight - 0.1);
    }

    get numOfVisibleRows() {
        let contentHeight = this.currentTextElement.height();
        return Math.ceil(contentHeight / this.lineHeight - 0.1);
    }

    get numOfStageRows() {
        let contentHeight = this.stageElement.height();
        return Math.ceil(contentHeight / this.lineHeight - 0.1);
    }

    get isOverflowing() {
        return this.numOfActualRows > this.numOfWholeRows;
    }

    setStageText(text) {
        this.stageElement.text(text);
    }

    refreshText() {
        this.measureLineHeight();

        if (!this.isOverflowing) {
            this.content = this.text;
        }
        else {
            this.stageElement.html('');
            let words = this.splitText(this.text);
            let i = 1;
            let getNumOfLinesUntil = (index, withSeeAll = true) => {
                this.setStageText(_.trimRight(words.slice(0, index).join('')) + (withSeeAll ? ' ' : ''))
                if (withSeeAll) this.stageElement.append($(`  <div class="jf-text-box-show-all">${this.seeAllText}</div>`));
                return this.numOfStageRows;
            }
            while (getNumOfLinesUntil(i) <= this.numOfWholeRows && i <= words.length) {
                i++;
            }

            if (getNumOfLinesUntil(i, false) !== getNumOfLinesUntil(i)) {
                this.wrapSeeAll = true;
            }
            else this.wrapSeeAll = false;
            /*
                        let saved = i;
                        i--;
                        while (getNumOfLinesUntil(i, false) !== getNumOfLinesUntil(i) && i > 0) {
                            console.log('?');
                            i--;
                        }

                        if  (i === 0) {
                            i = saved;
                            this.wrapSeeAll = true;
                        }
                        else this.wrapSeeAll = false;
            */

            let fit = words.slice(0, i);

            this.setStageText(_.trimRight(fit.join('')) + (this.isOverflowing ? ' ' : ''));
            if (this.isOverflowing) this.stageElement.append($(`<div class="jf-text-box-show-all">${this.seeAllText}</div>`));

            let m = 0;
            while (this.numOfStageRows > this.numOfWholeRows && i > m) {
                m++;

                fit = words.slice(0, i - m);
                this.setStageText(_.trimRight(fit.join('')) + (this.isOverflowing ? ' ' : ''));
                if (this.isOverflowing) this.stageElement.append($(`<div class="jf-text-box-show-all">${this.seeAllText}</div>`));
            }
            this.content = _.trimRight(fit.join(''));

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
        this.stageElement.text('*');
        this.lineHeight = this.stageElement.height();
        if (this.maxLines) {
            this.containerElement.height(parseInt(this.maxLines) * this.lineHeight);
        }
    }

    seeAll() {
        if (this.noAction) return;
        let text = this.text;
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