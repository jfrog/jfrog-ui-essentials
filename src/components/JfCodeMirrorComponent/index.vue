<template>

    <div>
        <div :class="{'codemirror-with-clip-copy' : enableCopyToClipboard}">
            <jf-clip-copy v-if="enableCopyToClipboard && formattedModel && !clipboardCopyModel" :text-to-copy="formattedModel" class="code-mirror-copy pull-right" :class="{'scrollbar-margin':codeMirrorIsWithScroll()}" :object-name="clipboardCopyEntityName || 'text'">
            </jf-clip-copy>
            <jf-clip-copy v-if="enableCopyToClipboard && clipboardCopyModel" :text-to-copy="clipboardCopyModel" class="code-mirror-copy pull-right" :class="{'scrollbar-margin':codeMirrorIsWithScroll()}" :object-name="clipboardCopyEntityName || 'text'">
            </jf-clip-copy>
            <codemirror v-model="formattedModel"
                        :options="editorOptions"
                        @ready="codeMirrorLoaded"></codemirror>
        </div>
    </div>

</template>

<script>
    import {VueFactory} from "../../services/VueFactory";
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/mode/javascript/javascript.js';
    import 'codemirror/mode/xml/xml.js';
    import 'codemirror/mode/markdown/markdown.js';
    import 'codemirror/mode/gfm/gfm.js';
    import 'codemirror/addon/mode/overlay.js';
    import 'codemirror/addon/edit/matchbrackets.js';
    import 'codemirror/addon/selection/mark-selection.js';
    import 'codemirror/addon/search/searchcursor.js';
    import 'codemirror/addon/dialog/dialog.js';
    import 'codemirror/addon/dialog/dialog.css';
    import 'codemirror/addon/search/search.js';
    import CodeMirror from 'codemirror';
    import { initCodemirrorConfig } from './config.js';

    window.CodeMirror = CodeMirror;

    export default {
        name: 'jf-code-mirror',
        props: [
            'mimeType',
            'mode',
            'value',
            'allowEdit',
            'height',
            'apiAccess',
            'autofocus',
            'matchBrackets',
            'autoFormat',
            'autoIndent',
            'enableCopyToClipboard',
            'clipboardCopyModel',
            'clipboardCopyEntityName'
        ],
        'jf@inject': [
            '$scope',
            '$element',
            '$timeout',
            'JFrogUIUtils'
        ],
        components: {
            codemirror
        },
        data() {
            return {
                formattedModel: null,
                editorOptions: null
            };
        },
        created() {
            initCodemirrorConfig(CodeMirror);
            this.defineExtensions();
        },
        mounted() {
            this._formatModel();

            this.editorOptions = {
                lineNumbers: true,
                readOnly: !this.allowEdit,
                // Don't use nocursor - it disables search
                lineWrapping: true,
                mode: this.mode || 'links',
                viewportMargin: 65,
                autofocus: this.autofocus === 'true',
                mimeType: this.mimeType,
                matchBrackets: this.matchBrackets,
//                onLoad: this.codeMirrorLoaded.bind(this)
            };
            // Hide cursor in readonly mode
            if (!this.allowEdit) {
                this.$set(this.editorOptions, 'cursorBlinkRate', -1);
            }
        },
        ng1_legacy: { 'controllerAs': 'jfCodeMirror' },
        methods: {
            codeMirrorLoaded(_editor) {
                const { Vue } = VueFactory.getInstance();
                Vue.nextTick(() => {
                    this.cmApi = _editor;
                    if (this.height) {
                        let codeMirrorElement = $(this.$element).find('.CodeMirror');
                        if (this.height === 'flexible') {
                            codeMirrorElement.css('top', 0);
                            codeMirrorElement.css('bottom', 0);
                            codeMirrorElement.css('left', 0);
                            codeMirrorElement.css('right', 0);
                            codeMirrorElement.css('position', 'absolute');
                        } else {
                            codeMirrorElement.css('height', this.height);
                        }
                    }
                    $(_editor.display.wrapper).on('click', '.cm-link', e => {
                        let url = $(this).text();
                        if (url) {
                            window.open(url, '_blank', 'noopener noreferrer');
                        }
                    });
                    this.$scope.$on('$destroy', () => {
                        this.$destroyed = true;
                        $(_editor.display.wrapper).off('click');
                    });
                    if (this.apiAccess) {
                        this.$set(this.apiAccess, 'api', this.cmApi);
                        if (this.apiAccess.onLoad) {
                            this.apiAccess.onLoad();
                        }
                    }
                })
            },
            autoFormatText(indent) {
                let last = this.cmApi.lineCount();
                let start = {
                        line: 0,
                        ch: 0
                    }, end = { line: last };
                if (indent) {
                    this.cmApi.autoIndentRange(start, end);
                } else {
                    this.cmApi.autoFormatRange(start, end);
                }
                this.cmApi.setCursor(start);
            },
            _isJSON(str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            },
            _formatModel() {
                let format = content => {
                    if (this.autoFormat && (this.mode === 'javascript' || this.mode === 'htmlmixed')) {
                        this.$timeout(() => {
                            if (this.cmApi && this.cmApi.getValue().length > 0) {
                                this.autoFormatText();
                                this.formattedModel = this.cmApi.getValue();
                                this.cmApi.refresh();
                            }
                        });
                    }
                    if (this._isJSON(content)) {
                        this.formattedModel = require('js-beautify').js_beautify(content);
                    } else {
                        this.formattedModel = content;
                    }
                    this.expectChange();
                    this.refreshUntilVisible();
                };

                if (!this.allowEdit) {
                    format(this.value);
                    this.$scope.$watch('jfCodeMirror.value', v => {
                        format(v);
                    });
                } else {
                    this.formattedModel = this.value;
                    this.$scope.$watch('jfCodeMirror.value', v => {
                        if (this.formattedModel !== this.value) {
                            this.formattedModel = this.value;
                            this.expectChange();
                            this.refreshUntilVisible();
                        }
                    });
                    this.$scope.$watch('jfCodeMirror.formattedModel', v => {
                        this.$emit('input', v);
                    });
                    this.expectChange();
                    this.refreshUntilVisible();
                }
            },
            refreshUntilVisible() {
                if (this.cmApi)
                    this.cmApi.refresh();
                if (this.allowEdit)
                    return;
                this.$timeout(() => {
                    let cmText = $(this.$element).find('.CodeMirror-code').find('pre').text().replace(/\u200B/g, '');
                    if (this.expectingChange && cmText === this.lastVal) {
                        if (this.cmApi) {
                            this.cmApi.refresh();
                        }
                        if (!this.$destroyed)
                            this.refreshUntilVisible();
                    } else if (this.expectingChange) {
                        this.expectingChange = false;
                        delete this.lastVal;
                    }
                }, 100);
            },
            expectChange() {
                let cmText = $(this.$element).find('.CodeMirror-code').find('pre').text().replace(/\u200B/g, '');
                this.expectingChange = true;
                this.lastVal = cmText;
            },
            defineExtensions() {
                CodeMirror.defineExtension('autoFormatRange', (from, to) => {
                    let cm = this.cmApi;
                    let outer = cm.getMode(), text = cm.getRange(from, to).split('\n');
                    let state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
                    let tabSize = cm.getOption('tabSize');

                    let out = '', lines = 0, atSol = from.ch == 0;
                    let newline = () => {
                        out += '\n';
                        atSol = true;
                        ++lines;
                    };

                    for (let i = 0; i < text.length; ++i) {
                        let stream = new CodeMirror.StringStream(text[i], tabSize);
                        while (!stream.eol()) {
                            let inner = CodeMirror.innerMode(outer, state);
                            let style = outer.token(stream, state), cur = stream.current();
                            stream.start = stream.pos;
                            if (!atSol || /\S/.test(cur)) {
                                out += cur;
                                atSol = false;
                            }
                            if (!atSol && inner.mode.newlineAfterToken && inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || '', inner.state))
                                newline();
                        }
                        if (!stream.pos && outer.blankLine)
                            outer.blankLine(state);
                        if (!atSol)
                            newline();
                    }

                    cm.operation(() => {
                        cm.replaceRange(out, from, to);
                        for (let cur = from.line + 1, end = from.line + lines; cur <= end; ++cur)
                            cm.indentLine(cur, 'smart');
                    });
                });

                // Applies automatic mode-aware indentation to the specified range
                CodeMirror.defineExtension('autoIndentRange', (from, to) => {
                    let cmInstance = this.cmApi;
                    this.cmApi.operation(() => {
                        for (let i = from.line; i <= to.line; i++) {
                            cmInstance.indentLine(i, 'smart');
                        }
                    });
                });
            },
            codeMirrorIsWithScroll() {
                if (!this.$element) return false;
                let codemirrorScrollBar = this.$element.find('.CodeMirror .CodeMirror-vscrollbar:not(:hidden)');
                return codemirrorScrollBar && codemirrorScrollBar.length > 0;
            }
        }
    };

</script>

<style scoped lang="less">

    @import "../../assets/stylesheets/variables.less";

    .CodeMirror {
        height: auto;
        border: 1px solid #eee;
        padding: 15px;

        .CodeMirror-code {
            div:nth-child(even) {
                &, .CodeMirror-gutter-wrapper {
                    background-color: @grayGridRow;
                }
            }
        }

        .CodeMirror-gutters {
            border-right: 0 none;
            background-color: transparent;
        }

        pre, .CodeMirror-linenumber {
            font-size: 12px;
            line-height: 20px;
        }

        .CodeMirror-linenumber {
            text-align: left;
        }
    }

    .codemirror-with-clip-copy,
    .codemirror-wrapper {
        position:relative;
    }
    .code-mirror-copy{
     position: absolute;
        right: 20px;
        top:5px;
        z-index: 1;
    }


</style>
