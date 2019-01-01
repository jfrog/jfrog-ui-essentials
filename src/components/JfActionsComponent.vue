<template>

    <div>
        <ul class="list-inline" v-show="getActiveActionsCount()">
            <li v-show="fixedActions.length" v-for="actionObj in fixedActions" @click="doAction(actionObj,$event)" :class="{disabled: actionObj.disabled || (actionObj.disabledWhen && actionObj.disabledWhen())}" class="action-button" v-if="!actionObj.visibleWhen || actionObj.visibleWhen()">

                <a :href=" actionObj.href " download="">
                    <i class="action-icon icon" :class="actionObj.icon"></i> {{actionObj.title}}
                </a>
            </li>
            <li v-show="dynamicActions.length" class="action-button">
                <span class="dropdown" dropdown="" is-open="isDropdownOpen">
              <ul class="dropdown-menu dropdown-menu-right actions-dropdown text-left">
                  <li v-for="actionObj in dynamicActions" class="action-item dynamic-action" v-if="(!actionObj.visibleWhen || actionObj.visibleWhen()) && !actionObj.isHidden">
                      <a href="" class="action-container" @click.prevent="doAction(actionObj,$event)">
                          <span class="action-icon icon" v-if="actionObj.icon" :class="actionObj.icon">
                          </span>
                <span class="action-icon" v-if="actionObj.image && !actionObj.icon">
                              <img :src="actionObj.image">
                          </span>
                <span class="action-name">{{actionObj.title}}</span>
                </a>
            </li>
        </ul>
        <a href="" class="dropdown-toggle actions-more" dropdown-toggle="">
            {{label}} <i class="action-icon icon icon-small-arrow-down"></i>
        </a>
        </span>

        </li>
        </ul>

        <!--<li ng-repeat="action in actions">-->
        <!--<a><span class="glyphicon glyphicon-refresh"></span>{{action.name}}</a></li>-->
        <!--<li><a><span class="glyphicon glyphicon-trash"></span>Delete Content</a></li>-->
        <!--<li><a><span class="glyphicon glyphicon-cloud-upload"></span>Upload to Bintray</a></li>-->
    </div>

</template>

<script>

    export default {
        name: 'jf-actions',
        props: [
            'parentController',
            'label',
            'initMethod',
            'fixedActionsNames',
            'disableMouseOverEvents',
            'showDropDownForOneItem'
        ],
        'jf@inject': [
            '$scope',
            '$timeout'
        ],
        data() {
            return {
                fixedActions: null,
                dynamicActions: null,
                isDropdownOpen: null,
                anyActionHasAnIcon: null,
                actions: null
            };
        },
        created() {
            this.isDropdownOpen = false;
            this.$scope.$watch('jfActions.hasSingleVisibleAction()', (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    this._divideActions();
                }
            });
        },
        mounted() {
            if (!this.label)
                this.label = 'Actions';

            if (this.parentController && this.initMethod && this.parentController[this.initMethod]) {
                this.parentController[this.initMethod](this);
            } else {
                console.error('jfActionsController: Missing parent-controller & init-method attributes');
            }
        },
        ng1_legacy: {
            ng1postLinkFn($scope, element, attr, jfActions) {
                let dropdownOver = false;
                let buttonOver = false;
                let $dropdownElement = $(element).find('.actions-more');
                let $buttonElement = $(element).find('.action-button');
                let stayOpened = false;
                let clicked = false;

                jfActions.disableMouseOverEvents = jfActions.disableMouseOverEvents !== undefined;

                if (!jfActions.disableMouseOverEvents) {
                    $dropdownElement.on('mouseup', () => {
                        if (!stayOpened) {
                            clicked = true;
                        }
                    });
                    $dropdownElement.on('mouseenter', () => {
                        buttonOver = true;
                        jfActions._toggleDropdown(true);
                    });
                    $dropdownElement.on('mouseleave', () => {
                        buttonOver = false;
                        if (!stayOpened) {
                            jfActions._toggleDropdown(dropdownOver);
                        }
                    });
                    $buttonElement.on('mouseenter', () => {
                        dropdownOver = true;
                        jfActions._toggleDropdown(true);
                    });
                    $buttonElement.on('mouseleave', () => {
                        dropdownOver = false;
                        if (!stayOpened) {
                            $timeout(() => {
                                jfActions._toggleDropdown(buttonOver || dropdownOver);
                            }, 200);
                        }
                    });
                }


                let unwatch = $scope.$watch('jfActions.isDropdownOpen', (newVal, oldVal) => {
                    if (!newVal && clicked) {
                        jfActions.isDropdownOpen = true;
                        clicked = false;
                        stayOpened = true;
                    } else if (!newVal && stayOpened) {
                        stayOpened = false;
                    }

                });

                $scope.$on('$destroy', () => {
                    if (!jfActions.disableMouseOverEvents) {
                        $dropdownElement.off('mouseup');
                        $dropdownElement.off('mouseenter');
                        $dropdownElement.off('mouseleave');
                        $buttonElement.off('mouseenter');
                        $buttonElement.off('mouseleave');
                    }
                    unwatch();
                });

                jfActions.showDropdown = () => {
                    stayOpened = true;
                    clicked = true;
                    buttonOver = true;
                    dropdownOver = true;
                    jfActions._toggleDropdown(true);
                };

                jfActions.hideDropdown = () => {
                    stayOpened = false;
                    clicked = false;
                    buttonOver = false;
                    dropdownOver = false;
                    jfActions._toggleDropdown(false);
                }
    ;
            },
            'controllerAs': 'jfActions'
        },
        methods: {
            setActionsHandler(actionsHandler) {
                this.actionsHandler = actionsHandler;
            },
            setCurrentEntity(entity) {
                this.currentEntity = entity;
            },
            setActionsDictionary(actionsDictionary) {
                this.actionsDictionary = actionsDictionary;
            },
            setActions(actions) {
                this.actions = actions || [];
                this._transformActionsData();
            },
            doAction(actionObj, e) {
                if (actionObj.disabled || actionObj.disabledWhen && actionObj.disabledWhen()) {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
                if (actionObj.name === 'Download' && actionObj.xrayShouldValidate) {
                    e.preventDefault();
                }
                if (this.actionsHandler) {
                    this.actionsHandler.perform(actionObj, this.currentEntity);
                } else if (actionObj.action) {
                    actionObj.action(this.currentEntity);
                }
            },
            getActiveActionsCount() {
                if (!this.actions || !this.actions.length)
                    return 0;
                return _.filter(this.actions, act => !act.visibleWhen || act.visibleWhen()).length;
            },
            _toggleDropdown(isOpen) {
                this.$timeout(() => {
                    this.isDropdownOpen = isOpen;
                });
            },
            _transformActionsData() {
                // extend action properties from ACTIONS dictionary
                this.actions.forEach(actionObj => {
                    if (!this.actionsDictionary[actionObj.name]) {
                        console.log('Unrecognized action', actionObj.name);
                        return true;
                    }
                    angular.extend(actionObj, this.actionsDictionary[actionObj.name]);
                });
                // Divide actions to fixed and dynamic (dropdown)
                this._divideActions();
            },
            _divideActions() {
                this.fixedActions = [];
                this.dynamicActions = [];

                if (this.hasSingleVisibleAction()) {
                    this.fixedActions.push(this.actions.find(action => action.visibleWhen()));
                    return;
                }

                _.forEach(this.actions, actionObj => {
                    if (_.includes(this.fixedActionsNames, actionObj.name)) {
                        this.fixedActions.push(actionObj);
                    } else {
                        this.dynamicActions.push(actionObj);
                        if (actionObj.icon) {
                            this.anyActionHasAnIcon = true;
                        }
                    }
                });
                if (this.fixedActions.length === 0 && this.dynamicActions.length === 1 && !this.showDropDownForOneItem) {
                    this.fixedActions.push(this.dynamicActions.pop());
                }
            },
            hasSingleVisibleAction() {
                return this.getActiveActionsCount() === 1 && !this.showDropDownForOneItem;
            }
        }
    }

</script>

<style scoped lang="less">



</style>
