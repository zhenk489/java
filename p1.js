/*
 * @name Colorful Inheritance
 * @arialabel Two colorful circles connected and spinning around each other with a line, creating a dynamic visual effect
 * @description Enhanced inheritance example with color, increasing speed, and dynamic spot sizes.
 */

let spots, arm;

function setup() {
  createCanvas(640, 360);
  arm = new SpinArm(width / 2, height / 2, 0.01);
  spots = new SpinSpots(width / 2, height / 2, -0.02, 90.0);
}

function draw() {
  background(204);
  arm.update();
  arm.display();
  spots.update();
  spots.display();
}

class Spin {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    this.angle = 0.0;
  }

  update() {
    this.angle += this.speed;
    this.speed += 0.00005; // Gradually increase speed
  }
}

class SpinArm extends Spin {
  constructor(x, y, s) {
    super(x, y, s);
  }

  display() {
    strokeWeight(2);
    stroke(100, 100, 255); // Add color to the line
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    line(0, 0, 165, 0);
    pop();
  }
}

class SpinSpots extends Spin {
  constructor(x, y, s, d) {
    super(x, y, s);
    this.dim = d;
  }

  display() {
    let sizeModifier = map(sin(this.angle), -1, 1, 0.8, 1.2); // Change size dynamically
    noStroke();
    fill(255, 100, 100, 150); // Add color to the spots
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    ellipse(-this.dim / 2, 0, this.dim * sizeModifier, this.dim * sizeModifier);
    ellipse(this.dim / 2, 0, this.dim * sizeModifier, this.dim * sizeModifier);
    pop();
  }
}
