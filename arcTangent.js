window.onload = function () {
  //getting refernce to canvas in html
  var canvas = document.getElementById("canvas"),
    //reference to 2d drawing context
    context = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight);

  //different values for xRadius and yRadius gives us ellipse
  //different values for xAngle , yAngle  and xSpeed ,ySpeed gives us lissajous curve
  var centerX = 10 / 2,
    centerY = 10 / 2,
    angle = 0,
    dx,
    dy;
  render();

  function render() {
    context.clearRect(0, 0, width, height);

    //saving the current properties of canvas
    context.save();
    context.translate(centerX, centerY);
    context.rotate(angle);

    //draw an arrow
    context.beginPath();
    context.moveTo(20, 0);
    context.lineTo(-20, 0);
    context.moveTo(20, 0);
    context.lineTo(10, -10);
    context.moveTo(20, 0);
    context.lineTo(10, 10);
    context.stroke();

    //restoring the properties that we saved lastly(on top of the stack)
    context.restore();

    requestAnimationFrame(render);
  }
  document.body.addEventListener("mousemove", function (event) {
    dx = event.clientX - centerX;
    dy = event.clientY - centerY;
    angle = Math.atan2(dy, dx);
  });
};
