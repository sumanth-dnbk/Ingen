window.onload = function () {
  const PI = Math.PI;
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight),
    springPoint = {x :width / 2, y: height / 2},
    springPoint2 = {x :utils.randomRange(0,width), y: utils.randomRange(0,height)},
    weight = particle.create(
      Math.random() * width,
      Math.random() * height,
      0,
      0
    ),
    k = 0.2,
    springLength = 80;
  weight.radius = 5;
  weight.friction = 0.9;
  weight.addSpring(springPoint,k,springLength);
  weight.addSpring(springPoint2,k,20);
  document.addEventListener("mousemove", function (event) {
    springPoint.x = (event.clientX);
    springPoint.y = (event.clientY);
  });
  render();

  function render() {
    context.clearRect(0, 0, width, height);

    //springPoint is fixed and weight is our object, so springForce vector will try to pull weight towards springPoint
    //so , to create a springForce vector with magintude as differnce between pos and direction as weigth to springPoint
    //subtract weight(a) from spring point(c) to get springForce(b)
    //b = c-a;
    // let distance = springPoint.subtract(weight);
    // distance.setLength(distance.getLength() - springLength);
    // let  springForce = distance.multiply(k);
    
    // weight.accelerate(springForce);
    // weight.springTo( springPoint,k, springLength);
    weight.update();

    //dot
    context.beginPath();
    context.arc(springPoint.x, springPoint.y, 1, 0, 2 * PI);
    context.fill();

    //dot
    context.beginPath();
    context.arc(springPoint2.x, springPoint2.y, 1, 0, 2 * PI);
    context.fill();

    //line connecting
    context.beginPath();
    context.moveTo(springPoint.x, springPoint.y);
    context.lineTo(weight.x, weight.y);
    context.stroke();

    //line connecting
    context.beginPath();
    context.moveTo(springPoint2.x, springPoint2.y);
    context.lineTo(weight.x, weight.y);
    context.stroke();

    //weight
    context.beginPath();
    context.arc(
      weight.x,
      weight.y,
      weight.radius,
      0,
      2 * PI
    );
    context.fill();

    //call render method everytime frame gets updated
    requestAnimationFrame(render);
  }

};
