import {Ng1AttributeDirectiveAdapter} from '@/plugins/JFrogUI/Ng1AttributeDirectiveAdapter';

export default {
    bind: function (el, binding, vnode) {
        let patchedLinkFn = Ng1AttributeDirectiveAdapter.patchLinkFunction(ng1LinkFunction, null);
        patchedLinkFn(el, binding, vnode);
    }
}


function ng1LinkFunction($scope, $element, $attrs) {

    let revealInputComponent = new Vue({
        template: `<i class="icon icon-view jf-reveal-input"
                      v-jf-tooltip.bind="tooltipText"
                      v-if="hasData()"
                      @click="updateInput()"></i>`,
        data() {
            return {
                elementIcon: null,
                inputId: $attrs.jfRevealInput,
                tooltipText: 'Show ' + $attrs.objectName
            }
        },
        mounted() {
            this.elementIcon = this.$element;
            setTimeout(() => {
                $(`#${this.inputId}`).on('input', () => {
                    this.$forceUpdate()
                })
            })
        },
        methods: {
            hasData() {
                let input = $(`#${this.inputId}`);
                return !!input.val();
            },
            updateInput() {
                let input = $(`#${this.inputId}`);
                let type = input.attr('type');
                if (type === 'text') {
                    input.attr('type', 'password');
                    this.elementIcon.removeClass('icon-unview').addClass('icon-view');
                    this.tooltipText = this.tooltipText.replace('Hide', 'Show');
                } else {
                    input.attr('type', 'text');
                    this.elementIcon.removeClass('icon-view').addClass('icon-unview');
                    this.tooltipText = this.tooltipText.replace('Show', 'Hide');
                }

            }

        }

    })

    let comp = revealInputComponent.$mount();
    $element[0].appendChild(comp.$el);
}
