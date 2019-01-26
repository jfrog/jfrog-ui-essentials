export default {
    props: [
        'uiEssNoCloseOnEsc',
        'uiEssNoCloseOnBackdrop',
        'uiEssModalPromise',
        'uiEssSize',
        'dontRejectOnClose',
    ],
    data() {
        return {
            modalProps: {
                ref: 'jfModal',
                id: 'jfModal',
                centered: true,
                'no-close-on-esc': this.uiEssNoCloseOnEsc,
                'no-close-on-backdrop': this.uiEssNoCloseOnBackdrop,
                'on:hide': '_handleHide',
                size:
                    this.uiEssSize == 'lg' || this.uiEssSize == 'sm'
                        ? this.uiEssSize
                        : '',
            },
            promiseIsPending: true,
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (typeof this._size == 'number') {
                $('.modal-dialog').css('max-width', this._size)
            }
        })
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
            if (succeeded && this.$props.uiEssModalPromise) {
                    this.promiseIsPending = false;
                    this.$props.uiEssModalPromise.resolve()
            } else {
                this.$dismiss();
            }
            this.$refs.jfModal.hide()
        },
        //Added for backward compatibility
        dismiss() {
            this.$dismiss()
        },

        $dismiss() {
            if (!this.dontRejectOnClose && this.$props.uiEssModalPromise) {
                this.promiseIsPending = false;;
                this.$props.uiEssModalPromise.reject();
            }
            this.$refs.jfModal.hide();
        },
        _handleHide() {
            if (this.dontRejectOnClose) {
                return;
            }
            if (this.$props.uiEssModalPromise && this.promiseIsPending) {
                this.$props.uiEssModalPromise.reject();
            }
        },
    },
}
