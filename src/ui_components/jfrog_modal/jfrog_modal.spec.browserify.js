/**
 * Created by idannaim on 8/3/15.
 */
let jfrogModal, modal, scope;
let modalInstanceMock = {};
describe('unit test: JFrogModal', ()=> {

    beforeEach(angular.mock.module('jfrog.ui.essentials'));
    beforeEach(inject(($modal, $rootScope, JFrogModal) => {
        jfrogModal = JFrogModal;
        modal = $modal;
        scope = $rootScope.$new();
        jest.spyOn(modal, 'open').mockReturnValue(modalInstanceMock);
    }));
    it('should open modal', ()=> {
        jfrogModal.launchModal('user_modal', scope);
        expect(modal.open).toHaveBeenCalled();
    });
    it('should open modal', ()=> {
        let response = jfrogModal.launchModal('user_modal', scope);
        expect(response).toBe(modalInstanceMock);
    });

    it('should set default size', ()=> {
        jfrogModal.launchModal('@code_modal', scope);
        let option = {
            templateUrl: 'ui_components/jfrog_modal/templates/code_modal.html',
            scope: scope,
            size: 'lg'
        };
        expect(modal.open).toHaveBeenCalledWith(option);
    });
});