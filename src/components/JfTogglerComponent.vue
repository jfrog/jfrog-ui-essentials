<template>

    <div>
        <div class="switch-toggle" :class="{'left': isToggledToLeft, 'right': !isToggledToLeft}" @click="toggleSelection()">
            <span></span>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-toggler',
        props: ['isToggledToLeft'],
        data() {
            return {};
        },
        mounted() {
            this.isToggledToLeft = !!this.isToggledToLeft;
        },
        ng1_legacy: { 'controllerAs': '$ctrl' },
        methods: {
            toggleSelection() {
                this.isToggledToLeft = !this.isToggledToLeft;
    
                /* Todo: check the following condition. It may contain some undefined references: this.onToggle */
                if (typeof this.onToggle === 'function') {
                    this.$emit('on-toggle');
                }
            }
        }
    }

</script>

<style scoped lang="less">

    

</style>
