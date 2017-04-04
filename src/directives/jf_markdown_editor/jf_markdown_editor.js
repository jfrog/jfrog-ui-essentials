import "./codemirror-asciidoc";

class jfMarkdownEditorController {

    constructor($timeout,$scope) {
        this.$timeout = $timeout;
        this.mode = this.mode || 'Edit';
        this.markdown = this.markdown || '';
        this.language = this.language || 'Markdown';
        if (this.editable === undefined) this.editable = true;
        this.toHtml = {};
        this.toHtml['Markdown'] = require('marked');
        this.toHtml['Asciidoc'] = Opal.Asciidoctor.$convert.bind(Opal.Asciidoctor);;
        this.modeOptions = ['Edit', 'Preview'];

        $scope.$watch('jfMarkdown.markdown',()=>{
            this.renderPreview();
        })

    }

    renderPreview() {
        if (this.toHtml[this.language]) {
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
            mode: '=?',
            onSave: '&?',
            onModeChange: '&?',
            editable: '=?'
        },
        controller: jfMarkdownEditorController,
        controllerAs: 'jfMarkdown',
        bindToController: true,
        templateUrl: 'directives/jf_markdown_editor/jf_markdown_editor.html'
    };
}
