var marked = require('marked');
class jfMarkdownEditorController {

    constructor() {
        this.mode = 'Edit';
    }

    onModeChange() {
        if (this.mode === 'Preview') {
            this.preview = marked(this.markdown);
        }
    }
}

export function jfMarkdownEditor() {

    return {
        restrict: 'E',
        scope: {
        },
        controller: jfMarkdownEditorController,
        controllerAs: 'jfMarkdown',
        bindToController: true,
        templateUrl: 'directives/jf_markdown_editor/jf_markdown_editor.html'
    };
}
