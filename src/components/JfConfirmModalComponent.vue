<template>
    <b-modal
        ref="jfModal"
        id="jfModal"
        @hide="_handleHide"
        :no-close-on-backdrop="noCloseOnBackDrop"
        :no-close-on-esc="noCloseOnEsc"
        >
        <template slot="modal-title">
            <h4 class="modal-title" id="popup-header" v-html="title"></h4>
        </template>
        <template slot="modal-footer">
                <!-- TODO -->
                <!-- <jf-checkbox ng-if="checkboxLabel"
                            class="pull-left"
                            text="{{checkboxLabel}}">
                    <input type="checkbox"
                        ng-change="onCheckboxStateChange(checkbox.checked)"
                        ng-model="checkbox.checked">
                </jf-checkbox> -->
                <button class="btn btn-default" @click="$dismiss()" id="popup-cancel">{{int_buttons.cancel}}</button>
                <button class="btn btn-primary" @click="$close(true)" id="popup-confirm">{{int_buttons.confirm}}</button>
        </template>
        <div v-html="content"></div>
    </b-modal>
</template >
<script>
    import ModalMixins from "./ModalMixins.js";
    export default {
        name: 'jf-modal',
        props: [
            "title",
            "buttons",
            "content"
        ],
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
