export default {
    inserted: function (el, binding) {
        let element = $(el);
        element.replaceWith(element.children());
    },
};
