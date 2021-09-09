<template>
  <div
    class="jf-switch"
    :class="jfSwitchClass"
  >
    <span
      v-if="jfSwitchTitle"
      class="jf-switch-title"
    >{{ jfSwitchTitle }}</span>
    <jf-help-tooltip
      v-if="helpTooltip"
      :html="helpTooltip"
    />
    <ul class="jf-switch-options">
      <li
        v-for="(option, index) in optionObjects"
        :key="index"
      >
        <a
          class="jf-switch-option"
          href=""
          :class="{active: isSelected(option), disabled: disabled}"
          @click.prevent="selectOption(option)"
        >{{ option.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>

    export default {
        name: 'JfSwitch',
        props: [
            'jfSwitchTitle',
            'options',
            'value',
            'disabled',
            'helpTooltip',
            'jfSwitchClass'
        ],
        data() {
            return { optionObjects: null };
        },
        mounted() {
            if (!this.options)
                throw 'Must supply options';
            // Supports 2 methods of options:
            // array of strings
            // array of objects of type {'value': ..., 'text': ...}
            // The model is assigned the value, and the text is displayed

            this.updateOptionObjects();

            if (_.isEmpty(this.value))
                this.$emit('input', this.optionObjects[0].value);
        },
        methods: {
            updateOptionObjects() {
                this.optionObjects = this.options.map(option => {
                    if (typeof option === 'string')
                        return {
                            value: option,
                            text: option
                        };
                    else
                        return option;
                });
            },
            selectOption(option) {
                if (this.disabled)
                    return;
                this.$emit('input', option.value);
            },
            isSelected(option) {
                return this.value === option.value;
            }
        }
    }

</script>

<style scoped lang="less">
@import "../../assets/stylesheets/variables";
.jf-switch {
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 400;

  .jf-switch-title {
    color: @grayFontDarker;
    margin-right: 10px;
  }

  .jf-switch-options {
    display: inline-block;

    li {
      display: inline-block;
      padding: 0;

      &:not(:first-child)::before {
        content: "|";
        color: @grayFontGeneral;
        padding: 0 4px 0 6px;
      }
    }
  }

  .jf-switch-option {
    font-weight: 400;
    color: @grayFontGeneral;
    text-decoration: none;

    &:hover, &.active {
      color: @greenFontHeader;
    }
    &.disabled {
      color: @grayFontGeneral;
      &.active {
        color: darken(@grayFontGeneral, 30%);
        font-weight: 600;
      }
    }
  }
}

</style>
