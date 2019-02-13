import { shallowMount } from '@vue/test-utils';
import ModalMixin from './index.js'
import Q from 'q'

// Utility method to avoid code duplication
const mountComponent = function (props={}) {
    let Component = {
        template: "<div></div>",
        mixins:[ModalMixin]
    }
    let options = {
        propsData: Object.assign({}, props),
    }
    let wrapper = shallowMount(Component, options);

    return wrapper;
}


describe('ModalMixin', () => {

    describe('methods', function() {

        let methods = [ "show", "close", "$ok", "$close", 'dismiss', '$dismiss']
        it(`should expose the following methods ${methods.toString()}`, function() {
            let wrapper = mountComponent();
            for(let method of methods) {
                expect(typeof wrapper.vm[method]).toBe("function");
            }
        });
        it("close is a backward compatible method which simply delegates to $close", function() {
            let wrapper = mountComponent();
            wrapper.vm.$close = jest.fn();
            wrapper.vm.close();
            expect(wrapper.vm.$close).toHaveBeenCalledWith(true);
        })

        it("$ok is a backward compatible method which simply delegates to $close", function() {
            let wrapper = mountComponent();
            wrapper.vm.$close = jest.fn();
            wrapper.vm.$ok();
            expect(wrapper.vm.$close).toHaveBeenCalledWith(true);
        })

        it("dismiss is a backward compatible method which simply delegates to $dismiss", function() {
            let wrapper = mountComponent();
            wrapper.vm.$dismiss = jest.fn();
            wrapper.vm.dismiss();
            expect(wrapper.vm.$dismiss).toHaveBeenCalled();
        })

        describe('$close', function() {
            it('if no params are passed, it should delegate to $dismiss', function() {
                let wrapper = mountComponent();
                wrapper.vm.$dismiss = jest.fn();
                wrapper.vm.$close();
                expect(wrapper.vm.$dismiss).toHaveBeenCalled();
            })


            it('if a truthy value is passed, it should close the modal & resolve the promise', function() {
                let deferred = Q.defer();
                let wrapper = mountComponent(
                    {
                        uiEssModalPromise: deferred
                    }
                );
                wrapper.vm.$refs = {
                    jfModal: {
                        hide: jest.fn()
                    }
                };
                wrapper.vm.$dismiss = jest.fn();
                expect(deferred.promise.isFulfilled()).toBe(false)
                wrapper.vm.$close(true);
                expect(wrapper.vm.$dismiss).not.toHaveBeenCalled();
                expect(wrapper.vm.$refs.jfModal.hide).toHaveBeenCalled();
                expect(deferred.promise.isFulfilled()).toBe(true)
            });

        });//$close


        describe('$dismiss', function() {
            it('should reject the promise and invoke hide on the modal', function() {
                let deferred = Q.defer();
                let wrapper = mountComponent(
                    {
                        uiEssModalPromise: deferred
                    }
                );
                wrapper.vm.$refs = {
                    jfModal: {
                        hide: jest.fn()
                    }
                };
                expect(deferred.promise.isRejected()).toBe(false)
                wrapper.vm.$dismiss();
                expect(wrapper.vm.$refs.jfModal.hide).toHaveBeenCalled();
                expect(deferred.promise.isRejected()).toBe(true)
            })

            it('should not reject the promise if `dontRejectOnClose` is passed', function() {
                let deferred = Q.defer();
                let wrapper = mountComponent(
                    {
                        uiEssModalPromise: deferred,
                        dontRejectOnClose:true
                    }
                );
                wrapper.vm.$refs = {
                    jfModal: {
                        hide: jest.fn()
                    }
                };
                expect(deferred.promise.isFulfilled()).toBe(false)
                wrapper.vm.$dismiss();
                expect(wrapper.vm.$refs.jfModal.hide).toHaveBeenCalled();
                expect(deferred.promise.isFulfilled()).toBe(true)
            })
        });//$dismiss


        describe('_handleHide', function() {

            it('should reject the promise by default (called because the user clicked the x)', function () {
                let deferred = Q.defer();
                let wrapper = mountComponent(
                    {
                        uiEssModalPromise: deferred
                    }
                );
                expect(deferred.promise.isRejected()).toBe(false)
                wrapper.vm._handleHide();
                expect(deferred.promise.isRejected()).toBe(true)
            })

            it('should not reject the promise if `dontRejectOnClose` is passed', function () {
                let deferred = Q.defer();
                let wrapper = mountComponent(
                    {
                        uiEssModalPromise: deferred,
                        dontRejectOnClose: true
                    }
                );
                expect(deferred.promise.isFulfilled()).toBe(false)
                wrapper.vm._handleHide();
                expect(deferred.promise.isFulfilled()).toBe(true)
            })

        });//_handleHide
    });//methods


    describe('props', function() {
        let mandatoryProps = ["ref", "id", "centered", "modal-class", "no-close-on-esc", "no-close-on-backdrop", "size" ]
        it('should make the following props available (they will be consumed by the modal)', function() {
            let wrapper = mountComponent();
            for( let prop of mandatoryProps ) {
                expect(wrapper.vm.modalProps[prop]).toBeDefined()
            }
        })

        it('should center the modal', function() {
            let wrapper = mountComponent();
            expect(wrapper.vm.modalProps["centered"]).toBe(true)
        });

        it('should set the size to the passed in value only if it is `sm` or `lg`', function () {
            let wrapper = mountComponent({
                uiEssSize: "lg"
            });
            expect(wrapper.vm.modalProps["size"]).toBe("lg")

            wrapper = mountComponent({
                uiEssSize: "sm"
            });
            expect(wrapper.vm.modalProps["size"]).toBe("sm")

            wrapper = mountComponent({
                uiEssSize: "me"
            })
            expect(wrapper.vm.modalProps["size"]).toBe("")


        });


    });

});
