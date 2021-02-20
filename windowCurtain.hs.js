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
      friction = 0.999,
      angle=0,
      speed = 0.01;
  
      createPoints();
    function createPoints()
    {
        let wWidth = 20 , wHeight = 20, baseX= 100, baseY = 100, boxWidth = 10, boxHeight = 10, points2D=[];
        for(let i = 0 ;i< wHeight; i++)
        {
            points2D[i]=[];
            for(let j =0 ; j< wWidth; j++)
            {
                let p = {
                    x: baseX + j*boxWidth,
                    oldx : baseX + j*boxWidth,
                    y : baseY + i*boxHeight,
                    oldy : baseY + i*boxHeight,
                    pinned: i==0 && j%8==0 ? true: false
                };
                points2D[i].push(p);
                points.push(p);
            }
        }

        for(let i = 0 ;i< wHeight-1; i++)
        {
            for(let j =0 ; j< wWidth-1; j++)
            {
                //horizontol
                let sh = {
                    p0: points2D[i][j],
                    p1: points2D[i][j+1],
                    length: boxWidth
                },
                //vertical to down
                sy = {
                    p0: points2D[i][j],
                    p1: points2D[i+1][j],
                    length: boxHeight
                };
                sticks.push(sh);
                sticks.push(sy);
            }
        }


        render()
    }
  
    function render() {
      context.clearRect(0, 0, width, height);
    // //   points[4].x += 2* Math.cos(angle);
    // //   points[4].y += 2* Math.sin(angle);
    // //   angle+= speed;
      updatePoints();
      for (let i = 0; i < 10; i++) 
    {
        updateSticks();
        constrainPoints();
      }
    // //   // renderPoints();
      renderSticks();
    //   // renderForms();
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
    }
  
    /**
     * once we update the particles the stick lenght changes as the particles move according to the forces applied
     * now we need to bring back the stick length to it original, we do so by adding or subtracting to the paritcles
     * current position
     */
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
        if (!p0.pinned) {
          p0.x -= offsetX;
          p0.y -= offsetY;
        }
        if (!p1.pinned) {
          p1.x += offsetX;
          p1.y += offsetY;
        }
  
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
  