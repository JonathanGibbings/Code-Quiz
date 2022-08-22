// time limit for quiz
var countLength = 75;
var startBtnEl = document.querySelector("#start-btn");
var quizAreaEl = document.querySelector("#quiz-area");
var questions = [
    {
        question: "Question 1 is 4?",
        1: "answer 1",
        2: "answer 2",
        3: "answer 3",
        4: "answer 4",
        answer: 4
    },
    {
        question: "Question 2 is 3?",
        1: "answer 1",
        2: "answer 2",
        3: "answer 3",
        4: "answer 4",
        answer: 3
    }
]

// Runs countdown till end of quizLength set at top
var countdown = function() {
    var timerEl = document.querySelector("#timer");
    timerEl.innerHTML = "Time: " + countLength;
    setInterval(function(){
        timerEl.innerHTML = "Time: " + countLength;
        if (countLength < 1) {
            endQuiz(countLength);
        }
        countLength--;
    }, 1000)
}

// Starts quiz by starting countdown, shuffling questions, and pulling first question
var startQuiz = function() {
    var introEl = document.querySelector("#intro-box");
    introEl.remove();
    countdown();
    randomizeQuestions();
    nextQuestion();
}

// randomizes the order of the questions in the array
var randomizeQuestions = function() {}

// puts the next question on the screen
var nextQuestion = function() {

}

// brings up the highscore screen
var endQuiz = function(score) {}

// event listeners for buttons
startBtnEl.addEventListener("click", startQuiz);