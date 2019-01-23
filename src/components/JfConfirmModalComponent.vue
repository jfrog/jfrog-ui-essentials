<template>
    <b-modal
        ref="jfModal"
        id="jfModal"
        @hide="handleHide"
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
                <button class="btn btn-default" @click="handleCancel()" id="popup-cancel">{{int_buttons.cancel}}</button>
                <button class="btn btn-primary" @click="handleOk()" id="popup-confirm">{{int_buttons.confirm}}</button>
        </template>
        <div v-html="content"></div>
    </b-modal>
</template >
<script>
    export default {
        name: 'jf-modal',
        props: [
            "title",
            "buttons",
            "content",
            "result",
            "keyboard",
            "backdrop"
        ],
        data() {
            return {
                int_buttons: this.buttons || {
                    cancel: "Cancel",
                    confirm: "Confirm"
                },
                noCloseOnBackDrop: this.backdrop != 'static',
                noCloseOnEsc: this.keyboard,
                promiseIsPending: true
            };
        },

        mounted() {
        },
        methods: {
            handleOk(){
                //Important to resolve the promise before invoking hide
                if( this.$props.result ) {
                    this.promiseIsPending = !this.promiseIsPending;
                    this.$props.result.resolve();
                }
                this.$refs.jfModal.hide();
            },
            handleCancel(){
                if( this.$props.result ) {
                    this.promiseIsPending = !this.promiseIsPending;
                    this.$props.result.reject();
                }
                this.$refs.jfModal.hide();
            },
            handleHide(){
                if( this.$props.result && this.promiseIsPending ) {
                    console.log("In handleHide promise handling");
                    this.$props.result.reject();
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
