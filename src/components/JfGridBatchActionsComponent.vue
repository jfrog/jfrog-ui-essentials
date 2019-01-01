<template>

    <div>
        <div class="grid-batch-actions text-right" v-jf-disable-ng-animate="''">
            <div class="grid-batch-action-wrapper" :class="{'more-actions': action === MORE_ACTIONS}" v-for="(action, $index) in actions" :data-action-id="action.name" :style="{visibility: action === MORE_ACTIONS || visibleActions.indexOf(action) !== -1 ? 'inherit' : 'hidden', opacity: action === MORE_ACTIONS || visibleActions.indexOf(action) !== -1 ? 1 : 0}" v-jf-tooltip.bind="isDisabled(action) ? action.getDisabledTooltip() : ''">
                <a :class="{disabled: isDisabled(action), ['btn batch-action-' + action.icon]: true}" v-if="action !== MORE_ACTIONS && (!action.visibleWhen || action.visibleWhen())" @click.prevent="perform(action)">
                    <img :src="'images/' + action.icon + '.png'" v-if="action.img">
                    <i :class="'icon icon-' + action.icon" v-if="!action.img"></i> {{ action.name }}
                </a>
                <div class="more-wrapper" v-if="action === MORE_ACTIONS">
                    <jf-actions :parent-controller="jfBatchActions" label="More Actions" init-method="initActions" :show-drop-down-for-one-item="true"></jf-actions>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-grid-batch-actions',
        props: [
            'actions',
            'gridApi',
            'gridOptions'
        ],
        'jf@inject': [
            '$element',
            '$scope',
            '$timeout'
        ],
        data() {
            return { MORE_ACTIONS: { '@@MORE_ACTIONS@@': '@@MORE_ACTIONS@@' } };
        },
        created() {
            this.$scope.$watch('jfBatchActions.gridApi', () => {
                if (!this.gridApi)
                    return;
                this.gridApi.selection.on.rowSelectionChanged(this.$scope, row => {
                    this.$timeout(() => this.updateMoreActions());
                });
                this.gridApi.selection.on.rowSelectionChangedBatch(this.$scope, row => {
                    this.$timeout(() => this.updateMoreActions());
                });
            });
        },
        mounted() {
    
            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    
            this.$scope.$on('ui-layout.resize', () => {
                this.$timeout(() => this.calcActionsVisibility());
            });
    
            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
            $(window).on('resize', () => {
                this.$timeout(() => this.calcActionsVisibility());
            });
    
            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
    
            this.$scope.$watch('jfBatchActions.actions', () => this.$timeout(() => this.calcActionsVisibility()));
    
            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
            this.$timeout(() => this.calcActionsVisibility());
        },
        ng1_legacy: { 'controllerAs': 'jfBatchActions' },
        methods: {
            perform(action) {
                if (this.anySelected() && (!action.disabledWhen || !action.disabledWhen())) {
                    action.callback && action.callback(this.gridApi.selection.getSelectedRows());
                }
            },
            anySelected() {
                return this.gridApi && this.gridApi.selection.getSelectedRows().length > 0;
            },
            isDisabled(action) {
                return !this.anySelected() || action.disabledWhen && action.disabledWhen();
            },
            calcActionsVisibility() {
    
                if (!this.actions)
                    return;
    
                let visible = [];
                let inDropDown = [];
    
                let moreDropdownWidth = 115;
    
                let elems = $(this.$element).find('.grid-batch-action-wrapper:not(.more-actions)');
    
                let containerWidth = $(this.$element).width();
    
                let totalWidth = 0;
    
                let addTo = visible;
    
                let moreActionsNewIndex = -1;
                let moreActionsOldIndex = this.actions.indexOf(this.MORE_ACTIONS);
    
    
                for (let i = 0; i < elems.length; i++) {
                    let el = $(elems[i]);
                    totalWidth += el.width();
                    let id = el.attr('data-action-id');
                    let act = _.find(this.actions, { name: id });
                    let index = this.actions.indexOf(act);
    
                    if ((totalWidth > containerWidth || this.moreActions && this.moreActions.length && totalWidth - el.width() + moreDropdownWidth > containerWidth) && addTo === visible) {
                        addTo = inDropDown;
                        moreActionsNewIndex = index;
                        if (visible.length && totalWidth - el.width() + moreDropdownWidth > containerWidth) {
                            let last = visible.pop();
                            inDropDown.push(last);
                            moreActionsNewIndex = this.actions.indexOf(last);
                        }
                    }
    
                    if (act)
                        addTo.push(act);
                }
    
                if (totalWidth < containerWidth) {
                    inDropDown = [];
                    visible = _.filter(this.actions, act => act !== this.MORE_ACTIONS);
                    moreActionsNewIndex = -1;
                }
    
                let temp = { TEMP: 'TEMP' };
                if (moreActionsOldIndex !== -1) {
                    this.actions.splice(moreActionsOldIndex, 1, temp);
                }
                if (moreActionsNewIndex !== -1) {
                    this.actions.splice(moreActionsNewIndex, 0, this.MORE_ACTIONS);
                }
                let tempIndex = this.actions.indexOf(temp);
                if (tempIndex !== -1) {
                    this.actions.splice(tempIndex, 1);
                }
    
                this.visibleActions = visible;
                this.moreActions = inDropDown;
                this.$timeout(() => this.updateMoreActions());   
    
            },
            initActions(actionsController) {
                this.moreActionsController = actionsController;
                if (this.gridOptions)
                    this.$set(this.gridOptions, 'moreActionsController', actionsController);
                this.updateMoreActions();
            },
            updateMoreActions() {
    
                if (!this.moreActionsController)
                    return;
    
                let actionsCount = _.filter(this.actions, act => act !== this.MORE_ACTIONS).length;
    
                if (this.moreActions.length < actionsCount) {
                    this.moreActionsController.label = 'More Actions';
                } else if (this.moreActions.length === actionsCount) {
                    this.moreActionsController.label = 'Actions';
                }
    
    
                let dict = {};
                this.moreActions.forEach(action => {
                    dict[action.name] = {
                        title: action.name,
                        icon: 'icon-' + action.icon,
                        disabled: this.isDisabled(action)
                    };
                });
    
                this.moreActionsController.setActionsDictionary(dict);
                this.moreActionsController.setActions(_.map(this.moreActions, action => {
                    return {
                        name: action.name,
                        visibleWhen: action.visibleWhen,
                        action: action.callback
                    };
                }));
            }
        }
    }

</script>

<style scoped lang="less">

    

</style>
