
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
    launchModal(template, scope, size, cancelable = true, options) {
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
        if (options && _.isObject(options)) _.extend(modalObj,options);

        let modalInstance =  this.modal.open(modalObj);
        this.JFrogEventBus.registerOnScope(this.$rootScope, this.EVENTS.CLOSE_MODAL, () => {
            modalInstance.dismiss();
        });

        if (typeof size == 'number') {
            this.$timeout(() => {
                $('.modal-dialog').css('max-width', size)
            });
        }

        this._calculateMaxHeight();

        if (modalInstance.result) {
            modalInstance.result.finally(()=>{
                $(window).off('resize', this._calculateMaxHeight());
            });
        }

        $(window).resize(() => {
            this._calculateMaxHeight();
        });

        return modalInstance;
    }



    _calculateMaxHeight() {
        this.$timeout(() => {

            if ($('.wizard-modal').length > 0) {

                // modal height - header - footer
            let MH = $('.wizard-modal').height(),               // Modal height
                HH  = $('.modal-header').outerHeight() || 0,         // Header height
                FH  = $('.modal-footer').outerHeight() || 0;    // Footer height

                let maxHeight = MH - HH - FH;
                $('.modal-body').css('max-height', maxHeight);
                return;
            }


            let VPH = window.innerHeight,                       // View port height
                MOT = 110,                                      //Modal offset top
                HH  = $('.modal-header').outerHeight() || 0,         // Header height
                FH  = $('.modal-footer').outerHeight() || 0;    // Footer height

            // Calculate: MPH - (MOT*2) - HH - FH = maxHeight
            let maxHeight = VPH - (MOT * 2) - HH - FH;

            $('.modal-body').css('max-height', maxHeight);
        }, 100)
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
        WizardController.prototype.JFrogModal = this;
        wizardModalScope.$wizardCtrl = new WizardController(wizardDefinitionObject);

        wizardDefinitionObject.controller.prototype.$wizardCtrl = wizardModalScope.$wizardCtrl;

        let controllerInstance = this.$injector.instantiate(wizardDefinitionObject.controller);

        let controllerObject = {};
        controllerObject[wizardDefinitionObject.controllerAs || 'ctrl'] = controllerInstance;

        _.extend(wizardModalScope,controllerObject);

        wizardModalScope.$wizardCtrl.$userCtrl = controllerInstance;

        let modalInstance = this.launchModal('@wizard_modal', wizardModalScope, 'lg', wizardDefinitionObject.cancelable && wizardDefinitionObject.backdropCancelable, wizardDefinitionObject.modalOptions);


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
        if (this.wizardDefinitionObject.initialStep) {
            let index = _.findIndex(wizardDefinitionObject.steps,{id: this.wizardDefinitionObject.initialStep});
            this.currentStep = index + 1;
        }
    }

    cancel() {
        if (this.$userCtrl.onCancel) this.$userCtrl.onCancel();
        this.$modalInstance.dismiss();
    }

    titleInit() {
        if (this.$userCtrl.onWizardShow) this.$userCtrl.onWizardShow(this.wizardDefinitionObject.steps[this.currentStep-1]);
    }

    nextStep(skip) {
        if (this.$userCtrl.onStepChange) {
            let response = this.$userCtrl.onStepChange(this.wizardDefinitionObject.steps[this.currentStep], this.wizardDefinitionObject.steps[this.currentStep-1], skip ? 'skip' : 'next');
            if (response && response.then) {
                this.pending = true;
                response.then((pRes)=>{
                    if (pRes !== false) this.currentStep++
                    if (this.$userCtrl.afterStepChange) this.$userCtrl.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep-1], this.wizardDefinitionObject.steps[this.currentStep-2], skip ? 'skip' : 'next');
                    this.pending = false;
                })
                    .catch(()=>{
                        this.pending = false;
                    });

            }
            else if (response !== false) {
                this.currentStep++;
                if (this.$userCtrl.afterStepChange) this.$userCtrl.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep-1], this.wizardDefinitionObject.steps[this.currentStep-2], skip ? 'skip' : 'next');
            }
        }
        else {
            this.currentStep++;
        }
        this.JFrogModal._calculateMaxHeight();
    }

    prevStep() {
        if (this.$userCtrl.onStepChange) {
            let response = this.$userCtrl.onStepChange(this.wizardDefinitionObject.steps[this.currentStep-1], this.wizardDefinitionObject.steps[this.currentStep-1],'prev');
            if (response && response.then) {
                this.pending = true;
                response.then((pRes)=>{
                    if (pRes !== false) this.currentStep--;
                    if (this.$userCtrl.afterStepChange) this.$userCtrl.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep-1], this.wizardDefinitionObject.steps[this.currentStep],  'prev');
                    this.pending = false;
                })
                    .catch(()=>{
                        this.pending = false;
                    });
            }
            else if (response !== false) {
                this.currentStep--;
                if (this.$userCtrl.afterStepChange) this.$userCtrl.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep-1], this.wizardDefinitionObject.steps[this.currentStep], 'prev');
            }
        }
        else {
            this.currentStep--;
        }
        this.JFrogModal._calculateMaxHeight();
    }

    finish() {
        if (this.$userCtrl.onComplete) this.$userCtrl.onComplete();
        this.$modalInstance.close();
    }

    isFunction(val) {
        return _.isFunction(val);
    }
}