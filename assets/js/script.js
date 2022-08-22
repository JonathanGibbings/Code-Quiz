// time limit for quiz
var countLength = 75;
var questionCounter = 0;
var startBtnEl = document.querySelector("#start-btn");
var quizAreaEl = document.querySelector("#quiz-area");
var questionsList = [
    {
        question: "Question 1 is 4?",
        ans1: "answer 1 ahsdfvoaiuyfd",
        ans2: "answer 2",
        ans3: "answer 3",
        ans4: "answer 4",
        numAns: 4,
        answer: 4
    },
    {
        question: "Question 2 is 3?",
        ans1: "answer 1",
        ans2: "answer 2",
        ans3: "answer 3",
        ans4: "answer 4",
        numAns: 4,
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
    var quizEl = document.createElement("section");
    quizEl.className = "quiz-box";
    quizAreaEl.appendChild(quizEl);

    var questionEl = document.createElement("h1");
    questionEl.innerText = questionsList[questionCounter].question;
    quizEl.appendChild(questionEl);

    var ansBoxEl = document.createElement("div");
    ansBoxEl.className = "ans-box";
    quizEl.appendChild(ansBoxEl);
    
    for (var i=1; i <= questionsList[questionCounter].numAns; i++) {
        eval("var ansBtn" + i + " = document.createElement('button');");
        eval("ansBtn" + i + ".className = 'btn';");
        eval("ansBtn" + i + ".innerText = questionsList[questionCounter].ans" + i + ";");
        eval("ansBoxEl.appendChild(ansBtn" + i + ");");
    }

}

// brings up the highscore screen
var endQuiz = function(score) {}

// event listeners for buttons
startBtnEl.addEventListener("click", startQuiz);