const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load player data
const player = JSON.parse(sessionStorage.getItem('player')) || {
  nickname: "Guest",
  character: "warrior",
};

// Game Stats
let health = 100;
let timeLeft = 180; // 3 minutes in seconds

// Update HUD
function updateHUD() {
  document.getElementById('health').style.width = `${health}%`;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Countdown Timer
setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    updateHUD();
  } else {
    alert("Time's up! Game Over.");
    window.location.href = "lobby.html";
  }
}, 1000);

// Game Loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Player
  const playerImage = new Image();
  playerImage.src = `${player.character}.png`; // Load character sprite
  ctx.drawImage(playerImage, canvas.width / 2 - 50, canvas.height - 150, 100, 100);

  // Next frame
  requestAnimationFrame(gameLoop);
}

// Start game
updateHUD();
gameLoop();