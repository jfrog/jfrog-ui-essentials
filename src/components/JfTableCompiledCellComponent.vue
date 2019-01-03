<template>

    <div>
        <div class="compile-this"></div>
    </div>

</template>

<script>
    import { IdState } from 'vue-virtual-scroller';

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
            this.$scope.$watch('compiledCell.tableRow.data', () => {
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
