<template>
  <div
    v-if="config.enableNgShow"
    v-show="title && title === selectedTitle"
    class="wizard-element-container"
  >
    <slot />
  </div>
  <div
    v-else-if="!config.enableNgShow && title && title === selectedTitle"
    class="wizard-element-container"
  >
    <slot />
  </div>
</template>

<script>
    export default {
        name: 'JfWizardElement',
        props: [
            'dataTitle',
            'isSelectedTab',
            'isVisibleTab'
        ],
        data() {
            return {
                title: this.dataTitle,
                config: { enableNgShow: null }
            };
        },
        computed: {
            selectedTitle: function () {
                return this.$parent.active.title;
            }
        },
        mounted(){
            const tabProperties = {
                title: this.dataTitle,
                isSelectedTab: this.isSelectedTab,
                isVisibleTab: this.isVisibleTab
            };
            this.$parent.registerTab(tabProperties);
            this.config = this.$parent.config;
        }
    }

</script>
