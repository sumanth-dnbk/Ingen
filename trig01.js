//should load only after html doc is loaded and canvas is
//initialized

window.onload = function () {
  //getting refernce to canvas in html
  var canvas = document.getElementById("canvas"),
    //reference to 2d drawing context
    context = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight),
    boxSize = 3

    context.strokeStyle = `rgb(
        ${Math.floor(255 * Math.random())},
        ${Math.floor(255 * Math.random())},
        ${Math.floor(255 * Math.random())})`;
  for (var i = 0; i < height; i += 10) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(width, i);
    context.stroke();
  }
  context.strokeStyle = `rgb(
    ${Math.floor(255 * Math.random())},
    ${Math.floor(255 * Math.random())},
    ${Math.floor(255 * Math.random())})`;
  for (var i = 0; i < width; i += 10) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, height);
    context.stroke();
  }
  //translate y axis to see all the sine wave
  context.translate(0, height / 2);
  //reverse the y axis to see proper sin wave
  context.scale(1, -1);
  context.fillStyle = `rgb(
    ${Math.floor(255 * Math.random())},
    ${Math.floor(255 * Math.random())},
    ${Math.floor(255 * Math.random())})`;
  for (var angle = 0; angle < Math.PI * 10; angle += 0.01) {
    var x = angle * 50,
      y = Math.sin(angle) * 50;
    context.fillRect(x, y, boxSize, boxSize);
  }

  context.fillStyle = `rgb(
    ${Math.floor(255 * Math.random())},
    ${Math.floor(255 * Math.random())},
    ${Math.floor(255 * Math.random())})`;
  for (var angle = 0; angle < Math.PI * 10; angle += 0.01) {
    var x = angle * 50,
      y = Math.cos(angle) * 50;
    context.fillRect(x, y, boxSize, boxSize);
  }

  //   for (var angle = 0; angle < Math.PI * 10; angle += 0.01) {
  //     var x = angle*50,
  //     y = Math.tan(angle)*50;
  //     context.fillRect(x,y,boxSize,boxSize)
  //   }

  context.fillStyle = `rgb(
    ${Math.floor(255 * Math.random())},
    ${Math.floor(255 * Math.random())},
    ${Math.floor(255 * Math.random())})`;
  for (var angle = 0; angle < Math.PI * 10; angle += 0.01) {
    var x = angle * 50,
      y = Math.tan(angle) * 50;
    
    // context.fillStyle = "rgb(200,100,100)";
    context.fillRect(x, y, boxSize, boxSize);
  }
};
