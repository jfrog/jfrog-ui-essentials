import SanitizeMixin from '../../../mixins/Sanitize/index.js';

export function AngularSanitizeServiceMock(content, customConfig) {
    return SanitizeMixin.methods.$sanitize(content, customConfig);
}
