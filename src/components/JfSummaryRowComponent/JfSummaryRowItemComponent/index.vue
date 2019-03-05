<template>
    <div class="summery-labeled-item"
         v-if="summaryItemIsActive">
        <div class="summary-item-label">{{summaryItemLabel}}</div>
        <div class="jf-summary-row-item">
            <span class="summary-item-wrapper" v-if="!summaryItemUnwrap">
                <slot></slot>
            </span>
            <slot v-if="summaryItemUnwrap"></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'jf-summary-row-item',
        props: [
            'summaryItemLabel',
            'summaryItemUnwrap',
            'summaryItemIsActive',
        ],
        data () {
            return {};
        },
        mounted() {},
    }

</script>

<style scoped lang="less">
    .jf-summary-row-item > span:not(.no-ellipsis) {
        width: 100% !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        a {
            max-width: 100% !important;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>
