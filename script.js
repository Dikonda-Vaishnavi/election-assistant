let step = 0;
let userAge = 0;

// Add message to chat
function addMessage(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.classList.add("message");

  if (sender === "You") {
    msg.classList.add("user");
  } else {
    msg.classList.add("bot");
  }

  msg.innerText = sender + ": " + text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (text === "") return;

  addMessage("You", text);
  input.value = "";

  handleChat(text.toLowerCase());
}

// Quick buttons
function quickAsk(q) {
  document.getElementById("userInput").value = q;
  sendMessage();
}

// Start chat
function startChat() {
  addMessage("Bot", "Hi! I’m your Election Assistant 😊");
  addMessage("Bot", "What is your age?");
  step = 1;
}

// Main logic
function handleChat(text) {
  if (step === 0) {
    startChat();
  }

  else if (step === 1) {
    userAge = parseInt(text);

    if (isNaN(userAge)) {
      addMessage("Bot", "Please enter a valid age.");
      return;
    }

    if (userAge < 18) {
      addMessage("Bot", "You are not eligible to vote yet.");
      step = 0;
    } else {
      addMessage("Bot", "You are eligible to vote!");
      addMessage("Bot", "Are you registered? (yes/no)");
      step = 2;
    }
  }

  else if (step === 2) {
    if (text === "no") {
      addMessage("Bot", "You can register online or at your local election office.");
      addMessage("Bot", "You need ID proof and address proof.");
      step = 0;
    } else if (text === "yes") {
      addMessage("Bot", "Great! On election day:");
      addMessage("Bot", "1. Go to polling booth");
      addMessage("Bot", "2. Show ID");
      addMessage("Bot", "3. Vote using EVM");
      step = 0;
    } else {
      addMessage("Bot", "Please answer yes or no.");
    }
  }

  // Extra features
  if (text.includes("register")) {
    addMessage("Bot", "You can register online on the official election website.");
  }

  if (text.includes("vote location")) {
    addMessage("Bot", "You can check your polling booth on official election portals.");
  }

  if (text.includes("documents")) {
    addMessage("Bot", "Required documents: ID proof, address proof.");
  }

  if (text.includes("election day")) {
    addMessage("Bot", "Election Day is usually announced by the election commission.");
  }
}

// Extra buttons
function showTimeline() {
  addMessage("Bot", "Timeline:");
  addMessage("Bot", "- Registration Deadline: Oct 1");
  addMessage("Bot", "- Voting Day: Nov 5");
  addMessage("Bot", "- Results: Nov 10");
}

function showGlossary() {
  addMessage("Bot", "Glossary:");
  addMessage("Bot", "EVM: Electronic Voting Machine");
  addMessage("Bot", "Constituency: Voting area");
}

function showQuiz() {
  addMessage("Bot", "Quiz:");
  addMessage("Bot", "Minimum voting age?");
  addMessage("Bot", "Answer: 18");
}