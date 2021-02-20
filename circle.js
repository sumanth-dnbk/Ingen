window.onload = function(){
    //getting refernce to canvas in html
  var canvas = document.getElementById("canvas"),
  //reference to 2d drawing context
  context = canvas.getContext("2d"),
  width = (canvas.width = window.innerWidth),
  height = (canvas.height = window.innerHeight);

  //different values for xRadius and yRadius gives us ellipse
  //different values for xAngle , yAngle  and xSpeed ,ySpeed gives us lissajous curve
  var centerX = width/2,
  centerY = height/2,
  xRadius = 300  ,
  yRadius = 300,
  xAngle = 0,
  yAngle = 0,
  xSpeed = 0.1,
  ySpeed= 0.2,
  x,y;
  render();

  function render()
  {
     x = centerX+xRadius * Math.cos(xAngle);
     y = centerY+yRadius * Math.sin(yAngle);
    //   context.clearRect(0,0,width, height);
      context.beginPath();
      context.arc(x, y, 5,0 , 2 * Math.PI, false )
      context.fill();
      xAngle+=xSpeed;
      yAngle+=ySpeed;
      requestAnimationFrame(render);
  }
};