window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight);
  
    let points = [],
      sticks = [],
      engines = [],
      gravity = 0.5,
      friction = 0.999,
      bounce = 0.5;
    parseModel();
  
    function parseModel() {
      let data = json.env;
      for (let i = 0; i < data.points.length; i++) {
        points.push(data.points[i]);
      }
  
      for (let i = 0; i < data.sticks.length; i++) {
        let s = data.sticks[i];
        s.p0 = points[s.p0];
        s.p1 = points[s.p1];
        s.length = distance(s.p0, s.p1);
        sticks.push(s);
      }
  
      for (let i = 0; i < data.engines.length; i++) {
        let engine = data.engines[i];
        engine.p = points[engine.p];
        engines.push(engine);
      }
  
      render();
    }
  
    function render() {
      context.clearRect(0, 0, width, height);
      updatePoints();
      updateEngines();
  
      for (let i = 0; i < 2; i++) {
        updateSticks();
        constrainPoints();
      }
      renderSticks();
      renderEngine();
      requestAnimationFrame(render);
    }
  
    function updatePoints() {
      for (let i = 0; i < points.length; i++) {
        let p = points[i];
        if (!p.pinned) {
          let vx = (p.x - p.oldx) * friction,
            vy = (p.y - p.oldy) * friction;
  
          p.oldx = p.x;
          p.oldy = p.y;
  
          p.x += vx;
          p.y += vy;
          p.y += gravity;
        }
      }
    }
  
  
  
    function constrainPoints() {
      for (let i = 0; i < points.length; i++) {
        let p = points[i];
  
  
        if (!p.pinned) {
          let vx = (p.x - p.oldx) * friction,
            vy = (p.y - p.oldy) * friction;
          if (p.x > width) {
            p.x = width;
            p.oldx = p.x + vx * bounce;
          }
          else if (p.x < 0) {
            p.x = 0;
            p.oldx = p.x + vx * bounce;
          }
          if (p.y > height) {
            p.y = height;
            p.oldy = p.y + vy * bounce;
          }
          else if (p.y < 0) {
            p.y = 0;
            p.oldy = p.y + vy * bounce;
          }
        }
      }
    }
  
    function updateSticks() {
      for (let i = 0; i < sticks.length; i++) {
        let s = sticks[i],
          p0 = s.p0,
          p1 = s.p1,
          dx = p1.x - p0.x,
          dy = p1.y - p0.y,
          dist = Math.sqrt(dx * dx + dy * dy),
          diff = dist - s.length,
          percent = (diff / dist) / 2,
          offsetX = dx * percent,
          offsetY = dy * percent;
  
        if (!p0.pinned) {
          p0.x += offsetX;
          p0.y += offsetY;
        }
        if (!p1.pinned) {
          p1.x -= offsetX;
          p1.y -= offsetY;
        }
      }
    }
  
    function renderSticks() {
      for (let i = 0; i < sticks.length; i++) {
        let stick = sticks[i],
          p0 = stick.p0,
          p1 = stick.p1;
  
        if (!stick.hidden) {
          context.beginPath();
          context.moveTo(p0.x, p0.y);
          context.lineTo(p1.x, p1.y);
          context.stroke();
        }
  
      }
    }
  
    function updateEngines() {
      for (let i = 0; i < engines.length; i++) {
        let e = engines[i],
          p = e.p;
        p.x = e.baseX + e.range * Math.cos(e.angle);
        p.y = e.baseY + e.range * Math.sin(e.angle);
        e.angle += e.speed;
  
      }
    }
  
    function renderEngine() {
      for (let i = 0; i < engines.length; i++) {
        let e = engines[i];
        context.beginPath();
        context.arc(e.baseX, e.baseY, e.range, 0, 2 * PI);
        context.stroke();
  
      }
    }
  
    function distance(p0, p1) {
      let dx = p1.x - p0.x,
        dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
  }
  