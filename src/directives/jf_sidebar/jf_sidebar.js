class jfSidebarController {

    constructor($scope, $state, $timeout, $interval, $window, $rootScope, JFrogEventBus) {
        this.subMenuWidth = this.defaultSubMenuWidth || this.openAdminSize || '900px';
        this.defaultSubWidth = this.subMenuWidth;

        this.defaultSubMenuId = this.defaultSubMenuId || 'admin';

        $rootScope.jfSidebar = this;
        if (!this.driver) {
            console.error('jf-sidebar: No driver is provided');
            this.driver = {};
        }

        this.legacyAdminMenuItems = this.driver.getAdminMenuItems ? this.driver.getAdminMenuItems() : [];
        if (this.driver.setMenu) this.driver.setMenu(this);
        if (this.driver.registerEvents) this.driver.registerEvents();
        this.refreshMenu();

        this.currentTab = "Home";
        this.$state = $state;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.$window = $window;
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

            // Ctrl + right arrow to open the default sub menu
            if (e.keyCode === 39 && e.ctrlKey && e.altKey && $('.sub-menu').length) {
                this.$timeout(() => {
                    let defaultItem = _.find(this.menuItems, {id: this.defaultSubMenuId});
                    if (defaultItem) this._setExtendedMenu(defaultItem);
                    this.openSubMenu();
                });
                e.preventDefault();

            }

            // ESC click or Ctrl+left to close default sub menu       TODO: Fix the function to work
            if ((e.keyCode === 27 || (e.keyCode === 37 && e.ctrlKey && e.altKey)) && this.menu.width === this.subMenuWidth && $('.sub-menu').length > 0) {
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

        if (this.menu.width === this.subMenuWidth && $('.menu-item:hover').length && $('a.menu-item.extended-item:hover').length < 1) {
            if (!angular.isDefined(this.closeSubMenuDelay) && !$('.sub-menu:hover').length) {
                this.closeSubMenuDelay = this.$timeout(() => {
                    this.closeSubMenu();
                    delete this.closeSubMenuDelay;
                }, 300);
            }

        } else if (this.menu.width != '200px' && !$('.pin-menu').is(':hover') && ($('.sub-menu:hover').length < 1)) {     // if menu isn't open
            if (!angular.isDefined(this.openMenu)) {
                this.openMenu = this.$timeout(() => {
                    let widthToOpen = ($('.sub-menu').length > 0 && $('a.menu-item.extended-item:hover').length) ? this.subMenuWidth : '200px';
                    if (($('.sub-menu:hover').length || $('.menu-item.extended-item:hover').length) && angular.isDefined(this.openMenu)) {
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
        if (this.menu.width != this.subMenuWidth) {     // if sub menu menu isn't open
            this._updateMenuObject(this.defaultWidth(),'.3s')
        }
        this.closeSubMenu();
        this._openMenuStop();
        this._subMenuDelayStop();
    }

    subMenuOver() {
        if (angular.isDefined(this.subMenuItemDelayTimer)) {
            this.$timeout.cancel(this.subMenuItemDelayTimer);
            delete this.subMenuItemDelayTimer;
        }

        if (angular.isDefined(this.closeSubMenuDelay)) {
            this.$timeout.cancel(this.closeSubMenuDelay);
            delete this.closeSubMenuDelay;
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
        this.legacyAdminMenuItems = this.driver.getAdminMenuItems ? this.driver.getAdminMenuItems() : [];
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
        if (this.subMenuCloseDelay) {
            this.$timeout.cancel(this.subMenuCloseDelay);
            delete this.subMenuCloseDelay;
        }

        if (!item.children ) {
//            delete this.openSub;
            this.closeSubMenu(0,true);
            if (this.menu.width === '55px' || this.menu.width === '200px') {
                this._openMenuStop();
                this._subMenuDelayStop();
            }
            if (!item.isDisabled) this.$timeout(()=>this.goToState(item),20);
        } else if (item.children) {
            if (!this._isSubMenuOpen()) {
                this._setExtendedMenu(item);
                this.openSubMenu();
            }
            else {
                this.closeSubMenu(0,true,true);
                this._subMenuDelayStop();
                if (this.openSub !== item) {
                    this.$timeout(()=>{this.itemClick(item)},500)
                }
            }
        }
    }
    _setExtendedMenu(item) {
        if (!item) return;
        if (item.children === true && this.legacyAdminMenuItems) { //backward compatibility for single extended ('admin') menu
            this.subMenuItems = this.legacyAdminMenuItems;
            this.subMenuWidth = this.defaultSubWidth;
            this.openSub = item;
        }
        else if (item.children) {
            this.subMenuItems = item.children;
            this.subMenuWidth = item.subMenuWidth || this.defaultSubWidth;
            this.openSub = item;
        }
    }
    openSubMenu(delay = false) {
        if (this.subMenuCloseDelay) {
            this.$timeout.cancel(this.subMenuCloseDelay);
            delete this.subMenuCloseDelay;
        }

        if ($('.sub-menu').length > 0) {
            this._openMenuStop();
            this._subMenuDelayStop();

            if ($(':focus').length && $(':focus')[0].id != 'admin' && $(':focus')[0].id != 'menuSearchQuery') {
                this.currentFocus = $(':focus');
            }

            if (delay && !angular.isDefined(this.subMenuDelay)) {
                this.subMenuDelay = this.$timeout(() => {
                    this.openSubMenu();
                    this._setSubMenuFocus();
                    this._subMenuDelayStop();
                    return;
                }, 2000)
            } else {
                if (!this.skip && this.menu.width !== this.subMenuWidth) {
                    this._updateMenuObject(this.subMenuWidth,'0.3s','0s');
                    this._setSubMenuFocus();
                    if(angular.isDefined(this.subMenuDelay)) {
                        this._subMenuDelayStop();
                    }
                }

            }
            this._updateTabIndex();
        }

    }

    onMouseOverSimpleItem(item) {
        this.closeSubMenu(1800,true,true);
    }

    onMouseOverExtendedItem(item,delay = true) {
        if (!this._isSubMenuOpen()) {
            this._setExtendedMenu(item);
            this.openSubMenu(delay);
        }
        else {
            if (this.openSub !== item) {
                this.closeSubMenu(0,true,true);
                this._subMenuDelayStop();
                this.$timeout(()=>{this.onMouseOverExtendedItem(item,false)},500)
            }
            else {
                this.openSubMenu(true);
            }
        }
    }

    onMouseLeaveExtendedItem(item) {
        this._subMenuDelayStop();
        this.subMenuItemDelay = true;
        this.closeSubMenu(1800,true,true);
    }

    _isSubMenuOpen() {
        return $('#jf-main-nav').css('width') === this.subMenuWidth;
    }

    clickOffMenu() {
        if ($('.sub-menu').length > 0
            && !$('.menu-item:hover').length
            && (this.menu.width != '55px' || (!this.pinMenuStatus && this.menu.width != '200px'))) { // TODO: Fix this rule. shuldn't happen if menu is 55px or 200 with pinned on
            if (this.menu.width != '55px' && !$('.sub-menu:hover').length) {
                this._updateMenuObject(this.defaultWidth(), '.3s');
                this.menuSearchQuery = '';
                this._updateTabIndex();
            }
        }
    }
    closeSubMenu(delay, force = false, expand = false) {
        if (delay) {
            if (this.subMenuCloseDelay) {
                this.$timeout.cancel(this.subMenuCloseDelay);
                delete this.subMenuCloseDelay;
            }
            this.subMenuCloseDelay = this.$timeout(()=>{
                if (this.subMenuCloseDelay) {
                    this.$timeout.cancel(this.subMenuCloseDelay);
                    delete this.subMenuCloseDelay;
                }
                this.closeSubMenu(0,force,expand);
            },delay)
            return;
        }

        if (!force && ($('.sub-menu:hover').length || $('.menu-item.extended-item:hover').length || ($('.sub-menu').find('a').is(':focus') || ($('#menuSearchQuery').is(':focus') && $('#menuSearchQuery').val().length > 0)))) {

            return;
        } else if (this.subMenuItemDelay) {
            this.subMenuItemDelayTimer = this.$timeout(() => {
                this.subMenuItemDelay = false;
                delete this.subMenuItemDelayTimer;
                if (!$('.sub-menu:hover').length) {
                    this.closeSubMenu(delay,force,expand);
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
    _subMenuDelayStop() {
        this.$timeout.cancel(this.subMenuDelay);
        delete this.subMenuDelay;
    }
    _setSubMenuFocus() {
        if (!$('.sub-menu:hover').length) {
            $('#menuSearchQuery').focus();
            $('#jf-main-nav').scrollLeft(0);
        }

    }

    _updateTabIndex() {
        if (this.menu.width != this.subMenuWidth) {
            $('.sub-menu').find('a,input').attr('tabindex', -1);
            $('.sub-menu').find('a,input').blur();
        } else {
            let highlighted = $('.sub-menu').find('a.highlight');
            if (highlighted.length) {
                $('.sub-menu').find('input').removeAttr('tabindex');
                $('.sub-menu').find('a.highlight').removeAttr('tabindex');
                $('.sub-menu').find('a:not(.highlight)').attr('tabindex', -1);

            }
            else {
                $('.sub-menu').find('a,input').removeAttr('tabindex');
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
    subMenuItemClick(subItem) {
        this.menuSearchQuery = '';
        this._updateMenuObject(this.defaultWidth(),'.3s');
        this._updateTabIndex();
        this.skip = true;
        this.$timeout(() => {
            this.skip = false;
        }, 400);

        if (this.driver.onBeforeStateSwitch) this.driver.onBeforeStateSwitch(subItem);
        this.$state.go(subItem.state, subItem.stateParams);

    }

    navigateInMenu(e) {
        let key = e.keyCode;
        let $allHighlighted = $('.sub-menu').find('.highlight');
        let $allFocusableItems = $('.sub-menu').find('a:focusable');

        switch (key) {
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
                        $('.sub-menu').find('a').first(':focusable').focus();
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
            openAdminSize: '@?', //left here for backward compatibility, use defaultSubMenuWidth
            defaultSubMenuWidth: '@?',
            noSearchBox: '@?',
            defaultSubMenuId: '@'
        },
        controller: jfSidebarController,
        bindToController: true,
        controllerAs: 'jfSidebar',
        templateUrl: 'directives/jf_sidebar/jf_sidebar.html'
    }
}