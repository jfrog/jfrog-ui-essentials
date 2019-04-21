<template>

    <div>
        <component v-if="compiledTemplate && compiledTemplate.$options" :is="compiledTemplate.$options"></component>
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
            return {
                compiledTemplate: null
            };
        },
        mounted() {
            this.$scope.$watch('compiledCell.tableRow.data', () => {
                this.compile();
            });
        },
        ng1_legacy: { 'controllerAs': 'compiledCell' },
        methods: {
            compile() {
                this.compiledTemplate = this.tableRow.tableView.compileTemplate(this.field, this.rowId);
            }
        }
    }

</script>

<style scoped lang="less">



</style>
