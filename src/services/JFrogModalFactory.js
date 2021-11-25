/* This class's purpose is only to make the JFrogModalService more testable. In tests, this class will be mocked */

import JFrogConfirmModalComponent from '@/components/JfConfirmModalComponent/index.vue'
import JFrogCodeModalComponent from '@/components/JfCodeModalComponent/index.vue'
import JfFullTextModalComponent from '@/components/JfFullTextModalComponent/index.vue'
import JfDynamicModalComponent from '@/components/JfDynamicModalComponent/index.js'
import JfWizardModalComponent from '@/components/JfWizardModalComponent/index.vue'
import {VueFactory} from "./VueFactory";

export default class JFrogModalFactory {
    constructor() {
    }

    getModal(modalObj, scope, JFrogUILibConfig ){
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
            case '@wizard_modal':
                ModalComponent = JfWizardModalComponent;
                break
            default:
                // Have intentionally not used this as a mixin because we are modifying the template
                ModalComponent = new JfDynamicModalComponent();
                //Get the custom Modal's details

                let modifiers = typeof modalObj.template == 'object' ? modalObj.template : JFrogUILibConfig.getConfig().customModalTemplates[modalObj.template];
                //Embed the dynamic content into a modal
                ModalComponent.template = `<b-modal v-bind="modalProps" @hide="_handleHide" @hidden="_afterModalHidden">${modifiers.template}</b-modal>`;
                //Add any properties specified in the dynamic modal to this component definition
                ModalComponent.mixins.push(modifiers);

                if (scope) {
                    _.extend(modalObj, scope);
                    /* Specifically for backward compatibility. If any fields are passed, add them as props */
                    ModalComponent.props = [
                        ...ModalComponent.props,
                        ...Object.keys(scope),
                    ]
                }
        }
        const { Vue } = VueFactory.getInstance();
        let ComponentClass = Vue.extend(ModalComponent)
        let modalInstance = new ComponentClass({
            propsData: modalObj
        })
        modalInstance.show('#app')
        return modalInstance;
    }
}
