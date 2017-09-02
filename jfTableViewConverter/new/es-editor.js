let _ = require('lodash');
let jetpack = require('fs-jetpack');
let esprima = require('esprima');
let escodegen = require('escodegen');
let esquery = require('esquery');

let inspect = (obj, depth) => console.dir(obj, {depth: depth || null});
let json = (node) => console.log(JSON.stringify(node, null, 4));
let src = (node, indent = 0) => {
  if (node instanceof Element) console.log('!!!');
  let options = {}
  options.comment = true;
  if (indent) options.format = {indent: {base: indent}};
  return escodegen.generate(node, options);
}

class Element {
  constructor(editor, astNode) {
    this.$editor = editor;
    this.$node = astNode;
  }

  toString() {
    return inspect(this.node, 3);
  }
  get node() {
    return this.$node;
  }
  get root() {
    return this.$editor.astRoot;
  }
  get src() {
    return src(this.node);
  }
  get json() {
    return console.log(JSON.stringify(this.node, null, 4));
  }

  equals(e) {
    return !!this.node && this.node === e.node;
  }

  is(type) {
    return this.node.type === type;
  }

  clone() {
    return new Element(this.$editor, _.cloneDeep(this.node));
  }

  select(selector) {
    let nodes = esquery(this.node, selector);
    let elements = this._wrapArray(nodes);
    return elements;
  }

  get(prop) {
    let val = _.get(this.node, prop);
    if (val && val.type) {
      return new Element(this.$editor, val);
    }
    else if (_.isArray(val)) {
      return this._wrapArray(val);
    }
    else {
      return val;
    }
  }

  set(prop, val) {
    if (_.isArray(val) && val.getNodes) val = val.getNodes();
    else if (_.isArray(val)) {
      val = _.map(val, n => n instanceof Element ? n.node : n);
    }
    else if (val instanceof Element) val = val.node;
    _.set(this.node, prop, val);
    this.update();
  }

  update() {
    this.$editor._addChangedNode(this.node);
  }

  has(prop) {
    return _.has(this.node, prop);
  }


  parent(type) {
    let parent = this.$editor._getParent(this.node, type);
    if (!parent) return null;
    else if (parent.type) {
      return new Element(this.$editor, parent);
    }
    else if (_.isArray(parent)) {
      return this._wrapArray(parent);
    }
    else {
      return parent;
    }
  }

  _wrapArray(nodesArray) {
    let eArr = _.map(nodesArray, n => new Element(this.$editor, n));
    eArr.parent = (t) => new Element(this.$editor, this.$editor._getParent(nodesArray, t));

    let origPush = eArr.push.bind(eArr);
    let updateParent = (eArr) => {
      let parent = eArr.parent();
      if (parent.is('FunctionExpression') && parent.parent().is('MethodDefinition')) {
        parent.parent().update();
      }
      else {
        parent.update();
      }
    }

    eArr.push = (node) => {
      if (node instanceof Element) {
        nodesArray.push(node.node);
        origPush(node);
      }
      else {
        nodesArray.push(node);
        origPush(new Element(this.$editor, node));
      }
      updateParent(eArr);
    }

    eArr.removeIf = (condition) => {
      let nodes = [];
      _.remove(eArr, e => {
        if (condition(e)) {
          nodes.push(e.node);
          return true;
        }
      });
      _.remove(nodesArray, n => nodes.includes(n));
      if (nodes.length) updateParent(eArr);
    }

    eArr.getNodes = () => nodesArray;

    return eArr;

  }

}

class Editor {
  constructor(sourceFile) {
    this.sourceFile = sourceFile;
    this.source = jetpack.read(sourceFile);
    this.astRoot = esprima.parseModule(this.source, {range: true, tokens: true, comment: true});
    this.changedNodes = [];
    this._attachComments();
  }

  write(dest = this.sourceFile) {
    this._commitChangedNodes();
    jetpack.write(dest, this.source);
  }
  getEditedSource() {
    this._commitChangedNodes();
    return this.source;
  }

  createNewElementFromCode(code) {
    let ast = esprima.parse(code);
    return new Element(this, esquery(ast, 'ExpressionStatement')[0])
  }

  createNewElementFromObject(nodeObject) {
    return new Element(this, nodeObject);
  }

  _addChangedNode(node) {
    if (this.changedNodes.indexOf(node) === -1) {
      this.changedNodes.push(node);
    }
  }

  _commitChangedNodes() {
    let changedNodes = _.map(this.changedNodes, node => {
      if (node.range) return node;
      else {
        let curr = node;
        while (curr && !curr.range) {
          curr = this._getParent(curr);
        }
        return curr;
      }
    })
    changedNodes = _.filter(changedNodes, n => !!n);
    let sortedChanges = _.sortBy(changedNodes, n => -n.range[0]);
    let included = [];
    sortedChanges.forEach(node => {
      let isIncluded = false;
      for (let i = 0; i < sortedChanges.length && !isIncluded; i++) {
        let comparedNode = sortedChanges[i];
        if (comparedNode !== node && comparedNode.range[0] <= node.range[0] && comparedNode.range[1] >= node.range[1]) {
          isIncluded = true;
        }
      }
      if (isIncluded) included.push(node);
    })
    sortedChanges = _.difference(sortedChanges, included);
    sortedChanges.forEach(node => {
      this._rewriteNode(node);
    })
  }

  _rewriteNode(node) {
    if (!node.range) {
      console.error('Trying to rewrite AST node without range data !');
      return;
    }
    let [start, end] = node.range;

    let beforeChange = this.source.substr(0, start);
    let afterChange = this.source.substr(end);
    let oldCode = this.source.substr(start, end - start);

    let newCode;
    newCode = src(node, Math.round(this._getIndent(start) / 4));

    let linesSplit = newCode.split('\n');
    for (let i = 0; i < linesSplit.length; i++) {
      let commentSplit = linesSplit[i].split('//');
      if (commentSplit.length > 1) {
        let comment = commentSplit.slice(1).join('//');
        let oldIndex = oldCode.indexOf(comment);
        if (oldIndex !== -1) {
          let indent = this._getIndent(start + oldIndex);
          commentSplit[1] = '\n' + ' '.repeat(indent) + '//' + comment;
        }

      }

      let chainSplit = commentSplit[0].split(/\)\./g);
      commentSplit[0] = chainSplit.join(')\n' + ' '.repeat(8 + this._getIndent(start)) + '.');
      linesSplit[i] = commentSplit.join('//');
      linesSplit[i] = linesSplit[i].split('\n')
        .map(splt => splt.endsWith('//') ? splt.substr(0, splt.length - 2) : splt)
        .join('\n');
      if (linesSplit[i].startsWith('.')) linesSplit[i] = ' '.repeat(8 + this._getIndent(start)) + linesSplit[i];

    }

//    newCode = linesSplit.join('\n');

    this.source = beforeChange + newCode + afterChange;
    try {
      this.astRoot = esprima.parseModule(this.source, {range: true, tokens: true, comment: true});
    }
    catch (e) {
      console.log('ERROR IN RE-PARSING  !\nSOURCE:');
      console.log(this.source);
      process.exit(1)
    }

    this._attachComments();

  }

  _getParent(node, type) {
    let parent = null;
    _traverse(this.astRoot, (key, val, p, pArray) => {
      if (val === node) {
        if (type) {
          parent = _.findLast(pArray, {type});
        }
        else {
          parent = p;
        }
        return false;
      }
    });

    return parent;
  }

  getIndentation(offset) {
    let before = (this.source).substr(0, offset);
    let lastNewLineIndex = before.lastIndexOf('\n') + 1;
    let count = 0;
    while (before.charAt(lastNewLineIndex + count) === ' ' || before.charAt(lastNewLineIndex + count) === '\t') {
      count++;
    }
    return count;
  }

  _attachComments() {
    try {
      this.astRoot.body.forEach(part => {
        if (_.includes(['ExportNamedDeclaration', 'ExportDefaultDeclaration'], part.type)) {
          escodegen.attachComments(part.declaration, this.astRoot.comments, this.astRoot.tokens);
        }
        else {
          escodegen.attachComments(part, this.astRoot.comments, this.astRoot.tokens);
        }
      })
    }
    catch (e) {
      console.error('Error attaching comments')
    }
  }
}

function esEditor(sourceFile) {
  let editor = new Editor(sourceFile);
  return {
    root: new Element(editor, editor.astRoot),
    editor
  };
}


module.exports = esEditor;


function _traverse(obj, callback, parents = []) {
  if (obj instanceof Element) obj = obj.node;
  let stopped = false;
  if (obj && obj.type) parents.push(obj);
  _.forIn(obj, (val, key) => {
    if (stopped) return;
    if (val) {
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
