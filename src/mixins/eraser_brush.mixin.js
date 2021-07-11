(function () {
  /** ERASER_START */
  var __setBgOverlayColor = fabric.StaticCanvas.prototype.__setBgOverlayColor;
  var ___setBgOverlay = fabric.StaticCanvas.prototype.__setBgOverlay;
  var __setSVGBgOverlayColor = fabric.StaticCanvas.prototype._setSVGBgOverlayColor;
  fabric.util.object.extend(fabric.StaticCanvas.prototype, {
    backgroundColor: undefined,
    overlayColor: undefined,
    /**
     * Create Rect that holds the color to support erasing
     * patches {@link CommonMethods#_initGradient}
     * @private
     * @param {'background'|'overlay'} property
     * @param {(String|fabric.Pattern|fabric.Rect)} color Color or pattern or rect (in case of erasing)
     * @param {Function} callback Callback to invoke when color is set
     * @param {Object} options
     * @return {fabric.Canvas} instance
     * @chainable true
     */
    __setBgOverlayColor: function (property, color, callback, options) {
      if (color && color.isType && color.isType('rect')) {
        // color is already an object
        this[property] = color;
        color.set(options);
        callback && callback(this[property]);
      }
      else {
        var _this = this;
        var cb = function () {
          _this[property] = new fabric.Rect(fabric.util.object.extend({
            width: _this.width,
            height: _this.height,
            fill: _this[property],
          }, options));
          callback && callback(_this[property]);
        };
        __setBgOverlayColor.call(this, property, color, cb);
        //  invoke cb in case of gradient
        //  see {@link CommonMethods#_initGradient}
        if (color && color.colorStops && !(color instanceof fabric.Gradient)) {
          cb();
        }
      }

      return this;
    },

    setBackgroundColor: function (backgroundColor, callback, options) {
      return this.__setBgOverlayColor('backgroundColor', backgroundColor, callback, options);
    },

    setOverlayColor: function (overlayColor, callback, options) {
      return this.__setBgOverlayColor('overlayColor', overlayColor, callback, options);
    },

    /**
     * patch serialization - from json
     * background/overlay properties could be objects if parsed by this mixin or could be legacy values
     * @private
     * @param {String} property Property to set (backgroundImage, overlayImage, backgroundColor, overlayColor)
     * @param {(Object|String)} value Value to set
     * @param {Object} loaded Set loaded property to true if property is set
     * @param {Object} callback Callback function to invoke after property is set
     */
    __setBgOverlay: function (property, value, loaded, callback) {
      var _this = this;

      if ((property === 'backgroundColor' || property === 'overlayColor') &&
        (value && typeof value === 'object' && value.type === 'rect')) {
        fabric.util.enlivenObjects([value], function (enlivedObject) {
          _this[property] = enlivedObject[0];
          loaded[property] = true;
          callback && callback();
        });
      }
      else {
        ___setBgOverlay.call(this, property, value, loaded, callback);
      }
    },

    /**
     * patch serialization - to svg
     * background/overlay properties could be objects if parsed by this mixin or could be legacy values
     * @private
     */
    _setSVGBgOverlayColor: function (markup, property, reviver) {
      var filler = this[property + 'Color'];
      if (filler && filler.isType && filler.isType('rect')) {
        var excludeFromExport = filler.excludeFromExport || (this[property] && this[property].excludeFromExport);
        if (filler && !excludeFromExport && filler.toSVG) {
          markup.push(filler.toSVG(reviver));
        }
      }
      else {
        __setSVGBgOverlayColor.call(this, markup, property, reviver);
      }
    },

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {string} property 'background' or 'overlay'
     */
    _renderBackgroundOrOverlay: function (ctx, property) {
      var fill = this[property + 'Color'], object = this[property + 'Image'],
          v = this.viewportTransform, needsVpt = this[property + 'Vpt'];
      if (!fill && !object) {
        return;
      }
      if (fill || object) {
        ctx.save();
        fill && fill.render(ctx);
        if (needsVpt) {
          ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        }
        object && object.render(ctx);
        ctx.restore();
      }
    },
  });

  var __set = fabric.Object.prototype._set;
  var _render = fabric.Object.prototype.render;
  var _toObject = fabric.Object.prototype.toObject;
  var __createBaseSVGMarkup = fabric.Object.prototype._createBaseSVGMarkup;
  fabric.util.object.extend(fabric.Object.prototype, {
    /**
     * Indicates whether this object can be erased by {@link fabric.EraserBrush}
     * The `deep` option introduces fine grained control over a group's `erasable` property.
     * When set to `deep` the eraser will erase nested objects if they are erasable, leaving the group and the other objects untouched.
     * When set to `true` the eraser will erase the entire group. Once the group changes the eraser is propagated to its children for proper functionality.
     * When set to `false` the eraser will leave all objects including the group untouched.
     * @tutorial {@link http://fabricjs.com/erasing#erasable_property}
     * @type boolean | 'deep'
     * @default true
     */
    erasable: true,

    /**
     *
     * @returns {fabric.Group | undefined}
     */
    getEraser: function () {
      return this.clipPath && this.clipPath.eraser ? this.clipPath : undefined;
    },

    /**
     * Get the object's actual clip path regardless of clipping done by erasing
     * @returns {fabric.Object | undefined}
     */
    getClipPath: function () {
      var eraser = this.getEraser();
      return eraser ? eraser._objects[0].clipPath : this.clipPath;
    },

    /**
     * Set the object's actual clip path regardless of clipping done by erasing
     * @param {fabric.Object} [clipPath]
     */
    setClipPath: function (clipPath) {
      var eraser = this.getEraser();
      var target = eraser ? eraser._objects[0] : this;
      target.set('clipPath', clipPath);
      this.set('dirty', true);
    },

    /**
     * Updates eraser size and position to match object's size
     * @private
     * @param {Object} [dimensions] uses object's dimensions if unspecified
     * @param {number} [dimensions.width]
     * @param {number} [dimensions.height]
     * @param {boolean} [center=false] postion the eraser relative to object's center or it's top left corner
     */
    _updateEraserDimensions: function (dimensions, center) {
      var eraser = this.getEraser();
      if (eraser) {
        var rect = eraser._objects[0];
        var eraserSize = { width: rect.width, height: rect.height };
        var size = this._getNonTransformedDimensions();
        var newSize = fabric.util.object.extend({ width: size.x, height: size.y }, dimensions);
        if (eraserSize.width === newSize.width && eraserSize.height === newSize.height) {
          return;
        }
        var offset = new fabric.Point((eraserSize.width - newSize.width) / 2, (eraserSize.height - newSize.height) / 2);
        eraser.set(newSize);
        eraser.setPositionByOrigin(new fabric.Point(0, 0), 'center', 'center');
        rect.set(newSize);
        eraser.set('dirty', true);
        if (!center) {
          eraser.getObjects('path').forEach(function (path) {
            path.setPositionByOrigin(path.getCenterPoint().add(offset), 'center', 'center');
          });
        }
        this.setCoords();
      }
    },

    _set: function (key, value) {
      __set.call(this, key, value);
      if (key === 'width' || key === 'height') {
        this._updateEraserDimensions();
      }
      return this;
    },

    render: function (ctx) {
      this._updateEraserDimensions();
      _render.call(this, ctx);
    },

    /**
     * Returns an object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} Object representation of an instance
     */
    toObject: function (additionalProperties) {
      return _toObject.call(this, ['erasable'].concat(additionalProperties));
    },

    /**
     * use <mask> to achieve erasing for svg
     * credit: https://travishorn.com/removing-parts-of-shapes-in-svg-b539a89e5649
     * @param {Function} reviver
     * @returns {string} markup
     */
    eraserToSVG: function (options) {
      var eraser = this.getEraser();
      if (eraser) {
        var fill = eraser._objects[0].fill;
        eraser._objects[0].fill = 'white';
        eraser.clipPathId = 'CLIPPATH_' + fabric.Object.__uid++;
        var commons = [
          'id="' + eraser.clipPathId + '"',
          /*options.additionalTransform ? ' transform="' + options.additionalTransform + '" ' : ''*/
        ].join(' ');
        var objectMarkup = ['<defs>', '<mask ' + commons + ' >', eraser.toSVG(options.reviver), '</mask>', '</defs>'];
        eraser._objects[0].fill = fill;
        return objectMarkup.join('\n');
      }
      return '';
    },

    /**
     * use <mask> to achieve erasing for svg, override <clipPath>
     * @param {string[]} objectMarkup
     * @param {Object} options
     * @returns
     */
    _createBaseSVGMarkup: function (objectMarkup, options) {
      var eraser = this.getEraser();
      if (eraser) {
        var eraserMarkup = this.eraserToSVG(options);
        this.clipPath = null;
        var markup = __createBaseSVGMarkup.call(this, objectMarkup, options);
        this.clipPath = eraser;
        return [
          eraserMarkup,
          markup.replace('>', 'mask="url(#' + eraser.clipPathId + ')" >')
        ].join('\n');
      }
      else {
        return __createBaseSVGMarkup.call(this, objectMarkup, options);
      }
    }
  });

  var __restoreObjectsState = fabric.Group.prototype._restoreObjectsState;
  var _groupToObject = fabric.Group.prototype.toObject;
  var __getBounds = fabric.Group.prototype._getBounds;
  fabric.util.object.extend(fabric.Group.prototype, {

    /**
     * If group is an eraser then dimensions should not change when paths are added or removed and should remain the size of the base rect
     * @private
     */
    _getBounds: function (aX, aY, onlyWidthHeight) {
      if (this.eraser) {
        this.width = this._objects[0].width;
        this.height = this._objects[0].height;
        return;
      }
      __getBounds.call(this, aX, aY, onlyWidthHeight);
    },

    /**
     * @private
     * @param {fabric.Path} path
     */
    _addEraserPathToObjects: function (path) {
      this._objects.forEach(function (object) {
        fabric.EraserBrush.prototype._addPathToObjectEraser.call(
          fabric.EraserBrush.prototype,
          object,
          path
        );
      });
    },

    /**
     * Applies the group's eraser to its objects
     * @tutorial {@link http://fabricjs.com/erasing#erasable_property}
     */
    applyEraserToObjects: function () {
      var _this = this;
      if (this.getEraser()) {
        var transform = _this.calcTransformMatrix();
        _this.getEraser().clone(function (eraser) {
          var clipPath = eraser._objects[0].clipPath;
          _this.clipPath = clipPath ? clipPath : undefined;
          eraser.getObjects('path')
            .forEach(function (path) {
              //  first we transform the path from the group's coordinate system to the canvas'
              var originalTransform = fabric.util.multiplyTransformMatrices(
                transform,
                path.calcTransformMatrix()
              );
              fabric.util.applyTransformToObject(path, originalTransform);
              if (clipPath) {
                clipPath.clone(function (_clipPath) {
                  fabric.EraserBrush.prototype.applyClipPathToPath.call(
                    fabric.EraserBrush.prototype,
                    path,
                    _clipPath,
                    transform
                  );
                  _this._addEraserPathToObjects(path);
                });
              }
              else {
                _this._addEraserPathToObjects(path);
              }
            });
        });
      }
    },

    /**
     * Propagate the group's eraser to its objects, crucial for proper functionality of the eraser within the group and nested objects.
     * @private
     */
    _restoreObjectsState: function () {
      this.erasable === true && this.applyEraserToObjects();
      return __restoreObjectsState.call(this);
    },

    /**
     * Returns an object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} Object representation of an instance
     */
    toObject: function (additionalProperties) {
      return _groupToObject.call(this, ['eraser'].concat(additionalProperties));
    }
  });

  var __onResize = fabric.Canvas.prototype._onResize;
  fabric.util.object.extend(fabric.Canvas.prototype, {
    /**
     * Used by {@link #renderAll}
     * @returns boolean
     */
    isErasing: function () {
      return (
        this.isDrawingMode &&
        this.freeDrawingBrush &&
        this.freeDrawingBrush.type === 'eraser' &&
        this.freeDrawingBrush._isErasing
      );
    },

    _onResize: function () {
      __onResize.call(this);
      var newSize = { width: this.width, height: this.height };
      var needsRendering = false;
      if (typeof this.backgroundColor === 'object' && this.backgroundColor.getEraser) {
        this.backgroundColor.set(newSize);
        needsRendering = true;
      }
      if (typeof this.overlayColor === 'object' && this.overlayColor.getEraser) {
        this.overlayColor.set(newSize);
        needsRendering = true;
      }
      needsRendering && this.requestRenderAll();
    },

    /**
     * While erasing, the brush is in charge of rendering the canvas
     * It uses both layers to achieve diserd erasing effect
     *
     * @returns fabric.Canvas
     */
    renderAll: function () {
      if (this.contextTopDirty && !this._groupSelector && !this.isDrawingMode) {
        this.clearContext(this.contextTop);
        this.contextTopDirty = false;
      }
      // while erasing the brush is in charge of rendering the canvas so we return
      if (this.isErasing()) {
        this.freeDrawingBrush._render();
        return;
      }
      if (this.hasLostContext) {
        this.renderTopLayer(this.contextTop);
      }
      var canvasToDrawOn = this.contextContainer;
      this.renderCanvas(canvasToDrawOn, this._chooseObjectsToRender());
      return this;
    }
  });

  /**
   * EraserBrush class
   * Supports selective erasing meaning that only erasable objects are affected by the eraser brush.
   * In order to support selective erasing all non erasable objects are rendered on the main/bottom ctx
   * while the entire canvas is rendered on the top ctx.
   * Canvas background/overlay image/color are handled as well.
   * When erasing occurs, the path clips the top ctx and reveals the bottom ctx.
   * This achieves the desired effect of seeming to erase only erasable objects.
   * After erasing is done the created path is added to all intersected objects' `clipPath` property.
   *
   * @tutorial {@link http://fabricjs.com/erasing}
   * @class fabric.EraserBrush
   * @extends fabric.PencilBrush
   */
  fabric.EraserBrush = fabric.util.createClass(
    fabric.PencilBrush,
    /** @lends fabric.EraserBrush.prototype */ {
      type: 'eraser',

      /**
       * Indicates that the ctx is ready and rendering can begin.
       * Used to prevent a race condition caused by {@link fabric.EraserBrush#onMouseMove} firing before {@link fabric.EraserBrush#onMouseDown} has completed
       *
       * @private
       */
      _ready: false,

      /**
       * @private
       */
      _drawOverlayOnTop: false,

      /**
       * @private
       */
      _isErasing: false,

      initialize: function (canvas) {
        this.callSuper('initialize', canvas);
        this._renderBound = this._render.bind(this);
        this.render = this.render.bind(this);
      },

      /**
       * Used to hide a drawable from the rendering process
       * @param {fabric.Object} object
       */
      hideObject: function (object) {
        if (object) {
          object._originalOpacity = object.opacity;
          object.set({ opacity: 0 });
        }
      },

      /**
       * Restores hiding an object
       * {@link fabric.EraserBrush#hideObject}
       * @param {fabric.Object} object
       */
      restoreObjectVisibility: function (object) {
        if (object && object._originalOpacity) {
          object.set({ opacity: object._originalOpacity });
          object._originalOpacity = undefined;
        }
      },

      /**
       *
       * @private
       * @param {fabric.Object} object
       * @returns boolean
       */
      _isErasable: function (object) {
        return object.erasable !== false;
      },

      /**
       * Drawing Logic For background drawables: (`backgroundImage`, `backgroundColor`)
       * 1. if erasable = true:
       *    we need to hide the drawable on the bottom ctx so when the brush is erasing it will clip the top ctx and reveal white space underneath
       * 2. if erasable = false:
       *    we need to draw the drawable only on the bottom ctx so the brush won't affect it
       * @param {'bottom' | 'top' | 'overlay'} layer
       */
      prepareCanvasBackgroundForLayer: function (layer) {
        if (layer === 'overlay') {
          return;
        }
        var canvas = this.canvas;
        var image = canvas.get('backgroundImage');
        var color = canvas.get('backgroundColor');
        var erasablesOnLayer = layer === 'top';
        if (image && this._isErasable(image) === !erasablesOnLayer) {
          this.hideObject(image);
        }
        if (color && this._isErasable(color) === !erasablesOnLayer) {
          this.hideObject(color);
        }
      },

      /**
       * Drawing Logic For overlay drawables (`overlayImage`, `overlayColor`)
       * We must draw on top ctx to be on top of visible canvas
       * 1. if erasable = true:
       *    we need to draw the drawable on the top ctx as a normal object
       * 2. if erasable = false:
       *    we need to draw the drawable on top of the brush,
       *    this means we need to repaint for every stroke
       *
       * @param {'bottom' | 'top' | 'overlay'} layer
       * @returns boolean render overlay above brush
       */
      prepareCanvasOverlayForLayer: function (layer) {
        var canvas = this.canvas;
        var image = canvas.get('overlayImage');
        var color = canvas.get('overlayColor');
        if (layer === 'bottom') {
          this.hideObject(image);
          this.hideObject(color);
          return false;
        };
        var erasablesOnLayer = layer === 'top';
        var renderOverlayOnTop = (image && !this._isErasable(image)) || (color && !this._isErasable(color));
        if (image && this._isErasable(image) === !erasablesOnLayer) {
          this.hideObject(image);
        }
        if (color && this._isErasable(color) === !erasablesOnLayer) {
          this.hideObject(color);
        }
        return renderOverlayOnTop;
      },

      /**
       * @private
       */
      restoreCanvasDrawables: function () {
        var canvas = this.canvas;
        this.restoreObjectVisibility(canvas.get('backgroundImage'));
        this.restoreObjectVisibility(canvas.get('backgroundColor'));
        this.restoreObjectVisibility(canvas.get('overlayImage'));
        this.restoreObjectVisibility(canvas.get('overlayColor'));
      },

      /**
       * @private
       * This is designed to support erasing a group with both erasable and non-erasable objects.
       * Iterates over collections to allow nested selective erasing.
       * Used by {@link fabric.EraserBrush#prepareCanvasObjectsForLayer}
       * to prepare the bottom layer by hiding erasable nested objects
       *
       * @param {fabric.Collection} collection
       */
      prepareCollectionTraversal: function (collection) {
        var _this = this;
        collection.forEachObject(function (obj) {
          if (obj.forEachObject && obj.erasable === 'deep') {
            _this.prepareCollectionTraversal(obj);
          }
          else if (obj.erasable) {
            _this.hideObject(obj);
          }
        });
      },

      /**
       * @private
       * Used by {@link fabric.EraserBrush#prepareCanvasObjectsForLayer}
       * to reverse the action of {@link fabric.EraserBrush#prepareCollectionTraversal}
       *
       * @param {fabric.Collection} collection
       */
      restoreCollectionTraversal: function (collection) {
        var _this = this;
        collection.forEachObject(function (obj) {
          if (obj.forEachObject && obj.erasable === 'deep') {
            _this.restoreCollectionTraversal(obj);
          }
          else {
            _this.restoreObjectVisibility(obj);
          }
        });
      },

      /**
       * @private
       * This is designed to support erasing a group with both erasable and non-erasable objects.
       *
       * @param {'bottom' | 'top' | 'overlay'} layer
       */
      prepareCanvasObjectsForLayer: function (layer) {
        if (layer !== 'bottom') { return; }
        this.prepareCollectionTraversal(this.canvas);
      },

      /**
       * @private
       * @param {'bottom' | 'top' | 'overlay'} layer
       */
      restoreCanvasObjectsFromLayer: function (layer) {
        if (layer !== 'bottom') { return; }
        this.restoreCollectionTraversal(this.canvas);
      },

      /**
       * @private
       * @param {'bottom' | 'top' | 'overlay'} layer
       * @returns boolean render overlay above brush
       */
      prepareCanvasForLayer: function (layer) {
        this.prepareCanvasBackgroundForLayer(layer);
        this.prepareCanvasObjectsForLayer(layer);
        return this.prepareCanvasOverlayForLayer(layer);
      },

      /**
      * @private
      * @param {'bottom' | 'top' | 'overlay'} layer
      */
      restoreCanvasFromLayer: function (layer) {
        this.restoreCanvasDrawables();
        this.restoreCanvasObjectsFromLayer(layer);
      },

      /**
       * Render all non-erasable objects on bottom layer with the exception of overlays to avoid being clipped by the brush.
       * Groups are rendered for nested selective erasing, non-erasable objects are visible while erasable objects are not.
       */
      renderBottomLayer: function () {
        var canvas = this.canvas;
        this.prepareCanvasForLayer('bottom');
        canvas.renderCanvas(
          canvas.getContext(),
          canvas.getObjects().filter(function (obj) {
            return !obj.erasable || obj.forEachObject;
          })
        );
        this.restoreCanvasFromLayer('bottom');
      },

      /**
       * 1. Render all objects on top layer, erasable and non-erasable
       *    This is important for cases such as overlapping objects, the background object erasable and the foreground object not erasable.
       * 2. Render the brush
       */
      renderTopLayer: function () {
        var canvas = this.canvas;
        this._drawOverlayOnTop = this.prepareCanvasForLayer('top');
        canvas.renderCanvas(
          canvas.contextTop,
          canvas.getObjects()
        );
        this.callSuper('_render');
        this.restoreCanvasFromLayer('top');
      },

      /**
       * Render all non-erasable overlays on top of the brush so that they won't get erased
       */
      renderOverlay: function () {
        this.prepareCanvasForLayer('overlay');
        var canvas = this.canvas;
        var ctx = canvas.contextTop;
        this._saveAndTransform(ctx);
        canvas._renderOverlay(ctx);
        ctx.restore();
        this.restoreCanvasFromLayer('overlay');
      },

      /**
       * @extends @class fabric.BaseBrush
       * @param {CanvasRenderingContext2D} ctx
       */
      _saveAndTransform: function (ctx) {
        this.callSuper('_saveAndTransform', ctx);
        ctx.globalCompositeOperation = 'destination-out';
      },

      /**
       * We indicate {@link fabric.PencilBrush} to repaint itself if necessary
       * @returns
       */
      needsFullRender: function () {
        return this.callSuper('needsFullRender') || this._drawOverlayOnTop;
      },

      /**
       *
       * @param {fabric.Point} pointer
       * @param {fabric.IEvent} options
       * @returns
       */
      onMouseDown: function (pointer, options) {
        if (!this.canvas._isMainEvent(options.e)) {
          return;
        }
        this._prepareForDrawing(pointer);
        // capture coordinates immediately
        // this allows to draw dots (when movement never occurs)
        this._captureDrawingPath(pointer);

        this._isErasing = true;
        this.canvas.fire('erasing:start');
        this._ready = true;
        this._render();
      },

      /**
       * Rendering is done in 4 steps:
       * 1. Draw all non-erasable objects on bottom ctx with the exception of overlays {@link fabric.EraserBrush#renderBottomLayer}
       * 2. Draw all objects on top ctx including erasable drawables {@link fabric.EraserBrush#renderTopLayer}
       * 3. Draw eraser {@link fabric.PencilBrush#_render} at {@link fabric.EraserBrush#renderTopLayer}
       * 4. Draw non-erasable overlays {@link fabric.EraserBrush#renderOverlay}
       *
       * @param {fabric.Canvas} canvas
       */
      _render: function () {
        if (!this._ready) {
          return;
        }
        this.isRendering = 1;
        this.renderBottomLayer();
        this.renderTopLayer();
        this.renderOverlay();
        this.isRendering = 0;
      },

      /**
       * @public
       */
      render: function () {
        if (this._isErasing) {
          if (this.isRendering) {
            this.isRendering = fabric.util.requestAnimFrame(this._renderBound);
          }
          else {
            this._render();
          }
          return true;
        }
        return false;
      },

      /**
       * Utility to apply a clip path to a path.
       * Used to preserve clipping on eraser paths in nested objects.
       * Called when a group has a clip path that should be applied to the path before applying erasing on the group's objects.
       * @param {fabric.Path} path The eraser path
       * @param {fabric.Object} clipPath The clipPath to apply to the path
       * @param {number[]} clipPathContainerTransformMatrix The transform matrix of the object that the clip path belongs to
       * @returns {fabric.Path} path with clip path
       */
      applyClipPathToPath: function (path, clipPath, clipPathContainerTransformMatrix) {
        var pathTransform = path.calcTransformMatrix();
        var clipPathTransform = clipPath.calcTransformMatrix();
        var transform = fabric.util.multiplyTransformMatrices(
          fabric.util.invertTransform(pathTransform),
          clipPathContainerTransformMatrix
        );
        fabric.util.applyTransformToObject(
          clipPath,
          fabric.util.multiplyTransformMatrices(
            transform,
            clipPathTransform
          )
        );
        path.clipPath = clipPath;
        return path;
      },

      /**
       * Utility to apply a clip path to a path.
       * Used to preserve clipping on eraser paths in nested objects.
       * Called when a group has a clip path that should be applied to the path before applying erasing on the group's objects.
       * @param {fabric.Path} path The eraser path
       * @param {fabric.Object} object The clipPath to apply to path belongs to object
       * @param {Function} callback Callback to be invoked with the cloned path after applying the clip path
       */
      clonePathWithClipPath: function (path, object, callback) {
        var objTransform = object.calcTransformMatrix();
        var clipPath = object.getClipPath();
        var _this = this;
        path.clone(function (_path) {
          clipPath.clone(function (_clipPath) {
            callback(_this.applyClipPathToPath(_path, _clipPath, objTransform));
          });
        });
      },

      /**
       * Adds path to existing clipPath of object
       *
       * @param {fabric.Object} obj
       * @param {fabric.Path} path
       */
      _addPathToObjectEraser: function (obj, path) {
        var clipObject;
        var _this = this;
        //  object is collection, i.e group
        if (obj.forEachObject && obj.erasable === 'deep') {
          var targets = obj._objects.filter(function (_obj) {
            return _obj.erasable;
          });
          if (targets.length > 0 && obj.clipPath) {
            this.clonePathWithClipPath(path, obj, function (_path) {
              targets.forEach(function (_obj) {
                _this._addPathToObjectEraser(_obj, _path);
              });
            });
          }
          else if (targets.length > 0) {
            targets.forEach(function (_obj) {
              _this._addPathToObjectEraser(_obj, path);
            });
          }
          return;
        }
        if (!obj.getEraser()) {
          var size = obj._getNonTransformedDimensions();
          var rect = new fabric.Rect({
            width: size.x,
            height: size.y,
            clipPath: obj.clipPath,
            originX: 'center',
            originY: 'center'
          });
          clipObject = new fabric.Group([rect], {
            eraser: true
          });
        }
        else {
          clipObject = obj.clipPath;
        }

        path.clone(function (path) {
          path.globalCompositeOperation = 'destination-out';
          // http://fabricjs.com/using-transformations
          var desiredTransform = fabric.util.multiplyTransformMatrices(
            fabric.util.invertTransform(
              obj.calcTransformMatrix()
            ),
            path.calcTransformMatrix()
          );
          fabric.util.applyTransformToObject(path, desiredTransform);
          clipObject.addWithUpdate(path);
          obj.set({
            clipPath: clipObject,
            dirty: true
          });
        });
      },

      /**
       * Add the eraser path to canvas drawables' clip paths
       *
       * @param {fabric.Canvas} source
       * @param {fabric.Canvas} path
       * @returns {Object} canvas drawables that were erased by the path
       */
      applyEraserToCanvas: function (path) {
        var canvas = this.canvas;
        var drawables = {};
        [
          'backgroundImage',
          'backgroundColor',
          'overlayImage',
          'overlayColor',
        ].forEach(function (prop) {
          var drawable = canvas[prop];
          if (drawable && drawable.erasable) {
            this._addPathToObjectEraser(drawable, path);
            drawables[prop] = drawable;
          }
        }, this);
        return drawables;
      },

      /**
       * On mouseup after drawing the path on contextTop canvas
       * we use the points captured to create an new fabric path object
       * and add it to every intersected erasable object.
       */
      _finalizeAndAddPath: function () {
        var ctx = this.canvas.contextTop, canvas = this.canvas;
        ctx.closePath();
        if (this.decimate) {
          this._points = this.decimatePoints(this._points, this.decimate);
        }

        // clear
        canvas.clearContext(canvas.contextTop);
        this._isErasing = false;

        var pathData = this._points && this._points.length > 1 ?
          this.convertPointsToSVGPath(this._points) :
          null;
        if (!pathData || this._isEmptySVGPath(pathData)) {
          canvas.fire('erasing:end');
          // do not create 0 width/height paths, as they are
          // rendered inconsistently across browsers
          // Firefox 4, for example, renders a dot,
          // whereas Chrome 10 renders nothing
          canvas.requestRenderAll();
          return;
        }

        var path = this.createPath(pathData);
        canvas.fire('before:path:created', { path: path });

        // finalize erasing
        var drawables = this.applyEraserToCanvas(path);
        var _this = this;
        var targets = [];
        canvas.forEachObject(function (obj) {
          if (obj.erasable && obj.intersectsWithObject(path, true)) {
            _this._addPathToObjectEraser(obj, path);
            targets.push(obj);
          }
        });

        canvas.fire('erasing:end', { path: path, targets: targets, drawables: drawables });

        canvas.requestRenderAll();
        path.setCoords();
        this._resetShadow();

        // fire event 'path' created
        canvas.fire('path:created', { path: path });
      }
    }
  );

  /** ERASER_END */
})();
