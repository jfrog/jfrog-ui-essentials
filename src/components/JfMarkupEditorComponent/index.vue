<template>
  <div>
    <div
      v-if="webworkerOk || previewersCount === 2"
      class="jf-markup-editor"
      :class="{'has-editor-label':editorLabel}"
    >
      <div class="controls">
        <div
          v-if="editorLabel"
          class="editor-label"
          :class="{'editor-label-position':isInEditMode()}"
        >
          {{ editorLabel }}
        </div>
        <div
          v-if="showControls && isEditable"
          class="lang-select-wrapper"
        >
          <jf-ui-select
            v-model="currentLanguage"
            class="form-group-cell"
            :jf-select-disabled="!isInEditMode()"
            :jf-select-options="['Markdown','Asciidoc','Plain Text']"
            @jf-select-change="onLanguageChange"
          />
        </div>
        <div
          v-if="showControls"
          class="switch-wrapper"
        >
          <jf-switch
            ref="switchController"
            v-model="currentMode"
            :options="modeOptions"
            class="no-margin-top"
            @input="onChangeModeInternal()"
          />
        </div>
        <button
          v-if="!showControls && isEditable"
          class="btn btn-default edit-button"
          type="button"
          @click="activateEditor()"
        >
          <span v-if="value && value.length > 0">
            <i class="icon icon-edit-pen" />
            <span>Edit</span>
          </span>
          <span v-if="!value || value.length === 0">
            <i class="icon icon-new" />
            <span>Add</span>
          </span>
        </button>
      </div>

      <div
        v-if="isInEditMode()"
        class="code-mirror-wrapper codemirror-wrapper"
      >
        <jf-code-mirror
          v-if="currentLanguage === 'Markdown'"
          :key="currentLanguage"
          mime-type="text/x-markdown"
          mode="gfm"
          :allow-edit="true"
          height="100%"
          :autofocus="!preventAutoFocus"
          enable-copy-to-clipboard="value && value.length"
          clipboard-copy-entity-name="text"
          :value="value"
          @input="$emit('input', arguments[0])"
        />
        <jf-code-mirror
          v-if="currentLanguage === 'Asciidoc'"
          :key="currentLanguage"
          mime-type="text/x-markdown"
          mode="asciidoc"
          :allow-edit="true"
          height="100%"
          :autofocus="!preventAutoFocus"
          enable-copy-to-clipboard="value && value.length"
          clipboard-copy-entity-name="text"
          :value="value"
          @input="$emit('input', arguments[0])"
        />
        <jf-code-mirror
          v-if="currentLanguage === 'Plain Text'"
          :key="currentLanguage"
          :allow-edit="true"
          height="100%"
          :autofocus="!preventAutoFocus"
          enable-copy-to-clipboard="value && value.length"
          clipboard-copy-entity-name="text"
          :value="value"
          @input="$emit('input', arguments[0])"
        />
        <button
          v-if="onSave"
          class="btn btn-primary save-button pull-right"
          @click="onSaveClick()"
        >
          Save
        </button>
        <button
          v-if="!hideCancelButton"
          class="btn btn-secondary clancel-button pull-right"
          @click="onCancel()"
        >
          Cancel
        </button>
      </div>

      <div
        v-if="!isInEditMode()"
        class="preview-wrapper"
      >
        <div
          class="preview"
          :class="{'empty-preview': !preview || preview.length === 0}"
          v-html="preview"
        />
        <div
          v-if="!preview"
          class="no-markup"
        >
          <span>No markup available.</span>&nbsp;
          <a
            v-if="!showControls && isEditable"
            class="jf-link"
            @click.prevent="activateEditor()"
          >
            Add markup.
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

    const PREVIEW_MODE  = 'Preview';
    const EDIT_MODE = 'Edit';

    export default {
        name: 'JfMarkupEditor',
        props: [
            'value',
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
            'JFrogUIWebWorker',
            '$sanitize'
        ],
        data() {
            return {
                webworkerOk: null,
                previewersCount: null,
                modeOptions: null,
                onSave: null,
                preview: '',
                currentLanguage: this.language || 'Markdown',
                currentMode: this.mode || EDIT_MODE,
                isEditable: this.editable,
                renderers: this.previewRenderers
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
                if (!this.value) this.$emit('input', '');
                this.markupBackup = this.value;
                this.languageBackup = this.currentLanguage;
                if (this.isEditable === undefined) this.isEditable = true;

                this.modeOptions = [
                    EDIT_MODE,
                    PREVIEW_MODE
                ];

                this.updatePreviewButton();

                this.$scope.$watch('jfMarkup.value', () => {
                    if (this.canRenderPreview()) {
                        this.renderPreview();
                    }
                });
            },
            setPreview(preview) {
                this.preview = this.$sanitize(preview);
            },
            currentLanguageHasPreviewRenderer() {
                return this.renderers && this.renderers[this.currentLanguage.toLowerCase()];
            },
            canRenderPreview() {
                return this.webworkerOk && !this.currentLanguageHasPreviewRenderer();
            },
            renderPreview() {

                if (this.currentLanguage.toLowerCase() === 'plain text') {
                    this.setPreview(this.value.replace(/\n/g, '<br>'));
                } else if (this.currentLanguageHasPreviewRenderer()) {
                    this.renderers[this.currentLanguage.toLowerCase()](this.value, preview => this.setPreview(preview));
                } else if (this.webworkerOk, this.currentLanguage, this.currentLanguage.toLowerCase(), this.instanceId) {
                    this.JFrogUIWebWorker.markupPreview(this.currentLanguage.toLowerCase(), this.value, this.instanceId).then(html => this.setPreview(html));
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
                this.$timeout(() => this.$refs.switchController.updateOptionObjects());
            },
            onChangeModeInternal() {
                if (this.currentMode === PREVIEW_MODE)
                    this.renderPreview();
                this.$emit('on-mode-change', { mode: this.currentMode });
            },
            checkPreviewers() {

                if (!this.renderers) {
                    this.renderers = {};
                    this.previewersCount = 0;
                } else {
                    if (this.renderers.markdown && this.renderers.asciidoc) {
                        this.previewersCount = 2;
                    } else if (this.renderers.markdown || this.renderers.asciidoc) {
                        this.previewersCount = 1;
                    }
                }
            },
            onCancel() {
                this.$timeout(() => {
                    this.currentLanguage = this.languageBackup;
                    this.$emit('input', this.markupBackup)
                    this.preview = '';
                    this.renderPreview();
                    this.currentMode = PREVIEW_MODE;
                    this.showControls = false;
                });
            },
            onSaveClick() {
                this.$timeout(() => {

                    /* Todo: check the following condition. It may contain some undefined references: this.onSave */
                    if (typeof this.onSave === 'function') {
                        this.languageBackup = this.currentLanguage;
                        this.markupBackup = this.value;
                        this.$emit('on-save');
                        this.showControls = false;
                    }
                });
            },
            activateEditor() {
                this.currentMode = EDIT_MODE;
                this.showControls = true;
            },
            isInEditMode() {
                return this.showControls && this.currentMode === this.EDIT_MODE;
            }
        }
    };

</script>

<style scoped lang="less">

    .jf-markup-editor{
        .preview-wrapper{
            //border: none;
            .no-markup {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                text-align: center;
                background-color: #f8fafb;
                font-weight: 600;
                font-size: 14px;
                color: #999db4;
                line-height: 1.5em;
                min-height: 80px;
            }
        }
    }


</style>
