class jfMarkdownEditorController {

    constructor($timeout) {
        this.$timeout = $timeout;
        this.mode = this.mode || 'Edit';
        this.markdown = this.markdown || '';
        this.language = this.language || 'Markdown';
        this.toHtml = {};
        this.toHtml['Markdown'] = require('marked');
        this.toHtml['Asciidoc'] = Opal.Asciidoctor.$convert.bind(Opal.Asciidoctor);;
        this.modeOptions = ['Edit', 'Preview'];

        this.renderPreview();
    }

    renderPreview() {
        if (this.mode === 'Preview' && this.toHtml[this.language]) {
            this.preview = this.toHtml[this.language](this.markdown);
        }
    }
    onLanguageChange() {
        if (this.toHtml[this.language]) {
            this.modeOptions = ['Edit', 'Preview'];
        }
        else {
            this.modeOptions = ['Edit'];
            this.mode="Edit";
        }
        this.renderPreview();
        this.$timeout(()=>this.switchController.updateOptionObjects());
    }
}

export function jfMarkdownEditor() {

    return {
        restrict: 'E',
        scope: {
            markdown: '=?',
            language: '=?',
            mode: '=?'
        },
        controller: jfMarkdownEditorController,
        controllerAs: 'jfMarkdown',
        bindToController: true,
        templateUrl: 'directives/jf_markdown_editor/jf_markdown_editor.html'
    };
}
