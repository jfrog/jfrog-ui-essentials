/**
 * Created by idannaim on 8/3/15.
 */
import {JfUiSelectElement} from './jf_ui_select_element.browserify';
let scope, jfUiSelectElement, $timeout;

describe('unit test: jfUiSelect', ()=> {
    function setup(_$timeout_) {
        $timeout = _$timeout_;
    }

    let jfUiSelectElement = new JfUiSelectElement();

    beforeEach(module('jfrog.ui.essentials'));
    beforeEach(inject(setup));

    it('should filter matching data', ()=> {
        let dataList = ['admin', 'user'];
        scope = compileHtml('<jf-ui-select jf-select-model="selected" jf-select-options="dataList"  autofocus  ></jf-ui-select>',
                {dataList: dataList});
        jfUiSelectElement.applySelect('ad');
        $timeout.flush();
        expect(jfUiSelectElement.getShownItem(0)).toBe('admin');
    });


    it('should filter matching data with display attr', ()=> {
        let dataList = [{name: 'admin', role: 'admin'}, {name: 'user', role: 'anonymous'}];
        scope = compileHtml('<jf-ui-select jf-select-model="selected" jf-select-options="dataList" jf-select-display-attr="name" autofocus  ></jf-ui-select>',
                {dataList: dataList});
        jfUiSelectElement.applySelect('ad');
        $timeout.flush();
        expect(jfUiSelectElement.getShownItem(0)).toBe('admin');
    });

    it('should filter matching data with display func', ()=> {
        let dataList = [{name: 'admin', role: 'admin'}, {name: 'user', role: 'anonymous'}];

        function myFunc(item) {
            return item.name + ": " + item.role
        }

        scope = compileHtml('<jf-ui-select jf-select-model="selected" jf-select-options="dataList" jf-select-display-func="myFunc($item)" autofocus></jf-ui-select>',
                {dataList: dataList, myFunc: myFunc});
        jfUiSelectElement.applySelect('ad');
        $timeout.flush();
        expect(jfUiSelectElement.getShownItem(0)).toBe('admin: admin');
    });
});