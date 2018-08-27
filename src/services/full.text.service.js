/**
 * Created by tomere on 10/01/2018.
 */

export default class JfFullTextService {

	constructor($rootScope, JFrogModal) {
		this.$rootScope = $rootScope;
		this.modal = JFrogModal;
	}


	showFullTextModal(text, textSubject, modalWidth, showAsList = false, listItemClickCB = null, windowClass = '') {
		if (!text || !text.length) {
			return;
		}
		this.modalScope = this.$rootScope.$new();
		this.modalScope.modalTitle = textSubject;

		this.modalScope.closeModal = () => {
			return this.modalInstance.close();
		};

		if (!showAsList) this.modalScope.text = this.toHtmlRows(text);
		else {
			this.modalScope.list = text;
            this.modalScope.onItemClick = (item) => {
                this.modalInstance.close();
                if (listItemClickCB) listItemClickCB(item);
            }
        }

		this.modalInstance = this.modal.launchModal('@full.text.modal', this.modalScope, modalWidth, true, {windowClass: 'full-text-modal' + (windowClass ? ' ' + windowClass : '')});
	}

	toHtmlRows(text) {
		if (typeof text === 'string') {
			return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
		} else if (Array.isArray(text)) {
			return text.join('<br />');
		}
	}
}