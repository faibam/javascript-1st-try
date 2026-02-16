const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const statusEl = document.getElementById("status");
const scoreEl = document.getElementById("score");

let playerScore = 0;
let aiScore = 0;

function getAIChoice() {
  const choices = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function popButton(button) {
  button.classList.add("popped");
    button.classList.add("splat");

    // Create burst lines
    const burstContainer = document.createElement('div');
    burstContainer.className = 'pop-lines';
    button.appendChild(burstContainer);
    
    // Create 8 lines at 45-degree intervals
    for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.className = 'pop-line';
        const angle = i * 45;
        line.style.transform = `rotate(${angle}deg) translateY(-20px)`;
        burstContainer.appendChild(line);
    }
    
    // Remove burst container after animation
    setTimeout(() => {
        burstContainer.remove();
    }, 400);
  setTimeout(() => {
    button.classList.remove("popped");
        button.classList.remove("splat");
  }, 1000);
}

function playRound(playerChoice, button) {
  popButton(button);
  
  const aiChoice = getAIChoice();
  let result = "";
  if (playerChoice == aiChoice) {
    result = "tie";    
  }
  else if (
    (playerChoice === "rock" && aiChoice === "scissors") ||
    (playerChoice === "paper" && aiChoice === "rock") ||
    (playerChoice === "scissors" && aiChoice === "paper")
  ) {
    result = "Win";
  } 
  else result = "Lose";

if (result == "Win") {
  playerScore++; 
} else if (result == "Lose") {
  aiScore++;
} 

statusEl.textContent = 
"You chose " + playerChoice + " and AI chose " + aiChoice + ". Results = " + result;

scoreEl.textContent = "You: " + playerScore + " |  AI: " + aiScore;
}

rockBtn.addEventListener("click", function () {
  playRound("rock", rockBtn);
});

paperBtn.addEventListener("click", function () {
  playRound("paper", paperBtn);
});

scissorsBtn.addEventListener("click", function () {
  playRound("scissors", scissorsBtn);
});

// Play button handler
const playBtn = document.getElementById("playBtn");
const landing = document.getElementById("landing");
const game = document.getElementById("game");

if (playBtn) {
  playBtn.addEventListener("click", function () {
    // Add popped class to play button
    playBtn.classList.add("popped");
    
    // Wait 0.3 seconds then transition to game
    setTimeout(() => {
      landing.style.display = "none";
      game.style.display = "flex";
    }, 300);
  });
}
