<template>

    <div></div>

</template>

<script>

    export default {
        name: 'jf-summary-row',
        props: [
            'columns',
            'parentScope'
        ],
        data() {
            return {};
        },
        mounted() {
            this.filterOutUnactiveColumns();
            this.setColumnsLayout();
        },
        ng1_legacy: { 'controllerAs': '$ctrl' },
        methods: {
            filterOutUnactiveColumns() {
                this.columnsToShow = _.filter(this.columns, col => {
                    return col.isActive;
                });
            },
            setColumnsLayout() {
                let layout = '';
                _.forEach(this.columnsToShow, col => {
                    if (!col.width) {
                        col.width = '1fr';
                    }
                    layout += `${ col.width } `;
                });
                this.inlineStyle = {
                    gridTemplateColumns: layout,
                    '-ms-grid-columns': layout
                };
            }
        }
    }

</script>

<style scoped lang="less">

    

</style>
