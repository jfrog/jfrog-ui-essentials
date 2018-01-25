export function jfHighlight() {
    function escapeRegexp(queryToEscape) {
        return ('' + queryToEscape).replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    return function(matchItem, query) {
        let origMatchItem = matchItem;
        let elem;
        try {
            elem = $(matchItem);
        }
        catch(e) {}
        if (elem) matchItem = elem.text();

        let highlighted = query && matchItem ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="ui-select-highlight">$&</span>') : matchItem;
        if (elem) {
            return origMatchItem.replace(matchItem, highlighted);
        }
        else return highlighted;
    };
}