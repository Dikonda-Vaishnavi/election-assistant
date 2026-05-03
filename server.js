const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Replace with your Gemini API key
const API_KEY = "AIzaSyAH-V9JiikwKB7Po3pkAyEOYsqyfjP938o";

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: "Explain election process simply: " + userMessage }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;

    res.json({ reply });
  } catch (error) {
    res.json({ reply: "Error getting AI response" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));