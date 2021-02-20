window.onload = function () {
  const PI = Math.PI;
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight);

  context.translate(width / 2, height / 2);
  context.scale(2, 2);
  let p0 = {
    x: 0,
    y: -321
  },
    p1 = {
      x: 278,
      y: 160
    },
    p2 = {
      x: - 278,
      y: 160
    }, red = 255, green = 255, blue = 255;

  // drawTriangle(p0, p1, p2);
  function serpinski(a, b, c, level) {
    level -= 1;
    if (level === 0) {
      drawTriangle(a, b, c);
      return
    }
    // drawTriangle(a, midPoint(a, b), midPoint(a, c));
    serpinski(a, midPoint(a, b), midPoint(a, c), level);

    // drawTriangle(midPoint(a, b),b, midPoint(b, c));
    serpinski(midPoint(a, b), b, midPoint(b, c), level);

    // drawTriangle(midPoint(a, c), c, midPoint(b, c));
    serpinski(midPoint(a, c), c, midPoint(b, c), level);

  }
  function drawTriangle(a, b, c) {
    // red= green= blue= (red-2);
    context.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
    // context.fillStyle = `rgb(${red},${green},${255})`
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.lineTo(c.x, c.y);
    context.lineTo(a.x, a.y);
    context.fill();

  }
  function midPoint(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  serpinski(p0, p1, p2, 7);
}
