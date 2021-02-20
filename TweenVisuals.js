window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight),
      start = { x: 100, y: height/2 },
      target = { x: '', y: '' },
      change = { x: '', y: '' },
      startTime = new Date(),
      duration = 1000,
      distanceMoved=[],
      prevPoint = {x:'', y:''};
  
    document.body.addEventListener("click", function (event) {
      target.x = event.clientX;
      target.y = event.clientY;
      change.x = target.x - start.x;
      change.y = target.y - start.y;
      prevPoint.x = start.x;
      prevPoint.y = start.y;
      distanceMoved = [];
      startTime = new Date();
      render();
    })
  
    function render() {
      context.clearRect(0, 0, width, height);
      let curTime = new Date() - startTime;
      if (curTime < duration) {
        let x = easeInOutBounce(curTime, start.x, change.x, duration);
        let y = easeInOutBounce(curTime, start.y, change.y, duration);
        distanceMoved.push(utils.distanceXY(prevPoint.x, prevPoint.y, x, y));
        prevPoint.x = x;
        prevPoint.y = y;
        drawCircle(x, y);
        requestAnimationFrame(render);
      }
      else {
        drawCircle(target.x, target.y);
        start.x = target.x;
        start.y = target.y;
  
        context.beginPath();
        context.moveTo(width/2, height/2);
        context.lineTo(width,height/2);
        context.stroke();
  
        context.beginPath();
        context.moveTo(width/2, height/2);
        context.lineTo(width/2,0);
        context.stroke();
  
        context.save();
        context.translate(width/2, height/2);
        context.scale(1,-1)
        context.beginPath();
        context.moveTo(0, distanceMoved[0]*10);
        for(let i =1;i< distanceMoved.length;i++)
        {
          context.lineTo(i*10, distanceMoved[i]*10);
        }
        context.stroke();
        context.restore();
      }
  
    }
  
  
    /** return the current position of the object to be drawn
     * @param  {} t current time
     * @param  {} b start value (min)
     * @param  {} c change in value (max - min)
     * @param  {} d total duration 
     */
    function linearTween(t, b, c, d) {
      //will take from start to end in given time with uniform velocity
      return c * (t / d) + b;
    }
  
     ///////////// QUADRATIC EASING: t^2 ///////////////////
  
      // quadratic easing in - accelerating from zero velocity
      // t: current time, b: beginning value, c: change in value, d: duration
      // t and d can be in frames or seconds/milliseconds
      function easeInQuad(t, b, c, d) {
          return c*(t/=d)*t + b;
      };
  
      // quadratic easing out - decelerating to zero velocity
      function easeOutQuad(t, b, c, d) {
          return -c *(t/=d)*(t-2) + b;
      };
  
      // quadratic easing in/out - acceleration until halfway, then deceleration
      function easeInOutQuad(t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t + b;
          return -c/2 * ((--t)*(t-2) - 1) + b;
    };
    
    // cubic easing in - accelerating from zero velocity
  // t: current time, b: beginning value, c: change in value, d: duration
  // t and d can be frames or seconds/milliseconds
  function easeInCubic (t, b, c, d) {
      return c*(t/=d)*t*t + b;
  };
  
  // cubic easing out - decelerating to zero velocity
  function easeOutCubic (t, b, c, d) {
      return c*((t=t/d-1)*t*t + 1) + b;
  };
  
  // cubic easing in/out - acceleration until halfway, then deceleration
  function easeInOutCubic (t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
  };
  
  ///////////// QUARTIC EASING: t^4 /////////////////////
  
  // quartic easing in - accelerating from zero velocity
  // t: current time, b: beginning value, c: change in value, d: duration
  // t and d can be frames or seconds/milliseconds
  function easeInQuart (t, b, c, d) {
      return c*(t/=d)*t*t*t + b;
  };
  
  // quartic easing out - decelerating to zero velocity
  function easeOutQuart (t, b, c, d) {
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
  };
  
  // quartic easing in/out - acceleration until halfway, then deceleration
  function easeInOutQuart (t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
  };
  
  
   ///////////// QUINTIC EASING: t^5  ////////////////////
  
  // quintic easing in - accelerating from zero velocity
  // t: current time, b: beginning value, c: change in value, d: duration
  // t and d can be frames or seconds/milliseconds
  function easeInQuint (t, b, c, d) {
      return c*(t/=d)*t*t*t*t + b;
  };
  
  // quintic easing out - decelerating to zero velocity
  function easeOutQuint (t, b, c, d) {
      return c*((t=t/d-1)*t*t*t*t + 1) + b;
  };
  
  // quintic easing in/out - acceleration until halfway, then deceleration
  function easeInOutQuint (t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
      return c/2*((t-=2)*t*t*t*t + 2) + b;
  };
  
  
  ///////////// SINUSOIDAL EASING: sin(t) ///////////////
  
  // sinusoidal easing in - accelerating from zero velocity
  // t: current time, b: beginning value, c: change in position, d: duration
  function easeInSine (t, b, c, d) {
      return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  };
  
  // sinusoidal easing out - decelerating to zero velocity
  function easeOutSine (t, b, c, d) {
      return c * Math.sin(t/d * (Math.PI/2)) + b;
  };
  
  // sinusoidal easing in/out - accelerating until halfway, then decelerating
  function easeInOutSine (t, b, c, d) {
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  };
  
  
   ///////////// EXPONENTIAL EASING: 2^t /////////////////
  
  // exponential easing in - accelerating from zero velocity
  // t: current time, b: beginning value, c: change in position, d: duration
  function easeInExpo (t, b, c, d) {
      return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  };
  
  // exponential easing out - decelerating to zero velocity
  function easeOutExpo (t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  };
  
  // exponential easing in/out - accelerating until halfway, then decelerating
  function easeInOutExpo (t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  };
  
  
   /////////// CIRCULAR EASING: sqrt(1-t^2) //////////////
  
  // circular easing in - accelerating from zero velocity
  // t: current time, b: beginning value, c: change in position, d: duration
  function easeInCirc (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  };
  
  // circular easing out - decelerating to zero velocity
  function easeOutCirc (t, b, c, d) {
      return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  };
  
  // circular easing in/out - acceleration until halfway, then deceleration
  function easeInOutCirc (t, b, c, d) {
      if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
      return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  };
  
  
  /////////// ELASTIC EASING: exponentially decaying sine wave  //////////////
  
  // t: current time, b: beginning value, c: change in value, d: duration, a: amplitude (optional), p: period (optional)
  // t and d can be in frames or seconds/milliseconds
  
   function easeInElastic (t, b, c, d, a, p) {
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  };
  
   function easeOutElastic (t, b, c, d, a, p) {
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  };
  
   function easeInOutElastic (t, b, c, d, a, p) {
      if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  };
  
  
   /////////// BACK EASING: overshooting cubic easing: (s+1)*t^3 - s*t^2  //////////////
  
  // back easing in - backtracking slightly, then reversing direction and moving to target
  // t: current time, b: beginning value, c: change in value, d: duration, s: overshoot amount (optional)
  // t and d can be in frames or seconds/milliseconds
  // s controls the amount of overshoot: higher s means greater overshoot
  // s has a default value of 1.70158, which produces an overshoot of 10 percent
  // s==0 produces cubic easing with no overshoot
   function easeInBack (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c*(t/=d)*t*((s+1)*t - s) + b;
  };
  
  // back easing out - moving towards target, overshooting it slightly, then reversing and coming back to target
   function easeOutBack (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  };
  
  // back easing in/out - backtracking slightly, then reversing direction and moving to target,
  // then overshooting target, reversing, and finally coming back to target
   function easeInOutBack (t, b, c, d, s) {
      if (s == undefined) s = 1.70158; 
      if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  };
  
  
   /////////// BOUNCE EASING: exponentially decaying parabolic bounce  //////////////
  
  // bounce easing in
  // t: current time, b: beginning value, c: change in position, d: duration
   function easeInBounce (t, b, c, d) {
      return c - easeOutBounce (d-t, 0, c, d) + b;
  };
  
  // bounce easing out
   function easeOutBounce (t, b, c, d) {
      if ((t/=d) < (1/2.75)) {
          return c*(7.5625*t*t) + b;
      } else if (t < (2/2.75)) {
          return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
      } else if (t < (2.5/2.75)) {
          return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
      } else {
          return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
      }
  };
  
  // bounce easing in/out
   function easeInOutBounce (t, b, c, d) {
      if (t < d/2) return easeInBounce (t*2, 0, c, d) * .5 + b;
      return easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
  };
  
  
    function drawCircle(x, y) {
      context.beginPath();
      context.arc(x, y, 30, 0, 2 * PI);
      context.fill();
    }
  
  }
  