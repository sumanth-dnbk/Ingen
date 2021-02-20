window.onload = function () {
  const PI = Math.PI;
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = (canvas.width= window.innerWidth),
      height = (canvas.height = window.innerHeight),
    leg0= FKSystem.create(width/2, height/2),
    leg1= FKSystem.create(width/2, height/2);

    leg0.addArm(200, PI/2 , PI/4);
    leg0.addArm(150, 0.87, 0.87);

    leg1.addArm(200, PI/2 , PI/4);
    leg1.addArm(150, 0.87, 0.87);
    leg1.phase = PI
    
    update();
    function update()
    {
      context.clearRect(0,0, width, height);
      leg0.update();
      leg0.render(context);
      leg1.update();
      leg1.render(context);
      requestAnimationFrame(update);

    }

}
