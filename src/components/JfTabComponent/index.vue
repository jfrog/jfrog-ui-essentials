<template>
    <div>
        <div v-if="name === currentTabName">
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
        computed: {
            currentTabName: function() {
                return this.$parent.currentTab.name;
            }
        }
    }
</script>
