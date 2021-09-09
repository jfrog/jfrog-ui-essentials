<template>
  <div>
    <div
      class="dnd-panel"
      tabindex="0"
      @keydown="onKeyDown($event)"
    >
      <div class="row dnd-filter-wrapper">
        <div class="col-lg-5 col-md-5 col-sm-5">
          <input
            v-model="filterExcludeList"
            type="text"
            :style="{color:noMatches ? 'red' : 'black'}"
            ng-model-options="{debounce: 200}"
            placeholder="Filter..."
            :disabled="disabled"
            class="input-text dnd-filter"
            @input="updateExcludeFilter(true)"
          >
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2" />
        <div class="col-lg-5 col-md-5 col-sm-5">
          <input
            v-model="filterIncludeList"
            type="text"
            :style="{color:noIncludeMatches ? 'red' : 'black'}"
            ng-model-options="{debounce: 200}"
            placeholder="Filter..."
            :disabled="disabled"
            class="input-text dnd-filter"
            @input="updateIncludeFilter(true)"
          >
        </div>
      </div>
      <div class="row">
        <div class="col-lg-5 col-md-5 col-sm-5">
          <h5
            v-if="headers.leftTitle"
            class="text-primary"
          >
            {{ headers.leftTitle }}
          </h5>
          <div
            :id="excludeListId"
            class="dnd-list-wrapper"
            @mouseenter="mouseIsInExclude(true)"
            @mouseleave="mouseIsInExclude(false)"
          >
            <ul class="dnd-list">
              <li
                v-for="(item, $index) in getViewableExcludes()"
                class="drag-item"
                :class="{'drag-placeholder':item===PLACEHOLDER, 'active' : isSelected(item)}"
                :data-index="'exc-' + $index"
                @click="toggleSelection(item)"
                @dblclick="includeSpecific(item)"
                @mouseenter="mouseOver(item)"
                @mouseleave="mouseOver(null)"
              >
                <div
                  v-if="item !== PLACEHOLDER && !customTemplate"
                  class="drag-item-text"
                >
                  <i
                    v-if="item._iconClass"
                    :class="item._iconClass"
                  />
                  {{ excludeDisplayField &amp;&amp; item[excludeDisplayField] ? item[excludeDisplayField] : item }}
                </div>
                <div
                  v-if="item !== PLACEHOLDER && customTemplate"
                  class="drag-item-text"
                >
                  <i
                    v-if="item._iconClass"
                    :class="item._iconClass"
                  />
                  <div
                    v-if="customTemplate"
                    v-init="compileCustomTemplate(item,'exc')"
                    class="custom-template"
                  />
                </div>
                <div
                  v-if="item === PLACEHOLDER"
                  class="drag-item-text"
                />
              </li>
            </ul>
          </div>
          <jf-drag-drop-pagination :pagination-api="excludesPaginationApi" />
        </div>

        <div class="col-lg-2 col-md-2 col-sm-2">
          <h5
            v-if="headers.leftTitle || headers.rightTitle"
            class="text-primary"
          >
&nbsp;
          </h5>
          <ul class="dnd-actions">
            <li>
              <span
                :disabled="isIncludeListEmpty() || isIncludeListFixed() || disabled"
                @click="excludeAll()"
              >«
              </span>
            </li>
            <li>
              <span
                :disabled="!isIncludeListItemSelected() || disabled"
                @click="excludeSelected()"
              >‹
              </span>
            </li>
            <li>
              <span
                :disabled="!isExcludeListItemSelected() || disabled"
                @click="includeSelected()"
              >›
              </span>
            </li>
            <li>
              <span
                :disabled="isExcludeListEmpty() || disabled"
                @click="includeAll()"
              >»
              </span>
            </li>
          </ul>
        </div>

        <div class="col-lg-5 col-md-5 col-sm-5">
          <h5
            v-if="headers.rightTitle"
            class="text-primary"
          >
            {{ headers.rightTitle }}
          </h5>
          <div
            :id="includeListId"
            class="dnd-list-wrapper"
            @mouseenter="mouseIsInInclude(true)"
            @mouseleave="mouseIsInInclude(false)"
          >
            <ul class="dnd-list dnd-list-fullheight">
              <li
                v-for="(item, $index) in getViewableIncludes()"
                class="drag-item dropped-item"
                :class="{'drag-placeholder':item===PLACEHOLDER, 'active' : isSelected(item)}"
                :data-index="'inc-' + $index"
                @click="!$event.defaultPrevented ? (toggleSelection(item)) : ''"
                @dblclick="excludeSpecific(item)"
                @mouseenter="mouseOver(item)"
                @mouseleave="mouseOver(null)"
              >
                <div
                  v-if="item !== PLACEHOLDER && !customTemplate"
                  class="drag-item-text"
                >
                  <i
                    v-if="item._iconClass"
                    :class="item._iconClass"
                  />
                  {{ includeDisplayField &amp;&amp; item[includeDisplayField] ? item[includeDisplayField] : item }}
                </div>
                <div
                  v-if="item !== PLACEHOLDER && customTemplate"
                  class="drag-item-text"
                >
                  <i
                    v-if="item._iconClass"
                    :class="item._iconClass"
                  />
                  <div
                    v-if="customTemplate"
                    v-init="compileCustomTemplate(item,'inc')"
                    class="custom-template"
                  />
                </div>
                <div
                  v-if="item === PLACEHOLDER"
                  class="drag-item-text"
                />
                <a
                  v-if="item && item !== PLACEHOLDER && !item['__fixed__'] && !disabled"
                  href=""
                  class="delete-drop-item"
                  @click.prevent="excludeSpecific(item);$event.stopPropagation();$event.preventDefault();"
                >✕</a>
              </li>
            </ul>
          </div>
          <jf-drag-drop-pagination :pagination-api="includesPaginationApi" />
        </div>
      </div>
      <div class="clearfix" />
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfDragDrop',
        props: [
            'includeList',
            'excludeList',
            'includeDisplayField',
            'excludeDisplayField',
            'includeListId',
            'excludeListId',
            'objectsName',
            'headers',
            'customTemplate',
            'customTemplateScope',
            'usePagination',
            'commObject',
            'disabled'
        ],
        'jf@inject': [
            '$attrs',
            '$interval',
            '$element',
            '$scope',
            '$timeout',
            '$compile'
        ],
        data() {
            return {
                noMatches: null,
                filterExcludeList: null,
                noIncludeMatches: null,
                filterIncludeList: null,
                PLACEHOLDER: { '@@@DNDPH@@@': '@@@DNDPH@@@' },
                excludesPaginationApi: null,
                includesPaginationApi: null
            };
        },
        created() {
            this.draggedObject = null;
            this.selectedItems = [];
        },
        mounted() {
            if (!this.includeList)
                this.includeList = [];
            _.remove(this.excludeList, excludeItem => {
                return _.find(this.includeList, includeItem => angular.equals(includeItem, excludeItem));
            });

            if (this.usePagination) {
                this._initPagination();
            }

            let randomId = Math.floor(1000000000 * Math.random());
            if (!this.includeListId)
                this.includeListId = 'include-list-' + randomId;
            if (!this.excludeListId)
                this.excludeListId = 'exclude-list-' + randomId;

            if (this.commObject) {
                _.extend(this.commObject, {
                    updateFilter: () => this.updateFilter(),
                    excludeAll: () => this.excludeAll(),
                    excludeSelected: () => this.excludeSelected(),
                    excludeSpecific: item => this.excludeSelected(item),
                    includeAll: () => this.includeAll(),
                    includeSelected: () => this.includeSelected(),
                    includeSpecific: item => this.includeSelected(item)
                });
            }

            this._initWatchers();
        },
        ng1_legacy: {
            ng1postLinkFn($scope, $element) {
                $($element).on('mouseenter', '.drag-item-text', e => {
                    let dragItem = $(e.target);

                    if (dragItem.hasClass('drag-item-text')) {
                        if (dragItem[0].scrollWidth > dragItem.innerWidth()) {
                            if (!dragItem.hasClass('tooltipstered')) {
                                dragItem.tooltipster({
                                    animation: 'fade',
                                    trigger: 'hover',
                                    onlyOne: 'true',
                                    interactive: 'true',
                                    position: 'bottom',
                                    theme: 'tooltipster-default bottom',
                                    content: dragItem.text().trim()
                                });
                                dragItem.tooltipster('show');
                            } else {
                                dragItem.tooltipster('enable');
                                if (dragItem.tooltipster('content') != dragItem.text().trim())
                                    dragItem.tooltipster('content', dragItem.text().trim());
                            }
                        } else if (dragItem.hasClass('tooltipstered'))
                            dragItem.tooltipster('disable');
                    }
                });
            },
            'controllerAs': 'jfDragDrop'
        },
        methods: {
            _initWatchers() {
                // we don't use this.updateFilter() for performance, we want to update only include list when original include list is update
                this.$scope.$watch('jfDragDrop.includeList', () => {
                    this.filterIncludeCache = _.filter(this.includeList, item => !this._isExcludeFilteredOut(item));
                }, true);
                this.$scope.$watch('jfDragDrop.excludeList', () => {
                    this.filterExcludeCache = _.filter(this.excludeList, item => !this._isIncludeFilteredOut(item));
                }, true);
            },
            excludeAll() {
                if (this.disabled || this.isIncludeListEmpty() || this.isIncludeListFixed())
                    return;

                let filteredOut = [];
                this.includeList.forEach(item => {
                    if (_.isObject(item)) {
                        item['__fixed__'] = undefined;
                    }

                    if (this.filterIncludeList) {
                        if (this._isExcludeFilteredOut(item)) {
                            filteredOut.push(item);
                        } else {
                            this.excludeList.push(item);
                        }
                    } else {
                        this.excludeList.push(item);
                    }
                });
                this.includeList = filteredOut;

                this._clearSelectedItems();
                this.updateFilter();
                this._updatePagination();
                this.$timeout(() => {
                    this.$emit('on-change');
                });
            },
            excludeSelected() {
                if (this.disabled || !this.isIncludeListItemSelected())
                    return;

                this._filterSelection('inc');

                this.selectedItems.forEach(item => {
                    if (!_.isObject(item) || !item['__fixed__']) {
                        this.includeList.splice(this.includeList.indexOf(item), 1);

                        if (this.excludeList.indexOf(item) < 0) {
                            this.excludeList.push(item);
                        }
                    }
                });
                this._clearSelectedItems();
                this.updateFilter();
                this._updatePagination();
                this.$emit('on-change');
            },
            excludeSpecific(item) {
                if (this.disabled || item['__fixed__'])
                    return;
                var picked;
                for (var i = this.includeList.length - 1; i >= 0; i--) {
                    if (this.includeList[i] == item) {
                        picked = this.includeList.splice(i, 1)[0];
                        this._removeItemFromSelection(picked);
                        break;
                    }
                }
                if (picked) {
                    this.excludeList.push(picked);
                }
                this.updateFilter();
                this._updatePagination();
                this.$emit('on-change');

            },
            includeSpecific(item) {
                if (this.disabled)
                    return;
                var picked;
                for (var i = this.excludeList.length - 1; i >= 0; i--) {
                    if (this.excludeList[i] == item) {
                        picked = this.excludeList.splice(i, 1)[0];
                        this._removeItemFromSelection(picked);
                        break;
                    }
                }
                if (picked) {
                    if (_.isObject(picked)) {
                        picked['__fixed__'] = undefined;
                    }
                    this.includeList.push(picked);
                }
                this.updateFilter();
                this._updatePagination();
                this.$emit('on-change');

            },
            includeAll() {
                if (this.disabled || this.isExcludeListEmpty())
                    return;
                let filteredOut = [];
                this.excludeList.forEach(item => {
                    if (_.isObject(item)) {
                        item['__fixed__'] = undefined;
                    }
                    if (this.filterExcludeList) {
                        if (this._isIncludeFilteredOut(item)) {
                            filteredOut.push(item);
                        } else {
                            this.includeList.push(item);
                        }
                    } else {
                        this.includeList.push(item);
                    }
                });
                this.excludeList = filteredOut;
                this._clearSelectedItems();
                this.updateFilter();
                this._updatePagination();
                this.$timeout(() => {
                    this.$emit('on-change');
                });
            },
            includeSelected() {
                if (this.disabled || !this.isExcludeListItemSelected())
                    return;

                this._filterSelection('exc');

                if (!this.includeList) {
                    this.includeList = [];
                }
                if (this.excludeList.length) {
                    this.selectedItems.forEach(item => {
                        if (_.isObject(item)) {
                            item['__fixed__'] = undefined;
                        }
                        this.excludeList.splice(this.excludeList.indexOf(item), 1);

                        if (this.includeList.indexOf(item) < 0) {
                            this.includeList.push(item);
                        }

                    });
                }
                this._clearSelectedItems();
                this.updateFilter();
                this._updatePagination();
                this.$emit('on-change');
            },
            toggleSelection(item) {
                if (this.disabled)
                    return;

                let index = this._inSelectedItems(item);

                if (index > -1) {
                    this.selectedItems.splice(index, 1);
                } else {
                    if (!_.isObject(item) || !item['__fixed__'] || this.includeList.indexOf(item) < 0) {
                        this.selectedItems.push(item);
                    }
                }

                let scrollParent = $(this.$element[0].querySelector('.dnd-panel')).scrollParent();
                let tempScrollTop = scrollParent.scrollTop();
                this.$element[0].querySelector('.dnd-panel').focus();
                scrollParent.scrollTop(tempScrollTop);
            },
            isIncludeListItemSelected() {

                let found = false;

                if (this.includeList) {
                    for (let i = 0; i < this.includeList.length; i++) {
                        if (this.selectedItems.indexOf(this.includeList[i]) > -1) {
                            found = true;
                            break;
                        }
                    }
                }

                return found;
            },
            isExcludeListItemSelected() {

                let found = false;

                if (this.excludeList) {

                    for (let i = 0; i < this.excludeList.length; i++) {
                        if (this.selectedItems.indexOf(this.excludeList[i]) > -1) {
                            found = true;
                            break;
                        }
                    }
                }

                return found;
            },
            isExcludeListEmpty() {
                if (!this.excludeList || !this.excludeList.length)
                    return true;
                //        else if (!this.filterList) return false;

                let empty = true;

                for (let i in this.excludeList) {
                    let item = this.excludeList[i];
                    if (!this._isIncludeFilteredOut(item) && item !== this.PLACEHOLDER) {
                        empty = false;
                        break;
                    }
                }

                return empty;

            },
            isIncludeListEmpty() {
                if (!this.includeList || !this.includeList.length)
                    return true;

                let empty = true;

                for (let i in this.includeList) {
                    let item = this.includeList[i];
                    if (!this._isExcludeFilteredOut(item) && item !== this.PLACEHOLDER) {
                        empty = false;
                        break;
                    }
                }

                return empty;
            },
            isIncludeListFixed() {
                if (this.includeList) {
                    let fixed = true;
                    for (let i in this.includeList) {
                        let item = this.includeList[i];
                        if (!_.isObject(item) || !item['__fixed__']) {
                            fixed = false;
                            break;
                        }
                    }
                    ;
                    //            return _.filter(this.includeList,{'__fixed__':undefined}).length === 0;
                    return fixed;
                }
            },
            isSelected(item) {
                return this._inSelectedItems(item) > -1;
            },
            _removeItemFromSelection(item) {
                let index = this.selectedItems.indexOf(item);
                if (index >= 0) {
                    this.selectedItems.splice(index, 1);
                }
            },
            _inSelectedItems(item) {
                return this.selectedItems.indexOf(item);
            },
            _clearSelectedItems() {
                this.selectedItems = [];
            },
            _isIncludeFilteredOut(item) {
                if (!this.filterExcludeList || item === '' || item === this.PLACEHOLDER)
                    return false;
                let regex = new RegExp('.*' + this.filterExcludeList.split('*').join('.*') + '.*', 'i');
                return !regex.test(this.excludeDisplayField && item[this.excludeDisplayField] ? item[this.excludeDisplayField] : item);
            },
            _isExcludeFilteredOut(item) {
                if (!this.filterIncludeList || item === '' || item === this.PLACEHOLDER)
                    return false;
                let regex = new RegExp('.*' + this.filterIncludeList.split('*').join('.*') + '.*', 'i');
                return !regex.test(this.includeDisplayField && item[this.includeDisplayField] ? item[this.includeDisplayField] : item);
            },
            updateExcludeFilter(fromEdit = false) {
                this.filterExcludeCache = _.filter(this.excludeList, item => !this._isIncludeFilteredOut(item));
                if (fromEdit)
                    this._updatePagination();
            },
            updateIncludeFilter(fromEdit = false) {
                this.filterIncludeCache = _.filter(this.includeList, item => !this._isExcludeFilteredOut(item));
                if (fromEdit)
                    this._updatePagination();
            },
            updateFilter(fromEdit = false) {
                this.filterExcludeCache = _.filter(this.excludeList, item => !this._isIncludeFilteredOut(item));
                this.filterIncludeCache = _.filter(this.includeList, item => !this._isExcludeFilteredOut(item));
                if (fromEdit)
                    this._updatePagination();
            },
            getFilteredExcludeList() {
                let ret = this.filterExcludeCache || this.excludeList;
                this.noExcludeMatches = this.excludeList && this.excludeList.length && !ret.length;
                return ret;
            },
            getFilteredIncludeList() {
                let ret = this.filterIncludeCache || this.includeList;
                this.noIncludeMatches = this.includeList && this.includeList.length && !ret.length;
                return ret;
            },
            _dragStart(event, ui) {
                let dragObj = this._objectFromElement(event.target);
                if (this.disabled || dragObj.draggedFrom === this.includeList && _.isObject(dragObj.dataObject) && dragObj.dataObject['__fixed__']) {
                    event.preventDefault();
                    return;
                }
                this._initDragObject(dragObj);

                this._initDragHelper(ui.helper);

                this._dragAdditionals();

                this._insertPlaceHolder(this.draggedObject.draggedFrom, this.draggedObject.index);

                this.updateFilter();
                this.$scope.$apply();

            },
            _initDragObject(dragObj) {
                this.draggedObject = dragObj;
                dragObj.draggedFrom.splice(dragObj.index, 1);
                this.$scope.$apply();
            },
            _initDragHelper(helper) {
                this.draggedObject.helper = helper;
                helper.addClass('drag-helper');
                let xicon = helper.find('.delete-drop-item');
                if (xicon)
                    xicon.remove();
            },
            _dragAdditionals() {
                if (this.selectedItems.length) {

                    //remove dragged object from selection, leave only additionals
                    if (this._inSelectedItems(this.draggedObject.dataObject) >= 0)
                        this.toggleSelection(this.draggedObject.dataObject);

                    this.draggedObject.additionals = [];

                    //only add to additionals the selected items from the draggedFrom array, and not filtered out.
                    this.selectedItems.forEach(selected => {
                        let index;
                        if (this.draggedObject.draggedFrom === this.excludeList)
                            index = this.getFilteredExcludeList().indexOf(selected);
                        else
                            index = this.draggedObject.draggedFrom.indexOf(selected);

                        if (index >= 0) {
                            this.draggedObject.additionals.push(selected);
                        }
                    });

                    this._clearSelectedItems();

                    this.$scope.$apply(() => {
                        this.draggedObject.additionals.forEach(selected => {
                            this.draggedObject.draggedFrom.splice(this.draggedObject.draggedFrom.indexOf(selected), 1);
                        });

                        if (this.draggedObject.additionals.length > 0)
                            this.draggedObject.helper.addClass('multiple').html(`<span>≡</span>` + (1 + this.draggedObject.additionals.length) + ' ' + (this.objectsName ? this.objectsName : 'Items'));
                    });
                }
            },
            _dragStop(event, ui) {
                if (this.draggedObject) {
                    let ph = this._removePlaceHolder();
                    //console.log('mouseInExclude: '+this.mouseInExclude, 'mouseInInclude: '+this.mouseInInclude);
                    if (this.mouseInExclude || this.mouseInInclude) {
                        let droppedInArray = this.mouseInExclude ? this.excludeList : this.includeList;

                        if (ph && ph.array === droppedInArray) {
                            droppedInArray.splice(ph.index, 0, this.draggedObject.dataObject);
                        } else {
                            droppedInArray.push(this.draggedObject.dataObject);
                        }
                    } else {
                        this.draggedObject.draggedFrom.splice(this.draggedObject.index, 0, this.draggedObject.dataObject);
                    }
                    if (_.isObject(this.draggedObject.dataObject)) {
                        this.draggedObject.dataObject['__fixed__'] = undefined;
                    }

                    this._stopScrollInterval();

                    this.$scope.$apply();

                    this._undragAdditionals(ph.index + 1);

                    this._initDragAndDropOnElement(this._elementFromObject(this.draggedObject.dataObject));

                    this.draggedObject = null;

                    this._clearSelectedItems();
                    this.$timeout(() => {
                        this.updateFilter();
                    });
                    this._updatePagination();
                    this.$emit('on-change');
                }
            },
            _dragMove(event, ui) {
                this.$scope.$apply(() => {
                    let list_element = $(event.originalEvent.target);

                    if (!list_element.hasClass('dnd-list-wrapper'))
                        list_element = list_element.parents('.dnd-list-wrapper');

                    if (list_element && list_element.hasClass('dnd-list-wrapper')) {
                        let dragOffsetY = event.pageY - list_element.offset().top;

                        if (list_element.scrollTop() > 0 && dragOffsetY > 0 && dragOffsetY < 20 && !this.scrollInterval)
                            //this.scrollInterval = this.$interval(() => {
                            list_element.scrollTop(list_element.scrollTop() - 5);    //}, 50);
                        else if (dragOffsetY > list_element.outerHeight() - 20 && dragOffsetY < list_element.outerHeight() && !this.scrollInterval)
                            //this.scrollInterval = this.$interval(() => {
                            list_element.scrollTop(list_element.scrollTop() + 5);    //}, 50);
                                                                                     //else
                                                                                     //    this._stopScrollInterval();
                    }    //else
                         //    this._stopScrollInterval();
                });
            },
            _stopScrollInterval() {
                if (this.scrollInterval) {
                    this.$interval.cancel(this.scrollInterval);
                    this.scrollInterval = null;
                }
            },
            _undragAdditionals(startIndex) {
                if (this.draggedObject.additionals) {
                    let next = startIndex;
                    this.$scope.$apply(() => {
                        this.draggedObject.additionals.forEach(additional => {
                            if (this.mouseInInclude) {
                                this.includeList.splice(next, 0, additional);
                            } else if (this.mouseInExclude) {
                                this.excludeList.splice(next, 0, additional);
                            } else {
                                this.draggedObject.draggedFrom.splice(next, 0, additional);
                            }

                            if (_.isObject(additional)) {
                                additional['__fixed__'] = undefined;
                            }
                            //                this.$scope.$apply();
                            this._initDragAndDropOnElement(this._elementFromObject(additional));
                            next++;
                        });

                    });
                }
            },
            _initDragAndDropOnElement(elem) {
                if (!elem || elem.hasClass('drag-enabled'))
                    return;
                elem.draggable({
                    helper: 'clone',
                    cursorAt: {
                        left: -5,
                        top: -5
                    },
                    scroll: false,
                    distance: 10,
                    start: (event, ui) => this._dragStart(event, ui),
                    stop: (event, ui) => this._dragStop(event, ui),
                    drag: (event, ui) => this._dragMove(event, ui)
                });
                elem.addClass('drag-enabled');
            },
            _objectFromElement(elem) {
                let dataIndex = $(elem).attr('data-index');
                let parsed = dataIndex.split('-');
                let array;
                if (parsed[0] === 'inc')
                    array = this.includeList;
                else if (parsed[0] === 'exc')
                    array = this.excludeList;

                let index = parsed[1];
                if (array === this.excludeList) {
                    let obj = this.getViewableExcludes()[index];
                    index = this.excludeList.indexOf(obj);
                } else {
                    let obj = this.getViewableIncludes()[index];
                    index = this.includeList.indexOf(obj);
                }

                let obj = {
                    draggedFrom: array,
                    dataObject: array[index],
                    index: index,
                    phIndex: null,
                    phArray: null
                };

                return obj;
            },
            _elementFromObject(obj) {

                let iexc = this.getViewableExcludes().indexOf(obj);
                let iinc = this.getViewableIncludes().indexOf(obj);
                let array = iexc >= 0 ? 'exc' : iinc >= 0 ? 'inc' : '';
                let index = iexc >= 0 ? iexc : iinc >= 0 ? iinc : -1;

                if (index < 0)
                    return null;
                else {
                    return $(this.$element).find('li[data-index=' + array + '-' + index + ']');
                }
            },
            mouseIsInInclude(isIn) {
                this.mouseInInclude = isIn;
                if (this.mouseInInclude)
                    this.mouseInExclude = false;
                if (isIn && this.draggedObject && this.draggedObject.phArray !== this.includeList) {
                    this._insertPlaceHolder(this.includeList, this.includeList.length);
                }
            },
            mouseIsInExclude(isIn) {
                this.mouseInExclude = isIn;
                if (this.mouseInExclude)
                    this.mouseInInclude = false;
                if (isIn && this.draggedObject && this.draggedObject.phArray !== this.excludeList) {
                    this._insertPlaceHolder(this.excludeList, this.excludeList.length);

                                                                                           //let list_element = $('#dnd-' + (iexc >= 0 ? 'exclude' : 'include'));

                }
            },
            initDragElement(item) {
                this.$timeout(() => {
                    let elem = this._elementFromObject(item);

                    this._initDragAndDropOnElement(elem);
                });
            },
            mouseOver(item) {
                if (item != null && this.draggedObject) {

                    let iexc = this.excludeList.indexOf(item);
                    let iinc = this.includeList.indexOf(item);
                    let array = iexc >= 0 ? this.excludeList : iinc >= 0 ? this.includeList : null;
                    let index = iexc >= 0 ? iexc : iinc >= 0 ? iinc : -1;

                    if (array)
                        this._insertPlaceHolder(array, index);

                } else if (item != null) {
                    this.initDragElement(item);
                }
            },
            _insertPlaceHolder(array, index) {
                this._removePlaceHolder();
                array.splice(index, 0, this.PLACEHOLDER);
                this.draggedObject.phIndex = index;
                this.draggedObject.phArray = array;
                this.updateFilter();
            },
            _findPlaceHolder() {
                let phIndexExc = this.excludeList.indexOf(this.PLACEHOLDER);
                let phIndexInc = this.includeList.indexOf(this.PLACEHOLDER);

                if (phIndexExc >= 0) {
                    return {
                        array: this.excludeList,
                        index: phIndexExc
                    };
                } else if (phIndexInc >= 0) {
                    return {
                        array: this.includeList,
                        index: phIndexInc
                    };
                } else {
                    return null;
                }

            },
            _removePlaceHolder() {
                let ph = this._findPlaceHolder();
                if (ph) {
                    ph.array.splice(ph.index, 1);
                    this.draggedObject.phIndex = null;
                }
                return ph;
            },
            onKeyDown(e) {
                if (e.shiftKey && e.ctrlKey && (e.which === 65 || e.which === 97)) {
                    this._clearSelectedItems();
                } else if (e.ctrlKey && (e.which === 65 || e.which === 97)) {
                    e.preventDefault();
                    if (this.mouseInExclude)
                        this._selectAll(this.excludeList);
                    else if (this.mouseInInclude)
                        this._selectAll(this.includeList);

                }
            },
            _selectAll(array) {
                this._clearSelectedItems();
                array.forEach(item => {
                    this.toggleSelection(item);
                });
            },
            compileCustomTemplate(item, type) {
                let displayField;
                if (type === 'exc')
                    displayField = 'excludeDisplayField';
                else if (type === 'inc')
                    displayField = 'includeDisplayField';

                let elem = this._elementFromObject(item);
                if (elem) {
                    let template = this.customTemplate;
                    let newElem = $(template);

                    let scope = this.$scope.$new();
                    _.extend(scope, {
                        getItemInfo: () => {
                            let theItem = this._objectFromElement(elem).dataObject;
                            return {
                                text: this[displayField] && theItem && theItem[this[displayField]] ? theItem[this[displayField]] : theItem,
                                item: theItem,
                                included: type === 'inc'
                            };
                        },
                        userScope: this.customTemplateScope
                    });

                    this.$compile(newElem)(scope);
                    let customElem = elem.find('.custom-template');
                    customElem[0].innerHTML = '';
                    customElem[0].appendChild(newElem[0]);
                }
            },
            _initPagination() {
                this.itemsPerPage = _.isNaN(parseInt(this.usePagination)) ? 8 : parseInt(this.usePagination);
                this.currExcludesPage = 0;
                this.currIncludesPage = 0;

                this.excludesPaginationApi = new PaginationApi(this, 'exc');
                this.includesPaginationApi = new PaginationApi(this, 'inc');

                //get item height and margin
                let e = $(`<div style="background-color: transparent" class="drag-item">
        <div class="drag-item-text"></div>
    </div>`);
                $(this.$element).find('.dnd-list')[0].appendChild(e[0]);
                let height = e.outerHeight();
                let margin = parseInt(e.css('margin-bottom'));
                $(this.$element).find('.dnd-list')[0].removeChild(e[0]);


                let listWrappers = $(this.$element).find('.dnd-list-wrapper');
                let wrappersHeight = margin * 2 + (height + margin) * this.itemsPerPage;
                listWrappers.css('height', wrappersHeight + 'px');
                listWrappers.css('overflow-y', 'hidden');

                let actions = $(this.$element).find('.dnd-actions');
                let actionsHeight = parseInt(actions.css('height'));
                actions.css('margin-top', (wrappersHeight - actionsHeight) / 2 + 'px');

            },
            _updatePagination() {
                if (this.usePagination) {
                    this.excludesPaginationApi.update();
                    this.includesPaginationApi.update();
                }
            },
            getViewableExcludes() {
                if (!this.usePagination) {
                    return this.getFilteredExcludeList();
                } else {
                    let all = this.getFilteredExcludeList();
                    return _.slice(all, this.currExcludesPage * this.itemsPerPage, (this.currExcludesPage + 1) * this.itemsPerPage);
                }
            },
            getViewableIncludes() {
                if (!this.usePagination) {
                    return this.getFilteredIncludeList();
                } else {
                    let all = this.getFilteredIncludeList();
                    return _.slice(all, this.currIncludesPage * this.itemsPerPage, (this.currIncludesPage + 1) * this.itemsPerPage);
                }
            },
            _filterSelection(leave) {
                this.selectedItems = _.filter(this.selectedItems, item => {
                    if (leave === 'inc' && this.includeList && this.includeList.indexOf(item) >= 0)
                        return true;
                    else if (leave === 'exc' && this.excludeList && this.excludeList.indexOf(item) >= 0)
                        return true;
                    else
                        return false;
                });
            }


        }
    }

</script>

<style scoped lang="less">



</style>
