<template>
  <div>
    <span>
      <label
        v-if="text"
        class="jf-radio-button"
      >
        <span /> {{ text }}
        <span
          v-if="helper"
          class="helper"
        >{{ helper }}</span>
      </label>
      <label
        v-if="!text"
        class="jf-radio-button"
      >
        <span />
        <span
          slot="template"
          @click="onClickTemplate()"
        />
        <span
          v-if="helper"
          class="helper"
        >{{ helper }}</span>
      </label>
    </span>
  </div>
</template>

<script>

    export default {
        name: 'JfRadioButton',
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

            this.$transclude((clone) => {
                this.$element.find('label').prepend(clone);
            });

            this.$set(this.$scope, 'onClickTemplate', () => {
                $(this.$element).parent().find('input[type=radio]').prop('checked', false);
                $(this.$element).find('input[type=radio]').prop('checked', true);
            });
        }
    }

</script>

<style scoped lang="less">

    .jf-radio-button {
        font-weight: 100;
        input[type="radio"] {
            position: absolute;
            opacity: 0;
        }

        input[type="radio"] + span {
            display: inline-block;
            background: #fff url(../../assets/images/radio.png) left top no-repeat;
            width: 17px;
            height: 17px;
            margin: -1px 5px 0 0;
            position: relative;
            vertical-align: middle;
        }



        input[type="radio"][disabled],
        input[type="radio"][disabled] + span,
        input[type="radio"][disabled]:hover + span {
            background-image: url(../../assets/images/radio_disabled.png);
        }
        input[type="radio"][disabled]:checked + span,
        input[type="radio"][disabled]:hover:checked + span {
            background-image: url(../../assets/images/radio_checked_disabled.png);
        }

        /*
        input[type="radio"]:focus + span {
          background-image: url(images/radio_hover.png);
        }
        */

        &:hover input[type="radio"] + span {
            background-image: url(../../assets/images/radio_hover.png);
        }

        input[type="radio"]:checked + span,
        input[type="radio"]:hover:checked + span {
            background-image: url(../../assets/images/radio_checked.png);
        }

        .helper {
            display: block;
            padding-left: 26px;
            color: #9e9e9e;
        }
    }

    jf-radio-button + jf-radio-button {
        margin-left: 30px;
    }


</style>
