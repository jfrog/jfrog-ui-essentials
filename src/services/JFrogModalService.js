import JFrogModalFactory from "./JFrogModalFactory.js"
import extend from 'lodash/extend';
import isObject from 'lodash/isObject';

export class JFrogModal {
    constructor() {
        this.$inject( '$rootScope', '$q', '$timeout', 'JFrogEventBus', 'JFrogUILibConfig');
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
    launchModal(template, scope = {}, size, cancelable = true, options) {
        let modalObj = {
            template: template
        };
        return this._launch(modalObj, scope, size, cancelable, options);
    }

    _launch(modalObj, scope, size, cancelable = true, options) {
        modalObj.uiEssNoCloseOnBackdrop = cancelable === false;
        modalObj.uiEssNoCloseOnEsc = cancelable === false
        modalObj.uiEssSize = size || 'lg';
        modalObj.uiEssModalClass = options && options.class || '';
        modalObj.uiEssModalPromise = this.$q.defer();
        modalObj.JFrogModal = this;

        let result = modalObj.uiEssModalPromise.promise;

        if (options && isObject(options)) {
            extend(modalObj, options);
        }

        let focused = $(':focus');
        if (focused.length)
            focused.blur();

        let modalInstance = (new JFrogModalFactory()).getModal(modalObj, scope, this.JFrogUILibConfig);

        this.JFrogEventBus.registerOnScope(this.$rootScope, this.EVENTS.CLOSE_MODAL, () => {
            modalInstance.$close(true);
        });

        //TODO much of this logic can be moved to the mixin
        this._calculateMaxHeight();
        let keyDownBinded = this._onKeyDown.bind(this);

        // Modal close event handler is registered as result.then(errorCallback)
        // In some cases the modal close event is caught by result.finally()
        result.then(() => {
        }, () => {
            this.modalIsClosing = true;
        }).finally(() => {
            this.modalIsClosing = true;
            $(window).off('resize', this._calculateMaxHeight());
            $(document).off('keydown', keyDownBinded);
        });

        $(window).resize(() => {
            this._calculateMaxHeight();
        });
        $(document).on('keydown', keyDownBinded);

        /* The interface expects a result (promise) & a close method to be returned */
        return {
            result: result,
            close: () => modalInstance.$close(true),
        }


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
            let wizardModalContainer = modalBody.closest('.wizard-modal');
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
        let options = {
            buttons: buttons,
            content: content,
            title: title || 'Are you sure?',
            checkboxLabel,
            checkbox: { checked: false },
            checkBoxChangeListener,
        }
        return this.launchModal('@confirm_modal', {}, 'sm', null, options).result;
    }

    launchWizard(wizardDefinitionObject) {
        let wizardHooks = new wizardDefinitionObject.controller();
        delete wizardDefinitionObject.controller;

        wizardDefinitionObject.cancelable = !!(wizardDefinitionObject.cancelable && wizardDefinitionObject.backdropCancelable);

        let options = {
            wizardDefinitionObject,
            wizardHooks
        };
        extend(options, wizardDefinitionObject.modalOptions);
        let modalInstance = this.launchModal('@wizard_modal', null, wizardDefinitionObject.size,
                            wizardDefinitionObject.cancelable,
                            options);

        modalInstance.result.catch(reason => {
            if (reason)
                modalInstance.cancel();
        });

        return modalInstance.result;
    }
}
