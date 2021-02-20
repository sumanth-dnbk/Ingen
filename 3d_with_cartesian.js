window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (target.width = canvas.width = window.innerWidth),
      height = (target.height = canvas.height = window.innerHeight),
      fl = 300,
      points = [],
      shouldRender = true;
  
    context.translate(width / 2, height / 2);
  
    //polar co-ordinates (radius, theta , z) for describing points
      //cartesian co-ordinates (x, y, z)  for describing points
  
  
    //THIS IS BASED ON CARTESIAN CO ORDINATES
    points[0] = { x: -500, y: -500, z: 1000 };
    points[1] = { x: 500, y: -500, z: 1000 };
    points[2] = { x: 500, y: -500, z: 500 };
    points[3] = { x: -500, y: -500, z: 500 };
    points[4] = { x: -500, y: 500, z: 1000 };
    points[5] = { x: 500, y: 500, z: 1000 };
    points[6] = { x: 500, y: 500, z: 500 };
    points[7] = { x: -500, y: 500, z: 500 };
  
    //diff shape life cone with square base
    points[8] = {x:0, y: 500 , z:750}
  
    function project() {
      for (let i = 0; i < points.length; i++) {
        let point = points[i],
          scale = fl / (fl + point.z);
        point.sx = scale * (point.x);
        point.sy = scale * (point.y);
      }
    };
  
    function rotateX(angle) {
      let cos = Math.cos(angle),
      sin = Math.sin(angle);
      points.forEach(p =>{
        p.y = p.y * cos - p.z*sin;
        p.z = p.z * cos + p.y* sin;
      })
      shouldRender = true;
    };
  
    function rotateY(angle) {
      let cos = Math.cos(angle),
      sin = Math.sin(angle);
      points.forEach(p =>{
        p.x = p.x * cos - p.z * sin;
        p.z = p.z * cos + p.x * sin;
      })
      shouldRender = true;
    }
  
    function rotateZ(angle) {
      let cos = Math.cos(angle),
      sin = Math.sin(angle);
      points.forEach(p =>{
        p.x = p.x * cos - p.y*sin;
        p.y = p.y * cos + p.x* sin;
      })
      shouldRender = true;
    }
    function drawLine() {
      let point = points[arguments[0]];
      context.moveTo(point.sx, point.sy);
  
      for (let i = 1; i < arguments.length; i++) {
        point = points[arguments[i]];
        context.lineTo(point.sx, point.sy);
      }
    };
    function translateModel(x, y, z) {
      points.forEach(point => { point.x += x; point.y += y; point.z += z });
      // for (let i = 0; i < points.length; i++) {
      //   let point = points[i];
      //   point.x += x; point.y += y; point.z += z 
        
      // }
      shouldRender = true;
    }
    document.body.addEventListener("keydown", function (event) {
      switch (event.keyCode) {
        case 37: //left
          if(event.ctrlKey)
          {
            rotateY(0.05);
          }
          translateModel(-20, 0, 0);
          break;
        case 39: //right
        if(event.ctrlKey)
        {
          rotateY(-0.05);
        }
          translateModel(20, 0, 0);
          break;
        case 38: //up
          if (event.shiftKey) {
            translateModel(0, 0, 20);
          }
          else
          {
          translateModel(0, -20, 0);
          }
          if(event.ctrlKey)
          {
            rotateX(0.05);
          }
          break;
  
        case 40: //down
        if (event.shiftKey) {
          translateModel(0, 0, -20);
        }
        else
        {
        translateModel(0, 20, 0);
        }
        if(event.ctrlKey)
          {
            rotateX(-0.05);
          }
        break;
  
      }
    })
    render();
  
    function render() {
      if (shouldRender) {
        shouldRender = false;
        project();
        context.clearRect(-width / 2, -height / 2, width, height);
  
        context.beginPath();
  
        context.arc(0, 0, 10, 0, 2 * PI);
  
        //cuboid
        drawLine(0, 1, 2, 3, 0);
        drawLine(4, 5, 6, 7, 4);
        drawLine(0, 4);
        drawLine(1, 5);
        drawLine(2, 6);
        drawLine(3, 7);
  
        //sqone
        // drawLine(0, 1, 2, 3, 0);
        
        // drawLine(0, 8);
        // drawLine(1, 8);
        // drawLine(2, 8);
        // drawLine(3, 8);
  
        context.stroke();
      }
      requestAnimationFrame(render);
    }
  }
  