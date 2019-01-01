<template>

    <div>
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
        data() {
            return {};
        }
    }

</script>

<style scoped lang="less">

    

</style>
