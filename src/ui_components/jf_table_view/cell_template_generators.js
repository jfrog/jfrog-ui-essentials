let nextId = 0;
let cellTemplateGenerators = {
    artifactoryRepoPathColumn: function (specialClass) {
        return '<div><div v-if="row.entity.repoKey" class="ui-grid-cell-contents ' + specialClass + '">{{row.entity.repoKey}}/{{row.entity.path}}</div>' + '<div v-if="!row.entity.repoKey" class="ui-grid-cell-contents ' + specialClass + '">{{row.entity.path}}</div></div>';
    },

    downloadableColumn: function (specialClass) {
        return '<div><div v-if="row.entity.downloadLink" class="jf-link ui-grid-cell-contents ' + specialClass + '">{{row.entity.name}}</div>' + '<div v-if="!row.entity.downloadLink" class="ui-grid-cell-contents ' + specialClass + '">{{row.entity.name}}</div></div>';
    },

    booleanColumn: function (model) {
        return '<div class="grid-checkbox"><input v-model="' + model + '" type="checkbox" disabled/><span class="icon icon-v"></span></div>';
    },
    checkboxColumn: function (model, click, disabled) {
        return '<div><div class="grid-cell-checkbox"><jf-checkbox><input v-model="' + model + '"' + (click && click.length ? ' @input="' + click + '"' : '') + (disabled && disabled.length ? ' :disabled="' + disabled + '"' : '') + ' type="checkbox"/></jf-checkbox></div></div>';
    },
    listableColumn: function (listModel, rowNameModel, displayModel, alwaysShow, testIdPrefix = null, showAsyncData, externalCountModel) {

        testIdPrefix = testIdPrefix ? testIdPrefix + '-' : '';

        displayModel = displayModel ? `{{${ listModel }.length}} | {{${ displayModel }}}` : `{{${ externalCountModel } ? ${ externalCountModel } : ${ listModel }.length}} | {{${ listModel }.join(\', \')}}{{${ externalCountModel } && ${ externalCountModel } > ${ listModel }.length ? ',...' : ''}}`;

        let id = `${ testIdPrefix }{{row.uid}}_${ nextId }`;

        let template = `<div><div v-if="${ listModel }.length" 
                                   :class="{'ui-grid-cell-contents no-tooltip': true, 'always-show': ${ showAsyncData } || ${ alwaysShow } }"id="${ id }">
                                <span class="gridcell-content-text">${ displayModel }</span>
                                 <a class="jf-link gridcell-showall" v-if="!(${ showAsyncData }) && (table.options.isOverflowing('${ testIdPrefix }'+row.uid+'_'+${ nextId }) || ${ alwaysShow })" href @click="table.options.showAll(${ listModel },${ rowNameModel },col);$event.stopPropagation()"> (See All)</a>
                                 <a class="jf-link gridcell-showall" v-if="${ showAsyncData }" href @click="table.options.asyncShowAll(${ rowNameModel },col)"> (See All)</a>
                             </div>
                             <div v-if="!${ listModel }.length" class="ui-grid-cell-contents no-tooltip" id="${ id }">-</div></div>`;

        nextId++;
        return template;
    },
    iconColumn: function (cellText, cellIcon, iconClass) {
        return '<div id="type"><i class="icon icon-{{' + cellIcon + '}}' + (iconClass ? ' ' + iconClass : '') + '"></i>{{' + cellText + '}}</div>';
    },
    ajaxColumn: function () {
        return '<div class="ui-grid-cell-contents status-grid"><div class="icon-hourglass" v-if="!row.entity.status"></div>{{row.entity.status}}</div>';
    }
}
;
export default cellTemplateGenerators;
