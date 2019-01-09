<template>

    <div><span>
        <label v-if="text" class="jf-radio-button">
            <span></span> {{ text }}
        <span class="helper" v-if="helper">{{helper}}</span>
        </label>
        <label v-if="!text" class="jf-radio-button">
            <span></span>
            <span slot="template" @click="onClickTemplate()"></span>
            <span class="helper" v-if="helper">{{helper}}</span>
        </label>
        </span>
    </div>

</template>

<script>

    export default {
        name: 'jf-radio-button',
        props: [
            'text',
            'helper'
        ],
        'jf@inject': [
            '$element',
            '$transclude',
            '$timeout',
            '$scope'
        ],
        data() {
            return {};
        },
        mounted() {

            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
            this.$transclude((clone) => {
                this.$timeout(() => {
                    this.$element.find('label').prepend(clone);
                }, 0, false);
            });

            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

            this.$set(this.$scope, 'onClickTemplate', () => {
                this.$timeout(() => {
                    $(this.$element).parent().find('input[type=radio]').prop('checked', false);
                    $(this.$element).find('input[type=radio]').prop('checked', true);
                });
            });
        }
    }

</script>

<style scoped lang="less">



</style>
