<template>

    <div :v-jf-tooltip="html" class="jf-help-tooltip">
        <div>
            <span class="tooltip-icon jf-tooltipster">
            <span><slot></slot></span>
            </span>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-help-tooltip',
        props: [
            'placement',
            'text',
            'html',
            'maxWidth'
        ],
        'jf@inject': [
            '$transclude',
        ],
        data() {
            return {};
        },
        ng1_legacy: {
            ng1postLinkFn($scope, element, attrs, ctrl) {
                let content = ctrl.text || ctrl.html || ctrl.$transclude().html();
                if (!content) return;

                content = content.replace(/\n/g, '<br>');

                $(element).find('.jf-tooltipster').tooltipster({
                    animation: 'fade',
                    contentAsHTML: 'true',
                    trigger: 'hover',
                    onlyOne: 'true',
                    interactive: 'true',
                    interactiveTolerance: 500,
                    maxWidth: ctrl.maxWidth || 600,
                    position: ctrl.placement,
                    theme: "tooltipster-default " + ctrl.placement,
                    content: content,
                    functionReady: function () {
                        $(element).find('.jf-tooltipster').addClass('active');
                    },
                    functionAfter: function () {
                        $(element).find('.jf-tooltipster').removeClass('active');
                    }
                });
            }
        }
    }

</script>

<style scoped lang="less">

    .jf-help-tooltip {
        position: relative;

        div {
            display: inline-block;
        }

        .tooltip-icon {
            display: inline-block;
            background: url('../assets/images/tooltips-icon.png') no-repeat -2px 0;
            width: 18px;
            height: 18px;

            position: absolute;
            top: 1px;
            left: 6px;

            &:hover, &.active {
                background-position: -20px 0;
            }
            span {
                display: none;
            }
        }
    }

</style>
