<template>

    <div>
        <div class="jf-wizard-container">
            <div class="wizard-bar">
                <ul>
                    <li v-for="tab in tabs" :class="{'active': active.title === tab.title}" v-if="isVisible(tab)">
                        <a href="" @click.prevent="_switch(tab)">{{tab.title}}</a>
                    </li>
                </ul>
            </div>

            <div class="wizard-content">
                <slot></slot>
            </div>
        </div>

    </div>

</template>

<script>

    export default {
        name: 'jf-wizard',
        props: ['config'],
        'jf@inject': [
            '$scope',
            'JFrogEventBus',
            '$element',
            'JFrogUIUtils'
        ],
        data() {
            return {
                tabs: [],
                active: { title: null }
            };
        },
        created() {
            this.JFrogEventBus.registerOnScope(this.$scope, this.JFrogEventBus.getEventsDefinition().WIZARD_TAB_CHANGE, tab => {
                this._switch(tab);
            });
            this.onTabSwitch = this.$scope.onTabSwitch;
            this.config = this.$scope.config;
            this.init = true;
        },
        ng1_legacy: {
            ng1postLinkFn($scope, element, attrs) {
            },
            'controllerAs': '$ctrl'
        },
        methods: {
            registerTab(tab) {
                if (this.init || tab.isSelectedTab) {
                    this.active = tab;
                    this.init = false;
                }
                this.tabs.push(tab);
            },
            _switch(tab) {
                this.$element.find('.wizard-content').scrollTop(0);
                this.active = typeof tab === 'string' ? _.find(this.tabs, t => t.title === tab) : tab;
                this.$emit('on-tab-switch', { tab: this.active.title });
                this.JFrogUIUtils.fireResizeEvent();
            },
            isVisible(tab) {
                return !tab.isVisibleTab || typeof tab.isVisibleTab === 'function' && tab.isVisibleTab();
            }
        }
    }

</script>

<style scoped lang="less">



</style>
