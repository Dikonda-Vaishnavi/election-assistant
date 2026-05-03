const API_KEY = "AIzaSyAH-V9JiikwKB7Po3pkAyEOYsqyfjP938o";

// Sections
function showSection(section) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(section + "Section").classList.remove("hidden");

  if (section === "quiz") startQuiz();
}

// Chat UI
function addMessage(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.classList.add("message", sender === "You" ? "user" : "bot");

  msg.innerText = sender + ": " + text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message (ONLY AI, no fallback)
async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text);
  input.value = "";

  addMessage("Bot", "Typing...");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Explain election process simply for beginners: ${text}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // remove typing
    document.querySelector(".bot:last-child").remove();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't understand.";

    addMessage("Bot", reply);

  } catch (error) {
    document.querySelector(".bot:last-child").remove();
    addMessage("Bot", "Error connecting to AI.");
  }
}