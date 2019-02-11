import {shallowMount} from '@vue/test-utils';
import JfTextBoxComponent from './JfTextBoxComponent.vue';

describe('JfTextBoxComponent', () => {

    // Selectors
    const showAllLink = '.jf-text-box-show-all';
    const showAllLinkText = 'showMore';

    // Inputs 
    const sampleText = 'This is a testing sample data for text box';
    const displayText = '.jf-text-box-content-current';

    it('contains the element text box container', () => {
        const wrapper = shallowMount(JfTextBoxComponent, {
            propsData: {}
        });
        expect(wrapper.contains('.jf-text-box-container')).toBe(true);
    });

    it('When text overflows show-all element renders', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTextBoxComponent, {
            propsData: {
                text: sampleText,
                seeAllText: showAllLinkText
            },
            computed: {
                isOverflowing() {
                    return true
                }
            }
        });
        jest.runAllTimers();
        expect(wrapper.find(showAllLink).exists()).toBe(true);
        expect(wrapper.find(showAllLink).text()).toBe(showAllLinkText);
    });

    it('When text overflows onclicking show-all element opens modal', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTextBoxComponent, {
            propsData: {
                text: sampleText,
                seeAllText: showAllLinkText
            },
            computed: {
                isOverflowing() {
                    return true
                }
            },
            mocks: {
                JfFullTextService: {
                    showFullTextModal: jest.fn(function () {
                        let result = new Promise((resolve, reject) => {
                            resolve()
                        })
                        return { result };
                    })
                }
            }
        });
        jest.runAllTimers();
        wrapper.find(showAllLink).trigger('click');
        expect(wrapper.vm.JfFullTextService.showFullTextModal).toHaveBeenCalled();
        
    });

    it('text props is displayed while rendering', () => {
        jest.useFakeTimers();
        const wrapper = shallowMount(JfTextBoxComponent, {
            propsData: {
                text: sampleText
            },
            computed: {
                isOverflowing() {
                    return false
                }
            },
        });
        jest.runAllTimers();
        expect(wrapper.find(displayText).text()).toBe(sampleText);
    });


});
