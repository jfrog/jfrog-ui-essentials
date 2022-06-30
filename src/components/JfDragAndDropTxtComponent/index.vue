<template>

    <div>
        <div class="drag-and-drop-txt-wrapper" :class="{'ready-for-upload':shouldDisplayUploadIcon()}">
            <label v-if="dndHeadingHtml" v-html="sanitizedHeaderHtml"></label>
            <jf-field :autofocus="autofocus">
                <textarea name="dndtext" class="input-text monospaced" v-model="dndContent" @input="dndChange()" :style="dndStyle" :required="dndRequired" spellcheck="false"></textarea>
                <label class="call-to-action-label"
                       v-html="sanitizedCallToAction"
                       :class="{'icon-upload':shouldDisplayUploadIcon()}">
                </label>
            </jf-field>
        </div>
    </div>

</template>

<script>
    import SanitizeMixin from '../../mixins/Sanitize/index.js';

    export default {
        name: 'jf-drag-and-drop-txt',
        props: [
            'dndContent',
            'dndHeadingHtml',
            'dndStyle',
            'dndRequired',
            'dndCallToAction',
            'dndAutoFocus'
        ],
        'jf@inject': [
            '$scope',
            '$element',
            '$attrs',
            'JFrogNotifications'
        ],
        mixins: [SanitizeMixin],
        data() {
            return {};
        },
        created() {
            this.draggedFileSizeLimit = 400;
            // limit file size (in KB)
            this.entered = false;
        },
        mounted() {
            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */

            // Binding dragenter,dragleave,drop to <jf_drang_and_drop_text> element
            // since these events are not natively supported by Angular
            this.$element.bind('dragover', this.handleDragEnter.bind(this));

            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
            this.$element.bind('dragleave', this.handleDragLeave.bind(this));

            /* (NG2VUE) This was moved from created() to mounted() */
            /* (NG2VUE) Todo: If any other code in created() depends on this, it should also be moved here. */
            this.$element.bind('drop', this.handleDropEvent.bind(this));
        },
        ng1_legacy: { 'controllerAs': 'jfDragAndDropTxt' },
        methods: {
            shouldDisplayUploadIcon() {
                return $(this.$element).find('textarea').val() === '' && !$(this.$element).is('.over');
            },
            onFileLoadSuccess(event) {
                this.dndContent = event.target.result;
                $(this.$element).find('textarea').focus();

                /* Todo: check the following condition. It may contain some undefined references: this.dndChange */
                if (this.dndChange !== null)
                    this.$emit('dnd-change');
            },
            onFileLoadFailure(event) {
                let errorMessage = 'Unable to access license file.';
                if (event.target.error.name === 'SecurityError') {
                    errorMessage += '<br> The file is either unsafe or being used by another application.';
                }

                if (this.dndOnError !== null) {
                    this.$emit('dnd-on-error', { msg: errorMessage });
                } else {
                    this.JFrogNotifications.create({ error: errorMessage });
                }
            },
            handleDropEvent(event) {
                this.entered = false;
                this.toggleDragEffect();
                event.preventDefault();
                event.stopPropagation();

                // Initialize a file reader and get file path
                let reader = new FileReader();
                let file = event.originalEvent.dataTransfer.files[0];

                // Bind to reader events
                reader.onload = event => {
                    this.onFileLoadSuccess(event);
                };
                reader.onerror = event => {
                    this.onFileLoadFailure(event);
                };

                // Limit the read file size
                let fileSize = Math.round(file.size / 1000);
                if (fileSize > this.draggedFileSizeLimit) {
                    let errorMessage = 'File exceeds the maximum size of ' + this.draggedFileSizeLimit + ' KB';

                    if (this.dndOnError !== null) {
                        this.$emit('dnd-on-error', { msg: errorMessage });
                    } else {
                        this.JFrogNotifications.create({ error: errorMessage });
                    }

                    return false;
                }

                // Read the file if not exceeds size limit
                reader.readAsText(file);
            },
            callingCodeShouldEnd(event) {
                // This is an ugly fix for the issue of FireFox browser
                // firing the dragover/dragenter and dragleve events again and again
                // when dragging a file over the textarea
                let theCallingCodeShouldEnd = false;

                try {
                    if (event.relatedTarget.nodeType == 3) {
                        theCallingCodeShouldEnd = true;
                    }
                } catch (err) {
                }

                if (event.target === event.relatedTarget) {
                    theCallingCodeShouldEnd = true;
                }

                return theCallingCodeShouldEnd;
            },
            handleDragEnter(event) {
                event.preventDefault();
                event.stopPropagation();
                // cancel the event on FF

                if (this.callingCodeShouldEnd(event)) {
                    return;
                }

                if (!this.entered) {
                    this.entered = true;
                    this.toggleDragEffect();
                    event.originalEvent.dataTransfer.effectAllowed = 'copy';
                    return false;
                }
            },
            handleDragLeave(event) {
                event.preventDefault();
                event.stopPropagation();
                // cancel the event on FF

                if (this.callingCodeShouldEnd(event)) {
                    return;
                }

                if (this.entered) {
                    this.entered = false;
                    this.toggleDragEffect();
                    return false;
                }
            },
            toggleDragEffect() {
                let dndWrapper = $(this.$element).find('.drag-and-drop-txt-wrapper');
                // dndWrapper.removeClass('icon-upload');
                dndWrapper.toggleClass('over');
            }
        },
        computed: {
            autofocus() {
                return this.dndAutoFocus === undefined ? true : this.dndAutoFocus;
            },
            sanitizedHeaderHtml() {
                return this.text ? this.$sanitize(this.dndHeadingHtml) : '';
            },
            sanitizedCallToAction() {
                return this.text ? this.$sanitize(this.dndCallToAction) : `Copy your text or
    <b>drop a file</b>`;
            }
        }
    }

</script>

<style scoped lang="less">



</style>
