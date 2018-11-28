describe('unit test:jf_sidebar directive', () => {
    let $timeout,
        JFrogEventBus,
        $state;

    function setup(_JFrogEventBus_, _$timeout_, _$state_) {
        JFrogEventBus = _JFrogEventBus_;
        $timeout = _$timeout_;
        $state = _$state_;
    }

    let attrs = {
        driver: {
            getMenuItems: () => {
                return [
                    {
                        label: 'first label',
                        stateParent: 'LOGIN',
                        state: 'LOGIN',
                        icon: 'icon icon-navigation-bundle',
                        selected: false,
                        isDisabled: false
                    },
                    {
                        label: 'Release Bundles',
                        stateParent: 'LOGIN',
                        state: 'LOGIN',
                        icon: 'icon icon-menu-search',
                        selected: false,
                        isDisabled: true
                    },
                    {
                        label: 'test',
                        stateParent: 'LOGIN',
                        state: 'LOGIN',
                        icon: 'icon icon-menu-search',
                        selected: false,
                        isDisabled: false
                    },
                    {
                        label: 'another one',
                        stateParent: 'LOGIN',
                        state: 'LOGIN',
                        icon: 'icon icon-menu-search',
                        selected: false,
                        isDisabled: false
                    },
                    {
                        label: 'Admin',
                        icon: 'icon icon-admin-new',
                        id: 'admin',
                        selected: false,
                        children: [
                            {
                                label: 'Security',
                                subItems: [
                                    {label: 'Permissions', state: 'distributionPermissions'},
                                    {label: 'Permissions2', state: 'distributionPermissions2'},
                                ]
                            }],
                        isDisabled: false

                    }
                ]
            }
        },
    };

    beforeEach(module('jfrog.ui.essentials'));
    beforeEach(inject(setup));
    beforeEach(() => compileDirective('jf-sidebar', attrs));
    beforeEach((() => {
        jest.spyOn($state, 'go').mockImplementation(() => {});
    }));
    beforeEach((() => {
        localStorage.clear();
    }));

    it('should call $state.go', () => {
        $('.icon-navigation-bundle').parent().click();
        $timeout.flush();
        expect($state.go).toHaveBeenCalled();
    });

    it('should not call $state.go', () => {
        $('.icon-menu-search').parent().click();
        expect($state.go).not.toHaveBeenCalled();
    });

    it('sub item should call $state.go', () => {
        $('.icon-admin-new').parent().click();
        $('.sub-menu').find('a')[0].click();
        $timeout.flush();
        expect($state.go).toHaveBeenCalled();
    });

    it('sub item should call $state.go', () => {
        $('.icon-admin-new').parent().click();
        $('.sub-menu').find('a')[0].click();
        $timeout.flush();
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('distributionPermissions', undefined)

    });

    it('should set local storage pin to true', () => {
        expect(localStorage.pinMenu).toBeUndefined();
        $('.pin-menu').click();
        expect(localStorage.pinMenu).toBeDefined();
        expect(localStorage.pinMenu).toBe('true');
    });

    it('test the filter ', () => {
        $('.icon-admin-new').parent().click();
        expect($('.sub-menu').find('.not-active').length).toBe(0);
        angular.element($('.searchbox-wrapper').find('input').val('firstewewe')).triggerHandler('input');
        expect($('.sub-menu').find('.not-active').length).toBe(2);
    });

    it('should highlight the selected subitem', () => {
        //TODO: add support for highlighting selected subItem
        // $('.icon-admin-new').parent().click();
        // $('.sub-menu').find('a')[0].click();
        //$timeout.flush();
        //console.log($('.sub-menu').find('.current'));
        //expect($state.go).toHaveBeenCalled();
    })

});
