<template>
  <div class="jf-wizard">
    <div class="jf-wizard-container">
      <div class="wizard-bar">
        <ul>
          <li
            v-for="(tab,index) in tabs"
            v-show="isVisible(tab)"
            :key="index"
            :class="{'active': active.title === tab.title}"
          >
            <a
              href=""
              @click.prevent="_switch(tab)"
            >{{ tab.title }}</a>
          </li>
        </ul>
      </div>
      <div class="wizard-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'JfWizard',
        props: ['config'],
        'jf@inject': [
            'JFrogEventBus',
            'JFrogUIUtils',
            '$scope'
        ],
        data() {
            return {
                tabs: [],
                active: { title: null }
            };
        },
        created() {
            this.JFrogEventBus.registerOnScope(this.$scope, this.JFrogEventBus.getEventsDefinition().WIZARD_TAB_CHANGE, tab => {
                this._switch(tab);
            });
            this.init = true;
        },
        methods: {
            registerTab(tab) {
                if (this.init || tab.isSelectedTab) {
                    this.active = tab;
                    this.init = false;
                }
                this.tabs.push(tab);
            },
            _switch(tab) {
                this.$element.find('.wizard-content').scrollTop(0);
                this.active = typeof tab === 'string' ? _.find(this.tabs, t => t.title === tab) : tab;
                this.$emit('on-tab-switch', { tab: this.active.title });
                this.JFrogUIUtils.fireResizeEvent();
            },
            isVisible(tab) {
                return typeof tab.isVisibleTab == "undefined" || //If isVisible is NOT defined
                (typeof tab.isVisibleTab == "boolean" && !!tab.isVisibleTab) || //isVisible is a boolean and its value is true
                 (typeof tab.isVisibleTab === 'function' && tab.isVisibleTab()); //isVisible is a function and its output is truthy
            }
        }
    }

</script>
