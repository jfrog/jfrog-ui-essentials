//import EVENTS from '../../constants/artifacts_events.constants';

class jfTabsController {
	/* @ngInject */
    constructor($scope, $state, $timeout, $element, $stateParams, JFrogEventBus, $rootScope) {
        this.$scope = $scope;
        this.$element = $element;
        this.stateParams = $stateParams;
        this.$timeout = $timeout;
        this.state = $state;
        this.tabsCollapsed = [];
        this.JFrogEventBus = JFrogEventBus;
        this.$rootScope = $rootScope;

        this.EVENTS = JFrogEventBus.getEventsDefinition();

        this.currentTab = {
            name: this.stateParams.tab
        };
        this._registerEvents();
        this.initTabs();
    }

    initTabs() {
        // wait for the element to render and calculate how many tabs should display
        this.$timeout(() => {
            this._calculateTabsSize();

            let tab = this._getTab(this.currentTab);
            if (!tab || tab.isVisible === false || tab.isDisabled) {
                // If current tab doesn't exist on the tabs list at all - select the first tab
                let firstValidTab = _.findIndex(this.tabs, (tab) => {return tab.isVisible !== false && !tab.isDisabled});

                if (firstValidTab !== -1) this.onClickTab(this.tabs[firstValidTab], false);
            }
            else {
                // Otherwise - make sure it's visible
                this._ensureTabVisible(this.currentTab);
            }
        });
    }

    _calculateTabsSize() {
        // wait for the element to render and calculate how many tabs should display
        let visibleTabs = _.filter(this.tabs, (tab) => {return tab.isVisible !== false});
        let container = $(this.$element).children().eq(0);
        let containerWidth = container.width();
        let tabWidth = this.getTabWidthForStyle().endsWith('px') ? parseInt(this.tabWidth) : containerWidth * parseInt(this.tabWidth)/100;
        let containerMargin = parseInt(this.containerMargin);

        let expanderWidth = $('.action-expand').eq(0).outerWidth(true);
        let tabsToTake = Math.floor((containerWidth - expanderWidth - containerMargin) / tabWidth);

        this.tabsCollapsed = _.takeRight(visibleTabs, visibleTabs.length - tabsToTake);
        this.tabsVisible = _.take(visibleTabs, tabsToTake);
    }

    _registerEvents() {
        this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.TABS_REFRESH, () => this.initTabs());
        // URL changed (like back button / forward button / someone input a URL)
        this.JFrogEventBus.registerOnScope(this.$scope, this.EVENTS.TABS_URL_CHANGED, (stateParams) => {
            this.currentTab = {name: stateParams.tab};
        });

        let unwatch = this.$scope.$watch('jfTabs.tabs',(newVal,oldVal)=>{
            this._calculateTabsSize();
        },true);

	    let stateChangeListner = this.$rootScope.$on('$stateChangeSuccess', (e, toState, toParams, fromState, fromParams) => {
		    toState.tabChange = false;
	    });

        $(window).on('resize.tabs', () => {
            this.initTabs();
            this.$scope.$digest();
        });
        this.$scope.$on('$destroy', () => {
            $(window).off('resize.tabs');
            unwatch();
	        stateChangeListner();
        });

    }

    onClickTab(tab, tabChange) {
        // if the tab is in the more section replace it
        // with the last tab in the main tabs.
        if ((this.onTabChange({tab:tab}) === false) || tab.isDisabled) {
            return;
        }
        this._ensureTabVisible(tab);
        this.state.go(this.state.current, {tab: tab.name},{notify: false});
        this.currentTab.name = tab.name;

	    this.state.current.tabChange = tabChange;
    }

    _ensureTabVisible(tab) {
        let collapsedTab = this._getCollapsedTab(tab);
        if (!collapsedTab) return;

        // Replace between collapsedTabs & visibleTabs:
        var collapsedTabIndex = this.tabsCollapsed.indexOf(collapsedTab)
        var tabToReplace = this.tabsVisible[this.tabsVisible.length - 1]

        if (!tabToReplace) return;

        this.tabsCollapsed[collapsedTabIndex] = tabToReplace;
        this.tabsVisible[this.tabsVisible.length - 1] = collapsedTab;
    }

    isActiveTab(tab) {
        return tab.name === this.currentTab.name;
    }

    _getTab(tab) {
        let currentTab = _.findWhere(this.tabs, {name: tab.name});
        return currentTab;
    }

    _getCollapsedTab(tab) {
        return _.findWhere(this.tabsCollapsed, {name: tab.name})
    }

    getTabWidthForStyle() {
        return this.tabWidth.endsWith('%') ? this.tabWidth : (this.tabWidth.endsWith('px') ? this.tabWidth : this.tabWidth + 'px');
    }

    hasClass(obj) {
        if (obj && obj.class)
            return true;
    }
}

export function jfTabs() {
    return {
        scope: {
            tabs: '=',
            dictionary: '=',
            onTabChange: '&',
            tabWidth: '@',
            containerMargin: '@'
        },
        transclude: true,
        controller: jfTabsController,
        controllerAs: 'jfTabs',
        templateUrl: 'directives/jf_tabs/jf_tabs.html',
        bindToController: true
    }
}