/**
 * Created by idannaim on 8/12/15.
 */
'use strict';
import {JfSwitchElement} from './jf_switch_element.browserify'
let scope;
describe('unit test:jf_switch directive', function () {

    let jfSwitchElement = new JfSwitchElement();
    beforeEach(angular.mock.module('jfrog.ui.essentials'));

    describe('with objects options', () => {
        beforeEach(() => {
            var switchedOptions = [{text: 'One', value: 1}, {text: 'Two', value: 2}, {text: 'Three', value: 3}];

            scope = compileHtml('<jf-switch options="switchedOptions" ng-model="selectedSwitch"></jf-switch>',
                    {switchedOptions: switchedOptions, selectedSwitch: 1});
        });

        it('should create the options', () => {
            expect(jfSwitchElement.getItem(0).text()).toEqual('One');
            expect(jfSwitchElement.isActive(0)).toBe(true);
        });

        it('should select an item after changing the model', ()=> {
            scope.selectedSwitch = 2;
            scope.$digest();
            expect(jfSwitchElement.isActive(1)).toBe(true);
        });
    });

    describe('with strings options', ()=> {
        beforeEach(() => {

            let switchedOptions = ['stringOne', 'stringTwo', 'stringThree'];
            scope = compileHtml('<jf-switch options="switchedOptions" ng-model="selectedSwitch"></jf-switch>',
                    {switchedOptions: switchedOptions, selectedSwitch: 'stringOne'});
        });

        it('should create the options', ()=> {
            expect(jfSwitchElement.getItem(0).text()).toEqual('stringOne');
            expect(jfSwitchElement.isActive(0)).toBe(true);
        });

        it('should select an item after changing the model', ()=> {
            scope.selectedSwitch = 'stringTwo';
            scope.$digest();
            expect(jfSwitchElement.isActive(1)).toBe(true);
        });
    });
});