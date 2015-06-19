var _set = fabric.IText.prototype._set;

fabric.util.object.extend(fabric.IText.prototype, /** @lends fabric.IText.prototype */ {

  /**
   * Initializes hidden textarea (needed to bring up keyboard in iOS)
   */
  initHiddenTextarea: function() {
    this.hiddenTextarea = fabric.document.createElement('textarea');
    this.hiddenTextarea.value = this.text;

    this.hiddenTextarea.style.cssText = 'position: absolute; overflow: hidden; resize: none; margin: 0; padding: 0; border: 0; box-shadow: none; border-radius: 0; background-color: transparent;';
    //If at all possible, show the textarea within the canvas wrapper where it can exist
    //at the same height as the iText display. This prevents iOS from scrolling to whatever
    //height the textarea is at when you type.
    if (this.canvas && this.canvas.wrapperEl) {
      this.canvas.wrapperEl.appendChild(this.hiddenTextarea);

      var updateHiddenTextareaPosition = this._updateHiddenTextareaPosition.bind(this);
      this.on('event:scaling', updateHiddenTextareaPosition);
      this.on('event:moving', updateHiddenTextareaPosition);
      this.on('editing:exited', function() {
        this.off('event:scaling', updateHiddenTextareaPosition);
        this.off('event:moving', updateHiddenTextareaPosition);
      }.bind(this));

      this._updateHiddenTextareaPosition();
    }
    else {
      fabric.document.body.appendChild(this.hiddenTextarea);
    }

    fabric.util.addListener(this.hiddenTextarea, 'keydown', this.onKeyDown.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'input', this.onInput.bind(this));

    if (!this._clickHandlerInitialized && this.canvas) {
      fabric.util.addListener(this.canvas.upperCanvasEl, 'click', this.onClick.bind(this));
      this._clickHandlerInitialized = true;
    }
  },

  _initDimensions: function() {
    this.callSuper('_initDimensions');
    this._updateHiddenTextareaPosition();
  },

  _updateHiddenTextareaPosition: function() {
    if (this.isEditing && this.canvas.getActiveObject() === this) {
      // Compute the scale transform between fabric coords and DOM coords
      var canvasRect = this.canvas.lowerCanvasEl.getBoundingClientRect();
      var zoom = this.canvas.getZoom();
      var xScale = canvasRect.width / this.canvas.width * zoom;
      var yScale = canvasRect.height / this.canvas.height * zoom;

      //Use getCenterPoint() instead of this.left/top to calculate the appropriate top/left for
      //the textbox so that if the shape is rotated, we still draw ourselves within the rotated shape
      var top = (this.getCenterPoint().y - 0.5 * this.height) * yScale;
      var left = (this.getCenterPoint().x - 0.5 * this.width) * xScale;
      var width = this.getWidth() * xScale;
      var height = this.getHeight() * yScale;

      this.hiddenTextarea.style.width = width + 'px';
      this.hiddenTextarea.style.height = height + 'px';
      this.hiddenTextarea.style.top = top + 'px';
      this.hiddenTextarea.style.left = left + 'px';

      // Calculate clipping rect for textarea so it doesn't overflow the canvas.
      //
      // Setting overflow: hidden doesn't work very well because browsers will still scroll to
      // keep the cursor on the screen, so this seems to be the best option.
      var widthOverflow = Math.max(left + width - canvasRect.width, 0);
      var heightOverflow = Math.max(top + height - canvasRect.height, 0);
      var clipWidth = 'auto';
      var clipHeight = 'auto';
      if (widthOverflow > 0) clipWidth = width - widthOverflow + 'px';
      if (heightOverflow > 0) clipHeight = height - heightOverflow + 'px';
      this.hiddenTextarea.style.clip = 'rect(auto,' + clipWidth + ',' + clipHeight + ',auto)';

      this.hiddenTextarea.style.fontSize = this.fontSize * xScale + 'px';
      this.hiddenTextarea.style.color = this.fill;
      this.hiddenTextarea.style.textAlign = this.textAlign;
      this.hiddenTextarea.style.lineHeight = this.lineHeight * this._fontSizeMult;

    }
  },

  _set: function(key, value) {
    _set.apply(this, arguments);

    // Update textarea color if the fill is modified
    if (key === 'fill') {
      this._updateHiddenTextareaPosition();
    }
  },

  /**
   * @private
   */
  _keysMap: {
    9:  'exitEditing',
    27: 'exitEditing',
  },

  /**
   * @private
   */
  _ctrlKeysMap: {
  },

  onClick: function() {
    // No need to trigger click event here, focus is enough to have the keyboard appear on Android
    this.hiddenTextarea && this.hiddenTextarea.focus();
  },

  /**
   * Handles keyup event
   * @param {Event} e Event object
   */
  onKeyDown: function(e) {
    if (!this.isEditing) {
      return;
    }
    if (e.keyCode in this._keysMap) {
      this[this._keysMap[e.keyCode]](e);
    }
    else if ((e.keyCode in this._ctrlKeysMap) && (e.ctrlKey || e.metaKey)) {
      this[this._ctrlKeysMap[e.keyCode]](e);
    }
    else {
      // Prevent other keydown handlers from calling preventDefault() on events the textarea needs to receive, like arrows and backspace.
      e.stopPropagation();
      return;
    }
    e.stopImmediatePropagation();
    e.preventDefault();
    this.canvas && this.canvas.renderAll();
  },

  /**
   * Handles input event
   * @param {Event} e Event object
   */
  onInput: function(e) {
    if (!this.isEditing) {
      return;
    }
    this.set('text', this.hiddenTextarea.value);

    // Broadcast hiddenTextArea input events as 'changed' event on this itext instance
    this.fire('changed');
  }
});
