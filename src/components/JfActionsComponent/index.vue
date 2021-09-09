<template>
  <div>
    <ul
      v-show="getActiveActionsCount()"
      class="list-inline"
    >
      <li
        v-for="(actionObj,index) in fixedActions"
        v-show="!actionObj.visibleWhen || actionObj.visibleWhen()"
        :key="index"
        :class="{disabled: actionObj.disabled || (actionObj.disabledWhen && actionObj.disabledWhen())}"
        class="action-button"
        @click="doAction(actionObj,$event)"
      >
        <a
          :href=" actionObj.href "
          download=""
        >
          <i
            class="action-icon icon"
            :class="actionObj.icon"
          /> {{ actionObj.title }}
        </a>
      </li>
      <li
        v-show="dynamicActions.length"
        class="action-button"
      >
        <span
          class="dropdown"
          :class="{ open: isDropdownOpen }"
        >
          <ul class="dropdown-menu dropdown-menu-right actions-dropdown text-left">
            <li
              v-for="(actionObj,index) in dynamicActions"
              v-show="(!actionObj.visibleWhen || actionObj.visibleWhen()) && !actionObj.isHidden"
              :key="index"
              class="action-item dynamic-action"
            >
              <a
                href="#"
                class="action-container"
                @click.prevent="doAction(actionObj,$event)"
              >
                <span
                  v-if="actionObj.icon"
                  class="action-icon icon"
                  :class="actionObj.icon"
                />
                <span
                  v-if="actionObj.image && !actionObj.icon"
                  class="action-icon"
                >
                  <img :src="actionObj.image">
                </span>
                <span class="action-name">{{ actionObj.title }}</span>
              </a>
            </li>
          </ul>
          <a
            href="#"
            class="dropdown-toggle actions-more"
            @click.prevent="isDropdownOpen = !isDropdownOpen"
          >
            {{ int_label }} <i class="action-icon icon icon-small-arrow-down" />
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
        name: 'JfActions',
        props: [
            'label',
            'initMethod',
            'fixedActionsNames',
            'disableMouseOverEvents',
            'showDropDownForOneItem'
        ],
        data() {
            return {
                fixedActions: [],
                dynamicActions: [],
                isDropdownOpen: false,
                anyActionHasAnIcon: false,
                actionsList: {
                    actions: []
                },
                int_label: this.label || 'Actions',
                clicked: false,
                stayOpened: false
            };
        },
        computed: {
            hasSingleVisibleAction() {
                return this.getActiveActionsCount() === 1 && !this.showDropDownForOneItem;
            }
        },
        watch: {
            actionsList(newVal){
                console.log("in watch for actions")
                this._divideActions();
            },
            isDropdownOpen(newVal){
                if (!newVal && this.clicked) {
                    this.isDropdownOpen = true;
                    this.clicked = false;
                    this.stayOpened = true;
                } else if (!newVal && this.stayOpened) {
                    this.stayOpened = false;
                }
            }
        },
        mounted() {
            let thisComponent = this;

            if (!thisComponent.initMethod || !thisComponent.$parent[thisComponent.initMethod]) {
                console.error('jfActions: Missing init-method attribute');
                return;
            } else {
                thisComponent.$parent[thisComponent.initMethod](thisComponent);
            }

            this.intervalId = setInterval(() => {
                thisComponent._divideActions();
            }, 2000);

            thisComponent.$watch('hasSingleVisibleAction', (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    thisComponent._divideActions();
                }
            });

            let dropdownOver = false;
            let buttonOver = false;
            let $dropdownElement = thisComponent.$element.find('.actions-more');
            let $buttonElement = thisComponent.$element.find('.action-button');


            if (!thisComponent.disableMouseOverEvents) {
                $dropdownElement.on('mouseup', () => {
                    if (!thisComponent.stayOpened) {
                        thisComponent.clicked = true;
                    }
                });

                $dropdownElement.on('mouseenter', () => {
                    buttonOver = true;
                    thisComponent._toggleDropdown(true);
                });
                $dropdownElement.on('mouseleave', () => {
                    buttonOver = false;
                    if (!thisComponent.stayOpened) {
                        thisComponent._toggleDropdown(dropdownOver);
                    }
                });
                $buttonElement.on('mouseenter', () => {
                    dropdownOver = true;
                    thisComponent._toggleDropdown(true);
                });
                $buttonElement.on('mouseleave', () => {
                    dropdownOver = false;
                    if (!thisComponent.stayOpened) {
                        setTimeout(() => {
                            thisComponent._toggleDropdown(buttonOver || dropdownOver);
                        }, 200);
                    }
                });
            }

            this.showDropdown = () => {
                this.stayOpened = true;
                this.clicked = true;
                buttonOver = true;
                dropdownOver = true;
                this._toggleDropdown(true);
            };

            this.hideDropdown = () => {
                this.stayOpened = false;
                this.clicked = false;
                buttonOver = false;
                dropdownOver = false;
                this._toggleDropdown(false);
            };
        },

        beforeDestroy() {
            clearInterval(this.intervalId);
            if (!this.disableMouseOverEvents) {
                let $dropdownElement = this.$element.find('.actions-more');
                let $buttonElement = this.$element.find('.action-button');
                $dropdownElement.off('mouseup');
                $dropdownElement.off('mouseenter');
                $dropdownElement.off('mouseleave');
                $buttonElement.off('mouseenter');
                $buttonElement.off('mouseleave');
            }
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
                this._transformActionsData();
            },
            setActions(actions) {
                this.actionsList.actions = actions;
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
                if (!this.actionsList.actions || !this.actionsList.actions.length)
                    return 0;
                return _.filter(this.actionsList.actions, act => !act.visibleWhen || act.visibleWhen()).length;
            },
            _toggleDropdown(isOpen) {
                setTimeout(() => {
                    this.isDropdownOpen = isOpen;
                },10);
            },
            _transformActionsData() {
                if (!this.actionsDictionary || !this.actionsList) {
                    return;
                }
                // extend action properties from ACTIONS dictionary
                this.actionsList.actions.forEach(actionObj => {
                    if (!this.actionsDictionary[actionObj.name]) {
                        console.log('Unrecognized action', actionObj.name);
                        return true;
                    }
                    Vue.util.extend(actionObj, this.actionsDictionary[actionObj.name]);
                });
                // Divide actions to fixed and dynamic (dropdown)
                this._divideActions();
            },
            _divideActions() {
                this.fixedActions = [];
                this.dynamicActions = [];

                if (this.hasSingleVisibleAction) {
                    this.fixedActions.push(this.actionsList.actions.find(action => action.visibleWhen()));
                    return;
                }

                _.forEach(this.actionsList.actions, actionObj => {
                    if (_.includes(this.fixedActionsNames, actionObj.name)) {
                        this.fixedActions.push(actionObj);
                    } else {
                        this.dynamicActions.push(actionObj);
                        this.anyActionHasAnIcon = this.anyActionHasAnIcon || !!actionObj.icon;
                    }
                });
                if (this.fixedActions.length === 0 && this.dynamicActions.length === 1 && !this.showDropDownForOneItem) {
                    this.fixedActions.push(this.dynamicActions.pop());
                }
            },

        }
    }

</script>

<style scoped lang="less">

    /* An inherited style is causing a small inverted triangle to be displayed */
    .dropdown-toggle::after {
        display: none;
    }
    .action-button {
        cursor: pointer;
    }
</style>
