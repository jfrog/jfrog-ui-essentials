/*
 * jQuery Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * Code a little bit refactored and cleaned (in my humble opinion).
 * Most important changes:
 *  - has an option to highlight only entire words (wordsOnly - false by default),
 *  - has an option to be case sensitive (caseSensitive - false by default)
 *  - highlight element tag and class names can be specified in options
 *
 * Usage:
 *   // wrap every occurrance of text 'lorem' in content
 *   // with <span class='highlight'> (default options)
 *   $('#content').highlight('lorem');
 *
 *   // search for and highlight more terms at once
 *   // so you can save some time on traversing DOM
 *   $('#content').highlight(['lorem', 'ipsum']);
 *   $('#content').highlight('lorem ipsum');
 *
 *   // search only for entire word 'lorem'
 *   $('#content').highlight('lorem', { wordsOnly: true });
 *
 *   // don't ignore case during search of term 'lorem'
 *   $('#content').highlight('lorem', { caseSensitive: true });
 *
 *   // wrap every occurrance of term 'ipsum' in content
 *   // with <em class='important'>
 *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
 *
 *   // remove default highlight
 *   $('#content').unhighlight();
 *
 *   // remove custom highlight
 *   $('#content').unhighlight({ element: 'em', className: 'important' });
 *
 *
 * Copyright (c) 2009 Bartek Szopka
 *
 * Licensed under MIT license.
 *
 */

jQuery.extend({
    highlight: function (node, re, nodeName, className) {
        if (node.nodeType === 3) {
            var match = node.data.match(re);
            if (match) {
                var highlight = document.createElement(nodeName || 'span');
                highlight.className = className || 'highlight';
                var wordNode = node.splitText(match.index);
                wordNode.splitText(match[0].length);
                var wordClone = wordNode.cloneNode(true);
                highlight.appendChild(wordClone);
                wordNode.parentNode.replaceChild(highlight, wordNode);
                return 1; //skip added node in parent
            }
        } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
                !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
            for (var i = 0; i < node.childNodes.length; i++) {
                i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
            }
        }
        return 0;
    }
});

jQuery.fn.unhighlight = function (options) {
    var settings = { className: 'highlight', element: 'span' };
    jQuery.extend(settings, options);

    return this.find(settings.element + "." + settings.className).each(function () {
        var parent = this.parentNode;
        parent.replaceChild(this.firstChild, this);
        parent.normalize();
    }).end();
};

jQuery.fn.highlight = function (words, options) {
    var settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
    jQuery.extend(settings, options);
    
    if (words.constructor === String) {
        words = [words];
    }
    words = jQuery.grep(words, function(word, i){
      return word != '';
    });
    words = jQuery.map(words, function(word, i) {
      return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    });
    if (words.length == 0) { return this; };

    var flag = settings.caseSensitive ? "" : "i";
    var pattern = "(" + words.join("|") + ")";
    if (settings.wordsOnly) {
        pattern = "\\b" + pattern + "\\b";
    }
    var re = new RegExp(pattern, flag);
    
    return this.each(function () {
        jQuery.highlight(this, re, settings.element, settings.className);
    });
};


(function() {
    'use strict';

    angular.module('ui.grid.draggable-rows', ['ui.grid'])

    .constant('uiGridDraggableRowsConstants', {
        featureName: 'draggableRows',
        ROW_OVER_CLASS: 'ui-grid-draggable-row-over',
        ROW_OVER_ABOVE_CLASS: 'ui-grid-draggable-row-over--above',
        ROW_OVER_BELOW_CLASS: 'ui-grid-draggable-row-over--below',
        POSITION_ABOVE: 'above',
        POSITION_BELOW: 'below',
        publicEvents: {
            draggableRows: {
                rowDragged: function(scope, info, rowElement) {},
                rowDropped: function(scope, info, targetElement) {},
                rowOverRow: function(scope, info, rowElement) {},
                rowEnterRow: function(scope, info, rowElement) {},
                rowLeavesRow: function(scope, info, rowElement) {},
                rowFinishDrag: function(scope) {}
            }
        }
    })

    .factory('uiGridDraggableRowsCommon', [function() {
        return {
            draggedRow: null,
            draggedRowEntity: null,
            position: null,
            fromIndex: null,
            toIndex: null
        };
    }])

    .service('uiGridDraggableRowsService', ['uiGridDraggableRowsConstants', function(uiGridDraggableRowsConstants) {
        this.initializeGrid = function(grid, $scope, $element) {
            grid.api.registerEventsFromObject(uiGridDraggableRowsConstants.publicEvents);

            grid.api.draggableRows.on.rowFinishDrag($scope, function() {
                angular.forEach($element[0].querySelectorAll('.' + uiGridDraggableRowsConstants.ROW_OVER_CLASS), function(row) {
                    row.classList.remove(uiGridDraggableRowsConstants.ROW_OVER_CLASS);
                    row.classList.remove(uiGridDraggableRowsConstants.ROW_OVER_ABOVE_CLASS);
                    row.classList.remove(uiGridDraggableRowsConstants.ROW_OVER_BELOW_CLASS);
                });
            });
        };
    }])

    .service('uiGridDraggableRowService', ['uiGridDraggableRowsConstants', 'uiGridDraggableRowsCommon', '$parse', function(uiGridDraggableRowsConstants, uiGridDraggableRowsCommon, $parse) {
        var move = function(from, to) {
            /*jshint validthis: true */
            this.splice(to, 0, this.splice(from, 1)[0]);
        };

        this.prepareDraggableRow = function($scope, $element) {
            var grid = $scope.grid;
            var row = $element[0];

            var data = function() {
                if (angular.isString(grid.options.data)) {
                    return $parse(grid.options.data)(grid.appScope);
                }

                return grid.options.data;
            };

            var listeners = {
                onDragOverEventListener: function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }

                    var dataTransfer = e.dataTransfer || e.originalEvent.dataTransfer;
                    dataTransfer.effectAllowed = 'copyMove';
                    dataTransfer.dropEffect = 'move';

                    var offset = e.offsetY || e.layerY || (e.originalEvent ? e.originalEvent.offsetY : 0);

                    if (offset < this.offsetHeight / 2) {
                        uiGridDraggableRowsCommon.position = uiGridDraggableRowsConstants.POSITION_ABOVE;

                        $element.removeClass(uiGridDraggableRowsConstants.ROW_OVER_BELOW_CLASS);
                        $element.addClass(uiGridDraggableRowsConstants.ROW_OVER_ABOVE_CLASS);

                    } else {
                        uiGridDraggableRowsCommon.position = uiGridDraggableRowsConstants.POSITION_BELOW;

                        $element.removeClass(uiGridDraggableRowsConstants.ROW_OVER_ABOVE_CLASS);
                        $element.addClass(uiGridDraggableRowsConstants.ROW_OVER_BELOW_CLASS);
                    }

                    grid.api.draggableRows.raise.rowOverRow(uiGridDraggableRowsCommon, this);
                },

                onDragStartEventListener: function(e) {
                    e.dataTransfer.setData('Text', 'move'); // Need to set some data for FF to work
                    uiGridDraggableRowsCommon.draggedRow = this;
                    uiGridDraggableRowsCommon.draggedRowEntity = $scope.$parent.$parent.row.entity;

                    uiGridDraggableRowsCommon.position = null;

                    uiGridDraggableRowsCommon.fromIndex = data().indexOf(uiGridDraggableRowsCommon.draggedRowEntity);
                    uiGridDraggableRowsCommon.toIndex = null;

                    grid.api.draggableRows.raise.rowDragged(uiGridDraggableRowsCommon, this);
                },

                onDragLeaveEventListener: function(e) {
                    grid.api.draggableRows.raise.rowLeavesRow(uiGridDraggableRowsCommon, this);
                },

                onDragEnterEventListener: function(e) {
                    var offset = e.offsetY || e.layerY || (e.originalEvent ? e.originalEvent.offsetY : 0);

                    $('.' + uiGridDraggableRowsConstants.ROW_OVER_CLASS).removeClass(uiGridDraggableRowsConstants.ROW_OVER_CLASS);

                    $element.addClass(uiGridDraggableRowsConstants.ROW_OVER_CLASS);

                    grid.api.draggableRows.raise.rowEnterRow(uiGridDraggableRowsCommon, this);
                },

                onDragEndEventListener: function() {
                    grid.api.draggableRows.raise.rowFinishDrag();
                },

                onDropEventListener: function(e) {
                    var draggedRow = uiGridDraggableRowsCommon.draggedRow;

                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }

                    if (e.preventDefault) {
                        e.preventDefault();
                    }

                    if (draggedRow === this) {
                        return false;
                    }

                    uiGridDraggableRowsCommon.toIndex = data().indexOf($scope.$parent.$parent.row.entity);

                    if (uiGridDraggableRowsCommon.position === uiGridDraggableRowsConstants.POSITION_ABOVE) {
                        if (uiGridDraggableRowsCommon.fromIndex < uiGridDraggableRowsCommon.toIndex) {
                            uiGridDraggableRowsCommon.toIndex -= 1;
                        }

                    } else if (uiGridDraggableRowsCommon.fromIndex >= uiGridDraggableRowsCommon.toIndex) {
                        uiGridDraggableRowsCommon.toIndex += 1;
                    }

                    $scope.$apply(function() {
                        move.apply(data(), [uiGridDraggableRowsCommon.fromIndex, uiGridDraggableRowsCommon.toIndex]);
                    });

                    grid.api.draggableRows.raise.rowDropped(uiGridDraggableRowsCommon, this);

                    e.preventDefault();
                }
            };

            row.addEventListener('dragover', listeners.onDragOverEventListener, false);
            row.addEventListener('dragstart', listeners.onDragStartEventListener, false);
            row.addEventListener('dragleave', listeners.onDragLeaveEventListener, false);
            row.addEventListener('dragenter', listeners.onDragEnterEventListener, false);
            row.addEventListener('dragend', listeners.onDragEndEventListener, false);
            row.addEventListener('drop', listeners.onDropEventListener);
        };
    }])

    .directive('uiGridDraggableRow', ['uiGridDraggableRowService', function(uiGridDraggableRowService) {
        return {
            restrict: 'ACE',
            scope: {
                grid: '='
            },
            compile: function() {
                return {
                    pre: function($scope, $element) {
                        uiGridDraggableRowService.prepareDraggableRow($scope, $element);
                    }
                };
            }
        };
    }])

    .directive('uiGridDraggableRows', ['uiGridDraggableRowsService', function(uiGridDraggableRowsService) {
        return {
            restrict: 'A',
            replace: true,
            priority: 0,
            require: 'uiGrid',
            scope: false,
            compile: function() {
                return {
                    pre: function($scope, $element, $attrs, uiGridCtrl) {
                        uiGridDraggableRowsService.initializeGrid(uiGridCtrl.grid, $scope, $element);
                    }
                };
            }
        };
    }]);
}());
