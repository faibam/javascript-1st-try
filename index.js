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
  setTimeout(() => {
    button.classList.remove("popped");
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
