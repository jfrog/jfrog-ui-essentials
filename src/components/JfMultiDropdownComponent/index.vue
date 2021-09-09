<template>
  <div>
    <div
      :class="{'disabled':disabled,'with-text-inputs':textInputs,'borderless':borderless}"
      class="jf-multi-dropdown"
    >
      <label v-if="label">{{ label }} <span v-if="showLabelCounter && selectedItems().length">({{ selectedItems().length }})</span></label>


      <div
        class="main-box"
        :class="{'selected-view' : selectedItems().length,
                 'no-items': !items.length && noItemsMessage,
                 'no-label': !label}"
        @click="onClick()"
      >
        <!--Default-->
        <span v-if="showSelected && !selectedItems().length">{{ title }}</span>

        <!--SHOW SELECTED COUNTER-->
        <span
          v-if="!showSelected"
          class="title-wrapper"
        >
          {{ title }}
          <span class="selected-counter">({{ getSelectedCount() }})</span>
        </span>

        <!--Something selected and shown-->
        <span v-if="showSelected && selectedItems().length">
          {{ getSelectedForTitle() }}
        </span>


        <!--ACTIONS-->
        <span class="actions">
          <i
            v-if="showSelected && selectedItems().length"
            class="clear-field"
            @click.stop="unSelectAll()"
          >×</i>
          <i class="icon-small-arrow-down" />
        </span>
      </div>


      <div
        v-if="opened"
        class="drop-down-container"
      >
        <div
          v-if="!noFilter"
          class="filter-container"
        >
          <form>
            <jf-field :autofocus="true">
              <input
                v-model="filterText"
                type="text"
                autocomplete="off"
                name="items-filter"
                class="input-text"
                :placeholder="filterPlaceholder"
              >
            </jf-field>
          </form>
        </div>
        <div
          v-if="items.length"
          class="list-container"
        >
          <div
            v-for="(item, $index) in $filterArray(items, {text: filterText})"
            :key="$index + filterText"
            class="drop-down-item"
            :class="{'last-selected': $index === lastSelectedIndex && !filterText, 'disabled': item.disabled}"
          >
            <label
              v-if="!singleSelection"
              class="jf-checkbox"
            >
              <input
                v-model="item.isSelected"
                type="checkbox"
                :disabled="item.disabled"
                @change="onSelection()"
              >
              <span /> <i
                v-if="item.iconClass"
                class="item-icon"
                :class="item.iconClass"
              />
              {{ item.text }}
            </label>
            <jf-radio-button
              v-if="singleSelection"
              :key="item.isSelected"
              :text="item.text"
            >
              <input
                v-model="singleSelectionIndex"
                type="radio"
                :value="item.$id"
                :disabled="item.disabled"
                @change="onSingleSelection()"
              >
            </jf-radio-button>
            <span
              v-if="textInputs"
              class="text-input-wrapper"
            >
              <input
                v-model="item.inputTextValue"
                type="text"
                name="items-filter"
                class="input-text"
                :placeholder="item.inputPlaceholder || 'Free text'"
              >
            </span>
          </div>
        </div>
        <div
          v-if="items.length"
          class="batch-action-buttons"
        >
          <button
            type="button"
            class="btn btn-default pull-right"
            @click="clearSelection()"
          >
            {{ singleSelection ? 'Clear selection' : 'Clear All' }}
          </button>
          <button
            v-if="!singleSelection"
            type="button"
            class="btn btn-default pull-right"
            @click="selectAll()"
          >
            Select All
          </button>
        </div>
        <div
          v-if="!items.length && noItemsMessage"
          class="list-container"
        >
          <div class="no-items-message">
            {{ noItemsMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfMultiDropdown',
        props: [
            'title',
            'label',
            'filterPlaceholder',
            'noItemsMessage',
            'items',
            'disabled',
            'noSort',
            'dropdownOpened',
            'showSelected',
            'showLabelCounter',
            'noFilter',
            'noSelectedFirst',
            'singleSelection',
            'textInputs',
            'borderless'
        ],
        'jf@inject': [
            '$scope',
            '$filter',
            '$element'
        ],
        data() {
            return {
                opened: null,
                filterText: null,
                lastSelectedIndex: null,
                singleSelectionIndex: -1
            };
        },
        created() {

            this.filter = this.$filterArray;
            this.opened = false;

            this.$scope.$watch('jfMultiDropdown.items', (newVal, oldVal) => {
                if (newVal) {
                    //this.sortItems();
                    if (this.singleSelection) {
                        this.items.forEach((item, index) => item.$id = index);
                        let disabled = _.filter(this.items, item => item.disabled);
                        disabled.forEach(item => item.isSelected = false);
                        let selected = _.filter(this.items, item => item.isSelected);
                        if (selected.length > 1) {
                            selected.slice(1).forEach(item => item.isSelected = false);
                        }
                        if (selected.length) {
                            this.singleSelectionIndex = selected[0].$id;
                        }
                    }
                }
            });

            this.$scope.$watch('jfMultiDropdown.dropdownOpened', val => {
                if (val === true) {
                    if (!this.items) {
                        return;
                    }
                    this.opened = true;
                    this.filterText = '';
                } else if (val === false) {
                    this.opened = false;
                    this.filterText = '';
                } else {
                }
            });
        },
        mounted() {
            this.handleOutsideClick();
        },
        ng1_legacy: {'controllerAs': 'jfMultiDropdown'},
        methods: {
            sendOpenStateChange() {
                this.$emit('on-open-state-change', {opened: this.opened});
                if (!this.opened && !this.singleSelection) {
//                    this.sortItems();
                }
            },
            handleOutsideClick() {
                let handler = e => {
                    let outside = !$(e.target).parents('.jf-multi-dropdown').length || $(e.target).parents('.jf-multi-dropdown')[0] !== $(this.$element).find('.jf-multi-dropdown')[0];
                    if (outside) {
                        let changed = !!this.opened;
                        this.opened = false;

                        if (changed) {
                            this.sendOpenStateChange();

                        }
                    }
                };
                $(document).on('click', handler);
                this.$scope.$on('$destroy', () => {
                    $(document).off('click', handler);
                });
            },
            getSelectedForTitle() {
                let selected = _.filter(this.items, item => item.isSelected);
                selected = _.map(selected, s => s.selectedText || s.text);
                return selected.join(', ');
            },
            onClick() {
                if (this.disabled !== true) {
                    if (!this.items) {
                        return;
                    }
                    this.opened = !this.opened;
                    this.sendOpenStateChange();
                    this.filterText = '';

                }

            },
            onSingleSelection() {
                Vue.nextTick(() => {
                    this.items.forEach((item, index) => {
                        if (!item.disabled) {
                            item.isSelected = false;
                        }
                    });
                    let selected = _.find(this.items, item => item.$id == this.singleSelectionIndex);
                    selected.isSelected = true;
                    this.applyChanges();
                })
            },
            getSelectedCount() {
                let selected = _.filter(this.items, item => item.isSelected && !item.isAllToggleCheckbox);
                return selected.length;
            },
            applyChanges() {
                Vue.nextTick(() => {
                    let selected = _.filter(this.items, item => item.isSelected);
                    this.$emit('on-change', selected);
                    this.$forceUpdate()
                })
            },
            selectedItems() {
                let selected = _.filter(this.items, item => item.isSelected);
                selected = _.map(selected, 'text');
                return selected;
            },
            sortItems() {
                if (this.opened) return;
                if (this.noSelectedFirst) {
                    return;
                }
                if (!this.items) {
                    return;
                }
                let selected = this.noSort ? _.filter(this.items, item => item.isSelected) : _.sortBy(_.filter(this.items, item => item.isSelected), 'text');
                let unSelected = this.noSort ? _.filter(this.items, item => !item.isSelected) : _.sortBy(_.filter(this.items, item => !item.isSelected), 'text');
                this.lastSelectedIndex = selected.length - 1;
                let combined = selected.concat(unSelected);
                this.items.splice.apply(this.items, [
                    0,
                    this.items.length
                ].concat(combined));
            },
            selectAll() {
                if (this.disabled)
                    return;
                this.filter(this.items, this.filterText).forEach(item => {
                    if (!item.disabled) {
                        item.isSelected = true;
                    }
                });
                this.applyChanges();
            },
            unSelectAll() {
                if (this.disabled)
                    return;
                this.filter(this.items, this.filterText).forEach(item => {
                    if (!item.disabled) {
                        item.isSelected = false;
                    }
                });
                this.applyChanges();
                this.singleSelectionIndex = -1;
            },
            onSelection() {
                this.applyChanges();
            },
            clearSelection() {
                if (this.disabled)
                    return;
                if (this.textInputs) {
                    _.forEach(this.items, item => {
                        item.inputTextValue = '';
                    });
                }
                this.unSelectAll();
            }

        }
    }

</script>

<style scoped lang="less">


</style>
