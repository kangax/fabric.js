(function(global) {

  'use strict';

  var fabric = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend,
      min = fabric.util.array.min,
      max = fabric.util.array.max,
      toFixed = fabric.util.toFixed,
      NUM_FRACTION_DIGITS = fabric.Object.NUM_FRACTION_DIGITS;

  if (fabric.Polyline) {
    fabric.warn('fabric.Polyline is already defined');
    return;
  }

  var cacheProperties = fabric.Object.prototype.cacheProperties.concat();
  cacheProperties.push('points');

  /**
   * Polyline class
   * @class fabric.Polyline
   * @extends fabric.Object
   * @see {@link fabric.Polyline#initialize} for constructor definition
   */
  fabric.Polyline = fabric.util.createClass(fabric.Object, /** @lends fabric.Polyline.prototype */ {

    /**
     * Type of an object
     * @type String
     * @default
     */
    type: 'polyline',

    /**
     * Points array
     * @type Array
     * @default
     */
    points: null,

    cacheProperties: cacheProperties,

    /**
     * Constructor
     * @param {Array} points Array of points (where each point is an object with x and y)
     * @param {Object} [options] Options object
     * @return {fabric.Polyline} thisArg
     * @example
     * var poly = new fabric.Polyline([
     *     { x: 10, y: 10 },
     *     { x: 50, y: 30 },
     *     { x: 40, y: 70 },
     *     { x: 60, y: 50 },
     *     { x: 100, y: 150 },
     *     { x: 40, y: 100 }
     *   ], {
     *   stroke: 'red',
     *   left: 100,
     *   top: 100
     * });
     */
    initialize: function(points, options) {
      options = options || {};
      this.points = points || [];
      this.callSuper('initialize', options);
      var calcDim = this._calcDimensions();
      if (typeof options.left === 'undefined') {
        this.left = calcDim.left;
      }
      if (typeof options.top === 'undefined') {
        this.top = calcDim.top;
      }
      this.width = calcDim.width;
      this.height = calcDim.height;
      this.pathOffset = {
        x: calcDim.left + this.width / 2,
        y: calcDim.top + this.height / 2
      };
    },

    /**
     * Calculate the polygon min and max point from points array,
     * returning an object with left, top, widht, height to measure the
     * polygon size
     * @return {Object} object.left X coordinate of the polygon leftmost point
     * @return {Object} object.top Y coordinate of the polygon topmost point
     * @return {Object} object.width distance between X coordinates of the polygon leftmost and rightmost point
     * @return {Object} object.height distance between Y coordinates of the polygon topmost and bottommost point
     * @private
     */
    _calcDimensions: function() {

      var points = this.points,
          minX = min(points, 'x') || 0,
          minY = min(points, 'y') || 0,
          maxX = max(points, 'x') || 0,
          maxY = max(points, 'y') || 0,
          width = (maxX - minX),
          height = (maxY - minY);

      return {
        left: minX,
        top: minY,
        width: width,
        height: height
      };
    },

    /**
     * Returns object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} Object representation of an instance
     */
    toObject: function(propertiesToInclude) {
      return extend(this.callSuper('toObject', propertiesToInclude), {
        points: this.points.concat()
      });
    },

    /* _TO_SVG_START_ */
    /**
     * Returns svg representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    toSVG: function(reviver) {
      var points = [], diffX = this.pathOffset.x, diffY = this.pathOffset.y,
          markup = this._createBaseSVGMarkup();

      for (var i = 0, len = this.points.length; i < len; i++) {
        points.push(
          toFixed(this.points[i].x - diffX, NUM_FRACTION_DIGITS), ',',
          toFixed(this.points[i].y - diffY, NUM_FRACTION_DIGITS), ' '
        );
      }
      markup.push(
        '<', this.type, ' ', this.getSvgId(),
          'points="', points.join(''),
          '" style="', this.getSvgStyles(),
          '" transform="', this.getSvgTransform(),
          ' ', this.getSvgTransformMatrix(),
        '"/>\n'
      );

      return reviver ? reviver(markup.join('')) : markup.join('');
    },
    /* _TO_SVG_END_ */


    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    commonRender: function(ctx) {
      var point, len = this.points.length,
          x = this.pathOffset.x,
          y = this.pathOffset.y;

      if (!len || isNaN(this.points[len - 1].y)) {
        // do not draw if no points or odd points
        // NaN comes from parseFloat of a empty string in parser
        return false;
      }
      ctx.beginPath();
      ctx.moveTo(this.points[0].x - x, this.points[0].y - y);
      for (var i = 0; i < len; i++) {
        point = this.points[i];
        ctx.lineTo(point.x - x, point.y - y);
      }
      return true;
    },

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render: function(ctx) {
      if (!this.commonRender(ctx)) {
        return;
      }
      this._renderPaintInOrder(ctx);
    },

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderDashedStroke: function(ctx) {
      var p1, p2;

      ctx.beginPath();
      for (var i = 0, len = this.points.length; i < len; i++) {
        p1 = this.points[i];
        p2 = this.points[i + 1] || p1;
        fabric.util.drawDashedLine(ctx, p1.x, p1.y, p2.x, p2.y, this.strokeDashArray);
      }
    },

    /**
     * Returns complexity of an instance
     * @return {Number} complexity of this instance
     */
    complexity: function() {
      return this.get('points').length;
    }
  });

  /* _FROM_SVG_START_ */
  /**
   * List of attribute names to account for when parsing SVG element (used by {@link fabric.Polyline.fromElement})
   * @static
   * @memberOf fabric.Polyline
   * @see: http://www.w3.org/TR/SVG/shapes.html#PolylineElement
   */
  fabric.Polyline.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat();

  /**
   * Returns fabric.Polyline instance from an SVG element
   * @static
   * @memberOf fabric.Polyline
   * @param {SVGElement} element Element to parser
   * @param {Function} callback callback function invoked after parsing
   * @param {Object} [options] Options object
   */
  fabric.Polyline.fromElement = function(element, callback, options) {
    if (!element) {
      return callback(null);
    }
    options || (options = { });

    var points = fabric.parsePointsAttribute(element.getAttribute('points')),
        parsedAttributes = fabric.parseAttributes(element, fabric.Polyline.ATTRIBUTE_NAMES);

    callback(new fabric.Polyline(points, fabric.util.object.extend(parsedAttributes, options)));
  };
  /* _FROM_SVG_END_ */

  /**
   * Returns fabric.Polyline instance from an object representation
   * @static
   * @memberOf fabric.Polyline
   * @param {Object} object Object to create an instance from
   * @param {Function} [callback] Callback to invoke when an fabric.Path instance is created
   */
  fabric.Polyline.fromObject = function(object, callback) {
    return fabric.Object._fromObject('Polyline', object, callback, 'points');
  };

})(typeof exports !== 'undefined' ? exports : this);
