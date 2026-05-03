document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Define the chatbot state
    let currentState = 'ASK_AGE';

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        // Replace newlines with <br> for simple formatting
        let formattedText = text.replace(/\n/g, '<br>');
        // Replace **text** with <strong>text</strong> for basic bolding
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        contentDiv.innerHTML = formattedText;
        
        messageDiv.appendChild(contentDiv);
        chatBox.appendChild(messageDiv);
        
        // Scroll to bottom smoothly
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: 'smooth'
        });
    }

    function getReprompt() {
        if (currentState === 'ASK_AGE') {
            return "\n\n*(Please tell me your age to continue)*";
        } else if (currentState === 'ASK_REGISTERED') {
            return "\n\n*(Are you currently registered to vote? Yes/No)*";
        }
        return "";
    }

    function processInput(text) {
        const lowerText = text.toLowerCase().trim();

        // Check for "timeline" keyword at any point
        if (lowerText.includes('timeline')) {
            const timelineInfo = "**Sample Election Timeline**:\n• Registration Deadline: October 15, 2026\n• Voting Date: November 3, 2026\n• Result Date: November 5, 2026";
            return timelineInfo + getReprompt();
        }

        // Check for "polling", "location", "booth", "where" to trigger polling location flow
        if (lowerText.includes('polling') || lowerText.includes('location') || lowerText.includes('booth') || lowerText.includes('where')) {
            const previousState = currentState;
            currentState = 'ASK_CITY';
            // Store previous state so we could theoretically return to it, but for simplicity we'll just ask for the city.
            return "Sure! I can help you find a mock polling location. What city do you live in?";
        }

        if (currentState === 'ASK_CITY') {
            const city = text.trim();
            currentState = 'END'; // End the flow after providing the location
            const mapLink = `https://www.google.com/maps/search/polling+location+${encodeURIComponent(city)}`;
            // Format link using markdown style which we can parse in addMessage
            return `Here is a mock polling location search for **${city}**:\n<a href="${mapLink}" target="_blank" style="color: var(--user-msg-bg); text-decoration: underline;">View Polling Locations on Google Maps</a>\n\nIf you have more questions, please reload the page.`;
        }

        if (currentState === 'ASK_AGE') {
            // First: Ask user's age
            const age = parseInt(lowerText, 10);
            
            if (isNaN(age)) {
                return "Please enter a valid number for your age.";
            }
            
            if (age < 18) {
                // If age < 18 → say not eligible
                currentState = 'END';
                return "Since you are under 18, you are not eligible to vote yet. Check back when you're older!";
            } else {
                // If age ≥ 18 → ask if registered
                currentState = 'ASK_REGISTERED';
                return "You are eligible to vote! Are you currently registered to vote? (Yes/No)";
            }
        } 
        else if (currentState === 'ASK_REGISTERED') {
            if (lowerText.includes('yes') || lowerText === 'y') {
                // If registered → show voting steps
                currentState = 'END';
                return "Awesome! Here are your next steps to vote:\n1. Find your polling location.\n2. Bring a valid ID.\n3. Cast your ballot!";
            } else if (lowerText.includes('no') || lowerText === 'n') {
                // If not registered → explain how to register
                currentState = 'END';
                return "No problem! You can register to vote online or at your local election office. You usually need proof of identity and residence.";
            } else {
                return "Please answer Yes or No. Are you registered to vote?";
            }
        }
        else if (currentState === 'END') {
            return "If you have more questions, please reload the page to start over.";
        }
    }

    function handleSend() {
        const text = userInput.value.trim();
        if (text === '') return;

        // Add user message
        addMessage(text, 'user');
        
        // Clear input
        userInput.value = '';
        
        // Determine the response based on current state
        const response = processInput(text);
        
        // Simulate a typing delay and then an assistant response
        setTimeout(() => {
            addMessage(response, 'assistant');
        }, 600);
    }

    sendBtn.addEventListener('click', handleSend);

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission or newlines
            handleSend();
        }
    });
    
    // Focus input on load
    userInput.focus();
});
