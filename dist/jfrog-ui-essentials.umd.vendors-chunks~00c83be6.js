((typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpjfrog_ui_essentials"] || []).push([[2],{

/***/ "8645":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("df45");
/* harmony import */ var d3_drag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("abe9");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a43d");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("fd32");
/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("b108");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("944c");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("9617");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("8637");
/* harmony import */ var _noevent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("392b");










// Ignore right-click, since that should open the context menu.
function defaultFilter() {
  return !d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].button;
}

function defaultExtent() {
  var e = this, w, h;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    w = e.width.baseVal.value;
    h = e.height.baseVal.value;
  } else {
    w = e.clientWidth;
    h = e.clientHeight;
  }
  return [[0, 0], [w, h]];
}

function defaultTransform() {
  return this.__zoom || _transform__WEBPACK_IMPORTED_MODULE_7__[/* identity */ "c"];
}

function defaultWheelDelta() {
  return -d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].deltaY * (d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].deltaMode ? 120 : 1) / 500;
}

function defaultTouchable() {
  return "ontouchstart" in this;
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  var filter = defaultFilter,
      extent = defaultExtent,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = defaultTouchable,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = d3_interpolate__WEBPACK_IMPORTED_MODULE_2__["interpolateZoom"],
      gestures = [],
      listeners = Object(d3_dispatch__WEBPACK_IMPORTED_MODULE_0__[/* dispatch */ "a"])("start", "zoom", "end"),
      touchstarting,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled)
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
            .start()
            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
            .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    });
  };

  zoom.scaleTo = function(selection, k) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = centroid(e),
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    });
  };

  zoom.translateBy = function(selection, x, y) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    });
  };

  zoom.translateTo = function(selection, x, y) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p = centroid(e);
      return constrain(_transform__WEBPACK_IMPORTED_MODULE_7__[/* identity */ "c"].translate(p[0], p[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    });
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new _transform__WEBPACK_IMPORTED_MODULE_7__[/* Transform */ "a"](k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new _transform__WEBPACK_IMPORTED_MODULE_7__[/* Transform */ "a"](transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, center) {
    transition
        .on("start.zoom", function() { gesture(this, arguments).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args),
              e = extent.apply(that, args),
              p = center || centroid(e),
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new _transform__WEBPACK_IMPORTED_MODULE_7__[/* Transform */ "a"](k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args) {
    for (var i = 0, n = gestures.length, g; i < n; ++i) {
      if ((g = gestures[i]).that === that) {
        return g;
      }
    }
    return new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.index = -1;
    this.active = 0;
    this.extent = extent.apply(that, args);
  }

  Gesture.prototype = {
    start: function() {
      if (++this.active === 1) {
        this.index = gestures.push(this) - 1;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        gestures.splice(this.index, 1);
        this.index = -1;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["customEvent"])(new _event__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"](zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
    }
  };

  function wheeled() {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["mouse"])(this);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__["interrupt"])(this);
      g.start();
    }

    Object(_noevent__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])();
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        v = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["mouse"])(this),
        x0 = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].clientX,
        y0 = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].clientY;

    Object(d3_drag__WEBPACK_IMPORTED_MODULE_1__["dragDisable"])(d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].view);
    Object(_noevent__WEBPACK_IMPORTED_MODULE_8__[/* nopropagation */ "b"])();
    g.mouse = [p, this.__zoom.invert(p)];
    Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__["interrupt"])(this);
    g.start();

    function mousemoved() {
      Object(_noevent__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])();
      if (!g.moved) {
        var dx = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].clientX - x0, dy = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["mouse"])(g.that), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped() {
      v.on("mousemove.zoom mouseup.zoom", null);
      Object(d3_drag__WEBPACK_IMPORTED_MODULE_1__["dragEnable"])(d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].view, g.moved);
      Object(_noevent__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])();
      g.end();
    }
  }

  function dblclicked() {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["mouse"])(this),
        p1 = t0.invert(p0),
        k1 = t0.k * (d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments), translateExtent);

    Object(_noevent__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])();
    if (duration > 0) Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this).transition().duration(duration).call(schedule, t1, p0);
    else Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this).call(zoom.transform, t1);
  }

  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        touches = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].changedTouches,
        started,
        n = touches.length, i, t, p;

    Object(_noevent__WEBPACK_IMPORTED_MODULE_8__[/* nopropagation */ "b"])();
    for (i = 0; i < n; ++i) {
      t = touches[i], p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["touch"])(this, touches, t.identifier);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true;
      else if (!g.touch1) g.touch1 = p;
    }

    // If this is a dbltap, reroute to the (optional) dblclick.zoom handler.
    if (touchstarting) {
      touchstarting = clearTimeout(touchstarting);
      if (!g.touch1) {
        g.end();
        p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this).on("dblclick.zoom");
        if (p) p.apply(this, arguments);
        return;
      }
    }

    if (started) {
      touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__["interrupt"])(this);
      g.start();
    }
  }

  function touchmoved() {
    var g = gesture(this, arguments),
        touches = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].changedTouches,
        n = touches.length, i, t, p, l;

    Object(_noevent__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])();
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["touch"])(this, touches, t.identifier);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended() {
    var g = gesture(this, arguments),
        touches = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].changedTouches,
        n = touches.length, i, t;

    Object(_noevent__WEBPACK_IMPORTED_MODULE_8__[/* nopropagation */ "b"])();
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else g.end();
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  return zoom;
});


/***/ })

}]);
//# sourceMappingURL=jfrog-ui-essentials.umd.vendors-chunks~00c83be6.js.map