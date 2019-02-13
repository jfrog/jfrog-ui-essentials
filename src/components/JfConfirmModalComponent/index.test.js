import { shallowMount } from '@vue/test-utils';
import ConfirmModal from './index.vue'

// Utility method to avoid code duplication
const mountComponent = function (props = {}) {
    let options = {
        propsData: Object.assign({}, props),
        stubs: ['b-modal','jf-checkbox'],
    }
    let wrapper = shallowMount(ConfirmModal, options);

    return wrapper;
}

const BTN_LABEL_CONFIRM = "Confirm";
const BTN_LABEL_CANCEL = "Cancel";

const SELECTOR_BTN_CANCEL = "#popup-cancel";
const SELECTOR_BTN_CONFIRM = "#popup-confirm";
const SELECTOR_CHECKBOX = 'input[type="checkbox"]';

describe('ConfirmModal', () => {
    describe('callback', function () {
        it('should trigger the checkbox change listener if the user checks or unchecks the box', function() {
            let mockedFn = jest.fn();
            let wrapper = mountComponent({
                checkbox: { checked: false },
                checkboxLabel: "Quis excepteur Lorem qui dolore veniam fugiat eiusmod ut consequat commodo laboris id.",
                checkBoxChangeListener:mockedFn
            });
            wrapper.find(SELECTOR_CHECKBOX).trigger("change");
            expect(mockedFn).toHaveBeenCalled();
        });
    });//callBack


    describe('if button labels are not passed, they should be defaulted to "Confirm" and "Cancel"', function() {
        let wrapper = mountComponent({
            checkbox: { checked: false }
        });
        expect(wrapper.find(SELECTOR_BTN_CANCEL).text()).toEqual(BTN_LABEL_CANCEL);
        expect(wrapper.find(SELECTOR_BTN_CONFIRM).text()).toEqual(BTN_LABEL_CONFIRM);
    });

});
