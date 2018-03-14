fdescribe('Unit: JFrogSubRouter Service', function () {

    let JFrogSubRouter;
    let subRouter;
    let $rootScope;
    let $scope;
    let $state;
    let $timeout;
    let $location;

    let onInit, onChangeFromUrl, onStateChange, onInvalidState;

    function setupSubRouter() {
        $state.current.url = '/base/path/{subPath:JFrogSubRouterPath}';
        $state.current.name = 'karma';
        $location.path('/base/path');
        subRouter = JFrogSubRouter.createLocalRouter({
            parentScope: $scope,
            urlStructure: '/:pathParam1/:pathParam2/:pathParam3?:searchParam1&:searchParam2',
            hotSyncUrl: true,
            states: [
                {
                    name: 'state1',
                    params: {mandatory: ['pathParam1'], nullify: ['pathParam2', 'pathParam3']}
                },
                {
                    name: 'state2',
                    params: {mandatory: ['pathParam1', 'pathParam2'], nullify: ['pathParam3']}
                },
                {
                    name: 'state3',
                    params: {mandatory: ['pathParam1', 'pathParam2', 'pathParam3']}
                }
            ],
            onInit: () => {
                if (onInit) onInit();
            },
            onChangeFromUrl: (oldParams, newParams) => {
                if (onChangeFromUrl) onChangeFromUrl(oldParams, newParams);
            },
            onStateChange: (oldState, newState) => {
                if (onStateChange) onStateChange(oldState, newState);
            },
            onInvalidState: (oldState, params) => {
                if (onInvalidState) onInvalidState(oldState, params);
            }
        })
    }

    function tick(func) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                func();
                $scope.$apply();
                res();
            })
        })
    }

    beforeEach(m('jfrog.ui.essentials'));

    beforeEach(inject((_JFrogSubRouter_, _$rootScope_, _$state_, _$timeout_, _$location_) => {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $state = _$state_;
        $timeout = _$timeout_;
        $location = _$location_;
        JFrogSubRouter = _JFrogSubRouter_;
    }));


    it ('should initialize sub router, with invalid state', (done) => {
        onInit = () => {
            expect(subRouter.state).toEqual(null);
            done();
        }
        setupSubRouter();
        $scope.$apply();
    })

    it ('should switch states and update url when changing params', (done) => {
        onInit = () => {
            expect(subRouter.state).toEqual(null);
            expect($location.path()).toEqual('/base/path');
            subRouter.params.pathParam1 = 'momo';
            expect(subRouter.state).toEqual('state1');

            tick(() => {
                expect($location.path()).toEqual('/base/path/momo/');
                subRouter.params.pathParam2 = 'jojo';
                expect(subRouter.state).toEqual('state2');
            })
            .then(() => tick(() => {
                expect($location.path()).toEqual('/base/path/momo/jojo/');
                subRouter.params.pathParam3 = 'lala';
                expect(subRouter.state).toEqual('state3');
            }))
            .then(() => tick(() => {
                expect($location.path()).toEqual('/base/path/momo/jojo/lala/');
                done();
            }))
        }
        setupSubRouter();
        $scope.$apply();
    })

    it ('should change params and switch states when changing changing url', (done) => {
        onInit = () => {
            expect(subRouter.state).toEqual(null);
            expect($location.path()).toEqual('/base/path');

            tick(() => {
                $location.path('/base/path/momo');
                $scope.$apply();
                expect(subRouter.params.pathParam1).toEqual('momo');
                expect(subRouter.state).toEqual('state1');
            })
            .then(() => tick(() => {
                $location.path('/base/path/momo/yaya');
                $scope.$apply();
                expect(subRouter.params.pathParam2).toEqual('yaya');
                expect(subRouter.state).toEqual('state2');
            }))
            .then(() => tick(() => {
                $location.path('/base/path/momo/yaya/kaja');
                $scope.$apply();
                expect(subRouter.params.pathParam3).toEqual('kaja');
                expect(subRouter.state).toEqual('state3');
                done();
            }))
        }
        setupSubRouter();
        $scope.$apply();
    })

});