<template>

    <div>
        <div></div>
    </div>

</template>

<script>

    export default {
        name: 'jf-summary-row-item',
        props: [
            'colTemplate',
            'colScope',
            'noWrap'
        ],
        'jf@inject': [
            '$element',
            '$compile'
        ],
        data() {
            return {};
        },
        mounted() {
            let placeholder = this.$element.find('div');
            let col = $(this.noWrap ? `${ this.colTemplate }` : `<span>${ this.colTemplate }</span>`);
            let e = this.$compile(col)(this.colScope);
            placeholder.after(e);
            placeholder.remove();
        },
        ng1_legacy: { 'controllerAs': '$ctrl' }
    }

</script>

<style scoped lang="less">

    

</style>
