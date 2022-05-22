<template>

    <div>
        <component v-if="compiledTemplate" :is="compiledTemplate.comp" v-bind="compiledTemplate.props"></component>
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
            this.setMfeRouter();
            this.$scope.$watch('compiledCell.tableRow.data', () => {
                this.compile();
            });
        },
        ng1_legacy: { 'controllerAs': 'compiledCell' },
        methods: {
            setMfeRouter() {
                const [mfe] = $(this.$element).closest("div[id^=app-]");
                const mfeName = `${mfe.id || ''}`.replace('app-', '');
                window.$jfrog.router = mfeName.length > 0 ? window.$jfrog.routersCache[mfeName] : window.$jfrog.router;
            },
            compile() {
                if (!this.compiledTemplate) {
                    this.compiledTemplate = this.tableRow.tableView.compileTemplate(this.field, this.rowId);
                }
                else {
                    this.compiledTemplate.props = this.tableRow.tableView.compileTemplate(this.field, this.rowId).props;
                }
            }
        }
    }

</script>

<style scoped lang="less">



</style>
