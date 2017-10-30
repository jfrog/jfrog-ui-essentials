/**
 * Created by tomere on 25/10/2017.
 * ContextMenuService - A service that creates a context menu for an html element
 */
export class ContextMenuService {
	/* @ngInject */
	constructor($timeout, $document, JFrogEventBus, $compile, $rootScope) {
		this.$timeout = $timeout;
		this.$compile = $compile;
		this.$rootScope = $rootScope;
		this.$document = $document;
		this.JFrogEventBus = JFrogEventBus;
		this.EVENTS = JFrogEventBus.getEventsDefinition();
		this._compileContextMenu();
	}

	/***
	 * _getDirectiveForCompile - positions and displays the context menu
	 * @private
	 * @param directiveName - a directive's name
	 * @returns An angular element
	 * */
	_getDirectiveForCompile(directiveName) {
		let directiveElementName = _.kebabCase(directiveName);
		let directiveElement = document.createElement(directiveElementName);
		return angular.element(directiveElement.outerHTML);
	}

	/***
	 * _compileContextMenu - Copmile the context menu once and apend to body
	 * @private
	 * */
	_compileContextMenu() {
		this.$body = $(this.$document).find('body:eq(0)');
		if (!this.$body.find('jf-context-menu').length) {
			this.$scope = this.$rootScope.$new();
			let markup = this._getDirectiveForCompile('jfContextMenu');
			let elem = this.$compile(markup)(this.$scope);
			this.$body.append(elem);
		}
	}

	/***
	 * openContextMenu - fires the display event , listened by the context menu component
	 * @private
	 * @param actionsCallback - returns an array of action objects, each heaving name, icon, href, callback , or
	 *  either a $promise.
	 * @param clickedItem - a $element that represents the clicked element.
	 * @param event - the click event passed by using code
	 * */
	 _openContextMenu(actionsCallback, clickedItemData, clickEvent) {
		let _launchContextMenuEvent = (actions) => {
			let options = {
				actions        : actions,
				clickedItemData: clickedItemData,
				event          : clickEvent
			};
			this.JFrogEventBus.dispatch(this.EVENTS.CONTEXT_MENU_OPEN, options);
		};

		let cbResponse = actionsCallback(clickEvent.target);
		if (cbResponse.then) {
			cbResponse.then((actions) => {
				_launchContextMenuEvent(actions);
			});
		} else {
			_launchContextMenuEvent(cbResponse);
		}
	};

	/***
	 * contextMenu - sets a context menu for an element
	 * @public
	 * @param settings - gets a settings object consisted of
	 * */
	contextMenu(settings) {
		$(document).contextmenu((e) => {
			let elems = $(settings.selector);
			let target = $(e.target);
			if(elems && (target.parents(settings.selector).length || target.is(settings.selector) || target.is(elems))){
				e.preventDefault();
				e.stopPropagation();
				this.$timeout(() => {
					if (settings.build && typeof settings.build === 'function') {
						this._openContextMenu(settings.build, settings.data, e);
					}
				});
				return false;
			}
		});
	}

}