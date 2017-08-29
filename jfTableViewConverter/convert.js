let esprima = require('esprima');
let escodegen = require('escodegen');
let es$ = require('esquery');
let jetpack = require('fs-jetpack');
let _ = require('lodash');

let inspect = (obj) => console.dir(obj, {depth: null});
let src = (node, indent = 0) => {
  let options = {}
  options.comment = true;
  if (indent) options.format = {indent: {base: indent}};
  return escodegen.generate(node, options);
}
let json = (node) => console.log(JSON.stringify(node, null, 4));

let directiveRegex = /<jf-grid ((?:.|\n)*?)>(?:.|\n)*?<\/jf-grid>/g;
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

    let moduleFile = conversionJson.sources.module;
    let templateFile = conversionJson.sources.template;
    let controllerFile = conversionJson.sources.controller;

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
}

function convertByControllerAndTemplate(templateFile, controllerFile, controllerAs) {

  console.log(`Converting:\nTemplate=${templateFile}\nController=${controllerFile}`)

  global.jfTableViewConverter.controllerAs = controllerAs;

  if (!global.jfTableViewConverter.localJetpack.exists(templateFile)) console.error('Template file not found !', templateFile);
  else if (!global.jfTableViewConverter.localJetpack.exists(controllerFile)) console.error('Controller file not' + ' found !', controllerFile);
  else {
    let template = global.jfTableViewConverter.localJetpack.read(templateFile);
    let controller = global.jfTableViewConverter.localJetpack.read(controllerFile);
    global.jfTableViewConverter.controllerSource = controller;

    let directives = getDirectives(template);
    console.log('Rewriting template...')
    let newTemplate = rewriteTemplate(template, directives);
    global.jfTableViewConverter.localJetpack.write(global.jfTableViewConverter.conversionJson.overwrite ? templateFile : templateFile.replace('.html', '.converted.html'), newTemplate);

    console.log('Rewriting controller...')
    rewriteController(controller, directives);
    global.jfTableViewConverter.localJetpack.write(global.jfTableViewConverter.conversionJson.overwrite ? controllerFile : controllerFile.replace('.js', '.converted.js'), global.jfTableViewConverter.controllerSource);
  }
}

function convertByModule(moduleFile) {
  if (!global.jfTableViewConverter.localJetpack.exists(moduleFile)) console.error('Module file not found !', moduleFile);
  else {
    let baseDir = _.dropRight(moduleFile.split('/')).join('/');
    let module = global.jfTableViewConverter.localJetpack.read(moduleFile);

    let moduleAST = esprima.parseModule(module, {});


    let angularControllerCalls = es$(moduleAST, 'CallExpression[callee.property.name="controller"][arguments.0.type="Literal"][arguments.1.type="Identifier"]');

    angularControllerCalls.forEach(c => {
      let [name, identifier] = c.arguments;
      name = name.value;
      identifier = identifier.name;

      let importDeclaration = _.find(es$(moduleAST, `ImportDeclaration`), imp => {
        let specifier = _.find(imp.specifiers, {local: {name: identifier}})
        if (specifier) return true;
      })

      let controllerFileName = importDeclaration.source.value;
      if (!_.endsWith(controllerFileName, '.js')) controllerFileName += '.js';
      controllerFileName = baseDir + '/' + _.trim(controllerFileName, './');

      let controllerAs;
      let controllerProperty = _.find(es$(moduleAST, 'Property[key.name="controller"]'), p => {
        if (p.value.value === name || p.value.value.indexOf(name + ' as ') !== -1) {
          controllerAs = p.value.value === name ? name : p.value.value.split(' as ')[1];
          return true;
        }
      })

      if (controllerProperty) {
        let objectExpression = _getNodeParent(controllerProperty, 'ObjectExpression', moduleAST);

        let templateUrlProperty = _.find(objectExpression.properties, {key: {name: 'templateUrl'}});

        let templateFileName = global.jfTableViewConverter.conversionJson.base + templateUrlProperty.value.value;

        if (templateFileName && controllerFileName) {
          convertByControllerAndTemplate(templateFileName, controllerFileName, controllerAs);
        }
      }

    });
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
    attrs[key] = val || null;
  })

  return attrs;
}

function rewriteTemplate(template, directives) {
  directives.forEach(dir => {
    let index = template.indexOf(dir.exactElement);
    let indent = _getIndent(index, template);
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

function rewriteController(controller, directives) {
  global.jfTableViewConverter.ASTRoot = esprima.parseModule(controller, {range: true, tokens: true, comment: true});

  attachComments()

  console.log('Replacing injections')
  replaceInjections();

  rewriteDirective(directives);

//  return escodegen.generate(module, {comment: true});
}

function replaceInjections() {
  let constructor = es$(global.jfTableViewConverter.ASTRoot, 'ClassDeclaration MethodDefinition[kind="constructor"] FunctionExpression');
  let params = constructor[0].params;

  let foundJFrogGridFactory = false;
  let underlineInjections = false;
  _.remove(params, p => {
    if (p.name === 'JFrogGridFactory' || p.name === '_JFrogGridFactory_') foundJFrogGridFactory = true;
    if (p.name === '_JFrogGridFactory_') underlineInjections = true;
    return _.includes(['JFrogGridFactory', 'uiGridConstants', 'commonGridColumns', '_JFrogGridFactory_', '_uiGridConstants_', '_commonGridColumns_'], p.name);
  })

  if (!foundJFrogGridFactory) return;

  params.push({
    type: 'Identifier',
    name: underlineInjections ? '_JFrogTableViewOptions_' : 'JFrogTableViewOptions'
  })

  let body = constructor[0].body.body;

  _.remove(body, statement => {
    if (statement.expression && statement.expression.operator === '=') {
      if (statement.expression.right.name === 'commonGridColumns') {
        global.jfTableViewConverter.commonGridColumns = statement.expression.left.property.name;
      }
      if (_.includes(['uiGridConstants', 'commonGridColumns'], statement.expression.right.name)) {
        return true;
      }
    }
    return false;
  })

  let renameVar;
  _.forEach(body, statement => {
    if (statement.expression && statement.expression.operator === '=') {
      if (statement.expression.right.name === (underlineInjections ? '_JFrogGridFactory_' : 'JFrogGridFactory')) {
        statement.expression.right.name = underlineInjections ? '_JFrogTableViewOptions_' : 'JFrogTableViewOptions';
        if (statement.expression.left.property) {
          global.jfTableViewConverter.optionsNotOnThis = false;
          statement.expression.left.property.name = 'JFrogTableViewOptions';
        }
        else {
          global.jfTableViewConverter.optionsNotOnThis = true;
          renameVar = statement.expression.left.name;
          statement.expression.left.name = 'JFrogTableViewOptions';
        }
      }
    }
  })

  _rewriteNode(_getNodeParent(constructor[0], 'MethodDefinition'));

  if (renameVar) {
    let varDeclarator = es$(global.jfTableViewConverter.ASTRoot, `VariableDeclarator[id.name="${renameVar}"]`)[0];
    varDeclarator.id.name = 'JFrogTableViewOptions';
    _rewriteNode(varDeclarator);
  }

}

function attachComments() {
  let ASTRoot = global.jfTableViewConverter.ASTRoot;
  global.jfTableViewConverter.ASTRoot.body.forEach(part => {
    if (part.type === 'ExportNamedDeclaration') {
      escodegen.attachComments(part.declaration, ASTRoot.comments, ASTRoot.tokens);
    }
    else {
      escodegen.attachComments(part, ASTRoot.comments, ASTRoot.tokens);
    }
  })
}

function rewriteDirective(directives) {
  let controllerAs = getControllerAs();
  directives.forEach(dir => {
    let gridOptions = dir.attrs['grid-options'];
    gridOptions = _.trim(gridOptions, '"');
    gridOptions = gridOptions.replace(controllerAs + '.', '');
    let creationLocation = locateGridCreation(gridOptions);
    console.log('Rewriting creation code')
    rewriteCreation(creationLocation, dir);
    console.log('Rewriting columns definition')
    rewriteColumns(dir);
    console.log('Rewriting more stuff')
    rewriteAllTheRest(dir);
  })
}

function getControllerAs() {
  if (global.jfTableViewConverter.controllerAs) {
    return global.jfTableViewConverter.controllerAs
  }
  else {
    let exportDeclaration = _.find(global.jfTableViewConverter.ASTRoot.body, {type: 'ExportNamedDeclaration'})
    let dirDescObject = exportDeclaration.declaration.body.body[0].argument.properties;
    let controllerAsProperty = _.find(dirDescObject, {key: {name: 'controllerAs'}})
    return controllerAsProperty.value.value;
  }
}

function locateGridCreation(gridOptions) {

  let methods = es$(global.jfTableViewConverter.ASTRoot, 'ClassDeclaration MethodDefinition');

  let assigment;
  let creationMethod = _.find(methods, method => {
    let assignments = es$(method, 'AssignmentExpression');
    assigment = _.find(assignments, a => {
      if (es$(a.left, `MemberExpression[object.type="ThisExpression"][property.name="${gridOptions}"]`).length &&
          es$(a.right, 'Identifier[name="getGridInstance"]').length) {
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
  let creation = es$(creationLocation.assigment.right, 'MemberExpression[object.callee.property.name="getGridInstance"]')[0];
  let newExpression = {
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
    'arguments': creation.object.arguments
  }
  if (global.jfTableViewConverter.optionsNotOnThis) newExpression.callee = newExpression.callee.property;
  let expression = _getNodeParent(creationLocation.assigment, 'ExpressionStatement');
  let clone = _.cloneDeep(expression);

  clone.expression.right = newExpression;
  expression.expression = expression.expression.right;

  let chainStart = expression.expression.callee;
  _removeFromChain(chainStart, 'setRowTemplate')

  let setButtons = es$(chainStart, 'Identifier[name="setButtons"]')[0];
  if (setButtons) setButtons.name = 'setActions';

  let setMultiSelect = es$(chainStart, 'Identifier[name="setMultiSelect"]')[0];
  let setSingleSelect = es$(chainStart, 'Identifier[name="setSingleSelect"]')[0];

  if (setMultiSelect || setSingleSelect) {
    let selectionParent = _getNodeParent(_getNodeParent(setMultiSelect || setSingleSelect));

    selectionParent.callee.property.name = 'setSelection';
    let params = es$(esprima.parse(src(clone.expression.left) + (setMultiSelect ? '.MULTI_SELECTION' : '.SINGLE_SELECTION')), 'ExpressionStatement > MemberExpression')[0];
    selectionParent.arguments = [params];
  }

  let setGridData = es$(chainStart, 'Identifier[name="setGridData"]')[0];

  if (setGridData) setGridData.name = 'setData';


  directive.chainHeader = expression.expression;
  if (directive.attrs['object-name'] !== undefined) {
    _addToChain(expression.expression, 'setObjectName', [
      {
        type: 'Literal',
        value: _.trim(directive.attrs['object-name'], '"'),
        raw: `'${_.trim(directive.attrs['object-name'], '"')}'`
      }
    ])
  }
  if (directive.attrs['auto-focus'] !== undefined) {
    _addToChain(expression.expression, 'setAutoFocusFilter', []);
  }
  if (directive.attrs['no-count'] !== undefined) {
    _addToChain(expression.expression, 'showCounter', [
      {
        type: 'Literal',
        value: false
      }
    ]);
  }

  let setColumns = _getNodeParent(_getNodeParent(es$(expression.expression, 'Identifier[name="setColumns"]')[0]));

  let getColumnsMethodName = setColumns.arguments[0].callee.property.name;

  directive.getColumnsMethodName = getColumnsMethodName;

  let root = _getChainRoot(chainStart);
  root.object = clone.expression;

  _rewriteNode(expression)
}

function rewriteColumns(directive) {
  let filterBy = [];
  if (directive.attrs['filter-field'] !== undefined) {
    filterBy.push(_.trim(directive.attrs['filter-field'], '"'));
    if (directive.attrs['filter-field2'] !== undefined) {
      filterBy.push(_.trim(directive.attrs['filter-field2'], '"'));
    }
  }

  let getColumnsMethod = es$(global.jfTableViewConverter.ASTRoot, `ClassDeclaration MethodDefinition[kind="method"][key.name="${directive.getColumnsMethodName}"]`)[0];

  let arrayExpressions = es$(getColumnsMethod, 'FunctionExpression ArrayExpression');

  let columnsArray = _.filter(arrayExpressions, ae => {
    let parentAE = _getNodeParent(ae, 'ArrayExpression');
    let parentAEMethod = _getNodeParent(parentAE, 'MethodDefinition');
    return !parentAE || (parentAEMethod !== getColumnsMethod);
  })[0]

  if (!columnsArray) return;

  columnsArray.elements.forEach(columnDef => {
    let field = _.find(columnDef.properties, {key: {name: 'field'}});
    let name = _.find(columnDef.properties, {key: {name: 'name'}});
    let displayName = _.find(columnDef.properties, {key: {name: 'displayName'}});
    if (name && displayName) {
      if (name.value.value !== displayName.value.value) {
        console.error('Warning! Unmatched \'name\' & \'displayName\' column attribute:\nname=' + name.value.value + ' | displayName=' + displayName.value.value + '\nTaking \'displayName\' for header');
      }
      _.remove(columnDef.properties, p => p === name);
      displayName.key.name = 'header';
    }
    else {
      (displayName || name).key.name = 'header';
    }

    if (_.includes(filterBy, field.value.value)) {
      let clone = _.cloneDeep(field);
      clone.key.name = 'filterable';
      clone.value.value = true;
      delete clone.value.raw;
      columnDef.properties.push(clone);
    }

    let sort = _.find(columnDef.properties, {key: {name: 'sort'}});

    if (sort) {
      let desc = src(sort).indexOf('.DESC') !== -1;
      if (columnsArray.elements.indexOf(columnDef) !== 0 || desc) {
        _addToChain(directive.chainHeader, 'sortBy', [
          {
            type: 'Literal',
            value: field.value.value,
            raw: `'${field.value.value}'`
          }
        ])
      }
      if (desc) {
        _addToChain(directive.chainHeader, 'reverseSortingDir', []);
      }
      _.remove(columnDef.properties, p => p === sort);
    }

    let centerText = () => {
      let clone = _.cloneDeep(field);
      clone.key.name = 'textAlign';
      clone.value.value = 'center';
      clone.value.raw = "'center'";
      columnDef.properties.push(clone);
    }

    let wrapCellTemplate = (cellTemplate) => {
      try {
        // eslint-disable-next-line no-eval
        let evaluated = eval(src(cellTemplate));
        if (evaluated && _.isString(evaluated) && evaluated.startsWith('<') && evaluated.endsWith('>') && evaluated.indexOf(' ng-if') !== -1) {
          let newValue = es$(esprima.parse(`'<div>${evaluated}</div>'`), 'ExpressionStatement')[0];
          cellTemplate.value = newValue.expression;
          if (evaluated.indexOf('text-center')) {
            centerText();
          }
        }
      }
      catch (e) {
      }
    };

    let cellTemplate = _.find(columnDef.properties, {key: {name: 'cellTemplate'}});

    if (cellTemplate) wrapCellTemplate(cellTemplate);
    if (cellTemplate && global.jfTableViewConverter.commonGridColumns) {
      let value = src(cellTemplate.value);
      if (_.startsWith(value, 'this.' + global.jfTableViewConverter.commonGridColumns)) {
        value = value.replace('this.' + global.jfTableViewConverter.commonGridColumns, 'this.JFrogTableViewOptions.cellTemplateGenerators');
        value = value.replace('.repoPathColumn', '.artifactoryRepoPathColumn');
        cellTemplate.value = es$(esprima.parse(value), 'CallExpression')[0];

        if (value.indexOf('.booleanColumn(') !== -1 || value.indexOf('.checkboxColumn(') !== -1) {
          centerText();
        }
      }
    }

  })

  _rewriteNode(columnsArray);


}

function rewriteAllTheRest(dir) {
  let controllerAs = getControllerAs();
  let gridOptions = dir.attrs['grid-options'];
  gridOptions = _.trim(gridOptions, '"');
  gridOptions = gridOptions.replace(controllerAs + '.', '');


  let findSetGridDataCalls = () => {
    return _.filter(es$(global.jfTableViewConverter.ASTRoot, 'Identifier[name="setGridData"]'), call => {
      let parent = _getNodeParent(call);

      if (parent.object.property.name === gridOptions) {
        return true;
      }
    });
  }

  let setGridDataCalls = findSetGridDataCalls();

  while (setGridDataCalls.length) {
    let call = setGridDataCalls[0];
    let parent = _getNodeParent(call);

    if (parent.object.property.name === gridOptions) {
      call.name = 'setData';
    }

    _rewriteNode(parent);

    setGridDataCalls = findSetGridDataCalls();
  }

  let findGetSelectedRowsCalls = () => {
    let getSelectedRowsCalls = es$(global.jfTableViewConverter.ASTRoot, 'Identifier[name="getSelectedRows"]');

    getSelectedRowsCalls = _.filter(getSelectedRowsCalls, call => {
      let parent = _getNodeParent(call);
      if (parent.object && parent.object.object && parent.object.object.object && parent.object.property.name === 'selection' && parent.object.object.property.name === 'api') {
        return true;
      }
    })

    return getSelectedRowsCalls;
  }

  let getSelectedRowsCalls = findGetSelectedRowsCalls();

  while (getSelectedRowsCalls.length) {
    let call = getSelectedRowsCalls[0];
    let parent = _getNodeParent(call);

    parent.object = parent.object.object.object;

    _rewriteNode(parent);

    getSelectedRowsCalls = findGetSelectedRowsCalls();
  }

}

function _getChainRoot(chainStart) {
  let curr = chainStart;
  while (curr.object.callee.object.callee) {
    curr = curr.object.callee
  }
  return curr;
}

function _removeFromChain(chainStart, toRemove) {
  let curr = chainStart;
  let prev;
  while (curr.object.callee) {
    if (curr.property && curr.property.name === toRemove) {
      if (!prev) {
        let parent = _getNodeParent(chainStart);
        parent.callee = curr.object.callee;
        parent.arguments = curr.object.arguments;
      }
      else {
        prev.object.callee = curr.object.callee;
        prev.object.arguments = curr.object.arguments;
      }
      break;
    }
    prev = curr;
    curr = curr.object.callee
  }
}

function _addToChain(chainStart, methodName, argumentsNode) {
  let temp = _.cloneDeep(chainStart);
  chainStart.callee.object = temp;
  chainStart.callee.property.name = methodName;
  chainStart.arguments = argumentsNode;
}

function _traverse(obj, callback, parents = []) {
  let stopped = false;
  if (obj && obj.type) parents.push(obj);
  _.forIn(obj, (val, key) => {
    if (stopped) return;
    if (val && val.type) {
      let ret = callback(key, val, obj, parents);
      if (ret === false) stopped = true;
    }
    if (!stopped) {
      if (_.isArray(val) || _.isObject(val)) {
        _traverse(val, callback, parents);
      }
    }
  });
}

function _getNodeParent(node, type, astRoot) {
  let parent = null;
  _traverse(astRoot || global.jfTableViewConverter.ASTRoot, (key, val, p, pArray) => {
    if (val === node) {
      if (type) {
        parent = _.findLast(pArray, {type});
      }
      else {
        parent = p;
      }
      return false;
    }
  })
  return parent;
}


function _rewriteNode(node) {
  if (!node.range) {
    console.error('Trying to rewrite AST node without range data !');
    return;
  }
  let [start, end] = node.range;

  let beforeChange = global.jfTableViewConverter.controllerSource.substr(0, start);
  let afterChange = global.jfTableViewConverter.controllerSource.substr(end);

  let newCode = src(node, Math.round(_getIndent(start) / 4));
  newCode = newCode.replace(/\)\./g, ')\n' + ' '.repeat(4 + _getIndent(start)) + '.');
  global.jfTableViewConverter.controllerSource = beforeChange + newCode + afterChange;
  global.jfTableViewConverter.ASTRoot = esprima.parseModule(global.jfTableViewConverter.controllerSource, {range: true, tokens: true, comment: true});
  attachComments()
}

function _getIndent(offset, src) {
  let before = (src || global.jfTableViewConverter.controllerSource).substr(0, offset);
  let lastNewLineIndex = before.lastIndexOf('\n') + 1;
  let count = 0;
  while (before.charAt(lastNewLineIndex + count) === ' ' || before.charAt(lastNewLineIndex + count) === '\t') {
    count++;
  }
  return count;
}
