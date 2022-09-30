console.log(this);
console.log(questions);
//  Home section elements
var homeSection = document.getElementById("home");
var homeText = document.getElementById("text-home");
var startQuizBtn = document.getElementById("start-quiz");
var scoresBtn = document.getElementById("btn-scores");

// Quiz section 
var quizSection = document.getElementById("quiz");
var head = document.getElementById("head-q");
var question_label = document.getElementById("text-quiz");
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

resultsLog = "";
current = null;
optionSelected = null;
correct = 0;
total = questions.length;
scores = [];

homeMsg = "Try to answer the following code-related questions within the time limit. Keep in mindthat incorrect answers will penalize your time by reducing it by ten seconds."
homeText.value = homeMsg;

addEventListeners();

init();

function setQuestion() {
    if (i < total) {
        head.textContent = "Question #" + i;

        for (var j = 0; j < optionButtons.length; j++) {
            btn = optionButtons[j];
            btn.textContent = "";
        }

        q = questions[i++];
        question_label.value = q.name;
        optionA.textContent = "a) " + q.options[0];
        optionB.textContent = "b) " + q.options[1];
        optionC.textContent = "c) " + q.options[2];
        optionD.textContent = "d) " + q.options[3];
        console.log("Expected:" + q.answer);
        current = q;
    } else {
        finish();
    }
}

function addEventListeners() {

    startQuizBtn.addEventListener("click", function (event) {
        console.log("quiz:");
        console.log(quizSection);
        quizSection.removeAttribute("hidden");
        homeSection.setAttribute("hidden", "hidden");
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
        scores = [];
        scoreText.value = "";
    });
    home.addEventListener("click", function (event) {
        scoreSection.setAttribute("hidden", "hidden");
        homeSection.removeAttribute("hidden");
    });
}

function selectOption(button, option) {
    optionSelected = option;
    console.log("option:" + optionSelected);
    buttonColor = "red";
    feedback = "";
    if (optionSelected === q.answer) {
        // feedback = "Your are right ! 👍"
        // buttonColor="green"
        correct++;
        resultsLog = resultsLog + "👍 ";
    } else {
        resultsLog = resultsLog + "👎 ";
    }
    // button.setAttribute("style","background-color:"+buttonColor);
    results.textContent = resultsLog;
    // console.log(feedback);

}

function reset() {

    question_label.value = "";
    resultsLog ="";
    i = 1;

    q = questions[0];
    question_label.value = q.name;
    optionA.textContent = "a)"+q.options[0];
    optionB.textContent = "b)"+q.options[1];
    optionC.textContent = "c)"+q.options[2];
    optionD.textContent = "d)"+q.options[3];
    current = q;
    head.textContent = "Question #" + i;
    console.log("-------------------scores--------------------");
    console.log(scores);
}

function init() {
    i = 1;
    q = questions[0];
    console.log("head:" + head);
    head.textContent = "Question #" + i;
    resultsLog = "";
    results.textContent = resultsLog;
    question_label.value = q.name;
    optionA.textContent = "a) " + q.options[0];
    optionB.textContent = "b) " + q.options[1];
    optionC.textContent = "c) " + q.options[2];
    optionD.textContent = "d) " + q.options[3];
    current = q;
}

function finish() {
    score = Math.round((correct / total) * 100);
    initials = window.prompt("You score " + score + "%\n" + "Enter initials:");
    scores.push([initials, score]);
    reset();
    correct = 0;
    quizSection.setAttribute("hidden", "hidden");
    initScores();
}

function initScores() {
    scoreSection.removeAttribute("hidden");
    scoreList = "";
    for (var i = 0; i < scores.length; i++) {
        scoreList = scoreList + scores[i][0] + ": " + scores[i][1] + "%\n";
    }
    scoreText.value = scoreList;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
