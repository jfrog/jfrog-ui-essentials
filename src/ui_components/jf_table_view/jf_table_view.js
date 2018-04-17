export function jfTableView() {
    return {
        controller: jfTableViewController,
        controllerAs: 'jfTableView',
        bindToController: true,
        scope: {
            options: '=',
            objectName: '@'
        },
        templateUrl: 'ui_components/jf_table_view/jf_table_view.html'
    }
}


class jfTableViewController {
	/* @ngInject */
    constructor($scope, $element, $timeout, $compile, $rootScope, JFrogEventBus) {
        this.$element = $element;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.$scope = $scope;
	    this.JFrogEventBus = JFrogEventBus;
	    this.EVENTS = JFrogEventBus.getEventsDefinition();
	    this.$rootScope = $rootScope;
        this.cellScopes = [];

        this.vsApi = {
            onInit: () => {
                this.vsApi.registerScrollListener(scrollPos => this.onVScroll(scrollPos))
            }
        };

        $scope.$watch('jfTableView.options',(options) => {
            if (this.options) {
                this.options._setDirectiveController(this);
            }
            if (this.options && !this.paginationApi) {
                this.paginationApi = new PaginationApi(this);

                this.paginationApi.registerChangeListener(()=>{
                    this.$timeout(()=>this.refresh(false));
                })

                this.currentPage = 0;
            }
        })

        let on_resize = () => {
            this.options._normalizeWidths();
            this._fireDebouncedRowsInView()
        }
        
        $(window).on('resize',on_resize);
        $scope.$on('$destroy', ()=>{
            this.cellScopes.forEach(s=>s.$destroy());
            $(window).off('resize',on_resize);
        })

        this._handleDocumentClick();
    }


    clearFilter() {
        this.tableFilter = '';
        this.onUpdateFilter();
    }

    getActualPageHeight() {
        if (this.options.rowsPerPage === 'auto') {
            return Math.min($(this.$element).parent().height() - $(this.$element).find('.table-rows-container').position().top, parseFloat(this.options.rowHeight) * this.options.getPrePagedData().length);
        }
        else {
            return parseFloat(this.options.rowHeight) * Math.min(this.options.rowsPerPage, this.options.getPrePagedData().length) + 2;
        }
    }

    compileTemplate(elem,field,rowId) {
        let column = field;
        let row = rowId;
        let columnObj = _.find(this.options.columns,{field:column});
        let rowObj = row !== 'headers' ? this.options.getPageData()[row] : this.options.headersRow;

        if (!rowObj) return;

        if (rowObj.$groupHeader) {
            let groupRowObj = {};
            _.set(groupRowObj,rowObj.$groupHeader.field,rowObj.$groupHeader.value);
            rowObj = groupRowObj;
        }

        let existingScope = _.find(this.cellScopes, s => s.row.entity === rowObj && s.col === columnObj);

        let rowScope;
        if (!existingScope) {
            rowScope = this.$rootScope.$new();

            this.cellScopes.push(rowScope);

            _.extend(rowScope,{
                row: { entity: rowObj, uid: rowId},
                col: columnObj,
                MODEL_COL_FIELD: _.get(rowObj, field),
                COL_FIELD: _.get(rowObj, field),
                appScope: this.options.appScope,
                grid: {appScope: this.options.appScope}, //Backward compatibility with old grid
                table: {
                    options: this.options
                }
            });
        }
        else rowScope = existingScope;

        let template = row !== 'headers' ? columnObj.cellTemplate : columnObj.headerCellTemplate;
        let templateElem = $(template);
	    this._autoAddEllipsisClass(templateElem);
	    this.$compile(templateElem)(rowScope);
        elem.empty();
        elem.append(templateElem);
    }

	_autoAddEllipsisClass(templateRoot) {
        let allText = templateRoot.text();
        let elementToAddTo = null;
        let recursiveAdd = (root) => {
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
            }
            else {
                elementToAddTo = root;
            }
        }
        recursiveAdd(templateRoot);
        if (elementToAddTo) {
	        if (!elementToAddTo.is('[disable-tooltip-on-overflow]')) {
		        elementToAddTo.attr('jf-tooltip-on-overflow',true);
            }
	        elementToAddTo.addClass('overflow-ellipsis');
        }
    }

    onUpdateFilter() {
        this.options.refreshFilter();
        this.refresh();
        this.paginationApi.setPage(1, true);
        this.paginationApi.update();
    }
    refresh(updatePagination = true) {
        let unusedScopes = _.filter(this.cellScopes, scope => this.options.getPageData().indexOf(scope.row.entity) === -1);
        unusedScopes.forEach(s=>{
            this.cellScopes.splice(this.cellScopes.indexOf(s),1);
            s.$destroy()
        });
        if (this.paginationApi && updatePagination) this.paginationApi.update();
    }
    clearSelection() {
        this.options.getRawData().forEach(row=>delete row.$selected)
        this.allSelected = false;
    }
    toggleSelectAll() {
        this.allSelected = !this.allSelected;
        this.options.getPrePagedData().forEach(row=>{
	        if (this.options.isRowSelectable && !this.options.isRowSelectable({entity: row})) {
		        row.$selected = false;
	        }
	        else {
		        row.$selected = this.allSelected
	        }
        });
        if (this.options.groupedBy) {
            this.options.getFilteredData().forEach(row=>{
                if (this.options.isRowSelectable && !this.options.isRowSelectable({entity: row})) {
	                row.$selected = false;
                }
                else {
	                row.$selected = this.allSelected
                }
            });
        }

    }

    onVScroll(scrollPos) {
        let virtualScrollIndex = Math.floor(scrollPos);
        let virtualScrollDisplacement = scrollPos - virtualScrollIndex;
        this.currentPage = Math.floor((virtualScrollIndex + this.options.rowsPerPage - 1) / this.options.rowsPerPage);
        this.paginationApi.update();

        this._fireDebouncedRowsInView();

    }

    _fireDebouncedRowsInView() {

        if (!this.options.hasListenersFor('row.in.view')) return;

        let debounceCall = (debouncedFunc, debounceTime) => {
            if (this.debounceTimeout) this.$timeout.cancel(this.debounceTimeout);
            this.debounceTimeout = this.$timeout(() => {
                debouncedFunc();
            }, debounceTime)
        }

        debounceCall(() => {
            let pageData = this.vsApi.getPageData();
            let lriv = this.lastRowsInView || [];
            this.lastRowsInView = pageData;
            pageData = _.filter(pageData, row => !_.includes(lriv, row));
            pageData.forEach(row => this.options.fire('row.in.view', row));
        }, this.options.rowInViewDebounceTime);
    }

    getTotalScrollHeight() {
        return ((this.options.getPrePagedData().length * parseFloat(this.options.rowHeight)) + 'px');
    }

    getScrollWidth() {
        let el = $(this.$element).find('.scroll-faker-container')[0];
        return el.offsetWidth - el.clientWidth;
    }

    createNewEntity() {
        this.options.newEntityCallback();
        this.$timeout(()=>this.onUpdateFilter());
    }

    groupSelection(groupHeader) {
        let query = {};
        _.set(query,groupHeader.$groupHeader.field,groupHeader.$groupHeader.value)
        let group = _.filter(this.options.getFilteredData(),query);
        group.forEach(row=>row.$selected = groupHeader.$selected);
    }

    initFilter() {
        this.$timeout(() => {
            if (this.options && this.options.autoFocusFilter) {
                let filterInput = $(this.$element).find('.jf-table-filter input');
                filterInput.focus();
            }
        })
    }

    getTotalRecords() {
        if (!this.options) return;
	    let records = _.filter(this.options.getFilteredData(),(record)=>{
            return !record.$parentRow;
        });
        let count = records.length;

        return count + ' ' + this.getObjectNameByCount(count);
    }

    getObjectNameByCount(count, objectName) {
        objectName = objectName || this.options.objectName;
        let recordsName;

        if (objectName) {
            if (objectName.indexOf('/')>=0) {
                let splited = objectName.split('/');
                recordsName = count !== 1 ? splited[1] : splited[0];
            }
            else {
                recordsName = count !== 1 ? objectName + 's' : objectName;
            }
        }
        else {
            recordsName = count !== 1 ? 'records' : 'record';
        }

        return _.startCase(recordsName);
    }

    getSelectedRecords() {

        if (!this.options) return 0;

        let count = this.options.getSelectedRows().length;

        return count;
    }

	_handleDocumentClick() {
		let handler = (e) => {
		    this.$timeout(() => {
                let shouldCloseDropdown = !$(e.target).parents('.jf-table-cell.actions').length || $(e.target).parents('.jf-table-view')[0] !== $(this.$element).find('.jf-table-view')[0];
                if (shouldCloseDropdown) this.JFrogEventBus.dispatch(this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, this);
            })
		};
		$(document).on('click',handler);
		this.$scope.$on('$destroy',() => {
			$(document).off('click', handler)
		})
	}


}

jfTableViewController.$inject = ['$scope','$element', '$timeout', '$compile', '$rootScope', 'JFrogEventBus'];

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

        if (this.listeners) this.listeners.forEach(listener=>listener(this.getCurrentPage()));
    }

    registerChangeListener(listener) {
        if (!this.listeners) this.listeners = []
        this.listeners.push(listener);
    }

    syncVirtualScroll(jump = false) {
        if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.VIRTUAL_SCROLL) {
            this.tableCtrl.vsApi.scrollTo(this.tableCtrl.currentPage*this.tableCtrl.options.rowsPerPage, jump ? 0 : 500);
        }
    }

}