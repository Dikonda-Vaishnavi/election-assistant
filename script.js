let step = 0;
let userAge = 0;

// Sections
function showSection(section) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(section + "Section").classList.remove("hidden");

  if (section === "quiz") startQuiz();
}

// Chat
function addMessage(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.classList.add("message", sender === "You" ? "user" : "bot");

  msg.innerText = sender + ": " + text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing effect
function botReply(text) {
  setTimeout(() => addMessage("Bot", text), 500);
}

// Send
async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text);
  input.value = "";

  // Call backend
  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    addMessage("Bot", data.reply);

  } catch (err) {
    addMessage("Bot", "AI not available. Using basic logic.");

    // fallback to old logic
    handleChat(text.toLowerCase());
  }
}

// Chat logic
function handleChat(text) {
  if (step === 0) {
    botReply("Hi! I’m your Election Assistant 😊");
    botReply("What is your age?");
    step = 1;
    return;
  }

  if (step === 1) {
    userAge = parseInt(text);

    if (userAge < 18) {
      botReply("You are not eligible to vote.");
      step = 0;
    } else {
      botReply("You are eligible!");
      botReply("Are you registered? (yes/no)");
      step = 2;
    }
    return;
  }

  if (step === 2) {
    if (text === "no") {
      botReply("Register online or at an office with ID proof.");
      step = 0;
    } else {
      botReply("Go to polling booth and vote using EVM.");
      step = 0;
    }
  }
}

// QUIZ
let quizData = [
  {
    q: "What is the minimum voting age?",
    options: ["16", "18", "21", "25"],
    correct: 1
  },
  {
    q: "Who conducts elections in India?",
    options: ["Police", "Government", "Election Commission", "Army"],
    correct: 2
  },
  {
    q: "What is an EVM?",
    options: ["Voting Machine", "Law", "ID Card", "Booth"],
    correct: 0
  }
];

let currentQ = 0;
let score = 0;
let selected = null;

// Start quiz
function startQuiz() {
  currentQ = 0;
  score = 0;
  loadQuestion();
}

// Load question
function loadQuestion() {
  let q = quizData[currentQ];
  selected = null;

  document.getElementById("question").innerText = q.q;

  let answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.options.forEach((opt, i) => {
    let btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => selectAnswer(btn, i);

    answers.appendChild(btn);
  });

  document.getElementById("score").innerText = "";
}

// Select answer
function selectAnswer(button, index) {
  selected = index;

  // remove old highlight
  document.querySelectorAll("#answers button").forEach(btn => {
    btn.style.background = "#6c4ed9";
  });

  // highlight selected
  button.style.background = "#00c853";
}

// Next question
function nextQuestion() {
  if (selected === null) {
    alert("Please select an answer!");
    return;
  }

  if (selected === quizData[currentQ].correct) {
    score++;
  }

  currentQ++;

  if (currentQ < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("question").innerText = "🎉 Quiz Finished!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("score").innerText =
      "Your Score: " + score + " / " + quizData.length;
  }
}