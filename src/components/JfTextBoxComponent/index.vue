<template>

    <div>
        <div class="jf-text-box-container">
            <div class="jf-text-box-content-current">{{ content }} <span v-if="ready && isOverflowing"
                      class="jf-text-box-show-all"
                      :style="{'white-space': wrapSeeAll ? 'inherit' : 'nowrap'}"
                      @click="seeAll()"
                      v-html="seeAllCustomText">
                </span>
            </div>
            <div class="jf-text-box-content-full"></div>
            <div class="jf-text-box-content-stage"></div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-text-box',
        props: [
            'text',
            'modalTitle',
            'seeAllText',
            'maxLines',
            'noAction',
            'customAction'
        ],
        'jf@inject': [
            '$scope',
            '$element',
            '$timeout',
            '$interval',
            '$compile',
            '$q',
            'JfFullTextService',
            '$sanitize'
        ],
        data() {
            return {
                content: null,
                ready: null,
                wrapSeeAll: null
            };
        },
        mounted() {
            this.fullTextElement.text(this.sanitizedText);
            this.registerResize();
            setTimeout(() => this.refreshText());
            this.fullTextModal= this.JfFullTextService
        },
        beforeDestroy() {
            this.deregisterResize();
        },
        methods: {
            registerResize() {

                let appliedRefresh = () => {
                    this.refreshText();
                    this.$forceUpdate();
                }
                let debouncedRefresh = _.debounce(appliedRefresh, 0, {leading: true});
                // let throttledRefresh = _.throttle(appliedRefresh, 150, {/*leading: false*/})

                this.onResize = debouncedRefresh;

                $(window).on('resize', this.onResize)
            },
            deregisterResize() {
                $(window).off('resize', this.onResize)
            },
            setStageText(text) {
                this.stageElement.text(text);
            },

            refreshText() {
                this.measureLineHeight();

                if (!this.isOverflowing) {
                    this.content = this.sanitizedText;
                }
                else {
                    this.stageElement.html('');
                    let words = this.splitText(this.sanitizedText);
                    let i = 1;
                    let getNumOfLinesUntil = (index, withSeeAll = true) => {
                        this.setStageText(_.trimEnd(words.slice(0, index).join('')) + (withSeeAll ? ' ' : ''))
                        if (withSeeAll) this.stageElement.append($(`  <div class="jf-text-box-show-all">${this.seeAllCustomText}</div>`));
                        return this.numOfStageRows();
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

                    this.setStageText(_.trimEnd(fit.join('')) + (this.isOverflowing ? ' ' : ''));
                    if (this.isOverflowing) this.stageElement.append($(`<div class="jf-text-box-show-all">${this.seeAllCustomText}</div>`));

                    let m = 0;
                    while (this.numOfStageRows() > this.numOfWholeRows && i > m) {
                        m++;

                        fit = words.slice(0, i - m);
                        this.setStageText(_.trimEnd(fit.join('')) + (this.isOverflowing ? ' ' : ''));
                        if (this.isOverflowing) this.stageElement.append($(`<div class="jf-text-box-show-all">${this.seeAllCustomText}</div>`));
                    }
                    this.content = _.trimEnd(fit.join(''));

                }
                this.ready = true;
                this.$forceUpdate();
            },
            numOfStageRows() {
                let contentHeight = this.stageElement.height();
                return Math.ceil(contentHeight / this.lineHeight - 0.1);
            },

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

            },

            measureLineHeight() {
                this.stageElement.text('*');
                this.lineHeight = this.stageElement.height();
                if (this.maxLines) {
                    this.containerElement.height(parseInt(this.maxLines) * this.lineHeight);
                }
            },

            seeAll() {
                if (this.noAction) return;
                let text = this.sanitizedText;
                if (this.customAction) {
                    this.customAction({text})
                }
                else {
                    let modalInstance = this.fullTextModal.showFullTextModal(text, this.modalTitle || 'Full Text', 500, false, null, 'text-box-show-all-modal');
                    this.deregisterResize();
                    modalInstance.result.finally(() => {
                        setTimeout(() => this.registerResize());
                    })
                }
            }

            /* Getter Elements */
        },
        computed: {
            seeAllCustomText() {
                return this.seeAllText ? this.$sanitize(this.seeAllText) : '(Show All ...)'
            },
            sanitizedText() {
                return this.$sanitize(this.text);
            },
            containerElement: {
                get: function(){
                    if (!this.cachedContainerElement) {
                        this.cachedContainerElement = $(this.$element).find('.jf-text-box-container');
                    }
                    return this.cachedContainerElement
                }
            },
            fullTextElement: {
                get: function() {
                    if (!this.cachedFullTextElement) {
                        this.cachedFullTextElement = $(this.$element).find('.jf-text-box-content-full')
                    }
                    return this.cachedFullTextElement;
                }
            },

            currentTextElement: {
                get: function() {
                    if (!this.cachedCurrentTextElement) {
                        this.cachedCurrentTextElement = $(this.$element).find('.jf-text-box-content-current')
                    }
                    return this.cachedCurrentTextElement;
                }
            },

            stageElement: {
                get: function() {
                    if (!this.cachedStageElement) {
                        this.cachedStageElement = $(this.$element).find('.jf-text-box-content-stage')
                    }
                    return this.cachedStageElement;
                }
            },

            containerHeight: {
                get: function() {
                    return this.containerElement.height();
                }
            },

            containerWidth: {
                get: function() {
                    return this.containerElement.width();
                }
            },

            numOfWholeRows: {
                get: function() {
                    let auto = Math.floor(this.containerHeight / this.lineHeight + 0.1);
                    return this.maxLines ? Math.min(parseInt(this.maxLines), auto) : auto;
                }
            },

            numOfActualRows: {
                get: function() {
                    let contentHeight = this.fullTextElement.height();
                    return Math.ceil(contentHeight / this.lineHeight - 0.1);
                }
            },

            numOfVisibleRows: {
                get: function() {
                    let contentHeight = this.currentTextElement.height();
                    return Math.ceil(contentHeight / this.lineHeight - 0.1);
                }
            },

            isOverflowing: {
                get: function() {
                    return this.numOfActualRows > this.numOfWholeRows;

                }
            }
        }
    }

</script>

<style scoped lang="less">
.jf-text-box {
    height: auto;
    .jf-text-box-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .jf-text-box-content-full,
        .jf-text-box-content-stage,
        .jf-text-box-content-current {
            white-space: pre-wrap;
            width: 100%;
            word-wrap: break-word;
            height: 100%;
        }

    .jf-text-box-content-stage,
        .jf-text-box-content-full {
            display: none;
        }
        .jf-text-box-show-all {
            display: inline;
            font-weight: 800;
            cursor: pointer;
        }
    }

    .text-box-show-all-modal {
        .modal-body.simple-text {
            word-wrap: break-word;
        }
    }
}    

</style>
