import {shallowMount, createLocalVue} from '@vue/test-utils';
import JfListMakerComponent from './JfListMakerComponent.vue';

/* Stubs custom directive */
const localVue = createLocalVue();
localVue.directive('jf-tooltip-on-overflow', {
    bind: function() {}
});

// Utility method to avoid code duplication
const mountComponent = function( props ){
    let options = {
        localVue,
        propsData: Object.assign({}, props),
        stubs: ['jf-field','jf-ui-select']
    }
    return shallowMount(JfListMakerComponent, options);
}

//selectors
const SELECTOR_A_LIST_ROW = `.list-maker-row-value`;
//Buttons
const BUTTON_ADD = '.icon.icon-new';
const BUTTON_DELETE = '.icon-close';
//Inputs
const INPUT_TEXT = `input.input-text`;
const INPUT_DROPDOWN = 'jf-ui-select-stub'//This is -stub since the child is stubbed

//Events
const EVENT_ON_ADD_VALUE = 'on-add-value';
const EVENT_ON_AFTER_ADD_VALUE = 'on-after-add-value';
const EVENT_INPUT = 'input';
const EVENT_ON_AFTER_DELETE_VALUE = 'on-after-delete-value';

//Messages
const MSG_MUST_INPUT_VALUE = `Must input value`;
const MSG_VALUE_ALREADY_EXISTS = `Value already exists`

describe('JfListMakerComponent', () => {
    describe("display", function() {
        const wrapper = mountComponent();
        it('should render a form', () => {
            expect(wrapper.contains('form')).toBe(true);
        });

        it('should render a + button to add new elements to the list', () => {
            expect(wrapper.contains(BUTTON_ADD)).toBe(true);
        })
        it('The + button is disabled by default', () => {
            expect(
                wrapper.find(BUTTON_ADD).attributes('disabled')
            ).toBe('disabled')
        })
        it('The + button should be enabled when any text is typed in', () => {
            wrapper.find(INPUT_TEXT).setValue('a')
            expect(
                wrapper.find(BUTTON_ADD).attributes('disabled')
            ).not.toBe('disabled')
        })
        it('If ng-disabled prop is passed, the + button is disabled even if content is typed in', () => {
            const wrapper = mountComponent({
                "ng-disabled": true,
            });
            wrapper.find(INPUT_TEXT).setValue("a");
            expect(wrapper.find(BUTTON_ADD).attributes("disabled")).toBe("disabled")
        })

        it('should display passed in values in the list', function () {
            const wrapper = mountComponent({
                value: ['a'],
            })
            //text
            expect(wrapper.find(SELECTOR_A_LIST_ROW).text()).toEqual("a")
            //delete button
            expect(
                wrapper
                    .contains(
                        BUTTON_DELETE
                    )
            ).toBe(true)
        })

        it('should display new values in the list', function () {

            const wrapper = mountComponent({
                value: ['a'],
            });

            //Set some data
            wrapper.find(INPUT_TEXT).setValue('b');
            //Click on the + button
            wrapper.find(BUTTON_ADD).trigger("click");
            expect(wrapper.findAll(SELECTOR_A_LIST_ROW).at(0).text()).toEqual("a")
            expect(wrapper.findAll(SELECTOR_A_LIST_ROW).at(1).text()).toEqual("b")
        })

        it('should display new values in the list', function () {
            const wrapper = mountComponent({
                value: ["a", "b"],
            });
            expect(wrapper.findAll(SELECTOR_A_LIST_ROW).at(0).text()).toEqual("a")
            expect(wrapper.findAll(SELECTOR_A_LIST_ROW).at(1).text()).toEqual("b")
        })
    })


    describe("events and validations", function() {
        describe("addition", function() {

            it(`if valid text is entered in the textbox and the + button clicked, it should\n\temit "${EVENT_ON_ADD_VALUE}", "${EVENT_ON_AFTER_ADD_VALUE}" & "${EVENT_INPUT}"`, function() {
                const wrapper = mountComponent({
                    value: ['a'],
                })

                //Set some data
                wrapper.find(INPUT_TEXT).setValue("b");
                //Click on the + button
                wrapper.find(BUTTON_ADD).trigger('click')
                //One event contains the new value entered
                expect(
                    wrapper.emitted()[EVENT_ON_ADD_VALUE][0]
                ).toEqual([{ newValue: 'b' }])
                // One event contains the updated array (necessary for two-way binding)
                expect(wrapper.emitted()[EVENT_INPUT][0]).toEqual([
                    ['a', 'b'],
                ])
                expect(
                    wrapper.emitted()[EVENT_ON_AFTER_ADD_VALUE]
                ).toBeTruthy()
            })

            it('if the text entered is already in the passed-in list, no event must be emitted', function () {
                const wrapper = mountComponent({
                    value: ["a"]
                });

                //Set some data
                wrapper.find(INPUT_TEXT).setValue("a");
                //Click on the + button
                wrapper.find(BUTTON_ADD).trigger("click");
                //Validations
                expect(wrapper.find(".jf-validation").text()).toEqual(MSG_VALUE_ALREADY_EXISTS);
                expect(wrapper.emitted()[EVENT_ON_ADD_VALUE]).toBeFalsy();
                expect(wrapper.emitted()[EVENT_ON_AFTER_ADD_VALUE]).toBeFalsy();
            });

            it('Empty strings (with padding) must not be accepted', function () {
                const wrapper = mountComponent({
                    value: ["a"]
                });

                //Set an empty string as the data
                wrapper.find(INPUT_TEXT).setValue(" ");
                //Click on the + button
                wrapper.find(BUTTON_ADD).trigger("click");
                //Validations
                expect(wrapper.find(".jf-validation").text()).toEqual(
                    MSG_MUST_INPUT_VALUE
                )
                expect(wrapper.emitted()[EVENT_ON_ADD_VALUE]).toBeFalsy();
                expect(wrapper.emitted()[EVENT_ON_AFTER_ADD_VALUE]).toBeFalsy();
            });
        });//addition


        describe('deletion', function() {
            it(`should emit "${EVENT_ON_AFTER_DELETE_VALUE}" when user deletes a value`, function () {
                const wrapper = mountComponent({
                    value: ["a"]
                });
                //Click on the + button
                wrapper.find(BUTTON_DELETE).trigger("click");
                expect(
                    wrapper.emitted()[EVENT_ON_AFTER_DELETE_VALUE]
                ).toBeTruthy()
            });
        });

    })

    describe("sorting", function() {
        it('if noSort is not specified, should display an ordered list', function() {
            const wrapper = mountComponent({
                value: ['b', 'a'],
            });

            expect(
                wrapper
                    .findAll(SELECTOR_A_LIST_ROW)
                    .at(0)
                    .text()
            ).toEqual('a')
            expect(
                wrapper
                    .findAll(SELECTOR_A_LIST_ROW)
                    .at(1)
                    .text()
            ).toEqual('b')
        })

        it('if noSort is specified, should display the list as entered', function() {
            const wrapper = mountComponent({
                noSort: true,
                value: ['b', 'a'],
            });

            expect(
                wrapper
                    .findAll(SELECTOR_A_LIST_ROW)
                    .at(0)
                    .text()
            ).toEqual('b')
            expect(
                wrapper
                    .findAll(SELECTOR_A_LIST_ROW)
                    .at(1)
                    .text()
            ).toEqual('a')
        })

        it('if noSort is not specified, should emit an ordered list', function () {
            const wrapper = mountComponent({
                value: ['b'],
            });

            wrapper.find(INPUT_TEXT).setValue("a");

            wrapper.find(BUTTON_ADD).trigger('click')
            expect(wrapper.emitted()[EVENT_INPUT][0]).toEqual([
                ['a', 'b'],
            ])
        })

        it('if noSort is specified, should add to original list', function () {
            const wrapper = mountComponent({
                noSort: true,
                value: ['b'],
            });

            wrapper.find(INPUT_TEXT).setValue("a");

            wrapper.find(BUTTON_ADD).trigger('click')
            expect(wrapper.emitted()[EVENT_INPUT][0]).toEqual([
                ['b', 'a'],
            ])
        })
    })//sorting

    describe("label", function() {

        it('should display a label if one is passed', function() {
            const wrapper = mountComponent({
                label: "abc"
            });

            expect(wrapper.contains('label')).toBe(true)
            expect(wrapper.find("label").text()).toEqual("abc");
        });
    })

    describe('regex functionality', function() {

        it('if a regex is provided user inputs should be validated against the regex', function() {
            const wrapper = mountComponent({
                validationRegex: "^[A-Za-z]*$",
            })
            wrapper.find(INPUT_TEXT).setValue("a");

            wrapper.find(BUTTON_ADD).trigger('click')
            expect(wrapper.emitted()[EVENT_INPUT][0]).toEqual([
                ['a'],
            ])
            wrapper.find(INPUT_TEXT).setValue("1");

            wrapper.find(BUTTON_ADD).trigger('click')
            expect(wrapper.find(".jf-validation").text()).toEqual(
                'Value not valid'
            )
            expect(wrapper.emitted()[EVENT_INPUT][0]).toEqual([['a']])
        });

        it('if a regex message is provided it should be displayed if the input fails validation', function() {
            let errorMessage = "Exercitation cillum adipisicing mollit";
            const wrapper = mountComponent({
                validationRegex: '^[A-Za-z]*$',
                validationRegexMessage:errorMessage,
            })

            wrapper.find(INPUT_TEXT).setValue("1");

            wrapper.find(BUTTON_ADD).trigger('click')
            expect(wrapper.find(".jf-validation").text()).toEqual(
                errorMessage
            )
        });

    });//regex

    describe('caseInsensitive', function () {

        it('If caseInsensitive is not passed the validations will consider case', function() {
            const wrapper = mountComponent({
                noSort: true,
                value: ['a'],
            });

            wrapper.find(INPUT_TEXT).setValue("A");

            wrapper.find(BUTTON_ADD).trigger('click')
            expect(wrapper.emitted()[EVENT_INPUT][0]).toEqual([
                ['a', 'A'],
            ])
        });

        it('If caseInsensitive is passed as true the validations will ignore case', function() {
            const wrapper = mountComponent({
                noSort: true,
                value: ['a'],
                caseInsensitive: true,
            })

            wrapper.find(INPUT_TEXT).setValue("A");

            wrapper.find(BUTTON_ADD).trigger('click')
            expect(wrapper.emitted()[EVENT_ON_ADD_VALUE]).toBeFalsy()
        });

    });//caseInsensitive


    describe('predefinedValues', function() {

        it('if predefined values are passed a dropdown should be displayed instead of text input', function() {
            const wrapper = mountComponent({
                value: ['a'],
                predefinedValues:['a','b'],
            })

            expect(wrapper.find(INPUT_TEXT).exists()).toBe(false)
            expect(wrapper.find(INPUT_DROPDOWN).exists()).toBe(true)
        });

    })//predefinedValues

    describe('hideAddNewFields', function () {

        it('If hideAddNewFields is passed as true, the input is not displayed at all', function() {
            let wrapper = mountComponent({
                value: ['a'],
                hideAddNewFields: true,
            })

            expect(wrapper.find(INPUT_TEXT).exists()).toBe(false)
            expect(wrapper.find(INPUT_DROPDOWN).exists()).toBe(false)

            wrapper = mountComponent({
                value: ['a'],
                hideAddNewFields: true,
                predefinedValues: ['a', 'b'],
            })
            expect(wrapper.find(INPUT_TEXT).exists()).toBe(false)
            expect(wrapper.find(INPUT_DROPDOWN).exists()).toBe(false)
        })

    })//hideAddNewFields


    describe('minLength', function() {

        it('if minLength is passed, the delete button is only displayed if there are more than the min length', function() {
            let wrapper = mountComponent({
                value: ['a'],
                minLength: 2
            })
            expect(wrapper.find(BUTTON_DELETE).exists()).toBe(false)
            wrapper = mountComponent({
                value: ['a', 'b', 'c'],
                minLength: 2,
            })
            expect(wrapper.find(BUTTON_DELETE).exists()).toBe(true)
        });

    })//minLength




});
