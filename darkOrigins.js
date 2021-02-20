window.onload = function () {
  const PI = Math.PI;
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    targetCanvas = document.getElementById("target"),
    targetContext = targetCanvas.getContext("2d"),
    width = (target.width = canvas.width = window.innerWidth),
    height = (target.height = canvas.height = window.innerHeight),
    p = particle.create(width / 2, 0, 10, PI / 2),
    numkillets = 10,
    killets = [],
    //ship params
    ship = particle.create(width - 50, height - 50, 0, 0),
    thrust = vector.create(0, 0),
    thrusting = false,
    turningRight = false,
    turningLeft = false,
    angle = 0,
    lasers = [];
  ship.friction = 0.97;
  ship.radius = 10;
  shipSetup();

  targetContext.beginPath();
  targetContext.arc(width / 2, height / 2, 100, 0, 2 * PI);
  targetContext.fill();

  targetContext.beginPath();
  targetContext.arc(
    utils.randomRange(0, width),
    utils.randomRange(0, height),
    200,
    0,
    2 * PI
  );
  targetContext.fill();

  targetContext.fillStyle = 'yellow'
  targetContext.beginPath();
  targetContext.arc(
    width/2,
    height/2,
    30,
    0,
    2 * PI
  );
  targetContext.fill();

  for (let i = 0; i < numkillets; i++) {
    let p = particle.create(
      width / 2,
      height / 2,
      utils.randomRange(0,5),
      utils.randomRange(0, 2 * PI)
    );
    p.radius = 10;
    killets.push(p);
  }

  render();

  function render() {
    context.clearRect(0, 0, width, height);

    if (renderShipAndLasers()) {
      return;
    }

    //MANAGE KILLET
    for (let i = 0; i < numkillets; i++) {
      let killet = killets[i];
      killet.update();

      
      context.beginPath();
      context.moveTo(killet.x, killet.y);
      context.lineTo(killet.x + 5, killet.y + 5);
      context.lineTo(killet.x - 5, killet.y - 5);
      context.moveTo(killet.x, killet.y);
      context.lineTo(killet.x + 5, killet.y - 5);
      context.lineTo(killet.x - 5, killet.y + 5);
      context.stroke();

      let imageData = targetContext.getImageData(killet.x, killet.y, 1, 1);
      if (utils.circleCollision(ship, killet)) {
        console.log("collided with ship");
        context.fillStyle = "red";
        context.font = "500px serif";
        context.fillText("Game Over", 50, height / 2);
        return;
      } else if (
        killet.x > width ||
        killet.x < 0 ||
        killet.y > height ||
        killet.y < 0
      ) {
        killet.x = width / 2;
        killet.y = height / 2;
        killet.setSpeed(utils.randomRange(0,5));
        killet.setHeading(utils.randomRange(0, 2 * PI));
      }
    }

    //call render method everytime frame gets updated
    requestAnimationFrame(render);
  }
  function resetParticle() {
    p.x = 0;
    p.y = height / 2;
    p.setHeading(utils.randomRange(-0.1, 0.1));
  }

  function shipSetup() {
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
        case 32: //space bar
          lasers.push(particle.create(ship.x, ship.y, 10, ship.getHeading()));
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
  }

  function renderShipAndLasers() {
    if (turningRight) {
      angle += 0.05;
    } else if (turningLeft) {
      angle -= 0.05;
    }

    if (thrusting) {
      thrust.setLength(0.5);
    } else {
      thrust.setLength(0);
    }
    thrust.setAngle(angle);

    ship.accelerate(thrust.getX(), thrust.getY());
    ship.update();

    if (ship.x > width) {
      ship.x = 0;
    } else if (ship.x < 0) {
      ship.x = width;
    } else if (ship.y > height) {
      ship.y = 0;
    } else if (ship.y < 0) {
      ship.y = height;
    }

    context.save();
    context.translate(ship.x, ship.y);
    context.rotate(angle + PI / 2);

    context.beginPath();

    context.moveTo(0, 0);
    context.lineTo(10, 10);
    context.lineTo(-10, 10);
    context.lineTo(0, 0);
    context.fill();

    if (thrusting || turningLeft || turningRight) {
      context.moveTo(0, 10);
      context.lineTo(-35, 25);
      context.lineTo(-2.5, 22.5);
      context.lineTo(-17.5, 37.5);
      context.stroke();
      context.moveTo(0, 10);
      context.lineTo(35, 25);
      context.lineTo(2.5, 22.5);
      context.lineTo(17.5, 37.5);
      context.stroke();
    }
    context.restore();

    //render lasers
    console.log(lasers.length);
    for (let i = 0; i < lasers.length; i++) {
      let laser = lasers[i];
      laser.update();
      let imageData = targetContext.getImageData(laser.x, laser.y, 1, 1);
      if (imageData.data[3] > 0) {
        if (
          utils.inRange(laser.x, width / 2 - 30 , width / 2 + 30) &&
          utils.inRange(laser.y, height / 2 - 30, height / 2 + 30)
        ) {
          context.fillStyle = "green";
          context.font = "500px serif";
          context.fillText("Jedi won", 50, height / 2);
          console.log("its a win");
          return true;
        }
        targetContext.globalCompositeOperation = "destination-out";
        targetContext.beginPath();
        targetContext.arc(laser.x, laser.y, 20, 0, Math.PI * 2, false);
        targetContext.fill();
        lasers.splice(i, 1);
      }
      if (laser.x > width || laser.x < 0 || laser.y > height || laser.y < 0) {
        lasers.splice(i, 1);
        continue;
      }

      context.beginPath();
      context.arc(laser.x, laser.y, 5, 0, 2 * PI);
      context.stroke();
    }
  }
};


//TODO add quick settings .js and add background to the game
//optimze the performance
// optimization 1: get ship quadrant and perform collision detection only in that quadrant
//add highscore and efficeincy
//make bullets come out in the direction of ship , without thrust
//add sounds for bullet firings
//add dark space background

//can plan story line to have more bullets at one phase and shields will be 
//up and player should evade from those and in second phase
//while the ship is recharging we can attack now

//make the core as golden and give it a wierd shape, more better an alien face

//bullet frequency should be less