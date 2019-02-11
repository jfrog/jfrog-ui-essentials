<template>
    <b-modal v-bind="modalProps" @hide="_handleHide" @hidden="_afterModalHidden">
        <template slot="modal-title">
            <h4 class="modal-title" id="popup-header" v-html="title"></h4>
        </template>
        <template slot="modal-footer">
                <jf-checkbox v-if="checkboxLabel"
                            class="pull-left"
                            :text="checkboxLabel">
                    <input type="checkbox"
                        @change="onCheckboxStateChange(checkbox.checked)"
                        v-model="checkbox.checked">
                </jf-checkbox>
                <button class="btn btn-default" @click="$dismiss()" id="popup-cancel">{{int_buttons.cancel}}</button>
                <button class="btn btn-primary" @click="$close(true)" id="popup-confirm">{{int_buttons.confirm}}</button>
        </template>
        <div v-html="content"></div>
    </b-modal>
</template>
<script>
    import ModalMixins from "@/mixins/ModalMixins/index.js";
    export default {
        name: 'jf-modal',
        props: [
            "title",
            "buttons",
            "content",
            "checkbox",
            "checkboxLabel",
            "checkBoxChangeListener"
        ],
        methods:{
            onCheckboxStateChange(state) {
                if (typeof this.checkBoxChangeListener == "function"){
                    this.checkBoxChangeListener(state);
                }
            }
        },
        mixins:[ModalMixins],
        data() {
            return {
                int_buttons: this.buttons || {
                    cancel: "Cancel",
                    confirm: "Confirm"
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
