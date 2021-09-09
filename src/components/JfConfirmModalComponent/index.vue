<template>
  <b-modal
    v-bind="modalProps"
    @hide="_handleHide"
    @hidden="_afterModalHidden"
  >
    <template slot="modal-title">
      <div
        id="popup-header"
        v-html="sanitizedTitle"
      />
    </template>
    <template slot="modal-footer">
      <jf-checkbox
        v-if="checkboxLabel"
        class="pull-left"
        :text="checkboxLabel"
      >
        <input
          v-model="checkbox.checked"
          type="checkbox"
          @change="onCheckboxStateChange(checkbox.checked)"
        >
      </jf-checkbox>
      <button
        id="popup-cancel"
        class="btn btn-default"
        @click="$dismiss()"
      >
        {{ int_buttons.cancel }}
      </button>
      <button
        id="popup-confirm"
        class="btn btn-primary"
        @click="$close(true)"
      >
        {{ int_buttons.confirm }}
      </button>
    </template>
    <div v-html="sanitizedContent" />
  </b-modal>
</template>
<script>
    import ModalMixins from "@/mixins/ModalMixins/index.js";
    export default {
        name: 'JfModal',
        mixins: [ModalMixins],
        props: [
            "title",
            "buttons",
            "content",
            "checkbox",
            "checkboxLabel",
            "checkBoxChangeListener"
        ],
        'jf@inject': [
            '$sanitize'
        ],
        data() {
            let int_buttons = this.buttons || {};
            int_buttons.cancel = int_buttons.cancel || "Cancel";
            int_buttons.confirm = int_buttons.confirm || "Confirm";
            return {
                int_buttons
            };
        },
        computed: {
            sanitizedTitle() {
                return this.$sanitize(this.title);
            },
            sanitizedContent() {
                return this.$sanitize(this.content);
            }
        },
        methods: {
            onCheckboxStateChange(state) {
                if (typeof this.checkBoxChangeListener == "function"){
                    this.checkBoxChangeListener(state);
                }
            }
        }
};

</script>

<!-- NOTE: have removed scoped from this component's style temporarily -->
<style lang="less">
    .modal.fade {
        opacity:inherit;
    }
</style>
