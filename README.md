# Election Guide Assistant

A sleek, minimalistic, and interactive web application designed to help citizens navigate the election process with ease.

## 🎯 Problem Statement

Voting can often feel overwhelming due to a lack of clear, accessible information regarding registration deadlines, eligibility, and polling locations. Many potential voters, especially first-time voters, abandon the process simply because they don't know where to start or who to ask. 

The **Election Guide Assistant** solves this problem by providing a simple, chat-based interface that guides users through the essential steps of voting. By distilling complex civic information into bite-sized, interactive conversations, the assistant ensures that every citizen has the knowledge they need to confidently cast their ballot.

## ✨ Features

- **Interactive Chat Interface**: A clean, modern chat UI with highly rounded bubbles and smooth animations for a native-app feel.
- **Voter Eligibility Check**: Automatically determines if a user is eligible to vote based on age input.
- **Registration Guidance**: Provides clear, step-by-step instructions for users who are not yet registered to vote.
- **Election Timeline**: Instantly provides key dates (Registration Deadline, Voting Date, Result Date) when prompted with the keyword "timeline".
- **Mock Polling Location Finder**: Detects location-based questions (e.g., "where is my polling booth?") and generates a dynamic Google Maps link tailored to the user's city.
- **Fully Responsive**: Optimized for both mobile devices (full-screen native feel) and desktop environments.

## 🛠️ Tech Used

This project is built using core web technologies, keeping it lightweight and fast:

- **HTML5**: For semantic structuring of the chat interface.
- **Vanilla CSS3**: Used for all styling, featuring CSS variables, modern flexbox layouts, media queries for responsiveness, and smooth micro-animations. No external frameworks like Tailwind or Bootstrap were used.
- **Vanilla JavaScript**: Powers the entire state machine logic, keyword detection, message generation, and DOM manipulation. No external libraries or dependencies are required.
- **Google Fonts**: Utilizes the 'Inter' font for highly readable, modern typography.

## 🚀 How it Works

The application operates entirely on the client side using a simple JavaScript state machine within `script.js`.

1. **Initialization**: When the page loads, the chat interface is rendered and the user is greeted with a prompt asking for their age (`ASK_AGE` state).
2. **State Progression**: 
   - Based on user input, the script checks conditions (e.g., `age >= 18`).
   - If eligible, it transitions to the `ASK_REGISTERED` state.
   - It provides final voting steps or registration instructions based on a "Yes" or "No" response, ending in the `END` state.
3. **Keyword Interruption**:
   - The `processInput` function constantly scans for specific keywords regardless of the current state.
   - If "timeline" is detected, it outputs dates and then appends a reprompt to seamlessly return the user to their previous place in the flow.
   - If location intent ("polling", "booth", etc.) is detected, it enters a temporary `ASK_CITY` state to generate a localized Google Maps search link.
4. **UI Updates**: The `addMessage` function dynamically creates DOM elements for new messages, handles basic markdown parsing (like `**bolding**`), and ensures the chat window smoothly auto-scrolls to the newest message.

---
*Built to empower voters through accessible civic education.*
