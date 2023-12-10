function draw() {
  const canvas = document.getElementById("game-pages");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(45, 30);
    ctx.lineTo(30, 60);
    ctx.lineTo(60, 60);
    ctx.closePath();
    ctx.stroke();
  }
}

draw();
