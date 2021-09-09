<template>
  <div class="jf-tabs">
    <ul class="nav nav-tabs">
      <li
        v-for="(tab,index) in tabsVisible"
        :key="index"
        :class="{active:isActiveTab(tab), disabled:tab.isDisabled, [tab.class] : hasClass(tab)}"
        class="jf-tabs-tab-header"
        :style="{width: getTabWidthForStyle()}"
        :jf-disable-feature=" tab.feature "
      >
        <a
          style="z-index: 999999"
          @click.prevent="onClickTab(tab, true)"
        >
          <div
            v-jf-tooltip-on-overflow
            class="jf-tab-header-container"
          ><span>{{ dictionary[tab.name] }}</span>
          </div>
        </a>
      </li>
      <li
        v-show="tabsCollapsed.length"
        class="action-expand"
      >
        <span
          v-click-outside="closeDropdown"
          class="dropdown"
          :class="{ open: isDropdownOpen }"
        >
          <a
            href="#"
            class="dropdown-toggle nav-tabs-more"
            @click.prevent="isDropdownOpen = !isDropdownOpen"
          ><i class="icon-arrow" /></a>
          <ul class="dropdown-menu dropdown-menu-right dropdown-container text-left">
            <li
              v-for="(tab, index) in tabsCollapsed"
              :key="index"
              class="dropdown-item"
              :class="{[tab.class] : hasClass(tab)}"
              :jf-disable-feature=" tab.feature "
            >
              <a
                v-jf-tooltip-on-overflow
                @click.prevent="onClickTab(tab, true)"
              ><span>{{ dictionary[tab.name] }}</span></a>
            </li>
          </ul>
        </span>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
    export default {
        name: 'JfTabs',
        props: [
            'tabs',
            'dictionary',
            'tabWidth',
            'containerMargin',
            'activeTab'
        ],
        'jf@inject': [
            'JFrogEventBus',
            '$scope'
        ],
        data() {
            return {
                tabsVisible: null,
                tabsCollapsed: [],
                isDropdownOpen: false,
                currentTab: {
                    name: null
                },
                tabwidth: this.tabWidth || "100"
            };
        },
        watch: {
            activeTab() {
                this.currentTab.name = this.activeTab;
            }
        },
        created() {
            this.stateParams = this.$route.query;
            this.EVENTS = this.JFrogEventBus.getEventsDefinition();
            this.currentTab.name = this.stateParams.activeTab || this.activeTab;
        },
        mounted() {
            this._registerEvents();
            this.initTabs();
        },
        beforeDestroy() {
            $(window).off('resize.tabs');
            this.unwatch();
            this.stateChangeListener();
        },
        methods: {
            initTabs() {
                // wait for the element to render and calculate how many tabs should display
                setTimeout(() => {
                    this._calculateTabsSize();

                    let tab = this._getTab(this.currentTab);
                    if (!tab || tab.isVisible === false || tab.isDisabled) {
                        // If current tab doesn't exist on the tabs list at all - select the first tab
                        let firstValidTab = _.findIndex(this.tabs, tab => {
                            return tab.isVisible !== false && !tab.isDisabled;
                        });

                        if (firstValidTab !== -1)
                            this.onClickTab(this.tabs[firstValidTab], false);
                    } else {
                        // Otherwise - make sure it's visible
                        this._ensureTabVisible(this.currentTab);
                    }
                });
            },
            _calculateTabsSize() {
                // wait for the element to render and calculate how many tabs should display
                let visibleTabs = _.filter(this.tabs, tab => {
                    return tab.isVisible !== false;
                });
                let container = $(this.$el).children().eq(0);
                let containerWidth = container.width();
                let tabWidth = this.getTabWidthForStyle().endsWith('px') ? parseInt(this.tabwidth) : containerWidth * parseInt(this.tabwidth) / 100;
                let containerMargin = parseInt(this.containerMargin);

                let expanderWidth = $('.action-expand').eq(0).outerWidth(true);
                let tabsToTake = Math.floor((containerWidth - expanderWidth - containerMargin) / tabWidth);

                this.tabsCollapsed = _.takeRight(visibleTabs, visibleTabs.length - tabsToTake);
                this.tabsVisible = _.take(visibleTabs, tabsToTake);
            },
            _registerEvents() {
                this.JFrogEventBus.registerOnScope(this, this.EVENTS.TABS_REFRESH, () => this.initTabs());
                // URL changed (like back button / forward button / someone input a URL)
                this.JFrogEventBus.registerOnScope(this, this.EVENTS.TABS_URL_CHANGED, stateParams => {
                    this.currentTab.name = stateParams.tab;
                });

                $(window).on('resize.tabs', () => {
                    this.initTabs();
                });

            },
            unwatch() {
                return this.$scope.$watch('jfTabs.tabs', (newVal, oldVal) => {
                    this._calculateTabsSize();
                }, true);
            },
            stateChangeListener() {
                return this.$root.$on('$stateChangeSuccess', (e, toState, toParams, fromState, fromParams) => {
                    toState.tabChange = false;
                });
            },
            onClickTab(tab, tabChange) {

                this.isDropdownOpen = false;
                if (this.$emit('on-tab-change', { tab: tab }) === false || tab.isDisabled) {
                    return;
                }
                this._ensureTabVisible(tab);
                this.$router.replace( { query: {
                    ...this.$router.currentRoute.query,
                    activeTab: tab.name
                } } );
                this.currentTab.name = tab.name;
            },
            _ensureTabVisible(tab) {
                let collapsedTab = this._getCollapsedTab(tab);
                if (!collapsedTab)
                    return;

                // Replace between collapsedTabs & visibleTabs:
                var collapsedTabIndex = this.tabsCollapsed.indexOf(collapsedTab);
                var tabToReplace = this.tabsVisible[this.tabsVisible.length - 1];

                if (!tabToReplace)
                    return;

                this.tabsCollapsed[collapsedTabIndex] = tabToReplace;
                this.tabsVisible[this.tabsVisible.length - 1] = collapsedTab;
            },
            isActiveTab(tab) {
                return tab.name === this.currentTab.name;
            },
            _getTab(tab) {
                let currentTab = _.find(this.tabs, { name: tab.name });
                return currentTab;
            },
            _getCollapsedTab(tab) {
                return _.find(this.tabsCollapsed, { name: tab.name });
            },
            getTabWidthForStyle() {
                return this.tabwidth.endsWith('%') ? this.tabwidth : this.tabwidth.endsWith('px') ? this.tabwidth : this.tabwidth + 'px';
            },
            hasClass(obj) {
                if (obj && obj.class)
                    return true;
            },
            closeDropdown() {
                this.isDropdownOpen = false;
            }
        }
    }

</script>

<style scoped lang="less">
@import "../../assets/stylesheets/variables";
.dropdown-toggle::after {
    display: none;
}

.nav-tabs {
  width: 100%;
  left: 0;
  position: relative;
  z-index: 200;
  border-bottom: 1px solid @grayBorder;

  > li {
    position: relative;
    font-weight: 600;
    top: 1px;
    margin-bottom: 0;
    text-align: center;

    > a:hover, &.active > a, &.active > a:hover, .active > a:focus {
      background: transparent;
      border-color: transparent;
//      padding-top: 1px;
    }

    &.disabled {
      & > a {
        color: @darkGray;
        &:hover {
          color: @darkGray;
          cursor: default;
        }
      }
    }

    &:not(.license-required):not(.disabled) {
      a {
        cursor: pointer;
        z-index: 3;
      }

      &.active > a, &.active > a:hover, .active > a:focus {
        border-bottom: 2px solid @greenBGDark;
        color: @greenBGDark;
      }

      > a:hover {
        color: @blackBGLight;
        border-bottom: 2px solid @blackBGLight;
      }
    }

    &.license-required {
      &::after {
        content: "";
      }

      a span {
        position: relative;

        &::after {
          top: -2px;
          right: -24px;
        }
      }
    }
    &.marked {
      .jf-tab-header-container > span:before {
        display: inline-block;
        content: '●';
        color: #ca423c;
        margin-left: -20px;
        width: 20px;
        text-align: center;
      }
    }
  }

  li {
    width: 165px;

    &.action-expand {
      width: 50px;
      float: right;
      .dropdown{
        z-index: 999999;
      }
    }

    > a {
      padding: 0 0 8px 0;
      margin-right: 0;

      color: @grayFontGeneral;
    }
  }

  //.dropdown-menu {
  //  -webkit-border-radius: 0;
  //  -moz-border-radius: 0;
  //  border-radius: 0;
  //  right: -15px;
  //  margin-top: 3px;
  //  top: auto;
  //
  //  .dropdown-item {
  //    cursor: pointer;
  //    a {
  //      text-align-last: right;
  //      padding: 10px 15px 9px!important;
  //    }
  //  }
  //}
}

.nav-tabs-more {
  display: block;
  color: @grayFontGeneral;
  font-size: 24px;
  padding: 0 25px;
  margin-top: -8px;
  .icon-arrow {
    display: inline-block;
    transform: scale(0.5);
    color: @black;
  }

  &:hover, &:focus, .dropdown.open & {
    background-color: transparent !important;
    color: @greenFontHeader;
    text-decoration: none;
  }
}

.jf-tab-header-container {
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 15px;
  white-space: nowrap;
}
</style>
