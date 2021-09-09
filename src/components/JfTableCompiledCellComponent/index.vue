<template>
  <div>
    <component
      :is="compiledTemplate.comp"
      v-if="compiledTemplate"
      v-bind="compiledTemplate.props"
    />
  </div>
</template>

<script>
    export default {
        name: 'JfTableCompiledCell',
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
