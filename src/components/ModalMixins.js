export default {
    props: [
        "_keyboard",
        "_backdrop",
        "_result"
    ],
    data() {
        return {
            noCloseOnBackDrop: this._backdrop != 'static',
            noCloseOnEsc: this._keyboard,
            _promiseIsPending: true,
        }
    },
    methods: {
        $ok(){
            this.$close(true);
        },
        $close(succeeded) {
            if (this.$props._result) {
                this._promiseIsPending = !this._promiseIsPending;
                if (succeeded) {
                    this.$props._result.resolve();
                } else  {
                    this.$props._result.reject();
                }
            }
            this.$refs.jfModal.hide();
        },
        $dismiss() {
            if (this.$props._result) {
                this._promiseIsPending = !this
                    ._promiseIsPending
                this.$props._result.reject()
            }
            this.$refs.jfModal.hide();
        },
        _handleHide() {
            if (this.$props._result && this._promiseIsPending) {
                this.$props._result.reject();
            }
        }
    }
}
