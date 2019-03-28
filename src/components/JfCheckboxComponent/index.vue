<template>

    <div class="jf-checkbox">
        <label>
            <span></span> {{ text }}
        </label>
    </div>

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
        mounted() {
            this.$transclude((clone, vm) => {
                this.transcludedVM = vm;
                this.$element.find('label').prepend(clone);
            });
        },
        updated() {
            if (this.transcludedVM) this.transcludedVM.$forceUpdate();
        },
        ng1_legacy: { 'controllerAs': 'jfCheckbox' },
    }

</script>

<style scoped lang="less">
    @import "../../assets/stylesheets/variables.less";

    .jf-checkbox {
        display: inline;
        label {
            font-weight: 400;
        }
        input[type="checkbox"] {
            position: absolute;
            opacity: 0;
        }

        input[type="checkbox"] + span {
            display: inline-block;
            background: #fff url(../../assets/images/checkbox.png) left top no-repeat;
            width: 17px;
            height: 17px;
            margin: -1px 5px 0 0;
            position: relative;
            vertical-align: middle;
        }

        input[type="checkbox"]:checked + span {
            background-image: url(../../assets/images/checkbox_checked.png);
        }

        input[type="checkbox"][disabled] + span {
            background-color: @softGray;
        }

        input[type="checkbox"]:focus + span {
            box-shadow: 0 0 5px rgba(0, 0, 0, .15);
        }
    }

    .jf-checkbox + .jf-checkbox {
        margin-left: 20px;
    }

</style>
