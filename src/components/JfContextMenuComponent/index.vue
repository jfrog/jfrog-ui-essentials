<template>
    <div class="jf-context-menu" :style="position" v-if="isOpen">
        <a v-for="(action,index) in actions" :key="index"
            @click.prevent="_onActionClick($event, action)"
            :href="action.link" class="action-item"
            :icon-name="action.icon || ''">
            <i class="action-icon" :class="action.icon"></i>
            <span>{{action.name}}</span>
        </a>
    </div>
</template>

<script>
    const CONTEXT_MENU_WIDTH = 190;
    const CONTEXT_MENU_ROW_HEIGHT = 40;
    const ERROR_MARGIN = 15;

    export default {
        name: 'jf-context-menu',
        'jf@inject': [
            '$timeout',
            'JFrogEventBus'
        ],
        data() {
            return {
                position: {
                    top:0,
                    left:0
                },
                isOpen: false,
                actions: []
            };
        },
        created() {
            this.EVENTS = this.JFrogEventBus.getEventsDefinition();
        },
        mounted() {
            this._registerToEvents();
            this._handleDocumentClick();
        },
        beforeDestroy() {
          $(document).off('mousedown', this.documentClickHandler);
        },
        methods: {
            _registerToEvents() {
                this.JFrogEventBus.registerOnScope(this, this.EVENTS.CONTEXT_MENU_OPEN, options => {
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
                    left: `${left}px`,
                    top: `${top}px`
                };
                this.$nextTick(()=>{
                    this.$forceUpdate();
                })
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
                this.documentClickHandler = e => {
                    let target = $(e.target);
                    let insideContextMenu = !!target.parents('.jf-context-menu').length;
                    if (!insideContextMenu) {
                        this.$timeout(() => {
                            this.isOpen = false;
                        });
                    }
                };
                $(document).on('mousedown', this.documentClickHandler);
            }

        }
    }

</script>

<style scoped lang="less">
  @import '../../assets/stylesheets/main';
  .jf-context-menu {
    background: white;
    position: absolute;
    width: 190px;
    top: -100%;
    left: -100%;
    z-index: 10000003;
    box-shadow: 0 2px 12px rgba(0, 0, 0, .25);
    .action-item {
      display: block;
      color: inherit;
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      font-size: 13px;
      white-space: nowrap;
      span {
        margin-left: 8px;
      }
      .action-icon {
        &:before {
          width: auto !important;
          font-size: 18px;
          line-height: 40px;
          float: left;
        }
      }
      &:hover {
        text-decoration: none;
        background-color: @grayBGLight !important;
        &[icon-name~="icon-clear"] {
          color: @redError;
          .action-icon {
            &:before {
              color: @redError;
            }
          }
        }
      }
    }
  }
</style>
