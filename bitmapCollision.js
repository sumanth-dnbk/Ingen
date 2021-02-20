window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      targetCanvas = document.getElementById("target"),
      targetContext = targetCanvas.getContext("2d"),
      width = target.width=(canvas.width = window.innerWidth),
      height =  target.height=(canvas.height = window.innerHeight),
      p = particle.create(width/2, 0 , 10,PI/2);
      
     
      targetContext.beginPath();
      targetContext.arc(width/2, height/2, 100, 0 , 2*PI);
      targetContext.fill();
     

    render();
  
    function render() {
      context.clearRect(0, 0, width, height);

      p.update();
      context.beginPath();
      context.arc(p.x, p.y, 4, 0 , 2*PI, false);
      context.fill();

      let imageData = targetContext.getImageData(p.x,p.y,1,1);
      if(imageData.data[3]>0)
      {
        targetContext.globalCompositeOperation = "destination-out";
			targetContext.beginPath();
			targetContext.arc(p.x, p.y, 20, 0, Math.PI * 2, false);
			targetContext.fill();
        // resetParticle();
      }
      else if (p.x > width){
        resetParticle();
      }
      
     

      //call render method everytime frame gets updated
      requestAnimationFrame(render);
    }
    function resetParticle(){
      p.x =0;
      p.y = height/2;
      p.setHeading(utils.randomRange(-0.1, 0.1))
    }
  };
  