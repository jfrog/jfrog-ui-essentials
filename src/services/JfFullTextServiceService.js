export class JfFullTextService {
    constructor() {
        this.$inject('JFrogModal');
        this.modal = this.JFrogModal;
    }

    showFullTextModal(text, textSubject, modalWidth, showAsList = false, listItemClickCB = null, windowClass = '') {
        if (!text || !text.length) {
            return;
        }
        let options = {
            windowClass: 'full-text-modal' + (windowClass ? ' ' + windowClass : ''),
            title: textSubject,
            text: !showAsList && this.toHtmlRows(text),
            list: showAsList && text,
            listItemClickCB: listItemClickCB
        }

        return this.modal.launchModal('@full.text.modal', {}, modalWidth, true, options);
    }
    toHtmlRows(text) {
        if (typeof text === 'string') {
            return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        } else if (Array.isArray(text)) {
            return text.join('<br />');
        }
    }
}
