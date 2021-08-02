function Vehicle(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random3D();
    this.acc = createVector();
    this.r = 3;
    this.maxspeed = 15;
    this.maxforce = 2;

}

Vehicle.prototype.behaviors = function() {
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);
    arrive.mult(2);
    flee.mult(10);
    this.applyForce(arrive);
    this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f) {
    this.acc.add(f);
}


Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Vehicle.prototype.show = function() {
    stroke(10, 255, 255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
}


Vehicle.prototype.arrive = function(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let dist = desired.mag();
    let speed = this.maxspeed;
    if (dist < 50) {
        speed = map(dist, 0, 100, 0, this.maxsped);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
}


Vehicle.prototype.flee = function(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    if (d < 80) {
        desired.setMag(this.maxspeed);
        desired.mult(-2);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;

    } else {
        return createVector(0, 0);
    }

}