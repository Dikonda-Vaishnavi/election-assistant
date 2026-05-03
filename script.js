let step = 0;
let userAge = 0;

// Switch sections
function showSection(section) {
  document.getElementById("chatSection").classList.add("hidden");
  document.getElementById("timelineSection").classList.add("hidden");
  document.getElementById("glossarySection").classList.add("hidden");
  document.getElementById("quizSection").classList.add("hidden");

  document.getElementById(section + "Section").classList.remove("hidden");
}

// Add message
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

// Chat logic
function handleChat(text) {
  if (step === 0) {
    addMessage("Bot", "Hi! I’m your Election Assistant 😊");
    addMessage("Bot", "What is your age?");
    step = 1;
    return;
  }

  if (step === 1) {
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
    return;
  }

  if (step === 2) {
    if (text === "no") {
      addMessage("Bot", "You can register online or at your local election office.");
      addMessage("Bot", "You need ID proof and address proof.");
      step = 0;
    } else if (text === "yes") {
      addMessage("Bot", "On election day:");
      addMessage("Bot", "1. Visit your polling booth");
      addMessage("Bot", "2. Show your ID");
      addMessage("Bot", "3. Cast your vote using EVM");
      step = 0;
    } else {
      addMessage("Bot", "Please answer yes or no.");
    }
  }

  // Extra responses
  if (text.includes("register")) {
    addMessage("Bot", "Register online through the official election website.");
  }

  if (text.includes("documents")) {
    addMessage("Bot", "Required documents: ID proof and address proof.");
  }

  if (text.includes("vote")) {
    addMessage("Bot", "Visit your assigned polling booth to vote.");
  }
}