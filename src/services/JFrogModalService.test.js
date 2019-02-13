import Q from 'q'
import { createLocalVue } from '@vue/test-utils';
import {JFrogModal} from './JFrogModalService.js';
import JFrogModalFactory from './JFrogModalFactory.js';

// https://jestjs.io/docs/en/es6-class-mocks#the-4-ways-to-create-an-es6-class-mock
jest.mock('./JFrogModalFactory');

const localVue = createLocalVue();

const getParam = function(mockedMethod, key){
    return mockedMethod.mock.calls[0][0][key];
}

const SIZE_SMALL = "sm";


describe('JFrogModalService', () => {

    beforeEach(function() {
        // The class-under-test expects Vue to be available
        window.Vue = localVue;

        // Injected properties
        let prototypeOfClass = JFrogModal.prototype;
        prototypeOfClass.$inject = jest.fn();
        prototypeOfClass.JFrogEventBus = {
            getEventsDefinition: jest.fn(function(){
                return {};
            }),
            registerOnScope: jest.fn()
        }
        prototypeOfClass.$q = Q;
        prototypeOfClass.$timeout = setTimeout;

        //Clearing the mocked class
        JFrogModalFactory.mockClear();
    });

    describe('methods', function() {
        const methods = [
            'launchModal',
            'confirm',
            'launchCodeModal',
            'launchWizard'
        ]
        it(`should expose the methods: ${methods.toString()}`, function() {
            let serviceInstance = new JFrogModal();
            for(let methodName of methods) {
                expect(typeof serviceInstance[methodName]).toBe('function');
            }
        });
    });


    describe('public methods', function() {

        let serviceInstance
        beforeEach(function() {
            serviceInstance = new JFrogModal();
        });

        describe('confirm', function() {

            it('when invoked should pass options relevant to the confirmation dialog', function() {
                serviceInstance.confirm("","");
                const mockModalFactoryInstance = JFrogModalFactory.mock.instances[0];
                const mockGetModal = mockModalFactoryInstance.getModal;

                // console.log(mockGetModal.mock.calls[0][0])
                expect(getParam(mockGetModal, "template")).toEqual('@confirm_modal')
                expect(getParam(mockGetModal, "uiEssSize")).toEqual(SIZE_SMALL)
                expect(getParam(mockGetModal, "content")).toEqual("")
                expect(getParam(mockGetModal, "title")).toEqual("Are you sure?")
            });

            it('If passed, custom buttons should be made available', function() {
                let customButtons = {
                    confirm: "Yes",
                    cancel: "No"
                }
                serviceInstance.confirm("","", customButtons );
                const mockModalFactoryInstance = JFrogModalFactory.mock.instances[0];
                const mockGetModal = mockModalFactoryInstance.getModal;

                // console.log(mockGetModal.mock.calls[0][0])
                expect(getParam(mockGetModal, "buttons")).toEqual(customButtons)
            });

            it('If passed, the custom checkbox label should be made available', function() {
                let customCheckBoxLabel = "Consectetur mollit aliquip id ut amet.";
                serviceInstance.confirm("","", null, customCheckBoxLabel );
                const mockModalFactoryInstance = JFrogModalFactory.mock.instances[0];
                const mockGetModal = mockModalFactoryInstance.getModal;

                // console.log(mockGetModal.mock.calls[0][0])
                expect(getParam(mockGetModal, "checkboxLabel")).toEqual(customCheckBoxLabel)
            });


            it('should return a promise', function() {
                let response = serviceInstance.confirm("", "" );
                expect(typeof response.then).toBe("function")
            });

        });//confirm

        describe('launchCodeModal', function() {

            it('when invoked should pass options relevant to the code dialog', function() {
                let title = "Pariatur dolor irure in occaecat in eu consequat cillum elit nisi ad sit commodo.";
                let content = "Adipisicing magna incididunt consectetur tempor nisi do adipisicing officia minim aliquip sint.";
                let mode = "Culpa nulla non consequat velit dolor.";
                let beforeMessage = "Qui ullamco ipsum fugiat excepteur laborum qui anim consectetur nisi sint esse sint aute.";
                let objectName = "Ullamco non amet id nostrud nulla qui ipsum laboris non ipsum commodo et voluptate.";


                serviceInstance.launchCodeModal(title, content, mode,beforeMessage, objectName);
                const mockModalFactoryInstance = JFrogModalFactory.mock.instances[0];
                const mockGetModal = mockModalFactoryInstance.getModal;

                // console.log(mockGetModal.mock.calls[0][0])
                expect(getParam(mockGetModal, "template")).toEqual('@code_modal')
                expect(getParam(mockGetModal, "title")).toEqual(title)
                expect(getParam(mockGetModal, "content")).toEqual(content)
                expect(getParam(mockGetModal, "mode")).toEqual(mode)
                expect(getParam(mockGetModal, "beforeMessage")).toEqual(beforeMessage)
                expect(getParam(mockGetModal, "objectName")).toEqual(objectName)
                expect(getParam(mockGetModal, "uiEssSize")).toEqual(SIZE_SMALL)

            });

        });//launchCodeModal


        describe('launchWizard', function() {

            it('when invoked should pass options relevant to the wizard dialog', function() {
                let mockController = jest.fn();
                let wizardDefinitionObject = {
                    controller: mockController,
                    cancelable: true,
                    backdropCancelable: true,
                    modalOptions: {
                    }
                };

                serviceInstance.launchWizard(wizardDefinitionObject);
                const mockModalFactoryInstance = JFrogModalFactory.mock.instances[0];
                const mockGetModal = mockModalFactoryInstance.getModal;

                // console.log(mockGetModal.mock.calls[0][0])
                expect(getParam(mockGetModal, "template")).toEqual('@wizard_modal')
                expect(getParam(mockGetModal, "uiEssSize")).toEqual("lg")
                expect(getParam(mockGetModal, "uiEssNoCloseOnEsc")).toEqual(false)
                expect(mockController).toHaveBeenCalled();
            });


            it('if cancellable is false, \
            the wizard should not be cancelable', function() {
                    let wizardDefinitionObject = {
                        controller: jest.fn(),
                        cancelable: false,
                        backdropCancelable: true,
                        modalOptions: {
                        }
                    };

                    serviceInstance.launchWizard(wizardDefinitionObject);
                    const mockModalFactoryInstance = JFrogModalFactory.mock.instances[0];
                    const mockGetModal = mockModalFactoryInstance.getModal;

                    // console.log(mockGetModal.mock.calls[0][0])
                    expect(getParam(mockGetModal, "uiEssNoCloseOnEsc")).toEqual(true)
            });

            it('if backdropCancellable is false, \
            the wizard should not be cancelable', function() {
                    let wizardDefinitionObject = {
                        controller: jest.fn(),
                        cancelable: true,
                        backdropCancelable: false,
                        modalOptions: {
                        }
                    };

                    serviceInstance.launchWizard(wizardDefinitionObject);
                    const mockModalFactoryInstance = JFrogModalFactory.mock.instances[0];
                    const mockGetModal = mockModalFactoryInstance.getModal;

                    expect(getParam(mockGetModal, "uiEssNoCloseOnEsc")).toEqual(true)
            });


        });//launchWizard

    });
});
