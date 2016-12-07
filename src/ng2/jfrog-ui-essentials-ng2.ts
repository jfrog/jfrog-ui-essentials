//import "./bower.imports";
import {NgModule, Component} from "@angular/core";
import {UpgradeAdapter} from "@angular/upgrade";
import {TestComponent} from "./components/test-component/test.component";

const NG1_MODULE = 'ng1module'
let angular = (window as any).angular;
let _ = (window as any)._;
let $ = (window as any).$;

export class JFrogUIEssentials {
    private upgradeAdapter:UpgradeAdapter;
    private wrappers = [];

    public constructor(_upgradeAdapter:any) {
        this.upgradeAdapter = _upgradeAdapter;

        angular.module(NG1_MODULE,['jfrog.ui.essentials']);
    }

    public downgradeRootComponent(rootComponent:Component, selector?:string) {
        angular.module(NG1_MODULE).directive(selector,this.upgradeAdapter.downgradeNg2Component(rootComponent as any));
    }

    public getJFrogUIModule() {  

        this.createWrappers();

        this.createNg1FormWrapper();

        //Upgrade services
        this.upgradeAdapter.upgradeNg1Provider('JFrogUILibConfig');
        this.upgradeAdapter.upgradeNg1Provider('JFrogGridFactory');
        this.upgradeAdapter.upgradeNg1Provider('JFrogNotifications');
        this.upgradeAdapter.upgradeNg1Provider('JFrogEventBus');
        this.upgradeAdapter.upgradeNg1Provider('JFrogModal');
        this.upgradeAdapter.upgradeNg1Provider('JFrogUIUtils');
        this.upgradeAdapter.upgradeNg1Provider('JFrogDownload');
        this.upgradeAdapter.upgradeNg1Provider('JFrogIFrameDownload');

        let wrappers = this.wrappers;

        let components = [
            TestComponent,
//            this.upgradeAdapter.upgradeNg1Component('jfCheckbox')
        ];
        @NgModule({
            declarations: wrappers.concat(components),
            exports: wrappers.concat(components)
        })
        class JFrogUIModule {
        }

        return JFrogUIModule
    }

    public bootstrap() {
        angular.element(document).ready(() => {
            this.upgradeAdapter.bootstrap(document.documentElement, [NG1_MODULE]);
        })
    }

    private createNg1FormWrapper() {

        angular.module(NG1_MODULE).component('jfrogNg1Form',{
            bindings: {
                ng1Template: '@',
                ng2Controller: '='
            },
            template: `<ng-include src="$ctrl.ng1Template"></ng-include>`
        })

        let wrapper = this.upgradeAdapter.upgradeNg1Component('jfrogNg1Form');

        this.wrappers.push(wrapper);

    }

    createWrappers() {
        this.createWrapper('jf-list-maker','jfrog-list-maker',{
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

        this.createWrapper('jf-multi-dropdown','jfrog-multi-dropdown',{
            title: '@',
            filterPlaceholder: '@',
            noItemsMessage: '@',
            items: '=',
            onChange: '&?',
            dropdownOpened: '='
        });

        this.createWrapper('jf-panel','jfrog-panel',{
            jfPanelHeading: '@',
            jfPanelHelpTooltip: '@',
            jfPanelClasses: '@',
        },true);

        this.createWrapper('jf-drag-drop','jfrog-drag-drop', {
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
            ngDisabled: '='
        });

        this.createWrapper('jf-field','jfrog-field',{
            animated: '@',
            validations: '@',
            autofocus: '=',
            invalidateOnSubmit: '@',
            alwaysShowErrors: '@',
            dontValidateDisabled: '@',
            delayedInit: '=',
            dontPushDownErrors: '='
        },true);

        this.createWrapper('jf-checkbox','jfrog-checkbox',{
            text: '@?'
        },true);

        this.createWrapper('jf-help-tooltip','jfrog-help-tooltip',{
            placement: '@?',
            text: '@?',
            html: '=',
            maxWidth: '@'
        });

        this.createWrapper('jf-grid','jfrog-grid',{
            gridOptions: '=',
            filterField: '@?',
            filterField2: '@?',
            filterOnChange: '@?',
            autoFocus: '@',
            objectName: '@'
        });

        this.createWrapper('jf-ui-select','jfrog-ui-select',{
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

        this.createWrapper('jf-tabs','jfrog-tabs',{
            tabs: '=',
            dictionary: '=',
            onTabChange: '&(tab)',
            tabWidth: '@',
            containerMargin: '@'
        },true);

        this.createWrapper('jf-tab','jfrog-tab',{ //does not work good
            name: '@'
        });

        this.createWrapper('jf-clip-copy','jfrog-clip-copy',{
            textToCopy: '=',
            objectName: '@'
        });

        this.createWrapper('jf-actions','jfrog-actions',{
            parentController: '=',
            label: '@',
            initMethod: '@',
            fixedActionsNames: '='
        });

        this.createWrapper('jf-code-mirror','jfrog-code-mirror',{
            mimeType: '@',
            mode: '@',
            model: '=',
            allowEdit: '@',
            height: '@?',
            apiAccess: '=',
            autofocus: '@'
        });

        this.createWrapper('jf-sidebar','jfrog-sidebar', {
            driver: '=',
            footerTemplate: '@',
            openAdminSize: '@?',
            noSearchBox: '@?',
            externalGotoRoute: '&?($event)'
        })

        this.createWrapper('jf-marquee','jfrog-marquee', {
        },true)

        this.createWrapper('toaster-container','jfrog-toaster-container',{
        });
    }

    private createWrapper(directiveName:string, wrapperName:string, bindings:Object, transclude:boolean = false) {

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
                    if (bindType.startsWith('&') || bindType.startsWith('&?')) {
                        let params = bindType.match(/\((.*)\)/)[0];
                        bindExpr = `$ctrl.${bindKey}${params}`;
                    }
                    else {
                        console.log(`Unhandled bind type for ${directiveName}: ${bindType}`)
                    }
                }
            }

            templateBindings += ` ${_.kebabCase(bindKey)}="${bindExpr}"`
        }

        let transclusion = transclude ? '<ng-transclude></ng-transclude>' : '';
        let template = `<${directiveName}${templateBindings}>${transclusion}</${directiveName}>`

        let controller = function($element) {

            this.$onInit = () => {
                for (let bindKey in bindings) {
                    let bindType = bindings[bindKey];
                    if ((bindType === '=' || bindType === '=?') && typeof this[bindKey] === 'function') {
                        this[bindKey] = this[bindKey]() || undefined;
                    }
                }
            }
        };

        let cleanBindings = (bindings) => {
            let clean = {};
            for (let key in bindings) {
                if (bindings[key].indexOf('(') !== -1) {
                    clean[key] = bindings[key].substr(0,bindings[key].indexOf('('))
                }
                else {
                    clean[key] = bindings[key];
                }
            }
            return clean;
        };

        let componentObject = {
            bindings: cleanBindings(bindings),
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

/*
let CodeMirror = (window as any).CodeMirror;

function aliasMime(newMime, existingMime) {
    CodeMirror.defineMIME(newMime, CodeMirror.mimeModes[existingMime]);
}
function defineCodeMirrorMimes() {
    aliasMime('text/x-java-source', 'text/x-java');
    aliasMime('pom', 'text/xml');
}
defineCodeMirrorMimes(); */
