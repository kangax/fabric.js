(function() {
  var canvas = this.canvas = new fabric.Canvas();

  var ITEXT_OBJECT = {
    version:                  fabric.version,
    type:                     'text',
    originX:                  'left',
    originY:                  'top',
    left:                     0,
    top:                      0,
    width:                    20,
    height:                   45.2,
    fill:                     'rgb(0,0,0)',
    stroke:                   null,
    strokeWidth:              1,
    strokeDashArray:          null,
    strokeLineCap:            'butt',
    strokeDashOffset:         0,
    strokeLineJoin:           'miter',
    strokeMiterLimit:         4,
    scaleX:                   1,
    scaleY:                   1,
    angle:                    0,
    flipX:                    false,
    flipY:                    false,
    opacity:                  1,
    shadow:                   null,
    visible:                  true,
    text:                     'x',
    fontSize:                 40,
    fontWeight:               'normal',
    fontFamily:               'Times New Roman',
    fontStyle:                'normal',
    lineHeight:               1.3,
    underline:                false,
    overline:                 false,
    linethrough:              false,
    textAlign:                'left',
    backgroundColor:          '',
    textBackgroundColor:      '',
    fillRule:                 'nonzero',
    paintFirst:               'fill',
    globalCompositeOperation: 'source-over',
    skewX:                    0,
    skewY:                    0,
    charSpacing:              0,
    styles:                     { },
    strokeUniform:            false,
    path:                     null,
    direction:                'ltr',
  };


  QUnit.module('fabric.IText', function(hooks) {
    hooks.afterEach(function() {
      canvas.clear();
      canvas.cancelRequestedRender();
    });

    QUnit.test('constructor', function(assert) {
      var iText = new fabric.IText('test');

      assert.ok(iText instanceof fabric.IText);
      assert.ok(iText instanceof fabric.Text);
    });

    QUnit.test('initial properties', function(assert) {
      var iText = new fabric.IText('test');
      assert.ok(iText instanceof fabric.IText);

      assert.equal(iText.text, 'test');
      assert.equal(iText.type, 'i-text');
      assert.deepEqual(iText.styles, { });
    });

    QUnit.test('instances', function(assert) {
      var iText = new fabric.IText('test');

      // Not on a sketchpad; storing it in instances array already would leak it forever.
      var instances = canvas._iTextInstances && canvas._iTextInstances;
      var lastInstance = instances && instances[instances.length - 1];
      assert.equal(lastInstance, undefined);

      canvas.add(iText);
      instances = canvas._iTextInstances && canvas._iTextInstances;
      lastInstance = instances && instances[instances.length - 1];
      assert.equal(lastInstance, iText);

      canvas.remove(iText);
      instances = canvas._iTextInstances && canvas._iTextInstances;
      lastInstance = instances && instances[instances.length - 1];
      assert.equal(lastInstance, undefined);

      // Should survive being added again after removal.
      canvas.add(iText);
      lastInstance = canvas._iTextInstances && canvas._iTextInstances[canvas._iTextInstances.length - 1];
      assert.equal(lastInstance, iText);
    });

    QUnit.test('fromObject', function(assert) {
      var done = assert.async();
      assert.ok(typeof fabric.IText.fromObject === 'function');
      fabric.IText.fromObject(ITEXT_OBJECT, function(iText) {
        assert.ok(iText instanceof fabric.IText);
        assert.deepEqual(ITEXT_OBJECT, iText.toObject());
        done();
      });
    });

    QUnit.test('lineHeight with single line', function(assert) {
      var text = new fabric.IText('text with one line');
      text.lineHeight = 2;
      text.initDimensions();
      var height = text.height;
      text.lineHeight = 0.5;
      text.initDimensions();
      var heightNew = text.height;
      assert.equal(height, heightNew, 'text height does not change with one single line');
    });

    QUnit.test('lineHeight with multi line', function(assert) {
      var text = new fabric.IText('text with\ntwo lines');
      text.lineHeight = 0.1;
      text.initDimensions();
      var height = text.height,
          minimumHeight = text.fontSize * text._fontSizeMult;
      assert.equal(height > minimumHeight, true, 'text height is always bigger than minimum Height');
    });

    QUnit.test('toObject', function(assert) {
      var styles = {
        0: {
          0: { fill: 'red' },
          1: { textDecoration: 'underline' }
        }
      };
      var iText = new fabric.IText('test', {
        styles: styles
      });
      assert.equal(typeof iText.toObject, 'function');
      var obj = iText.toObject();
      assert.deepEqual(obj.styles, styles);
      assert.notEqual(obj.styles[0], styles[0]);
      assert.notEqual(obj.styles[0][1], styles[0][1]);
      assert.deepEqual(obj.styles[0], styles[0]);
      assert.deepEqual(obj.styles[0][1], styles[0][1]);
    });

    QUnit.test('setSelectionStart', function(assert) {
      var iText = new fabric.IText('test');

      assert.equal(typeof iText.setSelectionStart, 'function');

      assert.equal(iText.selectionStart, 0);

      iText.setSelectionStart(3);
      assert.equal(iText.selectionStart, 3);
      assert.equal(iText.selectionEnd, 0);
    });

    QUnit.test('empty itext', function(assert) {
      var iText = new fabric.IText('');
      assert.equal(iText.width, iText.cursorWidth);
    });

    QUnit.test('setSelectionEnd', function(assert) {
      var iText = new fabric.IText('test');

      assert.equal(typeof iText.setSelectionEnd, 'function');

      assert.equal(iText.selectionEnd, 0);

      iText.setSelectionEnd(3);
      assert.equal(iText.selectionEnd, 3);
      assert.equal(iText.selectionStart, 0);
    });

    QUnit.test('get2DCursorLocation', function(assert) {
      var iText = new fabric.IText('test\nfoo\nbarbaz');
      var loc = iText.get2DCursorLocation();

      assert.equal(loc.lineIndex, 0);
      assert.equal(loc.charIndex, 0);

      // 'tes|t'
      iText.selectionStart = iText.selectionEnd = 3;
      loc = iText.get2DCursorLocation();

      assert.equal(loc.lineIndex, 0);
      assert.equal(loc.charIndex, 3);

      // test
      // fo|o
      iText.selectionStart = iText.selectionEnd = 7;
      loc = iText.get2DCursorLocation();

      assert.equal(loc.lineIndex, 1);
      assert.equal(loc.charIndex, 2);

      // test
      // foo
      // barba|z
      iText.selectionStart = iText.selectionEnd = 14;
      loc = iText.get2DCursorLocation();

      assert.equal(loc.lineIndex, 2);
      assert.equal(loc.charIndex, 5);
    });

    QUnit.test('isEmptyStyles', function(assert) {
      var iText = new fabric.IText('test');
      assert.ok(iText.isEmptyStyles());

      iText = new fabric.IText('test', {
        styles: {
          0: {
            0: { }
          },
          1: {
            0: { }, 1: { }
          }
        }
      });
      assert.ok(iText.isEmptyStyles());

      iText = new fabric.IText('test', {
        styles: {
          0: {
            0: { }
          },
          1: {
            0: { fill: 'red' }, 1: { }
          }
        }
      });
      assert.ok(!iText.isEmptyStyles());
    });

    QUnit.test('selectAll', function(assert) {
      var iText = new fabric.IText('test');

      iText.selectAll();
      assert.equal(iText.selectionStart, 0);
      assert.equal(iText.selectionEnd, 4);

      iText.selectionStart = 1;
      iText.selectionEnd = 2;

      iText.selectAll();
      assert.equal(iText.selectionStart, 0);
      assert.equal(iText.selectionEnd, 4);

      assert.equal(iText.selectAll(), iText, 'should be chainable');
    });

    QUnit.test('getSelectedText', function(assert) {
      var iText = new fabric.IText('test\nfoobarbaz');
      iText.selectionStart = 1;
      iText.selectionEnd = 10;
      assert.equal(iText.getSelectedText(), 'est\nfooba');

      iText.selectionStart = iText.selectionEnd = 3;
      assert.equal(iText.getSelectedText(), '');
    });

    QUnit.test('enterEditing, exitEditing', function(assert) {
      var iText = new fabric.IText('test');

      assert.equal(typeof iText.enterEditing, 'function');
      assert.equal(typeof iText.exitEditing, 'function');

      assert.ok(!iText.isEditing);

      iText.enterEditing();
      assert.ok(iText.isEditing);

      iText.exitEditing();
      assert.ok(!iText.isEditing);
      iText.abortCursorAnimation();
    });

    QUnit.test('enterEditing, exitEditing and saved props', function(assert) {
      var iText = new fabric.IText('test');

      var _savedProps = {
        hasControls: iText.hasControls,
        borderColor: iText.borderColor,
        lockMovementX: iText.lockMovementX,
        lockMovementY: iText.lockMovementY,
        hoverCursor: iText.hoverCursor,
        selectable: iText.selectable,
        defaultCursor: iText.canvas && iText.canvas.defaultCursor,
        moveCursor: iText.canvas && iText.canvas.moveCursor
      };
      iText.enterEditing();
      assert.deepEqual(_savedProps, iText._savedProps, 'iText saves a copy of important props');
      assert.equal(iText.selectable, false, 'selectable is set to false');
      assert.equal(iText.hasControls, false, 'hasControls is set to false');
      iText.exitEditing();
      iText.abortCursorAnimation();
      assert.equal(iText.selectable, true, 'selectable is set back to true');
      assert.equal(iText.hasControls, true, 'hasControls is set back to true');
      iText.selectable = false;
      iText.enterEditing();
      iText.exitEditing();
      assert.equal(iText.selectable, false, 'selectable is set back to initial value');
      iText.abortCursorAnimation();
    });

    QUnit.test('event firing', function(assert) {
      var iText = new fabric.IText('test'),
          enter = 0, exit = 0, modify = 0;

      function countEnter() {
        enter++;
      }

      function countExit() {
        exit++;
      }

      function countModify() {
        modify++;
      }

      iText.on('editing:entered', countEnter);
      iText.on('editing:exited', countExit);
      iText.on('modified', countModify);

      assert.equal(typeof iText.enterEditing, 'function');
      assert.equal(typeof iText.exitEditing, 'function');

      iText.enterEditing();
      assert.equal(enter, 1);
      assert.equal(exit, 0);
      assert.equal(modify, 0);

      iText.exitEditing();
      assert.equal(enter, 1);
      assert.equal(exit, 1);
      assert.equal(modify, 0);

      iText.enterEditing();
      assert.equal(enter, 2);
      assert.equal(exit, 1);
      assert.equal(modify, 0);

      iText.text = 'Test+';
      iText.exitEditing();
      assert.equal(enter, 2);
      assert.equal(exit, 2);
      assert.equal(modify, 1);
      iText.abortCursorAnimation();
    });

    QUnit.test('insertNewlineStyleObject', function(assert) {
      var iText = new fabric.IText('test\n2');

      assert.equal(typeof iText.insertNewlineStyleObject, 'function');

      iText.insertNewlineStyleObject(0, 4, 1);
      assert.deepEqual(iText.styles, { }, 'does not insert empty styles');
      iText.styles = { 1: { 0: { fill: 'blue' } } };
      iText.insertNewlineStyleObject(0, 4, 1);
      assert.deepEqual(iText.styles, { 2: { 0: { fill: 'blue' } } }, 'correctly shift styles');
    });

    QUnit.test('insertNewlineStyleObject with existing style', function(assert) {
      var iText = new fabric.IText('test\n2');

      iText.styles = { 0: { 3: { fill: 'red' } }, 1: { 0: { fill: 'blue' } } };
      iText.insertNewlineStyleObject(0, 4, 3);
      assert.deepEqual(iText.styles[4], { 0: { fill: 'blue' } }, 'correctly shift styles 3 lines');
      assert.deepEqual(iText.styles[3], { 0: { fill: 'red' } }, 'correctly copied previous style line 3');
      assert.deepEqual(iText.styles[2], { 0: { fill: 'red' } }, 'correctly copied previous style line 2');
      assert.deepEqual(iText.styles[1], { 0: { fill: 'red' } }, 'correctly copied previous style line 1');
    });

    QUnit.test('shiftLineStyles', function(assert) {
      var iText = new fabric.IText('test\ntest\ntest', {
        styles: {
          1: {
            0: { fill: 'red' },
            1: { fill: 'red' },
            2: { fill: 'red' },
            3: { fill: 'red' }
          }
        }
      });

      assert.equal(typeof iText.shiftLineStyles, 'function');

      iText.shiftLineStyles(0, +1);
      assert.deepEqual(iText.styles, {
        2: {
          0: { fill: 'red' },
          1: { fill: 'red' },
          2: { fill: 'red' },
          3: { fill: 'red' }
        }
      });

      iText.shiftLineStyles(0, -1);
      assert.deepEqual(iText.styles, {
        1: {
          0: { fill: 'red' },
          1: { fill: 'red' },
          2: { fill: 'red' },
          3: { fill: 'red' }
        }
      });
    });

    QUnit.test('selectWord', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux');

      assert.equal(typeof iText.selectWord, 'function');

      iText.selectWord(1);
      assert.equal(iText.selectionStart, 0); // |test|
      assert.equal(iText.selectionEnd, 4);

      iText.selectWord(7);
      assert.equal(iText.selectionStart, 5); // |foo|
      assert.equal(iText.selectionEnd, 8);
    });

    QUnit.test('selectLine', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux');

      assert.equal(typeof iText.selectLine, 'function');

      iText.selectLine(6);
      assert.equal(iText.selectionStart, 0); // |test foo bar-baz|
      assert.equal(iText.selectionEnd, 16);

      iText.selectLine(18);
      assert.equal(iText.selectionStart, 17); // |qux|
      assert.equal(iText.selectionEnd, 20);

      assert.equal(iText.selectLine(0), iText, 'should be chainable');
    });

    QUnit.test('findWordBoundaryLeft', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux');

      assert.equal(typeof iText.findWordBoundaryLeft, 'function');

      assert.equal(iText.findWordBoundaryLeft(3), 0); // 'tes|t'
      assert.equal(iText.findWordBoundaryLeft(20), 17); // 'qux|'
      assert.equal(iText.findWordBoundaryLeft(6), 5); // 'f|oo'
      assert.equal(iText.findWordBoundaryLeft(11), 9); // 'ba|r-baz'
    });

    QUnit.test('findWordBoundaryRight', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux');

      assert.equal(typeof iText.findWordBoundaryRight, 'function');

      assert.equal(iText.findWordBoundaryRight(3), 4); // 'tes|t'
      assert.equal(iText.findWordBoundaryRight(17), 20); // '|qux'
      assert.equal(iText.findWordBoundaryRight(6), 8); // 'f|oo'
      assert.equal(iText.findWordBoundaryRight(11), 16); // 'ba|r-baz'
    });

    QUnit.test('findLineBoundaryLeft', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux');

      assert.equal(typeof iText.findLineBoundaryLeft, 'function');

      assert.equal(iText.findLineBoundaryLeft(3), 0); // 'tes|t'
      assert.equal(iText.findLineBoundaryLeft(20), 17); // 'qux|'
    });

    QUnit.test('findLineBoundaryRight', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux');

      assert.equal(typeof iText.findLineBoundaryRight, 'function');

      assert.equal(iText.findLineBoundaryRight(3), 16); // 'tes|t'
      assert.equal(iText.findLineBoundaryRight(17), 20); // '|qux'
    });

    QUnit.test('getSelectionStyles with no arguments', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux', {
        styles: {
          0: {
            0: { textDecoration: 'underline' },
            2: { textDecoration: 'overline' },
            4: { textBackgroundColor: '#ffc' }
          },
          1: {
            0: { fill: 'red' },
            1: { fill: 'green' },
            2: { fill: 'blue' }
          }
        }
      });

      assert.equal(typeof iText.getSelectionStyles, 'function');

      iText.selectionStart = 0;
      iText.selectionEnd = 0;

      assert.deepEqual(iText.getSelectionStyles(), []);

      iText.selectionStart = 2;
      iText.selectionEnd = 3;

      assert.deepEqual(iText.getSelectionStyles(), [{
        textDecoration: 'overline'
      }]);

      iText.selectionStart = 17;
      iText.selectionEnd = 18;

      assert.deepEqual(iText.getSelectionStyles(), [{
        fill: 'red'
      }]);
    });

    QUnit.test('getSelectionStyles with 2 args', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux', {
        styles: {
          0: {
            0: { textDecoration: 'underline' },
            2: { textDecoration: 'overline' },
            4: { textBackgroundColor: '#ffc' }
          },
          1: {
            0: { fill: 'red' },
            1: { fill: 'green' },
            2: { fill: 'blue' }
          }
        }
      });

      assert.deepEqual(iText.getSelectionStyles(0, 2), [
        { textDecoration: 'underline' },
        { }
      ]);
    });

    QUnit.test('setSelectionStyles', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux', {
        styles: {
          0: {
            0: { fill: '#112233' },
            2: { stroke: '#223344' }
          }
        }
      });

      assert.equal(typeof iText.setSelectionStyles, 'function');

      iText.setSelectionStyles({
        fill: 'red',
        stroke: 'yellow'
      });

      assert.deepEqual(iText.styles[0][0], {
        fill: '#112233'
      });

      iText.selectionEnd = 0;
      iText.selectionEnd = 1;
      iText.setSelectionStyles({
        fill: 'red',
        stroke: 'yellow'
      });

      assert.deepEqual(iText.styles[0][0], {
        fill: 'red',
        stroke: 'yellow'
      });

      iText.selectionStart = 2;
      iText.selectionEnd = 3;

      iText.setSelectionStyles({
        fill: '#998877',
        stroke: 'yellow'
      });

      assert.deepEqual(iText.styles[0][2], {
        fill: '#998877',
        stroke: 'yellow'
      });
    });

    QUnit.test('getCurrentCharFontSize', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux', {
        styles: {
          0: {
            0: { fontSize: 20 },
            1: { fontSize: 60 }
          }
        }
      });

      assert.equal(typeof iText.getCurrentCharFontSize, 'function');
      iText.selectionStart = 0;
      assert.equal(iText.getCurrentCharFontSize(), 20);
      iText.selectionStart = 1;
      assert.equal(iText.getCurrentCharFontSize(), 20);
      iText.selectionStart = 2;
      assert.equal(iText.getCurrentCharFontSize(), 60);
      iText.selectionStart = 3;
      assert.equal(iText.getCurrentCharFontSize(), 40);
    });

    QUnit.test('object removal from canvas', function(assert) {
      canvas.clear();
      canvas._iTextInstances = null;
      var text1 = new fabric.IText('Text Will be here');
      var text2 = new fabric.IText('Text Will be here');
      assert.ok(!canvas._iTextInstances, 'canvas has no iText instances');
      assert.ok(!canvas._hasITextHandlers, 'canvas has no handlers');

      canvas.add(text1);
      assert.deepEqual(canvas._iTextInstances, [text1], 'canvas has 1 text instance');
      assert.ok(canvas._hasITextHandlers, 'canvas has handlers');
      assert.equal(canvas._iTextInstances.length, 1, 'just one itext object should be on canvas');

      canvas.add(text2);
      assert.deepEqual(canvas._iTextInstances, [text1, text2], 'canvas has 2 text instance');
      assert.ok(canvas._hasITextHandlers, 'canvas has handlers');
      assert.equal(canvas._iTextInstances.length, 2, 'just two itext object should be on canvas');

      canvas.remove(text1);
      assert.deepEqual(canvas._iTextInstances, [text2], 'canvas has 1 text instance');
      assert.ok(canvas._hasITextHandlers, 'canvas has handlers');
      assert.equal(canvas._iTextInstances.length, 1, 'just two itext object should be on canvas');

      canvas.remove(text2);
      assert.deepEqual(canvas._iTextInstances, [], 'canvas has 0 text instance');
      assert.ok(!canvas._hasITextHandlers, 'canvas has no handlers');
    });

    QUnit.test('getCurrentCharColor', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux', {
        styles: {
          0: {
            0: { fill: 'red' },
            1: { fill: 'green' }
          }
        },
        fill: '#333',
      });

      assert.equal(typeof iText.getCurrentCharColor, 'function');
      iText.selectionStart = 0;
      assert.equal(iText.getCurrentCharColor(), 'red');
      iText.selectionStart = 1;
      assert.equal(iText.getCurrentCharColor(), 'red');
      iText.selectionStart = 2;
      assert.equal(iText.getCurrentCharColor(), 'green');
      iText.selectionStart = 3;
      assert.equal(iText.getCurrentCharColor(), '#333');
    });

    QUnit.test('toSVGWithFonts', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux', {
        styles: {
          0: {
            0: { fill: '#112233' },
            2: { stroke: '#223344', fontFamily: 'Engagement' },
            3: { backgroundColor: '#00FF00' }
          }
        },
        fontFamily: 'Plaster'
      });
      fabric.fontPaths = {
        Engagement: 'path-to-engagement-font-file',
        Plaster: 'path-to-plaster-font-file',
      };
      canvas.add(iText);
      assert.equal(typeof iText.toSVG, 'function');
      var parser;
      if (fabric.isLikelyNode) {
        var XmlDomParser = require('xmldom').DOMParser;
        parser = new XmlDomParser();
      }
      else {
        parser = new DOMParser();
      }
      var svgString = canvas.toSVG(),
          doc = parser.parseFromString(svgString, 'image/svg+xml'),
          style = doc.getElementsByTagName('style')[0].firstChild.data;
      assert.equal(style, '\n\t\t@font-face {\n\t\t\tfont-family: \'Plaster\';\n\t\t\tsrc: url(\'path-to-plaster-font-file\');\n\t\t}\n\t\t@font-face {\n\t\t\tfont-family: \'Engagement\';\n\t\t\tsrc: url(\'path-to-engagement-font-file\');\n\t\t}\n');
    });

    QUnit.test('toSVGWithFontsInGroups', function(assert) {
      var iText1 = new fabric.IText('test foo bar-baz\nqux', {
        styles: {
          0: {
            0: { fill: '#112233' },
            2: { stroke: '#223344', fontFamily: 'Lacquer' },
            3: { backgroundColor: '#00FF00' }
          }
        },
        fontFamily: 'Plaster'
      });
      var iText2 = new fabric.IText('test foo bar-baz\nqux\n2', {
        styles: {
          0: {
            0: { fill: '#112233', fontFamily: 'Engagement' },
            2: { stroke: '#223344' },
            3: { backgroundColor: '#00FF00' }
          }
        },
        fontFamily: 'Poppins'
      });
      fabric.fontPaths = {
        Engagement: 'path-to-engagement-font-file',
        Plaster: 'path-to-plaster-font-file',
        Poppins: 'path-to-poppins-font-file',
        Lacquer: 'path-to-lacquer-font-file'
      };
      var subGroup = new fabric.Group([iText1]);
      var group = new fabric.Group([subGroup, iText2]);
      canvas.add(group);
      assert.equal(typeof iText1.toSVG, 'function');
      assert.equal(typeof iText2.toSVG, 'function');
      var parser = new DOMParser();
      var svgString = canvas.toSVG(),
          doc = parser.parseFromString(svgString, 'image/svg+xml'),
          style = doc.getElementsByTagName('style')[0].firstChild.data;
      assert.equal(
        style,
        '\n\t\t@font-face {\n\t\t\tfont-family: \'Plaster\';\n\t\t\tsrc: url(\'path-to-plaster-font-file\');\n\t\t}\n\t\t@font-face {\n\t\t\tfont-family: \'Lacquer\';\n\t\t\tsrc: url(\'path-to-lacquer-font-file\');\n\t\t}\n\t\t@font-face {\n\t\t\tfont-family: \'Poppins\';\n\t\t\tsrc: url(\'path-to-poppins-font-file\');\n\t\t}\n\t\t@font-face {\n\t\t\tfont-family: \'Engagement\';\n\t\t\tsrc: url(\'path-to-engagement-font-file\');\n\t\t}\n'
      );
    });

    QUnit.test('space wrap attribute', function(assert) {
      var iText = new fabric.IText('test foo bar-baz\nqux');
      iText.enterEditing();
      assert.equal(iText.hiddenTextarea.wrap, 'off', 'HiddenTextarea needs wrap off attribute');
      iText.abortCursorAnimation();
    });

    QUnit.test('_removeExtraneousStyles', function(assert) {
      var iText = new fabric.IText('a\nq\qo', { styles: {
        0: { 0: { fontSize: 4 } },
        1: { 0: { fontSize: 4 } },
        2: { 0: { fontSize: 4 } },
        3: { 0: { fontSize: 4 } },
        4: { 0: { fontSize: 4 } },
      } });
      assert.deepEqual(iText.styles[3], { 0: { fontSize: 4 } }, 'style line 3 exists');
      assert.deepEqual(iText.styles[4], { 0: { fontSize: 4 } }, 'style line 4 exists');
      iText._removeExtraneousStyles();
      assert.equal(iText.styles[3], undefined, 'style line 3 has been removed');
      assert.equal(iText.styles[4], undefined, 'style line 4 has been removed');
    });


    QUnit.module('fabric.IText with canvas.enableRetinaScaling = false', function() {
      QUnit.test('hiddenTextarea does not move DOM', function(assert) {
        var iText = new fabric.IText('a', { fill: '#ffffff', fontSize: 50 });
        var canvas2 = new fabric.Canvas(null, { width: 800, height: 800, renderOnAddRemove: false, enableRetinaScaling: false });
        canvas2.setDimensions({ width: 100, height: 100 }, { cssOnly: true });
        canvas2.cancelRequestedRender();
        iText.set({
          top: 400,
          left: 400,
        });
        canvas2.add(iText);
        Object.defineProperty(canvas2.upperCanvasEl, 'clientWidth', {
          get: function() { return this._clientWidth; },
          set: function(value) { return this._clientWidth = value; },
        });
        Object.defineProperty(canvas2.upperCanvasEl, 'clientHeight', {
          get: function() { return this._clientHeight; },
          set: function(value) { return this._clientHeight = value; },
        });
        canvas2.upperCanvasEl._clientWidth = 100;
        canvas2.upperCanvasEl._clientHeight = 100;
        iText.enterEditing();
        canvas2.cancelRequestedRender();
        assert.equal(Math.round(parseInt(iText.hiddenTextarea.style.top)), 57, 'top is scaled with CSS');
        assert.equal(Math.round(parseInt(iText.hiddenTextarea.style.left)), 50, 'left is scaled with CSS');
        iText.exitEditing();
        canvas2.cancelRequestedRender();
        canvas2.upperCanvasEl._clientWidth = 200;
        canvas2.upperCanvasEl._clientHeight = 200;
        iText.enterEditing();
        canvas2.cancelRequestedRender();
        assert.equal(Math.round(parseInt(iText.hiddenTextarea.style.top)), 114, 'top is scaled with CSS');
        assert.equal(Math.round(parseInt(iText.hiddenTextarea.style.left)), 100, 'left is scaled with CSS');
        iText.exitEditing();
        canvas2.cancelRequestedRender();
      });
    });

    QUnit.module('fabric.IText with canvas.enableRetinaScaling = true', function() {
      QUnit.test('hiddenTextarea does not move DOM', function(assert) {
        fabric.devicePixelRatio = 2;
        var iText = new fabric.IText('a', { fill: '#ffffff', fontSize: 50 });
        var canvas2 = new fabric.Canvas(null, { width: 800, height: 800, renderOnAddRemove: false, enableRetinaScaling: true });
        canvas2.setDimensions({ width: 100, height: 100 }, { cssOnly: true });
        canvas2.cancelRequestedRender();
        iText.set({
          top: 400,
          left: 400,
        });
        canvas2.add(iText);
        Object.defineProperty(canvas2.upperCanvasEl, 'clientWidth', {
          get: function() { return this._clientWidth; },
          set: function(value) { return this._clientWidth = value; },
        });
        Object.defineProperty(canvas2.upperCanvasEl, 'clientHeight', {
          get: function() { return this._clientHeight; },
          set: function(value) { return this._clientHeight = value; },
        });
        canvas2.upperCanvasEl._clientWidth = 100;
        canvas2.upperCanvasEl._clientHeight = 100;
        iText.enterEditing();
        canvas2.cancelRequestedRender();
        assert.equal(Math.round(parseInt(iText.hiddenTextarea.style.top)), 57, 'top is scaled with CSS');
        assert.equal(Math.round(parseInt(iText.hiddenTextarea.style.left)), 50, 'left is scaled with CSS');
        iText.exitEditing();
        canvas2.cancelRequestedRender();
        canvas2.upperCanvasEl._clientWidth = 200;
        canvas2.upperCanvasEl._clientHeight = 200;
        iText.enterEditing();
        canvas2.cancelRequestedRender();
        assert.equal(Math.round(parseInt(iText.hiddenTextarea.style.top)), 114, 'top is scaled with CSS');
        assert.equal(Math.round(parseInt(iText.hiddenTextarea.style.left)), 100, 'left is scaled with CSS');
        iText.exitEditing();
        canvas2.cancelRequestedRender();
        fabric.devicePixelRatio = 1;
      });
    });

    QUnit.test('restore _clickHandlerInitialized on added', function (assert) {
      var iText = new fabric.IText('test');
      iText._clickHandlerInitialized = true;

      canvas.add(iText);

      assert.notOk(
        iText._clickHandlerInitialized,
        'set to false on added'
      );
    });
  });
})();
