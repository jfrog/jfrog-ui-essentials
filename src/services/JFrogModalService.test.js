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
                expect(getParam(mockGetModal, "uiEssSize")).toEqual('sm')
                expect(getParam(mockGetModal, "buttons")).toEqual({
                    confirm: "Confirm",
                    cancel: "Cancel"
                })
                expect(getParam(mockGetModal, "content")).toEqual("")
                expect(getParam(mockGetModal, "title")).toEqual("Are you sure?")
            });

        });//confirm
    });




});
