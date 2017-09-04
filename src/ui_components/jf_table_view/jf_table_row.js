class jfTableRowController {
	/* @ngInject */
    constructor($scope, $element, $timeout, JFrogEventBus) {
        this.$element = $element;
        this.$timeout = $timeout;
        this.JFrogEventBus = JFrogEventBus;
        this.EVENTS = JFrogEventBus.getEventsDefinition()
        this.templatesCount = _.filter(this.tableView.options.columns,col=>!!col.cellTemplate).length;

        JFrogEventBus.registerOnScope($scope, this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, (tableView) => {
	        if (tableView === this.tableView) this.actionsDropdownOpen = false
        });
    }
    getField(field) {
        return _.get(this.data,field);
    }
    kebab(str) {
        return _.kebabCase(str);
    }
    toggleSelection(all) {
        if (this.tableView.options.isRowSelectable && !this.tableView.options.isRowSelectable({entity: this.data})) return;

        if (!all) {
            if (this.tableView.options.selectionMode === this.tableView.options.MULTI_SELECTION) {
                this.data.$selected = !this.data.$selected;
                if (!this.data.$selected) {
                    this.tableView.allSelected = false;
                    if (this.tableView.options.groupedBy) {
                        let groupHeader = _.find(this.tableView.options.getPrePagedData(),{$groupHeader:{value: _.get(this.data,this.tableView.options.groupedBy)}})
                        if (groupHeader) groupHeader.$selected = false;
                    }
                }
                if (this.data.$groupHeader) this.tableView.groupSelection(this.data);
            }
            else if (this.tableView.options.selectionMode === this.tableView.options.SINGLE_SELECTION) {
                this.tableView.clearSelection();
                this.data.$selected = true;
            }
        }
        else {
            this.tableView.toggleSelectAll();
        }
	    this.tableView.options.fire('selection.change', this.tableView.options.getSelectedRows());

    }

    toggleGroupExpansion() {
        this.data.$groupHeader.$expanded = !this.data.$groupHeader.$expanded;
        this.tableView.options.updateGroupExpansionState(this.data);
    }

    fireAction(action) {
        action.callback(this.data);
        this.tableView.onUpdateFilter()
    }

    onMouseMove(e) {
        if (!this.resizingColumns) {
            let container = this._getTableContainer();
            if (this.hoveringResize && this.hoveringResize.left) delete this.hoveringResize.left.$dragRightBorder;
            if (this.hoveringResize && this.hoveringResize.right) delete this.hoveringResize.right.$dragLeftBorder;
            this.hoveringResize = this._getHoveringResizePoint(e);
            container.css('cursor',this.hoveringResize ? 'col-resize' : 'default');
        }
        else {
            this.dragColumnResize(e);
        }
    }

    dragColumnResize(e) {
        let MIN_WIDTH = 5; //percent
        let container = this._getTableContainer();
        let containerWidth = container.innerWidth();
        let mouseX = e.pageX - container.offset().left;
        let mouseXPerc = Math.round((mouseX / containerWidth) * 100);
        let offset = mouseXPerc - this.resizeDragStart;

        let newLeftWidth,newRightWidth;
        if (this.hoveringResize.origLeftWidth.endsWith('%')) {
            newLeftWidth = (parseFloat(this.hoveringResize.origLeftWidth) + offset) + '%';
        }
        else if (this.hoveringResize.origLeftWidth.endsWith('px')) {
            let perc = (parseFloat(this.hoveringResize.origLeftWidth)/containerWidth)*100;
            newLeftWidth = (perc + offset) + '%';
        }
        if (this.hoveringResize.right) {
            if (this.hoveringResize.origRightWidth.endsWith('%')) {
                newRightWidth = (parseFloat(this.hoveringResize.origRightWidth) - offset) + '%';
            }
            else if (this.hoveringResize.origRightWidth.endsWith('px')) {
                let perc = (parseFloat(this.hoveringResize.origRightWidth)/containerWidth)*100;
                newRightWidth = (perc - offset) + '%';
            }
        }

        if (parseFloat(newLeftWidth) > MIN_WIDTH && (!newRightWidth || parseFloat(newRightWidth) > MIN_WIDTH)) {
            this.hoveringResize.left.width = this.hoveringResize.left.origWidth = newLeftWidth;
            if (this.hoveringResize.right) this.hoveringResize.right.width = this.hoveringResize.right.origWidth = newRightWidth;
        }
    }

    onMouseDown(e) {
        if (this.hoveringResize) {
            let container = this._getTableContainer();
            let containerWidth = container.innerWidth();
            let mouseX = e.pageX - container.offset().left;
            let mouseXPerc = Math.round((mouseX / containerWidth) * 100);

            this.resizingColumns = true;
            this.resizeDragStart = mouseXPerc;

            this.hoveringResize.left.$dragRightBorder = true;
            if (this.hoveringResize.right) this.hoveringResize.right.$dragLeftBorder = true;
        }
    }
    onMouseUp(e) {
        if (this.hoveringResize && this.hoveringResize.left) delete this.hoveringResize.left.$dragRightBorder;
        if (this.hoveringResize && this.hoveringResize.right) delete this.hoveringResize.right.$dragLeftBorder;
        this.resizingColumns = false;
        delete this.resizeDragStart;
    }

    _getHoveringResizePoint(e) {
        let columns = this.tableView.options.columns;

        let container = this._getTableContainer();
        let containerWidth = container.innerWidth();
        let mouseX = e.pageX - container.offset().left;
        let mouseXPerc = Math.round((mouseX / containerWidth) * 100);

        let percCount = this.tableView.options.hasSelection() ? (this.tableView.options.selectionColumnWidth/containerWidth)*100 : 0;

        let hovering = false;

        for (let colI = 0; colI < columns.length; colI++) {
            let col = columns[colI];
            if (col.width.endsWith('%')) {
                percCount += parseFloat(col.width);
            }
            else if (col.width.endsWith('px')) {
                let perc = (parseFloat(col.width)/containerWidth)*100;
                percCount += perc;
            }
            if (Math.abs(percCount - mouseXPerc) <= .5) {
                hovering = {
                    left: col,
                    right: columns[colI+1],
                    origLeftWidth: col.width,
                    origRightWidth: columns[colI+1] ? columns[colI+1].width : undefined
                };
                break;
            }
        }

        return hovering;
    }

    _getTableContainer() {
        return $(this.tableView.$element).find('.jf-table-view-container');
    }

    onClickCell(col, event) {
//        event.stopPropagation();
        if (this.rowId === 'headers' && col.header && this.tableView.options.sortable && !this.hoveringResize) {
            this.tableView.options.sortBy(col.field);
        }
    }

    onRowClick() {
	    if (this.data.$groupHeader) {
	        jfTableRow.toggleGroupExpansion()
	    }
	    else {
		    this.tableView.options.fire('row.clicked', {entity: this.data})
        }
    }

    toggleExpansion() {
        this.tableView.options.toggleExpansion(this.data);
    }

	toggleActionsDropdown() {
        let origState = this.actionsDropdownOpen;
        this.JFrogEventBus.dispatch(this.EVENTS.TABLEVIEW_HIDE_ACTIONS_DROPDOWN, this.tableView);
	    this.actionsDropdownOpen = !origState;
    }
}

export function jfTableRow() {
    return {
        controller: jfTableRowController,
        controllerAs: 'jfTableRow',
        bindToController: true,
        replace: true,
        scope: {
            data: '=',
            rowId: '=',
            tableView: '='
        },
        templateUrl: 'ui_components/jf_table_view/jf_table_row.html'
    }
}