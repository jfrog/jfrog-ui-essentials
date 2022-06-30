import domPurify from 'dompurify';

const sanitize = domPurify.sanitize;
const sanitizeUrl = require('@braintree/sanitize-url');

const DEFAULT_CONFIG = {
    ALLOWED_TAGS: [ 'img', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
        'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
        'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'area'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|xxx|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ADD_ATTR: ['target'],
}
export default {
    methods: {
        $sanitize(content, customConfig = {}) {
            return sanitize(content, Object.assign(DEFAULT_CONFIG, customConfig));
        },
        $sanitizeUrl(url) {
            return sanitizeUrl.sanitizeUrl(url);
        },
    },
    DEFAULT_CONFIG,
};
