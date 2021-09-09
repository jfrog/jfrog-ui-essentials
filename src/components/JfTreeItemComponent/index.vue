<template>
  <div
    :class="refreshHack.count && getClasses().concat(getCustomClasses())"
    :style="{height: tree.viewPane.itemHeight, 'line-height': tree.viewPane.itemHeight}"
    @click="onItemClick($event)"
    @dblclick="onItemDoubleClick()"
  >
    <div
      class="jf-tree-item-container"
      :style="{height: tree.viewPane.itemHeight, 'line-height': tree.viewPane.itemHeight}"
    >
      <jf-tree-indentation
        :visible="tree.api.linesVisible"
        :height="tree.viewPane.itemHeight"
        :lines-backgrounds="tree.viewPane.linesBackgrounds"
        :indentation="getIndentation()"
      />
      <div
        v-if="data.level >= 1 && tree.api.linesVisible && !shouldShowExpander() && !data.$pending"
        class="no-children-line-extension"
        :style="{height: tree.viewPane.itemHeight, 'background-image': 'url(\'' + tree.viewPane.linesBackgrounds['horizontal-line'] + '\')'}"
      />
      <span
        v-if="data.data === tree.api.GO_UP_NODE"
        class="drill-back"
      >&nbsp;&nbsp;..</span>
      <div
        v-if="data.data !== tree.api.GO_UP_NODE && (shouldShowExpander() || data.$pending || data.level === 0)"
        v-init="initExpander()"
        class="node-expander"
        :style="{height: tree.viewPane.itemHeight}"
        @click="shouldShowExpander() && toggleExpansion(); $event.stopPropagation();"
      >
        <div
          v-if="shouldShowExpander()"
          class="action-icon icon icon-addons-arrow-right"
        />
        <div
          v-if="data.$pending"
          class="spinner-msg-local"
        >
          <div class="icon-hourglass-local" />
        </div>
      </div>
      <div
        v-if="data.data !== tree.api.GO_UP_NODE"
        class="jf-tree-item-content"
      >
        <jf-tree-compiled-cell
          :item-id="itemId"
          :tree-item="jfTreeItem"
        />
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfTreeItem',
        props: [
            'data',
            'itemId',
            'tree'
        ],
        'jf@inject': [
            '$scope',
            '$element',
            '$timeout',
            'AdvancedStringMatch'
        ],
        data() {
            return {
                refreshHack: this.tree.refreshHack
            };
        },
        created() {
            this.asm = this.AdvancedStringMatch;
        },
        mounted() {
            $(this.$el).prop('comp', this);
            this._watchSelection();
            this._watchExpansion();

            this._registerEvents();

            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

            $(this.$element).prop('ctrl', this);

        },
        ng1_legacy: { 'controllerAs': 'jfTreeItem' },
        methods: {
            _registerEvents() {
                if (this.tree.api.eventsToRegisterOnNode) {
                    this.tree.api.eventsToRegisterOnNode.forEach(registeredEvent => {
                        this.tree.api.JFrogEventBus.registerOnScope(this.$scope, registeredEvent.event, (...params) => {
                            registeredEvent.callback(this.data.data, params);
                        });
                    });
                }
            },
            initExpander() {
                this._syncExpansionClass(this.isExpanded());
            },
            _syncExpansionClass(expanded) {
                let iconElem = $(this.$element).find('.node-expander');
                if (expanded) {
                    iconElem.addClass('expanded');
                } else {
                    iconElem.removeClass('expanded');
                }
            },
            _watchExpansion() {
                this.$scope.$watch(() => this.isExpanded(), expanded => this._syncExpansionClass(expanded));

                this.$scope.$watch('jfTreeItem.data', () => this._syncExpansionClass(this.isExpanded()));
            },
            _watchSelection() {
                //This is instead of using ng-class, which not working smoothly in safari
                let toggleClass = (add, className) => {
                    if (add) {
                        $(this.$element).addClass(className);
                    } else {
                        $(this.$element).removeClass(className);
                    }
                };

                this.$scope.$watch(() => this.tree.api.$freezedSelected || this.tree.api.$selectedNode, selected => {
                    let iAmSelected = selected === this.data.data;
                    toggleClass(iAmSelected, 'selected');
                });
                this.$scope.$watch(() => this.tree.api.$freezedPreSelected || this.tree.api.$preSelectedNode, preSelected => {
                    let iAmPreSelected = preSelected === this.data.data;
                    toggleClass(iAmPreSelected, 'pre-selected');
                });
                this.$scope.$watch('jfTreeItem.data', () => {
                    let iAmPreSelected = (this.tree.api.$freezedPreSelected || this.tree.api.$preSelectedNode) === this.data.data;
                    let iAmSelected = (this.tree.api.$freezedSelected || this.tree.api.$selectedNode) === this.data.data;
                    toggleClass(iAmSelected, 'selected');
                    toggleClass(iAmPreSelected, 'pre-selected');
                });
            },
            _getTreeContainer() {
                return $(this.tree.$element).find('.jf-tree-container');
            },
            isSelected() {
                return this.tree.api._isSelected(this.data);
            },
            isPreSelected() {
                return this.tree.api._isPreSelected(this.data);
            },
            onItemClick(e) {
                if (e.type === 'click') {
                    if (this.data.data === this.tree.api.GO_UP_NODE) {
                        this.tree.api.drillUp();
                    } else {
                        this.tree.api._setSelected(this.data);
                        this.tree.api.fire('item.clicked', this.data.data);
                    }
                }
            },
            onItemDoubleClick() {
                this.tree.api.fire('item.dblClicked', this.data.data);
            },
            isExpanded() {
                return this.tree.viewPane.isNodeOpen(this.data.data);
            },
            toggleExpansion() {
                this.tree.api.toggleExpansion(this.data.data);
            },
            isQuickFindMatch() {
                let elem = $(this.$element).find('.jf-tree-item-content .node-text');
                if (elem.length) {
                    let text = elem.text();
                    elem.unhighlight();
                    if (text && this.tree.api.quickFindTerm) {
                        let asmResponse = this.asm.match(text, this.tree.api.quickFindTerm);
                        if (asmResponse.matched) {
                            this.asm.highlight(elem, asmResponse.segments);
                        }
                        return asmResponse.matched;
                    } else
                        return false;
                }
            },
            getClasses() {
                let classes = ['jf-tree-item-vue'];
                if (this.isQuickFindMatch())
                    classes.push('quick-find-match');
                return classes;
            },
            getCustomClasses() {
                if (!this.data.data || this.data.data === this.tree.api.GO_UP_NODE || !this.tree.api.classGetter)
                    return [];
                else {
                    let classes = this.tree.api.classGetter(this.data.data);
                    if (!classes)
                        classes = [];
                    else if (!_.isArray(classes))
                        classes = [classes];
                    return classes;
                }
            },
            shouldShowExpander() {
                return this.data.hasChildren && !this.data.data.$noChildren && !this.data.$pending;
            },
            getIndentation() {
                if (!this.data.data.$indentation) {
                    this.createIndentation();
                }
                return this.data.data.$indentation;
            },
            createIndentation() {
                if (!this.tree.api.linesVisible) {
                    this.$set(this.data.data, '$indentation', _.map(new Array(this.data.level), i => ({})));
                    return;
                }

                let flats = this.data.pane.$flatItems;
                let isLastChild = item => {
                    if (item.$isLastChild === undefined) {
                        let parent = item.parent;
                        let children = _.filter(flats, { parent });
                        let index = children.indexOf(item);
                        item.$isLastChild = index !== -1 && index === children.length - 1;
                    }
                    return item.$isLastChild;
                };

                let indentation = [];
                let relevantItem = this.data;
                for (let i = this.data.level - 1; i >= 0; i--) {
                    let isLast = isLastChild(relevantItem);
                    let unit = {
                        index: i,
                        background: i === this.data.level - 1 ? isLast ? 'last-connection-point' : 'connection-point' : isLast ? '' : 'vertical-line'
                    };
                    indentation.push(unit);
                    relevantItem = relevantItem.parent;
                }
                this.$set(this.data.data, '$indentation', indentation.reverse());
            }
        }
    }

</script>

<style scoped lang="less">



</style>
