/**
 * Created by idannaim on 8/3/15.
 */
export class JfUiSelectElement {
    setSearchText(el, text) {
        el.scope().$select.search = text;
        scope.$digest();
        $timeout.flush();
    }

    _openDropdown(el) {
        let scope = angular.element(el).scope();
        let $select = scope.$select;
        $select.open = true;
        scope.$digest();
    }


    applySelect(text) {
        let input = $('jf-ui-select input[type=text]');

        input.val(text);
        let ngModelController = angular.element(input).controller('ngModel');
        ngModelController.$setViewValue(text);
        this._openDropdown($('jf-ui-select .ui-select-container'));
    }

    getItem(index) {
        return $('.ui-select-choices-row-inner').eq(index);
    }

    getShownItem(index) {
        return this.getItem(index).text().trim();
    }
}