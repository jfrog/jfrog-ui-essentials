<template>
  <div
    class="jf-switch-toggler"
    :class="{'left-option-selected' : isLeftOptionOn,
             'right-option-selected' : !isLeftOptionOn}"
  >
    <span class="left-option-text jf-toggler-text">{{ leftOption.text }}></span>
    <jf-toggler
      v-model="isLeftOptionOn"
      @input="toggleSelection()"
    />
    <span class="right-option-text jf-toggler-text">{{ rightOption.text }}</span>
  </div>
</template>

<script>

    export default {
        name: 'JfSwitchToggler',
        props: [
            'value',
            'options'
        ],
        data() {
            return {
                isLeftOptionOn: null,
                leftOption: { text: null },
                rightOption: { text: null },
                model: this.value
            };
        },
        created() {
            if (!this.options)
                throw 'Must supply options';
            // Supports 2 methods of options:
            // array of strings
            // array of objects of type {'value': ..., 'text': ...}
            // The model is assigned the value, and the text is displayed

            this.setOptionObjects();
            if (_.isEmpty(this.model)) {
                this.model = this.leftOption.value;
            }
            this.isLeftOptionOn = this.model === this.leftOption.value;
        },
        methods: {
            toggleSelection() {
                this.model = this.model === this.leftOption.value ? this.rightOption.value : this.leftOption.value;
                this.$emit('input', this.model);

            },
            setOptionObjects() {
                let optionObjects = this.options.map(option => {
                    if (typeof option === 'string')
                        return {
                            value: option,
                            text: option
                        };
                    else {
                        return option;
                    }
                });

                this.leftOption = optionObjects[0];
                this.rightOption = optionObjects[1];
            }
        }
    }

</script>

<style scoped lang="less">
@import "../../assets/stylesheets/variables";

.jf-switch-toggler {
  &.left-option-selected {
    span.left-option-text {
      color: @greenBGPrimary;
    }
  }
  &.right-option-selected {
    span.right-option-text {
      color: @greenBGPrimary;
    }
  }
  span[class^="text-"] {
    font-size: 12px;
  }

  .switch-toggle {
    &.left,&.right {
      background: @greenBGPrimary; // fallback
    }
  }
}

</style>
