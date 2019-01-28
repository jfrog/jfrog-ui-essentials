var sanitizeHtml = require('sanitize-html')
export function AngularSanitizeServiceMock(content) {
    return sanitizeHtml(content);
}
