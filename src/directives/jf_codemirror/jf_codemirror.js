import {search}  from './search/search'

export function jfCodeMirror() {
    return {
        restrict: 'E',
        scope: {
            mimeType: '@',
            mode: '@',
            model: '=',
            allowEdit: '=',
            noCursor: '=',
            height: '@?',
            apiAccess: '=',
            autofocus: '@',
	        matchBrackets: '<',
	        autoFormat: '<',
            autoIndent: '<',
	        enableCopyToClipboard: '<?',
	        clipboardCopyModel: '<?',
	        clipboardCopyEntityName: '@?',
	        clipboardKeepTooltipLetterCase: '<?'
        },
        controller: jfCodeController,
        controllerAs: 'jfCodeMirror',
        bindToController: true,
	    templateUrl: 'directives/jf_codemirror/jf_codemirror.html'
    }
}

class jfCodeController {
	/* @ngInject */
    constructor($scope, $element, $timeout,JFrogUIUtils) {
        this.JFrogUIUtils = JFrogUIUtils;
        this.$element = $element;
        this.$scope = $scope;
        this.$timeout = $timeout;
	    this.defineExtensions();
    }

    $onInit() {
	    this._formatModel();
	    this.autofocus = this.autofocus === 'true';

        console.log(this);

        let readOnlyParam = !this.allowEdit;
        
        if(!_.isUndefined(this.noCursor) && this.noCursor) {
            readOnlyParam = 'nocursor';
        }


        this.editorOptions = {
            lineNumbers: true,
            readOnly: readOnlyParam, // enables nocursor usage if provided in the params for mobile layout
            lineWrapping: true,
            mode: this.mode || 'links',
            viewportMargin: 65,
            autofocus: this.autofocus,
            mimeType: this.mimeType,
            matchBrackets: this.matchBrackets,
            onLoad: this._codeMirrorLoaded.bind(this)
        };
        // Hide cursor in readonly mode
        if (!this.allowEdit) {
            this.editorOptions.cursorBlinkRate = -1;
        }
    }

    // register click handlers on code mirror links
    _codeMirrorLoaded(_editor) {
        this.cmApi = _editor;
        if (this.height) {
            let codeMirrorElement = $(this.$element).find('.CodeMirror');
            if (this.height === 'flexible') {
                codeMirrorElement.css('top', 0);
                codeMirrorElement.css('bottom', 0);
                codeMirrorElement.css('left', 0);
                codeMirrorElement.css('right', 0);
                codeMirrorElement.css('position', 'absolute');
            }
            else {
                codeMirrorElement.css('height', this.height);
            }
        }
        $(_editor.display.wrapper).on('click', '.cm-link', (e) => {
            let url = $(this).text();
            if (url) {
                window.open(url, '_blank');
            }
        });
        this.$scope.$on('$destroy', () => {
            this.$destroyed = true;
            $(_editor.display.wrapper).off('click')
        });
        if (this.apiAccess) {
            this.apiAccess.api = this.cmApi;
            if (this.apiAccess.onLoad) {
                this.apiAccess.onLoad();
            }
        }
    }

    autoFormatText(indent) {
	    let last = this.cmApi.lineCount();
	    let start = {line:0,ch:0},
		    end = {line:last};
	    if(indent) {
	        this.cmApi.autoIndentRange(start,end);
	    } else {
		    this.cmApi.autoFormatRange(start,end);
        }
	    this.cmApi.setCursor(start);
    }

    _isJSON(str) {
        try {
            JSON.parse(str);
        }
        catch(e) {
            return false;
        }
        return true;
    }

    _formatModel() {
        let format = (content) => {
	        if (this.autoFormat && (this.mode === 'javascript' || this.mode === 'htmlmixed')) {
		        this.$timeout(() => {
			        if(this.cmApi && this.cmApi.getValue().length > 0) {
				        this.autoFormatText();
				        this.formattedModel = this.cmApi.getValue();
				        this.cmApi.refresh();
			        }
		        });
	        }
	        if (this._isJSON(content)) {
                this.formattedModel = require('js-beautify').js_beautify(content);
            }
            else {
                this.formattedModel = content;
            }
            this.expectChange();
            this.refreshUntilVisible();
        }

        if (!this.allowEdit) {
            format(this.model);
            this.$scope.$watch('jfCodeMirror.model',v=>{
                format(v);
            })
        }
        else {
            this.formattedModel = this.model;
            this.$scope.$watch('jfCodeMirror.model',v=>{
                if (this.formattedModel !== this.model) {
                    this.formattedModel = this.model;
                    this.expectChange();
                    this.refreshUntilVisible();
                }
            });
            this.$scope.$watch('jfCodeMirror.formattedModel',v=>{
                this.model = v;
            });
            this.expectChange();
            this.refreshUntilVisible();
        }
    }

    refreshUntilVisible() {
        if (this.cmApi) this.cmApi.refresh();
        if (this.allowEdit) return;
        this.$timeout(()=>{
            let cmText = $(this.$element).find('.CodeMirror-code').find('pre').text().replace(/\u200B/g,'');
            if (this.expectingChange && cmText === this.lastVal) {
                if (this.cmApi) {
                    this.cmApi.refresh();
                }
                if (!this.$destroyed) this.refreshUntilVisible();
            }
            else if (this.expectingChange) {
                this.expectingChange = false;
                delete this.lastVal;
            }
        },100)
    }

    expectChange() {
        let cmText = $(this.$element).find('.CodeMirror-code').find('pre').text().replace(/\u200B/g,'');
        this.expectingChange = true;
        this.lastVal = cmText;
    }

    defineExtensions() {
	    CodeMirror.defineExtension("autoFormatRange", (from, to) => {
		    let cm = this.cmApi;
		    let outer = cm.getMode(), text = cm.getRange(from, to).split("\n");
		    let state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
		    let tabSize = cm.getOption("tabSize");

		    let out = "", lines = 0, atSol = from.ch == 0;
		    let newline = () => {
			    out += "\n";
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
				    if (!atSol && inner.mode.newlineAfterToken &&
					    inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i+1] || "", inner.state))
					    newline();
			    }
			    if (!stream.pos && outer.blankLine) outer.blankLine(state);
			    if (!atSol) newline();
		    }

		    cm.operation(() => {
			    cm.replaceRange(out, from, to);
			    for (let cur = from.line + 1, end = from.line + lines; cur <= end; ++cur)
				    cm.indentLine(cur, "smart");
		    });
	    });

	    // Applies automatic mode-aware indentation to the specified range
	    CodeMirror.defineExtension("autoIndentRange", (from, to) => {
		    let cmInstance = this.cmApi;
		    this.cmApi.operation(() => {
			    for (let i = from.line; i <= to.line; i++) {
				    cmInstance.indentLine(i, "smart");
			    }
		    });
	    });
    }

	codeMirrorIsWithScroll() {
		let codemirrorScrollBar = this.$element.find('.CodeMirror .CodeMirror-vscrollbar:not(:hidden)');
		return codemirrorScrollBar && codemirrorScrollBar.length > 0;
	}
}