(function() {

  // var emptyImageCanvasData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAH7ElEQVR4nO3VMQ0AMAzAsPInvYHoMS2yEeTLHADge/M6AADYM3QACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIuMjH4b7osLFBAAAAAElFTkSuQmCC";

  var CANVAS_SVG = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
                   '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="200" height="200" viewBox="0 0 200 200" xml:space="preserve">\n<desc>Created with Fabric.js ' + fabric.version + '</desc>\n<defs>\n</defs>\n</svg>';

  var CANVAS_SVG_VIEWBOX = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
                           '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="200" height="200" viewBox="100 100 300 300" xml:space="preserve">\n<desc>Created with Fabric.js ' + fabric.version + '</desc>\n<defs>\n</defs>\n</svg>';

  var PATH_JSON = '{"version":"' + fabric.version + '","objects": [{"type": "path", "version":"' + fabric.version + '", "originX": "left", "originY": "top", "left": 268, "top": 266, "width": 51, "height": 49,' +
                  ' "fill": "rgb(0,0,0)", "stroke": null, "strokeWidth": 1, "scaleX": 1, "scaleY": 1, ' +
                  '"angle": 0, "flipX": false, "flipY": false, "opacity": 1, "path": [["M", 18.511, 13.99],' +
                  ' ["c", 0, 0, -2.269, -4.487, -12.643, 4.411], ["c", 0, 0, 4.824, -14.161, 19.222, -9.059],' +
                  ' ["l", 0.379, -2.1], ["c", -0.759, -0.405, -1.375, -1.139, -1.645, -2.117], ["c", -0.531, ' +
                  '-1.864, 0.371, -3.854, 1.999, -4.453], ["c", 0.312, -0.118, 0.633, -0.169, 0.953, -0.169], ' +
                  '["c", 1.299, 0, 2.514, 0.953, 2.936, 2.455], ["c", 0.522, 1.864, -0.372, 3.854, -1.999, ' +
                  '4.453], ["c", -0.229, 0.084, -0.464, 0.127, -0.692, 0.152], ["l", -0.379, 2.37], ["c", ' +
                  '1.146, 0.625, 2.024, 1.569, 2.674, 2.758], ["c", 3.213, 2.514, 8.561, 4.184, 11.774, -8.232],' +
                  ' ["c", 0, 0, 0.86, 16.059, -12.424, 14.533], ["c", 0.008, 2.859, 0.615, 5.364, -0.076, 8.224],' +
                  ' ["c", 8.679, 3.146, 15.376, 14.389, 17.897, 18.168], ["l", 2.497, -2.151], ["l", 1.206, 1.839],' +
                  ' ["l", -3.889, 3.458], ["C", 46.286, 48.503, 31.036, 32.225, 22.72, 35.81], ["c", -1.307, 2.851,' +
                  ' -3.56, 6.891, -7.481, 8.848], ["c", -4.689, 2.336, -9.084, -0.802, -11.277, -2.868], ["l",' +
                  ' -1.948, 3.104], ["l", -1.628, -1.333], ["l", 3.138, -4.689], ["c", 0.025, 0, 9, 1.932, 9, 1.932], ' +
                  '["c", 0.877, -9.979, 2.893, -12.905, 4.942, -15.621], ["C", 17.878, 21.775, 18.713, 17.397, 18.511, ' +
                  '13.99], ["z"]]}], "background": "#ff5555", "overlay":"rgba(0,0,0,0.2)"}';

  var PATH_WITHOUT_DEFAULTS_JSON = '{"version":"' + fabric.version + '","objects": [{"type": "path", "version":"' + fabric.version + '", "left": 268, "top": 266, "width": 51, "height": 49, "path": [["M", 18.511, 13.99],' +
                  ' ["c", 0, 0, -2.269, -4.487, -12.643, 4.411], ["c", 0, 0, 4.824, -14.161, 19.222, -9.059],' +
                  ' ["l", 0.379, -2.1], ["c", -0.759, -0.405, -1.375, -1.139, -1.645, -2.117], ["c", -0.531, ' +
                  '-1.864, 0.371, -3.854, 1.999, -4.453], ["c", 0.312, -0.118, 0.633, -0.169, 0.953, -0.169], ' +
                  '["c", 1.299, 0, 2.514, 0.953, 2.936, 2.455], ["c", 0.522, 1.864, -0.372, 3.854, -1.999, ' +
                  '4.453], ["c", -0.229, 0.084, -0.464, 0.127, -0.692, 0.152], ["l", -0.379, 2.37], ["c", ' +
                  '1.146, 0.625, 2.024, 1.569, 2.674, 2.758], ["c", 3.213, 2.514, 8.561, 4.184, 11.774, -8.232],' +
                  ' ["c", 0, 0, 0.86, 16.059, -12.424, 14.533], ["c", 0.008, 2.859, 0.615, 5.364, -0.076, 8.224],' +
                  ' ["c", 8.679, 3.146, 15.376, 14.389, 17.897, 18.168], ["l", 2.497, -2.151], ["l", 1.206, 1.839],' +
                  ' ["l", -3.889, 3.458], ["C", 46.286, 48.503, 31.036, 32.225, 22.72, 35.81], ["c", -1.307, 2.851,' +
                  ' -3.56, 6.891, -7.481, 8.848], ["c", -4.689, 2.336, -9.084, -0.802, -11.277, -2.868], ["l",' +
                  ' -1.948, 3.104], ["l", -1.628, -1.333], ["l", 3.138, -4.689], ["c", 0.025, 0, 9, 1.932, 9, 1.932], ' +
                  '["c", 0.877, -9.979, 2.893, -12.905, 4.942, -15.621], ["C", 17.878, 21.775, 18.713, 17.397, 18.511, ' +
                  '13.99], ["z"]]}], "background": "#ff5555","overlay": "rgba(0,0,0,0.2)"}';

  var PATH_DATALESS_JSON = '{"version":"' + fabric.version + '","objects":[{"type":"path","version":"' + fabric.version + '","originX":"left","originY":"top","left":99.5,"top":99.5,"width":200,"height":200,"fill":"rgb(0,0,0)",' +
                           '"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,' +
                           '"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,' +
                           '"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"sourcePath":"http://example.com/"}]}';

  var RECT_JSON = '{"version":"' + fabric.version + '","objects":[{"type":"rect","version":"' + fabric.version + '","originX":"left","originY":"top","left":0,"top":0,"width":10,"height":10,"fill":"rgb(0,0,0)",' +
                  '"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,' +
                  '"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,' +
                  '"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0}],"background":"#ff5555","overlay":"rgba(0,0,0,0.2)"}';

  var RECT_JSON_WITH_PADDING = '{"version":"' + fabric.version + '","objects":[{"type":"rect","version":"' + fabric.version + '","originX":"left","originY":"top","left":0,"top":0,"width":10,"height":20,"fill":"rgb(0,0,0)",' +
                               '"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,' +
                               '"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,' +
                               '"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0,"padding":123,"foo":"bar"}]}';

  function getAbsolutePath(path) {
    var isAbsolute = /^https?:/.test(path);
    if (isAbsolute) { return path; };
    var imgEl = _createImageElement();
    imgEl.src = path;
    var src = imgEl.src;
    imgEl = null;
    return src;
  }
  var IMG_SRC =
        fabric.isLikelyNode ? ('file://' + require('path').join(__dirname + '/../fixtures/test_image.gif'))
          :
          getAbsolutePath('../fixtures/test_image.gif'),
      IMG_WIDTH   = 276,
      IMG_HEIGHT  = 110;

  var REFERENCE_IMG_OBJECT = {
    version: fabric.version,
    type: 'image',
    originX: 'left',
    originY: 'top',
    left: 0,
    top: 0,
    width: IMG_WIDTH, // node-canvas doesn't seem to allow setting width/height on image objects
    height: IMG_HEIGHT, // or does it now?
    fill: 'rgb(0,0,0)',
    stroke: null,
    strokeWidth: 0,
    strokeDashArray: null,
    strokeDashOffset: 0,
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    strokeMiterLimit: 4,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
    flipX: false,
    flipY: false,
    opacity: 1,
    src: IMG_SRC,
    shadow: null,
    visible: true,
    backgroundColor: '',
    filters: [],
    fillRule: 'nonzero',
    paintFirst: 'fill',
    globalCompositeOperation: 'source-over',
    crossOrigin: null,
    skewX: 0,
    skewY: 0,
    cropX: 0,
    cropY: 0,
    strokeUniform: false
  };

  function _createImageElement() {
    return fabric.document.createElement('img');
  }

  function _createImageObject(width, height, callback) {
    var elImage = _createImageElement();
    elImage.width = width;
    elImage.height = height;
    setSrc(elImage, IMG_SRC, function() {
      callback(new fabric.Image(elImage));
    });
  }

  function createImageObject(callback) {
    return _createImageObject(IMG_WIDTH, IMG_HEIGHT, callback);
  }

  function setSrc(img, src, callback) {
    img.onload = callback;
    img.src = src;
  }

  function fixImageDimension(imgObj) {
    // workaround for node-canvas sometimes producing images with width/height and sometimes not
    if (imgObj.width === 0) {
      imgObj.width = IMG_WIDTH;
    }
    if (imgObj.height === 0) {
      imgObj.height = IMG_HEIGHT;
    }
  }

  // force creation of static canvas
  // TODO: fix this
  var canvas = this.canvas = new fabric.StaticCanvas(null, {renderOnAddRemove: false, enableRetinaScaling: false, width: 200, height: 200});
  var canvas2 = this.canvas2 = new fabric.StaticCanvas(null, {renderOnAddRemove: false, enableRetinaScaling: false, width: 200, height: 200});


  var lowerCanvasEl = canvas.lowerCanvasEl;

  function makeRect(options) {
    var defaultOptions = { width: 10, height: 10 };
    return new fabric.Rect(fabric.util.object.extend(defaultOptions, options || { }));
  }

  QUnit.module('fabric.StaticCanvas', {
    beforeEach: function() {
      fabric.Object.__uid = 0;
      canvas.clear();
      canvas.setDimensions({ width: 200, heigth: 200 });
      canvas2.setDimensions({ width: 200, heigth: 200 });
      canvas.backgroundColor = fabric.StaticCanvas.prototype.backgroundColor;
      canvas.backgroundImage = fabric.StaticCanvas.prototype.backgroundImage;
      canvas.overlayColor = fabric.StaticCanvas.prototype.overlayColor;
      canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
      canvas.calcOffset();
      canvas.cancelRequestedRender();
      canvas2.cancelRequestedRender();
    },
    afterEach: function() {
      canvas.cancelRequestedRender();
      canvas2.cancelRequestedRender();
    }
  });

  QUnit.test('initialProperties', function(assert) {
    var canvas = new fabric.StaticCanvas();
    assert.ok('backgroundColor' in canvas);
    assert.ok('overlayColor' in canvas);
    assert.ok('backgroundImage' in canvas);
    assert.ok('overlayImage' in canvas);
    assert.ok('includeDefaultValues' in canvas);
    assert.ok('stateful' in canvas);
    assert.ok('renderOnAddRemove' in canvas);
    assert.ok('controlsAboveOverlay' in canvas);
    assert.ok('allowTouchScrolling' in canvas);
    assert.ok('imageSmoothingEnabled' in canvas);
    assert.ok('backgroundVpt' in canvas);
    assert.ok('overlayVpt' in canvas);

    assert.equal(canvas.includeDefaultValues, true);
    assert.equal(canvas.stateful, false);
    assert.equal(canvas.renderOnAddRemove, true);
    assert.equal(canvas.controlsAboveOverlay, false);
    assert.equal(canvas.allowTouchScrolling, false);
    assert.equal(canvas.imageSmoothingEnabled, true);
    assert.equal(canvas.backgroundVpt, true);
    assert.equal(canvas.overlayVpt, true);

    assert.notStrictEqual(canvas.viewportTransform, canvas2.viewportTransform);
  });

  QUnit.test('getObjects', function(assert) {
    assert.ok(typeof canvas.getObjects === 'function', 'should respond to `getObjects` method');
    assert.deepEqual([], canvas.getObjects(), 'should return empty array for `getObjects` when empty');
    assert.equal(canvas.getObjects().length, 0, 'should have a 0 length when empty');
  });

  QUnit.test('getObjects with type', function(assert) {

    var rect = new fabric.Rect({ width: 10, height: 20 });
    var circle = new fabric.Circle({ radius: 30 });

    canvas.add(rect, circle);

    assert.equal(canvas.getObjects().length, 2, 'should have length=2 initially');

    assert.deepEqual(canvas.getObjects('rect'), [rect], 'should return rect only');
    assert.deepEqual(canvas.getObjects('circle'), [circle], 'should return circle only');
  });

  QUnit.test('getElement', function(assert) {
    assert.ok(typeof canvas.getElement === 'function', 'should respond to `getElement` method');
    assert.equal(canvas.getElement(), lowerCanvasEl, 'should return a proper element');
  });

  QUnit.test('item', function(assert) {
    var rect = makeRect();

    assert.ok(typeof canvas.item === 'function', 'should respond to item');
    canvas.add(rect);
    assert.equal(canvas.item(0), rect, 'should return proper item');
  });

  QUnit.test('calcOffset', function(assert) {
    assert.ok(typeof canvas.calcOffset === 'function', 'should respond to `calcOffset`');
    assert.equal(canvas.calcOffset(), canvas, 'should be chainable');
  });

  QUnit.test('add', function(assert) {
    var rect1 = makeRect(),
        rect2 = makeRect(),
        rect3 = makeRect(),
        rect4 = makeRect();

    assert.ok(typeof canvas.add === 'function');
    assert.equal(canvas.add(rect1), canvas, 'should be chainable');
    assert.strictEqual(canvas.item(0), rect1);

    canvas.add(rect2, rect3, rect4);
    assert.equal(canvas.getObjects().length, 4, 'should support multiple arguments');

    assert.strictEqual(canvas.item(1), rect2);
    assert.strictEqual(canvas.item(2), rect3);
    assert.strictEqual(canvas.item(3), rect4);
  });

  QUnit.test('add renderOnAddRemove disabled', function(assert) {
    var rect = makeRect(),
        originalRenderOnAddition,
        renderAllCount = 0;

    function countRenderAll() {
      renderAllCount++;
    }

    originalRenderOnAddition = canvas.renderOnAddRemove;
    canvas.renderOnAddRemove = false;

    canvas.on('after:render', countRenderAll);

    assert.equal(canvas.add(rect), canvas, 'should be chainable');
    assert.equal(renderAllCount, 0);

    assert.equal(canvas.item(0), rect);

    canvas.add(makeRect(), makeRect(), makeRect());
    assert.equal(canvas.getObjects().length, 4, 'should support multiple arguments');
    assert.equal(renderAllCount, 0);

    canvas.renderAll();
    assert.equal(renderAllCount, 1);

    canvas.off('after:render', countRenderAll);
    canvas.renderOnAddRemove = originalRenderOnAddition;
  });

  QUnit.test('object:added', function(assert) {
    var objectsAdded = [];

    canvas.on('object:added', function(e) {
      objectsAdded.push(e.target);
    });

    var rect = new fabric.Rect({ width: 10, height: 20 });
    canvas.add(rect);

    assert.deepEqual(objectsAdded[0], rect);

    var circle1 = new fabric.Circle(),
        circle2 = new fabric.Circle();

    canvas.add(circle1, circle2);

    assert.strictEqual(objectsAdded[1], circle1);
    assert.strictEqual(objectsAdded[2], circle2);

    var circle3 = new fabric.Circle();
    canvas.insertAt(circle3, 2);

    assert.strictEqual(objectsAdded[3], circle3);
  });

  QUnit.test('insertAt', function(assert) {
    var rect1 = makeRect(),
        rect2 = makeRect();

    canvas.add(rect1, rect2);

    assert.ok(typeof canvas.insertAt === 'function', 'should respond to `insertAt` method');

    var rect = makeRect();
    canvas.insertAt(rect, 1);
    assert.strictEqual(canvas.item(1), rect);
    canvas.insertAt(rect, 2);
    assert.strictEqual(canvas.item(2), rect);
    assert.equal(canvas.insertAt(rect, 2), canvas, 'should be chainable');
  });

  QUnit.test('insertAt renderOnAddRemove disabled', function(assert) {
    var rect1 = makeRect(),
        rect2 = makeRect(),
        originalRenderOnAddition,
        renderAllCount = 0;

    function countRenderAll() {
      renderAllCount++;
    }

    originalRenderOnAddition = canvas.renderOnAddRemove;
    canvas.renderOnAddRemove = false;

    canvas.on('after:render', countRenderAll);

    canvas.add(rect1, rect2);
    assert.equal(renderAllCount, 0);

    var rect = makeRect();

    canvas.insertAt(rect, 1);
    assert.equal(renderAllCount, 0);

    assert.strictEqual(canvas.item(1), rect);
    canvas.insertAt(rect, 2);
    assert.equal(renderAllCount, 0);

    canvas.renderAll();
    assert.equal(renderAllCount, 1);

    canvas.off('after:render', countRenderAll);
    canvas.renderOnAddRemove = originalRenderOnAddition;
  });

  QUnit.test('remove', function(assert) {
    var rect1 = makeRect(),
        rect2 = makeRect(),
        rect3 = makeRect(),
        rect4 = makeRect();

    canvas.add(rect1, rect2, rect3, rect4);

    assert.ok(typeof canvas.remove === 'function');
    assert.equal(canvas.remove(rect1), canvas, 'should be chainable');
    assert.strictEqual(canvas.item(0), rect2, 'should be second object');

    canvas.remove(rect2, rect3);
    assert.strictEqual(canvas.item(0), rect4);

    canvas.remove(rect4);
    assert.equal(canvas.isEmpty(), true, 'canvas should be empty');
  });

  QUnit.test('remove renderOnAddRemove disabled', function(assert) {
    var rect1 = makeRect(),
        rect2 = makeRect(),
        originalRenderOnAddition,
        renderAllCount = 0;

    function countRenderAll() {
      renderAllCount++;
    }

    originalRenderOnAddition = canvas.renderOnAddRemove;
    canvas.renderOnAddRemove = false;

    canvas.on('after:render', countRenderAll);

    canvas.add(rect1, rect2);
    assert.equal(renderAllCount, 0);

    assert.equal(canvas.remove(rect1), canvas, 'should be chainable');
    assert.equal(renderAllCount, 0);
    assert.strictEqual(canvas.item(0), rect2, 'only second object should be left');

    canvas.renderAll();
    assert.equal(renderAllCount, 1);

    canvas.off('after:render', countRenderAll);
    canvas.renderOnAddRemove = originalRenderOnAddition;
  });

  QUnit.test('object:removed', function(assert) {
    var objectsRemoved = [];

    canvas.on('object:removed', function(e) {
      objectsRemoved.push(e.target);
    });

    var rect = new fabric.Rect({ width: 10, height: 20 }),
        circle1 = new fabric.Circle(),
        circle2 = new fabric.Circle();

    canvas.add(rect, circle1, circle2);

    assert.strictEqual(canvas.item(0), rect);
    assert.strictEqual(canvas.item(1), circle1);
    assert.strictEqual(canvas.item(2), circle2);

    canvas.remove(rect);
    assert.strictEqual(objectsRemoved[0], rect);
    assert.strictEqual(rect.canvas, undefined);

    canvas.remove(circle1, circle2);
    assert.strictEqual(objectsRemoved[1], circle1);
    assert.strictEqual(circle1.canvas, undefined);
    assert.strictEqual(objectsRemoved[2], circle2);
    assert.strictEqual(circle2.canvas, undefined);

    assert.equal(canvas.isEmpty(), true, 'canvas should be empty');
  });

  QUnit.test('clearContext', function(assert) {
    assert.ok(typeof canvas.clearContext === 'function');
    assert.equal(canvas.clearContext(canvas.contextContainer), canvas, 'should be chainable');
  });

  QUnit.test('clear', function(assert) {
    assert.ok(typeof canvas.clear === 'function');
    var bg = new fabric.Rect({ width: 10, height: 20 });
    canvas.backgroundColor = '#FF0000';
    canvas.overlayColor = '#FF0000';
    canvas.backgroundImage = bg;
    canvas.overlayImage = bg;

    var objectsRemoved = [];
    canvas.on('object:removed', function(e) {
      objectsRemoved.push(e.target);
    });
    var rect1 = makeRect(),
        rect2 = makeRect(),
        rect3 = makeRect();
    canvas.add(rect1, rect2, rect3);

    assert.equal(canvas.clear(), canvas, 'should be chainable');
    assert.equal(canvas.getObjects().length, 0, 'clear remove all objects');
    assert.strictEqual(objectsRemoved[0], rect1, 'clear should fire remove on previously added object');
    assert.strictEqual(objectsRemoved[1], rect2, 'clear should fire remove on previously added object');
    assert.strictEqual(objectsRemoved[2], rect3, 'clear should fire remove on previously added object');
    assert.equal(canvas.backgroundColor, '', 'clear remove background color');
    assert.equal(canvas.overlayColor, '', 'clear remove overlay color');
    assert.equal(canvas.backgroundImage, null, 'clear remove bg image');
    assert.equal(canvas.overlayImage, null, 'clear remove overlay image');
  });

  QUnit.test('renderAll', function(assert) {
    assert.ok(typeof canvas.renderAll === 'function');
    assert.equal(canvas, canvas.renderAll());
  });

  // QUnit.test('setDimensions', function(assert) {
  //   assert.ok(typeof canvas.setDimensions === 'function');;
  //   canvas.setDimensions({ width: 4, height: 5 });
  //   assert.equal(canvas.getWidth(), 4);
  //   assert.equal(canvas.getHeight(), 5);
  //   assert.equal(canvas.lowerCanvasEl.style.width, '5px');
  //   assert.equal(canvas.lowerCanvasEl.style.height, '4px');
  // });

  QUnit.test('toCanvasElement', function(assert) {
    assert.ok(typeof canvas.toCanvasElement === 'function');;
    var canvasEl = canvas.toCanvasElement();
    assert.equal(canvasEl.width, canvas.getWidth(), 'get a canvas of same width');
    assert.equal(canvasEl.height, canvas.getHeight(), 'get a canvas of same height');
  });

  QUnit.test('toCanvasElement with multiplier', function(assert) {
    assert.ok(typeof canvas.toCanvasElement === 'function');
    var multiplier = 2;
    var canvasEl = canvas.toCanvasElement(multiplier);
    assert.equal(canvasEl.width, canvas.getWidth() * multiplier, 'get a canvas of multiplied width');
    assert.equal(canvasEl.height, canvas.getHeight() * multiplier, 'get a canvas of multiplied height');
  });

  QUnit.test('toDataURL', function(assert) {
    assert.ok(typeof canvas.toDataURL === 'function');
    var rect = new fabric.Rect({width: 100, height: 100, fill: 'red', top: 0, left: 0});
    canvas.add(rect);
    var dataURL = canvas.toDataURL();
    // don't compare actual data url, as it is often browser-dependent
    // this.assertIdentical(emptyImageCanvasData, canvas.toDataURL('png'));
    assert.equal(typeof dataURL, 'string');
    assert.equal(dataURL.substring(0, 21), 'data:image/png;base64');
    //we can just compare that the dataUrl generated differs from the dataURl of an empty canvas.
    assert.equal(dataURL.substring(200, 210) !== 'AAAAAAAAAA', true);
  });

  QUnit.test('toDataURL with enableRetinaScaling: true and no multiplier', function(assert) {
    var done = assert.async();
    fabric.devicePixelRatio = 2;
    var c = new fabric.StaticCanvas(null, { enableRetinaScaling: true, width: 10, height: 10 });
    var dataUrl = c.toDataURL({ enableRetinaScaling: true });
    c.cancelRequestedRender();
    var img = fabric.document.createElement('img');
    img.onload = function() {
      assert.equal(img.width, c.width * fabric.devicePixelRatio, 'output width is bigger');
      assert.equal(img.height, c.height * fabric.devicePixelRatio, 'output height is bigger');
      fabric.devicePixelRatio = 1;
      done();
    };
    img.src = dataUrl;
  });

  QUnit.test('toDataURL with enableRetinaScaling: true and multiplier = 1', function(assert) {
    var done = assert.async();
    fabric.devicePixelRatio = 2;
    var c = new fabric.StaticCanvas(null, { enableRetinaScaling: true, width: 10, height: 10 });
    var dataUrl = c.toDataURL({ enableRetinaScaling: true, multiplier: 1 });
    c.cancelRequestedRender();
    var img = fabric.document.createElement('img');
    img.onload = function() {
      assert.equal(img.width, c.width * fabric.devicePixelRatio, 'output width is bigger');
      assert.equal(img.height, c.height * fabric.devicePixelRatio, 'output height is bigger');
      fabric.devicePixelRatio = 1;
      done();
    };
    img.src = dataUrl;
  });

  QUnit.test('toDataURL with enableRetinaScaling: true and multiplier = 3', function(assert) {
    var done = assert.async();
    fabric.devicePixelRatio = 2;
    var c = new fabric.StaticCanvas(null, { enableRetinaScaling: true, width: 10, height: 10 });
    var dataUrl = c.toDataURL({ enableRetinaScaling: true, multiplier: 3 });
    c.cancelRequestedRender();
    var img = fabric.document.createElement('img');
    img.onload = function() {
      assert.equal(img.width, c.width * fabric.devicePixelRatio * 3, 'output width is bigger by 6');
      assert.equal(img.height, c.height * fabric.devicePixelRatio * 3, 'output height is bigger by 6');
      fabric.devicePixelRatio = 1;
      done();
    };
    img.src = dataUrl;
  });

  QUnit.test('toDataURL with enableRetinaScaling: false and no multiplier', function(assert) {
    var done = assert.async();
    fabric.devicePixelRatio = 2;
    var c = new fabric.StaticCanvas(null, { enableRetinaScaling: true, width: 10, height: 10 });
    var dataUrl = c.toDataURL({ enableRetinaScaling: false });
    c.cancelRequestedRender();
    var img = fabric.document.createElement('img');
    img.onload = function() {
      assert.equal(img.width, c.width, 'output width is not bigger');
      assert.equal(img.height, c.height, 'output height is not bigger');
      fabric.devicePixelRatio = 1;
      done();
    };
    img.src = dataUrl;
  });

  QUnit.test('toDataURL with enableRetinaScaling: false and multiplier = 1', function(assert) {
    var done = assert.async();
    fabric.devicePixelRatio = 2;
    var c = new fabric.StaticCanvas(null, { enableRetinaScaling: true, width: 10, height: 10 });
    var dataUrl = c.toDataURL({ enableRetinaScaling: false, multiplier: 1 });
    c.cancelRequestedRender();
    var img = fabric.document.createElement('img');
    img.onload = function() {
      assert.equal(img.width, c.width, 'output width is not bigger');
      assert.equal(img.height, c.height, 'output height is not bigger');
      fabric.devicePixelRatio = 1;
      done();
    };
    img.src = dataUrl;
  });

  QUnit.test('toDataURL with enableRetinaScaling: false and multiplier = 3', function(assert) {
    var done = assert.async();
    fabric.devicePixelRatio = 2;
    var c = new fabric.StaticCanvas(null, { enableRetinaScaling: true, width: 10, height: 10 });
    var dataUrl = c.toDataURL({ enableRetinaScaling: false, multiplier: 3 });
    c.cancelRequestedRender();
    var img = fabric.document.createElement('img');
    img.onload = function() {
      assert.equal(img.width, c.width * 3, 'output width is bigger by 3');
      assert.equal(img.height, c.height * 3, 'output height is bigger by 3');
      fabric.devicePixelRatio = 1;
      done();
    };
    img.src = dataUrl;
  });

  QUnit.test('toDataURL with enableRetinaScaling: false', function(assert) {
    var done = assert.async();
    fabric.devicePixelRatio = 2;
    var c = new fabric.StaticCanvas(null, { enableRetinaScaling: true, width: 10, height: 10 });
    var dataUrl = c.toDataURL({ enableRetinaScaling: false });
    c.cancelRequestedRender();
    var img = fabric.document.createElement('img');
    img.onload = function() {
      assert.equal(img.width, c.width, 'output width is bigger');
      assert.equal(img.height, c.height, 'output height is bigger');
      fabric.devicePixelRatio = 1;
      done();
    };
    img.src = dataUrl;
  });

  QUnit.test('toDataURL jpeg', function(assert) {
    try {
      var dataURL = canvas.toDataURL({ format: 'jpeg' });
      assert.equal(dataURL.substring(0, 22), 'data:image/jpeg;base64');
    }
    // node-canvas does not support jpeg data urls
    catch (err) {
      assert.ok(true);
    }
  });

  QUnit.test('toDataURL cropping', function(assert) {
    var done = assert.async();
    assert.ok(typeof canvas.toDataURL === 'function');
    var croppingWidth = 75,
        croppingHeight = 50,
        dataURL = canvas.toDataURL({width: croppingWidth, height: croppingHeight});

    fabric.Image.fromURL(dataURL, function (img) {
      assert.equal(img.width, croppingWidth, 'Width of exported image should correspond to cropping width');
      assert.equal(img.height, croppingHeight, 'Height of exported image should correspond to cropping height');
      done();
    });
  });

  QUnit.test('centerObjectH', function(assert) {
    assert.ok(typeof canvas.centerObjectH === 'function');
    var rect = makeRect({ left: 102, top: 202 });
    canvas.add(rect);
    assert.equal(canvas.centerObjectH(rect), canvas, 'should be chainable');
    assert.equal(rect.getCenterPoint().x, canvas.width / 2, 'object\'s "center.y" property should correspond to canvas element\'s center');
    canvas.setZoom(4);
    assert.equal(rect.getCenterPoint().x, canvas.height / 2, 'object\'s "center.x" property should correspond to canvas element\'s center when canvas is transformed');
    canvas.setZoom(1);
  });

  QUnit.test('centerObjectV', function(assert) {
    assert.ok(typeof canvas.centerObjectV === 'function');
    var rect = makeRect({ left: 102, top: 202 });
    canvas.add(rect);
    assert.equal(canvas.centerObjectV(rect), canvas, 'should be chainable');
    assert.equal(rect.getCenterPoint().y, canvas.height / 2, 'object\'s "center.y" property should correspond to canvas element\'s center');
    canvas.setZoom(2);
    assert.equal(rect.getCenterPoint().y, canvas.height / 2, 'object\'s "center.y" property should correspond to canvas element\'s center when canvas is transformed');

  });

  QUnit.test('centerObject', function(assert) {
    assert.ok(typeof canvas.centerObject === 'function');
    var rect = makeRect({ left: 102, top: 202 });
    canvas.add(rect);
    assert.equal(canvas.centerObject(rect), canvas, 'should be chainable');

    assert.equal(rect.getCenterPoint().y, canvas.height / 2, 'object\'s "center.y" property should correspond to canvas element\'s center');
    assert.equal(rect.getCenterPoint().x, canvas.height / 2, 'object\'s "center.x" property should correspond to canvas element\'s center');
    canvas.setZoom(4);
    assert.equal(rect.getCenterPoint().y, canvas.height / 2, 'object\'s "center.y" property should correspond to canvas element\'s center when canvas is transformed');
    assert.equal(rect.getCenterPoint().x, canvas.height / 2, 'object\'s "center.x" property should correspond to canvas element\'s center when canvas is transformed');
    canvas.setZoom(1);
  });

  QUnit.test('viewportCenterObjectH', function(assert) {
    assert.ok(typeof canvas.viewportCenterObjectH === 'function');
    var rect = makeRect({ left: 102, top: 202 }), pan = 10;
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    canvas.add(rect);
    var oldY = rect.top;
    assert.equal(canvas.viewportCenterObjectH(rect), canvas, 'should be chainable');
    assert.equal(rect.getCenterPoint().x, canvas.width / 2, 'object\'s "center.x" property should correspond to canvas element\'s center when canvas is not transformed');
    assert.equal(rect.top, oldY, 'object\'s "top" should not change');
    canvas.setZoom(2);
    canvas.viewportCenterObjectH(rect);
    assert.equal(rect.getCenterPoint().x, canvas.width / (2 * canvas.getZoom()), 'object\'s "center.x" property should correspond to viewport center');
    assert.equal(rect.top, oldY, 'object\'s "top" should not change');
    canvas.absolutePan({x: pan, y: pan});
    canvas.viewportCenterObjectH(rect);
    assert.equal(rect.getCenterPoint().x, (canvas.width / 2 + pan) / canvas.getZoom(), 'object\'s "center.x" property should correspond to viewport center');
    assert.equal(rect.top, oldY, 'object\'s "top" should not change');
  });

  QUnit.test('viewportCenterObjectV', function(assert) {
    assert.ok(typeof canvas.viewportCenterObjectV === 'function');
    var rect = makeRect({ left: 102, top: 202 }), pan = 10;
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    canvas.add(rect);
    var oldX = rect.left;
    assert.equal(canvas.viewportCenterObjectV(rect), canvas, 'should be chainable');
    assert.equal(rect.getCenterPoint().y, canvas.height / 2, 'object\'s "center.y" property should correspond to canvas element\'s center when canvas is not transformed');
    assert.equal(rect.left, oldX, 'x position did not change');
    canvas.setZoom(2);
    canvas.viewportCenterObjectV(rect);
    assert.equal(rect.getCenterPoint().y, canvas.height / (2 * canvas.getZoom()), 'object\'s "center.y" property should correspond to viewport center');
    assert.equal(rect.left, oldX, 'x position did not change');
    canvas.absolutePan({x: pan, y: pan});
    canvas.viewportCenterObjectV(rect);
    assert.equal(rect.getCenterPoint().y, (canvas.height / 2 + pan) / canvas.getZoom(), 'object\'s "top" property should correspond to viewport center');
    assert.equal(rect.left, oldX, 'x position did not change');
  });

  QUnit.test('viewportCenterObject', function(assert) {
    assert.ok(typeof canvas.viewportCenterObject === 'function');
    var rect = makeRect({ left: 102, top: 202 }), pan = 10;
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    canvas.add(rect);
    assert.equal(canvas.viewportCenterObject(rect), canvas, 'should be chainable');
    assert.equal(rect.getCenterPoint().y, canvas.height / 2, 'object\'s "center.y" property should correspond to canvas element\'s center when canvas is not transformed');
    assert.equal(rect.getCenterPoint().x, canvas.width / 2, 'object\'s "center.x" property should correspond to canvas element\'s center when canvas is not transformed');

    canvas.setZoom(2);
    canvas.viewportCenterObject(rect);
    assert.equal(rect.getCenterPoint().y, canvas.height / (2 * canvas.getZoom()), 'object\'s "center.y" property should correspond to viewport center');
    assert.equal(rect.getCenterPoint().x, canvas.width / (2 * canvas.getZoom()), 'object\'s "center.x" property should correspond to viewport center');

    canvas.absolutePan({x: pan, y: pan});
    canvas.viewportCenterObject(rect);
    assert.equal(rect.getCenterPoint().y, (canvas.height / 2 + pan) / canvas.getZoom(), 'object\'s "center.y" property should correspond to viewport center');
    assert.equal(rect.getCenterPoint().x, (canvas.width / 2 + pan) / canvas.getZoom(), 'object\'s "center.x" property should correspond to viewport center');
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
  });

  QUnit.test('straightenObject', function(assert) {
    assert.ok(typeof canvas.straightenObject === 'function');
    var rect = makeRect({ angle: 10 });
    canvas.add(rect);
    assert.equal(canvas.straightenObject(rect), canvas, 'should be chainable');
    assert.equal(rect.get('angle'), 0, 'angle should be coerced to 0 (from 10)');

    rect.rotate('60');
    canvas.straightenObject(rect);
    assert.equal(rect.get('angle'), 90, 'angle should be coerced to 90 (from 60)');

    rect.rotate('100');
    canvas.straightenObject(rect);
    assert.equal(rect.get('angle'), 90, 'angle should be coerced to 90 (from 100)');
  });

  QUnit.test('toSVG', function(assert) {
    assert.ok(typeof canvas.toSVG === 'function');
    canvas.clear();
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    var svg = canvas.toSVG();
    assert.equal(svg, CANVAS_SVG);
  });

  QUnit.test('toSVG with different encoding (ISO-8859-1)', function(assert) {
    assert.ok(typeof canvas.toSVG === 'function');
    canvas.clear();
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    var svg = canvas.toSVG({encoding: 'ISO-8859-1'});
    var svgDefaultEncoding = canvas.toSVG();
    assert.ok(svg != svgDefaultEncoding);
    assert.equal(svg, CANVAS_SVG.replace('encoding="UTF-8"', 'encoding="ISO-8859-1"'));
  });

  QUnit.test('toSVG without preamble', function(assert) {
    assert.ok(typeof canvas.toSVG === 'function');
    var withPreamble = canvas.toSVG();
    var withoutPreamble = canvas.toSVG({suppressPreamble: true});
    assert.ok(withPreamble != withoutPreamble);
    assert.equal(withoutPreamble.slice(0, 4), '<svg', 'svg should start with root node when premable is suppressed');
  });

  QUnit.test('toSVG with viewBox', function(assert) {
    assert.ok(typeof canvas.toSVG === 'function');
    canvas.clear();

    var svg = canvas.toSVG({viewBox: {x: 100, y: 100, width: 300, height: 300}});
    assert.equal(svg, CANVAS_SVG_VIEWBOX);
  });

  QUnit.test('toSVG with reviver', function(assert) {
    assert.ok(typeof canvas.toSVG === 'function');
    canvas.clear();

    var circle = new fabric.Circle(),
        rect = new fabric.Rect(),
        path1 = new fabric.Path('M 100 100 L 300 100 L 200 300 z'),
        tria = new fabric.Triangle(),
        polygon = new fabric.Polygon([{x: 10, y: 12},{x: 20, y: 22}]),
        polyline = new fabric.Polyline([{x: 10, y: 12},{x: 20, y: 22}]),
        line = new fabric.Line(),
        text = new fabric.Text('Text'),
        group = new fabric.Group([text, line]),
        ellipse = new fabric.Ellipse(),
        image = new fabric.Image({width: 0, height: 0}),
        path2 = new fabric.Path('M 0 0 L 200 100 L 200 300 z'),
        path3 = new fabric.Path('M 50 50 L 100 300 L 400 400 z'),
        pathGroup = new fabric.Group([path2, path3]);

    canvas.renderOnAddRemove = false;
    canvas.add(circle, rect, path1, tria, polygon, polyline, group, ellipse, image, pathGroup);

    var reviverCount = 0;

    function reviver(svg) {
      reviverCount++;
      return svg;
    }

    canvas.toSVG(null, reviver);
    assert.equal(reviverCount, 14);

    canvas.renderOnAddRemove = true;
  });

  QUnit.test('toSVG with reviver 2', function(assert) {
    assert.ok(typeof canvas.toSVG === 'function');
    canvas.clear();

    var circle = new fabric.Circle(),
        rect = new fabric.Rect(),
        path1 = new fabric.Path('M 100 100 L 300 100 L 200 300 z'),
        tria = new fabric.Triangle(),
        polygon = new fabric.Polygon([{x: 10, y: 12},{x: 20, y: 22}]),
        polyline = new fabric.Polyline([{x: 10, y: 12},{x: 20, y: 22}]),
        line = new fabric.Line(),
        text = new fabric.Text('Text'),
        group = new fabric.Group([text, line]),
        ellipse = new fabric.Ellipse(),
        image = new fabric.Image({width: 0, height: 0}),
        imageBG = new fabric.Image({width: 0, height: 0}),
        imageOL = new fabric.Image({width: 0, height: 0}),
        path2 = new fabric.Path('M 0 0 L 200 100 L 200 300 z'),
        path3 = new fabric.Path('M 50 50 L 100 300 L 400 400 z'),
        pathGroup = new fabric.Group([path2, path3]);

    canvas.renderOnAddRemove = false;
    canvas.add(circle, rect, path1, tria, polygon, polyline, group, ellipse, image, pathGroup);
    canvas.setBackgroundImage(imageBG);
    canvas.setOverlayImage(imageOL);
    var reviverCount = 0,
        len = canvas.size() + group.size() + pathGroup.size();

    function reviver(svg) {
      reviverCount++;
      return svg;
    }

    canvas.toSVG(null, reviver);
    assert.equal(reviverCount, len + 2, 'reviver should include background and overlay image');
    canvas.setBackgroundImage(null);
    canvas.setOverlayImage(null);
    canvas.renderOnAddRemove = true;
  });

  QUnit.test('toSVG with exclude from export', function(assert) {
    assert.ok(typeof canvas.toSVG === 'function');
    canvas.clear();

    var circle = new fabric.Circle({excludeFromExport: true}),
        rect = new fabric.Rect({excludeFromExport: true}),
        path1 = new fabric.Path('M 100 100 L 300 100 L 200 300 z'),
        tria = new fabric.Triangle(),
        polygon = new fabric.Polygon([{x: 10, y: 12},{x: 20, y: 22}]),
        polyline = new fabric.Polyline([{x: 10, y: 12},{x: 20, y: 22}]),
        line = new fabric.Line(),
        text = new fabric.Text('Text'),
        group = new fabric.Group([text, line]),
        ellipse = new fabric.Ellipse(),
        image = new fabric.Image({width: 0, height: 0}),
        path2 = new fabric.Path('M 0 0 L 200 100 L 200 300 z'),
        path3 = new fabric.Path('M 50 50 L 100 300 L 400 400 z'),
        pathGroup = new fabric.Group([path2, path3]);

    canvas.renderOnAddRemove = false;
    canvas.add(circle, rect, path1, tria, polygon, polyline, group, ellipse, image, pathGroup);
    var reviverCount = 0,
        len = canvas.size() + group.size() + pathGroup.size();

    function reviver(svg) {
      reviverCount++;
      return svg;
    }

    canvas.toSVG(null, reviver);
    assert.equal(reviverCount, len - 2, 'reviver should not include objects with excludeFromExport');
    canvas.renderOnAddRemove = true;
  });

  QUnit.test('toSVG with a clipPath', function(assert) {
    var canvasClip = new fabric.StaticCanvas(null, { width: 400, height: 400, renderOnAddRemove: false });
    canvasClip.clipPath = new fabric.Rect({ width: 200, height: 200 });
    canvasClip.add(new fabric.Circle({ radius: 200 }));
    var svg = canvasClip.toSVG();
    var expectedSVG = '<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"400\" height=\"400\" viewBox=\"0 0 400 400\" xml:space=\"preserve\">\n<desc>Created with Fabric.js ' + fabric.version + '</desc>\n<defs>\n<clipPath id=\"CLIPPATH_0\" >\n\t<rect transform=\"matrix(1 0 0 1 100.5 100.5)\" x=\"-100\" y=\"-100\" rx=\"0\" ry=\"0\" width=\"200\" height=\"200\" />\n</clipPath>\n</defs>\n<g clip-path=\"url(#CLIPPATH_0)\" >\n<g transform=\"matrix(1 0 0 1 200.5 200.5)\"  >\n<circle style=\"stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;\"  cx=\"0\" cy=\"0\" r=\"200\" />\n</g>\n</g>\n</svg>';
    assert.equal(svg, expectedSVG, 'SVG with clipPath should match');
  });

  QUnit.test('toSVG with exclude from export background', function(assert) {
    var image = fabric.document.createElement('img'),
        imageBG = new fabric.Image(image, {width: 0, height: 0}),
        imageOL = new fabric.Image(image, {width: 0, height: 0});

    canvas.renderOnAddRemove = false;
    canvas.backgroundImage = imageBG;
    canvas.overlayImage = imageOL;
    var expectedSVG = '<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\" xml:space=\"preserve\">\n<desc>Created with Fabric.js ' + fabric.version + '</desc>\n<defs>\n</defs>\n<g transform=\"matrix(1 0 0 1 0 0)\"  >\n\t<image style=\"stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;\"  xlink:href=\"\" x=\"0\" y=\"0\" width=\"0\" height=\"0\"></image>\n</g>\n<g transform=\"matrix(1 0 0 1 0 0)\"  >\n\t<image style=\"stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;\"  xlink:href=\"\" x=\"0\" y=\"0\" width=\"0\" height=\"0\"></image>\n</g>\n</svg>';
    var svg1 = canvas.toSVG();
    assert.equal(svg1, expectedSVG, 'svg with bg and overlay do not match');
    imageBG.excludeFromExport = true;
    imageOL.excludeFromExport = true;
    var expectedSVG2 = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="200" height="200" viewBox="0 0 200 200" xml:space="preserve">\n<desc>Created with Fabric.js ' + fabric.version + '</desc>\n<defs>\n</defs>\n</svg>';
    var svg2 = canvas.toSVG();
    assert.equal(svg2, expectedSVG2, 'svg without bg and overlay do not match');
    canvas.backgroundImage = null;
    canvas.overlayImage = null;
    canvas.renderOnAddRemove = true;
  });

  QUnit.test('toJSON', function(assert) {
    assert.ok(typeof canvas.toJSON === 'function');
    assert.equal(JSON.stringify(canvas.toJSON()), '{"version":"' + fabric.version + '","objects":[]}');
    canvas.backgroundColor = '#ff5555';
    canvas.overlayColor = 'rgba(0,0,0,0.2)';
    assert.equal(JSON.stringify(canvas.toJSON()), '{"version":"' + fabric.version + '","objects":[],"background":"#ff5555","overlay":"rgba(0,0,0,0.2)"}', '`background` and `overlay` value should be reflected in json');
    canvas.add(makeRect());
    assert.deepEqual(JSON.stringify(canvas.toJSON()), RECT_JSON);
  });

  QUnit.test('toJSON custom properties non-existence check', function(assert) {
    var rect = new fabric.Rect({ width: 10, height: 20 });
    rect.padding = 123;
    canvas.add(rect);
    rect.foo = 'bar';

    canvas.bar = 456;

    var data = canvas.toJSON(['padding', 'foo', 'bar', 'baz']);
    assert.ok('padding' in data.objects[0]);
    assert.ok('foo' in data.objects[0], 'foo shouldn\'t be included if it\'s not in an object');
    assert.ok(!('bar' in data.objects[0]), 'bar shouldn\'t be included if it\'s not in an object');
    assert.ok(!('baz' in data.objects[0]), 'bar shouldn\'t be included if it\'s not in an object');
    assert.ok(!('foo' in data));
    assert.ok(!('baz' in data));
    assert.ok('bar' in data);
  });

  QUnit.test('toJSON backgroundImage', function(assert) {
    var done = assert.async();
    createImageObject(function(image) {

      canvas.backgroundImage = image;

      var json = canvas.toJSON();

      fixImageDimension(json.backgroundImage);
      assert.deepEqual(json.backgroundImage, REFERENCE_IMG_OBJECT);

      canvas.backgroundImage = null;

      done();
    });
  });

  QUnit.test('toJSON backgroundImage with custom props', function(assert) {
    var done = assert.async();
    createImageObject(function(image) {
      canvas.backgroundImage = image;
      image.custom = 'yes';
      var json = canvas.toJSON(['custom']);
      assert.equal(json.backgroundImage.custom, 'yes');
      canvas.backgroundImage = null;
      done();
    });
  });

  QUnit.test('toJSON overlayImage', function(assert) {
    var done = assert.async();
    createImageObject(function(image) {

      canvas.overlayImage = image;

      var json = canvas.toJSON();

      fixImageDimension(json.overlayImage);
      assert.deepEqual(json.overlayImage, REFERENCE_IMG_OBJECT);

      canvas.overlayImage = null;

      done();
    });
  });

  QUnit.test('toJSON overlayImage with custom props', function(assert) {
    var done = assert.async();
    createImageObject(function(image) {
      canvas.overlayImage = image;
      image.custom = 'yes';
      var json = canvas.toJSON(['custom']);
      assert.equal(json.overlayImage.custom, 'yes');
      canvas.overlayImage = null;
      done();
    });
  });

  QUnit.test('toDatalessJSON', function(assert) {
    var path = new fabric.Path('M 100 100 L 300 100 L 200 300 z', {
      sourcePath: 'http://example.com/'
    });
    canvas.add(path);
    assert.equal(JSON.stringify(canvas.toDatalessJSON()), PATH_DATALESS_JSON);
  });

  QUnit.test('toObject', function(assert) {
    assert.ok(typeof canvas.toObject === 'function');
    var expectedObject = {
      version: fabric.version,
      objects: canvas.getObjects()
    };
    assert.deepEqual(expectedObject, canvas.toObject());

    var rect = makeRect();
    canvas.add(rect);

    assert.equal(canvas.toObject().objects[0].type, rect.type);
  });

  QUnit.test('toObject non includeDefaultValues', function(assert) {
    canvas.includeDefaultValues = false;
    var rect = makeRect();
    canvas.add(rect);
    var cObject = canvas.toObject();
    var expectedRect = { version: fabric.version, type: 'rect', width: 10, height: 10, top: 0, left: 0 };
    assert.deepEqual(cObject.objects[0], expectedRect, 'Rect should be exported withoud defaults');
    canvas.includeDefaultValues = true;
  });

  QUnit.test('toObject excludeFromExport', function(assert) {
    var rect = makeRect(), rect2 = makeRect(), rect3 = makeRect(), clipPath = makeRect();
    canvas.clear();
    canvas.add(rect, rect2, rect3);
    canvas.clipPath = clipPath;
    var canvasObj = canvas.toObject();
    assert.equal(canvasObj.objects.length, 3, 'all objects get exported');
    assert.deepEqual(canvasObj.clipPath, clipPath.toObject(), 'clipPath exported');
    rect.excludeFromExport = true;
    rect2.excludeFromExport = true;
    clipPath.excludeFromExport = true;
    canvasObj = canvas.toObject();
    assert.equal(canvasObj.objects.length, 1, 'only one object gets exported');
    assert.equal(canvasObj.clipPath, undefined, 'clipPath not exported');
  });

  QUnit.test('toObject excludeFromExport bg overlay', function(assert) {
    var rect = makeRect(), rect2 = makeRect(), rect3 = makeRect();
    var bgColor = new fabric.Gradient({
      type: 'linear',
      colorStops: [
        { offset: 0, color: 'black' },
        { offset: 1, color: 'white' },
      ],
      coords: {
        x1: 0,
        x2: 300,
        y1: 0,
        y2: 0,
      },
    });
    canvas.clear();
    canvas.backgroundImage = rect;
    canvas.overlayImage = rect2;
    canvas.backgroundColor = bgColor;
    canvas.setOverlayColor('red');
    canvas.add(rect3);
    var rectToObject = rect.toObject();
    var rect2ToObject = rect2.toObject();
    var bgc2ToObject = bgColor.toObject();
    var canvasToObject = canvas.toObject();
    assert.deepEqual(canvasToObject.backgroundImage, rectToObject, 'background image exported');
    assert.deepEqual(canvasToObject.overlayImage, rect2ToObject, 'overlay image exported');
    assert.deepEqual(canvasToObject.background, bgc2ToObject, 'background color exported');
    assert.equal(canvasToObject.overlay, 'red', 'overlay color exported');
    rect.excludeFromExport = true;
    rect2.excludeFromExport = true;
    bgColor.excludeFromExport = true;
    canvasToObject = canvas.toObject();
    assert.equal(canvasToObject.backgroundImage, undefined, 'background image not exported');
    assert.equal(canvasToObject.overlayImage, undefined, 'overlay image not exported');
    assert.equal(canvasToObject.background, undefined, 'background color not exported');
  });


  QUnit.test('toDatalessObject', function(assert) {
    assert.ok(typeof canvas.toDatalessObject === 'function');
    var expectedObject = {
      version: fabric.version,
      objects: canvas.getObjects()
    };
    assert.deepEqual(expectedObject, canvas.toDatalessObject());

    var rect = makeRect();
    canvas.add(rect);

    assert.equal(canvas.toObject().objects[0].type, rect.type);
    // TODO (kangax): need to test this method with fabric.Path to ensure that path is not populated
  });

  QUnit.test('toObject with additional properties', function(assert) {

    canvas.freeDrawingColor = 'red';
    canvas.foobar = 123;

    var expectedObject = {
      version: fabric.version,
      objects: canvas.getObjects(),
      freeDrawingColor: 'red',
      foobar: 123
    };
    assert.deepEqual(expectedObject, canvas.toObject(['freeDrawingColor', 'foobar']));
    var rect = makeRect();
    rect.foobar = 456;
    canvas.add(rect);

    assert.ok(!('foobar' in canvas.toObject(['smthelse']).objects[0]));
    assert.ok('foobar' in canvas.toObject(['foobar']).objects[0]);
  });

  QUnit.test('isEmpty', function(assert) {
    assert.ok(typeof canvas.isEmpty === 'function');
    assert.ok(canvas.isEmpty());
    canvas.add(makeRect());
    assert.ok(!canvas.isEmpty());
  });

  QUnit.test('loadFromJSON with json string staticCanvas', function(assert) {
    var done = assert.async();
    assert.ok(typeof canvas.loadFromJSON === 'function');

    canvas.loadFromJSON(PATH_JSON, function(){
      var obj = canvas.item(0);

      assert.ok(!canvas.isEmpty(), 'canvas is not empty');
      assert.equal(obj.type, 'path', 'first object is a path object');
      assert.equal(canvas.backgroundColor, '#ff5555', 'backgroundColor is populated properly');

      assert.equal(obj.get('left'), 268);
      assert.equal(obj.get('top'), 266);
      assert.equal(obj.get('width'), 49.803999999999995);
      assert.equal(obj.get('height'), 48.027);
      assert.equal(obj.get('fill'), 'rgb(0,0,0)');
      assert.strictEqual(obj.get('stroke'), null);
      assert.strictEqual(obj.get('strokeWidth'), 1);
      assert.strictEqual(obj.get('scaleX'), 1);
      assert.strictEqual(obj.get('scaleY'), 1);
      assert.strictEqual(obj.get('angle'), 0);
      assert.strictEqual(obj.get('flipX'), false);
      assert.strictEqual(obj.get('flipY'), false);
      assert.strictEqual(obj.get('opacity'), 1);
      assert.ok(obj.get('path').length > 0);
      done();
    });
  });

  QUnit.test('loadFromJSON with json object', function(assert) {
    var done = assert.async();
    assert.ok(typeof canvas.loadFromJSON === 'function');

    canvas.loadFromJSON(JSON.parse(PATH_JSON), function(){
      var obj = canvas.item(0);

      assert.ok(!canvas.isEmpty(), 'canvas is not empty');
      assert.equal(obj.type, 'path', 'first object is a path object');
      assert.equal(canvas.backgroundColor, '#ff5555', 'backgroundColor is populated properly');
      assert.equal(canvas.overlayColor, 'rgba(0,0,0,0.2)', 'overlayColor is populated properly');

      assert.equal(obj.get('left'), 268);
      assert.equal(obj.get('top'), 266);
      assert.equal(obj.get('width'), 49.803999999999995);
      assert.equal(obj.get('height'), 48.027);
      assert.equal(obj.get('fill'), 'rgb(0,0,0)');
      assert.strictEqual(obj.get('stroke'), null);
      assert.strictEqual(obj.get('strokeWidth'), 1);
      assert.strictEqual(obj.get('scaleX'), 1);
      assert.strictEqual(obj.get('scaleY'), 1);
      assert.strictEqual(obj.get('angle'), 0);
      assert.strictEqual(obj.get('flipX'), false);
      assert.strictEqual(obj.get('flipY'), false);
      assert.strictEqual(obj.get('opacity'), 1);

      assert.ok(obj.get('path').length > 0);
      done();
    });
  });

  QUnit.test('loadFromJSON with json object without default values', function(assert) {
    var done = assert.async();
    assert.ok(typeof canvas.loadFromJSON === 'function');

    canvas.loadFromJSON(JSON.parse(PATH_WITHOUT_DEFAULTS_JSON), function(){
      var obj = canvas.item(0);

      assert.ok(!canvas.isEmpty(), 'canvas is not empty');
      assert.equal(obj.type, 'path', 'first object is a path object');
      assert.equal(canvas.backgroundColor, '#ff5555', 'backgroundColor is populated properly');
      assert.equal(canvas.overlayColor, 'rgba(0,0,0,0.2)', 'overlayColor is populated properly');

      assert.equal(obj.get('left'), 268);
      assert.equal(obj.get('top'), 266);
      assert.equal(obj.get('width'), 49.803999999999995);
      assert.equal(obj.get('height'), 48.027);
      assert.equal(obj.get('fill'), 'rgb(0,0,0)');
      assert.strictEqual(obj.get('stroke'), null);
      assert.strictEqual(obj.get('strokeWidth'), 1);
      assert.strictEqual(obj.get('scaleX'), 1);
      assert.strictEqual(obj.get('scaleY'), 1);
      assert.strictEqual(obj.get('angle'), 0);
      assert.strictEqual(obj.get('flipX'), false);
      assert.strictEqual(obj.get('flipY'), false);
      assert.strictEqual(obj.get('opacity'), 1);

      assert.ok(obj.get('path').length > 0);
      done();
    });
  });

  QUnit.test('loadFromJSON with image background and color', function(assert) {
    var done = assert.async();
    var serialized = JSON.parse(PATH_JSON);
    serialized.background = 'green';
    serialized.backgroundImage = JSON.parse('{"type":"image","originX":"left","originY":"top","left":13.6,"top":-1.4,"width":3000,"height":3351,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.05,"scaleY":0.05,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"src":"' + IMG_SRC + '","filters":[],"crossOrigin":""}');
    canvas.loadFromJSON(serialized, function() {
      assert.ok(!canvas.isEmpty(), 'canvas is not empty');
      assert.equal(canvas.backgroundColor, 'green');
      assert.ok(canvas.backgroundImage instanceof fabric.Image);
      done();
    });
  });

  QUnit.test('loadFromJSON custom properties', function(assert) {
    var done = assert.async();
    var rect = new fabric.Rect({ width: 10, height: 20 });
    rect.padding = 123;
    rect.foo = 'bar';

    canvas.add(rect);

    var jsonWithoutFoo = JSON.stringify(canvas.toJSON(['padding']));
    var jsonWithFoo = JSON.stringify(canvas.toJSON(['padding', 'foo']));

    assert.equal(jsonWithFoo, RECT_JSON_WITH_PADDING);
    assert.ok(jsonWithoutFoo !== RECT_JSON_WITH_PADDING);

    canvas.clear();
    canvas.loadFromJSON(jsonWithFoo, function() {
      var obj = canvas.item(0);

      assert.equal(obj.padding, 123, 'padding on object is set properly');
      assert.equal(obj.foo, 'bar', '"foo" property on object is set properly');
      done();
    });
  });

  QUnit.test('loadFromJSON with text', function(assert) {
    var done = assert.async();
    var json = '{"objects":[{"type":"text","left":150,"top":200,"width":128,"height":64.32,"fill":"#000000","stroke":"","strokeWidth":"","scaleX":0.8,"scaleY":0.8,"angle":0,"flipX":false,"flipY":false,"opacity":1,"text":"NAME HERE","fontSize":24,"fontWeight":"","fontFamily":"Delicious_500","fontStyle":"","lineHeight":"","textDecoration":"","textAlign":"center","path":"","strokeStyle":"","backgroundColor":""}],"background":"#ffffff"}';
    canvas.loadFromJSON(json, function() {

      canvas.renderAll();

      assert.equal('text', canvas.item(0).type);
      assert.equal(150, canvas.item(0).left);
      assert.equal(200, canvas.item(0).top);
      assert.equal('NAME HERE', canvas.item(0).text);

      done();
    });
  });

  QUnit.test('loadFromJSON with clipPath', function(assert) {
    var done = assert.async();
    var json = '{"clipPath": {"type":"text","left":150,"top":200,"width":128,"height":64.32,"fill":"#000000","stroke":"","strokeWidth":"","scaleX":0.8,"scaleY":0.8,"angle":0,"flipX":false,"flipY":false,"opacity":1,"text":"NAME HERE","fontSize":24,"fontWeight":"","fontFamily":"Delicious_500","fontStyle":"","lineHeight":"","textDecoration":"","textAlign":"center","path":"","strokeStyle":"","backgroundColor":""}}';
    canvas.loadFromJSON(json, function() {
      canvas.renderAll();
      assert.equal('text', canvas.clipPath.type);
      done();
    });
  });

  QUnit.test('sendToBack', function(assert) {
    assert.ok(typeof canvas.sendToBack === 'function');

    var rect1 = makeRect(),
        rect2 = makeRect(),
        rect3 = makeRect();

    canvas.add(rect1, rect2, rect3);

    canvas.sendToBack(rect3);
    assert.equal(canvas.item(0), rect3, 'third should now be the first one');

    canvas.sendToBack(rect2);
    assert.equal(canvas.item(0), rect2, 'second should now be the first one');

    canvas.sendToBack(rect2);
    assert.equal(canvas.item(0), rect2, 'second should *still* be the first one');
  });

  QUnit.test('bringToFront', function(assert) {
    assert.ok(typeof canvas.bringToFront === 'function');

    var rect1 = makeRect(),
        rect2 = makeRect(),
        rect3 = makeRect();

    canvas.add(rect1, rect2, rect3);

    canvas.bringToFront(rect1);
    assert.equal(canvas.item(2), rect1, 'first should now be the last one');

    canvas.bringToFront(rect2);
    assert.equal(canvas.item(2), rect2, 'second should now be the last one');

    canvas.bringToFront(rect2);
    assert.equal(canvas.item(2), rect2, 'second should *still* be the last one');
  });

  QUnit.test('sendBackwards', function(assert) {
    assert.ok(typeof canvas.sendBackwards === 'function');

    var rect1 = makeRect(),
        rect2 = makeRect(),
        rect3 = makeRect();

    canvas.add(rect1, rect2, rect3);

    // [ 1, 2, 3 ]
    assert.equal(canvas.item(0), rect1);
    assert.equal(canvas.item(1), rect2);
    assert.equal(canvas.item(2), rect3);

    canvas.sendBackwards(rect3);

    // moved 3 one level back — [1, 3, 2]
    assert.equal(canvas.item(0), rect1);
    assert.equal(canvas.item(2), rect2);
    assert.equal(canvas.item(1), rect3);

    canvas.sendBackwards(rect3);

    // moved 3 one level back — [3, 1, 2]
    assert.equal(canvas.item(1), rect1);
    assert.equal(canvas.item(2), rect2);
    assert.equal(canvas.item(0), rect3);

    canvas.sendBackwards(rect3);

    // 3 stays at the deepEqual position — [2, 3, 1]
    assert.equal(canvas.item(1), rect1);
    assert.equal(canvas.item(2), rect2);
    assert.equal(canvas.item(0), rect3);

    canvas.sendBackwards(rect2);

    assert.equal(canvas.item(2), rect1);
    assert.equal(canvas.item(1), rect2);
    assert.equal(canvas.item(0), rect3);

    canvas.sendBackwards(rect2);

    assert.equal(canvas.item(2), rect1);
    assert.equal(canvas.item(0), rect2);
    assert.equal(canvas.item(1), rect3);
  });

  QUnit.test('bringForward', function(assert) {
    assert.ok(typeof canvas.bringForward === 'function');

    var rect1 = makeRect(),
        rect2 = makeRect(),
        rect3 = makeRect();

    canvas.add(rect1, rect2, rect3);

    // initial position — [ 1, 2, 3 ]
    assert.equal(canvas.item(0), rect1);
    assert.equal(canvas.item(1), rect2);
    assert.equal(canvas.item(2), rect3);

    canvas.bringForward(rect1);

    // 1 moves one way up — [ 2, 1, 3 ]
    assert.equal(canvas.item(1), rect1);
    assert.equal(canvas.item(0), rect2);
    assert.equal(canvas.item(2), rect3);

    canvas.bringForward(rect1);

    // 1 moves one way up again — [ 2, 3, 1 ]
    assert.equal(canvas.item(2), rect1);
    assert.equal(canvas.item(0), rect2);
    assert.equal(canvas.item(1), rect3);

    canvas.bringForward(rect1);

    // 1 is already all the way on top and so doesn't change position — [ 2, 3, 1 ]
    assert.equal(canvas.item(2), rect1);
    assert.equal(canvas.item(0), rect2);
    assert.equal(canvas.item(1), rect3);

    canvas.bringForward(rect3);

    // 1 is already all the way on top and so doesn't change position — [ 2, 1, 3 ]
    assert.equal(canvas.item(1), rect1);
    assert.equal(canvas.item(0), rect2);
    assert.equal(canvas.item(2), rect3);
  });

  QUnit.test('moveTo', function(assert) {
    assert.ok(typeof canvas.moveTo === 'function');

    var rect1 = makeRect(),
        rect2 = makeRect(),
        rect3 = makeRect();

    canvas.add(rect1, rect2, rect3);

    // [ 1, 2, 3 ]
    assert.equal(canvas.item(0), rect1);
    assert.equal(canvas.item(1), rect2);
    assert.equal(canvas.item(2), rect3);

    canvas.moveTo(rect3, 0);

    // moved 3 to level 0 — [3, 1, 2]
    assert.equal(canvas.item(1), rect1);
    assert.equal(canvas.item(2), rect2);
    assert.equal(canvas.item(0), rect3);

    canvas.moveTo(rect3, 1);

    // moved 3 to level 1 — [1, 3, 2]
    assert.equal(canvas.item(0), rect1);
    assert.equal(canvas.item(2), rect2);
    assert.equal(canvas.item(1), rect3);

    canvas.moveTo(rect3, 2);

    // moved 3 to level 2 — [1, 2, 3]
    assert.equal(canvas.item(0), rect1);
    assert.equal(canvas.item(1), rect2);
    assert.equal(canvas.item(2), rect3);

    canvas.moveTo(rect3, 2);

    // moved 3 to same level 2 and so doesn't change position — [1, 2, 3]
    assert.equal(canvas.item(0), rect1);
    assert.equal(canvas.item(1), rect2);
    assert.equal(canvas.item(2), rect3);

    canvas.moveTo(rect2, 0);

    // moved 2 to level 0 — [2, 1, 3]
    assert.equal(canvas.item(1), rect1);
    assert.equal(canvas.item(0), rect2);
    assert.equal(canvas.item(2), rect3);

    canvas.moveTo(rect2, 2);

    // moved 2 to level 2 — [1, 3, 2]
    assert.equal(canvas.item(0), rect1);
    assert.equal(canvas.item(2), rect2);
    assert.equal(canvas.item(1), rect3);
  });

  QUnit.test('item', function(assert) {
    assert.ok(typeof canvas.item === 'function');

    var rect1 = makeRect(),
        rect2 = makeRect();

    canvas.add(rect1, rect2);

    assert.equal(canvas.item(0), rect1);
    assert.equal(canvas.item(1), rect2);

    canvas.remove(canvas.item(0));

    assert.equal(canvas.item(0), rect2);
  });

  QUnit.test('complexity', function(assert) {
    assert.ok(typeof canvas.complexity === 'function');
    assert.equal(canvas.complexity(), 0);

    canvas.add(makeRect());
    assert.equal(canvas.complexity(), 1);

    canvas.add(makeRect(), makeRect());
    assert.equal(canvas.complexity(), 3);
  });

  QUnit.test('toString', function(assert) {
    assert.ok(typeof canvas.toString === 'function');

    assert.equal(canvas.toString(), '#<fabric.Canvas (0): { objects: 0 }>');

    canvas.add(makeRect());
    assert.equal(canvas.toString(), '#<fabric.Canvas (1): { objects: 1 }>');
  });

  QUnit.test('dispose clear references', function(assert) {
    var canvas2 = new fabric.StaticCanvas(null, { renderOnAddRemove: false });
    assert.ok(typeof canvas2.dispose === 'function');
    canvas2.add(makeRect(), makeRect(), makeRect());
    canvas2.dispose();
    assert.equal(canvas2.getObjects().length, 0, 'dispose should clear canvas');
    assert.equal(canvas2.lowerCanvasEl, null, 'dispose should clear lowerCanvasEl');
    assert.equal(canvas2.contextContainer, null, 'dispose should clear contextContainer');
  });

  QUnit.test('clone', function(assert) {
    assert.ok(typeof canvas.clone === 'function');
    // TODO (kangax): test clone
  });

  QUnit.test('getSetWidth', function(assert) {
    assert.ok(typeof canvas.getWidth === 'function');
    assert.equal(canvas.getWidth(), 200);
    assert.equal(canvas.setWidth(444), canvas, 'should be chainable');
    assert.equal(canvas.getWidth(), 444);
    assert.equal(canvas.lowerCanvasEl.style.width, 444 + 'px');
  });

  QUnit.test('getSetHeight', function(assert) {
    assert.ok(typeof canvas.getHeight === 'function');
    assert.equal(canvas.getHeight(), 200);
    assert.equal(canvas.setHeight(765), canvas, 'should be chainable');
    assert.equal(canvas.getHeight(), 765);
    assert.equal(canvas.lowerCanvasEl.style.height, 765 + 'px');
  });

  QUnit.test('setWidth css only', function(assert) {
    canvas.setWidth(123);
    canvas.setWidth('100%', { cssOnly: true });

    assert.equal(canvas.lowerCanvasEl.style.width, '100%', 'Should be as the css only value');
    assert.equal(canvas.getWidth(), 123, 'Should be as the none css only value');
  });

  QUnit.test('setHeight css only', function(assert) {
    canvas.setHeight(123);
    canvas.setHeight('100%', { cssOnly: true });

    assert.equal(canvas.lowerCanvasEl.style.height, '100%', 'Should be as the css only value');
    assert.equal(canvas.getHeight(), 123, 'Should be as the none css only value');
  });

  QUnit.test('setDimensions css only', function(assert) {
    canvas.setDimensions({ width: 200, height: 200 });
    canvas.setDimensions({ width: '250px', height: '350px' }, { cssOnly: true });
    assert.equal(canvas.lowerCanvasEl.style.width, '250px', 'Should be as none backstore only value + "px"');
    assert.equal(canvas.lowerCanvasEl.style.height, '350px', 'Should be as none backstore only value + "px"');
    assert.equal(canvas.getWidth(), 200, 'Should be as the backstore only value');
    assert.equal(canvas.getHeight(), 200, 'Should be as the backstore only value');
  });

  QUnit.test('setWidth backstore only', function(assert) {
    canvas.setWidth(123);
    canvas.setWidth(500, { backstoreOnly: true });

    assert.equal(canvas.lowerCanvasEl.style.width, 123 + 'px', 'Should be as none backstore only value + "px"');
    assert.equal(canvas.getWidth(), 500, 'Should be as the backstore only value');
  });

  QUnit.test('setHeight backstore only', function(assert) {
    canvas.setHeight(123);
    canvas.setHeight(500, { backstoreOnly: true });

    assert.equal(canvas.lowerCanvasEl.style.height, 123 + 'px', 'Should be as none backstore only value + "px"');
    assert.equal(canvas.getHeight(), 500, 'Should be as the backstore only value');
  });

  QUnit.test('setDimensions backstore only', function(assert) {
    canvas.setDimensions({ width: 200, height: 200 });
    canvas.setDimensions({ width: 250, height: 350 }, { backstoreOnly: true });
    assert.equal(canvas.lowerCanvasEl.style.width, 200 + 'px', 'Should be as none backstore only value + "px"');
    assert.equal(canvas.lowerCanvasEl.style.height, 200 + 'px', 'Should be as none backstore only value + "px"');
    assert.equal(canvas.getWidth(), 250, 'Should be as the backstore only value');
    assert.equal(canvas.getHeight(), 350, 'Should be as the backstore only value');
    canvas.cancelRequestedRender();
  });

  QUnit.test('fxRemove', function(assert) {
    var done = assert.async();
    assert.ok(typeof canvas.fxRemove === 'function');

    var rect = new fabric.Rect();
    canvas.add(rect);

    var callbackFired = false;
    function onComplete(){
      callbackFired = true;
      assert.equal(canvas.item(0), undefined);
      assert.ok(callbackFired);
      canvas.cancelRequestedRender();
      done();
    }

    assert.ok(canvas.item(0) === rect);
    assert.equal(canvas.fxRemove(rect, { onComplete: onComplete }), canvas, 'should be chainable');
  });

  QUnit.test('options in setBackgroundImage from URL', function(assert) {
    var done = assert.async();
    canvas.setBackgroundImage(IMG_SRC, function() {
      assert.equal(canvas.backgroundImage.canvas, canvas, 'canvas is referenced');
      assert.equal(canvas.backgroundImage.left, 50);
      assert.equal(canvas.backgroundImage.originX, 'right');
      done();
    }, {
      left: 50,
      originX: 'right'
    });
  });

  QUnit.test('options in setOverlayImage from URL', function(assert) {
    var done = assert.async();
    canvas.setOverlayImage(IMG_SRC, function() {
      assert.equal(canvas.overlayImage.canvas, canvas, 'canvas is referenced');
      assert.equal(canvas.overlayImage.left, 50);
      assert.equal(canvas.overlayImage.originX, 'right');
      done();
    }, {
      left: 50,
      originX: 'right'
    });
  });

  QUnit.test('setViewportTransform', function(assert) {
    assert.ok(typeof canvas.setViewportTransform === 'function');
    var vpt = [2, 0, 0, 2, 50, 50];
    canvas.viewportTransform = fabric.StaticCanvas.prototype.viewportTransform;
    assert.deepEqual(canvas.viewportTransform, [1, 0, 0, 1, 0, 0], 'initial viewport is identity matrix');
    canvas.setViewportTransform(vpt);
    assert.deepEqual(canvas.viewportTransform, vpt, 'viewport now is the set one');
    canvas.viewportTransform = fabric.StaticCanvas.prototype.viewportTransform;
  });

  QUnit.test('setViewportTransform calls objects setCoords', function(assert) {
    var vpt = [2, 0, 0, 2, 50, 50];
    assert.deepEqual(canvas.viewportTransform, [1, 0, 0, 1, 0, 0], 'initial viewport is identity matrix');
    var rect = new fabric.Rect({ width: 10, heigth: 10 });
    var rectBg = new fabric.Rect({ width: 10, heigth: 10 });
    var rectOverlay = new fabric.Rect({ width: 10, heigth: 10 });
    canvas.add(rect);
    canvas.cancelRequestedRender();
    canvas.backgroundImage = rectBg;
    canvas.overlayImage = rectOverlay;
    assert.deepEqual(rect.lineCoords.tl, new fabric.Point(0,0), 'rect linecoords are set for normal viewport');
    assert.equal(rectBg.lineCoords, undefined, 'rectBg linecoords are not set');
    assert.equal(rectOverlay.lineCoords, undefined, 'rectOverlay linecoords are not set');
    canvas.setViewportTransform(vpt);
    assert.deepEqual(rect.lineCoords.tl, new fabric.Point(50,50), 'rect linecoords are set');
    assert.deepEqual(rectBg.lineCoords.tl,  new fabric.Point(0,0), 'rectBg linecoords are set');
    assert.deepEqual(rectOverlay.lineCoords.tl,  new fabric.Point(0,0), 'rectOverlay linecoords are set');
  });

  QUnit.test('getZoom', function(assert) {
    assert.ok(typeof canvas.getZoom === 'function');
    var vpt = [2, 0, 0, 2, 50, 50];
    canvas.viewportTransform = fabric.StaticCanvas.prototype.viewportTransform;
    assert.deepEqual(canvas.getZoom(), 1, 'initial zoom is 1');
    canvas.setViewportTransform(vpt);
    assert.deepEqual(canvas.getZoom(), 2, 'zoom is set to 2');
    canvas.viewportTransform = fabric.StaticCanvas.prototype.viewportTransform;
  });

  QUnit.test('setZoom', function(assert) {
    assert.ok(typeof canvas.setZoom === 'function');
    assert.deepEqual(canvas.getZoom(), 1, 'initial zoom is 1');
    canvas.setZoom(2);
    assert.deepEqual(canvas.getZoom(), 2, 'zoom is set to 2');
    canvas.viewportTransform = fabric.StaticCanvas.prototype.viewportTransform;
  });

  QUnit.test('zoomToPoint', function(assert) {
    assert.ok(typeof canvas.zoomToPoint === 'function');
    assert.deepEqual(canvas.viewportTransform, [1, 0, 0, 1, 0, 0], 'initial viewport is identity matrix');
    var point = new fabric.Point(50, 50);
    canvas.zoomToPoint(point, 1);
    assert.deepEqual(canvas.viewportTransform, [1, 0, 0, 1, 0, 0], 'viewport has no changes if not moving with zoom level');
    canvas.zoomToPoint(point, 2);
    assert.deepEqual(canvas.viewportTransform, [2, 0, 0, 2, -50, -50], 'viewport has a translation effect and zoom');
    canvas.zoomToPoint(point, 3);
    assert.deepEqual(canvas.viewportTransform, [3, 0, 0, 3, -100, -100], 'viewport has a translation effect and zoom');
    canvas.viewportTransform = fabric.StaticCanvas.prototype.viewportTransform;
  });

  QUnit.test('absolutePan', function(assert) {
    assert.ok(typeof canvas.absolutePan === 'function');
    assert.deepEqual(canvas.viewportTransform, [1, 0, 0, 1, 0, 0], 'initial viewport is identity matrix');
    var point = new fabric.Point(50, 50);
    canvas.absolutePan(point);
    assert.deepEqual(canvas.viewportTransform, [1, 0, 0, 1, -point.x, -point.y], 'viewport has translation effect applied');
    canvas.absolutePan(point);
    assert.deepEqual(canvas.viewportTransform, [1, 0, 0, 1, -point.x, -point.y], 'viewport has same translation effect applied');
    canvas.viewportTransform = fabric.StaticCanvas.prototype.viewportTransform;
  });

  QUnit.test('relativePan', function(assert) {
    assert.ok(typeof canvas.relativePan === 'function');
    assert.deepEqual(canvas.viewportTransform, [1, 0, 0, 1, 0, 0], 'initial viewport is identity matrix');
    var point = new fabric.Point(-50, -50);
    canvas.relativePan(point);
    assert.deepEqual(canvas.viewportTransform, [1, 0, 0, 1, -50, -50], 'viewport has translation effect applied');
    canvas.relativePan(point);
    assert.deepEqual(canvas.viewportTransform, [1, 0, 0, 1, -100, -100], 'viewport has translation effect applied on top of old one');
    canvas.viewportTransform = fabric.StaticCanvas.prototype.viewportTransform;
  });

  QUnit.test('getContext', function(assert) {
    assert.ok(typeof canvas.getContext === 'function');
    var context = canvas.getContext();
    assert.equal(context, canvas.contextContainer, 'should return the context container');
  });

  QUnit.test('calcViewportBoundaries', function(assert) {
    assert.ok(typeof canvas.calcViewportBoundaries === 'function');
    canvas.calcViewportBoundaries();
    assert.deepEqual(canvas.vptCoords.tl, new fabric.Point(0, 0), 'tl is 0,0');
    assert.deepEqual(canvas.vptCoords.tr, new fabric.Point(canvas.getWidth(), 0), 'tr is width, 0');
    assert.deepEqual(canvas.vptCoords.bl, new fabric.Point(0, canvas.getHeight()), 'bl is 0, height');
    assert.deepEqual(canvas.vptCoords.br, new fabric.Point(canvas.getWidth(), canvas.getHeight()), 'tl is width, height');
  });

  QUnit.test('calcViewportBoundaries with zoom', function(assert) {
    assert.ok(typeof canvas.calcViewportBoundaries === 'function');
    canvas.setViewportTransform([2, 0, 0, 2, 0, 0]);
    assert.deepEqual(canvas.vptCoords.tl, new fabric.Point(0, 0), 'tl is 0,0');
    assert.deepEqual(canvas.vptCoords.tr, new fabric.Point(canvas.getWidth() / 2, 0), 'tl is 0,0');
    assert.deepEqual(canvas.vptCoords.bl, new fabric.Point(0, canvas.getHeight() / 2), 'tl is 0,0');
    assert.deepEqual(canvas.vptCoords.br, new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2), 'tl is 0,0');
  });

  QUnit.test('calcViewportBoundaries with zoom and translation', function(assert) {
    assert.ok(typeof canvas.calcViewportBoundaries === 'function');
    canvas.setViewportTransform([2, 0, 0, 2, -60, 60]);
    assert.deepEqual(canvas.vptCoords.tl, new fabric.Point(30, -30), 'tl is 0,0');
    assert.deepEqual(canvas.vptCoords.tr, new fabric.Point(30 + canvas.getWidth() / 2, -30), 'tl is 0,0');
    assert.deepEqual(canvas.vptCoords.bl, new fabric.Point(30, canvas.getHeight() / 2 - 30), 'tl is 0,0');
    assert.deepEqual(canvas.vptCoords.br, new fabric.Point(30 + canvas.getWidth() / 2, canvas.getHeight() / 2 - 30), 'tl is 0,0');
  });

  QUnit.test('_isRetinaScaling', function(assert) {
    canvas.enableRetinaScaling = true;
    fabric.devicePixelRatio = 2;
    var isScaling = canvas._isRetinaScaling();
    assert.equal(isScaling, true, 'retina > 1 and enabled');

    canvas.enableRetinaScaling = false;
    fabric.devicePixelRatio = 2;
    var isScaling = canvas._isRetinaScaling();
    assert.equal(isScaling, false, 'retina > 1 and disabled');

    canvas.enableRetinaScaling = false;
    fabric.devicePixelRatio = 1;
    var isScaling = canvas._isRetinaScaling();
    assert.equal(isScaling, false, 'retina = 1 and disabled');

    canvas.enableRetinaScaling = true;
    fabric.devicePixelRatio = 1;
    var isScaling = canvas._isRetinaScaling();
    assert.equal(isScaling, false, 'retina = 1 and enabled');
  });

  QUnit.test('getRetinaScaling', function(assert) {
    canvas.enableRetinaScaling = true;
    fabric.devicePixelRatio = 1;
    var scaling = canvas.getRetinaScaling();
    assert.equal(scaling, 1, 'retina is devicePixelRatio');

    fabric.devicePixelRatio = 2;
    var scaling = canvas.getRetinaScaling();
    assert.equal(scaling, 2, 'retina is devicePixelRatio');

    fabric.devicePixelRatio = 2;
    canvas.enableRetinaScaling = false;
    var scaling = canvas.getRetinaScaling();
    assert.equal(scaling, 1, 'retina is disabled, 1');
  });

  QUnit.test('options in setBackgroundImage from image instance', function(assert) {
    var done = assert.async();
    createImageObject(function(imageInstance) {
      canvas.setBackgroundImage(imageInstance, function() {
        assert.equal(canvas.backgroundImage.canvas, canvas, 'canvas get referenced');
        assert.equal(canvas.backgroundImage.left, 100);
        assert.equal(canvas.backgroundImage.originX, 'center');

        done();
      }, {
        left: 100,
        originX: 'center'
      });
    });
  });

  QUnit.test('options in setOverlayImage from image instance', function(assert) {
    var done = assert.async();
    createImageObject(function(imageInstance) {
      canvas.setOverlayImage(imageInstance, function() {
        assert.equal(canvas.overlayImage, imageInstance);
        assert.equal(imageInstance.left, 100);
        assert.equal(imageInstance.originX, 'center');
        assert.equal(imageInstance.canvas, canvas, 'canvas get referenced');
        done();
      }, {
        left: 100,
        originX: 'center'
      });
    });
  });

  QUnit.test('createPNGStream', function(assert) {
    if (!fabric.isLikelyNode) {
      assert.ok(true, 'not supposed to run outside node');
    }
    else {
      assert.ok(typeof canvas.createPNGStream === 'function', 'there is a createPNGStream method');
    }
  });

  QUnit.test('createJPEGStream', function(assert) {
    if (!fabric.isLikelyNode) {
      assert.ok(true, 'not supposed to run outside node');
    }
    else {
      assert.ok(typeof canvas.createJPEGStream === 'function', 'there is a createJPEGStream method');
    }
  });

  QUnit.test('toSVG with background', function(assert) {
    var canvas2 = new fabric.StaticCanvas();
    canvas2.backgroundColor = 'red';
    var svg = canvas2.toSVG();
    var expectedSVG = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="300" height="150" viewBox="0 0 300 150" xml:space="preserve">\n<desc>Created with Fabric.js ' + fabric.version + '</desc>\n<defs>\n</defs>\n<rect x="0" y="0" width="100%" height="100%" fill="red"></rect>\n</svg>';
    assert.equal(svg, expectedSVG, 'svg is as expected');
  });

  QUnit.test('toSVG with background and zoom and svgViewportTransformation', function(assert) {
    var canvas2 = new fabric.StaticCanvas();
    canvas2.backgroundColor = 'blue';
    canvas2.svgViewportTransformation = true;
    canvas2.viewportTransform = [3, 0, 0, 3, 60, 30];
    var svg = canvas2.toSVG();
    var expectedSVG = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="300" height="150" viewBox="-20 -10 100 50" xml:space="preserve">\n<desc>Created with Fabric.js ' + fabric.version + '</desc>\n<defs>\n</defs>\n<rect x="0" y="0" width="100%" height="100%" fill="blue"></rect>\n</svg>';
    assert.equal(svg, expectedSVG, 'svg is as expected');
  });

  QUnit.test('toSVG with background gradient', function(assert) {
    fabric.Object.__uid = 0;
    var canvas2 = new fabric.StaticCanvas();
    canvas2.backgroundColor = new fabric.Gradient({
      type: 'linear',
      colorStops: [
        { offset: 0, color: 'black' },
        { offset: 1, color: 'white' },
      ],
      coords: {
        x1: 0,
        x2: 300,
        y1: 0,
        y2: 0,
      },
    });
    var svg = canvas2.toSVG();
    var expectedSVG = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="300" height="150" viewBox="0 0 300 150" xml:space="preserve">\n<desc>Created with Fabric.js ' + fabric.version + '</desc>\n<defs>\n<linearGradient id=\"SVGID_0\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"matrix(1 0 0 1 0 0) matrix(1 0 0 1 -150 -75)\"  x1=\"0\" y1=\"0\" x2=\"300\" y2=\"0\">\n<stop offset="0%" style="stop-color:black;"/>\n<stop offset="100%" style="stop-color:white;"/>\n</linearGradient>\n</defs>\n<rect transform="matrix(1 0 0 1 0 0) translate(150,75)" x="-150" y="-75" width="300" height="150" fill="url(#SVGID_0)"></rect>\n</svg>';
    assert.equal(svg, expectedSVG, 'svg is as expected');
  });

  QUnit.test('toSVG with background gradient and transforms', function(assert) {
    fabric.Object.__uid = 0;
    var canvas2 = new fabric.StaticCanvas();
    canvas2.viewportTransform = [1, 2, 3, 4, 5, 6];
    canvas2.backgroundColor = new fabric.Gradient({
      type: 'linear',
      gradientTransform: [0.2, 0.3, 0.4, 0.5, -3, -5],
      colorStops: [
        { offset: 0, color: 'black' },
        { offset: 1, color: 'white' },
      ],
      coords: {
        x1: 0,
        x2: 300,
        y1: 0,
        y2: 0,
      },
    });
    var svg = canvas2.toSVG();
    var expectedSVG = '<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"300\" height=\"150\" viewBox=\"-5 -1.5 300 37.5\" xml:space=\"preserve\">\n<desc>Created with Fabric.js ' + fabric.version + '</desc>\n<defs>\n<linearGradient id=\"SVGID_0\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"matrix(1 2 3 4 5 6) matrix(0.2 0.3 0.4 0.5 -153 -23.75)\"  x1=\"0\" y1=\"0\" x2=\"300\" y2=\"0\">\n<stop offset=\"0%\" style=\"stop-color:black;\"/>\n<stop offset=\"100%\" style=\"stop-color:white;\"/>\n</linearGradient>\n</defs>\n<rect transform=\"matrix(-2 1 1.5 -0.5 1 -2) translate(150,75)\" x=\"-150\" y=\"-75\" width=\"300\" height=\"150\" fill=\"url(#SVGID_0)\"></rect>\n</svg>';
    assert.equal(svg, expectedSVG, 'svg is as expected');
  });

  QUnit.test('toSVG with background pattern', function(assert) {
    fabric.Object.__uid = 0;
    var canvas2 = new fabric.StaticCanvas();
    canvas2.backgroundColor = new fabric.Pattern({
      source: 'a.jpeg',
      repeat: 'repeat',
    });
    var svg = canvas2.toSVG();
    var expectedSVG = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="300" height="150" viewBox="0 0 300 150" xml:space="preserve">\n<desc>Created with Fabric.js ' + fabric.version + '</desc>\n<defs>\n<pattern id="SVGID_0" x="0" y="0" width="0" height="0">\n<image x="0" y="0" width="0" height="0" xlink:href=""></image>\n</pattern>\n</defs>\n<rect transform="matrix(1 0 0 1 0 0) translate(150,75)" x="-150" y="-75" width="300" height="150" fill="url(#SVGID_0)"></rect>\n</svg>';
    assert.equal(svg, expectedSVG, 'svg is as expected');
  });

  QUnit.test('requestRenderAll and cancelRequestedRender', function(assert) {
    var canvas2 = new fabric.StaticCanvas();
    assert.equal(canvas2.isRendering, undefined, 'no redering is in progress');
    canvas2.requestRenderAll();
    assert.notEqual(canvas2.isRendering, 0, 'a rendering is scehduled');
    canvas2.cancelRequestedRender();
    assert.equal(canvas2.isRendering, 0, 'rendering cancelled');
  });

  // QUnit.test('backgroundImage', function(assert) {
  //   var done = assert.async();
  //   assert.deepEqual('', canvas.backgroundImage);
  //   canvas.setBackgroundImage('../../assets/pug.jpg');

  //   setTimeout(function() {

  //     assert.ok(typeof canvas.backgroundImage == 'object');
  //     assert.ok(/pug\.jpg$/.test(canvas.backgroundImage.src));

  //     done();
  //   }, 1000);
  // });

  // QUnit.test('setOverlayImage', function(assert) {
  //   var done = assert.async();
  //   assert.deepEqual(canvas.overlayImage, undefined);
  //   canvas.setOverlayImage('../../assets/pug.jpg');

  //   setTimeout(function() {

  //     assert.ok(typeof canvas.overlayImage == 'object');
  //     assert.ok(/pug\.jpg$/.test(canvas.overlayImage.src));

  //     done();
  //   }, 1000);
  // });

})();
