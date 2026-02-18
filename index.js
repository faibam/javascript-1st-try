// ===================================
// ROCK PAPER SCISSORS GAME
// ===================================

// -----------------------------------
// GET ALL THE HTML ELEMENTS WE NEED
// -----------------------------------

// Get the three main stage containers
const stageLanding = document.getElementById("stage-landing"); // Landing page with Play button
const stageChoice = document.getElementById("stage-choice");   // Choice page where you pick rock/paper/scissors
const stageResult = document.getElementById("stage-result");   // Result page that shows who won

// Get all the buttons
const playBtn = document.getElementById("playBtn");           // The big Play button on landing page
const rockBtn = document.getElementById("rockBtn");           // Rock button
const paperBtn = document.getElementById("paperBtn");         // Paper button
const scissorsBtn = document.getElementById("scissorsBtn");   // Scissors button

// Get the hand emoji elements (the floating circles that show rock/paper/scissors)
const playerEmoji = document.getElementById("player-emoji");  // Player's hand emoji (left side)
const aiEmoji = document.getElementById("ai-emoji");          // AI's hand emoji (right side)
const vsBubble = document.getElementById("vs-bubble");        // The VS bubble in the middle
const aiHand = document.getElementById("ai-hand");            // The AI hand container

// Get result screen elements
const resultTitle = document.getElementById("result-title");        // "You win!" or "You lose!" text
const playerScoreBig = document.getElementById("player-score-big"); // Your score on result screen
const aiScoreBig = document.getElementById("ai-score-big");         // AI score on result screen

// -----------------------------------
// SCORE TRACKING VARIABLES
// -----------------------------------

let playerScore = 0;  // Keeps track of how many rounds you won
let aiScore = 0;      // Keeps track of how many rounds AI won

// -----------------------------------
// EMOJI MAP - Maps choice names to emoji symbols
// -----------------------------------

const emojiMap = {
  rock: "✊",      // Fist emoji
  paper: "✋",     // Hand emoji
  scissors: "✌️"  // Peace sign emoji
};

// -----------------------------------
// HELPER FUNCTIONS
// -----------------------------------

// Gets a random choice for the AI
function getAIChoice() {
  const choices = ["rock", "paper", "scissors"];  // All possible choices
  const index = Math.floor(Math.random() * choices.length);  // Pick a random index
  return choices[index];  // Return the choice at that index
}

// Makes a button "pop" with animation when clicked
function popButton(button) {
  button.classList.add("popped");  // Add the popped class for styling

  // Remove the popped class after 1 second
  setTimeout(() => {
    button.classList.remove("popped");
  }, 1000);
}

// Figures out who won the round
function getWinner(playerChoice, aiChoice) {
  // If both picked the same thing, it's a tie
  if (playerChoice === aiChoice) return "tie";

  // Check all the ways player can win
  if (
    (playerChoice === "rock" && aiChoice === "scissors") ||  // Rock crushes scissors
    (playerChoice === "paper" && aiChoice === "rock") ||     // Paper covers rock
    (playerChoice === "scissors" && aiChoice === "paper")    // Scissors cuts paper
  ) {
    return "win";  // Player wins!
  }

  return "lose";  // Otherwise AI wins
}

// -----------------------------------
// STAGE 1 -> STAGE 2: PLAY BUTTON CLICK
// -----------------------------------

playBtn.addEventListener("click", function () {
  popButton(playBtn);  // Make the button pop

  // Wait 0.3 seconds, then start the zoom out animation
  setTimeout(() => {
    stageLanding.classList.add("exit-zoom");

    // Wait for zoom animation to finish, then switch to choice stage
    setTimeout(() => {
      stageLanding.style.display = "none";  // Hide landing page
      stageChoice.style.display = "flex";   // Show choice page
    }, 400);
  }, 300);
});

// -----------------------------------
// STAGE 2: HANDLE PLAYER CHOICE
// -----------------------------------

// This function runs when you click rock, paper, or scissors
function handleChoice(choice, button) {
  popButton(button);  // Make the button pop

  // Disable all buttons so player can't click again
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;

  // Update the player's hand to show what they picked
  playerEmoji.textContent = emojiMap[choice];

  // Get the AI's random choice
  const aiChoice = getAIChoice();

  // Wait a bit, then reveal the AI's choice and VS bubble together
  setTimeout(() => {
    // Update AI hand emoji and reveal it
    aiEmoji.textContent = emojiMap[aiChoice];
    aiHand.classList.add("reveal");
    
    // Reveal VS bubble at the same time
    vsBubble.classList.add("reveal");

    // After the reveal animation, go to result screen
    setTimeout(() => {
      goToResultStage(choice, aiChoice);
    }, 800);
  }, 500);
}

// Hook up the click events for all three choice buttons
rockBtn.addEventListener("click", () => handleChoice("rock", rockBtn));
paperBtn.addEventListener("click", () => handleChoice("paper", paperBtn));
scissorsBtn.addEventListener("click", () => handleChoice("scissors", scissorsBtn));

// -----------------------------------
// HOVER EFFECTS FOR CHOICE BUTTONS
// -----------------------------------

// When you hover over a button, show that choice on your hand
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
  playerEmoji.textContent = "❓";  // Question mark emoji
};

// When you move mouse away from buttons, reset to question mark
rockBtn.addEventListener("mouseout", resetPlayerHand);
paperBtn.addEventListener("mouseout", resetPlayerHand);
scissorsBtn.addEventListener("mouseout", resetPlayerHand);

// -----------------------------------
// STAGE 3: SHOW RESULT SCREEN
// -----------------------------------

function goToResultStage(playerChoice, aiChoice) {
  // Figure out who won this round
  const result = getWinner(playerChoice, aiChoice);

  // Update the scores based on who won
  if (result === "win") {
    playerScore++;  // You get a point!
    resultTitle.textContent = "You win!";
  } else if (result === "lose") {
    aiScore++;  // AI gets a point
    resultTitle.textContent = "You lose!";
  } else {
    resultTitle.textContent = "It's a tie!";
  }

  // Update the big score numbers on result screen
  playerScoreBig.textContent = playerScore;
  aiScoreBig.textContent = aiScore;

  // Switch from choice stage to result stage
  stageChoice.style.display = "none";
  stageResult.style.display = "flex";

  // -----------------------------------
  // AUTO-REDIRECT AFTER 3 SECONDS
  // -----------------------------------

  // Wait 3 seconds, then automatically go back to choice stage
  setTimeout(() => {
    // Reset the choice stage to default state
    vsBubble.classList.remove("reveal");    // Hide the VS bubble again
    aiHand.classList.remove("reveal");      // Hide the AI hand again
    playerEmoji.textContent = "❓";         // Reset player hand to question mark
    aiEmoji.textContent = "✊";             // Reset AI hand to default fist

    // Re-enable all buttons
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;

    // Go back to choice stage
    stageResult.style.display = "none";
    stageChoice.style.display = "flex";
  }, 3000);  // 3000 milliseconds = 3 seconds
}
