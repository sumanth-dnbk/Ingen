window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight),
     
      particles = [];
     
      

      for (let index = 0; index < 100; index++) {
        particles[index] = particle.create(
          width / 2,
          height,
          Math.random() * 10 + 2,
          -Math.PI /2 +(Math.random()*0.2 - 0.1),
          0.1
        );
        particles[index].style = context.fillStyle = `rgb(
                ${Math.floor(255 * Math.random())},
                ${Math.floor(255 * Math.random())},
                ${Math.floor(255 * Math.random())})`;
        particles[index].radius  = Math.random()*20 ;
      }

    render();
  
    function render() {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
         let p = particles[i];
         p.update();
         context.beginPath();
         context.arc(p.x, p.y, p.radius, 0 , 2*PI);
         context. fill();
     
        if(p.y>=   height)
        {
            p.x=(width/2);
            p.y=(height);
            let magnitude = ( Math.random() * 10 + 2);
            let angle = (-Math.PI /2 +(Math.random()*0.2 - 0.1));
            p.vx = magnitude * Math.cos(angle);
            p.vy = magnitude * Math.sin(angle);
            
        }

        // if (p.x+p.radius > width) {
        //     p.x=(width-p.radius);
        //     p.vx = (p.vx * -0.8)

        //   } else if (p.x-p.radius < 0) {
        //     p.x=(0+p.radius);
        //     p.vx = (p.vx * -0.8)
        //   } else if (p.y+p.radius > height) {
        //     p.y=(height - p.radius);
        //     p.vy = (p.vy * -0.8);
        //   } else if (p.y-p.radius < 0) {
        //     p.y=(0+p.radius);
        //     p.vy = (p.vy * -0.8);
        //   }
      }
     

      //call render method everytime frame gets updated
      requestAnimationFrame(render);
    }
  };
  