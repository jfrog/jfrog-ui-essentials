<template>
  <div v-if="name === currentTabName">
    <slot />
  </div>
</template>

<script>
    export default {
        name: 'JfTab',
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
