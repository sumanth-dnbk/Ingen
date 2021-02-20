window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight),
      k = 0.01,
      particleA = particle.create(utils.randomRange(0,width),utils.randomRange(0,height),utils.randomRange(5,10),utils.randomRange(0, 2*PI),0.1),
      particleB = particle.create(utils.randomRange(0,width),utils.randomRange(0,height),utils.randomRange(5,10),utils.randomRange(0, 2*PI),0.1),
      particleC = particle.create(utils.randomRange(0,width),utils.randomRange(0,height),utils.randomRange(5,10),utils.randomRange(0, 2*PI),0.1),
      particleD = particle.create(utils.randomRange(0,width),utils.randomRange(0,height),utils.randomRange(5,10),utils.randomRange(0, 2*PI),0.1),
      particleE = particle.create(utils.randomRange(0,width),utils.randomRange(0,height),utils.randomRange(5,10),utils.randomRange(0, 2*PI),0.1);

      particleA.friction = 0.9;
      particleA.radius = 5;

      particleB.friction = 0.9;
      particleB.radius = 5;

      particleC.friction = 0.9;
      particleC.radius = 5;

      particleD.friction = 0.9;
      particleD.radius = 5;

      particleE.friction = 0.9;
      particleE.radius = 5;
     
    render();
  
    function render() {
      context.clearRect(0, 0, width, height);
      spring(particleA, particleB, 100);
      spring(particleB, particleC, 100);
      spring(particleC, particleA, 100);
      spring(particleB, particleD, 100);
      spring(particleC, particleD, 100);
      spring(particleA, particleD, 100);

      checkEdges(particleA);
      checkEdges(particleB);
      checkEdges(particleC);
      checkEdges(particleD);
      // checkEdges(particleE);

      particleA.update();
      particleB.update();
      particleC.update();
      particleD.update();
      // particleE.update();


      //a
      context.fillStyle='#ff0000'
      context.beginPath();
      context.arc(particleA.x, particleA.y, particleA.radius, 0 , 2* PI )
      context.fill();

      //B
      context.fillStyle='#00ff00'
      context.beginPath();
      context.arc(particleB.x, particleB.y, particleB.radius, 0 , 2* PI )
      context.fill();

      //C
      context.fillStyle='#0000ff'
      context.beginPath();
      context.arc(particleC.x, particleC.y, particleC.radius, 0 , 2* PI )
      context.fill();

      //D
      context.fillStyle='#ff00ff'
      context.beginPath();
      context.arc(particleD.x, particleD.y, particleD.radius, 0 , 2* PI )
      context.fill();

      // //E
      // context.fillStyle='#ff00ff'
      // context.beginPath();
      // context.arc(particleE.x, particleE.y, particleE.radius, 0 , 2* PI )
      // context.fill();

      //lines
      context.beginPath();
      context.moveTo(particleA.x, particleA.y);
      context.lineTo(particleB.x, particleB.y);
      context.lineTo(particleC.x, particleC.y);
      context.lineTo(particleA.x, particleA.y);
      context.stroke();

      context.beginPath();
      context.moveTo(particleB.x, particleB.y);
      context.lineTo(particleD.x, particleD.y);
      context.lineTo(particleC.x, particleC.y);
      context.lineTo(particleA.x, particleA.y);
      context.lineTo(particleD.x, particleD.y);
      context.stroke();
      
      //call render method everytime frame gets updated
      requestAnimationFrame(render);
    }

    function spring(p0, p1, seperation)
    {
        //x=>y means pull x towards y
        //distance is vector from p0 => p1
        // let distance = p1.position.subtract(p0.position);
        // distance.setLength(distance.getLength() - seperation);
        let dx = p1.x - p0.x,
        dy = p1.y - p0.y;
        let dist = Math.sqrt(dx*dx + dy*dy),
        springForceMag = (dist  - seperation) * k;
        p0.vx +=  springForceMag *(dx/dist);
        p0.vy +=  springForceMag *(dy/dist);

        p1.vx -=  springForceMag *(dx/dist);
        p1.vy -=  springForceMag *(dy/dist);

         //springForce is also vector from p0 => p1
        // let springForce = distance.multiply(k);

        //so adding springForce will pull p0=>p1
        // p0.velocity.addTo(springForce);

        //now to pull p1 towards p0 (p1=>p0) with same magnitude as springForce
        // p1.velocity.subtractFrom(springForce);
    }

    function checkEdges(p) {
      if(p.y + p.radius > height) {
        p.y = (height - p.radius);
        p.vy = (p.vy * -0.95);
      }
    }
  };
  