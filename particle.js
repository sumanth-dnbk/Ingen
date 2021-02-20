class particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.mass = 1;
    this.radius = 0;
    this.bounce = -1;
    this.friction = 1;
    this.gravity = 0;
    this.springs = [];
    this.gravitations = [];
  }

  static create(x, y, speed, direction, grav) {
    var obj = new particle();
    obj.x = x;
    obj.y = y;
    obj.vx = Math.cos(direction) * speed;
    obj.vy = Math.sin(direction) * speed;
    obj.gravity = grav || 0;
    obj.springs = [];
    obj.gravitations = [];
    return obj;
  }

  accelerate(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  }
  //update the particle positon
  update() {
    this.handleGravitations();
    this.handleSprings();
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
  }

  //simple y2-y1/x2-x1
  angleTo(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x);
  }

  distanceTo(p2) {
    var dx = p2.x - this.x,
      dy = p2.y - this.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  gravitateTo(p2) {
    var dx = p2.x - this.x,
      dy = p2.y - this.y,
      distSQ = dx * dx + dy * dy,
      dist = Math.sqrt(distSQ),
      //g * m1 * m2 / r^2  conside m1(this particle) is negligent and m2 is huge 
      force = p2.mass / distSQ,
      //x component = cos(angle) * magnitude
      //or (adjacent side(dx)/hypotenuse(dist))
      ax = (dx / dist) * force,
      ay = (dy / dist) * force;

    this.vx += ax;
    this.vy += ay;
  }

  //get magnitude
  getSpeed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  setSpeed(speed) {
    let angle = this.getHeading();
    this.vx = speed * Math.cos(angle);
    this.vy = speed * Math.sin(angle);
  }

  //get direction
  getHeading() {
    return Math.atan2(this.vy, this.vx);
  }

  setHeading(angle) {
    let speed = this.getSpeed();
    this.vx = speed * Math.cos(angle);
    this.vy = speed * Math.sin(angle);
  }

  springTo(point, k, length) {
    //x=>y means pull x towards y
    //distance is vector from p0 => p1

    let dx = point.x - this.x,
      dy = point.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy),
      springForceMag = (dist - length) * k;
      //this formulae is similar to stick update function in ragdoll except /2 is not present
      //also similar to gravitateTowards formuale magnitude * cos (theta)
    this.vx += springForceMag * (dx / dist);
    this.vy += springForceMag * (dy / dist);
  }

  addSpring(point, k, length) {
    this.removeSpring(point);
    this.springs.push({
      point: point,
      k: k,
      length: length || 0,
    });
  }

  removeSpring(point) {
    for (let i = 0; i < this.springs.length; i++) {
      if (point === this.springs[i].point) {
        this.springs.splice(i, 1);
        return;
      }
    }
  }

  handleSprings() {
    for (let i = 0; i < this.springs.length; i++) {
      let spring = this.springs[i];
      this.springTo(spring.point, spring.k, spring.length);
    }
  }

  addGravitation(p) {
    this.removeGravitation(p);
    this.gravitations.push(p);
  }

  removeGravitation(p) {
    for (let i = 0; i < this.gravitations.length; i++) {
      if (p === this.gravitations[i]) {
        this.gravitations.splice(i, 1);
      }
    }
  }

  handleGravitations() {
    for (let i = 0; i < this.gravitations.length; i++) {
      this.gravitateTo(this.gravitations[i]);
    }
  }
}
