window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (target.width = canvas.width = window.innerWidth),
      height = (target.height = canvas.height = window.innerHeight),
      fl = 300,
      points = [],
      numPoints = 200,
      centerZ=2000,
      centerX = 0,
      radius = 1000, 
      baseAngle = 0,
      rotationSpeed = .01,
      ypos;
  
      for (let i = 0; i < numPoints; i++) {
        let point = {
          angle :0.2 * i,
          y: 2000 - 4000/numPoints * i + 500*Math.random()
        };
        point.x = centerX+ Math.cos(point.angle ) * radius;
        point.z = centerZ + Math.sin(point.angle)*radius;
        points.push(point);
      }
  
      
      context.translate(width/2, height/2);
  
      document.body.addEventListener("mousemove", function (event){
        rotationSpeed =  (width/2 - event.clientX) * 0.00005;
        ypos = (event.clientY - height/2) * 2;
      });
  
      
      render();
  
      //to make it more realistic we need to use vertices to join and form line and then shapes
      //give colors , opacity and shading to the shapes to make much realistic
      function render()
      {
        baseAngle += rotationSpeed;
        context.clearRect(-width/2, -height/2, width, height);
        context.beginPath();
        for (let i = 0; i < points.length; i++) {
         let point = points[i],
         perspective = fl /(fl + point.z);
  
         context.save();
         context.scale(perspective, perspective);
         
         context.translate(point.x, point.y);
         context.scale(Math.sin(point.angle+baseAngle),1);
        //  context.beginPath();
        //  context.arc(0,0,80,0, 2* PI, false);
        //  context.fill();
  
        if(i===0)
        {
          context.moveTo(0,0)
        }
        else
        {
          context.lineTo(0,0);
        }
  
         context.restore();
  
         point.x = centerX+ Math.cos(point.angle +baseAngle) * radius;
        //  point.y = ypos;
         point.z = centerZ + Math.sin(point.angle+baseAngle)*radius;
        }
        context.stroke();
        requestAnimationFrame(render);
      }
  };
  