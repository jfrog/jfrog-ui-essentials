<template>

    <div><label class="jf-checkbox">
            <span></span> {{ text }}
        </label></div>

</template>

<script>

    export default {
        name: 'jf-checkbox',
        props: ['text'],
        'jf@inject': [
            '$element',
            '$transclude'
        ],
        data() {
            return {};
        },
        ng1_legacy: { 'controllerAs': 'jfCheckbox' },
        methods: {
            $postLink() {
                this.$transclude(clone => {
                    this.$element.find('label').prepend(clone);
                });
            }
        }
    }

</script>

<style scoped lang="less">

    

</style>
