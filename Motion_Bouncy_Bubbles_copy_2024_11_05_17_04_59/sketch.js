/*
 * @name Colorful Bouncy Bubbles
 * @arialabel Colorful circles of varying sizes bounce off the sides of the canvas and each other, eventually settling on the bottom of the screen
 * @frame 720,400
 * @description  based on code from Keith Peters. Multiple-object collision with color and increasing gravity.
 */

let numBalls = 13;
let spring = 0.05;
let gravity = 0.03;
let friction = -0.9;
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
      color(random(255), random(255), random(255), 200) // Random color for each ball with transparency
    );
  }
  noStroke();
}

function draw() {
  background(0);
  gravity += 0.0001; // Gradually increase gravity to make balls settle faster
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}

class Ball {
  constructor(xin, yin, din, idin, oin, col) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.color = col; // Color property
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

        // Simulated bounce sound effect in console
        console.log("Bounce!");
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
      console.log("Wall bounce!"); // Simulated sound effect
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
      console.log("Wall bounce!"); // Simulated sound effect
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
      console.log("Floor bounce!"); // Simulated sound effect
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
      console.log("Ceiling bounce!"); // Simulated sound effect
    }
  }

  display() {
    fill(this.color); // Set fill to the ball's color
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
