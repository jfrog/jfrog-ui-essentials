import "./codemirror-asciidoc";

class jfMarkdownEditorController {
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
        this.markdown = this.markdown || '';
        this.language = this.language || 'Markdown';
        if (this.editable === undefined) this.editable = true;
        this.modeOptions = ['Edit', 'Preview'];

        this.updatePreviewButton();

        this.$scope.$watch('jfMarkdown.markdown',()=>{
            if (this.webworkerOk && (!this.previewRenderers || !this.previewRenderers[this.language.toLowerCase()])) this.renderPreview();
        })
    }

    setPreview(preview) {
        this.preview = preview;
    }

    renderPreview() {

        if (this.previewRenderers && this.previewRenderers[this.language.toLowerCase()]) {
            this.previewRenderers[this.language.toLowerCase()](this.markdown, (preview)=>this.setPreview(preview));
        }
        else if (this.webworkerOk) {
            this.JFrogUIWebWorker.markdownPreview(this.language.toLowerCase(), this.markdown)
                .then(html => this.setPreview(html))
        }
    }

    updatePreviewButton() {
        if (_.includes(['asciidoc', 'markdown'],this.language.toLowerCase())) {
            this.modeOptions = ['Edit', 'Preview'];
        }
        else {
            this.modeOptions = ['Edit'];
            this.mode="Edit";
        }
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

}

export function jfMarkdownEditor() {

    return {
        restrict: 'E',
        scope: {
            markdown: '=?',
            previewRenderers: '=?',
            language: '=?',
            mode: '=?',
            onSave: '&?',
            onModeChange: '&?',
            editable: '=?',
            showControls: '=?'
        },
        controller: jfMarkdownEditorController,
        controllerAs: 'jfMarkdown',
        bindToController: true,
        templateUrl: 'directives/jf_markdown_editor/jf_markdown_editor.html'
    };
}
