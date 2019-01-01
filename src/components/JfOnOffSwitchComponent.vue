<template>

    <div>
        <div class="jf-on-off-toggler" :class="{'on-selected' : selected === on,
                    'off-selected' : selected !== on}">
            <jf-toggler on-toggle="toggleSelection()" :is-toggled-to-left="isOn">
            </jf-toggler>
            <span class="on-option-text jf-toggler-text" v-html="on"></span>
            <span class="off-option-text jf-toggler-text" v-html="off"></span>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-on-off-switch',
        props: [
            'selected',
            'options'
        ],
        data() {
            return {
                on: null,
                isOn: true,
                off: null
            };
        },
        mounted() {
            if (!this.options)
                throw 'Must supply options';
            this.on = this.options[0];
            this.off = this.options[1];
            if (_.isEmpty(this.selected)) {
                this.selected = this.on;
            }
        },
        ng1_legacy: { 'controllerAs': '$ctrl' },
        methods: {
            toggleSelection() {
                this.selected = this.selected === this.on ? this.off : this.on;
            }
        }
    }

</script>

<style scoped lang="less">

    

</style>
