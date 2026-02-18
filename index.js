// Get DOM elements
const stageLanding = document.getElementById("stage-landing");
const stageChoice = document.getElementById("stage-choice");
const stageResult = document.getElementById("stage-result");

const playBtn = document.getElementById("playBtn");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const playerEmoji = document.getElementById("player-emoji");
const aiEmoji = document.getElementById("ai-emoji");
const vsCloud = document.getElementById("vs-cloud");
const aiHand = document.getElementById("ai-hand");

const resultTitle = document.getElementById("result-title");
const playerScoreBig = document.getElementById("player-score-big");
const aiScoreBig = document.getElementById("ai-score-big");

let playerScore = 0;
let aiScore = 0;

// Emoji map for choices
const emojiMap = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️"
};

// Get AI choice
function getAIChoice() {
  const choices = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// Pop button animation
function popButton(button) {
  button.classList.add("popped");

  // Create burst lines
  const burstContainer = document.createElement("div");
  burstContainer.className = "pop-lines";
  button.appendChild(burstContainer);

  // Create 8 lines at 45-degree intervals
  for (let i = 0; i < 8; i++) {
    const line = document.createElement("div");
    line.className = "pop-line";
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
  }, 1000);
}

// Calculate winner
function getWinner(playerChoice, aiChoice) {
  if (playerChoice === aiChoice) return "tie";
  if (
    (playerChoice === "rock" && aiChoice === "scissors") ||
    (playerChoice === "paper" && aiChoice === "rock") ||
    (playerChoice === "scissors" && aiChoice === "paper")
  ) {
    return "win";
  }
  return "lose";
}

// Stage 1 -> Stage 2: Play button
playBtn.addEventListener("click", function () {
  popButton(playBtn);

  setTimeout(() => {
    stageLanding.classList.add("exit-zoom");

    setTimeout(() => {
      stageLanding.style.display = "none";
      stageChoice.style.display = "flex";
    }, 400);
  }, 300);
});

// Stage 2 -> Stage 3: Choice buttons
function handleChoice(choice, button) {
  popButton(button);

  // Update player hand emoji
  playerEmoji.textContent = emojiMap[choice];

  // Get AI choice
  const aiChoice = getAIChoice();

  // Wait a bit, then fade cloud and reveal AI hand
  setTimeout(() => {
    vsCloud.classList.add("fade-out");

    // Update AI emoji and reveal
    aiEmoji.textContent = emojiMap[aiChoice];
    aiHand.classList.add("reveal");

    // After reveal, transition to result screen
    setTimeout(() => {
      goToResultStage(choice, aiChoice);
    }, 800);
  }, 500);
}

rockBtn.addEventListener("click", () => handleChoice("rock", rockBtn));
paperBtn.addEventListener("click", () => handleChoice("paper", paperBtn));
scissorsBtn.addEventListener("click", () => handleChoice("scissors", scissorsBtn));

// Hover handlers to update player hand preview
rockBtn.addEventListener("mouseover", () => {
  playerEmoji.textContent = emojiMap["rock"];
});

paperBtn.addEventListener("mouseover", () => {
  playerEmoji.textContent = emojiMap["paper"];
});

scissorsBtn.addEventListener("mouseover", () => {
  playerEmoji.textContent = emojiMap["scissors"];
});

// Reset to question mark when not hovering
const resetPlayerHand = () => {
  playerEmoji.textContent = "❓";
};

rockBtn.addEventListener("mouseout", resetPlayerHand);
paperBtn.addEventListener("mouseout", resetPlayerHand);
scissorsBtn.addEventListener("mouseout", resetPlayerHand);

// Go to result stage
function goToResultStage(playerChoice, aiChoice) {
  const result = getWinner(playerChoice, aiChoice);

  // Update scores
  if (result === "win") {
    playerScore++;
    resultTitle.textContent = "You win!";
  } else if (result === "lose") {
    aiScore++;
    resultTitle.textContent = "You lose!";
  } else {
    resultTitle.textContent = "It's a tie!";
  }

  // Update score displays
  playerScoreBig.textContent = playerScore;
  aiScoreBig.textContent = aiScore;

  // Transition to result stage
  stageChoice.style.display = "none";
  stageResult.style.display = "flex";

    // Auto-redirect back to choice stage after 3 seconds
  setTimeout(() => {
    // Reset choice stage
    vsCloud.classList.remove("fade-out");
    aiHand.classList.remove("reveal");
    playerEmoji.textContent = "❓";
    aiEmoji.textContent = "✊";

    // Transition back to choice stage
    stageResult.style.display = "none";
    stageChoice.style.display = "flex";
  }, 3000);
}


});
