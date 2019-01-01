export class JfFullTextService {
    constructor() {
        this.$inject('$rootScope', 'JFrogModal');
        this.$rootScope = this.$rootScope;
        this.modal = this.JFrogModal;
    }

    showFullTextModal(text, textSubject, modalWidth, showAsList = false, listItemClickCB = null, windowClass = '') {
        if (!text || !text.length) {
            return;
        }
        this.$set(this, 'modalScope', this.$rootScope.$new());
        this.$set(this.modalScope, 'modalTitle', textSubject);
        this.$set(this.modalScope, 'closeModal', () => {
            return this.modalInstance.close();
        });
        if (!showAsList)
            this.$set(this.modalScope, 'text', this.toHtmlRows(text));
        else {
            this.$set(this.modalScope, 'list', text);
            this.$set(this.modalScope, 'onItemClick', item => {
                this.modalInstance.close();
                if (listItemClickCB)
                    listItemClickCB(item);
            });
        }
        this.$set(this, 'modalInstance', this.modal.launchModal('@full.text.modal', this.modalScope, modalWidth, true, { windowClass: 'full-text-modal' + (windowClass ? ' ' + windowClass : '') }));
    }
    toHtmlRows(text) {
        if (typeof text === 'string') {
            return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        } else if (Array.isArray(text)) {
            return text.join('<br />');
        }
    }
}
