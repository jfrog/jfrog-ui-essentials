export default {
    props: ['_keyboard', '_backdrop', '_result'],
    data() {
        return {
            noCloseOnBackDrop: this._backdrop != 'static',
            noCloseOnEsc: this._keyboard,
            _promiseIsPending: true,
        }
    },
    methods: {
        //Added for backward compatibility
        close() {
            this.$close(true)
        },
        $ok() {
            this.$close(true)
        },
        $close(succeeded) {
            if (this.$props._result) {
                this._promiseIsPending = !this._promiseIsPending
                if (succeeded) {
                    this.$props._result.resolve()
                } else {
                    this.$props._result.reject()
                }
            }
            this.$refs.jfModal.hide()
        },
        //Added for backward compatibility
        dismiss() {
            this.$dismiss()
        },

        $dismiss() {
            if (this.$props._result) {
                this._promiseIsPending = !this._promiseIsPending
                this.$props._result.reject()
            }
            this.$refs.jfModal.hide()
        },
        _handleHide() {
            if (this.$props._result && this._promiseIsPending) {
                this.$props._result.reject()
            }
        },
    },
}
