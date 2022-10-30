export default {
    bind: function (el) {
        $(el).on('mousedown', () => {
            let JFrogEventBus = Vue.prototype.$jfrog.get(
                'JFrogEventBus',
            );
            JFrogEventBus.dispatch(
                JFrogEventBus.getEventsDefinition().FORM_CLEAR_FIELD_VALIDATION,
                true,
            );
        });
    },
};

