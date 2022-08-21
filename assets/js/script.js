// time limit for quiz
var countLength = 75;
var startBtnEl = document.querySelector(".start-btn");



var countdown = function() {
    var timerEl = document.querySelector("#timer");
    timerEl.innerHTML = "Time: " + countLength;
    setInterval(function(){
        timerEl.innerHTML = "Time: " + countLength;
        if (countLength < 1) {
            endQuiz();
        }
        countLength--;
    }, 1000)
}

startBtnEl.addEventListener("click", countdown);