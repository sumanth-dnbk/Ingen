window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight),
      position = {x: Math.random()*width, y: Math.random()*height},
      target = {x: Math.random()*width, y: Math.random()*height},
      points = [],
      numPoints= 100,
      ease = 0.1;
  
      for (let i = 0; i < numPoints; i++) {
        points.push({x: width/2, y: height/2});
      }
      // give source target : tweening will animate moving between source and target
      //easing : if we use only tweening it will suddenly start the motion at source and
      //abruptly end its motion at the destination and that is not very organic, to smoothly
      //start and stop motion we use easing
  
      document.body.addEventListener("mousemove", function(event){
        target.x = event.clientX;
        target.y = event.clientY;
      });
      render();
  
      function render() {
        context.clearRect(0,0, width, height);
  
        
  
        let leader = target;
        context.beginPath();
        context.moveTo(leader.x, leader.y);
        for (let i = 0; i < points.length; i++) {
         let position = points[i];
         easeInto(position,leader, ease);
        //  context.beginPath();
        //  context.arc(position.x, position.y, 20, 0, 2*PI);
        //  context.fill();
        context.lineTo(position.x, position.y);
         leader = position;
        }
        context.stroke();
        requestAnimationFrame(render);
      }
  
      function easeInto(position, target, ease) {
        //this kind of easing we use is we always try to move to the midpoint(or somepoint in between) in between current pos
        // and target making it appear smooth motion.
        position.x += (target.x - position.x) * ease;
        position.y += (target.y - position.y) * ease;
      }
  }

  
//TODO

//control the snake with key board and add collision of head with rest of the end points
