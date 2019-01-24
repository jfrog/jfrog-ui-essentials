<template>

    <div class="jf-tree-indentation">
        <div class="indentation-wrap" :style="{width: (indentation ? indentation.length * 26 : 0) + 'px'}">
            <div class="indentation-flex-wrap" v-html="indentationHtml" v-if="visible">
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-tree-indentation',
        props: [
            'indentation',
            'height',
            'visible',
            'linesBackgrounds'
        ],
        'jf@inject': [
            '$scope',
            '$sce'
        ],
        data() {
            return { indentationHtml: null };
        },
        created() {
            this.$scope.$watch('jfTreeIndentation.indentation', () => {
                if (!this.indentation) return;
                // Build the inner html for the units here in js, it is much faster than using ng-repeat
                let indentationHtml = '';
                let htmlForIndentation = indentation => {
                    if (this.linesBackgrounds[indentation.background]) {
                        return `<div class="indentation-unit" style="height: ${ this.height }; background-image: url('${ this.linesBackgrounds[indentation.background] }')"></div>`;
                    } else {
                        return `<div class="indentation-unit" style="height: ${ this.height };"></div>`;
                    }
                };
                this.indentation.forEach(indentation => {
                    indentationHtml += htmlForIndentation(indentation);
                });
                this.indentationHtml = indentationHtml;
            });
        },
        ng1_legacy: { 'controllerAs': 'jfTreeIndentation' }
    }

</script>

<style scoped lang="less">



</style>
