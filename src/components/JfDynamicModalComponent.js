export default function() {
    return {
        props: [
            "keyboard",
            "backdrop"
        ],
        data() {
            return {
                noCloseOnBackDrop: this.backdrop != 'static',
                noCloseOnEsc: this.keyboard,
            };
        },
        components: {
        },
        methods: {
            $close(){
                this.$refs.jfModal.hide();
            },
            $dismiss(){
                this.$refs.jfModal.hide();
            }
        }
    };
};
