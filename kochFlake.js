window.onload = function () {
    const PI = Math.PI;
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight);
      var p0 = {
              x: 0,
              y: -321
          },
          p1 = {
              x: 278,
              y: 160
          },
          p2 = {
              x: -278,
              y: 160
          };
      context.translate(width / 2, height / 2);
  
      koch(p0, p1, 4);
      koch(p1, p2, 6);
      koch(p2, p0, 10);
    // context.scale(-1, 1);
    // //                   /pb\
    // //                 /     \
    // // //p0________pa/        \pc_______p1
    // function koch(p0, p1)
    // {
  
    //   let angle = Math.atan2(p1.y - p0.y, p1.x - p0.x),
    //     dist = utils.distance(p0, p1),
    //     unit = dist / 3,
    //     pa = { x: p0.x + dx/3, y: p0.y + dy/3 },
    //     pb = { x: pa.x + unit * Math.cos(angle +PI/3), y: pa.y - unit * Math.sin(angle+PI/3) },
    //     pc = { x: p1.x - dx/3, y: p1.y - dy/3 };
  
    //     context.beginPath();
    //     context.moveTo(p0.x, p0.y);
    //     context.lineTo(pa.x, pa.y);
    //     context.lineTo(pb.x, pb.y);
    //     context.lineTo(pc.x, pc.y);
    //     context.lineTo(p1.x, p1.y);
    //     context.stroke();
    // }
  
    // context.translate(width / 2, height / 2);
    koch(p0, p1, 3);
    function koch(p0, p1, level) {
      let dy = p1.y - p0.y,
        dx = p1.x - p0.x,
        dist = Math.sqrt(dx * dx + dy * dy),
        unit = dist / 3,
        angle = Math.atan2(dy, dx),
        pa = {
          x: p0.x + dx / 3,
          y: p0.y + dy / 3
        },
        pb = {
          x: pa.x + Math.cos(angle - PI / 3) * unit,
          y: pa.y + Math.sin(angle - PI / 3) * unit
        },
        pc = {
          x: p1.x - dx / 3,
          y: p1.y - dy / 3
        };
      level -= 1;
      if (level > 0) {
        koch(p0, pa, level-1);
        koch(pa, pb, level - 1);
        koch(pb, pc, level - 1);
        koch(pc, p1, level - 1);
      }
      // else {
        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(pa.x, pa.y);
        context.lineTo(pb.x, pb.y);
        context.lineTo(pc.x, pc.y);
        context.lineTo(p1.x, p1.y);
        context.stroke();
      // }
    }
  
  
  }
  