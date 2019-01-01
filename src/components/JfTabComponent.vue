<template>

    <div>
        <div v-if="getCurrentTabName() === name">
            <slot></slot>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-tab',
        props: ['name'],
        data() {
            return {};
        },
        ng1_legacy: { require: '^jfTabs' }
    }

</script>

<style scoped lang="less">

    

</style>
