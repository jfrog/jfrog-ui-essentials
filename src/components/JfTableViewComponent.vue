<template>

    <div>

        <div class="jf-table-view" style="clear: both">

            <div class="new-entity-wrapper">
                <a href="" class="new-entity" @click.prevent="createNewEntity()" v-if="options && options.newEntityCallback">
                    <i class="icon icon-new"></i> <span v-if="options && !options.newEntityCustomText">Add {{options.useAnWithObjectName ? 'an' : 'a'}} {{objectName ? objectName.split('/')[0] : options.objectName ? options.objectName.split('/')[0] : 'Item'}}</span>
                    <span v-if="options && options.newEntityCustomText">{{options.newEntityCustomText}}</span>
                </a>
            </div>

            <jf-table-top :table-view="jfTableView"></jf-table-top>

            <div class="columns-customization-wrap" v-if="options && options.columnsCustomization">
                <div class="columns-customization pull-right">
                    <jf-multi-dropdown title="Columns" no-filter="true" filter-placeholder="Filter Columns" :items="options.availableColumns" on-change="options.updateCustomizedColumns()"></jf-multi-dropdown>
                </div>
            </div>

            <div class="jf-table-view-container" v-if="options">
                <div class="jf-table-view-header" v-if="options && options.headersVisible">
                    <jf-table-row :table-view="jfTableView" :row-id="'headers'" :data="options.headersRow"></jf-table-row>
                </div>


                <div v-if="options.getPrePagedData().length > 1 && options && options.paginationMode === options.VIRTUAL_SCROLL" class="table-rows-container">
                    <recycle-scroller :emit-update="true" @update="updateVScroll"
                                      :items="options.getPrePagedData()"
                                      :item-height="parseInt(options.rowHeight)"
                                      :style="{height: getActualPageHeight() + 'px'}"
                                      key-field="$$$id">
                        <jf-table-row slot-scope="{ item, index }" :table-view="jfTableView" :row-id="index" :data="item"></jf-table-row>
                    </recycle-scroller>

<!--
                    <jf-vscroll with-each="entity" :in="options.getPrePagedData()" :api="vsApi">
                        <jf-table-row :table-view="jfTableView" :row-id="$index" :data="entity"></jf-table-row>
                    </jf-vscroll>
-->
                </div>

                <div v-if="options && options.paginationMode !== options.VIRTUAL_SCROLL" class="table-rows-container">
                    <jf-table-row :key="$index" v-for="(entity, $index) in options.getPageData()" :table-view="jfTableView" :row-id="$index" :data="entity"></jf-table-row>
                </div>

                <div class="empty-table-placeholder" :style="options.registeredTabularDnd ? options.registeredTabularDnd.emptyTableStyle : {}" v-if="options && options.dataWasSet && !options.getRawData().length && !options.pendingExternalPaging && (!options.externalTotalCount || options.externalTotalCount.total === 0)">
                    {{options.emptyTableText || 'This table is empty !'}} <a href="" class="jf-link" v-if="options.emptyTableAction && options.emptyTableCallActionText" @click.prevent="options.emptyTableAction()">{{options.emptyTableCallActionText}}</a>
                </div>
                <div class="empty-table-placeholder filter-no-results" v-if="options && noFilterResults">
                    {{options.noFilterResultsText || 'Current filter has no results.'}} <a href="" class="jf-link" v-if="tableFilter" @click.prevent="clearFilter()">Clear filter</a>
                </div>
                <div v-if="options && options.pendingInfiniteScroll" :style="{height: options.rowHeight}" class="loading-more">
                    <div class="spinner-msg-local">
                        <div class="icon-hourglass-local"></div>
                    </div>
                </div>

            </div>


        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-table-view',
        props: [
            'options',
            'objectName'
        ],
        'jf@inject': [
            '$scope',
            '$element',
            '$timeout',
            '$compile',
            '$rootScope',
            'JFrogEventBus'
        ],
        data() {
            return {
                vsApi: { onInit: {} },
                noFilterResults: null,
                tableFilter: null,
                vsStartIndex: null,
                vsEndIndex: null,
            };
        },
        created() {
            this.EVENTS = this.JFrogEventBus.getEventsDefinition();
            this.cellScopes = [];

            this.$scope.$watch('jfTableView.options', options => {
                if (this.options) {
                    this.options._setDirectiveController(this);
                }
                if (this.options && !this.paginationApi) {
                    this.paginationApi = new PaginationApi(this);

                    this.paginationApi.registerChangeListener(() => {
                        this.refresh(false);
                        this._fireDebouncedRowsInView();
                    });

                    this.currentPage = 0;
                }
            });

            let on_resize = () => {
                this.options._normalizeWidths();
                this._fireDebouncedRowsInView();
            };

            $(window).on('resize', on_resize);
            this.$scope.$on('$destroy', () => {
                this.cellScopes.forEach(s => s.$destroy());
                $(window).off('resize', on_resize);
            });
        },
        mounted() {
            this.$containerElement = this.$element.find('.jf-table-view');
            this._handleDocumentClick();
        },
        ng1_legacy: { 'controllerAs': 'jfTableView' },
        methods: {
            clearFilter() {
                this.tableFilter = '';
                this.onUpdateFilter();
            },
            getActualPageHeight() {
                if (this.options.rowsPerPage === 'auto') {
                    return Math.min($(this.$element).parent().height() - $(this.$element).find('.table-rows-container').position().top, parseFloat(this.options.rowHeight) * this.options.getPrePagedData().length);
                } else {
                    return parseFloat(this.options.rowHeight) * Math.min(this.options.rowsPerPage, this.options.getPrePagedData().length) + 2;
                }
            },
            compileTemplate(elem, field, rowId) {
                let column = field;
                let row = rowId;
                let columnObj = _.find(this.options.columns, { field: column });
                let rowObj = row !== 'headers' ? this.options.getPageData()[row] : this.options.headersRow;

                if (!rowObj)
                    return;

                if (rowObj.$groupHeader) {
                    let groupRowObj = {};
                    _.set(groupRowObj, rowObj.$groupHeader.field, rowObj.$groupHeader.value);
                    rowObj = groupRowObj;
                }

                let existingScope = _.find(this.cellScopes, s => s.row.entity === rowObj && s.col === columnObj);

                let rowScope;
                if (!existingScope) {
                    rowScope = this.$rootScope.$new({
                        row: {
                            entity: rowObj,
                            uid: rowId
                        },
                        col: columnObj,
                        MODEL_COL_FIELD: _.get(rowObj, field),
                        COL_FIELD: _.get(rowObj, field),
                        appScope: this.options.appScope,
                        grid: { appScope: this.options.appScope },
                        //Backward compatibility with old grid
                        table: { options: this.options }
                    });

                    this.cellScopes.push(rowScope);

                } else {
                    existingScope.row.uid = rowId;
                    rowScope = existingScope;
                }

                let template = row !== 'headers' ? columnObj.cellTemplate : columnObj.headerCellTemplate;
                let templateElem = $('<div>' + template + '</div>');
                this._autoAddEllipsisClass(templateElem);
                this.$compile(templateElem.children()[0])(rowScope);
                elem.empty();
                elem.append(templateElem.children()[0]);
            },
            _autoAddEllipsisClass(templateRoot) {
                let allText = templateRoot.text();
                let elementToAddTo = null;
                let recursiveAdd = root => {
                    let children = root.children();
                    let childToRecurseInto = null;
                    for (let i = 0; i < children.length; i++) {
                        let child = $(children[i]);
                        if (child.text() === allText) {
                            childToRecurseInto = child;
                            break;
                        }
                    }
                    if (childToRecurseInto) {
                        recursiveAdd(childToRecurseInto);
                    } else {
                        elementToAddTo = root;
                    }
                };
                recursiveAdd(templateRoot);
                if (elementToAddTo) {
                    if (!elementToAddTo.is('[disable-tooltip-on-overflow]')) {
                        elementToAddTo.attr('v-jf-tooltip-on-overflow', '');
                    }
                    elementToAddTo.addClass('overflow-ellipsis');
                }
            },
            onUpdateFilter() {
                this.options.refreshFilter();
                this.refresh();
                this.paginationApi.setPage(1, true);
                this.paginationApi.update();
            },
            refresh(updatePagination = true) {
                let pageData = this.options.getPageData();
                let unusedScopes = _.filter(this.cellScopes, scope => pageData.indexOf(scope.row.entity) === -1);
                unusedScopes.forEach(s => {
                    this.cellScopes.splice(this.cellScopes.indexOf(s), 1);
                    s.$destroy();
                });
                if (this.paginationApi && updatePagination)
                    this.paginationApi.update();

                this.$forceUpdate();

            },
            clearSelection() {
                this.options.getRawData().forEach(row => delete row.$selected);
                this.allSelected = false;
            },
            toggleSelectAll() {
                this.allSelected = !this.allSelected;
                this.options.getPrePagedData().forEach(row => {
                    if (this.options.isRowSelectable && !this.options.isRowSelectable({ entity: row })) {
                        this.$set(row, '$selected', false);
                    } else {
                        this.$set(row, '$selected', this.allSelected);
                    }
                });
                if (this.options.groupedBy) {
                    this.options.getFilteredData().forEach(row => {
                        if (this.options.isRowSelectable && !this.options.isRowSelectable({ entity: row })) {
                            this.$set(row, '$selected', false);
                        } else {
                            this.$set(row, '$selected', this.allSelected);
                        }
                    });
                }

            },
            onVScroll(scrollPos) {
                let virtualScrollIndex = Math.floor(scrollPos);
                let virtualScrollDisplacement = scrollPos - virtualScrollIndex;
                this.currentPage = Math.floor((virtualScrollIndex + this.options.rowsPerPage - 1) / this.options.rowsPerPage);
                this.paginationApi.update();

                this._fireDebouncedRowsInView();

            },
            _fireDebouncedRowsInView() {

                if (!this.options.hasListenersFor('row.in.view'))
                    return;

                let debounceCall = (debouncedFunc, debounceTime) => {
                    if (this.debounceTimeout)
                        this.$timeout.cancel(this.debounceTimeout);
                    this.debounceTimeout = this.$timeout(() => {
                        debouncedFunc();
                    }, debounceTime);
                };

/*
                debounceCall(() => {
                    let pageData = this.options.paginationMode === this.options.VIRTUAL_SCROLL ? this.vsApi.getPageData() : this.options.getPageData();
                    let lriv = this.lastRowsInView || [];
                    this.lastRowsInView = pageData;
                    pageData = _.filter(pageData, row => !_.includes(lriv, row));
                    pageData.forEach(row => this.options.fire('row.in.view', row));
                }, this.options.rowInViewDebounceTime);
*/
            },
            getTotalScrollHeight() {
                return this.options.getPrePagedData().length * parseFloat(this.options.rowHeight) + 'px';
            },
            getScrollWidth() {
                let el = $(this.$element).find('.scroll-faker-container')[0];
                return el.offsetWidth - el.clientWidth;
            },
            createNewEntity() {
                this.options.newEntityCallback();
                this.$timeout(() => this.onUpdateFilter());
            },
            groupSelection(groupHeader) {
                let query = {};
                _.set(query, groupHeader.$groupHeader.field, groupHeader.$groupHeader.value);
                let group = _.filter(this.options.getFilteredData(), query);
                group.forEach(row => row.$selected = groupHeader.$selected);
            },
            initFilter() {
                this.$timeout(() => {
                    if (this.options && this.options.autoFocusFilter) {
                        let filterInput = $(this.$element).find('.jf-table-filter input');
                        filterInput.focus();
                    }
                });
            },
            getTotalRecords() {
                if (!this.options)
                    return;
                let count = 0;

                if (this.options.paginationMode === this.options.EXTERNAL_PAGINATION) {
                    count = this.options.getTotalLengthOfData();
                } else {
                    count = _.filter(this.options.getFilteredData(), record => {
                        return !record.$parentRow;
                    }).length;
                }
                return count + ' ' + this.getObjectNameByCount(count);
            },
            getObjectNameByCount(count, objectName) {
                objectName = objectName || this.options.objectName;
                let recordsName;

                if (objectName) {
                    if (objectName.indexOf('/') >= 0) {
                        let splited = objectName.split('/');
                        recordsName = count !== 1 ? splited[1] : splited[0];
                    } else {
                        recordsName = count !== 1 ? objectName + 's' : objectName;
                    }
                } else {
                    recordsName = count !== 1 ? 'records' : 'record';
                }

                return _.startCase(recordsName);
            },
            getSelectedRecords() {

                if (!this.options)
                    return 0;

                let count = this.options.getSelectedRows().length;

                return count;
            },
            _handleDocumentClick() {
                let handler = e => {
                    this.$timeout(() => {
                        let shouldCloseDropdown = !$(e.target).parents('.jf-table-cell.actions').length || $(e.target).parents('.jf-table-view')[0] !== $(this.$element).find('.jf-table-view')[0];
                        if (shouldCloseDropdown)
                            this.JFrogEventBus.dispatch(this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, this);
                    });
                };
                $(document).on('click', handler);
                this.$scope.$on('$destroy', () => {
                    $(document).off('click', handler);
                });
            },
            updateVScroll(startIndex, endIndex) {
                this.vsStartIndex = startIndex;
                this.vsEndIndex = endIndex;
            }


        }
    }
    class PaginationApi {
        constructor(tableCtrl) {
            this.tableCtrl = tableCtrl;
        }
        getTotalPages() {
            return Math.ceil(this.tableCtrl.options.getTotalLengthOfData() / this.tableCtrl.options.rowsPerPage);
        }
        getCurrentPage() {
            return this.tableCtrl.currentPage + 1;
        }
        nextPage() {
            if (this.getCurrentPage() === this.getTotalPages()) return;
            this.tableCtrl.currentPage++;
            this.syncVirtualScroll();
            this.update();
            this.sendExternalPageRequest();
            this.tableCtrl.options.fire('pagination.change', this.getCurrentPage());
        }
        prevPage() {
            if (this.getCurrentPage() === 1) return;
            this.tableCtrl.currentPage--;
            this.syncVirtualScroll();
            this.update();
            this.sendExternalPageRequest();
            this.tableCtrl.options.fire('pagination.change', this.getCurrentPage());
        }
        sendExternalPageRequest() {
            if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.EXTERNAL_PAGINATION) {
                this.tableCtrl.options.sendExternalPageRequest();
            }
        }
        setPage(pageNum, jump = false) {
            if (pageNum < 1 || pageNum > this.getTotalPages()) return;

            this.tableCtrl.currentPage = pageNum - 1;

            this.syncVirtualScroll(jump);
            this.update();
            this.sendExternalPageRequest();
            this.tableCtrl.options.fire('pagination.change', this.getCurrentPage());
        }

        update() {
            if (this.getCurrentPage() > this.getTotalPages()) {
                this.setPage(1, true);
            }

            if (this.listeners) this.listeners.forEach(listener => listener(this.getCurrentPage()));
        }

        registerChangeListener(listener) {
            if (!this.listeners) this.listeners = []
            this.listeners.push(listener);
        }

        syncVirtualScroll(jump = false) {
            if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.VIRTUAL_SCROLL) {
                this.tableCtrl.vsApi.scrollTo(this.tableCtrl.currentPage * this.tableCtrl.options.rowsPerPage, jump ? 0 : 500);
            }
        }

    }
</script>

<style scoped lang="less">

    @import "../../src/assets/stylesheets/bootstrap-variables.less";
    @import "../../src/assets/stylesheets/variables.less";
    /deep/ .jf-table-view {
        width: 100%;
        position: relative;
        .columns-customization-wrap {
            width: 100%;
            position: absolute;
            visibility: hidden;
            .jf-multi-dropdown {
                .drop-down-container {
                    visibility: visible;
                    top: 50px;
                    box-shadow: 0 2px 12px rgba(0,0,0,.25);
                }
            }
        }
        .new-entity-wrapper {
            text-align: right;
            a.new-entity {
                color: @gray-dark;
                font-size: 16px;
                &:hover {
                    text-decoration: none;
                    color: @color-JFrog-green;
                }
                i {
                    font-size: 18px;
                    margin: 1px 8px 0 0;
                    vertical-align: middle;
                }
            }
        }

        .jf-table-top {
            display: flex;
            flex-direction: row;
            margin-bottom: 20px;
            height: 66px;

            .counter-and-filter-wrapper {
                flex-grow: 1;
                max-width: 380px;
                min-width: 150px;
                width: 100%;
                .table-counter {
                    white-space: nowrap;
                    font-size: 16px;
                    font-weight: 700;
                    height: 14px;
                    margin-bottom: 10px;
                    color: @blackBGLight;
                }
                .jf-table-filter {
                    i {
                        color: @light-gray;
                    }
                    input {
                        width: 100%;
                    }
                }
            }

            .batch-actions-wrapper {
                flex-grow: 1;
                align-self: flex-end;
                margin-bottom: 14px;
                white-space: nowrap;
                position: relative;
                width: 100%;
                min-width: 95px;
                jf-table-view-batch-actions {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                }
            }

            .pagination-controls {
                align-self: flex-end;
                margin-bottom: 13px;
                .grid-pagination {
                    margin: 0;
                    white-space: nowrap;
                    a.disabled {
                        cursor: not-allowed;
                    }
                }
            }
        }

        .jf-table-view-container {
            width: 100%;
            clear: both;
            .table-rows-container {
                position: relative;
                border-top: 1px solid @jfColorGrey;
                .jf-table-row {
                }
            }
            .columns-customization-icon {
                position: absolute;
                right: -4px;
                bottom: 32px;
                cursor: pointer;
            }

            .empty-table-placeholder {
                .empty-placeholder();
            }

            .hover .jf-table-row,
            .jf-table-row.selected,
            .jf-table-row:hover {
                &.drag-mark {
                    &:before {
                        font-family: artifactory!important;
                        font-size: 30px;
                        content: "\\";
                        position: absolute;
                        z-index: 10;
                        top: ~"calc(50% - 16px)";
                        right: 10px;
                        color: black;
                        font-weight: bold;
                    }
                    .jf-table-cell:last-child {
                        .jf-table-cell-content {
                            padding-right: 35px;
                        }
                    }

                }
            }

            .hover .jf-table-row,
            .jf-table-row.selected,
            .jf-table-row:hover {

                .jf-table-cell {
                    .jf-table-cell-content {
                    }
                    &.actions {
                        display: inline-table !important;
                    }
                    &.selection{
                        &.single-selection{
                            .selection-button{
                                .selection-icon{
                                    display: block;
                                }
                            }
                        }
                    }
                }
            }

            .hover .jf-table-row:not(.headers),
            .jf-table-row:not(.headers):hover {
                background-color: @grayBGLight;
            }

            .jf-table-row {
                display: flex;
                width: 100%;
                white-space: nowrap;
                padding: 0;
                margin: 0;
                position: relative;



                &.drop-target-mark {
                    border-top: 2px solid green !important;
                }

                &.sticky {
                    font-weight: 600;
                    &:nth-child(2) {
                        border-top: 1px solid @grayGridHeader;
                        border-bottom: 1px solid @greenFontHeader;
                    }
                }
                &:not(.headers) {
                    border: none;
                    &:last-child {
                        border-bottom: 1px solid @grayBGHover;
                    }
                    &:not(:first-child) {
                        border-top: 1px solid #e0e0e0;
                    }
                    &.sub-row {
                        border-top: none;
                    }
                }
                &:not(.headers),
                &.headers {
                    .row-expander + .jf-table-cell-content,
                    .jf-table-cell-content.row-expander-content {
                        padding-left: 0;
                    }
                }
                &:not(:first-child) {
                    border-top: none;
                }

                .jf-table-cell {
                    display: inline-table;
                    overflow: hidden;
                    z-index: 1;
                    position: relative;

                    .row-expander {
                        width: 60px;
                        position: relative;
                        top: -3px;
                        display: table-cell;

                        &:not(.placeholder) {
                            background: transparent;
                            cursor: pointer;
                            .icon-small-arrow-down {
                                height: 50px;
                                line-height: 50px;
                                top: 3px;
                                left: 25%;
                                right: 0;
                                margin-right: 14px;
                                display: inline-block;
                                position: relative;
                                transition: transform .2s ease-in-out,-webkit-transform .2s ease-in-out;
                                transform: rotate(-90deg);
                                &.expanded {
                                    transform: rotate(0);
                                }
                            }
                        }
                        .spinner-msg-local {
                            position: absolute;
                            top: ~"calc(50% - 7px)";
                            left: ~"calc(50% - 13px)";
                        }

                    }

                    &.drag-right {
                        border-right: 1px @greenBorderLight dotted !important;
                    }
                    &.drag-left {
                    }
                    &.selection {
                        &.single-selection {
                            .selection-button {
                                .selection-icon {
                                    display: none;
                                    &.selected {
                                        display: block;
                                    }
                                }
                            }
                        }
                    }

                    &.actions {
                        display: none;
                    }
                    &.selection,
                    &.actions {
                        padding: 0px !important;
                    }
                    &.header {
                        &.sortable {
                            cursor: pointer;
                        }
                        &:not(.column-resizer):not(.sortable) { //This is needed for some reason
                            cursor: default;
                        }
                        &.column-resizer {
                            cursor: col-resize;
                        }
                        .jf-table-cell-content {
                            font-size: 14px;
                            font-weight: 700;

                            jf-table-compiled-cell {
                                display: inline-table;
                            }
                            .icon.sorting-icon{
                                line-height: 1em;
                                padding: 0 5px;
                                &:not(.active) {
                                    color: @blackBorderLight;
                                }
                            }
                            .icon-small-arrow-down {
                                display: inline-block;
                                transition: transform .2s ease-in-out;
                                &.rotate180 {
                                    transform: rotate(-180deg);
                                }
                            }
                            &:hover {
                                .icon.sorting-icon:not(.active) {
                                    color: @grayBorderDarker;
                                }
                            }
                        }
                    }
                    &.group-header {
                        color: @black;
                        .icon-small-arrow-down {
                            display: inline-block;
                            transition: transform .2s ease-in-out;
                            transform: rotate(-90deg); // translate(-15px, 0) scale(1.5, 1.5)
                        }
                        &.jf-table-cell {
                            position: absolute;
                            left: 0;
                            right: 0;
                            width: 100%;
                            cursor: pointer;
                        }

                        & > .icon-small-arrow-down {margin-right: 14px;}
                        & > .jf-table-cell-content,
                        & > .group-header-count {
                            display: inline-block;
                            margin-right: 2px;
                            font-weight: 600;
                            vertical-align: middle;
                        }
                    }
                    .jf-table-cell-content {

                        overflow: hidden;
                        display: table-cell;
                        vertical-align: middle;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding: 0 14px;

                        &:not(.group-header):not(.row-expander-content) {
                            max-width: 0;
                        }
                        .grid-cell-checkbox {
                            line-height: 40px;
                            text-align: center;
                        }
                        .repo-type-icon {
                            float: left;
                            margin: 1px 10px 0 0;

                            &.icon- {
                                display: none;
                            }
                        }

                        .group-button-wrapper {
                            position: relative;
                            display: inline-block;
                            vertical-align: super;
                            .group-button {
                                position: absolute;
                                width: 24px;
                                height: 24px;
                                top: -12px;
                                left: 10px;
                            }
                        }
                        .selection-button,
                        .action-button {
                            cursor: pointer;
                            overflow: hidden;
                            display: table-cell;
                            vertical-align: middle;
                            text-align: center;
                            .action-icon {
                                top: 0 !important;
                                &:before {
                                    font-size: 17px !important;
                                    line-height: 2;
                                }
                            }
                            .action-icon:hover {
                                &:before {
                                    color: @greenBGDark;
                                }
                            }
                        }
                        .selection-button {
                            .selection-icon {
                                &:before {
                                    font-size: 16px !important;
                                    color: @grayBorderLighter;
                                    line-height: 1.8em;
                                }
                                &.selected {
                                    &:before {
                                        color: @greenBGDark;
                                    }
                                }
                            }
                        }
                    }
                }

                // Group expanded
                &.expanded {
                    .icon-small-arrow-down {
                        transform: rotate(0deg) !important;
                    }
                    .jf-table-cell-content,
                    .group-header-count {
                        color: @green;
                    }
                }
            }
            .loading-more {
                position: relative;
                .spinner-msg-local {
                    position: absolute;
                    top: ~"calc(50% - 10px)";
                    left: ~"calc(50% - 10px)";
                }
            }

        }

        .overflow-ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
            a {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
            }
            &:not(.jf-table-avatar){
                padding-right: 0;
            }
        }
        .row-drag-helper {
            opacity: 0.7 !important;
            z-index: 9999999999;
            pointer-events: none;
            background-color: lightgray !important;
            border: 1px lightgreen dotted !important;
            &.multiple {
                font-size: 20px;
                opacity: 1 !important;
                padding: 10px;
            }
        }

        .jf-table-cell:first-child:not(.row-expander-cell) {
            padding-left: 14px;
        }

        //show all button
        .ui-grid-cell-contents {
            position: relative;
            .gridcell-showall {
                top: 5px;
            }
        }
        .jf-table-row-actions-dropdown {
            background: white;
            position: absolute;
            top: ~"calc(100% - 21px)";
            right: 26px;
            z-index: 9999999;
            box-shadow: 0 2px 12px rgba(0, 0, 0, .25);
            .action-item {
                cursor: pointer;
                height: 40px;
                line-height: 40px;
                padding: 0 10px;
                font-size: 13px;
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
                    background-color: @grayBGLight !important;
                    &,&:before{
                        color: inherit;
                    }
                }
            }
        }

        .grid-checkbox {
            padding: 0;
            text-align: center;

            input[type="checkbox"] {
                display: none;
            }

            input[type="checkbox"] + span {
                display: none;
                font-size: 17px;
                color: @jfColorGreen;

                &:before {
                    line-height: 50px;
                }
            }

            input[type="checkbox"]:checked + span {
                display: inline-block;
            }
        }

    }

    // CSS for the 'show all' modal
    #show-all-modal {
        .modal-body {
            margin-bottom: 10px;
            .empty-filter-placeholder {
                .empty-placeholder();
            }
        }
    }

    .empty-placeholder() {
        height: 80px;
        line-height: 25px;
        width: 100%;
        text-align: center;
        padding: 30px;
        margin-top: 30px;
        background-color: @grayBGDark;
        &.drop-target-mark {
            border: dashed black 1px;
        }
    }

</style>
