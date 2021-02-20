//should load only after html doc is loaded and canvas is
//initialized

window.onload = function () {
  //getting refernce to canvas in html
  var canvas = document.getElementById("canvas"),
    //reference to 2d drawing context
    context = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight);

  //animation 1;
  //   var centerX = width / 2,
  //     centerY = height / 2,
  //     offset = height / 3,
  //     speed = 0.1,
  //     angle = 0;
  //     render();
  // function render()
  // {
  //     var y = centerY + Math.sin(angle) * offset;

  //     context.clearRect(0,0,width,height);
  //     context.beginPath();
  //     context.arc(centerX, y, 50, 0 , 2* Math.PI, true);
  //     context.fill();

  //     angle+=speed;

  //     requestAnimationFrame(render);
  // }

  // //animation 2
  var centerX = width / 2,
    centerY = height / 2,
    baseReadius = 50,
    speed = 0.1,
    angle = 0,
    offset = 20;
  render();
  function render() {
    var radius = baseReadius + Math.sin(angle) * offset;

    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
    context.fill();
    angle += speed;
    requestAnimationFrame(render);
  }

  //   //animation 3
  //   var centerX = width / 2,
  //     centerY = height / 2,
  //     baseAlpha = 0.5,
  //     offset = 0.5,
  //     angle = 0,
  //     speed=0.1;
  //   render();
  //   function render() {
  //     var alpha = baseAlpha + Math.sin(angle) * offset;
  //     context.fillStyle = `rgba(0,0,0,${alpha})`;
  //     // var radius = baseReadius + Math.sin(angle) * offset;

  //     context.clearRect(0, 0, width, height);
  //     context.beginPath();
  //     context.arc(centerX, centerY, 50, 0, 2 * Math.PI, true);
  //     context.fill();
  //     angle+=speed;
  //     requestAnimationFrame(render);
  //   }
};
