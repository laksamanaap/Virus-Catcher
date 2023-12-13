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
canvas.style.background = "aquamarine";
const ctx = canvas.getContext("2d");
const virusHitSound = document.getElementById("virusHitSound");

const playerImage = new Image();
playerImage.src = "assets/basket.png";
playerImage.id = "playerImage";

const player = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  width: 75,
  height: 50,
  speed: 20,
};

const viruses = [];
let virusSpeed = 1;

let score = 0;
let time = 60;
let timeInterval = setInterval(() => updateTime(), 1000); // Store the interval ID in a variable

const variantPoints = {
  // Virus Type
  Alpha: 1,
  Beta: 2,
  Gamma: 3,
  Delta: 4,
  Omicron: 5,
};

function drawPlayer() {
  // Draw Player
  ctx.drawImage(
    playerImage,
    player.x - player.width / 2,
    player.y - player.height / 2,
    player.width,
    player.height
  );
}

function drawVirus(x, y, radius, color) {
  // Draw Virus
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  // Draw Score
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Score: " + score, 50, 30);
}

function drawTime() {
  // Format Time
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText(
    `Time: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`,
    canvas.width - 150,
    30
  );
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
  // Create Virus
  const x = Math.random() * canvas.width;
  const y = -30;
  const radius = 15;
  let color;

  // The Variant Still Temporary
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
  // Check if the virus hit the basket or not
  for (let i = 0; i < viruses.length; i++) {
    const virus = viruses[i];
    const distance = Math.sqrt(
      (player.x - virus.x) ** 2 + (player.y - virus.y) ** 2
    );
    if (distance < virus.radius + player.width / 2) {
      viruses.splice(i, 1);
      playVirusHitSound(virus.variant);
      break;
    }
  }
}

function updateScore() {
  // Update Score when virus hit the basket
  ctx.clearRect(canvas.width - 80, 0, 80, 30);
  drawScore();

  if (score % 40 === 0 || score % 20 === 0) {
    virusSpeed += 5;
  }
}

function playVirusHitSound(variant) {
  // Play Sound when virus hit the basket
  virusHitSound.currentTime = 0;
  virusHitSound.play();
  score += variantPoints[variant];
  updateScore();
}

function updateTime() {
  // Update Time
  ctx.clearRect(canvas.width - 150, 0, 150, 30);
  drawTime();

  if (time <= 0) {
    endGame();
  } else {
    time -= 1;
  }
}

function changeTimeInterval(newInterval) {
  clearInterval(timeInterval);
  timeInterval = setInterval(() => updateTime(), newInterval);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();

  viruses.forEach((virus, index) => {
    drawVirus(virus.x, (virus.y += virusSpeed), virus.radius, virus.color);

    if (virus.y > canvas.height + virus.radius) {
      viruses.splice(index, 1);
    }
  });

  checkCollisions();
  drawScore();
  drawTime();

  requestAnimationFrame(draw);
}

function endGame() {
  // User Confirmation (Restart Game)
  const userResponse = confirm(
    "Game Over! Your score: " + score + "\nRestart the game?"
  );
  if (userResponse) {
    window.location.reload();
  }
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
