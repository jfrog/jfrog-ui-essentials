<template>

    <div>
        <div class="spinner-msg-local" v-if="!waitFor && (!delaySpinner || showSpinner)">
            <div class="icon-hourglass-local"></div>
        </div>
        <slot v-if="waitFor"></slot>
    </div>

</template>

<script>

    export default {
        name: 'jf-pending-data',
        props: [
            'waitFor',
            'delaySpinner'
        ],
        data() {
            return { showSpinner: null };
        },
        mounted() {
            if (this.delaySpinner) {
                setTimeout(() => {
                    this.showSpinner = true;
                }, !_.isNaN(parseInt(this.delaySpinner)) ? this.delaySpinner : 400);
            }
        }
    }

</script>

<style scoped lang="less">

    

</style>
