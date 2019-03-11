<template>
    <div class="action-icon"
         @click="actionHandler(action,$event)"
         v-if="!action.href"
         v-jf-tooltip.bind="action.tooltip"
         :class="action.icon">
    </div>
    <a @click.prevent="actionHandler(action,$event)"
       v-if="action.href"
       v-jf-tooltip.bind="action.tooltip"
       :href="action.href(data)">
        <div class="action-icon" :class="action.icon"></div>
    </a>
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
