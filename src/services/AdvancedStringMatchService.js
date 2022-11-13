import SanitizeMixin from '../mixins/Sanitize/index.js';
import map from 'lodash/map';
import find from 'lodash/find';

export class AdvancedStringMatch {
    constructor() {
        this.$sanitize = SanitizeMixin.methods.$sanitize;
        this.match = (str, match) => this.doMatch(str, match);
        this.highlight = (elem, segments, hlElemType, hlClass) => this.doHighlight(elem, segments, hlElemType, hlClass);
    }
    getMatchCount(str, match, searchInside = false) {
        let i = 0;
        while (str[i] && match[i] && str[i] === match[i])
            i++;
        let result;
        if (i === 0 && searchInside) {
            let len = match.length;
            let start = str.indexOf(match.substr(0, len));
            while (start === -1 && len > 0) {
                len--;
                start = str.indexOf(match.substr(0, len));
            }
            if (start !== -1 && len > 1) {
                i = start;
                while (str[i] && match[i - start] && str[i] === match[i - start])
                    i++;
                result = {
                    start: start,
                    length: i - start
                };
            } else {
                result = {
                    start: 0,
                    length: 0
                };
            }
        } else {
            result = {
                start: 0,
                length: i
            };
        }
        return result;
    }
    doMatch(str, match) {
        if (!str)
            return;
        str = str.toLowerCase();
        match = match.toLowerCase();
        if (!match || !str)
            return {
                matched: false,
                segments: []
            };
        let index = str.indexOf(match);
        if (index !== -1) {
            return {
                matched: true,
                segments: [{
                        start: index,
                        length: match.length
                    }]
            };
        } else {
            let regexp = /\_|\-|\.|\/| /;
            let regexp_no_dot = /\_|\-|\/| /;
            let parts = match.indexOf('.') !== -1 ? str.split(regexp_no_dot) : str.split(regexp);
            if (match.indexOf('.') !== -1) {
                let tempParts = [];
                parts.forEach(part => {
                    if (part.indexOf('.') === -1) {
                        tempParts.push(part);
                    } else {
                        let innerParts = part.split('.');
                        innerParts = map(innerParts, part => {
                            return '.' + part;
                        });
                        innerParts[0] = innerParts[0].substr(1);
                        // we don't want '.' before the first entry
                        tempParts = tempParts.concat(innerParts);
                    }
                });
                parts = tempParts;
            }
            match = match.split(regexp_no_dot).join('');
            let gotMatch = false;
            let pos = 0;
            let segments = [];
            let searchInside = false;
            if (match[0] === '*') {
                while (match[0] === '*')
                    match = match.substr(1);
            }
            for (let i = 0; i < parts.length; i++) {
                let matchCount = this.getMatchCount(parts[i], match, !gotMatch || searchInside);
                if (matchCount.length !== 0) {
                    if (parts[i].startsWith('.'))
                        pos--;
                    segments.push({
                        start: pos + matchCount.start,
                        length: matchCount.length
                    });
                    gotMatch = true;
                }
                match = match.substr(matchCount.length);
                if (match[0] === '*') {
                    searchInside = true;
                    while (match[0] === '*')
                        match = match.substr(1);
                    let newPart = parts[i].substr(matchCount.start + matchCount.length);
                    if (newPart)
                        parts.splice(i + 1, 0, newPart);
                    else
                        pos++;
                    pos += matchCount.start + matchCount.length;
                } else {
                    if (matchCount.length !== 0)
                        searchInside = false;
                    pos += parts[i].length + 1;
                }
                if (!match.length)
                    break;
            }
            if (match.length)
                gotMatch = false;
            return {
                matched: gotMatch,
                segments: gotMatch ? segments : []
            };
        }
    }
    getHighlighted(text, segments, hlElemType, hlClass) {
        if (!segments.length || !text)
            return text;
        else {
            let last = 0;
            let highlighted = '';
            for (let i in segments) {
                if (text.substr(segments[i].start, segments[i].length)) {
                    highlighted += this.$sanitize(text.substr(last, segments[i].start - last));
                    highlighted += `<${ hlElemType } class="${ hlClass }">`;
                    highlighted += this.$sanitize(text.substr(segments[i].start, segments[i].length));
                    highlighted += `</${ hlElemType }>`;
                    last = segments[i].start + segments[i].length;
                }
            }
            highlighted += this.$sanitize(text.substr(last, text.length - last));
            return highlighted;
        }
    }
    doHighlight(elem, segments, hlElemType = 'span', hlClass = 'highlight') {
        let contents = elem.contents();
        let textNode = find(contents, { nodeType: 3 });
        if (!textNode) {
            for (let i = 0; i < contents.length; i++) {
                textNode = find(contents[i].childNodes, { nodeType: 3 });
                if (textNode)
                    break;
            }
        }
        if (textNode) {
            let highlighted = this.getHighlighted(textNode.nodeValue, segments, hlElemType, hlClass);
            $(textNode).replaceWith(highlighted);
        }
    }
}
