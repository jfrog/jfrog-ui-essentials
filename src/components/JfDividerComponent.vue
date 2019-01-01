<template>

    <div>
        <div class="jf-divider-container">
            <div class="jf-divider-header">{{text}}</div>
            <div class="jf-divider-line"></div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-divider',
        props: ['text'],
        data() {
            return {};
        },
        ng1_legacy: { 'controllerAs': '$ctrl' }
    }

</script>

<style scoped lang="less">

    

</style>
