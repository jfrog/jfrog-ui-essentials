((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[224],{

/***/ "6dfa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;
var DEFAULT_RAW = {
  colon: ': ',
  indent: '    ',
  beforeDecl: '\n',
  beforeRule: '\n',
  beforeOpen: ' ',
  beforeClose: '\n',
  beforeComment: '\n',
  after: '\n',
  emptyBody: '',
  commentLeft: ' ',
  commentRight: ' ',
  semicolon: false
};

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

var Stringifier =
/*#__PURE__*/
function () {
  function Stringifier(builder) {
    this.builder = builder;
  }

  var _proto = Stringifier.prototype;

  _proto.stringify = function stringify(node, semicolon) {
    this[node.type](node, semicolon);
  };

  _proto.root = function root(node) {
    this.body(node);
    if (node.raws.after) this.builder(node.raws.after);
  };

  _proto.comment = function comment(node) {
    var left = this.raw(node, 'left', 'commentLeft');
    var right = this.raw(node, 'right', 'commentRight');
    this.builder('/*' + left + node.text + right + '*/', node);
  };

  _proto.decl = function decl(node, semicolon) {
    var between = this.raw(node, 'between', 'colon');
    var string = node.prop + between + this.rawValue(node, 'value');

    if (node.important) {
      string += node.raws.important || ' !important';
    }

    if (semicolon) string += ';';
    this.builder(string, node);
  };

  _proto.rule = function rule(node) {
    this.block(node, this.rawValue(node, 'selector'));

    if (node.raws.ownSemicolon) {
      this.builder(node.raws.ownSemicolon, node, 'end');
    }
  };

  _proto.atrule = function atrule(node, semicolon) {
    var name = '@' + node.name;
    var params = node.params ? this.rawValue(node, 'params') : '';

    if (typeof node.raws.afterName !== 'undefined') {
      name += node.raws.afterName;
    } else if (params) {
      name += ' ';
    }

    if (node.nodes) {
      this.block(node, name + params);
    } else {
      var end = (node.raws.between || '') + (semicolon ? ';' : '');
      this.builder(name + params + end, node);
    }
  };

  _proto.body = function body(node) {
    var last = node.nodes.length - 1;

    while (last > 0) {
      if (node.nodes[last].type !== 'comment') break;
      last -= 1;
    }

    var semicolon = this.raw(node, 'semicolon');

    for (var i = 0; i < node.nodes.length; i++) {
      var child = node.nodes[i];
      var before = this.raw(child, 'before');
      if (before) this.builder(before);
      this.stringify(child, last !== i || semicolon);
    }
  };

  _proto.block = function block(node, start) {
    var between = this.raw(node, 'between', 'beforeOpen');
    this.builder(start + between + '{', node, 'start');
    var after;

    if (node.nodes && node.nodes.length) {
      this.body(node);
      after = this.raw(node, 'after');
    } else {
      after = this.raw(node, 'after', 'emptyBody');
    }

    if (after) this.builder(after);
    this.builder('}', node, 'end');
  };

  _proto.raw = function raw(node, own, detect) {
    var value;
    if (!detect) detect = own; // Already had

    if (own) {
      value = node.raws[own];
      if (typeof value !== 'undefined') return value;
    }

    var parent = node.parent; // Hack for first rule in CSS

    if (detect === 'before') {
      if (!parent || parent.type === 'root' && parent.first === node) {
        return '';
      }
    } // Floating child without parent


    if (!parent) return DEFAULT_RAW[detect]; // Detect style by other nodes

    var root = node.root();
    if (!root.rawCache) root.rawCache = {};

    if (typeof root.rawCache[detect] !== 'undefined') {
      return root.rawCache[detect];
    }

    if (detect === 'before' || detect === 'after') {
      return this.beforeAfter(node, detect);
    } else {
      var method = 'raw' + capitalize(detect);

      if (this[method]) {
        value = this[method](root, node);
      } else {
        root.walk(function (i) {
          value = i.raws[own];
          if (typeof value !== 'undefined') return false;
        });
      }
    }

    if (typeof value === 'undefined') value = DEFAULT_RAW[detect];
    root.rawCache[detect] = value;
    return value;
  };

  _proto.rawSemicolon = function rawSemicolon(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && i.nodes.length && i.last.type === 'decl') {
        value = i.raws.semicolon;
        if (typeof value !== 'undefined') return false;
      }
    });
    return value;
  };

  _proto.rawEmptyBody = function rawEmptyBody(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && i.nodes.length === 0) {
        value = i.raws.after;
        if (typeof value !== 'undefined') return false;
      }
    });
    return value;
  };

  _proto.rawIndent = function rawIndent(root) {
    if (root.raws.indent) return root.raws.indent;
    var value;
    root.walk(function (i) {
      var p = i.parent;

      if (p && p !== root && p.parent && p.parent === root) {
        if (typeof i.raws.before !== 'undefined') {
          var parts = i.raws.before.split('\n');
          value = parts[parts.length - 1];
          value = value.replace(/[^\s]/g, '');
          return false;
        }
      }
    });
    return value;
  };

  _proto.rawBeforeComment = function rawBeforeComment(root, node) {
    var value;
    root.walkComments(function (i) {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before;

        if (value.indexOf('\n') !== -1) {
          value = value.replace(/[^\n]+$/, '');
        }

        return false;
      }
    });

    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeDecl');
    } else if (value) {
      value = value.replace(/[^\s]/g, '');
    }

    return value;
  };

  _proto.rawBeforeDecl = function rawBeforeDecl(root, node) {
    var value;
    root.walkDecls(function (i) {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before;

        if (value.indexOf('\n') !== -1) {
          value = value.replace(/[^\n]+$/, '');
        }

        return false;
      }
    });

    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeRule');
    } else if (value) {
      value = value.replace(/[^\s]/g, '');
    }

    return value;
  };

  _proto.rawBeforeRule = function rawBeforeRule(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && (i.parent !== root || root.first !== i)) {
        if (typeof i.raws.before !== 'undefined') {
          value = i.raws.before;

          if (value.indexOf('\n') !== -1) {
            value = value.replace(/[^\n]+$/, '');
          }

          return false;
        }
      }
    });
    if (value) value = value.replace(/[^\s]/g, '');
    return value;
  };

  _proto.rawBeforeClose = function rawBeforeClose(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && i.nodes.length > 0) {
        if (typeof i.raws.after !== 'undefined') {
          value = i.raws.after;

          if (value.indexOf('\n') !== -1) {
            value = value.replace(/[^\n]+$/, '');
          }

          return false;
        }
      }
    });
    if (value) value = value.replace(/[^\s]/g, '');
    return value;
  };

  _proto.rawBeforeOpen = function rawBeforeOpen(root) {
    var value;
    root.walk(function (i) {
      if (i.type !== 'decl') {
        value = i.raws.between;
        if (typeof value !== 'undefined') return false;
      }
    });
    return value;
  };

  _proto.rawColon = function rawColon(root) {
    var value;
    root.walkDecls(function (i) {
      if (typeof i.raws.between !== 'undefined') {
        value = i.raws.between.replace(/[^\s:]/g, '');
        return false;
      }
    });
    return value;
  };

  _proto.beforeAfter = function beforeAfter(node, detect) {
    var value;

    if (node.type === 'decl') {
      value = this.raw(node, null, 'beforeDecl');
    } else if (node.type === 'comment') {
      value = this.raw(node, null, 'beforeComment');
    } else if (detect === 'before') {
      value = this.raw(node, null, 'beforeRule');
    } else {
      value = this.raw(node, null, 'beforeClose');
    }

    var buf = node.parent;
    var depth = 0;

    while (buf && buf.type !== 'root') {
      depth += 1;
      buf = buf.parent;
    }

    if (value.indexOf('\n') !== -1) {
      var indent = this.raw(node, null, 'indent');

      if (indent.length) {
        for (var step = 0; step < depth; step++) {
          value += indent;
        }
      }
    }

    return value;
  };

  _proto.rawValue = function rawValue(node, prop) {
    var value = node[prop];
    var raw = node.raws[prop];

    if (raw && raw.value === value) {
      return raw.raw;
    }

    return value;
  };

  return Stringifier;
}();

var _default = Stringifier;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmaWVyLmVzNiJdLCJuYW1lcyI6WyJERUZBVUxUX1JBVyIsImNvbG9uIiwiaW5kZW50IiwiYmVmb3JlRGVjbCIsImJlZm9yZVJ1bGUiLCJiZWZvcmVPcGVuIiwiYmVmb3JlQ2xvc2UiLCJiZWZvcmVDb21tZW50IiwiYWZ0ZXIiLCJlbXB0eUJvZHkiLCJjb21tZW50TGVmdCIsImNvbW1lbnRSaWdodCIsInNlbWljb2xvbiIsImNhcGl0YWxpemUiLCJzdHIiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiU3RyaW5naWZpZXIiLCJidWlsZGVyIiwic3RyaW5naWZ5Iiwibm9kZSIsInR5cGUiLCJyb290IiwiYm9keSIsInJhd3MiLCJjb21tZW50IiwibGVmdCIsInJhdyIsInJpZ2h0IiwidGV4dCIsImRlY2wiLCJiZXR3ZWVuIiwic3RyaW5nIiwicHJvcCIsInJhd1ZhbHVlIiwiaW1wb3J0YW50IiwicnVsZSIsImJsb2NrIiwib3duU2VtaWNvbG9uIiwiYXRydWxlIiwibmFtZSIsInBhcmFtcyIsImFmdGVyTmFtZSIsIm5vZGVzIiwiZW5kIiwibGFzdCIsImxlbmd0aCIsImkiLCJjaGlsZCIsImJlZm9yZSIsInN0YXJ0Iiwib3duIiwiZGV0ZWN0IiwidmFsdWUiLCJwYXJlbnQiLCJmaXJzdCIsInJhd0NhY2hlIiwiYmVmb3JlQWZ0ZXIiLCJtZXRob2QiLCJ3YWxrIiwicmF3U2VtaWNvbG9uIiwicmF3RW1wdHlCb2R5IiwicmF3SW5kZW50IiwicCIsInBhcnRzIiwic3BsaXQiLCJyZXBsYWNlIiwicmF3QmVmb3JlQ29tbWVudCIsIndhbGtDb21tZW50cyIsImluZGV4T2YiLCJyYXdCZWZvcmVEZWNsIiwid2Fsa0RlY2xzIiwicmF3QmVmb3JlUnVsZSIsInJhd0JlZm9yZUNsb3NlIiwicmF3QmVmb3JlT3BlbiIsInJhd0NvbG9uIiwiYnVmIiwiZGVwdGgiLCJzdGVwIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBTUEsV0FBVyxHQUFHO0FBQ2xCQyxFQUFB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UjtBQUNEOztBQUVELFFBQUl3RCxHQUFHLEdBQUd4RCxJQUFJLENBQUNrQyxNQUFmO0FBQ0EsUUFBSXVCLEtBQUssR0FBRyxDQUFaOztBQUNBLFdBQU9ELEdBQUcsSUFBSUEsR0FBRyxDQUFDdkQsSUFBSixLQUFhLE1BQTNCLEVBQW1DO0FBQ2pDd0QsTUFBQUEsS0FBSyxJQUFJLENBQVQ7QUFDQUQsTUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUN0QixNQUFWO0FBQ0Q7O0FBRUQsUUFBSUQsS0FBSyxDQUFDZ0IsT0FBTixDQUFjLElBQWQsTUFBd0IsQ0FBQyxDQUE3QixFQUFnQztBQUM5QixVQUFJbkUsTUFBTSxHQUFHLEtBQUt5QixHQUFMLENBQVNQLElBQVQsRUFBZSxJQUFmLEVBQXFCLFFBQXJCLENBQWI7O0FBQ0EsVUFBSWxCLE1BQU0sQ0FBQzRDLE1BQVgsRUFBbUI7QUFDakIsYUFBSyxJQUFJZ0MsSUFBSSxHQUFHLENBQWhCLEVBQW1CQSxJQUFJLEdBQUdELEtBQTFCLEVBQWlDQyxJQUFJLEVBQXJDO0FBQXlDekIsVUFBQUEsS0FBSyxJQUFJbkQsTUFBVDtBQUF6QztBQUNEO0FBQ0Y7O0FBRUQsV0FBT21ELEtBQVA7QUFDRCxHOztTQUVEbkIsUSxHQUFBLGtCQUFVZCxJQUFWLEVBQWdCYSxJQUFoQixFQUFzQjtBQUNwQixRQUFJb0IsS0FBSyxHQUFHakMsSUFBSSxDQUFDYSxJQUFELENBQWhCO0FBQ0EsUUFBSU4sR0FBRyxHQUFHUCxJQUFJLENBQUNJLElBQUwsQ0FBVVMsSUFBVixDQUFWOztBQUNBLFFBQUlOLEdBQUcsSUFBSUEsR0FBRyxDQUFDMEIsS0FBSixLQUFjQSxLQUF6QixFQUFnQztBQUM5QixhQUFPMUIsR0FBRyxDQUFDQSxHQUFYO0FBQ0Q7O0FBRUQsV0FBTzBCLEtBQVA7QUFDRCxHOzs7OztlQUdZcEMsVyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERFRkFVTFRfUkFXID0ge1xuICBjb2xvbjogJzogJyxcbiAgaW5kZW50OiAnICAgICcsXG4gIGJlZm9yZURlY2w6ICdcXG4nLFxuICBiZWZvcmVSdWxlOiAnXFxuJyxcbiAgYmVmb3JlT3BlbjogJyAnLFxuICBiZWZvcmVDbG9zZTogJ1xcbicsXG4gIGJlZm9yZUNvbW1lbnQ6ICdcXG4nLFxuICBhZnRlcjogJ1xcbicsXG4gIGVtcHR5Qm9keTogJycsXG4gIGNvbW1lbnRMZWZ0OiAnICcsXG4gIGNvbW1lbnRSaWdodDogJyAnLFxuICBzZW1pY29sb246IGZhbHNlXG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUgKHN0cikge1xuICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn1cblxuY2xhc3MgU3RyaW5naWZpZXIge1xuICBjb25zdHJ1Y3RvciAoYnVpbGRlcikge1xuICAgIHRoaXMuYnVpbGRlciA9IGJ1aWxkZXJcbiAgfVxuXG4gIHN0cmluZ2lmeSAobm9kZSwgc2VtaWNvbG9uKSB7XG4gICAgdGhpc1tub2RlLnR5cGVdKG5vZGUsIHNlbWljb2xvbilcbiAgfVxuXG4gIHJvb3QgKG5vZGUpIHtcbiAgICB0aGlzLmJvZHkobm9kZSlcbiAgICBpZiAobm9kZS5yYXdzLmFmdGVyKSB0aGlzLmJ1aWxkZXIobm9kZS5yYXdzLmFmdGVyKVxuICB9XG5cbiAgY29tbWVudCAobm9kZSkge1xuICAgIGxldCBsZWZ0ID0gdGhpcy5yYXcobm9kZSwgJ2xlZnQnLCAnY29tbWVudExlZnQnKVxuICAgIGxldCByaWdodCA9IHRoaXMucmF3KG5vZGUsICdyaWdodCcsICdjb21tZW50UmlnaHQnKVxuICAgIHRoaXMuYnVpbGRlcignLyonICsgbGVmdCArIG5vZGUudGV4dCArIHJpZ2h0ICsgJyovJywgbm9kZSlcbiAgfVxuXG4gIGRlY2wgKG5vZGUsIHNlbWljb2xvbikge1xuICAgIGxldCBiZXR3ZWVuID0gdGhpcy5yYXcobm9kZSwgJ2JldHdlZW4nLCAnY29sb24nKVxuICAgIGxldCBzdHJpbmcgPSBub2RlLnByb3AgKyBiZXR3ZWVuICsgdGhpcy5yYXdWYWx1ZShub2RlLCAndmFsdWUnKVxuXG4gICAgaWYgKG5vZGUuaW1wb3J0YW50KSB7XG4gICAgICBzdHJpbmcgKz0gbm9kZS5yYXdzLmltcG9ydGFudCB8fCAnICFpbXBvcnRhbnQnXG4gICAgfVxuXG4gICAgaWYgKHNlbWljb2xvbikgc3RyaW5nICs9ICc7J1xuICAgIHRoaXMuYnVpbGRlcihzdHJpbmcsIG5vZGUpXG4gIH1cblxuICBydWxlIChub2RlKSB7XG4gICAgdGhpcy5ibG9jayhub2RlLCB0aGlzLnJhd1ZhbHVlKG5vZGUsICdzZWxlY3RvcicpKVxuICAgIGlmIChub2RlLnJhd3Mub3duU2VtaWNvbG9uKSB7XG4gICAgICB0aGlzLmJ1aWxkZXIobm9kZS5yYXdzLm93blNlbWljb2xvbiwgbm9kZSwgJ2VuZCcpXG4gICAgfVxuICB9XG5cbiAgYXRydWxlIChub2RlLCBzZW1pY29sb24pIHtcbiAgICBsZXQgbmFtZSA9ICdAJyArIG5vZGUubmFtZVxuICAgIGxldCBwYXJhbXMgPSBub2RlLnBhcmFtcyA/IHRoaXMucmF3VmFsdWUobm9kZSwgJ3BhcmFtcycpIDogJydcblxuICAgIGlmICh0eXBlb2Ygbm9kZS5yYXdzLmFmdGVyTmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5hbWUgKz0gbm9kZS5yYXdzLmFmdGVyTmFtZVxuICAgIH0gZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgICBuYW1lICs9ICcgJ1xuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVzKSB7XG4gICAgICB0aGlzLmJsb2NrKG5vZGUsIG5hbWUgKyBwYXJhbXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBlbmQgPSAobm9kZS5yYXdzLmJldHdlZW4gfHwgJycpICsgKHNlbWljb2xvbiA/ICc7JyA6ICcnKVxuICAgICAgdGhpcy5idWlsZGVyKG5hbWUgKyBwYXJhbXMgKyBlbmQsIG5vZGUpXG4gICAgfVxuICB9XG5cbiAgYm9keSAobm9kZSkge1xuICAgIGxldCBsYXN0ID0gbm9kZS5ub2Rlcy5sZW5ndGggLSAxXG4gICAgd2hpbGUgKGxhc3QgPiAwKSB7XG4gICAgICBpZiAobm9kZS5ub2Rlc1tsYXN0XS50eXBlICE9PSAnY29tbWVudCcpIGJyZWFrXG4gICAgICBsYXN0IC09IDFcbiAgICB9XG5cbiAgICBsZXQgc2VtaWNvbG9uID0gdGhpcy5yYXcobm9kZSwgJ3NlbWljb2xvbicpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2hpbGQgPSBub2RlLm5vZGVzW2ldXG4gICAgICBsZXQgYmVmb3JlID0gdGhpcy5yYXcoY2hpbGQsICdiZWZvcmUnKVxuICAgICAgaWYgKGJlZm9yZSkgdGhpcy5idWlsZGVyKGJlZm9yZSlcbiAgICAgIHRoaXMuc3RyaW5naWZ5KGNoaWxkLCBsYXN0ICE9PSBpIHx8IHNlbWljb2xvbilcbiAgICB9XG4gIH1cblxuICBibG9jayAobm9kZSwgc3RhcnQpIHtcbiAgICBsZXQgYmV0d2VlbiA9IHRoaXMucmF3KG5vZGUsICdiZXR3ZWVuJywgJ2JlZm9yZU9wZW4nKVxuICAgIHRoaXMuYnVpbGRlcihzdGFydCArIGJldHdlZW4gKyAneycsIG5vZGUsICdzdGFydCcpXG5cbiAgICBsZXQgYWZ0ZXJcbiAgICBpZiAobm9kZS5ub2RlcyAmJiBub2RlLm5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5ib2R5KG5vZGUpXG4gICAgICBhZnRlciA9IHRoaXMucmF3KG5vZGUsICdhZnRlcicpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFmdGVyID0gdGhpcy5yYXcobm9kZSwgJ2FmdGVyJywgJ2VtcHR5Qm9keScpXG4gICAgfVxuXG4gICAgaWYgKGFmdGVyKSB0aGlzLmJ1aWxkZXIoYWZ0ZXIpXG4gICAgdGhpcy5idWlsZGVyKCd9Jywgbm9kZSwgJ2VuZCcpXG4gIH1cblxuICByYXcgKG5vZGUsIG93biwgZGV0ZWN0KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgaWYgKCFkZXRlY3QpIGRldGVjdCA9IG93blxuXG4gICAgLy8gQWxyZWFkeSBoYWRcbiAgICBpZiAob3duKSB7XG4gICAgICB2YWx1ZSA9IG5vZGUucmF3c1tvd25dXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgbGV0IHBhcmVudCA9IG5vZGUucGFyZW50XG5cbiAgICAvLyBIYWNrIGZvciBmaXJzdCBydWxlIGluIENTU1xuICAgIGlmIChkZXRlY3QgPT09ICdiZWZvcmUnKSB7XG4gICAgICBpZiAoIXBhcmVudCB8fCAocGFyZW50LnR5cGUgPT09ICdyb290JyAmJiBwYXJlbnQuZmlyc3QgPT09IG5vZGUpKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZsb2F0aW5nIGNoaWxkIHdpdGhvdXQgcGFyZW50XG4gICAgaWYgKCFwYXJlbnQpIHJldHVybiBERUZBVUxUX1JBV1tkZXRlY3RdXG5cbiAgICAvLyBEZXRlY3Qgc3R5bGUgYnkgb3RoZXIgbm9kZXNcbiAgICBsZXQgcm9vdCA9IG5vZGUucm9vdCgpXG4gICAgaWYgKCFyb290LnJhd0NhY2hlKSByb290LnJhd0NhY2hlID0geyB9XG4gICAgaWYgKHR5cGVvZiByb290LnJhd0NhY2hlW2RldGVjdF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gcm9vdC5yYXdDYWNoZVtkZXRlY3RdXG4gICAgfVxuXG4gICAgaWYgKGRldGVjdCA9PT0gJ2JlZm9yZScgfHwgZGV0ZWN0ID09PSAnYWZ0ZXInKSB7XG4gICAgICByZXR1cm4gdGhpcy5iZWZvcmVBZnRlcihub2RlLCBkZXRlY3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtZXRob2QgPSAncmF3JyArIGNhcGl0YWxpemUoZGV0ZWN0KVxuICAgICAgaWYgKHRoaXNbbWV0aG9kXSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXNbbWV0aG9kXShyb290LCBub2RlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgICAgIHZhbHVlID0gaS5yYXdzW293bl1cbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHZhbHVlID0gREVGQVVMVF9SQVdbZGV0ZWN0XVxuXG4gICAgcm9vdC5yYXdDYWNoZVtkZXRlY3RdID0gdmFsdWVcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd1NlbWljb2xvbiAocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLm5vZGVzICYmIGkubm9kZXMubGVuZ3RoICYmIGkubGFzdC50eXBlID09PSAnZGVjbCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3Muc2VtaWNvbG9uXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3RW1wdHlCb2R5IChyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgaWYgKGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYWZ0ZXJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdJbmRlbnQgKHJvb3QpIHtcbiAgICBpZiAocm9vdC5yYXdzLmluZGVudCkgcmV0dXJuIHJvb3QucmF3cy5pbmRlbnRcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBsZXQgcCA9IGkucGFyZW50XG4gICAgICBpZiAocCAmJiBwICE9PSByb290ICYmIHAucGFyZW50ICYmIHAucGFyZW50ID09PSByb290KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsZXQgcGFydHMgPSBpLnJhd3MuYmVmb3JlLnNwbGl0KCdcXG4nKVxuICAgICAgICAgIHZhbHVlID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV1cbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJylcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdCZWZvcmVDb21tZW50IChyb290LCBub2RlKSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrQ29tbWVudHMoaSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZVxuICAgICAgICBpZiAodmFsdWUuaW5kZXhPZignXFxuJykgIT09IC0xKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZURlY2wnKVxuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXHNdL2csICcnKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZURlY2wgKHJvb3QsIG5vZGUpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGtEZWNscyhpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmVmb3JlXG4gICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxuXSskLywgJycpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlUnVsZScpXG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcc10vZywgJycpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3QmVmb3JlUnVsZSAocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLm5vZGVzICYmIChpLnBhcmVudCAhPT0gcm9vdCB8fCByb290LmZpcnN0ICE9PSBpKSkge1xuICAgICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmVmb3JlXG4gICAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHZhbHVlKSB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJylcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZUNsb3NlIChyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgaWYgKGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmFmdGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmFmdGVyXG4gICAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHZhbHVlKSB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJylcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZU9wZW4gKHJvb3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBpZiAoaS50eXBlICE9PSAnZGVjbCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmV0d2VlblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0NvbG9uIChyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrRGVjbHMoaSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGkucmF3cy5iZXR3ZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZXR3ZWVuLnJlcGxhY2UoL1teXFxzOl0vZywgJycpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBiZWZvcmVBZnRlciAobm9kZSwgZGV0ZWN0KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVEZWNsJylcbiAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVDb21tZW50JylcbiAgICB9IGVsc2UgaWYgKGRldGVjdCA9PT0gJ2JlZm9yZScpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZVJ1bGUnKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVDbG9zZScpXG4gICAgfVxuXG4gICAgbGV0IGJ1ZiA9IG5vZGUucGFyZW50XG4gICAgbGV0IGRlcHRoID0gMFxuICAgIHdoaWxlIChidWYgJiYgYnVmLnR5cGUgIT09ICdyb290Jykge1xuICAgICAgZGVwdGggKz0gMVxuICAgICAgYnVmID0gYnVmLnBhcmVudFxuICAgIH1cblxuICAgIGlmICh2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEpIHtcbiAgICAgIGxldCBpbmRlbnQgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnaW5kZW50JylcbiAgICAgIGlmIChpbmRlbnQubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IHN0ZXAgPSAwOyBzdGVwIDwgZGVwdGg7IHN0ZXArKykgdmFsdWUgKz0gaW5kZW50XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdWYWx1ZSAobm9kZSwgcHJvcCkge1xuICAgIGxldCB2YWx1ZSA9IG5vZGVbcHJvcF1cbiAgICBsZXQgcmF3ID0gbm9kZS5yYXdzW3Byb3BdXG4gICAgaWYgKHJhdyAmJiByYXcudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gcmF3LnJhd1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0cmluZ2lmaWVyXG4iXSwiZmlsZSI6InN0cmluZ2lmaWVyLmpzIn0=


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.common.vendors-chunks~880300b9.js.map