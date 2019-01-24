<template>
    <b-modal
        ref="jfModal"
        id="jfModal"
        :ok-only="okOnly"
        ok-title="Close"
        @ok="$ok"
        ok-variant="secondary"
        >
        <template slot="modal-title">
            <h4 class="modal-title" id="popup-header" v-html="title"></h4>
        </template>

        <p ng-if="beforeMessage" ng-bind-html="beforeMessage"></p>

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
</template >
<script>
    import ModalMixins from "./ModalMixins.js";
    export default {
        name: 'jf-modal',
        props: [
            "title",
            "content",
            "objectName",
            "mode"
        ],
        mixins:[ModalMixins],
        data() {
            return {
                okOnly: true,
                int_mode: this.mode || {
                    name: ""
                }
            };
        }
};

</script>

<!-- NOTE: have removed scoped from this component's style temporarily -->
<style lang="less">
    .modal.fade {
        opacity:inherit;
    }
</style>
