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
        methods: {
            getCurrentTabName() {
                return this.$parent.currentTab && this.$parent.currentTab.name;
            }
        },
        ng1_legacy: { require: '^jfTabs' }
    }

</script>

<style scoped lang="less">



</style>
