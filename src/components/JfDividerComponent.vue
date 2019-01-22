<template>

    <div class="jf-divider">
        <div class="jf-divider-container">
            <div class="jf-divider-header">{{text}}</div>
            <div class="jf-divider-line"></div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-divider',
        props: ['text'],
        data() {
            return {};
        },
    }

</script>

<style scoped lang="less">
    @import '../assets/stylesheets/main';

    .jf-divider {
        .jf-divider-container {
            display: flex;
            margin-bottom: 30px;
            .jf-divider-header {
                font-size: 16px;
                color: @blackBGLight;
                margin-bottom: -5px;
                font-weight: 600;
            }
            .jf-divider-line {
                flex: 1;
                border-bottom: 1px solid @grayBorderLighter;
                margin-left: 4px;
            }
        }
    }


</style>
