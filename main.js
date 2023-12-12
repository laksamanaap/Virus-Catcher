const canvas = document.getElementById("game-pages");
const ctx = canvas.getContext("2d");

const ctxWidth = window.innerWidth;
const ctxHeight = window.innerHeight;

canvas.width = ctxWidth;
canvas.height = ctxHeight;

canvas.style.background = "aquamarine";

class Circle {
  constructor(x, y, radius, color, strokeColor) {
    this.x = x; // "this" is refer to function according to the function itself
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.strokeColor = strokeColor;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.strokeColor; // Strokex Style
    ctx.stroke();
    ctx.closePath();
  }
}

// x, y, radius, color, strokeColor
let circle = new Circle(100, 100, 30, "red", "red"); // Create new instance / object of Circle
circle.draw(); // Aplying draw function in circle class
