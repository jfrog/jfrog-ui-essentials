<template>
  <b-modal
    id="jfModal"
    ref="jfModal"
    :ok-only="okOnly"
    ok-title="Close"
    ok-variant="secondary"
    @ok="$ok"
    @hide="_handleHide"
    @hidden="_afterModalHidden"
  >
    <template slot="modal-title">
      <div id="popup-header">
        {{ title }}
      </div>
    </template>

    <div
      v-if="text"
      class="modal-body simple-text"
    >
      <p
        class="full-text-item"
        v-html="sanitizedText"
      />
    </div>
    <div
      v-if="list"
      class="modal-body text-to-list"
    >
      <p
        v-for="(item,index) in sanitizedList"
        :key="index"
        class="full-text-item"
        @click="onItemClick(item)"
        v-html="item"
      />
    </div>
  </b-modal>
</template>
<script>
    import ModalMixins from "@/mixins/ModalMixins/index.js";
    export default {
        name: 'JfFulltextModal',
        mixins: [ModalMixins],
        props: [
            "title",
            "text",
            "list",
            "listItemClickCB"
        ],
        'jf@inject': [
            '$sanitize'
        ],
        data() {
            return {
                okOnly: true,
            };
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
