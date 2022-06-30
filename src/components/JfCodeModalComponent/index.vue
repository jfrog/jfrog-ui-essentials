<template>
    <b-modal
        v-bind="modalProps"
        :ok-only="okOnly"
        ok-title="Close"
        @ok="$ok"
        ok-variant="secondary"
        @hide="_handleHide"
        @hidden="_afterModalHidden"
        >
        <template slot="modal-title">
            <div id="popup-header" v-html="sanitizedTitle"></div>
        </template>

        <p v-if="beforeMessage" v-html="sanitizedBeforeMessage"></p>

        <div class="codemirror-wrapper">
            <jf-clip-copy :text-to-copy="content || ''"
                        class="code-mirror-copy"
                        show-copy-text="true"
                        :object-name="objectName || 'Content'"></jf-clip-copy>
            <jf-code-mirror
                    :mode="int_mode.name || ''"
                    v-model="content">
            </jf-code-mirror>
        </div>
    </b-modal>
</template>
<script>
    import ModalMixins from "@/mixins/ModalMixins/index.js";
    import SanitizeMixin from "../../mixins/Sanitize";
    export default {
        name: 'jf-modal',
        props: [
            "title",
            "content",
            "objectName",
            "mode",
            "beforeMessage"
        ],
        mixins:[ModalMixins, SanitizeMixin],
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
