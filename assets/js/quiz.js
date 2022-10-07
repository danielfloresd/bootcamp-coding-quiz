
// Define json file url
var jsonURL = "https://danielfloresd.github.io/js-coding-quiz/assets/json/";
//Get timer element
var timer = document.getElementById("timer");
// Get btn-1 button
var btn1 = document.getElementById("btn-1");
// Get btn-2 button
var btn2 = document.getElementById("btn-2");
// Get btn-3 button
var btn3 = document.getElementById("btn-3");
// Get btn-4 button
var btn4 = document.getElementById("btn-4");

// Define buttons array
var buttons = [btn1, btn2, btn3, btn4];
// Get quiz-text element
var questionText = document.getElementById("text-question");

// Get quesion-number element
var questionNumber = document.getElementById("question-number");

//Get results element
var results = document.getElementById("results");

// Define quiz name
var quizName;
// Selected questions
var selectedQuestions = [];

var currentQuestion;
// Correct anwers counter
var correctAnswers = 0;
// Define quiz duration
var quizDuration = 60;
// Define timer interval


var timerInterval;
// Define start quiz function
function startQuiz() {
    selectQuestion(0);
    // Start timer
    startTimer();
}

// Define function to request html json file from assets/json
function requestQuestions(jsonFile) {
    var requestURL = jsonURL + jsonFile;
    // Read json file
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    console.log(requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        var questions = request.response;
        console.log("response: " + questions);
        console.log(questions);
        if (questions) {
            selectQuestions(questions);
            startQuiz();
        } else {
            // Show alert if json file can not be loaded
            window.alert("Error loading questions. Please try again later.");
            window.location.replace("./index.html");
        }
    }
}

// Define  function to load all json files
function loadQuestions(name) {
    requestQuestions(name + "-questions.json");
}

// Define init function
function init() {
    // Call loadQuestions function
    // get name from getParams()
    quizName = getParams()["name"];
    loadQuestions(quizName);
}

// Select quiz questions
function selectQuestions(questions) {
    selectedQuestions = questions;
}

// Select question by index
function selectQuestion(index) {
    console.log("Selecting question " + index);
    console.log(selectedQuestions);
    currentQuestion = selectedQuestions[index];
    // Set question text
    setQuestionText(currentQuestion);
    setQuestionNumber(index + 1);
    setQuestionButtons(currentQuestion);
}

// Populate quiz-text element with question
function setQuestionText(question) {
    questionText.textContent = question.name;
}

// Set question-text element with question number
function setQuestionNumber(number) {
    questionNumber.textContent = "Question# " + number;
}

// Set questions on buttons
function setQuestionButtons(question) {
    // Loop through buttons
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        // Set button text
        button.textContent = (i + 1) + ". " + question.options[i];
    }
}

// Define option selected function
function selectOption(option) {
    if (currentQuestion.options[option] === currentQuestion.answer) {
        console.log("Correct");
        correctAnswer();
    } else {
        console.log("Incorrect");
        incorrectAnswer();
    }
    nextQuestion();
}

// Correct anwers function
function correctAnswer() {
    correctAnswers++;
    // Set results text
    results.textContent = "Correct! 👍";
    results.style.color = "green";
}

// Incorrect anwers function
function incorrectAnswer() {
    // Set results text
    results.textContent = "👎 Incorrect! \"(" + currentQuestion.answer + " is the correct answer)\"";
    results.style.color = "red";
    timeLeft -= 10;
}

// Select next question
function nextQuestion() {
    // Get current question index
    var currentQuestionIndex = selectedQuestions.indexOf(currentQuestion);
    // Get next question index
    var nextQuestionIndex = currentQuestionIndex + 1;
    // Check if there is a next question
    if (nextQuestionIndex < selectedQuestions.length) {
        // Select next question
        selectQuestion(nextQuestionIndex);
    } else {
        // End quiz
        endQuiz();
    }
}

// Defint time is up function
function timeIsUp() {
    // Stop timer
    stopTimer();
    // End quiz
    // Show warning message
    window.alert("Time is up!");
    window.location.replace("./scores.html");
}


// Define end quiz function
function endQuiz() {
    // Stop timer
    stopTimer();
    // Navigate to score.html page

    // Prompt user to enter initials and show score
    var initials = prompt("Enter your initials");

    console.log("initials: " + initials);
    // Save score
    if (initials) {
        saveScore(initials, correctAnswers,quizName);
        window.location.replace("./scores.html");
    } else {
        window.location.replace("./index.html");
    }
}


// Define save score function
function saveScore(initials, score, quizName) {
    // Get scores from local storage
    var scores = JSON.parse(localStorage.getItem("scores"));
    // Check if scores is null
    if (scores === null) {
        // Initialize scores array
        scores = [];
    }
    // Create score object
    var scoreObject = {
        initials: initials,
        score: score,
        quiz: quizName
    }
    // Add score object to scores array
    scores.push(scoreObject);
    // Save scores array to local storage
    localStorage.setItem("scores", JSON.stringify(scores));
}

// Define stop timer function
function stopTimer() {
    clearInterval(timerInterval);
}

// Function to set click event on buttons
function addClickEventsOnBtns() {
    // Loop through buttons
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        // Set click event
        button.addEventListener("click", function (event) {
            // Get button datataset.number
            var option = event.target.dataset.option;
            selectOption(option);
        })
    }
}

// Define timer to 60 seconds countdown
function startTimer() {
    timeLeft = quizDuration;
    timerInterval = setInterval(function () {
        var formatSecs = "00:" + ("0" + timeLeft).slice(-2);
        if (timeLeft > 0) {
            // If time left is less than  10 seconds set timer background color to red
            if (timeLeft < 10) {
                // timer.style.backgroundColor = "red";
                // Set timer text color to white
                timer.style.color = "red";
                // Make timer text bold
                timer.style.fontWeight = "bold";
                timer.style.fontSize = "x-large";
                // Make timer text blink
                timer.style.animation = "blinker 1s linear infinite";
            }

            timer.textContent = formatSecs;
            timeLeft--;
        } else {
            timeIsUp();
            return;
        }
    }, 1000);
}

// Get parameters from window.location
function getParams() {
    var params = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        params[key] = value;
    });
    return params;
}

// Call addClickEventsOnBtns function

addClickEventsOnBtns();

// Call init function
init();