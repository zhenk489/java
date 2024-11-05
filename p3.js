/*
 * @name Colorful Bouncy Bubbles
 * @arialabel Colorful circles of varying sizes and colors bounce off the sides of the canvas and each other, eventually settling at the bottom
 * @frame 720,400
 * @description Modified version with colorful balls, variable gravity, and random bounce strength.
 */

let numBalls = 13;
let spring = 0.05;
let gravity = 0.03;
let balls = [];

function setup() {
  createCanvas(720, 400);
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(30, 70),
      i,
      balls,
      color(random(255), random(255), random(255), 200), // Random color with transparency
      random(-0.8, -0.6) // Random friction for each ball
    );
  }
  noStroke();
}

function draw() {
  background(0);
  gravity += 0.0001; // Gradually increase gravity over time

  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}

class Ball {
  constructor(xin, yin, din, idin, oin, col, fric) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.color = col; // Color property
    this.friction = fric; // Friction property for each ball
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      if (distance < minDist) {
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= this.friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= this.friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= this.friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= this.friction;
    }
  }

  display() {
    fill(this.color); // Apply unique color to each ball
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

