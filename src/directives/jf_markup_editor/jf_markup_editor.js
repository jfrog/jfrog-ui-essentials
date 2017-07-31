import "./codemirror-asciidoc";

class jfMarkupEditorController {
	/* @ngInject */
    constructor($timeout,$scope, JFrogUIWebWorker) {

        this.$timeout = $timeout;
        this.$scope = $scope;

        this.JFrogUIWebWorker = JFrogUIWebWorker;
        this.checkPreviewers();
        if (this.previewersCount === 2) {
            this.init();
        }
        else {
            this.JFrogUIWebWorker.check().then(()=>{

                this.JFrogUIWebWorker.open();

                this.webworkerOk = true;
                this.init();
            }).catch(() => {
                console.error(`jf-code-mirror: Error: No preview render callback defined and WebWorker is not available.`)
            })
        }

        $scope.$on('$destroy',() => {
            if (this.webworkerOk) this.JFrogUIWebWorker.close();
        })

    }

    init() {
        this.mode = this.mode || 'Edit';
        this.markup = this.markup || '';
        this.language = this.language || 'Markdown';
        if (this.editable === undefined) this.editable = true;
        this.modeOptions = ['Edit', 'Preview'];

        this.updatePreviewButton();

        this.$scope.$watch('jfMarkup.markup',()=>{
            if (this.webworkerOk && (!this.previewRenderers || !this.previewRenderers[this.language.toLowerCase()])) this.renderPreview();
        })
    }

    setPreview(preview) {
        this.preview = preview;
    }

    renderPreview() {

        if (this.language.toLowerCase() === 'plain text') {
            this.setPreview(this.markup.replace(/\n/g,'<br>'));
        }
        else if (this.previewRenderers && this.previewRenderers[this.language.toLowerCase()]) {
            this.previewRenderers[this.language.toLowerCase()](this.markup, (preview)=>this.setPreview(preview));
        }
        else if (this.webworkerOk) {
            this.JFrogUIWebWorker.markupPreview(this.language.toLowerCase(), this.markup)
                .then(html => this.setPreview(html))
        }
    }

    updatePreviewButton() {
        this.modeOptions = ['Edit', 'Preview'];
    }
    onLanguageChange() {
        this.updatePreviewButton();
        this.preview = '';
        if (this.webworkerOk && (!this.previewRenderers || !this.previewRenderers[this.language.toLowerCase()])) this.renderPreview();
        this.$timeout(()=>this.switchController.updateOptionObjects());
    }
    onChangeModeInternal() {
        if (this.mode === 'Preview') this.renderPreview();
        this.onModeChange({mode:this.mode})
    }

    checkPreviewers() {
        if (!this.previewRenderers) {
            this.previewRenderers = {};
            this.previewersCount = 0;
        }
        else {
            if (this.previewRenderers.markdown && this.previewRenderers.asciidoc) {
                this.previewersCount = 2;
            }
            else if (this.previewRenderers.markdown || this.previewRenderers.asciidoc) {
                this.previewersCount = 1;
            }
        }
    }
	onClear(){
		this.$timeout(()=>{
			this.markup = '';
        });
    }

}

export function jfMarkupEditor() {

    return {
        restrict: 'E',
        scope: {
            markup: '=?',
            previewRenderers: '=?',
            language: '=?',
            mode: '=?',
            onSave: '&?',
            onModeChange: '&?',
            editable: '=?',
            showControls: '=?',
	        shouldHaveClearButton: '=?'
        },
        controller: jfMarkupEditorController,
        controllerAs: 'jfMarkup',
        bindToController: true,
        templateUrl: 'directives/jf_markup_editor/jf_markup_editor.html'
    };
}
