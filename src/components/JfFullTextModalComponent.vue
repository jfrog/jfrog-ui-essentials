<template>
    <b-modal
        ref="jfModal"
        id="jfModal"
        :ok-only="okOnly"
        @ok="$ok"
        ok-title="Close"
        ok-variant="secondary"
        >
        <template slot="modal-title">
            <h3 class="modal-title" id="popup-header">{{title}}</h3>
        </template>

        <div class="modal-body simple-text" v-if="text">
            <p v-html="text" class="full-text-item"></p>
        </div>
        <div class="modal-body text-to-list" v-if="list">
            <p v-for="(item,index) in list" :key="index" class="full-text-item" v-html="item" @click="onItemClick(item)"></p>
        </div>
    </b-modal>
</template >
<script>
    import ModalMixins from "./ModalMixins.js";
    export default {
        name: 'jf-fulltext-modal',
        props: [
            "title",
            "text",
            "list",
            "listItemClickCB"
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
        }
};

</script>

<!-- NOTE: have removed scoped from this component's style temporarily -->
<style lang="less">
    .modal.fade {
        opacity:inherit;
    }
</style>
