//should load only after html doc is loaded and canvas is
//initialized
window.onload = function () {
  //getting refernce to canvas in html
  var canvas = document.getElementById("canvas"),
    //reference to 2d drawing context
    context = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight),
    particles = [];

  const PI = Math.PI;

  for (let index = 0; index < 100; index++) {
    particles[index] = particle.create(
      width / 2,
      height / 3,
      Math.random() * 5 + 2,
      Math.random() * Math.PI * 2,
      0.1
    );
    particles[index].style = context.fillStyle = `rgb(
            ${Math.floor(255 * Math.random())},
            ${Math.floor(255 * Math.random())},
            ${Math.floor(255 * Math.random())})`;
  }

  let gravity = vector.create(0, 0.1);
  render();

  function render() {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < 100; i++) {
      context.fillStyle = particles[i].style;
      context.beginPath();
      context.arc(
        particles[i].position.getX(),
        particles[i].position.getY(),
        5,
        0,
        2 * PI
      );
      context.fill();
      particles[i].update();
    //   particles[i].accelerate(gravity);
    }
    //call render method everytime frame gets updated
    requestAnimationFrame(render);
  }
};
