<template>

    <div>
        <div class="compile-placeholder"></div>
    </div>

</template>

<script>

    export default {
        name: 'jf-vscroll-element',
        props: [
            'data',
            'template',
            'variable',
            'index',
            'vscroll'
        ],
        'jf@inject': [
            '$scope',
            '$element',
            '$timeout'
        ],
        data() {
            return {};
        },
        created() {

            let unwatchHeight = this.$scope.$watch('jfVScrollElement.childrenHeight', () => {
                if (this.childrenHeight && this.childrenHeight > 1) {
                    this.vscroll.setItemHeight(this.childrenHeight);
                    unwatchHeight();
                }
            });

            this.$scope.$watch('jfVScrollElement.data', () => {
                if (!this.elementScope || !this.variable || !this.data) return;
                this.elementScope[this.variable] = this.data;
            });
        },
        ng1_legacy: {
            ng1postLinkFn(scope, element, attrs, directiveCtrl) {

                let elementScope = scope.$parent.$parent.$parent.$new({
                    [directiveCtrl.variable]: directiveCtrl.data,
                    $index: directiveCtrl.index
                });
                let target = $(element).find('.compile-placeholder');

                directiveCtrl.elementScope = elementScope;
                let tplE = $(`<div><div>${ directiveCtrl.template }</div></div>`);
                $jfrog.get('$compile')(tplE.children()[0])(elementScope);
                target.replaceWith(tplE.children()[0]);

            },
            'controllerAs': 'jfVScrollElement'
        },
        methods: {
            childrenHeight() {
                return $(this.$element).children().height();
            }
        }
    }

</script>

<style scoped lang="less">



</style>
