<template>
  <div />
</template>

<script>

    /* ---------------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------------- */



        // No need for this component being converted. Simply use -
        //   <input v-on:keyup.enter="callback">



    /* ---------------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------------- */



    import KEYS from '@/constants/keys.constants.js';
    export default {
        name: 'JfEnterPress',
        'jf@inject': [
            '$element',
            '$scope'
        ],
        data() {
            return {};
        },
        mounted() {

            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
            this.$element.on('keypress', e => this._onKeyPress(e));

            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
            this.$scope.$on('$destroy', () => this.$element.off('keypress'));
        },
        ng1_legacy: { 'controllerAs': 'jfEnterPress' },
        methods: {
            _onKeyPress(e) {
                if (e.keyCode != KEYS.ENTER)
                    return;
                e.preventDefault();
                this.$emit('callback');
                if (!this.$scope.$phase)
                    this.$scope.$apply();
            }
        }
    };

</script>

<style scoped lang="less">



</style>
