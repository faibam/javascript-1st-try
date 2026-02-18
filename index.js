// ========================================
// ROCK PAPER SCISSORS GAME
// ========================================

// ----------------------------------------
// GET ALL THE HTML ELEMENTS WE NEED
// ----------------------------------------

const stageLanding = document.getElementById("stage-landing"); // Landing page with Play button
const stageChoice = document.getElementById("stage-choice");   // Choice page where you pick rock/paper/scissors
const stageResult = document.getElementById("stage-result");   // Result page that shows who won

// Get all the buttons
const playBtn = document.getElementById("playBtn");            // The big Play button on landing page
const rockBtn = document.getElementById("rockBtn");            // Rock button
const paperBtn = document.getElementById("paperBtn");          // Paper button
const scissorsBtn = document.getElementById("scissorsBtn");    // Scissors button

// Get the hand emoji elements (the floating circles that show rock/paper/scissors)
const playerEmoji = document.getElementById("player-emoji");   // Player's hand emoji (left side)
const aiEmoji = document.getElementById("ai-emoji");           // AI's hand emoji (right side)
const vsCloud = document.getElementById("vs-cloud");           // The VS cloud in the middle
const aiHand = document.getElementById("ai-hand");             // The AI hand container

// Get the result screen elements
const statusText = document.getElementById("status");          // "You Win!" or "You Lose!" text
const playerScoreBig = document.getElementById("player-score-big"); // Player's big score number
const aiScoreBig = document.getElementById("ai-score-big");         // AI's big score number

// ----------------------------------------
// EMOJI MAP - Maps choice names to emoji symbols
// ----------------------------------------

const emojiMap = {
    rock: "✊",        // First emoji
    paper: "✋",       // Hand emoji
    scissors: "✌"     // Peace sign emoji
};

// ----------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------

// Gets a random choice for the AI
function getAIChoice() {
    const choices = ["rock", "paper", "scissors"]; // All possible choices
    const index = Math.floor(Math.random() * choices.length); // Pick a random index
    return choices[index]; // Return the choice at that index
}

// Makes a button "pop" with animation when clicked
function popButton(button) {
    button.classList.add("popped"); // Add the popped class for styling
}

// Creates a burst effect with lines radiating outward from click position
function createBurst(event, button) {
    const burst = document.createElement("div"); // Make a new div for the burst
    burst.classList.add("burst");                // Add the burst class for styling
    
    // Get button position and size
    const buttonRect = button.getBoundingClientRect();
    
    // Calculate click position relative to button
    const clickX = event.clientX - buttonRect.left;
    const clickY = event.clientY - buttonRect.top;
    
    // Position burst container at click location
    burst.style.left = clickX + "px";
    burst.style.top = clickY + "px";
    
    // Create 12 lines that burst outward from the click point
    for (let i = 0; i < 12; i++) {
        const line = document.createElement("div");  // Make a line element
        line.classList.add("burst-line");           // Add styling class
        
        // Calculate angle for this line (evenly spaced in a circle)
        const angle = (i / 12) * 360;
        line.style.setProperty("--angle", angle + "deg");
        
        burst.appendChild(line); // Add the line to the burst container
    }
    
    button.appendChild(burst); // Add the burst to the button
    
    // Remove the burst after animation finishes (0.6 seconds)
    setTimeout(() => burst.remove(), 600);
}

// Disables all choice buttons so you can't click them anymore
function disableButtons() {
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
}

// Re-enables all choice buttons for the next round
function enableButtons() {
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;
}

// ----------------------------------------
// GAME LOGIC - Who wins?
// ----------------------------------------

function determineWinner(playerChoice, aiChoice) {
    if (playerChoice === aiChoice) return "tie";    // Same choice = tie
    
    // Check all the winning conditions for player
    if (
        (playerChoice === "rock" && aiChoice === "scissors") ||
        (playerChoice === "paper" && aiChoice === "rock") ||
        (playerChoice === "scissors" && aiChoice === "paper")
    ) {
        return "win"; // Player wins
    }
    
    return "lose"; // Otherwise AI wins
}

// ----------------------------------------
// SCORE TRACKING
// ----------------------------------------

let playerScore = 0; // Player's total score
let aiScore = 0;     // AI's total score

// ----------------------------------------
// EVENT LISTENERS - What happens when you click stuff
// ----------------------------------------

// When you click the Play button on landing page
playBtn.addEventListener("click", function(event) {
    createBurst(event, playBtn);  // Make the burst effect
    popButton(playBtn);            // Add the pop animation
    
    // Wait a tiny bit for the animation, then switch to choice screen
    setTimeout(() => {
        stageLanding.style.display = "none";  // Hide landing page
        stageChoice.style.display = "flex";   // Show choice page
    }, 300);
});

// When you click Rock button
rockBtn.addEventListener("click", function(event) {
    handleChoice("rock", event, rockBtn);
});

// When you click Paper button
paperBtn.addEventListener("click", function(event) {
    handleChoice("paper", event, paperBtn);
});

// When you click Scissors button
scissorsBtn.addEventListener("click", function(event) {
    handleChoice("scissors", event, scissorsBtn);
});

// Main function that handles when you pick a choice
function handleChoice(playerChoice, event, button) {
    disableButtons();                 // Disable all buttons so you can't click again
    createBurst(event, button);       // Create burst effect at click location
    popButton(button);                // Make the button pop
    
    const aiChoice = getAIChoice();   // AI picks its choice
    
    // Show player's choice emoji
    playerEmoji.textContent = emojiMap[playerChoice];
    playerEmoji.classList.add("reveal"); // Animate it in
    
    // Keep the VS cloud visible (don't fade it out)
    // vsCloud stays visible
    
    // Wait 1 second to build suspense, THEN reveal AI's choice
    setTimeout(() => {
        aiHand.classList.add("reveal");   // Fade in the AI hand container
        aiEmoji.textContent = emojiMap[aiChoice]; // Show AI's emoji
        
        // Wait another moment, then show the result screen
        setTimeout(() => {
            const result = determineWinner(playerChoice, aiChoice);
            showResult(result);
        }, 800);
    }, 1000); // 1 second delay for suspense
}

// Shows the result screen with score
function showResult(result) {
    // Update scores based on who won
    if (result === "win") {
        playerScore++;
        statusText.textContent = "You Win!"; // Show win message
    } else if (result === "lose") {
        aiScore++;
        statusText.textContent = "You Lose!"; // Show lose message
    } else {
        statusText.textContent = "It's a Tie!"; // Show tie message
    }
    
    // Update the big score numbers on result screen
    playerScoreBig.textContent = playerScore;
    aiScoreBig.textContent = aiScore;
    
    // Switch from choice stage to result stage
    stageChoice.style.display = "none";
    stageResult.style.display = "flex";
    
    // ----------------------------------------
    // AUTO-REDIRECT AFTER 3 SECONDS
    // ----------------------------------------
    
    // Wait 3 seconds, then automatically go back to choice stage
    setTimeout(() => {
        // Reset the choice stage to default state
        aiHand.classList.remove("reveal");         // Hide the AI hand again
        playerEmoji.textContent = "❓";            // Reset player hand to question mark
        aiEmoji.textContent = "✋";                 // Reset AI hand to default fist
        playerEmoji.classList.remove("reveal");   // Reset animation
        
        // Re-enable the buttons for next round
        enableButtons();
        
        // Go back to choice stage
        stageResult.style.display = "none";
        stageChoice.style.display = "flex";
    }, 3000); // 3000 milliseconds = 3 seconds
});

// ----------------------------------------
// HOVER PREVIEW - Shows what you're hovering over
// ----------------------------------------

// When you hover over Rock button
rockBtn.addEventListener("mouseenter", function() {
    playerEmoji.textContent = "✊"; // Show rock emoji
});

// When you hover over Paper button
paperBtn.addEventListener("mouseenter", function() {
    playerEmoji.textContent = "✋"; // Show paper emoji
});

// When you hover over Scissors button
scissorsBtn.addEventListener("mouseenter", function() {
    playerEmoji.textContent = "✌"; // Show scissors emoji
});

// When you stop hovering over any button, reset to question mark
rockBtn.addEventListener("mouseleave", function() {
    if (!rockBtn.disabled) playerEmoji.textContent = "❓";
});

paperBtn.addEventListener("mouseleave", function() {
    if (!paperBtn.disabled) playerEmoji.textContent = "❓";
});

scissorsBtn.addEventListener("mouseleave", function() {
    if (!scissorsBtn.disabled) playerEmoji.textContent = "❓";
});
