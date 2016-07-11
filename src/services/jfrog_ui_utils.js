export class JFrogUIUtils {

    getCapitalizedKeys(object, dictionary) {

        let getCapitalized = (str) => {
            str = str.split('_').join(' ');
            str = str.split(' ').map((word)=>_.capitalize(word)).join(' ');
            return str;
        };

        let destObj = {};

        for (let key in object) {
            if (dictionary && dictionary[key]) {
                destObj[dictionary[key]] = object[key];
            }
            else {
                let capitalized = getCapitalized(key);
                destObj[capitalized] = object[key];
            }
        }

        return destObj;

    }

    getSafeHtml(unsafeHtml) {
        if (!unsafeHtml) return unsafeHtml;
        let decoded = _.unescape(unsafeHtml);
        let safe = _.escape(decoded);
        return safe;
    }


}