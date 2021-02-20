window.onload = function () {
  const PI = Math.PI;
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight),
    sun = particle.create(width / 2, height / 2, 0, 0),
    mercury = particle.create(width / 2 + 100, height / 2, 12, PI / -2),
    earth = particle.create(width / 2 + 200, height / 2, 10, PI / -2),
    jupiter = particle.create(width / 2 + 300, height / 2, 8, PI / -2);
  sun.mass = 20000;

  mercury.addGravitation(sun);
  earth.addGravitation(sun);
  jupiter.addGravitation(sun);

  render();

  function render() {
    context.clearRect(0, 0, width, height);

    // mercury.gravitateTo(sun);
    mercury.update();

    // earth.gravitateTo(sun);
    earth.update();

    // jupiter.gravitateTo(sun);
    jupiter.update();

    context.beginPath();
    context.fillStyle = "#ffff00";
    context.arc(sun.x, sun.y, 20, 0, 2 * PI);
    context.fill();

    context.beginPath();
    context.fillStyle = "#ff0000";
    context.arc(mercury.x, mercury.y, 5, 0, 2 * PI);
    context.fill();

    context.beginPath();
    context.fillStyle = "#0000ff";
    context.arc(earth.x, earth.y, 5, 0, 2 * PI);
    context.fill();

    context.beginPath();
    context.fillStyle = "#00ff00";
    context.arc(
      jupiter.x,
      jupiter.y,
      10,
      0,
      2 * PI
    );
    context.fill();

    //call render method everytime frame gets updated
    requestAnimationFrame(render);
  }
};
