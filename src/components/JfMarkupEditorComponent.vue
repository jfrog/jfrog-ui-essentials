<script>

    const TEMPLATE = `
    <div>
        <div class="jf-markup-editor" :class="{'has-editor-label':editorLabel}" v-if="webworkerOk || previewersCount === 2">
            <div class="controls">
                <div class="editor-label" v-if="editorLabel" :class="{'editor-label-position':isInEditMode()}">
                    {{editorLabel}}
                </div>
                <div class="lang-select-wrapper" v-if="showControls && editable">
                    <jf-ui-select class="form-group-cell" :jf-select-disabled="!isInEditMode()" :jf-select-model="language" jf-select-change="onLanguageChange()" :jf-select-options="['Markdown','Asciidoc','Plain Text']">
                    </jf-ui-select>
                </div>
                <div class="switch-wrapper" v-if="showControls">
                    <jf-switch v-model="mode" @input="onChangeModeInternal()" :options="modeOptions" controller="switchController" class="no-margin-top">
                    </jf-switch>
                </div>
                <button class="btn btn-default edit-button" type="button" v-if="!showControls && editable" @click="activateEditor()">
                    <span v-if="markup && markup.length > 0">
                    <i class="icon icon-edit-pen"></i>
                    <span>Edit</span>
                    </span>
                    <span v-if="!markup || markup.length === 0">
                    <i class="icon icon-new"></i>
                    <span>Add</span>
                    </span>
                </button>
            </div>

            <div class="code-mirror-wrapper codemirror-wrapper"  v-if="isInEditMode()">

                <jf-code-mirror v-if="language === 'Markdown'" mime-type="text/x-markdown" mode="gfm" :allow-edit="true" height="100%" :autofocus=" !preventAutoFocus " enable-copy-to-clipboard="markup && markup.length" clipboard-copy-entity-name="text" :model="markup">
                </jf-code-mirror>
                <jf-code-mirror v-if="language === 'Asciidoc'" mime-type="text/x-markdown" mode="asciidoc" :allow-edit="true" height="100%" :autofocus=" !preventAutoFocus " enable-copy-to-clipboard="markup && markup.length" clipboard-copy-entity-name="text" :model="markup">
                </jf-code-mirror>
                <jf-code-mirror v-if="language === 'Plain Text'" :allow-edit="true" height="100%" :autofocus=" !preventAutoFocus " enable-copy-to-clipboard="markup && markup.length" clipboard-copy-entity-name="text" :model="markup">
                </jf-code-mirror>
                <button v-if="onSave" @click="onSaveClick()" class="btn btn-primary save-button pull-right">
                    Save
                </button>
                <button v-if="!hideCancelButton" @click="onCancel()" class="btn btn-secondary clancel-button pull-right">
                    Cancel
                </button>
            </div>

            <div class="preview-wrapper"  v-if="!isInEditMode()">
                <div class="preview" :class="{'empty-preview': !preview || preview.length === 0}" v-html="preview">
                </div>
                <div class="no-markup" v-if="!preview">
                    <span>No markup available.</span>&nbsp;
                    <a class="jf-link" v-if="!showControls && editable" @click.prevent="activateEditor()">
                        Add markup.
                    </a>
                </div>
            </div>

        </div>

    </div>
    `;

    const PREVIEW_MODE  = 'Preview';
    const EDIT_MODE = 'Edit';

    export default {
        template: TEMPLATE,
        name: 'jf-markup-editor',
        props: [
            'markup',
            'previewRenderers',
            'language',
            'mode',
            'editable',
            'showControls',
            'hideCancelButton',
            'editorLabel',
            'preventAutoFocus'
        ],
        'jf@inject': [
            '$timeout',
            '$scope',
            'JFrogUIWebWorker'
        ],
        data() {
            return {
                webworkerOk: null,
                previewersCount: null,
                modeOptions: null,
                switchController: null,
                onSave: null,
                preview: { length: null }
            };
        },
        created() {
            this.EDIT_MODE = EDIT_MODE;
            this.PREVIEW_MODE = PREVIEW_MODE;
            this.instanceId = Math.floor(Math.random() * 10000000000);

            this.JFrogUIWebWorker = new this.JFrogUIWebWorker();

        },
        mounted() {
            this.checkPreviewers();
            if (this.previewersCount === 2) {
                this.init();
            } else {
                this.JFrogUIWebWorker.check().then(() => {

                    this.JFrogUIWebWorker.open();

                    this.webworkerOk = true;
                    this.init();
                }).catch(() => {
                    console.error(`jf-code-mirror: Error: No preview render callback defined and WebWorker is not available.`);
                });
            }

            this.$scope.$on('$destroy', () => {
                if (this.webworkerOk)
                    this.JFrogUIWebWorker.close();
            });
        },
        ng1_legacy: { 'controllerAs': 'jfMarkup' },
        methods: {
            init() {
                this.mode = this.mode || EDIT_MODE;
                this.markup = this.markup || '';
                this.markupBackup = this.markup;
                this.language = this.language || 'Markdown';
                this.languageBackup = this.language;
                if (this.editable === undefined)
                    this.editable = true;
                this.modeOptions = [
                    EDIT_MODE,
                    PREVIEW_MODE
                ];

                this.updatePreviewButton();

                this.$scope.$watch('jfMarkup.markup', () => {
                    if (this.canRenderPreview()) {
                        this.renderPreview();
                    }
                });
            },
            setPreview(preview) {
                this.preview = preview;
            },
            currentLanguageHasPreviewRenderer() {
                return this.previewRenderers && this.previewRenderers[this.language.toLowerCase()];
            },
            canRenderPreview() {
                return this.webworkerOk && !this.currentLanguageHasPreviewRenderer();
            },
            renderPreview() {

                if (this.language.toLowerCase() === 'plain text') {
                    this.setPreview(this.markup.replace(/\n/g, '<br>'));
                } else if (this.currentLanguageHasPreviewRenderer()) {
                    this.previewRenderers[this.language.toLowerCase()](this.markup, preview => this.setPreview(preview));
                } else if (this.webworkerOk, this.language, this.language.toLowerCase(), this.instanceId) {
                    this.JFrogUIWebWorker.markupPreview(this.language.toLowerCase(), this.markup, this.instanceId).then(html => this.setPreview(html));
                }
            },
            updatePreviewButton() {
                this.modeOptions = [
                    EDIT_MODE,
                    PREVIEW_MODE
                ];
            },
            onLanguageChange() {
                this.updatePreviewButton();
                this.preview = '';
                if (this.canRenderPreview()) {
                    this.renderPreview();
                }
                this.$timeout(() => this.switchController.updateOptionObjects());
            },
            onChangeModeInternal() {
                if (this.mode === PREVIEW_MODE)
                    this.renderPreview();
                this.$emit('on-mode-change', { mode: this.mode });
            },
            checkPreviewers() {

                if (!this.previewRenderers) {
                    this.previewRenderers = {};
                    this.previewersCount = 0;
                } else {
                    if (this.previewRenderers.markdown && this.previewRenderers.asciidoc) {
                        this.previewersCount = 2;
                    } else if (this.previewRenderers.markdown || this.previewRenderers.asciidoc) {
                        this.previewersCount = 1;
                    }
                }
            },
            onCancel() {
                this.$timeout(() => {
                    this.language = this.languageBackup;
                    this.markup = this.markupBackup;
                    this.preview = '';
                    this.renderPreview();
                    this.mode = PREVIEW_MODE;
                    this.showControls = false;
                });
            },
            onSaveClick() {
                this.$timeout(() => {

                    /* Todo: check the following condition. It may contain some undefined references: this.onSave */
                    if (typeof this.onSave === 'function') {
                        this.languageBackup = this.language;
                        this.markupBackup = this.markup;
                        this.$emit('on-save');
                        this.showControls = false;
                    }
                });
            },
            activateEditor() {
                this.mode = EDIT_MODE;
                this.showControls = true;
            },
            isInEditMode() {
                return this.showControls && this.mode === this.EDIT_MODE;
            }
        }
    };

</script>

<style scoped lang="less">



</style>
