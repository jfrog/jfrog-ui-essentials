const sanitizeUrl = require('@braintree/sanitize-url');
const sanitize = require('sanitize-html');

const align = ['align'];
const DEFAULT_CONFIG = {
    disallowedTagsMode: 'escape',
    allowedTags: ['img', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
        'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
        'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre'],
    allowedAttributes: {
        div: ['id', 'class'],
        a: ['href', 'name', 'target', 'class'],
        p: align,
        h1: align,
        h2: align,
        h3: align,
        h4: align,
        h5: align,
        td: [...align, 'valign'],
        // We don't currently allow img itself by default, but this
        // would make sense if we did. You could add srcset here,
        // and if you do the URL is checked for safety
        img: ['src', 'width'],
    },
    // Lots of these won't come up by default because we don't allow them
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
    // URL schemes we permit
    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'data'],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
    allowProtocolRelative: true,
};
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
