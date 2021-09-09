<template>
  <div>
    <div
      v-if="!action.href"
      v-jf-tooltip.bind="action.tooltip"
      class="action-icon"
      :class="action.icon"
      @click="actionHandler(action,$event)"
    />
    <a
      v-if="action.href"
      :href="action.href(data)"
      @click="actionHandler(action,$event)"
    >
      <div
        v-jf-tooltip.bind="action.tooltip"
        class="action-icon"
        :class="action.icon"
      />
    </a>
  </div>
</template>

<script>
	export default {
		name: 'RowAction',
        props: [
            'onActionClick',
            'action',
            'data'
        ],
        methods: {
		    actionHandler(action,$event) {
                $event.stopPropagation();
                this.onActionClick(action);
            }
        }
	};
</script>

<style scoped>

</style>
