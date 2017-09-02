let dryrun;
//dryrun = true;
let printOutput;
//printOutput = true;
let printProgress = true;
let progress = (progStr) => printProgress && console.log(progStr);
let jetpack = require('fs-jetpack');
let _ = require('lodash');

let json = (node) => console.log(JSON.stringify(node, null, 4));
let inspect = (obj, depth) => console.dir(obj, {depth: depth || null});

let esEditor = require('./es-editor');


let directiveRegex = /<jf-grid(?:.|\n)*?((?:.|\n)*?)>(?:.|\n)*?<\/jf-grid>/g;
let convertedAttributes = ['grid-options', 'object-name', 'auto-focus', 'filter-field', 'filter-field2', 'no-count', 'filter-on-change'];


global.jfTableViewConverter = {};

const jsonFile = process.argv[2];

if (!jsonFile) console.error('Missing conversion description json file !');
else processConversionJson(jsonFile);

function processConversionJson(jsonFile) {
  if (!jetpack.exists(jsonFile)) {
    console.error('Conversion description file not found !');
  }
  else {
    let conversionJson = global.jfTableViewConverter.conversionJson = jetpack.read(jsonFile, 'json');

    let workingDir = global.jfTableViewConverter.workingDir = _.dropRight(jsonFile.split('/')).join('/');

    let localJetpack = global.jfTableViewConverter.localJetpack = jetpack.cwd(workingDir);

    let perSource = (moduleFile, templateFile, controllerFile) => {
      if (moduleFile && controllerFile && templateFile) {
        console.error('Found module+template+controller (Should only found wither module, or template+controller)')
      }
      if (!moduleFile && (!controllerFile || !templateFile)) {
        console.error('Missing sources !')
      }
      else {
        if (moduleFile) {
          convertByModule(moduleFile)
        }
        else {
          convertByControllerAndTemplate(templateFile, controllerFile)
        }
      }
    }

    if (!_.isArray(conversionJson.sources)) {
      let moduleFile = conversionJson.sources.module;
      let templateFile = conversionJson.sources.template;
      let controllerFile = conversionJson.sources.controller;
      perSource(moduleFile, templateFile, controllerFile)
    }
    else {
      conversionJson.sources.forEach(source => {
        perSource(source.module, source.template, source.controller)
      })
    }


  }
}

function convertByControllerAndTemplate(templateFile, controllerFile, controllerAs) {

  progress(`Converting:\nTemplate=${templateFile}\nController=${controllerFile}`)

  global.jfTableViewConverter.controllerAs = controllerAs;

  if (!global.jfTableViewConverter.localJetpack.exists(templateFile)) console.error('Template file not found !', templateFile);
  else if (!global.jfTableViewConverter.localJetpack.exists(controllerFile)) console.error('Controller file not' + ' found !', controllerFile);
  else {
    let template = global.jfTableViewConverter.localJetpack.read(templateFile);

    let directives = getDirectives(template);
    progress('Rewriting template...')
    let newTemplate = rewriteTemplate(template, directives);
    if (!dryrun) global.jfTableViewConverter.localJetpack.write(global.jfTableViewConverter.conversionJson.overwrite ? templateFile : templateFile.replace('.html', '.converted.html'), newTemplate);

    progress('Rewriting controller...')
    rewriteController(controllerFile, directives);
  }
}

function convertByController(controllerFile) {
  if (!global.jfTableViewConverter.localJetpack.exists(controllerFile)) console.error('Controller file not' + ' found !', controllerFile);
  else {
    let controllerEditor = esEditor(controllerFile);
    let exportDeclaration = controllerEditor.root.select('ExportNamedDeclaration')[0];
    if (exportDeclaration) {
      if (exportDeclaration.has('declaration.body.body[0].argument')) {
        let dirDescObject = exportDeclaration.get('declaration.body.body[0].argument.properties');
        let templateUrlProperty = _.find(dirDescObject, {node: {key: {name: 'templateUrl'}}})
        if (templateUrlProperty) {
          convertByControllerAndTemplate(global.jfTableViewConverter.conversionJson.base + templateUrlProperty.get('value.value'), controllerFile);
        }
      }
    }
  }
}

function convertByModule(moduleFile) {
  progress('Converting module: ' + moduleFile);
  if (!global.jfTableViewConverter.localJetpack.exists(moduleFile)) console.error('Module file not found !', moduleFile);
  else {
    let baseDir = _.dropRight(moduleFile.split('/')).join('/');

    let moduleEditor = esEditor(moduleFile);


    let angularControllerCalls = moduleEditor.root.select('CallExpression[callee.property.name="controller"][arguments.0.type="Literal"][arguments.1.type="Identifier"]');
    let imports = moduleEditor.root.select(`ImportDeclaration`);

    let treatedImports = [];
    angularControllerCalls.forEach(c => {
      let [name, identifier] = c.get('arguments');
      name = name.get('value');
      identifier = identifier.get('name');

      let importDeclaration = _.find(imports, imp => {
        let specifier = _.find(imp.get('specifiers'), {node: {local: {name: identifier}}})
        if (specifier) {
          treatedImports.push(imp);
          return true;
        }
      })
      let controllerFileName = importDeclaration.get('source.value');
      if (!_.endsWith(controllerFileName, '.js')) controllerFileName += '.js';
      controllerFileName = baseDir + '/' + _.trim(controllerFileName, './');

      let controllerAs;
      let controllerProperty = _.find(moduleEditor.root.select('Property[key.name="controller"]'), p => {
        if (p.get('value.value') === name || p.get('value.value').indexOf(name + ' as ') !== -1) {
          controllerAs = p.get('value.value') === name ? name : p.get('value.value').split(' as ')[1];
          return true;
        }
      })

      if (controllerProperty) {
        let objectExpression = controllerProperty.parent().parent();

        let templateUrlProperty = _.find(objectExpression.get('properties'), {node: {key: {name: 'templateUrl'}}});
        if (templateUrlProperty) {
          let templateFileName = global.jfTableViewConverter.conversionJson.base + templateUrlProperty.get('value.value');

          if (templateFileName && controllerFileName) {
            convertByControllerAndTemplate(templateFileName, controllerFileName, controllerAs);
          }
        }
      }

    });

    imports.forEach(imp => {
      if (!_.includes(treatedImports, imp)) {
        let source = imp.get('source.value');
        if (!_.endsWith(source, '.js')) source += '.js';
        source = baseDir + '/' + _.trim(source, './');
        if (source.endsWith('.module.js')) {
          convertByModule(source);
        }
        else {
          convertByController(source);
        }
      }
    })
  }
}

function getDirectives(template) {
  let matches = template.match(directiveRegex);

  let directives = [];

  if (matches && matches.length) {
    matches.forEach(match => {
      directives.push({
        exactElement: match,
        attrs: getAttributesFromElement(match)
      })
    })
  }

  return directives;

}

function getAttributesFromElement(element) {

  element = element.replace(/\n/g, ' ');
  element = element.replace(/ +/g, ' ');
  let attrsString = directiveRegex.exec(element)[1];
  if (directiveRegex.exec(element)) {
    console.error('Error on getAttributesFromElement');
  }

  let attrs = {}

  let spacesNotInQuotes = /\s+(?=([^"]*"[^"]*")*[^"]*$)/g
  attrsString.replace(spacesNotInQuotes, '∆').split('∆').forEach(keyValString => {
    let [key, val] = keyValString.split('=');
    if (key) attrs[key] = val || null;
  })

  return attrs;
}

function rewriteTemplate(template, directives) {
  directives.forEach(dir => {
    let index = template.indexOf(dir.exactElement);
    let indent = global.jfTableViewConverter.editor.editor.getIndentation(template, index);
    let retainedAttrs = _.filter(Object.keys(dir.attrs), a => !_.includes(convertedAttributes, a));
    retainedAttrs = _.map(retainedAttrs, a => {
      let str = `${a}=${dir.attrs[a]}`
      delete dir.attrs[a];
      return '\n' + ' '.repeat(indent + '<jf-table-view '.length) + str;
    }).join(' ');

    let newDir = `<jf-table-view options=${dir.attrs['grid-options']}${retainedAttrs}></jf-table-view>`
    template = template.replace(dir.exactElement, newDir);
  })
  return template;
}

function rewriteController(controllerFile, directives) {
  global.jfTableViewConverter.editor = esEditor(controllerFile);
  global.jfTableViewConverter.root = global.jfTableViewConverter.editor.root;

  progress('Replacing injections')
  replaceInjections();

  rewriteDirective(directives);

  if (!dryrun) global.jfTableViewConverter.editor.editor.write();
  else if (printOutput) console.log(global.jfTableViewConverter.editor.editor.getEditedSource());
  else global.jfTableViewConverter.editor.editor.getEditedSource();
}

function replaceInjections() {
  let constructors = global.jfTableViewConverter.root.select('ClassDeclaration MethodDefinition[kind="constructor"] FunctionExpression');
  if (!constructors.length) return;
  let params = constructors[0].get('params');

  let foundJFrogGridFactory = false;
  let underlineInjections = false;
  params.removeIf(p => {
    if (p.get('name') === 'JFrogGridFactory' || p.get('name') === '_JFrogGridFactory_') foundJFrogGridFactory = true;
    if (p.get('name') === '_JFrogGridFactory_') underlineInjections = true;
    return _.includes(['JFrogGridFactory', 'uiGridConstants', 'commonGridColumns', '_JFrogGridFactory_', '_uiGridConstants_', '_commonGridColumns_'], p.get('name'));
  })

  if (!foundJFrogGridFactory) return;

  if (!_.find(params, p => p.get('name') === '_JFrogTableViewOptions_' || p.get('name') === 'JFrogTableViewOptions')) {
    params.push({
      type: 'Identifier',
      name: underlineInjections ? '_JFrogTableViewOptions_' : 'JFrogTableViewOptions'
    })
  }

  let body = constructors[0].get('body.body');

  body.removeIf(statement => {
    if (statement.has('expression') && statement.get('expression.operator') === '=') {
      if (statement.get('expression.right.name') === 'commonGridColumns') {
        global.jfTableViewConverter.commonGridColumns = statement.get('expression.left.property.name');
      }
      if (_.includes(['uiGridConstants', 'commonGridColumns'], statement.get('expression.right.name'))) {
        return true;
      }
    }
    return false;
  })

  let renameVar;
  _.forEach(body, statement => {
    if (statement.has('expression') && statement.get('expression.operator') === '=') {
      if (statement.get('expression.right.name') === (underlineInjections ? '_JFrogGridFactory_' : 'JFrogGridFactory')) {
        statement.set('expression.right.name', underlineInjections ? '_JFrogTableViewOptions_' : 'JFrogTableViewOptions');
        if (statement.get('expression.left.property')) {
          global.jfTableViewConverter.optionsNotOnThis = false;
          statement.set('expression.left.property.name', 'JFrogTableViewOptions');
        }
        else {
          global.jfTableViewConverter.optionsNotOnThis = true;
          renameVar = statement.get('expression.left.name');
          statement.set('expression.left.name', 'JFrogTableViewOptions');
        }
      }
    }
  })


  if (renameVar) {
    let varDeclarator = global.jfTableViewConverter.root.select(`VariableDeclarator[id.name="${renameVar}"]`)[0];
    varDeclarator.set('id.name', 'JFrogTableViewOptions');
  }

}



function rewriteDirective(directives) {
  let controllerAs = getControllerAs();
  directives.forEach(dir => {
    let gridOptions = dir.attrs['grid-options'];
    gridOptions = _.trim(gridOptions, '"');
    gridOptions = gridOptions.replace(controllerAs + '.', '');
    let creationLocation = locateGridCreation(gridOptions);
    progress('Rewriting creation code')
    rewriteCreation(creationLocation, dir);
    progress('Rewriting columns definition')
    rewriteColumns(dir);
    progress('Rewriting more stuff')
    rewriteAllTheRest(dir, creationLocation);
  })
}

function getControllerAs() {
  if (global.jfTableViewConverter.controllerAs) {
    return global.jfTableViewConverter.controllerAs
  }
  else {
    let exportDeclaration = global.jfTableViewConverter.editor.root.select('ExportNamedDeclaration')[0];
    if (exportDeclaration.get('declaration.body.body[0].argument')) {
      let dirDescObject = exportDeclaration.get('declaration.body.body[0].argument.properties');
      let controllerAsProperty = _.find(dirDescObject, {node: {key: {name: 'controllerAs'}}})
      if (controllerAsProperty) return controllerAsProperty.get('value.value');
    }
    else return 'ctrl';
  }
}

function locateGridCreation(gridOptions) {

  let methods = global.jfTableViewConverter.editor.root.select('ClassDeclaration MethodDefinition');

  let assigment;
  let creationMethod = _.find(methods, method => {
    let assignments = method.select('AssignmentExpression');
    assigment = _.find(assignments, a => {
      if (a.get('left').select(`MemberExpression[object.type="ThisExpression"][property.name="${gridOptions}"]`).length &&
          a.get('right').select('Identifier[name="getGridInstance"]').length) {
        return true;
      }
    })

    if (assigment) return true;
  })

  return {
    method: creationMethod,
    assigment
  }
}


function rewriteCreation(creationLocation, directive) {
  if (!creationLocation.assigment) return;
  let editor = global.jfTableViewConverter.editor.editor;

  let creationMemberExpression = creationLocation.assigment.get('right')
    .select('MemberExpression[object.callee.property.name="getGridInstance"]')[0];

  let creationStatement = creationMemberExpression.parent('ExpressionStatement');

  let newExpression = editor.createNewElementFromObject({
    'type': 'NewExpression',
    'callee': {
      'type': 'MemberExpression',
      'computed': false,
      'object': {
        'type': 'ThisExpression'
      },
      'property': {
        'type': 'Identifier',
        'name': 'JFrogTableViewOptions'
      }
    },
    'arguments': []
  })
  newExpression.set('arguments', creationMemberExpression.get('object.arguments'));

  if (global.jfTableViewConverter.optionsNotOnThis) newExpression.set('callee', newExpression.get('callee.property'));

  let clone = creationStatement.clone().get('expression');
  clone.set('right', newExpression);
  creationStatement.set('expression', creationStatement.get('expression.right'));
  creationMemberExpression.set('object', clone)

  let chainStart = creationStatement.get('expression');

  _removeFromChain(chainStart, 'setRowTemplate')

  let setButtons = chainStart.select('Identifier[name="setButtons"]')[0];
  if (setButtons) setButtons.set('name', 'setActions');

  let setMultiSelect = chainStart.select('Identifier[name="setMultiSelect"]')[0];
  let setSingleSelect = chainStart.select('Identifier[name="setSingleSelect"]')[0];

  if (setMultiSelect || setSingleSelect) {
    let selectionParent = (setMultiSelect || setSingleSelect).parent().parent();

    selectionParent.set('callee.property.name', 'setSelection');
    let param = editor.createNewElementFromCode(clone.get('left').src + (setMultiSelect ? '.MULTI_SELECTION' : '.SINGLE_SELECTION')).get('expression');
    selectionParent.set('arguments', [param]);
  }

  let setGridData = chainStart.select('Identifier[name="setGridData"]')[0];

  if (setGridData) {
    setGridData.set('name', 'setData');
  }

  if (directive.attrs['object-name'] !== undefined) {
    _addToChain(chainStart, 'setObjectName', [
      {
        type: 'Literal',
        value: _.trim(directive.attrs['object-name'], '"'),
        raw: `'${_.trim(directive.attrs['object-name'], '"')}'`
      }
    ])
  }

  if (directive.attrs['auto-focus'] !== undefined) {
    _addToChain(chainStart, 'setAutoFocusFilter', []);
  }
  if (directive.attrs['no-count'] !== undefined) {
    _addToChain(chainStart, 'showCounter', [
      {
        type: 'Literal',
        value: false
      }
    ]);
  }

  let setColumns = chainStart.select('Identifier[name="setColumns"]')[0].parent().parent();

  let getColumnsMethodName = setColumns.get('arguments[0].callee.property.name');

  directive.chainHeader = chainStart;

  directive.getColumnsMethodName = getColumnsMethodName;

//  console.log(creationStatement.src)
}

function rewriteColumns(directive) {
  let filterBy = [];
  if (directive.attrs['filter-field'] !== undefined) {
    filterBy.push(_.trim(directive.attrs['filter-field'], '"'));
    if (directive.attrs['filter-field2'] !== undefined) {
      filterBy.push(_.trim(directive.attrs['filter-field2'], '"'));
    }
  }

  let getColumnsMethod = global.jfTableViewConverter.editor
    .root.select(`ClassDeclaration MethodDefinition[kind="method"][key.name="${directive.getColumnsMethodName}"]`)[0];

  if (!getColumnsMethod) return;

  let arrayExpressions = getColumnsMethod.select('FunctionExpression ArrayExpression');

  let columnsArray = _.filter(arrayExpressions, ae => {
    let parentAE = ae.parent('ArrayExpression');
    let parentAEMethod = parentAE ? parentAE.select('MethodDefinition') : null;
    return !parentAE || (parentAEMethod !== getColumnsMethod);
  })[0]

  if (!columnsArray) return;
  columnsArray.get('elements').forEach(columnDef => {
    let field = _.find(columnDef.get('properties'), {node: {key: {name: 'field'}}});
    let name = _.find(columnDef.get('properties'), {node: {key: {name: 'name'}}});
    let displayName = _.find(columnDef.get('properties'), {node: {key: {name: 'displayName'}}});
    if (name && displayName) {
      if (name.get('value.value') !== displayName.get('value.value')) {
        console.error('Warning! Unmatched \'name\' & \'displayName\' column attribute:\nname=' + name.get('value.value') + ' | displayName=' + displayName.get('value.value') + '\nTaking \'displayName\' for header');
      }
      columnDef.get('properties').removeIf(p => p.equals(name));
      displayName.set('key.name', 'header');
    }
    else if (displayName || name) {
      (displayName || name).set('key.name', 'header');
    }
    else {
      let clone = field.clone();
      clone.set('key.name', 'header');
      clone.set('value.value', _.capitalize(clone.get('value.value')));
      clone.set('value.raw', `'${clone.get('value.value')}'`);
      columnDef.get('properties').push(clone);
    }

    if (_.includes(filterBy, field.get('value.value'))) {
      let clone = field.clone();
      clone.set('key.name', 'filterable');
      clone.set('value.value', true);
      delete clone.node.value.raw;
      columnDef.get('properties').push(clone);
    }

    let sort = _.find(columnDef.get('properties'), {node: {key: {name: 'sort'}}});

    if (sort) {
      let desc = sort.src.indexOf('.DESC') !== -1;
      if (columnsArray.get('elements').indexOf(columnDef) !== 0 || desc) {
        _addToChain(directive.chainHeader, 'sortBy', [
          {
            type: 'Literal',
            value: field.get('value.value'),
            raw: `'${field.get('value.value')}'`
          }
        ])
        if (desc) {
          _addToChain(directive.chainHeader, 'reverseSortingDir', []);
        }
      }
      columnDef.get('properties').removeIf(p => p.equals(sort));
    }

    let centerText = () => {
      let clone = field.clone();
      clone.set('key.name', 'textAlign');
      clone.set('value.value', 'center');
      clone.set('value.raw', "'center'");
      columnDef.get('properties').push(clone);
    }

    let wrapCellTemplate = (cellTemplate) => {
      let tryVal = (val, object, key) => {
        try {
          // eslint-disable-next-line no-eval
          let evaluated = eval(object.get(key).src);
          if (evaluated && _.isString(evaluated) && evaluated.startsWith('<') && evaluated.endsWith('>') && evaluated.indexOf(' ng-if') !== -1) {
            let newValue = global.jfTableViewConverter.editor.editor
              .createNewElementFromCode(`'<div>${evaluated}</div>'`);
            object.set(key, newValue.get('expression'));
          }
          if (evaluated && _.isString(evaluated) && evaluated.indexOf('text-center') !== -1) {
            centerText();
          }
        }
        catch (e) {
          if (object.get(key).get('type') === 'Identifier') {
            let varDeclarator = getColumnsMethod.select(`VariableDeclarator[id.name="${cellTemplate.get('value.name')}"]`)[0];
            tryVal(varDeclarator.get('init'), varDeclarator, 'init');
          }
        }
      }
      tryVal(cellTemplate.get('value'), cellTemplate, 'value');


    };

    let cellTemplate = _.find(columnDef.get('properties'), {node: {key: {name: 'cellTemplate'}}});

    if (cellTemplate) wrapCellTemplate(cellTemplate);

    if (cellTemplate && global.jfTableViewConverter.commonGridColumns) {
      let value = cellTemplate.get('value').src;
      if (_.startsWith(value, 'this.' + global.jfTableViewConverter.commonGridColumns)) {
        value = value.replace('this.' + global.jfTableViewConverter.commonGridColumns, 'this.JFrogTableViewOptions.cellTemplateGenerators');
        value = value.replace('.repoPathColumn', '.artifactoryRepoPathColumn');
        cellTemplate.set('value', global.jfTableViewConverter.editor.editor
          .createNewElementFromCode(value).select('CallExpression')[0]);

        if (value.indexOf('.booleanColumn(') !== -1 || value.indexOf('.checkboxColumn(') !== -1) {
          centerText();
        }
      }
    }


  })

}

function rewriteAllTheRest(dir, creationLocation) {
  let controllerAs = getControllerAs();
  let gridOptions = dir.attrs['grid-options'];
  gridOptions = _.trim(gridOptions, '"');
  gridOptions = gridOptions.replace(controllerAs + '.', '');


  let findSetGridDataCalls = () => {
    let candidates = global.jfTableViewConverter.editor.root.select('Identifier[name="setGridData"]');
    return _.filter(candidates , call => {
      let parent = call.parent();

      if (parent.get('object.property.name') === gridOptions) {
        return true;
      }
    });
  }

  let setGridDataCalls = findSetGridDataCalls();

  setGridDataCalls.forEach(call => {
    call.set('name', 'setData');
  });

  let findGetSelectedRowsCalls = () => {
    let getSelectedRowsCalls = global.jfTableViewConverter.editor.root.select('Identifier[name="getSelectedRows"]');

    getSelectedRowsCalls = _.filter(getSelectedRowsCalls, call => {
      let parent = call.parent();
      if (parent.get('object.object.object') && parent.get('object.property.name') === 'selection' && parent.get('object.object.property.name') === 'api') {
        return true;
      }
    })
    return getSelectedRowsCalls;
  }

  let getSelectedRowsCalls = findGetSelectedRowsCalls();

  getSelectedRowsCalls.forEach(call => {
    let parent = call.parent();

    parent.set('object', parent.get('object.object.object'));
  })

}

function _removeFromChain(chainStart, toRemove) {
  let curr = chainStart.get('callee');
  let prev;
  while (curr && curr.get('object.callee')) {
    if (curr.get('property.name') === toRemove) {
      if (!prev) {
        let parent = chainStart.parent();
        parent.set('callee', curr.get('object.callee'));
        parent.set('arguments', curr.get('object.arguments'));
      }
      else {
        prev.set('object.callee', curr.get('object.callee'));
        prev.set('object.arguments', curr.get('object.arguments'));
      }
      break;
    }
    prev = curr;
    curr = curr.get('object.callee');
  }
}

function _addToChain(chainStart, methodName, argumentsNode) {
  let temp = chainStart.clone();
  chainStart.set('callee.object', temp);
  chainStart.set('callee.property.name', methodName);
  chainStart.set('arguments', argumentsNode);
}

