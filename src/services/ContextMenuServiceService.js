import ContextMenuComponent from '@/components/JfContextMenuComponent/index.vue'
import {VueFactory} from "./VueFactory";

export class ContextMenuService {
    /* @ngInject */
    constructor() {
        this.$inject(
            '$timeout',
            'JFrogEventBus',
        )
        this.EVENTS = this.JFrogEventBus.getEventsDefinition()
        this._compileContextMenu()
    }

    /***
     * _compileContextMenu - Copmile the context menu once and apend to body
     * @private
     * */
    _compileContextMenu() {
        this.$body = $(document).find('body:eq(0)')
        if (!this.$body.find('.jf-context-menu').length) {
            const { Vue } = VueFactory.getInstance();
            let ComponentClass = Vue.extend(ContextMenuComponent)
            let componentInstance = new ComponentClass();
            this.$body.append(componentInstance.$mount().$el);
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
    _openContextMenu(actionsCallback, clickedItemData, clickEvent, trigger) {
        let _launchContextMenuEvent = actions => {
            let options = {
                actions: actions,
                clickedItemData: clickedItemData,
                event: clickEvent,
            }
            this.JFrogEventBus.dispatch(this.EVENTS.CONTEXT_MENU_OPEN, options)
        }
        let cbResponse = actionsCallback(trigger)
        if (cbResponse.then) {
            cbResponse.then(actions => {
                _launchContextMenuEvent(actions)
            })
        } else {
            _launchContextMenuEvent(cbResponse)
        }
    }
    /***
     * contextMenu - sets a context menu for an element
     * @public
     * @param settings - gets a settings object consisted of
     * */
    contextMenu(settings) {
        $(document).contextmenu(e => {
            let target = $(e.target)
            let closest = target.closest(settings.selector)
            if (closest.length) {
                e.preventDefault()
                e.stopPropagation()
                this.$timeout(() => {
                    if (
                        settings.build &&
                        typeof settings.build === 'function'
                    ) {
                        this._openContextMenu(
                            settings.build,
                            settings.data,
                            e,
                            closest
                        )
                    }
                })
                return false
            }
        })
    }
}
