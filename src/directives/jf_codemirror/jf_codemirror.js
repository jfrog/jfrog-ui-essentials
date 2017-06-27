import {search}  from './search/search'

export function jfCodeMirror() {
    return {
        restrict: 'E',
        scope: {
            mimeType: '@',
            mode: '@',
            model: '=',
            allowEdit: '=',
            height: '@?',
            apiAccess: '=',
            autofocus: '@'
        },
        controller: jfCodeController,
        controllerAs: 'jfCodeMirror',
        bindToController: true,
        template: '<textarea ui-codemirror="jfCodeMirror.editorOptions" ' +
        'ng-model="jfCodeMirror.formattedModel"></textarea>'

    }
}

class jfCodeController {
	/* @ngInject */
    constructor($scope, $element, $timeout) {
        this.$element = $element;
        this.$scope = $scope;
        this.$timeout = $timeout;

        this._formatModel();

        this.editorOptions = {
            lineNumbers: true,
            readOnly: !this.allowEdit, // Don't use nocursor - it disables search
            lineWrapping: true,
            mode: this.mode || 'links',
            viewportMargin: 65,
            autofocus: this.autofocus,
            mimeType: this.mimeType,
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
        $(_editor.display.wrapper).on('click', '.cm-link', function (e) {
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
                this.formattedModel = this.model;
                this.expectChange();
                this.refreshUntilVisible();
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
            let cmText = this.$element.find('.CodeMirror-code').find('pre').text().replace(/\u200B/g,'');
            if (this.expectingChange && cmText === this.lastVal) {
                if (this.cmApi) {
                    this.cmApi.refresh();
                }
                if (!this.$destroyed) this.refreshUntilVisible();
            }
            else if (this.expectingChange) {
                this.expectingChange = false;
            }
        },100)
    }

    expectChange() {
        let cmText = this.$element.find('.CodeMirror-code').find('pre').text().replace(/\u200B/g,'');
        this.expectingChange = true;
        this.lastVal = cmText;
    }
}