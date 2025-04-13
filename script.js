let questions = [
    "do you want to speack with me?"
];

let currentQuestion = 0;
let answers = JSON.parse(localStorage.getItem("chatAnswers")) || {}; // Load previous answers
let rating = 0;

// Video Player and Rating logic
const video = document.getElementById("videoPlayer");
const ratingContainer = document.getElementById("ratingContainer");
const stars = document.querySelectorAll(".star");
const submitRatingButton = document.getElementById("submitRating");
const darkOverlay = document.getElementById("darkOverlay");

video.addEventListener("ended", () => {
    ratingContainer.style.display = "block"; // Make the container visible
    setTimeout(() => {
        ratingContainer.classList.add("show"); // Add the animation class after making it visible
    }, 10); // Small delay to ensure the transition works
    darkOverlay.style.display = "block"; // Darken the background after video ends
});

if (window.location.pathname.includes('index.html')) {
    console.log("Page A logic executed");

    let chatTriggered = false; // Flag to prevent multiple executions
    let linksTriggered = false; // Flag to prevent multiple executions for links
    let aiTextTriggered = false; // Flag to prevent multiple executions for AI text

    video.addEventListener("timeupdate", () => {
        if (Math.floor(video.currentTime) === 7) {
            console.log("Page A: showVideoPopup triggered");
            showVideoPopup();
        }
        if (Math.floor(video.currentTime) === 34 && !chatTriggered) {
            console.log("Page A: Chatbot triggered with 'researching...'");
            const chatContainer = document.getElementById("chatContainer");
            const chatBox = document.getElementById("chatBox");

            // Ensure the chat container is visible
            if (chatContainer) {
                chatContainer.style.display = "block";

                // Add "researching..." message
                chatBox.innerHTML += `<p><strong>Bot:</strong> Researching...</p>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

                chatTriggered = true; // Prevent re-triggering
            } else {
                console.error("Chat container not found in the DOM.");
            }
        }

        if (Math.floor(video.currentTime) === 35 && !aiTextTriggered) {
            console.log("Page A: Chatbot shows AI training datasets text");
            const chatBox = document.getElementById("chatBox");

            // Add the AI training datasets text
            chatBox.innerHTML += `
                <p><strong>Bot:</strong> AI training datasets are collections of data used to teach models how to make predictions. Selecting poor or biased data can lead to inaccurate, unfair, or unreliable AI outputs. Risks include amplifying societal biases, spreading misinformation, and ethical concerns around privacy. Ensuring diverse, high-quality datasets is critical for building trustworthy and effective AI systems.</p>
            `;
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

            aiTextTriggered = true; // Prevent re-triggering
        }

        if (Math.floor(video.currentTime) === 37 && !linksTriggered) {
            console.log("Page A: Chatbot shows links");

            const chatBox = document.getElementById("chatBox");

            // Add the links to the chatbox
            if (chatBox) {
                chatBox.innerHTML += `
                    <p><strong>Bot:</strong> Here are some useful resources:</p>
                    <p><a href="https://www.anolytics.ai/blog/the-impact-of-unrepresentative-data-on-ai-model-biases/" target="_blank" style="color: blue;">https://www.anolytics.ai/blog/the-impact-of-unrepresentative-data-on-ai-model-biases/</a></p>
                    <p><a href="https://www.twoday.com/blog/the-dangers-of-poor-data-quality-in-ai-systems" target="_blank" style="color: blue;">https://www.twoday.com/blog/the-dangers-of-poor-data-quality-in-ai-systems</a></p>
                `;
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

                linksTriggered = true; // Prevent re-triggering
            } else {
                console.error("Chat box not found in the DOM.");
            }
        }
    });
} else if (window.location.pathname.includes('page-b.html')) {
    console.log("Page B logic executed");

    let chatTriggered = false; // Flag to prevent multiple executions

    video.addEventListener("timeupdate", () => {
        if (Math.floor(video.currentTime) === 7) {
            console.log("Page B: showInfoPopup triggered");
            showInfoPopup(); // Page B info popup
        }
        if (Math.floor(video.currentTime) === 36 && !chatTriggered) {
            console.log("Page B: openChatWithMessage triggered");
            openChatWithMessage(); // Open chatbot with a specific message
            chatTriggered = true; // Set the flag to true to prevent re-triggering
        }
    });

    video.addEventListener("ended", () => {
        console.log("Page B: Video ended, triggering chatbot feedback");
        askForFeedback(); // Trigger the chatbot feedback interaction
    });
}

function showVideoPopup() {
    // Check if the popup already exists to avoid duplicates
    if (document.getElementById("videoPopup")) return;

    // Create the popup element
    const popup = document.createElement("div");
    popup.id = "videoPopup";
    popup.textContent = "A black box AI is an AI system whose internal workings are a mystery to its users.";
    popup.style.position = "absolute";
    popup.style.top = "15%"; // Adjusted to position it slightly lower
    popup.style.left = "25%"; // Centered horizontally within the video player
    popup.style.width = "50%"; // Reduced width to fit the text better
    popup.style.padding = "8px"; // Smaller padding for a compact look
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    popup.style.color = "white";
    popup.style.textAlign = "center";
    popup.style.borderRadius = "5px";
    popup.style.fontSize = "14px"; // Adjusted font size for better readability
    popup.style.zIndex = "1000";

    // Append the popup to the video container
    const videoContainer = document.querySelector(".video-container");
    videoContainer.style.position = "relative"; // Ensure the container is positioned
    videoContainer.appendChild(popup);

    // Remove the popup after 4 seconds
    setTimeout(() => {
        popup.remove();
    }, 4000); // Lasts for 4 seconds
}

function showInfoPopup() {
    // Check if the popup already exists to avoid duplicates
    if (document.getElementById("infoPopup")) return;

    // Create the popup element
    const popup = document.createElement("div");
    popup.id = "infoPopup";
    popup.className = "info-popup";

    // Add the title with an info sign
    const title = document.createElement("div");
    title.innerHTML = `AI Blackbox <span class="info-sign">ℹ️</span>`;
    title.style.fontWeight = "bold";
    title.style.marginBottom = "5px";

    // Add the detailed information
    const details = document.createElement("div");
    details.textContent = "Hover over the info sign for more details.";

    // Add hover functionality to the info sign
    const infoSign = title.querySelector(".info-sign");
    infoSign.style.cursor = "pointer";
    infoSign.title = "A black box AI is an AI system whose internal workings are a mystery to its users. Users can see the system’s inputs and outputs, but they can’t see what happens within the AI tool to produce those outputs.";

    // Append the title and details to the popup
    popup.appendChild(title);
    popup.appendChild(details);

    // Append the popup to the video container
    const videoContainer = document.querySelector(".video-container");
    videoContainer.style.position = "relative"; // Ensure the container is positioned
    videoContainer.appendChild(popup);

    // Remove the popup after 10 seconds
    setTimeout(() => {
        popup.remove();
    }, 10000); // Lasts for 10 seconds
}

function showChatbotMessage() {
    // Check if the message already exists to avoid duplicates
    const chatBox = document.getElementById("chatBox");
    if (document.getElementById("chatbotMessage")) return;

    // Create the chatbot message
    const message = document.createElement("p");
    message.id = "chatbotMessage";
    message.innerHTML = `<strong>Bot:</strong> AI training datasets are collections of data used to teach models how to make predictions. Selecting poor or biased data can lead to inaccurate, unfair, or unreliable AI outputs. Risks include amplifying societal biases, spreading misinformation, and ethical concerns around privacy. Ensuring diverse, high-quality datasets is critical for building trustworthy and effective AI systems.`;

    // Append the message to the chatbox
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chatbox
}

function openChatAndShowMessage() {
    const chatContainer = document.getElementById("chatContainer");
    const chatBox = document.getElementById("chatBox");

    // Ensure the chat container is visible
    chatContainer.style.display = "block";

    // Add the message to the chatbox
    chatBox.innerHTML += `<p><strong>Bot:</strong> AI training datasets are collections of data used to teach models how to make predictions. Selecting poor or biased data can lead to inaccurate, unfair, or unreliable AI outputs. Risks include amplifying societal biases, spreading misinformation, and ethical concerns around privacy. Ensuring diverse, high-quality datasets is critical for building trustworthy and effective AI systems.</p>`;

    // Scroll to the bottom of the chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
}

function openChatWithMessage() {
    // Ensure the chat container is visible
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.style.display = "block";

    // Add the initial message to the chatbox
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p><strong>Bot:</strong> Do you want to know more about AI training datasets?</p>`;

    // Add Yes/No buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "chatButtons";
    buttonContainer.style.marginTop = "10px";

    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.style.marginRight = "10px";
    yesButton.style.padding = "5px 10px";
    yesButton.style.cursor = "pointer";
    yesButton.addEventListener("click", () => {
        // Show the detailed message when "Yes" is clicked
        chatBox.innerHTML += `<p><strong>Bot:</strong> AI training datasets are collections of data used to teach models how to make predictions. Selecting poor or biased data can lead to inaccurate, unfair, or unreliable AI outputs. Risks include amplifying societal biases, spreading misinformation, and ethical concerns around privacy. Ensuring diverse, high-quality datasets is critical for building trustworthy and effective AI systems.</p>`;
        buttonContainer.remove(); // Remove the buttons after the response
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    });

    const noButton = document.createElement("button");
    noButton.textContent = "No";
    noButton.style.padding = "5px 10px";
    noButton.style.cursor = "pointer";
    noButton.addEventListener("click", () => {
        // Do nothing when "No" is clicked
        buttonContainer.remove(); // Remove the buttons
    });

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    chatBox.appendChild(buttonContainer);

    // Scroll to the bottom of the chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
}

function askForFeedback() {
    const chatContainer = document.getElementById("chatContainer");
    const chatBox = document.getElementById("chatBox");

    // Ensure the chat container is visible
    chatContainer.style.display = "block";

    // Add the like/dislike question to the chatbox
    chatBox.innerHTML += `<p><strong>Bot:</strong> Did you like this video? <button id="likeButton" style="margin-right: 10px;">👍 Like</button><button id="dislikeButton">👎 Dislike</button></p>`;

    // Add event listeners for the Like and Dislike buttons
    const likeButton = document.getElementById("likeButton");
    const dislikeButton = document.getElementById("dislikeButton");

    likeButton.addEventListener("click", () => {
        chatBox.innerHTML += `<p><strong>You:</strong> 👍 Like</p>`;
        chatBox.innerHTML += `<p><strong>Bot:</strong> Let's discuss why you liked this video. Have feedback? Tap me anytime!</p>`;
        displayFinalFeedback(chatBox); // Display the final thank-you message
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    });

    dislikeButton.addEventListener("click", () => {
        chatBox.innerHTML += `<p><strong>You:</strong> 👎 Dislike</p>`;
        chatBox.innerHTML += `<p><strong>Bot:</strong> Let's discuss why you didn't like this video. Have feedback? Tap me anytime!</p>`;
        displayFinalFeedback(chatBox); // Display the final thank-you message
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    });

    // Scroll to the bottom of the chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayFinalFeedback(chatBox) {
    // Add the final thank-you message
    chatBox.innerHTML += `<p><strong>Bot:</strong> Thank you for your feedback! 😊</p>`;
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function askPostRatingQuestions() {
    const chatContainer = document.getElementById("chatContainer");
    const chatBox = document.getElementById("chatBox");

    // Ensure the chat container is visible
    chatContainer.style.display = "block";

    // Ask the first question
    chatBox.innerHTML += `<p><strong>Bot:</strong> How do you feel about the challenges of understanding AI decisions in fields like healthcare or criminal justice?</p>`;
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

    // Wait for the user to respond, then ask the next question
    const userInput = document.getElementById("userInput");
    userInput.addEventListener("keydown", function handleFirstResponse(event) {
        if (event.key === "Enter") {
            const userResponse = userInput.value.trim();
            if (userResponse) {
                chatBox.innerHTML += `<p><strong>You:</strong> ${userResponse}</p>`;
                userInput.value = ""; // Clear the input field

                // Ask the next question
                chatBox.innerHTML += `<p><strong>Bot:</strong> That’s a critical observation. I’ve cross-referenced your concern with the EU AI Act’s transparency guidelines and identified three real-world cases where explainability tools mitigated bias. Would you like me to:
                <br>1. Break down these cases to compare with your perspective?
                <br>2. Discuss ethical frameworks for addressing blackboxing?
                <br>3. Save this topic to your ethics journal for future reference?</p>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom</br></br>

                // Remove the event listener to prevent duplicate responses
                userInput.removeEventListener("keydown", handleFirstResponse);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    const submitRatingButton = document.getElementById("submitRating");
    const darkOverlay = document.getElementById("darkOverlay");
    const ratingContainer = document.getElementById("ratingContainer");

    let rating = 0; // Initialize the rating variable

    stars.forEach(star => {
        star.addEventListener("click", function () {
            rating = parseInt(this.getAttribute("data-index")); // Update the rating variable
            stars.forEach((star, index) => {
                star.style.color = index < rating ? "gold" : "gray";
            });
            submitRatingButton.style.display = "block"; // Show submit button
        });
    });

    submitRatingButton.addEventListener("click", () => {
        localStorage.setItem("rating", rating); // Save the rating to localStorage
        showPopup(rating); // Pass the rating to the showPopup function
        ratingContainer.style.display = "none";
        darkOverlay.style.display = "none"; // Hide rating after submission

        // Trigger the chatbot with the first question
        setTimeout(() => {
            askPostRatingQuestions();
        }, 1000); // Delay to ensure smooth transition
    });

    const userInput = document.getElementById("userInput");

    if (userInput) {
        userInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                sendMessage(); // Trigger the sendMessage function
            }
        });
    } else {
        console.error("Element with id 'userInput' not found in the DOM.");
    }

    const chatToggleButton = document.querySelector(".chat-toggle");
    if (chatToggleButton) {
        chatToggleButton.textContent = "Context Agent";
    }
});

// Chatbot logic
function toggleChat() {
    const chatContainer = document.getElementById("chatContainer");
    const chatToggleButton = document.querySelector(".chat-toggle");

    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "block"; // Show the chatbot
        chatToggleButton.style.display = "none"; // Hide the button
        startChat();
    } else {
        chatContainer.style.display = "none"; // Hide the chatbot
        chatToggleButton.style.display = "block"; // Show the button
    }
}

function startChat() {
    let chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = ""; // Clear chat
    currentQuestion = 0;
    showNextQuestion();
}



function sendMessage() {
    let userInput = document.getElementById("userInput").value.trim();
    let chatBox = document.getElementById("chatBox");

    if (userInput === "") return;

    answers[questions[currentQuestion]] = userInput;

    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    currentQuestion++;
    setTimeout(showNextQuestion, 500);

    document.getElementById("userInput").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Add event listener for the Enter key in the input box
const userInput = document.getElementById("userInput");
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage(); // Trigger the sendMessage function
    }
});

// Thank you popup logic
function showPopup(rating) {
    let thankYouMessage = document.getElementById("thankYouMessage");
    thankYouMessage.textContent = `I can share your ${rating}-star rating with your friends.`; // Use the passed rating
    document.getElementById("thankYouPopup").style.display = "block";

    document.getElementById("yesButton").addEventListener("click", askForFriendInfo);
    document.getElementById("noButton").addEventListener("click", () => {
        thankYouMessage.textContent = "Thanks for your feedback! I’ll share this with the Recommender Agent.";
        setTimeout(() => {
            document.getElementById("thankYouPopup").style.display = "none";
        }, 2000);
    });
}

function askForFriendInfo() {
    let friendName = prompt("Enter your friend's name:");
    let friendNumber = prompt("Enter your friend's number:");
    alert(`Thanks! I’ll share your ${rating}-star rating with ${friendName} (${friendNumber}).`);
    document.getElementById("thankYouPopup").style.display = "none";
}

// CSS for star rating
const style = document.createElement("style");
style.textContent = `
.star {
    font-size: 40px;
    color: gray;
    cursor: pointer;
    transition: transform 0.2s ease, color 0.2s ease;
}

.star:hover {
    color: gold;
    transform: scale(1.2); /* Slight zoom effect */
}

.star.selected {
    color: gold;
}
`;
document.head.appendChild(style);

// Add chat toggle button
const chatToggleButton = document.createElement("button");
chatToggleButton.className = "chat-toggle";
chatToggleButton.textContent = "Context Agent";
chatToggleButton.onclick = toggleChat;
document.body.appendChild(chatToggleButton);
