const canvas = document.getElementById("game-pages");
const ctx = canvas.getContext("2d");

const ctx_width = window.innerWidth;
const ctx_height = window.innerHeight;

canvas.width = ctx_width;
canvas.height = ctx_height;

canvas.style.background = "aquamarine";

class Circle {
  constructor(x, y, radius, color, strokeColor) {
    this.x = x; // "this" is refer to function according to the function itself
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.strokeColor = strokeColor;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.strokeColor; // Stroke style color
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
  }
}

let all_circles = [];

function createCircle(circle) {
  circle.draw(ctx);
}

// Create Random Circle
for (let num = 0; num < 10; num++) {
  const random_x = Math.random() * window.innerWidth;
  const random_y = Math.random() * window.innerHeight;

  let circle = new Circle(random_x, random_y, 30, "red", "red");
  all_circles.push(circle);
  createCircle(all_circles[num]);
}

// x, y, radius, color, strokeColor
let circle = new Circle(100, 100, 30, "red", "red"); // Create new instance / object of Circle
circle.draw(ctx); // Aplying draw function in circle
