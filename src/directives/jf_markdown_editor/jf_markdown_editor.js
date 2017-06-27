import "./codemirror-asciidoc";

class jfMarkdownEditorController {
	/* @ngInject */
    constructor($timeout,$scope, JFrogUIWebWorker) {

        this.JFrogUIWebWorker = JFrogUIWebWorker;

        this.JFrogUIWebWorker.check().then(()=>{

            this.JFrogUIWebWorker.open();

            this.webworkerOk = true;
            this.$timeout = $timeout;
            this.mode = this.mode || 'Edit';
            this.markdown = this.markdown || '';
            this.language = this.language || 'Markdown';
            if (this.editable === undefined) this.editable = true;
            this.modeOptions = ['Edit', 'Preview'];

            this.updatePreviewButton();

            $scope.$watch('jfMarkdown.markdown',()=>{
                this.renderPreview();
            })
        }).catch(() => {
            console.error(`jf-markdown-editor: Cannot find ${this.JFrogUIWebWorker.getPathToWebWorker()}\nCheck that the webworker script is served by your server and that its path is defined in your app config (set 'webworkerPath' in the object passed to JFrogUILibConfigProvider.setConfig())`)
        })

        $scope.$on('$destroy',() => {
            this.JFrogUIWebWorker.close();
        })

    }

    setPreview(preview) {
        this.preview = preview;
    }

    renderPreview() {
        this.JFrogUIWebWorker.markdownPreview(this.language.toLowerCase(), this.markdown)
            .then(html => this.setPreview(html))
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
