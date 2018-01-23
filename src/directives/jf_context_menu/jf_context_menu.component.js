/**
 * Created by tomere on 25/10/2017.
 * jfContextMenu - A component of context menu
 */
const CONTEXT_MENU_WIDTH = 190;
const CONTEXT_MENU_ROW_HEIGHT = 40;
const ERROR_MARGIN = 15;

class jfContextMenuController {
	/* @ngInject */
	constructor($scope, $timeout, JFrogEventBus) {
		this.$timeout = $timeout;
		this.$scope = $scope;
		this.JFrogEventBus = JFrogEventBus;
		this.EVENTS = JFrogEventBus.getEventsDefinition();
	}

	$onInit() {
		this.actions = [];
		this.isOpen = false;
		this._registerToEvents();
		this._handleDocumentClick();
	}
	/***
	 * _registerToEvents - Register events
	 **/
	_registerToEvents(){
		this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.CONTEXT_MENU_OPEN, (options) => {
			this.actions = options.actions;
			this.clickedItemData = options.clickedItemData;
			this._setContextMenuPosition(options.actions.length || Object.keys(options.actions).length, options.event.pageX, options.event.pageY);
			this.isOpen = true;
		});
	}

	/***
	 * _setContextMenuPosition - Set a new position to the context menu , according to the click position ,
	 * while making sure it is contained in the screen bounds
	 * @private
	 * @param numberOfActions
	 * @param pageX
	 * @param pageY
	 * */
	_setContextMenuPosition(numberOfActions, pageX, pageY) {
		if (numberOfActions === 0) {
			return;
		}
		let windowElem = $(window);
		let windowHeight = windowElem.innerHeight();
		let windowWidth = windowElem.innerWidth();
		let left = pageX + ERROR_MARGIN,
			top = (pageY + ERROR_MARGIN/2),
			contextMenuHeight = numberOfActions * CONTEXT_MENU_ROW_HEIGHT;
		if (pageX + (CONTEXT_MENU_WIDTH + ERROR_MARGIN) >= windowWidth) {
			left = pageX - (CONTEXT_MENU_WIDTH + ERROR_MARGIN);
		}
        if (pageY + contextMenuHeight + (ERROR_MARGIN/2) >= windowHeight) {
            top = pageY - (contextMenuHeight + ERROR_MARGIN/2);
		}
        if (top < ERROR_MARGIN) top = ERROR_MARGIN;
        this.position = {
            left: left,
            top: top
        }
	}

	/***
	 * onActionClick - close the context menu and fire the action callback
	 * @private
	 * @param $event - the action click event
	 * @param action - the action to fire
	 * */
	_onActionClick($event, action) {
		$event.stopPropagation();
		this.isOpen = false;
		if (action.callback) {
			action.callback(this.clickedItemData);
        }
		if (this.onAnyActionFired && typeof this.onAnyActionFired === 'function') {
			this.onAnyActionFired();
		}
	}

	/***
	 * _handleDocumentClick - listen to all clicks on document and closes the context menu as response
	 * @private
	 * */
	_handleDocumentClick() {
		let handler = (e) => {
			let target = $(e.target);
			let insideContextMenu = !!target.parents('.jf-context-menu').length;
			if (!insideContextMenu) {
				this.$timeout(() => {
                    this.isOpen = false;
                });
            }
		};
		$(document).on('mousedown', handler);
		this.$scope.$on('$destroy', () => {
			$(document).off('mousedown', handler);
		});
	}

}

export function jfContextMenu() {
	return {
		restrict        : 'E',
		scope           : {},
		controller      : jfContextMenuController,
		controllerAs    : 'contextMenu',
		bindToController: true,
		templateUrl     : 'directives/jf_context_menu/jf_context_menu.view.html'
	};
}