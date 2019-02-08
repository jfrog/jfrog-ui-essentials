const removeClassIfNecessary = function (selector, className) {
    const element = $(selector);
    if (element.hasClass(className)) {
        element.removeClass(className);
    }
}

const hack = function(){
    Vue.nextTick()
        .then(() => {
            removeClassIfNecessary('#jfModal___BV_modal_outer_',"show");
            removeClassIfNecessary('#jfModal',"show");
            $('#jfModal___BV_modal_outer_').parent().remove();//Remove any existing modal divs
        });
};
export default {
    props: [
        'uiEssNoCloseOnEsc',
        'uiEssNoCloseOnBackdrop',
        'uiEssModalPromise',
        'uiEssSize',
        'dontRejectOnClose',
        'uiEssModalClass',
    ],
    data() {
        return {
            modalProps: {
                ref: 'jfModal',
                id: 'jfModal',
                centered: true,
                'modal-class': this.uiEssModalClass || '',
                'no-close-on-esc': this.uiEssNoCloseOnEsc,
                'no-close-on-backdrop': this.uiEssNoCloseOnBackdrop,
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
                this.promiseIsPending = false
                this.$props.uiEssModalPromise.resolve()
            } else {
                this.$dismiss()
            }
            this.$refs.jfModal.hide()
        },
        //Added for backward compatibility
        dismiss() {
            this.$dismiss()
        },
        _afterModalHidden(){
            hack();
        },
        $dismiss() {
            if (!this.dontRejectOnClose && this.$props.uiEssModalPromise) {
                this.promiseIsPending = false
                this.$props.uiEssModalPromise.reject()
            }
            this.$refs.jfModal.hide()
        },
        _handleHide() {
            setTimeout(hack,10);
            if (this.dontRejectOnClose) {
                return
            }
            if (this.$props.uiEssModalPromise && this.promiseIsPending) {
                this.$props.uiEssModalPromise.reject()
            }
        },
    },
}
