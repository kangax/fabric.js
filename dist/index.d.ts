import { StaticCanvas } from './../index.d';
export as namespace fabric;

//#region Globals

export const isLikelyNode: boolean;
export const isTouchSupported: boolean;

/**
 * Pixel per Inch as a default value set to 96. Can be changed for more realistic conversion.
 */
export var DPI: number;

/**
 * Pixel limit for cache canvases. 1Mpx , 4Mpx should be fine.
 */
export var perfLimitSizeTotal: number;

/**
 * Pixel limit for cache canvases width or height. IE fixes the maximum at 5000
 */
export let maxCacheSideLimit: number;

/**
 * Lowest pixel limit for cache canvases, set at 256PX
 */
export let minCacheSideLimit: number;

/**
 * Cache Object for widths of chars in text rendering.
 */
export const charWidthsCache: any;

/**
 * if webgl is enabled and available, textureSize will determine the size
 * of the canvas backend
 */
export let textureSize: number;

/**
 * Enable webgl for filtering picture is available
 * A filtering backend will be initialized, this will both take memory and
 * time since a default 2048x2048 canvas will be created for the gl context
 */
export let enableGLFiltering: boolean;

/**
 * Device Pixel Ratio
 * @see https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/HTML-canvas-guide/SettingUptheCanvas/SettingUptheCanvas.html
 */
export const devicePixelRatio: number;

/**
 * Browser-specific constant to adjust CanvasRenderingContext2D.shadowBlur value,
 * which is unitless and not rendered equally across browsers.
 *
 * Values that work quite well (as of October 2017) are:
 * - Chrome: 1.5
 * - Edge: 1.75
 * - Firefox: 0.9
 * - Safari: 0.95
 */
export let browserShadowBlurConstant: number;

//#endregion

//#region Canvas
export interface StaticCanvas extends CommonMethods, StaticCanvasOptions, Observable<StaticCanvas> {};
export class StaticCanvas  {
    constructor(options?: StaticCanvasOptions);

    onBeforeScaleRotate() : Function;
    getRetinaScaling() : number;
    calcOffset(): StaticCanvas;
    setOverlayImagen(image: string | Image, callback?: (image: Image) => void, options?: ImageOptions): StaticCanvas;

    setBackgroundImage(image: string | Image, callback?: (image: Image) => void, options?: ImageOptions): StaticCanvas;

    setOverlayColor(overlayColor: string, callback?: () => void): StaticCanvas;
    setBackgroundColor(backgroundColor: string, callback?: () => void): StaticCanvas;

    getWidth(): number;
    getHeight(): number;

    setWidth(value: number, options: { cssOnly?: boolean; backstoreOnly?: boolean }): StaticCanvas;

    setDimensions(dimensions: any, options: { cssOnly?: boolean; backstoreOnly?: boolean }): StaticCanvas; // todo dimensions

    getZoom(): number;
    setViewportTransform(vpt: any) : StaticCanvas; // todo
    zoomToPoint(point: Point, value: number) : StaticCanvas;
    setZoom(value: number) : StaticCanvas;
    absolutePan(point: Point) : StaticCanvas;
    relativePan(point: Point) : StaticCanvas;
    getElement(): any; // todo
    clearContext(ctx: any): StaticCanvas; // todo
    getContext(): any;
    clear(): StaticCanvas;
    renderAll(): StaticCanvas;
    renderAndReset(): void;
    requestRenderAll(): StaticCanvas;
    calcViewportBoundaries(): { tl: Point, br: Point, tr: Point, bl: Point };
    renderCanvas(ctx: any, objects: any): void; // todo
    getCenter(): { top: number, left: number };
    centerObjectH(object: Object) : StaticCanvas;
    centerObjectV(object: Object) : StaticCanvas;
    centerObject(object: Object) : StaticCanvas;
    viewportCenterObject(object: Object) : StaticCanvas;
    viewportCenterObjectH(object: Object) : StaticCanvas;
    viewportCenterObjectV(object: Object) : StaticCanvas;
    getVpCenter(): Point;

    toDatalessJSON<T extends keyof this>(propertiesToInclude: (keyof T)[]): any; //todo
    toObject<T extends keyof this>(propertiesToInclude: (keyof T)[]): any; //todo
    toDatalessObject<T extends keyof this>(propertiesToInclude: (keyof T)[]): any; //todo

    svgViewportTransformation: boolean;
    toSVG(options: any, reviver: any): string; // todo
    createSVGRefElementsMarkup() : string;
    createSVGFontFacesMarkup() : string;
    sendToBack(object: Object) : StaticCanvas;
    bringToFront(object: Object) : StaticCanvas;
    sendBackwards(object: Object, intersecting: any) : StaticCanvas;
    bringForward(object: Object, intersecting: any) : StaticCanvas;
    moveTo:(object: Object, index: number) : StaticCanvas; // todo return value?
    dispose() : StaticCanvas;
    toString(): string;
}

//#endregion

//#region Base object types

export interface CommonMethods {
  /**
   * Sets property to a given value. When changing position/dimension -related properties (left, top, scale, angle, etc.) `set` does not update position of object's borders/controls. If you need to update those, call `setCoords()`.
   * @param {Object} key Object (iterate over the object properties)
   */
  set(options: Partial<this>) : this;


  /**
   * Sets property to a given value. When changing position/dimension -related properties (left, top, scale, angle, etc.) `set` does not update position of object's borders/controls. If you need to update those, call `setCoords()`.
   */
  set<K extends keyof this>(key: K, value: this[K] | ((value: this[K]) => this[K])): this;

  /**
   * Toggles specified property from `true` to `false` or from `false` to `true`
   * @param {String} property Property to toggle
   */
  toggle(property: keyof this) : this;

  /**
   * Basic getter
   * @param {String} property Property name
   */
  get<K extends keyof this>(property: K): this[K];
}

export interface Object extends CommonMethods, ObjectOptions, Observable<Object> {};
export class Object  {
    constructor(options?: ObjectOptions);

     /**
     * Type of an object (rect, circle, path, etc.).
     * Note that this property is meant to be read-only and not meant to be modified.
     * If you modify, certain parts of Fabric (such as JSON loading) won't work correctly.
     */
    readonly type: string;

    /**
     * keeps the value of the last hovered coner during mouse move.
     * 0 is no corner, or 'mt', 'ml', 'mtr' etc..
     * It should be private, but there is no harm in using it as
     * a read-only property.
     */
    readonly __corner: number | string | any;

    /**
     * List of properties to consider when checking if state
     * of an object is changed (fabric.Object#hasStateChanged)
     * as well as for history (undo/redo) purposes
     */
    readonly stateProperties: string[];

    /**
     * List of properties to consider when checking if cache needs refresh
     * @type Array
     */
    readonly cacheProperties: string[];

    /**
     * Constructor
     * @param {Object} [options] Options object
     */
    initialize(options: TOptions): void; // todo

    /**
     * Sets object's properties from options
     * @param {Object} [options] Options object
     */
    setOptions(options: any): void; // todo

    /**
     * Transforms context when rendering an object
     * @param {CanvasRenderingContext2D} ctx Context
     */
    transform(ctx: any): void; // todo: use correct type

    /**
     * Returns an object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     */
    toObject<T extends keyof this>(propertiesToInclude: (keyof T)[]): {
            type:  T['type'];
            version: T['version'];
            originX: T['originX'];
            originY: T[']originY'];
            left: T['left'];
            top: T['top'];
            width: T['width'];
            height: T['height'];
            fill: T['fill'];
            stroke: T['stroke'];
            strokeWidth: T['strokeWidth'];
            strokeDashArray: T['strokeDashArray'];
            strokeLineCap: T['strokeLineCap'];
            strokeLineJoin: T['strokeLineJoin'];
            strokeMiterLimit: T['strokeMiterLimit'];
            scaleX: T['scaleX'];
            scaleY: T['scaleY'];
            angle: T['angle'];
            flipX: T['flipX'];
            flipY: T['flipY'];
            opacity: T['opacity'];
            shadow: T['shadow'];
            visible: T['visible'];
            clipTo: T['clipTo'];
            backgroundColor: T['backgroundColor'];
            fillRule: T['fillRule'];
            paintFirst: T['paintFirst'];
            globalCompositeOperation: T['globalCompositeOperation'];
            transformMatrix: T['transformMatrix'];
            skewX: T['skewX'];
            skewY: T['skewY'];
          }
    ;

    /**
     * Returns (dataless) object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} Object representation of an instance
     */
    toDatalessObject(propertiesToInclude: (keyof this)[]): any;


    /**
     * Returns a string representation of an instance
     * @return {String}
     */
    toString(): string;

    /**
     * Return the object scale factor counting also the group scaling
     * @return {Object} object with scaleX and scaleY properties
     */
    getObjectScaling(): { scaleX: number; scaleY: number; };

    /**
     * Return the object opacity counting also the group property
     * @return {Number}
     */
    getObjectOpacity(): number;

    /**
     * This callback function is called by the parent group of an object every
     * time a non-delegated property changes on the group. It is passed the key
     * and value as parameters. Not adding in this function's signature to avoid
     * Travis build error about unused variables.
     */
    abstract setOnGroup(): void; // todo ... parameters?

    /**
     * Retrieves viewportTransform from Object's canvas if possible
     * @method getViewportTransform
     */
    getViewportTransform(): boolean;

    /*
     * @private
     * return if the object would be visible in rendering
     */
    isNotVisible() : boolean;

    /**
     * Renders an object on a specified context
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    render(ctx: any): void; // todo: type

    /**
     * When set to `true`, force the object to have its own cache, even if it is inside a group
     * it may be needed when your object behave in a particular way on the cache and always needs
     * its own isolated canvas to render correctly.
     * Created to be overridden
     * since 1.7.12
     */
    abstract needsItsOwnCache(): boolean; // todo

    /**
     * Decide if the object should cache or not. Create its own cache level
     * objectCaching is a global flag, wins over everything
     * needsItsOwnCache should be used when the object drawing method requires
     * a cache step. None of the fabric classes requires it.
     * Generally you do not cache objects in groups because the group outside is cached.
     */
    shouldCache(): boolean;

    /**
     * Check if this object or a child object will cast a shadow
     * used by Group.shouldCache to know if child has a shadow recursively
     */
    willDrawShadow(): boolean;

    /**
     * Execute the drawing operation for an object on a specified context
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    drawObject(ctx: any): void; //todo type

    /**
     * Paint the cached copy of the object on the target context.
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    drawCacheOnCanvas(ctx: any); // todo type

    /**
     * Check if cache is dirty
     * @param {Boolean} skipCanvas skip canvas checks because this object is painted
     * on parent canvas.
     */
    isCacheDirty(skipCanvas: boolean): boolean;

    /**
     * Clones an instance, using a callback method will work for every object.
     * @param {Function} callback Callback is invoked with a clone as a first argument
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     */
    clone(callback: ((clone: this) => void), propertiesToInclude: (keyof this)[]);

    /**
     * Creates an instance of fabric.Image out of an object
     * @param {Function} callback callback, invoked with an instance as a first argument
     * @param {Object} [options] for clone as image, passed to toDataURL
     * @param {Boolean} [options.enableRetinaScaling] enable retina scaling for the cloned image
     * @return {fabric.Object} thisArg
     */
    cloneAsImage(callback: ((clone: this) => void), options?: {enableRetinaScaling: boolean}): this;

    /**
     * Converts an object into a data-url-like string
     * @param {Object} options Options object
     * @param {String} [options.format=png] The format of the output image. Either "jpeg" or "png"
     * @param {Number} [options.quality=1] Quality level (0..1). Only used for jpeg.
     * @param {Number} [options.multiplier=1] Multiplier to scale by
     * @param {Number} [options.left] Cropping left offset. Introduced in v1.2.14
     * @param {Number} [options.top] Cropping top offset. Introduced in v1.2.14
     * @param {Number} [options.width] Cropping width. Introduced in v1.2.14
     * @param {Number} [options.height] Cropping height. Introduced in v1.2.14
     * @param {Boolean} [options.enableRetinaScaling] Enable retina scaling for clone image. Introduce in 1.6.4
     * @return {String} Returns a data: URL containing a representation of the object in the format specified by options.format
     */
    toDataURL(options: {
      format: 'png' | 'jpeg' = 'png',
      quality: number = 1,
      multiplier: number = 1,
      left: number,
      top: number,
      width: number,
      height: number,
      enableRetinaScaling: boolean
      }): string;

    /**
     * Returns true if specified type is identical to the type of an instance
     * @param {String} type Type to check against
     */
    isType(type: string): boolean;

    /**
     * Returns complexity of an instance
     * @return {Number} complexity of this instance (is 1 unless subclassed)
     */
    complexity(): number;

    /**
     * Returns a JSON representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} JSON
     */
    toJSON(propertiesToInclude: (keyof this)[]): any; // todo

    /**
     * Sets gradient (fill or stroke) of an object
     * <b>Backwards incompatibility note:</b> This method was named "setGradientFill" until v1.1.0
     * @param {String} property Property name 'stroke' or 'fill'
     * @param {Object} [options] Options object
     * @param {String} [options.type] Type of gradient 'radial' or 'linear'
     * @param {Number} [options.x1=0] x-coordinate of start point
     * @param {Number} [options.y1=0] y-coordinate of start point
     * @param {Number} [options.x2=0] x-coordinate of end point
     * @param {Number} [options.y2=0] y-coordinate of end point
     * @param {Number} [options.r1=0] Radius of start point (only for radial gradients)
     * @param {Number} [options.r2=0] Radius of end point (only for radial gradients)
     * @param {Object} [options.colorStops] Color stops object eg. {0: 'ff0000', 1: '000000'}
     * @param {Object} [options.gradientTransform] transforMatrix for gradient
     * @return {fabric.Object} thisArg
     * @chainable
     * @see {@link http://jsfiddle.net/fabricjs/58y8b/|jsFiddle demo}
     * @example <caption>Set linear gradient</caption>
     * object.setGradient('fill', {
     *   type: 'linear',
     *   x1: -object.width / 2,
     *   y1: 0,
     *   x2: object.width / 2,
     *   y2: 0,
     *   colorStops: {
     *     0: 'red',
     *     0.5: '#005555',
     *     1: 'rgba(0,0,255,0.5)'
     *   }
     * });
     * canvas.renderAll();
     * @example <caption>Set radial gradient</caption>
     * object.setGradient('fill', {
     *   type: 'radial',
     *   x1: 0,
     *   y1: 0,
     *   x2: 0,
     *   y2: 0,
     *   r1: object.width / 2,
     *   r2: 10,
     *   colorStops: {
     *     0: 'red',
     *     0.5: '#005555',
     *     1: 'rgba(0,0,255,0.5)'
     *   }
     * });
     * canvas.renderAll();
     */
    setGradient(property: 'stroke' | 'fill',
                options: { type: 'linear'| 'radial' }, x1: number, y1: number,
                            x2: number, y2: number, r1?: number, r2?: number, colorStops: any, gradientTransform: any): this;
                            // todo colorStops and gradientTransfor

    /**
     * Sets pattern fill of an object
     * @param {Object} options Options object
     * @param {(String|HTMLImageElement)} options.source Pattern source
     * @param {String} [options.repeat=repeat] Repeat property of a pattern (one of repeat, repeat-x, repeat-y or no-repeat)
     * @param {Number} [options.offsetX=0] Pattern horizontal offset from object's left/top corner
     * @param {Number} [options.offsetY=0] Pattern vertical offset from object's left/top corner
     * @return {fabric.Object} thisArg
     * @chainable
     * @see {@link http://jsfiddle.net/fabricjs/QT3pa/|jsFiddle demo}
     * @example <caption>Set pattern</caption>
     * fabric.util.loadImage('http://fabricjs.com/assets/escheresque_ste.png', function(img) {
     *   object.setPatternFill({
     *     source: img,
     *     repeat: 'repeat'
     *   });
     *   canvas.renderAll();
     * });
     */
    setPatternFill(options: {source: string|HTMLImageElement, repeat: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat',
                              offsetX: number = 0, offsetY: number = 0}): this;

    /**
     * Sets {@link fabric.Object#shadow|shadow} of an object
     * @param {Object|String} [options] Options object or string (e.g. "2px 2px 10px rgba(0,0,0,0.2)")
     * @param {String} [options.color=rgb(0,0,0)] Shadow color
     * @param {Number} [options.blur=0] Shadow blur
     * @param {Number} [options.offsetX=0] Shadow horizontal offset
     * @param {Number} [options.offsetY=0] Shadow vertical offset
     * @return {fabric.Object} thisArg
     * @chainable
     * @see {@link http://jsfiddle.net/fabricjs/7gvJG/|jsFiddle demo}
     * @example <caption>Set shadow with string notation</caption>
     * object.setShadow('2px 2px 10px rgba(0,0,0,0.2)');
     * canvas.renderAll();
     * @example <caption>Set shadow with object notation</caption>
     * object.setShadow({
     *   color: 'red',
     *   blur: 10,
     *   offsetX: 20,
     *   offsetY: 20
     * });
     * canvas.renderAll();
     */
    setShadow(options: {color: string, blur: number,
    offsetX: number = 0, offsetY: number = 0} | string): this;

    /**
     * Sets "color" of an instance (alias of `set('fill', &hellip;)`)
     * @param {String} color Color value
     * @return {fabric.Object} thisArg
     * @chainable
     */
    setColor(color: string): this;

    /**
     * Sets "angle" of an instance with centered rotation
     * @param {Number} angle Angle value (in degrees)
     */
    rotate(angle: number): this;

    /**
     * Centers object horizontally on canvas to which it was added last.
     * You might need to call `setCoords` on an object after centering, to update controls area.
     */
    centerH(): this;

    /**
     * Centers object horizontally on current viewport of canvas to which it was added last.
     * You might need to call `setCoords` on an object after centering, to update controls area.
     */
    viewportCenterH(): this;

    /**
     * Centers object vertically on canvas to which it was added last.
     * You might need to call `setCoords` on an object after centering, to update controls area.
     */
    centerV(): this;

    /**
     * Centers object vertically on current viewport of canvas to which it was added last.
     * You might need to call `setCoords` on an object after centering, to update controls area.
     */
    viewportCenterV(): this;

    /**
     * Centers object vertically and horizontally on canvas to which is was added last
     * You might need to call `setCoords` on an object after centering, to update controls area.
     */
    center(): this;

    /**
     * Centers object on current viewport of canvas to which it was added last.
     * You might need to call `setCoords` on an object after centering, to update controls area.
     */
    viewportCenter(): this;

    /**
     * Returns coordinates of a pointer relative to an object
     * @param {Event} e Event to operate upon
     * @param {Object} [pointer] Pointer to operate upon (instead of event)
     * @return {Object} Coordinates of a pointer (x, y)
     */
    getLocalPointer(e: any, pointer: any): { x: number, y: number}; // todo
}

//#endregion

//#region simple elements
export class Point {
  type: string;
  constructor(x: number, y: number);
  add(that: Point) : Point;
  addEquals(that: Point) : Point;
  scalarAdd(scalar : number) : Point;
  scalarAddEquals(scalar: number) : Point;
  subtract(that: Point) : Point;
  subtractEquals(that: Point) : Point;
  scalarSubtract(scalar: number) : Point;
  scalarSubtractEquals(scalar: number) : Point;
  multiply(scalar: number) : Point;
  multiplyEquals(scalar: number) : Point;
  divide(scalar: number) : Point;
  divideEqual(scalar: number) : Point;
  eq(that: Point) : boolean;
  lt(that: Point) : boolean;
  lte(that: Point) : boolean;
  gt(that: Point) : boolean;
  gte(that: Point) : boolean;
  lerp(that: Point, t: number) : Point;
  distanceFrom(that: Point) : number;
  midPointFrom(that: Point) : Point;
  min(that: Point) : Point;
  max(that: Point) : Point;
  toString(): string;
  setXY(x: number, y: number):Point;
  setX(x:number) :Point;
  setY(y: number) : Point;
  setFromPoint(that : Point) : Point
  swap(that: Point) : void;
  clone() : Point;
}


//#region Shapes

export interface Circle extends Object, CircleOptions {};
export class Circle {
  constructor(options?: CircleOptions);

  getRadiusX() : number;

  getRadiusY() : number;

  setRadius(radius: number) : number;
}

export interface Triangle extends Object, TriangleOptions {};
export class Triangle {
  constructor(options?: TriangleOptions);
}

export interface Text extends Object, TextOptions {};
export class Text {
  constructor(text?: string, options?: TextOptions);
  getMeasuringContext(): any; // todo
  initDimensions(): void;
  enlargeSpaces(): void;
  isEndOfWrapping(): void;
  calcTextWidth(): number;
  getFontCache(decl: any): any; // todo
  getHeightOfChar(l: any, c: any): number; // todo
  measureLine(lineIndex: number): number;
  getHeightOfLine(lineIndex: number): number;
  calcTextHeight(): number;
  getLineWidth(lineIndex: number): number;
  getValueOfPropertyAt(lineIndex, charIndex, property): any; // todo
}

//#endregion

//#region options

interface ObjectOptions {
/**
     * Horizontal origin of transformation of an object (one of "left", "right", "center")
     * See http://jsfiddle.net/1ow02gea/244/ on how originX/originY affect objects in groups
     */
    originX?: 'left' | 'right' | 'center';

    /**
     * Vertical origin of transformation of an object (one of "top", "bottom", "center")
     * See http://jsfiddle.net/1ow02gea/244/ on how originX/originY affect objects in groups
     */
    originY?: 'top' | 'bottom' | 'center';

    /**
     * Top position of an object. Note that by default it's relative to object top. You can change this by setting originY={top/center/bottom}
     */
    top?: number;

    /**
     * Left position of an object. Note that by default it's relative to object left. You can change this by setting originX={left/center/right}
     */
    left?: number;

    /**
     * Object width
     */
    width?: number;

    /**
     * Object height
     */
    height?: number;

    /**
     * Object scale factor (horizontal)
     */
    scaleX?: number;

    /**
     * Object scale factor (vertical)
     */
    scaleY?: number;

    /**
     * When true, an object is rendered as flipped horizontally
     */
    flipX?: boolean;

    /**
     * When true, an object is rendered as flipped vertically
     */
    flipY?: boolean;

    /**
     * Opacity of an object
     */
    opacity?: number;

    /**
     * Angle of rotation of an object (in degrees)
     */
    angle?: number;

    /**
     * Angle of skew on x axes of an object (in degrees)
     */
    skewX?: number;

    /**
     * Angle of skew on y axes of an object (in degrees)
     */
    skewY?: number;

    /**
     * Size of object's controlling corners (in pixels)
     */
    cornerSize?: number;

    /**
     * When true, object's controlling corners are rendered as transparent inside (i.e. stroke instead of fill)
     */
    transparentCorners?: boolean;

    /**
     * Default cursor value used when hovering over this object on canvas
     */
    hoverCursor?: string;

    /**
     * Default cursor value used when moving this object on canvas
     */
    moveCursor?: string;

    /**
     * Padding between object and its controlling borders (in pixels)
     */
    padding?: number;

    /**
     * Color of controlling borders of an object (when it's active)
     */
    borderColor?: string;

    /**
     * Array specifying dash pattern of an object's borders (hasBorder must be true)
     */
    borderDashArray?: any[]; // todo

    /**
     * Color of controlling corners of an object (when it's active)
     */
    cornerColor?: string;

    /**
     * Color of controlling corners of an object (when it's active and transparentCorners false)
     */
    cornerStrokeColor?: string;

    /**
     * Specify style of control, 'rect' or 'circle'
     */
    cornerStyle?: 'rect' | 'circle';

    /**
     * Array specifying dash pattern of an object's control (hasBorder must be true)
     */
    cornerDashArray?: any[]; // todo

    /**
     * When true, this object will use center point as the origin of transformation
     * when being scaled via the controls.
     * <b>Backwards incompatibility note:</b> This property replaces "centerTransform" (Boolean).
     */
    centeredScaling?: boolean;

    /**
     * When true, this object will use center point as the origin of transformation
     * when being rotated via the controls.
     * <b>Backwards incompatibility note:</b> This property replaces "centerTransform" (Boolean).
     */
    centeredRotation?: boolean;

    /**
     * Color of object's fill
     */
    fill?: string;

    /**
     * Fill rule used to fill an object
     * accepted values are nonzero, evenodd
     * <b>Backwards incompatibility note:</b> This property was used for setting globalCompositeOperation until v1.4.12 (use `fabric.Object#globalCompositeOperation` instead)
     */
    fillRule?: 'nonzero' | 'evenodd';

    /**
     * Composite rule used for canvas globalCompositeOperation
     */
    globalCompositeOperation?: string;

    /**
     * Background color of an object.
     */
    backgroundColor?: string;

    /**
     * Selection Background color of an object. colored layer behind the object when it is active.
     * does not mix good with globalCompositeOperation methods.
     */
    selectionBackgroundColor?: string;

    /**
     * When defined, an object is rendered via stroke and this property specifies its color
     */
    stroke?: string;

    /**
     * Width of a stroke used to render this object
     */
    strokeWidth?: number;

    /**
     * Array specifying dash pattern of an object's stroke (stroke must be defined)
     * @type Array
     */
    strokeDashArray?: any[]; // todo

    /**
     * Line endings style of an object's stroke (one of "butt", "round", "square")
     */
    strokeLineCap?: 'butt' | 'round' | 'square';

    /**
     * Corner style of an object's stroke (one of "bevil", "round", "miter")
     * @type String
     * @default
     */
    strokeLineJoin?: 'miter' | 'round' | 'bevil';

    /**
     * Maximum miter length (used for strokeLineJoin = "miter") of an object's stroke
     */
    strokeMiterLimit?: number;

    /**
     * Shadow object representing shadow of this shape
     */
    shadow?: any;  // todo: must be of type Shadow

    /**
     * Opacity of object's controlling borders when object is active and moving
     */
    borderOpacityWhenMoving?: number;

    /**
     * Scale factor of object's controlling borders
     */
    borderScaleFactor?: number;

    /**
     * Transform matrix (similar to SVG's transform matrix)
     */
    transformMatrix?: any[]; // todo

    /**
     * Minimum allowed scale value of an object
     */
    minScaleLimit?: number;

    /**
     * When set to `false`, an object can not be selected for modification (using either point-click-based or group-based selection).
     * But events still fire on it.
     */
    selectable?: boolean;

    /**
     * When set to `false`, an object can not be a target of events. All events propagate through it. Introduced in v1.3.4
     */
    evented?: boolean;

    /**
     * When set to `false`, an object is not rendered on canvas
     */
    visible?: boolean;

    /**
     * When set to `false`, object's controls are not displayed and can not be used to manipulate object
     */
    hasControls?: boolean;

    /**
     * When set to `false`, object's controlling borders are not rendered
     */
    hasBorders?: boolean;

    /**
     * When set to `false`, object's controlling rotating point will not be visible or selectable
     */
    hasRotatingPoint?: boolean;

    /**
     * Offset for object's controlling rotating point (when enabled via `hasRotatingPoint`)
     */
    rotatingPointOffset?: number;

    /**
     * When set to `true`, objects are "found" on canvas on per-pixel basis rather than according to bounding box
     */
    perPixelTargetFind?: boolean;

    /**
     * When `false`, default object's values are not included in its serialization
     */
    includeDefaultValues?: boolean;

    /**
     * Function that determines clipping of an object (context is passed as a first argument)
     * Note that context origin is at the object's center point (not left/top corner)
     * @deprecated since 2.0.0
     * @type Function
     */
    clipTo?: any; // todo

    /**
     * When `true`, object horizontal movement is locked
     */
    lockMovementX?: boolean;

    /**
     * When `true`, object vertical movement is locked
     */
    lockMovementY?: boolean;

    /**
     * When `true`, object rotation is locked
     */
    lockRotation?: boolean;

    /**
     * When `true`, object horizontal scaling is locked
     */
    lockScalingX?: boolean;

    /**
     * When `true`, object vertical scaling is locked
     */
    lockScalingY?: boolean;

    /**
     * When `true`, object non-uniform scaling is locked
     */
    lockUniScaling?: boolean;

    /**
     * When `true`, object horizontal skewing is locked
     */
    lockSkewingX?: boolean;

    /**
     * When `true`, object vertical skewing is locked
     */
    lockSkewingY?: boolean;

    /**
     * When `true`, object cannot be flipped by scaling into negative values
     */
    lockScalingFlip?: boolean;

    /**
     * When `true`, object is not exported in SVG or OBJECT/JSON
     * since 1.6.3
     */
    excludeFromExport?: boolean;

    /**
     * When `true`, object is cached on an additional canvas.
     * default to true
     * since 1.7.0
     */
    objectCaching?: boolean;

    /**
     * When `true`, object properties are checked for cache invalidation. In some particular
     * situation you may want this to be disabled ( spray brush, very big, groups)
     * or if your application does not allow you to modify properties for groups child you want
     * to disable it for groups.
     * default to false
     * since 1.7.0
     */
    statefullCache?: boolean;

    /**
     * When `true`, cache does not get updated during scaling. The picture will get blocky if scaled
     * too much and will be redrawn with correct details at the end of scaling.
     * this setting is performance and application dependant.
     * default to true
     * since 1.7.0
     */
    noScaleCache?: boolean;

    /**
     * When set to `true`, object's cache will be rerendered next render call.
     * since 1.7.0
     */
    dirty?: boolean;

        /**
     * Determins if the fill or the stroke is drawn first (one of "fill" or "stroke")
     */
    paintFirst?: 'fill' | 'stroke';
}

export interface StaticCanvasOptions {
  backgroundColor: string;
  backgroundImage: any; // todo
  overlayColor: string; // todo
  overlayImage: any; // todo
  includeDefaultValues: boolean;
  stateful: boolean;
  renderOnAddRemove: boolean;
  clipTo: any; // todo
  controlsAboveOverlay: boolean;
  allowTouchScrolling: boolean;
  imageSmoothingEnabled: boolean;
  viewportTransform: any; // todo: fabric.iMatrix.concat(),
  backgroundVpt: boolean;
  overlayVpt: boolean;
  enableRetinaScaling: boolean;
  vptCoords: any; // todo
  skipOffscreen: boolean;
}

export interface CircleOptions extends ObjectOptions {
  radius?: number;
  startAngle?: number;
  endAngle?: number;
}

export interface TriangleOptions extends ObjectOptions {
  width?: number;
  height?: number;
}

export interface TextOptions extends ObjectOptions {
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  underline?: boolean;
  overline?: boolean;
  linethrough?: boolean;
  textAlign?: string;
  fontStyle?: string;
  lineHeight?: number;
  textBackgroundColor?: string;
  stroke?: any; // todo
  shadow?: any; // todo
  offsets?: {
            underline: number;
            linethrough: number;
            overline: number;
        };
  charSpacing?: number;
  styles?: any; // todo
}
//#endregion

//#region Observable
interface Observable<T> {
	/**
	 * Observes specified event
	 * @param eventName Event name (eg. 'after:render')
	 * @param handler Function that receives a notification when an event of the specified type occurs
	 */
	on(eventName: string, handler: (e: IEvent) => void): T;

	/**
	 * Observes specified event
	 * @param eventName Object with key/value pairs (eg. {'after:render': handler, 'selection:cleared': handler})
	 */
	on(events: {[eventName: string]: (e: IEvent) => void}): T;
	/**
	 * Fires event with an optional options object
	 * @param eventName Event name to fire
	 * @param [options] Options object
	 */
	trigger(eventName: string, options?: any): T;
	/**
	 * Stops event observing for a particular event handler. Calling this method
	 * without arguments removes all handlers for all events
	 * @param eventName Event name (eg. 'after:render') or object with key/value pairs (eg. {'after:render': handler, 'selection:cleared': handler})
	 * @param handler Function to be deleted from EventListeners
	 */
	off(eventName?: string|any, handler?: (e: IEvent) => void): T;
}
//#endregion
;;
