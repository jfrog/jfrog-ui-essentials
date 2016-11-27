class jfSidebarController {

    constructor($scope, $state, $timeout, $interval, $window, $rootScope, JFrogEventBus) {
        if (!this.openAdminSize) {
            $timeout(()=>this.openAdminSize = '900px');
        }
        $rootScope.jfSidebar = this;
        if (!this.driver) {
            console.error('jf-sidebar: No driver is provided');
            this.driver = {};
        }
        if (this.driver.setMenu) this.driver.setMenu(this);
        if (this.driver.registerEvents) this.driver.registerEvents();
        this.refreshMenu();

        this.currentTab = "Home";
        this.$state = $state;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.$window = $window;
        this.adminMenuItems = this.driver.getAdminMenuItems ? this.driver.getAdminMenuItems() : [];
        this.JFrogEventBus = JFrogEventBus;
        this.EVENTS = JFrogEventBus.getEventsDefinition();
        this.pinMenuStatus = JSON.parse(localStorage.pinMenu || "false");

        this.currentFocus = $(':focus');
        this.skip = false;

        this.menu = {
            "transition-duration" : ".3s"
        };

        if (this.driver.getFooterData) this.driver.getFooterData().then(footerData => this.footerData = footerData);


        $scope.$on('$destroy',()=>{
            $('body').off('keydown');

        })

        this._init();

    }


    _init() {
        this.pinMenuStatus ? this.menu.width = '200px' : this.menu.width = '55px';
        this.pinMenuStatus ? this.menu.transitionDelay = '.2s' : this.menu.transitionDelay = '.3s';

        $('body').on('keydown', (e) => {

            if (this.driver.onKeyDown) this.driver.onKeyDown(e);

            // Ctrl + right arrow to open the admin menu
            if (e.keyCode === 39 && e.ctrlKey && e.altKey && $('.admin-menu').length) {
                this.$timeout(() => {
                    this.openAdminMenu();
                });
                e.preventDefault();

            }

            // ESC click or Ctrl+left to close admin menu       TODO: Fix the function to work
            if ((e.keyCode === 27 || (e.keyCode === 37 && e.ctrlKey && e.altKey)) && this.menu.width === this.openAdminSize && $('.admin-menu').length > 0) {
                this.$timeout(() => {
                    this.menuSearchQuery = '';
                    $('#menuSearchQuery').blur();
                    this.menu.width = this.defaultWidth();
                    this._updateTabIndex();
                });
                e.preventDefault();
            }
        });
    }

    mouseOverMenu() {
        if (this.mouseIsOver) return;
        this.mouseIsOver = true;

        if (this.menu.width === this.openAdminSize && $('.menu-item:hover').length && $('a#admin:hover').length < 1) {
            if (!angular.isDefined(this.closeAdminDelay) && !$('.admin-menu:hover').length) { // TODO:
                this.closeAdminDelay = this.$timeout(() => {
                    this.closeAdminMenu();
                    delete this.closeAdminDelay;
                }, 300);
            }

        } else if (this.menu.width != '200px' && !$('.pin-menu').is(':hover') && ($('.admin-menu:hover').length < 1)) {     // if menu isn't open
            if (!angular.isDefined(this.openMenu)) {
                this.openMenu = this.$timeout(() => {
                    let widthToOpen = ($('.admin-menu').length > 0 && $('a#admin:hover').length) ? this.openAdminSize : '200px';
                    if (($('.admin-menu:hover').length || $('#admin:hover').length) && angular.isDefined(this.openMenu)) {
                            this.$timeout.cancel(this.openMenu);
                            delete this.openMenu;
                            return;
                    }
                    this._updateMenuObject(widthToOpen,'.3s','0s');
                },2000);
            }
        }
    }

    mouseLeaveMenu() {
        this.mouseIsOver = false;
        if (this.menu.width != this.openAdminSize) {     // if admin menu isn't open
            this._updateMenuObject(this.defaultWidth(),'.3s')
        }
        this.closeAdminMenu();
        this._openMenuStop();
        this._adminMenuDelayStop();
    }

    menuAdminOver() {
        if (angular.isDefined(this.adminMenuItemDelayTimer)) {
            this.$timeout.cancel(this.adminMenuItemDelayTimer);
            delete this.adminMenuItemDelayTimer;
        }

        if (angular.isDefined(this.closeAdminDelay)) {
            this.$timeout.cancel(this.closeAdminDelay);
            delete this.closeAdminDelay;
        }

    }




    _updateMenuObject(width,duration = '0s',delay = '0s') {
        this.menu = {
            "width" : width,
            "transition-duration" : duration,
            "transition-delay" : delay
        }
    }






    isCurrentTab(tab) {
        return this.currentTab === tab.label;
    }

    setCurrentTab(tab) {
        this.currentTab === tab.label ? this.currentTab = '' : this.currentTab = tab.label;
    }

    refreshMenu() {
        this.menuItems = this._getMenuItems();
        this.adminMenuItems = this.driver.getAdminMenuItems ? this.driver.getAdminMenuItems() : [];
    }

    goToState(item) {
        if (this.driver.onBeforeStateSwitch) this.driver.onBeforeStateSwitch(item);

        this.$state.go(item.state, item.stateParams);
    }

    _getMenuItems() {
        return this.driver.getMenuItems ? this.driver.getMenuItems() : [];
    }

    defaultWidth() {
        return this.pinMenuStatus ? '200px' : '55px';
    }
    pinMenu() {
        this.pinMenuStatus = !this.pinMenuStatus;
        localStorage.pinMenu = this.pinMenuStatus;
        if (angular.isDefined(this.openMenu)) {
            this._openMenuStop();
        }
        this.menu.transitionDelay = '0s';
        this.menu.width = this.defaultWidth();
        //if (!this.pinMenuStatus) {
        //    // close menu - [block screen?]
        //}
        this._trackResize();
    }

    _trackResize() {
        let origWidth = parseInt($('#jf-content').css('width'));
        let lastWidth = origWidth;
        let noChangeLoops = 0;
        let resizeEvent = document.createEvent("Event");
        resizeEvent.initEvent("resize", false, true);
        let intervalPromise = this.$interval(()=>{
            let currWidth = parseInt($('#jf-content').css('width'));
            if (currWidth === lastWidth) noChangeLoops++;
            else noChangeLoops=0;
            if (noChangeLoops >= 20) this.$interval.cancel(intervalPromise);

            lastWidth = currWidth;

            this.$timeout(() => {
                try {
                    window.dispatchEvent(new Event('resize'));
                }
                catch (e) {
                    window.dispatchEvent(resizeEvent);
                }
                this.JFrogEventBus.dispatch(this.EVENTS.SIDEBAR_SIZE_CHANGE);
            });
        },1)
    }
    itemClick(item) {
        if (this.adminMenuCloseDelay) {
            this.$timeout.cancel(this.adminMenuCloseDelay);
            delete this.adminMenuCloseDelay;
        }

        if (!item.children ) {
            this.closeAdminMenu(0,true);
            if (this.menu.width === '55px' || this.menu.width === '200px') {
                this._openMenuStop();
                this._adminMenuDelayStop();
            }
            if (!item.isDisabled) this.$timeout(()=>{
                if (this.$state && !this.$state.current.abstract) {
                    this.goToState(item);
                }
                else {
                    if (this.externalGotoRoute) this.externalGotoRoute({$event:{state: item.state, params: item.stateParams}});
                }
            },20);

        } else if (item.children) {
            if (!this._isAdminOpen()) {
                this.openAdminMenu();
            }
            else {
                this.closeAdminMenu(0,true,true);
                this._adminMenuDelayStop();
            }
        }
    }
    openAdminMenu(delay = false) {
        if (this.adminMenuCloseDelay) {
            this.$timeout.cancel(this.adminMenuCloseDelay);
            delete this.adminMenuCloseDelay;
        }

        if ($('.admin-menu').length > 0) {
            this._openMenuStop();
            this._adminMenuDelayStop();

            if (!$('#menuSearchQuery').is(':focus') || $('.menu-item').is(':focus')) {
                this.currentFocus = $(':focus');
            }

            if (delay && !angular.isDefined(this.adminMenuDelay)) {
                this.adminMenuDelay = this.$timeout(() => {
                    this.openAdminMenu();
                    this._setAdminMenuFocus();
                    this._adminMenuDelayStop();
                    return;
                }, 2000)
            } else {
                if (!this.skip && this.menu.width !== this.openAdminSize) {
                    this._updateMenuObject(this.openAdminSize,'0.3s','0s');
                    this._setAdminMenuFocus();
                    if(angular.isDefined(this.adminMenuDelay)) {
                        this._adminMenuDelayStop();
                    }
                }

            }
            this._updateTabIndex();
        }

    }

    _isAdminOpen() {
        return $('#jf-main-nav').css('width') === this.openAdminSize;
    }

    clickOffMenu() {
        if ($('.admin-menu').length > 0
            && !$('.menu-item:hover').length
            && (this.menu.width != '55px' || (!this.pinMenuStatus && this.menu.width != '200px'))) { // TODO: Fix this rule. shuldn't happen if menu is 55px or 200 with pinned on
            if (this.menu.width != '55px' && !$('.admin-menu:hover').length) {
                this._updateMenuObject(this.defaultWidth(), '.3s');
                this.menuSearchQuery = '';
                this._updateTabIndex();
            }
        }
    }
    closeAdminMenu(delay, force = false, expand = false) {
        if (delay) {
            if (this.adminMenuCloseDelay) {
                this.$timeout.cancel(this.adminMenuCloseDelay);
                delete this.adminMenuCloseDelay;
            }
            this.adminMenuCloseDelay = this.$timeout(()=>{
                if (this.adminMenuCloseDelay) {
                    this.$timeout.cancel(this.adminMenuCloseDelay);
                    delete this.adminMenuCloseDelay;
                }
                this.closeAdminMenu(0,force,expand);
            },delay)
            return;
        }

        if (!force && ($('.admin-menu:hover').length || $('#admin:hover').length || ($('.admin-menu').find('a').is(':focus') || ($('#menuSearchQuery').is(':focus') && $('#menuSearchQuery').val().length > 0)))) {

            return;
        } else if (this.adminMenuItemDelay) {
            this.adminMenuItemDelayTimer = this.$timeout(() => {
                this.adminMenuItemDelay = false;
                delete this.adminMenuItemDelayTimer;
                if (!$('.admin-menu:hover').length) {
                    this.closeAdminMenu(delay,force,expand);
                }
            }, 100);
            return;
        } else {
            if (expand && $('#jf-main-nav:hover').length) {
                this.menu.width = '200px'
            } else {
                this.menu.width = this.defaultWidth();
            }

            if (this.currentFocus.length) this.currentFocus[0].focus();
            $('#menuSearchQuery').blur();
            $('.masonry').scrollTop(0);
            this.menuSearchQuery = '';
            this._updateTabIndex();
        }

    }

    _openMenuStop() {
        this.$timeout.cancel(this.openMenu);
        delete this.openMenu;
    }
    _adminMenuDelayStop() {
        this.$timeout.cancel(this.adminMenuDelay);
        delete this.adminMenuDelay;
    }
    _setAdminMenuFocus() {
        if (!$('.admin-menu:hover').length) {
            $('#menuSearchQuery').focus();
            $('#jf-main-nav').scrollLeft(0);
        }

    }

    _updateTabIndex() {
        if (this.menu.width != this.openAdminSize) {
            $('.admin-menu').find('a,input').attr('tabindex', -1);
            //$('.admin-menu').find('a,input').blur();
        } else {
            let highlighted = $('.admin-menu').find('a.highlight');
            if (highlighted.length) {
                $('.admin-menu').find('input').removeAttr('tabindex');
                $('.admin-menu').find('a.highlight').removeAttr('tabindex');
                $('.admin-menu').find('a:not(.highlight)').attr('tabindex', -1);

            }
            else {
                $('.admin-menu').find('a,input').removeAttr('tabindex');
            }
        }
        $('#jf-main-nav').scrollLeft(0);
    }

    searchHighlightCheck(menuItem) {
        if (this.menuSearchQuery) {
            let string = menuItem.toLowerCase().replace(/ /g,'');
            let searchstring = this.menuSearchQuery.toLowerCase().replace(/ /g,'');

            if (_.includes(string, searchstring)) {
                return true;
            } else {
                return false;
            }

        }
    }

    checkForSingleChoice() {
        $('#jf-main-nav').scrollLeft(0);
        this.$timeout(() => {
            $('.single-choice').removeClass('single-choice');
            let elem = $('.masonry').find('.highlight');
            if (elem.length == 1) {
                elem.addClass('single-choice');
            }
        }, 50);
    }

    chooseSingleChoice() {
        let elem = $('.single-choice');
        if (elem.length) {
            if (this.driver.onBeforeStateSwitch) this.driver.onBeforeStateSwitch({state: elem.data('state'), stateParams: elem.data('params')});
            this.$state.go(elem.data('state'), elem.data('params'));
            this.menuSearchQuery = '';
            this._updateMenuObject(this.defaultWidth(),'.3s');
            this._updateTabIndex();
        } else {
            return false;
        }
    }
    adminItemClick(subItem) {
        this.menuSearchQuery = '';
        this._updateMenuObject(this.defaultWidth(),'.3s');
        this._updateTabIndex();
        this.skip = true;
        this.$timeout(() => {
            this.skip = false;
        }, 400);

        if (this.driver.onBeforeStateSwitch) this.driver.onBeforeStateSwitch(subItem);

        if (this.$state && !this.$state.current.abstract) {
            this.$state.go(subItem.state, subItem.stateParams);
        }
        else {
            if (this.externalGotoRoute) this.externalGotoRoute({$event: {state: subItem.state, params:subItem.stateParams}})
        }

    }

    navigateInMenu(e) {
        let key = e.keyCode;
        let $allHighlighted = $('.admin-menu').find('.highlight');
        let $allFocusableItems = $('.admin-menu').find('a:focusable');

        switch (key) {
            //case 13:    // ENTER
            //    this.adminItemClick2();
            //    break;
            case 38:    // UP
                if ($(e.currentTarget).is(':input')) {
                    return;
                }
                if (!$('.highlight').length) {
                    if (!$allFocusableItems.length) {
                        // if no available choices at all (not-active) return
                        return;
                    } else {
                        $allFocusableItems.eq($.inArray($(':focus')[0], $allFocusableItems) - 1).focus();
                    }

                } else {
                    // if highlighted
                    $allHighlighted.eq($.inArray($('.highlight:focus')[0],$allHighlighted) - 1).focus();
                }
                break;
            case 40:        // DOWN
                if ($(e.currentTarget).is(':input')) {
                    if ($allHighlighted.length) {
                        $allHighlighted[0].focus();
                    } else {
                        $('.admin-menu').find('a').first(':focusable').focus();
                    }
                } else {
                    if (!$('.highlight').length) {
                        if (!$allFocusableItems.length) {
                            // if no available choices at all (not-active) return
                            return;
                        } else if ($.inArray($(':focus')[0], $allFocusableItems) === $allFocusableItems.length -1) {
                            // if last item go to first item
                            $allFocusableItems[0].focus();
                        } else {
                            $allFocusableItems.eq($.inArray($(':focus')[0], $allFocusableItems) + 1).focus();
                        }

                    } else {
                        // if highlighted
                        if ($.inArray($('.highlight:focus')[0],$allHighlighted) === $allHighlighted.length -1) {
                            $allHighlighted[0].focus();
                        } else {
                            $allHighlighted.eq($.inArray($('.highlight:focus')[0],$allHighlighted) + 1).focus();
                        }
                    }
                }
                break;
            case 8: //Backspace
                if (this.focusedElement && !$('#menuSearchQuery').is(':focus')) {
                    e.preventDefault();
                    return;
                }
                break;
        }

    }


    isCurrentItem(subItem) {
        let result = _.contains(this.$state.current.name, subItem.state);
        if (result && subItem.stateParams) {
            let relevantParams = _.pick(this.$state.params, Object.keys(subItem.stateParams));
            result = angular.equals(relevantParams, subItem.stateParams);
        }
        return result;
    }

}

export function jfSidebar() {
    return {
        scope: {
            driver: '=',
            footerTemplate: '@',
            openAdminSize: '@?',
            noSearchBox: '@?',
            externalGotoRoute: '&?'
        },
        controller: jfSidebarController,
        bindToController: true,
        controllerAs: 'jfSidebar',
        templateUrl: 'directives/jf_sidebar/jf_sidebar.html'
    }
}