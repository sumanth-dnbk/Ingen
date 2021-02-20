window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (target.width = canvas.width = window.innerWidth),
      height = (target.height = canvas.height = window.innerHeight),
      f1 = 300,
      shapes = [],
      numShapes = 7,
      perspective,
      centerX = 10,
      centerZ = 1000,
      radius = 1000,
      baseAngle = 0.22,
      rotSpeed = 0.000,
      movingSpeed =  0.05;
  
  
    //3d carousel is similar to drawing points on a 2d circle(x-y plane) ,but here we draw the points(cards) 
    //on (x-z) plane. same formulae as xy , only one minor diff is that we need to calculate perspective as 
    //we selected z axis.

    //polar co-ordinates (radius, theta , z) for describing points
    //cartesian co-ordinates (x, y, z)  for describing points


    //THIS IS BASED ON POLAR CO ORDINATES
    for (let i = 0; i < numShapes; i++) {
      shapes[i] = {
        angle: 2 * (PI / numShapes) * i,
        x: centerX + radius * Math.cos(2 * (PI / numShapes) * i),
        y: 0,
        z: centerZ + radius * Math.sin(2 * (PI / numShapes) * i),
        img: document.createElement("img")
      };
      shapes[i].img.src = "postcard" + (i) + ".jpg";
    }
  
    context.translate(width / 2, height / 2);
    context.font = "200px Arial";
  
    //on mouse hove to right carousel spins towards right
    // document.addEventListener("mousemove",function(event){
    //   rotSpeed = (event.clientX - width/2)*0.0001;
    // });
  
    //on right button press carousel moves one card towards right
    document.addEventListener("keyup", function (event) {
      switch (event.keyCode) {
        case 39: //right
          rotSpeed += 2 * PI / 7;
          break;
  
        case 37://left
          rotSpeed -= 2 * PI / 7;
          break;
      }
    })
  
    render();
  
    //near => big, clear, towards edge
    //far => small, hazy, towards center
    //using the above perspectives we can create 2.5d
    //perspective can be deried from focal lenght of a camera
    function render() {
  
      //sorting in descending order so that highest z(farther)
      //will be rendered first and lowest z will be rendered last overlappping the fartherst ones 
      //creating the illusion of depth (if one image(x) is above(overlaps) image(y) then x is closer to the observer)
  
      // baseAngle += rotSpeed;
      if (!utils.inRange(rotSpeed,movingSpeed, -1*movingSpeed)) {
        
        if (rotSpeed > 0) {
          baseAngle +=movingSpeed
          rotSpeed -= movingSpeed;
          
        }
        else {
          baseAngle -= movingSpeed;
          rotSpeed += movingSpeed;
        }
      }
      shapes.sort((x, y) => y.z - x.z);
      context.clearRect(-width / 2, -height / 2, width, height);
      for (let i = 0; i < numShapes; i++) {
        let shapePos = shapes[i];
        perspective = f1 / (f1 + shapePos.z);
  
        context.save();
        context.scale(perspective, perspective);
  
        
        //postcard
        context.translate(-shapePos.img.width / 2, shapePos.img.height / 2);
        context.drawImage(shapePos.img, shapePos.x, shapePos.y);
        context.restore();
        shapePos.x = centerX + radius * Math.cos(shapePos.angle + baseAngle)
        
        shapePos.z = centerZ + radius * Math.sin(shapePos.angle + baseAngle);
  
      }
      requestAnimationFrame(render);
    }
  
  };
  