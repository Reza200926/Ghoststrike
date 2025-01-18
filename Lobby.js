const startGameButton = document.getElementById('start-game');
const nicknameInput = document.getElementById('nickname');
const characters = document.querySelectorAll('.character');

// Player Data
let player = {
  nickname: "",
  character: "warrior", // Default character
};

// Character Selection
characters.forEach((character) => {
  character.addEventListener('click', () => {
    characters.forEach((char) => char.style.borderColor = 'transparent');
    character.style.borderColor = 'white';
    player.character = character.getAttribute('data-character');
    console.log(`Character selected: ${player.character}`);
  });
});

// Start Game Button
startGameButton.addEventListener('click', () => {
  player.nickname = nicknameInput.value.trim();

  if (!player.nickname) {
    alert("Please enter your nickname!");
    return;
  }

  // Save player data to session storage
  sessionStorage.setItem('player', JSON.stringify(player));

  // Redirect to in-game page
  window.location.href = "ingame.html";
});