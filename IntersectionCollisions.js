window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight),
      // p0={x:Math.random()*width, y: Math.random()*height},
      // p1={x:Math.random()*width, y: Math.random()*height},
      // p2={x:Math.random()*width, y: Math.random()*height},
      // p3={x:Math.random()*width, y: Math.random()*height},
      p3 = { x: Math.random() * width, y: Math.random() * height },
      p0 = { x: Math.random() * width, y: Math.random() * height },
      p1 = { x: Math.random() * width, y: Math.random() * height },
      p2 = { x: Math.random() * width, y: Math.random() * height },
      clickPoint;
  
    document.body.addEventListener("mousedown", mouseDown);
  
    function mouseDown(event) {
      clickPoint = getClickedPoint(event.clientX, event.clientY);
      document.body.addEventListener("mousemove", mouseMove);
      document.body.addEventListener("mouseup", mouseUp);
    }
  
    function mouseMove(event) {
      clickPoint.x = event.clientX;
      clickPoint.y = event.clientY;
    }
    function mouseUp(event) {
      document.body.removeEventListener("mousemove", mouseMove);
      document.body.removeEventListener("mouseup", mouseUp);
    }
    render();
  
    function render() {
      context.clearRect(0, 0, width, height);
      drawPoint(p0);
      drawPoint(p1);
      drawPoint(p2);
      drawPoint(p3);
  
      context.beginPath();
      context.moveTo(p0.x, p0.y);
      context.lineTo(p1.x, p1.y);
      context.stroke();
  
      context.beginPath();
      context.moveTo(p2.x, p2.y);
      context.lineTo(p3.x, p3.y);
      context.stroke();
  
      let px = segmentIntersection(p0, p1, p2, p3);
  
      if (px) {
        context.beginPath();
        context.arc(px.x, px.y, 20, 0, 2 * PI);
        context.stroke();
      }
      requestAnimationFrame(render);
    }
  
  
    function drawPoint(p) {
      context.beginPath();
      context.arc(p.x, p.y, 20, 0, 2 * PI);
      context.fill();
    }
    /** p0 , p1 make first line and p2, p3 make the third one
     * returns the point where the intersect 
     * @param  {} p0
     * @param  {} p1
     * @param  {} p2
     * @param  {} p3
     */
    function lineIntersection(p0, p1, p2, p3) {
      //equation of line y = mx +c
      let m1 = (p1.y - p0.y) / (p1.x - p0.x),
        m2 = (p3.y - p2.y) / (p3.x - p2.x),
        c1 = p0.y - m1 * p0.x,
        c2 = p2.y - m2 * p2.x;
  
      //parallel lines with or without distance between them
      if (m1 === m2) {
        return;
      }
      //find the intersection by equating y in both and finding x and then using x to find y
      let px = {};
      px.x = (c1 - c2) / (m2 - m1);
      px.y = m1 * px.x + c1;
  
      return px;
    }
  
    /** p0 , p1 make first line and p2, p3 make the third one
     * return the point between segments where they intersect
     * @param  {} p0
     * @param  {} p1
     * @param  {} p2
     * @param  {} p3
     */
    function segmentIntersection(p0, p1, p2, p3) {
      //equation of line y = mx +c
      let m1 = (p1.y - p0.y) / (p1.x - p0.x),
        m2 = (p3.y - p2.y) / (p3.x - p2.x),
        c1 = p0.y - m1 * p0.x,
        c2 = p2.y - m2 * p2.x;
  
      //parallel lines with or without distance between them
      if (m1 === m2) {
        return;
      }
      //find the intersection by equating y in both and finding x and then using x to find y
      let px = {};
      px.x = (c1 - c2) / (m2 - m1);
      px.y = m1 * px.x + c1;
      if (utils.inRange(px.x, p0.x, p1.x) && utils.inRange(px.x, p2.x, p3.x)) {
        return px;
      }
      return;
    }
  
  
    function getClickedPoint(x, y) {
      let Points = [p0, p1, p2, p3];
      for (let i = 0; i < Points.length; i++) {
        let p = Points[i];
        if (utils.distance(p, { x, y }) < 10) {
          return p;
        }
      }
    }
  }
  