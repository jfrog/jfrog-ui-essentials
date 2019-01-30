<template>
    <div class="summary-row jf-content-section"
         :style="$ctrl.inlineStyle">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: 'jf-summary-row',
        props: [],
        'jf@inject': [
            '$element'
        ],
        data() {
            return {
                columnsToShow: [],
                inlineStyle: {},
            };
        },
        mounted() {
            this.filterOutUnactiveColumns();
            this.setColumnsLayout();
        },
        methods: {
            filterOutUnactiveColumns() {
                this.columnsToShow = this.$element.find('.summery-labeled-item');
            },
            setColumnsLayout() {
                let layout = '';
                _.forEach(this.columnsToShow, col => {
                    layout += `${ $(col).attr('width') || '1fr' } `;
                });
                this.inlineStyle = {
                    gridTemplateColumns:layout,
                    "-ms-grid-columns":layout
                };
            }
        },
        ng1_legacy: { 'controllerAs': '$ctrl' }
    }

</script>

<style scoped lang="less">
    @import '../assets/stylesheets/variables';
    .summary-row {
        display: grid;
        // The default 4 fractions division is arbitrary and should be overwritten by code using this class
        grid-template-columns: 1fr 1fr 1fr 1fr;
        @padding: 20px;
        @height: 120px;

        width: 100%;
        height: @height;
        padding: @padding @padding/2;
        &.jf-content-section {
            margin-bottom: 0;
        }
        .summery-labeled-item {
            /* IE10+ CSS styles */
            -ms-grid-row: 1;
            @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
                height: ~"calc( @{height} - 2*@{padding} )";
            }
            .loop(@i) when (@i > 0) {
                .loop((@i - 1));    // next iteration
                // Loop body - set ms grid col
                @t: ~":nth-child(@{i})";
                &@{t} {
                    -ms-grid-column: @i;
                }
            }
            .loop(100);

            padding: 0 @padding;
            vertical-align: top;
            font-size: @jfFontSizeSmall;
            display: block;
            &:not(:first-child):not(.no-separator) {
                border-left: 1px solid @jfColorMediumGrey;
            }

            line-height: 28px;
            white-space: normal;
            color: lighten(@jfColorAlmostBlack, 20%);

            span {
                display: block;
                font-size: @jfFontSizeNormal;
                font-weight: @jfFontWeightNormal;
                color: @jfColorBlack;
            }
            i:not(.colored-icon) {
                color: @jfColorBlack;
            }

            .summary-icon-column i.icon {
                font-size: 42px;
                position: relative;
                top: 20px;
                left: 15px;
            }

            &:not(.downloads) {
                display: inline-block;
                overflow: hidden;
            }
        }
    }
</style>
