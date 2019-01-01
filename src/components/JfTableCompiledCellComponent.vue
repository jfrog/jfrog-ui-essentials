<template>

    <div>
        <div class="compile-this"></div>
    </div>

</template>

<script>

    export default {
        name: 'jf-table-compiled-cell',
        props: [
            'field',
            'rowId',
            'tableRow'
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

            this.$scope.$watch('compiledCell.tableRow.data', () => {
                console.log('????');
                this.compile();
            });
        },
        ng1_legacy: { 'controllerAs': 'compiledCell' },
        methods: {
            compile() {
                let elem = $(this.$element).find(`.compile-this`);
                this.tableRow.tableView.compileTemplate(elem, this.field, this.rowId);
            }
        }
    }

</script>

<style scoped lang="less">



</style>
