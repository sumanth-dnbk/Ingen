window.onload = function () {
  const PI = Math.PI;
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight),
    sun1 = particle.create(300, 200, 0, 0),
    sun2 = particle.create(800, 600, 0, 0),
    emitter = { x: 100, y: 0 },
    particles = [],
    numParticles = 100;

  sun1.mass = 10000;
  sun1.radius = 10;

  sun2.mass = 20000;
  sun2.radius = 20;

  for (let i = 0; i < numParticles; i++) {
    let p = particle.create(
      emitter.x,
      emitter.y,
      utils.randomRange(7, 8),
      Math.PI / 2 + utils.randomRange(-0.1, 0.1)
    );
    p.addGravitation(sun1);
    p.addGravitation(sun2);
    p.radius = 3;
    particles.push(p);
  }

  render();

  function render() {
    context.clearRect(0, 0, width, height);

    draw(sun1, "#ffff00");
    draw(sun2, "#ffff00");
    for (let i = 0; i <numParticles; i++) {
        particles[i].update();
        draw(particles[i], "#000000");
        let p = particles[i];
        if(p.x > width ||
				p.x < 0 ||
				p.y > height ||
				p.y < 0) {
				p.x = emitter.x;
				p.y = emitter.y;
				p.setSpeed(utils.randomRange(7, 8));
				p.setHeading(Math.PI / 2 + utils.randomRange(-.1, .1));
			}
    }
    //call render method everytime frame gets updated
    requestAnimationFrame(render);
  }

  function draw ( p, color){
    context.beginPath();
    context.fillStyle = color;
    context.arc(p.x, p.y, p.radius, 0, 2 * PI);
    context.fill();
  }
};
