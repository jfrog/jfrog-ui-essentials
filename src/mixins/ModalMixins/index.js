import Q from 'q'

/*const removeClassIfNecessary = function (selector, className) {
    const element = $(selector);
    if (element.hasClass(className)) {
        element.removeClass(className);
    }
}*/

const hack = function(){
    //Vue.nextTick()
    //    .then(() => {
    //        removeClassIfNecessary('#jfModal___BV_modal_outer_',"show");
    //        removeClassIfNecessary('#jfModal',"show");
    //        $('#jfModal___BV_modal_outer_').parent().remove();//Remove any existing modal divs
    //    });
};

const whenElementIsVisible = function (selector, callBack, count = 0) {
    if ($(selector)[0]) {
        callBack();
    } else if (count < 180) {
        setTimeout(function () {
            whenElementIsVisible(selector, callBack, ++count);
        }, 1000)
    }
}

/*const addClassIfNecessary = function (selector, className) {
    const element = $(selector);
    if (!element.hasClass(className)) {
        element.addClass(className);
    }
}*/
/* This hack causes the modal to become visible immediately.
The issue can be observed if you comment out the next few lines of code
and then try to load the show-all modal from the jf-table-view demo page
(cell template example)
*/
const forceModalVisibility = function () {
    //Vue.nextTick().then(() => {
    //    whenElementIsVisible("#jfModal", () => {
    //        addClassIfNecessary("#jfModal___BV_modal_backdrop_", "show");
    //        addClassIfNecessary("#jfModal", "show");
    //    })
    //});
}

export default {
    'jf@inject': [
        '$q',
    ],
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
                'no-close-on-esc': this.uiEssNoCloseOnEsc || false,
                'no-close-on-backdrop': this.uiEssNoCloseOnBackdrop || false,
                size:
                    this.uiEssSize == 'lg' || this.uiEssSize == 'sm'
                        ? this.uiEssSize
                        : '',
            },
            modalPromise: this.uiEssModalPromise || Q.defer()
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
        show(selector){
            $('#jfModal___BV_modal_outer_').parent().remove();//Remove any existing modal divs
            $(this.$mount().$el).appendTo(selector)
            this.$refs.jfModal.show();
            forceModalVisibility();//hack
        },
        close() { //Added for backward compatibility
            this.$close(true)
        },
        $ok() { //Added for backward compatibility
            this.$close(true)
        },
        $close(succeeded) {
            if (!succeeded) {
                this.$dismiss()
            } else {
                this.modalPromise.resolve()
                this.$refs.jfModal.hide()
            }
        },
        dismiss() { //Added for backward compatibility
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
        },

        handlePromise(){
            if (this.modalPromise.promise.isPending()) {
                if (!this.dontRejectOnClose) {
                    this.modalPromise.reject()
                } else {
                    this.modalPromise.resolve()
                }
            }
        },

        //$dismiss() {
        //    this.handlePromise();
        //    this.$refs.jfModal.hide()
        //},
        _handleHide() {
            this.handlePromise();
            setTimeout(hack,10);
        },
    },
}
