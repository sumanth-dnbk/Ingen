window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      targetCanvas = document.getElementById("target"),
      targetContext = targetCanvas.getContext("2d"),
      width = (canvas.width= (targetCanvas.width = window.innerWidth)),
      height = (canvas.height = (targetCanvas.height= window.innerHeight)),
      drawing = true;
  
      targetContext.lineWidth = 0.25;
      let arm = Arm.create(width/2, height/2 , 100, 0),
      arm2 = Arm.create(arm.getEndX(), arm.getEndY(), 100, 0),
      arm3 = Arm.create(arm2.getEndX(), arm2.getEndY(), 100, 0),
      angle = 0, 
      speed = 0.05;
      arm2.parent = arm;
      arm3.parent = arm2;
      update();
      function update()
      {
        if(drawing)
        {
          targetContext.beginPath();
          targetContext.moveTo(arm3.getEndX(), arm3.getEndY());
        }
        angle+=speed;
        // arm.angle = Math.sin(angle) * PI/2;
        // arm2.angle = Math.sin(angle) * PI;
        // arm3.angle = Math.sin(angle) * PI/4;
        arm.angle = Math.sin(angle) * 5.476;
          arm2.angle = Math.cos(angle * .102 + 2) * 2.92;
          arm3.angle = Math.sin(angle * 8.498 - 0.5) * 2.34;
        arm2.x = arm2.parent.getEndX();
        arm2.y = arm2.parent.getEndY();
        arm3.x = arm3.parent.getEndX();
        arm3.y = arm3.parent.getEndY();
        context.clearRect(0,0, width, height);
        // arm.render(context);
        // arm2.render(context);
        // arm3.render(context);
        if(drawing)
        {
          targetContext.lineTo(arm3.getEndX(), arm3.getEndY());
          targetContext.stroke();
        }
        requestAnimationFrame(update);
  
      }
  
  }
  