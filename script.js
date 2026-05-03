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
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text);
  input.value = "";

  handleChat(text.toLowerCase());
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
    q: "Minimum voting age?",
    options: ["16", "18", "21"],
    correct: 1
  },
  {
    q: "What is EVM?",
    options: ["Machine", "Law", "Person"],
    correct: 0
  },
  {
    q: "Who conducts elections?",
    options: ["Government", "Election Commission", "Police"],
    correct: 1
  }
];

let currentQ = 0;
let score = 0;

function startQuiz() {
  currentQ = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  let q = quizData[currentQ];
  document.getElementById("question").innerText = q.q;

  let answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.options.forEach((opt, i) => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    answers.appendChild(btn);
  });
}

function checkAnswer(i) {
  if (i === quizData[currentQ].correct) score++;
}

function nextQuestion() {
  currentQ++;

  if (currentQ < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("question").innerText = "Quiz Finished!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("score").innerText = "Score: " + score;
  }
}