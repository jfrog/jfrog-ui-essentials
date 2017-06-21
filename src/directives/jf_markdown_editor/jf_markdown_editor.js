import "./codemirror-asciidoc";

class jfMarkdownEditorController {
	/* @ngInject */
    constructor($timeout,$scope) {
        this.checkPreviewers();

        this.$timeout = $timeout;
        this.mode = this.mode || 'Edit';
        this.markdown = this.markdown || '';
        this.language = this.language || 'Markdown';
        if (this.editable === undefined) this.editable = true;
        this.modeOptions = ['Edit', 'Preview'];

        this.updatePreviewButton();



        $scope.$watch('jfMarkdown.markdown',()=>{
            if (this.markdown && !this.preview) this.renderPreview();
        })

    }

    checkPreviewers() {
        if (!this.previewRenderers) {
            console.error('jf-markdown-editor: No preview-renderers was set. Previews will not work!')
            this.previewRenderers = {};
        }
        else {
            if (!this.previewRenderers.markdown) {
                console.error('jf-markdown-editor: No markdown preview renderer was set. Markdown previews will not work!')
            }
            if (!this.previewRenderers.asciidoc) {
                console.error('jf-markdown-editor: No asciidoc preview renderer was set. Asciidoc previews will not work!')
            }
        }
    }

    setPreview(preview) {
        this.preview = preview;
    }

    renderPreview() {
        if (this.previewRenderers[this.language.toLowerCase()]) {
            this.previewRenderers[this.language.toLowerCase()](this.markdown, (preview)=>this.setPreview(preview));
        }
    }

    updatePreviewButton() {
        if (this.previewRenderers[this.language.toLowerCase()]) {
            this.modeOptions = ['Edit', 'Preview'];
        }
        else {
            this.modeOptions = ['Edit'];
            this.mode="Edit";
        }
    }
    onLanguageChange() {
        this.updatePreviewButton();
        this.renderPreview();
        this.$timeout(()=>this.switchController.updateOptionObjects());
    }
    onChangeModeInternal() {
        if (this.mode === 'Preview') this.renderPreview();
        this.onModeChange({mode:this.mode})
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
