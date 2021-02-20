window.onload = function () {
  const PI = Math.PI;
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight),
    p= particle.create(width/2, height/2, 10 , PI/3);
  render();

  function render() {
    context.clearRect(0, 0, width, height);

    if (p.position.getX()-p.radius > width) {
        p.position.setX(0-p.radius);
      } else if (p.position.getX()+p.radius < 0) {
        p.position.setX(width-p.radius);
      } else if (p.position.getY()-p.radius > height) {
        p.position.setY(0-p.radius);
      } else if (p.position.getY()+p.radium < 0) {
        p.position.setY(height-p.radius);
      }
    //call render method everytime frame gets updated
    requestAnimationFrame(render);
  }
};
