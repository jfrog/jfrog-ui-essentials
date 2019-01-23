<template>

    <div>
        <div class="jf-context-menu" :style="position" v-if="isOpen">
            <a href="" v-for="action in actions"
               @click.prevent="_onActionClick($event, action)"
               :href="action.link" class="action-item"
               :icon-name="action.icon || ''">
                <i class="action-icon" :class="action.icon"></i>
                <span>{{action.name}}</span>
            </a>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-context-menu',
        'jf@inject': [
            '$scope',
            '$timeout',
            'JFrogEventBus'
        ],
        data() {
            return {
                position: null,
                isOpen: null,
                actions: []
            };
        },
        created() {
            this.EVENTS = this.JFrogEventBus.getEventsDefinition();
        },
        mounted() {
            this.isOpen = false;
            this._registerToEvents();
            this._handleDocumentClick();
        },
        ng1_legacy: { 'controllerAs': 'contextMenu' },
        methods: {
            _registerToEvents() {
                this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.CONTEXT_MENU_OPEN, options => {
                    this.actions = options.actions;
                    this.clickedItemData = options.clickedItemData;
                    this._setContextMenuPosition(options.actions.length || Object.keys(options.actions).length, options.event.pageX, options.event.pageY);
                    this.isOpen = true;
                });
            },
            _setContextMenuPosition(numberOfActions, pageX, pageY) {
                if (numberOfActions === 0) {
                    return;
                }
                let windowElem = $(window);
                let windowHeight = windowElem.innerHeight();
                let windowWidth = windowElem.innerWidth();
                let left = pageX + ERROR_MARGIN, top = pageY + ERROR_MARGIN / 2, contextMenuHeight = numberOfActions * CONTEXT_MENU_ROW_HEIGHT;
                if (pageX + (CONTEXT_MENU_WIDTH + ERROR_MARGIN) >= windowWidth) {
                    left = pageX - (CONTEXT_MENU_WIDTH + ERROR_MARGIN);
                }
                if (pageY + contextMenuHeight + ERROR_MARGIN / 2 >= windowHeight) {
                    top = pageY - (contextMenuHeight + ERROR_MARGIN / 2);
                }
                if (top < ERROR_MARGIN)
                    top = ERROR_MARGIN;
                this.position = {
                    left: left,
                    top: top
                };
            },
            _onActionClick($event, action) {
                $event.stopPropagation();
                this.isOpen = false;
                if (action.callback) {
                    action.callback(this.clickedItemData);
                }
                if (this.onAnyActionFired && typeof this.onAnyActionFired === 'function') {
                    this.onAnyActionFired();
                }
            },
            _handleDocumentClick() {
                let handler = e => {
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
    }

</script>

<style scoped lang="less">



</style>
