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
                this.virtualScrollIndex = 0;
            }
        })

        let on_resize = () => this.$timeout(()=>this.options._normalizeWidths());
        
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
	        elementToAddTo.attr('jf-tooltip-on-overflow',true);
	        elementToAddTo.addClass('overflow-ellipsis');
        }
    }

    onUpdateFilter() {
        this.options.refreshFilter();
        this.refresh();
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
    onMouseWheel($event, $delta, $deltaX, $deltaY) {
        if (this.options.paginationMode === this.options.VIRTUAL_SCROLL) {
            if ($deltaY<0) { // scrollUp
                if (this.virtualScrollIndex + this.options.rowsPerPage < this.options.getPrePagedData().length) {
                    $event.preventDefault();
                    this.virtualScrollIndex++;
                }
            }
            else if ($deltaY>0) { // scrollDown
                if (this.virtualScrollIndex > 0) {
                    $event.preventDefault();
                    this.virtualScrollIndex--;
                }
            }
            this.currentPage = Math.floor((this.virtualScrollIndex + this.options.rowsPerPage - 1) / this.options.rowsPerPage);
            this.options.update(true,true);
            this.syncFakeScroller();
        }
    }

    getTotalScrollHeight() {
        return ((this.options.getPrePagedData().length * parseFloat(this.options.rowHeight)) + 'px');
    }

    initScrollFaker() {
        if (this.options.paginationMode === this.options.VIRTUAL_SCROLL) {
            let scrollParent = this.$element.find('.scroll-faker-container');
            scrollParent.on('scroll',(e)=>{
                this.$scope.$apply(()=>{
                    let len = this.options.getPrePagedData().length;
                    if (len) {
                        let relativePosition = scrollParent.scrollTop()/(len * parseFloat(this.options.rowHeight))
                        this.virtualScrollIndex = Math.floor(relativePosition*len);
                        this.currentPage = Math.floor((this.virtualScrollIndex + this.options.rowsPerPage - 1) / this.options.rowsPerPage);
                    }
                    else {
                        this.virtualScrollIndex = 0;
                        this.currentPage = 0;
                    }
                    this.options.update(true,true);
	                this.options.fire('pagination.change', this.paginationApi.getCurrentPage());

                })
            })
        }
    }
    syncFakeScroller() {
        if (this.options.paginationMode === this.options.VIRTUAL_SCROLL) {
            let len = this.options.getPrePagedData().length;
            let scrollParent = this.$element.find('.scroll-faker-container');
            let relativePosition = this.virtualScrollIndex / len;
            let scrollTop = relativePosition * len * parseFloat(this.options.rowHeight);
            scrollParent.scrollTop(scrollTop);
        }
    }

    getScrollWidth() {
        let el = this.$element.find('.scroll-faker-container')[0];
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
            if (this.options.autoFocusFilter) {
                let filterInput = $(this.$element).find('.jf-table-filter input');
                filterInput.focus();
            }
        })
    }

    getTotalRecords() {

        if (!this.options) return;

        let count = this.options.getRawData().length;
        let recordsName;

        if (this.options.objectName) {
            if (this.options.objectName.indexOf('/')>=0) {
                let splited = this.options.objectName.split('/');
                recordsName = count !== 1 ? splited[1] : splited[0];
            }
            else
                recordsName = count !== 1 ? this.options.objectName + 's' : this.options.objectName;
        }
        else
            recordsName = count !== 1 ? 'records' : 'record';

        return count + ' ' + _.startCase(recordsName);
    }

    getSelectedRecords() {

        if (!this.options) return 0;

        let count = this.options.getSelectedRows().length;

        return count;
    }

	_handleDocumentClick() {
		let handler = (e) => {
			let shouldCloseDropdown = !$(e.target).parents('.jf-table-cell.actions').length || $(e.target).parents('.jf-table-view')[0] !== $(this.$element).find('.jf-table-view')[0];

			if (shouldCloseDropdown) this.JFrogEventBus.dispatch(this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN);
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
    setPage(pageNum) {
	    if (pageNum < 1 || pageNum > this.getTotalPages()) return;

	    this.tableCtrl.currentPage = pageNum - 1;

	    this.syncVirtualScroll()
	    this.update();
	    this.sendExternalPageRequest();
	    this.tableCtrl.options.fire('pagination.change', this.getCurrentPage());
    }

    update() {
        if (this.getCurrentPage() > this.getTotalPages()) {
            this.setPage(this.getTotalPages());
        }

        if (this.listeners) this.listeners.forEach(listener=>listener(this.getCurrentPage()));
    }

    registerChangeListener(listener) {
        if (!this.listeners) this.listeners = []
        this.listeners.push(listener);
    }

    syncVirtualScroll() {
        if (this.tableCtrl.options.paginationMode === this.tableCtrl.options.VIRTUAL_SCROLL) {
            this.tableCtrl.virtualScrollIndex = this.tableCtrl.currentPage*this.tableCtrl.options.rowsPerPage;
            this.tableCtrl.syncFakeScroller();
        }
    }

}