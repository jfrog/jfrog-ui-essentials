describe('Unit: JFrogSubRouter Service', function () {

    let JFrogSubRouter;
    let subRouter;
    let $rootScope;
    let $scope;
    let $state;
    let $timeout;
    let $location;

    let eventHandlers = {};

    function setupSubRouter() {
        $state.current.url = '/base/path/{subPath:JFrogSubRouterPath}';
        $state.current.name = 'karma';
        $location.path('/base/path');
        subRouter = JFrogSubRouter.createLocalRouter({
            parentScope: $scope,
            urlStructure: '/:pathParam1/:pathParam2/:pathParam3/?:searchParam1&:searchParam2',
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
                if (eventHandlers.onInit) eventHandlers.onInit();
            },
            onChangeFromUrl: (oldParams, newParams) => {
                if (eventHandlers.onChangeFromUrl) eventHandlers.onChangeFromUrl(oldParams, newParams);
            },
            onStateChange: (oldState, newState) => {
                if (eventHandlers.onStateChange) eventHandlers.onStateChange(oldState, newState);
            },
            onInvalidState: (oldState, params) => {
                if (eventHandlers.onInvalidState) eventHandlers.onInvalidState(oldState, params);
            }
        })
    }

    function tick(func) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                if (func) func();
                $scope.$apply();
                res();
            })
        })
    }

    function checkEventHandler(eventHandler, action, check) {
        return new Promise((res, rej) => {
            eventHandlers[eventHandler] = (...params) => {
                check(...params);
                delete eventHandlers[eventHandler];
                res();
            }

            tick(() => {
                action();
            })
        })
    }

    function checkSecondaryEventHandler(api, eventHandler, action, check) {
        return new Promise((res, rej) => {
            api.on(eventHandler, (...params) => {
                check(...params);
                api.off(eventHandler);
                res();
            })

            tick(() => {
                action();
            })
        })
    }


    beforeEach(module('jfrog.ui.essentials'));

    beforeEach(inject((_JFrogSubRouter_, _$rootScope_, _$state_, _$timeout_, _$location_) => {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $state = _$state_;
        $timeout = _$timeout_;
        $location = _$location_;
        JFrogSubRouter = _JFrogSubRouter_;
    }));

    beforeEach(() => {
        eventHandlers = {};
    });

    it ('should initialize sub router, fire onInit event, and be in invalid state', (done) => {
        eventHandlers.onInit = () => {
            expect(subRouter.state).toEqual(null);
            done();
        }
        setupSubRouter();
        $scope.$apply();
    })

    it ('should switch states and update url when changing params', (done) => {
        eventHandlers.onInit = () => {
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
                subRouter.params.searchParam1 = 'quakwa';
                expect(subRouter.state).toEqual('state3');
            }))
            .then(() => tick(() => {
                expect($location.path()).toEqual('/base/path/momo/jojo/lala/');
                expect($location.search().searchParam1).toEqual('quakwa');
                subRouter.params.searchParam2 = 'blublu';
            }))
            .then(() => tick(() => {
                expect($location.search().searchParam2).toEqual('blublu');
                done();
            }))
        }
        setupSubRouter();
        $scope.$apply();
    })

    it ('should change params and switch states when changing changing url', (done) => {
        eventHandlers.onInit = () => {
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
            }))
            .then(() => tick(() => {
                $location.search({searchParam1: 456, searchParam2: 99776, shouldBeRemoved: 'blabla'});
                $scope.$apply();
                expect(subRouter.params.searchParam1).toEqual(456);
                expect(subRouter.params.searchParam2).toEqual(99776);
                expect(subRouter.params.shouldBeRemoved).toBeUndefined();
                done();
            }))
        }
        setupSubRouter();
        $scope.$apply();
    })

    it ('should fire state change events, both when changing params, and when changing url', (done) => {
        eventHandlers.onInit = () => {
            checkEventHandler('onStateChange', () => {
                subRouter.params.pathParam1 = 'momo';
            }, (oldState, newState) => {
                expect(oldState).toEqual(null);
                expect(newState).toEqual('state1');
                expect(subRouter.state).toEqual('state1');
            })
                .then(() => checkEventHandler('onStateChange', () =>{
                    subRouter.params.pathParam2 = 'lupo';
                }, (oldState, newState) => {
                    expect(oldState).toEqual('state1');
                    expect(newState).toEqual('state2');
                    expect(subRouter.state).toEqual('state2');
                }))
                .then(() => checkEventHandler('onStateChange', () =>{
                    subRouter.params.pathParam3 = 'rafa';
                }, (oldState, newState) => {
                    expect(oldState).toEqual('state2');
                    expect(newState).toEqual('state3');
                    expect(subRouter.state).toEqual('state3');
                }))
                .then(() => checkEventHandler('onStateChange', () =>{
                    $location.path('/base/path/momo/yaya');
                }, (oldState, newState) => {
                    expect(oldState).toEqual('state3');
                    expect(newState).toEqual('state2');
                    expect(subRouter.state).toEqual('state2');
                }))
                .then(() => checkEventHandler('onStateChange', () =>{
                    $location.path('/base/path/lasso');
                }, (oldState, newState) => {
                    expect(oldState).toEqual('state2');
                    expect(newState).toEqual('state1');
                    expect(subRouter.state).toEqual('state1');
                })
                .then(() => {
                    done();
                }))
        }
        setupSubRouter();
        $scope.$apply();
    });

    it ('should fire change from url events', (done) => {
        eventHandlers.onInit = () => {
            checkEventHandler('onChangeFromUrl', () => {
                $location.path('/base/path/momo/yaya');
            }, (oldParams, newParams) => {
                expect(_.isEqual(oldParams, {pathParam1: null, pathParam2: null, pathParam3: null, searchParam1: null, searchParam2: null})).toBeTrue();
                expect(_.isEqual(newParams, {pathParam1: 'momo', pathParam2: 'yaya', pathParam3: null, searchParam1: null, searchParam2: null})).toBeTrue();
                expect(subRouter.state).toEqual('state2');
            })
                .then(() => checkEventHandler('onChangeFromUrl', () => {
                    $location.path('/base/path/momo/yaya/dudu');
                }, (oldParams, newParams) => {
                    expect(_.isEqual(oldParams, {pathParam1: 'momo', pathParam2: 'yaya', pathParam3: null, searchParam1: null, searchParam2: null})).toBeTrue();
                    expect(_.isEqual(newParams, {pathParam1: 'momo', pathParam2: 'yaya', pathParam3: 'dudu', searchParam1: null, searchParam2: null})).toBeTrue();
                    expect(subRouter.state).toEqual('state3');
                }))
                .then(() => checkEventHandler('onChangeFromUrl', () => {
                    $location.search({searchParam1: 'fifa', searchParam2: 'fiba'});
                }, (oldParams, newParams) => {
                    expect(_.isEqual(oldParams, {pathParam1: 'momo', pathParam2: 'yaya', pathParam3: 'dudu', searchParam1: null, searchParam2: null})).toBeTrue();
                    expect(_.isEqual(newParams, {pathParam1: 'momo', pathParam2: 'yaya', pathParam3: 'dudu', searchParam1: 'fifa', searchParam2: 'fiba'})).toBeTrue();
                    expect(subRouter.state).toEqual('state3');
                }))
                .then(() => {
                    done();
                })
        }
        setupSubRouter();
        $scope.$apply();
    });

    it ('should fire invalid state event', (done) => {
        let resetState1 = () => checkEventHandler('onStateChange', () => {
            subRouter.params.pathParam1 = 'momo';
        }, (oldState, newState) => {
            expect(oldState).toEqual(null);
            expect(newState).toEqual('state1');
            expect(subRouter.state).toEqual('state1');
        })

        eventHandlers.onInit = () => {
            resetState1()
                .then(() => checkEventHandler('onInvalidState', () =>{
                    subRouter.params.pathParam1 = null
                }, (oldState, params) => {
                    expect(oldState).toEqual('state1');
                    expect(_.isEqual(params, {pathParam1: null, pathParam2: null, pathParam3: null, searchParam1: null, searchParam2: null})).toBeTrue();
                }))
                .then(() => resetState1())
                .then(() => checkEventHandler('onInvalidState', () =>{
                    subRouter.params.pathParam1 = null;
                    subRouter.params.pathParam2 = 'momo';
                }, (oldState, params) => {
                    expect(oldState).toEqual('state1');
                    expect(_.isEqual(params, {pathParam1: null, pathParam2: 'momo', pathParam3: null, searchParam1: null, searchParam2: null})).toBeTrue();
                }))
                .then(() => resetState1())
                .then(() => checkEventHandler('onInvalidState', () => {
                    $location.path('/base/path/');
                }, (oldState, params) => {
                    expect(oldState).toEqual('state1');
                    expect(_.isEqual(params, {pathParam1: null, pathParam2: null, pathParam3: null, searchParam1: null, searchParam2: null})).toBeTrue();
                }))
                .then(() => resetState1())
                .then(() => checkEventHandler('onInvalidState', () =>{
                    $location.path('/base/path/rojo/jojo');
                    setTimeout(()=>{
                        subRouter.params.pathParam1 = null;
                        $scope.$apply();
                    })
                }, (oldState, params) => {
                    expect(oldState).toEqual('state2');
                    expect(_.isEqual(params, {pathParam1: null, pathParam2: 'jojo', pathParam3: null, searchParam1: null, searchParam2: null})).toBeTrue();
                }))
                .then(() => {
                    done();
                })
        }
        setupSubRouter();
        $scope.$apply();
    });

    it ('should fire secondary registered event listeners', (done) => {
        eventHandlers.onInit = () => {
            let activeRouter = JFrogSubRouter.getActiveRouter();
            checkSecondaryEventHandler(activeRouter, 'state.change', () => {
                $location.path('/yaya')
            }, (oldState, newState) => {
                expect(oldState).toEqual(null);
                expect(newState).toEqual('state1');
            })
                .then(() => checkSecondaryEventHandler(activeRouter, 'params.change', () => {
                    $location.path('/yaya/yuki')
                }, (oldParams, newParams) => {
                    expect(oldParams.pathParam2).toEqual(null);
                    expect(newParams.pathParam2).toEqual('yuki');
                }))
                .then(() => {
                    done();
                })

        }
        setupSubRouter();
        $scope.$apply();
    });

    it ('should clean when parent scope is destroyed', () => {
        setupSubRouter();
        $scope.$apply();

        expect(JFrogSubRouter.$config).toBeObject();
        $scope.$destroy();
        expect(JFrogSubRouter.$config).toBeNull();
    });
});