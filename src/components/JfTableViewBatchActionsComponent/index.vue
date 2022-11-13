<template>

    <div>
        <div class="grid-batch-actions text-right">
            <div class="grid-batch-action-wrapper"
                 :class="{'more-actions': action === MORE_ACTIONS}"
                 v-for="(action, $index) in actions"
                 :data-action-id="action.name"
                 :style="{visibility: action === MORE_ACTIONS || (visibleActions && visibleActions.indexOf(action) !== -1) ? 'inherit' : 'hidden', opacity: action === MORE_ACTIONS || (visibleActions && visibleActions.indexOf(action) !== -1) ? 1 : 0}"
                 v-jf-tooltip.bind="() => isDisabled(action) && action.getDisabledTooltip ? action.getDisabledTooltip() : ''">
                <a :class="{disabled: isDisabled(action), ['btn batch-action-' + action.icon]: true}"
                   v-if="action !== MORE_ACTIONS && (!action.visibleWhen || action.visibleWhen())"
                   @click.prevent="perform(action)">
                    <img :src="'images/' + action.icon + '.png'" v-if="action.img">
                    <i :class="'icon icon-' + action.icon" v-if="!action.img"></i> {{ action.name }}
                </a>
                <div class="more-wrapper" v-if="action === MORE_ACTIONS">
                    <jf-actions :parent-controller="jfTableViewBatchActions"
                                label="More Actions"
                                init-method="initActions"
                                :show-drop-down-for-one-item="true">
                    </jf-actions>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import map from 'lodash/map';
    import find from 'lodash/find';
    import filter from 'lodash/filter';
    export default {
        name: 'jf-table-view-batch-actions',
        props: [
            'actions',
            'tableOptions'
        ],
        'jf@inject': [
            '$element',
            '$scope',
            '$timeout'
        ],
        data() {
            return { MORE_ACTIONS: { '@@MORE_ACTIONS@@': '@@MORE_ACTIONS@@' } };
        },
        mounted() {

            this.$scope.$watch('jfTableViewBatchActions.tableOptions', () => {
                if (!this.tableOptions)
                    return;
                this.tableOptions.on('selection.change', () => {
                    this.$timeout(() => this.updateMoreActions());
                });
            });

            this.$scope.$on('ui-layout.resize', () => {
                this.$timeout(() => this.calcActionsVisibility());
            });

            $(window).on('resize', () => {
                this.$timeout(() => this.calcActionsVisibility());
            });

            this.$scope.$watch('jfTableViewBatchActions.actions', () => this.$timeout(() => this.calcActionsVisibility()));

            this.$timeout(() => {
                this.calcActionsVisibility();
                this.$forceUpdate();
            });
        },
        ng1_legacy: { 'controllerAs': 'jfTableViewBatchActions' },
        methods: {
            perform(action) {
                if (this.anySelected() && (!action.disabledWhen || !action.disabledWhen())) {
                    action.callback && action.callback(this.tableOptions.getSelectedRows());
                }
            },
            anySelected() {
                return this.tableOptions && this.tableOptions.getSelectedRows().length > 0;
            },
            isDisabled(action) {
                return !this.anySelected() || action.disabledWhen && action.disabledWhen();
            },
            calcActionsVisibility() {

                if (!this.actions)
                    return;

                let visible = [];
                let inDropDown = [];

                let moreDropdownWidth = 125;

                let elems = $(this.$element).find('.grid-batch-action-wrapper:not(.more-actions)');

                let containerWidth = $(this.$element).children().width();

                let totalWidth = 0;

                let addTo = visible;

                let moreActionsNewIndex = -1;
                let moreActionsOldIndex = this.actions.indexOf(this.MORE_ACTIONS);


                for (let i = 0; i < elems.length; i++) {
                    let el = $(elems[i]);
                    totalWidth += el.width();
                    let id = el.attr('data-action-id');
                    let act = find(this.actions, { name: id });
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
                    visible = filter(this.actions, act => act !== this.MORE_ACTIONS);
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
                    this.gridOptions.moreActionsController = actionsController;
                this.updateMoreActions();
            },
            updateMoreActions() {

                if (!this.moreActionsController)
                    return;

                let actionsCount = filter(this.actions, act => act !== this.MORE_ACTIONS).length;

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
                this.moreActionsController.setActions(map(this.moreActions, action => {
                    return {
                        name: action.name,
                        visibleWhen: action.visibleWhen,
                        action: () => this.perform(action)
                    };
                }));
            }
        }
    }

</script>

<style scoped lang="less">



</style>
