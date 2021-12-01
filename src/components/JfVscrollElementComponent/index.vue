<template>

    <div>
        <component v-if="compiledProps" :is="template" v-bind="compiledProps"></component>
    </div>

</template>

<script>
    import {VueFactory} from "../../services/VueFactory";

    export default {
        name: 'jf-vscroll-element',
        props: [
            'data',
            'template',
            'variable',
            'index',
            'last',
            'vscroll'
        ],
        'jf@inject': [
            '$scope',
            '$compileComp',
            '$element',
            '$timeout'
        ],
        data() {
            return {
                compiledProps: null
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
            let elementScope = {
                [this.variable]: this.data,
                v_index: () => this.index,
                is_last: () => this.last
            };

//            this.compiledTemplate = this.$compileComp(this.template, {});
            this.compiledProps = elementScope;
            const { Vue } = VueFactory.getInstance();
            Vue.nextTick(() => {
                this.vscroll.setItemHeight(this.childrenHeight());
                this.$scope.$watch('jfVScrollElement.data', () => {
                    if (!this.compiledProps || !this.variable || !this.data) return;
                    this.compiledProps[this.variable] = this.data;
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
