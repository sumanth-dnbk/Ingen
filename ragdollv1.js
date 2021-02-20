window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight);
  
    let points = [],
      sticks = [],
      forms = [],
      bounce = 0.9,
      gravity = 0.5,
      friction = 0.999;
    points.push({
      x: 100,
      y: 100,
      oldx: 0 + Math.random() * 30 - 15,
      oldy: 100 + Math.random() * 30 - 15
    });
    points.push({
      x: 200,
      y: 100,
      oldx: 200,
      oldy: 100
    });
    points.push({
      x: 200,
      y: 200,
      oldx: 200,
      oldy: 200
    });
    points.push({
      x: 100,
      y: 200,
      oldx: 100,
      oldy: 200,
  
    });
  
    sticks.push({
      p0: points[0],
      p1: points[1],
      length: utils.distance(points[0], points[1]),
      color: 'red',
      width: 5
    });
    sticks.push({
      p0: points[1],
      p1: points[2],
      length: utils.distance(points[1], points[2])
    });
    sticks.push({
      p0: points[2],
      p1: points[3],
      length: utils.distance(points[2], points[3])
    });
    sticks.push({
      p0: points[3],
      p1: points[0],
      length: utils.distance(points[3], points[0])
    });
  
    sticks.push({
      p0: points[0],
      p1: points[2],
      length: utils.distance(points[0], points[2]),
      hidden: true
    });
  
  
    forms.push({
      path: [
        points[0],
        points[1],
        points[2],
        points[3],
      ],
      color: 'green'
    })
  
    render()
  
    function render() {
      context.clearRect(0, 0, width, height);
      updatePoints();
      for (let i = 0; i < 2; i++) {
        updateSticks();
        constrainPoints();
      }
      // renderPoints();
      // renderSticks();
      renderForms();
      requestAnimationFrame(render);
    }
  
    function updatePoints() {
      for (let i = 0; i < points.length; i++) {
        let p = points[i],
          vx = (p.x - p.oldx) * friction,
          vy = (p.y - p.oldy) * friction;
  
        p.oldx = p.x;
        p.oldy = p.y;
  
        p.x += vx;
        p.y += vy;
        p.y += gravity;
      }
    }
  
    function constrainPoints() {
      for (let i = 0; i < points.length; i++) {
        let p = points[i],
          vx = (p.x - p.oldx) * friction,
          vy = (p.y - p.oldy) * friction;
  
        if (p.x > width) {
          p.x = width;
          p.oldx = p.x + vx * bounce;
        }
        if (p.x < 0) {
          p.x = 0;
          p.oldx = p.x + vx * bounce;
        }
  
        if (p.y > height) {
          p.y = height
          p.oldy = p.y + vy * bounce;
        }
        if (p.y < 0) {
          p.y = 0;
          p.oldy = p.y + vy * bounce;
        }
  
      }
    }
  
    function updateSticks() {
      for (let i = 0; i < sticks.length; i++) {
        let p0 = sticks[i].p0,
          p1 = sticks[i].p1,
          dx = p1.x - p0.x,
          dy = p1.y - p0.y,
          distance = Math.sqrt(dx * dx + dy * dy),
          diff = sticks[i].length - distance,
          percent = diff / distance / 2,
          offsetX = dx * percent, offsetY = dy * percent;
        p0.x -= offsetX;
        p0.y -= offsetY;
        p1.x += offsetX;
        p1.y += offsetY;
  
      }
    }
    function renderForms() {
      for (let i = 0; i < forms.length; i++) {
        const f = forms[i];
  
        context.beginPath();
        context.fillStyle = f.color;
        context.moveTo(f.path[0].x, f.path[0].y);
        for (let j = 1; j < f.path.length; j++) {
          context.lineTo(f.path[j].x, f.path[j].y);
        }
        context.fill();
  
      }
    }
  
    function renderSticks() {
      for (let i = 0; i < sticks.length; i++) {
        let p0 = sticks[i].p0,
          p1 = sticks[i].p1,
          s = sticks[i];
  
        context.beginPath();
        if (!s.hidden) {
          context.fillStyle = s.color || 'black';
          context.lineWidth = s.width || 1;
          context.moveTo(p0.x, p0.y);
          context.lineTo(p1.x, p1.y);
        }
        context.stroke();
  
      }
    }
    function renderPoints() {
      for (let i = 0; i < points.length; i++) {
        let p = points[i];
        context.beginPath();
        context.arc(p.x, p.y, 4, 0, 2 * PI)
        context.fill();
  
      }
    }
  
  
  
  }
  