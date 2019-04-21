<template>

    <div>
        <component v-if="compiledTemplate" :is="compiledTemplate.$options"></component>
<!--
        <div class="compile-placeholder"></div>
-->
    </div>

</template>

<script>

    export default {
        name: 'jf-vscroll-element',
        props: [
            'data',
            'template',
            'variable',
            'index',
            'vscroll'
        ],
        'jf@inject': [
            '$scope',
            '$compile',
            '$element',
            '$timeout'
        ],
        data() {
            return {
                compiledTemplate: null
            };
        },
        computed: {
        },
        created() {

/*
            let unwatchHeight = this.$scope.$watch('jfVScrollElement.childrenHeight', () => {
                if (this.childrenHeight && this.childrenHeight > 1) {
                    this.vscroll.setItemHeight(this.childrenHeight);
                    unwatchHeight();
                }
            });
*/

        },
        watch: {
        },
        mounted() {
            let elementScope = this.$scope.$parent.$parent.$new({
                [this.variable]: this.data,
                v_index: () => this.index
            });

//            let target = $(this.$element).find('.compile-placeholder');

            this.elementScope = elementScope;
            let tplE = $(`<div><div>${ this.template }</div></div>`);
            this.compiledTemplate = this.$compile(tplE.children()[0])(elementScope);
//              target.replaceWith(tplE.children()[0]);
            Vue.nextTick(() => {
                this.vscroll.setItemHeight(this.childrenHeight());
                this.$scope.$watch('jfVScrollElement.data', () => {
                    if (!this.elementScope || !this.variable || !this.data) return;
                    this.elementScope[this.variable] = this.data;
                });
            })
        },
        ng1_legacy: {
            'controllerAs': 'jfVScrollElement'
        },
        methods: {
            childrenHeight() {
                return $(this.$element).children().height() || 50;
            }
        }
    }

</script>

<style scoped lang="less">



</style>
