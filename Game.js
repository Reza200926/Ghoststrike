const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player stats
const player = {
  x: 100,
  y: canvas.height - 150,
  width: 50,
  height: 50,
  color: "blue",
  health: 100,
  speed: 3,
};

// NPC
let npcList = [];
let level = 1;

// Timer
let timeLeft = 180; // 3 minutes in seconds

function spawnNPC(level) {
  for (let i = 0; i < level; i++) {
    npcList.push({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height - 200),
      width: 40,
      height: 40,
      color: "red",
      speed: Math.random() * 2 + level,
    });
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawNPC() {
  npcList.forEach((npc) => {
    ctx.fillStyle = npc.color;
    ctx.fillRect(npc.x, npc.y, npc.width, npc.height);
  });
}

function moveNPC() {
  npcList.forEach((npc) => {
    npc.x += Math.random() > 0.5 ? npc.speed : -npc.speed;
    npc.y += Math.random() > 0.5 ? npc.speed : -npc.speed;

    // Collision with player
    if (
      npc.x < player.x + player.width &&
      npc.x + npc.width > player.x &&
      npc.y < player.y + player.height &&
      npc.y + npc.height > player.y
    ) {
      player.health -= 1;
    }
  });
}

// Timer logic
function updateTimer() {
  const timerElement = document.getElementById('timer');
  timeLeft--;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (timeLeft <= 0) {
    alert("Time's up! Game Over.");
    location.reload();
  }
}

// Joystick movement
let joystick = { x: 0, y: 0 };

document.getElementById('joystick-knob').addEventListener('mousedown', (e) => {
  joystick.x = e.clientX;
  joystick.y = e.clientY;

  document.onmousemove = (e) => {
    const dx = e.clientX - joystick.x;
    const dy = e.clientY - joystick.y;

    player.x += dx / 10;
    player.y += dy / 10;
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawNPC();
  moveNPC();

  document.getElementById('health').style.width = `${player.health}%`;

  if (player.health <= 0) {
    alert("Game Over. You lost!");
    location.reload();
  }

  requestAnimationFrame(gameLoop);
}

// Start the game
function startGame() {
  spawnNPC(level);
  setInterval(updateTimer, 1000);
  gameLoop();
}

// Gambar karakter
const playerImage = new Image();
playerImage.src = "player.png";

const npcImage = new Image();
npcImage.src = "npc.png";

function drawPlayer() {
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawNPC() {
  npcList.forEach((npc) => {
    ctx.drawImage(npcImage, npc.x, npc.y, npc.width, npc.height);
  });
}

const playerImage = new Image();
playerImage.src = `${player.character}.png`;

function spawnNPC(level) {
  for (let i = 0; i < level; i++) {
    npcList.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      width: 40,
      height: 40,
      color: "red",
      speed: 1 + level * 2,
    });
  }
}