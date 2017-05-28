class jfUiSelectController {
	/* @ngInject */
    constructor($element, $timeout) {
        // 3 methods are allowed for passing the options:
        // Passing an array of objects, and the attribute to display
        // Passing an array (of anything), and a function that returns the label to display
        // Passing an array of strings (and then the string is displayed)
        this.displayLabel = (item) => {
            if (item === null || item === undefined) return null;
            if (this.isMorePlaceholder(item)) return this.jfSelectLoadMoreLabel || 'More Options...';
            if (item[this.jfSelectDisabled]) return null;
            if (this.jfSelectDisplayAttr) {
                return item[this.jfSelectDisplayAttr];
            } else if (this.jfSelectDisplayFunc) {
                return this.jfSelectDisplayFunc({$item: item});
            } else {
                return item;
            }
        };

        if (this.jfSelectLoadChunks === undefined) {
            //NO CHUNKS!
        }
        else if (this.jfSelectLoadChunks === '') {
            this.chunkSize = 10;
            this.jfSelectOptionsView = [];
        }
        else {
            this.chunkSize = parseInt(this.jfSelectLoadChunks) < 4 ? 4 : parseInt(this.jfSelectLoadChunks);
            this.jfSelectOptionsView = [];
        }


    }

    onSelect($item,$model) {
        if (this.jfSelectChange) this.jfSelectChange();
        if (this.jfSelectOptionsView) this.jfSelectOptionsView = [];
    }

    onClick(item, $event) {
        if (this.jfSelectOptionsView && this.isMorePlaceholder(item)) {
            let newLoads = this[this.filtered ? 'filtered' : 'jfSelectOptions'].slice(this.loaded, this.loaded + this.chunkSize);
            this.jfSelectOptionsView = this.jfSelectOptionsView.slice(0, this.loaded).concat(newLoads);
            if (this[this.filtered ? 'filtered' : 'jfSelectOptions'].length > this.jfSelectOptionsView.length) {
                this.jfSelectOptionsView.push(this.createMorePlaceholder());
            }
            this.loaded += this.chunkSize;
            $event.preventDefault();
            $event.stopPropagation();
        }
    }

    onOpenList() {
        if (this.jfSelectOptionsView) {
            this.filter = '';
            this.filtered = null;
            this.loaded = this.chunkSize;
            this.jfSelectOptionsView = this.jfSelectOptions.slice(0,this.loaded);
            if (this.jfSelectOptions.length > this.jfSelectOptionsView.length) {
                this.jfSelectOptionsView.push(this.createMorePlaceholder());
            }
        }
    }

    refresh(search) {
        if (!this.jfSelectOptionsView) return;

        if (!search.trim()) {
            this.onOpenList();
            return;
        }

        this.filter = search;

        this.filtered = _.filter(this.jfSelectOptions,(option)=>{
            if (!this.jfSelectFilterAttr) {
                return this.displayLabel(option).toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }
            else {
                return option[this.jfSelectFilterAttr].toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }
        })

        this.loaded = this.chunkSize;
        this.jfSelectOptionsView = this.filtered.slice(0,this.loaded);
        if (this.filtered.length > this.jfSelectOptionsView.length) {
            this.jfSelectOptionsView.push(this.createMorePlaceholder());
        }
    }

    createMorePlaceholder() {
        let ph = {
            $$specialItem: 'more',
            toString: (s)=>this.filter
        };
        if (this.jfSelectFilterAttr) ph[this.jfSelectFilterAttr] = this.filter;
        return ph;
    }

    isMorePlaceholder(item) {
        return _.isObject(item) && item.$$specialItem === 'more';
    }
}

export function jfUiSelect() {
    return {
        controller: jfUiSelectController,
        controllerAs: 'jfUiSelect',
        bindToController: true,
        scope: {
            jfSelectModel: '=',
            jfSelectOptions: '=',
            jfSelectDisabled: '=',
            jfSelectChange: '&?',
            jfSelectDisplayAttr: '@',
            jfSelectDisplayFunc: '&?',
            jfSelectFilterAttr: '@',
            jfSelectPlaceholder: '@',
            jfSelectLoadChunks: '@?',
            jfSelectLoadMoreLabel: '@?',
            jfSelectHelpTooltips: '&?'
        },
        templateUrl: 'directives/jf_ui_select/jf_ui_select.html'
    }
}