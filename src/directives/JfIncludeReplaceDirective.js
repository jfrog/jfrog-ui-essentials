const Vue = window.Vue;

Vue.directive('jf-include-replace', {
    updated: function(el, binding) {
        console.log(`updated: ${binding && binding.value}`)
        let element = $(el)
        element.replaceWith(element.children());
    },
    inserted: function (el, binding) {
        console.log(`inserted: ${binding && binding.value}`)
        let element = $(el)
        element.replaceWith(element.children());
    },
})
