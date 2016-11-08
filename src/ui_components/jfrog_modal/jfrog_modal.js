
//import EVENTS     from '../../constants/artifacts_events.constants';

/**
 * @desc wrapper around the $modal service
 * @url http://angular-ui.github.io/bootstrap/#/modal
 */
export class JFrogModal {

    constructor($modal, $rootScope, $injector, $q, $sce, $timeout, JFrogEventBus, JFrogUILibConfig, JFrogUIUtils) {
        this.modal = $modal;
        this.$rootScope = $rootScope;
        this.$q = $q;
        this.$timeout = $timeout;
        this.$sce = $sce;
        this.templatesBaseUrl = 'ui_components/jfrog_modal/templates/';
        this.JFrogUILibConfig = JFrogUILibConfig;
        this.JFrogEventBus = JFrogEventBus;
        this.JFrogUIUtils = JFrogUIUtils;
        this.$injector = $injector;
        this.EVENTS = JFrogEventBus.getEventsDefinition();

    }

    /**
     * build the path to the template location
     * and delegate to the $modal service
     * return the modal instance
     *
     * @param template
     * @param scope
     * @returns {{Modal instance}}
     */
    launchModal(template, scope, size, cancelable = true) {
        if (!size) size = 'lg';

        let customTemplate = true;
        if (template.startsWith('@')) {
            customTemplate = false;
            template = template.substr(1);
        }

        let customTemplatesBaseUrl = this.JFrogUILibConfig.getConfig().customModalTemplatesPath;
        if (customTemplatesBaseUrl && !customTemplatesBaseUrl.endsWith('/')) customTemplatesBaseUrl += '/';

        let templateUrl = (customTemplate ? customTemplatesBaseUrl : this.templatesBaseUrl) + template + '.html';

        let modalObj = {
            templateUrl: templateUrl,
            scope: scope,
            size: size
        };
        if (!cancelable) {
            modalObj.backdrop = 'static';
            modalObj.keyboard = false;
        }
        let modalInstance =  this.modal.open(modalObj);
        this.JFrogEventBus.registerOnScope(this.$rootScope, this.EVENTS.CLOSE_MODAL, () => {
            modalInstance.dismiss();
        });

        if (typeof size == 'number') {
            this.$timeout(() => {
                $('.modal-dialog').css('max-width', size)
            });
        }
        this.$timeout(() => {
            let windowOffset = window.innerHeight - 70;
            let maxHeight = windowOffset - 134 - 80;
            $('.modal-body').css('max-height', maxHeight);
        }, 100);
        return modalInstance;
    }

    /**
     * launch a modal that shows content in a codemirror container
     *
     * @param title - title of the modal
     * @param content - content for the code mirror container
     * @param mode - mode for code mirror editor options (usually {name: <mimetype>}
     * @param beforeMessage - message to insert before the codemirror element
     * @returns {{Modal instance}}
     */
    launchCodeModal(title, content, mode, beforeMessage = undefined,objectName = undefined) {

        let modalInstance;
        let modalScope = this.$rootScope.$new();
        modalScope.closeModal = () => modalInstance.close();
        modalScope.content = content;
        modalScope.mode = mode;
        modalScope.title = title;//this.$sce.trustAsHtml(title);
        modalScope.beforeMessage = beforeMessage;
        modalScope.objectName = objectName;
        return modalInstance = this.launchModal('@code_modal', modalScope);
    }


    /**
     * launch a modal that shows a confirmation box, and returns a promise
     *
     * @param title - title of the confirmation box
     * @param content - HTML content of the confirmation box
     * @param buttons - button text (Object(confirm: String, cancel: String))
     * @returns promise - resolved if the user confirmed, rejected otherwise
     */
    confirm(content, title, buttons, checkboxLabel, checkBoxChangeListener) {

        buttons = buttons || {};
        buttons.confirm = buttons.confirm || 'Confirm';
        buttons.cancel = buttons.cancel || 'Cancel';
        title = title || 'Are you sure?';

        let modalInstance;
        let modalScope = this.$rootScope.$new();

        modalScope.buttons = buttons;
        modalScope.content = content;//this.$sce.trustAsHtml(content);
        modalScope.title = title;//this.$sce.trustAsHtml(title);
        modalScope.checkboxLabel = checkboxLabel;
        modalScope.checkbox = {checked: false};
        modalScope.onCheckboxStateChange = (state) => {
            if (checkBoxChangeListener) checkBoxChangeListener(state,modalScope);
        };

        return this.launchModal('@confirm_modal', modalScope, 'sm').result;
    }


    launchWizard(wizardDefinitionObject) {

        let wizardModalScope = this.$rootScope.$new();

        wizardModalScope.$wizardDef = wizardDefinitionObject;
        wizardModalScope.$wizardCtrl = new WizardController(wizardDefinitionObject);

        wizardDefinitionObject.controller.prototype.$wizardCtrl = wizardModalScope.$wizardCtrl;

        let controllerInstance = this.$injector.instantiate(wizardDefinitionObject.controller);

        let controllerObject = {};
        controllerObject[wizardDefinitionObject.controllerAs || 'ctrl'] = controllerInstance;

        _.extend(wizardModalScope,controllerObject);

        wizardModalScope.$wizardCtrl.$userCtrl = controllerInstance;

        let modalInstance = this.launchModal('@wizard_modal', wizardModalScope, 'lg', wizardDefinitionObject.cancelable);

        wizardModalScope.$wizardCtrl.$modalInstance = modalInstance;

        modalInstance.result.catch((reason) => {
            if (reason) wizardModalScope.$wizardCtrl.cancel();
        })

        return modalInstance.result;
    }

}

class WizardController {
    constructor(wizardDefinitionObject, modalInstance) {
        this.currentStep = 1;
        this.wizardDefinitionObject = wizardDefinitionObject;
        this.totalSteps = wizardDefinitionObject.steps.length;
    }

    cancel() {
        if (this.$userCtrl.onCancel) this.$userCtrl.onCancel();
        this.$modalInstance.dismiss();
    }

    nextStep(skip) {
        if (this.$userCtrl.onStepChange) {
            let response = this.$userCtrl.onStepChange(this.wizardDefinitionObject.steps[this.currentStep], this.wizardDefinitionObject.steps[this.currentStep-1], skip ? 'skip' : 'next');
            if (response && response.then) {
                this.pending = true;
                response.then((pRes)=>{
                    if (pRes !== false) this.currentStep++
                    this.pending = false;
                })
                    .catch(()=>{
                        this.pending = false;
                    });

            }
            else if (response !== false) this.currentStep++;
        }
        else {
            this.currentStep++;
        }
    }

    prevStep() {
        if (this.$userCtrl.onStepChange) {
            let response = this.$userCtrl.onStepChange(this.wizardDefinitionObject.steps[this.currentStep-2], this.wizardDefinitionObject.steps[this.currentStep-1],'prev');
            if (response && response.then) {
                this.pending = true;
                response.then((pRes)=>{
                    if (pRes !== false) this.currentStep--;
                    this.pending = false;
                })
                    .catch(()=>{
                        this.pending = false;
                    });
            }
            else if (response !== false) this.currentStep--;
        }
        else {
            this.currentStep--;
        }
    }

    finish() {
        if (this.$userCtrl.onComplete) this.$userCtrl.onComplete();
        this.$modalInstance.close();
    }
}