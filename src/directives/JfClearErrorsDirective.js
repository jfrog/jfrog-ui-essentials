const Vue = window.Vue;

Vue.directive('jf-clear-errors', {
    bind: function(el) {
        $(el).on("mousedown", () => {
            let JFrogEventBus = Vue.prototype.$jfrog.get(
                'JFrogEventBus'
            )
            JFrogEventBus.dispatch(
                JFrogEventBus.getEventsDefinition()
                    .FORM_CLEAR_FIELD_VALIDATION,
                true
            );
        })
    },
});
