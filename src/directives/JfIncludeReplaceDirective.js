const Vue = window.Vue;

Vue.directive('jf-include-replace', {
    inserted: function (el, binding) {
        console.log(`inserted: ${binding && binding.value}`)
        let element = $(el)
        element.replaceWith(element.children());
    },
})
