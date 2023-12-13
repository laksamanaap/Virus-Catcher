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

const gameWrapper = document.getElementById("gameWrapper");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const virusHitSound = document.getElementById("virusHitSound");

const playerImage = new Image();
playerImage.src = "assets/basket.png";
playerImage.id = "playerImage";

const player = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  width: 50,
  height: 50,
  speed: 20,
};

const viruses = [];
let virusSpeed = 1;

let score = 0;

const variantPoints = {
  Alpha: 1,
  Beta: 2,
  Gamma: 3,
  Delta: 4,
  Omicron: 5,
};

function drawPlayer() {
  ctx.drawImage(
    playerImage,
    player.x - player.width / 2,
    player.y - player.height / 2,
    player.width,
    player.height
  );
}

function drawVirus(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Score: " + score, 50, 30);
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

function createVirus(variant) {
  // Create Varian
  const x = Math.random() * canvas.width;
  const y = -30;
  const radius = 15;
  let color;

  switch (variant) {
    case "Alpha":
      color = "#FF0000"; // Merah
      break;
    case "Beta":
      color = "#00FF00"; // Hijau
      break;
    case "Gamma":
      color = "#0000FF"; // Biru
      break;
    case "Delta":
      color = "#FFFF00"; // Kuning
      break;
    case "Omicron":
      color = "#FFA500"; // Oranye
      break;
    default:
      color = "#000000"; // Hitam (default)
      break;
  }

  viruses.push({ x, y, radius, color, variant });
}

function checkCollisions() {
  for (let i = 0; i < viruses.length; i++) {
    const virus = viruses[i];
    const distance = Math.sqrt(
      (player.x - virus.x) ** 2 + (player.y - virus.y) ** 2
    );
    if (distance < virus.radius + player.width / 2) {
      viruses.splice(i, 1);
      playVirusHitSound(virus.variant);
      break; // Hentikan iterasi setelah menemukan tabrakan
    }
  }
}

function updateScore() {
  ctx.clearRect(canvas.width - 80, 0, 80, 30);
  drawScore();

  if (score % 40 === 0 || score % 20 === 0) {
    virusSpeed += 3;
  }
}

function playVirusHitSound(variant) {
  virusHitSound.currentTime = 0;
  virusHitSound.play();
  score += variantPoints[variant]; // Tambahkan skor sesuai dengan varian virus
  updateScore(); // Memanggil updateScore setelah memutar suara
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();

  viruses.forEach((virus, index) => {
    drawVirus(virus.x, (virus.y += virusSpeed), virus.radius, virus.color);

    if (virus.y > canvas.height + virus.radius) {
      // Virus melewati layar, hapus dari array
      viruses.splice(index, 1);
    }
  });

  checkCollisions();
  drawScore();

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    movePlayer("left");
  } else if (event.key === "ArrowRight") {
    movePlayer("right");
  }
});

setInterval(() => {
  const variants = ["Alpha", "Beta", "Gamma", "Delta", "Omicron"];
  const randomVariant = variants[Math.floor(Math.random() * variants.length)];
  createVirus(randomVariant);
}, 1000);

draw();
console.log(virusSpeed);
