<template>
    <b-modal
        ref="jfModal"
        id="jfModal"
        :ok-only="okOnly"
        @ok="$ok"
        ok-title="Close"
        ok-variant="secondary"
        @hide="_handleHide"
        @hidden="_afterModalHidden"
        >
        <template slot="modal-title">
            <div id="popup-header">{{title}}</div>
        </template>

        <div class="modal-body simple-text" v-if="text">
            <p v-html="sanitizedText" class="full-text-item"></p>
        </div>
        <div class="modal-body text-to-list" v-if="list">
            <p v-for="(item,index) in sanitizedList"
               :key="index"
               class="full-text-item"
               v-html="item"
               @click="onItemClick(item)">
            </p>
        </div>
    </b-modal>
</template>
<script>
    import ModalMixins from "@/mixins/ModalMixins/index.js";
    export default {
        name: 'jf-fulltext-modal',
        props: [
            "title",
            "text",
            "list",
            "listItemClickCB"
        ],
        'jf@inject': [
            '$sanitize'
        ],
        mixins:[ModalMixins],
        data() {
            return {
                okOnly: true,
            };
        },
        methods: {
            onItemClick(item){
                this.$refs.jfModal.hide();
                if (typeof this.listItemClickCB == "function") {
                    this.listItemClickCB(item);
                }
            }
        },
        computed: {
            sanitizedText() {
                return this.text ? this.$sanitize(this.text) : '';
            },
            sanitizedList() {
                if (this.list && Array.isArray(this.list)) {
                    return this.list.map(item => this.$sanitize(item));
                }
                return [];
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
