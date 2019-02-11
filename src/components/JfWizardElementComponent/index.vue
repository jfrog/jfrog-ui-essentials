<template>
    <div>
        <div class="wizard-element-container" v-if="config.enableNgShow" v-show="title && title === selectedTitle">
            <slot></slot>
        </div>
        <div class="wizard-element-container" v-if="!config.enableNgShow && title && title === selectedTitle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'jf-wizard-element',
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
        computed:{
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
