import {VueFactory} from "../services/VueFactory";

/** Splits a camel-case or Pascal-case variable name into individual words.
 * @param {string} str
 * @returns {string[]}
 */
export const splitWords = function(str) {
    return str
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        // uppercase the first character
        .replace(/^./, (str) => str.toUpperCase());
};

export function install() {
    const {Vue} = VueFactory.getInstance();

    Vue.filter('splitWords', function (string) {
        return splitWords(string);
    });
}
