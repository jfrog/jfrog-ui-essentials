let esprima = require('esprima');
let escodegen = require('escodegen');
let es$ = require('esquery');
let jetpack = require('fs-jetpack');
let _ = require('lodash');

let inspect = (obj) => console.dir(obj, {depth: null});
let src = (node) => escodegen.generate(node, {comment: true});
let json = (node) => console.log(JSON.stringify(node, null, 4));

let directiveRegex = /<jf-grid ((?:.|\n)*?)><\/jf-grid>/g;
let convertedAttributes = ['grid-options', 'object-name', 'auto-focus', 'filter-field', 'filter-field2', 'no-count'];


global.jfTableViewConverter = {};

const jsonFile = process.argv[2];
if (!jsonFile) console.error('Missing conversion description json file !');
else if (!jetpack.exists(jsonFile)) console.error('Conversion description file not found !');
else {

  jetpack.readAsync(jsonFile, 'json').then(conversionJson => {

    let workingDir = _.dropRight(jsonFile.split('/')).join('/');

    let localJetpack = global.jfTableViewConverter.localJetpack = jetpack.cwd(workingDir);

    let templateFile = conversionJson.sources.template;
    let controllerFile = conversionJson.sources['controller'];

    if (!global.jfTableViewConverter.localJetpack.exists(templateFile)) console.error('Template file not found !', templateFile);
    else if (!global.jfTableViewConverter.localJetpack.exists(controllerFile)) console.error('Controller file not' + ' found !', controllerFile);
    else {
      let template = localJetpack.read(templateFile);
      let controller = localJetpack.read(controllerFile);

      let directives = getDirectives(template);
      let newTemplate = rewriteTemplate(template, directives);
      localJetpack.write(templateFile.replace('.html', '.converted.html'), newTemplate);

      let newController = rewriteController(controller, directives);
      localJetpack.write(controllerFile.replace('.js', '.converted.js'), newController);

    }
  });
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

function _getNodeParent(root, node, type) {
  let parent = null;
  _traverse(root, (key, val, p, pArray) => {
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

  element = element.replace(/\n/g, '');
  element = element.replace(/ +/g, ' ');
  let attrsString = directiveRegex.exec(element)[1];
  if (directiveRegex.exec(element)) {
    console.error('Error on getAttributesFromElement');
  }

  let attrs = {}

  attrsString.split(' ').forEach(keyValString => {
    let [key, val] = keyValString.split('=');
    attrs[key] = val;
  })

  return attrs;
}

function rewriteTemplate(template, directives) {
  directives.forEach(dir => {
    let retainedAttrs = _.filter(Object.keys(dir.attrs), a => !_.includes(convertedAttributes, a));
    retainedAttrs = _.map(retainedAttrs, a => {
      let str = `${a}=${dir.attrs[a]}`
      delete dir.attrs[a];
      return str;
    }).join(' ');

    let newDir = `<jf-table-view options=${dir.attrs['grid-options']}\n${retainedAttrs}></jf-table-view>`
    template = template.replace(dir.exactElement, newDir);
  })
  return template;
}

function rewriteController(controller, directives) {
  let module = esprima.parseModule(controller, {range: true, tokens: true, comment: true});
  attachComments(module)

  replaceInjections(module);

  rewriteDirective(module, directives);

  return escodegen.generate(module, {comment: true});
}

function replaceInjections(module) {
  let constructor = es$(module, 'ClassDeclaration MethodDefinition[kind="constructor"] FunctionExpression');
  let params = constructor[0].params;

  _.remove(params, p => {
    return _.includes(['JFrogGridFactory', 'uiGridConstants', 'commonGridColumns'], p.name);
  })

  params.push({
    type: 'Identifier',
    name: 'JFrogTableViewOptions'
  })
  let body = constructor[0].body.body;

  _.remove(body, statement => {
    if (statement.expression.operator === '=') {
      if (_.includes(['uiGridConstants', 'commonGridColumns'], statement.expression.right.name)) {
        return true;
      }
    }
    return false;
  })

  _.forEach(body, statement => {
    if (statement.expression.operator === '=') {
      if (statement.expression.right.name === 'JFrogGridFactory') {
        statement.expression.right.name = 'JFrogTableViewOptions';
        statement.expression.left.property.name = 'JFrogTableViewOptions';
      }
    }
  })

}

function attachComments(module) {
  module.body.forEach(part => {
    if (part.type === 'ExportNamedDeclaration') {
      escodegen.attachComments(part.declaration, module.comments, module.tokens);
    }
    else {
      escodegen.attachComments(part, module.comments, module.tokens);
    }
  })
}

function rewriteDirective(module, directives) {
  let controllerAs = getControllerAs(module);
  directives.forEach(dir => {
    let gridOptions = dir.attrs['grid-options'];
    gridOptions = _.trim(gridOptions, '"');
    gridOptions = gridOptions.replace(controllerAs + '.', '');
    let creationLocation = locateGridCreation(module, gridOptions);
    rewriteCreation(module, creationLocation, dir);
  })
}

function getControllerAs(module) {
  let exportDeclaration = _.find(module.body, {type: 'ExportNamedDeclaration'})
  let dirDescObject = exportDeclaration.declaration.body.body[0].argument.properties;
  let controllerAsProperty = _.find(dirDescObject, {key: {name: 'controllerAs'}})
  return controllerAsProperty.value.value;
}

function locateGridCreation(module, gridOptions) {

  let methods = es$(module, 'ClassDeclaration MethodDefinition');

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


function rewriteCreation(module, creationLocation, directive) {
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
  let expression = _getNodeParent(module, creationLocation.assigment, 'ExpressionStatement');
  let clone = _.cloneDeep(expression);

  clone.expression.right = newExpression;
  expression.expression = expression.expression.right;

  let chainStart = expression.expression.callee;
  _removeFromChain(module, chainStart, 'setRowTemplate')

  let setButtons = es$(chainStart, 'Identifier[name="setButtons"]')[0];
  if (setButtons) setButtons.name = 'setActions';

  let setMultiSelect = es$(chainStart, 'Identifier[name="setMultiSelect"]')[0];
  let setSingleSelect = es$(chainStart, 'Identifier[name="setSingleSelect"]')[0];

  if (setMultiSelect || setSingleSelect) {
    let smsParent = _getNodeParent(module, _getNodeParent(module, setMultiSelect || setSingleSelect));

    smsParent.callee.property.name = 'setSelection';
    let params = es$(esprima.parse(src(clone.expression.left) + (setMultiSelect ? '.MULTI_SELECTION' : '.SINGLE_SELECTION')), 'ExpressionStatement > MemberExpression')[0];
    smsParent.arguments = [params];
  }

  if (directive.attrs['object-name']) {
    
  }


  let root = _getChainRoot(chainStart);
  root.object = clone.expression;




}

function _getChainRoot(chainStart) {
  let curr = chainStart;
  while (curr.object.callee.object.callee) {
    curr = curr.object.callee
  }
  return curr;
}

function _removeFromChain(module, chainStart, toRemove) {
  let curr = chainStart;
  let prev;
  while (curr.object.callee) {
    if (curr.property && curr.property.name === toRemove) {
      if (!prev) {
        let parent = _getNodeParent(module, chainStart);
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






