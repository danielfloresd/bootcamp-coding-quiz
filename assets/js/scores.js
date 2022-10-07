//Get clear button
var clear = document.querySelector("#clear");

// Get scores table body
var scoresTable = document.querySelector("#scores-table");

//Add click listener to clear button
clear.addEventListener("click", function (event) {
    // Clear scores
    clearScores();
});

//Add clear scores function
function clearScores() {
    // Clear scores
    localStorage.clear();
    // Clear scores table
    scoresTable.innerHTML = "";
}


// Add load scores function
function loadScores() {
    // Get scores from local storage
    var scores = JSON.parse(localStorage.getItem("scores"));
    // Order scores by score
    scores.sort(function (a, b) {
        return b.score - a.score;
    });
    // If there are scores
    if (scores !== null) {
        // Loop through scores
        for (var i = 0; i < scores.length; i++) {
            var ranking = i + 1;
            appendRowToTable(ranking,scores[i].initials, scores[i].score, scores[i].quiz);
        }
    }
}

function appendRowToTable(ranking,initials, score, quiz) {
    // Create table row
    var tr = document.createElement("tr");
    // Create table data for ranking
    var tdRanking = document.createElement("td");
    // Set text content
    tdRanking.textContent = ranking;
    // Create table data
    var tdInitials = document.createElement("td");
    // Add text to table data
    tdInitials.textContent = initials;
    // Create table data
    var tdScore = document.createElement("td");
    // Add text to table data
    tdScore.textContent = score;
    // Create table data
    var tdQuiz = document.createElement("td");
    // Add text to table data
    tdQuiz.textContent = quiz;
    // Append table data to table row
    tr.appendChild(tdRanking);
    tr.appendChild(tdInitials);
    tr.appendChild(tdScore);
    tr.appendChild(tdQuiz);
    // Append table row to table body
    scoresTable.appendChild(tr);
}

// Create init function
function init() {
    // Load scores
    loadScores();
}

// Call init function
init();
