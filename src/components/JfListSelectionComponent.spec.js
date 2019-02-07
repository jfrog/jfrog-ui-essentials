import { shallowMount } from '@vue/test-utils';
import JfListSelectionComponent from './JfListSelectionComponent.vue'

// Utility method to avoid code duplication
const mountComponent = function (props) {
    let options = {
        propsData: Object.assign({}, props),
        stubs: ['jf-drag-drop-pagination'],
    }
    let wrapper = shallowMount(JfListSelectionComponent, options);
    wrapper.vm.paginationApi.update = jest.fn()
    wrapper.vm.paginationApi.setPage = jest.fn();
    return wrapper;
}

const SELECTOR_INPUT = `input[type="text"]`;
const SELECTOR_LIST_ITEM = `.group-list-item`;
const EVENT_SELECT = "select";

describe('JfListSelectionComponent', () => {

    describe('display', function() {
        it('should display a text box for filtering', function() {
            let wrapper = mountComponent({});
            expect(wrapper.contains(SELECTOR_INPUT)).toBe(true)
        })

        it('should not contain any list items if none were passed', function() {
            let wrapper = mountComponent({});
            //Actually there is one available on the page but is hidden
            expect(wrapper.findAll(SELECTOR_LIST_ITEM).length).toBe(1)
        })

        it('should not display as many items as were passed to the component', function() {
            let wrapper = mountComponent({
                items: [
                    {
                        name: "Velit aliqua duis commodo ut deserunt in aute reprehenderit excepteur aliquip adipisicing id."
                    },
                    {
                        name: "Deserunt adipisicing nisi qui nostrud cupidatat incididunt sint."
                    }
                ]
            });

            expect(wrapper.findAll(SELECTOR_LIST_ITEM).length).toBe(3)
        })

        it('should display an icon if a "icon_class" was passed', function() {
            let iconClass="someClass";
            let wrapper = mountComponent({
                items: [
                    {
                        name:
                            'Velit aliqua duis commodo ut deserunt in aute reprehenderit excepteur aliquip adipisicing id.',
                        icon_class: iconClass,
                    },
                ],
            })

            expect(wrapper.findAll(`.icon.${iconClass}`).length).toBe(1)
        })


        describe('highlight', function() {

            it('should highlight the item which has the property "highlighted" only if "highlightSelected" is passed as true, ', function() {
                let wrapper = mountComponent({
                    highlightSelected: true,
                    items: [
                        {
                            name:
                                'Velit aliqua duis commodo ut deserunt in aute reprehenderit excepteur aliquip adipisicing id.',
                        },
                        {
                            highlighted: true,
                            clickable: true,
                            name:
                                'Deserunt adipisicing nisi qui nostrud cupidatat incididunt sint.',
                        },
                    ],
                })

                expect(
                    wrapper.contains(
                        `${SELECTOR_LIST_ITEM}:nth-child(3).highlighted`
                    )
                ).toBe(true);
            })

            it('should not highlight the item which has the property "highlighted" if "highlightSelected" is not passed as true, ', function() {
                let wrapper = mountComponent({
                    highlightSelected: false,
                    items: [
                        {
                            name:
                                'Velit aliqua duis commodo ut deserunt in aute reprehenderit excepteur aliquip adipisicing id.',
                        },
                        {
                            highlighted: true,
                            clickable: true,
                            name:
                                'Deserunt adipisicing nisi qui nostrud cupidatat incididunt sint.',
                        },
                    ],
                })

                expect(
                    wrapper.contains(
                        `${SELECTOR_LIST_ITEM}:nth-child(3).highlighted`
                    )
                ).toBe(false);
            })

            it('should not highlight if "highlightSelected" is passed as true, but no item has the property "highlighted"  ', function() {
                let wrapper = mountComponent({
                    highlightSelected: true,
                    items: [
                        {
                            name:
                                'Velit aliqua duis commodo ut deserunt in aute reprehenderit excepteur aliquip adipisicing id.',
                        },
                        {
                            clickable: true,
                            name:
                                'Deserunt adipisicing nisi qui nostrud cupidatat incididunt sint.',
                        },
                    ],
                })

                expect(
                    wrapper.contains(
                        `${SELECTOR_LIST_ITEM}:nth-child(3).highlighted`
                    )
                ).toBe(false)
            })
        });//highlight




    });//display

    describe('events', function () {
        it('should emit the select event with the selected item when it is double clicked', function () {
            let items = [
                {
                    clickable: true,
                    name:
                        'Velit aliqua duis commodo ut deserunt in aute reprehenderit excepteur aliquip adipisicing id.',
                }
            ];
            let wrapper = mountComponent({
                items
            })

            wrapper.find(`${SELECTOR_LIST_ITEM}:nth-child(2)`).trigger("dblclick")
            expect(wrapper.emitted()[EVENT_SELECT][0]).toEqual([items[0]]);
            expect(
                wrapper.vm.paginationApi.update
            ).toHaveBeenCalled()
        });

        it('it should not emit the select event with the selected item when it is clicked once', function () {
            let items = [
                {
                    clickable: true,
                    name:
                        'Velit aliqua duis commodo ut deserunt in aute reprehenderit excepteur aliquip adipisicing id.',
                }
            ];
            let wrapper = mountComponent({
                items
            })

            wrapper.find(`${SELECTOR_LIST_ITEM}:nth-child(2)`).trigger("click")
            expect(wrapper.emitted()[EVENT_SELECT]).toBeFalsy();
            expect(
                wrapper.vm.paginationApi.update
            ).not.toHaveBeenCalled()
        });

        it('it should emit the select event with the selected item when it is clicked once, if allowSingleClick is passed', function () {
            let items = [
                {
                    clickable: true,
                    name:
                        'Velit aliqua duis commodo ut deserunt in aute reprehenderit excepteur aliquip adipisicing id.',
                },
            ]
            let wrapper = mountComponent({
                allowSingleClick: true,
                items,
            })

            wrapper
                .find(`${SELECTOR_LIST_ITEM}:nth-child(2)`)
                .trigger('click')
            expect(wrapper.emitted()[EVENT_SELECT][0]).toEqual([
                items[0],
            ])
            expect(
                wrapper.vm.paginationApi.update
            ).toHaveBeenCalled()
        })
    });//events


    describe('filter', function () {

        it('should only display items which match the filter', function () {
            let wrapper = mountComponent({
                items: [
                    {
                        name:
                            'Velit aliqua duis commodo ut deserunt in aute reprehenderit excepteur aliquip adipisicing id.',
                    },
                    {
                        clickable: true,
                        name:
                            'Deserunt adipisicing nisi qui nostrud cupidatat incididunt sint.',
                    },
                ],
            });

            //Initially the 2nd row is visible
            expect(
                wrapper.findAll(`${SELECTOR_LIST_ITEM}`).length
            ).toBe(3)

            wrapper.find(SELECTOR_INPUT).setValue("aliquip");

            //After entering the filter criteria, only one row should be visible
            expect(
                wrapper.findAll(`${SELECTOR_LIST_ITEM}`)
                    .length
            ).toBe(2)

            wrapper.find(SELECTOR_INPUT).setValue('')

            //If filter is cleared, all rows must be displayed
            expect(
                wrapper.findAll(`${SELECTOR_LIST_ITEM}`)
                    .length
            ).toBe(3)

            //The pagination API is called both times
            expect(wrapper.vm.paginationApi.setPage).toHaveBeenCalledTimes(2)
        });

    });//filter


});
