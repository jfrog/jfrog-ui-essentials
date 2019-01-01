<template>

    <div>
        <div class="spinner-msg-local" v-if="waitFor === undefined && (!delaySpinner || showSpinner)">
            <div class="icon-hourglass-local"></div>
        </div>
        <slot v-if="waitFor !== undefined"></slot>
    </div>

</template>

<script>

    export default {
        name: 'jf-pending-data',
        props: [
            'waitFor',
            'delaySpinner'
        ],
        'jf@inject': ['$timeout'],
        data() {
            return { showSpinner: null };
        },
        mounted() {
            if (this.delaySpinner) {
                this.$timeout(() => {
                    this.showSpinner = true;
                }, !_.isNaN(parseInt(this.delaySpinner)) ? this.delaySpinner : 400);
            }
        },
        ng1_legacy: { 'controllerAs': '$ctrl' }
    }

</script>

<style scoped lang="less">

    

</style>
