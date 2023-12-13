// const canvas = document.getElementById("game-pages");
// const ctx = canvas.getContext("2d");

// const ctx_width = window.innerWidth;
// const ctx_height = window.innerHeight;

// canvas.width = ctx_width;
// canvas.height = ctx_height;

// canvas.style.background = "aquamarine";

// class Circle {
//   constructor(x, y, radius, color, strokeColor, text) {
//     this.x = x; // "this" is refer to function according to the function itself
//     this.y = y;
//     this.radius = radius;
//     this.color = color;
//     this.strokeColor = strokeColor;
//     this.text = text;
//   }

//   draw(ctx) {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     ctx.text = this.text;
//     ctx.fillText(this.text, this.x, this.y);
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.font = "20px arial";

//     ctx.lineWidth = "2";
//     ctx.fillStyle = this.color;
//     ctx.strokeStyle = this.strokeColor; // Stroke style color
//     ctx.stroke();
//     ctx.closePath();
//   }
// }

// let all_circles = [];

// let counter_num = 1;
// function createCircle(circle) {
//   circle.draw(ctx);
// }

// // Create Random Circle
// for (let num = 0; num < 10; num++) {
//   const random_x = Math.random() * window.innerWidth;
//   const random_y = Math.random() * window.innerHeight;

//   let circle = new Circle(random_x, random_y, 40, "red", "red", counter_num);
//   all_circles.push(circle);
//   createCircle(all_circles[num]);
//   counter_num++;
// }

// // x, y, radius, color, strokeColor
// let circle = new Circle(100, 100, 40, "red", "red", counter_num); // Create new instance / object of Circle
// circle.draw(ctx); // Aplying draw function in circle

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const virusHitSound = document.getElementById("virusHitSound");

canvas.style.background = "aquamarine";

const playerImage = new Image();
playerImage.src = "assets/basket.png"; // Ganti dengan path gambar basket.png
playerImage.id = "playerImage"; // Menambahkan id untuk gaya CSS

const player = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  width: 50, // Sesuaikan dengan lebar gambar
  height: 50, // Sesuaikan dengan tinggi gambar
  speed: 20,
};

const viruses = [];
const virusRadius = 15;
const virusSpeed = 1;

let score = 0;

function drawPlayer() {
  ctx.drawImage(
    playerImage,
    player.x - player.width / 2,
    player.y - player.height / 2,
    player.width,
    player.height
  );
}

function drawViruses() {
  for (const virus of viruses) {
    ctx.beginPath();
    ctx.arc(virus.x, virus.y, virusRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#F00";
    ctx.fill();
    ctx.closePath();
  }
}

function movePlayer(direction) {
  if (direction === "left" && player.x - player.width / 2 > 0) {
    player.x -= player.speed;
  } else if (
    direction === "right" &&
    player.x + player.width / 2 < canvas.width
  ) {
    player.x += player.speed;
  }
}

function createVirus() {
  const x = Math.random() * canvas.width;
  const y = -virusRadius;
  viruses.push({ x, y });
}

function checkCollisions() {
  for (let i = 0; i < viruses.length; i++) {
    const virus = viruses[i];
    const distance = Math.sqrt(
      (player.x - virus.x) ** 2 + (player.y - virus.y) ** 2
    );
    if (distance < virusRadius + player.width / 2) {
      // When virus hit basket
      viruses.splice(i, 1);
      score += 10;
      updateScore();
      
      console.log(score);
    }
  }
}

function updateScore() {
  // Update Score
  scoreElement.textContent = "Score: " + score;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawViruses();

  checkCollisions();

  viruses.forEach((virus, index) => {
    virus.y += virusSpeed;
    if (virus.y > canvas.height + virusRadius) {
      viruses.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    movePlayer("left");
  } else if (event.key === "ArrowRight") {
    movePlayer("right");
  }
});

setInterval(createVirus, 1000);

draw();
