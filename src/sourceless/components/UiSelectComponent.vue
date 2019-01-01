<script>

    const TEMPLATE = `
    <div style="background: red; color: white; border: 1px solid black">THIS COMPONENT IS MISSING!</div>
    `;
    export default {
        template: TEMPLATE,
        name: 'ui-select',
        data() {
            return {};
        },
        ng1_legacy: {
            require: [
                'uiSelect',
                '^ngModel'
            ],
            'controllerAs': '$select'
        }
    };

</script>

<style scoped lang="less">

    

</style>
