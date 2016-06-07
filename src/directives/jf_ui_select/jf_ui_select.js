class jfUiSelectController {
    constructor() {
        // 3 methods are allowed for passing the options:
        // Passing an array of objects, and the attribute to display
        // Passing an array (of anything), and a function that returns the label to display
        // Passing an array of strings (and then the string is displayed)
        this.displayLabel = (item) => {
            if (item === null || item === undefined) return null;
            if (item[this.jfSelectDisabled]) return null;
            if (this.jfSelectDisplayAttr) {
                return item[this.jfSelectDisplayAttr];
            } else if (this.jfSelectDisplayFunc) {
                return this.jfSelectDisplayFunc({$item: item});
            } else {
                return item;
            }
        };
    }

    onSelect($item,$model) {
        if (this.jfSelectChange) this.jfSelectChange();
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
            jfSelectPlaceholder: '@'
        },
        templateUrl: 'directives/jf_ui_select/jf_ui_select.html'
    }
}