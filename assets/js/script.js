// Get quiz section element
var quizSection = document.getElementById("quiz-select");
// Get text area element
var textArea = document.getElementById("text-area");
// Get checkbox class elements
var checkboxes = document.getElementsByClassName("difficulty-checkbox");
// Define welcome message
// var welcomeMsg = "Welcome to the UofA Bootcamp Coding Quiz! You can choose an HTML, CSS or JavaScript quiz. You will have 60 seconds to answer. Answering a question incorrectly will deduct 10 seconds from your time. You can save your score at the end.     ¡buena suerte!";
var welcomeMsg = "You can choose an HTML, CSS or JavaScript quiz. You will have 60 seconds to answer. Answering a question incorrectly will deduct 10 seconds from your time. You can save your score at the end. Select your subject and good luck!";
// Define dificulty level variable
var difficultyLevel = "beginner";

//Add event listeners to select option buttons
function addEventListeners() {

    // Add select event listener to quiz-select element
    quizSection.addEventListener("change", function (event) {
        // Get event target dataset quiz

        var quiz = event.target.options[event.target.selectedIndex].value
        // log quiz
        window.location.replace("./quiz.html?name=" + quiz + "&difficultyLevel=" + difficultyLevel);
    });

    // Add click event listener to difficulty checkboxes

    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        checkbox.addEventListener("click", function (event) {

            // Ignore if checkbox is checked
            if (!event.target.checked) {
                // Set checkbox checked to true
                event.target.checked = true;
                return;
            }
            // Set difficulty level
            difficultyLevel = event.target.value;
            checkOnlyOneCheckbox(difficultyLevel);
        });
    }

}

// Function to make sure only one checkbox is checked
function checkOnlyOneCheckbox(value) {
    // Loop through checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        // Check if checkbox value is not equal to event target value
        if (checkbox.value !== value) {
            // Set checkbox checked to false
            checkbox.checked = false;
        }
    }
}


// Add init function
function init() {
    addEventListeners();
    textArea.textContent = welcomeMsg;
}

//Call init function
init();