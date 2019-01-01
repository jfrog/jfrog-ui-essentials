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
    
            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    
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
