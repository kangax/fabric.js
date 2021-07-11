(function() {

  function noop() {
    return false;
  }

  function identityEase(currentTime, startValue) {
    return startValue;
  }

  function defaultEasing(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  }

  /**
   * Changes value from one to another within certain period of time, invoking callbacks as value is being changed.
   * @memberOf fabric.util
   * @param {Object} [options] Animation options
   * @param {Function} [options.onChange] Callback; invoked on every value change
   * @param {Function} [options.onComplete] Callback; invoked when value change is completed
   * @param {Number} [options.startValue=0] Starting value
   * @param {Number} [options.endValue=100] Ending value
   * @param {Number} [options.byValue=100] Value to modify the property by
   * @param {Function} [options.easing] Easing function
   * @param {Number} [options.duration=500] Duration of change (in ms)
   * @param {Function} [options.abort] Additional function with logic. If returns true, onComplete is called.
   */
  function animate(options) {

    requestAnimFrame(function(timestamp) {
      options || (options = { });

      var start = timestamp || +new Date(),
          duration = options.duration || 500,
          finish = start + duration, time,
          onChange = options.onChange || noop,
          abort = options.abort || noop,
          onComplete = options.onComplete || noop,
          easing = options.easing || defaultEasing,
          startValue = 'startValue' in options ? options.startValue : 0,
          endValue = 'endValue' in options ? options.endValue : 100,
          byValue = options.byValue || endValue - startValue;

      options.onStart && options.onStart();

      (function tick(ticktime) {
        // TODO: move abort call after calculation
        // and pass (current,valuePerc, timePerc) as arguments
        time = ticktime || +new Date();
        var currentTime = time > finish ? duration : (time - start),
            timePerc = currentTime / duration,
            current = easing(currentTime, startValue, byValue, duration),
            valuePerc = Math.abs((current - startValue) / byValue);
        if (abort()) {
          onComplete(endValue, 1, 1);
          return;
        }
        if (time > finish) {
          onChange(endValue, 1, 1);
          onComplete(endValue, 1, 1);
          return;
        }
        else {
          onChange(current, valuePerc, timePerc);
          requestAnimFrame(tick);
        }
      })(start);
    });
  }

  var _requestAnimFrame = fabric.window.requestAnimationFrame       ||
                          fabric.window.webkitRequestAnimationFrame ||
                          fabric.window.mozRequestAnimationFrame    ||
                          fabric.window.oRequestAnimationFrame      ||
                          fabric.window.msRequestAnimationFrame     ||
                          function(callback) {
                            return fabric.window.setTimeout(callback, 1000 / 60);
                          };

  var _cancelAnimFrame = fabric.window.cancelAnimationFrame || fabric.window.clearTimeout;

  /**
   * requestAnimationFrame polyfill based on http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   * In order to get a precise start time, `requestAnimFrame` should be called as an entry into the method
   * @memberOf fabric.util
   * @param {Function} callback Callback to invoke
   * @param {DOMElement} element optional Element to associate with animation
   */
  function requestAnimFrame() {
    return _requestAnimFrame.apply(fabric.window, arguments);
  }

  function cancelAnimFrame() {
    return _cancelAnimFrame.apply(fabric.window, arguments);
  }

  function identityEase(currentTime, startValue) {
    return startValue;
  }

  function calculateCurrentAnimationValue(startingValue, animation, time) {
    var easing = fabric.util.ease[animation.easing] || identityEase;
    // valid for numbers only written like this.
    return easing(time - animation.offset, startingValue, animation.value - startingValue, animation.duration);
  }

  function applyAnimationState(object, time) {
    var objAnimations = object.animations;
    if (!objAnimations || objAnimations.length === 0) {
      return;
    }
    // current animations is an object created from an animation array.
    // it allow us to have a versatile animation definition but to pick up the valid
    // state at time X.
    var validAnimations = objAnimations.reduce(function(accumulator, current) {
      // from all the abimation for the key, find the one that are timely relevant
      if (current.offset > time) {
        // this aniamtion has to be started yet, ignore
        return accumulator;
      }
      var property = current.property;
      // at this point however it ends, i need a key for a valid animation
      if (!accumulator[property]) {
        accumulator[property] = {
          previouslyEndedAt: 0,
          previousState: object._animatableProperties[property],
        };
      }
      var validAnimation = accumulator[property],
          endTime = current.offset + current.duration;

      if (endTime < time) {
        // if time is after the full animation, this animation could define my starting state.
        if (validAnimation.previouslyEndedAt < endTime) {
          validAnimation.previousState = current.value;
          validAnimation.previouslyEndedAt = endTime;
        }
        return accumulator;
      }
      // at this point the animation is the valid one.
      validAnimation.animationEndTime = endTime;
      validAnimation.animation = current;
      return accumulator;
    }, {});
    /**
       * at this point currentAnimation should look like this:
       * {
       *  fill: {
       *    animationEndTime: 4242 // not more useful at this point
       *    animation: { ... } // animation data, referencerenced do not mutate
       *    previousState: 'blue', define the starting value
       *  }
       * }
       */
    Object.keys(validAnimations).forEach(function(key) {
      var data = validAnimations[key];
      // this is over simplified and needs probably to handle edge cases.
      if (!data.animation) {
        return;
      }
      var finalValue = fabric.util.calculateCurrentAnimationValue(data.previousState, data.animation, time);
      console.log(finalValue);
      object[key] = finalValue;
    });
  }

  fabric.util.animate = animate;
  fabric.util.requestAnimFrame = requestAnimFrame;
  fabric.util.cancelAnimFrame = cancelAnimFrame;
  fabric.util.applyAnimationState = applyAnimationState;
  fabric.util.calculateCurrentAnimationValue = calculateCurrentAnimationValue;
})();
