<template>
  <div class="jf-divider">
    <div class="jf-divider-container">
      <div class="jf-divider-header">
        {{ text }}
      </div>
      <div class="jf-divider-line" />
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfDivider',
        props: ['text'],
        data() {
            return {};
        },
    }

</script>

<style scoped lang="less">
    @import '../../assets/stylesheets/variables';

    .jf-divider {
        .jf-divider-container {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            .jf-divider-header {
                font-size: 16px;
                color: @shuttleGray;
                font-weight: 400;
            }
            .jf-divider-line {
                flex: 1;
                border-bottom: 1px solid @catskillWhite;
                margin-left: 16px;
            }
        }
    }


</style>
