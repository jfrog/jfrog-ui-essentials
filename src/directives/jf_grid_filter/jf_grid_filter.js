/*
 USAGE EXAMPLE:

 <jf-grid-filter
 filter-grid="gridOptions"  //the name of the grid (grid options)
 filter-field="fieldName"        //the name of the field that should be filtered
 filter-on-change>          //optional - don't use a button for filtering, filter on every change
 </jf-grid-filter>

 */


class jfGridFilterController {
	/* @ngInject */
    constructor($scope,$timeout) {

        this.$timeout = $timeout;
        this.gridFilter = '';

        this.grid.enableFiltering = true;

        this.grid.setFilter = (filterString) => {
            this.gridFilter = filterString;
            this.doFilter();
        };

        if (this.filterField.indexOf('.') !== -1) {
            let splitted = this.filterField.split('.');
            this.filterField = splitted[0];
            this.filterSubField = splitted[1];
        }
        if (this.filterField2.indexOf('.') !== -1) {
            let splitted = this.filterField2.split('.');
            this.filterField2 = splitted[0];
            this.filterSubField2 = splitted[1];
        }

        this.attachColumns();

        $scope.$on('$destroy', () => this.onDestroy());
    }

    attachColumns() {
        this.cols = this.grid.columnDefs;
        this.column = _.find(this.cols, _.matchesProperty('field', this.filterField)) || this.cols[0];
        if (this.filterField2) this.column2 = _.find(this.cols, _.matchesProperty('field', this.filterField2));
    }

    shouldFilterOnChange() {
        return this.filterOnChange !== 'false';
    }

    doFilter() {
        if (this.cols !== this.grid.columnDefs) this.attachColumns();

        if (!this.column) return;
        if (!this.column2) {
//            this.column.filter = {term: '*' + this.gridFilter + '*'};
            this.column.filter = {
                term: '*' + this.gridFilter + '*',
                condition: (searchTerm, cellValue, row, column)=> {
                    cellValue = cellValue !== undefined ? cellValue : '';
                    let regex = new RegExp('.*' + searchTerm.split('\\*').join('.*') + '.*', "i");
                    let subsVisible = this._isSubVisible(cellValue,column,regex);
                    if (cellValue && cellValue.$value) cellValue = cellValue.$value;
                    return regex.test(this.filterSubField ? cellValue[this.filterSubField] : cellValue) || row.entity._emptyRow || row.entity._specialRow || subsVisible;
                }
            };
        }
        else {
            this.column.filter = {
                term: '*' + this.gridFilter + '*',
                condition: (searchTerm, cellValue, row, column)=> {
                    cellValue = cellValue !== undefined ? cellValue : '';
                    let regex = new RegExp('.*' + searchTerm.split('\\*').join('.*') + '.*', "i");
                    let cell2Value = row.entity[this.column2.field];
                    cell2Value = cell2Value !== undefined ? cell2Value : '';
                    let subsVisible = this._isSubVisible(cellValue,column,regex) || this._isSubVisible(cell2Value,this.column2,regex);
                    if (cellValue && cellValue.$value) cellValue = cellValue.$value;
                    if (cell2Value && cell2Value.$value) cell2Value = cell2Value.$value;
                    return regex.test(this.filterSubField ? cellValue[this.filterSubField] : cellValue) || regex.test(this.filterSubField2 ? cell2Value[this.filterSubField2] : cell2Value)  || row.entity._emptyRow || row.entity._specialRow || subsVisible;
                }
            };
        }
        this.grid.refreshGridAfterFiltering(this);
    }

    _isSubVisible(cellValue,column,regex) {
        let subsVisible = false;
        if (cellValue && cellValue.$row && cellValue.$row.$expandable) {
            for (let i = 0; i < cellValue.$row.$subRows.length; i++) {
                if (regex.test(cellValue.$row.$subRows[i][column.field].$value)) {
                    subsVisible = true;
                    break;
                }
            }
        }
        return subsVisible;
    }

    onChange() {
        if (this.shouldFilterOnChange()) this.doFilter();
    }

    onDestroy() {
        this.gridFilter = '';
        this.doFilter();
    }

    getPlaceHolder() {
        if (this.column2) {
            return 'Filter by ' + (this.column.displayName || this.column.name) + ' or ' + (this.column2.displayName || this.column2.name);
        }
        else if (this.column) {
            return 'Filter by ' + (this.column.displayName || this.column.name);
        }
        else {
            return 'FILTER UNAVAILABLE'
        }
    }
}

export function jfGridFilter() {

    return {
        restrict: 'E',
        scope: {
            disableButton: '=',
            filterField: '@',
            filterField2: '@',
            grid: '=filterGrid',
            filterOnChange: '@',
            autoFocus: '@'
        },
        controller: jfGridFilterController,
        controllerAs: 'jfGridFilter',
        templateUrl: 'directives/jf_grid_filter/jf_grid_filter.html',
        bindToController: true
    };
}
