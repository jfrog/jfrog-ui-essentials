let esprima = require('esprima');
let escodegen = require('escodegen');
let jetpack = require('fs-jetpack');
let _ = require('lodash');

let directiveRegex = /<jf-grid ((?:.|\n)*?)><\/jf-grid>/g;


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
    let newDir = `<jf-table-view options=${dir.attrs['grid-options']}></jf-table-view>`
    template = template.replace(dir.exactElement, newDir);
  })
  return template;
}

function rewriteController(controller, directives) {
  let module = esprima.parseModule(controller, {range: true, tokens: true, comment: true});
  attachComments(module)

  replaceInjections(module);


  return escodegen.generate(module, {comment: true});
}

function replaceInjections(module) {
  let classDeclaration = _.find(module.body, {type: 'ClassDeclaration'});
  let constructor = _.find(classDeclaration.body.body, {kind: 'constructor'})
  let params = constructor.value.params;
  _.remove(params, p => {
    return _.includes(['JFrogGridFactory', 'uiGridConstants', 'commonGridColumns'], p.name);
  })

  params.push({
    type: 'Identifier',
    name: 'JFrogTableViewOptions'
  })

  let body = constructor.value.body.body;
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
