let headerCellTemplate = require('@/ui_components/jfrog_grid/templates/headerCellDefaultTemplate.html');
let globals = {};
export class JFrogGridFactory {
    /* @ngInject */
    constructor() {
        this.$inject('uiGridConstants', '$timeout', '$window', '$state', '$modal', '$rootScope', 'JFrogDownload', 'JFrogEventBus', 'JFrogUIUtils');
        globals.$timeout = this.$timeout;
        globals.$window = this.$window;
        globals.$state = this.$state;
        globals.$modal = this.$modal;
        globals.download = this.JFrogDownload;
        globals.$rootScope = this.$rootScope;
        globals.JFrogEventBus = this.JFrogEventBus;
        globals.utils = this.JFrogUIUtils;
        this._createContextMenu();
    }
    getGridInstance(scope) {
        return new JFrogGrid(scope, this.uiGridConstants);
    }
    getDefaultCellTemplate() {
        return headerCellTemplate;
    }
    _createContextMenu() {
        $.contextMenu({
            selector: '.grid-container .ui-grid-cell-contents, .grid-container .grid-cell-checkbox',
            build: ($trigger, e) => {
                let row = angular.element($trigger[0]).scope().row;
                let uiGrid = angular.element($trigger[0]).controller('uiGrid');
                if (!uiGrid)
                    return;
                let grid = uiGrid.grid;
                let rowActions = grid.appScope.grids[grid.id].buttons;
                let customActionsRaw = _.pluck(grid.columns, 'colDef.customActions');
                let allActions = [];
                if (customActionsRaw) {
                    customActionsRaw.forEach(acts => {
                        if (acts) {
                            acts.forEach(act => {
                                allActions.push(act);
                            });
                        }
                    });
                }
                if (rowActions) {
                    rowActions.forEach(act => {
                        allActions.push(act);
                    });
                }
                allActions = _.filter(allActions, act => {
                    return row && (!act.visibleWhen || grid.options.checkVisibleWhen(act, row));
                });
                let editAction = this._getEditAction($trigger, row, grid);
                let additionalActions = this._getAdditionalActions($trigger, row, grid);
                if (!allActions.length && !editAction && additionalActions.length === 0 || !row) {
                    return false;
                } else {
                    let cmItems = {};
                    if (editAction) {
                        cmItems['*edit*'] = {
                            name: 'Edit',
                            icon: 'artifactory-edit'
                        };
                    }
                    let getIconName = classdef => {
                        let iconName;
                        let classes = classdef.split(' ');
                        classes.forEach(cls => {
                            if (cls.startsWith('icon-')) {
                                iconName = cls.substr(5);
                            }
                        });
                        return iconName;
                    };
                    if (additionalActions) {
                        for (let i in additionalActions) {
                            let action = additionalActions[i];
                            cmItems['@' + action.name] = {
                                name: action.name,
                                icon: getIconName(action.icon)
                            };
                        }
                    }
                    for (let actI in allActions) {
                        let act = allActions[actI];
                        act.key = act.tooltip.split(' ').join('').toLowerCase();
                        cmItems[act.key] = {
                            name: act.tooltip,
                            icon: getIconName(act.icon)
                        };
                    }
                    globals.$timeout(() => {
                        $('.context-menu-item').on('click', e => {
                            if (this.actionToDo) {
                                $(e.target).trigger('contextmenu:hide');
                                globals.$timeout(() => {
                                    this.actionToDo();
                                    this.$delete(this, 'actionToDo');
                                }, 100);
                            }
                        });
                    });
                    return {
                        callback: (key, options) => {
                            this.$set(this, 'actionToDo', () => {
                                if (key === '*edit*') {
                                    editAction.do();
                                } else if (key.startsWith('@')) {
                                    let actionName = key.substr(1);
                                    let action = _.find(additionalActions, { name: actionName });
                                    action.do();
                                } else {
                                    let act = _.find(allActions, { key: key });
                                    grid.options.callActionCallback(act, row);
                                    if (act.href) {
                                        let url = grid.options.getActionHref(act, row);
                                        if (url)
                                            globals.download(url);
                                    }
                                }
                            });
                            return false;
                        },
                        items: cmItems
                    }
;
                }
            }
        });
    }
    _getEditAction($trigger, row, grid) {
        let objScope = {
            row: row,
            grid: grid
        };
        let editState = $trigger.parent().parent().find('[ui-sref]:not(.no-cm-action)').length ? $trigger.parent().parent().find('[ui-sref]:not(.no-cm-action)')[0].attributes['ui-sref'].textContent : null;
        if (editState) {
            let parenthesesOpenIndex = editState.indexOf('(');
            let state = editState.substr(0, parenthesesOpenIndex);
            let paramsString = editState.substr(parenthesesOpenIndex);
            let openBraceIndex = paramsString.indexOf('{');
            let closeBraceIndex = paramsString.lastIndexOf('}');
            paramsString = paramsString.substr(openBraceIndex + 1, closeBraceIndex - openBraceIndex - 1);
            let paramsObj = {};
            let paramsSplit = paramsString.split(',');
            paramsSplit.forEach(param => {
                let keyVal = param.split(':');
                let key = keyVal[0].trim();
                let val = keyVal[1].trim();
                if (val.startsWith('row.') || val.startsWith('grid.'))
                    val = _.get(objScope, val);
                else if (val.startsWith('!row.') || val.startsWith('!grid.'))
                    val = !_.get(objScope, val);
                else if (val.startsWith('\''))
                    val = val.split('\'').join('');
                else if (val.startsWith('"'))
                    val = val.split('"').join('');
                paramsObj[key] = val;
            });
            return {
                do: () => {
                    globals.$state.go(state, paramsObj);
                }
            };
        } else {
            let ngClicks = $trigger.parent().parent().find('[ng-click]:not(.no-cm-action)');
            let clickCommand;
            for (let i in ngClicks) {
                let ngClick = ngClicks[i];
                if (ngClick.attributes && ngClick.attributes['ng-click'] && ngClick.attributes['ng-click'].textContent.startsWith('grid.appScope')) {
                    clickCommand = ngClick.attributes['ng-click'].textContent;
                    break;
                }
            }
            if (clickCommand) {
                let parenthesesOpenIndex = clickCommand.indexOf('(');
                let funcName = clickCommand.substr(0, parenthesesOpenIndex);
                let paramsString = clickCommand.substr(parenthesesOpenIndex).split('(').join('').split(')').join('').trim();
                let param = _.get(objScope, paramsString);
                let funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf('.')));
                let func = _.get(objScope, funcName).bind(funcThis);
                return {
                    do: () => {
                        func(param);
                    }
                };
            } else
                return null;
        }
    }
    _getAdditionalActions($trigger, row, grid) {
        let objScope = {
            row: row,
            grid: grid
        };
        let additionalCommands = [];
        let additionalElems = $trigger.parent().parent().find('[cm-aditional-action]');
        for (let i = 0; i < additionalElems.length; i++) {
            let elem = additionalElems[i];
            let clickCommand = elem.attributes['ng-click'].textContent;
            let icon = elem.attributes['class'].textContent;
            let commandName = elem.attributes['cm-aditional-action'].textContent;
            if (clickCommand) {
                let parenthesesOpenIndex = clickCommand.indexOf('(');
                let funcName = clickCommand.substr(0, parenthesesOpenIndex);
                let paramsString = clickCommand.substr(parenthesesOpenIndex).split('(').join('').split(')').join('').trim();
                let param = _.get(objScope, paramsString);
                let funcThis = _.get(objScope, funcName.substr(0, funcName.lastIndexOf('.')));
                let func = _.get(objScope, funcName).bind(funcThis);
                additionalCommands.push({
                    name: commandName,
                    icon: icon,
                    do: () => {
                        func(param);
                    }
                });
            }
        }
        return additionalCommands;
    }
}
