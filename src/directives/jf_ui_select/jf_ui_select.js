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

    onOpenClose(isOpen) {
        if (isOpen) this.onOpenList();
        else {
            if (this.jfSelectAsyncOptions) {
                this.jfSelectOptions = [];
                this.jfSelectOptionsView = [];
            }
        }
    }

    onOpenList() {
        if (this.jfSelectAsyncOptions) {
            this.jfSelectAsyncOptions({$options: {}}).then(data => {
                this.jfSelectOptions = data;
                this.loadInitialChunk();
            })
        }
        else {
            this.loadInitialChunk();
        }
    }

    loadInitialChunk() {
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

        if (this.jfSelectAsyncOptions) {
            let options = {}
            if (search.trim()) options.filter = search;
            this.jfSelectAsyncOptions({$options: options}).then(data => {
                this.jfSelectOptions = data;
                this.updateChunkBySearchTerm(search);
            })
        }
        else {
            this.updateChunkBySearchTerm(search);
        }
    }

    updateChunkBySearchTerm(search) {
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
            jfSelectOptions: '=?',
            jfSelectAsyncOptions: '&?',
            jfSelectDisabled: '=',
            jfSelectMultiple: '@?',
            jfSelectChange: '&?',
            jfSelectDisplayAttr: '@',
            jfSelectDisplayFunc: '&?',
            jfSelectFilterAttr: '@',
            jfSelectPlaceholder: '@',
            jfSelectLoadChunks: '@?',
            jfSelectLoadMoreLabel: '@?',
            jfSelectHelpTooltips: '&?'
        },
        compile: function compile(tElement, tAttrs, transclude) {
            if (_.has(tAttrs,'jfSelectMultiple')) {
                $(tElement).find('ui-select').attr('multiple','');
            }
        },
        templateUrl: 'directives/jf_ui_select/jf_ui_select.html'
    }
}