//  Home section elements
var homeSection = document.getElementById("home");
var homeText = document.getElementById("text-home");
var startQuizBtn = document.getElementById("start-quiz");
var scoresBtn = document.getElementById("btn-scores");

// Quiz section 
var quizSection = document.getElementById("quiz");
var head = document.getElementById("head-q");
var quizText = document.getElementById("text-quiz");
var optionA = document.getElementById("btn-a");
var optionB = document.getElementById("btn-b");
var optionC = document.getElementById("btn-c");
var optionD = document.getElementById("btn-d");
var results = document.getElementById("results");
var optionButtons = [optionA, optionB, optionC, optionD];

// Scores section
var scoreSection = document.getElementById("scores");
var scoreText = document.getElementById("text-scores");

var clear = document.getElementById("btn-clear");
var home = document.getElementById("btn-home");

var resultsLog = "";
var current = null;
var optionSelected = null;
var correct = 0;
var total = questions.length;
var scores = [];
var secondsLeft = 60;

var homeMsg = "Try to answer the following code-related questions within the time limit. If the answer is wrong, 10s will be subtractred from the clock !"
var timerInterval;

homeText.textContent = homeMsg;

addEventListeners();

init();

function setQuestion() {
    if (i < total) {
        head.textContent = "Question #" + i;
        q = questions[i++];
        quizText.textContent = q.name;
        populateQuizBtn(q);
        current = q;
    } else {
        finish();
    }
}

function addEventListeners() {

    startQuizBtn.addEventListener("click", function (event) {
        quizSection.removeAttribute("hidden");
        homeSection.setAttribute("hidden", "hidden");
        resultsLog = "";
        results.textContent = "";
        setTime();
    });

    scoresBtn.addEventListener("click", function (event) {
        homeSection.setAttribute("hidden", "hidden");
        scoreSection.removeAttribute("hidden");
    });

    optionA.addEventListener("click", function (event) {
        selectOption(optionA, current.options[0]);
        setQuestion();
    });
    optionB.addEventListener("click", function (event) {
        selectOption(optionB, current.options[1]);
        setQuestion();
    });
    optionC.addEventListener("click", function (event) {
        selectOption(optionC, current.options[2]);
        setQuestion();
    });
    optionD.addEventListener("click", function (event) {
        selectOption(optionD, current.options[3]);
        setQuestion();
    });

    clear.addEventListener("click", function (event) {
        scoreText.textContent = "";
    });
    home.addEventListener("click", function (event) {
        scoreSection.setAttribute("hidden", "hidden");
        homeSection.removeAttribute("hidden");
    });
}

function selectOption(button, option) {
    optionSelected = option;
 
    if (optionSelected === q.answer) {
        // feedback = "Your are right ! 👍"
        // buttonColor="green"
        correct++;
        resultsLog = "👍 ";
    } else {
        resultsLog = "👎 ";
        // Subract 10s from time left
        secondsLeft = secondsLeft - 10;
    }
    results.textContent = resultsLog;
}

function reset() {
    resultsLog = "";
    i = 1;
    q = questions[0];
    quizText.textContent = q.name;
    head.textContent = "Question #" + i;

    populateQuizBtn(q);
    current = q;
}

function init() {
    i = 1;
    q = questions[0];
    
    head.textContent = "Question #" + i;
    resultsLog = "";
    results.textContent = resultsLog;
    quizText.textContent = q.name;

    populateQuizBtn(q);

    current = q;
}

function populateQuizBtn(question) {
    for (var i = 0; i < optionButtons.length; i++) {
        var btn = optionButtons[i];
        btn.textContent = (i + 1) + ". " + question.options[i];
    }
}

function finish() {
   
    clearInterval(timerInterval);
    var initials = window.prompt("You score " + correct + "/" + total + "\n" + "Enter initials:");
    if (!initials)
        initials = "NN";

    reset();
    quizSection.setAttribute("hidden", "hidden");
    addScore(initials, correct);
    correct = 0;
}

function addScore(name, score) {
    scoreSection.removeAttribute("hidden");
    var scoreList = document.getElementById("text-scores");
    var liEl = document.createElement('li');
    liEl.textContent = name + " - " + score;
    scoreList.appendChild(liEl);
}


function setTime() {
    // Sets interval in variable
    secondsLeft = 60;
    var timer = document.getElementById("timer");

    timerInterval = setInterval(function () {
        secondsLeft--;
        if (secondsLeft <= 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            timerInterval = null;
            // Calls function to create and append image
            //   sendMessage();
            window.alert("Your time has expired ! 00:00");
            quizSection.setAttribute("hidden", "hidden");
            homeSection.removeAttribute("hidden");

        } else {
            var formatSecs = ("0" + secondsLeft).slice(-2);
            timer.textContent = "00:"+formatSecs;
            if(secondsLeft<10){
                timer.setAttribute("style","color:red");
            }else{
                timer.removeAttribute("style");
            }
        }

    }, 1000);
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
