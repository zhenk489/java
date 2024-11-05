/*
 * @name Colorful Reach
 * @arialabel A colorful segmented arm attached to the bottom of the screen follows the mouse, with each segment having a gradient effect
 * @frame 710,400
 * @description The arm follows the mouse position with a gradient color and varied segment lengths.
 */

let numSegments = 10,
  x = [],
  y = [],
  angle = [],
  segLength = 26,
  targetX,
  targetY;

for (let i = 0; i < numSegments; i++) {
  x[i] = 0;
  y[i] = 0;
  angle[i] = 0;
}

function setup() {
  createCanvas(710, 400);
  x[x.length - 1] = width / 2; // Set base x-coordinate
  y[x.length - 1] = height; // Set base y-coordinate
}

function draw() {
  background(0);

  reachSegment(0, mouseX, mouseY);
  for (let i = 1; i < numSegments; i++) {
    reachSegment(i, targetX, targetY);
  }
  for (let j = x.length - 1; j >= 1; j--) {
    positionSegment(j, j - 1);
  }
  for (let k = 0; k < x.length; k++) {
    segment(x[k], y[k], angle[k], (k + 1) * 2, color((k * 25) % 255, 100, 200)); // Dynamic color
  }
}

function positionSegment(a, b) {
  x[b] = x[a] + cos(angle[a]) * (segLength * (1 + b * 0.05)); // Vary segment length slightly
  y[b] = y[a] + sin(angle[a]) * (segLength * (1 + b * 0.05));
}

function reachSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  angle[i] = atan2(dy, dx);
  targetX = xin - cos(angle[i]) * segLength * 0.8; // Slightly reduce speed of reach
  targetY = yin - sin(angle[i]) * segLength * 0.8;
}

function segment(x, y, a, sw, col) {
  strokeWeight(sw);
  stroke(col); // Apply color to each segment
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
