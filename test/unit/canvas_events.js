(function() {

  var canvas = this.canvas = new fabric.Canvas(null, {enableRetinaScaling: false, width: 600, height: 600});
  var upperCanvasEl = canvas.upperCanvasEl;

  QUnit.module('fabric.Canvas events mixin', {
    beforeEach: function() {
      upperCanvasEl.style.display = '';
      canvas.controlsAboveOverlay = fabric.Canvas.prototype.controlsAboveOverlay;
      canvas.preserveObjectStacking = fabric.Canvas.prototype.preserveObjectStacking;
    },
    afterEach: function() {
      canvas.clear();
      canvas.backgroundColor = fabric.Canvas.prototype.backgroundColor;
      canvas.overlayColor = fabric.Canvas.prototype.overlayColor;
      canvas._collectObjects = fabric.Canvas.prototype._collectObjects;
      canvas.off();
      canvas.calcOffset();
      upperCanvasEl.style.display = 'none';
    }
  });

  QUnit.test('mouse:down with different buttons', function(assert) {
    var clickCount = 0;
    function mouseHandler() {
      clickCount++;
    }
    canvas.on('mouse:down', mouseHandler);
    canvas.fireMiddleClick = false;
    canvas.fireRightClick = false;
    canvas._currentTransform = false;
    canvas.isDrawingMode = false;
    canvas.__onMouseDown({ which: 1 });
    assert.equal(clickCount, 1, 'mouse down fired');
    clickCount = 0;
    canvas.__onMouseDown({ which: 3 });
    assert.equal(clickCount, 0, 'rightclick did not fire a mouse:down event');
    canvas.fireRightClick = true;
    canvas.__onMouseDown({ which: 3 });
    assert.equal(clickCount, 1, 'rightclick did fire a mouse:down event');
    clickCount = 0;
    canvas.__onMouseDown({ which: 2 });
    assert.equal(clickCount, 0, 'middleClick did not fire a mouse:down event');
    canvas.fireMiddleClick = true;
    canvas.__onMouseDown({ which: 2 });
    assert.equal(clickCount, 1, 'middleClick did fire a mouse:down event');
  });

  QUnit.test('mouse:down and group selector', function(assert) {
    var e = { clientX: 30, clientY: 30, which: 1 };
    var rect = new fabric.Rect({ width: 60, height: 60 });
    var expectedGroupSelector = { ex: 30, ey: 30, top: 0, left: 0 };
    canvas.__onMouseDown(e);
    assert.deepEqual(canvas._groupSelector, expectedGroupSelector, 'a new groupSelector is created');
    canvas.add(rect);
    canvas.__onMouseUp(e);
    canvas.__onMouseDown(e);
    assert.deepEqual(canvas._groupSelector, null, 'with object on target no groupSelector is started');
    rect.selectable = false;
    canvas.__onMouseUp(e);
    canvas.__onMouseDown(e);
    assert.deepEqual(canvas._groupSelector, null, 'with object non selectable but already selected groupSelector is not started');
    canvas.__onMouseUp(e);
    canvas.discardActiveObject();
    rect.isEditing = true;
    canvas.__onMouseDown(e);
    assert.deepEqual(canvas._groupSelector, null, 'with object editing, groupSelector is not started');
    canvas.__onMouseUp(e);
    canvas.discardActiveObject();
    rect.isEditing = false;
    canvas.__onMouseDown(e);
    assert.deepEqual(canvas._groupSelector, expectedGroupSelector, 'a new groupSelector is created');
    canvas.__onMouseUp(e);
  });

  QUnit.test('mouse:up isClick = true', function(assert) {
    var e = { clientX: 30, clientY: 30, which: 1 };
    var isClick = false;
    canvas.on('mouse:up', function(opt) {
      isClick = opt.isClick;
    });
    canvas.__onMouseDown(e);
    canvas.__onMouseUp(e);
    assert.equal(isClick, true, 'without moving the pointer, the click is true');
  });

  QUnit.test('setDimensions and active brush', function(assert) {
    var prepareFor = false;
    var rendered = false;
    var canva = new fabric.Canvas(null, { width: 500, height: 500 });
    var brush = new fabric.PencilBrush({ color: 'red', width: 4 });
    canva.isDrawingMode = true;
    canva.freeDrawingBrush = brush;
    canva._isCurrentlyDrawing = true;
    brush._render = function() { rendered = true; };
    brush._setBrushStyles = function() { prepareFor = true; };
    canva.setDimensions({ width: 200, height: 200 });
    canva.renderAll();
    assert.equal(rendered, true, 'the brush called the _render method');
    assert.equal(prepareFor, true, 'the brush called the _setBrushStyles method');
  });

  QUnit.test('mouse:up isClick = false', function(assert) {
    var e = { clientX: 30, clientY: 30, which: 1 };
    var e2 = { clientX: 31, clientY: 31, which: 1 };
    var isClick = true;
    canvas.on('mouse:up', function(opt) {
      isClick = opt.isClick;
    });
    canvas.__onMouseDown(e);
    canvas.__onMouseMove(e2);
    canvas.__onMouseUp(e2);
    assert.equal(isClick, false, 'moving the pointer, the click is false');
  });

  QUnit.test('avoid multiple bindings', function(assert) {
    var c = new fabric.Canvas();
    var eventsArray = [
      c._onMouseDown,
      c._onMouseMove,
      c._onMouseUp,
      c._onResize,
      c._onGesture,
      c._onDrag,
      c._onShake,
      c._onLongPress,
      c._onOrientationChange,
      c._onMouseWheel,
      c._onMouseOut,
      c._onMouseEnter,
      c._onContextMenu,
      c._onDragOver,
      c._onDragEnter,
      c._onDragLeave,
      c._onDrop,
    ];
    // initialize canvas more than once
    c.initialize();
    c.initialize();
    var eventsArray2 = [
      c._onMouseDown,
      c._onMouseMove,
      c._onMouseUp,
      c._onResize,
      c._onGesture,
      c._onDrag,
      c._onShake,
      c._onLongPress,
      c._onOrientationChange,
      c._onMouseWheel,
      c._onMouseOut,
      c._onMouseEnter,
      c._onContextMenu,
      c._onDragOver,
      c._onDragEnter,
      c._onDragLeave,
      c._onDrop,
    ];
    assert.deepEqual(eventsArray, eventsArray2, 'after first initialize, functions do not change.');
  });

  QUnit.test('avoid multiple registration - mousedown', function(assert) {
    var originalMouseDown = fabric.Canvas.prototype._onMouseDown;
    var counter = 0;
    fabric.Canvas.prototype._onMouseDown = function() {
      counter++;
    };
    var c = new fabric.Canvas();
    // initialize canvas more than once
    c.initialize(c.lowerCanvasEl);
    c.initialize(c.lowerCanvasEl);
    var event = fabric.document.createEvent('MouseEvent');
    event.initEvent('mousedown', true, true);
    c.upperCanvasEl.dispatchEvent(event);
    assert.equal(counter, 1, 'listener executed once');
    fabric.Canvas.prototype._onMouseDown = originalMouseDown;
  });

  QUnit.test('avoid multiple registration - mousemove', function(assert) {
    var originalMouseMove = fabric.Canvas.prototype._onMouseMove;
    var counter = 0;
    fabric.Canvas.prototype._onMouseMove = function() {
      counter++;
    };
    var c = new fabric.Canvas();
    // initialize canvas more than once
    c.initialize(c.lowerCanvasEl);
    c.initialize(c.lowerCanvasEl);
    var event = fabric.document.createEvent('MouseEvent');
    event.initEvent('mousemove', true, true);
    c.upperCanvasEl.dispatchEvent(event);
    assert.equal(counter, 1, 'listener executed once');
    fabric.Canvas.prototype._onMouseMove = originalMouseMove;
  });

  QUnit.test('avoid multiple registration - mouseup', function(assert) {
    var done = assert.async();
    var originalMouseUp = fabric.Canvas.prototype._onMouseUp;
    var counter = 0;
    fabric.Canvas.prototype._onMouseUp = function() {
      counter++;
    };
    var c = new fabric.Canvas();
    // initialize canvas more than once
    c.initialize(c.lowerCanvasEl);
    c.initialize(c.lowerCanvasEl);

    // a mouse down is necessary to register mouse up.
    var _event = fabric.document.createEvent('MouseEvent');
    _event.initEvent('mousedown', true, true);
    c.upperCanvasEl.dispatchEvent(_event);
    setTimeout(function() {
      var event = fabric.document.createEvent('MouseEvent');
      event.initEvent('mouseup', true, true);
      fabric.document.dispatchEvent(event);
      assert.equal(counter, 1, 'listener executed once');
      fabric.Canvas.prototype._onMouseUp = originalMouseUp;
      done();
    }, 200);
  });

  QUnit.test('avoid multiple registration - mouseout', function(assert) {
    var originalMouseOut = fabric.Canvas.prototype._onMouseOut;
    var counter = 0;
    fabric.Canvas.prototype._onMouseOut = function() {
      counter++;
    };
    var c = new fabric.Canvas();
    // initialize canvas more than once
    c.initialize(c.lowerCanvasEl);
    c.initialize(c.lowerCanvasEl);
    var event = fabric.document.createEvent('MouseEvent');
    event.initEvent('mouseout', true, true);
    c.upperCanvasEl.dispatchEvent(event);
    assert.equal(counter, 1, 'listener executed once');
    fabric.Canvas.prototype._onMouseOut = originalMouseOut;
  });

  QUnit.test('avoid multiple registration - mouseenter', function(assert) {
    var originalMouseEnter = fabric.Canvas.prototype._onMouseEnter;
    var counter = 0;
    fabric.Canvas.prototype._onMouseEnter = function() {
      counter++;
    };
    var c = new fabric.Canvas();
    // initialize canvas more than once
    c.initialize(c.lowerCanvasEl);
    c.initialize(c.lowerCanvasEl);
    var event = fabric.document.createEvent('MouseEvent');
    event.initEvent('mouseenter', true, true);
    c.upperCanvasEl.dispatchEvent(event);
    assert.equal(counter, 1, 'listener executed once');
    fabric.Canvas.prototype._onMouseEnter = originalMouseEnter;
  });

  QUnit.test('avoid multiple events on window', function(assert) {
    var originalResize = fabric.Canvas.prototype._onResize;
    var counter = 0;
    fabric.Canvas.prototype._onResize = function() {
      counter++;
    };
    var c = new fabric.Canvas();
    // initialize canvas more than once
    c.initialize(c.lowerCanvasEl);
    c.initialize(c.lowerCanvasEl);
    var event = fabric.document.createEvent('UIEvents');
    event.initUIEvent('resize', true, false, fabric.window, 0);
    fabric.window.dispatchEvent(event);
    assert.equal(counter, 1, 'listener on window executed once');
    fabric.Canvas.prototype._onResize = originalResize;
  });


  QUnit.test('actionIsDisabled ', function(assert) {
    assert.ok(typeof fabric.Canvas.prototype.actionIsDisabled === 'function', 'actionIsDisabled is a function');
    var key = canvas.altActionKey;
    var target = new fabric.Object();
    var e = { };
    e[key] = false;
    assert.equal(!!canvas.actionIsDisabled('mt', target, e), false, 'action is not disabled');
    assert.equal(!!canvas.actionIsDisabled('mb', target, e), false, 'action is not disabled');
    assert.equal(!!canvas.actionIsDisabled('ml', target, e), false, 'action is not disabled');
    assert.equal(!!canvas.actionIsDisabled('mr', target, e), false, 'action is not disabled');
    assert.equal(!!canvas.actionIsDisabled('tl', target, e), false, 'action is not disabled');
    assert.equal(!!canvas.actionIsDisabled('tr', target, e), false, 'action is not disabled');
    assert.equal(!!canvas.actionIsDisabled('bl', target, e), false, 'action is not disabled');
    assert.equal(!!canvas.actionIsDisabled('br', target, e), false, 'action is not disabled');
    assert.equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'action is not disabled');
    target = new fabric.Object();
    target.lockScalingX = true;

    assert.equal(!!canvas.actionIsDisabled('mt', target, e), false, 'mt action is not disabled lockScalingX');
    assert.equal(!!canvas.actionIsDisabled('mb', target, e), false, 'mb action is not disabled lockScalingX');
    assert.equal(!!canvas.actionIsDisabled('ml', target, e), true, 'ml action is disabled lockScalingX');
    assert.equal(!!canvas.actionIsDisabled('mr', target, e), true, 'mr action is disabled lockScalingX');
    assert.equal(!!canvas.actionIsDisabled('tl', target, e), true, 'tl action is disabled lockScalingX');
    assert.equal(!!canvas.actionIsDisabled('tr', target, e), true, 'tr action is disabled lockScalingX');
    assert.equal(!!canvas.actionIsDisabled('bl', target, e), true, 'bl action is disabled lockScalingX');
    assert.equal(!!canvas.actionIsDisabled('br', target, e), true, 'br action is disabled lockScalingX');
    assert.equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabled lockScalingX');
    target = new fabric.Object();
    target.lockScalingY = true;
    assert.equal(!!canvas.actionIsDisabled('mt', target, e), true, 'mt action is disabled lockScalingY');
    assert.equal(!!canvas.actionIsDisabled('mb', target, e), true, 'mb action is disabled lockScalingY');
    assert.equal(!!canvas.actionIsDisabled('ml', target, e), false, 'ml action is not disabled lockScalingY');
    assert.equal(!!canvas.actionIsDisabled('mr', target, e), false, 'mr action is not disabled lockScalingY');
    assert.equal(!!canvas.actionIsDisabled('tl', target, e), true, 'tl action is not disabled lockScalingY');
    assert.equal(!!canvas.actionIsDisabled('tr', target, e), true, 'tr action is not disabled lockScalingY');
    assert.equal(!!canvas.actionIsDisabled('bl', target, e), true, 'bl action is not disabled lockScalingY');
    assert.equal(!!canvas.actionIsDisabled('br', target, e), true, 'br action is not disabled lockScalingY');
    assert.equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabledlockScalingY');
    target = new fabric.Object();
    target.lockScalingY = true;
    target.lockScalingX = true;
    assert.equal(!!canvas.actionIsDisabled('mt', target, e), true, 'mt action is disabled scaling locked');
    assert.equal(!!canvas.actionIsDisabled('mb', target, e), true, 'mb action is disabled scaling locked');
    assert.equal(!!canvas.actionIsDisabled('ml', target, e), true, 'ml action is disabled scaling locked');
    assert.equal(!!canvas.actionIsDisabled('mr', target, e), true, 'mr action is disabled scaling locked');
    assert.equal(!!canvas.actionIsDisabled('tl', target, e), true, 'tl action is disabled scaling locked');
    assert.equal(!!canvas.actionIsDisabled('tr', target, e), true, 'tr action is disabled scaling locked');
    assert.equal(!!canvas.actionIsDisabled('bl', target, e), true, 'bl action is disabled scaling locked');
    assert.equal(!!canvas.actionIsDisabled('br', target, e), true, 'br action is disabled scaling locked');
    assert.equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabled scaling locked');
    target = new fabric.Object();
    target.lockRotation = true;
    assert.equal(!!canvas.actionIsDisabled('mt', target, e), false, 'mt action is not disabled lockRotation');
    assert.equal(!!canvas.actionIsDisabled('mb', target, e), false, 'mb action is not disabled lockRotation');
    assert.equal(!!canvas.actionIsDisabled('ml', target, e), false, 'ml action is not disabled lockRotation');
    assert.equal(!!canvas.actionIsDisabled('mr', target, e), false, 'mr action is not disabled lockRotation');
    assert.equal(!!canvas.actionIsDisabled('tl', target, e), false, 'tl action is not disabled lockRotation');
    assert.equal(!!canvas.actionIsDisabled('tr', target, e), false, 'tr action is not disabled lockRotation');
    assert.equal(!!canvas.actionIsDisabled('bl', target, e), false, 'bl action is not disabled lockRotation');
    assert.equal(!!canvas.actionIsDisabled('br', target, e), false, 'br action is not disabled lockRotation');
    assert.equal(!!canvas.actionIsDisabled('mtr', target, e), true, 'mtr action is disabled lockRotation');
    target = new fabric.Object();
    target.lockSkewingX = true;
    target.lockSkewingY = true;
    assert.equal(!!canvas.actionIsDisabled('mt', target, e), false, 'mt action is not disabled lockSkewing');
    assert.equal(!!canvas.actionIsDisabled('mb', target, e), false, 'mb action is not disabled lockSkewing');
    assert.equal(!!canvas.actionIsDisabled('ml', target, e), false, 'ml action is not disabled lockSkewing');
    assert.equal(!!canvas.actionIsDisabled('mr', target, e), false, 'mr action is not disabled lockSkewing');
    assert.equal(!!canvas.actionIsDisabled('tl', target, e), false, 'tl action is not disabled lockSkewing');
    assert.equal(!!canvas.actionIsDisabled('tr', target, e), false, 'tr action is not disabled lockSkewing');
    assert.equal(!!canvas.actionIsDisabled('bl', target, e), false, 'bl action is not disabled lockSkewing');
    assert.equal(!!canvas.actionIsDisabled('br', target, e), false, 'br action is not disabled lockSkewing');
    assert.equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabled lockSkewing');
    e[key] = true;
    target = new fabric.Object();
    target.lockSkewingY = true;
    assert.equal(!!canvas.actionIsDisabled('mt', target, e), false, 'mt action is not disabled lockSkewingY');
    assert.equal(!!canvas.actionIsDisabled('mb', target, e), false, 'mb action is not disabled lockSkewingY');
    assert.equal(!!canvas.actionIsDisabled('ml', target, e), true, 'ml action is disabled lockSkewingY');
    assert.equal(!!canvas.actionIsDisabled('mr', target, e), true, 'mr action is disabled lockSkewingY');
    assert.equal(!!canvas.actionIsDisabled('tl', target, e), false, 'tl action is not disabled lockSkewingY');
    assert.equal(!!canvas.actionIsDisabled('tr', target, e), false, 'tr action is not disabled lockSkewingY');
    assert.equal(!!canvas.actionIsDisabled('bl', target, e), false, 'bl action is not disabled lockSkewingY');
    assert.equal(!!canvas.actionIsDisabled('br', target, e), false, 'br action is not disabled lockSkewingY');
    assert.equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabled lockSkewingY');

    e[key] = true;
    target = new fabric.Object();
    target.lockSkewingX = true;
    assert.equal(!!canvas.actionIsDisabled('mt', target, e), true, 'mt action is disabled lockSkewingX');
    assert.equal(!!canvas.actionIsDisabled('mb', target, e), true, 'mb action is disabled lockSkewingX');
    assert.equal(!!canvas.actionIsDisabled('ml', target, e), false, 'ml action is not disabled lockSkewingX');
    assert.equal(!!canvas.actionIsDisabled('mr', target, e), false, 'mr action is not disabled lockSkewingX');
    assert.equal(!!canvas.actionIsDisabled('tl', target, e), false, 'tl action is not disabled lockSkewingX');
    assert.equal(!!canvas.actionIsDisabled('tr', target, e), false, 'tr action is not disabled lockSkewingX');
    assert.equal(!!canvas.actionIsDisabled('bl', target, e), false, 'bl action is not disabled lockSkewingX');
    assert.equal(!!canvas.actionIsDisabled('br', target, e), false, 'br action is not disabled lockSkewingX');
    assert.equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabled lockSkewingX');
  });

  QUnit.test('getCornerCursor ', function(assert) {
    assert.ok(typeof fabric.Canvas.prototype.getCornerCursor === 'function', 'actionIsDisabled is a function');
    var key = canvas.altActionKey;
    var key2 = canvas.uniScaleKey;
    var target = new fabric.Object();
    var e = { };
    e[key] = false;
    assert.equal(canvas.getCornerCursor('mt', target, e), 'n-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('mb', target, e), 's-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('ml', target, e), 'w-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('mr', target, e), 'e-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('tl', target, e), 'nw-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'ne-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'sw-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('br', target, e), 'se-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('mtr', target, e), 'crosshair', 'action is not disabled');

    target = new fabric.Object();
    target.hasRotatingPoint = false;
    var e = { };
    e[key] = false;
    assert.equal(canvas.getCornerCursor('mtr', target, e), 'default', 'action is not disabled');

    target = new fabric.Object();
    target.lockScalingX = true;
    assert.equal(canvas.getCornerCursor('mt', target, e), 'n-resize', 'action is not disabled lockScalingX');
    assert.equal(canvas.getCornerCursor('mb', target, e), 's-resize', 'action is not disabled lockScalingX');
    assert.equal(canvas.getCornerCursor('ml', target, e), 'not-allowed', 'action is disabled lockScalingX');
    assert.equal(canvas.getCornerCursor('mr', target, e), 'not-allowed', 'action is disabled lockScalingX');
    assert.equal(canvas.getCornerCursor('tl', target, e), 'not-allowed', 'action is disabled lockScalingX');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'not-allowed', 'action is disabled lockScalingX');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'not-allowed', 'action is disabled lockScalingX');
    assert.equal(canvas.getCornerCursor('br', target, e), 'not-allowed', 'action is disabled lockScalingX');
    assert.equal(canvas.getCornerCursor('mtr', target, e), 'crosshair', 'action is not disabled lockScalingX');
    e[key2] = true;
    assert.equal(canvas.getCornerCursor('tl', target, e), 'nw-resize', 'action is not disabled lockScalingX key2');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'ne-resize', 'action is not disabled lockScalingX key2');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'sw-resize', 'action is not disabled lockScalingX key2');
    assert.equal(canvas.getCornerCursor('br', target, e), 'se-resize', 'action is not disabled lockScalingX key2');

    var e = { };
    target = new fabric.Object();
    target.lockScalingY = true;
    assert.equal(canvas.getCornerCursor('mt', target, e), 'not-allowed', 'action is disabled lockScalingY');
    assert.equal(canvas.getCornerCursor('mb', target, e), 'not-allowed', 'action is disabled lockScalingY');
    assert.equal(canvas.getCornerCursor('ml', target, e), 'w-resize', 'action is not disabled lockScalingY');
    assert.equal(canvas.getCornerCursor('mr', target, e), 'e-resize', 'action is not disabled lockScalingY');
    assert.equal(canvas.getCornerCursor('tl', target, e), 'not-allowed', 'action is disabled lockScalingY');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'not-allowed', 'action is disabled lockScalingY');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'not-allowed', 'action is disabled lockScalingY');
    assert.equal(canvas.getCornerCursor('br', target, e), 'not-allowed', 'action is disabled lockScalingY');
    assert.equal(canvas.getCornerCursor('mtr', target, e), 'crosshair', 'action is not disabled lockScalingY');
    e[key2] = true;
    assert.equal(canvas.getCornerCursor('tl', target, e), 'nw-resize', 'action is not disabled lockScalingY key2');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'ne-resize', 'action is not disabled lockScalingY key2');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'sw-resize', 'action is not disabled lockScalingY key2');
    assert.equal(canvas.getCornerCursor('br', target, e), 'se-resize', 'action is not disabled lockScalingY key2');

    var e = { };
    target = new fabric.Object();
    target.lockScalingY = true;
    target.lockScalingX = true;
    assert.equal(canvas.getCornerCursor('mt', target, e), 'not-allowed', 'action is disabled lockScaling');
    assert.equal(canvas.getCornerCursor('mb', target, e), 'not-allowed', 'action is disabled lockScaling');
    assert.equal(canvas.getCornerCursor('ml', target, e), 'not-allowed', 'action is disabled lockScaling');
    assert.equal(canvas.getCornerCursor('mr', target, e), 'not-allowed', 'action is disabled lockScaling');
    assert.equal(canvas.getCornerCursor('tl', target, e), 'not-allowed', 'action is disabled lockScaling');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'not-allowed', 'action is disabled lockScaling');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'not-allowed', 'action is disabled lockScaling');
    assert.equal(canvas.getCornerCursor('br', target, e), 'not-allowed', 'action is disabled lockScaling');
    assert.equal(canvas.getCornerCursor('mtr', target, e), 'crosshair', 'action is not disabled lockScaling');
    e[key2] = true;
    assert.equal(canvas.getCornerCursor('tl', target, e), 'not-allowed', 'action is disabled lockScaling key2');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'not-allowed', 'action is disabled lockScaling key2');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'not-allowed', 'action is disabled lockScaling key2');
    assert.equal(canvas.getCornerCursor('br', target, e), 'not-allowed', 'action is disabled lockScaling key2');

    var e = { };
    target = new fabric.Object();
    target.lockRotation = true;
    assert.equal(canvas.getCornerCursor('mt', target, e), 'n-resize', 'action is not disabled lockRotation');
    assert.equal(canvas.getCornerCursor('mb', target, e), 's-resize', 'action is not disabled lockRotation');
    assert.equal(canvas.getCornerCursor('ml', target, e), 'w-resize', 'action is not disabled lockRotation');
    assert.equal(canvas.getCornerCursor('mr', target, e), 'e-resize', 'action is not disabled lockRotation');
    assert.equal(canvas.getCornerCursor('tl', target, e), 'nw-resize', 'action is not disabled lockRotation');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'ne-resize', 'action is not disabled lockRotation');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'sw-resize', 'action is not disabled lockRotation');
    assert.equal(canvas.getCornerCursor('br', target, e), 'se-resize', 'action is not disabled lockRotation');
    assert.equal(canvas.getCornerCursor('mtr', target, e), 'not-allowed', 'action is disabled lockRotation');

    target = new fabric.Object();
    target.lockSkewingX = true;
    target.lockSkewingY = true;
    assert.equal(canvas.getCornerCursor('mt', target, e), 'n-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('mb', target, e), 's-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('ml', target, e), 'w-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('mr', target, e), 'e-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('tl', target, e), 'nw-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'ne-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'sw-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('br', target, e), 'se-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('mtr', target, e), 'crosshair', 'action is not disabled');

    e[key] = true;
    target = new fabric.Object();
    target.lockSkewingY = true;
    assert.equal(canvas.getCornerCursor('mt', target, e), 'e-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('mb', target, e), 'w-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('ml', target, e), 'not-allowed', 'action is disabled');
    assert.equal(canvas.getCornerCursor('mr', target, e), 'not-allowed', 'action is disabled');
    assert.equal(canvas.getCornerCursor('tl', target, e), 'nw-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'ne-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'sw-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('br', target, e), 'se-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('mtr', target, e), 'crosshair', 'action is not disabled');

    e[key] = true;
    target = new fabric.Object();
    target.lockSkewingX = true;
    assert.equal(canvas.getCornerCursor('mt', target, e), 'not-allowed', 'action is disabled');
    assert.equal(canvas.getCornerCursor('mb', target, e), 'not-allowed', 'action is disabled');
    assert.equal(canvas.getCornerCursor('ml', target, e), 'n-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('mr', target, e), 's-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('tl', target, e), 'nw-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('tr', target, e), 'ne-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('bl', target, e), 'sw-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('br', target, e), 'se-resize', 'action is not disabled');
    assert.equal(canvas.getCornerCursor('mtr', target, e), 'crosshair', 'action is not disabled');
  });

})();
