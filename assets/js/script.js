// Get quiz section element
var quizSection = document.getElementById("quiz-select");
// Get text area element
var textArea = document.getElementById("text-area");
// Define welcome message
var welcomeMsg = "Welcome to the UofA Bootcamp Coding Quiz! You can choose an HTML, CSS or JavaScript quiz. You will have 60 seconds to answer. Anwering a question incorrectly will deduct 10 seconds from your time. You can save your score and initials to the high scores page. Good luck!";
//Add event listeners to select option buttons
function addEventListeners() {

    // Add select event listener to quiz-select element
    quizSection.addEventListener("change", function (event) {
        // Get event target dataset quiz

        var quiz = event.target.options[event.target.selectedIndex].value
        // log quiz
        console.log("quiz: " + quiz);
        window.location.replace("./quiz.html?name=" + quiz);
    });
}

// Add init function
function init() {
    // Add text to text-area
    // Set quiz-select selectedIndex to -1
    // quizSection.selectedIndex = -1;
    addEventListeners();
    textArea.textContent = welcomeMsg;
}

//Call init function
init();