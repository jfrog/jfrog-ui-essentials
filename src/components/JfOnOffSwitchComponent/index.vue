<template>
  <div>
    <div
      class="jf-on-off-toggler"
      :class="{'on-selected' : isOn,
               'off-selected' : !isOn}"
    >
      <jf-toggler v-model="isOn" />
      <span class="on-option-text jf-toggler-text">{{ on }}</span>
      <span class="off-option-text jf-toggler-text">{{ off }}</span>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfOnOffSwitch',
        props: [
            'selected',
            'options'
        ],
        data() {
            return {
                on: null,
                isOn: Boolean,
                off: null,
                selectedValue: this.selected
            };
        },
        created() {
            if (!this.options)
                throw 'Must supply options';
            this.on = this.options[0];
            this.off = this.options[1];
            this.selectedValue = this.selectedValue || this.on;
            this.isOn = (this.on === this.selectedValue) ? true : false;
        }
    }

</script>

<style scoped lang="less">
@import "../../assets/stylesheets/variables";
.jf-on-off-toggler {
  &.on-selected {
    span {
      &.on-option-text {
        color: @greenBGPrimary;
      }
      &.off-option-text {
        display: none;
      }
    }
  }
  &.off-selected {
    span {
      &.on-option-text {
        display: none;
      }
      &.off-option-text {
        color: @redToggleOff;
      }
    }
  }

  .switch-toggle {
    &.left {
      background: @greenBGPrimary; // fallback
    }
    &.right {
      background: @redToggleOff; // fallback
    }
  }
}

</style>
