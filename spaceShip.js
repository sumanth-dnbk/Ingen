window.onload = function () {
  const PI = Math.PI;
  var canvas = document.getElementById("spaceShip"),
    context = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight),
    ship = particle.create(width / 2, height / 2, 0, 0),
    thrust = vector.create(0, 0),
    thrusting = false,
    turningRight = false,
    turningLeft = false,
    angle = 0;
  // context.globalAlpha = 1;
  ship.friction  = 0.97;
  

  

  //when any of the arrow keys is pressed
  document.body.addEventListener("keydown", function (event) {
    console.log(event.keyCode, "keydown");
    switch (event.keyCode) {
      case 38: //up
        thrusting = true;
        break;
      case 37: //left
        turningLeft = true;
        break;
      case 39: //right
        turningRight = true;
        break;
      default:
        break;
    }
  });

  //when any of the pressed keys is released
  document.body.addEventListener("keyup", function (event) {
    console.log(event.keyCode, "keyup");
    switch (event.keyCode) {
      case 38: //up
        thrusting = false;
        // thrust.setY(0);
        break;
      case 37: //left
        turningLeft = false;
        // thrust.setX(0);
        break;
      case 39: //rigth
        turningRight = false;
        // thrust.setX(0);
        break;
      default:
        break;
    }
  });
  
  render();
  function render() {
    
    context.clearRect(0, 0, width, height);

    if (turningRight) {
      angle += 0.05;
    } else if (turningLeft) {
      angle -= 0.05;
    }

    if(thrusting) {
			thrust.setLength(.1);
		}
		else {
			thrust.setLength(0);
    }
    thrust.setAngle(angle);

    ship.accelerate(thrust.getX(), thrust.getY());
    ship.update();
    
    if (ship.x > width) {
      ship.x=(0);
    } else if (ship.x < 0) {
      ship.x=(width);
    } else if (ship.y > height) {
      ship.y=(0);
    } else if (ship.y < 0) {
      ship.y=(height);
    }

    

    context.save();
    context.translate(ship.x, ship.y);
    context.rotate(angle);

    // context.beginPath();

    // context.moveTo(0, 0);
    // context.lineTo(10, 10);
    // context.lineTo(-10, 10);
    // context.lineTo(0, 0);
    // context.fill();

    // if (thrusting || turningLeft || turningRight) {
    //   context.moveTo(0, 10);
    //   context.lineTo(-35, 25);
    //   context.lineTo(-2.5, 22.5);
    //   context.lineTo(-17.5, 37.5);
    //   context.stroke();
    //   context.moveTo(0, 10);
    //   context.lineTo(35, 25);
    //   context.lineTo(2.5, 22.5);
    //   context.lineTo(17.5, 37.5);
    //   context.stroke();
    // }
    context.beginPath();
    context.moveTo(10, 0);
    context.lineTo(-10, -7);
    context.lineTo(-10, 7);
    context.lineTo(10, 0);
    if (thrusting) {
      context.moveTo(-10, 0);
      context.lineTo(-18, 0);
    }
    context.stroke();
    context.restore();

   
    //call render method everytime frame gets updated
    requestAnimationFrame(render);
  }
};
