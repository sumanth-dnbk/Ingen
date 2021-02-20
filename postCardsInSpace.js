window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      targetCanvas = document.getElementById("target"),
      targetContext = targetCanvas.getContext("2d"),
      width = (target.width = canvas.width = window.innerWidth),
      height = (target.height = canvas.height = window.innerHeight),
      f1 = 300,
      shapes =[],
      numShapes = 21,
      perspective;
      // shapePos = { x: 500 , y : 300, z: 300};

      for (let i = 0; i < numShapes; i++) {
        shapes[i] = { x: utils.randomRange(-1000,1000),
          y: utils.randomRange(-1000,1000),
          z: utils.randomRange(0,10000),
          char : String.fromCharCode(utils.randomRange(65, 91)),
        img: document.createElement("img")};
        shapes[i].img.src = "postcard" + (i % 7) + ".jpg";
         
      }
      context.translate(width/2, height/2);
      context.font = "200px Arial";
      render();

      //near => big, clear, towards edge
      //far => small, hazy, towards center
      //using the above perspectives we can create 2.5d
      //perspective can be deried from focal lenght of a camera
      function render()
      {
        context.clearRect(-width/2, -height/2,width, height);
        for (let i = 0; i < shapes.length; i++) {
          let shapePos = shapes[i];
           perspective = f1/(f1+shapePos.z);

          context.save();
          context.scale(perspective, perspective);

          //text
          // context.fillText(shapePos.char,shapePos.x, shapePos.y );

          //postcard
          context.translate(-shapePos.img.width / 2, shapePos.img.height / 2);
          context.drawImage(shapePos.img, shapePos.x, shapePos.y);
          context.restore();
          shapePos.z -= 5;
          if(shapePos.z < 0)
          {
            shapePos.z = 10000;
            shapes.sort((x,y)=> y.z - x.z  );
          }
        }
        requestAnimationFrame(render);
      }
      // context.translate(shapePos.x * perspective , shapePos.y* perspective);

      // context.scale(perspective, perspective);
      // context.fillRect()
     
  };
