class jfActionsController {
    constructor($scope) {
        this.$scope = $scope;
        this.isDropdownOpen = false;

        if (!this.label) this.label = 'Actions';

        if (this.parentController && this.initMethod && this.parentController[this.initMethod]) {
            this.parentController[this.initMethod](this);
        }
        else {
            console.error('jfActionsController: Missing parent-controller & init-method attributes')
        }
    }

    setActionsHandler(actionsHandler) {
        this.actionsHandler = actionsHandler;
    }
    setCurrentEntity(entity) {
        this.currentEntity = entity;
    }
    setActionsDictionary(actionsDictionary) {
        this.actionsDictionary = actionsDictionary;
    }

    setActions(actions) {
        this.actions = actions || [];
        this._transformActionsData();
    }

    doAction(actionObj,e) {
        if (actionObj.disabled) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if (this.actionsHandler) {
            if (!actionObj.href) this.actionsHandler.perform(actionObj, this.currentEntity);
        }
        else if (actionObj.action) {
            actionObj.action(this.currentEntity);
        }
    }

    getActiveActionsCount() {
        if (!this.actions || !this.actions.length) return 0;
        return _.filter(this.actions, (act)=>!act.visibleWhen || act.visibleWhen()).length;
    }

    _toggleDropdown(isOpen) {
        this.isDropdownOpen = isOpen;
        if (!this.$scope.$$phase) {
            this.$scope.$digest();
        }
    }


    // Transform from server JSON to client representation
    _transformActionsData() {
        // extend action properties from ACTIONS dictionary
        this.actions.forEach((actionObj) => {
            if (!this.actionsDictionary[actionObj.name]) {
                console.log("Unrecognized action", actionObj.name);
                return true;
            }
            angular.extend(actionObj, this.actionsDictionary[actionObj.name]);
        });
        // Divide actions to fixed and dynamic (dropdown)
        this._divideActions();
    }

    _divideActions() {
        this.fixedActions = [];
        this.dynamicActions = [];
        _.forEach(this.actions, (actionObj) => {
            if (_.contains(this.fixedActionsNames, actionObj.name)) {
                this.fixedActions.push(actionObj);
            }
            else {
                this.dynamicActions.push(actionObj);
            }
        });
        if (this.fixedActions.length === 0 && this.dynamicActions.length === 1) {
            this.fixedActions.push(this.dynamicActions.pop());
        }
    }
}

export function jfActions($timeout) {
    return {
        scope: {
            parentController: '=',
            label: '@',
            initMethod: '@',
            fixedActionsNames: '='
        },
        restrict: 'EA',
        controller: jfActionsController,
        controllerAs: 'jfActions',
        templateUrl: 'directives/jf_actions/jf_actions.html',
        bindToController: true,
        link: function ($scope, element, attr, jfActions) {
            let dropdownOver = false;
            let buttonOver = false;
            let $dropdownElement = $(element).find('.actions-more');
            let $buttonElement = $(element).find('.action-button');
            let stayOpened = false;
            let clicked = false;

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
                    $timeout(()=> {
                        jfActions._toggleDropdown(buttonOver || dropdownOver);
                    }, 200);
                }
            });


            let unwatch = $scope.$watch('jfActions.isDropdownOpen',(newVal,oldVal)=>{
                if (!newVal && clicked) {
                    jfActions.isDropdownOpen = true;
                    clicked = false;
                    stayOpened = true;
                }
                else if (!newVal && stayOpened) {
                    stayOpened = false;
                }

            });

            $scope.$on('$destroy', () => {
                $dropdownElement.off('click');
                unwatch();
            });

        }
    };
}