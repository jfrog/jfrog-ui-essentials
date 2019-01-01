<template>

    <div>
        <div class="wizard-element-container" v-if="config.enableNgShow" v-show="title===jfWizardCtl.active.title">
            <slot></slot>
        </div>
        <div class="wizard-element-container" v-if="!config.enableNgShow && title===jfWizardCtl.active.title">
            <slot></slot>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-wizard-element',
        props: [
            'title',
            'isSelectedTab'
        ],
        'jf@inject': ['$scope'],
        data() {
            return {
                config: { enableNgShow: null },
                jfWizardCtl: { active: { title: null } }
            };
        },
        ng1_legacy: {
            ng1postLinkFn($scope, element, attrs, jfWizardCtl) {
                jfWizardCtl.registerTab({
                    title: attrs.title,
                    isSelectedTab: $scope.$ctrl.isSelectedTab,
                    isVisibleTab: $scope.$ctrl.isVisibleTab
                });
                $scope.$ctrl.jfWizardCtl = jfWizardCtl;
                $scope.$ctrl.title = attrs.title;
                $scope.$ctrl.config = $scope.$ctrl.jfWizardCtl.config;
            },
            require: '^jfWizard',
            'controllerAs': '$ctrl'
        }
    }

</script>

<style scoped lang="less">



</style>
