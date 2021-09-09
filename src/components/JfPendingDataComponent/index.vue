<template>
  <div>
    <div
      v-if="!waitFor && (!delaySpinner || showSpinner)"
      class="spinner-msg-local"
    >
      <div class="icon-hourglass-local" />
    </div>
    <slot v-if="waitFor" />
  </div>
</template>

<script>

    export default {
        name: 'JfPendingData',
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
