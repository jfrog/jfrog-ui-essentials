import JFrogConfirmModalComponent from '../components/JfConfirmModalComponent.vue'
import JFrogCodeModalComponent from '../components/JfCodeModalComponent.vue'
import JfFullTextModalComponent from '../components/JfFullTextModalComponent.vue'
import JfDynamicModalComponent from '../components/JfDynamicModalComponent.js'
export class JFrogModal {
    /* @ngInject */
    constructor() {
        this.$inject( '$rootScope', '$injector', '$q', '$sce', '$timeout', 'JFrogEventBus', 'JFrogUILibConfig', 'JFrogUIUtils');
        this.templatesBaseUrl = 'ui_components/jfrog_modal/templates/';
        this.EVENTS = this.JFrogEventBus.getEventsDefinition();
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
        if (!size)
            size = 'lg';

        let modalObj = {
            template: template,
            size: size
        };
        return this._launch(modalObj, scope, size, cancelable, options);
    }
    /**
	 * Use template markup
	 * and delegate to the $modal service
	 * return the modal instance
	 *
	 * @param templateMarkup
	 * @param scope
	 * @returns {{Modal instance}}
	 */
    launchModalWithTemplateMarkup(templateMarkup, scope, size, cancelable = true, options) {
        if (!size)
            size = 'lg';
        let modalObj = {
            template: templateMarkup,
            size: size
        };
        return this._launch(modalObj, scope, size, cancelable, options);
    }
    attachToDOM(ModalComponent, props) {
        $('#jfModal___BV_modal_outer_').parent().remove();//Remove any existing modal divs
        let ComponentClass = Vue.extend(ModalComponent)
        let modalInstance = new ComponentClass({
            propsData: props
        })
        $(modalInstance.$mount().$el).appendTo('#app')
        Vue.nextTick()
        .then(function () {
            modalInstance.$refs.jfModal.show()
        });
        return modalInstance;
    }
    _launch(modalObj, scope, size, cancelable, options) {
        if (!cancelable) {
            modalObj.backdrop = 'static';
            modalObj.keyboard = false;
        }

        if (options && _.isObject(options)) {
            _.extend(modalObj, options);
        }

        let result = new Promise( (resolve, reject) => {
            modalObj.result = {resolve, reject};
        } );

        let focused = $(':focus');
        if (focused.length)
            focused.blur();

        let ModalComponent;
        switch (modalObj.template) {
            case '@confirm_modal':
                ModalComponent = JFrogConfirmModalComponent;
                break
            case '@code_modal':
                ModalComponent = JFrogCodeModalComponent;
                break
            case '@full.text.modal':
                ModalComponent = JfFullTextModalComponent;
                break
            default:
                ModalComponent = new JfDynamicModalComponent();
                let modifiers = this.JFrogUILibConfig.getConfig().customModalTemplates[modalObj.template];
                ModalComponent.template = `<b-modal
                    ref="jfModal"
                    id="jfModal"
                    :no-close-on-backdrop="noCloseOnBackDrop"
                    :no-close-on-esc="noCloseOnEsc"
                    >${modifiers.template}</b-modal>`;
                _.extend(ModalComponent, _.pick(modifiers, ["jf@inject"]));

                if( scope ) {
                    _.extend(modalObj, scope);
                    ModalComponent.props = [
                        ...ModalComponent.props,
                        ...Object.keys(scope),
                    ]
                }

                _.forEach(modifiers.methods, (method,methodName) => {
                    ModalComponent.methods[methodName] = method;
                });
        }

        let modalInstance = this.attachToDOM(ModalComponent, modalObj)

        this.JFrogEventBus.registerOnScope(this.$rootScope, this.EVENTS.CLOSE_MODAL, () => {
            modalInstance.$refs.jfModal.hide()
        });

        if (typeof size == 'number') {
            this.$timeout(() => {
                $('.modal-dialog').css('max-width', size);
            });
        }

        return {
            result: result,
            close: () => modalInstance.$refs.jfModal.hide(),
        }

        /*
        this._calculateMaxHeight();
        let keyDownBinded = this._onKeyDown.bind(this);
        if (modalInstance.result) {
            // Modal close event handler is registered as result.then(errorCallback)
            // In some cases the modal close event is caught by result.finally()
            modalInstance.result.then(() => {
            }, () => {
                this.$set(this, 'modalIsClosing', true);
            }).finally(() => {
                this.$set(this, 'modalIsClosing', true);
                $(window).off('resize', this._calculateMaxHeight());
                $(document).off('keydown', keyDownBinded);
            });
        }
        $(window).resize(() => {
            this._calculateMaxHeight();
        });
        $(document).on('keydown', keyDownBinded);*/
    }
    _onKeyDown(event) {
        let target = $(event.target);
        if (event.keyCode === 13) {
            if (target.attr('jf-enter-press') === undefined) {
                if ($('.wizard-modal').length) {
                    this._clickFirstFoundButton([
                        '.wizard-modal button#wizard-popup-next',
                        '.wizard-modal button#wizard-popup-next-custom',
                        '.wizard-modal button#wizard-popup-finish'
                    ]);
                } else {
                    this._clickFirstFoundButton(['.modal-dialog button.btn-primary:not(.ignore-enter)']);
                }
                event.preventDefault();
            }
        }
    }
    _clickFirstFoundButton(selectorsArray) {
        for (let i in selectorsArray) {
            let selector = selectorsArray[i];
            if ($(selector).length) {
                if (!$(selector).is('[disabled]')) {
                    $(selector).click();
                }
                break;
            }
        }
    }
    /**
     * Calculate and set the max-height attribute of a modal's body
     * */
    _calculateMaxHeight(isWizardStep) {
        if (this.modalIsClosing) {
            this.$set(this, 'modalIsClosing', false);
            return;
        }
        // Try to hide the wizard modal body in this digest cycle before calculating height in the next digest cycle.
        // This is very important for cases that the modal has more then one step - such as onboarding wizard (and
        // applies to every step but the first)
        if (isWizardStep)
            $('.modal-body').hide();
        // Calculate and set modal body height in the next digest cycle
        // After the resizing is done - the modal body is shown again.
        this.resizeModalBodyInNextCycle();
    }
    resizeModalBodyInNextCycle() {
        this.$timeout(() => {
            // Hide modal body before perfroming calculations
            let modal = $('.modal-content');
            let modalBody = modal.find('.modal-body');
            // Calculate and show content
            let wizardModalContainer = modal.find('.wizard-modal');
            if (wizardModalContainer.length > 0) {
                modalBody.hide();
                this.resizeWizardModalBody(modal, wizardModalContainer, modalBody);
                modalBody.show();
            } else {
                this.resizeAnyModalBody(modal, modalBody);
            }
        });
    }
    resizeAnyModalBody(modal, modalBody) {
        let modalOffsetTop = 110,
            //Modal offset top
            viewPortHeight = window.innerHeight,
            // View port height
            modalHeight = viewPortHeight - 2 * modalOffsetTop;
        this.setModalBodyMaxHeight(modal, modalBody, modalHeight);
    }
    resizeWizardModalBody(modal, wizardContainer, modalBody) {
        let modalHeight = wizardContainer.height();
        this.setModalBodyMaxHeight(modal, modalBody, modalHeight);
    }
    setModalBodyMaxHeight(modal, modalBody, modalHeight) {
        let headerHeight = modal.find('.modal-header').outerHeight() || 0,
            // Header height
            footerHeight = modal.find('.modal-footer').outerHeight() || 0,
            // Footer height
            maxHeight = modalHeight - headerHeight - footerHeight;
        modalBody.css('max-height', maxHeight);
    }

    /**
     * launch a modal that shows content in a codemirror container
     *
     * @param title - title of the modal
     * @param content - content for the code mirror container
     * @param mode - mode for code mirror editor options (usually {name: <mimetype>}
     * @param beforeMessage - message to insert before the codemirror element
     */
    launchCodeModal(title, content, mode, beforeMessage, objectName) {
        let options = {
            content: content,
            mode: mode,
            title: title,
            beforeMessage: beforeMessage,
            objectName: objectName,
        }
        return this.launchModal('@code_modal', null, 'sm', null, options);
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
        let options = {
            buttons: buttons,
            content: content,
            title: title || 'Are you sure?',
            checkboxLabel: checkboxLabel,
            checkbox: { checked: false },
            onCheckboxStateChange: state => {
                if (checkBoxChangeListener)
                    checkBoxChangeListener(state, options)
            },
        }
        return this.launchModal('@confirm_modal', {}, 'sm', null, options).result;
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
        _.extend(wizardModalScope, controllerObject);
        wizardModalScope.$wizardCtrl.$userCtrl = controllerInstance;
        let modalInstance = this.launchModal('@wizard_modal', wizardModalScope, wizardDefinitionObject.size || 'lg', wizardDefinitionObject.cancelable && wizardDefinitionObject.backdropCancelable, wizardDefinitionObject.modalOptions);

        wizardModalScope.$wizardCtrl.$modalInstance = modalInstance;
        modalInstance.result.catch(reason => {
            if (reason)
                wizardModalScope.$wizardCtrl.cancel();
        });
        return modalInstance.result;
    }
}
