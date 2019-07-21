class jfActionsController {
	/* @ngInject */
    constructor($scope,$timeout) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.isDropdownOpen = false;
        this.$scope.$watch('jfActions.hasSingleVisibleAction()', (newVal, oldVal) => {
	        if(newVal !== oldVal) {
		        this._divideActions();
            }
        });
    }

    $onInit() {
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
        if (actionObj.disabled || (actionObj.disabledWhen && actionObj.disabledWhen()) ) {
		    e.stopPropagation();
		    e.preventDefault();
		    return;
	    }
	    if (actionObj.name === 'Download') {
		    e.preventDefault();
	    }
	    if (this.actionsHandler) {
		    this.actionsHandler.perform(actionObj, this.currentEntity);
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
        this.$timeout(()=>{
            this.isDropdownOpen = isOpen;
        })
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

        if(this.hasSingleVisibleAction()) {
		    this.fixedActions.push(this.actions.find(action => !action.visibleWhen || action.visibleWhen()));
		    return;
	    }

        _.forEach(this.actions, (actionObj) => {
            if (_.contains(this.fixedActionsNames, actionObj.name)) {
                this.fixedActions.push(actionObj);
            }
            else {
                this.dynamicActions.push(actionObj);
	            if(actionObj.icon){
		            this.anyActionHasAnIcon = true;
	            }
            }
        });
        if (this.fixedActions.length === 0 && this.dynamicActions.length === 1 && !this.showDropDownForOneItem) {
            this.fixedActions.push(this.dynamicActions.pop());
        }
    }

	hasSingleVisibleAction () {
        return this.getActiveActionsCount() === 1 && !this.showDropDownForOneItem;
    }
}

export function jfActions($timeout) {
	'ngInject';
    return {
        scope: {
            parentController: '=',
            label: '@',
            initMethod: '@',
            fixedActionsNames: '=',
            disableMouseOverEvents: '@?',
            showDropDownForOneItem: '='
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
                        $timeout(()=> {
                            jfActions._toggleDropdown(buttonOver || dropdownOver);
                        }, 200);
                    }
                });
            }


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
                if (!jfActions.disableMouseOverEvents) {
                    $dropdownElement.off('mouseup');
                    $dropdownElement.off('mouseenter');
                    $dropdownElement.off('mouseleave');
                    $buttonElement.off('mouseenter');
                    $buttonElement.off('mouseleave');
                }
                unwatch();
            });

            jfActions.showDropdown = () =>{
                stayOpened = true;
                clicked = true;
                buttonOver = true;
                dropdownOver = true;
                jfActions._toggleDropdown(true);
            }

            jfActions.hideDropdown = () =>{
                stayOpened = false;
                clicked = false;
                buttonOver = false;
                dropdownOver = false;
                jfActions._toggleDropdown(false);
            }

        }
    };
}