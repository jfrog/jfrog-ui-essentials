const Vue = window.Vue;
Vue.filter('splitWords', function (string) {
    return splitWords(string);
});
