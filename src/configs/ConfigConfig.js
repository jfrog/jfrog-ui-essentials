export function config() {
    this.$inject('$urlMatcherFactoryProvider');
    this.$urlMatcherFactoryProvider.type('JFrogSubRouterPath', {
        encode: function (item) {
            return item;
        },
        decode: function (item) {
            return item;
        },
        is: function (item) {
            return true;
        }
    });
}
