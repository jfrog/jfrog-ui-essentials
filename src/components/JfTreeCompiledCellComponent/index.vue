<template>

    <div>
        <div class="compile-this"></div>
    </div>

</template>

<script>

    export default {
        name: 'jf-tree-compiled-cell',
        props: [
            'itemId',
            'treeItem'
        ],
        'jf@inject': [
            '$element',
            '$timeout',
            '$scope'
        ],
        data() {
            return {};
        },
        mounted() {

            this.$scope.$watch('compiledCell.treeItem.data', () => {
                this.compile();
            });
        },
        ng1_legacy: { 'controllerAs': 'compiledCell' },
        methods: {
            compile() {
                let elem = $(this.$element).find(`.compile-this`);
                this.treeItem.tree.compileTemplate(elem, this.itemId);
            }
        }
    }

</script>

<style scoped lang="less">



</style>
