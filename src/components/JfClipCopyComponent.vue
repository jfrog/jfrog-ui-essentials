<template>

    <div><span class="clip-copy-button">
        <a ng-show="!isSafari && !!textToCopy" class="copy-to-clip icon icon-copy-to-clipboard-2" :data-clipboard-text="textToCopy" v-jf-tooltip.bind="tooltipText"></a>
        <a ng-show="isSafari && !!textToCopy" class="copy-to-clip icon icon-copy-to-clipboard" v-clip-copy="'textToCopy'" clip-click="onSuccessfulCopy()" v-jf-tooltip.bind="tooltipText"></a>
    </span>
    
    </div>

</template>

<script>

    export default {
        name: 'jf-clip-copy',
        props: [
            'textToCopy',
            'objectName'
        ],
        'jf@inject': [
            '$timeout',
            '$scope',
            '$element'
        ],
        data() {
            return {
                isSafari: null,
                tooltipText: null
            };
        },
        created() {
    
            this.FEEDBACK_DELAY = 4000;
    
            this.timeoutPromise = null;
    
            this.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        },
        mounted() {
            if (this.objectName) {
                this.origTooltip = this.tooltipText = 'Copy ' + this.objectName.toLowerCase() + ' to clipboard';
            } else {
                this.origTooltip = this.tooltipText = 'Copy to clipboard';
            }   
    
            let target = this.$element.find('a')[0];
    
            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    
            if (!this.isSafari) {
                //initialize Clipboard.js
                let target = this.$element.find('a')[0];
                this.clipboard = new Clipboard(target);
                this.clipboard.on('success', e => {
                    this.onSuccessfulCopy();
                    this.$scope.$apply();
                });
    
                this.clipboard.on('error', e => {
                });
    
                this.$scope.$on('$destroy', () => {
                    this.clipboard.destroy();
                });
            }   
    
    
        },
        ng1_legacy: {
            ng1postLinkFn($scope, $element, $attrs) {
                let classList = $element[0].classList;
                let outer = angular.element($element[0]);
                let inner = angular.element($($element[0]).find('a'));
    
                for (let i = classList.length - 1; i >= 0; i--) {
                    let cls = classList[i];
                    if (!cls.startsWith('ng-')) {
                        outer.removeClass(cls);
                        inner.addClass(cls);
                    }
                }
            },
            'controllerAs': 'jfClipCopy'
        },
        methods: {
            onSuccessfulCopy() {
    
                if (!this.textToCopy)
                    return;
    
                if (this.timeoutPromise) {
                    this.$timeout.cancel(this.timeoutPromise);
                    this.timeoutPromise = null;
                }
    
                this.tooltipText = this.objectName ? this.objectName.charAt(0).toUpperCase() + this.objectName.substr(1) + ' copied to clipboard' : 'Value copied to clipboard';
                this.timeoutPromise = this.$timeout(() => {
                    this.tooltipText = this.origTooltip;
                }, this.FEEDBACK_DELAY);   
    
            }
        }
    }

</script>

<style scoped lang="less">

    

</style>
