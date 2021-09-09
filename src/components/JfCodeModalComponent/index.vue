<template>
  <b-modal
    v-bind="modalProps"
    :ok-only="okOnly"
    ok-title="Close"
    ok-variant="secondary"
    @ok="$ok"
    @hide="_handleHide"
    @hidden="_afterModalHidden"
  >
    <template slot="modal-title">
      <div
        id="popup-header"
        v-html="sanitizedTitle"
      />
    </template>

    <p
      v-if="beforeMessage"
      v-html="sanitizedBeforeMessage"
    />

    <div class="codemirror-wrapper">
      <jf-clip-copy
        :text-to-copy="content || ''"
        class="code-mirror-copy"
        show-copy-text="true"
        :object-name="objectName || 'Content'"
      />
      <jf-code-mirror
        v-model="content"
        :mode="int_mode.name || ''"
      />
    </div>
  </b-modal>
</template>
<script>
    import ModalMixins from "@/mixins/ModalMixins/index.js";
    export default {
        name: 'JfModal',
        mixins: [ModalMixins],
        props: [
            "title",
            "content",
            "objectName",
            "mode",
            "beforeMessage"
        ],
        'jf@inject': [
            '$sanitize'
        ],
        data() {
            return {
                okOnly: true,
                int_mode: this.mode || {
                    name: ""
                }
            };
        },
        computed: {
            sanitizedBeforeMessage() {
                return this.$sanitize(this.beforeMessage);
            },
            sanitizedTitle() {
                return this.$sanitize(this.title);
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
