import {NgModule, Component} from "@angular/core";
import {UpgradeAdapter} from "@angular/upgrade";
import {TestComponent} from "./components/test-component/test.component";

const NG1_MODULE = 'ng1module'
let angular = (window as any).angular;
let _ = (window as any)._;
let $ = (window as any).$;

class JFrogUIEssentials {
    public upgradeAdapter:UpgradeAdapter;
    public wrappers = [];

    public getJFrogUIModule(_upgradeAdapter:any, mainDisplayComponent:Component, mainDisplaySelector:string) {

        this.upgradeAdapter = _upgradeAdapter;

        angular.module(NG1_MODULE,['jfrog.ui.essentials']);
        angular.module(NG1_MODULE).directive(mainDisplaySelector,this.upgradeAdapter.downgradeNg2Component(mainDisplayComponent as any));

        this.createWrappers();

        this.createNg1FormWrapper();


        //Upgrade services
        this.upgradeAdapter.upgradeNg1Provider('JFrogGridFactory');
        this.upgradeAdapter.upgradeNg1Provider('JFrogNotifications');
        this.upgradeAdapter.upgradeNg1Provider('JFrogUILibConfig');

        let self = this;// Really ???

        let components = [];
        @NgModule({
            declarations: self.wrappers.concat(components),
            exports: self.wrappers.concat(components)
        })
        class JFrogUIModule {
        }

        return JFrogUIModule
    }

    public bootstrap(upgradeAdapter:any) {
        angular.element(document).ready(function() {
            upgradeAdapter.bootstrap(document.documentElement, [NG1_MODULE]);
        })
    }
    private createNg1FormWrapper() {

        angular.module(NG1_MODULE).component('jfNg1Form',{
            bindings: {
                ng1Template: '@',
                ng2Controller: '=',
            },
            template: `<ng-include src="$ctrl.ng1Template"></ng-include>`
        })

        let wrapper = this.upgradeAdapter.upgradeNg1Component('jfNg1Form');

        this.wrappers.push(wrapper);

    }

    createWrappers() {
        this.createWrapper('jf-list-maker','jf-list-maker',{
            values: '=',
            label: '@',
            helpTooltip: '=',
            objectName: '@',
            ngDisabled: '=',
            noSort: '=?',
            minLength: '@',
            inputType: '@?',
            predefinedValues: '=?',
            placeholder: '@?',
            listId: '@'
        });

        this.createWrapper('jf-multi-dropdown','jf-multi-dropdown',{
            title: '@',
            filterPlaceholder: '@',
            noItemsMessage: '@',
            items: '=',
            onChange: '&?',
            dropdownOpened: '='
        });

        this.createWrapper('jf-panel','jf-panel',{
            jfPanelHeading: '@',
            jfPanelHelpTooltip: '@',
            jfPanelClasses: '@',
        });

        this.createWrapper('jf-drag-drop','jf-drag-drop', {
            includeList: '=',
            excludeList: '=',
            includeDisplayField: '@',
            excludeDisplayField: '@',
            includeListId: '@',
            excludeListId: '@',
            objectsName: '@',
            headers: '=',
            onChange: '&',
            customTemplate: '=?',
            customTemplateScope: '=?',
            usePagination: '=?',
            commObject: '=',
            disabled: '=ngDisabled'
        });

        this.createWrapper('jf-field','jf-field',{
            animated: '@',
            validations: '@',
            autofocus: '=',
            invalidateOnSubmit: '@',
            alwaysShowErrors: '@',
            dontValidateDisabled: '@',
            delayedInit: '=',
            dontPushDownErrors: '='
        });

        this.createWrapper('jf-grid','jf-grid',{
            gridOptions: '=',
            filterField: '@?',
            filterField2: '@?',
            filterOnChange: '@?',
            autoFocus: '@',
            objectName: '@'
        });

        this.createWrapper('jf-ui-select','jf-ui-select',{
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
        });

        this.createWrapper('jf-tabs','jf-tabs',{
            tabs: '=',
            dictionary: '=',
            onTabChange: '&',
            tabWidth: '@',
            containerMargin: '@'
        });
        this.createWrapper('jf-tab','jf-tab',{
            name: '@'
        });

        this.createWrapper('toaster-container','jf-toaster-container',{
        });
    }

    private createWrapper(directiveName:string, wrapperName:string, bindings:Object) {

        let templateBindings = '';

        for (let bindKey in bindings) {
            let bindType = bindings[bindKey];
            let bindExpr;
            switch (bindType) {
                case '=': case '=?': {
                bindExpr = `$ctrl.${bindKey}`;
                break;
            }
                case '@': case '@?': {
                bindExpr = `{{$ctrl.${bindKey}}}`;
                break;
            }
                case '&': case '&?': {
                bindExpr = `$ctrl.${bindKey}()`;
                break;
            }
                default: {
                    console.log(`Unhandled bind type for ${directiveName}: ${bindType}`)
                }
            }
            templateBindings += ` ${_.kebabCase(bindKey)}="${bindExpr}"`
        }

        let template = `<${directiveName}${templateBindings}><ng-transclude></ng-transclude></${directiveName}>`

        let controller = function() {
            this.$onInit = () => {
                for (let bindKey in bindings) {
                    let bindType = bindings[bindKey];
                    if ((bindType === '=' || bindType === '=?') && typeof this[bindKey] === 'function') {
                        this[bindKey] = this[bindKey]() || undefined;
                    }
//        console.log(`${bindKey} = ${this[bindKey]}`)
                }
            }
        };

        let componentObject = {
            bindings,
            template,
            controller,
            transclude: true
        };
        angular.module(NG1_MODULE).component(wrapperName, componentObject);

        let wrapper = this.upgradeAdapter.upgradeNg1Component(wrapperName);

        this.wrappers.push(wrapper);

        return wrapper;
    }
}

export const jfrogUIEssentials = new JFrogUIEssentials();